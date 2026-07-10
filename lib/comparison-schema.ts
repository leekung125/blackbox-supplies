/**
 * COMPARABLE-SPEC SCHEMA — BlackBox V2 interactive comparison model.
 *
 * Every guide is a live comparison of ~10 real products. To compare apples-to-apples,
 * each product carries a category-specific, typed `specs` block. `category` is the
 * discriminant: a table renders whichever spec keys belong to the active category.
 *
 * HARD RULE (BLACKBOX_V2): never fabricate a spec, price, rating, or review count.
 * Unknown numbers are `null` and surfaced with a "not verified" badge — never invented.
 * That is why `rating`/`reviewCount`/nullable numeric specs exist: honest gaps, shown raw.
 *
 * NOTE: `ComparisonCategory` (snake_case) is a NEW normalized vocabulary distinct from the
 * legacy display `Category` in `products.ts` ("Jump Starters"). Keep them separate; map at
 * the edge if you need the human label.
 */

// ─────────────────────────────────────────────────────────────── shared base
export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  /** Real product image (Amazon CDN or FLUX-rendered). "" → code-drawn spec-tile fallback. */
  image: string;
  /** Numeric point/midpoint price in USD — the sort/filter key. Derived from priceRange; not a claim. */
  price: number;
  /** Approx. display range, e.g. "$500–$650". Always treated as approximate. */
  priceRange?: string;
  /** Tagged outbound Amazon URL (blackboxsuppl-20). "" when no verified ASIN yet — do NOT invent one. */
  affiliateUrl: string;
  /** Plain source/spec URL(s) backing the data — the receipts that do a face's trust-work. */
  sourceUrls?: string[];
  /** REAL stars 0–5, or null if we have no verified rating (PA-API when live). Never fabricated. */
  rating: number | null;
  /** REAL review count, or null. Never fabricated. */
  reviewCount: number | null;
  pros: string[];
  cons: string[];
  /** One-line "who/when this is the right buy". */
  bestFor: string;
  /** Editorial slot, e.g. "Best overall", "Best value". The spine of the page. */
  role?: string;
  /** Spec keys whose value is an estimate/unpublished/unverified → drives the "not verified" badge. */
  unverified?: string[];
}

export type ComparisonCategory =
  | "portable_ac" | "fans" | "cooling_sleep" | "chef_knives"
  | "blenders" | "air_fryers" | "coffee_gear" | "dash_cams"
  | "jump_starters" | "tire_inflators" | "power_stations" | "backpacks"
  | "nc_earbuds" | "air_purifiers" | "monitor_lights" | "mice";

// ─────────────────────────────────────────────── per-category spec interfaces
// 1:1 with the finalized field lists. `number | null` = honest-gap numeric. `?` = N/A for some members.

export interface PortableAcSpecs {
  saccBtu: number | null;          // DOE SACC — the honest capacity number (not the ASHRAE headline)
  coverageSqFt: number | null;     // realistic sq ft (SACC-based), not the marketed "up to"
  ventType: "single_hose" | "dual_hose" | "ductless";
  noiseDb: number | null;          // quietest published operating level (low/sleep); see SPEC_META tooltip
  dehumidifyPintsDay: number | null;
  hasHeatMode: boolean;
  weightLbs: number | null;
  energyStar: boolean | null;
}

export interface FansSpecs {
  type: "tower" | "pedestal" | "box" | "desk" | "bladeless" | "floor";
  airflowCfm: number | null;
  speedSettings: number | null;
  noiseDb: number | null;
  oscillates: boolean;
  hasRemote: boolean;
  rechargeable: boolean;
}

export interface CoolingSleepSpecs {
  productType: "active_pad" | "topper" | "comforter" | "pillow" | "sheets";
  coolingTech:
    | "water_circulating" | "air_circulating" | "phase_change"
    | "gel_infused" | "breathable_fabric";
  activeTempControl: boolean;
  dualZone: boolean;
  appControl: boolean;
  machineWashable: boolean;
  tempRangeLowF: number | null;    // active systems only
}

export interface ChefKnivesSpecs {
  bladeLengthIn: number | null;
  steelType:
    | "high_carbon_stainless" | "stainless" | "carbon_steel"
    | "damascus" | "ceramic";
  hardnessHrc: number | null;
  construction: "forged" | "stamped";
  fullTang: boolean;
  edgeAngleDeg: number | null;
  weightOz: number | null;
}

