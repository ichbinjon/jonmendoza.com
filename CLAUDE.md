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

- `src/` - source files (input dir)
  - `index.html` - main page
  - `bundle.css` - styles
- `docs/` - built output (for GitHub Pages)
- `favicon/` - favicon assets (copied to root via passthrough)
- `.eleventy.js` - 11ty config

## Deployment

Run `just deploy` to go live. This:
1. Builds site to `docs/`
2. Commits and pushes to `main`
3. Pushes built files to `gh-pages` branch

GitHub Pages serves from `gh-pages` root. Custom domain via CloudFlare.

## Removing Gemini Watermarks

If using Gemini to generate images, remove watermarks with:

```bash
# Download tool (one-time)
curl -L -o /tmp/GeminiWatermarkTool.zip "https://github.com/allenk/GeminiWatermarkTool/releases/download/v0.1.2/GeminiWatermarkTool-macOS-Universal.zip"
unzip -o /tmp/GeminiWatermarkTool.zip -d /tmp/
chmod +x /tmp/GeminiWatermarkTool

# Remove watermarks from images
/tmp/GeminiWatermarkTool -i src/blog/images/ -o src/blog/images/ -v
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
