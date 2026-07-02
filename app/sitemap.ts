import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { KITS } from "@/lib/kits";
import { CATEGORIES } from "@/lib/categories";
import { getAllProducts } from "@/lib/products";

const BASE = "https://blackboxsupplies.com";

/**
 * Priorities encode the revenue architecture: guides are the engine (0.9),
 * categories and kits route intent (0.8), product pages convert (0.6).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/kits`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/finds`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/gear`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/newsletter`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/disclosure`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const guides: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const kits: MetadataRoute.Sitemap = KITS.map((k) => ({
    url: `${BASE}/kits/${k.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categories: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${BASE}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const products: MetadataRoute.Sitemap = getAllProducts().map((p) => ({
    url: `${BASE}/products/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...core, ...guides, ...kits, ...categories, ...products];
}
