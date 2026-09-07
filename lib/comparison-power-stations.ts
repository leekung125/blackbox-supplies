import type { ProductFor, CategoryMeta } from "@/lib/comparison-schema";
import type { ComparisonGuide } from "@/lib/comparison-guides";
import type { SortOption } from "@/components/comparison-board";
import { SPEC_COLUMNS } from "@/lib/comparison-schema";

/**
 * GUIDE DATA — "The Best Portable Power Stations, Compared".
 * Cleaned from open research (manufacturer spec pages + retailer datasheets + hands-on reviews).
 * Every number is real or `null`. `unverified` lists the spec keys that are estimates, N/A, or
 * unpublished so the UI can badge them honestly (BLACKBOX_V2: real or nothing — never fabricate).
 *
 * SCOPE NOTE: our catalog's "Power & Charging" category holds 8 products, but four of them are NOT
 * portable power stations and would be a category error in this table (all-null spec rows):
 *   - Jackery SolarSaga 100W (a solar PANEL / input accessory, no battery or output)
 *   - Anker Nano Car Charger 167.5W (a 12V socket charger)
 *   - BESTEK 300W Car Power Inverter (a 12V→AC inverter, no battery)
 * They are intentionally excluded. The Anker Prime power bank IS included as the honest edge case —
 * a pocket battery with no AC — clearly flagged, mirroring how the AC guide treated the EcoFlow WAVE 3.
 *
 * Cross-cutting notes:
 *  - `rating`/`reviewCount` are null on ALL units: no verified per-unit star/count was in research.
 *    Fill from Amazon PA-API when live; do not invent.
 *  - Capacity is watt-hours (Wh) — the "how long it runs" number. AC output is continuous watts —
 *    the "what it can run at once" number. Surge is the brief startup-spike ceiling.
 *  - The Anker Prime is a USB power bank: acOutputWatts/surgeWatts/solarInputWatts are N/A (null +
 *    flagged), acOutletCount is a true 0, and its cell chemistry is standard lithium, not LiFePO4.
 *  - Images: every unit carries a real /products/scene/*.png plate (rendered scene images).
 */
