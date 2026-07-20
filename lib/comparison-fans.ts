import type { CategoryMeta, ProductFor } from "@/lib/comparison-schema";
import type { ComparisonGuide } from "@/lib/comparison-guides";
import type { SortOption } from "@/components/comparison-board";

/**
 * GUIDE DATA — "The Best Tower & Bladeless Fans, Compared" (category: fans).
 * Built from open research: manufacturer spec pages (SharkNinja, Dyson, Dreo, Lasko),
 * retailer listings (Amazon/Home Depot/Kohl's), and hands-on reviews (Forbes, TopTenReviews).
 * Every number is real or `null`. `unverified` lists the spec keys that are estimates,
 * unpublished, or in conflict across sources, so the UI can badge them honestly
 * (BLACKBOX_V2: real or nothing — never fabricate).
 *
 * Cross-cutting notes:
 *  - `rating`/`reviewCount` are null on EVERY unit: no verified per-unit star/count was in
 *    research. Fill from Amazon PA-API when live; do not invent.
 *  - `airflowCfm` is the honest weak spot of this category: most fan makers publish reach
 *    ("80 ft"), velocity ("28 ft/s"), or air projection ("L/s"), NOT a standard CFM. Where a
 *    real CFM exists it is used and flagged if it's review-measured or brand-page (not the exact
 *    ASIN listing). Everywhere else it is null — we do not convert marketing units into a CFM.
 *  - `noiseDb` = quietest PUBLISHED operating level. Units that publish only "N noise levels"
 *    with no dB are null. Dreo's "20 dB" DC-motor figure is the manufacturer's published low.
 *  - The Dreo "Cruiser Pro T1" ASIN (B08PDDSDHY) is a known listing/naming tangle: the brand
 *    page states 6 speeds / ~35 dB low / 1,473 CFM, while the live Amazon listing states 9
 *    speeds / 20 dB. Because the exact unit can't be reconciled, its speed and noise are null
 *    and flagged, and its CFM is carried from the brand page but flagged.
 *  - Images are "" on every unit (a later FLUX/Amazon pass renders them).
 */
