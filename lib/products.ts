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

/** Curated featured set for the home page (a spread across all four categories). */
const FEATURED_IDS: string[] = [
  "power-bank-compact-10k",
  "car-jump-starter-lithium",
  "light-edc-flashlight",
  "carry-bt-tracker",
  "power-station-300wh",
  "car-dashcam-front",
];

export function getFeaturedProducts(): Product[] {
  const byId = new Map(products.map((p) => [p.id, p]));
  return FEATURED_IDS.map((id) => byId.get(id)).filter(
    (p): p is Product => Boolean(p)
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
