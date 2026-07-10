# BlackBox — Template Contamination QA Report

Lane: cross-category leakage + hardcoded generic copy rendering on the wrong category.
Method: grep across all shared guide/board components + all 6 `lib/comparison-*.ts` data files + `lib/articles*`; each suspect term verified to appear ONLY in its correct category; both P0s confirmed rendering LIVE on a non-cooling guide (`/guides/best-jump-starters-compared`).

---

## P0 — confirmed contamination (kills trust on every non-cooling guide)

### P0-1 — Cooling-specific teaser hardcoded on ALL comparison guides
- **Issue:** The interactive-compare intro copy is hardcoded to cooling. It renders verbatim on jump starters, tire inflators, dash cams, power stations, and fans.
- **Page:** every `/guides/*-compared` page. Confirmed live on `/guides/best-jump-starters-compared`.
- **File:line:** `components/comparison-guide.tsx:102-105`
  > "Cooling, quiet, or price — tap one and the winner rises to the top. Every number is real, and each pick links straight to its exact Amazon page."
- **Fix:** Drive this line from the guide's own data instead of a string literal. Build it from `guide.sorts` labels, e.g. ``${guide.sorts.slice(0,3).map(s=>s.label).join(", ")} — tap one and the winner rises to the top.`` So a jump-starter guide reads "Cranking power, engine size, or price…", a tire-inflator guide "Speed, max PSI, or price…", etc. Keep the second sentence (it's category-neutral and true).
- **Risk:** HIGH. A jump-starter buyer reading "Cooling, quiet" instantly clocks the page as a template with the wrong text pasted in — direct credibility hit on the highest-intent (buy) page.

### P0-2 — "DOE/SACC data" ranking-source fine print hardcoded on ALL boards
- **Issue:** The comparison table's methodology fine print claims every ranking is built from "DOE/SACC data." DOE/SACC is the portable-AC-only standardized cooling metric. It does not exist for jump starters, tire inflators, dash cams, power stations, or fans — so the line is factually false on 5 of 6 categories.
- **Page:** every comparison board. Confirmed live on `/guides/best-jump-starters-compared`.
- **File:line:** `components/comparison-board.tsx:475-478`
  > "Ranked from manufacturer specs, DOE/SACC data, and independent lab reviews."
- **Fix:** Make the middle clause category-neutral, e.g. "Ranked from manufacturer specs, standardized test ratings where they exist, and independent lab reviews." — or parameterize it off `meta` so only Portable AC names DOE/SACC. Do NOT leave a specific cooling standard on non-cooling pages.
- **Risk:** HIGH. This is a false methodology claim sitting directly under the money table. A knowledgeable jump-starter/power-station buyer knows there is no DOE/SACC rating for that product; it reads as auto-generated boilerplate and undermines the whole "honest, source-backed" positioning.

---

## P2 — generic/automation-smelling (not false, lower priority)

### P2-1 — "Tell us what matters — we'll surface the pick" on every guide
- **Page:** every `/guides/*-compared` page.
- **File:line:** `components/comparison-guide.tsx:99-100`
  > "Tell us what matters — we'll surface the pick"
- **Fix:** Optional. It's category-neutral and true, so not contamination — but it's an identical gimmicky heading on every guide and reads a touch automated. Consider a per-guide `meta` headline, or leave as-is if bandwidth is tight.
- **Risk:** LOW.

---

## Verified CLEAN (no leakage found — do not re-flag)
- `lib/comparison-jump-starters.ts` — no cooling/SACC/BTU/PSI/Wh/CFM terms; cranking/diesel/peak-amp correctly scoped.
- `lib/comparison-tire-inflators.ts` — PSI/inflator only.
- `lib/comparison-power-stations.ts` — Wh/watt-hours correct; the "cooling fan" mentions are legit (the station's own fan noise), not cross-category.
- `lib/comparison-dash-cams.ts` — no inflator/cranking/BTU/SACC/PSI/Wh leakage.
- `lib/comparison-portable-ac.ts` / `lib/comparison-fans.ts` — SACC/BTU and CFM/airflow are in-category.
- `lib/articles.ts` / `lib/articles-extra.ts` — cranking/peak-amp only in jump-starter articles; SACC/BTU/DOE only in portable-AC articles. Clean.
- `components/category/category-data.ts` — all cooling/PSI/BTU/cranking copy is keyed per category name; correctly scoped.
- `app/(site)/heat/page.tsx:83` — "cooling, quiet, or price… winner rises" is on the actual cooling landing page. Correct, not contamination.
- `components/home/featured-comparison.tsx`, guide subcomponents (`competition`, `owner-insights`, `pick-caveats`, `sources-block`, `specs-that-matter`, `sticky-decision-summary`) — fully parameterized off guide data; no hardcoded category strings.
