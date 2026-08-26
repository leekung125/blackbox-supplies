import type { Article } from "@/lib/articles";

/**
 * Long-tail buyer-intent article.
 * Target keyword: "portable air conditioner that also heats" /
 *                 "is a cool-and-heat portable AC worth it year round"
 *
 * WHY THIS PAGE EXISTS (commercial reasoning, 2026-08-26):
 * Decision-stage query attached to our two most expensive cooling products ($500-$650 and
 * $899-$1,499 — roughly $15-$45 a sale at Amazon's ~3%, against a $2.10 median). Google
 * autocomplete returns a full ten-suggestion cluster for "portable air conditioner with heat"
 * ("with heater", "with heat pump", "with heating and cooling", "with heater and dehumidifier",
 * "with heat dual hose", "with heat 12000 btu"); Bing adds "midea portable air conditioner with
 * heat" and "portable air conditioner with heat inverter". The SERP is retailer PDPs plus vendor
 * blogs — no editorial publisher holds it. Heat mode previously appeared in our catalog only as a
 * one-line bullet on the swamp-cooler and single-vs-dual-hose pages.
 *
 * HONESTY GATE — RESULT (verified 2026-08-26, this is the spine of the page):
 * The brief required confirming on Midea's OWN page that our exact ASIN (B0FC2SGGF9) heats before
 * claiming it, and forbade the words "heat pump" unless the manufacturer uses them. What the check
 * actually turned up:
 *   - Midea's US sitemap lists TWO Duo portables at 12,000 BTU DOE / 550 sq ft / 42 dB.
 *   - MAP14S1TBL-A — the model number our catalog records — is titled "Midea 12,000 BTU DOE DUO
 *     Smart Inverter Portable Air Conditioner" (no heat in the name), and its own spec table
 *     carries a dedicated row reading "Heat | No". The same table also lists "Comfort Features |
 *     Cool, Dehumidify, Ventilate, Heat". Midea's page contradicts itself; both strings are quoted
 *     in the article rather than resolved in our favour.
 *   - MPT1412HVRU is titled "...Portable Air Conditioner with Heat Pump" and lists "4-in-1 Comfort:
 *     Cooling, Heating, Dehumidifying & Fan Modes". So "heat pump" IS the manufacturer's word — but
 *     it belongs to MPT1412HVRU, and this article only ever attaches it to that model number.
 *   - Amazon's title for the ASIN we link (B0FC2SGGF9) reads "...Portable Air Conditioner with
 *     Heat... with Heat up to 550 Sq.Ft."
 * Conclusion shipped: we do NOT assert that the unit behind our ASIN is a heat pump. We report both
 * strings, attribute each to its source, and turn the discrepancy into the page's most useful
 * section — verify the model number before ordering. That is a real hazard nobody on the SERP covers.
 *
 * NOTE FOR A LATER PASS (not fixed here — shared files were out of scope for this task):
 * data/heat-products.json describes midea-duo-14-000-btu-smart as "inverter cool + heat" with a
 * keyFeature "plus a heat mode for cooler months", a verdict of "it both cools and heats", and an
 * FAQ answer calling it "a heat-pump assist". Those strings are keyed to model number MAP14S1TBL,
 * which Midea spec-sheets as "Heat | No". Either the model number or the heat claims in that catalog
 * entry are wrong and it should be reconciled. The same stale claim is repeated in prose in
 * lib/articles/do-swamp-coolers-work-in-humid-climates.ts and
 * lib/articles/single-hose-vs-dual-hose-portable-ac.ts.
 *
 * Honesty laws respected: no "we tested"; no republished Amazon star ratings or review counts; every
 * spec attributed to EcoFlow's or Midea's own page, or to the linked Amazon listing's title; the
 * heat-pump-vs-resistive arithmetic is presented as arithmetic the reader performs, with its
 * assumptions named, never as a measurement; downsides come from the catalog's cons arrays and from
 * the manufacturers' own footnotes.
 */
