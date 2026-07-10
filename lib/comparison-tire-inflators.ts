import type { ProductFor, CategoryMeta } from "@/lib/comparison-schema";
import type { ComparisonGuide } from "@/lib/comparison-guides";
import type { SortOption } from "@/components/comparison-board";
import { SPEC_COLUMNS } from "@/lib/comparison-schema";

/**
 * GUIDE DATA — "The Best Cordless Tire Inflators, Compared".
 * Built from our own verified catalog (products.json, category "Tire Inflators") plus
 * manufacturer / retailer spec sheets. Every number is real or `null`. `unverified` lists the
 * spec keys that are estimates or unpublished so the UI can badge them honestly
 * (BLACKBOX_V2: real or nothing — never fabricate).
 *
 * Cross-cutting notes:
 *  - `rating`/`reviewCount` are null on ALL units: no verified per-unit star/count was pulled.
 *    Fill from Amazon PA-API when live; do not invent.
 *  - `inflationSpeedLpm` is null on ALL units: consumer inflators publish airflow inconsistently
 *    (seconds-per-tire, CFM, or nothing) and no apples-to-apples L/min figure was verifiable.
 *    Flagged unverified everywhere rather than guessed.
 *  - `maxPressurePsi` is the manufacturer max-pressure rating (well-published); EPAuto's is the
 *    approximate "~100 PSI" figure from the listing, so it's flagged unverified.
 *  - `powerSource` "dual" = runs on more than one source (battery + 12V/AC). The DeWalt is
 *    triple-source (20V/12V/110V); "dual" is the closest schema enum for multi-source.
 *  - `builtInLight` is flagged unverified where the work-light claim couldn't be confirmed from a
 *    manufacturer source (Milwaukee 2475-20, HOTO Pro).
 *  - `sourceUrls` are the verified Amazon listing pages the ASINs came from.
 *  - Images are "" (code-drawn spec-tile fallback) until a FLUX/Amazon image pass lands.
 */