export const POWER_STATION_PRODUCTS: ProductFor<"power_stations">[] = [
  // ── Best overall (most usable power + biggest battery per dollar) ───────────
  {
    id: "bluetti-ac180-portable-power-station",
    name: "BLUETTI AC180 Portable Power Station",
    brand: "Bluetti",
    category: "power_stations",
    image: "/products/scene/bluetti-ac180-portable-power-station.webp",
    price: 549,
    priceRange: "$399–$699",
    affiliateUrl: "https://www.amazon.com/dp/B0C1SMJTDT?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.bluettipower.com/products/ac180",
      "https://www.amazon.com/BLUETTI-Portable-AC180-Generator-Off-grid/dp/B0C1SMJTDT",
      "https://www.pcworld.com/article/1966571/bluetti-ac180-power-station-review.html",
    ],
    rating: null,
    reviewCount: null,
    role: "Best overall",
    bestFor: "Home backup or a weekend off-grid where you want to run real appliances, not just charge gadgets.",
    pros: [
      "The most usable power here — 1,800W continuous (2,700W surge) runs most household appliances, and 1,152Wh is the biggest battery in this group",
      "Four AC outlets plus 500W solar input and long-life LiFePO4 cells rated 3,500+ cycles",
      "Fast AC recharge — 0–80% in about 45 minutes — so you can top off before a storm hits",
    ],
    cons: [
      "Heaviest unit here at ~35 lb — a two-hand carry, not a grab-and-go",
      "No wheels; the flat-brick shape is less comfortable to lug than a handled toolbox",
      "USB-C tops out at 100W (fine for laptops, but the pocket Anker beats it on port speed)",
    ],
    specs: {
      capacityWh: 1152,
      acOutputWatts: 1800,
      surgeWatts: 2700, // "Power Lifting" peak
      batteryChemistry: "lifepo4",
      acOutletCount: 4,
      usbcMaxWatts: 100,
      solarInputWatts: 500,
      weightLbs: 35.3,
    },
    unverified: ["rating", "reviewCount"],
  },

  // ── Best 1kWh all-rounder (lightest of the kilowatt class, fastest recharge) ─
  {
    id: "jackery-explorer-1000-v2-portable",
    name: "Jackery Explorer 1000 v2 Portable Power Station",
    brand: "Jackery",
    category: "power_stations",
    image: "/products/scene/jackery-explorer-1000-v2-portable.webp",
    price: 624,
    priceRange: "$449–$799",
    affiliateUrl: "https://www.amazon.com/dp/B0D7PPG25F?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.jackery.com/products/jackery-explorer-1000-v2",
      "https://outboundpower.com/products/jackery-explorer-1000-v2-portable-power-station-1070wh-1500w-400w-solar-input",
      "https://www.amazon.com/Jackery-Explorer-Portable-Generator-Emergency/dp/B0D7PPG25F",
    ],
    rating: null,
    reviewCount: null,
    role: "Best 1kWh all-rounder",
    bestFor: "The best all-round kilowatt station when portability and fast recharge matter as much as raw power.",
    pros: [
      "Nearly the same 1kWh class as the Bluetti but ~11 lb lighter (24 lb) — the easiest full-size station to actually carry",
      "3,000W surge is the highest here, so it starts stubborn motor loads the 1,800/1,600W units may trip on",
      "Emergency 1-hour full recharge, LiFePO4 cells rated 4,000 cycles, and Jackery's strong support network",
    ],
    cons: [
      "1,500W continuous and 1,070Wh trail the Bluetti's output and capacity",
      "Only 3 AC outlets, and one of the two USB-C ports is limited to 30W",
      "Premium pricing at the top of its range",
    ],
    specs: {
      capacityWh: 1070,
      acOutputWatts: 1500,
      surgeWatts: 3000,
      batteryChemistry: "lifepo4",
      acOutletCount: 3,
      usbcMaxWatts: 100, // second USB-C port is 30W
      solarInputWatts: 400,
      weightLbs: 23.8,
    },
    unverified: ["rating", "reviewCount"],
  },

  // ── Best compact (real AC power that's still easy to carry) ─────────────────
  {
    id: "ecoflow-river-2-pro-portable",
    name: "EcoFlow RIVER 2 Pro Portable Power Station",
    brand: "EcoFlow",
    category: "power_stations",
    image: "/products/scene/ecoflow-river-2-pro-portable.webp",
    price: 464,
    priceRange: "$329–$599",
    affiliateUrl: "https://www.amazon.com/dp/B0BVLPGS79?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.amazon.com/dp/B0BVLPGS79?tag=blackboxsuppl-20",
      "https://www.amazon.com/EF-ECOFLOW-Portable-Charging-Generator/dp/B0BVLPGS79",
    ],
    rating: null,
    reviewCount: null,
    role: "Best compact",
    bestFor: "Weekend camping and small backups where light weight beats maximum wattage.",
    pros: [
      "Genuinely luggable at 17.2 lb while still offering four AC outlets and 768Wh",
      "X-Boost lets the 800W inverter drive appliances rated up to 1,600W by trimming voltage",
      "Charges fully from a wall in ~70 minutes; LiFePO4 cells rated 3,000+ cycles",
    ],
    cons: [
      "800W continuous is the lowest of the real stations — high-draw appliances need X-Boost and may still fall short",
      "768Wh runs down faster than the 1kWh units on heavy loads",
      "220W solar input caps off-grid recharge speed",
    ],
    specs: {
      capacityWh: 768,
      acOutputWatts: 800,
      surgeWatts: 1600, // via X-Boost
      batteryChemistry: "lifepo4",
      acOutletCount: 4,
      usbcMaxWatts: 100,
      solarInputWatts: 220,
      weightLbs: 17.2,
    },
    unverified: ["rating", "reviewCount"],
  },

  // ── Best budget (cheapest real LiFePO4 station; backpack-light) ─────────────
  {
    id: "anker-solix-c300-portable-power",
    name: "Anker SOLIX C300 Portable Power Station",
    brand: "Anker",
    category: "power_stations",
    image: "/products/scene/anker-solix-c300-portable-power.webp",
    price: 239,
    priceRange: "$179–$299",
    affiliateUrl: "https://www.amazon.com/dp/B0D62GMQ3F?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.ankersolix.com/products/c300",
      "https://powerstationlab.com/anker-solix-c300-review/",
      "https://www.amazon.com/Anker-Portable-Generator-Traveling-Emergencies/dp/B0D62GMQ3F",
    ],
    rating: null,
    reviewCount: null,
    role: "Best budget",
    bestFor: "The budget and ultralight pick for keeping phones, a laptop, and a CPAP alive off-grid.",
    pros: [
      "Cheapest real station here yet still LiFePO4, with 300W AC (600W surge) and three AC outlets",
      "Backpack-light (~8 lb) and near-silent (25 dB) — ideal for tent camping and CPAP",
      "Class-leading USB-C: dual 140W ports fast-charge laptops and refill the unit itself",
    ],
    cons: [
      "288Wh is small — great for phones, a CPAP, and a laptop, not a fridge or power tools",
      "300W ceiling rules out microwaves, kettles, and most heating appliances",
      "Solar input is limited; Anker steers you to a 100W panel",
    ],
    specs: {
      capacityWh: 288,
      acOutputWatts: 300,
      surgeWatts: 600, // SurgePad
      batteryChemistry: "lifepo4",
      acOutletCount: 3,
      usbcMaxWatts: 140,
      solarInputWatts: 100, // Anker recommends a 60–100W panel; exact max-input figure not published
      weightLbs: 8.3, // sources vary ~8.3–9.1 lb
    },
    unverified: ["solarInputWatts", "weightLbs", "rating", "reviewCount"],
  },

  // ── Most portable (pocket power bank — NOT a station; no AC) ────────────────
  {
    id: "anker-prime-power-bank",
    name: "Anker Prime Power Bank (27,650mAh, 250W)",
    brand: "Anker",
    category: "power_stations",
    image: "/products/scene/anker-prime-power-bank.webp",
    price: 154,
    priceRange: "$129–$179",
    affiliateUrl: "https://www.amazon.com/dp/B0BYP2F3SG?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.anker.com/products/a1340-250w-power-bank",
      "https://www.cdw.com/product/anker-prime-power-bank-250-watt-27650-mah-99.54-wh/7801044",
    ],
    rating: null,
    reviewCount: null,
    role: "Most portable",
    bestFor: "Keeping laptops and phones charged on the move — a pocket backup, not a home power source.",
    pros: [
      "Pocket-size 99.5Wh that still pushes 250W total — enough to fast-charge a MacBook Pro, not just phones",
      "Two 140W USB-C ports (the fastest here) plus a clear LCD readout of watts and charge",
      "Under the 100Wh airline limit, so it flies with you as carry-on",
    ],
    cons: [
      "Not a power station — no AC outlets at all, so no appliances, wall-plug CPAP, or fridges",
      "Standard lithium (not LiFePO4), so fewer lifetime cycles than the stations",
      "99.5Wh is device-scale — a top-off tool, not backup for a room",
    ],
    specs: {
      capacityWh: 99.5, // 27,650mAh = 99.54Wh
      acOutputWatts: null, // N/A — no AC inverter
      surgeWatts: null, // N/A
      batteryChemistry: "nmc_lithium", // standard lithium power bank (not LiFePO4); exact cell chem unpublished
      acOutletCount: 0, // truly none
      usbcMaxWatts: 140, // per USB-C port; 250W total across ports
      solarInputWatts: null, // N/A — no solar input
      weightLbs: null, // not verified in research
    },
    // acOutputWatts/surgeWatts/solarInputWatts are N/A (no AC/solar); chemistry inferred; weight unverified.
    unverified: ["acOutputWatts", "surgeWatts", "batteryChemistry", "solarInputWatts", "weightLbs", "rating", "reviewCount"],
  },
];

