import type { Category } from "@/lib/products";

/** Brand constants — single source of truth for name/tagline/positioning.
 *  BlackBox Supplies is a buying-guide + gear brand for utility & readiness gear: car & roadside,
 *  power & backup, cooling, tools, and everyday carry. We research the right one, explain what
 *  matters, link straight to it, and name the catch. Chosen on merit, never paid placement.
 *  The niche list here must match what the site actually browses — kitchen, sleep, and home-org
 *  drift are flagged offBrand and hidden, so they are not advertised in metadata or schema. */
export const BRAND = {
  name: "BlackBox Supplies",
  tagline: "Genuinely useful gear, researched — not sponsored.",
  positioning:
    "BlackBox Supplies researches genuinely useful gear — car & roadside, power & backup, cooling, tools, and everyday carry — and links you straight to the one worth buying. Chosen on merit, never paid placement, and honest about the catch.",
  shortPositioning:
    "Genuinely useful gear, researched — with the guides to choose the right one.",
  instagram: "black_boxsupplies",
  facebook: "Blackboxsupplies",
  email: "info@blackboxsupplies.com",
  domain: "blackboxsupplies.com",
} as const;

/**
 * The named, accountable human behind every guide's method and verdicts — a real founder who owns
 * the standard, surfaced by FIRST NAME ONLY by deliberate choice. The founder wants to stay private:
 * a real, accountable first-name byline still gives the E-E-A-T + honesty benefit (a real person
 * stands behind the picks, not a faceless "editorial desk") without publishing a full legal identity
 * or a photo. Deliberately explicit that the work is RESEARCH-based (including original analysis of
 * hundreds of real owner reviews), not a paid lab or a fake hands-on test. Used as the `author`
 * Person in Article JSON-LD and in on-page bylines.
 * PRIVACY: do NOT add a full name or a photo to `avatar` — the founder has chosen to stay hidden.
 */
export const EDITOR = {
  name: "Lee",
  role: "Founder & Editor",
  bio: "BlackBox Supplies is founded, researched, and written by Lee, its founder. The focus is deliberately narrow — the gear that matters the moment something goes wrong: a dead battery at 6am, a blackout, a heatwave with no AC, a breakdown on a dark shoulder. Every pick is cross-checked against manufacturer specs, published independent test data, and original analysis of hundreds of long-term verified-buyer reviews — an honest, research-based standard, not a paid lab, and never a hands-on test the site didn't do.",
  avatar: "", // intentionally empty — the founder stays private (no photo). Do not add one.
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

/**
 * THE newsletter cadence — one string, every surface. The site previously promised "a few times a
 * month" and "about once a week" on the same page, which reads as careless on a signup surface.
 * A few sends a month is what we can actually sustain, so it is the promise we make everywhere.
 * Written as a lowercase mid-sentence phrase; capitalize at the call site if a sentence starts with it.
 */
export const NEWSLETTER_CADENCE = "a few times a month";

/**
 * THE affiliate disclosure, in exactly two lengths. Both always use the full legal-ish brand name
 * "BlackBox Supplies" — an FTC / Amazon Associates disclosure that names itself four different ways
 * reads as careless, so no surface should hardcode its own wording.
 * SHORT: inline, next to affiliate links and product CTAs.
 * LONG: footers and standalone disclosure blocks, where the merit + price caveats also belong.
 * Affiliate links are live (Amazon Associates, tag blackboxsuppl-20).
 */
export const DISCLOSURE_SHORT =
  "As an Amazon Associate, BlackBox Supplies earns from qualifying purchases — at no extra cost to you.";

export const DISCLOSURE_LONG =
  "As an Amazon Associate, BlackBox Supplies earns from qualifying purchases — outbound links are affiliate links, at no extra cost to you. Picks are chosen on merit, not paid placement; prices are approximate, so confirm the current price on Amazon.";

/** Neutral sourcing microcopy — specs come from public research, confirm at the retailer. */
export const NOT_TESTED_NOTE =
  "Specs are drawn from public research and manufacturer listings and can vary by model or change over time — confirm current details on the product's Amazon page.";
