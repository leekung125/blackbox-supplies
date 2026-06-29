import productsData from "@/data/products.json";

/** The four tight product categories Blackbox Supply carries. */
export type Category = "Power" | "Car" | "Light" | "Carry";

/**
 * A single catalog product. Mirrors the fields in `data/products.json`.
 * This is an affiliate CATALOG: products link OUT to retailers/sources.
 * There is no cart, no checkout, no inventory.
 */
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  subcategory: string;
  /** Public research/source URL (review roundup or brand page). */
  sourceUrl: string;
  /** Affiliate URL — EMPTY until a real one is added. Never fabricate. */
  affiliateUrl: string;
  /** Approximate market price, e.g. "$20–$50". Always treated as approximate. */
  priceRange: string;
  /** Whether we personally tested it. Currently false for everything. */
  tested: boolean;
  verified: boolean;
  problemSolved: string;
  failureMoment: string;
  bestFor: string;
  keyFeatures: string[];
  /** Honest trade-offs. Always surfaced. */
  cons: string[];
  /** The only marketing claims allowed to appear. */
  allowedClaims: string[];
  /** Claims that must NEVER be rendered. Used as a compliance guard only. */
  forbiddenClaims: string[];
  visualAngle: string;
  videoHook: string;
  caption: string;
  status: string;
  disclosureRequired: boolean;
  /** Campaign id this product is live in (e.g. "001"); empty/undefined otherwise. */
  campaign?: string;
  /** Role within the campaign: lead | hero | support. */
  campaignUse?: string;
}

/** All products, loaded from the local JSON at build time (server-side). */
export const products: Product[] = productsData as unknown as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

const USE_RANK: Record<string, number> = { lead: 0, hero: 1, support: 2 };

/**
 * Home-page featured set = the Campaign 001 selection installed by the Scout,
 * ordered lead → hero → support. Falls back to a spread across the four fields
 * if no campaign is installed yet.
 */
export function getFeaturedProducts(): Product[] {
  const campaign = products
    .filter((p) => p.campaign === "001")
    .sort(
      (a, b) =>
        (USE_RANK[a.campaignUse ?? ""] ?? 9) - (USE_RANK[b.campaignUse ?? ""] ?? 9)
    );
  if (campaign.length) return campaign;

  const seen = new Set<string>();
  return products.filter((p) =>
    seen.has(p.category) ? false : (seen.add(p.category), true)
  );
}

/**
 * Resolve the single outbound destination for a product.
 * Rule: use `affiliateUrl` if present, otherwise fall back to `sourceUrl`.
 * Returns whether the resolved link is a monetized affiliate link so the UI
 * can show the affiliate disclosure ONLY when one actually exists.
 */
export function getOutboundLink(p: Product): {
  href: string;
  isAffiliate: boolean;
} {
  const affiliate = p.affiliateUrl?.trim();
  if (affiliate) {
    return { href: affiliate, isAffiliate: true };
  }
  return { href: p.sourceUrl, isAffiliate: false };
}

/**
 * The `rel` attribute for an outbound link.
 * Affiliate (paid) links get `sponsored`; all outbound links get
 * `nofollow noopener noreferrer` for safety and FTC/search hygiene.
 */
export function outboundRel(isAffiliate: boolean): string {
  return isAffiliate
    ? "sponsored nofollow noopener noreferrer"
    : "nofollow noopener noreferrer";
}
