# Pulse.Tech — Concept, Research & Phase-Wise Build Prompt

## 1. The winning idea

**Pulse.Tech = "The live pulse of technology."** An auto-updating tech intelligence hub that combines:

1. **Live News Radar**: headlines from 20+ publishers plus Hacker News, merged and de-duplicated (the Techmeme/TechURLs model).
2. **Trend Radar**: the fastest-rising new GitHub repos and the most-upvoted community stories (the GitHub Trending/Exploding Topics model).
3. **AI & Software Tools Directory** with side-by-side comparison (the G2/Capterra/Futurepedia/AlternativeTo model).
4. **Original buyer guides** (AdSense-approval content plus SEO).
5. **Free "Get Matched" B2B lead service** that routes buyers to vetted AI, dev, cloud, security and IT partners (the Software Advice/Capterra advisor model).

### Why this is the most profitable use of the domain
| Lever | Logic |
|---|---|
| AdSense RPM | Tech, B2B software, cloud and cybersecurity are among the highest-CPC ad categories. A tech audience earns much more per 1,000 views than general news. |
| Repeat traffic | A live feed that refreshes every 2 hours gives readers a reason to return daily. Daily habit means compounding pageviews. |
| Lead value | One B2B services lead (dev agency, MSP, security) commonly resells or refers for $50–$500+. Ten leads a month can beat the AdSense income of a mid-size site. |
| Sponsorship | Newsletter, featured-listing and sponsored-guide slots (the DevHunt/TLDR/BetaList model) are cash from week one, with no traffic minimum. |
| Domain fit | "Pulse" maps to *live/real-time*, and ".Tech" is the category. The name reads as the product. |

**Rejected alternatives:** a health-tech or wearables review site (thin affiliate margins, YMYL scrutiny), a pure AI-tools directory (crowded, low differentiation), and a dev-only aggregator (low RPM, ad-blocker-heavy audience).

## 2. Research: 39 sites opened and read

| # | Site | What it actually does | Feature taken |
|---|---|---|---|
| 1 | Techmeme | Clustered tech headline aggregator, River view, leaderboards | Headline-only aggregation with source credit |
| 2 | Hacker News | Community-ranked links, jobs, Show/Ask | Live score-ranked list (via public API) |
| 3 | TechCrunch | Startup/VC news, events, newsletters | Topic nav, newsletter, events/sponsor revenue |
| 4 | Engadget | News + reviews + buying guides | Card grid, guides |
| 5 | TechRadar | Reviews, deals, coupons, Insider signup | Mega-menu, trending ticker |
| 6 | Product Hunt | Daily launch leaderboard, promoted listings | Featured/promoted tool slots |
| 7 | There's An AI For That | AI launch feed with tags | Tool tags, new-release badges |
| 8 | Futurepedia | AI directory + role-based onboarding | Directory categories, onboarding quiz |
| 9 | G2 | Software reviews, compare, deals | Compare feature, vendor monetisation |
| 10 | Capterra | Software discovery + free advisor calls | **Advisor-style lead capture** |
| 11 | TrustRadius | B2B review trust content | Trust/transparency messaging |
| 12 | Slashdot | News + polls + B2B software | Polls, sponsored B2B |
| 13 | daily.dev | Personalised dev feed, Squads, Jobs, Ads | Jobs + ads revenue mix |
| 14 | TLDR | Daily newsletter, 8M readers, Advertise | **Newsletter sponsorship model** |
| 15 | TechURLs | Multi-source headline board, filters | Source/time filters, search |
| 16 | GitHub Trending | Repos by stars, language, timeframe | **Trend Radar repos** |
| 17 | AlternativeTo | Crowd-ranked software alternatives, donations | Alternatives framing, donation option |
| 18 | VentureBeat | Enterprise AI/data/security, multiple newsletters | B2B angle, partner content |
| 19 | The Next Web | News + events, newsletter | Topic hubs |
| 20 | Tom's Guide | Reviews, deals, member Club | Repeated lead prompts |
| 21 | Tom's Hardware | Reviews, Premium, forums | Premium tier idea |
| 22 | Gizmodo | News, reviews, deals | Affiliate/deal sections |
| 23 | Android Authority | Polls, affiliate disclosure | Affiliate disclosure language |
| 24 | 9to5Mac | Apple news, tip form, dark mode | Tip submission, dark mode |
| 25 | XDA | PC build planner, newsletter | Interactive free tools |
| 26 | RTINGS | Lab-tested reviews, paid membership | Membership/supporter tiers |
| 27 | StackShare | Company tech stacks, tool categories | Stack-based tool grouping |
| 28 | BetaList | Startup previews, Boosted spots, jobs | Paid boosted placement |
| 29 | Indie Hackers | Build-in-public board | Community contest energy |
| 30 | Exploding Topics | Trend discovery, Pro plan | Trend framing and CTAs |
| 31 | GetApp | Software comparison listings | Ratings cards |
| 32 | Software Advice | **Free human-advisor matching** | **Core lead-gen funnel** |
| 33 | Digital Trends | News, deals, giveaways | **Contests/giveaways** |
| 34 | MakeUseOf | How-to tech, trending lists | Practical how-to guides |
| 35 | How-To Geek | Explainers, newsletter, registration | Guide structure |
| 36 | BleepingComputer | Security news, sponsored security posts | Security vertical (high CPC) |
| 37 | The Register | Enterprise IT news, Vendor Voice | Labelled sponsored content |
| 38 | DevHunt | Weekly dev-tool launches, $99–$199/wk sponsor slots | **Sponsor pricing benchmarks** |
| 39 | The Information | Subscription tech business news | Premium/paid tier path |

