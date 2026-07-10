import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { EXTRA_ARTICLES } from "@/lib/articles-extra";
import { GUIDES } from "@/lib/guides";
import { COMPARISON_GUIDES } from "@/lib/comparison-guides";
import { KITS } from "@/lib/kits";
import { CATEGORIES } from "@/lib/categories";
import { getCoreProducts } from "@/lib/products";

const BASE = "https://www.blackboxsupplies.com";

/**
 * lastModified only where we have a REAL content date (guides carry `updated`).
 * Everything else omits it — an always-`now` lastmod trains crawlers to distrust
 * the site's freshness signals. priority/changeFrequency omitted (ignored by Google).
 */

/** Parse a content date: ISO ("2026-07-04") or human month ("July 2026"). */
function parseGuideUpdated(updated: string): Date | undefined {
  const iso = new Date(updated);
  if (!Number.isNaN(iso.getTime())) return iso;
  const d = new Date(`1 ${updated}`);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

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
  const comparisonGuides: MetadataRoute.Sitemap = COMPARISON_GUIDES.map((g) => {
    const lastModified = parseGuideUpdated(g.updated);
    return { url: `${BASE}/guides/${g.slug}`, ...(lastModified ? { lastModified } : {}) };
  });

  const guides: MetadataRoute.Sitemap = GUIDES.map((g) => {
    const lastModified = parseGuideUpdated(g.updated);
    return { url: `${BASE}/guides/${g.slug}`, ...(lastModified ? { lastModified } : {}) };
  });

  const articles: MetadataRoute.Sitemap = [...ARTICLES, ...EXTRA_ARTICLES].map((a) => {
    const lastModified = parseGuideUpdated(a.updated);
    return { url: `${BASE}/guides/${a.slug}`, ...(lastModified ? { lastModified } : {}) };
  });

  const kits: MetadataRoute.Sitemap = KITS.map((k) => ({ url: `${BASE}/kits/${k.id}` }));
  const categories: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({ url: `${BASE}/category/${c.slug}` }));
  const products: MetadataRoute.Sitemap = getCoreProducts().map((p) => ({ url: `${BASE}/products/${p.id}` }));

  return [...core, ...comparisonGuides, ...guides, ...articles, ...kits, ...categories, ...products];
}
