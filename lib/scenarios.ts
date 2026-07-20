/**
 * THE "WHEN IT BREAKS" SCENARIO PILLARS — the category-defining wedge, as content.
 *
 * The broad incumbents (Wirecutter/RTINGS) own the calm researcher weeks before buying.
 * Nobody owns the panic-buyer at the moment of failure. These pages do: a real failure
 * scenario, answered in the order a stranded person actually needs it —
 *   1. DO THIS NOW (free)  — the no-purchase triage that builds trust + information gain
 *   2. FIX IT NOW          — the one thing to buy to solve it today
 *   3. SO IT NEVER HAPPENS — the thing to own so you're never here again
 * Each page is a high-intent, long-tail SEO target a new site can actually rank for, AND
 * the exact "problem → hero product" object that converts on Pinterest. Honest throughout:
 * research-based, cited, never a faked hands-on test.
 */

export interface ScenarioStep {
  step: string;
  detail: string;
}
export interface ScenarioBuy {
  blurb: string;
  productIds: string[];
  guideHref?: string;
  guideLabel?: string;
}
export interface Scenario {
  slug: string;
  /** The search-intent situation, e.g. "Car won't start". */
  situation: string;
  h1: string;
  /** ~155-char answer-first meta description. */
  metaDescription: string;
  eyebrow: string;
  /** The urgent 2-3 sentence framing at the top. */
  intro: string;
  /** The free triage — what to actually DO, in order. This is the trust/information-gain core. */
  doNow: ScenarioStep[];
  fixNow: ScenarioBuy;
  prevent: ScenarioBuy;
  faq: { q: string; a: string }[];
  /** Other scenarios worth cross-linking. */
  related: string[];
  updated: string;
}

