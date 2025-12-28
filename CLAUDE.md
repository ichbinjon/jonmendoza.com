# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
just install   # install dependencies (npm install)
just build     # build site (npx @11ty/eleventy)
just serve     # dev server with hot reload (npx @11ty/eleventy --serve)
```

Requires `just` command runner (`brew install just`).

## Architecture

Static personal website using 11ty (Eleventy).

- `src/` - source files (input dir)
  - `index.html` - main page
  - `bundle.css` - styles
- `docs/` - built output (for GitHub Pages)
- `favicon/` - favicon assets (copied to root via passthrough)
- `.eleventy.js` - 11ty config

## Deployment

Hosted on GitHub Pages via `gh-pages` branch with CloudFlare custom domain.

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
