#!/usr/bin/env node
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;

// MIME types
const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

const server = http.createServer(async (req, res) => {
  // CORS headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Proxy: /api/* → https://api.webflow.com/v2/*
  if (req.url.startsWith('/api/')) {
    const wfPath = req.url.replace('/api', '');
    const wfUrl = 'https://api.webflow.com/v2' + wfPath;

    // Read request body for PATCH/POST
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const parsed = new URL(wfUrl);
      const options = {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: req.method,
        headers: {
          'Accept': 'application/json',
        }
      };

      // Forward auth header
      if (req.headers.authorization) {
        options.headers['Authorization'] = req.headers.authorization;
      }
      if (body && (req.method === 'PATCH' || req.method === 'POST' || req.method === 'PUT')) {
        options.headers['Content-Type'] = 'application/json';
        options.headers['Content-Length'] = Buffer.byteLength(body);
      }

      const proxyReq = https.request(options, (proxyRes) => {
        let data = '';
        proxyRes.on('data', chunk => data += chunk);
        proxyRes.on('end', () => {
          res.writeHead(proxyRes.statusCode, {
            'Content-Type': proxyRes.headers['content-type'] || 'application/json',
          });
          res.end(data);
        });
      });

      proxyReq.on('error', (e) => {
        res.writeHead(502);
        res.end(JSON.stringify({ error: 'Proxy error: ' + e.message }));
      });

      if (body) proxyReq.write(body);
      proxyReq.end();
    });
    return;
  }

  // Static files: serve from same directory
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  try {
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (e) {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`\n  Webflow Rich Text Pusher`);
  console.log(`  ───────────────────────`);
  console.log(`  Open: http://localhost:${PORT}\n`);
});
