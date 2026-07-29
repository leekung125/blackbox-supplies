import { getAllProducts, getCoreProducts, isMainProduct } from "@/lib/products";
import { getAllArticles } from "@/lib/articles";
import { COMPARISON_GUIDES } from "@/lib/comparison-guides";
import { GUIDES } from "@/lib/guides";

/**
 * The single source of truth for every public "how much do you cover" number.
 *
 * WHY THIS EXISTS. The site shipped four mutually contradictory catalog totals at
 * once: the homepage marquee said 94, its own "Car & roadside" card said 56, the
 * /gear page it linked to said 51, and /products said 86 — because four surfaces
 * each computed a count through a different filter. It also advertised "52 guides"
 * on /about while publishing 60 guide pages. A visitor who notices two of those in
 * one session has caught the site being wrong about itself, which is the cheapest
 * possible way to lose trust on a site whose whole pitch is research honesty.
 *
 * Every public count now comes from here. If a surface needs a narrower number, it
 * uses a named field below and SAYS what it counted — never an unlabelled total
 * that silently disagrees with the next page.
 */

/** Every on-brand pick. The headline "researched picks" number. */
export const TOTAL_PICKS = getCoreProducts().length;

/**
 * On-brand picks at or above the $25 floor — what the browse surfaces actually
 * list. Lower than TOTAL_PICKS by design; label it when shown.
 */
export const BROWSABLE_PICKS = getAllProducts().filter(isMainProduct).length;

/**
 * The car & roadside vertical, by the category values that ACTUALLY appear in the
 * catalog JSON. These are display names ("Jump Starters"), not slugs — an earlier
 * version of this file matched slugs, every row missed, and CAR_PICKS silently
 * evaluated to 0. Anything that reads a `category` must match these exact strings.
 */
export const CAR_CATEGORIES = new Set([
  "Jump Starters",
  "Tire Inflators",
  "Dash Cams",
  "Power & Charging",
  "Roadside Safety",
  "Car Utility",
]);

/** Car & roadside picks, counted the same way /gear lists them. */
export const CAR_PICKS = getAllProducts().filter(
  (p) => CAR_CATEGORIES.has(p.category as string) && isMainProduct(p),
).length;

/**
 * Every published guide page: long-form articles + the interactive comparison
 * guides + the legacy roundups. /about used to count only the articles, which
 * silently omitted the six comparison guides the site calls its best pages.
 */
export const TOTAL_GUIDES =
  getAllArticles().length + COMPARISON_GUIDES.length + GUIDES.length;

/** Rounded down to the nearest ten, for "N+" phrasing that stays true as the catalog moves. */
export function approx(n: number): number {
  return Math.floor(n / 10) * 10;
}
