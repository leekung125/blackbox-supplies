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

function slugify(s: string): string {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Register the cooling/useful catalog categories so each gets a real /category page + slug.
const _extraNames = Array.from(
  new Set(
    [...(heatData as { category: string }[]), ...(usefulData as { category: string }[])].map((p) => p.category)
  )
).filter((n) => n && !CAR_CATEGORIES.some((c) => c.name === n));

const EXTRA_CATEGORIES: CategoryMeta[] = _extraNames.map((name) => ({
  slug: slugify(name),
  name,
  lettermark: name.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase() || "GEN",
  kitName: "",
  tagline: "Genuinely useful gear, researched.",
  blurb: `Researched ${name.toLowerCase()} worth owning — chosen on merit, honest about the catch.`,
  heroProductId: "",
}));

export const CATEGORIES: CategoryMeta[] = [...CAR_CATEGORIES, ...EXTRA_CATEGORIES];

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
