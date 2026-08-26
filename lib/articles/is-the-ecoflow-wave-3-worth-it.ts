import type { Article } from "@/lib/articles";

/**
 * Long-tail buyer-intent page. Self-contained: the orchestrator wires it into
 * EXTRA_ARTICLES (lib/articles-extra.ts) with one import line + one array entry.
 * No shared file is touched here.
 *
 * Target keyword: "is the ecoflow wave 3 worth it" — Google autocomplete's #1
 * completion for the seed 'is the ecoflow wave 3', with siblings 'any good' and
 * 'a heat pump' (both answered explicitly in the FAQ below).
 *
 * INTERNAL SPLIT — read before editing:
 * lib/articles/best-battery-powered-portable-ac-for-tent-camping-off-grid.ts already
 * owns the CATEGORY query ("which battery AC should I buy for camping"). This page is
 * the BRAND+MODEL VERDICT query — a different SERP shape, a different reader intent
 * (they have already picked the product and want permission or a reason not to). The
 * two pages cross-link and must NOT converge: keep the power-station runtime TABLE and
 * the head-to-head spec grid on the off-grid page, and keep the total-cost arithmetic,
 * the rating-standards explanation and the heat-pump mechanism here.
 *
 * WHY THIS PAGE EXISTS (commercial reasoning, 2026-08-26):
 * MEASURED against the merged catalog (135 priced items): the median product's price-range
 * midpoint is $70. The WAVE 3's midpoint is $1,199 — the highest of all 135, not merely the
 * highest in cooling. Commission per sale therefore scales with it. (The commission RATE is
 * an assumption, not a measurement: Amazon's rate varies by category and we have not pulled
 * our own reports, so no dollar-per-sale figure is asserted here.)
 * NOT asserted: any claim about who currently ranks on this SERP. An earlier draft of this
 * comment said "four low-authority affiliate blogs currently hold page-one slots" — no search
 * was ever run, and that count was invented precision. Withdrawn 2026-08-26.
 *
 * Honesty laws respected:
 *  - Never "we tested" / "we measured" — nobody here has.
 *  - No Amazon star ratings or review counts reproduced anywhere (Associates risk).
 *  - Every BTU, decibel, watt-hour and price figure traces to our catalog JSON or the
 *    manufacturer, and is attributed in the prose as such.
 *  - Every source URL is fetched before it ships. ⛔ AUDIT 2026-08-26 caught two that were
 *    not: https://www.ecoflow.com/us/wave-3 is a hard 404 (the live page is
 *    /us/wave-3-portable-air-conditioner), and the ENERGY STAR room-AC page was cited as
 *    explaining "how SACC and DOE ratings differ" when that page contains the strings
 *    "SACC", "portable" and "Seasonally Adjusted" exactly zero times. A citation invented
 *    from a plausible URL is the same failure as a spec inferred from a product name.
 *    Both are removed; the SACC/DOE reasoning now rests on our own catalog, which carries
 *    both numbers for the same two machines. The dead EcoFlow link was also fixed on the
 *    sibling off-grid page, which had inherited both errors.
 *  - The catalog's own `cons` array supplies the negative case verbatim in substance:
 *    the battery is a separate add-on that raises total cost significantly, 6,100 BTU
 *    is a small-space rating, the price is a premium, runtime collapses at full power.
 *  - Where a spec is unknown (the WAVE 3's rated input wattage, its test standard, its
 *    battery's Wh), the page SAYS it is unknown and gives the reader the formula and the
 *    place to look. An inference that defaults to a claim is a lie with a fallback.
 *  - Cost-per-night arithmetic is done on the two published endpoints of our catalog's
 *    price range and names everything it excludes.
 */
