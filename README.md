# Webflow Rich Text Pusher

Push large HTML, Markdown, or DOCX content into Webflow CMS rich text fields — bypassing the Designer's ~30KB size limit.

## The Problem

Webflow's CMS Designer UI silently truncates or corrupts rich text content larger than ~30KB. The Webflow REST API handles 200KB+ just fine. This tool bridges the gap with a simple web UI.

## Quick Start

```bash
git clone https://github.com/ikrasovytskyi/webflow-richtext-pusher.git
cd webflow-richtext-pusher
npm start
```

Open http://localhost:3000 in your browser. That's it — no dependencies to install.

## How to Use

1. **Get a Webflow API token** — Site Settings → Apps & Integrations → Generate API Token. Scopes needed: `sites:read`, `cms:read`, `cms:write`
2. **Paste your token** and click Connect
3. **Select** your site → collection → item → field
4. **Upload** an `.html`, `.md`, or `.docx` file (or paste content directly)
5. **Review** the preview and validation checks
6. **Push** — content is saved as a draft (never auto-published)

## Features

- Drag & drop file upload (HTML, Markdown, DOCX)
- Paste HTML or Markdown directly
- Live preview (rendered + raw HTML)
- Content validation (size, embeds, images, Webflow compatibility)
- Size verification after push (confirms nothing was truncated)
- Saves as draft only — never publishes
- Zero dependencies — just Node.js
- API token stays in your browser session, never stored

## Requirements

- Node.js 16+
- A Webflow API v2 token with `sites:read`, `cms:read`, `cms:write` scopes

## License

MIT
