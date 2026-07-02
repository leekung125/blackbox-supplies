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
    relatedGuides: ["best-portable-jump-starters", "roadside-emergency-kit"],
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
    relatedGuides: ["best-portable-power-for-road-trips", "best-dash-cams"],
  },
  {
    id: "winter-car-kit",
    name: "The Winter Car Kit",
    tagline: "Cold saps batteries. Snow strands cars.",
    dek: "Cold-weather driving gear for the two things winter does: kills weak batteries and turns light snow into a stuck car.",
    problem:
      "Cold weather is when a marginal battery finally quits, and a dusting of snow is enough to spin your tires on a slope. Two problems, a handful of items that solve them.",
    buyFirstId: "noco-boost-gb40-1000a-ultrasafe",
    starterIds: ["noco-boost-gb40-1000a-ultrasafe", "maxsa-escaper-buddy-traction-mats"],
    betterIds: [
      "swiss-safe-emergency-mylar-thermal",
      "nebo-big-larry-3-rechargeable",
      "wagan-fred-flashing-roadside-emergency",
    ],
    premiumIds: ["noco-boost-hd-gb70-2000a", "rhino-usa-recovery-tow-strap"],
    relatedGuides: ["best-portable-jump-starters", "roadside-emergency-kit"],
  },
  {
    id: "backup-power-kit",
    name: "The Backup Power Kit",
    tagline: "Keep the lights and phones on.",
    dek: "Power for outages and off-grid travel — phones, laptops, and lights running without a generator.",
    problem:
      "When the grid drops or you're camped miles from an outlet, you still need to charge phones, run a laptop, and keep a light on. A right-sized power station does it quietly.",
    buyFirstId: "jackery-explorer-1000-v2-portable",
    starterIds: ["jackery-explorer-1000-v2-portable", "anker-prime-power-bank"],
    betterIds: [
      "bluetti-ac180-portable-power-station",
      "nebo-slyde-king-2k-flashlight",
      "bestek-300w-car-power-inverter",
    ],
    premiumIds: ["ecoflow-river-2-pro-portable", "jackery-solarsaga-100w-portable-solar"],
    relatedGuides: ["best-portable-power-for-road-trips"],
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
