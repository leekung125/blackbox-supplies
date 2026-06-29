import type { Category } from "@/lib/products";

export interface CategoryMeta {
  /** URL slug, e.g. "power" for /category/power */
  slug: string;
  /** Display name — matches the `category` field in the product data. */
  name: Category;
  /** Mono lettermark used on placeholder tiles, e.g. "PWR". */
  lettermark: string;
  /** The field-kit name for /kits, e.g. "The Power Kit". */
  kitName: string;
  /** Short, HUD-style line. */
  tagline: string;
  /** One honest sentence describing the category. */
  blurb: string;
  /** Representative generated product visual (path under /public) for category cards. */
  repImage: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "power",
    name: "Power",
    lettermark: "PWR",
    kitName: "The Power Kit",
    tagline: "When the battery dies first.",
    blurb:
      "Portable charge, wall and car power, and outage-grade stations — for the moment the percentage hits zero and there is no outlet in reach.",
    repImage: "/products/power-bank-compact-10k.jpg",
  },
  {
    slug: "car",
    name: "Car",
    lettermark: "CAR",
    kitName: "The Car Kit",
    tagline: "For the breakdown you didn't plan.",
    blurb:
      "Jump starters, inflators, dash cams and roadside gear — the trunk you wish you'd packed before the shoulder of the highway.",
    repImage: "/products/car-jump-starter-lithium.jpg",
  },
  {
    slug: "light",
    name: "Light",
    lettermark: "LGT",
    kitName: "The Light Kit",
    tagline: "When the lights go out.",
    blurb:
      "Flashlights, lanterns, headlamps and beacons — directed, hands-free, outage-ready light for the dark road and the black hallway.",
    repImage: "/products/light-edc-flashlight.jpg",
  },
  {
    slug: "carry",
    name: "Carry",
    lettermark: "CRY",
    kitName: "The Carry Kit",
    tagline: "Find it. Secure it. Move.",
    blurb:
      "Trackers, organizers, locks and tools — keep what matters located, contained, and reachable when you're already late.",
    repImage: "/products/carry-card-tracker.jpg",
  },
];

const BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));
const BY_NAME = new Map(CATEGORIES.map((c) => [c.name, c]));

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return BY_SLUG.get(slug.toLowerCase());
}

export function getCategoryByName(name: Category): CategoryMeta {
  // Names come from typed product data, so this is always present.
  return BY_NAME.get(name)!;
}

export function categorySlug(name: Category): string {
  return getCategoryByName(name).slug;
}