export const IS_THE_ECOFLOW_WAVE_3_WORTH_IT: Article = {
  slug: "is-the-ecoflow-wave-3-worth-it",
  title:
    "Is the EcoFlow WAVE 3 Worth It? The Honest Case For and Against the $899-$1,499 Battery Air Conditioner",
  dek: "The WAVE 3 is not expensive because it cools well — it is expensive because it cools where nothing else can. That makes it either the only product that solves your problem or the most costly way to be disappointed, with almost nothing in between. Here is the line that separates the two, the total cost the listing does not show you, and the spec everyone judges it on that turns out to be the wrong one.",
  category: "Cooling",
  readMinutes: 13,
  updated: "August 2026",
  answerFirst:
    "The EcoFlow WAVE 3 is worth it only if you have no window or no grid power. You are buying independence from infrastructure, not cooling capacity — EcoFlow rates it at 6,100 BTU, which suits a tent or a van, not a room. And check whether the price you see includes the battery, because it is sold separately.",
  sections: [
    {
      heading: "What the WAVE 3 actually is (and why 'portable AC' hides the important part)",
      body: [
        "Two completely different machines get sold as portable air conditioners, and the whole value question depends on which one you are looking at.",
        "The first is an evaporative cooler — a swamp cooler. It pulls air across a wet pad, water evaporates, and evaporation takes heat out of the air. It is cheap, it uses very little electricity, and it works beautifully in a dry climate. It also adds moisture to the air, which means in humid heat it does close to nothing, and in a small sealed space it makes things clammy. It is not an air conditioner in the engineering sense at all.",
        "The second is a real vapor-compression unit, and the WAVE 3 is one of these. It has a refrigerant loop and a compressor. It does not create cold — nothing does. It moves heat from one side of a metal wall to the other, dumps it outside, and the side you are sitting on gets cooler as a consequence. Because the cold coil runs below the dew point, water condenses out of the air onto it, so the space gets drier rather than damper. That is why a real AC works in Louisiana in August and a swamp cooler does not.",
        "This matters to the worth-it question in a way most reviews skip. You are not paying $899 and up for a fan with a clever trick. You are paying for a compressor, a sealed refrigerant circuit, a controller, and a battery interface, in a package small enough to carry — and the compressor is the reason the thing is heavy, the reason it draws real power, and the reason it can do something no evaporative cooler will ever do. If your climate is genuinely dry and your only enemy is stale hot air, stop reading: a swamp cooler will cost you a small fraction of this and you will be happy. If you need to remove heat from humid air, off a battery, in a space with no window, the shortlist gets very short very fast, and that scarcity is what you are paying for.",
      ],
    },
    {
      heading: "The number everyone judges it on is the wrong number",
      body: [
        "Every argument about this product ends up at 6,100 BTU. EcoFlow rates the WAVE 3 at 6,100 BTU of cooling and 6,800 BTU of heating. People see that next to a $300 unit advertising 10,000 BTU and conclude the WAVE 3 is terrible value. That conclusion is roughly right for the wrong reason, and understanding why protects you from a much more expensive mistake later.",
        "Start with what BTU means, because it is a rate, not a size. A BTU is a quantity of heat; the rating is BTU per hour — the rate at which the machine can pull heat out of a space. Whether that rate is enough has nothing to do with square footage in isolation. It depends on the heat load: how much heat is entering the space per hour through the walls, the roof, the sun, the bodies inside it, and anything electrical that is switched on. A well-shaded, insulated van at dusk and a west-facing single-glazed sunroom at 4pm can be the same floor area and present the machine with wildly different amounts of heat to remove. Manufacturer square-footage ratings assume a normal, shaded, insulated room, which is precisely the assumption a tent breaks in both directions — a tent has almost no insulation, but it is also very small.",
        "Now the part that actually invalidates the comparison. Portable AC ratings are published against different test standards, and the numbers are not interchangeable. Our catalog records the Midea Duo as 14,000 BTU marketed with roughly 12,000 SACC, and the BLACK+DECKER BPACT10WT as 10,000 BTU marketed with 5,550 DOE. Look at that second pair for a moment: the same machine is a 10,000 BTU unit and a 5,550 BTU unit depending on which line of the spec sheet you read. SACC — Seasonally Adjusted Cooling Capacity — exists because single-hose portable units blow conditioned indoor air out of the exhaust and therefore suck an equal volume of hot outdoor air in through every gap in the building. The headline BTU figure ignores that. SACC does not.",
        "Which means the honest statement about the WAVE 3's 6,100 is this: our catalog records it as EcoFlow's rating and does not record which standard produced it, and we are not going to guess. If you intend to compare it against a room unit, check EcoFlow's own spec sheet for the standard first. Comparing a headline BTU to a SACC number is how people conclude a portable AC will cool twice the room it actually cools.",
        "The useful reframe: stop scoring this unit on capacity. On capacity it will lose to almost anything with a window kit, and it is supposed to. Score it on the only axis where it has no competition — whether it can run at all in the place you need cooling.",
      ],
      table: {
        caption: "The two questions that actually decide it",
        columns: ["Do you have a window? An outlet?", "What to buy", "Why"],
        rows: [
          [
            "Both — a window and wall power",
            "A conventional portable AC",
            "You would be paying a large premium for capability you already have. The Midea Duo cools up to ~550 sq ft at around 42 dB by Midea's rating, for $500-$650.",
          ],
          [
            "Outlet, no window — garage bay, interior room, a rental you cannot drill",
            "WAVE 3 without the battery, or fix the venting first",
            "This is the half of the WAVE 3's case people forget. It needs no permanent window installation, and skipping the add-on battery removes the larger part of the cost.",
          ],
          [
            "Window, no outlet — a cabin or an outbuilding with glass but no power",
            "Either unit, plus a power station big enough for a compressor",
            "Any air conditioner needs the same watts here, so the WAVE 3 has no special advantage. Buy on capacity and check the surge rating.",
          ],
          [
            "Neither — tent, van, remote build, a vehicle you sleep in",
            "WAVE 3 with a battery or power station",
            "The one situation where the premium buys something nothing cheaper offers at all. This is the entire reason the product exists.",
          ],
        ],
      },
    },
    {
      heading: "The battery is the product, and it is sold separately",
      body: [
        "Here is the single most consequential thing to know before you spend money, and it is a pricing fact rather than a performance one.",
        "Strip the battery away and the WAVE 3 is a plug-in air conditioner with a modest capacity rating and no permanent window kit. That is a real and occasionally valuable thing — see the second row of the table above — but it is not the product the marketing sells you, and it is not why anybody searches for this unit. The cordless, go-anywhere machine in the photographs is the unit plus EcoFlow's add-on battery, and our catalog is explicit that the battery is a separate add-on that raises the total cost significantly. The buying note we hold on the product is blunter still: check whether the price you are looking at includes it, because it roughly doubles the total.",
        "Our catalog records the WAVE 3 in a $899-$1,499 range, and a spread that wide across one product is itself the tell — it is spanning configurations, not just discounts. So the first thing to do on any listing, before comparing anything to anything, is work out which configuration the price in front of you refers to. A $899 unit-only price and a $1,499 battery-included price are not the same product having a sale.",
        "There is a second path that a lot of buyers should take instead of the add-on battery: use a portable power station you already own, or would buy anyway. The reason this often wins is that the cost stops being attributable to the air conditioner. A power station runs your lights, your fridge, your laptop and your camera batteries for the rest of the trip; the EcoFlow battery, as far as the cooling job is concerned, runs an air conditioner. If your kit already contains a station in the 1,000Wh class, you may already own the expensive half of this purchase.",
      ],
      table: {
        caption: "What you are actually buying, by configuration",
        columns: ["Configuration", "What it does", "The catch"],
        rows: [
          [
            "WAVE 3, unit only",
            "Cooling and heating with no permanent window installation",
            "You are paying a premium for venting freedom, not for capacity — at EcoFlow's 6,100 BTU rating, cheaper units with a window kit cool more",
          ],
          [
            "WAVE 3 + EcoFlow add-on battery",
            "Fully cordless; EcoFlow rates up to about 8 hours, at lower settings",
            "Our catalog notes the battery is sold separately and raises total cost significantly — verify what is in the box",
          ],
          [
            "WAVE 3 + a power station you already own",
            "The same cordless result, with the cost shared across your whole kit",
            "Check both the continuous watts and the surge headroom, and expect some loss running through an inverter",
          ],
          [
            "Midea Duo 14,000 BTU (~12,000 SACC), $500-$650",
            "Cools up to ~550 sq ft at around 42 dB by Midea's rating, and heats",
            "Needs a window and a wall outlet, always; heavy to move between rooms",
          ],
          [
            "BLACK+DECKER BPACT10WT, $280-$360",
            "Cools up to ~450 sq ft (10,000 BTU / 5,550 DOE), rolls between rooms",
            "Needs a window and an outlet; no heat mode; the DOE figure is the honest one",
          ],
        ],
      },
      productIds: ["ecoflow-wave-3-portable-air-conditioner"],
    },
    {
      heading: "Runtime: the arithmetic, and why the answer keeps moving",
      body: [
        "EcoFlow rates the add-on battery for up to about 8 hours, and our catalog is equally clear that cordless runtime drops when the unit is running at full cooling power. Both statements are true at once, and the gap between them is where disappointment lives. So here is the mechanism, because once you understand it you can predict your own runtime instead of arguing with a marketing figure.",
        "The sum itself is trivial: hours equal usable watt-hours divided by average watts drawn. Everything interesting is hidden in the word average.",
        "An air conditioner does not draw a constant load. It draws hard while it is pulling the space down to your setpoint, and then — once it gets there — it either cycles off and on or, on a variable-speed compressor, throttles down to whatever rate merely cancels the heat still leaking in. That second phase can be a small fraction of the first. This is the whole explanation for 'up to 8 hours at lower settings': at a modest setpoint in a small insulated space, the machine spends most of the night barely working. Set it cold, in a tent with a sun-warmed fly and a door you keep opening, and it never reaches setpoint at all, so it never gets to throttle down, so it draws near its maximum for as long as the battery lasts. Same machine, same battery, wildly different night.",
        "Which gives you three levers, and they are all yours rather than the manufacturer's. Insulation and shade reduce the heat you are fighting. A higher setpoint — cooling to comfortable rather than to cold — lets the compressor spend the night idling instead of sprinting. And pre-cooling while you still have shore power or sun means the battery starts the night maintaining a cool space rather than rescuing a hot one.",
        "One number we deliberately do not have: the WAVE 3's rated input wattage is not in our catalog, and we are not going to invent one to make a table look complete. Get it from EcoFlow's spec sheet or the unit's own nameplate, then divide your battery's watt-hours by it for the worst case, and expect real-world runtime to land somewhere north of that depending on how hard the machine has to work.",
        "If you are pairing it with a power station rather than the add-on battery, there is a second spec that catches people out, and it is not capacity. A compressor draws a brief inrush at startup that is well above its running draw, so a station has to clear both the continuous load and that surge. This is why stations publish two numbers — our catalog lists the Jackery Explorer 1000 v2 at 1,070Wh with 1500W AC and a 3300W surge, the BLUETTI AC180 at 1,152Wh with 1800W and a 2700W peak, and the EcoFlow RIVER 2 Pro at 768Wh with 800W AC and 1600W X-Boost. A station that trips on startup is useless regardless of how large its battery is. It is also worth checking whether the unit accepts DC input directly, because running a DC machine through an inverter and back down again costs you a slice of every watt-hour you own.",
      ],
      productIds: [
        "jackery-explorer-1000-v2-portable",
        "bluetti-ac180-portable-power-station",
        "ecoflow-river-2-pro-portable",
      ],
    },
    {
      heading: "The trade nobody mentions: no window vent does not mean no exhaust",
      body: [
        "This is the failure that turns a $900 purchase into a $900 space heater, and it is common enough to be worth its own section.",
        "An air conditioner is a heat pump. It does not destroy heat; it relocates it. Everything it takes out of your space has to be dumped somewhere else, and on top of that, every watt the compressor consumes also ends up as heat. Run a portable AC with its exhaust duct venting into the same sealed space it is cooling and the room does not stay the same temperature — it gets warmer, by exactly the amount of electricity you are feeding the machine. There is no configuration in which this is not true.",
        "So when a spec sheet says no permanent window installation, read it precisely. Our catalog's own note on the WAVE 3 is that it has an exhaust duct like any AC, because the heat has to go somewhere, but does not require a permanent window installation — you route it through a tent flap, a cracked van window, or the supplied ducting. The freedom is from the window kit, the drilling and the landlord. It is not freedom from physics.",
        "In practice this is the thing to plan before you buy, not after. Where does the duct physically exit your tent, your van, your garage? Is there a flap or a port, or are you about to cut one? Does the hot exhaust discharge somewhere it will not simply be drawn back in through the intake, which is a surprisingly easy mistake in a small vehicle with the exhaust and the intake a foot apart?",
        "There is a related effect worth knowing because it explains most of the disappointment with portable air conditioners generally. A single-hose unit takes the air it uses to cool its condenser from inside the space, throws it outdoors, and the space replaces it by pulling unconditioned air in through every gap. In a house that is a measurable efficiency penalty and the reason SACC ratings exist. In a tent, where the gaps are essentially the entire structure, sealing the space as well as you reasonably can is the highest-leverage free thing you can do — it costs nothing and it changes both how cold you get and how long the battery lasts.",
        "Finally, condensate. A real AC pulls water out of the air, and that water has to go somewhere: evaporated out with the exhaust, or drained. Our catalog notes the Midea Duo is a self-draining design and warns that in very humid climates the self-drain will not keep up. Check how whichever unit you buy handles it, and if you are running inside a vehicle, find out before you discover it on the floor.",
      ],
    },
    {
      heading: "The half of the value nobody counts: it heats, and it heats without fire",
      body: [
        "EcoFlow rates the WAVE 3 at 6,100 BTU of cooling and 6,800 BTU of heating. People read past the second number, and it is arguably the one that decides whether the purchase makes sense.",
        "First, why the heating figure is larger, because the asymmetry looks like a typo and is not. In cooling mode the rating counts only the heat pulled out of your space. In heating mode the machine runs the same cycle backwards: it collects heat from outside, and it delivers that heat plus the electrical energy the compressor consumed, because that energy also ends up as heat and it ends up on the inside. Same hardware, more output on the heating side. That is inherent to how a reversible heat pump works, not a marketing flourish.",
        "Now the practical value. If you are the reader this product is actually for — someone in a van, a tent, a trailer, a build with no grid — then heat is a problem you already solve somehow, and the usual answer burns fuel. A combustion heater produces exhaust gases including carbon monoxide, needs real ventilation and a working alarm to be used safely, and requires you to carry and store the fuel. An electric heat pump produces no combustion products at all, and it runs on the same battery you were already carrying. That is not a small quality-of-life difference in a sealed sleeping space.",
        "The honest limit: heat pump output falls as the outside air gets colder, because there is progressively less heat out there to collect and move. That is physics common to every heat pump, from a mini-split to this. Treat the WAVE 3's heat mode as shoulder-season and mild-cold capability that removes a second appliance from your kit, not as a deep-winter furnace. Our catalog says the same thing about the Midea Duo's heat mode for the same reason.",
        "Where this lands on the worth-it question: if you were otherwise going to buy both a cooling solution and a heating solution, the correct comparison is not the WAVE 3 against a $300 air conditioner. It is the WAVE 3 against an air conditioner plus a heater plus fuel plus the ventilation discipline that fuel demands. That comparison is much closer than the sticker price suggests, and it is the strongest argument in the product's favour.",
      ],
    },
    {
      heading: "The verdict: cost per night, and who should walk away",
      body: [
        "Do the arithmetic with your own numbers rather than accepting anyone's verdict, including this one. Take the price, divide it across the nights you will realistically use it over the life of the unit, and see whether the answer embarrasses you.",
        "The table below runs our catalog's published $899 and $1,499 endpoints across five years of ownership. It is deliberately crude, and it excludes the power station if you need one, the electricity, and the assumption that the unit survives five years of being bounced down forest roads. It is not a promise; it is a sum you can redo in ten seconds with your own honest estimate of how much you camp.",
      ],
      table: {
        caption: "Cost per cooled night across five years, at both ends of the published price range",
        columns: ["Nights used per year", "At $899", "At $1,499", "Reads as"],
        rows: [
          ["5 — one holiday week a year", "about $36 a night", "about $60 a night", "A very expensive way to sleep cool"],
          ["15 — a few long weekends", "about $12 a night", "about $20 a night", "A real cost on every trip, and you still feel it"],
          ["30 — a real summer habit", "about $6 a night", "about $10 a night", "Starting to read as gear rather than a splurge"],
          ["60 — serious seasonal use", "about $3 a night", "about $5 a night", "Cheap, if you genuinely camp this much in heat"],
          ["200+ — full-time van or off-grid build", "under $1 a night", "about $1.50 a night", "It stops being a question you need to ask"],
        ],
      },
      list: [
        "Buy it if you have neither a window nor grid power|A tent, a van, a trailer, a remote build. This is the one scenario where nothing cheaper does the job at all, and the premium is buying capability rather than convenience.",
        "Buy it if you would otherwise carry a separate heater|At EcoFlow's 6,800 BTU heating rating it removes a combustion appliance, its fuel and its ventilation requirements from your kit. Count that on the same side of the ledger as the cooling.",
        "Buy it if you already own a 1,000Wh-class power station|The expensive half of the cordless setup is already in your possession, which changes the total more than any sale will.",
        "Do not buy it if you have a window and an outlet|You would be paying four figures for freedom you already have. The Midea Duo cools up to about 550 sq ft at roughly 42 dB by Midea's rating for $500-$650, and the BLACK+DECKER covers up to ~450 sq ft from $280.",
        "Do not buy it to cool a bedroom or a living room|At EcoFlow's 6,100 BTU rating it is built for a small enclosed space. Pointing it at a real room is the most expensive available way to be too warm.",
        "Do not buy it for five nights a year|Look at the top row of the table. At that rate you are buying it because you want it, which is allowed — just do not tell yourself it is a sensible purchase, because the arithmetic disagrees.",
        "Do not buy it if your climate is dry and your budget is tight|An evaporative cooler moves far more air per dollar in low humidity. It is a genuinely different machine with a genuinely different failure mode, not a budget version of this one.",
      ],
      // The list above names both window-and-outlet alternatives by name and price, so both
      // resolve to a card here. Naming a product a reader should buy instead and then giving
      // them no way to reach it is a dead end, not restraint.
      productIds: ["midea-duo-14-000-btu-smart", "black-decker-10-000-btu-3"],
    },
  ],
  faq: [
    {
      q: "Is the EcoFlow WAVE 3 worth it?",
      a: "It is worth it in one specific situation: you need to cool a small enclosed space that has no window to vent through, no wall outlet, or neither. In that case nothing meaningfully cheaper does the job, and the price is buying a capability rather than convenience. If you have a window and an outlet, it is poor value — a conventional portable AC cools considerably more space for a fraction of the money. The heat mode, rated by EcoFlow at 6,800 BTU, shifts the maths in its favour if you would otherwise buy a separate heater.",
    },
    {
      q: "Is the EcoFlow WAVE 3 a heat pump?",
      a: "Yes, in both senses of the question. Every air conditioner is a heat pump — it moves heat out of a space rather than creating cold — and the WAVE 3 is a reversible one, so it runs the cycle backwards to heat as well as cool. EcoFlow rates it at 6,100 BTU cooling and 6,800 BTU heating. The heating figure is higher because in heating mode the machine delivers both the heat it collected from outside and the electrical energy the compressor used, which also becomes heat. Like every heat pump, its heating output falls as the outdoor temperature drops, so treat it as shoulder-season heat rather than a deep-winter furnace.",
    },
    {
      q: "Is the EcoFlow WAVE 3 any good?",
      a: "It is good at the narrow job it was designed for and bad value at everything else, which is why reviews of it disagree so sharply — they are answering different questions. As a cordless, window-kit-free cooler for a tent, van or small off-grid room it has almost no direct competition. As a general-purpose air conditioner it is out-cooled by units costing a third as much. Judge it on whether it can run where you need it, not on capacity per dollar, because on capacity per dollar it will always lose.",
    },
    {
      q: "Does the EcoFlow WAVE 3 come with a battery?",
      a: "Not necessarily, and this is the single most important thing to check before buying. Our catalog records the battery as a separate add-on that raises the total cost significantly — roughly doubling it — and lists the unit across a $899-$1,499 range, a spread wide enough that it is clearly covering more than one configuration. Read the listing carefully to establish whether the price in front of you is unit-only or battery-included. Without a battery or a portable power station, the WAVE 3 is a plug-in air conditioner that happens not to need a window kit.",
    },
    {
      q: "How big a space will the EcoFlow WAVE 3 cool?",
      a: "A small, enclosed, reasonably sealed one — a one or two person tent, a van build, a pop-up camper, a compact off-grid room. EcoFlow rates it at 6,100 BTU, which is a rate of heat removal rather than a room size, so the real answer depends on how much heat is entering your space through the sun, the walls and the bodies inside it. A standard bedroom or living room needs a larger unit vented through a window. One caution on comparisons: portable AC capacities are published against different standards, so before setting 6,100 BTU against a room unit's SACC or DOE figure, check EcoFlow's spec sheet for which standard its number uses.",
    },
    {
      q: "Can I run the WAVE 3 off a power station I already own?",
      a: "Often yes, and it is frequently the smarter buy than the add-on battery because the cost gets shared across your whole kit rather than charged to the air conditioner alone. Check two specs rather than one: the continuous output has to cover the running draw, and the surge or peak rating has to absorb the compressor's startup inrush, which is briefly much higher. That second number is why our catalog lists two figures for every station — the Jackery Explorer 1000 v2, for instance, at 1500W AC with a 3300W surge. A station that trips at startup is no use however large its battery. The section above sets out the capacities side by side, and our off-grid tent-camping guide sizes the watt-hours for a full night.",
    },
  ],
  relatedGuides: [
    "best-battery-powered-portable-ac-for-tent-camping-off-grid",
    "single-hose-vs-dual-hose-portable-ac",
    "best-portable-ac-garage-no-window",
    "do-swamp-coolers-work-in-humid-climates",
  ],
  sources: [
    {
      label: "EcoFlow WAVE 3 — manufacturer product page",
      url: "https://www.ecoflow.com/us/wave-3-portable-air-conditioner",
    },
    {
      label: "EcoFlow WAVE 3 — manufacturer specification sheet (rated cooling and heating input power)",
      url: "https://www.ecoflow.com/us/wave-3-portable-air-conditioner/specs",
    },
    {
      label: "EcoFlow WAVE 3 — Amazon listing (check the configuration and what is in the box)",
      url: "https://www.amazon.com/dp/B0F4DJN74F?tag=blackboxsuppl-20",
    },
    {
      label: "Midea Duo 14,000 BTU (MAP14S1TBL) — Amazon listing",
      url: "https://www.amazon.com/dp/B0FC2SGGF9?tag=blackboxsuppl-20",
    },
    {
      label: "BLACK+DECKER BPACT10WT 10,000 BTU — Amazon listing",
      url: "https://www.amazon.com/dp/B01DLPUWG2?tag=blackboxsuppl-20",
    },
  ],
  heroImage: "/products/scene/ecoflow-wave-3-portable-air-conditioner.webp",
  picks: [
    {
      id: "ecoflow-wave-3-portable-air-conditioner",
      cat: "heat",
      label: "Worth it only with no window or no grid",
    },
    {
      id: "midea-duo-14-000-btu-smart",
      cat: "heat",
      label: "If you have a window and an outlet",
    },
  ],
};
