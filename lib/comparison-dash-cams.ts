import type { CategoryMeta, ProductFor } from "@/lib/comparison-schema";
import type { ComparisonGuide } from "@/lib/comparison-guides";
import type { SortOption } from "@/components/comparison-board";
import { SPEC_COLUMNS } from "@/lib/comparison-schema";

/**
 * GUIDE DATA — "The Best Dash Cams, Compared".
 * Cleaned from open research (manufacturer spec pages + Amazon listings + RTINGS/PCWorld/
 * BlackboxMyCar/DashCamTalk). Every number is real or `null`. `unverified` lists the spec keys
 * that are estimates or unpublished, so the UI can badge them honestly (BLACKBOX_V2: real or
 * nothing — never fabricate).
 *
 * The 7 real catalog products whose category === "Dash Cams", in editorial rank order.
 *
 * Cross-cutting notes:
 *  - `rating`/`reviewCount` are null on ALL units: no verified per-unit star/count was in research.
 *    Fill from Amazon PA-API when live; do not invent.
 *  - `resolution` uses the FRONT-camera resolution (the channel that reads the plate ahead of you).
 *    2K and 1440p are the same pixel count; we label these "1440p" to avoid double-representing.
 *  - `nightVision` = the unit has night-optimized capture (Sony STARVIS/STARVIS 2 or HDR/WDR night
 *    mode). True on all here; the STARVIS 2 VIOFO cams are meaningfully better than the boolean shows.
 *  - `fieldOfViewDeg` is the FRONT lens. Wider catches more lanes but adds edge distortion.
 *  - `maxStorageGb` is the largest microSD the unit officially supports (not the bundled card).
 *  - Images: set "" for every unit — a later pass renders them (BLACKBOX_V2 image pipeline).
 */
