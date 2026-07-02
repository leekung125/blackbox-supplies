import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { KITS } from "@/lib/kits";
import { CATEGORIES } from "@/lib/categories";
import { getAllProducts } from "@/lib/products";

const BASE = "https://www.blackboxsupplies.com";

/**
 * lastModified only where we have a REAL content date (guides carry `updated`).
 * Everything else omits it — an always-`now` lastmod trains crawlers to distrust
 * the site's freshness signals. priority/changeFrequency omitted (ignored by Google).
 */

/** "July 2026" -> 2026-07-01 (guides store human-readable update months). */
function parseGuideUpdated(updated: string): Date | undefined {
  const d = new Date(`1 ${updated}`);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    "",
    "/guides",
    "/kits",
    "/products",
    "/finds",
    "/gear",
    "/newsletter",
    "/disclosure",
  ].map((p) => ({ url: `${BASE}${p}` }));

  const guides: MetadataRoute.Sitemap = GUIDES.map((g) => {
    const lastModified = parseGuideUpdated(g.updated);
    return { url: `${BASE}/guides/${g.slug}`, ...(lastModified ? { lastModified } : {}) };
  });

  const kits: MetadataRoute.Sitemap = KITS.map((k) => ({ url: `${BASE}/kits/${k.id}` }));
  const categories: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({ url: `${BASE}/category/${c.slug}` }));
  const products: MetadataRoute.Sitemap = getAllProducts().map((p) => ({ url: `${BASE}/products/${p.id}` }));

  return [...core, ...guides, ...kits, ...categories, ...products];
}
