import type { CategoryMeta, ComparableProduct } from "@/lib/comparison-schema";
import type { SortOption } from "@/components/comparison-board";
import { PORTABLE_AC_META } from "@/lib/comparison-schema";
import { PORTABLE_AC_PRODUCTS } from "@/lib/comparison-portable-ac";

/**
 * COMPARISON GUIDES — the BlackBox V2 interactive guides.
 *
 * A comparison guide is a real magazine buying guide whose centre of gravity is a live,
 * sortable side-by-side of ~10 real products (the <ComparisonBoard/>). The editorial shell
 * around it (short version, who it's for, what to check, mistakes, tradeoffs) is what makes
 * it trustworthy — the receipts a faceless brand needs. All prose is grounded in the product
 * data + published specs; never fabricated.
 *
 * These render through the same /guides/[slug] route as legacy guides, via a branch.
 */
export interface CheckItem {
  label: string;
  detail: string;
}

export interface ComparisonGuide {
  slug: string;
  title: string;
  dek: string;
  /** Human category label for breadcrumb/eyebrow. */
  categoryLabel: string;
  updated: string;
  readMinutes: number;
  heroImage?: string;
  /** 1–2 sentences: what most people should just buy, and the one number that decides it. */
  quickAnswer: string;
  whoFor: string[];
  buyFirst: string;
  checkBeforeBuying: CheckItem[];
  mistakes: string[];
  tradeoffs: string;
  /** The real, typed, comparable products (editorial rank = array order). */
  products: ComparableProduct[];
  meta: CategoryMeta;
  /** Curated sort knobs — few, obvious, delightful (baby-simple front). */
  sorts: SortOption[];
  relatedGuides: string[];
}

const PORTABLE_AC: ComparisonGuide = {
  slug: "best-portable-air-conditioners",
  title: "The Best Portable Air Conditioners",
  dek: "The BTU on the box is a lie. What actually cools your room is the SACC number — often half the headline. Here's every unit compared by the honest spec, side by side.",
  categoryLabel: "Cooling",
  updated: "July 2026",
  readMinutes: 9,
  heroImage: "/home/cool.jpg",
  quickAnswer:
    "Ignore the giant “14,000 BTU” on the box and compare units by SACC — the DOE's honest, tested cooling number. For a real medium-to-large room, a dual-hose inverter like the Midea Duo (12,000 SACC) cools fastest for the watts. Want the quietest bedroom unit? The LG dual-inverter. Tight budget or a small room? A single-hose unit is fine — just size down your expectations, not just your wallet.",
  whoFor: [
    "Renters and anyone who can't install a window or central unit",
    "One hot room — a top-floor bedroom, a west-facing office, a garage gym",
    "People who got burned by a cheap unit that couldn't keep up with a real heatwave",
  ],
  buyFirst:
    "Buy on SACC, not the ASHRAE headline. Roughly, you want about 20 SACC BTU per square foot — so a genuinely 400 sq ft room needs ~8,000 SACC, not the “12,000 BTU” a box promises. Then decide single- vs dual-hose: dual-hose cools a full room faster and more efficiently, single-hose is cheaper and simpler for small spaces. Everything else — smart app, heat mode, looks — is a tiebreaker.",
  checkBeforeBuying: [
    {
      label: "SACC, not ASHRAE",
      detail:
        "The huge number on the box is the old ASHRAE rating. SACC (Seasonally Adjusted Cooling Capacity) is the DOE's tested, real-world figure and it's often 30–50% lower. A “14,000 BTU” unit can be 8,000 SACC. Compare units by SACC or you're comparing marketing to marketing.",
    },
    {
      label: "Single-hose vs. dual-hose",
      detail:
        "Single-hose units create negative pressure — they push conditioned air out and pull warm, unconditioned air back into the room, which caps how cold they get. Dual-hose units draw outside air for cooling the compressor, so they cool faster and more efficiently. For a big or hot room, pay for dual-hose.",
    },
    {
      label: "Size to the room (and the heat)",
      detail:
        "About 20 SACC BTU per sq ft is the rule of thumb; add margin for sun, top floors, and kitchens. Undersizing is the #1 regret — a unit that runs flat-out and never catches up in a heatwave. It's better to be slightly over than under.",
    },
    {
      label: "Noise, honestly",
      detail:
        "Every portable AC gets loud on high — the compressor and fan are in the room with you. The dB figures here are the quietest published (low/sleep) setting. If it's for a bedroom, weight the inverter units: they modulate instead of slamming on and off all night.",
    },
  ],
  mistakes: [
    "Buying to the ASHRAE box number and ending up two sizes undersized for the actual room.",
    "Putting a single-hose bargain unit in a big sunny living room and blaming the heatwave when it can't keep up.",
    "Ignoring the window kit and hose length — a short hose or an odd window can make a great unit unusable where you need it.",
    "Assuming “portable” means light. Most real units are 70–85 lb; check the weight if you'll move it between floors.",
  ],
  tradeoffs:
    "Cooling power, quiet, efficiency, and price all pull against each other. Dual-hose inverters (Midea Duo, Whynter NEX) cool hard and sip power but cost the most and weigh the most. Single-hose units (LG, Frigidaire, budget picks) are cheaper, lighter on features, and fine for smaller rooms — you're trading peak cooling for price. The battery-capable EcoFlow is a different animal entirely: a spot-cooler for tents and vans, not a room unit. Match the machine to the room, not to the biggest number.",
  products: PORTABLE_AC_PRODUCTS,
  meta: PORTABLE_AC_META,
  sorts: [
    { id: "rank", label: "Top pick", crown: "Editor's choice" },
    { id: "cooling", label: "Most cooling", crown: "Most cooling power", key: "saccBtu", dir: "desc" },
    { id: "quiet", label: "Quietest", crown: "Quietest", key: "noiseDb", dir: "asc" },
    { id: "price", label: "Best price", crown: "Lowest price", key: "price", dir: "asc" },
  ],
  relatedGuides: [],
};

export const COMPARISON_GUIDES: ComparisonGuide[] = [PORTABLE_AC];

export const COMPARISON_GUIDE_SLUGS = COMPARISON_GUIDES.map((g) => g.slug);

export function getComparisonGuideBySlug(slug: string): ComparisonGuide | undefined {
  return COMPARISON_GUIDES.find((g) => g.slug === slug);
}
