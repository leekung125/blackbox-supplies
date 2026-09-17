# BlackBox Supplies

Source for [blackboxsupplies.com](https://blackboxsupplies.com) — a utility and readiness gear site
built around the moment something breaks rather than around product categories. Dead battery, flat
tire, power cut, heatwave: start from the problem, get to a decision in a couple of minutes.

![blackboxsupplies.com](docs/screenshots/home.png)

It's a real, live, affiliate-funded site, and it says so on every page. The homepage counter reads
**0 paid placements**, which is the actual editorial rule — nobody has ever paid to appear.

## How it's organised

The interesting decision is the routing. Most gear sites are a category tree. This one leads with
**failure scenarios**, because that's how people actually search:

```
app/(site)/
  when/[slug]          "when it breaks" - the scenario entry points
  guides/[slug]        long-form buying guides
  kits/[slug]          bundles for a whole situation
  category/[category]  the conventional tree, kept as a fallback
  products/[id]        individual picks
  finds · heat · useful · gear     curated shelves
  tools/power-station-sizing       an actual calculator, not a listicle
  methodology · disclosure         how picks are made, and how the money works
```

Comparison logic is one module per product class — `comparison-power-stations.ts`,
`comparison-jump-starters.ts`, `comparison-tire-inflators.ts`, `comparison-dash-cams.ts`,
`comparison-fans.ts`, `comparison-portable-ac.ts` — each with its own schema of what actually
matters for that category. A power station is judged on watt-hours and surge; a tire inflator
isn't. One generic spec table for everything is how gear sites end up useless.

![A buying guide](docs/screenshots/guide.png)

## Stack

- **Next.js** App Router with route groups · **React** · **TypeScript**
- **Tailwind CSS**
- Content as typed modules in `lib/` and JSON in `data/`, not a CMS — every pick is a typed object
  with the evidence attached
- Deployed on Vercel

## A few things worth pointing at

- **`lib/owner-evidence.ts`** — picks are backed by what owners actually report, kept separately
  from marketing copy, so a claim can be traced.
- **`lib/freshness.ts`** — tracks how stale each page's data is, because a gear recommendation
  silently rots and a page with no freshness signal is a lie by omission.
- **`lib/affiliate-tag.ts`** — one place that owns link tagging, so the disclosure and the links
  can never drift apart.
- **`tools/power-station-sizing`** — takes the devices you want to run and tells you the capacity
  you need. Answering the question beats ranking ten products.

## Running it

```bash
npm install
npm run dev
```

⛔ **`public/` is not in this repo.** It's about 2 GB of product photography, social assets and
generated imagery, which doesn't belong in a git repository. The site will run but render without
images. Everything that makes it *work* — routing, comparison logic, content, evidence, freshness —
is here.

## How it was built

I use AI coding tools heavily, Claude Code mainly, and I'd rather say so than have anyone infer it.
I'm an Information Systems student and still early in this. What I decided is the thing that makes
the site different from every other affiliate site: that it starts from the broken thing instead of
the product category, that comparison criteria are per-category rather than generic, that freshness
is tracked out loud, and that nothing is ever paid placement. Happy to talk through any of it.

## Licence

MIT — see [LICENSE](LICENSE). Content and product photography are not included.
