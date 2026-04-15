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

## Required Webflow API Permissions

Generate a token at **Site Settings → Apps & Integrations → API Access** with these scopes:

| Scope | Purpose |
|---|---|
| `sites:read` | List your sites |
| `cms:read` | Browse collections and items |
| `cms:write` | Update rich text fields |

## How It Works

**1. Connect** — paste your API token. It stays in your browser and is never stored.

![Connect to Webflow](src/img_01.png)

**2. Select Item** — pick your site, collection, and CMS item. Search by name or slug.

![Select CMS Item](src/img_02.png)

**3. Push Content** — upload a file or paste HTML/Markdown. Preview, validate, and push.

![Push Content](src/img_03.png)

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
- A Webflow API v2 token (see permissions above)

## License

MIT
