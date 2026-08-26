import { getProductById, type Product } from "@/lib/products";

type Row = {
  id: string;
  name: string;
  brand: string;
  category: string;
  priceRange: string;
  keySpec: string;
  blurb: string;
  image: string;
  affiliateUrl: string;
};

export type Pick = { id: string; cat?: "heat" | "useful"; label?: string };
export type ResolvedPick = Row & { cat: "heat" | "useful"; label?: string };

/** Resolve a guide's affiliate picks to full product rows for rendering buy CTAs.
 *
 * ⛔ THIS USED TO READ ONLY heat-products.json AND useful-products.json, AND THAT SILENTLY KILLED
 * THE BUY BOX ON HALF THE SITE. `Pick.cat` was typed `"heat" | "useful"`, so an article could not
 * even DECLARE a pick for anything in products.json — which is where every power station, dash cam
 * and jump starter lives. 30 of 60 articles therefore rendered no buy box and no sticky bar at all
 * (GuidePicks returns null on an empty array, StickyBuyBar returns null with no href), including
 * the entire $300-$800 power-station and dash-cam cluster. Measured on the live site: one 2,965-word
 * page had 3 outbound links with the first at 63% depth and 990 words of dead air after the last,
 * while a sibling page of the same length and template had 10 CTAs starting at 6% — the only
 * difference being which JSON file its products happened to sit in.
 *
 * getProductById already merges all three catalogs (lib/products.ts), so one lookup covers
 * everything and `cat` is now optional and decorative. */
const STOP = new Set(
  ("the a an of for with and to in portable air conditioner tower fan bladeless oscillating smart inverter cooling gel " +
   "memory foam mattress topper sheet sheets blanket neck mini fridge wireless noise cancelling earbuds performance " +
   "backpack everyday charging station power bank monitor light bar mouse keyboard electric gooseneck kettle blender " +
   "machine sous vide chef knife robot vacuum mop purifier humidifier seat cushion pillow btu inch pro plus set pack " +
   "hepa true dc quiet best top pick budget upgrade classic original ultimate adjustable").split(" ")
);
function nameTokens(s: string): string[] {
  return (s.toLowerCase().match(/[a-z0-9][a-z0-9-]*/g) || []).filter((t) => t.length > 1 && !STOP.has(t));
}

/** Match a comparison-table row's text to one of the guide's picks (brand present + >=2 distinctive tokens). */
export function matchByText(text: string, picks: ResolvedPick[]): ResolvedPick | undefined {
  const tl = " " + text.toLowerCase() + " ";
  let best: ResolvedPick | undefined;
  let bestScore = 1;
  for (const p of picks) {
    if (p.brand && !tl.includes(p.brand.toLowerCase())) continue;
    const overlap = nameTokens(p.name).filter((t) => tl.includes(t)).length;
    if (overlap > bestScore) {
      bestScore = overlap;
      best = p;
    }
  }
  return best;
}

export function resolvePicks(picks?: Pick[]): ResolvedPick[] {
  if (!picks?.length) return [];
  const out: ResolvedPick[] = [];
  for (const pk of picks) {
    const p = getProductById(pk.id);
    // ⛔ Guard on the image, not on the product. GuidePicks renders next/image with a required
    // src and productToPick coerces a missing image to "" — that is a BUILD-TIME crash, not a
    // silent miss, and dynamicParams=false means it takes the whole prerender down.
    if (!p?.image) continue;
    out.push({ ...productToPick(p, pk.label), cat: pk.cat ?? "useful" });
  }
  return out;
}

/**
 * Adapt a full car-catalog `Product` (from products.json via getProductById) into the
 * `ResolvedPick` shape that GuidePicks / StickyBuyBar / matchByText consume. The structured
 * buying guides resolve their picks from the car catalog, not the thin heat/useful catalogs
 * that `resolvePicks` reads — so this bridges the two so both use one buy-CTA path.
 */
export function productToPick(p: Product, label?: string): ResolvedPick {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    priceRange: p.priceRange,
    keySpec: p.keySpec ?? "",
    blurb: p.problemSolved ?? "",
    image: p.image ?? "",
    affiliateUrl: p.affiliateUrl,
    cat: "useful",
    label,
  };
}
