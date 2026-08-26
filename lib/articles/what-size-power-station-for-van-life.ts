import type { Article } from "@/lib/articles";

/**
 * Long-tail buyer-intent article.
 * Target keyword: "what size power station for van life"
 *
 * WHY THIS PAGE EXISTS (commercial reasoning, 2026-08-26):
 * Van-life buyers are the highest-basket audience in the power cluster — they buy the 1kWh station
 * AND the $150-300 panel, and our catalog already pairs them. We deliberately target the "what size"
 * variant rather than the "best power station for van life" head term: the head term competes with
 * established van-life media and YouTube, where a low-DA text page is a poor bet, while the sizing
 * variant is thinner and matches our actual strength — arithmetic from published specs.
 *
 * Evidence: Google autocomplete returns the exact phrase; the seed "power station for van life"
 * returns a nine-deep ladder that includes it. COMPETITOR PROFILE NOT VERIFIED — no SERP was
 * captured at the time of writing, so "winnable" is a hypothesis, not a measurement.
 *
 * Honesty laws respected: no "we tested" (nobody here has), no republished Amazon star ratings or
 * review counts, no invented specs. Every product figure is the catalog's own verified spec string
 * or the manufacturer's published rating, and is attributed in the prose. Appliance draw figures are
 * labelled as illustrative planning bands the reader replaces with their own appliance's label. The
 * off-grid solar ARRAY math is deliberately NOT re-answered here — it belongs to
 * how-many-solar-panels-to-keep-a-power-station-charged-off-grid and is handed off to it.
 *
 * ADVERSARIAL AUDIT 2026-08-26 — corrections applied before first publish:
 *  - ⛔ The AC180's 2,700W was written up as motor-start SURGE. Bluetti's own spec page calls it
 *    "Power Lifting Mode" and describes it as running high-power HEATING devices (space heaters,
 *    hair dryers, kettles, blankets); no separate surge/peak figure is published. The page had
 *    warned against exactly this misreading for EcoFlow's X-Boost one paragraph earlier, then made
 *    it for Bluetti. Our catalog's "2700W peak" wording is the source of the error and is imprecise
 *    on the live comparison pages too. Fixed at all three sites here.
 *  - RIVER 2 Pro weight was 17 lb (our catalog's prose fields, not its spec string). EcoFlow's
 *    spec page — cited below — lists net weight as "Approximately 18.2lbs". Now 18.2 lb.
 *  - "120-180W" for a 12V accessory socket was an unsourced number; it now shows the premise
 *    (a 10A/15A fuse at 12-13V) and tells the reader to check their own fuse box.
 *  - AC180 cycle life is published (3,500+ to 80%) on the Bluetti page already cited; stated.
 * VERIFIED BY FETCH: bluettipower.com/products/ac180 (1,152Wh, 1,800W, 2,700W Power Lifting,
 * 500W max solar, 35.3 lbs, 45min to 80%, 3,500+ cycles) and us.ecoflow.com RIVER 2 Pro page
 * (768Wh, LFP, 800W/1600W X-Boost, 220W max solar, ~18.2 lbs, 70min, 3000 cycles) — both resolve
 * and both say what their labels claim.
 * NOT INDEPENDENTLY VERIFIABLE: the Explorer 1000 v2's 400W max solar input. jackery.com renders
 * specs in JS and the Amazon listing is not fetchable. It is attributed to Jackery in the prose
 * and matches the live how-many-solar-panels page; treat as manufacturer-attributed, not checked.
 */
