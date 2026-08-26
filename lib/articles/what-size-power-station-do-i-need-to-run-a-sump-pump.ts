import type { Article } from "@/lib/articles";

/**
 * Long-tail buyer-intent sizing article.
 * Target keyword: "what size power station do i need to run a sump pump"
 *
 * WHY THIS PAGE EXISTS (commercial reasoning, 2026-08-26):
 * Google autocomplete returns this exact phrase as suggestion #1 for the seed, and the seed
 * "power station for sump pump" returns a full 10-deep brand-qualified ladder. The live SERP is
 * ten small affiliate blogs and one manufacturer - no Wirecutter, no CNET, no Consumer Reports -
 * so domain authority is not the moat here. Honest arithmetic is. The page routes to the two
 * highest-commission units in the catalog ($399-699 and $449-799 against a $70 catalog median),
 * and it earns that by disqualifying one of our own products on the mechanism.
 *
 * Honesty laws respected: no "we tested"; no republished Amazon ratings or review counts; no
 * invented pump specs. We stock no sump pump, so the page teaches a SIZING METHOD driven by the
 * reader's own nameplate and a clearly-labelled worked example - it never asserts a real pump's
 * figures.
 *
 * ADVERSARIAL AUDIT, 2026-08-26 - what the first draft got wrong, so nobody reinstates it:
 *   1. It printed the Jackery surge as 3,300W. Jackery's own Tech Specs table says "1500W Rated,
 *      3000W Surge peak". 3,300W is a spec-aggregator figure that also sits in an older entry in
 *      our catalog. Corrected to 3,000W throughout, per jackery-1000-v2-vs-bluetti-ac180.ts.
 *   2. It sold the AC180's 2,700W as motor-surge headroom. BLUETTI's own page calls that figure
 *      "Power Lifting Mode", for "high-power heating devices ... space heaters, hair dryers,
 *      electric kettles, electric blankets" - i.e. RESISTIVE. The page now says so, which also
 *      removes a flat self-contradiction with its own X-Boost section below.
 *   3. It said "Bluetti publishes a 20ms UPS switchover". BLUETTI does not - the figure is not on
 *      bluettipower.com/products/ac180 (verified twice). It comes from our catalog. Now stated
 *      as such, and no longer load-bearing for the primary pick.
 *   4. It attributed the X-Boost resistive-only caveat to "EcoFlow's own published note". That
 *      note is NOT on EcoFlow's product page (verified); it is our catalog's buying note. The
 *      sibling live page can-a-portable-power-station-run-a-space-heater.ts already gets this
 *      right - matched to it.
 *   5. "Bluetti notes the cooling fan is audible under heavy load" - that is our catalog's cons
 *      entry, not a BLUETTI statement. Reattributed.
 *   6. The 10W inverter idle draw and the 3x-6x locked-rotor band were asserted as fact and as
 *      "the standard published range". Neither is sourceable to a maker or a standard. Both are
 *      now labelled stated planning assumptions, matching how the site already handles its 85%
 *      inverter figure.
 *   7. It mapped HP classes to amp bands (1/3 HP = 4-6A etc). Unsourced, and it contradicted the
 *      page's own claim to assert no pump specifications. Removed; the plate governs.
 *   8. A source labelled "Jackery Explorer 1000 v2 official specifications" pointed at an AMAZON
 *      URL. Split into the real jackery.com page plus an honestly-labelled Amazon listing.
 *
 * STILL OPEN, OUTSIDE THIS FILE: data/products.json carries the wrong 3300W surge for
 * jackery-explorer-1000-v2-portable, and the same figure appears in best-power-station-apartment-
 * power-outage.ts, can-a-portable-power-station-run-a-space-heater.ts, do-power-stations-work-in-
 * cold-weather.ts, is-the-ecoflow-wave-3-worth-it.ts, portable-power-station-vs-jump-starter-
 * which-do-i-need.ts and what-size-power-station-for-van-life.ts. Several also repeat the
 * unsourceable 20ms UPS figure as BLUETTI's. Both need a sweep.
 *
 * De-duplication: the shared surge / pure-sine physics belongs to
 * what-size-power-station-to-run-a-refrigerator-in-a-power-outage. This page states it once,
 * links there, and keeps its own weight on pump-specific inrush, storm duty cycle, unattended
 * operation, and the flooded-basement stakes - so the two pages do not compete.
 */
