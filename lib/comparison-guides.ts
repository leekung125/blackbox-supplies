import type { CategoryMeta, ComparableProduct } from "@/lib/comparison-schema";
import type { SortOption } from "@/components/comparison-board";
import { PORTABLE_AC_META } from "@/lib/comparison-schema";
import { PORTABLE_AC_PRODUCTS } from "@/lib/comparison-portable-ac";
import { JUMP_STARTER_GUIDE } from "@/lib/comparison-jump-starters";
import { TIRE_INFLATOR_GUIDE } from "@/lib/comparison-tire-inflators";
import { DASH_CAMS_GUIDE } from "@/lib/comparison-dash-cams";
import { POWER_STATION_GUIDE } from "@/lib/comparison-power-stations";
import { FANS_GUIDE } from "@/lib/comparison-fans";

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

/** The signal-vs-noise block: the specs that actually decide the buy vs the marketing figures. */
export interface SpecsThatMatter {
  /** The DECISIVE specs — what actually separates a good buy from a bad one, in plain language. */
  decisive: string[];
  /** The marketing figures that SOUND decisive but aren't — the box numbers to discount. */
  noise: string[];
}

/** One honest buyer question + answer. Rendered as an accordion + emitted as FAQPage JSON-LD. */
export interface FaqItem {
  q: string;
  a: string;
}

/**
 * The three quick-jump decision picks for the sticky decision summary. Product IDs into
 * `products`. These are honest editorial slots — each id must be a real product in the guide.
 */
export interface DecisionPicks {
  overall: string;
  value: string;
  premium: string;
}

export interface ComparisonGuide {
  slug: string;
  title: string;
  dek: string;
  /**
   * SEO overrides, same contract as Article: optional, falling back to `title` / `dek`.
   * See lib/articles.ts for the Search Console measurement that motivated them - 9,740
   * impressions at 0.3% CTR and average position 36.3, with most top pages carrying a title
   * past Google's ~60-char render and a dek of 240-330 where it shows ~155.
   */
  seoTitle?: string;
  seoDescription?: string;
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
  /** Independent outlets this guide genuinely cross-references (Research Trail). Optional/honest. */
  authorities?: string[];
  /** Signal vs noise: the specs that decide the buy vs the marketing figures. */
  specsThatMatter?: SpecsThatMatter;
  /** 3–5 honest buyer questions → accordion + FAQPage JSON-LD. */
  faq?: FaqItem[];
  /** Best overall · value · premium quick-jump picks for the sticky decision summary. */
  decisionPicks?: DecisionPicks;

  // ── Trust layer (all optional + additive; never fabricate an entry) ──────────
  /**
   * Verified-buyer review synthesis — the honest research moat. Each entry is a QUALITATIVE
   * pattern drawn from actually reading real owner reviews ("owners consistently praise…",
   * "a recurring long-term complaint is…"), paired with a sentiment.
   * HONESTY LAW: NO numbers — never a percentage, a star average, or a review count. If you
   * can't ground a pattern in real reviews, omit it. Fabricated sentiment is worse than none.
   */
  ownerInsights?: { pattern: string; detail: string; sentiment: "loved" | "watch" }[];
  /**
   * Real, existing models we considered and rejected, each with the one honest reason it lost.
   * HONESTY LAW: every `name` must be a real product that actually exists in this category, and
   * every `reason` a real, known limitation — not an invented flaw. Omit if unsure.
   */
  competition?: { name: string; reason: string }[];
  /**
   * The genuine flaws of the #1 pick that are NOT dealbreakers — the "here's the catch, and why
   * we still chose it" honesty. Real known issues only.
   */
  winnerFlaws?: string[];
  /**
   * Honest de-selection: concrete situations where a buyer should skip our pick — or skip this
   * whole category — because it's the wrong tool for them. Steers people away, not just toward.
   */
  skipThisIf?: string[];
  /**
   * Revision trail: ISO-8601 date (YYYY-MM-DD) + what changed or was last verified. Powers a
   * visible "last verified" line and honest change history. Dates must be real ISO dates.
   */
  changelog?: { date: string; note: string }[];
  /**
   * Guide-level clickable citations backing the specs/verdicts. Distinct from `authorities`
   * (plain outlet names): these are real, reachable URLs — manufacturer spec pages, RTINGS,
   * Consumer Reports, Wirecutter, reputable outlets, or the product's own Amazon page.
   * HONESTY LAW: a fabricated citation is worse than none — omit any URL you cannot verify.
   */
  sources?: { label: string; url: string }[];
}