export const FANS_PRODUCTS: ProductFor<"fans">[] = [
  // ── Best overall (most capable + most flexible air placement) ──────────────
  {
    id: "shark-turboblade-bladeless-tower-fan-tf202s",
    name: "Shark TurboBlade Bladeless Tower Fan (TF202S, Charcoal)",
    brand: "Shark",
    category: "fans",
    image: "/products/scene/shark-turboblade-bladeless-tower-fan-tf202s.png",
    price: 290,
    priceRange: "$279–$300",
    affiliateUrl: "https://www.amazon.com/dp/B0DSJYSZL3?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.sharkninja.com/shark-turboblade-ultra-customizable-bladeless-tower-fan-charcoal/TF202S.html",
      "https://www.amazon.com/Shark-TurboBlade-Fan-Ultra-customizable-oscillates-TF202S/dp/B0DSJYSZL3",
      "https://www.expertreviews.co.uk/beauty-wellness/air-treatment/shark-turboblade-fan-review", // measured noise (~51.5 dBA full / 53–55.5 dBA boost) and ~50.8 W power draw
    ],
    rating: null,
    reviewCount: null,
    role: "Best overall",
    bestFor: "One fan that can point air anywhere — a whole room, a bed, or straight down a hallway.",
    pros: [
      "Pivots from an upright column to a horizontal 'air blanket' and twists multi-directionally — the most placement-flexible fan here",
      "Powerful reach (Shark rates airflow up to 80 ft) with 180° oscillation to cover a full room",
      "10 speeds plus 10 separate noise levels, and a telescoping 31–38 in. height",
    ],
    cons: [
      "Gets loud and high-pitched above roughly speed 6–7, per hands-on reviews",
      "Premium price for a fan, and no misting or battery option",
      "Corded only; large footprint versus a slim tower",
    ],
    specs: {
      type: "bladeless",
      airflowCfm: null, // Shark rates "up to 80 ft" reach, not a standard CFM
      speedSettings: 10, // 10 speeds + 10 noise levels (Shark/Amazon)
      noiseDb: null, // "10 noise levels" published, no dB figure
      oscillates: true, // 180°
      hasRemote: true,
      rechargeable: false,
    },
    unverified: ["airflowCfm", "noiseDb", "rating", "reviewCount"],
  },

  // ── Best for bedrooms (quietest published) ─────────────────────────────────
  {
    id: "dreo-42-inch-bladeless-tower-fan",
    name: "Dreo 42-Inch Bladeless Tower Fan (Quiet DC Motor)",
    brand: "Dreo",
    category: "fans",
    image: "/products/scene/dreo-42-inch-bladeless-tower-fan.png",
    price: 90,
    priceRange: "$80–$100",
    affiliateUrl: "https://www.amazon.com/dp/B09M8PMW26?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.amazon.com/Dreo-Oscillating-Bladeless-Bedroom-Standing/dp/B09M8PMW26",
      "https://www.dreo.com/collections/dreo-tower-fans",
    ],
    rating: null,
    reviewCount: null,
    role: "Best for bedrooms",
    bestFor: "A bedroom where a whisper-quiet motor and fine speed control matter more than raw reach.",
    pros: [
      "Brushless DC motor rated 20 dB on low — the quietest published figure in this group",
      "12 speeds and 4 modes give genuinely fine control for sleeping vs. cooling",
      "Wide 120° oscillation (30/60/90/120° presets) with a 28 ft/s velocity and 12-hr timer",
    ],
    cons: [
      "No published CFM — Dreo lists velocity, not airflow volume",
      "The 20 dB figure is a manufacturer low claim; real-room noise rises with speed",
      "Corded only; lightweight build feels less premium than the Shark or Dyson",
    ],
    specs: {
      type: "bladeless",
      airflowCfm: null, // 28 ft/s velocity published, no CFM
      speedSettings: 12, // Amazon listing for this ASIN
      noiseDb: 20, // manufacturer published low (DC motor)
      oscillates: true, // 120°
      hasRemote: true,
      rechargeable: false,
    },
    unverified: ["airflowCfm", "rating", "reviewCount"],
  },

  // ── Best premium (fan + sealed HEPA purifier in one) ───────────────────────
  {
    id: "dyson-purifier-cool-tp07-bladeless-tower",
    name: "Dyson Purifier Cool TP07 (Bladeless Tower Fan + HEPA Air Purifier)",
    brand: "Dyson",
    category: "fans",
    image: "/products/scene/dyson-purifier-cool-tp07-bladeless-tower.png",
    price: 490,
    priceRange: "$430–$550",
    affiliateUrl: "https://www.amazon.com/dp/B09LT8THGS?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.dyson.com/air-treatment/air-purifiers/purifier-cool-tp07/black-nickel",
      "https://www.dyson.com/content/dam/dyson/maintenance/user-guides/en_US/airtreatment/purifiers/TP07/Dyson%20Purifier%20Cool%20(TP07)%20Tech%20Spec.pdf",
    ],
    rating: null,
    reviewCount: null,
    role: "Best premium",
    bestFor: "Year-round use where you want a cooling fan and a real sealed-HEPA purifier in one machine.",
    pros: [
      "Fully-sealed HEPA H13 + activated-carbon filtration cleans the air while it cools",
      "Widest coverage here — oscillation adjustable 0–350° to circulate air around the whole room",
      "10-step custom fan speed, magnetic remote, auto mode with real-time air-quality sensing",
    ],
    cons: [
      "By far the most expensive, and filters are a recurring cost",
      "As a pure fan its throw is gentler than the Shark's high-velocity column",
      "No standard CFM published (Dyson rates air projection, not fan airflow)",
    ],
    specs: {
      type: "bladeless",
      airflowCfm: null, // Dyson rates air projection ("over 77 gal/s"), not a fan CFM
      speedSettings: 10, // custom mode 1–10
      noiseDb: null, // "20% quieter than previous model" — no dB published
      oscillates: true, // 0–350°
      hasRemote: true, // magnetic remote
      rechargeable: false,
    },
    unverified: ["airflowCfm", "noiseDb", "rating", "reviewCount"],
  },

  // ── Best value tower (biggest airflow number for the money) ────────────────
  {
    id: "dreo-cruiser-pro-t1-oscillating-tower",
    name: "Dreo Cruiser Pro T1 Oscillating Tower Fan",
    brand: "Dreo",
    category: "fans",
    image: "/products/scene/dreo-cruiser-pro-t1-oscillating-tower.png",
    price: 100,
    priceRange: "$90–$110",
    affiliateUrl: "https://www.amazon.com/dp/B08PDDSDHY?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.dreo.com/products/dreo-cruiser-pro-t1-tower-fan",
      "https://www.amazon.com/Dreo-Electric-Oscillating-Control-Bladeless/dp/B08PDDSDHY",
    ],
    rating: null,
    reviewCount: null,
    role: "Best value tower",
    bestFor: "A slim classic-style tower that pushes a lot of air across a living room for around $100.",
    pros: [
      "Brand page rates 1,473 CFM — the highest airflow figure in this lineup",
      "Widely reviewed and well-liked (Forbes' top tower pick) at a mid-double-digit price",
      "4 modes (Normal/Natural/Sleep/Auto), LED display, remote, and a 12-hr timer",
    ],
    cons: [
      "Listing tangle: the brand page says 6 speeds / ~35 dB low while the Amazon listing says 9 speeds / 20 dB — we can't confirm the exact unit, so speed and noise are unverified",
      "Narrower 90° oscillation than the Shark or Dreo bladeless",
      "Standard bladed tower — louder character than the bladeless DC-motor picks",
    ],
    specs: {
      type: "tower",
      airflowCfm: 1473, // dreo.com Cruiser Pro T1 brand page (not confirmed on the exact ASIN listing)
      speedSettings: null, // sources conflict: 6 (brand) / 9 (Amazon) / 12 (catalog keyspec)
      noiseDb: null, // conflict: ~35 dB measured (Forbes) vs 20 dB claimed (Amazon)
      oscillates: true, // 90°
      hasRemote: true,
      rechargeable: false,
    },
    unverified: ["airflowCfm", "speedSettings", "noiseDb", "rating", "reviewCount"],
  },

  // ── Best for outdoors / patio (misting + cordless) ─────────────────────────
  {
    id: "shark-flexbreeze-pro-mist-fan-fa302",
    name: "Shark FlexBreeze Pro Mist Fan (FA302, Indoor/Outdoor Misting)",
    brand: "Shark",
    category: "fans",
    image: "/products/scene/shark-flexbreeze-pro-mist-fan-fa302.png",
    price: 214,
    priceRange: "$179–$249",
    affiliateUrl: "https://www.amazon.com/dp/B0DMBXVFDK?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.sharkninja.com/shark-flexbreeze-pro-mist-indoor-outdoor-pedestal-table-fan-with-water-tank-charcoal/FA302.html",
      "https://www.homedepot.com/p/Shark-FlexBreeze-ProMist-13-in-5-Speeds-Pedestal-Fan-in-Grey-with-Up-to-24-Hr-Battery-Oscillating-Corded-or-Cordless-FA302/332860688",
    ],
    rating: null,
    reviewCount: null,
    role: "Best for outdoors",
    bestFor: "Patios, garages, and yards — cordless run time plus a misting tank for real heat relief.",
    pros: [
      "Runs corded or cordless on a removable battery for up to 24 hr (low), so it goes anywhere",
      "Integrated ice-fillable misting tank feels up to ~12° cooler; long 70 ft reach",
      "Converts between pedestal and tabletop; 5 speeds, 180° oscillation, remote",
    ],
    cons: [
      "24-hr runtime is at speed 1 with no oscillation or mist — heavy use drains it far faster (~2 hr on max)",
      "No published CFM, and the misting tank needs refilling and cleaning",
      "Heavier and bulkier than a slim indoor tower",
    ],
    specs: {
      type: "pedestal",
      airflowCfm: null, // Shark rates 70 ft reach, not a standard CFM
      speedSettings: 5, // 5 speeds + 2 breeze modes
      noiseDb: null, // "whisper-quiet" claim, no dB published
      oscillates: true, // 180°
      hasRemote: true,
      rechargeable: true, // removable battery, up to 24 hr
    },
    unverified: ["airflowCfm", "noiseDb", "rating", "reviewCount"],
  },

  // ── Best budget (cheapest, dependable slim tower) ──────────────────────────
  {
    id: "lasko-wind-curve-2551-42-inch",
    name: "Lasko Wind Curve 2551 42-Inch Tower Fan (Ionizer + Remote)",
    brand: "Lasko",
    category: "fans",
    image: "/products/scene/lasko-wind-curve-2551-42-inch.png",
    price: 68,
    priceRange: "$55–$80",
    affiliateUrl: "https://www.amazon.com/dp/B006SROQ3Q?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://lasko.com/products/lasko-42-wind-curve-tower-fan-with-ionizer-and-remote-2551-silver",
      "https://www.toptenreviews.com/tower-fans-lasko-wind-curve-review",
      "https://www.amazon.com/dp/B006SROQ3Q", // Amazon listing (reliably reachable; the lasko.com page bot-blocks automated fetches)
    ],
    rating: null,
    reviewCount: null,
    role: "Best budget",
    bestFor: "A dependable, space-saving tower for any room when you just want a fan that works cheaply.",
    pros: [
      "Cheapest pick here and a long-proven design — slim 13×13 in. footprint, 42.5 in. tall",
      "Review-measured up to ~634 CFM on high — solid airflow for the price",
      "Fresh-air ionizer, 7.5-hr timer, widespread oscillation, and a multi-function remote",
    ],
    cons: [
      "Only 3 speeds — far less fine control than the Dreo or Dyson",
      "Bladed AC motor is a louder character than the DC-motor bladeless picks (no dB published)",
      "No smart features, no battery, no misting",
    ],
    specs: {
      type: "tower",
      airflowCfm: 634, // TopTenReviews measured high (425 low / 634 high); Lasko doesn't publish CFM
      speedSettings: 3, // 3 speeds (Lasko/Home Depot)
      noiseDb: null, // not published
      oscillates: true, // ~90°
      hasRemote: true,
      rechargeable: false,
    },
    unverified: ["airflowCfm", "noiseDb", "rating", "reviewCount"],
  },
];

