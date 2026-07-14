import type { Article } from "@/lib/articles";

/**
 * Long-tail buyer-intent article.
 * Target keyword: "best power station for apartment power outage"
 * Self-contained per the content-architecture recipe. The orchestrator wires
 * it into EXTRA_ARTICLES (lib/articles-extra.ts) so it appears on the /guides hub.
 *
 * Honesty laws respected: no "we tested", no fabricated ratings/prices, every
 * spec traced to the catalog or a named manufacturer figure. Product cards route
 * to our /products/<id> pages (which carry the Amazon handoff + guide cross-link).
 */
export const BEST_POWER_STATION_APARTMENT_POWER_OUTAGE: Article = {
  slug: "best-power-station-apartment-power-outage",
  title:
    "Best Power Station for Apartment Power Outage Backup — Quiet, Fume-Free, No Generator",
  dek: "The best power station for an apartment power outage is a ~1,000Wh LiFePO4 unit: silent, zero fumes, and lease-legal where a gas generator isn't. Here's the honest sizing math — what keeps a fridge alive overnight vs. what only covers comms — plus who should skip a power station entirely.",
  category: "Power & Charging",
  readMinutes: 9,
  updated: "July 2026",
  answerFirst:
    "For an apartment, the best backup is a ~1,000Wh LiFePO4 power station like the Bluetti AC180 or Jackery Explorer 1000 v2 — silent, fume-free, and safe to run in a closed room, which no gas generator ever is. A 1kWh unit keeps a fridge, Wi-Fi, phones, and a CPAP alive through an overnight outage. A ~300Wh unit like the Anker SOLIX C300 covers comms and lights only. Plan around real usable watt-hours, not the sticker number.",
  sections: [
    {
      heading: "Why an apartment rules out a generator (and why that's the whole point)",
      body: [
        "The reason you're searching for a power station instead of a generator is that a generator is not an option where you live — and that constraint is what makes the buying decision clean. A gas or propane generator burns fuel, and burning fuel produces carbon monoxide. CO is colorless, odorless, and kills people in enclosed spaces every year during storms; every manufacturer and the CPSC say to run one outdoors only, well away from windows and vents. An apartment with no yard, a shared wall, and maybe a small balcony has nowhere safe to put one.",
        "Then there's the lease. Most rental and condo agreements — and many local fire codes — flatly prohibit fuel-burning generators and the gasoline storage they require on the premises. Even if you wanted to risk it, running one on a balcony vents exhaust straight into your own and your neighbors' windows.",
        "And the 'quiet' generator is mostly marketing. Inverter generators are the quiet ones, and they still run in the 55–65 dB range at low load — roughly a loud conversation to a vacuum cleaner, running for hours, at 2 a.m., in a building full of people trying to sleep. A power station is a sealed battery with an inverter: it makes no exhaust, and the only sound is a cooling fan that spins up only under heavy load. That is the entire case for battery backup in a rental.",
      ],
    },
    {
      heading: "How big a power station you actually need for an apartment outage",
      body: [
        "Power stations are sold by watt-hours (Wh) — energy capacity, like the size of a fuel tank. The honest way to size one is to add up what you actually need to keep alive through the longest realistic outage (usually a single overnight, 8–12 hours) and buy the tier that covers it with margin.",
        "Two loads dominate the math in an apartment: a refrigerator and, if someone in the home uses one, a CPAP machine. A modern efficient fridge doesn't run its compressor constantly — it cycles, averaging somewhere around 40–60 watt-hours per hour of runtime, so a 10–12 hour overnight is roughly 400–700Wh just for the fridge. A CPAP without its heated humidifier or heated hose draws about 30–60W (≈240–500Wh over an 8-hour night); switch the heater on and it can double. Wi-Fi router plus phones add another ~150Wh overnight. Add those up and you land right around 1,000Wh — which is exactly why the 1kWh class is the apartment sweet spot.",
      ],
      table: {
        caption:
          "Capacity tiers → what they realistically cover in an overnight apartment outage (usable figures, not sticker Wh)",
        columns: ["Rated capacity", "What it realistically runs overnight", "Best pick", "Approx. price"],
        rows: [
          [
            "~250–300Wh",
            "Phones, laptop, Wi-Fi, lights, a CPAP (no heater). NOT a fridge.",
            "Anker SOLIX C300 (288Wh)",
            "$179–299",
          ],
          [
            "~500Wh",
            "Comms + lights for a long night, or a fridge for a few hours only.",
            "Step-down from a 1kWh unit if space/weight is tight",
            "varies",
          ],
          [
            "~1,000–1,150Wh",
            "Fridge + Wi-Fi + phones through the night, OR fridge + a heater-off CPAP. The apartment default.",
            "Bluetti AC180 (1152Wh) / Jackery 1000 v2 (1070Wh)",
            "$399–799",
          ],
          [
            "2,000Wh+",
            "Fridge + CPAP-with-heater + more, or a multi-day outage. Heavier and pricier than most renters need.",
            "A larger station (out of scope here)",
            "$900+",
          ],
        ],
      },
    },
    {
      heading: "The catch nobody prints on the box",
      body: [
        "Sticker watt-hours are not the watt-hours you get. An inverter that turns the battery's DC into the 120V AC your fridge needs is only about 85% efficient, so a 1,152Wh Bluetti AC180 delivers closer to ~980Wh of usable AC energy, and a 1,070Wh Jackery lands near ~910Wh. Cold rooms, an aging battery, and running the display and fan all shave a little more. Always size as if the real number is 10–20% below the label — that margin is why we point apartment buyers at 1kWh rather than 800Wh for a fridge-plus night.",
        "The second catch is surge. A refrigerator's compressor doesn't sip its rated running watts at startup — it slams the inverter with an inrush spike of roughly 2–3× running watts for a fraction of a second, every time it kicks on. A fridge that runs at 120W can surge past 600W on start. That's fine for a station with real surge headroom — the Bluetti AC180 is rated to 2,700W peak, the Jackery 1000 v2 to 3,300W surge — but it's exactly why a 300W unit (the SOLIX C300 tops out at 600W surge) is a comms-and-CPAP box, not a fridge box. Ask a small station to start a full-size fridge and its overload protection cuts the outlet.",
        "The third: real-world runtime undershoots the tidy 'Wh ÷ watts' arithmetic, because the fridge cycles, the fan runs, and efficiency isn't 100%. Treat any runtime you calculate as an optimistic ceiling, not a promise.",
      ],
      list: [
        "Usable < rated|Budget ~85% of the sticker Wh after inverter losses — more margin in a cold room.",
        "Surge ≠ running watts|A fridge compressor spikes 2–3× at startup; the station's peak/surge rating must clear it, not just its continuous rating.",
        "LiFePO4 for the long haul|Every pick here uses LiFePO4 chemistry — thousands of cycles and far safer thermal behavior than older lithium, which matters for a battery living indoors.",
        "It self-discharges|A station left in a closet for a year greets the next outage half-empty. Top it to ~80% every few months so it's ready.",
      ],
    },
    {
      heading: "Our picks, by what you're keeping alive",
      body: [
        "These are researched from published manufacturer specs and owner reviews — we don't run a lab and won't pretend to have bench-tested them. Prices are approximate and move with sales. Each card links to our product page, which carries the current Amazon listing and the full power-stations comparison.",
        "The fridge-overnight tier — Bluetti AC180 (1,152Wh, 1,800W AC, 2,700W peak) is our default for an apartment because of the surge headroom and one feature that matters indoors: a ~20ms UPS switchover. Plug your Wi-Fi and fridge into it, leave it plugged into the wall, and when grid power drops it takes over fast enough that nothing blinks off. The honest catch: it's about 35 lb — you carry it once and leave it, and its fan is audible under heavy load. The Jackery Explorer 1000 v2 (1,070Wh, 1,500W AC, 3,300W surge) is the lighter alternative at ~23.8 lb with a foldable handle and a ~1-hour recharge; its LiFePO4 pack is rated for 4,000 cycles. Its catch: no built-in UPS mode as fast as the Bluetti's, and the MSRP is high — buy it on one of its frequent discounts, not at sticker.",
      ],
      productIds: [
        "bluetti-ac180-portable-power-station",
        "jackery-explorer-1000-v2-portable",
      ],
    },
    {
      heading: "If you only need comms, lights, and a CPAP — or just your devices",
      body: [
        "Not every renter needs to save a fridge. If your outage plan is 'keep phones and the router alive, run a lamp, and power a CPAP so I can sleep,' a full 1kWh station is more weight and money than you need.",
        "The Anker SOLIX C300 (288Wh, 300W AC, fast 140W two-way USB-C) is the right-sized pick here: light, grab-and-go, and genuinely quiet — Anker rates it at around 25 dB, quieter than a whisper and inaudible across a bedroom. It runs phones, a laptop, Wi-Fi, LED lights, and a heater-off CPAP comfortably for a night. Two honest notes: buy the AC model (there's a cheaper USB-only C300 DC version), and it will not start a refrigerator — the 300W inverter and 600W surge ceiling aren't built for a compressor.",
        "If even that is overkill and you just want your phone, earbuds, and laptop topped up through a short outage, a large power bank is the cheapest, most portable answer. The Anker Prime Power Bank (27,650mAh / 99.54Wh, 250W) tops off a laptop, phone, and tablet at once and — because it stays just under the 100Wh line — it doubles as a carry-on-legal travel battery. It won't run anything with a wall plug, but for pure device backup it's the honest floor of this category.",
      ],
      productIds: [
        "anker-solix-c300-portable-power",
        "anker-prime-power-bank",
      ],
    },
    {
      heading: "Who should skip a power station (and buy an installed system instead)",
      body: [
        "A portable power station is the right tool for a renter keeping essentials alive on a countertop. It is the wrong tool for two jobs, and being honest about that saves you a return.",
        "First, whole-home backup. If you want the lights, HVAC, and every outlet in a house to stay on, you're describing a standby generator or a wired home-battery (like a Tesla Powerwall) with a transfer switch — a permanent electrical install, professionally wired into your panel, that a renter can't do and a landlord rarely will. A portable station powers the appliances you physically plug into it, nothing hard-wired.",
        "Second, anything with a well pump, a central air conditioner, an electric furnace, or an electric water heater. These are 240V and/or multi-thousand-watt motor loads that a 1,500–1,800W portable inverter cannot start, let alone sustain. That, too, is transfer-switch territory. If those are your must-run loads, stop shopping portable stations — you need an installed system, and that's a homeowner's project, not a renter's.",
      ],
    },
    {
      heading: "How we picked the best power station for apartment power outage",
      body: [
        "We started from the apartment constraint — no fumes, no fuel storage, lease-legal, quiet enough for a shared building at night — which rules out every combustion generator and points straight at LiFePO4 battery stations. From there we sized to the two loads that actually decide an apartment outage: a refrigerator (with its startup surge) and a CPAP, landing on the ~1kWh class as the default and a ~300Wh unit as the comms-only tier.",
        "Every spec here is traceable: capacities, inverter and surge ratings, weights, and recharge times come from each maker's published figures (Bluetti, Jackery, Anker), and the ~25 dB figure for the SOLIX C300 is Anker's own rating. We compared those specs against patterns in long-term owner reviews for reliability and real-world runtime — but we have not personally lab-tested these units, and prices are approximate and change often, so confirm the current listing before you buy. As Amazon Associates we may earn from qualifying purchases; it doesn't change which unit best fits your outage.",
      ],
    },
  ],
  faq: [
    {
      q: "Can you run a power station indoors in an apartment?",
      a: "Yes — that's the entire advantage over a generator. A LiFePO4 power station produces no exhaust and no carbon monoxide, so it's safe to run in a closed room, unlike any gas or propane generator, which must only be used outdoors. The only sound is a cooling fan that runs under heavy load.",
    },
    {
      q: "What size power station do I need to run a refrigerator during a blackout?",
      a: "For an overnight outage (8–12 hours), plan on a ~1,000Wh LiFePO4 station like the Bluetti AC180 or Jackery Explorer 1000 v2. A fridge averages roughly 400–700Wh over a night once you account for its cycling, and the station's surge rating must clear the compressor's 2–3× startup spike — which is why a 300W unit can't do it, but a 1,500–1,800W unit can.",
    },
    {
      q: "Will a power station run my CPAP overnight?",
      a: "Usually yes. A CPAP with its heated humidifier and heated hose turned off draws about 30–60W, so a ~300Wh station like the Anker SOLIX C300 covers a full night, and a 1kWh station covers a CPAP plus a fridge. Running the heater roughly doubles the draw, so size up if you keep it on.",
    },
    {
      q: "How long will a 1000Wh power station actually last?",
      a: "Less than the tidy math suggests. After inverter losses you have roughly 850–980Wh usable, and real runtime undershoots because fridges cycle and efficiency isn't perfect. As a rough guide, ~1kWh covers a fridge plus Wi-Fi and phones for a single overnight, or a fridge plus a heater-off CPAP — treat any calculated runtime as an optimistic ceiling.",
    },
    {
      q: "Is a power station better than a quiet inverter generator for an apartment?",
      a: "For a renter, yes. Even 'quiet' inverter generators run at 55–65 dB, produce carbon monoxide, need gasoline stored on-site, and are prohibited by most leases and fire codes — none of which works in an apartment. A power station is silent, fume-free, and lease-legal. The tradeoff is finite capacity: a generator runs as long as you feed it fuel, while a battery holds a fixed number of watt-hours.",
    },
    {
      q: "Can a portable power station back up my whole apartment?",
      a: "No. A portable station powers only what you physically plug into it — a fridge, router, lights, devices, a CPAP. It can't power hard-wired circuits, a central AC, an electric furnace, or a 240V load. Whole-home backup requires an installed standby generator or home battery with a transfer switch, which is a homeowner's electrical project, not a renter's.",
    },
  ],
  relatedGuides: ["best-power-stations-compared"],
  heroImage: "/products/scene/bluetti-ac180-portable-power-station.png",
  sources: [
    {
      label: "BLUETTI AC180 official specifications",
      url: "https://www.bluettipower.com/products/bluetti-ac180-portable-power-station",
    },
    {
      label: "Jackery Explorer 1000 v2 official specifications",
      url: "https://www.jackery.com/products/explorer-1000-v2-portable-power-station",
    },
    {
      label: "Anker SOLIX C300 Portable Power Station official page",
      url: "https://www.anker.com/products/a17260z1-solix-c300-portable-power-station",
    },
    {
      label: "CPSC — Portable Generator Safety (carbon monoxide)",
      url: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/portable-generators",
    },
  ],
};