export const PORTABLE_AIR_CONDITIONER_THAT_ALSO_HEATS_WORTH_IT: Article = {
  slug: "portable-air-conditioner-that-also-heats-worth-it",
  title:
    "Portable Air Conditioner That Also Heats: Is a Cool-and-Heat Unit Worth It Year-Round?",
  dek: "Two completely different machines are sold under the same three words, and the listing almost never tells you which one you're getting. One is a genuine heat pump worth paying for. The other is a $40 space heater in a $600 chassis. Here is the number that separates them.",
  category: "Cooling",
  readMinutes: 12,
  updated: "August 2026",
  answerFirst:
    "Usually yes — but only if the heat is reverse-cycle rather than a resistive element, and only if the same room is both too hot in July and too cold in October. Check the heating BTU: above roughly 5,100 on a standard plug, it is moving heat, not making it. Below that, buy a space heater.",
  sections: [
    {
      heading: "Two completely different machines are sold under the same three words",
      body: [
        "\"With heat\" is the least informative phrase in the portable air conditioner category. It appears on units whose heating hardware has nothing in common except that it is bolted into the same rolling box, and the difference between them is not a matter of degree — it is a factor of two or three in running cost, permanently, for as long as you own the thing.",
        "The first kind is resistive. Somewhere inside is a coil of wire; electricity passes through it and the wire gets hot; a fan blows air across it. This is exactly, precisely the physics of the $40 space heater at the hardware store — not similar to it, identical to it. Resistive heating converts electrical energy to heat at a ratio of one to one and it cannot do better, ever, because there is no better. Every watt you buy becomes one watt of heat. That is the ceiling and the floor.",
        "The second kind is reverse-cycle, and to understand it you have to notice something about the air conditioner you already own: it does not make cold. There is no such thing as cold to make. An air conditioner is a heat pump — a machine that picks heat up in one place and puts it down in another, which is why it needs a hose to the outdoors and why the back of it blows hot. Cooling your room is a side effect of moving your room's heat outside.",
        "A reversing valve is a component that swaps which coil is doing which job. Flip it and the same compressor, the same refrigerant, the same two coils now collect heat from the outdoor air and release it into your room. The machine runs backwards, and it is still a pump rather than a generator. That distinction is the whole ballgame, because a pump is not bound by the one-to-one rule. It does not create the heat it delivers; it fetches it. The electricity is only paying for the fetching.",
        "So a reverse-cycle unit typically delivers two to three units of heat energy for every unit of electrical energy it consumes in mild conditions. That ratio is called the coefficient of performance, or COP, and a COP of 1.0 is what resistive heating scores by definition. A COP of 2.5 means your heating costs roughly 40% of what the resistive version costs to produce the same warmth. Over one cold weekend that difference is invisible. Over eight weeks of daily shoulder-season use it is the reason the feature exists.",
        "Here is the problem the rest of this page exists to solve: almost nothing in a product listing tells you which one you are buying. Neither of the two units in our catalog publishes a COP figure on its manufacturer page. The word \"heat\" is used identically for both technologies. You have to work it out from a number that manufacturers cannot fudge — and fortunately there is one.",
      ],
      table: {
        caption: "The two technologies sold as the same feature",
        columns: ["", "Resistive element", "Reverse-cycle (heat pump)"],
        rows: [
          ["What it is", "A coil of wire that gets hot", "The AC running backwards through a reversing valve"],
          ["Heat per watt of electricity", "Exactly 1.0 — the physical ceiling", "Typically 2–3 in mild weather"],
          ["Running cost for the same warmth", "Highest possible", "Roughly a third to a half"],
          ["Output on a standard US outlet", "Capped near 5,100 BTU/h", "Can exceed it, because the heat is fetched not made"],
          ["Affected by outdoor temperature", "No — a wire is a wire", "Yes — output falls as it gets colder outside"],
          ["Worth paying a premium for", "No. A space heater does the identical job", "Yes, if you will actually run it for weeks"],
        ],
      },
    },
    {
      heading: "The one number that tells you which one you are looking at",
      body: [
        "Watts and BTUs measure the same thing in different units, and the conversion is fixed: one watt equals 3.412 BTU per hour. That single fact turns a marketing spec into a diagnosis.",
        "A standard US household circuit is 15 amps at 120 volts, which is 1,800 watts, and electrical code limits continuous loads to 80% of a circuit's rating. That is why essentially every plug-in space heater sold in America is a 1,500-watt device — it is the largest resistive heater you can safely run on a normal outlet all evening. Convert it: 1,500 watts times 3.412 gives about 5,118 BTU per hour.",
        "That is a hard ceiling, not a convention. No resistive element on a standard household plug can deliver meaningfully more than about 5,100 BTU/h of heat, because it would have to draw more electricity than the outlet is allowed to supply. Which gives you the test:",
        "If a portable AC advertises heating output comfortably above 5,100 BTU/h and plugs into a normal outlet, the heat is not coming from a wire. It has to be pumped. If the heating figure sits at or below roughly 5,100 — and especially if it lands suspiciously near a round 5,000 — assume resistive until the manufacturer says otherwise in writing.",
        "There is a second tell, and it is the one that separates people who understand this category from people who are guessing. Look at whether the heating BTU is higher or lower than the cooling BTU on the same unit. On a genuine reverse-cycle machine, heating capacity is normally the larger of the two — because in heating mode the room receives both the heat harvested from outside and the waste heat of the compressor doing the harvesting, while in cooling mode that compressor heat gets thrown out of the window along with everything else. A unit rated to heat more than it cools is showing you its mechanism.",
        "Run both tests on the EcoFlow WAVE 3 and the answer is unambiguous. EcoFlow's product page states \"6100 BTU cooling\" and \"6800 BTU heating\". The heating number is above the resistive ceiling — 6,800 BTU/h works out to about 1,993 watts of delivered heat, well past what a legal 15-amp resistive element can produce — and it is higher than the cooling number. Both tells point the same way.",
        "One honest boundary on that conclusion: EcoFlow's product page publishes the BTU figures and calls the feature \"It's Also a Heater\", but on that page it does not name the heating mechanism, and the phrase \"heat pump\" does not appear there at all. So treat reverse-cycle as strongly indicated by the numbers rather than as a specification we can quote back to you. We are showing you the reasoning precisely so you can check it rather than take our word for it.",
      ],
      table: {
        caption: "How to read a heating spec before you buy",
        columns: ["What the listing says", "What it probably means", "What to do"],
        rows: [
          ["Heating output near or below ~5,100 BTU/h", "Resistive element — a space heater inside the AC", "Do not pay a premium for it"],
          ["Heating output well above ~5,100 BTU/h", "Reverse-cycle — the heat is being pumped", "This is the version worth money"],
          ["Heating BTU higher than cooling BTU", "Reverse-cycle signature", "Good sign; confirm the model number"],
          ["Only a wattage, no heating BTU", "Multiply watts by 3.412 yourself", "Then apply the rules above"],
          ["\"With heat\" and no number at all", "Unknowable from the listing", "Open the manufacturer's spec page or skip it"],
        ],
      },
    },
    {
      heading: "The model-number trap: Midea sells two near-identical Duos and only one heats",
      body: [
        "This is the part of the research that changed what this page says, and it is the single most useful thing we can tell anyone shopping this query.",
        "Midea's US site currently lists two Duo portable air conditioners that are, on paper, the same machine. Both are 12,000 BTU DOE. Both are rated for spaces up to 550 sq ft. Both advertise ultra-quiet operation as low as 42 dB. Both use the hose-in-hose dual-hose design. They photograph identically. And only one of them heats.",
        "The one that does is model MPT1412HVRU, which Midea titles \"Midea 12,000 BTU DOE DUO Smart Inverter Portable Air Conditioner with Heat Pump, for spaces up to 550 sq. ft.\" and describes as offering \"4-in-1 Comfort: Cooling, Heating, Dehumidifying & Fan Modes\". That is where the phrase \"heat pump\" comes from — it is Midea's own word, printed in Midea's own product title, and it applies to that model number and no other.",
        "The other is model MAP14S1TBL-A, which Midea titles simply \"Midea 12,000 BTU DOE DUO Smart Inverter Portable Air Conditioner\" — no heat in the name. Its published specification table includes a dedicated row that reads \"Heat: No\".",
        "We will be straight with you about a complication, because glossing it would be the dishonest move. That same MAP14S1TBL-A specification table also contains a row reading \"Comfort Features: Cool, Dehumidify, Ventilate, Heat\". Midea's page contradicts itself: one row lists Heat among the comfort features, another row says Heat: No. We cannot resolve that from outside the company, and we are not going to pick the reading that suits us. What we can say is that Midea markets a separate SKU whose entire distinguishing feature is heating, which strongly suggests the plain-named model is the cooling-only one and the \"Comfort Features\" string is boilerplate shared across the Duo family.",
        "Meanwhile, the Amazon listing we link for the Duo — ASIN B0FC2SGGF9 — is titled \"Midea Duo 14,000 BTU Portable Air Conditioner with Heat, Inverter Quiet | 12,000 BTU SACC High Efficiency Inverter Portable AC, with Heat up to 550 Sq.Ft. Smart/Remote Control, Alexa/Google Assistant\". The words \"with Heat\" appear in it twice. Our own catalog records that product's model number as MAP14S1TBL — the number Midea spec-sheets as Heat: No.",
        "So here is our position, stated plainly. We are not going to tell you the Midea Duo behind that link is a heat pump, because we could not confirm it on Midea's own product page for that model number, and confirming it there was the standard we set ourselves before writing. What we will tell you is the actionable version: if you are buying a Midea Duo specifically because it heats, read the model number in the listing's own specification block before you order, and look for MPT1412HVRU or a title that names the heat pump. Two units that share a product family, a BTU rating, a room rating, a noise rating and a silhouette are exactly the conditions under which people receive the wrong box.",
        "That advice generalises past Midea. Manufacturers routinely ship cool-only and cool-and-heat variants of the same chassis under model numbers that differ by two characters, and marketplace listings frequently merge, mislabel or inherit the wrong variant's copy. In this category the model number is not a detail. It is the spec.",
      ],
      productIds: ["midea-duo-14-000-btu-smart"],
      table: {
        caption: "Midea's two Duo portables, as listed on Midea's own site",
        columns: ["", "MAP14S1TBL-A", "MPT1412HVRU"],
        rows: [
          ["Midea's product title", "\"...DUO Smart Inverter Portable Air Conditioner\"", "\"...Portable Air Conditioner with Heat Pump\""],
          ["Cooling", "12,000 BTU DOE", "12,000 BTU DOE"],
          ["Room size", "Up to 550 sq ft", "Up to 550 sq ft"],
          ["Quoted noise floor", "As low as 42 dB", "42 dB"],
          ["Heating", "Spec table row reads \"Heat: No\"", "\"4-in-1 Comfort: Cooling, Heating, Dehumidifying & Fan Modes\""],
          ["Listed weight", "73.85 lbs", "Not published on the page"],
        ],
      },
    },
    {
      heading: "What EcoFlow actually claims for the WAVE 3 — and the footnote underneath it",
      body: [
        "The WAVE 3 is the cleaner example, because EcoFlow publishes the heating spec next to the cooling spec on the same page and the numbers behave the way reverse-cycle numbers behave. It is also the more expensive answer by a wide margin, and it is the wrong answer for most rooms, so the honest treatment is to show you both halves.",
        "EcoFlow's page states 6,100 BTU cooling and 6,800 BTU heating, and quotes speed claims for each: a 15°F drop in 15 minutes, and a 17°F rise in 15 minutes. It lists a Sleep Mode that \"operates at just 44 dB, about the same as a quiet conversation\", an insulated exhaust duct rather than a permanent window installation, app control through EcoFlow's Oasis platform, and an add-on 1,024Wh LFP battery good for \"up to 8 hours\" of cordless running.",
        "Now read the disclaimers, because EcoFlow prints them and almost nobody quotes them. Both temperature-change claims are footnoted \"Tested in a 10 cubic meter space\" — at 77°F for the cooling figure and 60°F for the heating one.",
        "Ten cubic metres is about 353 cubic feet. That is a space roughly seven feet by seven feet with a seven-foot ceiling. It is a tent. A modest 12 ft by 12 ft bedroom with 8 ft ceilings is 1,152 cubic feet — more than three times the volume — and a 550 sq ft living space of the sort the Midea is rated for is over twelve times it. None of this makes EcoFlow's claim untrue; a stated test condition honestly disclosed is exactly what a spec footnote is for. It does mean that the headline \"17°F in 15 minutes\" describes a tent warming up, and you should not carry that number into a bedroom.",
        "The second footnote is worth the same attention. The 8-hour battery figure is qualified as \"8 hours of wireless use in Eco Mode under optimal conditions\". Check what that implies with arithmetic you can do yourself: 1,024Wh spread across 8 hours is an average draw of about 128 watts. Full-tilt heating at 6,800 BTU/h means delivering roughly 1,993 watts of heat, which even at a generous COP of 2.5 would draw close to 800 watts and flatten that battery in something like 75 minutes. The 8-hour number and the 6,800 BTU number are not describing the same hour of operation, and no reasonable reading of EcoFlow's page says they are. If you are planning around cordless heat, plan around roughly an hour of hard output or a night of gentle output — not eight hours of the headline figure.",
        "What the WAVE 3 genuinely buys you is the thing no conventional unit can do at all: it heats and cools a space with no permanent window installation and no wall outlet. For a van, a tent, a boat cabin, a semi sleeper or an outbuilding with no power, that capability has no substitute at any price, and the fact that it also heats is what makes it a four-season purchase instead of a summer one. Our catalog's honest counterweights stand: at 6,100 BTU it only cools a small space, not a full-size room; the battery is a separate add-on that raises the total cost significantly; it is a premium price against conventional portable ACs; and cordless runtime drops when running at full power. If you have a window and a wall socket, you are paying a large premium for a capability you will never use.",
      ],
      productIds: ["ecoflow-wave-3-portable-air-conditioner"],
    },
    {
      heading: "Five things about year-round portable heat that are not in any listing",
      list: [
        "The window panel lives in your window all winter|This is the cost nobody counts. A cooling-only portable gets uninstalled in October: panel out, window shut, unit in the closet. Run it year-round and that foam-and-plastic slab stays wedged in a partly open window through the coldest months, which is a draft path, an insulation gap and a security compromise in exactly the season when all three matter most. Before you buy the heating version, look at the window you would use and decide whether you are willing to leave it half-open until April.",
        "In heating mode the condensation forms in the wrong place|Cooling a room wrings water out of the indoor air onto the indoor coil, and most modern portables evaporate that water out through the exhaust. Reverse the cycle and the physics reverse with it: now it is the outdoor-side coil that runs cold and grows condensation, and on a portable that coil is inside the box in your living room rather than outside in the weather. The water has to go somewhere. EcoFlow's own feature list includes a \"Water Drain Alert\" that pushes an app notification \"when the water tank nears full\" — that is a real bucket, and a real chore, on a machine that may never ask you to empty anything in summer.",
        "Defrost cycles will blow cold air at you|When the coil harvesting outdoor heat drops below freezing while pulling in humid air, frost grows on it and chokes the airflow. Every heat pump handles this the same way: it stops heating and runs a defrost cycle to melt the ice off. On a big central system you barely notice. On a small unit in the room with you, it means periodic stretches where the machine is not heating — and often actively blowing cool air — for a few minutes at a time. It is normal operation, not a fault, but it is startling the first time and it is never mentioned before purchase.",
        "Single-hose designs are worse in heat than they are in cool|A single-hose portable creates negative pressure: it throws air out of the window, and your house pulls replacement air in through every gap to compensate. In summer that replacement air is hot, which is the well-known efficiency penalty. In winter it is worse, because the indoor-to-outdoor temperature gap is usually larger in January than in July, so every cubic foot of infiltration costs you more. A dual-hose design — Midea's hose-in-hose Duo arrangement is one — draws its outdoor-side air through a sealed path instead of stealing it from your room, which is closer to mandatory in heating mode than it is in cooling mode.",
        "The unit never goes back in the closet|A seasonal appliance is stored for half the year. A year-round appliance is furniture. Midea publishes the Duo's dimensions as 32.48 inches tall by 19.53 wide by 16.73 deep, at 73.85 lbs. That is a permanent floor-space commitment next to a permanently compromised window, twelve months a year, and it is the trade that most often turns into regret. Measure the spot before you decide, not after.",
      ],
    },
    {
      heading: "Is it worth the premium? Count weeks, not seasons",
      body: [
        "The question is never really \"should I get heat.\" It is \"should I pay the difference between the cool-only and the cool-and-heat version of this machine,\" and the honest way to answer it is to count how many weeks a year the heat will actually run.",
        "A portable heat pump is a shoulder-season instrument. Its natural habitat is the stretch in autumn before the central heating comes on and the stretch in spring after it goes off — the weeks when one room is genuinely uncomfortable and firing the whole house's heating for it is absurd. In that window it is excellent: quiet, immediate, room-targeted, and cheap to run precisely because the outdoor air it is harvesting from is still mild.",
        "Deep winter is where the promise thins, and this is a property of the physics rather than a flaw in any particular unit. A heat pump's output falls as the outdoor temperature falls, for two compounding reasons: there is less heat energy in colder air to collect, and the compressor has to work against a larger temperature lift to deliver it indoors. Small units lose meaningful capacity well before the outdoor temperature reaches freezing, and many either fall back to resistive heating or stop heating altogether below some threshold. Worth noting plainly: neither EcoFlow nor Midea publishes a minimum operating temperature for heat mode on the product pages we checked, which is itself information. If a manufacturer does publish one, that is a manufacturer being unusually straight with you.",
        "So the arithmetic. If the room in question is already reached by central heating and the heat mode would run for six to ten weeks of mild shoulder season, you are buying a convenience, and whether the premium is worth it depends entirely on how much that convenience costs — treat it the way you would treat any comfort upgrade, not as an investment that pays back. If the room is one your heating genuinely does not reach — a converted garage, a sunroom, a basement office, an addition, a workshop, a van — the calculation changes completely. There you are not comparing against your furnace; you are comparing against buying a separate space heater and finding somewhere to store the AC. Getting twelve months of use out of one appliance instead of four is real value, and this is the buyer the feature was designed for.",
        "The failure mode worth naming, because it is the common one: paying the heating premium on a unit in a room that your central heat already handles fine, using the heat mode twice in the first November out of curiosity, and then never again — while the window panel stays in all winter and the box occupies three square feet of floor for a feature you have stopped thinking about. If you cannot picture the specific fortnight you would use it, that is your answer.",
      ],
      table: {
        caption: "When the heating premium actually earns its money",
        columns: ["Your situation", "Weeks of heat use per year", "Verdict"],
        rows: [
          ["Room reached by central heating", "6–10, mild shoulder season only", "A convenience. Buy it only if the premium is small"],
          ["Converted garage, sunroom, addition", "12–20", "Strong case — one appliance covers both problems"],
          ["Basement or workshop, no ducting", "12–24", "Strong case, but confirm dual-hose"],
          ["Van, tent, boat, off-grid cabin", "Whole cold half of the year", "The reason cordless cool-and-heat exists"],
          ["You want heat only, cooling never", "N/A", "Buy a space heater. You are overpaying by hundreds"],
          ["Deep-winter primary heating", "N/A", "Wrong tool. Capacity falls exactly when you need it"],
        ],
      },
    },
    {
      heading: "Four kinds of buyer who should not buy one",
      body: [
        "It is worth saying clearly, because every other page on this query is trying to sell you the upgrade: for a large share of people asking this question, the answer is no, and the reasons are specific rather than vague.",
      ],
      list: [
        "You have central heating that reaches the room|Then the heat mode is a solution to a problem you do not have, for eleven and a half months of the year. The exception is genuinely narrow — a room that runs cold relative to the rest of the house, where you would otherwise heat the whole building for one occupant. If that is not your situation, buy the cooling-only variant and put the difference toward a better one.",
        "You have a window and a wall outlet|Then a window unit with heat beats any portable of the same rating, and the reason is structural rather than a matter of brand. A window unit puts its outdoor coil actually outdoors, in the outdoor air, on the other side of the glass. A portable has to bring outdoor air to an indoor coil through a hose, which costs efficiency in both directions and leaks heat off the hose into the room it is trying to condition. Portables exist for rooms where a window unit cannot be installed — casement windows, rental restrictions, no window at all. If none of those apply to you, you are paying a premium for a compromise.",
        "What you actually need is heat|If the cooling is incidental and the heating is the real requirement, the maths is brutal. A 1,500-watt space heater delivers about 5,118 BTU/h for well under a hundred dollars, and if the portable you are considering uses a resistive element it will deliver no more heat than that — it will simply have cost several hundred dollars more to do it. Even against a genuine reverse-cycle unit, the running-cost advantage takes a great many weeks of use to repay the difference in purchase price. Be honest about which of the two jobs you are really buying for.",
        "Your hot room and your cold room are different rooms|This is more common than it sounds — the west-facing bedroom bakes in August and the north-facing office is freezing in November, and they are at opposite ends of the house. A cool-and-heat portable only pays off when one machine solves both problems in one place. If it has to be wheeled between floors, it will not be, and the 74-pound reality of these units is the reason.",
      ],
    },
  ],
  faq: [
    {
      q: "Is a portable air conditioner that also heats worth it?",
      a: "It is worth it when three things are true at once: the heat is reverse-cycle rather than a resistive element, the same room is genuinely both too hot in summer and too cold in the shoulder seasons, and that room is not already well served by your central heating. Meet all three and one appliance covers twelve months instead of four, which is good value. Miss any one of them and you are paying a premium for a feature that will run twice and then be forgotten while the window panel stays in all winter.",
    },
    {
      q: "How do I tell whether the heat is a heat pump or just a heating element?",
      a: "Use the BTU number. One watt is 3.412 BTU per hour, and a standard 15-amp US outlet limits a continuous resistive load to about 1,500 watts, which is roughly 5,118 BTU/h. If a unit on a normal plug advertises heating output comfortably above about 5,100 BTU/h, the heat is being pumped rather than generated, because a wire on that circuit physically cannot produce more. A second tell: on a genuine reverse-cycle unit the heating BTU is usually higher than the cooling BTU, because in heating mode the room receives the compressor's waste heat as well as the heat harvested from outside.",
    },
    {
      q: "Is the EcoFlow WAVE 3 a heat pump?",
      a: "EcoFlow's product page states 6,100 BTU cooling and 6,800 BTU heating and calls the feature \"It's Also a Heater\", but it does not name the heating mechanism on that page and the phrase \"heat pump\" does not appear there. What we can say is that both diagnostic signs point one way: 6,800 BTU/h is about 1,993 watts of delivered heat, which is well above what a resistive element on a standard plug can produce, and the heating figure exceeds the cooling figure, which is the reverse-cycle signature. We are showing you the reasoning rather than asserting a spec EcoFlow has not published.",
    },
    {
      q: "Does the Midea Duo have a heat mode?",
      a: "It depends entirely on which Duo, and this catches people out. Midea's site lists two Duo portables at 12,000 BTU DOE and 550 sq ft with the same 42 dB claim. MPT1412HVRU is titled by Midea as being \"with Heat Pump\" and lists cooling, heating, dehumidifying and fan modes. MAP14S1TBL-A is titled without any mention of heat and its specification table carries a row reading \"Heat: No\" — although, confusingly, the same table also lists Heat among its comfort features. If you are buying a Duo for the heating, read the model number in the listing's own specification block before ordering rather than trusting the product title.",
    },
    {
      q: "How cold can it be outside before the heat mode stops working?",
      a: "There is no single answer, and the honest position is that neither EcoFlow nor Midea publishes a minimum operating temperature for heat mode on the product pages we checked. What is certain is the direction: a heat pump's output falls as outdoor temperature falls, because there is less heat in the air to collect and a bigger temperature lift to deliver it across. Small units lose meaningful capacity well before freezing, and below some threshold they either fall back to resistive heating or stop. Treat any portable heat mode as a shoulder-season and mild-winter tool, not as primary heating in a genuinely cold climate.",
    },
    {
      q: "Why does my portable AC blow cold air when it is supposed to be heating?",
      a: "Almost certainly a defrost cycle, and it is normal. When the coil that harvests heat from outdoor air drops below freezing while humid air passes over it, frost builds up and blocks the airflow the machine needs. Every heat pump handles this by pausing the heating and briefly running to melt the ice off, which is why you get a few minutes of cool air. It happens more often in damp, near-freezing conditions than in dry cold. Persistent cold air with no recovery is a different matter and worth raising with the manufacturer.",
    },
  ],
  relatedGuides: [
    "single-hose-vs-dual-hose-portable-ac",
    "best-battery-powered-portable-ac-for-tent-camping-off-grid",
    "best-portable-ac-garage-no-window",
  ],
  sources: [
    {
      label: "EcoFlow WAVE 3 — official product page, specifications and test-condition disclaimers",
      url: "https://www.ecoflow.com/us/wave-3-portable-air-conditioner",
    },
    {
      label: "Midea Duo MPT1412HVRU \"with Heat Pump\" — official product page",
      url: "https://www.midea.com/us/Heating_Cooling/portable-air-conditioners/12000-btu-doe-duo-smart-inverter-portable-air-conditioner-with-heat.mpt1412hvru",
    },
    {
      label: "Midea Duo MAP14S1TBL-A — official product page and full specifications",
      url: "https://www.midea.com/us/Heating_Cooling/portable-air-conditioners/12000-btu-duo-smart-inverter-portable-air-conditioner.map14s1tbl-a",
    },
    {
      label: "Midea Duo portable air conditioner — Amazon listing",
      url: "https://www.amazon.com/dp/B0FC2SGGF9?tag=blackboxsuppl-20",
    },
    {
      label: "EcoFlow WAVE 3 portable air conditioner — Amazon listing",
      url: "https://www.amazon.com/dp/B0F4DJN74F?tag=blackboxsuppl-20",
    },
  ],
  heroImage: "/products/scene/ecoflow-wave-3-portable-air-conditioner.webp",
  picks: [
    {
      id: "ecoflow-wave-3-portable-air-conditioner",
      cat: "heat",
      label: "If there is no window or no outlet",
    },
    {
      id: "midea-duo-14-000-btu-smart",
      cat: "heat",
      label: "The room-sized dual-hose option — check the model number",
    },
  ],
};