const PORTABLE_AC: ComparisonGuide = {
  slug: "best-portable-air-conditioners",
  seoDescription:
    "The BTU on the box is a lie. What cools your room is SACC, often half the headline. Every unit compared on the honest spec.",
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
  relatedGuides: ["best-tower-fans-compared"],
  decisionPicks: {
    overall: "midea-duo-14-000-btu-smart",
    value: "whynter-arc-14s-14000-btu-dual-hose",
    premium: "whynter-nex-arc-1230wn-14-000",
  },
  specsThatMatter: {
    decisive: [
      "SACC (Seasonally Adjusted Cooling Capacity) — the DOE's tested cooling number. It's the honest capacity, and it decides whether the unit keeps up in a real heatwave.",
      "Single- vs dual-hose. Dual-hose cools a full room faster and more efficiently; single-hose quietly caps how cold a big room can get.",
      "Real coverage in sq ft (about 20 SACC BTU per sq ft) — size to your actual room and its sun, not the box.",
    ],
    noise: [
      "The giant ASHRAE “BTU” on the box — an old rating, often 30–50% higher than the SACC the unit actually delivers.",
      "“Cools up to 700 sq ft” marketing, which assumes a shaded, sea-level, perfectly sealed room.",
      "The word “portable” — most real units are 70–85 lb, so weight matters more than the label implies.",
    ],
  },
  faq: [
    {
      q: "What's the difference between SACC and BTU?",
      a: "The big “BTU” on the box is the older ASHRAE rating, measured under generous lab conditions. SACC (Seasonally Adjusted Cooling Capacity) is the DOE's newer, real-world test, and it's usually 30–50% lower. A “14,000 BTU” unit is often around 8,000 SACC. Always compare units by SACC — it's the number that predicts whether the room actually gets cold.",
    },
    {
      q: "How many BTU do I need for my room?",
      a: "A rough rule is about 20 SACC BTU per square foot, then add margin for direct sun, top floors, and kitchens. A genuinely 400 sq ft room wants roughly 8,000 SACC, not the “12,000 BTU” a box promises. It's better to be slightly oversized than to run a too-small unit flat-out in a heatwave.",
    },
    {
      q: "Is a dual-hose portable AC worth it?",
      a: "For a big or sunny room, yes. Single-hose units create negative pressure — they blow conditioned air outside and pull warm, unconditioned air back in, which caps how cold they get. Dual-hose units pull separate outside air to cool the compressor, so they cool faster and more efficiently. For a small room, single-hose is fine and cheaper.",
    },
    {
      q: "Do portable ACs need a window?",
      a: "Almost all of them do — they vent hot air through a hose and a window kit. The one exception here is the battery-capable EcoFlow WAVE 3, a ductless spot-cooler for tents and vans. If you have no window, that's the only option; everything else needs somewhere to send the heat.",
    },
    {
      q: "Why is my portable AC so loud?",
      a: "The compressor and fan sit in the room with you, so every portable AC gets loud on high. The dB figures we list are the quietest published (low/sleep) setting. Inverter models (Midea, LG, Whynter NEX) modulate instead of slamming on and off, which is why they're the ones to pick for a bedroom.",
    },
  ],

  // ── Trust layer ──────────────────────────────────────────────────────────────
  // Verified-buyer review synthesis — QUALITATIVE patterns that recur across owner
  // reviews for THIS lineup (Midea Duo, Whynter NEX/ARC-14S, LG, Frigidaire, De'Longhi,
  // EcoFlow, budget single-hose). No invented numbers, counts, or quotes.
  ownerInsights: [
    {
      pattern: "Dual-hose inverters actually pull a hot room down",
      detail:
        "Owners of the Midea Duo, Whynter NEX and ARC-14S consistently report these cool a full room fast where single-hose units stall, and the inverter models draw noticeably less power doing it.",
      sentiment: "loved",
    },
    {
      pattern: "Genuinely quiet on low and sleep mode",
      detail:
        "Inverter owners (Midea, LG, Frigidaire) repeatedly single out how the modulating compressor fades into the background on sleep mode instead of the jarring hard on/off cycling of older non-inverter units.",
      sentiment: "loved",
    },
    {
      pattern: "Real off-grid cooling that earns its price",
      detail:
        "EcoFlow WAVE 3 owners camping, vanlifing and in RVs consistently value being able to cool a small enclosed space with no window and no wall outlet — a use case nothing else here covers, even as they note the cost.",
      sentiment: "loved",
    },
    {
      pattern: "Draining is the recurring long-term headache",
      detail:
        "Across brands the most common repeat complaint is water: self-evaporating systems that overwhelm in humidity and awkward drain placement, with some owners reporting leaks or floor/drywall damage when a full tank isn't emptied in time.",
      sentiment: "watch",
    },
    {
      pattern: "The box BTU oversells the room it can hold",
      detail:
        "A persistent theme is units feeling undersized for the square footage on the label; owners in hot, humid climates describe cooling as merely tolerable, and EcoFlow owners note real battery runtime lands well under the advertised hours.",
      sentiment: "watch",
    },
    {
      pattern: "Flimsy window kits and a two-person lift",
      detail:
        "Owners routinely call out fragile plastic window-kit tabs and clips that rattle or seal poorly, and note that the 70–85 lb room units are a genuine chore to carry between floors.",
      sentiment: "watch",
    },
  ],

  // Real models we considered and rejected, each with the one honest reason it lost.
  // None of these appear in the lineup above.
  competition: [
    {
      name: "Honeywell HL14CESWK",
      reason:
        "The “14,000 BTU” box hides an ~8,500 SACC single-hose, non-inverter unit with no Wi-Fi — it delivers less real cooling than our single-hose picks and lags every dual-hose inverter here on efficiency and noise.",
    },
    {
      name: "GE APCA14YZMW",
      reason:
        "A smart Wi-Fi unit, but it's single-hose with a weak ~6.8 EER, so it draws noticeably more power per BTU than the inverter picks — the app doesn't offset the efficiency gap.",
    },
    {
      name: "SereneLife SLPAC10",
      reason:
        "Cheap and genuinely easy to install, but independent testing clocked it the loudest unit in its class (57–61 dB on high) with among the lowest efficiency (~7.8 CEER) — a false economy once a real heatwave hits.",
    },
    {
      name: "Whynter Elite ARC-122DS",
      reason:
        "A well-liked, quiet dual-hose unit — but only ~7,000 SACC (good for ~400 sq ft). Its own inverter sibling, the NEX ARC-1230WN we picked, out-cools and out-efficiencies it for the money.",
    },
    {
      name: "Hisense AP1219CR1W",
      reason:
        "Only a ~7,500 BTU-class unit, and owners widely report frequent draining and condenser/airflow warnings in humid heat — too small and too fussy to trust as a main-room pick.",
    },
  ],

  // Genuine flaws of the #1 pick (Midea Duo) that are NOT dealbreakers.
  winnerFlaws: [
    "It's heavy and tall — about 85 lb, one of the heaviest units made, so moving it between floors is a real two-person job.",
    "On its highest fan speed it's audibly loud: the compressor noise stops being masked once you drop to low/medium, where it's much quieter.",
    "The window-kit tabs and plastic clips feel flimsy, and some owners report rattles until the kit is snugged down.",
  ],

  // Honest de-selection: when to skip this pick — or the whole category.
  skipThisIf: [
    "You only need to cool a small bedroom or home office — a 12,000-SACC unit is overkill; a cheaper single-hose (or the little Shinco) fits the room and your budget better.",
    "You have a standard double-hung window you can mount a window AC in — Consumer Reports found window units cool more effectively for less money; a portable is the compromise for when you truly can't.",
    "You'll move it between floors often — every real room unit here is 70–85 lb; if portability is the actual point, only the battery-capable EcoFlow is genuinely light (and it's a spot cooler, not a room unit).",
    "You're trying to cool a large open-plan space or a whole floor — no portable AC (SACC caps around 12,000) will keep up; you want a window unit, a mini-split, or more than one unit.",
  ],

  // Truthful revision trail (ISO-8601). No invented history.
  changelog: [
    {
      date: "2026-07-09",
      note: "Published. Verified current prices, availability, and SACC/coverage/noise specs against manufacturer spec pages and independent test data (RTINGS, TechGearLab, Consumer Reports); added guide-level citations and the rejected-competition set.",
    },
  ],

  // Guide-level clickable citations backing the SACC/spec claims. All verified reachable.
  sources: [
    {
      label: "U.S. DOE — Portable Air Conditioners: current standard & test procedure (10 CFR 430, Appendix CC)",
      url: "https://www.energy.gov/cmei/buildings/portable-air-conditioners",
    },
    {
      label: "ENERGY STAR — Room Air Conditioners (certified-model program and efficiency criteria)",
      url: "https://www.energystar.gov/products/room_air_conditioners",
    },
    {
      label: "Consumer Reports — Best Portable Air Conditioners (ASHRAE vs. DOE ratings)",
      url: "https://www.consumerreports.org/appliances/air-conditioners/best-portable-air-conditioners-from-consumer-reports-tests-a1447950198/",
    },
    {
      label: "RTINGS — The Best Portable Air Conditioners of 2026 (lab-tested)",
      url: "https://www.rtings.com/air-conditioner/reviews/best/portable",
    },
    {
      label: "TechGearLab — Best Portable Air Conditioner (SACC & single- vs dual-hose testing)",
      url: "https://www.techgearlab.com/topics/electronics/best-portable-air-conditioner",
    },
    {
      label: "Midea — Duo Smart Inverter (MAP14S1TBL) manufacturer spec page",
      url: "https://www.midea.com/us/store/cooling-and-heating/portable-air-conditioners/midea-duo-smart-inverter-portable-air-conditioner.map14s1tbl",
    },
  ],
};

export const COMPARISON_GUIDES: ComparisonGuide[] = [
  PORTABLE_AC,
  JUMP_STARTER_GUIDE,
  TIRE_INFLATOR_GUIDE,
  DASH_CAMS_GUIDE,
  POWER_STATION_GUIDE,
  FANS_GUIDE,
];

export const COMPARISON_GUIDE_SLUGS = COMPARISON_GUIDES.map((g) => g.slug);

export function getComparisonGuideBySlug(slug: string): ComparisonGuide | undefined {
  return COMPARISON_GUIDES.find((g) => g.slug === slug);
}
