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
    image: "",
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
    image: "",
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
    image: "",
    price: 99,
    priceRange: "$99 (tool only)",
    affiliateUrl: "https://www.amazon.com/dp/B07H39S9JQ?tag=blackboxsuppl-20",
    sourceUrls: ["https://www.amazon.com/dp/B07H39S9JQ"],
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
    image: "",
    price: 99,
    priceRange: "$99 (tool only)",
    affiliateUrl: "https://www.amazon.com/dp/B07CTY3W98?tag=blackboxsuppl-20",
    sourceUrls: ["https://www.amazon.com/dp/B07CTY3W98"],
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
    image: "",
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
    image: "",
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
    image: "",
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
  heroImage: "/home/car.jpg",
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
};
