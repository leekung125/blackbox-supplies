import type { Category } from "@/lib/products";

/**
 * Buying-guide content model. Guides are the revenue engine: useful, honest editorial that ends in
 * real, affiliate-linked product picks. Language is research-based — never "we tested" (we haven't),
 * never invented reviews or numbers. Picks reference real product slugs in the catalog.
 *
 * NOTE: four topics (jump starters, tire inflators, dash cams, portable power) were consolidated into
 * the interactive comparison guides (lib/comparison-*.ts, "-compared" slugs), which are now canonical.
 * Old /guides/<legacy> paths permanently redirect to the -compared counterpart (see next.config.ts).
 */
export interface GuidePick {
  productId: string;
  /** Role label, e.g. "Best overall", "Best value", "Premium pick". */
  role: string;
  /** One specific, honest reason this earns the slot. */
  why: string;
}

export interface CheckItem {
  label: string;
  detail: string;
}

export interface Comparison {
  columns: string[];
  rows: string[][];
}

export interface Guide {
  slug: string;
  title: string;
  dek: string;
  category: Category;
  readMinutes: number;
  updated: string;
  heroImage?: string;
  /** 1–2 sentences: what most people should just buy. */
  quickAnswer: string;
  whoFor: string[];
  buyFirst: string;
  checkBeforeBuying: CheckItem[];
  mistakes: string[];
  picks: GuidePick[];
  comparison?: Comparison;
  tradeoffs: string;
  relatedGuides: string[];
  relatedKit?: string;
}

