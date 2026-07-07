import type { CategoryMeta, ProductFor } from "@/lib/comparison-schema";
import type { SortOption } from "@/components/comparison-board";
import type { ComparisonGuide } from "@/lib/comparison-guides";

/**
 * GUIDE DATA — "The Best Portable Jump Starters".
 * Cleaned from open research (manufacturer spec sheets + Amazon listings + hands-on reviews).
 * Every number is real or `null`. `unverified` lists the spec keys that are unpublished/estimated,
 * so the UI can badge them honestly (BLACKBOX_V2: real or nothing — never fabricate).
 *
 * Cross-cutting notes:
 *  - `rating`/`reviewCount` are null on ALL units: no verified per-unit star/count was in research.
 *    Fill from Amazon PA-API when live; do not invent.
 *  - `peakAmps` is the manufacturer's PEAK (surge) rating — the headline everyone quotes. It is NOT a
 *    sustained-cranking figure and brands measure it differently, so treat cross-brand amp gaps loosely
 *    and lean on the engine-size rating (`engineMaxLitersGas` + `dieselCapable`) for real capability.
 *  - `capacityMah` is the internal cell capacity where the maker publishes it. NOCO markets Wh, not mAh
 *    (GB40 = 24Wh / 2150mAh is published; GB70 publishes 56Wh but no mAh → null+flagged). Lead-acid and
 *    supercapacitor units don't have a comparable mAh figure at all (DeWalt / Autowit → null+flagged).
 *  - GOOLOO GP4000 is rated "all gas" (no liter ceiling published) → engineMaxLitersGas null+flagged.
 *  - The Autowit SuperCap 2 is a different class: batteryless (supercapacitor). It has no cells, no power
 *    bank, no USB, and no flashlight — it borrows a trickle of charge from any 12V source, then cranks.
 *  - Images: all set to "" (code-drawn fallback) until FLUX/Amazon images land in a later pass.
 */
