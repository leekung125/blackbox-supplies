import type { Product } from "@/lib/products";

/**
 * Outbound-link helpers, in a module that imports NO DATA.
 *
 * ⛔ WHY THEY LIVE HERE AND NOT IN lib/products.ts. That module begins with
 *     import productsData from "@/data/products.json";
 *     import heatData from "@/data/heat-products.json";
 *     import usefulData from "@/data/useful-products.json";
 * so ANY client component that imports a VALUE from it pulls all three catalogues into the browser
 * bundle. Four "use client" components did exactly that - outbound-link, sticky-cta, buy-cta and
 * kit-builder - each wanting only these two tiny pure functions.
 *
 * The cost, measured on the built site: the largest client chunk was 969 KB and contained affiliate
 * URLs, product editorial fields, product names and article bodies - the whole content library
 * shipped to a phone that renders it all server-side anyway. A guide page transferred 724 KB of
 * gzipped JS.
 *
 * `import type` is erased at compile time, so importing the Product TYPE from lib/products costs
 * nothing at runtime. Only value imports pull the data, which is why these two moved out.
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