export interface BlendersSpecs {
  powerWatts: number | null;
  jarCapacityOz: number | null;
  speedSettings: number | null;
  presetPrograms: number | null;
  jarMaterial: "tritan_plastic" | "glass" | "stainless";
  hasPulse: boolean;
  dishwasherSafe: boolean;
}

export interface AirFryersSpecs {
  capacityQt: number | null;
  type: "basket" | "dual_basket" | "oven" | "toaster_combo";
  wattage: number | null;
  maxTempF: number | null;
  presetPrograms: number | null;
  dualZone: boolean;
  dishwasherSafeParts: boolean;
}

export interface CoffeeGearSpecs {
  brewType:
    | "drip" | "espresso" | "pod" | "french_press"
    | "pour_over" | "cold_brew" | "aeropress";
  capacityCups: number | null;
  pressureBar: number | null;      // espresso only
  builtInGrinder: boolean;
  programmable: boolean;
  milkFrother: boolean;
  waterReservoirOz: number | null; // machine types only
}

export interface DashCamsSpecs {
  resolution: "1080p" | "1440p" | "2k" | "4k" | "5k";
  channels: "front" | "front_rear" | "front_rear_interior";
  fieldOfViewDeg: number | null;
  nightVision: boolean;
  parkingMode: boolean;
  gps: boolean;
  wifi: boolean;
  maxStorageGb: number | null;
}

export interface JumpStartersSpecs {
  peakAmps: number | null;
  capacityMah: number | null;
  engineMaxLitersGas: number | null;
  dieselCapable: boolean;
  builtInAirCompressor: boolean;
  usbPortCount: number | null;
  hasFlashlight: boolean;
}

export interface TireInflatorsSpecs {
  maxPressurePsi: number | null;
  powerSource: "12v_dc" | "battery" | "corded_ac" | "dual";
  inflationSpeedLpm: number | null;
  presetAutoShutoff: boolean;
  digitalGauge: boolean;
  builtInLight: boolean;
  cordless: boolean;
}

export interface PowerStationsSpecs {
  capacityWh: number | null;
  acOutputWatts: number | null;
  surgeWatts: number | null;
  batteryChemistry: "lifepo4" | "nmc_lithium";
  acOutletCount: number | null;
  usbcMaxWatts: number | null;
  solarInputWatts: number | null;
  weightLbs: number | null;
}

export interface BackpacksSpecs {
  capacityLiters: number | null;
  laptopSizeIn: number | null;
  material: "nylon" | "polyester" | "canvas" | "leather" | "recycled_pet";
  waterResistant: boolean;
  weightLbs: number | null;
  carryOnCompliant: boolean;
  useCase: "everyday" | "travel" | "commuter" | "hiking" | "tactical";
}

export interface NcEarbudsSpecs {
  ancType: "hybrid_anc" | "feedforward_anc" | "passive";
  batteryHoursBuds: number | null;
  batteryHoursTotal: number | null;
  waterResistance: "none" | "ipx4" | "ipx5" | "ipx7" | "ip57";
  multipoint: boolean;
  wirelessCharging: boolean;
  transparencyMode: boolean;
  codec: "sbc" | "aac" | "aptx" | "aptx_adaptive" | "ldac";
}

export interface AirPurifiersSpecs {
  cadrCfm: number | null;
  coverageSqFt: number | null;
  filterType:
    | "true_hepa" | "h13_hepa" | "hepa"
    | "hepa_carbon" | "activated_carbon";
  noiseDb: number | null;
  filterLifeMonths: number | null;
  airQualitySensor: boolean;
  autoMode: boolean;
  smartApp: boolean;
}

export interface MonitorLightsSpecs {
  brightnessLux: number | null;
  craCri: number | null;
  colorTempAdjustable: boolean;
  colorTempMaxK: number | null;
  autoDimming: boolean;
  controlType: "touch" | "dial" | "remote" | "app";
  powerConnector: "usb_a" | "usb_c";
  curvedCompatible: boolean;
}

export interface MiceSpecs {
  dpiMax: number | null;
  connectivity: "wired" | "wireless_2_4ghz" | "bluetooth" | "dual" | "tri_mode";
  programmableButtons: number | null;
  weightG: number | null;
  pollingRateHz: number | null;
  batteryHours: number | null;     // wireless only
  gripType: "ergonomic_right" | "ambidextrous" | "vertical" | "trackball";
}

