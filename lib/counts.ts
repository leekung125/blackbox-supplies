/**
 * Public-count single source of truth.
 *
 * Every visitor-facing tally ("94+ researched picks", "N guides") must derive from THIS file,
 * never a hand-typed literal. Phase-1 INCONSISTENCY_REPORT §1/§3 found the About page and the
 * homepage disagreeing by 88 picks and understating the guide library by the 6 flagship
 * comparison guides — both were inline math. Import from here so the numbers can never drift.
 *
 * No hand-typed numbers: each count is computed from the real data sources at module load.
 */
import { getCoreProducts } from "./products";
import { getAllArticles } from "./articles";
import { COMPARISON_GUIDES } from "./comparison-guides";
import { getAllGuides } from "./guides";

/**
 * Researched picks = the on-brand catalog (off-brand drift excluded), i.e. `getCoreProducts()`.
 * This is the number the homepage hero + marquee already show ("94+ researched picks").
 */
export const RESEARCHED_PICKS: number = getCoreProducts().length;

/**
 * Total guide pages = 34 articles + 6 interactive comparison guides + 2 legacy guides (= 42).
 * The public definition of "guide" is all three surfaces `/guides` actually renders, so the
 * headline number stops understating the library by its most valuable pages.
 */
export const TOTAL_GUIDES: number =
  getAllArticles().length + COMPARISON_GUIDES.length + getAllGuides().length;

/** Helper form of {@link RESEARCHED_PICKS} for call sites that prefer a function. */
export function researchedPicksCount(): number {
  return RESEARCHED_PICKS;
}

/** Helper form of {@link TOTAL_GUIDES} — sums all three guide sources. */
export function guideCount(): number {
  return TOTAL_GUIDES;
}