export const DASH_CAMS_PRODUCTS: ProductFor<"dash_cams">[] = [
  // ── Best overall (reference-grade front + rear, dual STARVIS 2) ─────────────
  {
    id: "viofo-a229-plus",
    name: "VIOFO A229 Plus (2CH Front + Rear)",
    brand: "VIOFO",
    category: "dash_cams",
    image: "/products/shot-viofo-a229-plus.png",
    price: 230,
    priceRange: "$200–$260",
    affiliateUrl: "https://www.amazon.com/dp/B0CKX14L34?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.viofo.com/products/viofo-a229-plus-2ch-front-and-rear-2k2k-hdr-5ghz-wi-fi-gps-voice-control-dual-dash-camera-with-sony-starvis-2-sensor",
      "https://www.amazon.com/VIOFO-A229-Plus-STARVIS-Ultra-Precise/dp/B0CKX14L34",
      "https://www.automoblog.com/viofo-a229-plus-review/",
    ],
    rating: null,
    reviewCount: null,
    role: "Best overall",
    bestFor: "Everyday commuters who want the best-looking front + rear evidence without paying 4K prices.",
    pros: [
      "Twin Sony STARVIS 2 sensors record 1440p front + 1440p rear — plates stay legible day and night",
      "5GHz Wi-Fi, ultra-precise GPS, voice control, and buffered 24H parking mode",
      "The reference-grade two-channel setup reviewers keep crowning best-overall",
    ],
    cons: [
      "Rear camera is 1440p — sharp, but not 4K",
      "No SD card included; add a 256GB+ high-endurance card",
      "Running the rear-camera cable takes ~30–45 minutes or a shop visit",
    ],
    specs: {
      resolution: "1440p",
      channels: "front_rear",
      fieldOfViewDeg: 140,
      nightVision: true,
      parkingMode: true,
      gps: true,
      wifi: true,
      maxStorageGb: 512,
    },
    unverified: ["rating", "reviewCount"],
  },

  // ── Best compact front cam (STARVIS 2 in a hideaway body) ──────────────────
  {
    id: "viofo-a119-mini-2",
    name: "VIOFO A119 Mini 2",
    brand: "VIOFO",
    category: "dash_cams",
    image: "/products/shot-viofo-a119-mini-2.png",
    price: 115,
    priceRange: "$100–$130",
    affiliateUrl: "https://www.amazon.com/dp/B0C5MVB7NX?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.viofo.com/blogs/viofo-car-dash-camera-guide-faq-and-news/mini-sized-mega-performance-introducing-new-viofo-a119-mini-2-dash-cam-with-sony-starvis-2",
      "https://www.pcworld.com/article/1981452/viofo-a119-mini-2-dash-cam-review.html",
    ],
    rating: null,
    reviewCount: null,
    role: "Best compact front cam",
    bestFor: "Drivers who want top-tier front coverage in the most discreet, heat-tolerant package — and may add a rear cam later.",
    pros: [
      "Sony STARVIS 2 sensor records 2K 1440p at 60fps — night footage punches far above its size",
      "Tiny enough to hide behind the mirror; supercapacitor (not battery) survives hot climates",
      "5GHz Wi-Fi, GPS, and voice control in a single-front body",
    ],
    cons: [
      "Front-only out of the box (a rear cam is a separate add-on)",
      "No screen — setup is through the phone app — and no SD card is included",
      "No live view without the app; supercapacitor trades a little cold-weather boot speed",
    ],
    specs: {
      resolution: "1440p",
      channels: "front",
      fieldOfViewDeg: 140,
      nightVision: true,
      parkingMode: true,
      gps: true,
      wifi: true,
      maxStorageGb: 512,
    },
    unverified: ["rating", "reviewCount"],
  },

  // ── Best budget (default best-value 4K, huge track record) ─────────────────
  {
    id: "rove-r2-4k",
    name: "ROVE R2-4K",
    brand: "ROVE",
    category: "dash_cams",
    image: "/products/shot-rove-r2-4k.png",
    price: 105,
    priceRange: "$90–$120",
    affiliateUrl: "https://www.amazon.com/dp/B074JT3698?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.amazon.com/R2-4K-Dashboard-Camera-Recorder-Vision/dp/B074JT3698",
      "https://www.rovedashcam.com/products/rove-r2-4k-car-dashcam",
    ],
    rating: null,
    reviewCount: null,
    role: "Best budget",
    bestFor: "First-time buyers and value hunters who want 4K front footage and an on-device screen without overspending.",
    pros: [
      "Sharp 4K 2160p front footage with built-in Wi-Fi 6, GPS, and a 2.4-inch screen",
      "One of the largest review counts in the category — the internet's default budget pick",
      "150° wide angle and supports up to 512GB high-endurance cards",
    ],
    cons: [
      "Front-only, single channel — no rear coverage",
      "Parking mode needs the separate hardwire kit",
      "Great daytime detail, but a step behind STARVIS 2 cams in the darkest scenes",
    ],
    specs: {
      resolution: "4k",
      channels: "front",
      fieldOfViewDeg: 150,
      nightVision: true,
      parkingMode: true,
      gps: true,
      wifi: true,
      maxStorageGb: 512,
    },
    unverified: ["rating", "reviewCount"],
  },

  // ── Best budget front + rear (value two-channel, card in the box) ──────────
  {
    id: "redtiger-f7n",
    name: "REDTIGER F7N (4K Front + Rear)",
    brand: "REDTIGER",
    category: "dash_cams",
    image: "/products/redtiger-f7n.png",
    price: 145,
    priceRange: "$130–$160",
    affiliateUrl: "https://www.amazon.com/dp/B08TT1RRGP?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.amazon.com/REDTIGER-Display-Dashboard-Recorder-Support/dp/B08TT1RRGP",
      "https://dashcamtalk.com/product/redtiger-f7n/",
    ],
    rating: null,
    reviewCount: null,
    role: "Best budget front + rear",
    bestFor: "Budget-minded drivers who want both front and rear coverage in one inexpensive, screen-equipped kit.",
    pros: [
      "4K/2.5K front + 1080p rear with a bright 3.18-inch screen and a 64GB card in the box",
      "170° wide front angle, Wi-Fi, GPS, and 24H parking mode",
      "The value front + rear best-seller people compare against Rove and Viofo",
    ],
    cons: [
      "Rear camera is 1080p, and the front looks cleaner in daylight than at night",
      "Bundled 64GB card is small for 24/7 loop recording (supports up to 256GB)",
      "Newer STARVIS 2 versions (F7NP / F7N Pro) exist if you want the latest sensor",
    ],
    specs: {
      resolution: "4k",
      channels: "front_rear",
      fieldOfViewDeg: 170,
      nightVision: true,
      parkingMode: true,
      gps: true,
      wifi: true,
      maxStorageGb: 256,
    },
    unverified: ["rating", "reviewCount"],
  },

  // ── Best for rideshare / fleet (3-channel: front + cabin + rear) ───────────
  {
    id: "viofo-a139-pro",
    name: "VIOFO A139 Pro (3CH Front + Interior + Rear)",
    brand: "VIOFO",
    category: "dash_cams",
    image: "/products/shot-viofo-a139-pro.png",
    price: 330,
    priceRange: "$300–$360",
    affiliateUrl: "https://www.amazon.com/dp/B0BV2FRBCS?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.viofo.com/products/viofo-a139-pro-3ch-first-real-4k-hdr-3-channel-frontinteriorrear-dashcam-with-sony-starvis-2-imx678-sensor",
      "https://www.blackboxmycar.com/pages/viofo-a139-pro-4k-dash-cam-in-depth-review",
    ],
    rating: null,
    reviewCount: null,
    role: "Best for rideshare / fleet",
    bestFor: "Uber/Lyft and delivery drivers, taxi and fleet operators who need front + cabin + rear evidence in one install.",
    pros: [
      "True 4K front (STARVIS 2 IMX678) + 1080p interior + 1080p rear — documents the road and the cabin",
      "IR interior channel sees the cabin at night; HDR night vision, 5GHz Wi-Fi, GPS",
      "The premium answer for professional drivers who need total coverage",
    ],
    cons: [
      "Three cameras and cables make this the most involved install here — plan a shop or a patient afternoon",
      "No SD card included; it wants a 256GB+ high-endurance card",
      "The interior camera relies on IR to see the cabin at night",
    ],
    specs: {
      resolution: "4k",
      channels: "front_rear_interior",
      fieldOfViewDeg: 140,
      nightVision: true,
      parkingMode: true,
      gps: true,
      wifi: true,
      maxStorageGb: 512,
    },
    unverified: ["rating", "reviewCount"],
  },

  // ── Best connected / smart (4G LTE, live view, Emergency SOS) ──────────────
  {
    id: "nextbase-iq-4k-smart-dash",
    name: "Nextbase iQ 4K Smart Dash Cam (Front + Rear)",
    brand: "Nextbase",
    category: "dash_cams",
    image: "/products/nextbase-iq-4k-smart-dash.png",
    price: 500,
    priceRange: "$400–$600",
    affiliateUrl: "https://www.amazon.com/dp/B0CJWHSWSS?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://nextbase.com/smart-dash-cams/iq-smart-dash-cam/",
      "https://www.techradar.com/vehicle-tech/dash-cams/the-new-nextbase-iq-might-just-be-the-smartest-dash-cam-ever-made",
    ],
    rating: null,
    reviewCount: null,
    role: "Best connected / smart",
    bestFor: "Security-minded owners, parents tracking teen drivers, and anyone who parks in the open overnight.",
    pros: [
      "4K front + 1440p rear with built-in 4G LTE, live view, and Emergency SOS on impact",
      "Guardian remote alerts and Roadwatch AI security while parked",
      "The connected guardian angle — protection well beyond plain loop footage",
    ],
    cons: [
      "Flagship pricing, above the typical dash-cam band",
      "The best features — LTE live streaming, extended cloud storage — need a paid subscription",
      "Overkill if you only want basic crash recording",
    ],
    specs: {
      resolution: "4k",
      channels: "front_rear",
      fieldOfViewDeg: 140,
      nightVision: true,
      parkingMode: true,
      gps: true,
      wifi: true,
      maxStorageGb: 128,
    },
    // fieldOfViewDeg from third-party review (Nextbase publishes it inconsistently); maxStorageGb is
    // Nextbase's recommended ceiling for their U3 cards, not a hard tested max.
    unverified: ["fieldOfViewDeg", "maxStorageGb", "rating", "reviewCount"],
  },

  // ── Best discreet / trusted brand (key-fob-sized, set-and-forget) ──────────
  {
    id: "garmin-dash-cam-mini-2",
    name: "Garmin Dash Cam Mini 2",
    brand: "Garmin",
    category: "dash_cams",
    image: "/products/garmin-dash-cam-mini-2.png",
    price: 130,
    priceRange: "$110–$150",
    affiliateUrl: "https://www.amazon.com/dp/B0931YZ82P?tag=blackboxsuppl-20",
    sourceUrls: [
      "https://www.garmin.com/en-US/p/731428/",
      "https://www8.garmin.com/manuals/webhelp/GUID-8EFC497C-4031-46EE-AC26-B0AE4B3CE8BD/EN-US/GUID-7D4A7BEE-124E-4D06-857C-8D497AFE81F4.html",
    ],
    rating: null,
    reviewCount: null,
    role: "Best discreet / trusted brand",
    bestFor: "Drivers who value brand trust and total discreetness over maximum resolution, and anyone who wants set-and-forget simplicity.",
    pros: [
      "Key-fob-sized 1080p body with a 140° field of view — the most discreet cam here",
      "Voice control, automatic incident detection, and connected parking-guard features via Garmin Drive",
      "Trusted-brand simplicity that converts cautious buyers; supports up to 512GB cards",
    ],
    cons: [
      "1080p only — not 2K or 4K",
      "No on-device screen; you review clips in the app — and no built-in GPS",
      "Parking features want the optional Constant Power / hardwire cable",
    ],
    specs: {
      resolution: "1080p",
      channels: "front",
      fieldOfViewDeg: 140,
      nightVision: true,
      parkingMode: true,
      gps: false,
      wifi: true,
      maxStorageGb: 512,
    },
    unverified: ["rating", "reviewCount"],
  },
];