export const WHAT_SIZE_POWER_STATION_DO_I_NEED_TO_RUN_A_SUMP_PUMP: Article = {
  slug: "what-size-power-station-do-i-need-to-run-a-sump-pump",
  title: "What Size Power Station Do I Need to Run a Sump Pump?",
  dek: "Sizing a power station for a sump pump is a surge problem, not a capacity problem. The pump's motor pulls a locked-rotor inrush of roughly three to six times its running watts every time the float rises, and that spike - not watt-hours - is what trips an undersized inverter. Here is how to read your own pump's plate, do the arithmetic, and find out whether a portable battery is honestly the right buy for your basement.",
  category: "Power & Charging",
  readMinutes: 12,
  updated: "August 2026",
  answerFirst:
    "Surge decides this, not capacity. A sump pump motor pulls several times its running watts the instant it starts, so read the running amps off the pump's plate, multiply, and buy a station whose surge rating clears that number with margin. For most 1/3 and 1/2 HP pumps that points at the 1,800W-continuous class - but read the surge caveats below before trusting a headline peak figure. Watt-hours only decide how long.",
  sections: [
    {
      heading: "A sump pump is the hardest thing in your house to run off a battery",
      body: [
        "Almost every guide to this question starts with watt-hours, which is the wrong end of the problem. Capacity tells you how long a power station can run something it is already able to run. Whether it can run a sump pump at all is decided in the first half-second, before capacity is relevant.",
        "Here is the mechanism. A sump pump is an AC induction motor spinning an impeller, and an induction motor has no meaningful resistance to current until the rotor is actually turning. At the instant the float switch closes, the rotor is stationary - electrically the motor looks close to a short circuit - and it draws what engineers call locked-rotor current. That inrush is commonly three to six times the motor's normal running current for split-phase motors of this size, and it lasts a fraction of a second while the rotor accelerates. Your household circuit shrugs it off because a 15A breaker is a slow thermal device and the utility behind it is effectively infinite. An inverter is neither. It has a hard electronic ceiling and a protection circuit that reacts in milliseconds, so it either delivers the spike or it shuts the outlet off.",
        "That much is true of any motor, and it is why the same surge logic governs refrigerators - we worked that version of the problem in detail on our page on sizing a power station for a refrigerator in an outage, including why a pure sine wave inverter is non-negotiable for any motor load. BLUETTI's and Jackery's own specification tables both list pure sine wave AC output, so on a reputable LiFePO4 station that box is generally already ticked. Confirm it on the spec sheet of anything else you consider, and treat a cheap modified-sine car inverter as disqualified on sight.",
        "What makes a sump pump harder than a fridge is three things stacked on top of that shared physics. First, it is a bigger motor: a fridge compressor runs at roughly 100-250W, while sump pumps are sold in horsepower classes, and 1 HP of mechanical output alone is 746W before you account for motor efficiency and power factor. Second, it does not start unloaded. A pump starts against a column of water in the discharge pipe and whatever static head sits between the pit and the outfall, so the motor has to overcome real load from the first revolution instead of free-spinning up to speed. Third - and this is the one people find out the hard way - it starts over and over. A fridge compressor cycles a few times an hour. A sump pump in the storm that caused your outage may cycle every four minutes, and every one of those cycles is another inrush spike at the inverter.",
        "So the sizing question splits cleanly in two, and you have to answer them in this order. Can the station survive the spike? Only then: can it hold enough energy for the number of spikes the storm is going to ask for?",
      ],
    },
    {
      heading: "The arithmetic, using your pump's plate instead of our guesswork",
      body: [
        "We do not sell sump pumps and we are not going to invent numbers for yours. Every sump pump carries a nameplate - a sticker or a stamped panel on the motor housing - and that plate is the only figure that governs your basement. Go read it before you shop. On a 115V pump you are looking for the running amps, usually printed as amps, FLA, or full-load amps.",
        "Running watts is then just multiplication: amps times 115. A pump listing 8.0A is drawing roughly 920W while it is pumping. Then multiply that by the locked-rotor multiple to get the spike the inverter has to survive. If the manufacturer publishes an LRA (locked-rotor amps) figure on the plate or the spec sheet, use it - it is the real number for your motor. If they do not, the honest move is to plan across the range rather than pick a flattering point in it.",
        "The table below is that range, done for you. Find the row nearest your plate's amps and read across.",
      ],
      table: {
        caption:
          "Your pump's plate -> the inrush your station's peak rating has to survive (115V)",
        columns: [
          "Plate running amps",
          "Running watts",
          "Inrush at 3x (optimistic)",
          "Inrush at 5x",
          "Inrush at 6x (worst case)",
        ],
        rows: [
          ["4.0 A", "460 W", "1,380 W", "2,300 W", "2,760 W"],
          ["6.0 A", "690 W", "2,070 W", "3,450 W", "4,140 W"],
          ["8.0 A", "920 W", "2,760 W", "4,600 W", "5,520 W"],
          ["10.0 A", "1,150 W", "3,450 W", "5,750 W", "6,900 W"],
          ["12.0 A", "1,380 W", "4,140 W", "6,900 W", "8,280 W"],
        ],
      },
    },
    {
      heading: "What that table actually tells you, including the part that is uncomfortable",
      body: [
        "Now put the stations against it, and read the headline numbers more sceptically than the makers write them. BLUETTI's specification table files the AC180 at 1,800W continuous with 2,700W under 'Surge Power'. Jackery's Tech Specs table states, verbatim, 'AC Total Output: 1500W Rated, 3000W Surge peak'. Those are the two largest surge figures in our catalog, and neither of them clears the 6x column for anything above about a 6-amp pump.",
        "Two corrections to numbers you will see repeated elsewhere, including in older entries in our own catalog, because on this page they decide a purchase. The first is simple: Jackery's surge is 3,000W, not the 3,300W that circulates on spec-aggregation sites. We use the manufacturer's table. The second matters far more for a pump. BLUETTI's marketing copy describes the same 2,700W figure as '2,700W Power Lifting Mode', and BLUETTI's own page says Power Lifting 'allows AC180 to run high-power heating devices up to 2,700W, such as space heaters, hair dryers, electric kettles, electric blankets'. Every one of those is a resistive load. Power Lifting works by delivering a high-draw appliance reduced voltage, which a heating element tolerates happily and a motor does not - which is the same objection this page raises against EcoFlow's X-Boost further down, and it would be dishonest to apply it to one brand and not the other. Because the identical 2,700W appears under both labels on BLUETTI's page, do not assume all of it is available to a sump pump's inrush. The number you can rely on for a motor load is the 1,800W continuous rating, and the surge headroom above it is less certain than a spec sheet makes it look.",
        "Read that honestly and it says something most pages in this search will not. For a small pump in roughly the 4-6 amp band, a 2,700-3,000W surge figure has real margin over the middle of our range, and this is a defensible buy. For a mid-size pump around 8 amps you are inside the optimistic column and outside the pessimistic one, and whether it works depends on your specific motor, your head height, and how much of that surge number is genuinely available to a motor rather than to a kettle. For a 10-12 amp pump the arithmetic stops being encouraging, and a portable power station is a gamble you are taking with a flooding basement as the stake.",
        "You will notice we have not printed a horsepower-to-amps table. That is deliberate. We do not stock pumps, and the mapping from an HP class to a running-amps figure varies by maker, by motor type and by model - a page that hands you '1/2 HP means 8 amps' is guessing on your behalf about the one number that decides your purchase. Your plate is the only thing that settles it, and it is two minutes away.",
        "Two more things about surge ratings that the spec sheets tend not to say. A peak or surge figure is a burst rating with a duration attached, and makers rarely publish that duration; a number good for 20 milliseconds is a different product from one good for two seconds, and a pump's inrush decays over a few line cycles rather than instantly. And peak ratings are usually characterised on clean, well-behaved loads. That is why this page ends up recommending a bucket test you run yourself on a dry day - we would rather send you to do that than tell you a number will definitely work.",
        "The practical rule that falls out of all this: buy the largest peak rating your budget reaches, treat the 3x column as the floor rather than the target, and never size a sump-pump backup to exactly clear a spec. Margin here is not luxury - it is the difference between a wet floor and a dry one.",
        "Those are the only two units in our catalog with surge ratings anywhere near the right territory, so they are the two candidates for the rest of this page. The full case for each - including why the one with the smaller surge number is our primary pick - is further down.",
      ],
      productIds: [
        "bluetti-ac180-portable-power-station",
        "jackery-explorer-1000-v2-portable",
      ],
    },
    {
      heading: "Runtime is a question about cycles, not hours",
      body: [
        "Once the station can start the pump, capacity decides how long you are covered - and the intuitive method (running watts times outage hours) is wildly wrong, because a sump pump is idle most of the time even during a storm. What matters is how many times it runs per hour and how long each run lasts.",
        "You can measure both, and it takes ten minutes. During any decent rain, watch the pit: time how long the pump runs from the moment it kicks on to the moment it shuts off, and count how many times it does that in an hour. Those two numbers are your basement's real load profile, and they are far more useful than any generic figure, because pit volume, float travel, pump rate and how much groundwater your lot sheds all vary house to house.",
        "Here is the arithmetic worked through with a stated example. Assume - as an example, not as a claim about your pump - a pump whose plate reads 9.0 amps at 115V, so roughly 1,035W; call it 1,000W. Assume it runs 30 seconds per cycle. Energy per cycle is 1,000W times 30 seconds divided by 3,600, which is about 8.3 watt-hours. That is a startlingly small number, and it is why people who only look at running watts badly misjudge this in both directions.",
        "One thing you must add: the inverter's own idle draw. A station sitting there with its AC output enabled and nothing running still burns power simply keeping the inverter awake, and over a long night that is not a rounding error. Neither our catalog nor these makers' specification tables publish an idle figure for these particular units, so the table below applies a flat 10W - a stated planning assumption, not a measurement and not a manufacturer's number, printed here so you can redo the sum with a better figure if you have one. On that assumption, a 12-hour overnight outage costs roughly 120Wh in standby alone, potentially more than the pumping itself at low cycle rates. If your unit displays its real idle draw on the panel or in its app, use that instead of ours.",
        "You also need the capacity side stated honestly, because nameplate watt-hours are not usable watt-hours. Inverter conversion losses mean you should plan on roughly 85-90 percent of the number on the box actually reaching the pump - again a stated planning assumption we apply across the site, not a measurement of these units. The BLUETTI AC180's 1,152Wh is therefore about 980-1,040Wh of real work; the Jackery Explorer 1000 v2's 1,070Wh is about 910-960Wh; the EcoFlow RIVER 2 Pro's 768Wh is about 650-690Wh.",
        "Put the two halves together and the answer for an ordinary night is reassuring while the answer for a bad one is not. A 12-hour overnight outage at four cycles an hour needs about 520Wh - comfortable on either 1kWh-class unit, with enough left over to keep a phone and the router alive. The same outage at ten cycles an hour needs about 1,120Wh, and neither of them covers it. At fifteen cycles an hour you are asking for 1,620Wh over twelve hours and you have left the portable-station category entirely.",
        "The uncomfortable correlation is that the outages during which your pump cycles hardest are exactly the storms most likely to knock the power out for longest. Sizing for a calm 24 hours and getting a violent 12 is the standard way this plan fails. If your measured storm rate is at the high end, either plan on being home to recharge the station from a car inverter or a generator partway through, or accept that this is not the right product for your basement - which a later section of this page is about.",
        "One legitimate way to buy back a lot of runtime: unplug everything else. It is tempting to treat a 1kWh station as the whole-outage solution and hang the router, a lamp and a phone charger off it. During a storm outage the pump is the only load whose failure costs you a floor. Give it the whole battery. Now find your measured cycle rate in the table below - our assumed 10W idle allowance is already folded in - and read across.",
      ],
      table: {
        caption:
          "Worked example: a ~1,000W pump running 30 seconds per cycle, plus an assumed ~10W inverter idle (our planning figure, not a published spec). Find your measured cycle rate.",
        columns: [
          "Cycles per hour",
          "Watt-hours per hour (pump + idle)",
          "6-hour outage",
          "12-hour outage",
          "24-hour outage",
        ],
        rows: [
          ["2 (light rain)", "~27 Wh", "~160 Wh", "~320 Wh", "~650 Wh"],
          ["4 (steady rain)", "~43 Wh", "~260 Wh", "~520 Wh", "~1,030 Wh"],
          ["6 (heavy rain)", "~60 Wh", "~360 Wh", "~720 Wh", "~1,440 Wh"],
          ["10 (storm, high water table)", "~93 Wh", "~560 Wh", "~1,120 Wh", "~2,230 Wh"],
          ["15 (pump near its limit)", "~135 Wh", "~810 Wh", "~1,620 Wh", "~3,240 Wh"],
        ],
      },
    },
    {
      heading: "Four failure modes that only bite a sump pump, and the test that catches them",
      body: [
        "Every one of these is a way a correctly-sized station still leaves you with water in the basement. None of them show up in a spec comparison.",
      ],
      list: [
        "Eco mode / AC auto-shutoff is the silent killer|Many power stations turn the AC inverter off automatically after a period of low or no draw, to save standby energy. That is a sensible default for a laptop and a catastrophic one for a sump pump, which by design sits drawing nothing for twenty minutes at a time between cycles. The station goes to sleep, the float rises, and nothing happens. Find this setting in the app or the panel menu before you need it, turn it off, and verify by leaving the station idle for an hour with the pump plugged in and then triggering a cycle by hand.",
        "A power station is a manual device unless it has pass-through UPS|The outage that floods a basement happens at 3 a.m., or while you are at work, or on the weekend you are away. Unless the pump is already plugged into the station and the station is already plugged into the wall, somebody has to be home to make the swap. BLUETTI markets a UPS mode on the AC180 and lists pass-through charging, which is what lets you leave the pump running through the station permanently. Be careful with the switchover number, though. Our catalog carries a 20ms figure, and it is repeated all over the internet, but it does not appear on BLUETTI's own specification table for the AC180, and we are not going to certify a millisecond figure we cannot source to the manufacturer. The good news is that a pump is far more forgiving here than a computer: an induction motor simply restarts after a brief transfer gap, so what you are buying is pass-through existing at all, not a certified transfer time. That is still the difference between backup you own and backup you have to be present for, and it is the main reason the AC180 is our primary pick here rather than the unit with the bigger surge number. If an exact transfer time genuinely matters to you, confirm it on the listing you are buying from.",
        "Extension cords and GFCI protection are part of the system|If the station sits anywhere but right beside the pit, the pump is running down a cord, and a long or thin cord drops voltage - which for an induction motor means higher current, more heat, and a harder start. Use the shortest, heaviest-gauge cord that reaches, or move the station. Separately: many jurisdictions require GFCI protection on a sump pump receptacle, and a power station's AC outlet may not provide it. Check your local code and, if you are not certain, ask an electrician - this is a wet basement with a motor in it, and it is not the place to guess.",
        "Nobody tests it until the night it matters|A backup you have never operated is a hypothesis. On a dry Saturday, plug the pump into the station on battery power, pour a bucket of water into the pit, and watch what happens when the float rises. If the station's overload protection trips, you have learned it for the price of a bucket of water instead of a finished basement. Do it again after any firmware update, and re-run it every autumn along with charging the battery.",
      ],
    },
    {
      heading: "Why the EcoFlow RIVER 2 Pro is the wrong buy for this job",
      body: [
        "We sell this unit, we like it, and it is the wrong tool here. Saying so is more useful to you than another page that recommends whatever it happens to stock.",
        "EcoFlow rates the RIVER 2 Pro at 768Wh with 800W of native AC output and a 1,600W X-Boost figure. Two problems. The first is the plain one: 800W of native inverter does not clear the inrush of any sump pump worth backing up, and on many pumps it will not even clear the running watts - an 8-amp pump draws about 920W just to keep pumping.",
        "The second problem is the more important one, because X-Boost is exactly the feature a buyer would reach for to rescue the first. Our catalog's buying notes for this unit are explicit about the limit: that 1,600W figure is for resistive loads only. Be clear about whose caveat that is - it is ours, not a line we can point to on EcoFlow's own product page, which presents X-Boost simply as a way to run high-wattage home appliances and states no load-type restriction at all. The mechanism is the reason to believe it anyway, and it is the same one BLUETTI documents for its own Power Lifting mode: a mode of this kind gets a high-wattage device under the inverter's ceiling by delivering it reduced voltage, which works beautifully for a kettle or a space heater, where lower voltage simply means less heat and a slower job. Feed a motor reduced voltage and the physics runs the other way: the motor tries to hold torque by drawing more current, it runs hotter, and under load it can fail to come up to speed at all. A pump starting against a head of water is precisely the load that punishes this.",
        "So the honest verdict on the RIVER 2 Pro for a sump pump is no, and not by a small margin. It remains an excellent one-hand-carry unit - our catalog lists 17 lb, EcoFlow's own page says approximately 18.2 lb - that EcoFlow rates for a 0-100% recharge in about 70 minutes, which is why we recommend it for CPAP machines, mini fridges and campsites. It is not a sump pump backup, and no amount of X-Boost makes it one.",
      ],
    },
    {
      heading: "What to buy, by pump size - and the box that only looks like the answer",
      body: [
        "Everything below is researched from each maker's published specifications and from patterns in long-term owner reviews. We do not run a lab and we will not pretend to have bench-tested anything. Prices are approximate and move constantly with sales.",
        "For most people, the BLUETTI AC180 is the pick, and the reason is the pass-through operation rather than the raw numbers. BLUETTI's own page publishes 1,152Wh of LiFePO4 capacity, 1,800W of continuous AC across four 120V outlets, 35.3 lb, and a 0-80% recharge in 45 minutes on 1,440W AC input. The same page carries the 2,700W figure discussed above, which you should read as a resistive-load mode rather than as guaranteed motor headroom. BLUETTI markets a UPS mode and lists pass-through charging but does not publish a switchover time - the widely-quoted 20ms comes from our catalog and from other sites, not from BLUETTI's spec table. Leave the pump plugged into it and the station plugged into the wall, and it is a genuine unattended backup that catches the outage you sleep through. The 45-minute recharge also matters more than it looks during a multi-day storm with intermittent power - a short window of grid restoration refills most of the battery before the next cut. Honest costs, from our catalog's own notes rather than BLUETTI's: it is about 35 lb, so you set it down next to the pit once and leave it there; its solar panel is a separate purchase; and the cooling fan is audible under heavy load, which in a basement nobody sleeps in is a non-issue. It runs $399-699.",
        "The Jackery Explorer 1000 v2 is the pick if your pump is at the upper end of what a portable station can start. Jackery's Tech Specs table publishes 1,070Wh and 'AC Total Output: 1500W Rated, 3000W Surge peak' - the largest surge figure in our catalog, and, importantly for a pump, one that Jackery files as a surge rating rather than as a heating-load mode. On a marginal pump that distinction is the whole decision. (You will see 3,300W quoted for this unit on aggregator sites and in an older entry in our own catalog. It is not what Jackery publishes, so we do not use it.) It is lighter at 23.8 lb, recharges in about an hour, and Jackery rates its LiFePO4 cells for 4,000 cycles. Two honest caveats. Its MSRP is $799 and it is frequently deep-discounted, so buying it at sticker is a mistake - wait for a sale. And our catalog does not carry a UPS switchover figure for it, so unless you confirm one on Jackery's current spec sheet, plan on this being a backup you plug in by hand. That is a real functional difference from the AC180, not a footnote.",
        "If you can only buy one and your pump's plate is 6 amps or under, take the AC180 for the unattended operation. If the plate is 8 amps or over, take the Jackery: its 3,000W is published as a surge rating rather than as a heating-load mode, which is the kind of headroom a motor can actually draw on - and accept that you may need to be home to plug it in. If the plate reads 10 amps or more, buy neither, and read the next section instead.",
        "Now the box that only looks like the answer. This search turns up a lot of products called power stations that are jump starters with an inverter bolted on, and they get bought for this job by people who read the words and not the watts. Our own catalog has one, and it is worth being explicit about what it can and cannot do here. The DeWalt DXAEPS14 is rated at 2,000 peak amps for jump starting, with a 120 PSI compressor and a 500W AC inverter. Those 2,000 peak amps are a 12V DC cranking figure with nothing whatever to do with running a 115V pump - it is the single most commonly misread number in this category. The figure that matters is the 500W inverter, and 500W does not clear the running watts of most sump pumps, let alone the inrush. It cannot do this job, and no arrangement of settings will change that.",
        "What the DeWalt is genuinely good at is the rest of a storm night: a car that will not start on a flooded street, a soft tire, work lights and phones while you deal with the water. At $200-250 it is a rugged multi-tool for exactly that, and if your reason for landing on this page was 'be prepared for a bad night' rather than 'keep the pit dry', it may be the more useful purchase. Just do not buy it expecting it to run the pump, and be sceptical of any listing that leans on a peak-amp number when what you are shopping for is AC watts.",
        "Before you click either of the two real picks, read the next section. A meaningful share of the people who reach this page are shopping in the wrong category altogether, and it is cheaper to find that out now.",
      ],
      productIds: [
        "bluetti-ac180-portable-power-station",
        "jackery-explorer-1000-v2-portable",
        "dewalt-dxaeps14-2000-peak-amp",
      ],
    },
    {
      heading: "Who should skip the power station entirely",
      body: [
        "A meaningful share of people asking this question should buy something else, and a page that will not say so is not worth reading. Four situations:",
        "Your pump is 3/4 HP or larger. Go back to the surge table. A 10-12 amp pump's realistic inrush sits above every peak rating in this class, and the consequence of guessing wrong is not an inconvenience. The purpose-built answer is a dedicated battery-backup sump system: a second DC pump with its own deep-cycle battery and charger, installed in the pit alongside your primary, which switches over automatically and does not involve an inverter at all because the backup pump is natively DC. It is not glamorous and it does not charge your phone, and for a genuinely at-risk basement it is the correct product.",
        "Water in the basement is a serious financial event. If a failure means a finished basement, a furnace, or stored belongings, the honest framing is that you are buying insurance, and insurance should not depend on you being home, awake, and correct about a surge multiple. A dedicated backup system - or a water-powered backup pump, which runs off municipal water pressure and needs no electricity at all, though it consumes a lot of water and is not an option on a well - removes the failure modes listed above rather than managing them. Ready.gov's flood guidance is a reasonable place to start on the wider question of what to protect.",
        "You lose power for days, repeatedly. A battery holds a fixed number of watt-hours and then it is empty. If multi-day outages are normal where you live, a fuel generator (outdoors only, never in a garage or basement) or a professionally installed standby system reflects your reality better than any portable box.",
        "You do not know what your pump draws. Then you are not ready to buy anything yet. Go and read the plate. It takes two minutes with a phone torch, and it converts this entire decision from a guess into arithmetic - it may even tell you the cheaper answer is enough.",
        "The people for whom a portable station is genuinely the right call are the ones with a 1/3 or 1/2 HP pump, an unfinished or tolerant basement, occasional outages measured in hours rather than days, and a wish for one piece of gear that also covers camping, road trips and the router during a blackout. That is a lot of households. It just is not all of them.",
      ],
    },
    {
      heading: "How we sized this",
      body: [
        "We started from the load rather than the product. A sump pump is an induction motor that starts under head, so its locked-rotor inrush - not its running watts and not its watt-hours - is the specification that decides which stations are candidates at all. From there we sized capacity against cycle rate rather than clock hours, because a pump's real energy use during an outage is a function of how often the float rises, which is something you can measure and we cannot.",
        "We stock no sump pump, so this page asserts no specification for any particular pump. The running-amps rows and the worked example are stated as a method and as an example; the only pump figure that governs your purchase is the one on your own nameplate or in your own manufacturer's literature. Be warned that makers vary in what they put online - WAYNE's product pages, for instance, list horsepower and voltage but keep the electrical detail in the downloadable manual rather than on the page - so the plate on the motor is usually faster than the website.",
        "On the multiplier itself we are going to be straight with you, because it is the number this whole page turns on. The 3x-6x band is a planning range we chose in order to show you a spread rather than one flattering figure. It is not a standard we can cite to a manufacturer or to a published motor standard, we could not source a single authoritative multiple that covers all sump pump motors, and some motors will sit outside it. That is precisely why the page tells you to use the LRA printed on your own plate where you have it, to treat the 3x column as a floor rather than a target, and to settle the question with a bucket test rather than with our arithmetic. If that feels like a lot of hedging for a page that is trying to sell you a battery, it is - and it is the honest shape of the answer.",
        "Every station figure here - capacity, continuous and surge AC output, weight, recharge time - is either the maker's own published number or a figure recorded in our catalog, and the text says which, each time it matters. Where those two disagree, or where a widely-repeated number turns out not to appear on the manufacturer's specification table at all, we have said so rather than quietly using the flattering one: that applies to the AC180's 20ms UPS switchover, to its 2,700W Power Lifting figure, to the RIVER 2 Pro's weight, and to the 3,300W surge still circulating for the Jackery. We compared those specs against patterns in long-term owner reviews, but we have not lab-tested these units, prices move with sales, and the only test that settles your case is the bucket test in your own basement. As Amazon Associates we may earn from qualifying purchases; it does not change which unit fits your pump, which is why one of our own products is disqualified above.",
      ],
    },
  ],
  faq: [
    {
      q: "What size power station do I need to run a sump pump?",
      a: "Size by surge, not capacity. Read the running amps off your pump's plate, multiply by 115 for running watts, then by three to six for the locked-rotor inrush the inverter has to survive. For a typical 1/3 to 1/2 HP pump that points at the 1,800W-continuous class - the BLUETTI AC180 or Jackery Explorer 1000 v2, whose published surge figures are 2,700W and 3,000W. Treat both surge numbers as less certain than they look and buy margin. Capacity then decides duration: about 1kWh covers a normal overnight at moderate cycling.",
    },
    {
      q: "Will a 1000Wh power station run a sump pump all night?",
      a: "Usually yes, if it can start the pump at all, because a sump pump is idle most of the time. A pump drawing about 1,000W for 30 seconds a cycle uses roughly 8.3 watt-hours per cycle, so at four cycles an hour a 12-hour night is around 520Wh including inverter standby - comfortable inside a 1kWh unit's roughly 900-1,000Wh of usable capacity. At ten cycles an hour the same night needs about 1,120Wh and a 1kWh station will not finish it.",
    },
    {
      q: "Why does surge matter more than watt-hours for a sump pump?",
      a: "Because the pump's motor is close to a short circuit at the instant it starts. Locked-rotor inrush runs roughly three to six times the running current for a fraction of a second, and an inverter's protection circuit reacts in milliseconds - so it either delivers that spike or shuts the outlet down. Watt-hours only matter once the station has proved it can start the pump.",
    },
    {
      q: "Can the EcoFlow RIVER 2 Pro run a sump pump?",
      a: "No, and we would rather say so than sell it for this. EcoFlow rates it at 800W of native AC, which does not clear the inrush of a sump pump and on larger pumps will not clear the running watts either. Our catalog's buying notes limit its 1,600W X-Boost figure to resistive loads only - that caveat is ours rather than a line on EcoFlow's product page, but the mechanism supports it, because modes of this kind lower output voltage, which helps a kettle and actively harms a motor: a motor under reduced voltage draws more current and runs hotter. It is a good unit for a CPAP or a mini fridge, not for a pump.",
    },
    {
      q: "Do I need a UPS or pass-through function to back up a sump pump?",
      a: "If you want the backup to work when nobody is home, effectively yes. Without pass-through, the pump only gets battery power once a person plugs it in - and outages that flood basements happen at night and while you are out. BLUETTI markets a UPS mode and lists pass-through charging on the AC180, which lets you leave the pump permanently running through the station. The 20ms switchover figure carried in our catalog and repeated widely online does not appear on BLUETTI's own specification table, so we will not certify it - but an induction motor simply restarts after a brief transfer gap, so what matters here is that pass-through exists at all. It is the single most useful feature on a station bought for this job.",
    },
    {
      q: "Is a battery-backup sump pump better than a power station?",
      a: "For a basement where flooding is a serious financial event, yes. A dedicated backup system puts a second, natively DC pump in the pit with its own battery and charger and switches over automatically, so there is no inverter, no surge ceiling, and no need for anyone to be home. A power station is the better buy when your pump is small, your outages are short, and you also want the battery for camping, road trips and keeping the router alive - it is a general-purpose tool doing a specialist job well enough.",
    },
    {
      q: "Why did my power station shut off even though the pump ran fine earlier?",
      a: "Check for an eco mode or AC auto-shutoff setting. Many stations switch the inverter off after a period of low draw to save standby energy, and a sump pump legitimately draws nothing for twenty minutes between cycles - so the station sleeps, the float rises, and the outlet is dead. Disable it, then verify by leaving the station idle for an hour with the pump connected and triggering a cycle by hand.",
    },
  ],
  relatedGuides: [
    "what-size-power-station-to-run-a-refrigerator-in-a-power-outage",
    "best-power-stations-compared",
    "do-power-stations-work-in-cold-weather",
  ],
  heroImage: "/products/scene/bluetti-ac180-portable-power-station.webp",
  sources: [
    {
      label: "BLUETTI AC180 official specifications",
      url: "https://www.bluettipower.com/products/ac180",
    },
    {
      label: "BLUETTI AC180 - Amazon listing",
      url: "https://www.amazon.com/dp/B0C1SMJTDT?tag=blackboxsuppl-20",
    },
    {
      label: "Jackery Explorer 1000 v2 - official product page (1,070Wh, 1,500W output; the Tech Specs table carrying the 3,000W surge figure renders on-page)",
      url: "https://www.jackery.com/products/jackery-explorer-1000-v2",
    },
    {
      label: "Jackery Explorer 1000 v2 - Amazon listing",
      url: "https://www.amazon.com/dp/B0D7PPG25F?tag=blackboxsuppl-20",
    },
    {
      label: "EcoFlow RIVER 2 Pro official specifications (768Wh, 800W output, X-Boost to 1,600W)",
      url: "https://us.ecoflow.com/products/river-2-pro-portable-power-station",
    },
    {
      label: "DeWalt DXAEPS14 jump starter / power station - Amazon listing",
      url: "https://www.amazon.com/dp/B0CL8RYBKX?tag=blackboxsuppl-20",
    },
    {
      label: "Zoeller Pump Company - sump pump manufacturer, model pages and product support",
      url: "https://www.zoellerpumps.com/",
    },
    {
      label: "WAYNE Pumps - sump pump model listing (each model page links its manual and sell sheet)",
      url: "https://www.waynepumps.com/product-category/sump-pumps/",
    },
    {
      label: "Ready.gov - Floods",
      url: "https://www.ready.gov/floods",
    },
  ],
  picks: [
    {
      id: "bluetti-ac180-portable-power-station",
      cat: "useful",
      label: "The pick for unattended backup",
    },
    {
      id: "jackery-explorer-1000-v2-portable",
      cat: "useful",
      label: "The pick for surge headroom",
    },
    {
      id: "dewalt-dxaeps14-2000-peak-amp",
      cat: "useful",
      label: "For the rest of the storm night - not the pump",
    },
  ],
};
