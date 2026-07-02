/**
 * The "Finds" feed — an editorial product-discovery stream. Each entry is an honest note on why a
 * product is worth a look, linked to its source and a relevant guide. No fake "trending" or
 * "bestseller" claims; the hook is a real reason, not hype.
 */
export interface Find {
  productId: string;
  /** Short context label. */
  tag: string;
  /** Why it's worth a look — specific and honest. */
  hook: string;
  /** Related guide slug for deeper reading. */
  relatedGuide?: string;
}

export const FINDS: Find[] = [
  {
    productId: "power-magsafe-wireless",
    tag: "Everyday carry",
    hook: "Magnetic top-ups with no cable to thread — snap it to a compatible phone and keep moving. Slower than wired, but the convenience is the point.",
    relatedGuide: "best-power-banks",
  },
  {
    productId: "car-tire-inflator-cordless",
    tag: "Roadside",
    hook: "A cordless pump that lives in the trunk for the night the low-pressure light comes on and every gas-station air machine is 'out of service'.",
    relatedGuide: "car-emergency-kit",
  },
  {
    productId: "carry-bt-tracker",
    tag: "Under $50",
    hook: "About $20 against the daily 'where are my keys' tax. Rings from your phone and pings a finding network when they wander farther.",
    relatedGuide: "useful-gear-under-50",
  },
  {
    productId: "power-gan-wall-65w",
    tag: "Travel",
    hook: "One compact GaN charger that replaces the pile of bricks and powers a laptop and phone from a single outlet.",
    relatedGuide: "travel-tech-essentials",
  },
  {
    productId: "car-jump-starter-lithium",
    tag: "Roadside",
    hook: "A self-contained jump in your trunk — no second car, no waiting on a stranger with cables. The highest-value thing in a car kit.",
    relatedGuide: "car-emergency-kit",
  },
  {
    productId: "power-station-300wh",
    tag: "Home",
    hook: "Quiet backup power for short outages — phones, laptops, lights and small devices off AC and USB. Right-sized, not a whole-home generator.",
    relatedGuide: "power-outage-basics",
  },
  {
    productId: "carry-packing-cubes",
    tag: "Travel",
    hook: "The fix for the 6am exploded-suitcase repack. Compresses and sorts so the bag holds more, neatly.",
    relatedGuide: "travel-tech-essentials",
  },
  {
    productId: "light-headlamp",
    tag: "DIY",
    hook: "Hands-free light for the under-the-sink and under-the-car jobs. Beats holding a phone torch in your teeth every time.",
    relatedGuide: "car-emergency-kit",
  },
  {
    productId: "light-emergency-lantern",
    tag: "Home",
    hook: "360° room light that collapses to store. A pair turns an outage from stressful into merely annoying.",
    relatedGuide: "power-outage-basics",
  },
  {
    productId: "carry-multi-tool",
    tag: "Everyday carry",
    hook: "Pliers, a blade, drivers and scissors in one pocketable tool — for the loose screw and stuck package that always show up toolless.",
    relatedGuide: "useful-gear-under-50",
  },
  {
    productId: "power-bank-highcap-20k",
    tag: "Travel",
    hook: "Double the capacity for long transit days, still under the airline limit. The travel-day workhorse.",
    relatedGuide: "best-power-banks",
  },
  {
    productId: "carry-tech-pouch",
    tag: "Under $50",
    hook: "One padded home for chargers, cables and dongles — the end of the loose-electronics bin at security.",
    relatedGuide: "travel-tech-essentials",
  },
];

export function getAllFinds(): Find[] {
  return FINDS;
}