export const JUMP_STARTER_PRODUCTS: ProductFor<"jump_starters">[] = [
  // ── Best overall (the category benchmark) ──────────────────────────────────
  {
    id: "noco-boost-gb40-1000a-ultrasafe",
    name: "NOCO Boost GB40 1000A UltraSafe Lithium Jump Starter",
    brand: "NOCO",
    category: "jump_starters",
    image: "/products/shot-noco-boost-gb40-1000a-ultrasafe.png",
    price: 90,
    priceRange: "$80–$100",
    affiliateUrl: "https://www.amazon.com/dp/B015TKUPIC?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://no.co/gb40/specs",
      "https://www.amazon.com/NOCO-GB40-UltraSafe-Lithium-Starter/dp/B015TKUPIC",
    ],
    rating: null,
    reviewCount: null,
    role: "Best overall",
    bestFor: "Any commuter, new driver, or owner of a typical sedan or small SUV who wants the safe, proven default.",
    pros: [
      "Honest (not inflated) 1000A rating that reliably starts most 4- and 6-cylinder cars — the unit everything else is compared against",
      "UltraSafe spark-proof + reverse-polarity protection makes it near-foolproof to hook up in the dark",
      "Genuinely pocketable, includes a 100-lumen LED flashlight with SOS/strobe, and holds ~20 jumps per charge",
    ],
    cons: [
      "Rated only up to 6.0L gas / 3.0L diesel — underpowered for big trucks and large diesels",
      "Small 2150mAh / 24Wh pack is a light phone top-up, not a real power bank",
      "5V/2.1A USB is slow next to newer 65W USB-C rivals",
    ],
    specs: {
      peakAmps: 1000,
      capacityMah: 2150, // 24Wh, published by NOCO
      engineMaxLitersGas: 6.0,
      dieselCapable: true, // up to 3.0L diesel
      builtInAirCompressor: false,
      usbPortCount: 1, // single 5V/2.1A USB-A output
      hasFlashlight: true, // 100-lumen, 7 modes
    },
    unverified: ["rating", "reviewCount"],
  },

  // ── Best for trucks / diesels (heavy-duty) ─────────────────────────────────
  {
    id: "noco-boost-hd-gb70-2000a",
    name: "NOCO Boost HD GB70 2000A UltraSafe Lithium Jump Starter",
    brand: "NOCO",
    category: "jump_starters",
    image: "/products/shot-noco-boost-hd-gb70-2000a.png",
    price: 165,
    priceRange: "$150–$180",
    affiliateUrl: "https://www.amazon.com/dp/B016UG6PWE?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://no.co/gb70",
      "https://www.amazon.com/NOCO-GB70-UltraSafe-Lithium-Gasoline/dp/B016UG6PWE",
    ],
    rating: null,
    reviewCount: null,
    role: "Best heavy-duty",
    bestFor: "Owners of trucks, big SUVs, diesels, boats and RVs, or anyone wanting maximum cranking headroom.",
    pros: [
      "Doubles the GB40's output to 2000A for large gas and diesel engines while keeping NOCO's safety pedigree",
      "Rated up to 8.0L gas / 6.0L diesel and holds ~40 jumps per charge — real headroom for big engines",
      "Brighter 400-lumen LED and a 12V/15A accessory output the GB40 lacks",
    ],
    cons: [
      "Bigger, heavier and pricier than the GB40 — overkill for a compact car",
      "NOCO publishes 56Wh but not a mAh figure, so pack capacity isn't directly comparable",
      "Still a modest 2.1A USB output despite the premium price",
    ],
    specs: {
      peakAmps: 2000,
      capacityMah: null, // 56Wh published; mAh not stated by NOCO
      engineMaxLitersGas: 8.0,
      dieselCapable: true, // up to 6.0L diesel
      builtInAirCompressor: false,
      usbPortCount: 1, // single USB-A output
      hasFlashlight: true, // 400-lumen, 7 modes
    },
    unverified: ["capacityMah", "rating", "reviewCount"],
  },

  // ── Best smart display (premium, information-rich) ─────────────────────────
  {
    id: "hulkman-alpha85-2000a-smart-jump",
    name: "Hulkman Alpha85 2000A Smart Jump Starter with LCD Display",
    brand: "Hulkman",
    category: "jump_starters",
    image: "/products/shot-hulkman-alpha85-2000a-smart-jump.png",
    price: 115,
    priceRange: "$100–$130",
    affiliateUrl: "https://www.amazon.com/dp/B08M41FX48?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.hulkman.com/pages/reference-85",
      "https://www.amazon.com/HULKMAN-Alpha85-Starter-20000mAh-Portable/dp/B08M41FX48",
    ],
    rating: null,
    reviewCount: null,
    role: "Best smart display",
    bestFor: "Buyers who want a premium, information-rich unit that still handles big engines.",
    pros: [
      "3.3-inch color LCD shows exact battery %, voltage and jump readiness — no guessing at LED dots",
      "Big 20000mAh / 74Wh pack doubles as a real power bank, and 65W USB-C recharges it in ~90 min",
      "Handles up to 8.5L gas / 6.0L diesel with a boost mode for a totally dead battery, plus IP65 and a 400-lumen light",
    ],
    cons: [
      "The color display adds cost over a bare booster",
      "Sold in several colors and bundles under different ASINs — confirm exactly which one you're buying",
      "Bulkier than a pocket unit like the GB40",
    ],
    specs: {
      peakAmps: 2000,
      capacityMah: 20000, // 74Wh
      engineMaxLitersGas: 8.5,
      dieselCapable: true, // up to 6.0L diesel
      builtInAirCompressor: false,
      usbPortCount: 2, // USB-A + USB-C (65W two-way)
      hasFlashlight: true, // 400-lumen, 5 modes
    },
    unverified: ["rating", "reviewCount"],
  },

  // ── Best value smart pick ──────────────────────────────────────────────────
  {
    id: "fanttik-t8-apex-2000a-jump",
    name: "Fanttik T8 Apex 2000A Jump Starter with LED Display, 65W PD",
    brand: "Fanttik",
    category: "jump_starters",
    image: "/products/fanttik-t8-apex-2000a-jump.png",
    price: 110,
    priceRange: "$90–$130",
    affiliateUrl: "https://www.amazon.com/dp/B09CTJMLQP?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://fanttik.com/products/fanttik-t8-apex-jump-starter-standard-package",
      "https://www.amazon.com/T8-APEX-Standard-Charging-Portable/dp/B09CTJMLQP",
    ],
    rating: null,
    reviewCount: null,
    role: "Best value smart pick",
    bestFor: "Buyers who want a premium look and feel plus a useful display in a small unit, often for less than the Alpha85.",
    pros: [
      "3.0-inch smart screen reads out live voltage and remaining charge, like the Alpha85 for often less money",
      "20000mAh pack with 65W two-way USB-C recharges fast (~1.5 hr) and powers phones/laptops",
      "Starts up to 8.5L gas / 6.0L diesel, even from 0% in about five minutes, with a 400-lumen SOS light",
    ],
    cons: [
      "Overlaps heavily with the Alpha85 — pick on price and looks, not capability",
      "Display and premium finish add cost over a plain booster",
      "Still a two-hand, glovebox-size unit, not pocketable",
    ],
    specs: {
      peakAmps: 2000,
      capacityMah: 20000,
      engineMaxLitersGas: 8.5,
      dieselCapable: true, // up to 6.0L diesel
      builtInAirCompressor: false,
      usbPortCount: 2, // USB-A + USB-C (65W PD)
      hasFlashlight: true, // 400-lumen, SOS/strobe
    },
    unverified: ["rating", "reviewCount"],
  },

  // ── Most cranking power ────────────────────────────────────────────────────
  {
    id: "gooloo-gp4000-4000a-peak-lithium",
    name: "GOOLOO GP4000 4000A Peak Lithium Jump Starter",
    brand: "GOOLOO",
    category: "jump_starters",
    image: "/products/gooloo-gp4000-4000a-peak-lithium.png",
    price: 110,
    priceRange: "$90–$130",
    affiliateUrl: "https://www.amazon.com/dp/B09HJH1S41?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://us.gooloo.com/products/gp4000-jump-starter",
      "https://www.amazon.com/GOOLOO-GP4000-Starter-SuperSafe-Portable/dp/B09HJH1S41",
    ],
    rating: null,
    reviewCount: null,
    role: "Most cranking power",
    bestFor: "Diesel and large-engine owners who want maximum surge headroom without paying NOCO GB70 money.",
    pros: [
      "4000A peak — the highest rating in this group — starts all gas engines and diesels up to 10.0L",
      "Big 24000mAh pack plus dual USB and USB-C makes it a capable power bank for long trips",
      "Wide -4°F to 140°F operating range and drop-resistant rubberized corners for real trunk abuse",
    ],
    cons: [
      "GOOLOO markets 'all gas' with no published liter ceiling, so gas headroom is a claim, not a tested number",
      "Peak-amp ratings from budget brands run optimistic — treat 4000A as marketing, not a like-for-like NOCO figure",
      "Heavier and bulkier than a pocket booster",
    ],
    specs: {
      peakAmps: 4000,
      capacityMah: 24000,
      engineMaxLitersGas: null, // "all gas" — no liter ceiling published
      dieselCapable: true, // up to 10.0L diesel
      builtInAirCompressor: false,
      usbPortCount: 3, // 2x USB-A (1 quick-charge) + USB-C
      hasFlashlight: true, // 3 modes: solid/strobe/SOS
    },
    unverified: ["engineMaxLitersGas", "rating", "reviewCount"],
  },

  // ── Best all-in-one (compressor + AC inverter) ─────────────────────────────
  {
    id: "dewalt-dxaeps14-2000-peak-amp",
    name: "DeWalt DXAEPS14 2000-Peak-Amp Jump Starter / Power Station",
    brand: "DeWalt",
    category: "jump_starters",
    image: "/products/dewalt-dxaeps14-2000-peak-amp.png",
    price: 225,
    priceRange: "$200–$250",
    affiliateUrl: "https://www.amazon.com/dp/B0CL8RYBKX?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.amazon.com/DEWALT-DXAEPS14-Type2-Automotive-Inverter-Compressor/dp/B0CL8RYBKX",
      "https://www.protoolreviews.com/dewalt-jump-starter-and-power-station-review/",
    ],
    rating: null,
    reviewCount: null,
    role: "Best all-in-one",
    bestFor: "A garage, jobsite, or overlander who wants jump-start, tire inflation, and AC/USB power in one box.",
    pros: [
      "Built-in 120 PSI digital air compressor with auto-stop tops up tires that a pocket booster can't touch",
      "500W AC inverter plus 15W USB-A and 25W USB-C ports run tools and devices off-grid",
      "2000 peak amps start 4-, 6-, and 8-cylinder gas or diesel engines; work light and alternator test built in",
    ],
    cons: [
      "Big, heavy AGM lead-acid unit — this is a stay-in-the-trunk power station, not a glovebox jumper",
      "Rated by cylinder count, not liters, so it's harder to compare engine capacity head-to-head",
      "Most expensive pick here, and the lead-acid pack self-discharges — you must recharge it periodically",
    ],
    specs: {
      peakAmps: 2000,
      capacityMah: null, // AGM lead-acid — no comparable mAh figure published
      engineMaxLitersGas: null, // rated by cylinder count, not liters
      dieselCapable: true, // starts diesel engines
      builtInAirCompressor: true, // 120 PSI digital
      usbPortCount: 2, // 15W USB-A + 25W USB-C (varies by SKU)
      hasFlashlight: true, // built-in LED work light
    },
    unverified: ["capacityMah", "engineMaxLitersGas", "usbPortCount", "rating", "reviewCount"],
  },

  // ── Best budget ────────────────────────────────────────────────────────────
  {
    id: "gooloo-gp2000-2000a-compact-lithium",
    name: "GOOLOO GP2000 2000A Compact Lithium Jump Starter",
    brand: "GOOLOO",
    category: "jump_starters",
    image: "/products/gooloo-gp2000-2000a-compact-lithium.png",
    price: 70,
    priceRange: "$60–$80",
    affiliateUrl: "https://www.amazon.com/dp/B0C5M36W2G?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://us.gooloo.com/products/gp2000-jump-starter",
      "https://www.amazon.com/GOOLOO-GP2000-Starter-Supersafe-Portable/dp/B0C5M36W2G",
    ],
    rating: null,
    reviewCount: null,
    role: "Best budget",
    bestFor: "The cheapest way to get a real 2000A booster in the glovebox for a typical car, SUV, or small truck.",
    pros: [
      "Cheapest unit here yet still rated up to 8.0L gas / 6.0L diesel — strong capability per dollar",
      "Genuinely compact and light at ~1.2 lb, easy to stash and carry",
      "Dual USB power bank, 400-lumen flashlight, and 10 safety protections including reverse-polarity",
    ],
    cons: [
      "Budget-brand peak-amp claims run optimistic — buy it for the engine rating, not the amp headline",
      "GOOLOO doesn't publish a mAh figure, so the power-bank capacity is unclear",
      "Fewer premium touches — no display, plainer build than the Alpha85 or Fanttik",
    ],
    specs: {
      peakAmps: 2000,
      capacityMah: null, // not published by GOOLOO
      engineMaxLitersGas: 8.0,
      dieselCapable: true, // up to 6.0L diesel
      builtInAirCompressor: false,
      usbPortCount: 2, // dual USB power bank
      hasFlashlight: true, // 400-lumen, normal/strobe/SOS
    },
    unverified: ["capacityMah", "rating", "reviewCount"],
  },

  // ── Best batteryless (no cells to age out) ─────────────────────────────────
  {
    id: "autowit-supercap-2-batteryless-supercapacitor",
    name: "Autowit SuperCap 2 Batteryless Supercapacitor Jump Starter",
    brand: "Autowit",
    category: "jump_starters",
    image: "/products/autowit-supercap-2-batteryless-supercapacitor.png",
    price: 110,
    priceRange: "$90–$130",
    affiliateUrl: "https://www.amazon.com/dp/B08LGL6339?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.autowit.com/autowit-supercap2-jump-starter/",
      "https://www.amazon.com/autowit-SuperCap-Battery-less-Extremely-Operating/dp/B086L29DL9",
    ],
    rating: null,
    reviewCount: null,
    role: "Best batteryless",
    bestFor: "The glovebox unit that's always ready — supercapacitors don't self-discharge or die from being stored for years.",
    pros: [
      "Batteryless supercapacitor holds a ~10-year shelf life and survives 100,000+ cycles — nothing to replace or babysit",
      "Works in brutal -40°C to 70°C temperatures where lithium packs fade",
      "Charges its caps in minutes from the car's own weak battery, a wall adapter, or another 12V source, then cranks",
    ],
    cons: [
      "Not a power bank — no internal cells means no USB charging and no flashlight",
      "Lower 800A peak and up to 4.0L diesel; needs some residual voltage or an external source to charge first",
      "Bulkier and heavier than its cranking output implies",
    ],
    specs: {
      peakAmps: 800,
      capacityMah: null, // supercapacitor — no battery, mAh not applicable
      engineMaxLitersGas: 8.0,
      dieselCapable: true, // up to 4.0L diesel
      builtInAirCompressor: false,
      usbPortCount: 0, // batteryless — no USB output at all
      hasFlashlight: false, // no built-in light
    },
    unverified: ["capacityMah", "rating", "reviewCount"],
  },
];

