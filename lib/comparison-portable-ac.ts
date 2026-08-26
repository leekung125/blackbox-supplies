import type { ProductFor } from "@/lib/comparison-schema";

/**
 * FLAGSHIP GUIDE DATA — "The Best Portable Air Conditioners".
 * Cleaned from open research (manufacturer + DOE spec sheets, RTINGS/TechGearLab/Consumer Reports).
 * Every number is real or `null`. `unverified` lists the spec keys that are estimates or unpublished,
 * so the UI can badge them honestly (BLACKBOX_V2: real or nothing — never fabricate).
 *
 * Cross-cutting notes:
 *  - `rating`/`reviewCount` are null on ALL units: no verified per-unit star/count was in research.
 *    Fill from Amazon PA-API when live; do not invent.
 *  - `energyStar` is UNVERIFIED on all units (not stated in any source) → set false + flagged.
 *  - `noiseDb` = quietest PUBLISHED level (low/sleep). Two units publish only a higher setting
 *    (see per-unit unverified flags) — do not read those as their quietest.
 *  - `coverageSqFt` uses the HONEST SACC-based figure. Where research gave a "realistic ~" range,
 *    it's an estimate (flagged); manufacturer "up to" figures are used only for dual-hose units
 *    whose SACC supports them.
 *  - Images: every unit carries a real /products/scene/*.png plate (rendered scene images).
 */
