# 🏖️ jonmendoza.com

This repository contains all the code for [jonmendoza.com](https://jonmendoza.com). 

## 🧑🏽‍💻 Installation

```
brew install just
just install
just serve
```

## ☁️ Deploying

```
just deploy
```

This builds the site to `docs/`, commits, and pushes to both `main` and `gh-pages`.

**How it works:**
- Site is built by 11ty into `docs/`
- `gh-pages` branch contains only the built files (extracted from `docs/`)
- GitHub Pages serves from `gh-pages` branch root
- Custom domain via CloudFlare

## ⚒️ Technologies
- [11ty](https://www.11ty.dev) - Static Site Generator
