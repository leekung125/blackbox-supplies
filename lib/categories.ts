import type { Category } from "@/lib/products";
import heatData from "@/data/heat-products.json";
import usefulData from "@/data/useful-products.json";

export interface CategoryMeta {
  /** URL slug, e.g. "jump-starters" for /category/jump-starters */
  slug: string;
  /** Display name — matches the `category` field in the product data. */
  name: Category;
  /** Mono lettermark used on placeholder tiles. */
  lettermark: string;
  /** The kit slug most related to this category. */
  kitName: string;
  /** Short line for cards. */
  tagline: string;
  /** One honest sentence describing the category. */
  blurb: string;
  /** Product whose image represents the category on cards. */
  heroProductId: string;
}

const CAR_CATEGORIES: CategoryMeta[] = [
  {
    slug: "jump-starters",
    name: "Jump Starters",
    lettermark: "JMP",
    kitName: "The Roadside Kit",
    tagline: "Start a dead battery yourself.",
    blurb:
      "Lithium jump packs that crank a dead 12V battery with no second car and no waiting on a stranger with cables — the single highest-value thing in any trunk.",
    heroProductId: "noco-boost-gb40-1000a-ultrasafe",
  },
  {
    slug: "tire-inflators",
    name: "Tire Inflators",
    lettermark: "AIR",
    kitName: "The Roadside Kit",
    tagline: "Never chase a gas-station pump.",
    blurb:
      "Cordless compressors that reinflate a low or slow-leaking tire on the shoulder — set the PSI, walk away, and drive to a shop on your own schedule.",
    heroProductId: "astroai-cordless-tire-inflator-160",
  },
  {
    slug: "dash-cams",
    name: "Dash Cams",
    lettermark: "CAM",
    kitName: "The Road Trip Kit",
    tagline: "Proof when it's your word against theirs.",
    blurb:
      "Front, rear, and cabin cameras that record the road and protect you in an insurance dispute, a hit-and-run, or a rideshare shift.",
    heroProductId: "viofo-a229-plus",
  },
  {
    slug: "power",
    name: "Power & Charging",
    lettermark: "PWR",
    kitName: "The Backup Power Kit",
    tagline: "Keep everything running, anywhere.",
    blurb:
      "Portable power stations, high-output banks, car chargers, and inverters for road trips, camping, outages, and the daily commute.",
    heroProductId: "jackery-explorer-1000-v2-portable",
  },
  {
    slug: "roadside",
    name: "Roadside Safety",
    lettermark: "SOS",
    kitName: "The Roadside Kit",
    tagline: "For the breakdown you didn't plan.",
    blurb:
      "Jumper cables, LED flares, escape tools, and the grab-and-go kit that turns a stranding into an inconvenience.",
    heroProductId: "lifeline-4388aaa-excursion-road-76",
  },
  {
    slug: "car-utility",
    name: "Car Utility",
    lettermark: "UTL",
    kitName: "The Road Trip Kit",
    tagline: "The gear a prepared driver keeps ready.",
    blurb:
      "Organizers, chargers, battery tools, mounts, and cabin gear — the quality upgrades that live in the car full-time and quietly earn their place.",
    heroProductId: "drive-car-trunk-organizer",
  },
];

// ── Cooling vertical (the "Beat the Heat" catalog) ───────────────────────────
// Names match the `category` field on the CORE (non-offBrand) heat products so
// each landing page actually populates via getProductsByCategory(meta.name).
const COOLING_CATEGORIES: CategoryMeta[] = [
  {
    slug: "portable-ac",
    name: "Portable AC",
    lettermark: "BTU",
    kitName: "",
    tagline: "Real cooling for the room without one.",
    blurb:
      "Portable and window-free air conditioners that actually pull heat out of a bedroom, office, or garage — sized by BTU to the room, honest about hose setup and noise.",
    heroProductId: "midea-duo-14-000-btu-smart",
  },
  {
    slug: "cooling-fans",
    name: "Cooling Fans",
    lettermark: "FAN",
    kitName: "",
    tagline: "Move real air, quietly.",
    blurb:
      "Tower, bladeless, and misting fans that move enough air to matter without the jet-engine drone — the cheapest way to make a hot room livable before you commit to AC.",
    heroProductId: "shark-turboblade-bladeless-tower-fan-tf202s",
  },
  {
    slug: "personal-cooling",
    name: "Personal Cooling",
    lettermark: "CHL",
    kitName: "",
    tagline: "Cool the person, not the whole room.",
    blurb:
      "Neck fans, handheld misters, and wearable coolers that keep you comfortable on a commute, a walk, or a hot commute — when cooling one body beats cooling four walls.",
    heroProductId: "torras-coolify-2s-neck-air-conditioner",
  },
  {
    slug: "dorm-cooling",
    name: "Dorm Cooling",
    lettermark: "DRM",
    kitName: "",
    tagline: "Beat the heat in a small, shared space.",
    blurb:
      "Mini fridges, compact fans, and cooling gear scaled for a dorm, studio, or single room — small footprint, quiet enough to sleep next to, priced for a tight budget.",
    heroProductId: "midea-whs-121lb1-mini-fridge-3",
  },
];

