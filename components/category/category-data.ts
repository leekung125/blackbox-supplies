import type { Product } from "@/lib/products";

/**
 * Category-hub editorial data — the "lived-in" layer that turns a bare product grid into a
 * world-class category starting point. Everything here is authored + honest: no fabricated specs,
 * no invented reviews. Buyer FAQs and use-case labels are grounded in the same public specs and
 * category facts the comparison guides already cite. Use-case paths reference REAL catalog IDs and
 * are resolved against the live catalog at render (unresolvable ones are simply dropped).
 */

export interface Faq {
  q: string;
  a: string;
}

export interface UseCase {
  /** Short buyer intent, e.g. "For a big truck or diesel". */
  label: string;
  /** One honest, grounded reason this is the pick for that intent. */
  note: string;
  /** Real catalog product id this intent resolves to. */
  productId: string;
}

export interface ResolvedUseCase {
  label: string;
  note: string;
  product: Product;
}

// ── cinematic hero art, keyed by category NAME (files under /public/brand) ─────
const HERO_CAR = new Set(["Jump Starters", "Tire Inflators", "Dash Cams", "Roadside Safety", "Car Utility"]);
const HERO_COOLING = new Set(["Portable AC", "Cooling Fans", "Dorm Cooling", "Personal Cooling"]);
const HERO_DESK = new Set(["Desk & Tech", "Travel & EDC", "Problem Solvers"]);

export function heroForCategory(name: string): string {
  if (name === "Power & Charging") return "/brand/hero-power.png";
  if (HERO_CAR.has(name)) return "/brand/hero-car.png";
  if (HERO_COOLING.has(name)) return "/brand/hero-cooling.png";
  if (HERO_DESK.has(name)) return "/brand/hero-desk.png";
  return "/brand/hero-tools.png";
}

// ── the single line that answers "what actually decides this purchase" ─────────
const WHAT_MATTERS: Record<string, string> = {
  "Jump Starters": "It comes down to cranking power for your engine size — and keeping it charged.",
  "Tire Inflators": "It comes down to how fast it airs up, and whether the battery outlasts the job.",
  "Dash Cams": "It comes down to night clarity and whether it survives a hot, parked car.",
  "Power & Charging": "It comes down to watt-hours for runtime and continuous watts for what you can run.",
  "Roadside Safety": "It comes down to covering the real failures — being seen, getting out, restarting.",
  "Car Utility": "It comes down to buying the quality version of the few things that have to work.",
  "Portable AC": "It comes down to SACC (not the box BTU), room size, and single- vs dual-hose.",
  "Cooling Fans": "It comes down to airflow, noise, and a DC motor if it's for a bedroom.",
  "Personal Cooling": "It comes down to real cooling versus just airflow, and battery runtime.",
  "Dorm Cooling": "It comes down to quiet — a fan, a cool bed, and a compact fridge that won't whine.",
  "Desk & Tech": "It comes down to fixing glare, posture, and cable chaos before anything else.",
  "Travel & EDC": "It comes down to the few things you'll actually reach for — built to last.",
  "Problem Solvers": "It comes down to one specific thing, done unusually well.",
};

export function getWhatMatters(name: string): string {
  return WHAT_MATTERS[name] ?? "Buy the right one once — we name the spec that decides it, and the honest catch.";
}

// ── buyer FAQ (authored, honest, category-specific) ────────────────────────────
const FAQ_FALLBACK: Faq[] = [
  {
    q: "How does BlackBox choose its picks?",
    a: "Every pick earns its spot on specs, reputation, and real buyer demand — never paid placement. We name the best one and the honest catch.",
  },
  {
    q: "Are the prices exact?",
    a: "Prices are approximate and move constantly, so always confirm the live price on Amazon before buying. We never invent numbers.",
  },
  {
    q: "Have you personally tested these?",
    a: "No — and we won't claim we have. Picks are grounded in manufacturer spec sheets, cross-checked verified-buyer reviews, and price history, cited so you can check our work.",
  },
];

