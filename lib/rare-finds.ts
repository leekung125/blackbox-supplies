import rareFindsData from "@/data/rare-finds.json";

/**
 * RARE FINDS — the curiosity layer. Weirdly-useful, specific Amazon products people don't
 * already own or know to search for. This is what carries the homepage / finds / links /
 * social (traffic + clicks = link gravity). The commodity "Basics" (site/data/products.json)
 * stay for guides + kits (trust + completeness).
 */
export type FindTier = "hero" | "launch" | "site";

export interface RareFind {
  id: string;
  name: string;
  productType: string;
  category: string;
  tier: FindTier;
  amazonAsin: string;
  amazonUrl: string;
  /** Affiliate URL — EMPTY until Lee adds one. Never fabricated. */
  affiliateUrl: string;
  /** source-ready (real Amazon link) | needs-review (search URL until ASIN confirmed) */
  linkStatus: string;
  /** Approximate street price band, e.g. "$15–$22". Always treated as approximate. */
  priceBand: string;
  /** The annoying everyday problem it solves (one line). */
  problem: string;
  /** Why people don't already know it exists. */
  whyUnknown: string;
  /** The curiosity hook — why click our link instead of searching. */
  whyClick: string;
  /** What to check before buying (the honest caveat, reframed as buying advice). */
  whatToCheck: string;
  /** The short-form video hook / demo angle. */
  videoAngle: string;
  /** List slugs this find appears in (see FIND_LISTS). */
  lists: string[];
  priority: number;
  /** Generated product image path under /public, if any. */
  image?: string;
}

export interface FindList {
  slug: string;
  title: string;
  eyebrow: string;
  dek: string;
}

/** The 7 rare-finds list pages. */
export const FIND_LISTS: FindList[] = [
  { slug: "weirdly-useful", eyebrow: "The list", title: "Things Worth Knowing About", dek: "Our running list of genuinely useful things — the specific, well-made products that quietly solve a problem most people just live with." },
  { slug: "under-25", eyebrow: "Under $25", title: "Useful Things Under $25", dek: "Small, well-chosen, and under twenty-five dollars — the inexpensive ones that earn their keep." },
  { slug: "clever-car", eyebrow: "For the car", title: "Worth Keeping in the Car", dek: "The specific car gear that quietly fixes the annoyances most drivers have just been living with." },
  { slug: "fix-annoying-problems", eyebrow: "Small fixes", title: "Small Fixes for Everyday Annoyances", dek: "Inexpensive things that quietly end a daily annoyance you'd stopped noticing." },
  { slug: "travel", eyebrow: "For travel", title: "Worth Packing", dek: "The specific travel gear that earns its space in the bag." },
  { slug: "kitchen-cheat-codes", eyebrow: "In the kitchen", title: "Clever Kitchen Tools", dek: "Well-chosen kitchen tools that make an annoying task quietly easier." },
  { slug: "home-tiny-problems", eyebrow: "Around the house", title: "Small Fixes for the House", dek: "The small, well-chosen fixes for the little household problems that add up." },
];

export const rareFinds: RareFind[] = rareFindsData as unknown as RareFind[];

export function getAllRareFinds(): RareFind[] {
  return [...rareFinds].sort((a, b) => b.priority - a.priority);
}

export function getRareFindById(id: string): RareFind | undefined {
  return rareFinds.find((f) => f.id === id);
}

export function getFindsByTier(tier: FindTier): RareFind[] {
  return getAllRareFinds().filter((f) => f.tier === tier);
}

export function getHeroFinds(): RareFind[] {
  return getFindsByTier("hero");
}

/** Hero + launch finds, hero first — the "featured" set for home/links. */
export function getFeaturedFinds(limit?: number): RareFind[] {
  const order: Record<FindTier, number> = { hero: 0, launch: 1, site: 2 };
  const sorted = [...rareFinds].sort((a, b) => order[a.tier] - order[b.tier] || b.priority - a.priority);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getFindsByList(slug: string): RareFind[] {
  return getAllRareFinds().filter((f) => f.lists.includes(slug));
}

export function getListBySlug(slug: string): FindList | undefined {
  return FIND_LISTS.find((l) => l.slug === slug);
}

export function getFindLists(): FindList[] {
  return FIND_LISTS;
}

/** Outbound: affiliate link once it exists, else the Amazon product page. Never fabricated. */
export function getFindOutbound(f: RareFind): { href: string; isAffiliate: boolean } {
  const aff = f.affiliateUrl?.trim();
  if (aff) return { href: aff, isAffiliate: true };
  return { href: f.amazonUrl, isAffiliate: false };
}
