# Blackbox Supply — product hub site

Self-contained, warm-dark affiliate **catalog** (no cart/checkout — products link out to Amazon via affiliate links). Next.js 16 + React 19 + Tailwind v4. Reads `data/products.json` at build time. **Never imported by the main Ascension app.**

**Live:** https://www.blackboxsupplies.com — its own Vercel project (stable).

> Canonical entrypoint for any work on this venture: **`../NEXT_SESSION_START.md`**. Read it first.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build / preview production
```bash
npm run build
npm run start
```

## Deploy (its OWN Vercel project)
Separate Vercel project with **Root Directory = this `site/` folder**. Never deploy it with the main Ascension app — the venture subtree is excluded from the main app's build.

## Product data
`data/products.json` — the catalog (~135 products; ~94 core, the rest de-promoted `offBrand`). Niche = **utility & readiness gear** (car/roadside, power/backup, tools/garage, cooling, practical work-utility/EDC). Each live product carries a real Amazon `affiliateUrl` (affiliate disclosure then renders automatically). **Never** fabricate affiliate links, ratings, or set `tested=true` without an actual test.

## Design
**Warm-dark editorial commerce** — "gear magazine at night, lit by one amber lamp." Near-black / espresso ground + espresso lit-cards + one **amber** accent (`#d99a45`). Newsreader serif headlines + Inter + mono labels. Tokens live in `app/globals.css` (`@theme`). See `../BLACKBOX_DESIGN_BRIEF.md` and `../BLACKBOX_DESIGN_SYSTEM.md`.
