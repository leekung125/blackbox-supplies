import heatData from "@/data/heat-products.json";
import usefulData from "@/data/useful-products.json";
import type { Product } from "@/lib/products";

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

const HEAT = heatData as Row[];
const USEFUL = usefulData as Row[];

export type Pick = { id: string; cat: "heat" | "useful"; label?: string };
export type ResolvedPick = Row & { cat: "heat" | "useful"; label?: string };

/** Resolve a guide's affiliate picks (id + catalog) to full product rows for rendering buy CTAs. */
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
    const src = pk.cat === "heat" ? HEAT : USEFUL;
    const p = src.find((x) => x.id === pk.id);
    if (p) out.push({ ...p, cat: pk.cat, label: pk.label });
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