export const TIRE_INFLATOR_PRODUCTS: ProductFor<"tire_inflators">[] = [
  // ── Best overall (do-it-all premium cordless) ──────────────────────────────
  {
    id: "fanttik-x8-apex-portable-tire",
    name: "Fanttik X8 APEX Portable Tire Inflator (150 PSI Cordless)",
    brand: "Fanttik",
    category: "tire_inflators",
    image: "/products/shot-fanttik-x8-apex-portable-tire.png",
    price: 80,
    priceRange: "$70–$90",
    affiliateUrl: "https://www.amazon.com/dp/B09YD2D96V?tag=blackboxsuppl-20",
    sourceUrls: ["https://www.amazon.com/dp/B09YD2D96V"],
    rating: null,
    reviewCount: null,
    role: "Best overall",
    bestFor: "One premium, no-compromise cordless inflator for car, SUV, bike, motorcycle and sports balls.",
    pros: [
      "Reviewers repeatedly name it the best overall cordless — fastest inflation and longest runtime in the pocket-inflator class",
      "Dial in a target PSI and walk away; auto-stops at roughly ±1 PSI accuracy",
      "Dual LED display, work light, USB-C recharge, and doubles as a power bank",
    ],
    cons: [
      "Premium price for a pocket-sized inflator",
      "150 PSI is plenty for cars but not high-volume commercial truck tires",
      "Recharges over USB-C rather than swappable tool batteries",
    ],
    specs: {
      maxPressurePsi: 150,
      powerSource: "battery",
      inflationSpeedLpm: null, // Fanttik publishes seconds-per-tire, not a verifiable L/min figure
      presetAutoShutoff: true,
      digitalGauge: true,
      builtInLight: true,
      cordless: true,
    },
    unverified: ["inflationSpeedLpm", "rating", "reviewCount"],
  },

  // ── Best value (full cordless package, no tool ecosystem needed) ───────────
  {
    id: "astroai-cordless-tire-inflator-160",
    name: "AstroAI Cordless Tire Inflator 160 PSI (20V Battery + 12V Adapter)",
    brand: "AstroAI",
    category: "tire_inflators",
    image: "/products/shot-astroai-cordless-tire-inflator-160.png",
    price: 57,
    priceRange: "$50–$65",
    affiliateUrl: "https://www.amazon.com/dp/B0948WY5YX?tag=blackboxsuppl-20",
    sourceUrls: ["https://www.amazon.com/dp/B0948WY5YX"],
    rating: null,
    reviewCount: null,
    role: "Best value",
    bestFor: "Buyers who want a complete cordless package out of the box, with a 12V fallback for longer jobs.",
    pros: [
      "Real 160 PSI power and dual power sources without buying into any tool ecosystem",
      "Ships with both the 20V battery and a 12V DC adapter — nothing else to buy",
      "Backed by AstroAI's very large review base; digital preset auto-shutoff and LED light",
    ],
    cons: [
      "~20-minute continuous-run limit before it needs to cool down",
      "Bulkier and heavier than pocket-size inflators",
    ],
    specs: {
      maxPressurePsi: 160,
      powerSource: "dual", // 20V battery + 12V DC adapter, both included
      inflationSpeedLpm: null,
      presetAutoShutoff: true,
      digitalGauge: true,
      builtInLight: true,
      cordless: true,
    },
    unverified: ["inflationSpeedLpm", "rating", "reviewCount"],
  },

  // ── Best for versatility (three power sources) ─────────────────────────────
  {
    id: "dewalt-20v-max-corded-cordless",
    name: "DeWalt 20V MAX Corded/Cordless Inflator DCC020IB (Bare Tool)",
    brand: "DeWalt",
    category: "tire_inflators",
    image: "/products/dewalt-20v-max-corded-cordless.png",
    price: 99,
    priceRange: "$99 (tool only)",
    affiliateUrl: "https://www.amazon.com/dp/B07H39S9JQ?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.amazon.com/dp/B07H39S9JQ",
      "https://www.dewalt.com/product/dcc020ib/20v-max-corded-cordless-air-inflator", // official spec page — confirms 20V/12V/110V triple-source + digital gauge
    ],
    rating: null,
    reviewCount: null,
    role: "Best for versatility",
    bestFor: "DeWalt 20V MAX owners who want one inflator for the driveway and the trunk.",
    pros: [
      "Three power sources (20V battery / 12V socket / 110V wall) mean it never leaves you stranded",
      "160 PSI ceiling with digital auto-shutoff and DeWalt build quality",
      "Genuinely at home in the garage and on the roadside",
    ],
    cons: [
      "Bare tool — battery, charger and AC cord are sold separately",
      "Bulkier than pocket units",
      "~77 dBA — audible under load",
    ],
    specs: {
      maxPressurePsi: 160,
      powerSource: "dual", // 20V / 12V / 110V — triple-source; "dual" is the closest enum
      inflationSpeedLpm: null,
      presetAutoShutoff: true,
      digitalGauge: true,
      builtInLight: true,
      cordless: true,
    },
    unverified: ["inflationSpeedLpm", "rating", "reviewCount"],
  },

  // ── Best for tool owners (M12 ecosystem) ───────────────────────────────────
  {
    id: "milwaukee-m12-compact-inflator-2475",
    name: "Milwaukee M12 Compact Inflator 2475-20 (Bare Tool)",
    brand: "Milwaukee",
    category: "tire_inflators",
    image: "/products/milwaukee-m12-compact-inflator-2475.png",
    price: 99,
    priceRange: "$99 (tool only)",
    affiliateUrl: "https://www.amazon.com/dp/B07CTY3W98?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.amazon.com/dp/B07CTY3W98",
      "https://www.milwaukeetool.com/Products/Power-Tools/Automotive-Tools/2475-20", // official spec page — confirms true 120 PSI + auto-shutoff
    ],
    rating: null,
    reviewCount: null,
    role: "Best for tool owners",
    bestFor: "Milwaukee M12 tool owners, tradespeople and DIYers already in the red ecosystem.",
    pros: [
      "Milwaukee's 'fastest cordless' reputation and jobsite durability",
      "Tops off a car tire in under a minute with digital preset auto-shutoff",
      "The obvious pick if you already own M12 batteries",
    ],
    cons: [
      "Bare tool — no battery or charger included; only makes sense inside the M12 system",
      "120 PSI ceiling",
    ],
    specs: {
      maxPressurePsi: 120,
      powerSource: "battery", // M12 12V pack, sold separately
      inflationSpeedLpm: null,
      presetAutoShutoff: true,
      digitalGauge: true,
      builtInLight: false, // 2475-20 has no work light per Milwaukee; flagged pending confirmation
      cordless: true,
    },
    unverified: ["builtInLight", "inflationSpeedLpm", "rating", "reviewCount"],
  },

  // ── Premium design pick (big battery, best finish) ─────────────────────────
  {
    id: "hoto-portable-tire-inflator-pro",
    name: "HOTO Portable Tire Inflator Pro (7500mAh Cordless)",
    brand: "HOTO",
    category: "tire_inflators",
    image: "/products/hoto-portable-tire-inflator-pro.png",
    price: 70,
    priceRange: "$60–$80",
    affiliateUrl: "https://www.amazon.com/dp/B0CQ1RCJV7?tag=blackboxsuppl-20",
    sourceUrls: ["https://www.amazon.com/dp/B0CQ1RCJV7"],
    rating: null,
    reviewCount: null,
    role: "Premium design pick",
    bestFor: "Design-conscious drivers who value finish, UI and a large battery for multiple tires per trip.",
    pros: [
      "Standout design-forward build — feels like an Apple-grade gadget in the cabin",
      "Large 7500mAh battery handles many refills across a road trip",
      "Digital preset auto-stop with a clean, legible screen",
    ],
    cons: [
      "120 PSI ceiling — fine for cars, not high-PSI jobs",
      "Moderate airflow, so it favors top-offs over fast full inflations",
      "Premium price for the category",
    ],
    specs: {
      maxPressurePsi: 120,
      powerSource: "battery",
      inflationSpeedLpm: null,
      presetAutoShutoff: true,
      digitalGauge: true,
      builtInLight: true, // LED work light; flagged pending manufacturer confirmation
      cordless: true,
    },
    unverified: ["builtInLight", "inflationSpeedLpm", "rating", "reviewCount"],
  },

  // ── Best budget (glovebox compact) ─────────────────────────────────────────
  {
    id: "astroai-l7-compact-cordless-tire",
    name: "AstroAI L7 Compact Cordless Tire Inflator (150 PSI, under 1 lb)",
    brand: "AstroAI",
    category: "tire_inflators",
    image: "/products/gen/astroai-l7-compact-cordless-tire.png",
    price: 40,
    priceRange: "$35–$45",
    affiliateUrl: "https://www.amazon.com/dp/B0CS3B7MD8?tag=blackboxsuppl-20",
    sourceUrls: ["https://www.amazon.com/dp/B0CS3B7MD8"],
    rating: null,
    reviewCount: null,
    role: "Best budget",
    bestFor: "Commuters and cyclists who want the smallest always-in-the-car emergency inflator.",
    pros: [
      "Fits a glovebox, weighs under 1 lb, and is genuinely one-handed",
      "150 PSI with a 4000mAh battery — up to ~8 tires per charge",
      "Cheap enough to keep permanently in every vehicle",
    ],
    cons: [
      "The small motor means slower fills on larger tires",
      "Ideal for cars, bikes, motorcycles and sports balls — not trucks",
    ],
    specs: {
      maxPressurePsi: 150,
      powerSource: "battery",
      inflationSpeedLpm: null,
      presetAutoShutoff: true,
      digitalGauge: true,
      builtInLight: true,
      cordless: true,
    },
    unverified: ["inflationSpeedLpm", "rating", "reviewCount"],
  },

  // ── Best corded value (cheapest, always-ready) ─────────────────────────────
  {
    id: "epauto-12v-dc-portable-air",
    name: "EPAuto 12V DC Portable Air Compressor Pump (Corded Value Pick)",
    brand: "EPAuto",
    category: "tire_inflators",
    image: "/products/gen/epauto-12v-dc-portable-air.png",
    price: 35,
    priceRange: "$30–$40",
    affiliateUrl: "https://www.amazon.com/dp/B01L9WSTEG?tag=blackboxsuppl-20",
    sourceUrls: ["https://www.amazon.com/dp/B01L9WSTEG"],
    rating: null,
    reviewCount: null,
    role: "Best corded value",
    bestFor: "Budget buyers who want a foolproof backup that lives in the trunk and is always ready.",
    pros: [
      "Cheapest reliable pick and a perennial best-seller",
      "Runs off the car's 12V battery, so it never needs charging",
      "Digital preset auto-shutoff and an LED flashlight for roadside fills",
    ],
    cons: [
      "Corded (~10 ft) and tethered to the 12V socket",
      "~100 PSI ceiling, and slower than premium cordless units",
      "Sized for car tires, not high-PSI jobs",
    ],
    specs: {
      maxPressurePsi: 100, // listing states "~100 PSI" — approximate, flagged
      powerSource: "12v_dc",
      inflationSpeedLpm: null,
      presetAutoShutoff: true,
      digitalGauge: true,
      builtInLight: true,
      cordless: false,
    },
    unverified: ["maxPressurePsi", "inflationSpeedLpm", "rating", "reviewCount"],
  },
];