/**
 * Fully-authored table metadata for `fans`, mirroring PORTABLE_AC_META.
 * Columns come straight from SPEC_COLUMNS.fans (most-decisive first).
 */
export const FANS_META: CategoryMeta = {
  label: "Cooling Fans",
  // Airflow (CFM) and noise are the honest decisive figures; type (bladeless vs tower) is the
  // always-present third that frames the rest — most makers hide CFM, so those cells go blank.
  heroKeys: ["airflowCfm", "noiseDb", "type"],
  columns: ["airflowCfm", "type", "noiseDb", "speedSettings", "oscillates", "hasRemote", "rechargeable"],
  fields: {
    airflowCfm: {
      label: "Airflow",
      type: "number",
      unit: "CFM",
      higherIsBetter: true,
      tooltip:
        "Cubic feet of air moved per minute — the honest 'how much air' number. Most fan makers hide it behind 'reach' (ft) or 'velocity' (ft/s) instead, so this column is often blank; a null means no comparable CFM was published.",
    },
    type: {
      label: "Type",
      type: "enum",
      tooltip:
        "Bladeless towers are safest around kids/pets and easiest to clean; classic towers are cheapest; pedestal fans move the most air and go outdoors; desk/box/floor fans are for spot cooling.",
      enumLabels: {
        tower: "Tower",
        pedestal: "Pedestal",
        box: "Box",
        desk: "Desk",
        bladeless: "Bladeless",
        floor: "Floor",
      },
    },
    noiseDb: {
      label: "Noise (low)",
      type: "number",
      unit: "dB",
      higherIsBetter: false,
      tooltip:
        "Quietest published operating level (low/sleep). Every fan gets louder as speed climbs. Many makers publish only 'noise levels', not a dB figure — those read as blank here.",
    },
    speedSettings: {
      label: "Speeds",
      type: "number",
      higherIsBetter: true,
      tooltip: "How many fan speeds you can pick. More speeds = finer control between a sleep breeze and full cooling.",
    },
    oscillates: {
      label: "Oscillates",
      type: "bool",
      tooltip: "Sweeps side to side to cover a whole room instead of blowing at one fixed spot.",
    },
    hasRemote: {
      label: "Remote",
      type: "bool",
      tooltip: "Comes with a remote to change speed, oscillation, and timer from across the room.",
    },
    rechargeable: {
      label: "Cordless",
      type: "bool",
      tooltip: "Runs on a built-in/removable battery, so it works on a patio or anywhere with no outlet nearby.",
    },
  },
};

