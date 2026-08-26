import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { EXTRA_ARTICLES } from "@/lib/articles-extra";
import { GUIDES } from "@/lib/guides";
import { COMPARISON_GUIDES } from "@/lib/comparison-guides";
import { KITS } from "@/lib/kits";
import { CATEGORIES } from "@/lib/categories";
import { SCENARIOS } from "@/lib/scenarios";
import { getCoreProducts, getAllProducts } from "@/lib/products";
import {
  getDateModified,
  comparisonSourcePath,
  articleSourcePath,
  GUIDES_SOURCE,
  PRODUCTS_SOURCE,
} from "@/lib/freshness";

const BASE = "https://www.blackboxsupplies.com";

/**
 * lastModified is the REAL git last-commit time of each page's source/content file (via
 * @/lib/freshness), never a blanket constant. An always-`now` or identical stamp trains
 * crawlers to distrust the site's freshness signals; a real per-file date is the defensible
 * signal. priority/changeFrequency omitted (ignored by Google).
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    "",
    "/heat",
    "/useful",
    "/gear",
    "/guides",
    "/kits",
    "/products",
    "/finds",
    "/when",
    "/about",
    "/methodology",
    "/newsletter",
    "/disclosure",
    "/privacy",
    "/terms",
    "/contact",
  ].map((p) => ({ url: `${BASE}${p}` }));

  // The 6 interactive comparison guides are the crown-jewel money pages — they were missing
  // from the sitemap entirely. List them first.
  const comparisonGuides: MetadataRoute.Sitemap = COMPARISON_GUIDES.map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: getDateModified(comparisonSourcePath(g.slug)),
  }));

  const guides: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: getDateModified(GUIDES_SOURCE),
  }));

  const articles: MetadataRoute.Sitemap = [...ARTICLES, ...EXTRA_ARTICLES].map((a) => ({
    url: `${BASE}/guides/${a.slug}`,
    lastModified: getDateModified(articleSourcePath(a.slug)),
  }));

  const scenarios: MetadataRoute.Sitemap = SCENARIOS.map((s) => ({ url: `${BASE}/when/${s.slug}` }));
  const kits: MetadataRoute.Sitemap = KITS.map((k) => ({ url: `${BASE}/kits/${k.id}` }));
  const categories: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({ url: `${BASE}/category/${c.slug}` }));
  // ⛔ 41 REAL, INDEXABLE PRODUCT PAGES USED TO BE MISSING FROM THIS FILE.
  // generateStaticParams uses getAllProducts() so every product gets a built page, but the
  // sitemap used getCoreProducts(), which drops everything flagged offBrand. The code disagreed
  // with itself: the page existed, was linked, was crawlable - and was never declared.
  //
  // The offBrand flag is not wrong. It keeps kitchen/sleep/home drift out of the browse grids so
  // a car-and-roadside site does not dilute its topical authority. But indexing is a different
  // question from ranking, and among those 41 were the HIGHEST-VALUE products in the catalog -
  // the $650 Breville, the $450 Q Revo, the $400 Vitamix - each of which now has a full
  // buyer-intent guide pointing at it.
  //
  // ⛔ REVISED 2026-08-26: the remaining 21 are now indexed too, and the note below explains why
  // the earlier call was half-right. It said they were "genuine orphans (pizza scissors, a wake-up
  // light) and stay out". They ARE orphans - MEASURED: zero inbound internal links across all 254
  // built pages, and absent from this file - which means they were built, served, and completely
  // undiscoverable. That is not a conservative choice, it is a page that costs build time and
  // earns exactly nothing.
  //
  // What settled it was measuring them rather than judging them by their names: 639-1,474 words
  // each (median 740), every one with 3-6 correctly tagged buy links. Not thin. So the honest
  // options were INDEX them or DELETE them; serving a page nobody can reach is the worst of the
  // three, and it was the status quo.
  //
  // Indexing is still a different question from ranking, and the offBrand flag still does its job:
  // these stay OUT of the browse grids, so a car-and-roadside site does not put pizza scissors in
  // front of someone shopping for a jump starter. They are reachable by search only.
  // To reverse: restore the `coreIds.has(p.id) || editorialIds.has(p.id)` filter below.
  const editorialIds = new Set<string>();
  for (const g of GUIDES) for (const pk of g.picks) editorialIds.add(pk.productId);
  for (const a of [...ARTICLES, ...EXTRA_ARTICLES]) {
    for (const pk of a.picks ?? []) editorialIds.add(pk.id);
    for (const s of a.sections) for (const id of s.productIds ?? []) editorialIds.add(id);
  }
  for (const c of COMPARISON_GUIDES) {
    for (const p of (c as unknown as { products?: { id?: string }[] }).products ?? []) {
      if (p.id) editorialIds.add(p.id);
    }
  }

  const coreIds = new Set(getCoreProducts().map((p) => p.id));
  // every built product page is declared; generateStaticParams already builds them all, so any
  // filter here re-creates the exact code-disagrees-with-itself bug described above.
  void coreIds;
  void editorialIds;
  const products: MetadataRoute.Sitemap = getAllProducts()
    .map((p) => ({
      url: `${BASE}/products/${p.id}`,
      lastModified: getDateModified(PRODUCTS_SOURCE),
    }));

  return [...core, ...scenarios, ...comparisonGuides, ...guides, ...articles, ...kits, ...categories, ...products];
}