const FAQ_BY_CATEGORY: Record<string, Faq[]> = {
  "Jump Starters": [
    { q: "How many amps do I actually need?", a: "For most sedans and small SUVs a 1000A-peak pack is plenty. Big trucks, V8s, and diesels want 2000A or more. Peak amps are a marketing headline — the engine-size rating (e.g. \"up to 6.0L gas / 3.0L diesel\") tells you far more than the big number on the box." },
    { q: "Will it start a completely dead battery?", a: "Yes — a lithium jump pack carries its own charge, so it can crank a car with a fully dead battery and no second vehicle. That's the whole point of owning one over cables." },
    { q: "Jump starter or jumper cables?", a: "A jump starter needs no second car, which is exactly what you don't have on an empty shoulder. Cables are cheaper and never need charging, but only work if a Good Samaritan stops. Many drivers keep both." },
    { q: "How often do I have to recharge it?", a: "Most lithium packs hold a charge for months but self-discharge slowly — top it up every three to six months. Supercapacitor units sidestep this entirely by charging from the car's own dead battery in a couple of minutes." },
  ],
  "Tire Inflators": [
    { q: "How long does it take to inflate a tire?", a: "A good cordless inflator tops a car tire from low to full in about a minute. Starting from flat takes longer, and truck, SUV, and higher-PSI tires take proportionally more time and battery." },
    { q: "Cordless or 12V plug-in?", a: "Cordless (Li-ion) is the convenience pick — no cord, and it works away from the car. A 12V corded unit never runs out of battery on a long job but tethers you to the outlet. Some units offer both." },
    { q: "What PSI rating do I need?", a: "Car tires run about 30–35 PSI, and most inflators max out at 120–160 PSI — far more than a passenger tire needs. If you air up truck, RV, or trailer tires, check the max PSI and the duty cycle." },
    { q: "Can it fully inflate a flat, or just top off?", a: "Small pocket inflators are best for topping off a slow leak; inflating a fully flat tire strains them and drains the battery. For real flats, size up to a unit with a bigger battery or a 12V fallback." },
  ],
  "Dash Cams": [
    { q: "Do I need front and rear, or just front?", a: "Front-only covers most incidents and costs less. Rear — or a three-channel with a cabin lens — matters if you're rear-ended often, drive rideshare, or want parking-lot coverage. Decide by how you actually drive." },
    { q: "What resolution reads a license plate?", a: "1440p (2K) up front is the sweet spot for legible plates at speed; 4K helps at distance but eats storage. Sensor quality (e.g. Sony STARVIS 2) and low-light performance matter as much as raw resolution." },
    { q: "Supercapacitor or battery?", a: "Supercapacitor cams tolerate the heat of a parked car far better than lithium batteries, which can swell in summer. For a windshield in a hot climate, prefer a supercapacitor model." },
    { q: "Does parking mode drain my car battery?", a: "Parking mode records while parked and draws some power. Most cams use a hardwire kit with a low-voltage cutoff to protect your battery — check whether that kit is included or sold separately." },
  ],
  "Power & Charging": [
    { q: "What size power station do I need?", a: "Match watt-hours (Wh) to what you run and for how long: ~300Wh tops phones and laptops for a weekend, ~1000Wh runs devices plus small appliances for a day, and more handles a fridge or CPAP overnight. Also check the continuous AC-watt rating so it can actually start your appliance." },
    { q: "Power bank or power station?", a: "A power bank (rated in mAh) is pocketable and for phones and tablets. A power station (Wh, with real AC outlets) powers laptops, CPAPs, and small appliances. They're different jobs — buy for the one you have." },
    { q: "What is LiFePO4 and does it matter?", a: "LiFePO4 batteries last far more charge cycles and run cooler than older lithium chemistries, so a LiFePO4 station stays healthy for years longer. Nearly every quality station worth buying now uses it." },
    { q: "Can I recharge it from solar?", a: "Most stations accept a compatible solar panel for off-grid recharging, but the wattage and connector have to match the unit. It's the difference between days off-grid and a single charge." },
  ],
  "Roadside Safety": [
    { q: "What actually belongs in a trunk kit?", a: "Cover the real failures in order: a way to be seen (flares or triangles), a way to get out (an escape tool), a way to restart or fix (jump starter, tire plug or inflator), and basic first aid. Skip the 100-piece bargain kits that are mostly filler." },
    { q: "LED flares or reflective triangles?", a: "LED flares are reusable, visible from far off, and safe near spilled fuel; triangles need no battery and never die. Carry both — visibility is the cheapest safety you can buy." },
    { q: "Where should the escape tool live?", a: "Mounted within reach of the driver's seat — not the trunk or glovebox. In a crash or submersion it only helps if you can grab it while belted. Note that most window punches work on tempered side glass, not laminated windshields." },
    { q: "Do I really need a fire extinguisher?", a: "A small UL-rated 5-B:C extinguisher with a mount protects both the car and the people in it. It's cheap insurance, especially in older cars and for anyone who does their own wrenching." },
  ],
  "Car Utility": [
    { q: "What's worth keeping in the car full-time?", a: "The quiet-utility layer: a collapsible trunk organizer, a high-watt USB-C car charger, a battery maintainer, and a real cordless vacuum. Spend on the few things that have to keep working, and skip the $15 gadgets you'll never touch." },
    { q: "Battery maintainer or charger?", a: "A charger refills a battery; a smart maintainer keeps it topped and healthy indefinitely and can revive a deeply drained one. For a daily driver, a stored car, or a motorcycle, the maintainer is the better buy." },
    { q: "How many watts should a car charger be?", a: "To fast-charge a laptop and a phone at once, look for 100W on a single USB-C port — not just a big combined total. A basic charger only trickles power to a laptop." },
    { q: "Buy cheap or buy quality?", a: "Under $50 is where no-name quality varies most. A good organizer, charger, or vacuum outlasts three cheap ones — buy the good version once and stop replacing it." },
  ],
  "Portable AC": [
    { q: "Why is the BTU number misleading?", a: "The big number on the box is the old ASHRAE rating. SACC (the DOE's tested figure) is the real-world number and is often 30–50% lower — a \"14,000 BTU\" unit can be 8,000 SACC. Compare units by SACC or you're comparing marketing to marketing." },
    { q: "What size do I need for my room?", a: "Roughly 20 SACC BTU per square foot, plus margin for sun, top floors, and kitchens. Undersizing is the number-one regret — a unit that runs flat-out and never catches up in a real heatwave." },
    { q: "Single-hose or dual-hose?", a: "Dual-hose cools a big or sunny room faster and more efficiently; single-hose is cheaper and simpler for small spaces. For a real heatwave in a large room, pay for dual-hose." },
    { q: "How loud are they, really?", a: "Every portable AC gets loud on high — the compressor is in the room with you. Inverter units modulate instead of slamming on and off all night, which is much easier to sleep through." },
  ],
  "Cooling Fans": [
    { q: "Tower, pedestal, or bladeless?", a: "Towers are slim and quiet for bedrooms, pedestals push more air across a room, and bladeless models are kid- and pet-safe and easy to clean. Match the form to the space it lives in." },
    { q: "Are bladeless fans worth the premium?", a: "You're paying for safety, quiet, and looks — not raw airflow. For a nursery, a home office, or a fan that doubles as an air purifier they earn it; for a garage, a cheap box fan moves more air per dollar." },
    { q: "How do I get a quiet bedroom fan?", a: "Look for a DC-motor tower with a low or sleep setting and a published low-noise figure. DC motors are quieter and use far less power than the older AC-motor fans." },
    { q: "Fan or air conditioner?", a: "A fan moves air to help sweat evaporate — it doesn't lower the temperature. In dry heat a fan (or an evaporative cooler) is often enough; in humid heat it won't cut it and you need an AC." },
  ],
  "Personal Cooling": [
    { q: "Do neck fans actually cool you down?", a: "Bladeless neck fans move air hands-free and genuinely help in warm, dry conditions. A few — like Peltier neck coolers — press a real cold plate to the back of your neck for spot cooling that's a step beyond airflow alone." },
    { q: "How long does the battery last?", a: "Most run several hours on low and far less on high, so check the mAh and the rated runtime. High speed always drains the fastest — plan for the setting you'll actually use." },
    { q: "Are they safe around hair?", a: "Bladeless, hair-safe designs avoid the classic tangling problem of open-blade personal fans — worth prioritizing if long hair is a concern." },
  ],
  "Dorm Cooling": [
    { q: "How do I cool a dorm with no window AC?", a: "Most dorms ban window units, so lean on a quiet tower or circulator fan, a cooling mattress topper for sleep, and a compact fridge for cold drinks. Together they make a hot room genuinely livable." },
    { q: "How small should a mini fridge be?", a: "3–3.5 cu ft fits most dorm setups and holds a real week of food plus a small freezer chiller. Check the noise figure — a compressor whine is miserable in a small room — and that the door reverses." },
    { q: "Will a cooling topper really help me sleep?", a: "A gel or breathable topper won't refrigerate you, but it pulls heat away and kills the thin dorm-mattress hot spot, which is often enough to fall asleep in a warm room." },
    { q: "What about noise in a shared room?", a: "Prioritize a DC-motor fan with a sleep mode and an Energy Star fridge with a low dB rating. In a small shared space, quiet matters as much as cooling." },
  ],
  "Desk & Tech": [
    { q: "What's the highest-impact desk upgrade?", a: "A monitor light bar (it kills glare without hogging desk space) and a laptop stand at eye level fix the two things you feel every single day: eye strain and a hunched neck. Start there." },
    { q: "Do I need a Thunderbolt dock?", a: "If you run a laptop as a desktop with dual monitors and a pile of peripherals, a dock turns it into one-cable docking. For a single monitor and a charger, a good multi-port charger is enough." },
    { q: "How do I fix cable chaos under the desk?", a: "A cable-management tray or box plus a few ties clears the tangle, and a charging station consolidates the wall-wart pile into one brick. Cheap fixes with an outsized daily payoff." },
  ],
  "Travel & EDC": [
    { q: "AirTag or a rechargeable tracker?", a: "On iPhone, AirTag's Find My network is unbeatable for coverage — the catch is a coin-cell battery to swap yearly. Rechargeable trackers, and Android-friendly ones on Google's network, trade a little coverage for USB-C recharging." },
    { q: "What earns a spot in a daily carry?", a: "The things you reach for without thinking: a tracker for keys and bags, a compact multitool, and a right-sized power bank. Buy the quality version once — EDC gear lives a hard life." },
    { q: "How big a travel power bank should I get?", a: "20,000mAh is the airline-friendly sweet spot: several phone charges or one laptop top-up, and still under the 100Wh carry-on limit. Look for a built-in cable and enough watts to charge a laptop." },
  ],
  "Problem Solvers": [
    { q: "What is this category?", a: "A small shelf of gear that fixes one specific, nagging problem cleanly — the kind of thing you didn't know existed until it solved something annoying. Each pick is here because it does one job unusually well." },
    { q: "How do these earn a spot?", a: "The same bar as everything else: chosen on merit, honest about the catch, and only when it genuinely beats the obvious alternative for a real problem." },
  ],
};

