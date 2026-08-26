import type { Article } from "@/lib/articles";

/**
 * Long-tail buyer-intent article.
 * Target keyword: "can a portable power station run a space heater"
 * (siblings on the same ladder: "how long can a portable power station run a space heater",
 * "can you run a space heater on a portable power station", "what size power station for
 * space heater" — all returned by Google autocomplete, all answered on this one page.)
 *
 * WHY THIS PAGE EXISTS (commercial reasoning, 2026-08-26):
 * The honest answer to this query is mostly NO, which is exactly why it is winnable. The live
 * SERP is ten small affiliate blogs, every one of them incentivised to end at "yes, buy this
 * one". A page that runs the arithmetic out loud and tells a share of readers not to buy is the
 * differentiated angle, and it still routes correctly: the readers whose real need is a short
 * bridge get pointed at our two highest-AOV units ($399-699 and $449-799), and the readers whose
 * real need was never heat get pointed at the compact that actually fits it.
 *
 * Honesty laws respected: no "we tested" — nobody here has run a heater off any of these. No
 * republished Amazon star ratings or review counts. Every watt-hour, inverter and weight figure
 * comes from our catalog JSON or the named manufacturer and is attributed in the prose. The
 * heater wattage is always presented as the READER'S own nameplate number, never a spec we
 * assert. The EcoFlow X-Boost caveat is quoted from our catalog's buying notes rather than
 * invented. Downsides come from the catalog's real `cons` arrays.
 *
 * ⛔ HONESTY AUDIT 2026-08-26 — what the first draft got wrong, so nobody re-adds it:
 *   1. THREE OF SIX SOURCE URLS WERE DEAD. `ecoflow.com/us/river-2-pro-portable-power-station`
 *      404s (the live page is `us.ecoflow.com/products/...`); `energy.gov/energysaver/small-
 *      space-heaters` 404s (verified again on the second pass) and the DOE Energy Saver page is
 *      gone; `bluettipower.com/products/bluetti-ac180-portable-power-station` is a redirect
 *      loop (never resolves — still looping past 30 hops on the second pass) while
 *      `/products/ac180` returns 200. All checked with curl, not assumed.
 *   2. "EcoFlow's own description ... is by lowering the supply voltage, which means the heater
 *      runs derated" was NOT on any EcoFlow page we can reach and is not in our catalog. Removed.
 *      A mechanism attributed to a manufacturer that the manufacturer never published is a
 *      fabricated citation even when the underlying engineering is probably right.
 *   3. answerFirst quoted the STICKER runtime (45 min) while the table and FAQ quoted the
 *      derated one (39 min) — the page's most-read sentence disagreed with its own arithmetic.
 *   4. "Solar is a separate purchase on all of these" — the catalog says that about the AC180
 *      only. Generalising one catalog line across four products is inventing three specs.
 *   5. A window-air-conditioner BTU comparison had no source (and compared heat output against
 *      cooling capacity). Cut; the watt→BTU conversion factor is now shown instead.
 *   6. The ~85% inverter figure is a STATED PLANNING ASSUMPTION, matching the CPAP page's
 *      wording, not a measurement of these units. Say so wherever the table is explained.
 *
 * ⛔ SECOND ADVERSARIAL PASS 2026-08-26 — what the first audit's own comment got wrong, plus
 * what its fixes missed. Every source URL below was re-fetched and read, not status-checked.
 *   A. THE AUDIT COMMENT ITSELF CARRIED AN INVENTED COUNT: "eight other links to it survive
 *      elsewhere in lib/articles — they are dead too". There are ZERO. A site-wide grep for
 *      `energy.gov` returns four hits: this comment, and three copies of
 *      `energy.gov/cmei/buildings/portable-air-conditioners`, a different path in a different
 *      section. A fabricated number inside an honesty audit is the same defect the audit was
 *      written to catch. Corrected above. The other three claims in that block re-verified true
 *      (ecoflow `/us/` 404, DOE 404, BLUETTI long slug still looping past 30 hops).
 *   B. FIX 4 WAS APPLIED TO ONE OF TWO IDENTICAL SITES. The prose stopped generalising the
 *      AC180's solar-sold-separately line across four products; the bullet list two sections
 *      later still said "Solar is sold separately on these units". Half a fix is not a fix.
 *   C. "a 20ms UPS switchover and a 0-80% recharge in 45 minutes, both BLUETTI's published
 *      figures" — bluettipower.com/products/ac180 publishes "0-80% Recharging in 45Mins with
 *      1,440W AC Input" but contains the string "UPS" ZERO times. The 20ms figure is ours, from
 *      the catalog. Attributing a catalog line to the manufacturer page you cite is the same
 *      species as the SACC/energystar.gov defect found in the sibling article. Re-attributed.
 *   D. THE PAGE CONTRADICTED ITS OWN CITED SOURCE. We repeated the catalog's "X-Boost will not
 *      run a 1,500W microwave" while linking an EcoFlow page that advertises X-Boost for exactly
 *      "a hair dryer, microwave or electric kettle". The catalog's resistive-loads-only limit
 *      stands and is still quoted; the microwave example is gone. What EcoFlow's page DOES say
 *      is now quoted directly, because it makes the point better: "RIVER 2 Pro has an AC output
 *      of up to 800W... Crank it up to 1600W with X-Boost mode." A mode is not a rating.
 *   E. THE NEC PARAGRAPH DISAGREED WITH ITSELF: it derived a 1,440W continuous ceiling and then
 *      said "that is why" heaters are 1,500W. 1,500W is 12.5A, ABOVE 1,440W. Kept both numbers,
 *      named the gap, and made the gap the reason the manual demands a dedicated outlet.
 *   F. Three unsourced quantities removed — "real heaters can pull marginally above their
 *      nameplate", "a few hundred watts of blower", "most LiFePO4 packs specify a minimum
 *      charging temperature". The last is now a real attributed spec instead: EcoFlow's RIVER 2
 *      Pro spec table gives "Charge Temperature 32°F to 113°F". Read on the page, not inferred.
 *   G. Verified clean, do not re-flag: every runtime in both tables recomputes exactly at the
 *      stated 0.85 factor; $4,800-$8,400 is 12 x the catalog's own $399-699 band; all four
 *      Amazon ASINs return 200 and their titles corroborate every capacity/inverter/surge figure
 *      used; all three relatedGuides slugs resolve; no "we tested"; no star ratings or review
 *      counts (BLUETTI's page shows "4.8 (511 reviews)" — deliberately not republished).
 */