// ─────────────────────────────────────────────── category → specs, and the union
export interface CategorySpecs {
  portable_ac: PortableAcSpecs;
  fans: FansSpecs;
  cooling_sleep: CoolingSleepSpecs;
  chef_knives: ChefKnivesSpecs;
  blenders: BlendersSpecs;
  air_fryers: AirFryersSpecs;
  coffee_gear: CoffeeGearSpecs;
  dash_cams: DashCamsSpecs;
  jump_starters: JumpStartersSpecs;
  tire_inflators: TireInflatorsSpecs;
  power_stations: PowerStationsSpecs;
  backpacks: BackpacksSpecs;
  nc_earbuds: NcEarbudsSpecs;
  air_purifiers: AirPurifiersSpecs;
  monitor_lights: MonitorLightsSpecs;
  mice: MiceSpecs;
}

/** A product narrowed to one category — `product.category` narrows `product.specs`. */
export type ProductFor<K extends ComparisonCategory> = BaseProduct & {
  category: K;
  specs: CategorySpecs[K];
};

/** The discriminated product union used across the comparison UI. */
export type ComparableProduct = {
  [K in ComparisonCategory]: ProductFor<K>;
}[ComparisonCategory];

// ───────────────────────────────────────────── data-driven table metadata
// Headers, units, bar direction, jargon tooltips and enum labels come from here so the
// <ComparisonTable> is generic. Numeric fields with `higherIsBetter` get a bar + winner dot.

export type SpecFieldType = "number" | "enum" | "bool";

export interface SpecFieldMeta {
  label: string;
  type: SpecFieldType;
  unit?: string;
  /** number only: bar direction + which cell wins the column. Omit when neither direction is "better". */
  higherIsBetter?: boolean;
  /** jargon translation shown on tap/hover. */
  tooltip?: string;
  /** enum value → human label, for chip rendering. */
  enumLabels?: Record<string, string>;
}

export interface CategoryMeta {
  /** Human category label for headings/breadcrumbs. */
  label: string;
  /** Ordered spec keys, MOST-DECISIVE FIRST (NN/G). The comparison columns for this guide. */
  columns: string[];
  /** Per-field metadata (fully authored per category during its P1 data phase). */
  fields: Partial<Record<string, SpecFieldMeta>>;
  /**
   * The 2–3 SIGNATURE specs shown as big figures in the board (spotlight + cards) and used to
   * pick the data-viz bar. These are the figures a buyer actually decides on — NOT just "the
   * first 3 numeric columns", which surfaces the wrong headline for some categories (e.g. a dash
   * cam's field-of-view over its resolution). May include enum/bool keys, not only numbers.
   * Falls back to the first numeric columns when omitted.
   */
  heroKeys?: string[];
  /**
   * The numeric spec to draw as the data-viz bar per product. Set this when the honest bar isn't
   * the first signature figure — e.g. jump starters lead with "peak amps" but that number is
   * inflated marketing, so the bar keys off the engine rating instead. `null` opts out entirely
   * (no honest numeric decides the category — e.g. dash cams turn on the enum sensor/coverage).
   * `undefined` falls back to the first higher-is-better numeric heroKey with enough published data.
   */
  barKey?: string | null;
}

/**
 * Column order for every category — the decisive specs, in priority order.
 * (Full per-field `fields` META authored per category as its data lands; portable_ac is complete below.)
 */