export function getFaqs(name: string): Faq[] {
  return FAQ_BY_CATEGORY[name] ?? FAQ_FALLBACK;
}

// ── use-case "Best for X" paths (real catalog IDs, resolved at render) ─────────
const USE_CASES_BY_CATEGORY: Record<string, UseCase[]> = {
  "Jump Starters": [
    { label: "For a big truck or diesel", note: "2000A cranking, up to 8.0L gas / 6.0L diesel.", productId: "noco-boost-hd-gb70-2000a" },
    { label: "Smallest glovebox backup", note: "Compact 2000A lithium that lives in the door pocket.", productId: "gooloo-gp2000-2000a-compact-lithium" },
    { label: "Best all-round value", note: "1000A — plenty for a typical sedan or small SUV.", productId: "noco-boost-gb40-1000a-ultrasafe" },
    { label: "Never needs charging", note: "Supercapacitor charges from the dead battery itself.", productId: "autowit-supercap-2-batteryless-supercapacitor" },
  ],
  "Tire Inflators": [
    { label: "One no-compromise cordless", note: "150 PSI, tops a car tire in about a minute.", productId: "fanttik-x8-apex-portable-tire" },
    { label: "Smallest always-in-the-car", note: "Pocket-size for quick top-offs on a slow leak.", productId: "astroai-l7-compact-cordless-tire" },
    { label: "Full package + 12V fallback", note: "Battery for convenience, 12V for the long jobs.", productId: "astroai-cordless-tire-inflator-160" },
    { label: "Foolproof budget backup", note: "Simple 12V unit that just lives in the trunk.", productId: "epauto-12v-dc-portable-air" },
  ],
  "Dash Cams": [
    { label: "Best front + rear evidence", note: "Dual 1440p with Sony STARVIS 2 sensors.", productId: "viofo-a229-plus" },
    { label: "Most discreet + heat-tolerant", note: "Supercapacitor front cam that hides behind the mirror.", productId: "viofo-a119-mini-2" },
    { label: "For rideshare (front + cabin)", note: "3-channel coverage for Uber, Lyft, and delivery.", productId: "viofo-a139-pro" },
    { label: "Best 4K value", note: "4K front with an on-device screen, first-timer friendly.", productId: "rove-r2-4k" },
  ],
  "Power & Charging": [
    { label: "Whole-day road-trip power", note: "1070Wh LiFePO4, 1500W AC for devices + appliances.", productId: "jackery-explorer-1000-v2-portable" },
    { label: "Light day-trip backup", note: "288Wh — phones and laptops, easy to carry.", productId: "anker-solix-c300-portable-power" },
    { label: "Headroom + home UPS", note: "1152Wh runs a fridge plus devices, backs up the house.", productId: "bluetti-ac180-portable-power-station" },
    { label: "Recharge off-grid (solar)", note: "100W panel to keep a Jackery topped for days out.", productId: "jackery-solarsaga-100w-portable-solar" },
  ],
  "Roadside Safety": [
    { label: "Empty trunk? Start here", note: "76-piece AAA kit — broad coverage in one case.", productId: "lifeline-4388aaa-excursion-road-76" },
    { label: "Get out fast", note: "Keychain seatbelt cutter + window breaker, made in USA.", productId: "resqme-the-original-car-escape" },
    { label: "So they see you at night", note: "Reusable magnetic LED flares, no fire risk near fuel.", productId: "wagan-fred-flashing-roadside-emergency" },
    { label: "Cables that crank a truck", note: "1-gauge, 800A, 25-foot heavy-duty jumper cables.", productId: "energizer-1-gauge-800a-heavy" },
  ],
  "Car Utility": [
    { label: "Keep the car always starting", note: "5A smart maintainer, revives a battery down to 1V.", productId: "noco-genius5-smart-battery-charger" },
    { label: "Fast-charge laptop + phone", note: "160W total, up to 100W on one USB-C port.", productId: "baseus-160w-usb-c-car" },
    { label: "Tame a chaotic trunk", note: "Reinforced collapsible organizer that ties down.", productId: "drive-car-trunk-organizer" },
    { label: "Cordless cabin vacuum", note: "Slim brushless vac that reaches between the seats.", productId: "fanttik-slim-v8-apex-cordless" },
  ],
  "Portable AC": [
    { label: "Quiet big-room bedroom", note: "12,000 SACC inverter, ~42 dB, up to 550 sq ft.", productId: "midea-duo-14-000-btu-smart" },
    { label: "Sunny or large room", note: "Dual-hose cools faster in up to 600 sq ft.", productId: "whynter-nex-arc-1230wn-14-000" },
    { label: "Renter on a budget", note: "Simple single-hose unit for a bedroom or office.", productId: "black-decker-10-000-btu-3" },
    { label: "Off-grid / camping spot cooler", note: "Battery-capable spot AC for tents and vans.", productId: "ecoflow-wave-3-portable-air-conditioner" },
  ],
  "Cooling Fans": [
    { label: "One flexible, kid-safe fan", note: "Bladeless, pivots from tower to horizontal airflow.", productId: "shark-turboblade-bladeless-tower-fan-tf202s" },
    { label: "Near-silent for the bedroom", note: "DC-motor bladeless tower for all-night quiet.", productId: "dreo-42-inch-bladeless-tower-fan" },
    { label: "Clean air + a breeze", note: "Sealed HEPA H13 plus a bladeless cooling fan.", productId: "dyson-purifier-cool-tp07-bladeless-tower" },
    { label: "Affordable + space-saving", note: "Slim tower fan that covers a room for less.", productId: "lasko-wind-curve-2551-42-inch" },
  ],
  "Personal Cooling": [
    { label: "Real cooling on your neck", note: "Peltier plate presses genuine cold to the skin.", productId: "torras-coolify-2s-neck-air-conditioner" },
    { label: "All-day hands-free airflow", note: "Bladeless neck fan, 5000mAh, hair-safe.", productId: "jisulife-portable-neck-fan-pro-100" },
    { label: "Festivals + the beach", note: "Handheld misting fan for hot, dry crowds.", productId: "handfan-portable-handheld-misting-fan-spray" },
  ],
  "Dorm Cooling": [
    { label: "Quiet compact fridge", note: "3.3 cu ft, ~42 dB, Energy Star for a small room.", productId: "midea-whs-121lb1-mini-fridge-3" },
    { label: "Cooler dorm sleep", note: "Gel cooling topper over a thin Twin XL mattress.", productId: "serta-thermagel-cooling-memory-foam-mattress" },
    { label: "Quiet, smart tower fan", note: "DC-motor tower you can control from your phone.", productId: "dreo-tower-fan-2026-upgraded-dc" },
    { label: "Clip-on for a lofted bed", note: "Rechargeable clip fan for bunks and tents.", productId: "koonie-10000mah-rechargeable-clip-on-fan" },
  ],
  "Desk & Tech": [
    { label: "Kill monitor glare", note: "Clips over the monitor, lights the desk not the screen.", productId: "benq-screenbar-monitor-light-bar" },
    { label: "Laptop at eye level", note: "Solid aluminum stand that doubles as a heat sink.", productId: "rain-design-mstand-aluminum-laptop-stand" },
    { label: "One-cable docking", note: "Thunderbolt 4 dock for dual monitors + peripherals.", productId: "ts4-18-port-thunderbolt-4-dock" },
    { label: "End cable chaos", note: "Wood-lid box that hides the power-strip tangle.", productId: "baskiss-cable-management-box-wood-lid" },
  ],
  "Travel & EDC": [
    { label: "Never lose your keys (iPhone)", note: "AirTag 4-pack on Apple's Find My network.", productId: "apple-airtag-4-pack" },
    { label: "One brick to charge it all", note: "20,000mAh with a built-in USB-C cable, laptop-capable.", productId: "anker-power-bank-20-000mah-with" },
    { label: "Full-size everyday multitool", note: "18-in-1 pliers-based tool for real EDC work.", productId: "leatherman-wave-18-in-1-full" },
    { label: "Walking alone at night", note: "Loud personal safety alarm that clips to a bag.", productId: "she-s-birdie-personal-safety-alarm" },
  ],
  "Problem Solvers": [
    { label: "Track it on any phone", note: "Works with both Apple Find My and Google Find Hub.", productId: "pebblebee-clip-5-rechargeable-bluetooth-tracker" },
  ],
};

