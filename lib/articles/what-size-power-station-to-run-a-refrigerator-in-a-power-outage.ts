import type { Article } from "@/lib/articles";

/**
 * Long-tail buyer-intent sizing article.
 * Target keyword: "what size power station do I need to run a refrigerator during a power outage"
 * Self-contained per the content-architecture recipe. The orchestrator wires it
 * into EXTRA_ARTICLES (lib/articles-extra.ts) so it appears on the /guides hub.
 *
 * Honesty laws respected: no "we tested", no fabricated ratings/prices, every
 * spec traced to the catalog or a named manufacturer figure. Product cards route
 * to our /products/<id> pages (which carry the Amazon handoff + guide cross-link).
 * Structured data emitted by the renderer: Article + BreadcrumbList + FAQPage.
 */
export const WHAT_SIZE_POWER_STATION_TO_RUN_A_REFRIGERATOR_IN_A_POWER_OUTAGE: Article = {
  slug: "what-size-power-station-to-run-a-refrigerator-in-a-power-outage",
  title:
    "What Size Power Station Do I Need to Run a Refrigerator in a Power Outage?",
  dek: "What size power station to run a refrigerator during a power outage comes down to three numbers: your power station's continuous watts must clear the refrigerator's running watts, its surge rating must cover the 1,200-2,400W compressor spike, and its watt-hours must cover the hours. Because a fridge only runs ~30-40% of the time, a ~1,000Wh LiFePO4 unit covers most of a day and ~1,600-2,000Wh covers a full 24 hours.",
  category: "Power & Charging",
  readMinutes: 9,
  updated: "July 2026",
  answerFirst:
    "To run a refrigerator in a power outage you need to clear two numbers, then size a third. The station's continuous AC output must exceed the fridge's running watts (usually 100-250W), its surge/peak rating must cover the compressor's 1,200-2,400W startup spike, and it must be a pure sine wave inverter. Then, because a fridge cycles only ~30-40% of the time, a ~1,000Wh LiFePO4 unit like the Bluetti AC180 or Jackery 1000 v2 keeps a fridge alive most of a day; a full 24 hours wants ~1,600-2,000Wh.",
  sections: [
    {
      heading: "What size power station do I need to run a refrigerator in a power outage?",
      body: [
        "This is really three questions stacked into one, and the reason people buy the wrong unit is that they only answer the last one. A power station that has plenty of watt-hours can still fail to run your fridge if it can't survive the startup spike — and a unit with a big inverter can still die at 2 a.m. if it doesn't hold enough energy. You have to clear all three:",
        "1. Continuous watts. The station's rated AC output (its running watts) must comfortably exceed what the fridge draws while the compressor is humming along. For a typical full-size refrigerator that's roughly 100-250 running watts — a small number that almost any 1,000W-class station clears.",
        "2. Surge watts. The moment the compressor motor kicks on, it slams the inverter with an inrush spike of roughly 2-3x its running watts for a fraction of a second — commonly 1,200-2,400W on a household fridge. The station's surge (peak) rating must clear that spike, or its overload protection trips the outlet the instant the fridge tries to start.",
        "3. Watt-hours (Wh). Once the station can physically start and run the fridge, capacity decides for how long. This is where the fridge's duty cycle changes everything — covered below.",
        "Get the first two right and the fridge runs at all; get the third right and it runs long enough to matter. The rest of this page is how to put a real number on each.",
      ],
    },
    {
      heading: "The two numbers that decide whether it runs at all",
      body: [
        "Continuous watts is the easy one. A modern full-size refrigerator runs at roughly 100-250W once its compressor is up to speed — a small draw that any 1,000Wh-class station handles without noticing. A compact or mini fridge is lower still. So the running-watts hurdle is rarely where a station fails.",
        "The surge is where cheap or undersized units fall over. An AC induction motor — which is what a fridge compressor is — pulls a large inrush current at the instant it starts, before it's spinning. That spike is typically 2-3x the running watts and lasts a fraction of a second, but the inverter has to deliver it or shut down. A fridge that runs at 120W can spike past 1,200W on startup; a larger unit can touch 2,400W. This is why the surge rating, not the capacity, is the number that most often blocks a fridge.",
        "Match your fridge to the surge column below, then confirm the station's peak/surge rating clears it with margin.",
      ],
      table: {
        caption:
          "Fridge type -> approximate running watts and the startup surge your station must clear",
        columns: ["Fridge type", "Running watts (approx)", "Startup surge to clear (approx)"],
        rows: [
          ["Mini / compact fridge", "50-100W", "300-600W"],
          ["Standard top-freezer (18-21 cu ft)", "100-200W", "1,000-1,800W"],
          ["Large / French-door / side-by-side", "150-250W", "1,500-2,400W"],
          ["Older / less efficient unit", "200-350W", "1,800-2,400W+"],
        ],
      },
    },
    {
      heading: "The third requirement people forget: pure sine wave",
      body: [
        "A refrigerator's compressor motor is fussy about the shape of the AC power it's fed. A cheap 'modified sine wave' inverter approximates the wave with a blocky staircase, and a motor fed that shape can run hot, buzz, lose efficiency, or refuse to start on some fridges. For a device you're trusting to protect a freezer full of food, you want a clean pure sine wave inverter — power indistinguishable from your wall outlet.",
        "The good news: every LiFePO4 power station we recommend — the Bluetti AC180, Jackery Explorer 1000 v2, and EcoFlow RIVER 2 Pro — outputs pure sine wave AC as standard, so this is a box that's already checked on any reputable unit. It's mainly a warning against no-name bargain inverters and older modified-sine car inverters, which are exactly the wrong tool for a fridge.",
      ],
    },
    {
      heading: "Sizing the watt-hours: the 30-40% duty cycle changes everything",
      body: [
        "Here's the number that makes power stations viable for fridges at all: a refrigerator's compressor does not run continuously. It cycles on to pull the box back down to temperature, then shuts off and coasts. Across a full hour it's typically running only about 30-40% of the time — and much less if you keep the door shut during an outage.",
        "That duty cycle is why a '180W' fridge doesn't drain 180W every hour. Averaged over the cycling, a fridge that pulls ~180W while running only consumes roughly 50-70 watt-hours per hour of real energy. Multiply that average draw by the hours you need to cover, and you have your target capacity. The step-by-step:",
      ],
      list: [
        "Step 1 - Find the fridge's running watts|Check the sticker inside the fridge or its manual (volts x amps = watts), or use ~150W as a typical full-size figure.",
        "Step 2 - Convert to average draw|Multiply running watts by ~0.35 (the duty cycle) to get average watts. A 150W fridge averages roughly 50-55W; a 180W fridge averages ~60-70W.",
        "Step 3 - Multiply by the hours|Average watts x hours = watt-hours needed. 60W average x 12 hours = ~720Wh for an overnight; x 24 hours = ~1,440-1,700Wh for a full day.",
        "Step 4 - Add margin for the inverter|Inverter conversion is only ~85% efficient, so add ~15-20% on top. That's how a ~720Wh overnight need points at a ~1,000Wh station, and a 24-hour need at ~1,600-2,000Wh.",
      ],
    },
    {
      heading: "How that math maps to a real number to buy",
      body: [
        "Put the duty-cycle math and the inverter-loss margin together and the tiers fall out cleanly. A ~1,000Wh LiFePO4 station covers most of a day of fridge-only runtime — comfortably an overnight, and often longer if you keep the door shut. For a genuine, hands-off 24-hour cushion on a full-size fridge, step up toward 1,600-2,000Wh. And if all you own is a mini fridge, a sub-1kWh unit does the job.",
      ],
      table: {
        caption:
          "Capacity tier -> realistic fridge runtime (usable figures, fridge-only, ~30-40% duty cycle)",
        columns: ["Rated capacity", "What it realistically covers", "Example unit"],
        rows: [
          [
            "~700-800Wh",
            "A mini fridge overnight, or a full-size fridge for roughly half a day.",
            "EcoFlow RIVER 2 Pro (768Wh)",
          ],
          [
            "~1,000-1,150Wh",
            "A full-size fridge for most of a day / a comfortable overnight, plus Wi-Fi and phones.",
            "Jackery 1000 v2 (1,070Wh) / Bluetti AC180 (1,152Wh)",
          ],
          [
            "~1,600-2,000Wh",
            "A full-size fridge for a genuine 24 hours, or a fridge plus other essentials overnight.",
            "A larger station or two 1kWh units (out of scope here)",
          ],
        ],
      },
    },
    {
      heading: "The catch: real-world runtime undershoots the sticker",
      body: [
        "The tidy 'watt-hours divided by watts' arithmetic is an optimistic ceiling, not a promise, and it's worth knowing why before you buy on a number.",
        "Usable Wh is less than rated Wh. The inverter that turns the battery's DC into 120V AC is only about 85% efficient, so a 1,152Wh Bluetti AC180 delivers closer to ~980Wh of usable AC energy and a 1,070Wh Jackery lands near ~910Wh. A cold garage, an aging pack, and running the display and fan shave a little more. Size as if the real number is 10-20% below the label.",
        "Duty cycle is a range, not a constant. That ~30-40% figure climbs if the room is warm, the fridge is old or full of warm food, or the door gets opened — every open resets the cool-down cycle. During an outage, discipline at the door directly buys you runtime.",
        "Solar is sold separately. If your plan for a long outage is to recharge from the sun, note that none of these stations include a solar panel in the box — the Bluetti AC180's panel in particular is a separate purchase. Budget for it, and expect real-world panel output well below its rated watts in imperfect sun.",
        "The honest takeaway: treat any runtime you calculate as a best case, keep the fridge door shut, and buy one tier up if the food in that freezer actually matters to you.",
      ],
      list: [
        "Usable < rated|Budget ~85% of the sticker Wh after inverter losses; more in a cold room.",
        "Surge is the gatekeeper|A fridge can't start unless the peak/surge rating clears its 1,200-2,400W spike, no matter how many watt-hours the unit holds.",
        "Keep the door shut|Every door-open resets the cool-down and pushes the duty cycle up, cutting your real runtime.",
        "Pure sine wave only|A modified-sine inverter can run a fridge hot or refuse to start it; all three picks here are pure sine.",
      ],
    },
    {
      heading: "Our researched picks, by fridge and hours",
      body: [
        "These are researched from published manufacturer specs and owner reviews — we don't run a lab and won't pretend to have bench-tested them. Prices are approximate and move with sales. Each card links to our product page, which carries the current Amazon listing and the full power-stations comparison.",
        "For a full-size fridge overnight, the Bluetti AC180 (1,152Wh, 1,800W AC, 2,700W peak) is the confident default: its 2,700W peak clears any household fridge's startup spike with room to spare, and a ~20ms UPS switchover means if you leave the fridge plugged into it, the changeover when the grid drops is fast enough that the compressor never notices. The catch: it's about 35 lb (you set it down once and leave it) and its solar panel is a separate buy. The Jackery Explorer 1000 v2 (1,070Wh, 1,500W AC, 3,000W surge) is the lighter alternative at ~23.8 lb with a foldable handle and a ~1-hour recharge, and its 3,000W surge headroom is the biggest of the three; its catch is a high MSRP, so buy it on one of its frequent discounts rather than at sticker.",
        "If you only need to cover a mini fridge, or a full-size fridge for part of a day, the EcoFlow RIVER 2 Pro (768Wh, 800W AC, 1,600W X-Boost) is the sub-1kWh floor: a genuinely portable 17 lb one-hand carry that recharges 0-100% in about 70 minutes. Two honest limits — its native AC output is 800W, and its 1,600W X-Boost figure only applies to resistive loads, so verify your fridge's actual startup surge fits under the native inverter's real ceiling before relying on it for a large unit.",
      ],
      productIds: [
        "bluetti-ac180-portable-power-station",
        "jackery-explorer-1000-v2-portable",
        "ecoflow-river-2-pro-portable",
      ],
    },
    {
      heading: "Who should skip a portable power station for this",
      body: [
        "A portable station is the right tool for keeping one or two essentials — a fridge, Wi-Fi, phones, a CPAP — alive on a countertop through an outage. It's the wrong tool for two jobs, and being honest about that saves you a return.",
        "First, whole-home backup. If you want the fridge, the HVAC, and every outlet in the house to ride through an outage automatically, you're describing a standby generator or a wired home battery with a transfer switch — a permanent, professionally installed system, not a box you plug the fridge into.",
        "Second, a very long or repeated multi-day outage with no way to recharge. A battery holds a fixed number of watt-hours; once it's empty, it's empty until you can refill it from the grid, a big solar array, or a generator. If you routinely lose power for days in a region with poor sun, a fuel-burning generator (used outdoors, never indoors) or an installed system may fit your reality better than any portable battery.",
      ],
    },
    {
      heading: "How we sized these recommendations",
      body: [
        "We started from the physics of the load: a refrigerator's running watts (a small, easy number), its startup surge (the 2-3x inrush that actually gates which stations work), and its ~30-40% duty cycle (which is why a fridge's real hourly energy use is far below its running watts). From there we sized to the two outage lengths people actually plan for — a single overnight and a full 24 hours — landing on the ~1kWh class as the default and ~1,600-2,000Wh for a hands-off full day.",
        "Every spec here is traceable: the capacities, inverter and surge ratings, weights, and recharge times come from each maker's published figures (Bluetti, Jackery, EcoFlow), and the running-watt, surge, and duty-cycle ranges are the standard figures the U.S. Department of Energy and appliance makers publish for household refrigerators. We compared those specs against patterns in long-term owner reviews for reliability and real-world runtime — but we have not personally lab-tested these units, and prices are approximate and change often, so confirm the current listing before you buy. As Amazon Associates we may earn from qualifying purchases; it doesn't change which unit best fits your fridge.",
      ],
    },
  ],
  faq: [
    {
      q: "What size power station do I need to run a refrigerator during a power outage?",
      a: "For a full-size fridge overnight (8-12 hours), plan on a ~1,000Wh LiFePO4 station like the Bluetti AC180 or Jackery Explorer 1000 v2; for a hands-off 24 hours, step up toward 1,600-2,000Wh. The station's continuous output must clear the fridge's 100-250W running draw, and its surge rating must clear the compressor's 1,200-2,400W startup spike.",
    },
    {
      q: "Will a 1000Wh power station run a refrigerator all day?",
      a: "It runs a full-size fridge for most of a day, not a guaranteed full 24 hours. Because a fridge cycles only ~30-40% of the time, a 150-180W fridge averages roughly 50-70Wh per hour, so ~1,000Wh (about 850-980Wh usable after inverter losses) covers a comfortable overnight and often longer if you keep the door shut. A true 24-hour cushion wants ~1,600-2,000Wh.",
    },
    {
      q: "Why does the surge rating matter more than the watts for a fridge?",
      a: "A fridge's compressor is an induction motor that pulls a large inrush spike — roughly 2-3x its running watts, commonly 1,200-2,400W — for a fraction of a second every time it starts. If the station's surge/peak rating can't deliver that spike, its overload protection cuts the outlet the instant the fridge tries to start, even though the running watts are tiny. Surge is the number that decides whether the fridge runs at all.",
    },
    {
      q: "Do I need a pure sine wave inverter to run a refrigerator?",
      a: "Yes. A fridge's compressor motor can run hot, buzz, or refuse to start on the blocky output of a cheap modified sine wave inverter. Use a pure sine wave unit — power indistinguishable from a wall outlet. Every LiFePO4 station we recommend (Bluetti AC180, Jackery 1000 v2, EcoFlow RIVER 2 Pro) is pure sine wave as standard.",
    },
    {
      q: "How many watt-hours does a refrigerator use per hour during an outage?",
      a: "Far less than its running watts, because it cycles. A typical full-size fridge runs its compressor only ~30-40% of the time, so a unit that draws 150-180W while running averages roughly 50-70 watt-hours per hour of real energy use. Keeping the door shut during an outage lowers the duty cycle and stretches your runtime further.",
    },
    {
      q: "Can a power station run a fridge and other things at the same time?",
      a: "Within the inverter's continuous rating, yes. A 1,500-1,800W station like the Jackery 1000 v2 or Bluetti AC180 easily runs a 150W fridge alongside Wi-Fi, phone chargers, and LED lights — those add up to a couple hundred watts, well under the ceiling. Just watch capacity: every extra device draws from the same watt-hours, so shortening total runtime, and avoid stacking another motor or heating load on top that could collide with the fridge's startup surge.",
    },
  ],
  relatedGuides: ["best-power-stations-compared"],
  heroImage: "/products/scene/jackery-explorer-1000-v2-portable.png",
  sources: [
    {
      label: "BLUETTI AC180 official specifications",
      url: "https://www.bluettipower.com/products/bluetti-ac180-portable-power-station",
    },
    {
      label: "Jackery Explorer 1000 v2 official specifications",
      url: "https://www.jackery.com/collections/portable-power-stations",
    },
    {
      label: "EcoFlow RIVER 2 Pro official specifications",
      url: "https://www.ecoflow.com/us/river-2-pro-portable-power-station",
    },
    {
      label: "U.S. Department of Energy - Energy Saver: Refrigerators & Freezers",
      url: "https://www.energy.gov/energysaver/refrigerators-and-freezers",
    },
  ],
};