export const SPEC_COLUMNS: Record<ComparisonCategory, string[]> = {
  portable_ac: ["saccBtu", "coverageSqFt", "ventType", "noiseDb", "dehumidifyPintsDay", "weightLbs", "hasHeatMode"],
  fans: ["airflowCfm", "type", "noiseDb", "speedSettings", "oscillates", "hasRemote", "rechargeable"],
  cooling_sleep: ["productType", "coolingTech", "activeTempControl", "dualZone", "tempRangeLowF", "machineWashable", "appControl"],
  chef_knives: ["steelType", "hardnessHrc", "bladeLengthIn", "edgeAngleDeg", "construction", "weightOz", "fullTang"],
  blenders: ["powerWatts", "jarCapacityOz", "presetPrograms", "speedSettings", "jarMaterial", "hasPulse", "dishwasherSafe"],
  air_fryers: ["capacityQt", "type", "wattage", "maxTempF", "presetPrograms", "dualZone", "dishwasherSafeParts"],
  coffee_gear: ["brewType", "capacityCups", "pressureBar", "builtInGrinder", "milkFrother", "programmable", "waterReservoirOz"],
  dash_cams: ["resolution", "channels", "fieldOfViewDeg", "nightVision", "parkingMode", "gps", "wifi", "maxStorageGb"],
  jump_starters: ["peakAmps", "engineMaxLitersGas", "capacityMah", "dieselCapable", "builtInAirCompressor", "usbPortCount", "hasFlashlight"],
  tire_inflators: ["maxPressurePsi", "powerSource", "inflationSpeedLpm", "presetAutoShutoff", "digitalGauge", "cordless", "builtInLight"],
  power_stations: ["capacityWh", "acOutputWatts", "surgeWatts", "batteryChemistry", "acOutletCount", "usbcMaxWatts", "solarInputWatts", "weightLbs"],
  backpacks: ["capacityLiters", "laptopSizeIn", "useCase", "material", "waterResistant", "weightLbs", "carryOnCompliant"],
  nc_earbuds: ["ancType", "batteryHoursBuds", "batteryHoursTotal", "waterResistance", "codec", "multipoint", "transparencyMode", "wirelessCharging"],
  air_purifiers: ["cadrCfm", "coverageSqFt", "filterType", "noiseDb", "filterLifeMonths", "autoMode", "airQualitySensor", "smartApp"],
  monitor_lights: ["brightnessLux", "craCri", "colorTempMaxK", "colorTempAdjustable", "autoDimming", "controlType", "powerConnector"],
  mice: ["dpiMax", "connectivity", "pollingRateHz", "weightG", "programmableButtons", "batteryHours", "gripType"],
};

/** Fully-authored metadata for the flagship category. Other categories mirror this shape at P1. */
export const PORTABLE_AC_META: CategoryMeta = {
  label: "Portable Air Conditioners",
  columns: SPEC_COLUMNS.portable_ac,
  // Real cooling (SACC) + real coverage + noise are what a buyer decides on — not the box BTU.
  heroKeys: ["saccBtu", "coverageSqFt", "noiseDb"],
  fields: {
    saccBtu: {
      label: "Real cooling (SACC)",
      type: "number",
      unit: "BTU",
      higherIsBetter: true,
      tooltip:
        "DOE SACC — the honest, tested cooling number. Always lower than the big 'ASHRAE BTU' on the box; compare units by this, not the headline.",
    },
    coverageSqFt: {
      label: "Real coverage",
      type: "number",
      unit: "sq ft",
      higherIsBetter: true,
      tooltip: "Realistic room size at the SACC rating — not the optimistic 'up to' marketing figure.",
    },
    ventType: {
      label: "Hose type",
      type: "enum",
      tooltip:
        "Dual-hose cools faster and more efficiently (no negative pressure pulling warm air back in). Single-hose is simpler and cheaper. Ductless units vent-free for tents/vans.",
      enumLabels: { single_hose: "Single hose", dual_hose: "Dual hose", ductless: "Ductless" },
    },
    noiseDb: {
      label: "Noise (low)",
      type: "number",
      unit: "dB",
      higherIsBetter: false,
      tooltip: "Quietest published operating level (low/sleep setting). Every unit gets louder on high.",
    },
    dehumidifyPintsDay: {
      label: "Dehumidify",
      type: "number",
      unit: "pt/day",
      higherIsBetter: true,
      tooltip: "Moisture removed per day in dry mode.",
    },
    weightLbs: {
      label: "Weight",
      type: "number",
      unit: "lb",
      higherIsBetter: false,
      tooltip: "Lighter is easier to move between rooms and up stairs.",
    },
    hasHeatMode: {
      label: "Heats too",
      type: "bool",
      tooltip: "Doubles as a heater for shoulder-season use.",
    },
    energyStar: { label: "Energy Star", type: "bool" },
  },
};

/** Registry lookup — extend as each category's fields are authored. */
export const SPEC_META: Partial<Record<ComparisonCategory, CategoryMeta>> = {
  portable_ac: PORTABLE_AC_META,
};
