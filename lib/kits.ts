/**
 * Practical starter kits — curated shopping paths for a real driver problem, built in tiers
 * (start here → better → premium) around real product slugs. Not "field systems", just useful lists.
 */
export interface Kit {
  /** URL slug, e.g. "roadside-kit" for /kits/roadside-kit */
  id: string;
  name: string;
  tagline: string;
  dek: string;
  problem: string;
  /** The single first thing to buy. */
  buyFirstId: string;
  /** Start-here essentials. */
  starterIds: string[];
  /** Sensible upgrades. */
  betterIds: string[];
  /** Premium / complete additions. */
  premiumIds: string[];
  /** Product ids that directly solve the core problem — badged "Must-have". */
  mustHaveIds: string[];
  /** Product ids that are situational / nice-to-have — badged "Optional". */
  optionalIds: string[];
  /** Honest "don't bother buying this yet" lines shown in the Skip-for-now block. */
  toSkip: string[];
  /** Honest mistakes people make with this kind of gear. */
  commonMistakes: string[];
  /** Optional distinct hero scene so kits that share a buyFirst product don't look identical. */
  heroImage?: string;
  relatedGuides: string[];
}

export const KITS: Kit[] = [
  {
    id: "roadside-kit",
    name: "The Roadside Kit",
    tagline: "For the breakdown you didn't plan.",
    dek: "The small set of gear that turns a stranding into an inconvenience — dead battery, low tire, dark shoulder.",
    problem:
      "Breakdowns happen alone, at night, far from help — and most trunks have nothing useful in them. You don't need a hundred pieces; you need the few that cover the common failures.",
    buyFirstId: "noco-boost-gb40-1000a-ultrasafe",
    starterIds: ["noco-boost-gb40-1000a-ultrasafe", "fanttik-x8-apex-portable-tire"],
    betterIds: [
      "energizer-1-gauge-800a-heavy",
      "resqme-the-original-car-escape",
      "nebo-big-larry-3-rechargeable",
      "wagan-fred-flashing-roadside-emergency",
    ],
    premiumIds: ["lifeline-4388aaa-excursion-road-76", "first-alert-auto5-car-fire"],
    mustHaveIds: [
      "noco-boost-gb40-1000a-ultrasafe",
      "fanttik-x8-apex-portable-tire",
      "nebo-big-larry-3-rechargeable",
    ],
    optionalIds: ["resqme-the-original-car-escape", "first-alert-auto5-car-fire"],
    toSkip: [
      "A 100-piece 'emergency kit' — most of the contents are filler you'll never reach for.",
      "Roadside flares — an LED beacon is reusable, never expires, and won't scorch dry grass.",
      "A second, bigger jump starter — the GB40 starts almost any gas car; buy the HD only for diesels or big V8s.",
      "Tire-sealant cans — a plug kit plus your inflator fixes more punctures and won't gum up the TPMS sensor.",
      "A full socket set 'just in case' — real roadside fixes rarely need one; keep the tools minimal.",
    ],
    commonMistakes: [
      "Storing the jump starter uncharged. A dead pack in the trunk saves no one — top it off every couple of months.",
      "Leaving gear loose in the trunk. In a hard stop it becomes a projectile; keep it in a bag or bin.",
      "Buying jumper cables as your only plan. Dead on a shoulder alone, there's no second car to jump from — a self-contained starter is the real fix.",
      "Skipping a light. Most breakdowns that turn dangerous happen at night on a shoulder; a work light and a beacon matter as much as the jump.",
      "Never testing anything until you need it. Inflate a tire in the driveway once so the fittings and the routine aren't a surprise.",
    ],
    relatedGuides: ["best-jump-starters-compared", "roadside-emergency-kit"],
  },
  {
    id: "road-trip-kit",
    name: "The Road Trip Kit",
    tagline: "Power, storage, and eyes on the road.",
    dek: "What longer drives actually need: real power for devices, a place for everything, and a witness on the windshield.",
    problem:
      "A long drive stops being fun when the phones die, the trunk is chaos, and a fender-bender becomes your word against theirs. This kit fixes all three before you leave.",
    buyFirstId: "jackery-explorer-1000-v2-portable",
    starterIds: ["jackery-explorer-1000-v2-portable", "anker-nano-car-charger"],
    betterIds: [
      "viofo-a229-plus",
      "drive-car-trunk-organizer",
      "lamicall-car-headrest-tablet-holder",
    ],
    premiumIds: ["ecoflow-river-2-pro-portable", "jackery-solarsaga-100w-portable-solar"],
    mustHaveIds: [
      "jackery-explorer-1000-v2-portable",
      "anker-nano-car-charger",
      "viofo-a229-plus",
      "drive-car-trunk-organizer",
    ],
    optionalIds: ["lamicall-car-headrest-tablet-holder", "jackery-solarsaga-100w-portable-solar"],
    toSkip: [
      "A second power station — one right-sized unit covers a road trip; a backup just adds weight.",
      "Solar panels for the interstate — you can recharge from the car or any outlet at a stop; solar earns its keep off-grid, not on the highway.",
      "A 4K front-only dash cam on a budget — 2K front-and-rear reads plates better than 4K that only watches ahead.",
      "Cheap 'octopus' USB splitters — one quality car charger delivers more real amps than a crowded splitter.",
      "A separate inverter box — the power station already has AC outlets; skip the extra hardware.",
    ],
    commonMistakes: [
      "Under-sizing the power station. A 300Wh unit won't run a mini-fridge or a CPAP overnight — match watt-hours to what you'll actually plug in.",
      "Mounting the dash cam in the mirror's sweep. Park it behind the mirror in the wiper's clean zone, or it films a blurry, rain-streaked lane.",
      "Forgetting the microSD card. Most dash cams ship without one, and the wrong card silently drops footage — use a high-endurance card.",
      "Charging phones off the 12V socket alone. It trickles slowly; a proper USB-C PD car charger tops a phone in a fraction of the time.",
      "Packing the trunk loose. An organizer only helps if you use it — chaos returns after one gas stop otherwise.",
    ],
    relatedGuides: ["best-power-stations-compared", "best-dash-cams-compared"],
  },
  {
    id: "winter-car-kit",
    name: "The Winter Car Kit",
    tagline: "Cold saps batteries. Snow strands cars.",
    dek: "Cold-weather driving gear for the two things winter does: kills weak batteries and turns light snow into a stuck car.",
    problem:
      "Cold weather is when a marginal battery finally quits, and a dusting of snow is enough to spin your tires on a slope. Two problems, a handful of items that solve them.",
    buyFirstId: "noco-boost-gb40-1000a-ultrasafe",
    heroImage: "/products/scene/lifeline-4388aaa-excursion-road-76.png",
    starterIds: ["noco-boost-gb40-1000a-ultrasafe", "maxsa-escaper-buddy-traction-mats"],
    betterIds: [
      "swiss-safe-emergency-mylar-thermal",
      "nebo-big-larry-3-rechargeable",
      "wagan-fred-flashing-roadside-emergency",
    ],
    premiumIds: ["noco-boost-hd-gb70-2000a", "rhino-usa-recovery-tow-strap"],
    mustHaveIds: [
      "noco-boost-gb40-1000a-ultrasafe",
      "maxsa-escaper-buddy-traction-mats",
      "swiss-safe-emergency-mylar-thermal",
    ],
    optionalIds: ["noco-boost-hd-gb70-2000a", "rhino-usa-recovery-tow-strap"],
    toSkip: [
      "A bag of rock salt or sand — traction mats work better, don't corrode your trunk, and won't dump grit everywhere.",
      "A full-size snow shovel if space is tight — a compact folding shovel is enough to free a tire.",
      "The 2000A HD jump starter for a small gas car — the GB40 handles it; the HD is for diesels and big engines in deep cold.",
      "A box of chemical hand-warmers as your heat plan — mylar blankets hold body heat far longer for the space.",
      "A luxury 'winter survival kit' — half of it is packaging; buy the few items that actually free a car and keep you warm.",
    ],
    commonMistakes: [
      "Trusting a marginal battery through the cold. Winter is when a weak battery finally quits — carry the jump starter and keep it charged, because cold drains it faster.",
      "Flooring it when stuck. Wheelspin polishes ice into glass; ease onto the traction mats instead of spinning the tires.",
      "Expecting full power from a freezing-cold pack. Lithium loses capacity in deep cold — keep it charged and, before a big trip, bring it inside overnight.",
      "Having no warmth plan. If you're stranded and the engine won't run, heat is the real emergency — blankets aren't optional in winter.",
      "Burying the traction mats under everything. If they're at the bottom of the trunk when you're stuck, they can't help you.",
    ],
    relatedGuides: ["best-jump-starters-compared", "roadside-emergency-kit"],
  },
  {
    id: "backup-power-kit",
    name: "The Backup Power Kit",
    tagline: "Keep the lights and phones on.",
    dek: "Power for outages and off-grid travel — phones, laptops, and lights running without a generator.",
    problem:
      "When the grid drops or you're camped miles from an outlet, you still need to charge phones, run a laptop, and keep a light on. A right-sized power station does it quietly.",
    buyFirstId: "jackery-explorer-1000-v2-portable",
    heroImage: "/products/scene/bluetti-ac180-portable-power-station.png",
    starterIds: ["jackery-explorer-1000-v2-portable", "anker-prime-power-bank"],
    betterIds: [
      "bluetti-ac180-portable-power-station",
      "nebo-slyde-king-2k-flashlight",
      "bestek-300w-car-power-inverter",
    ],
    premiumIds: ["ecoflow-river-2-pro-portable", "jackery-solarsaga-100w-portable-solar"],
    mustHaveIds: [
      "jackery-explorer-1000-v2-portable",
      "anker-prime-power-bank",
      "nebo-slyde-king-2k-flashlight",
    ],
    optionalIds: ["bestek-300w-car-power-inverter", "jackery-solarsaga-100w-portable-solar"],
    toSkip: [
      "A gas generator for short outages — a power station is silent, safe indoors, and needs no fuel for the usual few-hour blackout.",
      "Solar panels if you only prep for grid outages — recharge the station before a storm; solar matters for multi-day off-grid, not one night.",
      "A car inverter once you own the power station — it already has AC outlets; the inverter is only for running things straight off the car.",
      "The biggest station 'to be safe' — size it to your real load (phones, laptop, a light, a modem), not a whole-house fantasy.",
      "No-name power banks — the capacity is often overstated; one honest bank beats three that lie about their Wh.",
    ],
    commonMistakes: [
      "Letting the station sit at 100% for months. Lithium prefers a mid charge for storage and a top-up before you need it — check it a few times a year.",
      "Guessing your wattage. Add up what you'll actually run; a fridge or a space heater can exceed a small station's output and trip it.",
      "Forgetting a light. When the grid drops, a dedicated flashlight or lantern beats draining the power station just to light a room.",
      "Having no recharge plan. A power station is a battery, not a source — know how you'll refill it (wall, car, or solar) before the outage drags on.",
      "Leaning on phone flashlights. They kill the one battery you need most; keep a real light charged and separate.",
    ],
    relatedGuides: ["best-power-stations-compared"],
  },
];

const BY_ID = new Map(KITS.map((k) => [k.id, k]));

export function getAllKits(): Kit[] {
  return KITS;
}
export function getKitById(id: string): Kit | undefined {
  return BY_ID.get(id);
}
export const KIT_SLUGS = KITS.map((k) => k.id);