/**
 * Fully-authored table metadata for power_stations. Mirrors PORTABLE_AC_META:
 * every column key in SPEC_COLUMNS.power_stations has a label, type, unit, bar direction,
 * a jargon tooltip, and enum labels where relevant.
 */
export const POWER_STATION_META: CategoryMeta = {
  label: "Portable Power Stations",
  // The two numbers people confuse decide everything (capacity Wh + continuous AC watts), and
  // chemistry (LiFePO4 vs NMC) sets whether it lasts a decade — those are the signature figures.
  heroKeys: ["capacityWh", "acOutputWatts", "batteryChemistry"],
  columns: SPEC_COLUMNS.power_stations,
  fields: {
    capacityWh: {
      label: "Battery capacity",
      type: "number",
      unit: "Wh",
      higherIsBetter: true,
      tooltip:
        "Watt-hours — the size of the tank, i.e. how long it runs. Rough feel: ~1,000Wh is a mini-fridge for most of a day, or ~10 laptop charges. This, not the mAh on a power bank, is the honest capacity number.",
    },
    acOutputWatts: {
      label: "AC output",
      type: "number",
      unit: "W",
      higherIsBetter: true,
      tooltip:
        "Continuous wall-outlet power — what it can run at once. It must exceed the running watts of your gear: a coffee maker or space heater wants ~1,000–1,500W; phones and laptops need almost nothing.",
    },
    surgeWatts: {
      label: "Surge peak",
      type: "number",
      unit: "W",
      higherIsBetter: true,
      tooltip:
        "The brief spike the inverter tolerates at startup. Anything with a motor or compressor — fridges, pumps, power tools — pulls 2–3× its running watts for a split second when it kicks on. Too low and the station trips.",
    },
    batteryChemistry: {
      label: "Battery type",
      type: "enum",
      tooltip:
        "LiFePO4 (LFP) lasts far longer — ~3,000+ charge cycles and safer, cooler chemistry — versus NMC lithium's ~500–800. For a station you keep for years, LFP is the one to want.",
      enumLabels: { lifepo4: "LiFePO4 (LFP)", nmc_lithium: "NMC lithium" },
    },
    acOutletCount: {
      label: "AC outlets",
      type: "number",
      unit: "outlets",
      higherIsBetter: true,
      tooltip: "How many standard wall plugs. More outlets means more devices at once without a power strip. Zero = no AC at all (a USB-only power bank).",
    },
    usbcMaxWatts: {
      label: "USB-C max",
      type: "number",
      unit: "W",
      higherIsBetter: true,
      tooltip:
        "Fastest single USB-C port. 100W fast-charges a laptop; 140W tops off the biggest MacBooks and lets the port double as a fast recharge input for the unit itself.",
    },
    solarInputWatts: {
      label: "Solar input",
      type: "number",
      unit: "W",
      higherIsBetter: true,
      tooltip: "Maximum solar the built-in charger accepts. Higher = faster off-grid recharge and room to pair a bigger panel. Panels are almost always sold separately.",
    },
    weightLbs: {
      label: "Weight",
      type: "number",
      unit: "lb",
      higherIsBetter: false,
      tooltip: "Lighter is easier to carry to a campsite or between rooms. 1kWh stations run 24–35 lb; sub-300Wh units are backpack-light.",
    },
  },
};