/** Fully-authored table metadata for jump starters — mirrors PORTABLE_AC_META's shape. */
export const JUMP_STARTER_META: CategoryMeta = {
  label: "Portable Jump Starters",
  columns: [
    "peakAmps",
    "engineMaxLitersGas",
    "capacityMah",
    "dieselCapable",
    "builtInAirCompressor",
    "usbPortCount",
    "hasFlashlight",
  ],
  fields: {
    peakAmps: {
      label: "Peak amps",
      type: "number",
      unit: "A",
      higherIsBetter: true,
      tooltip:
        "Manufacturer's peak (surge) cranking rating — the headline number. It's a momentary burst, not sustained output, and brands measure it differently, so don't over-trust small cross-brand gaps. The engine-size rating is the more honest capability check.",
    },
    engineMaxLitersGas: {
      label: "Max gas engine",
      type: "number",
      unit: "L",
      higherIsBetter: true,
      tooltip:
        "Largest gasoline engine the maker rates the unit to start, in liters of displacement. Match this to your vehicle — a 6.0L rating covers most cars; big trucks want 8.0L+.",
    },
    capacityMah: {
      label: "Battery capacity",
      type: "number",
      unit: "mAh",
      higherIsBetter: true,
      tooltip:
        "Internal cell capacity — how much it can also charge phones/laptops as a power bank. Blank where the maker publishes only watt-hours, or where the unit is lead-acid or supercapacitor (no comparable mAh).",
    },
    dieselCapable: {
      label: "Diesel-rated",
      type: "bool",
      tooltip: "Rated to start diesel engines, which need more cranking amps than gas engines of the same size.",
    },
    builtInAirCompressor: {
      label: "Air compressor",
      type: "bool",
      tooltip: "Has an onboard tire inflator — turns a dead-battery rescue tool into a two-in-one roadside kit.",
    },
    usbPortCount: {
      label: "USB ports",
      type: "number",
      unit: "ports",
      higherIsBetter: true,
      tooltip: "Number of USB output ports for charging devices. 0 means the unit is batteryless and can't act as a power bank.",
    },
    hasFlashlight: {
      label: "Flashlight",
      type: "bool",
      tooltip: "Built-in LED light, usually with SOS/strobe modes — genuinely useful for a night-time roadside failure.",
    },
  },
};