// ── Useful vertical (the broad practical-gear catalog) ───────────────────────
const USEFUL_CATEGORIES: CategoryMeta[] = [
  {
    slug: "desk-tech",
    name: "Desk & Tech",
    lettermark: "DSK",
    kitName: "",
    tagline: "The upgrades that fix a workspace.",
    blurb:
      "Monitor lights, laptop stands, charging hubs, and cable gear that quietly fix the desk you sit at all day — practical upgrades chosen on merit, not spec-sheet hype.",
    heroProductId: "benq-screenbar-monitor-light-bar",
  },
  {
    slug: "travel-edc",
    name: "Travel & EDC",
    lettermark: "EDC",
    kitName: "",
    tagline: "What earns a spot in your pocket or bag.",
    blurb:
      "Trackers, power banks, multitools, and safety gear that earn their weight in a pocket, bag, or carry-on — the everyday-carry that pays for itself the first time you need it.",
    heroProductId: "apple-airtag-4-pack",
  },
  {
    slug: "problem-solvers",
    name: "Problem Solvers",
    lettermark: "FIX",
    kitName: "",
    tagline: "One gadget for one nagging problem.",
    blurb:
      "Single-job gear that quietly kills a specific everyday annoyance — the small, honest fixes worth owning once you've lived with the problem long enough.",
    heroProductId: "pebblebee-clip-5-rechargeable-bluetooth-tracker",
  },
];

function slugify(s: string): string {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Register any remaining cooling/useful catalog categories so each still gets a real
// /category page + slug. Only CORE (on-brand) products count — off-brand drift categories
// (kitchen, sleep, home-org, cooling-sleep) are excluded so they never appear in
// nav/footer/sitemap/hubs. Names already hand-defined above are skipped (no duplicates).
const DEFINED_NAMES = new Set(
  [...CAR_CATEGORIES, ...COOLING_CATEGORIES, ...USEFUL_CATEGORIES].map((c) => c.name)
);

const _extraNames = Array.from(
  new Set(
    [...(heatData as { category: string; offBrand?: boolean }[]),
     ...(usefulData as { category: string; offBrand?: boolean }[])]
      .filter((p) => !p.offBrand)
      .map((p) => p.category)
  )
).filter((n) => n && !DEFINED_NAMES.has(n));

const EXTRA_CATEGORIES: CategoryMeta[] = _extraNames.map((name) => ({
  slug: slugify(name),
  name,
  lettermark: name.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase() || "GEN",
  kitName: "",
  tagline: "Genuinely useful gear, researched.",
  blurb: `Researched ${name.toLowerCase()} worth owning — chosen on merit, honest about the catch.`,
  heroProductId: "",
}));

export const CATEGORIES: CategoryMeta[] = [
  ...CAR_CATEGORIES,
  ...COOLING_CATEGORIES,
  ...USEFUL_CATEGORIES,
  ...EXTRA_CATEGORIES,
];

const BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));
const BY_NAME = new Map(CATEGORIES.map((c) => [c.name, c]));

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return BY_SLUG.get(slug.toLowerCase());
}

export function getCategoryByName(name: Category): CategoryMeta {
  return (
    BY_NAME.get(name) ?? {
      slug: slugify(String(name)),
      name,
      lettermark: String(name).replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase() || "GEN",
      kitName: "",
      tagline: "",
      blurb: "",
      heroProductId: "",
    }
  );
}

export function categorySlug(name: Category): string {
  return getCategoryByName(name).slug;
}