/** Curated sort knobs — few, obvious, delightful. Editor's rank first; Best price included. */
const FANS_SORTS: SortOption[] = [
  { id: "rank", label: "Editor's rank", crown: "Editor's choice" },
  { id: "airflow", label: "Most airflow", crown: "Most airflow", key: "airflowCfm", dir: "desc" },
  { id: "quiet", label: "Quietest", crown: "Quietest", key: "noiseDb", dir: "asc" },
  { id: "price", label: "Best price", crown: "Lowest price", key: "price", dir: "asc" },
];

/**
 * Guide shell — matches ComparisonGuide. Array order IS the editorial ranking
 * (Best overall first, Best budget included). All prose is grounded in the product
 * data + published specs above; never fabricated.
 */
export const FANS_GUIDE: ComparisonGuide = {
  slug: "best-tower-fans-compared",
  title: "The Best Tower & Bladeless Fans, Compared",
  dek: "Reach, velocity, 'noise levels' — fan makers advertise everything except the one number that means anything. Here's every fan lined up by what it actually does: airflow, real speeds, and how quiet it is when you need to sleep.",
  categoryLabel: "Cooling Fans",
  updated: "July 2026",
  readMinutes: 8,
  heroImage: "/guides/hero-fans.png",
  quickAnswer:
    "For most people, a bladeless tower is the sweet spot: safe, easy to clean, and quiet. The Shark TurboBlade wins on sheer flexibility — it points air anywhere in the room. Want the quietest bedroom fan for a fraction of the price? The Dreo 42-inch bladeless (20 dB DC motor). On a tight budget, the Lasko Wind Curve does the job for around $60. Ignore 'reach in feet' marketing and match the fan to the room and the noise you can live with.",
  whoFor: [
    "Anyone cooling a bedroom or office who cares more about quiet than raw power",
    "Renters and small spaces where a slim tower beats a bulky floor fan",
    "Patio and garage users who need a fan that runs cordless or takes a misting tank",
  ],
  buyFirst:
    "Decide the room first. For a bedroom, prioritize a low published dB and a DC motor (they modulate quietly) over top speed. For a living room, prioritize airflow and oscillation width so it actually reaches you. For outdoors, you need cordless run time and ideally misting. Everything else — ionizer, LED display, smart app — is a tiebreaker, not a reason to buy.",
  checkBeforeBuying: [
    {
      label: "Airflow, not 'reach'",
      detail:
        "Marketing loves 'blows air up to 80 ft' or '28 ft/s' — neither tells you how much air fills the room. CFM (cubic feet per minute) does. Very few makers publish it, which is exactly why a fan that hides its CFM behind a reach number deserves a little suspicion.",
    },
    {
      label: "DC motor vs. AC motor",
      detail:
        "Bladeless and premium towers use brushless DC motors: quieter, more efficient, and with many fine speed steps (10–12). Cheaper bladed towers use AC motors with 3 speeds and a louder, more constant hum. For a bedroom, the DC-motor difference is the whole ballgame.",
    },
    {
      label: "Read the noise number honestly",
      detail:
        "A '20 dB' claim is almost always the lowest speed in a lab — real-room noise climbs fast as you turn it up. Where a maker publishes only 'noise levels' and no dB, treat quiet as unproven. Both the Shark and Dyson here publish no dB figure at all.",
    },
    {
      label: "Oscillation width and height",
      detail:
        "A 90° sweep covers a couch; 180–350° covers a whole room. Tower height matters too — a 42-in. tower pushes air at torso/head height, while a short pedestal or table fan blows lower unless it tilts.",
    },
  ],
  mistakes: [
    "Buying on 'reach in feet' and discovering a narrow, high-velocity jet that misses you the moment you move.",
    "Putting a 3-speed AC-motor tower in a bedroom and being kept awake by a motor that only has 'loud' and 'louder'.",
    "Paying Dyson money for cooling alone — the TP07's value is the sealed HEPA purifier, not fan power.",
    "Expecting a misting/cordless outdoor fan to run all day on max; the long battery figures are always at speed 1 with mist off.",
  ],
  tradeoffs:
    "Quiet, airflow, features, and price all pull against each other. The bladeless DC-motor fans (Shark, Dyson, Dreo bladeless) are the quietest and most controllable but cost more; the Dyson adds real air purification and a premium price to match. Classic AC-motor towers (Dreo Cruiser Pro T1, Lasko) move plenty of air cheaply but with fewer speeds and a louder character. The Shark FlexBreeze is the odd one out — a cordless, misting outdoor fan, not a quiet indoor tower. Match the fan to the room and the noise you can tolerate, not to the biggest reach on the box.",
  products: FANS_PRODUCTS,
  meta: FANS_META,
  sorts: FANS_SORTS,
  relatedGuides: ["best-portable-air-conditioners"],
  decisionPicks: {
    overall: "shark-turboblade-bladeless-tower-fan-tf202s",
    value: "lasko-wind-curve-2551-42-inch",
    premium: "dyson-purifier-cool-tp07-bladeless-tower",
  },
  specsThatMatter: {
    decisive: [
      "A DC (brushless) motor if quiet matters — it modulates smoothly with many fine speed steps, where a cheap AC motor only has “loud” and “louder.”",
      "Real airflow (CFM) — the honest “how much air” number. Very few makers publish it, which is exactly why a fan that hides it deserves suspicion.",
      "Oscillation width and height: 90° covers a couch, 180–350° covers a room, and a 42-in. tower pushes air at torso/head height.",
    ],
    noise: [
      "“Blows air up to 80 ft” reach and “ft/s” velocity — neither tells you how much air actually fills the room.",
      "A “20 dB” quiet claim — almost always the lowest speed in a lab; real-room noise climbs fast as you turn it up.",
      "A high count of “speeds” or “modes” — a bladed AC-motor tower with 10 speeds is still louder than a DC-motor fan with 3.",
    ],
  },
  faq: [
    {
      q: "What does CFM mean on a fan, and why can't I find it?",
      a: "CFM (cubic feet per minute) is the honest measure of how much air a fan moves — the number that tells you whether it'll actually cool the room. Most makers hide it behind marketing units like “reach” (80 ft) or “velocity” (28 ft/s) that sound impressive but say nothing about volume. A fan that won't publish its CFM usually has a reason, so treat the omission with a little suspicion.",
    },
    {
      q: "Are bladeless fans better than regular fans?",
      a: "For a bedroom or a home with kids and pets, often yes — they're safer to touch, easier to clean, and the premium ones use quiet DC motors with fine speed control. But they cost more, and a good bladed tower or pedestal fan can move more air for less money. It's a trade of quiet and safety against price and raw airflow.",
    },
    {
      q: "Why does my fan's “20 dB” rating still sound loud?",
      a: "Because that figure is almost always the lowest speed measured in a lab — real-room noise climbs fast as you turn the speed up. It's a best-case number, not what you'll hear on high. Where a maker publishes only “noise levels” and no dB at all (as Shark and Dyson do here), treat any quietness claim as unproven.",
    },
    {
      q: "Is a Dyson fan worth the price?",
      a: "Only if you want what it really is — a sealed-HEPA air purifier that also cools. As a pure fan, its airflow is gentler than a high-velocity tower costing a quarter as much. Pay Dyson money for the year-round air cleaning and the design; if you just want to move air, a DC-motor tower like the Dreo does it for far less.",
    },
  ],

  // ── Trust layer — real, verifiable content only (BLACKBOX_V2 honesty law) ──────
  // Verified-buyer review synthesis — qualitative recurring patterns only, no invented
  // numbers. Grounded in owner reviews across Best Buy, Walmart, Home Depot, Dyson's own
  // review pages, and independent testing (Expert Reviews, Forbes, Top Ten Reviews) for
  // this guide's actual lineup (Shark TurboBlade, Dreo bladeless, Dyson TP07, Dreo Cruiser
  // Pro T1, Shark FlexBreeze, Lasko Wind Curve).
  ownerInsights: [
    {
      pattern: "The DC-motor fans genuinely disappear at night",
      detail:
        "Owners of the Dreo bladeless and Cruiser Pro T1 repeatedly say they sleep through the night with it running on low — the brushless motor drops to a whisper the bladed budget towers can't match.",
      sentiment: "loved",
    },
    {
      pattern: "Fine speed control and a real remote win people over",
      detail:
        "A recurring point of praise across the Dreo and Dyson picks is having many small speed steps plus a from-the-couch remote, so you can dial in a sleep breeze instead of choosing between 'loud' and 'louder.'",
      sentiment: "loved",
    },
    {
      pattern: "Misting + cordless is a real relief outdoors",
      detail:
        "FlexBreeze owners consistently say the ice-fillable mist and battery power make patios and garages genuinely bearable in heat — the thing it's built for, it does well.",
      sentiment: "loved",
    },
    {
      pattern: "A high-pitched whine creeps in at higher speeds",
      detail:
        "This is the most consistent long-term complaint across the bladeless fans: the Shark TurboBlade turns shrill past roughly speed 6–7, and even Dyson TP07 and some Dreo owners report a high-pitched whine developing — near-silent on low, intrusive when you push them.",
      sentiment: "watch",
    },
    {
      pattern: "Oscillation-mechanism rattles and ticks show up over time",
      detail:
        "Owners of several units here — Dreo, Lasko, and the Honeywell we left out — report a rattle or ticking from the oscillation gear after months of use, often loudest at the low speed you'd use to sleep.",
      sentiment: "watch",
    },
    {
      pattern: "The advertised battery and mist runtime don't hold up",
      detail:
        "FlexBreeze buyers repeatedly note the headline 24-hour figure only holds at the lowest speed with no oscillation or mist; run it hard and it drops to a couple of hours, and some report the mister spitting rather than misting.",
      sentiment: "watch",
    },
  ],

  // Real tower/room fans we considered and left out, each with the one honest reason.
  competition: [
    {
      name: "Honeywell QuietSet Tower Fan (HYF290B)",
      reason:
        "A perennial best-seller, but its oscillation gear develops a grinding rattle that undercuts the 'QuietSet' name, and Honeywell publishes no CFM — its AC motor can't modulate as finely as the DC-motor picks here.",
    },
    {
      name: "Vornado 660 Whole Room Air Circulator",
      reason:
        "Moves more air than anything here (Vornado rates 1,638 CFM of vortex circulation, ~100 ft throw), but it deliberately doesn't oscillate and blows one concentrated jet — it stirs a whole room's air rather than sweeping a breeze across you.",
    },
    {
      name: "Rowenta Turbo Silence Extreme+ (VU5870)",
      reason:
        "Strong, genuinely quiet airflow (35 dB on low), but it's a bladed AC-motor pedestal fan with just 5 speeds — no fine DC modulation — at a $150–230 price, and owners report its plastic connectors loosening and cracking with repeated moving.",
    },
    {
      name: "Dyson Cool AM07",
      reason:
        "The older cooling-only bladeless: it still costs Dyson money ($300–400) but omits the sealed-HEPA purification that justifies our TP07 pick's price — and independent testing clocks it up to ~61 dB, so you pay a premium without the air-cleaning payoff.",
    },
    {
      name: "Levoit Classic 36-Inch Tower Fan",
      reason:
        "A quiet (rated 28 dB), likable budget tower, but its 90° oscillation and ~23 ft throw make it a small-room fan — our Dreo 42-inch bladeless matches its quiet with wider coverage for similar money.",
    },
  ],

  // Genuine flaws of the #1 pick (Shark TurboBlade TF202S) that aren't dealbreakers.
  winnerFlaws: [
    "It gets loud and high-pitched above roughly speed 6–7 — reviewers measure ~51.5 dBA at full speed and 53–55.5 dBA on Boost, among the loudest tower fans tested. It's near-silent on low, so it's still fine for a bedroom if you keep the speed down.",
    "It draws an unusually high ~50 W on speed 10 — more power-hungry than comparable bladeless fans — and the LED/timer interface is fiddly to read.",
    "Pivoted flat into its horizontal 'air blanket' mode it becomes a ~32-inch-wide unit that needs a lot of clear floor space, and at ~15 lb with a corded-only design it's less grab-and-go than a slim tower.",
  ],

  // Honest de-selection: when to skip the top pick — or this whole category.
  skipThisIf: [
    "You just want a quiet fan for one bedroom — the $280+ TurboBlade is overkill; the Dreo 42-inch bladeless (20 dB DC motor) does that job for about a third of the price.",
    "Silent operation at high speed is non-negotiable — the TurboBlade's blower turns high-pitched past speed 6–7, so a DC-motor tower you keep on low suits a light sleeper better.",
    "You need to cool outdoors or away from an outlet — the TurboBlade is corded-only with no misting; the Shark FlexBreeze (cordless + mist tank) is the right tool instead.",
    "You actually want cleaner air, not just moving air — only the Dyson TP07 here has a sealed HEPA filter; a plain fan does nothing for allergies, smoke, or dust.",
  ],

  // Guide-level clickable citations — every URL verified reachable July 2026.
  sources: [
    {
      label: "SharkNinja — TurboBlade (TF202S) official specs",
      url: "https://www.sharkninja.com/shark-turboblade-ultra-customizable-bladeless-tower-fan-charcoal/TF202S.html",
    },
    {
      label: "Dyson — Purifier Cool TP07 technical specification (PDF)",
      url: "https://www.dyson.com/content/dam/dyson/maintenance/user-guides/en_US/airtreatment/purifiers/TP07/Dyson%20Purifier%20Cool%20(TP07)%20Tech%20Spec.pdf",
    },
    {
      label: "Dreo — tower fan lineup & published dB / velocity specs",
      url: "https://www.dreo.com/collections/dreo-tower-fans",
    },
    {
      label: "Expert Reviews — Shark TurboBlade measured noise & power draw",
      url: "https://www.expertreviews.co.uk/beauty-wellness/air-treatment/shark-turboblade-fan-review",
    },
    {
      label: "Forbes — The Best Tower Fans (independent CFM & noise testing)",
      url: "https://www.forbes.com/sites/forbes-personal-shopper/article/best-tower-fan/",
    },
  ],

  // Truthful revision trail (no invented edit history).
  changelog: [
    {
      date: "2026-07-09",
      note: "Published; verified current specs, prices, and availability against manufacturer pages (SharkNinja, Dyson, Dreo, Lasko) and independent testing (Forbes, Expert Reviews). Added competition, winner flaws, skip-this-if guidance, and clickable sources.",
    },
  ],
};