/** Trim a bestFor/verdict line to a compact, honest one-liner for the auto fallback. */
function shortNote(p: Product): string {
  const src = (p.bestFor || p.verdict || p.problemSolved || "").trim();
  if (src.length <= 96) return src;
  return src.slice(0, 93).replace(/\s+\S*$/, "") + "…";
}

/**
 * Resolve a category's curated use-case paths against the live catalog. Unresolvable IDs are
 * dropped. If fewer than two curated paths survive, fall back to the category's own top products
 * (already priority-sorted) with an honest ladder — so every category feels navigable by intent.
 */
export function resolveUseCases(name: string, products: Product[]): ResolvedUseCase[] {
  const byId = new Map(products.map((p) => [p.id, p]));
  const curated = (USE_CASES_BY_CATEGORY[name] ?? [])
    .map((u) => {
      const product = byId.get(u.productId);
      return product ? { label: u.label, note: u.note, product } : null;
    })
    .filter((x): x is ResolvedUseCase => x !== null);

  if (curated.length >= 2) return curated;

  const labels = ["Editor's pick", "Also strong", "Best value", "Worth a look"];
  return products.slice(0, 4).map((product, i) => ({
    label: labels[i] ?? "Worth a look",
    note: shortNote(product),
    product,
  }));
}
