/**
 * SITE SEARCH — a $0 client-side index over every buyable/reachable thing on the site.
 * The #1 findability fix: a known-item query ("NOCO GB40") or a symptom query
 * ("car overheating") must land the shopper on a real page, never a dead end.
 *
 * Built once from local JSON (products) + guides + articles + categories. No backend.
 */
import { getCoreProducts } from "@/lib/products";
import { CATEGORIES } from "@/lib/categories";
import { getAllGuides } from "@/lib/guides";
import { getAllArticles } from "@/lib/articles";
import { COMPARISON_GUIDES } from "@/lib/comparison-guides";

export type SearchKind = "product" | "guide" | "category";

export interface SearchItem {
  kind: SearchKind;
  title: string;
  subtitle: string;
  href: string;
  image?: string;
  /** lowercased searchable haystack */
  hay: string;
  /** base ranking weight (guides/comparisons surface above raw products) */
  weight: number;
}

let _index: SearchItem[] | null = null;

export function getSearchIndex(): SearchItem[] {
  if (_index) return _index;
  const items: SearchItem[] = [];
  const seen = new Set<string>();
  const push = (it: SearchItem) => {
    if (seen.has(it.href)) return;
    seen.add(it.href);
    items.push(it);
  };

  // Comparison guides first (best money pages)
  for (const g of COMPARISON_GUIDES) {
    push({
      kind: "guide", title: g.title, subtitle: `${g.categoryLabel} · compare ${g.products.length}`,
      href: `/guides/${g.slug}`, image: g.heroImage,
      hay: `${g.title} ${g.categoryLabel} ${g.dek} compare best`.toLowerCase(), weight: 5,
    });
  }
  // Buying guides + articles
  for (const g of getAllGuides()) {
    push({
      kind: "guide", title: g.title, subtitle: `${g.category} · guide`,
      href: `/guides/${g.slug}`, image: g.heroImage,
      hay: `${g.title} ${g.category} ${g.dek} best guide`.toLowerCase(), weight: 4,
    });
  }
  for (const a of getAllArticles()) {
    push({
      kind: "guide", title: a.title, subtitle: `${a.category} · guide`,
      href: `/guides/${a.slug}`, image: a.heroImage,
      hay: `${a.title} ${a.category} ${a.dek} best guide`.toLowerCase(), weight: 4,
    });
  }
  // Every product
  for (const p of getCoreProducts()) {
    push({
      kind: "product", title: p.name, subtitle: String(p.category),
      href: `/products/${p.id}`, image: p.image,
      hay: `${p.name} ${p.brand ?? ""} ${p.category} ${p.subcategory ?? ""} ${p.problemSolved ?? ""} ${p.keySpec ?? ""} ${p.bestFor ?? ""}`.toLowerCase(),
      weight: 2,
    });
  }
  // Category hubs
  for (const c of CATEGORIES) {
    push({
      kind: "category", title: c.name, subtitle: "Shop the category",
      href: `/category/${c.slug}`,
      hay: `${c.name} ${c.tagline ?? ""} ${c.blurb ?? ""} shop browse`.toLowerCase(), weight: 3,
    });
  }

  _index = items;
  return items;
}

/** Rank matches for a query. Title hits beat body hits; all-token coverage beats partial. */
export function searchItems(q: string, limit = 8): SearchItem[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  const tokens = query.split(/\s+/).filter(Boolean);
  const scored: { it: SearchItem; score: number }[] = [];
  for (const it of getSearchIndex()) {
    const title = it.title.toLowerCase();
    let score = 0;
    if (title === query) score += 120;
    else if (title.startsWith(query)) score += 70;
    else if (title.includes(query)) score += 45;
    let covered = 0;
    for (const t of tokens) if (it.hay.includes(t)) covered++;
    if (tokens.length && covered === tokens.length) score += 22 + covered * 4;
    else if (covered > 0) score += covered * 3;
    if (score > 0) scored.push({ it, score: score + it.weight });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.it);
}

/** Zero-results fallback — never a dead end. A few featured products to click. */
export function bestSellers(n = 4): SearchItem[] {
  return getSearchIndex().filter((i) => i.kind === "product" && i.image).slice(0, n);
}
