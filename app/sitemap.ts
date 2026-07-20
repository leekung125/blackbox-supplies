import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { EXTRA_ARTICLES } from "@/lib/articles-extra";
import { GUIDES } from "@/lib/guides";
import { COMPARISON_GUIDES } from "@/lib/comparison-guides";
import { KITS } from "@/lib/kits";
import { CATEGORIES } from "@/lib/categories";
import { SCENARIOS } from "@/lib/scenarios";
import { getCoreProducts } from "@/lib/products";
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
  const products: MetadataRoute.Sitemap = getCoreProducts().map((p) => ({
    url: `${BASE}/products/${p.id}`,
    lastModified: getDateModified(PRODUCTS_SOURCE),
  }));

  return [...core, ...scenarios, ...comparisonGuides, ...guides, ...articles, ...kits, ...categories, ...products];
}