/**
 * Fully-authored table metadata for tire inflators — mirrors PORTABLE_AC_META.
 * Every key in SPEC_COLUMNS.tire_inflators is described here.
 */
export const TIRE_INFLATOR_META: CategoryMeta = {
  label: "Tire Inflators",
  // Airflow (L/min) is unpublished across the whole category, so the honest signature figures are
  // the pressure ceiling, how it's powered, and whether it's cordless — not a "fastest" claim.
  heroKeys: ["maxPressurePsi", "powerSource", "cordless"],
  columns: SPEC_COLUMNS.tire_inflators,
  fields: {
    maxPressurePsi: {
      label: "Max pressure",
      type: "number",
      unit: "PSI",
      higherIsBetter: true,
      tooltip:
        "The highest pressure the pump can reach. Most car tires only need 30–35 PSI, so anything 120+ has ample headroom; a higher ceiling matters for truck/SUV tires, e-bikes and margin, not everyday cars.",
    },
    powerSource: {
      label: "Power",
      type: "enum",
      tooltip:
        "How it's powered. Rechargeable-battery units are cordless and grab-and-go; 12V units plug into the car socket and never need charging; 'dual/multi' units run on more than one source so they never leave you stranded.",
      enumLabels: {
        "12v_dc": "12V socket",
        battery: "Rechargeable",
        corded_ac: "Corded AC",
        dual: "Dual / multi",
      },
    },
    inflationSpeedLpm: {
      label: "Airflow",
      type: "number",
      unit: "L/min",
      higherIsBetter: true,
      tooltip:
        "How fast it moves air — higher means quicker fills, especially on bigger tires. Consumer inflators rarely publish a comparable L/min figure, so this column is often blank rather than guessed.",
    },
    presetAutoShutoff: {
      label: "Auto-stop",
      type: "bool",
      tooltip: "Set a target PSI, start it, and walk away — it stops itself at the target. The single biggest convenience feature.",
    },
    digitalGauge: {
      label: "Digital gauge",
      type: "bool",
      tooltip: "A digital pressure readout instead of a hard-to-read analog dial.",
    },
    cordless: {
      label: "Cordless",
      type: "bool",
      tooltip: "Runs on a built-in or tool battery with no cord or 12V tether — use it anywhere.",
    },
    builtInLight: {
      label: "Work light",
      type: "bool",
      tooltip: "A built-in LED for filling a tire on a dark roadside.",
    },
  },
};