/**
 * Fully-authored table metadata for dash cams — mirrors PORTABLE_AC_META.
 * One entry per key in SPEC_COLUMNS.dash_cams, most-decisive first.
 */
export const DASH_CAMS_META: CategoryMeta = {
  label: "Dash Cams",
  // What a buyer decides on is resolution + coverage + how wide it sees — NOT field-of-view and
  // card size, which is what "first numeric columns" wrongly surfaced. Resolution/coverage are enums.
  heroKeys: ["resolution", "channels", "fieldOfViewDeg"],
  // No honest numeric decides a dash cam (the sensor + coverage are enums); don't crown FOV with a bar.
  barKey: null,
  columns: SPEC_COLUMNS.dash_cams,
  fields: {
    resolution: {
      label: "Front resolution",
      type: "enum",
      tooltip:
        "The front camera's recording resolution — the channel that reads the plate ahead of you. 2K and 1440p are the same pixel count. Note: a good sensor (Sony STARVIS 2) can out-read a cheaper '4K' cam at night, so don't buy on this number alone.",
      enumLabels: { "1080p": "1080p", "1440p": "1440p / 2K", "2k": "2K", "4k": "4K", "5k": "5K" },
    },
    channels: {
      label: "Coverage",
      type: "enum",
      tooltip:
        "How many directions the system records. Front-only covers what you drive into; front + rear also catches rear-endings and brake-checks; front + rear + interior adds the cabin for rideshare and fleet drivers.",
      enumLabels: {
        front: "Front only",
        front_rear: "Front + rear",
        front_rear_interior: "Front + rear + cabin",
      },
    },
    fieldOfViewDeg: {
      label: "Field of view",
      type: "number",
      unit: "°",
      higherIsBetter: true,
      tooltip:
        "How wide the front lens sees. Wider captures more lanes and more of a scene, but very wide angles add edge distortion. Front lens only.",
    },
    nightVision: {
      label: "Night vision",
      type: "bool",
      tooltip:
        "Sensor or processing tuned for low light (Sony STARVIS / STARVIS 2 or HDR/WDR night mode) so plates stay legible after dark — the frame that usually settles a claim.",
    },
    parkingMode: {
      label: "Parking mode",
      type: "bool",
      tooltip:
        "Records or monitors while the car is off. Almost always needs constant power the accessory socket can't provide when parked — budget for a hardwire kit or the maker's constant-power cable.",
    },
    gps: {
      label: "GPS",
      type: "bool",
      tooltip: "Stamps footage with speed and location — useful corroboration in a dispute.",
    },
    wifi: {
      label: "Wi-Fi",
      type: "bool",
      tooltip: "Pull and review clips on your phone without pulling the card. 5GHz transfers footage much faster than 2.4GHz.",
    },
    maxStorageGb: {
      label: "Max card",
      type: "number",
      unit: "GB",
      higherIsBetter: true,
      tooltip:
        "Largest microSD the unit officially supports (not the card in the box). Dash cams loop-record 24/7 — a bigger high-endurance card means longer history before it overwrites.",
    },
  },
};