export const PORTABLE_AC_PRODUCTS: ProductFor<"portable_ac">[] = [
  // ── Best overall (real cooling power per watt) ─────────────────────────────
  {
    id: "midea-duo-14-000-btu-smart",
    name: "Midea Duo MAP14S1TBL 14,000 BTU Inverter Dual-Hose Portable AC",
    brand: "Midea",
    category: "portable_ac",
    image: "/products/scene/midea-duo-14-000-btu-smart.webp",
    price: 550,
    priceRange: "$500–$600",
    affiliateUrl: "https://www.amazon.com/dp/B091CJVD2N?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.consumeranalysis.com/guides/portable-ac/midea-duo-review/",
      "https://www.midea.com/us/store/cooling-and-heating/portable-air-conditioners/midea-duo-smart-inverter-portable-air-conditioner.map14s1tbl",
      "https://www.amazon.com/dp/B091CJVD2N",
    ],
    rating: null,
    reviewCount: null,
    role: "Best overall",
    bestFor: "A hot medium/large room where real cooling speed and efficiency matter most.",
    pros: [
      "Highest verified real-world capacity of any portable AC (12,000 SACC) and top CEER (12.3) — cools fast",
      "Space-saving hose-in-hose design gives dual-hose efficiency in one tidy hose",
      "Variable-speed inverter saves ~40% vs the federal standard; Wi-Fi with Alexa/Google",
    ],
    cons: [
      "One of the heaviest units on the market at 85 lb",
      "Despite inverter tech it is still loud at its highest setting",
      "Window kit and plastic clips feel flimsy; some owners report rattles",
    ],
    specs: {
      saccBtu: 12000,
      coverageSqFt: 550,
      ventType: "dual_hose",
      noiseDb: 42,
      dehumidifyPintsDay: null,
      hasHeatMode: false,
      weightLbs: 85,
      energyStar: false,
    },
    // noiseDb 42 = manufacturer LOW; high setting unpublished. dehumidify rate not published.
    unverified: ["dehumidifyPintsDay", "energyStar", "rating", "reviewCount"],
  },

  // ── Best for large rooms / most features ───────────────────────────────────
  {
    id: "whynter-nex-arc-1230wn-14-000",
    name: "Whynter NEX ARC-1230WN 14,000 BTU Inverter Dual-Hose Portable AC",
    brand: "Whynter",
    category: "portable_ac",
    image: "/products/scene/whynter-nex-arc-1230wn-14-000.webp",
    price: 650,
    priceRange: "$600–$700",
    affiliateUrl: "https://www.amazon.com/dp/B09TP51PPH?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.techgearlab.com/reviews/electronics/portable-air-conditioner/whynter-arc-1230wn",
      "https://www.rtings.com/air-conditioner/reviews/whynter/nex-arc-1230wn",
      "https://www.amazon.com/dp/B09TP51PPH",
    ],
    rating: null,
    reviewCount: null,
    role: "Best for large rooms",
    bestFor: "The best-rated all-rounder — biggest room rating plus full smart features.",
    pros: [
      "12,000 SACC rated for up to 600 sq ft — largest coverage in this group",
      "Dual-hose inverter runs quiet (42.5 dB low) and scores at/near the top of nearly every RTINGS/TechGearLab metric",
      "Full smart Wi-Fi, strong 87 pt/day dehumidification, lighter than the Midea Duo at 75 lb",
    ],
    cons: [
      "Premium price — typically the most expensive non-battery unit here",
      "Still heavy (75 lb) and tall for one person to carry upstairs",
      "Short-ish hoses and a fiddly window kit on awkward windows",
    ],
    specs: {
      saccBtu: 12000,
      coverageSqFt: 600,
      ventType: "dual_hose",
      noiseDb: 42.5,
      dehumidifyPintsDay: 87,
      hasHeatMode: false,
      weightLbs: 75,
      energyStar: false,
    },
    unverified: ["energyStar", "rating", "reviewCount"],
  },

  // ── Quietest published sleep mode — LISTED, NO AWARD ───────────────────────
  // We hold no verified Amazon ASIN for this exact model, so it has no buy link. An award slot
  // whose CTA can't be clicked is worse than no award: the "Best for bedrooms" slot moved to the
  // Frigidaire below (the only unit here published under 50 dBA at EVERY fan speed), and the LG
  // stays in the lineup on its specs. Do not re-award it until the ASIN is confirmed via PA-API.
  {
    id: "lg-lp1419ivsm-dual-inverter-14000-btu",
    name: "LG LP1419IVSM 14,000 BTU DUAL Inverter Portable AC",
    brand: "LG",
    category: "portable_ac",
    image: "/products/scene/lg-lp1419ivsm-dual-inverter-14000-btu.webp",
    price: 674,
    priceRange: "$649–$699",
    affiliateUrl: "", // ASIN UNVERIFIED — do not link until confirmed via PA-API. Sold at LG/Walmart/Lowe's/Abt.
    sourceUrls: [
      "https://www.lg.com/us/air-conditioners/lg-lp1419ivsm-portable-air-conditioner",
      "https://www.rtings.com/air-conditioner/reviews/lg/dual-inverter-lp1419ivsm",
    ],
    rating: null,
    reviewCount: null,
    bestFor:
      "The quietest published sleep mode in this lineup — but we have no verified Amazon listing, so you'd be buying it from LG, Lowe's, or Abt.",
    pros: [
      "Variable-speed dual-inverter runs as low as 44 dBA and modulates instead of hard on/off cycling",
      "Strong 10,000 SACC — among the best real capacity for a single-hose unit",
      "Full smart control via LG ThinQ plus Alexa/Google",
    ],
    cons: [
      "Single-hose is inherently less efficient than dual-hose competitors at the same BTU",
      "Premium price for a single-hose unit",
      "71 lb and tall — not easy to carry between rooms",
    ],
    specs: {
      saccBtu: 10000,
      coverageSqFt: 450, // DOE spec sheet (LG markets "up to ~500")
      ventType: "single_hose",
      noiseDb: 44, // sleep mode; range 44–53
      dehumidifyPintsDay: null, // research gave "~6.8 pt/hr" (implausible as pt/day); not verifiable
      hasHeatMode: false,
      weightLbs: 71,
      energyStar: false,
    },
    // affiliateUrl empty (ASIN unverified); dehumidify figure unusable; energyStar unstated.
    unverified: ["affiliateUrl", "dehumidifyPintsDay", "energyStar", "rating", "reviewCount"],
  },

  // ── Best for bedrooms (quiet at EVERY published speed, and linkable) ───────
  // Its full published range is 46/48/49 dB — the only unit here that stays under 50 dBA on high,
  // which is the figure that decides whether you sleep through it. (The LG's low is quieter at
  // 44 but its own range runs to 53; the Midea/Whynter 42-ish figures are LOW-setting only and
  // both are noted loud on high.) ~400 sq ft at 8,000 SACC is bedroom-sized by the guide's own
  // ~20 SACC BTU/sq ft rule.
  {
    id: "frigidaire-gallery-ghpc132ab1-13000-btu",
    name: "Frigidaire Gallery GHPC132AB1 Cool Connect 13,000 BTU Portable AC",
    brand: "Frigidaire",
    category: "portable_ac",
    image: "/products/scene/frigidaire-gallery-ghpc132ab1-13000-btu.webp",
    price: 569,
    priceRange: "$539–$599",
    affiliateUrl: "https://www.amazon.com/dp/B07ZDVBDFX?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.frigidaire.com/en/p/home-comfort/air-conditioners/portable-air-conditioners/GHPC132AB1",
      "https://www.consumerreports.org/appliances/air-conditioners/frigidaire-gallery-ghpc132ab1/m400823/",
      "https://www.amazon.com/dp/B07ZDVBDFX",
    ],
    rating: null,
    reviewCount: null,
    role: "Best for bedrooms",
    bestFor: "A bedroom or medium room where it has to stay quiet at every speed, not just on low.",
    pros: [
      "Genuinely quiet — stays under ~49 dBA even on high, well-rated by Consumer Reports",
      "Wi-Fi (Frigidaire app), Alexa/Google, ionizer, and clean modern styling",
      "Good efficiency for a single-hose unit (10.2 CEER)",
    ],
    cons: [
      "Single-hose, so slower and less efficient than dual-hose units of similar BTU",
      "8,000 SACC realistically covers ~350–450 sq ft, not the marketed 600",
      "77 lb and bulky to relocate",
    ],
    specs: {
      saccBtu: 8000,
      coverageSqFt: 400, // realistic 350–450 (marketed 600)
      ventType: "single_hose",
      noiseDb: 46, // low; range 46/48/49
      dehumidifyPintsDay: null,
      hasHeatMode: false,
      weightLbs: 77,
      energyStar: false,
    },
    unverified: ["coverageSqFt", "dehumidifyPintsDay", "energyStar", "rating", "reviewCount"],
  },

  // ── Best value dual-hose workhorse ─────────────────────────────────────────
  {
    id: "whynter-arc-14s-14000-btu-dual-hose",
    name: "Whynter ARC-14S 14,000 BTU Dual-Hose Portable AC",
    brand: "Whynter",
    category: "portable_ac",
    image: "/products/scene/whynter-arc-14s-14000-btu-dual-hose.webp",
    price: 525,
    priceRange: "$499–$549",
    affiliateUrl: "https://www.amazon.com/dp/B0028AYQDC?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.rtings.com/air-conditioner/reviews/whynter/arc-14s",
      "https://www.consumeranalysis.com/guides/portable-ac/whynter-arc-14s-review/",
      "https://www.amazon.com/dp/B0028AYQDC",
    ],
    rating: null,
    reviewCount: null,
    role: "Best value dual-hose",
    bestFor: "A proven, no-nonsense dual-hose workhorse when you want real cooling over smart features.",
    pros: [
      "Dual-hose design cools a full room faster and more efficiently than single-hose rivals",
      "Long track record; named 2025 Best Overall by Good Housekeeping",
      "Effective dehumidifier (up to 71 pt/day) and activated-carbon filtration",
    ],
    cons: [
      "Heavy (~80 lb) and over 3 ft tall — awkward to move, especially up stairs",
      "Non-inverter compressor cycles on/off and is louder than newer inverter models",
      "No Wi-Fi/smart controls; short-ish hoses limit placement",
    ],
    specs: {
      saccBtu: 9500,
      coverageSqFt: 500,
      ventType: "dual_hose",
      noiseDb: 52, // low; range 52–56
      dehumidifyPintsDay: 71,
      hasHeatMode: false,
      weightLbs: 80,
      energyStar: false,
    },
    unverified: ["energyStar", "rating", "reviewCount"],
  },

  // ── Premium design pick ────────────────────────────────────────────────────
  {
    id: "delonghi-pinguino-pacex390lvyn-14000-btu",
    name: "De'Longhi Pinguino PACEX390LVYN Arctic Whisper 14,000 BTU Portable AC",
    brand: "De'Longhi",
    category: "portable_ac",
    image: "/products/scene/delonghi-pinguino-pacex390lvyn-14000-btu.webp",
    price: 550,
    priceRange: "$500–$600",
    affiliateUrl: "https://www.amazon.com/dp/B084SY2D84?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.reviewed.com/home-outdoors/content/delonghi-pacex390lvyn-pinguino-portable-air-conditioner-review",
      "https://www.delonghi.com/en-us/arctic-whisper-extreme-pac-ex390lvyn-700-sq-ft-portable-air-conditioner-with-cool-surround-technology-and-ecoreal-feel/p/PACEX390LVYN-6ABK",
      "https://www.amazon.com/dp/B084SY2D84",
    ],
    rating: null,
    reviewCount: null,
    role: "Premium design pick",
    bestFor: "Design-conscious buyers wanting a quiet, premium-feeling unit with a temp-sensing remote.",
    pros: [
      "Quiet for its class (~50 dB on high) thanks to Arctic Whisper design",
      "Cool Surround remote senses temperature/humidity at your location for targeted comfort",
      "Attractive build with effective dehumidifier and fan modes",
    ],
    cons: [
      "Very heavy at ~83 lb — reviewers call it hard to lift",
      "8,600 SACC makes the '700 sq ft' claim unrealistic; treat as a ~400 sq ft unit",
      "Single-hose and no verified efficiency rating; premium price for the real capacity",
    ],
    specs: {
      saccBtu: 8600,
      coverageSqFt: 400, // realistic 350–450 (marketed 700)
      ventType: "single_hose",
      noiseDb: 50, // published figure is the HIGHEST fan speed; true low is lower but unpublished
      dehumidifyPintsDay: null,
      hasHeatMode: false,
      weightLbs: 83,
      energyStar: false,
    },
    // noiseDb 50 is the HIGH setting (not comparable to others' low figure); coverage is an estimate.
    unverified: ["coverageSqFt", "noiseDb", "dehumidifyPintsDay", "energyStar", "rating", "reviewCount"],
  },

  // ── Best budget ────────────────────────────────────────────────────────────
  {
    id: "black-decker-10-000-btu-3",
    name: "BLACK+DECKER BPACT10WT 10,000 BTU 3-in-1 Portable AC",
    brand: "BLACK+DECKER",
    category: "portable_ac",
    image: "/products/scene/black-decker-10-000-btu-3.webp",
    price: 340,
    priceRange: "$300–$380",
    affiliateUrl: "https://www.amazon.com/dp/B01DLPUWG2?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.blackanddecker.com/products/bpact10wt",
      "https://www.homedepot.com/p/BLACK-DECKER-10-000-BTU-Portable-Air-Conditioner-in-White-with-Dehumidifier-BPACT10WT/301053291",
      "https://www.amazon.com/dp/B01DLPUWG2",
    ],
    rating: null,
    reviewCount: null,
    role: "Best budget",
    bestFor: "A cheap, widely-available entry unit for a small-to-medium bedroom or home office.",
    pros: [
      "Very common and cheap with strong retail availability and support",
      "Simple setup with Follow-Me remote, window kit, and side handles",
      "Manageable weight and rolling casters make it easy to reposition",
    ],
    cons: [
      "Honest capacity (5,500 SACC) is far below the 10,000 ASHRAE headline; undersized for the marketed 450 sq ft",
      "Single-hose creates negative pressure that draws warm air back in",
      "Gets loud on high; some owners report middling cooling in hot climates",
    ],
    specs: {
      saccBtu: 5500,
      coverageSqFt: 200, // realistic 150–250 (marketed 450; one HD listing says 150)
      ventType: "single_hose",
      noiseDb: 52, // approximate/typical — manufacturer publishes no precise figure
      dehumidifyPintsDay: null,
      hasHeatMode: false,
      weightLbs: 47.3, // BLACK+DECKER's own spec sheet. Amazon 48.6 / Walmart 50.7 are packed weights.
      energyStar: false,
    },
    // noiseDb approximate (unpublished); coverage estimate; weight approx.
    unverified: ["coverageSqFt", "noiseDb", "dehumidifyPintsDay", "weightLbs", "energyStar", "rating", "reviewCount"],
  },

  // ── Cheapest / smallest room ───────────────────────────────────────────────
  {
    id: "shinco-spf1-08c-8000-btu",
    name: "Shinco SPF1-08C 8,000 BTU 3-in-1 Portable AC",
    brand: "Shinco",
    category: "portable_ac",
    image: "/products/scene/shinco-spf1-08c-8000-btu.webp",
    price: 260,
    priceRange: "$250–$270",
    affiliateUrl: "https://www.amazon.com/dp/B07HR5CN7G?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.techgearlab.com/reviews/electronics/portable-air-conditioner/shinco-spf1-08c",
      "https://www.homedepot.com/p/Shinco-8000-BTU-Portable-AC-Unit-Dehumidifier-and-Fan-for-200-SqFt-Rooms-SPF1-08C/322676110",
      "https://www.amazon.com/dp/B07HR5CN7G",
    ],
    rating: null,
    reviewCount: null,
    role: "Cheapest / small rooms",
    bestFor: "The cheapest way to cool one small bedroom or office; the easiest to move at ~42 lb.",
    pros: [
      "Lightweight and among the most portable units (~42 lb), simple window install",
      "Low entry price for a name-brand 8k unit (has dropped near ~$128 on sale)",
      "Includes dehumidifier and fan modes plus 24-hr timer and remote",
    ],
    cons: [
      "Real SACC is only ~4,550 BTU, so the '350 sq ft' claim is very optimistic — best in ~150–200 sq ft",
      "Single-hose design pulls in warm air, hurting efficiency",
      "Runs loud, especially the fan, per hands-on reviews",
    ],
    specs: {
      saccBtu: 4550,
      coverageSqFt: 175, // realistic 150–200 (marketed 350)
      ventType: "single_hose",
      noiseDb: null, // not officially published; reviewers call it loud
      dehumidifyPintsDay: null,
      hasHeatMode: false,
      weightLbs: 42,
      energyStar: false,
    },
    unverified: ["coverageSqFt", "noiseDb", "dehumidifyPintsDay", "energyStar", "rating", "reviewCount"],
  },

  // ── Best off-grid / cordless (different class — spot cooler) ────────────────
  {
    id: "ecoflow-wave-3-portable-air-conditioner",
    name: "EcoFlow WAVE 3 Portable AC / Heater (Battery-Capable)",
    brand: "EcoFlow",
    category: "portable_ac",
    image: "/products/scene/ecoflow-wave-3-portable-air-conditioner.webp",
    price: 1299,
    priceRange: "$1,299 (+$899 battery)",
    affiliateUrl: "https://www.amazon.com/dp/B0F4DJN74F?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.ecoflow.com/us/wave-3-portable-air-conditioner/specs",
      "https://www.storagereview.com/review/ecoflow-wave-3-review-smarter-stronger-and-ready-for-the-field",
      "https://www.amazon.com/dp/B0F4DJN74F?tag=blackboxsuppl-20",
    ],
    rating: null,
    reviewCount: null,
    role: "Best off-grid / cordless",
    bestFor: "Camping, vanlife, RVs, tents — spot-cooling where there's no window to vent a normal unit.",
    pros: [
      "Runs on its own battery for true off-grid cooling — unique in this lineup",
      "Compact and light (~34 lb) with heating, dehumidify, and app control",
      "Fast to cool a small enclosed space (claims ~15°F drop in 15 min) and quiet 44 dB sleep mode",
    ],
    cons: [
      "Only ~6,100 BTU — far too small for a normal room; it's a spot/personal cooler",
      "Very expensive per BTU, and the battery that makes it special is a costly add-on",
      "High peak draw (1,800 W) limits runtime on the battery in max mode",
    ],
    specs: {
      saccBtu: 6100, // EcoFlow manufacturer cooling rating, NOT a DOE SACC test — not directly comparable
      coverageSqFt: 135, // enclosed 100–170 (tents/vans/small rooms)
      ventType: "ductless",
      noiseDb: 44, // sleep; range 44–58
      dehumidifyPintsDay: null,
      hasHeatMode: true, // 6,800 BTU heating — the only unit here that heats
      weightLbs: 34,
      energyStar: false, // battery/off-grid class — Energy Star N/A
    },
    // saccBtu is a manufacturer rating not a DOE SACC test; coverage is an estimate.
    unverified: ["saccBtu", "coverageSqFt", "dehumidifyPintsDay", "energyStar", "rating", "reviewCount"],
  },
];