/**
 * Guide for the jump-starter comparison. Array order in JUMP_STARTER_PRODUCTS is the editorial rank
 * (Best overall first). All prose is grounded in the product data + published specs; never fabricated.
 */
export const JUMP_STARTER_GUIDE: ComparisonGuide = {
  slug: "best-jump-starters-compared",
  title: "The Best Portable Jump Starters, Compared",
  dek: "Peak-amp numbers are marketing — what actually starts your car is whether the unit is rated for your engine. Here's every pick compared by the specs that decide it: engine size, cranking power, and what else it does.",
  categoryLabel: "Jump Starters",
  updated: "July 2026",
  readMinutes: 8,
  heroImage: "/guides/hero-jump-starters.png",
  quickAnswer:
    "Ignore the giant peak-amp number on the box and match the unit to your engine. For a typical car or small SUV, the NOCO Boost GB40 (rated to 6.0L gas / 3.0L diesel) is the safe, proven default. Bigger truck or diesel? Step up to the NOCO GB70 or a 4000A GOOLOO. Want the cheapest capable booster? The GOOLOO GP2000 does 2000A for under $80. Want a unit that also inflates tires and runs AC power? The DeWalt DXAEPS14.",
  whoFor: [
    "Every driver who doesn't want to depend on a stranger and a second car in an empty lot after dark",
    "Truck, diesel, boat, and RV owners who need real cranking headroom",
    "Anyone tired of a lead-acid jump box that's always dead when they finally need it",
  ],
  buyFirst:
    "Buy on the engine rating, not the peak amps. A jump starter that says it handles 6.0L gas will start virtually any car; a big truck or diesel needs 8.0L+ gas or a diesel-specific rating. Diesels always demand more amps than a gas engine of the same size, so if you have one, only trust a unit that names a diesel figure. Everything else — LCD display, USB-C speed, air compressor, power-bank size — is a tiebreaker once the engine rating clears.",
  checkBeforeBuying: [
    {
      label: "Match the engine, not the amps",
      detail:
        "Peak-amp ratings are a momentary surge figure that budget brands inflate freely — a '4000A' unit isn't necessarily stronger than an honest '2000A' one. The number that matters is the engine size the maker rates it for. Find your engine's displacement (e.g. 3.5L V6) and buy a unit rated comfortably above it.",
    },
    {
      label: "Diesel needs its own rating",
      detail:
        "Diesel engines have much higher compression and need far more cranking current than a gas engine of the same size. Never assume a gas rating covers your diesel — look for an explicit diesel figure (e.g. '6.0L diesel') and give yourself margin in cold weather, when everything cranks harder.",
    },
    {
      label: "Lithium vs. supercapacitor vs. lead-acid",
      detail:
        "Most modern units are lithium: compact, double as a power bank, but slowly self-discharge and hate extreme heat. Supercapacitor units (Autowit) never age out and shrug off -40° cold, but store no charge — they borrow it and can't act as a power bank. Lead-acid power stations (DeWalt) are heavy and self-discharge but add a real air compressor and AC outlets.",
    },
    {
      label: "Keep it charged, or it won't save you",
      detail:
        "A lithium jump starter loses charge on the shelf and is useless at 0% when you finally need it. Top it up every few months (many have a display that shows the level). If you can't commit to that, a batteryless supercapacitor unit that charges on the spot is the more honest choice.",
    },
  ],
  mistakes: [
    "Buying to the biggest peak-amp number and putting an underpowered unit in front of a big diesel.",
    "Assuming a gas rating covers a diesel — it doesn't; diesels need a dedicated, higher rating.",
    "Leaving a lithium unit in the trunk for a year and finding it dead the one morning the car won't start.",
    "Paying for a color LCD and 65W USB-C when a plain $70 booster would start the same engine.",
  ],
  tradeoffs:
    "Cranking power, size, extra features, and price all pull against each other. Pocketable lithium units (NOCO GB40) are the easiest to carry but cap out at mid-size engines and small power banks. Big-capacity smart units (Hulkman Alpha85, Fanttik T8 Apex) add displays and fast USB-C but cost more and won't fit a pocket. The GOOLOO picks chase max amps and value at the expense of premium polish. The DeWalt is a whole roadside kit — compressor, AC inverter, work light — but it's a heavy stay-in-the-trunk box. And the Autowit trades the power-bank and flashlight entirely for a unit that's always ready and never needs replacing. Match the machine to your engine and your habits, not to the biggest number.",
  products: JUMP_STARTER_PRODUCTS,
  meta: JUMP_STARTER_META,
  sorts: [
    { id: "rank", label: "Top pick", crown: "Editor's choice" },
    { id: "power", label: "Most cranking power", crown: "Most peak amps", key: "peakAmps", dir: "desc" },
    { id: "biggest-engine", label: "Biggest engine", crown: "Biggest engine rating", key: "engineMaxLitersGas", dir: "desc" },
    { id: "price", label: "Best price", crown: "Lowest price", key: "price", dir: "asc" },
  ] as SortOption[],
  relatedGuides: [],
};
