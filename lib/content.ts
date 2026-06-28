import type { Category } from "@/lib/products";

/** Brand constants — single source of truth for name/tagline/positioning. */
export const BRAND = {
  name: "Blackbox Supply",
  tagline: "Gear for bad timing.",
  positioning:
    "A field catalog of the gear that matters when the moment goes wrong — dead phone, dark road, flat tire, lost keys, power out. Honestly sourced. Never overclaimed.",
  shortPositioning: "The gear that matters when the moment goes wrong.",
  instagram: "blackbox.supply",
} as const;

/**
 * The five canonical "bad timing" failure moments shown on the home strip.
 * Each links to the category that answers it.
 */
export interface FailureMoment {
  label: string;
  line: string;
  categorySlug: string;
}

export const FAILURE_MOMENTS: FailureMoment[] = [
  { label: "Dead phone", line: "4% on the platform.", categorySlug: "power" },
  { label: "Dark road", line: "No light for miles.", categorySlug: "light" },
  { label: "Flat tire", line: "Pump's out of order.", categorySlug: "car" },
  { label: "Lost keys", line: "Already late.", categorySlug: "carry" },
  { label: "Power outage", line: "House goes black.", categorySlug: "power" },
];

/**
 * The three launch video concepts ("latest drops") — placeholders for the
 * incoming Blackbox Supply micro-films. Clearly marked as upcoming.
 */
export interface VideoDrop {
  code: string;
  title: string;
  hook: string;
  category: Category;
  categorySlug: string;
  status: "In production" | "Scheduled" | "Concept";
}

export const VIDEO_DROPS: VideoDrop[] = [
  {
    code: "DROP 001",
    title: "Dead Phone, Bad Timing",
    hook: "4 percent. No outlet. The train's already here.",
    category: "Power",
    categorySlug: "power",
    status: "In production",
  },
  {
    code: "DROP 002",
    title: "Dark Road, No Light",
    hook: "Both hands busy. Zero light. Now what.",
    category: "Light",
    categorySlug: "light",
    status: "Scheduled",
  },
  {
    code: "DROP 003",
    title: "Flat Tire, No Plan",
    hook: "Low-pressure light. 11pm. Every air pump 'out of service.'",
    category: "Car",
    categorySlug: "car",
    status: "Scheduled",
  },
];

/** Short affiliate + AI disclosure line used in footers and near links. */
export const DISCLOSURE_SHORT =
  "Blackbox Supply may earn a commission on some outbound links, at no cost to you. We have not personally tested these products; details are sourced from public research and can change.";

/** The "not personally tested" microcopy. */
export const NOT_TESTED_NOTE =
  "Not personally tested. Specs and claims are drawn from public research and manufacturer listings, and can vary by model and change over time.";