export const CAN_A_PORTABLE_POWER_STATION_RUN_A_SPACE_HEATER: Article = {
  slug: "can-a-portable-power-station-run-a-space-heater",
  title: "Can a Portable Power Station Run a Space Heater?",
  dek: "Briefly — and the arithmetic is the whole story. A space heater is the single most power-hungry thing you are likely to plug in, and it never cycles off. Here is the equation, run against four real stations, and the honest verdict on when this purchase makes sense and when it doesn't.",
  category: "Power & Charging",
  readMinutes: 11,
  updated: "August 2026",
  answerFirst:
    "Yes, briefly — and that is the whole problem. A 1,500W space heater draws more power than almost anything else you own, and a 1,152Wh station like the BLUETTI AC180 covers roughly 40 minutes of it once conversion losses are counted. Nothing in the 1kWh class gives you overnight heat. Buy one for a short bridge, or don't buy one for heat at all.",
  sections: [
    {
      heading: "Why the arithmetic is this brutal: a space heater has no duty cycle",
      body: [
        "Every other appliance you might plug into a power station is, in energy terms, mostly switched off. A refrigerator's compressor runs roughly 30-40% of the time and coasts the rest. A CPAP averages a small fraction of its peak. A phone charges for an hour and then sits there drawing nothing. That gap between what a device is rated at and what it actually consumes over an hour is what makes a 1,000Wh box useful at all.",
        "A resistive space heater has no such gap, and understanding why makes the rest of this page obvious. A heater is not a machine that does work and gives off heat as a side effect — heat is the entire product. It is a coil of high-resistance wire, and essentially every watt you feed it comes back out as warmth. There is no efficiency to engineer, no clever compressor, no standby. Set it to 1,500W and it draws 1,500W, continuously, for as long as it is on.",
        "The only thing that can interrupt that is the thermostat, and in the situation that makes people search this question — a winter power outage, a cold garage, a tent, an unheated cabin — the thermostat is chasing a target it will not reach. A heater trying and failing to warm a cold room is a heater running at 100% duty cycle indefinitely. So unlike the fridge sizing question, where the duty cycle rescues the maths, here you do the naive calculation and the naive calculation is the truth:",
        "Watt-hours in the battery, divided by the watts on the heater's label, equals hours of heat. That is it. That is the entire model. A 1,152Wh station and a 1,500W heater gives you 1152 / 1500 = 0.77 hours — about 46 minutes on paper, and less than that in practice for reasons covered below.",
        "This is also why the spec everyone shops on is the wrong one. Buyers compare inverter watts — 800W versus 1,500W versus 1,800W — because that number is on the front of the box. For a space heater the inverter rating only decides whether the heater turns on at all. Once it is on, capacity in watt-hours decides everything that matters, and a bigger inverter with the same battery buys you nothing but a faster drain.",
      ],
    },
    {
      heading: "The 1,500W on your heater is not a design choice — it's the wall socket's ceiling",
      body: [
        "Worth a short detour, because it reframes what you should expect from a plug-in heater even when the grid is up.",
        "A standard North American household circuit is 120 volts at 15 amps, which is 1,800 watts of theoretical capacity. The US National Electrical Code's continuous-load rule — a load that runs three hours or more — requires the circuit to be sized at 125% of that load, which is the same thing as capping a continuous load at 80% of the breaker: 1,440W on a 15-amp circuit. Plug-in heaters sold in the US stop at 1,500W, which is 12.5 amps — above that 1,440W continuous figure and still inside the breaker's 15. That is the whole reason the manual tells you to give the heater its own outlet, nothing else on the circuit, and no extension cord: it is not merely a large load for a socket, it is a load sitting right at the edge of what one socket is meant to carry all evening. It is not the manufacturers being conservative; it is the socket being the limit.",
        "Convert 1,500W into the unit heating equipment is usually sold in — one watt is 3.412 BTU per hour — and it comes to roughly 5,100 BTU/h. That is a small fraction of what a whole-home furnace is built to produce. A plug-in heater was never whole-house heat, even on mains power. It is a device for making one small, closed room tolerable while the rest of the building stays cold.",
        "Hold on to that, because it is the honest frame for the whole purchase. You are not asking whether a battery can replace your heating system. You are asking whether a battery can run a device that was already only ever good for one room — and the answer is: for a while, and the while is short.",
      ],
    },
    {
      heading: "The arithmetic, run against four real stations",
      body: [
        "Here are the numbers from our catalog, run against the three heater settings you are most likely to have. Capacities and inverter ratings are the manufacturers' published figures as recorded in our catalog: BLUETTI AC180, 1,152Wh with an 1,800W inverter (2,700W peak); Jackery Explorer 1000 v2, 1,070Wh with a 1,500W inverter (3,000W surge); EcoFlow RIVER 2 Pro, 768Wh with an 800W native AC output; Anker SOLIX C300, 288Wh with a 300W AC output.",
        "Every figure in the table is derated, not sticker arithmetic. Turning the battery's DC into 120V AC costs some of the pack, so the table applies a flat 85% factor to every station's rated capacity — a stated planning assumption we apply across the site, not a measurement of these units, and printed here so you can redo the sum with a different number if you prefer. On that assumption a 1,152Wh pack delivers closer to 980Wh of usable AC energy and a 1,070Wh pack lands near 910Wh. Cold shaves more off again — and a heater is something you only ever want when it is cold, which is a trap worth naming: the moment you most need this box is the moment it is holding the least.",
        "The heater wattages across the top are your numbers to supply, not ours. Read the label on the back of your own unit, or the plate on its underside. Most ceramic and oil-filled units are marked with a high and a low; the low is usually half the high.",
      ],
      table: {
        caption:
          "Realistic runtime after inverter losses (~85% of rated capacity). Heater wattage is the reader's own nameplate figure.",
        columns: [
          "Station (capacity / continuous AC)",
          "1,500W (typical high)",
          "750W (typical low)",
          "400W (small personal heater)",
        ],
        rows: [
          [
            "BLUETTI AC180 (1,152Wh / 1,800W)",
            "~39 min",
            "~1 hr 18 min",
            "~2 hr 27 min",
          ],
          [
            "Jackery Explorer 1000 v2 (1,070Wh / 1,500W)",
            "~36 min",
            "~1 hr 13 min",
            "~2 hr 16 min",
          ],
          [
            "EcoFlow RIVER 2 Pro (768Wh / 800W)",
            "Will not run it on the native output",
            "~52 min",
            "~1 hr 38 min",
          ],
          [
            "Anker SOLIX C300 (288Wh / 300W)",
            "No — 300W ceiling",
            "No — 300W ceiling",
            "No — 300W ceiling",
          ],
        ],
      },
    },
    {
      heading: "What overnight heat would actually cost, so nobody has to guess",
      body: [
        "The question underneath the question is almost always the same one: can this get me through the night? Put a number on it rather than hedging.",
        "Eight hours of a 1,500W heater is 12,000 watt-hours of heat, and about 14,000Wh of battery once you account for inverter losses. That is roughly twelve BLUETTI AC180s. At our catalog's listed price range for that unit, twelve of them is somewhere between $4,800 and $8,400 of battery — arithmetic on our own price band, not a quote — to replace one appliance for one night. Drop the heater to its 750W low and you still need something like six of them.",
        "Nothing about that changes with a cleverer brand. It is the physics of storing heat in lithium instead of making it from fuel or from the grid. This is the point at which the honest recommendation stops being a product: if your requirement is genuinely heat-through-the-night when the power is out, you are looking for a fuel-burning appliance or a standby generator, and we do not sell either. We would rather say so than sell you the wrong box.",
        "One more thing the listings never mention: in an outage you get exactly one tank. The AC180 recharges 0-80% in 45 minutes and the RIVER 2 Pro goes 0-100% in about 70 — both manufacturer figures, both carried in our catalog, and both of them AC-input figures, which is to say both assume a live wall socket. During a power cut there is no live wall socket. Our catalog says the AC180's solar panel is sold separately; on the others, read the box contents before assuming a panel is included. A panel in December produces well below its rated watts, and a pack that has gone cold may refuse the charge even when the sun cooperates: EcoFlow's spec sheet for the RIVER 2 Pro gives a charge temperature range of 32–113°F, and pushing charge into any lithium cell below freezing is the one thing that does permanent damage, which is why a well-built battery management system simply declines. Find the charge-temperature line on your own model's spec sheet before you plan around solar. Whatever is in the battery when the lights go out is the whole supply.",
      ],
    },
    {
      heading: "Can it even switch on? The inverter ceiling, and EcoFlow's X-Boost asterisk",
      body: [
        "Runtime is one gate; starting is the other, and they fail differently. If the heater's draw exceeds the station's continuous AC rating, the overload protection cuts the outlet and you get nothing at all — not a shorter run, nothing.",
        "The good news is that a resistive heater is easy on an inverter in one specific way. Unlike a fridge compressor or a pump, it contains no induction motor, so there is no large inrush spike at switch-on — the fan in a ceramic unit draws a trivial amount next to the element. Surge and peak ratings, the numbers that decide the refrigerator question, are close to irrelevant here. What matters is the plain continuous rating.",
        "That produces one uncomfortable edge case worth flagging honestly: the Jackery Explorer 1000 v2's continuous output is 1,500W, and a 1,500W heater is a 1,500W load. That is zero headroom: the load sits exactly on the line, leaving nothing spare for a second device on the same station and nothing spare for tolerance in either direction. Expect it to run, expect no margin, and note that at 36 minutes of runtime the question is fairly academic either way.",
        "The EcoFlow RIVER 2 Pro needs its own paragraph because its box carries two numbers and only one of them is the one that governs. Its native AC output is 800W. The 1,600W figure is X-Boost, and EcoFlow's own product page is the clearest evidence for how to read it: the page says the RIVER 2 Pro has an AC output of up to 800W, then describes 1,600W as what you get when you switch X-Boost mode on. A mode is not a rating. Our catalog's buying notes add the limit that mode carries — it applies to resistive loads only. A heater is a resistive load, so it is the class of appliance X-Boost is aimed at. What this page will not do is put a number on the heat you would get out of it: X-Boost is a workaround mode rather than a bigger inverter, nobody here has run a heater on one, and either way the energy still comes out of a 768Wh pack — under an hour of it even at a 750W low setting. Our catalog's own guidance for this unit names space heaters in its skip list, and this page is not going to contradict it. If a heater is the reason you are shopping, the RIVER 2 Pro is the wrong unit unless you are running it on a low setting inside its native 800W.",
        "The Anker SOLIX C300 sits at the other end: 288Wh and a 300W AC output. There is no space heater setting that fits under 300W, and nobody should buy this unit expecting heat. It appears on this page for a different reason, further down.",
      ],
      table: {
        caption:
          "Will it start? Continuous AC output versus the heater's nameplate draw (surge ratings are near-irrelevant for a resistive heater).",
        columns: [
          "Your heater's nameplate",
          "AC180 (1,800W)",
          "Jackery 1000 v2 (1,500W)",
          "RIVER 2 Pro (800W native)",
          "SOLIX C300 (300W)",
        ],
        rows: [
          ["1,500W — high on a standard ceramic or oil-filled unit", "Yes", "At the ceiling, no headroom", "No — 800W native (X-Boost mode only, see above)", "No"],
          ["750W — low on that same unit", "Yes", "Yes", "Yes", "No"],
          ["400W — small personal or under-desk heater", "Yes", "Yes", "Yes", "No"],
          ["200-250W — a small radiant panel, or a heated blanket on high", "Yes", "Yes", "Yes", "Yes (~1 hour)"],
        ],
      },
      productIds: ["ecoflow-river-2-pro-portable", "anker-solix-c300-portable-power"],
    },
    {
      heading: "The one lever that genuinely changes the answer",
      body: [
        "Everything above assumes the worst case, which is the case most people are actually in. But there is one combination that moves the number meaningfully, and it is not a product — it is how you use the heater.",
        "Halving the watts doubles the hours. That is the direct consequence of the equation, and it is the only lever with real leverage. A 1,500W heater on its 750W low turns 39 minutes on the AC180 into about an hour and eighteen. A genuinely small 400W personal heater turns it into nearly two and a half hours. Nothing about the battery changed; you changed the rate you drain it.",
        "And low is not simply half the heat you wanted — it is half the heat delivered over twice the time, which is exactly the same total energy. If your goal is to hold a small room at a tolerable temperature rather than to blast it warm, low plus a longer run is strictly better use of a fixed tank. High only wins when you need heat immediately and briefly.",
        "The second half of the lever is the room. The duty-cycle argument that rescues a refrigerator can rescue a heater too, but only if the thermostat can actually reach its setpoint and shut off. In a sealed bedroom with the door closed and a towel at the gap, a heater may cycle. In a garage, a tent, a van, or a whole open-plan floor, it will not — it runs flat out until the battery quits. Shrinking the space you are heating is the difference between the arithmetic on this page and something better than it.",
      ],
      list: [
        "Run the low setting, always|It is the single biggest change available and it costs nothing. Half the watts is double the hours for the same total energy delivered.",
        "Shrink the room before you shrink the heater|One closed room, door shut, gaps blocked. A thermostat that can reach its target starts cycling off, and every minute off is a minute of runtime returned.",
        "An accurate thermostat is worth more than a bigger battery|A heater with a real thermostat and an eco mode can idle. A dial marked low/medium/high with no sensor cannot. Check which one you own before you plan around cycling.",
        "Preheat while you still have grid power|If an outage is forecast, warm the room from the wall and save the battery for holding, not raising, the temperature.",
        "Keep the station out of the cold|Capacity falls as the pack gets cold, and it is coldest exactly when you need it. Store it in the warm part of the building, not in the space you are about to heat.",
        "Do not plan on a recharge|One tank is the supply. Our catalog says the AC180's solar panel is a separate purchase, so read the box contents on whichever unit you buy; winter panel output is well below rated; and a pack that has gone cold may refuse to charge at all.",
      ],
    },
    {
      heading: "If a short bridge is genuinely what you need, buy the capacity",
      body: [
        "There is a legitimate version of this purchase, and it deserves a straight recommendation rather than a warning. It is the reader who wants forty minutes to two hours of heat for a specific, bounded reason: taking the chill off a bedroom before getting into bed, warming a job site or workshop corner for a task, holding a small tent or van liveable at the coldest part of the evening, bridging the gap while a generator gets fetched and started. For that job the equation is friendly, and the choice between our two largest units comes down to two specs.",
        "The BLUETTI AC180 is the most runtime of the four, full stop: 1,152Wh of LiFePO4 and an 1,800W inverter, which is the only one of the four with genuine headroom above a 1,500W nameplate. BLUETTI's own product page publishes the recharge figure — 0-80% in 45 minutes on a 1,440W AC input — and our catalog additionally records a 20ms UPS switchover, which is the spec that matters if the reason you are shopping is a house that keeps losing power. The honest costs, from our catalog's own notes: it is around 35 lb, which makes it a haul-it-there unit rather than a carry-it-around one; the solar panel is a separate purchase; and the cooling fan is audible under heavy load — and running a heater is the definition of heavy load, so expect to hear it.",
        "The Jackery Explorer 1000 v2 gives up 82Wh of capacity — about three minutes of heater time, which is nothing — and 300W of inverter headroom, in exchange for being 23.8 lb instead of 35. That is the trade: eleven pounds is the difference between a box you will actually carry to the tent and one you will leave in the garage. Jackery lists it at 1,070Wh with a 1,500W inverter and roughly a one-hour recharge. Our catalog's notes are worth repeating: the MSRP is $799 but it is frequently deep-discounted, so buying it at full price is a mistake, and the handle folds but it is still a two-hand lift.",
        "Neither of these is a heat product and neither should be bought as one. What makes them worth the money is that the same battery that gives you forty minutes of heater gives you days of phones, a night of CPAP, most of a day of refrigerator, and a router that keeps working. Heat is the most expensive possible thing to ask of them and the last thing they are good at. Buy for the whole job, use the heater as the emergency option it is, and the purchase makes sense. Buy for the heater alone and you will be disappointed inside an hour.",
      ],
      productIds: [
        "bluetti-ac180-portable-power-station",
        "jackery-explorer-1000-v2-portable",
      ],
    },
    {
      heading: "Better answers to a cold house — including the one nobody mentions",
      body: [
        "A real share of people who search this are not attached to the space heater; they are attached to not being cold, and the heater is simply the device they own. Four alternatives worth weighing before spending several hundred dollars on battery.",
        "Heat the person, not the room. This is the highest-leverage move available and it is barely a purchase. The energy required to keep a body warm under insulation is a rounding error next to the energy required to raise the temperature of an entire volume of air that is constantly leaking through the walls. Layers, a proper sleeping bag, a blanket over a chair to make a small enclosure. Read the two nameplates side by side and the gap is obvious: a heated throw or heated vest is rated at a small fraction of a room heater's watts, because it is warming a body rather than a volume of air. The battery you already own can run the first for hours and the second for minutes.",
        "Run the heating system's controls instead of a heater. This is the one nobody mentions, and in a winter power outage it is often the correct answer. If your home has a gas or propane furnace, the heat itself comes from fuel — what the outage took away is the electricity for the blower and the control board. Restoring the blower can restore the entire heating system, and a blower is a far smaller electrical load than the heat it moves around — which makes it an enormously better use of 1,000Wh than making 5,100 BTU an hour from lithium. Your furnace's data plate carries its own figure, and that is the number to size against rather than any rule of thumb. The honest caveats matter: a furnace is hardwired, so this needs a transfer switch or an interlock installed by an electrician, not an extension cord; the blower is an induction motor with a real startup surge, so the station's peak rating matters here in a way it does not for a heater; and some furnaces draw more than a 1kWh-class unit can supply for long. Ask an electrician what your specific furnace needs before assuming it works. But if it does work, it changes the answer completely.",
        "Buy the unit that fits the job you actually have. Strip the heater out of the scenario and what most people need from a power station during an outage is undramatic: phones, a laptop, a CPAP, a router, a lamp, a fan. That is the Anker SOLIX C300's brief — 288Wh and a genuine 300W AC output with 140W two-way USB-C and eight ports, at a fraction of the price of the big units. Our catalog flags the trap on this one: two versions exist, and the cheaper C300 DC model is USB-only, so buy the AC model if you want wall-outlet devices, and check whether the listing includes the wall charger. It will never run a heater. It was never going to.",
        "Accept that backup heat is a different category. If the requirement is a cold house made liveable for a full night or several days, the answer is a fuel-burning appliance, a properly installed standby generator, or leaving for somewhere warm — not a portable battery. Anyone telling you a 1kWh box covers that is selling you something. We would rather lose the sale than have you find out at 3am.",
      ],
      productIds: ["anker-solix-c300-portable-power"],
    },
  ],
  faq: [
    {
      q: "Can a portable power station run a 1,500W space heater?",
      a: "It can power one if the station's continuous AC output clears 1,500W — the BLUETTI AC180's 1,800W inverter does, and the Jackery Explorer 1000 v2's 1,500W sits exactly at the line with no headroom. What it cannot do is run one for long. A 1,152Wh pack delivers roughly 980Wh after inverter losses, which is about 39 minutes at 1,500W. The station starting the heater is never the constraint; the watt-hours are.",
    },
    {
      q: "How long will a 1,000Wh power station run a space heater?",
      a: "Divide usable watt-hours by the heater's nameplate watts. A 1,070Wh unit like the Jackery Explorer 1000 v2 gives roughly 910Wh of usable AC energy, so about 36 minutes at 1,500W, about 1 hour 13 minutes at a 750W low setting, and around 2 hours 16 minutes with a 400W personal heater. There is no duty cycle to stretch those figures the way there is with a refrigerator — a heater in a cold room runs continuously.",
    },
    {
      q: "Can a power station run a space heater overnight?",
      a: "No, not in the portable class. Eight hours at 1,500W is 12,000 watt-hours of heat and roughly 14,000Wh of battery after conversion losses — about twelve BLUETTI AC180s. Even on a 750W low setting it is around six of them. If overnight heat during an outage is the actual requirement, that is a fuel-burning appliance or a standby generator question, not a portable power station question.",
    },
    {
      q: "Will the EcoFlow RIVER 2 Pro run a space heater with X-Boost?",
      a: "Its native AC output is 800W, so a 1,500W heater is above what it can supply normally. The 1,600W X-Boost figure applies to resistive loads only, per our catalog's buying notes for that unit, and EcoFlow lists it as a separate mode rather than as the unit's AC rating. We have not run a heater on one and will not guess at the heat it would produce; what is certain is that the energy comes out of a 768Wh pack either way, and our catalog names space heaters in this unit's skip list. On a 750W low setting it works fine within its native output, for roughly 52 minutes.",
    },
    {
      q: "Does the surge rating matter for a space heater?",
      a: "Much less than it does for a refrigerator or a pump. Those contain induction motors that pull a large inrush spike at startup, which is why surge ratings decide whether they run at all. A resistive heater has no motor beyond a small fan, so it draws close to its nameplate from the first instant. For a heater, the number to check is the continuous AC output, and then the watt-hours.",
    },
    {
      q: "Is running a space heater off a power station cheaper than off the wall?",
      a: "No. A battery is a container, not a source — the electricity inside it came from the same wall outlet, minus the losses of charging it and inverting it back to AC. Running a heater from a station at home costs strictly more than running it from the socket. The only thing a power station buys you is independence from the socket, which is worth a great deal during an outage and nothing at all on a normal Tuesday.",
    },
  ],
  relatedGuides: [
    "what-size-power-station-to-run-a-refrigerator-in-a-power-outage",
    "do-power-stations-work-in-cold-weather",
    "best-power-stations-compared",
  ],
  // Every URL below was fetched on 2026-08-26 and returned 200. The three that did not survive
  // that check — EcoFlow's `/us/river-2-pro-portable-power-station` (404), the DOE Energy Saver
  // space-heater page (404, section retired), and BLUETTI's long product slug (redirect loop) —
  // were replaced or removed rather than left as decoration. Re-check before adding another.
  sources: [
    {
      label: "BLUETTI AC180 official specifications",
      url: "https://www.bluettipower.com/products/ac180",
    },
    {
      label: "BLUETTI AC180 — Amazon listing",
      url: "https://www.amazon.com/dp/B0C1SMJTDT?tag=blackboxsuppl-20",
    },
    {
      label: "Jackery Explorer 1000 v2 — Amazon listing",
      url: "https://www.amazon.com/dp/B0D7PPG25F?tag=blackboxsuppl-20",
    },
    {
      label: "EcoFlow RIVER 2 Pro official specifications (800W output, X-Boost to 1,600W)",
      url: "https://us.ecoflow.com/products/river-2-pro-portable-power-station",
    },
    {
      label: "EcoFlow RIVER 2 Pro — Amazon listing",
      url: "https://www.amazon.com/dp/B0BVLPGS79?tag=blackboxsuppl-20",
    },
    {
      label: "Anker SOLIX C300 — Amazon listing",
      url: "https://www.amazon.com/dp/B0D62GMQ3F?tag=blackboxsuppl-20",
    },
  ],
  heroImage: "/products/scene/bluetti-ac180-portable-power-station.webp",
  picks: [
    {
      id: "bluetti-ac180-portable-power-station",
      cat: "useful",
      label: "Most runtime of the four",
    },
    {
      id: "jackery-explorer-1000-v2-portable",
      cat: "useful",
      label: "Nearly as much, 11 lb lighter",
    },
    {
      id: "ecoflow-river-2-pro-portable",
      cat: "useful",
      label: "Only on a low setting",
    },
    {
      id: "anker-solix-c300-portable-power",
      cat: "useful",
      label: "If the real job is devices, not heat",
    },
  ],
};