export const WHAT_SIZE_POWER_STATION_FOR_VAN_LIFE: Article = {
  slug: "what-size-power-station-for-van-life",
  title: "What Size Power Station for Van Life? Size It by the Day, Not the Hour",
  dek: "What size power station for van life, worked out properly: add up your day in watt-hours, check the inverter's continuous and surge ratings, then check the recharge path — because the gap between refills, not the battery, is what really sets the size. Plus the spec nobody checks that decides how many years you own it.",
  category: "Power & Charging",
  readMinutes: 12,
  updated: "August 2026",
  answerFirst:
    "For most van setups — a 12V fridge, lights, fans, phones and a laptop — a 1,000 to 1,200Wh station with a 1,500W or larger inverter is the size that works. Size it by your daily watt-hours, not by runtime, and check the solar input: the recharge path, not the battery, is what limits you.",
  sections: [
    {
      heading: "Van life sizing is a daily-cycle question, not a runtime question",
      body: [
        "The question almost everyone asks first is how long a 1,000Wh station will run their fridge. It has an answer, and the answer is close to useless, because in a van you are not trying to survive one night on a battery. You are trying to end most days with roughly as much energy in the box as you started with. The size that works is the size that survives the gap between refills — and that is a different sum entirely.",
        "Two units do all the work here, and mixing them up is the single most common sizing mistake. Watts (W) are a rate: how fast something draws power. Watt-hours (Wh) are an amount: how much energy the station holds, and how much you burn in a day. Jackery's published capacity for the Explorer 1000 v2 is 1,070Wh, which in a perfect world runs a steady 100W load for a bit under eleven hours. Nothing in a van draws a steady 100W, which is exactly why runtime-per-appliance is the wrong frame to shop with.",
        "The frame that works is a ledger with two lines. Line one is your daily draw in watt-hours: everything you use in twenty-four hours, added together. Line two is your daily replacement: how many watt-hours you can realistically put back in the same twenty-four hours, from solar, from driving, or from a wall socket. If replacement is greater than or equal to draw, almost any station big enough to buffer one bad day will do, and you should buy less battery than you think. If replacement is less than draw, capacity is not solving your problem — it is only buying you days until you find an outlet. A big battery with no refill is a countdown, not a system.",
        "That is why two van lifers with identical appliances need different sizes. The one who drives two hours a day and pulls into a campground twice a week lives comfortably on 768Wh. The one who parks in the desert for five days and works from a laptop needs capacity and a way to refill it, and no amount of the first substitutes for the second. So the honest answer to what size power station van life needs is a range, and the rest of this page is three numbers rather than one: your daily watt-hours, the inverter's output ratings, and your recharge ceiling.",
      ],
    },
    {
      heading: "Step one: add up your day in watt-hours",
      body: [
        "Energy is watts multiplied by hours. Every appliance you own states its draw somewhere — on the label, on the power brick, or in the manual, either directly in watts or as amps and volts you multiply together. Take each thing, guess honestly at how long it runs, and total the day. Fifteen minutes with a notepad gets you a number worth more than any generic recommendation, this one included.",
        "The fridge decides the answer, and it is the load people get wrong. A 12V compressor fridge does not draw its rated wattage all day — it cycles. The compressor runs until the box is cold, stops, and restarts when the temperature drifts back up. The fraction of each hour it spends running is its duty cycle, and that fraction is not a fixed property of the fridge. It is a property of the weather. A fridge in a cool, shaded van might run 30% of the time. The same fridge in a metal box parked in August sun, opened often, loaded with warm groceries, runs far more than that. That single variable moves your daily total by hundreds of watt-hours and can move your sizing answer a whole tier, which is why you build the number around a hot day rather than a pleasant one.",
        "Laptops are the opposite trap. A laptop that uses 65W only draws near that figure while its battery is actually filling; once it is full, the draw collapses to a trickle. Count charge hours, not screen hours, and you will stop over-sizing on office equipment.",
        "The load that quietly doubles a modern van's daily number is connectivity. A satellite internet terminal or an always-on 5G router runs continuously, with no duty cycle to save you — it is the closest thing in a van to a load that never stops. If you plan to work online from remote parking, look up your specific terminal's published draw and put it in the sum before you shop for a station. It changes the tier you are shopping in, and it is the reason full-timers who work online end up somewhere different from full-timers who do not.",
      ],
      table: {
        caption: "Illustrative planning bands, not product specs — read the watt rating off your own appliance and redo the sum",
        columns: ["Load", "Draw while running", "How much of the day", "Watt-hours per day"],
        rows: [
          ["12V compressor fridge (~45-60 qt)", "~45-60W", "Cycles roughly 30-50% of the time", "~350-650Wh"],
          ["Laptop (a working day)", "~30-65W while charging", "2-4 charge hours", "~90-260Wh"],
          ["Phones, watch, earbuds", "~10-30W", "2-3 hours", "~40-90Wh"],
          ["LED lights", "~5-15W", "4-6 hours", "~30-90Wh"],
          ["Fan or roof vent", "~10-30W", "6-10 hours", "~90-300Wh"],
          ["Satellite terminal / 5G router", "Check its own published figure", "Continuous — no duty cycle", "Often the largest single line"],
          ["Kettle, toaster, induction hob", "~1,000-1,800W", "10 minutes", "~170-300Wh per use — see the inverter section"],
        ],
      },
      list: [
        "Rated capacity is not usable capacity|Everything plugged into an AC socket runs through an inverter that converts the battery's DC into 120V AC, and that conversion loses energy as heat. Plan on getting usefully less out of the wall sockets than the rated watt-hours suggest. Treat the gap as a planning allowance, then watch your own unit's display on a real trip rather than trusting a number from a page like this one.",
        "DC loads skip the tax|A 12V fridge run from the station's 12V port never touches the inverter. Run the same fridge from an AC socket using its own AC adapter and you convert twice — DC to AC inside the station, then AC back to DC inside the brick. Same fridge, same cold, more watt-hours gone. If your fridge has a 12V lead, use it.",
        "Cold takes a cut too|Lithium cells give up capacity in the cold, and many LiFePO4 stations refuse to accept a charge below freezing at all in order to protect the pack. In a van in winter that is not a footnote, it is a planning constraint — we go through the behaviour in detail in our cold-weather power station guide.",
        "Leave a day of margin|Sizing to exactly your daily number means one cloudy day, one hot week or one longer stop puts you in the dark. Add a day of buffer to the total before you shop, and you will not spend the trip doing mental arithmetic every evening.",
      ],
    },
    {
      heading: "Step two: the two output ratings that decide whether it works at all",
      body: [
        "Capacity tells you how long. The inverter ratings tell you whether. They are separate specs, and a station can pass one and fail the other — which is how people end up owning a big battery that will not run the thing they bought it for.",
        "The first number is continuous output: the wattage the station can supply indefinitely. Our catalog's verified spec strings put the EcoFlow RIVER 2 Pro at 800W native AC, the Jackery Explorer 1000 v2 at 1,500W, and the Bluetti AC180 at 1,800W. Add up everything that might run at the same moment and stay under that figure. In a normal van that is easy — a fridge, lights, a fan, a laptop and a router together are a couple of hundred watts.",
        "The second number is surge, or peak: a brief overload the inverter tolerates for a fraction of a second. It exists because anything with a motor pulls a large inrush spike the instant it starts — a compressor fridge, a water pump, a power tool. The spike can be several times the running draw and it is over almost immediately, but if the inverter cannot deliver it, the station's overload protection cuts the outlet even though the running watts were trivial. In a van this failure looks like a fridge that simply refuses to start on a station whose capacity is nowhere near exhausted. Jackery publishes 3,300W of surge on the Explorer 1000 v2, which is comfortable margin over a domestic-sized compressor's start. The Bluetti AC180 is the one to read carefully, because its headline second number is not a surge rating at all: Bluetti's spec page publishes 1,800W continuous and a 2,700W figure it calls Power Lifting Mode, described there as a way to run high-power heating devices — the page names space heaters, hair dryers, electric kettles and electric blankets — and it publishes no separate surge or peak figure beside it. A resistive-load boost mode is not a motor-start reserve, so the number to size a compressor against on the AC180 is its 1,800W continuous rating, which is in any case the largest continuous rating of the three here and ample for a van fridge.",
        "Then there is the wall you cannot buy your way past at this size, and it is worth being blunt about because it is the most expensive misunderstanding in the category. Resistive heat — a kettle, a toaster, a hair dryer, an induction hob, a space heater — converts electricity directly into heat, and heat is the most expensive thing you can ask a battery for. A 1,500W hob run for ten minutes is 250Wh: a quarter of a 1,000Wh station for one pot of pasta, and only if the inverter can deliver 1,500W in the first place. People routinely buy the next size up hoping to cook on it, and the next size up does not fix physics, it only moves the wall a little further out. Van kitchens run on propane or diesel for a reason, and the station is there for the fridge, the fan and the electronics.",
        "One catalog caveat belongs right here. The EcoFlow RIVER 2 Pro advertises a 1,600W X-Boost figure, and our catalog's buying notes are explicit that it applies to resistive loads only and will not run a 1,500W microwave. Native output is 800W. Never read a boost figure as an inverter rating you can plan around — plan around the native number, and treat the boost as a bonus that sometimes applies.",
      ],
      table: {
        caption: "Capacity and continuous output as our catalog's verified spec strings record them; weights and the second output figure as each manufacturer publishes them",
        columns: ["Station", "Capacity", "Continuous AC", "Second number, as published", "Weight", "What that means in a van"],
        rows: [
          [
            "EcoFlow RIVER 2 Pro",
            "768Wh LiFePO4",
            "800W",
            "1,600W X-Boost (resistive loads only)",
            "18.2 lb",
            "Fridge plus devices for a weekend; a genuine one-hand carry; no chance of cooking on it",
          ],
          [
            "Jackery Explorer 1000 v2",
            "1,070Wh LiFePO4",
            "1,500W",
            "3,300W surge",
            "23.8 lb",
            "The default full-time size — a fridge plus a whole work setup, with surge headroom that starts motors without drama",
          ],
          [
            "Bluetti AC180",
            "1,152Wh LiFePO4",
            "1,800W",
            "2,700W Power Lifting Mode — heating loads; no surge figure published",
            "~35 lb",
            "The most capacity and the strongest inverter of the three; heavy enough that it lives in one spot rather than moving with you",
          ],
        ],
      },
    },
    {
      heading: "Step three: the recharge path is the real ceiling",
      body: [
        "This is the step most sizing advice skips, and it is the one that changes what you buy. The battery is a buffer. What sets the size you need is the gap between refills — so before comparing capacities, work out how you are actually going to put energy back in.",
        "Shore power is the fast one, and it is worth planning around rather than treating as a fallback. Bluetti publishes 0-80% in about 45 minutes for the AC180; Jackery publishes roughly a one-hour recharge for the Explorer 1000 v2; EcoFlow publishes about 70 minutes for a full 0-100% on the RIVER 2 Pro. Those are the manufacturers' own figures, and they reframe the purchase: if you can reach a campground pedestal, a friend's garage or a workshop outlet every second or third day, you need far less battery than a solar-only build does. An hour on a wall socket beats a whole sunny day of folding panels.",
        "Driving is the path people over-trust. A station's car-charging cable runs off the 12V accessory socket, and that socket is fused low. Check your own fuse box rather than trusting a figure from a page like this one, but the arithmetic that sets the ceiling is simple: an accessory socket on a 10A or 15A fuse, at the 12-13V a running vehicle actually supplies, has only about 120-180W of headroom before the fuse is the limit — which is why car-charging inputs on portable stations are rated in that neighbourhood rather than in hundreds of watts. Do the arithmetic before you rely on it: at roughly 100W of real input, refilling 1,000Wh is on the order of ten hours of driving. That is a trickle that keeps a topped-up station topped up. It is not a rescue for a flat one. If you want the alternator to genuinely carry your electrics, the answer is a DC-DC charger wired into a house battery, which is a different product with a different install — more on that at the end.",
        "Solar is the third path, and the spec to check when choosing a station is its maximum solar input. That ceiling is a hard cap: connect more panel than the station accepts and the extra watts are simply ignored. By each maker's published spec, the RIVER 2 Pro accepts up to 220W, the Explorer 1000 v2 up to 400W, and the AC180 up to 500W. Notice what that means for sizing — the AC180 does not just hold more energy, it can absorb a bigger array, so it digs out of a deficit faster. If your plan is solar-first, the input cap deserves as much weight in the decision as the capacity number does.",
        "We are not going to redo the array math here, because it already has its own page. How many panel watts your daily draw needs — daily watt-hours divided by usable sun hours, plus the 20-30% real-world derate every panel pays — is worked through in our guide on how many solar panels it takes to keep a power station charged off-grid. Read that one before you buy panels. The short version for this page: a single 100W folding panel is a trickle that offsets phones and lights, not a van life solar system, and a fridge-based daily draw wants a few hundred watts of panel — which in a van usually means panels fixed to the roof rather than a folding panel on the ground you re-aim three times a day.",
      ],
      table: {
        caption: "Solar input ceilings — each manufacturer's published maximum",
        columns: ["Station", "Max solar input (published)", "Why it matters when you are choosing"],
        rows: [
          ["EcoFlow RIVER 2 Pro", "220W", "About two 100W panels' worth. Fine for a light draw; slow to dig out of a deficit"],
          ["Jackery Explorer 1000 v2", "400W", "Room to grow — start with one panel and add more as your daily number grows"],
          ["Bluetti AC180", "500W", "The most array headroom of the three; the pick if solar is your primary source"],
        ],
      },
    },
    {
      heading: "The spec nobody checks, and in a van it decides how many years you own it",
      body: [
        "Cycle life is a number on every spec sheet that almost nobody reads, because for most buyers it genuinely does not matter. A cycle is roughly one full charge and discharge, and the rating is how many of them the pack takes before it settles to about 80% of its original capacity. A weekend camper puts perhaps twenty cycles a year through a station; at that rate any modern rating outlives the owner's interest in the hobby.",
        "Van life is the use case that flips this spec from trivia into the most important line on the sheet, because you cycle the thing every single day. At one cycle a day, the rating converts directly into calendar years, and the arithmetic is simple enough to do in your head. Jackery's published rating for the Explorer 1000 v2's LiFePO4 pack is 4,000 cycles — about eleven years of daily use. Our catalog records 3,000-plus cycles for the EcoFlow RIVER 2 Pro, so call that about eight years at the same rate. Both are longer than most people keep the van.",
        "The contrast is what makes it worth checking. LiFePO4 — lithium iron phosphate, often written LFP — is rated in the thousands of cycles. The older NMC lithium chemistry that cheaper and older portable stations use is commonly rated in the hundreds. At one cycle a day, a few hundred cycles is a year or two, not a decade. That is the difference between a station that outlives the van and one you buy twice, and it is completely invisible on a comparison that only looks at watt-hours and price. If a listing does not say LiFePO4 or LFP anywhere, assume it is the other chemistry and ask before you buy. All three stations here are LiFePO4. Our catalog does not record a cycle figure for the Bluetti AC180, but Bluetti's own spec page publishes 3,500+ cycles to 80% of original capacity, which is about nine and a half years at one cycle a day — between the other two, and again longer than most people keep the van.",
        "Two honest qualifiers. First, partial cycles count partially: running from 100% down to 60% and back is not a full cycle, and most van days are partial, which stretches the calendar further than the raw division suggests. Second, cycle ratings are laboratory figures taken at specified temperatures and charge rates. A station that spends July at oven temperature inside a metal box, or that sits at 100% in the heat for weeks at a time, will not track its datasheet. Treat the number as a ranking between chemistries rather than a promise about your van.",
      ],
    },
    {
      heading: "What size, by the van life you are actually doing",
      body: [
        "Put the three numbers together — daily watt-hours, inverter output, recharge ceiling — and the answer sorts into four profiles. Pick the one that describes your trip honestly rather than the one that describes the trip you hope to take one day, because the cost of over-buying here is weight and money you carry every mile.",
        "The pattern underneath them is this: a part-time van with a 12V fridge, out three to five nights at a stretch, is where a power station is genuinely the right product — and it is also the biggest slice of people who ask this question. Below that you are over-buying, paying for a fridge's worth of capacity to charge a phone. Above it you are asking a plug-and-play appliance to do an installed system's job, which it will do, but not as well or as cheaply as the wired alternative.",
        "The picks below are researched from manufacturer specifications, our catalog's verified spec strings and long-term owner feedback. Nobody here has bench-tested them and we will not pretend otherwise. Prices move constantly with sales, so treat the bands as bands.",
        "Jackery Explorer 1000 v2 — the default answer for the middle profile, and the one to pair with solar. 1,070Wh of LiFePO4, a genuine 1,500W inverter with 3,300W of surge, three AC outlets plus two 100W USB-C ports, a USB-A and a 12V output, and Jackery's published recharge of roughly an hour from a wall socket. Its 400W solar input leaves room to grow the array as your daily number grows. The catch, straight from our catalog: it is 23.8 lb, which is a two-hand lift with a folding handle; there is no wireless charging pad; and the MSRP is $799, but it is frequently deep-discounted, so buy it on sale rather than at list.",
        "Bluetti AC180 — the pick if solar is your primary source, or if you want the most inverter for the money. 1,152Wh, an 1,800W inverter — the strongest continuous rating of the three — plus the 2,700W Power Lifting Mode Bluetti reserves for high-power heating loads rather than motor starts, four AC outlets, a 100W USB-C and a wireless pad, a published 0-80% in 45 minutes, a 20ms UPS switchover, and the biggest solar input of the three at 500W. The catch: about 35 lb, which makes it a haul-it-once, leave-it-there unit rather than something you carry to a picnic table; the cooling fan is audible under heavy load, which matters more in a space the size of a van at night than it would in a house; and the solar panel is sold separately, so the off-grid-ready price is higher than the sticker.",
        "EcoFlow RIVER 2 Pro — the right answer for the weekend profile, and genuinely under-rated for it. 768Wh in a body EcoFlow's spec page lists at about 18.2 lb, recharging 0-100% in about 70 minutes, four AC outlets, a 100W USB-C and a car port. For weekends without a fridge it is enough capacity, and the weight difference against the other two is the difference between a box you move around the van freely and a box you resent. The catch is the ceiling: native AC output is 800W, its 220W solar input is the smallest here, and the 1,600W X-Boost figure applies to resistive loads only. If your plan involves a fridge running every day, this is the wrong tier and you will feel it by the third night.",
        "The panel: if you buy the Jackery, the SolarSaga 100W is the plug-and-play companion — a foldable bifacial panel that Jackery rates at about 25% efficiency, with DC and USB output, and our catalog's spec line lists it as fitting the Explorer 240, 300, 500, 1000 and 1500. The honest caveats are the catalog's own: it is a companion, not a standalone charger; real output falls below the rated 100W whenever the sun is not perfect; and you must confirm the connector matches your exact station. If your station is a Bluetti or an EcoFlow, buy that brand's panel or a verified adapter instead — mismatched connectors are the most common reason a panel does not work with a station.",
      ],
      table: {
        caption: "Profile to size — planning figures from the arithmetic above",
        columns: ["Your setup", "Daily draw", "Station size", "How you refill", "What fits from our catalog"],
        rows: [
          [
            "Weekends, cooler with ice, no fridge",
            "~150-300Wh",
            "500-800Wh",
            "Charge at the wall before you leave; trickle from the 12V socket while driving",
            "EcoFlow RIVER 2 Pro (768Wh, ~18 lb)",
          ],
          [
            "Part-time van, 12V fridge, out 3-5 nights",
            "~500-800Wh",
            "1,000-1,200Wh",
            "Wall charge, plus 100-200W of solar for margin",
            "Jackery Explorer 1000 v2 (1,070Wh) or Bluetti AC180 (1,152Wh)",
          ],
          [
            "Full-time, remote work, fridge plus connectivity",
            "~800-1,500Wh",
            "1,000Wh+ and a real array",
            "Solar as the primary source, shore power weekly",
            "Explorer 1000 v2 or AC180 with 300-400W of panel — or step past power stations entirely",
          ],
          [
            "Anyone planning to cook or heat electrically",
            "2,000Wh+",
            "No portable station in this class",
            "Not solvable with a bigger battery",
            "Propane or diesel for heat and cooking; the station runs electronics only",
          ],
        ],
      },
      productIds: [
        "jackery-explorer-1000-v2-portable",
        "bluetti-ac180-portable-power-station",
        "ecoflow-river-2-pro-portable",
        "jackery-solarsaga-100w-portable-solar",
      ],
    },
    {
      heading: "When a power station is the wrong answer for a van entirely",
      body: [
        "It is worth saying plainly that a meaningful share of the people asking this question should not buy one of these at all. A page that only ever tells you which to buy is not being straight with you.",
        "If you are doing a permanent build and expect to live in the van for years, the appliance is probably not the right architecture. A power station is a plug-and-play box: you pay a premium per watt-hour for the packaging — the case, the screen, the inverter, the handle — everything runs through sockets, and it charges from the vehicle at a trickle. A wired 12V house system does the same job differently: a LiFePO4 house battery, a DC-DC charger taking a real charge off the alternator every mile you drive, and roof panels through a charge controller. It costs less per watt-hour at size, it charges while you drive instead of only while you sit, and it disappears under a bed instead of eating floor space. The reason plenty of people still rationally choose the appliance is that the install is real work — wiring, fusing, mounting, a weekend or two, and a tolerance for getting it wrong the first time. Both answers are defensible. Buying the appliance while planning the install is the expensive middle.",
        "If your plan involves cooking or heating with electricity, no station in this class is the answer and neither is the next size up. That is the resistive-load arithmetic from earlier, and it does not bend. Air conditioning is the same problem one size larger — we have a separate page on what it actually takes to run a portable AC off-grid, and the short version is that it is a far bigger battery question than a fridge is.",
        "And if you drive daily and only need phones, a laptop and lights, you are looking at the wrong product entirely. A high-wattage USB-C car charger and a compact power bank cover that need for a fraction of the money and none of the weight. Buying 1,000Wh for a phone's worth of demand is the most common way to over-spend in this category.",
        "The tell that sorts most people: if you can plug into a wall every two or three days, buy less battery than the internet tells you to, and spend the difference on the fridge, the fan and the mattress. If you cannot, buy the solar first and the bigger battery second — because capacity without a refill is just a longer countdown.",
      ],
    },
  ],
  faq: [
    {
      q: "What size power station do I need for van life?",
      a: "For the common setup — a 12V fridge, LED lights, a fan, phones and a laptop — 1,000 to 1,200Wh with a 1,500W or larger inverter is the size that works, which is where the Jackery Explorer 1000 v2 (1,070Wh) and Bluetti AC180 (1,152Wh) sit. Weekends without a fridge are comfortable on 500-800Wh. Full-time with a fridge plus always-on internet needs 1,000Wh or more together with 300-400W of solar, or an installed 12V system instead.",
    },
    {
      q: "Will a 1,000Wh power station run a 12V fridge all day?",
      a: "Usually yes, with room left over. A compressor fridge cycles rather than running constantly, so as a planning band — read the real watt rating off your own fridge — a unit drawing 45-60W while the compressor is on works out to roughly 350-650 watt-hours across a day — under two-thirds of a 1,070Wh station, leaving headroom for lights, a fan and devices. Two things move that number against you: hot weather raises the duty cycle sharply, and running the fridge from an AC outlet instead of the station's 12V port converts the power twice and wastes some of it. Use the 12V lead if your fridge has one.",
    },
    {
      q: "Can I run a kettle, induction hob or heater off a van power station?",
      a: "Not usefully at this size. Resistive appliances turn electricity straight into heat, which is the most expensive thing you can ask a battery for — a 1,500W hob for ten minutes is 250 watt-hours, a quarter of a 1,000Wh station, and only if the inverter can deliver 1,500W continuously in the first place. Buying a bigger station does not fix this, it just moves the wall. Van kitchens run on propane or diesel for a reason, and air conditioning is the same problem one size larger.",
    },
    {
      q: "How long does it take to recharge a power station in a van?",
      a: "It depends entirely on the source. From a wall socket, the manufacturers publish about 45 minutes to 80% for the Bluetti AC180, roughly an hour for the Jackery Explorer 1000 v2, and about 70 minutes to full for the EcoFlow RIVER 2 Pro. From solar you are capped by the station's published input ceiling — 220W, 400W and 500W respectively — and by real panel output, which runs well under the panel's rating. From the vehicle's 12V accessory socket it is a trickle: an accessory socket on a 10A or 15A fuse has only about 120-180W of headroom at 12-13V, so at roughly 100W of real input a 1,000Wh refill is on the order of ten hours of driving. Check your own fuse box for its actual rating.",
    },
    {
      q: "Does LiFePO4 actually matter for van life, or is it marketing?",
      a: "For van life it is the spec that decides how long you own the thing. You cycle a station daily, so the cycle rating converts straight into years: Jackery's published 4,000-cycle rating for the Explorer 1000 v2 is about eleven years at one cycle a day, and the 3,000-plus cycles our catalog records for the EcoFlow RIVER 2 Pro is about eight. The older NMC chemistry in cheaper stations is commonly rated in the hundreds of cycles, which is a year or two at the same usage. For a weekend camper the difference is irrelevant. For a full-timer it is the whole purchase.",
    },
    {
      q: "Do I need solar, or is charging while I drive enough?",
      a: "If you drive most days and your draw is modest, driving plus the occasional wall socket genuinely is enough, and solar is money spent on a capability you will rarely use. If you park for three days or more at a time with a fridge running, driving will not keep up — the 12V socket trickle is far too slow to cover a fridge-based daily draw. The dividing line is how often you move, not how far you go.",
    },
  ],
  relatedGuides: [
    "how-many-solar-panels-to-keep-a-power-station-charged-off-grid",
    "do-power-stations-work-in-cold-weather",
    "best-power-stations-compared",
  ],
  sources: [
    {
      label: "Jackery Explorer 1000 v2 — specifications on the Amazon listing",
      url: "https://www.amazon.com/dp/B0D7PPG25F?tag=blackboxsuppl-20",
    },
    {
      label: "BLUETTI AC180 official specifications",
      url: "https://www.bluettipower.com/products/ac180",
    },
    {
      label: "EcoFlow RIVER 2 Pro official specifications",
      url: "https://us.ecoflow.com/products/river-2-pro-portable-power-station",
    },
    {
      label: "Jackery SolarSaga 100W — specifications on the Amazon listing",
      url: "https://www.amazon.com/dp/B0D5CCY5Y2?tag=blackboxsuppl-20",
    },
  ],
  heroImage: "/products/scene/jackery-explorer-1000-v2-portable.webp",
  picks: [
    {
      id: "jackery-explorer-1000-v2-portable",
      cat: "useful",
      label: "The default van-life size",
    },
    {
      id: "bluetti-ac180-portable-power-station",
      cat: "useful",
      label: "If solar is your main source",
    },
    {
      id: "ecoflow-river-2-pro-portable",
      cat: "useful",
      label: "Weekends without a fridge",
    },
    {
      id: "jackery-solarsaga-100w-portable-solar",
      cat: "useful",
      label: "The plug-and-play panel for the Jackery",
    },
  ],
};
