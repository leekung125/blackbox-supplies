import type { Article } from "@/lib/articles";

/**
 * Long-tail buyer-intent article.
 * Target keyword: "how many solar panels to keep a power station charged off grid"
 * Self-contained per the content-architecture recipe. The orchestrator wires
 * it into EXTRA_ARTICLES (lib/articles-extra.ts) so it appears on the /guides hub.
 *
 * Honesty laws respected: no "we tested", no fabricated ratings/prices, every
 * spec traced to the catalog or a named manufacturer figure. Product cards route
 * to our /products/<id> pages (which carry the Amazon handoff + guide cross-link).
 */
export const HOW_MANY_SOLAR_PANELS_TO_KEEP_A_POWER_STATION_CHARGED_OFF_GRID: Article = {
  slug: "how-many-solar-panels-to-keep-a-power-station-charged-off-grid",
  title: "How Many Solar Panels to Keep a Power Station Charged Off-Grid",
  dek: "How many solar panels to keep a power station charged off-grid, worked out plainly: daily watt-hours ÷ usable sun hours = panel watts, plus the honest 20–30% derate. Why a 1kWh station really wants ~300–400W of panel — and the catch on connectors, solar-input caps, and the panel that's almost never in the box.",
  category: "Power & Charging",
  readMinutes: 10,
  updated: "July 2026",
  answerFirst:
    "Take your daily energy use in watt-hours, divide by your realistic sun hours, then add 30–50% for real-world losses. A 750Wh day ÷ 5 sun hours ≈ 150W on paper, so buy 200–250W of panel. Because panels deliver 20–30% under their rating in the field, a 1kWh station you drain daily wants roughly 300–400W of solar to actually replenish before dark.",
  sections: [
    {
      heading: "The formula for how many solar panels to keep a power station charged off-grid",
      body: [
        "There is one honest equation behind this whole question, and it fits on a napkin. Add up the energy you pull from the station in a day (watt-hours), divide by the number of genuinely useful sun hours where you're parked, and you get the panel wattage you'd need if the world were perfect. Then, because the world is not perfect, add a buffer.",
        "Watt-hours vs. watts is the distinction everything hinges on. Watt-hours (Wh) are energy — how much your station holds and how much you burn in a day. Watts (W) are the rate a panel produces. A 100W panel in one hour of ideal sun makes about 100Wh; the same panel across a real day makes far less, because you never get a full day of ideal, head-on sun.",
        "Worked example. Say you drain 750Wh a day — a laptop, phones, LED lights, a fan, and a few hours of a small 12V fridge. Divide by five usable sun hours: 750 ÷ 5 = 150W of panel on paper. That's the floor, not the answer. Add the buffer for losses (more on why below) and you're shopping for 200–250W of real panel to reliably refill a 750Wh day. If you drain closer to a full 1,000Wh — the amount a fridge-plus-devices setup runs through — you're in 300–400W territory.",
        "The single biggest variable isn't the panel; it's the phrase 'usable sun hours.' Solar people call it peak sun hours — the number of hours per day equivalent to full 1,000 W/m² sun. In good summer conditions in the sunbelt that's 5–6; a cloudy Pacific Northwest winter day can be 2 or less. The same panel is a different tool in Arizona than in Seattle in January, and that gap is exactly why a fixed 'you need X panels' answer is always wrong. Size for your worst realistic day, not your best.",
      ],
      table: {
        caption: "The sizing math, three common off-grid days (illustrative — plug in your own draw and sun hours)",
        columns: ["Your daily draw", "÷ usable sun hours", "Paper watts", "Real panel to buy (+buffer)"],
        rows: [
          ["~350Wh (phones, laptop, lights, no fridge)", "÷ 5h", "70W", "100–120W (one SolarSaga-class panel)"],
          ["~750Wh (add a small 12V fridge a few hours)", "÷ 5h", "150W", "200–250W"],
          ["~1,000Wh (fridge + devices, daily)", "÷ 5h", "200W", "300–400W"],
          ["~1,000Wh in weak/cloudy sun", "÷ 3h", "333W", "400W+ (or accept a shortfall)"],
        ],
      },
    },
    {
      heading: "The derate nobody prints on the box: panels give 20–30% less than their rating",
      body: [
        "A panel's wattage is measured under lab conditions (Standard Test Conditions: 1,000 W/m² of light, a cool 25°C cell, head-on). You will basically never see those conditions in a campsite. In the field, a portable panel typically delivers 70–80% of its rated wattage at best, and often less. That's the derate, and it's why the buffer in the formula above isn't optional padding — it's covering real, predictable losses.",
        "Where the missing 20–30% goes: angle (a panel flat on the ground or leaned at the wrong tilt loses a big chunk versus one square to the sun), heat (panels get less efficient as they bake — a hot roof panel underperforms the same panel in cool air), haze and thin cloud, dust on the glass, and conversion losses in the station's charge controller. None of these are defects; they're physics, and they stack.",
        "The practical upshot: treat a panel's rating as a ceiling you rarely touch. A '100W' folding panel that reads 60–75W on the station's input display in real sun is behaving normally, not failing. This is also why chasing the panel with the highest sticker number matters less than buying enough total wattage and pointing it well — a well-aimed 200W beats a badly-aimed 300W most afternoons.",
      ],
      list: [
        "Rated ≠ real|Budget for 70–80% of the sticker wattage in good sun, less on a bad day.",
        "Aim beats specs|Re-tilting a portable panel toward the sun two or three times a day can add more energy than a bigger panel left flat.",
        "Heat is a tax|Panels lose output as they heat up; airflow behind a panel helps, a sun-baked closed surface hurts.",
        "Size for the worst day|If a cloudy day only gives you 2–3 sun hours, that — not your sunny best — is what determines whether you stay charged.",
      ],
    },
    {
      heading: "Match the panel wattage to the station you own",
      body: [
        "Off-grid, the goal is simple: put back as much as you take out before the next night. If you use half a 1kWh station's capacity each day, you need to harvest ~500Wh of real energy that day; if you cycle it fully, you need ~1,000Wh. Run those targets through the derate and you get the rough panel wattage each station class wants for daily, hands-off replenishment.",
        "These are planning numbers, not promises — your real figure moves with your draw, your latitude, and the weather. But they anchor the decision better than a panel count does, because 'how many panels' depends entirely on each panel's wattage.",
      ],
      table: {
        caption: "Station capacity → panel wattage to replenish it in a typical off-grid day (planning figures)",
        columns: ["Station class", "Example", "To top up light daily use", "To refill near-full daily use"],
        rows: [
          ["~300Wh compact", "Weekend comms/CPAP box", "~60–100W", "~150–200W"],
          ["~750–800Wh", "EcoFlow RIVER 2 Pro (768Wh)", "~150–200W", "~300W"],
          ["~1,000–1,150Wh", "Jackery 1000 v2 (1,070Wh) / Bluetti AC180 (1,152Wh)", "~200W", "~300–400W"],
        ],
      },
    },
    {
      heading: "The catch on solar for a power station (three of them, actually)",
      body: [
        "This is where our guide has to be blunt, because the marketing photos of a station glowing in a meadow leave three things out — and each one costs money or capability.",
      ],
      list: [
        "The panel is almost never in the box|Power stations are sold as the battery unit; the solar panel is a separate purchase. Our catalog notes this explicitly on the Bluetti AC180 (\"solar panel is sold separately\"), and it's true across the category. A station's price is not its off-grid-ready price — budget the panel on top.",
        "Solar input caps your recharge speed|Every station has a maximum solar input in watts. Pile on more panel than that ceiling and the extra watts are simply ignored. By each maker's published spec, the EcoFlow RIVER 2 Pro accepts up to 220W of solar, the Jackery Explorer 1000 v2 up to 400W, and the Bluetti AC180 up to 500W. That cap — not the number of panels you can physically connect — is the real limit on how fast the sun refills your battery.",
        "Brands lock you to their connector|A Jackery SolarSaga panel is built to plug straight into a Jackery Explorer; a Bluetti or EcoFlow expects its own panel or a matching adapter. Our SolarSaga listing flags this directly: if your station is a different brand, buy that brand's matching panel or confirm the adapter before you order. Mismatched connectors and voltage windows are the most common reason a panel \"doesn't work\" with a station.",
      ],
    },
    {
      heading: "Station tiers and how much solar each can actually swallow",
      body: [
        "Because the solar-input cap is the ceiling, the right panel array is bounded by the station, not just your appetite. Here's how the three stations we point off-grid buyers toward line up — capacity, published solar-input ceiling, and roughly what that means in panels. All figures are each manufacturer's published specs and our catalog; real recharge time runs longer than the ideal math because of the derate above.",
      ],
      table: {
        caption: "Off-grid station tiers — capacity vs. published max solar input",
        columns: ["Station", "Capacity", "Max solar input (published)", "What that is in panels"],
        rows: [
          ["EcoFlow RIVER 2 Pro", "768Wh LiFePO4", "220W", "~2× 100W panels; a light, 17 lb one-hand carry"],
          ["Jackery Explorer 1000 v2", "1,070Wh LiFePO4", "400W", "Up to ~4× SolarSaga 100W panels"],
          ["Bluetti AC180", "1,152Wh LiFePO4", "500W", "The most solar headroom of the three; heavier (~35 lb)"],
        ],
      },
    },
    {
      heading: "Our researched picks — panel plus station",
      body: [
        "These are researched from published manufacturer specs, our catalog, and owner reviews — we don't run a lab and won't pretend to have bench-tested them. Prices are approximate and move with sales. Each card links to our product page, which carries the current Amazon listing; the full head-to-head is in the power-stations comparison guide.",
        "The plug-and-play pairing — the Jackery SolarSaga 100W (foldable, bifacial, ~25% efficiency per Jackery, with DC and USB output) drops straight into a Jackery Explorer 1000 v2 with no adapter hunting. Because the Explorer 1000 v2 accepts up to 400W of solar, you can start with one SolarSaga panel and add up to three more as your daily draw grows. The honest catch on the panel: it's a companion, not a standalone charger, its connector is Jackery-specific, and — as with every panel — real output falls below the rated 100W in imperfect sun.",
        "The station tiers — if you carry power a real distance and your daily draw is modest, the EcoFlow RIVER 2 Pro (768Wh, 17 lb, ~70-minute wall recharge) is the light option, but its 220W solar cap means the sun refills it slowly; plan on a full sunny day to meaningfully top a drained unit. If you want the most solar headroom and don't mind ~35 lb, the Bluetti AC180 (1,152Wh, 1,800W inverter, 500W solar input) takes the biggest array and refills fastest from the sun of the three. Confirm each station's connector and that your chosen panel matches before buying.",
      ],
      productIds: [
        "jackery-solarsaga-100w-portable-solar",
        "jackery-explorer-1000-v2-portable",
        "ecoflow-river-2-pro-portable",
        "bluetti-ac180-portable-power-station",
      ],
    },
    {
      heading: "Who this is for — and who should skip solar entirely",
      body: [
        "This math earns its keep for one kind of user: someone off-grid for days at a time who drains the station daily and has no outlet to plug into. Van-lifers, RV boondockers, and multi-day campers who run a fridge and devices are the reason solar sizing matters — for them, the panel is the difference between a battery that lasts one day and a system that lasts indefinitely.",
        "If that's not you, be honest about it before you spend. If you mostly recharge from a wall or the car's 12V socket and only want the station for the occasional outage or short trip, a solar panel is money spent for a capability you'll rarely use. A station recharges far faster from a wall outlet — the Bluetti AC180 hits 0–80% in about 45 minutes, the Jackery 1000 v2 in roughly an hour — than from any portable panel. For a wall-charged user, the panel is a want, not a need, and the budget is better spent on more battery capacity.",
        "The tell: if you can realistically plug in every day or two, skip solar. If your plan involves being genuinely away from power for three days or more, solar stops being optional and the sizing formula above is how you get it right.",
      ],
    },
    {
      heading: "How we approached this",
      body: [
        "We started from the physics that actually governs off-grid charging — energy in watt-hours, the peak-sun-hours concept, and the real-world derate that separates a panel's rating from its output — rather than a panel count that only works in one place on one day. From there we anchored the numbers to the stations and the panel in our catalog and to each maker's published specs (capacities, LiFePO4 chemistry, solar-input ceilings, recharge times).",
        "Every figure here is traceable: the SolarSaga's ~25% efficiency and Explorer compatibility, the RIVER 2 Pro's 768Wh and 220W solar input, the Bluetti AC180's 1,152Wh and 500W input, and the derate range come from manufacturer documentation and standard solar-loss references, cited below. We have not personally lab-tested these units, real output varies with sun and weather, and prices are approximate and change often — so confirm the current listing and your own daily draw before buying. As Amazon Associates we may earn from qualifying purchases; it doesn't change the math.",
      ],
    },
  ],
  faq: [
    {
      q: "How many solar panels do I need to keep a power station charged off-grid?",
      a: "Divide your daily watt-hour use by your realistic sun hours, then add 30–50% for losses. A 750Wh day ÷ 5 sun hours ≈ 150W on paper, so buy 200–250W of panel — one or two 100W folding panels. A 1kWh station you drain fully each day wants roughly 300–400W of panel because real-world output runs 20–30% below the panel's rating.",
    },
    {
      q: "Why do my solar panels put out less than their rated wattage?",
      a: "Because panels are rated under lab conditions (full head-on sun, a cool cell) you almost never get outdoors. In the field a portable panel typically delivers 70–80% of its rating — less on a hot, hazy, or badly-angled day. Losses from angle, heat, dust, cloud, and charge-controller conversion all stack, which is why you size with a buffer.",
    },
    {
      q: "Does a portable power station come with a solar panel?",
      a: "Almost never. Power stations are sold as the battery unit; the solar panel is a separate purchase. Our catalog flags this on the Bluetti AC180 (\"solar panel sold separately\"), and it's true across the category — so a station's price is not its off-grid-ready price.",
    },
    {
      q: "Can I add as many solar panels as I want to charge faster?",
      a: "Only up to your station's maximum solar input. By each maker's published spec, the EcoFlow RIVER 2 Pro accepts up to 220W, the Jackery Explorer 1000 v2 up to 400W, and the Bluetti AC180 up to 500W. Panel wattage beyond that ceiling is ignored, so the input cap — not how many panels you can plug in — limits your recharge speed.",
    },
    {
      q: "Will any solar panel work with any power station?",
      a: "Not reliably. Brands use their own connectors and voltage windows — a Jackery SolarSaga is built for a Jackery Explorer, and a Bluetti or EcoFlow expects its own panel or a verified adapter. Mismatched connectors are the most common reason a panel won't charge a station, so buy the matching brand's panel or confirm the adapter first.",
    },
    {
      q: "Do I even need solar, or can I just charge from a wall or car?",
      a: "If you can plug in every day or two, skip solar — a station recharges far faster from a wall (the Bluetti AC180 hits 0–80% in about 45 minutes) than from any portable panel, and the money is better spent on more capacity. Solar earns its cost only when you're genuinely off power for three or more days at a time.",
    },
  ],
  relatedGuides: ["car-gear-worth-keeping-in-your-trunk"],
  heroImage: "/products/scene/jackery-solarsaga-100w-portable-solar.png",
  sources: [
    {
      label: "Jackery SolarSaga 100W Portable Solar Panel — official specifications",
      url: "https://www.jackery.com/products/jackery-solarsaga-100w-solar-panel",
    },
    {
      label: "Jackery Explorer 1000 v2 official specifications",
      url: "https://www.amazon.com/dp/B0D7PPG25F?tag=blackboxsuppl-20",
    },
    {
      label: "EcoFlow RIVER 2 Pro official specifications (solar input)",
      url: "https://www.ecoflow.com/us/river-2-pro-portable-power-station",
    },
    {
      label: "BLUETTI AC180 official specifications (solar input)",
      url: "https://www.bluettipower.com/products/bluetti-ac180-portable-power-station",
    },
    {
      label: "NREL PVWatts — how real-world losses derate solar output",
      url: "https://pvwatts.nrel.gov/",
    },
  ],
};
