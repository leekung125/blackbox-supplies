import type { Category } from "@/lib/products";

/** Brand constants — single source of truth for name/tagline/positioning.
 *  Positioning = "Practical Everyday Readiness" (INFORMATION_ARCHITECTURE §1): BlackBox Supplies
 *  helps normal households get ready for the moments that actually happen — roadside trouble,
 *  power outages, severe heat and weather, travel. Researched gear worth buying, guides that
 *  decide in minutes, and systems that keep you organized. Calm and modern, NOT prepper /
 *  survivalist / tactical. Every visitor-facing surface derives its brand copy from here. */
export const BRAND = {
  name: "BlackBox Supplies",
  tagline: "Practical readiness for everyday life — researched, never sponsored.",
  positioning:
    "BlackBox Supplies helps normal households get ready for the moments that actually happen — roadside trouble, power outages, severe heat and weather, travel. Researched gear worth buying, guides that decide in minutes, and systems that keep you organized. Chosen on merit, honest about the catch.",
  shortPositioning:
    "Practical everyday readiness — the gear, the guides, and the systems.",
  instagram: "black_boxsupplies",
  email: "info@blackboxsupplies.com",
  domain: "blackboxsupplies.com",
} as const;

/** Newsletter send cadence — one canonical phrase (INCONSISTENCY_REPORT §4). Every newsletter
 *  surface references this constant; never inline "once a week" / "a few times a month" again. */
export const NEWSLETTER_CADENCE = "about once a week" as const;

/** Canonical display labels for the three readiness verticals (INCONSISTENCY_REPORT §10,
 *  INFORMATION_ARCHITECTURE §2.2). Nav, footer, homepage verticals, and breadcrumbs all pull
 *  these so the same destination is never labeled two different ways.
 *   - `car`    → `/gear`   (roadside & vehicle)
 *   - `cooling`→ `/heat`   (heat & weather)
 *   - `useful` → `/useful` (everyday carry & work) */
export const VERTICALS = {
  car: "Car & Roadside",
  cooling: "Cooling",
  useful: "Work & EDC",
} as const;

export type VerticalKey = keyof typeof VERTICALS;

/**
 * The named, accountable editorial owner behind every guide's method and verdicts — the honest
 * E-E-A-T substitute for a faceless brand: a real, named person who owns the standard, not a
 * fake lab or invented credentials. Deliberately explicit that the work is RESEARCH-based, not
 * hands-on lab testing, so no false "we crash-tested this" impression is created. Used as the
 * `author` in comparison-guide Article JSON-LD and can be surfaced in on-page bylines.
 */
// Trust comes from a transparent PROCESS, not a fabricated person. No fake staff personas.
export const EDITOR = {
  name: "BlackBox Editorial",
  role: "Research & standards",
  bio: "Every BlackBox verdict is set by our editorial process — not a single named reviewer. We cross-check manufacturer spec sheets, published independent test data, and long-term verified-buyer reviews. It's research-based analysis, not hands-on lab testing, and we never claim otherwise.",
} as const;

/**
 * The driver moments shown on the home strip — one per category. Each links to the category
 * that answers it. These are real situations, not melodrama.
 */
export interface FailureMoment {
  label: string;
  line: string;
  categorySlug: string;
}

export const FAILURE_MOMENTS: FailureMoment[] = [
  { label: "Dead battery", line: "Won't turn over.", categorySlug: "jump-starters" },
  { label: "Flat tire", line: "Pump's out of order.", categorySlug: "tire-inflators" },
  { label: "Fender bender", line: "Their word against yours.", categorySlug: "dash-cams" },
  { label: "Power's out", line: "Phones at zero.", categorySlug: "power" },
  { label: "Dark shoulder", line: "Stranded, unseen.", categorySlug: "roadside" },
  { label: "Trunk chaos", line: "Nothing where you need it.", categorySlug: "car-utility" },
];

/**
 * Reel concepts for the "coming soon" teaser — the first BlackBox videos.
 * Clearly marked upcoming; no fabricated "as seen" claims.
 */
export interface VideoDrop {
  code: string;
  title: string;
  hook: string;
  category: Category;
  categorySlug: string;
  status: "New" | "In production" | "Scheduled" | "Coming soon";
  thumb: string;
}

export const VIDEO_DROPS: VideoDrop[] = [
  {
    code: "REEL 001",
    thumb: "",
    title: "Jump a dead battery in 60 seconds",
    hook: "No second car. No cables. Just a pack the size of a phone.",
    category: "Jump Starters",
    categorySlug: "jump-starters",
    status: "Coming soon",
  },
  {
    code: "REEL 002",
    thumb: "",
    title: "Reinflate a flat on the shoulder",
    hook: "Set the pressure, walk away, drive to the shop on your own time.",
    category: "Tire Inflators",
    categorySlug: "tire-inflators",
    status: "Coming soon",
  },
  {
    code: "REEL 003",
    thumb: "",
    title: "What a dash cam actually catches",
    hook: "The three seconds that turn 'their word against yours' into proof.",
    category: "Dash Cams",
    categorySlug: "dash-cams",
    status: "Coming soon",
  },
];

/** Short disclosure line for footers and near links. Affiliate links are live (Amazon Associates,
 *  tag blackboxsuppl-20); the per-link disclosure renders automatically wherever an affiliate link
 *  is shown. */
export const DISCLOSURE_SHORT =
  "As an Amazon Associate, BlackBox Supplies earns from qualifying purchases — outbound links are affiliate links, at no extra cost to you. Picks are chosen on merit, not paid placement; prices are approximate, so confirm the current price on Amazon.";

/** Neutral sourcing microcopy — specs come from public research, confirm at the retailer. */
export const NOT_TESTED_NOTE =
  "Specs are drawn from public research and manufacturer listings and can vary by model or change over time — confirm current details on the product's Amazon page.";
