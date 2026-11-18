# Pulse.Tech

The live pulse of technology: auto-updating tech headlines, a trend radar, an AI & software tools directory, original guides, and a free B2B tech-partner matching service. It's a static site for GitHub Pages (free plan, `main` branch, root). It has no build step and no dependencies.

## Structure
- `*.html`, `guides/*.html`: site pages (plain static HTML)
- `assets/css/style.css`: design system (dark/light)
- `assets/js/chrome.js`: shared footer, cookie bar, exit-intent modal, sticky CTA
- `assets/js/main.js`: live feeds, lead wizard, forms, tools directory and compare, video facades, countdown
- `data/news.json`, `data/repos.json`: auto-refreshed headline and trending-repo snapshots
- `data/tools.json`: tools directory data (edit to add or feature tools)
- `scripts/update-feeds.mjs`: the feed builder (Node 22, no dependencies)
- `ads.txt`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `.nojekyll`

## Self-updating
- **In the browser, always live:** Hacker News top stories and the GitHub trending repos load from public APIs on every visit.
- **Every 2 hours:** a GitHub Action runs `scripts/update-feeds.mjs` to refresh `data/news.json` (20+ publisher RSS feeds) and `data/repos.json`. The site reads the newest copy straight from the repo. To enable it, add `.github/workflows/update-pulse.yml` (template in `BUILD-PROMPT.md`).

## Publish
Settings → Pages → Source: **Deploy from a branch** → `main` / `(root)`.
Custom domain: add `pulse.tech` in Pages settings, then set DNS A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, plus a `www` CNAME to `webworksa1.github.io`. Then tick Enforce HTTPS.

## Forms
All forms post through an AJAX form relay. The destination inbox is assembled at runtime and never appears in page text. The **first submission triggers a one-time activation email** that must be confirmed once.

See `BUILD-PROMPT.md` for the concept, the 39-site research and the phase-wise build prompt. See `trademark.html` for the trademark and copyright disclosure.
