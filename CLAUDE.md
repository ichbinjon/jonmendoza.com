# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
just install   # install dependencies
just serve     # dev server with hot reload (localhost:8080)
just build     # build site to docs/
just deploy    # build + commit + push to main and gh-pages
```

Always use `just` commands. Requires `brew install just`.

## Architecture

Static personal website using 11ty (Eleventy).

```
src/
  index.html              # home page (standalone, not using base.html)
  bundle.css              # styles
  robots.txt              # SEO
  sitemap.njk             # auto-generated sitemap
  _includes/
    base.html             # base layout (head, meta tags, etc)
    post.html             # blog post layout (uses base.html)
  blog/
    posts/
      posts.json          # sets layout + permalink for all posts
      *.md                # blog posts
    images/               # blog images
docs/                     # built output (for GitHub Pages)
favicon/                  # favicon assets
.eleventy.js              # 11ty config
```

## Blog Posts

Posts live in `src/blog/posts/*.md`. The `posts.json` sets:
- `layout: post.html` - REQUIRED or posts render without HTML wrapper
- `permalink: /blog/{{ page.fileSlug }}/` - URLs are /blog/<slug>/

Each post needs frontmatter:
```yaml
---
title: Post Title
date: 2025-01-01
description: Short description for SEO and home page listing.
---
```

## Deployment

Run `just deploy` to go live. This:
1. Builds site to `docs/`
2. Commits and pushes to `main`
3. Pushes built files to `gh-pages` branch

GitHub Pages serves from `gh-pages` root. Custom domain via CloudFlare.

**After deploy, verify locally:**
```bash
head -20 docs/blog/<post-slug>/index.html  # should have <!DOCTYPE html>
```

## Cache Busting

CSS uses `?v={{ cacheBust }}` which is a timestamp set at build time in `.eleventy.js`. No manual version bumping needed.

## Writing Style

Avoid AI-sounding patterns:
- No em dashes (—), use periods or commas
- No "figuring", "straightforward", "comprehensive"
- Keep it conversational and direct

## Removing Gemini Watermarks

If using Gemini to generate images, remove watermarks with:

```bash
~/bin/GeminiWatermarkTool -i src/blog/images/ -o src/blog/images/ -v
```

## Browser Verification

Use `mcp__claude-in-chrome__*` tools to verify work visually and investigate issues:

1. Start dev server: `npx @11ty/eleventy --serve` (runs on localhost:8080)
2. Use `mcp__claude-in-chrome__tabs_context_mcp` to get/create browser tab
3. Use `mcp__claude-in-chrome__navigate` to go to localhost:8080
4. Use `mcp__claude-in-chrome__computer` with `action: screenshot` to verify changes

If Chrome tools aren't working:
- Check Chrome is running with the Claude extension installed
- Try `mcp__claude-in-chrome__tabs_context_mcp` with `createIfEmpty: true`
- If extension not connected, tell user to install from https://claude.ai/chrome and restart Chrome
