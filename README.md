# Pulse.Tech

The live pulse of technology: auto-updating tech headlines, a trend radar, an AI & software tools directory, original guides, and a free B2B tech-partner matching service. It's a static site for GitHub Pages (free plan, `main` branch).

## Structure
- `*.html`, `guides/*.html`: generated pages (edit `src/build.py` and `src/guides.py`, then run `python3 src/build.py`)
- `assets/`: CSS, JS and images
- `data/`: `news.json` and `repos.json` (auto-refreshed by GitHub Actions every 2h), `tools.json` (directory)
- `scripts/update-feeds.mjs`: the feed builder used by `.github/workflows/update-pulse.yml`
- `ads.txt`, `robots.txt`, `sitemap.xml`, `.nojekyll`

## Publish
Settings → Pages → Source: **Deploy from a branch** → `main` / `(root)`.
Custom domain: add `pulse.tech` in Pages settings, then set DNS A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, plus a `www` CNAME to `webworksa1.github.io`.

## Forms
All forms post through an AJAX form relay. The destination inbox is assembled at runtime and never appears in page text. The **first submission triggers a one-time activation email** that must be confirmed.

See `BUILD-PROMPT.md` for the concept, the research and the phase-wise build prompt. See `trademark.html` for the trademark and copyright disclosure.
