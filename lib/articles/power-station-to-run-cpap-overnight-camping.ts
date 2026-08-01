import type { Article } from "@/lib/articles";

/**
 * Long-tail buyer guide: "power station to run a CPAP overnight while camping".
 * Self-contained per the parallel-safe add convention — the orchestrator wires
 * this into EXTRA_ARTICLES (one import + one array entry).
 *
 * Honesty laws honored: no fabricated ratings/prices, specs traced to the
 * catalog records for the three power stations, CPAP draw figures given as
 * typical/approximate ranges (not product-specific claims) with the reader told
 * to check their own machine's label. Runtime figures are transparent math
 * (usable Wh divided by watts at a stated ~85% efficiency factor), not tests.
 */
export const CPAP_POWER_STATION_ARTICLE: Article = {
  slug: "power-station-to-run-cpap-overnight-camping",
  title: "The Best Power Station to Run a CPAP Overnight Off-Grid",
  dek: "The load math most guides skip: your humidifier setting, not the machine, decides how big a battery you need to run a CPAP overnight while camping — plus the pure-sine-wave and near-silent specs that protect a sensitive machine next to your head.",
  category: "Power & Charging",
  readMinutes: 8,
  updated: "July 2026",
  answerFirst:
    "For one or two car-camping nights with the humidifier off, a 288Wh station like the Anker SOLIX C300 is enough and runs near-silent beside your head. Turn the heated humidifier and tube on and draw jumps to roughly 40-60W — enough to drain 288Wh before morning — so multi-night trips or humidifier-on sleepers want the 768Wh EcoFlow RIVER 2 Pro, and week-long stays the 1070Wh Jackery 1000 v2. All three output pure sine wave, the waveform CPAP makers call for.",
  sections: [
    {
      heading: "The load math most guides skip",
      body: [
        "Almost every 'best power station for CPAP' page quotes one wattage and calls it done. That number is close to meaningless, because a CPAP is really two devices in one box: the blower motor, which sips power, and the heated humidifier plus heated hose, which are resistive heaters that gulp it. Which of those you run overnight changes the battery you need by a factor of three or four.",
        "The blower alone — humidifier off, no heated tube — typically draws only about 8-15W on continuous positive airway pressure, and a bit more if your therapy uses higher pressures or auto-adjusting (APAP) modes. Switch the heated humidifier and heated tube on and the same machine can pull 40-60W or more, because you're now warming water and a hose all night. Those are typical ranges across common travel machines, not a spec for any one model — check your own machine's power label or manual for its rated watts and DC voltage, because a few draw noticeably more.",
        "So the real question isn't 'how many watts is a CPAP.' It's 'am I sleeping with the humidifier on?' Answer that first, then size the battery to the honest overnight energy it implies.",
      ],
      table: {
        caption: "Typical CPAP overnight energy by setting (approximate ranges — confirm your machine's label)",
        columns: ["How you run it", "Typical draw", "Energy over an 8-hour night"],
        rows: [
          ["Blower only, humidifier OFF, no heated tube", "~8-15W", "~65-120Wh"],
          ["Humidifier ON, low heat, no heated tube", "~20-35W", "~160-280Wh"],
          ["Humidifier ON + heated tube, cold night", "~40-60W", "~320-480Wh"],
        ],
      },
    },
    {
      heading: "How to pick a power station to run a CPAP overnight while camping",
      body: [
        "Once you know your overnight energy, sizing is arithmetic. A power station never delivers its full printed watt-hours to a device — the AC inverter and voltage conversion lose some, so plan on roughly 85% of the rated capacity actually reaching your machine. That means a 288Wh unit gives you about 245Wh of usable energy, a 768Wh unit about 650Wh, and a 1070Wh unit about 910Wh.",
        "Divide usable Wh by your CPAP's watts to get runtime. Two honest wrinkles push the real number lower than the tidy math, and both matter most on the humidifier-off (low-draw) end: an AC inverter burns a few watts just being on, which is a large slice of a 12W load, and cold nights sap lithium output. The fix for the first is the single most useful trick in this guide — many travel CPAPs can run from the station's DC output or a USB-C/12V converter instead of the AC outlet, skipping the inverter's idle draw and stretching a night meaningfully. If your machine offers a DC cable, use it.",
        "The table below applies the ~85% factor to the three stations we researched, at the low (humidifier-off) and high (humidifier-on, heated tube) ends. Treat the humidifier-off column as slightly optimistic for AC use and the humidifier-on column as the safer planning number.",
      ],
      table: {
        caption: "Runtime by unit — usable Wh (rated x ~0.85) divided by CPAP draw",
        columns: ["Power station", "Usable Wh (~85%)", "Humidifier OFF (~12W)", "Humidifier ON + tube (~50W)"],
        rows: [
          ["Anker SOLIX C300 (288Wh)", "~245Wh", "~20 hrs (about 2 nights)", "~5 hrs (under one full night)"],
          ["EcoFlow RIVER 2 Pro (768Wh)", "~650Wh", "~54 hrs (6-7 nights)", "~13 hrs (about 1.5 nights)"],
          ["Jackery Explorer 1000 v2 (1070Wh)", "~910Wh", "~75 hrs (8-9 nights)", "~18 hrs (about 2 nights)"],
        ],
      },
    },
    {
      heading: "The two specs that protect a machine next to your head",
      body: [
        "Capacity gets you through the night; two other specs decide whether you'd actually want the thing running beside your pillow — and whether it's safe for a medical device.",
        "Pure sine wave is the non-negotiable one. CPAP power supplies, especially with a humidifier, expect the clean AC waveform your wall outlet delivers. A cheap 'modified sine wave' inverter can make a sensitive supply run hot, buzz, or throw an error. All three stations here output pure sine wave AC, which is the manufacturer-standard waveform for these LiFePO4 units and the one CPAP makers ask for — but if you shop elsewhere, confirm 'pure sine wave' in writing before trusting your machine to it.",
        "Near-silent operation is the spec owners actually complain about. The gripe is rarely the fan at full tilt — it's a station that pulses its fan on and off under a light load, exactly the small steady draw a CPAP represents, so it cycles audibly all night a foot from your ear. A unit that stays passively cool or fanless at low loads is worth more here than one extra outlet. Anker rates the SOLIX C300 at around 25 dB, which is quiet-library territory and the reason it's our pick for the tent; larger inverters like the RIVER 2 Pro and Jackery 1000 v2 can run their fans more under load, so if silence matters most and one night is enough, the smaller unit wins on comfort.",
      ],
    },
    {
      heading: "Our researched picks",
      body: [
        "Specs below are pulled from each maker's published figures and our catalog records, not a lab bench — we research from manufacturer data and long-term owner reviews and don't claim to have tested these units. Prices are approximate ranges that move with sales. Each card links through to our product page, which carries the full spec and the current listing.",
        "Anker SOLIX C300 (288Wh, ~$179-299) — the near-silent single-night pick. Around 25 dB, 300W pure sine AC (600W surge), 8 ports including two 140W USB-C, and it refills 0-80% in about 50 minutes off a wall or car socket before you leave. The catch: 288Wh is genuinely a humidifier-off, one-to-two-night battery — run a heated humidifier and tube and it won't clear a full 8-hour night, so honest buyers with the humidifier on should size up. One buying trap from the listing: get the AC model shown here, not the cheaper C300 DC (USB-only) version, or you'll have no wall outlet for the machine.",
        "EcoFlow RIVER 2 Pro (768Wh, ~$329-599) — the multi-night sweet spot. 768Wh LiFePO4 covers roughly 6-7 humidifier-off nights or about 1.5 humidifier-on nights, 800W pure sine AC handles the machine with enormous headroom, and it recharges 0-100% in about 70 minutes so a short generator or vehicle top-up between sites keeps you covered. The catch: at ~17 lb it's a real carry, and its fan will work harder than the C300's, so it's the trip battery, not the quietest bedside option.",
        "Jackery Explorer 1000 v2 (1070Wh, ~$449-799) — the extended-stay and outage pick. 1070Wh runs a humidifier-off machine 8-9 nights or a humidifier-on one about two nights, with a 1500W pure sine inverter and a roughly one-hour recharge; the LiFePO4 pack is rated for 4,000 cycles. The catch: 23.8 lb is a two-hand lift, MSRP is high (buy it on one of its frequent discounts), and it's overkill for a single overnight — you're paying for days, not hours.",
      ],
      productIds: [
        "anker-solix-c300-portable-power",
        "ecoflow-river-2-pro-portable",
        "jackery-explorer-1000-v2-portable",
      ],
    },
    {
      heading: "Who it's for — and who should skip a battery this size",
      list: [
        "One or two car-camping nights, humidifier off|The SOLIX C300 is ideal: silent, light, cheap, and its 288Wh clears two blower-only nights with margin. This is the most common CPAP-camper and the C300 is built for exactly it.",
        "Humidifier-on sleeper, or 3+ nights off-grid|Skip the smallest unit. A heated humidifier turns one night into ~400Wh, so you want the RIVER 2 Pro's 768Wh (or larger) to actually make it to morning with margin.",
        "Van life, week-long stays, or home-outage backup too|The Jackery 1000 v2 earns its weight: multiple humidifier nights, plus enough inverter to run a fridge or charge everything else in camp or during a blackout.",
        "You have shore power or a running vehicle|If your site has a power pedestal, or you can idle a vehicle and run the CPAP off a proper DC setup, you may not need a station at all — don't buy watt-hours you'll never use.",
        "You need to fly with it|None of these clear the airline 100Wh carry-on limit — they can't fly. Air travelers need a CPAP-specific travel battery under 100Wh, a different product entirely.",
      ],
    },
    {
      heading: "Failure modes people hit off-grid",
      list: [
        "Sizing to the blower, forgetting the humidifier|The single most expensive mistake. A 288Wh unit that's perfect humidifier-off dies mid-night humidifier-on. Decide your humidifier setting before you buy, and plan on the higher number.",
        "Running the AC inverter for a tiny load|The inverter's idle draw is a big fraction of a 12W CPAP, quietly shortening your night. Use your machine's DC/USB-C cable off the station's DC ports when it offers one.",
        "The fan that pulses all night|A station that cycles its fan under light load is miserable beside your head. This is why the near-silent smaller unit can beat a bigger, noisier one for a bedside overnight.",
        "Buying the DC-only version by accident|Some compact stations ship in an AC model and a cheaper USB-only DC model under nearly the same name. The DC one has no wall outlet for your machine — confirm 'AC output' on the listing.",
        "Arriving with a half-empty battery|LiFePO4 packs self-discharge slowly and cold saps output. Top the station to full the day you leave, and keep it out of overnight cold when you can.",
        "Trusting a modified-sine inverter|A non-pure-sine source can make a humidified CPAP run hot or error out. If a unit doesn't say 'pure sine wave,' don't run a medical device on it.",
      ],
    },
    {
      heading: "How we researched this",
      body: [
        "We compared each station's published capacity, inverter type and wattage, port layout, recharge time, and noise rating against patterns in long-term owner reviews. We did not lab-test these units or measure any CPAP on a bench — the runtime figures are transparent arithmetic (usable watt-hours at a stated ~85% efficiency factor, divided by typical CPAP draw), shown so you can redo them with your own machine's rated watts.",
        "CPAP draw ranges are typical figures across common travel machines, not a claim about any specific model; your machine's label is the authority. Prices are approximate and drift with sales — check the live listing on each product page before buying.",
      ],
    },
  ],
  faq: [
    {
      q: "What size power station do I need to run a CPAP overnight while camping?",
      a: "It depends almost entirely on your humidifier. Blower-only (humidifier off) an 8-hour night uses roughly 65-120Wh, so a 288Wh station like the Anker SOLIX C300 covers one or two nights. Run the heated humidifier and tube and a night can hit 320-480Wh, so you'll want a 768Wh EcoFlow RIVER 2 Pro or larger to clear the night with margin.",
    },
    {
      q: "Does a CPAP need a pure sine wave power station?",
      a: "Yes — especially with a humidifier. CPAP power supplies expect the clean AC waveform a wall outlet delivers, and a cheap modified-sine inverter can make a sensitive supply run hot, buzz, or error out. The Anker SOLIX C300, EcoFlow RIVER 2 Pro, and Jackery 1000 v2 all output pure sine wave. If you shop elsewhere, confirm 'pure sine wave' before trusting your machine to it.",
    },
    {
      q: "How can I make a power station last more nights for my CPAP?",
      a: "Turn the humidifier and heated tube off if you can tolerate it — that alone can triple your runtime. Where your machine supports it, run from the station's DC or USB-C output instead of the AC outlet to skip the inverter's idle draw. Start every trip topped to full, and keep the battery out of overnight cold, which saps lithium output.",
    },
    {
      q: "Will an Anker SOLIX C300 run a CPAP all night?",
      a: "With the humidifier off, comfortably — its ~245Wh of usable energy covers roughly two blower-only nights, and at around 25 dB it's quiet enough to sit beside your pillow. With the heated humidifier and tube on, a night can pull 320-480Wh, which its 288Wh can't clear, so humidifier-on sleepers should step up to the EcoFlow RIVER 2 Pro.",
    },
    {
      q: "Can I take these power stations on a plane for CPAP use?",
      a: "No. Airlines cap spare lithium batteries at 100Wh in carry-on without approval, and all three of these (288Wh, 768Wh, 1070Wh) are far over that limit, so they can't fly. For air travel you need a CPAP-specific travel battery rated under 100Wh — a different product from the camping stations here.",
    },
  ],
  relatedGuides: ["roadside-emergency-kit"],
  sources: [
    { label: "Anker SOLIX C300 official product page", url: "https://www.anker.com/products/a17260z1" },
    { label: "EcoFlow RIVER 2 Pro official product page", url: "https://www.ecoflow.com/us/river-2-pro-portable-power-station" },
    { label: "Jackery Explorer 1000 v2 official specifications", url: "https://www.jackery.com/collections/portable-power-stations" },
    { label: "FAA guidance on portable batteries and watt-hour limits", url: "https://www.faa.gov/hazmat/packsafe/lithium-batteries" },
  ],
  heroImage: "/products/scene/anker-solix-c300-portable-power.png",
};
