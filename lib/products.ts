import productsData from "@/data/products.json";
import heatData from "@/data/heat-products.json";
import usefulData from "@/data/useful-products.json";

/** The car catalog's tight categories, plus any cooling/useful category string (broad catalog). */
export type Category =
  | "Jump Starters"
  | "Tire Inflators"
  | "Dash Cams"
  | "Power & Charging"
  | "Roadside Safety"
  | "Car Utility"
  | (string & {});

/**
 * The specific, real Amazon product this catalog slot maps to.
 * ASINs come from live Amazon /dp/ pages — never fabricated.
 */
export interface AmazonMatch {
  recommendedProduct: string;
  brand: string;
  model: string;
  amazonAsin: string;
  amazonUrl: string;
  matchStatus: string;
  matchConfidence: string;
  priceBand: string;
  verdict: string;
  whatToCheck: string;
  tradeoffs: string;
  leeReviewNeeded: boolean;
  alt: string;
}

/**
 * A single catalog product. Mirrors `data/products.json`.
 * This is an affiliate CATALOG: products link OUT to Amazon with the
 * blackboxsuppl-20 Associate tag. There is no cart, no checkout, no inventory.
 */
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  subcategory: string;
  /** Plain Amazon product URL (no tag) — the source of truth for the ASIN. */
  sourceUrl: string;
  /** Monetized affiliate URL with the blackboxsuppl-20 tag. */
  affiliateUrl: string;
  /** Approximate market price, e.g. "$80–$100". Always treated as approximate. */
  priceRange: string;
  /** Whether we personally tested it. False for everything — never claim otherwise. */
  tested: boolean;
  verified: boolean;
  /** One-line "what it is". */
  problemSolved: string;
  failureMoment: string;
  bestFor: string;
  keyFeatures: string[];
  /** Honest trade-offs / what to know. Always surfaced. */
  cons: string[];
  allowedClaims: string[];
  forbiddenClaims: string[];
  visualAngle: string;
  videoHook: string;
  caption: string;
  status: string;
  disclosureRequired: boolean;
  /** Real product image (Amazon CDN) — falls back to a code-drawn spec tile when absent. */
  image?: string;
  linkStatus?: string;
  /** hero | top | support — selection + display weighting. */
  tier: "hero" | "top" | "support";
  priority: number;
  /** The buying-guide this product belongs to (title + slug). */
  guide: string;
  guideSlug: string;
  /** The single spec that matters most. */
  keySpec: string;
  /** Short verdict / why it earns the pick. */
  verdict: string;
  whyItMatters: string;
  buyingNotes: string;
  homepageEligible: boolean;
  linksEligible: boolean;
  amazon?: AmazonMatch;
}

/** Thin catalogs (cooling/useful) carry less data than the car catalog; adapt them to the full
 *  Product shape with safe fallbacks so every advertised item gets its own real product page. */
function adaptThin(t: Record<string, unknown>): Product {
  const affiliate = (t.affiliateUrl as string) ?? "";
  const blurb = (t.blurb as string) ?? "";
  return {
    id: t.id as string,
    name: t.name as string,
    brand: (t.brand as string) ?? "",
    category: (t.category as Category) ?? "Car Utility",
    subcategory: "",
    sourceUrl: affiliate.split("?")[0],
    affiliateUrl: affiliate,
    priceRange: (t.priceRange as string) ?? "",
    tested: false,
    verified: true,
    problemSolved: blurb,
    failureMoment: "",
    bestFor: "",
    keyFeatures: [],
    cons: [],
    allowedClaims: [],
    forbiddenClaims: [],
    visualAngle: "",
    videoHook: "",
    caption: blurb,
    status: "live",
    disclosureRequired: true,
    image: t.image as string | undefined,
    linkStatus: "live",
    tier: "support",
    priority: 0,
    guide: "",
    guideSlug: (t.guideSlug as string) ?? "",
    keySpec: (t.keySpec as string) ?? "",
    verdict: "",
    whyItMatters: "",
    buyingNotes: "",
    homepageEligible: false,
    linksEligible: true,
  };
}

const carProducts = productsData as unknown as Product[];
const thinProducts = [
  ...(heatData as Record<string, unknown>[]),
  ...(usefulData as Record<string, unknown>[]),
].map(adaptThin);
// Merge all catalogs; the rich car record wins on any id collision.
const _byId = new Map<string, Product>();
for (const p of [...thinProducts, ...carProducts]) _byId.set(p.id, p);

export const products: Product[] = Array.from(_byId.values());

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products
    .filter((p) => p.category === category)
    .sort((a, b) => b.priority - a.priority);
}

export function getProductsByGuide(guideSlug: string): Product[] {
  return products
    .filter((p) => p.guideSlug === guideSlug)
    .sort((a, b) => b.priority - a.priority);
}

/** Home-page hero set = the 5 hero-tier products, one per guide, highest priority first. */
export function getFeaturedProducts(): Product[] {
  return products
    .filter((p) => p.tier === "hero")
    .sort((a, b) => b.priority - a.priority);
}

/** The launch catalog — top N by priority. */
export function getTopProducts(n = 20): Product[] {
  return [...products].sort((a, b) => b.priority - a.priority).slice(0, n);
}

/** Products eligible for the social /links funnel. */
export function getLinksProducts(): Product[] {
  return products
    .filter((p) => p.linksEligible)
    .sort((a, b) => b.priority - a.priority);
}

/** Related picks for a product page: same category, highest priority, excluding self. */
export function getRelatedProducts(p: Product, n = 3): Product[] {
  return products
    .filter((x) => x.id !== p.id && x.category === p.category)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, n);
}

/**
 * Resolve the single outbound destination for a product.
 * Rule: use `affiliateUrl` if present, else the plain Amazon URL.
 */
export function getOutboundLink(p: Product): { href: string; isAffiliate: boolean } {
  const affiliate = p.affiliateUrl?.trim();
  if (affiliate) return { href: affiliate, isAffiliate: true };
  return { href: p.amazon?.amazonUrl || p.sourceUrl, isAffiliate: false };
}

/** The `rel` attribute for an outbound link — affiliate links get `sponsored`. */
export function outboundRel(isAffiliate: boolean): string {
  return isAffiliate
    ? "sponsored nofollow noopener noreferrer"
    : "nofollow noopener noreferrer";
}
