import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import freshnessData from "./freshness-data.json";

/**
 * REAL content freshness — the honest replacement for the site-wide "July 2026" stamp.
 *
 * Each content page's dateModified is the ACTUAL git last-commit time of its source/content
 * file, so freshness is EARNED, never cosmetically bumped. 2026 E-E-A-T / AI-crawler guidance
 * penalizes a blanket, identical "updated" date; a real per-file git timestamp is the defensible
 * signal.
 *
 * Source of truth = `lib/freshness-data.json`, precomputed by `scripts/gen-freshness.mjs` where
 * FULL git history exists and committed to the repo. This is deliberate: Vercel builds from a
 * SHALLOW clone, so a build-time `git log` would return empty for most files and collapse every
 * page onto one fallback date — re-creating the exact blanket-stamp problem. Reading the committed
 * JSON makes the real dates available wherever the site builds. Live git is only a dev fallback.
 * All callers are server components / sitemap (build-time) — nothing here ships to the client.
 */

// Floor used ONLY when a path is in neither the committed map nor local git. A single date, but it
// is never the primary value for real content, so it doesn't recreate the blanket-stamp problem.
const FALLBACK_ISO = "2026-07-09T00:00:00-04:00";

const DATA = freshnessData as Record<string, string>;
const cache = new Map<string, string>();

/**
 * REAL ISO-8601 dateModified for a content source file (relative to the site dir, e.g.
 * "lib/guides.ts"). Prefers the committed precomputed map; falls back to live git (dev), then the
 * floor. Memoized per path.
 */
export function getDateModified(sourcePath: string): string {
  const cached = cache.get(sourcePath);
  if (cached) return cached;

  let iso = DATA[sourcePath];
  if (!iso) {
    try {
      const out = execSync(`git log -1 --format=%cI -- "${sourcePath}"`, {
        cwd: process.cwd(),
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      if (out) iso = out;
    } catch {
      /* git unavailable / untracked -> floor */
    }
  }
  if (!iso) iso = FALLBACK_ISO;
  cache.set(sourcePath, iso);
  return iso;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Short human display for an ISO date: "Jul 2026". Month + year is deliberate — day-level
 * precision over-promises on a research page. Falls back gracefully on a bad string.
 */
export function displayUpdated(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "2026";
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

// -- Content-source resolvers -------------------------------------------------

/** Legacy roundup guides all live in one module. */
export const GUIDES_SOURCE = "lib/guides.ts";
/** Product PRICE/spec data lives in the catalog JSON (NOT lib/products.ts code) — the honest
 *  anchor for a product page's "prices as of", so touching catalog CODE never fakes a price bump. */
export const PRODUCTS_SOURCE = "data/products.json";

/** Comparison-guide slug -> the module that defines its editorial object. */
const COMPARISON_SOURCES: Record<string, string> = {
  "best-portable-air-conditioners": "lib/comparison-guides.ts",
  "best-jump-starters-compared": "lib/comparison-jump-starters.ts",
  "best-tire-inflators-compared": "lib/comparison-tire-inflators.ts",
  "best-dash-cams-compared": "lib/comparison-dash-cams.ts",
  "best-power-stations-compared": "lib/comparison-power-stations.ts",
  "best-tower-fans-compared": "lib/comparison-fans.ts",
};

export function comparisonSourcePath(slug: string): string {
  return COMPARISON_SOURCES[slug] ?? "lib/comparison-guides.ts";
}

/** Articles defined INLINE in lib/articles.ts (not their own file, not articles-extra.ts). */
const INLINE_ARTICLES_TS = new Set<string>([
  "what-size-jump-starter-do-i-need",
  "power-station-vs-jump-starter",
  "cordless-vs-12v-tire-inflator",
  "trunk-organizer-that-doesnt-slide",
]);

/** Batch articles whose file basename differs from their slug. */
const ARTICLE_SOURCE_OVERRIDES: Record<string, string> = {
  "best-monitor-light-bar-for-eye-strain-small-home-office":
    "lib/articles/best-monitor-light-bar-eye-strain-home-office.ts",
};

/**
 * Article slug -> source module. Deep-SEO batch articles live in lib/articles/<slug>.ts
 * (basename === slug, with one override); the originals are inline in lib/articles.ts and the
 * remaining extras are inline in lib/articles-extra.ts.
 */
export function articleSourcePath(slug: string): string {
  const override = ARTICLE_SOURCE_OVERRIDES[slug];
  if (override) return override;
  if (INLINE_ARTICLES_TS.has(slug)) return "lib/articles.ts";
  const candidate = `lib/articles/${slug}.ts`;
  if (existsSync(path.join(process.cwd(), candidate))) return candidate;
  return "lib/articles-extra.ts";
}
