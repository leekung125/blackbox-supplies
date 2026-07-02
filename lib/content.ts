import type { Category } from "@/lib/products";

/** Brand constants — single source of truth for name/tagline/positioning.
 *  BlackBox Supply is a premium buying-guide + gear brand for drivers: car, roadside, and
 *  backup-power gear worth owning. We find the right one, explain what matters, link straight
 *  to it, and name the catch. Chosen on merit, never paid placement. */
export const BRAND = {
  name: "BlackBox Supply",
  tagline: "Gear for the road — before the road becomes a problem.",
  positioning:
    "BlackBox Supply is a buying-guide and gear brand for drivers. We find the jump starters, tire inflators, dash cams, power stations, and roadside gear actually worth owning, explain what matters, and link you straight to the right one — chosen on merit, honest about the catch.",
  shortPositioning:
    "The car, roadside, and backup-power gear worth owning — with the guides to choose right.",
  instagram: "black_boxsupplies",
  email: "info@blackboxsupplies.com",
  domain: "blackboxsupplies.com",
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
  "As an Amazon Associate, BlackBox Supply earns from qualifying purchases — outbound links are affiliate links, at no extra cost to you. Picks are chosen on merit, not paid placement; prices are approximate, so confirm the current price on Amazon.";

/** Neutral sourcing microcopy — specs come from public research, confirm at the retailer. */
export const NOT_TESTED_NOTE =
  "Specs are drawn from public research and manufacturer listings and can vary by model or change over time — confirm current details on the product's Amazon page.";
