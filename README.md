# Blackbox Supply — product hub site

Self-contained, dark-premium affiliate **catalog** (no cart/checkout — products link out to retailers). Next.js 16 + React 19 + Tailwind v4. Reads `data/products.json` at build time. **Never imported by the main Ascension app or the Remotion engine.**

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
Create a **separate** Vercel project with **Root Directory = this `site/` folder**. Never deploy it together with the main Ascension app. The venture subtree is already excluded from the main app's build.

## Pages
`/` home · `/products` index · `/category/[power|car|light|carry]` · `/products/[id]` detail · `/kits` field kits · `/disclosure` · `/links` (link-in-bio for the Instagram bio).

## Product data
`data/products.json` (synced from `../data/products.json`, the canonical catalog). To go live on a product: add a real `affiliateUrl` (the affiliate disclosure then shows automatically) and confirm SKU/price/specs. **Never** fabricate affiliate links or set `tested=true` without an actual test.

## Design
Graphite/cold-blue/off-white tokens in `app/globals.css` (`@theme`). Hand-built components (no heavy template), mono "quiet HUD" labels, code/CSS product placeholders (no third-party imagery until originals are shot/licensed). Matches the Remotion video brand.
