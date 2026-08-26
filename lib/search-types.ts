/**
 * Search TYPES and pure scoring - deliberately imports no content.
 *
 * ⛔ WHY THIS SPLIT EXISTS. lib/search-index.ts builds the index by importing every product,
 * guide, article and comparison guide. components/site-search.tsx is a "use client" component and
 * it sits in the header on EVERY page, so importing that builder shipped the entire content
 * library to the browser. Measured on the built site: the largest client chunk was 969 KB and
 * contained affiliate URLs, product editorial fields, product names AND full article bodies -
 * downloaded by every visitor, on a phone, to render pages that were already server-rendered.
 *
 * The index itself is small (title, subtitle, href, image, haystack, weight). Only its
 * CONSTRUCTION is expensive to import. So the client now fetches the finished index from a static
 * route and scores it with these pure functions.
 */

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

/** Identical ranking to the previous searchItems(), just taking the index as an argument. */
export function scoreItems(index: SearchItem[], q: string, limit = 8): SearchItem[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  const tokens = query.split(/\s+/).filter(Boolean);
  const scored: { it: SearchItem; score: number }[] = [];
  for (const it of index) {
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

export function pickBestSellers(index: SearchItem[], n = 4): SearchItem[] {
  return index.filter((i) => i.kind === "product" && i.image).slice(0, n);
}