The Verge, Wired, Ars Technica, CNET, ZDNET and Mashable blocked automated fetching, and Lobsters disallows crawlers. All seven were replaced in the list above. The live feed still links to the ones that publish public RSS.

## 3. Phase-wise build prompt (reusable)

> Copy each phase into a build assistant in order. Constants used in every phase:
> **Domain:** Pulse.Tech · **AdSense:** `ca-pub-6620975821265271` · **Single contact inbox:** the owner's Gmail (never rendered; routed through an AJAX form relay with the address assembled at runtime) · **Top banner on every page:** "Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership" → web.works/contact (URL decoded at runtime, never shown as text) · **Hosting:** GitHub Pages, free plan, `main` branch root.

### Phase 1: Foundation & compliance
Build a static, dependency-free site (HTML/CSS/vanilla JS) with relative links so it works both at `username.github.io/pulse-tech/` and at a custom domain. Add the AdSense script to every `<head>`, `ads.txt` (`google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0`), `robots.txt` (allow Mediapartners-Google), `sitemap.xml`, `.nojekyll`, a web manifest, an SVG favicon and an OG image. Create the About, Contact, Privacy & Cookie Policy (with Google's required third-party-cookie and opt-out disclosures), Terms, Disclaimer, Editorial Policy and Trademark & Copyright Disclosure pages (non-affiliation with any "PulseTech" mark). Add a cookie consent bar.

### Phase 2: Design system
Dark-first "pulse" theme (navy plus a mint→cyan→violet gradient), light-mode toggle, Inter + Space Grotesk, an animated ECG hero line, card grids, a sticky blurred header, a mobile drawer menu, skip link, focus states and reduced-motion support. Every layout must be responsive from 360px to 1440px+.

### Phase 3: Self-updating data engine
- A GitHub Action (cron every 2h) runs a Node script that pulls 20+ public RSS/Atom feeds and stores headline, link, source, category and date only in `data/news.json`. It also writes the top new GitHub repos to `data/repos.json` and refreshes the sitemap's `lastmod`.
- Client side: live Hacker News (Firebase API) and GitHub search API calls, merged with the snapshot (read from raw.githubusercontent so it's always the newest commit). Graceful fallbacks and skeleton loaders.

### Phase 4: Core content pages
Home (ticker, hero, live panels, lead box, trending repos, featured tools, guides, videos, community CTAs, newsletter), Live News (search plus topic filters), Trend Radar, Tools Directory (60+ tools, filters, search, compare up to 3 in a modal), Guides hub plus 8 original 600–900-word guides with Article schema, and a Video Hub (YouTube uploads playlists via the privacy-enhanced player, click-to-load facades).

### Phase 5: Lead generation (highest priority)
- `/get-matched`: a 4-step wizard (need → company size → budget → contact) with a progress bar, one-tap option buttons, deep-link presets (`?need=ai`) and a thank-you step.
- A compact lead form on the home page, contextual CTAs at the end of every guide (pre-filled need), an exit-intent modal (desktop, once per visitor), a sticky mobile CTA bar, a sidebar CTA on News, and a partner-application route.
- Honeypot spam trap, consent checkbox, and suppressing CTAs after conversion.

### Phase 6: Monetisation beyond AdSense
- **Advertise:** rate card (Featured Tool $99/wk, Newsletter $249/issue, Sponsored Guide $799, Partner Network custom), inquiry form, "List your tool" form, domain/website acquisition CTA.
- **Support:** donation tiers ($5 / $15 a month / $100 Prize Patron / $500+ Founding Backer), a goal progress bar, a fund-allocation breakdown (operations, hiring, contests, promotion), and a pledge form that sends a secure payment link by email.
- **Contests:** a monthly Build Challenge with live countdown, prizes, judging criteria, entry form, official rules and prize-sponsor CTA.
- **Careers:** 5 roles plus a volunteer track, and an application/talent-pool form.

### Phase 7: SEO & performance
Unique titles and descriptions, canonical URLs, OG/Twitter tags, WebSite+Organization+SearchAction JSON-LD on Home, Article JSON-LD on guides, internal linking ("Keep reading"), lazy video loading, deferred JS, no layout shift.

### Phase 8: Deploy & launch
Push to `WEBWORKSA1/pulse-tech` on `main`. In Settings → Pages, set Source to *Deploy from a branch* → `main` / root. Add a custom domain `pulse.tech` with DNS A records 185.199.108–111.153 and a `www` CNAME to `webworksa1.github.io`, then tick Enforce HTTPS. Submit the first form once to activate the relay, apply for AdSense, submit the sitemap to Search Console, and enable the newsletter.

### Phase 9: Growth roadmap
Daily Pulse email automation, user accounts and saved feeds, reader polls, a community-voted tools leaderboard, more guides (2 a week), comparison pages ("X vs Y"), a jobs board (paid listings), and an API/RSS of the merged feed.

## Appendix: auto-refresh workflow

Save as `.github/workflows/update-pulse.yml` (Add file → Create new file on GitHub):

```yaml
name: Update Pulse feeds

on:
  schedule:
    - cron: '17 */2 * * *'   # every 2 hours
  workflow_dispatch:
  push:
    branches: [main]
    paths: ['scripts/update-feeds.mjs', '.github/workflows/update-pulse.yml']

permissions:
  contents: write

concurrency:
  group: pulse-update
  cancel-in-progress: true

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Build feeds
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: node scripts/update-feeds.mjs
      - name: Update sitemap lastmod
        run: sed -i "s#<lastmod>[^<]*</lastmod>#<lastmod>$(date -u +%Y-%m-%d)</lastmod>#" sitemap.xml
      - name: Commit if changed
        run: |
          git config user.name "pulse-bot"
          git config user.email "actions@users.noreply.github.com"
          git add data/ sitemap.xml
          git diff --cached --quiet || git commit -m "chore: refresh pulse feeds [skip ci]"
          git push
```