export const SCENARIOS: Scenario[] = [
  {
    slug: "car-wont-start",
    situation: "Car won't start",
    h1: "Your car won't start — here's exactly what to do",
    metaDescription:
      "Car won't start? Do these 4 free checks first (in order), how to tell the battery from the starter, and the one tool that jump-starts it yourself — no second car.",
    eyebrow: "When it breaks · Roadside",
    intro:
      "You're in the driveway or a parking lot, you turn the key, and nothing. Before you call anyone or buy anything, work these checks in order — most no-starts are a weak battery you can beat in two minutes.",
    doNow: [
      {
        step: "Turn everything off and try again",
        detail:
          "Kill the headlights, heater, A/C, and radio, then turn the key. A weak battery sometimes has exactly one crank left when nothing else is pulling power. Cold weather makes this worse — a battery that turned over fine last week can sag below cranking voltage on the first hard freeze.",
      },
      {
        step: "Listen — it tells you what broke",
        detail:
          "Rapid clicking when you turn the key is almost always the battery (not enough current to spin the starter). A single loud clunk, or dead silence with the dash lights still bright, points more at the starter or ignition. If it cranks strong but won't catch, that's fuel or spark, not the battery — a jump won't help.",
      },
      {
        step: "Check and re-seat the battery terminals",
        detail:
          "Pop the hood and grab each battery clamp. If it wiggles, it's loose — tighten it. White or green crust on the posts is corrosion breaking the connection; scrape it off with anything handy. A loose or corroded terminal fakes a 'dead battery' constantly, and re-seating it fixes a surprising number of no-starts for free.",
      },
      {
        step: "If it's the battery, jump it",
        detail:
          "Confirmed it's the battery and there's no second car around? A lithium jump starter cranks the engine yourself in about a minute — clamp it on, start the car, drive to a shop or auto-parts store to test the battery. It's the single most useful thing to keep in a glovebox.",
      },
    ],
    fixNow: {
      blurb:
        "The fix for a dead battery with no second car: a lithium jump starter. Clamp it to the terminals, start the engine, and you're moving — no cables strung to a stranger, no waiting on a tow. Keep it charged and it lives in the trunk for exactly this moment.",
      productIds: ["noco-boost-gb40-1000a-ultrasafe", "energizer-1-gauge-800a-heavy"],
      guideHref: "/guides/best-jump-starters-compared",
      guideLabel: "Jump starters, compared",
    },
    prevent: {
      blurb:
        "A dead battery is rarely random — it's a battery near the end of its life, or a car that sits too long between drives. A smart charger/maintainer keeps it topped up and healthy so it doesn't strand you again, and a jump starter in the trunk turns any repeat into a two-minute fix.",
      productIds: ["noco-genius5-smart-battery-charger"],
      guideHref: "/gear",
      guideLabel: "Car & roadside gear",
    },
    faq: [
      {
        q: "How can I tell if it's the battery or the starter?",
        a: "Rapid clicking when you turn the key usually means the battery — enough power for the solenoid to click but not enough to spin the starter. A single loud clunk or nothing at all (with bright dash lights) points more at the starter or ignition switch. If the engine cranks strongly but won't fire, the battery is fine and it's a fuel or spark problem.",
      },
      {
        q: "Will a jump starter work in cold weather?",
        a: "Yes, but lithium jump starters lose output in the cold like any battery. Owners report weak or refused boosts around 0–10°F unless the unit is warmed first (keep it inside, or against your body for a few minutes). Store it charged and warm and it will crank a normal car battery in seconds.",
      },
      {
        q: "How many times can a jump starter start a car before recharging?",
        a: "A compact 1000A pack like the NOCO GB40 holds roughly 15–20 gas-engine starts per charge in real-world use — fewer on larger or diesel engines and in the cold. For a single dead battery you have far more than enough; recharge it every couple of months so it's ready.",
      },
      {
        q: "Can I damage my car jump-starting it myself?",
        a: "Modern lithium jump starters with reverse-polarity and spark protection (like the UltraSafe line) are designed to be near-foolproof — they won't spark or send current until they detect a correct connection. Match red to positive, black to a ground/negative, and follow the unit's lights.",
      },
    ],
    related: ["power-outage"],
    updated: "Jul 2026",
  },
  {
    slug: "power-outage",
    situation: "The power just went out",
    h1: "The power's out — what to do, and what actually keeps you running",
    metaDescription:
      "Power outage? Keep the fridge shut (it holds ~4 hrs), save your phone, and here's the size of power station that actually runs a fridge, CPAP, and lights through it.",
    eyebrow: "When it breaks · Backup power",
    intro:
      "The lights just died. Before you do anything else, protect the two things that matter most — your food and your phone — then decide whether to wait it out or power up. Here's the order that keeps a short outage from becoming a bad night.",
    doNow: [
      {
        step: "Keep the fridge and freezer shut",
        detail:
          "A closed refrigerator holds food safe for about 4 hours; a full freezer holds ~48 hours (half-full, ~24). Every time you open the door to 'check,' you lose roughly an hour of that. Decide what you need, grab it fast, and keep the doors closed until power is back.",
      },
      {
        step: "Save your phone — it's your lifeline",
        detail:
          "Drop it to battery-saver / low-power mode, close background apps, and dim the screen. Unplug anything you don't need. Your phone is how you'll check the outage map, get restoration estimates, and call for help, so treat its battery as the scarce resource it is.",
      },
      {
        step: "Find out how long it'll last",
        detail:
          "Check your utility's outage map or text line (most have one). A quick flicker from a passing storm is very different from a downed-line outage with a multi-hour estimate. Knowing which one you're in tells you whether to simply wait it out or start powering essentials.",
      },
      {
        step: "For anything past a couple hours, power the essentials",
        detail:
          "Once it's clear the outage is real, a LiFePO4 power station quietly runs the fridge, a CPAP, phones, a router, and lights — indoors, with no fumes, unlike a gas generator. Size it by watt-hours (how long) and continuous watts (what it can run at once), not the headline number on the box.",
      },
    ],
    fixNow: {
      blurb:
        "The fix for a real outage: a portable power station. Big enough to cycle a full-size fridge for 12+ hours and keep phones, a router, a CPAP, and lights going — silent, fumeless, and safe to run inside (a gas generator is not). Keep it charged and it's ready the moment the grid isn't.",
      productIds: ["jackery-explorer-1000-v2-portable", "bluetti-ac180-portable-power-station"],
      guideHref: "/guides/best-power-stations-compared",
      guideLabel: "Power stations, compared",
    },
    prevent: {
      blurb:
        "Outages don't warn you, so the whole game is being charged and sized right before one hits. Keep a power station topped up (most hold a charge for months), size it to your real must-run loads — fridge, medical devices, phones — and you turn every future blackout into a non-event.",
      productIds: ["bluetti-ac180-portable-power-station"],
      guideHref: "/guides/best-power-stations-compared",
      guideLabel: "Power stations, compared",
    },
    faq: [
      {
        q: "How long will food last in the fridge during an outage?",
        a: "About 4 hours in a refrigerator if you keep the door closed, and roughly 48 hours in a full freezer (24 hours if half-full). The single biggest mistake is opening the door to check — each time costs you close to an hour. Above 40°F for more than 2 hours, perishable food should be tossed.",
      },
      {
        q: "What size power station do I need to run a refrigerator?",
        a: "A full-size fridge draws ~100–200W while running but spikes higher at startup, so you want a station with at least ~1000Wh of capacity and a pure sine-wave inverter rated ~1000W+ continuous. That runs a fridge (which cycles on and off) for roughly 12–18 hours while also charging phones and lights.",
      },
      {
        q: "Can I run a power station indoors?",
        a: "Yes — that's the main advantage over a gas generator. Battery power stations produce no exhaust and are safe to run inside, which is exactly what you want during an outage. Never run a fuel generator indoors or in a garage.",
      },
      {
        q: "How is a power station different from a generator?",
        a: "A power station is a big battery with AC outlets — silent, fumeless, indoor-safe, and instant, but limited by its stored watt-hours. A generator makes power continuously from fuel but is loud, produces deadly exhaust, and must run outside. For most home outages, a LiFePO4 power station sized to your essentials is the simpler, safer answer.",
      },
    ],
    related: ["car-wont-start"],
    updated: "Jul 2026",
  },
];

export function getScenario(slug: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.slug === slug);
}