/**
 * Full comparison guide — the editorial shell around the live board.
 * Array order of products IS the editorial ranking (Best overall first, Best budget included).
 */
export const POWER_STATION_GUIDE: ComparisonGuide = {
  slug: "best-power-stations-compared",
  seoDescription:
    "Two numbers decide it - watt-hours (how long it runs) and watts (what it runs at once). Every station compared side by side on both.",
  title: "The Best Portable Power Stations, Compared",
  dek: "The two numbers that matter are watt-hours (how long it runs) and watts (what it can run at once) — and a cheap battery quietly oversells both. Here's every station compared by the specs that actually decide it, side by side.",
  categoryLabel: "Power Stations",
  updated: "July 2026",
  readMinutes: 8,
  heroImage: "/guides/hero-power-stations.png",
  quickAnswer:
    "Buy on two numbers: watt-hours (how long it runs) and watts (what it can run at once). For most people a ~1kWh LiFePO4 station like the BLUETTI AC180 (1,152Wh, 1,800W) powers a fridge, laptops, and phones through an outage or a weekend off-grid. Want the same class ~11 lb lighter and charged in an hour? The Jackery 1000 v2. Just need to keep phones and a CPAP alive camping? The Anker C300 does it for a third of the price. And skip anything that isn't LiFePO4 if you plan to keep it for years.",
  whoFor: [
    "Anyone in blackout country who wants the fridge, wifi, and phones to stay on through an outage",
    "Campers, vanlifers, and tailgaters who need real AC power away from a wall outlet",
    "CPAP users and remote workers who need silent, reliable overnight power",
  ],
  buyFirst:
    "Start with watt-hours (capacity) and continuous watts (output) — the two numbers that decide everything. Add up the running watts of what you'll plug in at once; the station's AC output must clear that, and its surge rating must cover the startup spike of anything with a motor. Then size watt-hours to how long you need it to last. After that, insist on LiFePO4 chemistry for cycle life, and let solar input, USB-C speed, and weight break the tie.",
  checkBeforeBuying: [
    {
      label: "Watt-hours vs. watts",
      detail:
        "Two numbers people constantly confuse. Watt-hours (Wh) is the size of the tank — how long it runs. Watts (W) is the size of the pipe — how much it can power at once. A big battery with a small inverter still can't start a microwave; a big inverter on a small battery runs it for only minutes. Match both to your job.",
    },
    {
      label: "Add up your surge loads",
      detail:
        "Anything with a motor or compressor — fridges, pumps, power tools, some coffee makers — briefly pulls 2–3× its running watts the instant it switches on. If the station's surge/peak rating can't cover that spike it trips and shuts off, even though the running watts looked fine. Read the surge column, not just AC output.",
    },
    {
      label: "LiFePO4, not NMC",
      detail:
        "Look for LiFePO4 (LFP) cells. They last roughly 3,000+ charge cycles versus ~500–800 for older NMC lithium, run cooler, and are safer. Every full station here is LFP — a USB power bank isn't, which is fine for a pocket backup you'll replace sooner, but not what you want in a station you keep for a decade.",
    },
    {
      label: "Recharge: wall and solar",
      detail:
        "How fast it refills matters as much as capacity. Fast AC charging (the Jackery and Bluetti hit ~80% in under an hour) lets you top off before a storm. Solar input sets your off-grid ceiling — higher watts means you can pair a bigger panel for faster sun charging. The panel is almost always sold separately.",
    },
  ],
  mistakes: [
    "Buying watt-hours but ignoring watts — then finding the giant battery can't start a fridge or run a hair dryer.",
    "Forgetting surge: the fridge runs fine until the compressor cycles and the station trips off in the night.",
    "Overpaying for capacity you'll never cycle. If it's for phones, a CPAP, and a laptop on weekends, a 288Wh unit is lighter, cheaper, and enough.",
    "Treating a USB power bank as a power station — no AC outlets means no appliances, no wall-plug CPAP, no fridge.",
    "Assuming the solar panel is included. It almost never is — budget for it separately or you've got a wall-only unit.",
  ],
  tradeoffs:
    "Capacity, output, weight, and price all pull against each other, and chemistry sets the price floor. The 1kWh LiFePO4 stations (Bluetti AC180, Jackery 1000 v2) run real appliances and last for years, but they're 24–35 lb and cost the most. Step down to the EcoFlow RIVER 2 Pro and you trade capacity and outright watts for a genuinely luggable 17 lb. The Anker C300 is the budget-and-backpack pick — enough for phones, a CPAP, and a laptop, not a fridge. And the Anker Prime is a different animal: a pocket power bank for devices, with no AC at all. Match the class to the load, not to the biggest watt-hour number.",
  products: POWER_STATION_PRODUCTS,
  meta: POWER_STATION_META,
  sorts: [
    { id: "rank", label: "Top pick", crown: "Editor's choice" },
    { id: "capacity", label: "Most capacity", crown: "Biggest battery", key: "capacityWh", dir: "desc" },
    { id: "power", label: "Most power", crown: "Most AC output", key: "acOutputWatts", dir: "desc" },
    { id: "price", label: "Best price", crown: "Lowest price", key: "price", dir: "asc" },
  ] satisfies SortOption[],
  relatedGuides: [],
  ownerInsights: [
    {
      pattern: "The LiFePO4 chemistry earns real long-term trust",
      detail:
        "Across the full stations here, owners consistently frame the LiFePO4 cells as the reason to buy — the recurring sentiment is confidence that a unit will still hold up years of weekend and outage use later, rather than fading like older lithium packs.",
      sentiment: "loved",
    },
    {
      pattern: "Fast emergency recharge actually delivers",
      detail:
        "For the Jackery and Bluetti especially, owners repeatedly single out the roughly one-hour recharge as the feature that justified the price — being able to top off fast before a storm or right after an outage comes up again and again as a genuine relief, not a spec-sheet number.",
      sentiment: "loved",
    },
    {
      pattern: "The near-silent compact picks live up to it",
      detail:
        "Owners of the smaller Anker unit consistently describe forgetting it is even running, and CPAP users in particular praise the quiet overnight operation — a real contrast to the fan complaints that dog the bigger stations.",
      sentiment: "loved",
    },
    {
      pattern: "Fans cycle up under light loads, not just heavy ones",
      detail:
        "The most common long-term gripe on the Bluetti AC180 and EcoFlow RIVER 2 Pro is the same: the cooling fan spins up and pulses even when powering something small like a laptop or mini-fridge, and reviewers repeatedly call it distracting at a desk or next to a bed. It is quiet-by-spec, not silent-in-practice.",
      sentiment: "watch",
    },
    {
      pattern: "Real-world runtime undershoots the headline watt-hours",
      detail:
        "A recurring owner complaint on the ~1kWh units is that high-draw appliances drain them far faster than the capacity number suggests — a small space heater or kettle can empty a 1,000Wh station in roughly an hour. Owners consistently learn to size for the load, not the sticker capacity.",
      sentiment: "watch",
    },
    {
      pattern: "Solar means the brand's panel, bought separately",
      detail:
        "Owners are repeatedly caught out that the panel is never included, and Jackery buyers in particular flag being locked to Jackery panels and an unusual solar connector — plus a rated solar input owners say is hard to actually reach with the recommended kit. Budget for the panel, and expect ecosystem lock-in.",
      sentiment: "watch",
    },
  ],
  competition: [
    {
      name: "EcoFlow DELTA 2",
      reason:
        "A strong 1,024Wh/1,800W LiFePO4 rival to the AC180, but its cooling fans spin up above ~120W and cycle on and off even at light loads — reviewers flag it as poor for a quiet bedroom or overnight CPAP — and it usually lists above the AC180 for the same output.",
    },
    {
      name: "Jackery Explorer 1000 Pro",
      reason:
        "Uses older NMC lithium rated for roughly 1,000 charge cycles rather than LiFePO4's 3,000–4,000, so its usable life is far shorter — Jackery has since discontinued it in favor of LFP models like the 1000 v2 that made this guide.",
    },
    {
      name: "Bluetti EB3A",
      reason:
        "The sub-$300 LFP alternative to the Anker C300, but owners and reviewers widely report its fan cycles on loudly even at low loads and in 'silent' mode — undercutting the near-silent tent-and-CPAP use the C300 is chosen for.",
    },
    {
      name: "Goal Zero Yeti 500X",
      reason:
        "Goal Zero charges a steep brand premium — around a full 1kWh LFP rival's price for only ~500Wh — and its AC and solar recharge are slower than the Jackery and Bluetti here, so you pay more for less capacity and a slower refill.",
    },
    {
      name: "Anker SOLIX C1000",
      reason:
        "A genuinely excellent 1,056Wh/1,800W LiFePO4 unit — it loses to the AC180 only on price-per-watt-hour and a slightly smaller battery, not on quality; a close call worth a look if it's discounted below the AC180.",
    },
  ],
  winnerFlaws: [
    "The cooling fans spin up under fairly light loads (owners report them tripping around 200W) and some units develop an audible whine — quiet by spec (rated 40–45 dBA) but not silent, so it isn't ideal sitting right next to a bed.",
    "DC/12V output efficiency is mediocre — real-world testing consistently puts its car/DC-socket output well below the best 1kWh units, so running 12V gear directly off it wastes more battery than average.",
    "At ~35 lb with no wheels and a flat-brick shape, it's the heaviest unit in this guide and a genuine two-hand carry, not a grab-and-go.",
  ],
  skipThisIf: [
    "You only need to keep phones, a laptop, and a CPAP alive off-grid — a 288Wh unit like the Anker SOLIX C300 is about a third of the price and light enough to backpack.",
    "You need whole-home backup — a furnace, well pump, central AC, or an electric range — which requires a permanently installed system with a transfer switch, not any portable station here.",
    "Weight is your hard limit: at ~35 lb with no wheels the AC180 is a two-hand lift, so the 17 lb EcoFlow RIVER 2 Pro or 24 lb Jackery 1000 v2 will actually get carried.",
    "You run a lot of 12V/DC gear directly off the unit — the AC180's below-average DC efficiency wastes more battery there, so a station with stronger DC output suits DC-heavy setups better.",
  ],
  changelog: [
    {
      date: "2026-07-09",
      note: "Published. Specs, battery chemistry, and cycle-life figures verified against manufacturer spec pages and independent reviews (Consumer Reports, PCWorld, StorageReview); competitor flaws cross-checked against published reviews and owner reports. Prices shown are approximate ranges and move with sales - confirm the current price on Amazon.",
    },
  ],
  sources: [
    { label: "BLUETTI AC180 — official spec sheet", url: "https://www.bluettipower.com/products/ac180" },
    { label: "Jackery Explorer 1000 v2 — official spec sheet", url: "https://www.jackery.com/products/jackery-explorer-1000-v2" },
    { label: "EcoFlow RIVER 2 Pro — official spec sheet", url: "https://www.amazon.com/dp/B0BVLPGS79?tag=blackboxsuppl-20" },
    { label: "Anker SOLIX C300 — official spec sheet", url: "https://www.ankersolix.com/products/c300" },
    { label: "Consumer Reports — Best Portable Power Stations (testing method & ratings)", url: "https://www.consumerreports.org/home-garden/generators/best-portable-power-stations-a4748703075/" },
    { label: "Consumer Reports — 5 Things to Know About Portable Power Stations (battery & inverter basics)", url: "https://www.consumerreports.org/portable-power-stations/portable-power-stations-things-to-know-battery-inverter-generators/" },
  ],
  decisionPicks: {
    overall: "bluetti-ac180-portable-power-station",
    value: "anker-solix-c300-portable-power",
    premium: "jackery-explorer-1000-v2-portable",
  },
  specsThatMatter: {
    decisive: [
      "Two numbers, not one: watt-hours (how long it runs) AND continuous watts (what it can run at once). A big battery with a small inverter still can't start a microwave.",
      "The surge/peak rating — anything with a motor (fridge, pump, power tool) briefly pulls 2–3× its running watts, and too low a surge trips the station.",
      "LiFePO4 (LFP) chemistry — ~3,000+ cycles vs ~500–800 for NMC: the difference between a unit that lasts a decade and one you replace.",
    ],
    noise: [
      "The headline “watts” alone — a huge inverter on a tiny battery runs your gear for only minutes.",
      "mAh on a power bank dressed up as a “power station” — with no AC outlets it can't run a single appliance.",
      "“Solar-ready” badges — the panel is almost always sold separately, so an off-grid setup costs more than the sticker.",
    ],
  },
  faq: [
    {
      q: "What's the difference between watt-hours and watts?",
      a: "Watt-hours (Wh) is the size of the tank — how long the station runs. Watts (W) is the size of the pipe — how much it can power at once. People constantly confuse them: a big battery with a small inverter still can't start a microwave, and a big inverter on a small battery runs it for only minutes. Match both to your job.",
    },
    {
      q: "What size power station do I need to run a fridge?",
      a: "Check two things. First, the fridge's running watts must be under the station's continuous AC output — and its surge rating must clear the 2–3× spike when the compressor kicks on. Second, size watt-hours to how long you need it: a ~1,000Wh LiFePO4 station keeps a typical fridge going for most of a day. Add up your loads before you buy.",
    },
    {
      q: "Is LiFePO4 worth it over regular lithium?",
      a: "For anything you'll keep for years, yes. LiFePO4 (LFP) cells last roughly 3,000+ charge cycles versus ~500–800 for older NMC lithium, run cooler, and are safer. Every full station here is LFP. A standard-lithium power bank is fine as a pocket backup you'll replace sooner, but it isn't what you want in a station you keep for a decade.",
    },
    {
      q: "Can a power station run my whole house?",
      a: "No — these keep essentials alive (fridge, wifi, phones, a CPAP, some lights) through an outage or off-grid, not a whole house. Whole-home backup needs a permanently installed system with a transfer switch. Size a portable station to the specific loads you can't live without for a few hours to a day or two.",
    },
    {
      q: "Is the solar panel included?",
      a: "Almost never. “Solar-ready” and a high solar-input rating only mean the station accepts a panel — you buy the panel separately. Factor that into the price if you plan to recharge off-grid, or you've effectively got a wall-only unit.",
    },
  ],
};