/**
 * Full comparison guide — the editorial shell around the live board.
 * Array order IS the editorial ranking (Best overall first; Best budget = ROVE R2-4K).
 */
export const DASH_CAMS_GUIDE: ComparisonGuide = {
  slug: "best-dash-cams-compared",
  title: "The Best Dash Cams, Compared",
  dek: "The dash cam that saves you isn't the one with the biggest number on the box — it's the one whose footage a claims adjuster can actually read. Here's every pick compared by the specs that decide a dispute: resolution, coverage, and night legibility.",
  categoryLabel: "Dash Cams",
  updated: "July 2026",
  readMinutes: 8,
  heroImage: "/guides/hero-dash-cams.png",
  quickAnswer:
    "Most drivers should buy a front-and-rear cam with a Sony STARVIS 2 sensor — the VIOFO A229 Plus is the reference pick, because plates that stay legible day and night are what actually win an insurance dispute. Want to spend the least? The ROVE R2-4K gives you sharp 4K front footage and one of the biggest track records in the category for around $100. The number that matters most isn't megapixels — it's whether the plate in front of you is readable at night.",
  whoFor: [
    "Commuters who want proof-on-tape the day someone brake-checks them or backs into their parked car",
    "Rideshare, delivery, and fleet drivers who need to document the road, the cabin, or both",
    "Parents of new drivers and anyone who parks on the street overnight",
  ],
  buyFirst:
    "Decide coverage first: front-only is enough for most crashes, but front + rear catches the rear-endings and brake-checks that are hardest to dispute. Then weigh the sensor over the resolution — a 1440p Sony STARVIS 2 cam reads plates at night better than many cheaper “4K” cams. Everything after that — GPS, Wi-Fi, parking mode, an on-device screen — is a convenience tiebreaker. Budget for a high-endurance microSD card too; most of these ship without one.",
  checkBeforeBuying: [
    {
      label: "Resolution vs. sensor",
      detail:
        "A “4K” label doesn't guarantee usable night footage — the sensor matters more. Sony STARVIS 2 cams (the VIOFO models here) keep license plates legible in the dark, which is exactly the frame that settles a claim. A budget 4K cam is razor-sharp by day and softer at night: fine for most drivers, but know the trade before you buy on the headline number.",
    },
    {
      label: "Channels: front, +rear, +cabin",
      detail:
        "Front-only covers the crashes you drive into. Add a rear camera and you catch the rear-endings and brake-checks that are otherwise your word against theirs. Rideshare and delivery drivers want the third interior channel to document the cabin. More channels means a longer install and a bigger card — match it to the risk you're actually covering.",
    },
    {
      label: "Parking mode needs power",
      detail:
        "Every “parking mode” here needs constant power the accessory socket can't provide once the engine's off — a hardwire kit or the maker's constant-power cable, usually sold separately. Without it, the cam sleeps when you park and the hit-and-run in the lot goes unrecorded.",
    },
    {
      label: "The card is usually extra",
      detail:
        "Most of these ship without a microSD card (the REDTIGER includes 64GB; the Nextbase bundles one). Dash cams loop-record around the clock, which burns through ordinary cards — buy a “high-endurance” card sized near the cam's max (256–512GB on most models here) or you'll be replacing it in months.",
    },
  ],
  mistakes: [
    "Buying on the “4K” label alone and getting night footage too soft to read the plate that hit you.",
    "Skipping the hardwire kit, then discovering parking mode never actually recorded the parking-lot ding.",
    "Running an ordinary microSD card in a cam that records 24/7 — it wears out and fails silently.",
    "Assuming front-only is enough, then having no rear footage the one time someone brake-checks you.",
    "Underestimating the rear-camera cable run — it's a real 30–45 minute job or a shop visit before a two-channel kit is usable.",
  ],
  tradeoffs:
    "Resolution, coverage, discretion, and price all pull against each other. The STARVIS 2 VIOFO cams give the best night legibility and, in the two- and three-channel kits, the most coverage — but cost more and take longer to install. Budget 4K cams like the ROVE and REDTIGER are sharp by day and easy on the wallet, trading some night performance and, on the REDTIGER, a 1080p rear. The Nextbase iQ is a different animal — a connected 4G guardian that streams live and can call for help, if you'll pay for the cam and the subscription. And the Garmin Mini 2 trades resolution and GPS for a body smaller than a car key. Match the cam to the risk you're covering, not the biggest number.",
  products: DASH_CAMS_PRODUCTS,
  meta: DASH_CAMS_META,
  sorts: [
    { id: "rank", label: "Top pick", crown: "Editor's choice" },
    { id: "view", label: "Widest view", crown: "Widest view", key: "fieldOfViewDeg", dir: "desc" },
    { id: "storage", label: "Most storage", crown: "Biggest card", key: "maxStorageGb", dir: "desc" },
    { id: "price", label: "Best price", crown: "Lowest price", key: "price", dir: "asc" },
  ] satisfies SortOption[],
  relatedGuides: [],
  decisionPicks: {
    overall: "viofo-a229-plus",
    value: "rove-r2-4k",
    premium: "nextbase-iq-4k-smart-dash",
  },
  specsThatMatter: {
    decisive: [
      "Night legibility — the sensor (Sony STARVIS 2) matters more than the megapixels. A readable plate after dark is the frame that actually settles a claim.",
      "Coverage: front-only, +rear, or +cabin. Front + rear catches the rear-endings and brake-checks that are otherwise your word against theirs.",
      "A high-endurance microSD sized near the cam's max — dash cams loop-record 24/7 and burn through ordinary cards.",
    ],
    noise: [
      "The “4K” label — a good STARVIS 2 sensor at 1440p reads plates at night better than many cheaper “4K” cams that look sharp only by day.",
      "Huge field-of-view numbers (170°+) — wider catches more lanes but adds edge distortion, and it isn't what decides a dispute.",
      "“Parking mode” as a checkbox — it's real, but it needs constant power (a hardwire kit) that's almost always sold separately.",
    ],
  },
  faq: [
    {
      q: "Is a 4K dash cam better than 1440p?",
      a: "Not automatically. The sensor matters more than the resolution: a 1440p Sony STARVIS 2 cam keeps license plates legible at night better than many cheaper “4K” cams, which look razor-sharp by day and soften after dark. Night legibility is what wins an insurance dispute, so weigh the sensor over the headline megapixels.",
    },
    {
      q: "Do I need a front-and-rear dash cam?",
      a: "Front-only covers the crashes you drive into, which is most of them. A rear camera adds the rear-endings and brake-checks that are otherwise your word against theirs, and rideshare or delivery drivers want a third interior channel for the cabin. Match the number of channels to the risk you're actually covering — more channels means a longer install and a bigger card.",
    },
    {
      q: "Why do dash cams need a special SD card?",
      a: "They loop-record around the clock, which wears out an ordinary microSD card fast — and it can fail silently, leaving you with no footage when it matters. Buy a “high-endurance” card sized near the cam's maximum (256–512GB on most models here). Most cams ship without a card, so budget for one.",
    },
    {
      q: "Does dash cam parking mode drain my battery?",
      a: "Parking mode needs constant power the accessory socket can't provide once the engine's off, so it runs off a hardwire kit (usually sold separately) that taps the car battery. Good kits include a voltage cut-off that stops before your battery gets too low to start. Without the kit, the cam simply sleeps when you park.",
    },
    {
      q: "Do dash cams record sound, and do they need a subscription?",
      a: "Most record cabin audio, which you can usually toggle off. A subscription is only required for connected features — the Nextbase iQ's live LTE streaming and extended cloud storage need a paid plan — but standard loop recording on every cam here works with no subscription at all.",
    },
  ],
  // Qualitative verified-buyer review synthesis for this exact lineup — patterns that recur across
  // owner reviews (STARVIS 2 VIOFOs, ROVE, REDTIGER, Nextbase iQ, Garmin Mini 2). NO numbers, ever.
  ownerInsights: [
    {
      pattern: "Night plates you can actually read",
      detail:
        "Across the Sony STARVIS 2 picks — the A229 Plus, A119 Mini 2, and A139 Pro — owners consistently single out the low-light footage, saying license plates stay legible after dark where their older cameras used to haze over. It's the review theme that keeps these cams on top.",
      sentiment: "loved",
    },
    {
      pattern: "The small cams truly disappear",
      detail:
        "Owners of the Garmin Mini 2 and the VIOFO A119 Mini 2 repeatedly praise how the key-fob-sized bodies vanish behind the mirror and become set-and-forget — discreet enough that passengers never notice them.",
      sentiment: "loved",
    },
    {
      pattern: "VIOFO stands behind its cameras",
      detail:
        "Long-time owners describe VIOFO units running for years without trouble, and reviewers repeatedly note that when an early unit does fail, the company is quick to offer a refund or replacement.",
      sentiment: "loved",
    },
    {
      pattern: "The phone apps are the weak link",
      detail:
        "A complaint that recurs across nearly every brand here — REDTIGER's UCAM, the VIOFO app, Nextbase, and Garmin alike — is finicky Wi-Fi pairing and clunky companion software, with owners reporting dropped connections and the occasional black-screen live view.",
      sentiment: "watch",
    },
    {
      pattern: "The SD card is on you, and it's picky",
      detail:
        "Owners frequently run into “memory card too slow” or “card full” warnings and learn the hard way that these cams demand a genuine high-endurance U3 card, not the cheap one from the drawer. Most units here also ship without a card at all.",
      sentiment: "watch",
    },
    {
      pattern: "Hot cars still test them",
      detail:
        "Heat is the most-cited long-term worry: Garmin's Mini line carries a documented overheating history, and some VIOFO owners report thermal beeps or recording stops in sun-baked cars — one more reason a supercapacitor cam paired with a heat-rated card is worth it.",
      sentiment: "watch",
    },
  ],
  // Real models we considered and left off the list, each with the one honest reason it lost.
  competition: [
    {
      name: "BlackVue DR900X Plus (2CH)",
      reason:
        "Around $480 — roughly double the A229 Plus — yet its rear channel is only 1080p, and its best cloud and live-view features push you toward an ongoing subscription.",
    },
    {
      name: "Thinkware U1000",
      reason:
        "Sharp 4K front and 2K rear, but reviewers consistently rate the Thinkware app slower and clunkier than rivals, the 4K files fill cards fast, and it sits at a premium price.",
    },
    {
      name: "Vantrue N4",
      reason:
        "A popular 3-channel cam, but it predates Sony STARVIS 2 (weaker night footage than the A139 Pro here) and has documented overheating reports in hot climates.",
    },
    {
      name: "Nexar Beam2",
      reason:
        "Records only 1080p and leans heavily on its app and cloud, which reviewers flag for glitches and a slow start-to-record, plus ongoing LTE costs after the first year.",
    },
    {
      name: "Garmin Dash Cam 67W",
      reason:
        "A crisp 1440p with a 180° view, but it's front-only with no dual-channel option, and the ultra-wide lens adds noticeable edge distortion at the frame's edges.",
    },
    {
      name: "WOLFBOX G840S",
      reason:
        "A 4K mirror-style cam, but the big reflective display is prone to daytime glare and reviewers report only mixed night vision — more of a rear-view screen upgrade than better evidence.",
    },
  ],
  // Genuine flaws of the #1 pick (VIOFO A229 Plus) that are real but not dealbreakers.
  winnerFlaws: [
    "Voice control is hit-or-miss — commands often need repeating, and early units needed the V1.3 firmware to fix Bluetooth-remote pairing and voice bugs.",
    "The rear channel is 1440p, not 4K — sharp, but a step behind true-4K-rear rivals for reading distant plates behind you.",
    "The adhesive mount is hard to reposition once it's stuck, and no microSD card is in the box — budget ~$40–50 for a high-endurance 256GB+ card.",
  ],
  skipThisIf: [
    "You only need to document the crashes you drive into — a single front cam like the A119 Mini 2 captures the same STARVIS 2 front footage for about half the price.",
    "You won't run a rear-camera cable or pay a shop — a two-channel install is a real 30–45 minute job, and a front-only cam is genuinely simpler.",
    "You want remote live-view or crash alerts while you're away from the parked car — the A229 Plus has no built-in LTE; that's the Nextbase iQ's role.",
    "You specifically need the sharpest possible rear-plate capture — its rear is 1440p, so a true-4K-rear setup will out-read it on the channel behind you.",
  ],
  changelog: [
    {
      date: "2026-07-09",
      note: "Published. Verified current prices, availability, resolution, and coverage specs against manufacturer spec pages and independent reviews.",
    },
  ],
  // Guide-level clickable citations backing the key claims (sensor, specs, prices).
  sources: [
    {
      label: "VIOFO A229 Plus — official specifications",
      url: "https://www.viofo.com/products/viofo-a229-plus-2ch-front-and-rear-2k2k-hdr-5ghz-wi-fi-gps-voice-control-dual-dash-camera-with-sony-starvis-2-sensor",
    },
    {
      label: "Sony Semiconductor — STARVIS 2 image-sensor technology",
      url: "https://www.sony-semicon.com/en/technology/security/index.html",
    },
    {
      label: "Automoblog — VIOFO A229 Plus review",
      url: "https://www.automoblog.com/viofo-a229-plus-review/",
    },
    {
      label: "PCWorld — VIOFO A119 Mini 2 review",
      url: "https://www.pcworld.com/article/1981452/viofo-a119-mini-2-dash-cam-review.html",
    },
    {
      label: "Nextbase — iQ Smart Dash Cam specifications",
      url: "https://nextbase.com/smart-dash-cams/iq-smart-dash-cam/",
    },
    {
      label: "Garmin — Dash Cam 67W specifications",
      url: "https://www.garmin.com/en-US/p/731429/",
    },
  ],
};