export const GUIDES: Guide[] = [
  // ────────────────────────────────────────────────────── ROADSIDE EMERGENCY KIT
  {
    slug: "roadside-emergency-kit",
    heroImage: "/home/car.jpg",
    title: "The Roadside Emergency Kit: What Belongs in Your Trunk",
    dek: "You don't need a hundred-piece kit where ninety pieces are filler. You need the specific gear that covers the failures that actually happen. Here's the list.",
    category: "Roadside Safety",
    readMinutes: 8,
    updated: "July 2026",
    quickAnswer:
      "Cover the common failures in order: a jump starter for a dead battery, an inflator for a low tire, an escape tool within reach, and visibility gear (flares, triangles) so you're seen. An all-in-one kit like the Lifeline is a fine foundation — then upgrade the cables and inflator, which are the weak links in every bundle.",
    whoFor: [
      "New and young drivers building a first kit from nothing",
      "Parents outfitting a teen's first car",
      "Anyone who'd rather not wait two hours on a shoulder for roadside assistance",
    ],
    buyFirst:
      "If your trunk is empty, buy an all-in-one roadside kit first for broad coverage, then add a real jump starter and inflator — the two items that do the heavy lifting and that every bundled kit skimps on.",
    checkBeforeBuying: [
      { label: "Build around real failures", detail: "Dead battery, low tire, dark shoulder, being seen. Buy for those first; skip the 100-piece kits where most pieces are filler you'll never touch." },
      { label: "Escape tool, within reach", detail: "A seatbelt cutter and window punch only works if you can grab it while belted. Mount it — a tool in the trunk during a submersion does nothing. Note it's for tempered side glass, not laminated windshields." },
      { label: "Flares vs. triangles", detail: "LED flares are reusable and safe near fuel; reflective triangles need no batteries. Use both — visibility is the cheapest safety you can buy." },
      { label: "Keep the powered gear charged", detail: "Jump starter, inflator, and work light all need topping up a few times a year, or they're dead weight when it counts." },
    ],
    mistakes: [
      "Buying a giant bargain kit and assuming the thin cables and mini-compressor inside are enough.",
      "Keeping the escape tool in the glovebox or trunk where you can't reach it in a crash.",
      "No light — changing a tire on a shoulder at night with a phone in your teeth is miserable and unsafe.",
    ],
    picks: [
      { productId: "lifeline-4388aaa-excursion-road-76", role: "Start here (all-in-one)", why: "The AAA co-developed kit bundles cables, a compressor, a light, and first-aid basics in one case — the fastest way to go from an empty trunk to broad coverage." },
      { productId: "resqme-the-original-car-escape", role: "Keep within reach", why: "A keychain seatbelt cutter and window breaker that turns a trapped-in-the-car emergency into a five-second exit. Made in the USA, originally issued to first responders." },
      { productId: "energizer-1-gauge-800a-heavy", role: "Real jumper cables", why: "Thick 1-gauge, 800A, 25-foot cables that actually crank a truck — the heavy upgrade over the thin cables in every bundled kit." },
      { productId: "wagan-fred-flashing-roadside-emergency", role: "So they see you", why: "Reusable magnetic LED flares with no fire risk near fuel — set them behind a breakdown at night and be seen before you're hit." },
      { productId: "first-alert-auto5-car-fire", role: "Fire extinguisher", why: "A UL-rated 5-B:C extinguisher with a mounting bracket — one of the few items that protects both the car and the people in it." },
      { productId: "boulder-tools-heavy-duty-tire", role: "Fix a puncture", why: "A pro tubeless plug kit that actually repairs a nail-in-the-tread at the roadside so you can reinflate and drive to a shop instead of waiting for a tow." },
    ],
    comparison: {
      columns: ["Item", "What it handles", "Priority", "Approx. price"],
      rows: [
        ["All-in-one kit", "Broad coverage in one case", "Start here", "$50–$75"],
        ["Escape tool", "Trapped after a crash", "Essential", "$10–$15"],
        ["Heavy jumper cables", "Dead battery (with a 2nd car)", "High", "$45–$70"],
        ["LED flares", "Being seen at night", "High", "$30–$45"],
        ["Tire plug kit", "Nail / puncture", "Medium", "$25–$35"],
      ],
    },
    tradeoffs:
      "An all-in-one kit gets you covered fast but skimps on the cables and compressor; buying the heavy-duty versions of those separately is what makes the kit actually reliable. Everything here is cheap relative to a single tow or a night stranded — the real cost is not having it when the shoulder is dark and cold.",
    relatedGuides: ["best-jump-starters-compared", "best-tire-inflators-compared", "car-gear-worth-keeping-in-your-trunk"],
    relatedKit: "roadside-kit",
  },

  // ─────────────────────────────────────────── CAR GEAR WORTH KEEPING IN TRUNK
  {
    slug: "car-gear-worth-keeping-in-your-trunk",
    heroImage: "/guides/hero-jump-starters.png",
    title: "Car Gear Worth Keeping in Your Trunk",
    dek: "Beyond the emergencies, a handful of quality upgrades quietly make every drive better. These are the ones that earn their permanent spot in the car.",
    category: "Car Utility",
    readMinutes: 7,
    updated: "July 2026",
    quickAnswer:
      "A few quality items pay for themselves in saved hassle: a collapsible trunk organizer so gear stops sliding, a smart battery maintainer so your car always starts, a real cordless car vacuum, and a high-wattage USB-C car charger. Buy the good version once — the cheap ones are the ones you replace.",
    whoFor: [
      "New car owners setting up the trunk right the first time",
      "Commuters and rideshare drivers who live in their car",
      "Anyone tired of a chaotic trunk, a dead cabin battery, or crumbs everywhere",
    ],
    buyFirst:
      "Start with a collapsible trunk organizer — it's cheap, it makes everything else you carry usable, and it folds flat when you need the space. From there, add the battery maintainer and a real car charger.",
    checkBeforeBuying: [
      { label: "Buy quality once", detail: "Under $50 is where no-name quality varies most. A good organizer, charger, or vacuum outlasts three cheap ones — spend on the things that have to keep working." },
      { label: "Match the charger to your devices", detail: "A 100W+ USB-C car charger fast-charges a laptop and phone at once; a basic one trickles. Check the single-port wattage, not just the total." },
      { label: "Maintainer vs. charger", detail: "A smart maintainer (like a NOCO GENIUS) keeps a battery healthy and can recover a dead one — worth it for a daily driver, a stored car, or a motorcycle." },
      { label: "Fit and mounting", detail: "Vent mounts, headrest mounts, and organizers all depend on your specific car — check clearance, headrest posts, and trunk shape before buying." },
    ],
    mistakes: [
      "Buying the cheapest vacuum or charger and replacing it within a year.",
      "Skipping a battery maintainer, then getting stranded by a slow parasitic drain.",
      "Cluttering the car with gadgets you'll never use because they were 'only $15'.",
    ],
    picks: [
      { productId: "drive-car-trunk-organizer", role: "Best organizer", why: "Stiff reinforced walls that hold shape, a waterproof lining, and straps that anchor it so it stops sliding — then folds flat. The benchmark collapsible organizer." },
      { productId: "noco-genius5-smart-battery-charger", role: "Best battery maintainer", why: "A 5A smart charger that actually recharges a dead battery overnight yet is safe to leave connected — auto-detects chemistry and revives deeply drained batteries." },
      { productId: "fanttik-slim-v8-apex-cordless", role: "Best car vacuum", why: "A brushless cordless vacuum with real 19,000Pa suction and a slim body that reaches between seats and vents — no cord, no 12V outlet needed." },
      { productId: "baseus-160w-usb-c-car", role: "Best car charger", why: "A genuine 100W from a single USB-C port fast-charges a MacBook and a phone at once — real premium wattage in a compact 12V charger." },
      { productId: "drop-stop-car-seat-gap", role: "Best cabin fix", why: "The original patented seat-gap filler that stops phones, keys, and coins from vanishing into the seat crevice — a $25 fix for a daily annoyance." },
      { productId: "chemical-guys-car-wash-kit", role: "Best detailing kit", why: "The enthusiast-default wash kit — a foam blaster, buckets, towels, and seven care products in one box, roughly $200 of product for well under $100." },
    ],
    comparison: {
      columns: ["Item", "What it does", "Best for", "Approx. price"],
      rows: [
        ["Trunk organizer", "Stops gear sliding, folds flat", "Everyone", "$35–$45"],
        ["Battery maintainer", "Keeps the car starting", "Daily & stored cars", "$50–$70"],
        ["Cordless car vacuum", "Crumbs, sand, pet hair", "Families & pets", "$60–$100"],
        ["160W car charger", "Fast-charge laptop + phone", "Commuters", "$45–$60"],
        ["Seat-gap filler", "No more dropped phones", "Everyone", "$25–$30"],
      ],
    },
    tradeoffs:
      "None of this is dramatic — it's the quiet layer of gear that removes small daily frictions. The rule is simple: spend on the things that have to work (charger, maintainer, vacuum) and don't let a low price talk you into clutter you'll never use. Buy the good version of a few things, not the cheap version of many.",
    relatedGuides: ["best-dash-cams-compared", "best-power-stations-compared", "roadside-emergency-kit"],
    relatedKit: "road-trip-kit",
  },
];

const BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));

export function getAllGuides(): Guide[] {
  return GUIDES;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return BY_SLUG.get(slug);
}

export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);

/** Guides that feature a given product (for product-page cross-linking). */
export function getGuidesForProduct(productId: string): Guide[] {
  return GUIDES.filter((g) => g.picks.some((p) => p.productId === productId));
}
