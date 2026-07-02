import type { Category } from "@/lib/products";

/**
 * Buying-guide content model. Guides are the revenue engine: useful, honest editorial that ends in
 * real, affiliate-linked product picks. Language is research-based — never "we tested" (we haven't),
 * never invented reviews or numbers. Picks reference real product slugs in the catalog.
 */
export interface GuidePick {
  productId: string;
  /** Role label, e.g. "Best overall", "Best value", "Premium pick". */
  role: string;
  /** One specific, honest reason this earns the slot. */
  why: string;
}

export interface CheckItem {
  label: string;
  detail: string;
}

export interface Comparison {
  columns: string[];
  rows: string[][];
}

export interface Guide {
  slug: string;
  title: string;
  dek: string;
  category: Category;
  readMinutes: number;
  updated: string;
  heroImage?: string;
  /** 1–2 sentences: what most people should just buy. */
  quickAnswer: string;
  whoFor: string[];
  buyFirst: string;
  checkBeforeBuying: CheckItem[];
  mistakes: string[];
  picks: GuidePick[];
  comparison?: Comparison;
  tradeoffs: string;
  relatedGuides: string[];
  relatedKit?: string;
}

export const GUIDES: Guide[] = [
  // ─────────────────────────────────────────────────────────────── JUMP STARTERS
  {
    slug: "best-portable-jump-starters",
    title: "The Best Portable Jump Starters",
    dek: "A lithium jump pack is the one piece of car gear that pays for itself the first time your battery dies. Here's how to pick the right one — and which we'd buy.",
    category: "Jump Starters",
    readMinutes: 7,
    updated: "July 2026",
    quickAnswer:
      "For most cars, a compact 1000A lithium jump starter like the NOCO Boost GB40 is the right call — it cranks a dead battery with no second car, fits in the glovebox, and doubles as a phone bank. Drive a truck, big V8, or diesel? Step up to a 2000A+ pack. That's the whole decision.",
    whoFor: [
      "Anyone who's ever waited on a stranger with jumper cables",
      "New drivers and parents building a first car kit",
      "Commuters who park alone, and cold-climate drivers whose battery quits in winter",
    ],
    buyFirst:
      "Buy a compact 1000A lithium pack first. A dead battery is the most common reason a car won't move, and a self-contained pack means you're never depending on a second running vehicle. Match the amp rating up if your engine is large — never down.",
    checkBeforeBuying: [
      { label: "Peak amps vs. your engine", detail: "1000A covers most 4- and 6-cylinder gas engines. Big V8s, trucks, and diesels want 2000A or more. Cold weather lowers real output, so don't buy to the bare minimum." },
      { label: "Honest amp ratings", detail: "Premium brands (NOCO) rate conservatively; budget brands (GOOLOO, AVAPOW) print optimistic peak numbers. Don't compare a NOCO 1000A one-to-one with a budget 4000A — judge by the engine size the maker lists." },
      { label: "Safety protections", detail: "Look for spark-proof and reverse-polarity protection. It's the difference between a mistake being a beep and being a burnt hand." },
      { label: "It has to be charged", detail: "A jump pack that's sat flat in the trunk for a year won't help. Top it up a few times a year — or buy a batteryless supercapacitor unit that's always ready." },
    ],
    mistakes: [
      "Relying on jumper cables — they need a second running car and a willing stranger, at night, on a shoulder.",
      "Buying the biggest 'peak amp' budget number instead of matching the maker's rated engine size.",
      "Letting it self-discharge until it's dead the one time you finally need it.",
    ],
    picks: [
      { productId: "noco-boost-gb40-1000a-ultrasafe", role: "Best overall", why: "The default everyone else is compared to: honest 1000A, spark-proof UltraSafe clamps, genuinely pocketable, and it cranks the vast majority of everyday gas cars." },
      { productId: "noco-boost-hd-gb70-2000a", role: "Best for trucks & diesels", why: "Doubles the GB40's output for big V8s, diesels, boats, and RVs while keeping NOCO's safety pedigree. What serious truck owners actually buy." },
      { productId: "hulkman-alpha85-2000a-smart-jump", role: "Best smart display", why: "A color LCD shows exact charge, voltage, and jump readiness so you're not guessing at LED dots — plus 2000A and fast USB-C recharge." },
      { productId: "gooloo-gp4000-4000a-peak-lithium", role: "Best value power", why: "The most cranking amps per dollar. Covers essentially all gas engines and big diesels for well under premium-brand heavy-duty pricing — just remember the peak number runs optimistic." },
      { productId: "gooloo-gp2000-2000a-compact-lithium", role: "Best budget compact", why: "Small, light, and cheap, but still cranks bigger engines. The easy glovebox-backup pick for students and second cars." },
      { productId: "autowit-supercap-2-batteryless-supercapacitor", role: "The never-dies pick", why: "Holds no charge, so it never dies in the glovebox and shrugs off heat and cold. It charges itself from your weak battery in minutes, then jumps — ideal as a leave-it-in-the-car unit." },
    ],
    comparison: {
      columns: ["Pick", "Peak amps", "Handles up to", "Best for", "Approx. price"],
      rows: [
        ["NOCO Boost GB40", "1000A", "6.0L gas / 3.0L diesel", "Most cars", "$80–$100"],
        ["NOCO Boost GB70", "2000A", "8.0L gas / 6.0L diesel", "Trucks & diesels", "$150–$180"],
        ["Hulkman Alpha85", "2000A", "8.5L gas / 6.0L diesel", "Smart display", "$100–$130"],
        ["GOOLOO GP4000", "4000A*", "All gas / 10L diesel", "Value power", "$90–$130"],
        ["GOOLOO GP2000", "2000A*", "8.0L gas / 6.0L diesel", "Budget compact", "$60–$80"],
      ],
    },
    tradeoffs:
      "Size, power, and price pull against each other. A compact 1000A pack wins on pocketability and covers most drivers; a 2000A+ unit is peace of mind for big engines and cold climates but heavier and pricier. Budget brands give you more printed amps per dollar — just discount the headline number and read what engine they actually rate it for.",
    relatedGuides: ["roadside-emergency-kit", "best-cordless-tire-inflators", "best-portable-power-for-road-trips"],
    relatedKit: "roadside-kit",
  },

  // ─────────────────────────────────────────────────────────── TIRE INFLATORS
  {
    slug: "best-cordless-tire-inflators",
    title: "The Best Cordless Tire Inflators",
    dek: "A portable inflator turns a low or slow-leaking tire from a tow-truck problem into a two-minute one. Here's what matters and which to buy.",
    category: "Tire Inflators",
    readMinutes: 6,
    updated: "July 2026",
    quickAnswer:
      "For most drivers, a rechargeable cordless inflator with a preset PSI and auto-shutoff — like the Fanttik X8 APEX — is the sweet spot: set your pressure, walk away, and it stops itself. Want to spend less? A corded 12V unit like the EPAuto is slower but always ready off the car battery.",
    whoFor: [
      "Anyone who's watched a low-pressure light come on far from a gas station",
      "Drivers who want to top off tires at home on their own schedule",
      "Cyclists and motorcyclists who need one pump for everything",
    ],
    buyFirst:
      "Start with a cordless unit that has a digital preset and auto-shutoff. That one feature — set the target PSI and it stops on its own — is what makes an inflator a walk-away tool instead of a babysitting job.",
    checkBeforeBuying: [
      { label: "Preset PSI + auto-shutoff", detail: "The single feature that matters. Dial in the pressure, start it, and it stops itself — no over-inflating, no standing there watching a gauge." },
      { label: "Cordless vs. corded", detail: "Cordless is convenient and works away from the car, but needs charging. Corded 12V units are slower and tethered to the socket, but they're always ready off the car's battery." },
      { label: "Max PSI and speed", detail: "150 PSI is plenty for any car or SUV; you only need more for high-pressure applications. Bigger tires fill faster on higher-airflow units — a pocket inflator is slower on a truck tire." },
      { label: "Tool-brand ecosystems", detail: "If you already own DeWalt, Milwaukee, or Ryobi batteries, a bare-tool inflator on that platform is often the best value — just remember the battery is sold separately." },
    ],
    mistakes: [
      "Buying the cheapest no-name unit with a wildly optimistic PSI/speed claim.",
      "Getting a tiny pocket inflator for truck tires — it'll work, but slowly and hot.",
      "Letting a cordless unit sit dead — keep it charged or keep a corded one as backup.",
    ],
    picks: [
      { productId: "fanttik-x8-apex-portable-tire", role: "Best overall", why: "Reviewers' repeated best-cordless pick: fast, ~±1 PSI accurate, long runtime, premium build, and it doubles as a power bank and work light. Fills a car tire in about a minute." },
      { productId: "astroai-cordless-tire-inflator-160", role: "Best value", why: "A complete kit with its own 20V battery and a 12V car adapter for backup power — real 160 PSI without buying into any tool ecosystem." },
      { productId: "astroai-l7-compact-cordless-tire", role: "Best compact / budget", why: "Sub-one-pound, fits a glovebox, and cheap enough to keep one in every car. Slower on big tires, perfect for everyday top-offs." },
      { productId: "dewalt-20v-max-corded-cordless", role: "Best for tool owners", why: "Runs off a DeWalt 20V battery, a 12V socket, or a wall outlet — three power sources so it never leaves you stuck. Bare tool if you're already in the ecosystem." },
      { productId: "epauto-12v-dc-portable-air", role: "Best corded backup", why: "The foolproof budget pick: plug into the 12V socket and it's always ready, no charging. Slower and tethered, but it lives in the trunk and just works." },
    ],
    comparison: {
      columns: ["Pick", "Max PSI", "Power", "Best for", "Approx. price"],
      rows: [
        ["Fanttik X8 APEX", "150", "Rechargeable, USB-C", "Best overall", "$70–$90"],
        ["AstroAI 160 PSI kit", "160", "20V battery + 12V", "Value", "$50–$65"],
        ["AstroAI L7", "150", "Rechargeable", "Compact / budget", "$35–$45"],
        ["DeWalt DCC020IB", "160", "20V / 12V / 110V", "Tool owners", "$99 tool-only"],
        ["EPAuto 12V", "~100", "Corded 12V", "Always-ready backup", "$30–$40"],
      ],
    },
    tradeoffs:
      "Cordless wins on convenience and versatility; corded wins on always-ready simplicity and price. Premium units are faster and more accurate, but any inflator with auto-shutoff will get you home. If you can only keep one thing charged in the trunk, a corded 12V unit removes that worry entirely.",
    relatedGuides: ["best-portable-jump-starters", "roadside-emergency-kit", "car-gear-worth-keeping-in-your-trunk"],
    relatedKit: "roadside-kit",
  },

  // ─────────────────────────────────────────────────────────────── DASH CAMS
  {
    slug: "best-dash-cams",
    title: "The Best Dash Cams for Everyday Drivers",
    dek: "A dash cam is cheap insurance that pays off exactly once — when a crash becomes your word against theirs. Here's how to choose and which we'd fit.",
    category: "Dash Cams",
    readMinutes: 8,
    updated: "July 2026",
    quickAnswer:
      "For most drivers, a front-and-rear setup with Sony STARVIS 2 sensors — the VIOFO A229 Plus — is the best balance of clear plate-readable footage and price. Want the smallest, cheapest way in? A single 4K front cam like the ROVE R2-4K. Rideshare or delivery? Get a 3-channel with an interior camera.",
    whoFor: [
      "Commuters who want proof in a fender-bender or hit-and-run",
      "Uber, Lyft, and delivery drivers who need front and cabin coverage",
      "Parents of new drivers, and anyone who parks on the street overnight",
    ],
    buyFirst:
      "Decide front-only or front-and-rear first. Front-only covers most incidents cheaply; front-and-rear covers the rear-end hits and tailgaters you can't see coming. Then pick a Sony STARVIS 2 sensor if night footage matters — it's the difference between reading a plate and guessing at it.",
    checkBeforeBuying: [
      { label: "Sensor beats megapixels", detail: "A Sony STARVIS 2 sensor reads license plates at night far better than a cheap '4K' that's soft after dark. Sensor quality matters more than the headline resolution number." },
      { label: "Channels: front / rear / cabin", detail: "Front-only is cheapest. Front+rear covers tailgaters. A third interior channel is for rideshare and delivery drivers who need cabin footage." },
      { label: "Parking mode + power", detail: "Buffered parking mode records hits while you're away, but usually needs a hardwire kit for constant power. Check whether it's included." },
      { label: "The SD card is separate", detail: "Most cams don't include a card. Budget for a 256GB+ high-endurance microSD — regular cards fail under constant recording." },
    ],
    mistakes: [
      "Buying on the '4K' number alone and getting a soft sensor that can't read a plate at night.",
      "Forgetting the hardwire kit for parking mode, then wondering why it's off when parked.",
      "Using a normal microSD card that dies in months instead of a high-endurance one.",
    ],
    picks: [
      { productId: "viofo-a229-plus", role: "Best overall", why: "Dual Sony STARVIS 2 sensors record sharp 1440p front and rear — the plate-readable day-and-night footage that actually wins an insurance dispute, without paying 4K prices." },
      { productId: "viofo-a119-mini-2", role: "Best compact front-only", why: "Tiny enough to hide behind the mirror, but STARVIS 2 night footage punches far above its size and price. The discreet front-cam default." },
      { productId: "rove-r2-4k", role: "Best budget 4K", why: "The internet's default value 4K cam with one of the largest review counts anywhere — an easy, cheap yes for a first dash cam." },
      { productId: "viofo-a139-pro", role: "Best for rideshare (3-channel)", why: "True 4K front plus an infrared interior camera and a rear channel — the total-coverage setup Uber, Lyft, and delivery drivers need in one install." },
      { productId: "nextbase-iq-4k-smart-dash", role: "Best connected / premium", why: "Built-in 4G LTE, live view, and Emergency SOS make it a smart guardian that can call for help on impact — the premium halo pick." },
      { productId: "garmin-dash-cam-mini-2", role: "Smallest, most trusted brand", why: "Barely bigger than a car key, dead-simple setup, and Garmin's name — the set-and-forget choice for cautious buyers." },
    ],
    comparison: {
      columns: ["Pick", "Resolution", "Channels", "Best for", "Approx. price"],
      rows: [
        ["VIOFO A229 Plus", "1440p + 1440p", "Front + rear", "Best overall", "$200–$260"],
        ["VIOFO A119 Mini 2", "2K 1440p", "Front only", "Compact", "$100–$130"],
        ["ROVE R2-4K", "4K", "Front only", "Budget 4K", "$90–$120"],
        ["VIOFO A139 Pro", "4K + 1080p + 1080p", "Front + cabin + rear", "Rideshare", "$300–$360"],
        ["Nextbase iQ", "4K + 1440p", "Front + rear + LTE", "Connected / premium", "$400–$600"],
      ],
    },
    tradeoffs:
      "More channels and a better sensor cost more and take longer to install (running a rear line is a 30–45 minute job or a shop visit). Front-only STARVIS 2 covers most drivers beautifully; the jump to 4K matters most for reading distant plates in daylight. Connected cams add live view and SOS but lock the best features behind a subscription.",
    relatedGuides: ["car-gear-worth-keeping-in-your-trunk", "best-portable-power-for-road-trips", "roadside-emergency-kit"],
    relatedKit: "road-trip-kit",
  },

  // ────────────────────────────────────────────────────── ROADSIDE EMERGENCY KIT
  {
    slug: "roadside-emergency-kit",
    title: "The Roadside Emergency Kit: What Belongs in Your Trunk",
    dek: "You don't need a hundred-piece kit where ninety pieces are filler. You need the specific gear that covers the failures that actually happen. Here's the list.",
    category: "Roadside Safety",
    readMinutes: 8,
    updated: "July 2026",
    quickAnswer:
      "Cover the common failures in order: a jump starter for a dead battery, an inflator for a low tire, an escape tool within reach, and visibility gear (flares, triangles) so you're seen. An all-in-one kit like the Lifeline is a fine foundation — then upgrade the cables and inflator, which are the weak links in every bundle.",
    whoFor: [
      "New and young drivers building a first kit from nothing",
      "Parents outfitting a teen's first car",
      "Anyone who'd rather not wait two hours on a shoulder for roadside assistance",
    ],
    buyFirst:
      "If your trunk is empty, buy an all-in-one roadside kit first for broad coverage, then add a real jump starter and inflator — the two items that do the heavy lifting and that every bundled kit skimps on.",
    checkBeforeBuying: [
      { label: "Build around real failures", detail: "Dead battery, low tire, dark shoulder, being seen. Buy for those first; skip the 100-piece kits where most pieces are filler you'll never touch." },
      { label: "Escape tool, within reach", detail: "A seatbelt cutter and window punch only works if you can grab it while belted. Mount it — a tool in the trunk during a submersion does nothing. Note it's for tempered side glass, not laminated windshields." },
      { label: "Flares vs. triangles", detail: "LED flares are reusable and safe near fuel; reflective triangles need no batteries. Use both — visibility is the cheapest safety you can buy." },
      { label: "Keep the powered gear charged", detail: "Jump starter, inflator, and work light all need topping up a few times a year, or they're dead weight when it counts." },
    ],
    mistakes: [
      "Buying a giant bargain kit and assuming the thin cables and mini-compressor inside are enough.",
      "Keeping the escape tool in the glovebox or trunk where you can't reach it in a crash.",
      "No light — changing a tire on a shoulder at night with a phone in your teeth is miserable and unsafe.",
    ],
    picks: [
      { productId: "lifeline-4388aaa-excursion-road-76", role: "Start here (all-in-one)", why: "The AAA co-developed kit bundles cables, a compressor, a light, and first-aid basics in one case — the fastest way to go from an empty trunk to broad coverage." },
      { productId: "resqme-the-original-car-escape", role: "Keep within reach", why: "A keychain seatbelt cutter and window breaker that turns a trapped-in-the-car emergency into a five-second exit. Made in the USA, originally issued to first responders." },
      { productId: "energizer-1-gauge-800a-heavy", role: "Real jumper cables", why: "Thick 1-gauge, 800A, 25-foot cables that actually crank a truck — the heavy upgrade over the thin cables in every bundled kit." },
      { productId: "wagan-fred-flashing-roadside-emergency", role: "So they see you", why: "Reusable magnetic LED flares with no fire risk near fuel — set them behind a breakdown at night and be seen before you're hit." },
      { productId: "first-alert-auto5-car-fire", role: "Fire extinguisher", why: "A UL-rated 5-B:C extinguisher with a mounting bracket — one of the few items that protects both the car and the people in it." },
      { productId: "boulder-tools-heavy-duty-tire", role: "Fix a puncture", why: "A pro tubeless plug kit that actually repairs a nail-in-the-tread at the roadside so you can reinflate and drive to a shop instead of waiting for a tow." },
    ],
    comparison: {
      columns: ["Item", "What it handles", "Priority", "Approx. price"],
      rows: [
        ["All-in-one kit", "Broad coverage in one case", "Start here", "$50–$75"],
        ["Escape tool", "Trapped after a crash", "Essential", "$10–$15"],
        ["Heavy jumper cables", "Dead battery (with a 2nd car)", "High", "$45–$70"],
        ["LED flares", "Being seen at night", "High", "$30–$45"],
        ["Tire plug kit", "Nail / puncture", "Medium", "$25–$35"],
      ],
    },
    tradeoffs:
      "An all-in-one kit gets you covered fast but skimps on the cables and compressor; buying the heavy-duty versions of those separately is what makes the kit actually reliable. Everything here is cheap relative to a single tow or a night stranded — the real cost is not having it when the shoulder is dark and cold.",
    relatedGuides: ["best-portable-jump-starters", "best-cordless-tire-inflators", "car-gear-worth-keeping-in-your-trunk"],
    relatedKit: "roadside-kit",
  },

  // ─────────────────────────────────────────── PORTABLE POWER FOR ROAD TRIPS
  {
    slug: "best-portable-power-for-road-trips",
    title: "The Best Portable Power for Car & Road Trips",
    dek: "Power stations and big banks keep phones, laptops, and small gear alive on the road and through an outage — without a loud, gas-hungry generator. Here's how to size one.",
    category: "Power & Charging",
    readMinutes: 8,
    updated: "July 2026",
    quickAnswer:
      "For a do-everything road-trip and outage unit, a ~1000Wh LiFePO4 power station like the Jackery Explorer 1000 v2 is the sweet spot — a real 1500W AC outlet, all-day device power, and a battery rated for thousands of cycles. Just need to keep phones and a laptop alive? A 20,000–27,000mAh bank is far cheaper and flies with you.",
    whoFor: [
      "Road-trippers, car campers, and van-lifers who want AC power off-grid",
      "Anyone who wants calm, right-sized outage backup without a generator",
      "Remote workers keeping a laptop and phone alive between outlets",
    ],
    buyFirst:
      "Match capacity to what you actually run. A big power bank covers phones and a laptop for pennies; a power station is worth it once you need a real wall outlet for a mini-fridge, CPAP, or camp gear. Don't buy a station big enough for appliances it can't sustain for long.",
    checkBeforeBuying: [
      { label: "Watt-hours (Wh) = how long", detail: "Capacity is measured in Wh. A ~300Wh unit keeps devices going; ~1000Wh runs small appliances for a while. Match it to what you need to keep on, not the biggest number." },
      { label: "Watts (W) = what it can run", detail: "The AC inverter's continuous watts decides what plugs in. 300W runs laptops and a CPAP; 1500W+ runs most car-camp gear. 'Surge' figures are brief peaks, not continuous." },
      { label: "LiFePO4 lasts longer", detail: "Newer LiFePO4 chemistry survives thousands of charge cycles vs. hundreds for older packs — worth it for something you'll keep for years." },
      { label: "The airline limit", detail: "Power banks over ~100Wh (roughly 27,000mAh) generally can't fly. A 20,000–27,000mAh bank is the practical carry-on ceiling; power stations are car/home only." },
    ],
    mistakes: [
      "Buying a power station big enough for a space heater or fridge it can only run for minutes.",
      "Letting backup power sit uncharged until the storm or trip is already here.",
      "Bringing a power bank that's too big to fly, or too small for a laptop.",
    ],
    picks: [
      { productId: "jackery-explorer-1000-v2-portable", role: "Best overall", why: "1070Wh of LiFePO4 with a real 1500W AC outlet, ~1-hour recharge, and the brand people actually trust — the definitive road-trip and outage anchor." },
      { productId: "ecoflow-river-2-pro-portable", role: "Best mid-size", why: "768Wh in a 17-pound body that recharges in about 70 minutes — enough to run a mini-fridge or CPAP overnight without hauling a 30-pound brick." },
      { productId: "anker-solix-c300-portable-power", role: "Best compact value", why: "288Wh and a genuine 300W AC output in a grab-and-go size with fast USB-C — light, affordable backup for phones, laptops, and a CPAP." },
      { productId: "anker-prime-power-bank", role: "Best power bank", why: "27,650mAh and 250W tops off a laptop, phone, and tablet at once, then refills itself in ~37 minutes — and still flies carry-on." },
      { productId: "jackery-solarsaga-100w-portable-solar", role: "Best off-grid add-on", why: "A foldable 100W panel that recharges a Jackery Explorer from the sun — the piece that makes multi-day, no-outlet trips actually work." },
      { productId: "bestek-300w-car-power-inverter", role: "Cheapest AC in the car", why: "Plugs into the 12V socket to run a laptop or CPAP off the engine — the simplest, cheapest way to get a wall outlet on a drive." },
    ],
    comparison: {
      columns: ["Pick", "Capacity", "AC output", "Best for", "Approx. price"],
      rows: [
        ["Jackery Explorer 1000 v2", "1070Wh", "1500W", "Best overall", "$449–$799"],
        ["EcoFlow River 2 Pro", "768Wh", "800W", "Mid-size / fast charge", "$329–$599"],
        ["Anker SOLIX C300", "288Wh", "300W", "Compact value", "$179–$299"],
        ["Anker Prime bank", "27,650mAh", "USB only", "Laptop + phones", "$129–$179"],
        ["BESTEK inverter", "—", "300W (from car)", "Cheap AC in the car", "$28–$40"],
      ],
    },
    tradeoffs:
      "Capacity, weight, and price all climb together. A power bank is cheap, flies, and covers phones and a laptop; a power station adds a real wall outlet but you feel every extra pound and dollar. Size to the trip you actually take most — most people over-buy capacity they'll rarely use, then resent carrying it.",
    relatedGuides: ["best-portable-jump-starters", "best-dash-cams", "car-gear-worth-keeping-in-your-trunk"],
    relatedKit: "backup-power-kit",
  },

  // ─────────────────────────────────────────── CAR GEAR WORTH KEEPING IN TRUNK
  {
    slug: "car-gear-worth-keeping-in-your-trunk",
    title: "Car Gear Worth Keeping in Your Trunk",
    dek: "Beyond the emergencies, a handful of quality upgrades quietly make every drive better. These are the ones that earn their permanent spot in the car.",
    category: "Car Utility",
    readMinutes: 7,
    updated: "July 2026",
    quickAnswer:
      "A few quality items pay for themselves in saved hassle: a collapsible trunk organizer so gear stops sliding, a smart battery maintainer so your car always starts, a real cordless car vacuum, and a high-wattage USB-C car charger. Buy the good version once — the cheap ones are the ones you replace.",
    whoFor: [
      "New car owners setting up the trunk right the first time",
      "Commuters and rideshare drivers who live in their car",
      "Anyone tired of a chaotic trunk, a dead cabin battery, or crumbs everywhere",
    ],
    buyFirst:
      "Start with a collapsible trunk organizer — it's cheap, it makes everything else you carry usable, and it folds flat when you need the space. From there, add the battery maintainer and a real car charger.",
    checkBeforeBuying: [
      { label: "Buy quality once", detail: "Under $50 is where no-name quality varies most. A good organizer, charger, or vacuum outlasts three cheap ones — spend on the things that have to keep working." },
      { label: "Match the charger to your devices", detail: "A 100W+ USB-C car charger fast-charges a laptop and phone at once; a basic one trickles. Check the single-port wattage, not just the total." },
      { label: "Maintainer vs. charger", detail: "A smart maintainer (like a NOCO GENIUS) keeps a battery healthy and can recover a dead one — worth it for a daily driver, a stored car, or a motorcycle." },
      { label: "Fit and mounting", detail: "Vent mounts, headrest mounts, and organizers all depend on your specific car — check clearance, headrest posts, and trunk shape before buying." },
    ],
    mistakes: [
      "Buying the cheapest vacuum or charger and replacing it within a year.",
      "Skipping a battery maintainer, then getting stranded by a slow parasitic drain.",
      "Cluttering the car with gadgets you'll never use because they were 'only $15'.",
    ],
    picks: [
      { productId: "drive-car-trunk-organizer", role: "Best organizer", why: "Stiff reinforced walls that hold shape, a waterproof lining, and straps that anchor it so it stops sliding — then folds flat. The benchmark collapsible organizer." },
      { productId: "noco-genius5-smart-battery-charger", role: "Best battery maintainer", why: "A 5A smart charger that actually recharges a dead battery overnight yet is safe to leave connected — auto-detects chemistry and revives deeply drained batteries." },
      { productId: "fanttik-slim-v8-apex-cordless", role: "Best car vacuum", why: "A brushless cordless vacuum with real 19,000Pa suction and a slim body that reaches between seats and vents — no cord, no 12V outlet needed." },
      { productId: "baseus-160w-usb-c-car", role: "Best car charger", why: "A genuine 100W from a single USB-C port fast-charges a MacBook and a phone at once — real premium wattage in a compact 12V charger." },
      { productId: "drop-stop-car-seat-gap", role: "Best cabin fix", why: "The original patented seat-gap filler that stops phones, keys, and coins from vanishing into the seat crevice — a $25 fix for a daily annoyance." },
      { productId: "chemical-guys-car-wash-kit", role: "Best detailing kit", why: "The enthusiast-default wash kit — a foam blaster, buckets, towels, and seven care products in one box, roughly $200 of product for well under $100." },
    ],
    comparison: {
      columns: ["Item", "What it does", "Best for", "Approx. price"],
      rows: [
        ["Trunk organizer", "Stops gear sliding, folds flat", "Everyone", "$35–$45"],
        ["Battery maintainer", "Keeps the car starting", "Daily & stored cars", "$50–$70"],
        ["Cordless car vacuum", "Crumbs, sand, pet hair", "Families & pets", "$60–$100"],
        ["160W car charger", "Fast-charge laptop + phone", "Commuters", "$45–$60"],
        ["Seat-gap filler", "No more dropped phones", "Everyone", "$25–$30"],
      ],
    },
    tradeoffs:
      "None of this is dramatic — it's the quiet layer of gear that removes small daily frictions. The rule is simple: spend on the things that have to work (charger, maintainer, vacuum) and don't let a low price talk you into clutter you'll never use. Buy the good version of a few things, not the cheap version of many.",
    relatedGuides: ["best-dash-cams", "best-portable-power-for-road-trips", "roadside-emergency-kit"],
    relatedKit: "road-trip-kit",
  },
];

const BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));

export function getAllGuides(): Guide[] {
  return GUIDES;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return BY_SLUG.get(slug);
}

export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);

/** Guides that feature a given product (for product-page cross-linking). */
export function getGuidesForProduct(productId: string): Guide[] {
  return GUIDES.filter((g) => g.picks.some((p) => p.productId === productId));
}