/**
 * Full comparison guide for tire inflators.
 * Array order IS the editorial ranking (Best overall first; Best budget included).
 */
export const TIRE_INFLATOR_GUIDE: ComparisonGuide = {
  slug: "best-tire-inflators-compared",
  title: "The Best Cordless Tire Inflators, Compared",
  dek: "A dead tire in a dark parking lot is not the moment to discover your pump is junk. We compared the real cordless inflators worth keeping in the trunk — by max pressure, power source, and the features that actually matter.",
  categoryLabel: "Tire Inflators",
  updated: "July 2026",
  readMinutes: 7,
  heroImage: "/guides/hero-tire-inflators.png",
  quickAnswer:
    "For most drivers, a self-contained cordless inflator with preset auto-shutoff is the buy: set your target PSI, press start, and it stops itself. The Fanttik X8 APEX is the best all-rounder — fastest fills, longest runtime, and it doubles as a power bank. Want the same idea for less? The AstroAI L7 fits a glovebox for around $40. Already own DeWalt or Milwaukee batteries? Buy the bare tool in your ecosystem.",
  whoFor: [
    "Anyone who wants to stop hunting for a working gas-station air pump",
    "Drivers with a car that warns on low pressure every cold morning",
    "Cyclists, motorcyclists and SUV owners who top off tires often",
    "People who want one always-ready pump for the trunk — cordless or 12V",
  ],
  buyFirst:
    "Decide on power source first. A rechargeable cordless unit is the grab-and-go pick and lives in any bag; a 12V corded unit never needs charging and is the cheapest reliable backup; a tool-battery model (DeWalt/Milwaukee) is the smart buy only if you already own the batteries. Then insist on preset auto-shutoff and a digital gauge — those two features are what separate a 'set it and walk away' pump from one you have to babysit. Max PSI barely matters for cars (you need ~35); it only matters for trucks, e-bikes and headroom.",
  checkBeforeBuying: [
    {
      label: "Power source vs. how you'll use it",
      detail:
        "Cordless (rechargeable) is the most convenient and lives anywhere, but you have to keep it charged. A 12V corded unit like the EPAuto runs off the car battery and is always ready — the best true 'never fails' backup. Bare-tool models (DeWalt, Milwaukee) are cheapest to add only if you already own that brand's batteries; otherwise a battery + charger doubles the price.",
    },
    {
      label: "Preset auto-shutoff is the feature",
      detail:
        "The whole point of a modern inflator is that you set a target PSI, start it, and walk away while it stops itself at exactly the right pressure. Every pick here has it. A cheap unit without it forces you to watch the gauge and toggle it manually — skip those.",
    },
    {
      label: "Max PSI is mostly a red herring for cars",
      detail:
        "Passenger tires run around 30–35 PSI, so a 120 PSI ceiling is already massive overkill. Higher numbers (150–160) only matter for light-truck/SUV tires, high-pressure road bikes, and general margin. Don't overpay for pressure you'll never use.",
    },
    {
      label: "Runtime and heat on big tires",
      detail:
        "Small pocket inflators are perfect for top-offs but slow on a fully flat SUV tire, and many need a cool-down after ~15–20 minutes of continuous running. If you regularly fill large or fully-flat tires, favor a higher-airflow unit or a 12V compressor over the smallest pocket models.",
    },
  ],
  mistakes: [
    "Buying on the biggest PSI number when you drive a car that needs 35 — you're paying for headroom you'll never touch.",
    "Grabbing a bare-tool DeWalt or Milwaukee without owning the batteries, then paying twice as much once you add a battery and charger.",
    "Choosing a unit with no preset auto-shutoff and having to stand there watching the gauge every time.",
    "Expecting a tiny glovebox inflator to fill a dead SUV tire fast — those shine at top-offs, not full inflations.",
    "Letting a cordless unit sit uncharged in a hot trunk for months, then finding it flat the one time you need it.",
  ],
  tradeoffs:
    "Convenience, speed, price and 'always-ready' all pull against each other. Premium cordless units (Fanttik, HOTO) are the nicest to use and the most portable, but cost the most and must be kept charged. Tool-battery models (DeWalt, Milwaukee) are fast and rugged but only make sense inside their ecosystem. The 12V corded EPAuto is the cheapest and never needs charging, but it's slower and tethered to the socket. The compact AstroAI L7 is the value sweet spot for pure top-offs. Match the pump to how you'll actually use it — a glovebox emergency top-off is a different job than filling four dead tires in a driveway.",
  products: TIRE_INFLATOR_PRODUCTS,
  meta: TIRE_INFLATOR_META,
  sorts: [
    { id: "rank", label: "Top pick", crown: "Editor's choice" } as SortOption,
    { id: "power", label: "Most PSI", crown: "Highest max pressure", key: "maxPressurePsi", dir: "desc" },
    { id: "fastest", label: "Fastest fill", crown: "Highest airflow", key: "inflationSpeedLpm", dir: "desc" },
    { id: "price", label: "Best price", crown: "Lowest price", key: "price", dir: "asc" },
  ],
  relatedGuides: [],
  decisionPicks: {
    overall: "fanttik-x8-apex-portable-tire",
    value: "astroai-cordless-tire-inflator-160",
    premium: "hoto-portable-tire-inflator-pro",
  },
  specsThatMatter: {
    decisive: [
      "Preset auto-shutoff — set a target PSI, press start, walk away. It's the one feature that separates a modern inflator from one you have to babysit.",
      "Power source matched to how you'll use it: rechargeable (grab-and-go), 12V corded (never needs charging), or a tool battery you already own.",
      "A digital gauge you can actually read — especially for a roadside fill in the dark.",
    ],
    noise: [
      "“Fastest inflation” claims — makers publish airflow inconsistently (seconds-per-tire, CFM, or nothing), so “fastest” is rarely a like-for-like comparison.",
      "A sky-high max PSI (150–160) — cars only need ~35 PSI, so anything 120+ is already huge overkill; you're paying for headroom you'll never touch.",
      "A big battery mAh headline — nice for more fills per charge, but it doesn't make the pump fill any faster.",
    ],
  },
  faq: [
    {
      q: "What PSI tire inflator do I need for a car?",
      a: "Far less than the box implies. Passenger tires run around 30–35 PSI, so a 120 PSI ceiling is already massive overkill. Higher numbers (150–160) only matter for light-truck and SUV tires, high-pressure road bikes, and general margin. Don't overpay for pressure you'll never use — spend on auto-shutoff and a good gauge instead.",
    },
    {
      q: "Are cordless tire inflators reliable enough for emergencies?",
      a: "Yes, if you keep them charged. A rechargeable unit is the most convenient and lives in any bag, but a flat battery is useless on a dark roadside. If you want a true “never fails” backup, a 12V corded unit like the EPAuto runs off the car battery and is always ready — just slower and tethered to the socket.",
    },
    {
      q: "Is a bare-tool DeWalt or Milwaukee inflator a good deal?",
      a: "Only if you already own that brand's batteries. The bare tool is cheap, but adding a battery and charger roughly doubles the price and erases the savings. If you're already in the DeWalt or Milwaukee ecosystem, the bare tool is the smart buy; if not, a self-contained cordless unit is cheaper overall.",
    },
    {
      q: "What does preset auto-shutoff actually do?",
      a: "You dial in a target PSI, press start, and the pump stops itself at exactly that pressure — no standing there watching a gauge and toggling it on and off. It's the whole point of a modern inflator, and every pick here has it. A cheap unit without it forces you to babysit every fill.",
    },
    {
      q: "Can a small inflator fill a fully flat tire?",
      a: "It can, but slowly, and many pocket units need a cool-down after 15–20 minutes of continuous running. Compact inflators shine at top-offs; if you regularly fill large or fully-flat tires, favor a higher-airflow cordless or a 12V compressor built for longer runs.",
    },
  ],
  // ── Verified-buyer review synthesis — qualitative patterns that recur across owner reviews for THIS
  //    lineup (Fanttik X8 APEX, AstroAI 160 / L7, DeWalt DCC020IB, Milwaukee 2475-20, HOTO Pro, EPAuto).
  //    Grounded in real review reading (Best Buy, Home Depot, Walmart, Amazon, Tom's Guide, Pro Tool
  //    Reviews, Bike Perfect). QUALITATIVE ONLY — no counts, no percentages, no invented quotes. ──
  ownerInsights: [
    {
      pattern: "“Set the PSI and walk away” is the feature owners actually love",
      detail:
        "Across every pick, the review owners come back to isn't power or speed — it's the preset auto-shutoff. People consistently describe dialing in a target pressure, pressing start, and not having to stand there watching a gauge and toggling the pump on and off.",
      sentiment: "loved",
    },
    {
      pattern: "Small enough to just live in the car",
      detail:
        "The pocket units (Fanttik X8, AstroAI L7, HOTO) draw steady praise for being compact and light enough to leave in a glovebox or trunk permanently, so the pump is actually there the morning a tire warns low — the whole reason people bought one.",
      sentiment: "loved",
    },
    {
      pattern: "The power-bank / USB trick is a quiet favorite",
      detail:
        "Owners of the units that double as a battery bank (Fanttik X8, AstroAI L7) repeatedly mention topping off a dead phone on the roadside as an unexpected bonus — a small feature that keeps coming up as a reason they're glad they chose that model.",
      sentiment: "loved",
    },
    {
      pattern: "Heat forces a cool-down after a tire or two",
      detail:
        "The most common recurring gripe on the cordless pocket units (Fanttik, HOTO, AstroAI) is overheating: owners report the pump getting hot and needing to rest after inflating one or two tires, and manufacturers themselves suggest a break between big fills. Fine for top-offs, frustrating on multiple flats.",
      sentiment: "watch",
    },
    {
      pattern: "A cordless unit can be dead the one time you need it",
      detail:
        "A repeated long-term complaint is a rechargeable pump left in a hot trunk that won't turn on after long storage, or a battery that drains after a single full inflation. Owners who treat these as “buy once, forget it” emergency tools are the ones most often disappointed; the 12V EPAuto sidesteps this by running off the car.",
      sentiment: "watch",
    },
    {
      pattern: "Out-of-warranty piston/valve failure is the recurring durability pattern",
      detail:
        "Across the tool-brand and budget units alike (DeWalt, Milwaukee, EPAuto, AstroAI), a recurring theme is a pump that works well for a while, then stops — owners describe worn piston seals or failed check valves, often just past the warranty, with parts hard or impossible to source. Reliability is generally good, but this failure mode is the one owners warn about.",
      sentiment: "watch",
    },
  ],
  // ── Rejected models — real inflators that didn't make the lineup, each with the one honest reason ──
  competition: [
    {
      name: "Xiaomi Portable Electric Air Compressor 1S",
      reason:
        "Precise (±1 PSI) and popular, but among the slowest in its class — independent testing clocked ~13 minutes to fill a fully-deflated 215/60R16 tire, roughly double a mainstream inflator. Fine for top-offs, painful for anything larger.",
    },
    {
      name: "Ryobi P737D 18V ONE+ High-Pressure Inflator",
      reason:
        "Fast and a great value inside the Ryobi system, but it's a bare tool that only pays off if you already own ONE+ batteries, and the digital readout reads a couple PSI high — reviewers found the tire ~2 PSI under target once the nozzle came off, so you have to top off again.",
    },
    {
      name: "Makita DMP180ZX 18V LXT Inflator",
      reason:
        "Solid Makita build with a real auto-stop, but it has no trigger lock — you still stand there holding the trigger for the whole fill, which defeats the 'set it and walk away' point — on top of a 120 PSI ceiling and bare-tool pricing.",
    },
    {
      name: "Avid Power 20V Cordless Tire Inflator",
      reason:
        "Cheap and competent on the gauge, but it was the loudest unit in independent testing (~89.5 dB) and draws recurring durability and early-failure complaints — not the reliability you want from an emergency pump.",
    },
    {
      name: "Bosch UniversalPump 18V",
      reason:
        "Genuinely fast (~30 L/min to 150 PSI) and well-made, but it's a bare tool locked to Bosch's 18V battery platform, which few US garages own — buying into that ecosystem just for an inflator is poor value here.",
    },
    {
      name: "VacLife 150 PSI Cordless Tire Inflator (7500mAh)",
      reason:
        "Inexpensive and well-reviewed on average, but owner reports show a recurring reliability pattern — units failing within weeks, erratic gauge readings, and self-cycling on/off — the one failure mode you can't tolerate in a roadside backup.",
    },
  ],
  // ── The #1 pick's genuine flaws — real, but not dealbreakers ──
  winnerFlaws: [
    "It's a premium price for a pocket-size inflator — part of what you pay for is the dual display, USB-C power-bank extras and finish, not just raw pumping power.",
    "It recharges over USB-C rather than accepting swappable tool batteries, so if you let it run flat there's no spare pack to drop in — you wait for it to charge.",
    "The compact motor is tuned for top-offs; on a fully-flat SUV or light-truck tire it's slower than a 12V compressor and, like most pocket units, benefits from a cool-down between back-to-back big fills.",
  ],
  // ── Honest de-selection — when to skip the top pick or the whole category ──
  skipThisIf: [
    "You routinely fill large, fully-flat light-truck or SUV tires — a pocket unit like the X8 is slower and heat-limited on big volumes; a 12V compressor (the EPAuto here) or a corded pancake compressor fills faster.",
    "You want something that literally never needs charging — a rechargeable pocket inflator can be dead in a hot trunk the one time you need it, so a 12V corded unit is the safer always-ready backup.",
    "You already own DeWalt, Milwaukee or Ryobi 18V/20V batteries — buy the bare tool in your ecosystem instead of paying again for a self-contained unit.",
    "You need to seat a tubeless tire bead — no small portable inflator delivers the sharp, high-volume burst that requires; use a shop compressor with a tank.",
  ],
  // ── Revision trail — real state only ──
  changelog: [
    {
      date: "2026-07-09",
      note: "Published. Specs, power sources, and known-issue patterns for every pick and every rejected model verified against manufacturer spec pages (DeWalt, Milwaukee, Makita) and independent test reviews (Bob Vila, Tom's Guide). Per-unit star ratings and airflow (L/min) left blank where no verifiable figure exists rather than guessed.",
    },
  ],
  // ── Guide-level clickable citations backing the key specs and verdicts ──
  sources: [
    { label: "Fanttik X8 APEX — product listing & specs (Amazon)", url: "https://www.amazon.com/dp/B09YD2D96V" },
    { label: "DeWalt DCC020IB — official product page (20V / 12V / 110V)", url: "https://www.dewalt.com/product/dcc020ib/20v-max-corded-cordless-air-inflator" },
    { label: "Milwaukee M12 2475-20 — official specs (true 120 PSI, auto-shutoff)", url: "https://www.milwaukeetool.com/Products/Power-Tools/Automotive-Tools/2475-20" },
    { label: "Makita DMP180ZX — official specs (120 PSI, auto-stop)", url: "https://makitatools.com/products/details/DMP180ZX" },
    { label: "Bob Vila — Ryobi P737D hands-on inflator test", url: "https://www.bobvila.com/articles/ryobi-tire-inflator/" },
    { label: "Tom's Guide — Avid Power tire inflator review (noise & heat)", url: "https://www.tomsguide.com/reviews/avid-power-tire-inflator" },
  ],
};
