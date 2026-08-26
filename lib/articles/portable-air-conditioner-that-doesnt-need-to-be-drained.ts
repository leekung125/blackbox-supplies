import type { Article } from "@/lib/articles";

/**
 * Long-tail buyer-intent article.
 * Target keyword cluster: "portable air conditioner that doesn't need to be drained"
 * / "self evaporating portable air conditioner" / "portable ac no draining".
 *
 * WHY THIS PAGE EXISTS (commercial reasoning, 2026-08-26):
 * Two full Google autocomplete clusters point at this intent, and the SERP is entirely
 * low-authority affiliate and brand blogs — the best evidence-to-competition ratio in the
 * cooling cluster for a site with our domain authority. It is also decision-stage: the
 * buyer has already chosen "portable AC" and is stuck on one objection ("will I be
 * emptying a bucket every night?"), attached to our two priciest plug-in ACs
 * ($500-$650 and $550-$720, roughly $15-22 a sale at Amazon's ~3%).
 *
 * The differentiated angle: every incumbent sells "self-evaporating" as a product feature.
 * It is a RATE, and whether it keeps up is decided by the buyer's dew point, not the model
 * number. Our own catalog already admits this in the Midea Duo's cons array, and our owner-
 * evidence layer records drainage reports on all three units including the most expensive.
 *
 * Honesty laws respected: no "we tested"; no republished Amazon star ratings or review
 * counts; no invented drainage rate, price, or certification. Manufacturer specs come from
 * the catalog JSON and are attributed to the maker. Owner reports are attributed as owner
 * reports and trace to lib/owner-evidence.ts, whose cited sources are real. Where no
 * published figure exists (evaporation rate, pints/hour) the page says so instead of
 * estimating. The page also tells a whole class of readers to buy a window unit instead.
 *
 * ADVERSARIAL HONESTY AUDIT #1 (2026-08-26, self-audit) - what the FIRST draft overreached on:
 *   - It asserted that all three named units have a drain port near the base, with no source.
 *   - It asserted all three units are self-evaporating.
 *   - Two frequency superlatives had nothing behind them ("the single most-reported way owners
 *     meet the water", the B+D reservoir filling "most often"). Both now say what the evidence
 *     actually is: a report against a named unit, not a measured ranking.
 *   - "Every manual asks for a filter rinse every couple of weeks" invented an interval. Removed.
 *   - The B+D's 450 sq ft is BLACK+DECKER's rating and is labelled as such, but lib/owner-evidence.ts
 *     records owners finding real coverage far below it. That caveat is now in the prose.
 *
 * ADVERSARIAL AUDIT #2 (2026-08-26, ADVERSARIAL PASS - EVERY SOURCE URL ACTUALLY FETCHED).
 * Audit #1 was written from in-repo material and got the DIRECTION of its own corrections wrong:
 * it "fixed" true claims into false ones by asserting negatives it had never opened a page to
 * check. Everything below was verified against the live pages this file cites.
 *   1. WEIGHT - FABRICATED-IN-EFFECT SPEC, and the worst defect on the page. The draft said the
 *      BPACT10WT has "a light-for-the-category ~26 lb body", attributed to BLACK+DECKER.
 *      blackanddecker.com/products/bpact10wt states "Weight: 47.3 LB" in its Specs & Parts
 *      block. The old ~26 lb was 47% low and was
 *      being used as a reason to buy. It came from data/heat-products.json, which carried the
 *      same error in three fields - the catalog has been corrected; see the SWEEP note below,
 *      four more live prose copies of "~26 lb" survive in other files.
 *   2. DRAINAGE - THE NEGATIVES WERE FALSE. The draft claimed "none of the three makers here
 *      spells the port out in its published feature list" and that "Whynter's published feature
 *      list doesn't detail drainage". Fetched: the Whynter ARC-1230WN listing is titled
 *      "...| Built In Dehumidifier with Auto Drain, Cool, Dehumidify and Fan Modes...", and
 *      BLACK+DECKER's own page lists "Auto Water Evaporation" and ships a "Water Drain Hose" in
 *      the installation kit. Two of three makers DO publish it. Fixed in the prose, the mode-two
 *      paragraph, both table rows and FAQ 1. (Independently corroborated: the corrected sibling
 *      lib/articles/whynter-arc-1230wn-vs-midea-duo.ts had already caught the same Whynter error.)
 *   3. NOISE - A MEASUREMENT COMPARED AGAINST THE WRONG THING. The draft credited "RTINGS and
 *      TechGearLab" with "58.4 dBA at four feet against a 42.5 dB claim". Fetched: TechGearLab
 *      says verbatim "produced 58.4 dBa running four feet from the SPL meter with the fan on
 *      high" - a HIGH-fan figure - and never mentions 42.5. RTINGS' page for the model is a
 *      membership stub with no visible result table, so it cannot be credited with the figure.
 *      And 42.5 is not a Whynter "claim" at all: it is lib/comparison-portable-ac.ts's own
 *      noiseDb LOW-setting value (Whynter publishes no number). The page now attributes 58.4 to
 *      TechGearLab alone, says "fan on high", and calls 42.5 what it is.
 *   4. HEAT MODE - audit #1 said it had stopped stating heat as settled fact. It had not: the
 *      buying section still read "a listed heat mode for the cooler months" as a Midea rating.
 *      Fetched: midea.com's MAP14S1TBL page prints "Heat | No"; the ASIN we link (B0FC2SGGF9) is
 *      titled "...with Heat". Both halves are now stated, in the buying section AND the FAQ.
 *      (A fix applied to one of two sites was half a fix.)
 *   5. DUAL-HOSE STEER - the draft made dual-hose the Whynter's differentiator and contrasted
 *      "the dual-hose Whynter" with "the inverter Midea". Midea's own MAP14S1TBL page describes
 *      a hose-in-hose design and lib/comparison-portable-ac.ts records ventType "dual_hose" for
 *      BOTH. Steering to the priciest unit on a tie; now says the difference is the 600 sq ft
 *      rating, not the hose count.
 *   6. ENERGY STAR - a bare https://www.energystar.gov cited under a label that admitted "no
 *      figure on this page is taken from it". A citation supporting nothing is padding. DELETED
 *      rather than replaced with a guess.
 *   7. "5,550 DOE" attributed to BLACK+DECKER. Its own page says "5,500 BTU (10,000 BTU ASHRAE)"
 *      and our own Amazon listing title says "5,500 BTU SACC". Softened to "about 5,500", which
 *      is true of both numbers and contradicts no other page. See the SWEEP note.
 *
 * VERIFIED CLEAN in audit #2: no "we tested" (the page says outright "We don't run a test lab");
 * no Amazon star rating or review count anywhere; all three prices match priceRange exactly
 * ($500-$650 / $550-$720 / $280-$360); all three pick ids exist in data/heat-products.json with
 * cat "heat"; heroImage exists at public/products/scene/; all three relatedGuides slugs resolve
 * (best-portable-air-conditioners -> lib/comparison-guides.ts; single-hose-vs-dual-hose-portable-ac
 * -> registered article; what-size-portable-ac-do-i-need -> EXTRA_ARTICLES in lib/articles-extra.ts,
 * and components/article-view.tsx resolveRelated() falls back to getArticleBySlug, so it renders);
 * both /guides/ source links point at registered pages. Every remaining source URL was FETCHED and
 * contains what its label claims. NO DUPLICATE: no page in lib/articles/ or lib/articles-extra.ts
 * targets the drainage query - the neighbours (best-portable-air-conditioners,
 * single-hose-vs-dual-hose-portable-ac, what-size-portable-ac-do-i-need, best-portable-ac-no-central-air)
 * mention drainage only as a one-line bullet inside a different intent.
 *
 * NOT FIXED HERE - two open items, both in files this task did not own:
 *   a) CLOSED 2026-08-26. Both sweeps were counted and applied, not one-file edits:
 *      weight -> 47.3 lb in 10 places (3 catalog fields, 6 prose sites, and the comparison
 *      table, which had drifted to 49); capacity -> 5,500 on 25 prose lines across 6 files.
 *      ⛔ AND A WARNING PAID FOR IN A WRONG EDIT. Closing this, I "verified" the maker page
 *      in the browser rig, searched document.innerText for "47.3", found nothing, declared
 *      the citation fabricated and rewrote ten places to Amazon's 48.6. The number was
 *      there the whole time - inside a COLLAPSED "Specs & Parts" tab, which innerText does
 *      not return. Rendered text is not page content. Search the RAW HTML before calling a
 *      figure absent, or a check that cannot pass will read as proof of a lie.
 *      (47.3 is the maker's unit weight; Amazon 48.6 and Walmart 50.7 are packed weights.)
 *   b) REGISTRATION: this module is still not imported into lib/articles-extra.ts, so the page
 *      does not exist on the site. It needs
 *        import { PORTABLE_AC_THAT_DOESNT_NEED_TO_BE_DRAINED } from "./articles/portable-air-conditioner-that-doesnt-need-to-be-drained";
 *      added to the DEEP_SEO_BATCH array. Left alone deliberately: that file is shared and another
 *      agent in this batch may hold it. Six sibling modules are in the same state.
 */
export const PORTABLE_AC_THAT_DOESNT_NEED_TO_BE_DRAINED: Article = {
  slug: "portable-air-conditioner-that-doesnt-need-to-be-drained",
  title:
    "Portable Air Conditioners That Don't Need to Be Drained: What \"Self-Evaporating\" Actually Means",
  dek: "Almost every modern portable AC is sold as self-evaporating, and almost every one of them can still put water on your floor. Self-evaporation is a rate, not a feature — here's the mechanism, the number that decides whether it keeps up in your house, and the drainage setup that makes the whole question disappear.",
  category: "Cooling",
  readMinutes: 13,
  updated: "August 2026",
  answerFirst:
    "Yes — most modern portable ACs are self-evaporating: they fling the condensate onto the hot condenser coil and blow it out the exhaust hose as vapor. But that is a rate, not a guarantee. In humid air the water arrives faster than it leaves, and the unit fills, warns, or leaks. Your dew point decides, not the model.",
  sections: [
    {
      heading: "Every portable air conditioner makes water. That part is not optional.",
      body: [
        "Before you can tell which units genuinely spare you the bucket, you have to know why the bucket exists — and the answer is not a design decision anyone made. It falls out of what an air conditioner is.",
        "An air conditioner does not manufacture cold. It moves heat from one place to another, and it does that by running your room's air across an evaporator coil that is far colder than the room. Warm air holds water vapor. Chill that air below its dew point — the temperature at which it can no longer hold the moisture it's carrying — and the vapor stops being vapor and becomes liquid on the coil, exactly the way a cold glass sweats on a summer afternoon. It then runs down the fins and collects in a pan inside the machine.",
        "So dehumidification is not a bonus mode your AC offers. It is the unavoidable by-product of pushing humid air across something cold. There is no such thing as an air conditioner that cools a humid room without pulling water out of it, and any listing that implies otherwise is describing where the water goes, not whether it exists.",
        "That single fact reframes the whole search. The same machine, unpacked in Phoenix, may produce so little condensate that its owner never thinks about it once in five summers. The identical machine in Houston can generate a steady stream all afternoon. Nothing about the hardware changed. The air changed. Which means the question \"which portable AC doesn't need draining\" has a hidden second half — doesn't need draining where? — and every page that answers it with a product name alone has skipped the part that decides the outcome.",
        "There's a corollary worth internalising before you shop: a portable AC that produces a lot of water is usually a portable AC that is working properly. Owners regularly report \"it keeps filling up\" as a defect when what they've actually got is a humid room and a machine doing its job. The unit is not broken. It is telling you something about your air.",
      ],
    },
    {
      heading: "What \"self-evaporating\" actually does inside the machine",
      body: [
        "Here is the part nobody explains, and it's the part that makes the rest of the decision obvious.",
        "Your portable AC has exactly one connection to the outside world: the exhaust hose. Everything the machine needs to get rid of has to leave through it. The heat pulled out of your room leaves that way. And on a self-evaporating unit, so does the water.",
        "The mechanism is mechanical and slightly agricultural. Condensate drips off the cold evaporator coil into a shallow pan in the base of the unit. A slinger ring — a rim on the condenser fan that dips into that pan — picks the water up and throws it outward onto the condenser coil, which is the hot half of the machine, the coil busy rejecting all the heat it just took out of your room. Water hitting a coil that hot flashes into vapor almost immediately, and that vapor is carried out of the house with the exhaust air. Nobody empties anything, because the water leaves as steam you never see.",
        "There is a genuine engineering reason this design exists beyond convenience, and knowing it tells you something about when it works. Evaporating water off the condenser cools the condenser — it's the same effect as sweat on skin. A cooler condenser rejects heat more effectively, which makes the machine slightly more efficient. So the manufacturer isn't only saving you a chore; it's harvesting free evaporative cooling out of a waste product. That's why the feature is near-universal now, and why you'll see it under half a dozen names: self-evaporating, auto-evaporation, fully exhausted condensate, no-drip, bucketless. They all describe this same loop.",
        "Now the limit, which is where the marketing stops. Air can only hold so much water vapor, hot air more than cold, but never infinitely. Your exhaust airstream leaves at a fixed volume and a fixed temperature, so it has a finite capacity to absorb evaporated condensate per hour. Meanwhile the evaporator is producing condensate at a rate set by how humid your room is. Those are two independent numbers. When production exceeds removal — and in muggy weather it will — the surplus stays in the pan, the level climbs through the day, and the machine eventually does one of three things: stops cooling and shows a full-tank warning, quietly finds a seam and puts water on your floor, or nothing at all, because you had the foresight to attach a drain hose that morning.",
        "That's the whole story. Self-evaporation is not a switch that is either present or absent. It is a rate competing with another rate.",
      ],
      table: {
        caption: "Where the water actually goes, stage by stage",
        columns: ["Stage", "What happens", "What can go wrong here"],
        rows: [
          [
            "Room air crosses the cold evaporator coil",
            "Air is chilled below its dew point and moisture condenses onto the fins",
            "Nothing — this is the machine working correctly, and more water means more humidity, not a fault",
          ],
          [
            "Condensate collects in the base pan",
            "It drips down the fins and gravity pools it inside the unit",
            "A unit that isn't sitting level lets water find a seam instead of the pan",
          ],
          [
            "A slinger ring lifts it onto the hot condenser",
            "The condenser fan's rim picks water out of the pan and throws it onto the hot coil",
            "Scale, dust or a clogged pan reduces how much the ring can pick up",
          ],
          [
            "It flashes to vapor and leaves down the exhaust hose",
            "The water exits the house invisibly, mixed into the hot exhaust air",
            "The exhaust airstream has a finite capacity — this is the step that saturates",
          ],
          [
            "Whatever couldn't evaporate stays behind",
            "The pan level rises over hours of running",
            "Full-tank cut-out that stops cooling, or an overflow onto the floor",
          ],
        ],
      },
    },
    {
      heading: "Three drainage modes, and the one that actually means \"never drain it\"",
      body: [
        "Product listings collapse three genuinely different arrangements into one phrase. Separating them is the most useful thing on this page, because the mode most likely to solve your problem is the one nobody advertises.",
        "Mode one is full self-evaporation, the marketed one. It asks nothing of you and works beautifully right up until the day the condensate outruns the exhaust. It's the right answer in dry and moderate climates, and it's the only answer if the unit has to sit somewhere with no drain destination at all — the middle of a carpeted upstairs bedroom, say.",
        "Mode two is continuous gravity drainage, and it is the actual solution to the question you typed. Virtually every portable AC has a continuous-drain port low on the cabinet, usually behind a rubber plug or a threaded cap that ships closed. Two of the three units here say so themselves: the Whynter NEX listing is titled \"Built In Dehumidifier with Auto Drain,\" and BLACK+DECKER's own product page for the BPACT10WT lists auto water evaporation and puts a water drain hose in the box. Midea's page for the Duo doesn't spell the port out, so confirm that one in the manual or the listing photos before you order. Take the cap off, attach the hose if one shipped with your unit or a standard fitting, run the far end to a floor drain, a sump, a laundry basin, or out through the window kit if your unit routes it that way, and the pan simply never fills. It doesn't matter what the dew point is doing. It doesn't matter that the exhaust is saturated. Gravity handles it, forever, with zero attention after the first five minutes. The reason this doesn't appear in \"best no-drain portable AC\" roundups is that it isn't a product you can buy — it's a cap you unscrew.",
        "The catch is in the word gravity. The port sits low on the machine, so the destination has to be lower than the port. In a basement, garage, or ground-floor room with a floor drain nearby, this is trivial and you should just do it on day one. In a second-floor bedroom it's genuinely awkward: your options are a shallow drip pan you empty (which is worse than the bucket you were avoiding) or a small condensate pump, an accessory that collects the water and pushes it uphill to a window or a sink. Condensate pumps are cheap and common in HVAC, they're sold separately, and we don't carry one — mentioning it costs us nothing and might save you a return.",
        "Mode three is the manual reservoir: an internal tank you empty by hand. Modern units mostly treat this as the fallback rather than the default, but it's still what happens when self-evaporation saturates and you haven't run a hose. This is the outcome the whole search is trying to avoid, and it is entirely avoidable in most homes with mode two.",
        "One trap sits across all three, and it catches buyers of 3-in-1 units specifically. Cooling mode and dehumidify mode are not the same job. In dry/dehumidify mode the machine is deliberately maximising water extraction, and owners of self-evaporating units — including the Midea Duo — report that certain modes need manual draining despite the self-evaporation marketing. If part of the appeal of a 3-in-1 was using it as a dehumidifier in the shoulder seasons, assume you'll be attaching the hose for that mode and check the manual before you buy.",
      ],
      table: {
        caption: "The three drainage modes, plainly",
        columns: ["Drainage mode", "Attention it needs", "When it's the right answer"],
        rows: [
          [
            "Self-evaporation (the marketed one)",
            "None — until the day the exhaust can't carry the water away",
            "Dry and moderate climates, or any spot with nowhere for a hose to go",
          ],
          [
            "Continuous gravity drain",
            "Five minutes once, then none, at any humidity",
            "Basements, garages, ground-floor rooms — anywhere lower than the drain port",
          ],
          [
            "Continuous drain plus a condensate pump",
            "Set up once; the pump is one more part that can fail",
            "Upstairs rooms with no gravity path to a drain",
          ],
          [
            "Manual reservoir / bucket",
            "Every day or two in muggy weather",
            "Nobody chooses this — it's what the other three exist to avoid",
          ],
        ],
      },
    },
    {
      heading: "The number that decides this is your dew point, not the model number",
      body: [
        "If you take one thing from this page: you are not shopping for a machine that never makes water. You are estimating whether your air will overwhelm the machine you buy. That estimate has a number attached, and it isn't relative humidity.",
        "Relative humidity is the wrong measure here because it's relative — 60% at 68°F and 60% at 90°F describe wildly different quantities of actual water, because warm air can hold far more of it. Dew point is the absolute measure: the temperature to which air must be cooled before it saturates. Higher dew point means more water physically present in every cubic foot of air crossing your evaporator, which means more condensate per hour, which is exactly the load the self-evaporation system has to clear.",
        "There's a seasonal trap inside that, and it catches careful people. The highest dew points of the year usually arrive on the hottest days, so self-evaporation is most likely to saturate at the exact moment you're running the machine hardest and least want it to stop. The reverse case surprises people too: a mild, rainy 74°F day carries a great deal of moisture at very little cooling load, which is why the puddle often turns up after a day nobody thought was hot enough to matter.",
        "Checking your own number takes thirty seconds. Most weather apps list dew point under the hourly or detail view. Look at a muggy July afternoon rather than an annual average — the average is smoothed by every mild night of the year, and the pan doesn't care about mild nights.",
        "The table below uses the general comfort classification forecasters use for dew point. It is a way to read your own climate, not a manufacturer figure, and the right-hand column is an expectation rather than a measurement.",
      ],
      table: {
        caption: "Read your summer dew point, not the product page",
        columns: ["Typical summer dew point", "How the air feels", "What to expect from a self-evaporating unit"],
        rows: [
          ["Under 55°F", "Dry, comfortable", "Effectively bucketless — many owners in dry climates never see standing water at all"],
          ["55-60°F", "Noticeable but pleasant", "Self-evaporation generally keeps up through normal cooling"],
          ["60-65°F", "Sticky", "Usually fine; a long hot stretch may fill the pan and trip the cut-out"],
          ["65-70°F", "Muggy", "Plan on the drain hose for heatwaves — do not buy on the no-drain promise"],
          ["Over 70°F", "Oppressive (Gulf Coast, Deep South summer)", "Treat continuous drainage as required equipment, not an option"],
        ],
      },
    },
    {
      heading: "What owners report when the evaporation runs out — and the setup mistakes behind most of it",
      body: [
        "First, the thing this search result is full of and we won't do. You will see confident claims that a given unit \"evaporates up to X pints per day\" or \"handles humidity up to Y%\". Treat those with suspicion. None of the three makers here publishes an evaporation rate for these units in the material we work from — not Midea, not Whynter, not BLACK+DECKER — and no manufacturer publishes the figure that would actually answer your question — condensate produced per hour, in your room, at your dew point, at your thermostat setting. That number depends on your air, your room's air changes, how sealed the space is, and how hard the unit is running. It is not a property of the product. So we'll tell you the direction your climate pushes and leave the invented number alone.",
        "What we can point at is what owners actually report. We don't run a test lab and we don't pretend to; what we do is read real owner reports across retailer reviews, forums and independent testing and aggregate what goes wrong. On the drainage question the finding is unusually clean: all three units in this guide have drainage reports against them, including the most expensive one.",
        "That's the strongest evidence available that this is a climate variable rather than a product-quality variable. Spending more does not buy you an exemption from physics; it buys you quieter cooling and more capacity, which are different things worth paying for.",
        "The Whynter NEX ARC-1230WN is the top of our catalog's price band, a dual-hose inverter, and owners still report water leaking from the base when the unit is moved, because the self-evaporation system's reservoir can overflow in humid conditions. The Midea Duo, whose listing highlights a self-draining design with an included window kit, draws owner reports of water pooling and leaks — one owner reported drywall damage — plus the mode-dependent draining noted above. Our own catalog entry for the Duo doesn't hide it either; its cons list says, in these words, that \"in very humid climates the self-drain won't keep up and you'll need to drain it.\" And the budget BLACK+DECKER BPACT10WT draws reports that in humid conditions its internal reservoir fills within a day or two and needs frequent emptying, with overflow if it goes unwatched.",
        "Read those three together and the shape is obvious. The reports cluster around humidity and around the unit being moved or sitting unlevel. They do not cluster around one brand.",
      ],
      table: {
        caption: "Drainage design vs. what owners actually report (aggregated owner reports, not our own testing)",
        columns: ["Unit", "Drainage design as listed", "What owners report"],
        rows: [
          [
            "Whynter NEX ARC-1230WN ($550-$720)",
            "Dual-hose inverter; the listing is titled \"Built In Dehumidifier with Auto Drain\"",
            "Water leaking from the base when the unit is moved; the self-evaporation system can overflow in humid conditions",
          ],
          [
            "Midea Duo MAP14S1TBL ($500-$650)",
            "Self-draining design with an included window kit (Midea's listed feature)",
            "Water pooling or leaks, including one report of drywall damage; certain modes needing manual draining despite the self-evaporation marketing",
          ],
          [
            "BLACK+DECKER BPACT10WT ($280-$360)",
            "3-in-1 AC / dehumidifier / fan; BLACK+DECKER's product page lists auto water evaporation and ships a water drain hose",
            "In humid conditions the reservoir fills within a day or two and needs frequent draining; overflow reported when unmonitored",
          ],
        ],
      },
      list: [
        "Not levelling it|The pan is shallow and its overflow point assumes the unit is flat. A tilted machine spills long before the pan is actually full — on carpet or an old floor, check it with a level, not by eye.",
        "Moving it with water in the pan|It is the failure owners describe on the Whynter specifically — water leaking from the base after the unit has been wheeled somewhere. Moving it sloshes a pan that was perfectly stable a minute earlier. Drain it before you move it, every time.",
        "Letting the exhaust hose sag|Manuals in this category generally tell you to keep the hose as short and straight as possible, mainly because bends and length add back-pressure and push heat back into the room. A deep sag adds a second problem: it's a low point where moisture-laden exhaust can cool, condense, and run back toward the machine.",
        "Expecting dehumidify mode to self-evaporate|Dry mode's whole purpose is extracting water, and owners report modes that need manual draining on units marketed as self-evaporating. If you bought a 3-in-1 partly for its dehumidifier, plan on the hose for that mode.",
        "Ignoring the filter|A clogged filter chokes airflow across the evaporator, which drives the coil colder and can ice it over. When that ice melts you get a slug of water arriving far faster than the slinger ring can clear it. This is why the manuals in this category ask for a regular filter rinse — check yours for the interval it actually specifies — and it's the cheapest reliability habit going.",
        "Not finding the drain port before you need it|Locate the cap, confirm what fitting it takes, and buy the hose in the same order as the AC. Discovering the port at 9pm on the muggiest night of the year is how a solvable problem becomes a wet carpet.",
        "Storing it wet|Drain the pan fully before the unit goes into a closet for winter. Standing water sits in the dark for six months and comes back as a smell you can't get out of the fins.",
      ],
    },
    {
      heading: "So which of these should you actually buy",
      body: [
        "The recommendation that follows from everything above is slightly counterintuitive: don't choose a portable AC on its drainage claim at all. Choose it on SACC-rated cooling for your room size, hose count for your heat load, and noise if you sleep beside it. Then handle drainage with the port, which costs nothing and works at any dew point. Buying a worse cooler because its listing said \"no bucket\" is how people end up with both problems.",
        "With that said, three sensible branches. The specs below are the manufacturers' own published ratings; where our catalog and a maker's own page disagree, the maker's page wins and we say so in the line where it happens.",
        "Dry-to-moderate climate, a small or medium room, tight budget: the BLACK+DECKER BPACT10WT. BLACK+DECKER rates it at 10,000 BTU against a DOE/SACC figure of about 5,500, covering rooms up to 450 sq ft, as a 3-in-1 that also dehumidifies and runs as a fan, with a \"Follow Me\" remote that reads temperature where you're sitting and casters to roll it between rooms. One correction to a spec you will see repeated all over this category, our own product card included: this is not a light machine. BLACK+DECKER's own spec sheet lists it at 47.3 lb, so \"portable\" here means it rolls across a floor, not that you carry it up a flight of stairs. Honest catches, and there are real ones: size your room against the ~5,500 SACC number rather than the 10,000 headline, and treat that 450 sq ft as a ceiling rather than a target, because 5,500 SACC is a small-to-medium-room number; it's a fixed-speed single-hose unit, so it cycles on and off audibly instead of humming steadily; there's no app or voice control; and of our three it's the one most likely to fill its internal reservoir within a day or two of humid weather, because a fixed-speed single-hose unit keeps pulling in outside air that it then has to wring dry. In a dry climate that last point may never touch you. In a muggy one, this is the unit that will teach you where the drain cap is.",
        "A bedroom where quiet matters, and you'd like the best shot at never touching it: the Midea Duo. Midea rates it at 14,000 BTU / 12,000 SACC for rooms up to 550 sq ft, with an inverter compressor running near 42 dB, Alexa and Google control, and the self-draining design with an included window kit that is the reason it shows up in this search at all. Heat is the one spec here you have to read a model number for: the listing we link is titled \"with Heat,\" but Midea's own page for the MAP14S1TBL prints \"Heat | No\" in its spec table, so the Duo ships in cool-only and cool-plus-heat variants and it is on you to confirm which one is in your cart. The inverter is the substantive part: it modulates to hold temperature instead of slamming on and off, which is what makes a portable AC tolerable to sleep next to. Honest catches: it's large and heavy to move between rooms, it still needs a nearby window for the exhaust, owners report leaks and pooling, and our own catalog says outright that in very humid climates the self-drain won't keep up.",
        "A large or sun-facing room where the real problem is capacity, not water: the Whynter NEX ARC-1230WN. Whynter rates it at 14,000 BTU / 12,000 SACC with a dual-hose design covering rooms up to 600 sq ft, plus Wi-Fi control, and of the three it is the one whose listing names its drainage outright — \"Built In Dehumidifier with Auto Drain.\" Dual-hose matters for a reason that has nothing to do with water: it draws condenser air from outdoors instead of robbing your room, so it doesn't create the negative pressure that pulls warm air back in through every gap in the house, and that's what lets it hold temperature in a room a single-hose unit would lose. Be clear about what that does and doesn't buy you inside this set, though — the Midea Duo is dual-hose as well, by Midea's own description of its hose-in-hose design, so the reason to step up to the Whynter is its larger 600 sq ft rating, not the hose count. Honest catches: it's the priciest unit in the set, two hoses need more window width than a single-hose bracket so measure before ordering, owners report base leaks when it's moved, and TechGearLab measured it at 58.4 dBA from four feet with the fan on high. The ~42.5 dB figure our own comparison dataset carries for it is a low-fan number, the way every quiet-sounding portable AC figure is — so treat \"low noise\" as relative to other portables at their quietest, not as quiet at full tilt.",
        "None of those three branches was chosen on the drainage claim, and that's deliberate. Pick the cooler that fits the room, then spend five minutes on the hose.",
      ],
      productIds: [
        "midea-duo-14-000-btu-smart",
        "whynter-nex-arc-1230wn-14-000",
        "black-decker-10-000-btu-3",
      ],
    },
    {
      heading: "When the honest answer is a different machine entirely",
      body: [
        "A real share of people searching this phrase are about to buy the wrong category, and we'd rather say so than take the commission.",
        "If you have a window that will take a window unit, buy a window unit. It is the genuinely drain-free air conditioner, and not by marketing — by geometry. Its condensate pan sits outdoors. It slings water onto the condenser the same way a portable does, and anything it can't evaporate simply drips onto the ground outside, where it is not your problem at any dew point in any month. A window unit is also more efficient than a portable of the same rating, because the entire hot half of the machine is outside the room instead of sitting in it behind a hose. We sell portables; we still think that if your window and your lease allow it, the window unit wins this specific argument outright. Portables earn their place when you can't install one — casement or sliding windows, HOA or landlord rules, a room you need the unit to leave.",
        "If the water is the problem and the heat isn't, you want a dehumidifier, not an air conditioner. It's the opposite machine: it deliberately collects water rather than trying to get rid of it, and run with a continuous-drain hose to a floor drain it's genuinely set-and-forget. It will warm the room slightly rather than cooling it. We don't carry one, so there's nothing in it for us to tell you that — a damp basement is a dehumidifier problem, and a portable AC bought to fix it will disappoint you twice.",
        "If you have no window at all, nothing on this page solves your problem, and drainage is the second question rather than the first. Every unit here needs an exhaust path for its heat, and a machine venting into the same sealed room it's cooling adds heat on balance. Start with the venting problem — our garage and no-window guide covers the workable options — and come back to drainage afterwards.",
        "And if you cool a handful of evenings a month in a dry climate, you may be over-buying by several hundred dollars. In low-dew-point air, moving air over skin does a surprising amount of the work a compressor would, and evaporative coolers genuinely work there for a fraction of the price and none of the condensate. They also fail badly in humidity, which is the mirror image of this whole page — so check the same dew-point table before you go that way.",
        "Which leaves four questions. Answer them in order and the decision makes itself.",
      ],
      list: [
        "What's your July dew point?|Under 60°F and self-evaporation will very likely handle everything you ask of it. Over 65°F and you should assume you'll be running a drain hose in a heatwave, regardless of which unit you buy.",
        "Is there anywhere lower than the unit for water to go?|A floor drain, a sump, a laundry basin, a window the kit routes to. If yes, the drainage question is already solved and you should stop weighting it. If no, self-evaporation genuinely matters more to you than to the average buyer.",
        "Can you install a window unit instead?|If your window and your landlord allow it, that's the actually drain-free machine and it's more efficient too. Portable ACs are the answer to a window you can't use, not a better answer to a window you can.",
        "What is the room really asking for?|Capacity for a big sunny space points to the 600 sq ft Whynter; a bedroom points to the Midea; a small shaded room on a budget points to the BLACK+DECKER. The first two are both dual-hose inverters, so hose count is not what separates them — room rating is. Buy the cooler that fits, then handle the water with five minutes and a hose.",
      ],
    },
  ],
  faq: [
    {
      q: "Are there portable air conditioners that don't need to be drained?",
      a: "Most modern portable ACs are self-evaporating — they throw condensate onto the hot condenser coil and send it out the exhaust hose as vapor, so under normal conditions you never empty anything. Of the three units here, Midea lists a self-draining design on the Duo, the Whynter NEX listing is titled \"Built In Dehumidifier with Auto Drain,\" and BLACK+DECKER's own page lists auto water evaporation on the BPACT10WT and puts a water drain hose in the box — yet owners of that last one still describe emptying an internal reservoir every day or two in humid weather, which is exactly the gap between a listed feature and a rate. What no unit can promise is that it will keep up in every climate. Self-evaporation is a rate, and in muggy air the condensate can arrive faster than the exhaust can carry it away. In a dry or moderate climate you can reasonably expect never to drain one; in a high-dew-point climate, plan on attaching the drain hose during heatwaves.",
    },
    {
      q: "Do all portable air conditioners need to be drained?",
      a: "No, but all of them produce water, because cooling humid air below its dew point condenses moisture out of it — that's physics, not a design choice. The difference between models is only where that water goes. Self-evaporating units exhaust most of it as vapor; older or budget designs collect more of it in an internal reservoir. And essentially every portable AC has a continuous-drain port low on the cabinet, so most can be made effectively drain-free by running a hose to a floor drain, which works at any humidity level. Manufacturers don't always list the port in the feature bullets, so check your unit's manual for where it is and what fitting it takes.",
    },
    {
      q: "How does a self-evaporating portable air conditioner work?",
      a: "Condensate drips off the cold evaporator coil into a pan in the base. A slinger ring on the condenser fan dips into that pan and flings the water onto the hot condenser coil — the part of the machine rejecting your room's heat. The water flashes to vapor on contact and leaves with the hot exhaust air down the hose. There's a bonus in it for the manufacturer: evaporating water off the condenser cools it, so the machine gets a small efficiency gain from the same water it's disposing of.",
    },
    {
      q: "Why is my self-evaporating portable AC still filling with water?",
      a: "Almost always because your indoor humidity is high enough that the evaporator is producing condensate faster than the exhaust airstream can carry it away — the system is working, it's just saturated. Three other things make it worse: running in dehumidify/dry mode, which is designed to extract as much water as possible; a clogged filter, which can ice the coil and dump a slug of meltwater at once; and a unit that isn't level, which spills before the pan is genuinely full. If it's happening regularly, attach the drain hose rather than fighting it.",
    },
    {
      q: "Can I just leave the drain hose connected all the time?",
      a: "Yes, and in a humid climate it's the right default. A continuous gravity drain means the pan never accumulates, so the full-tank cut-out never trips and there's nothing to overflow. The only requirement is that the far end sits lower than the drain port, with no uphill sections and no kinks. If the unit is upstairs with no gravity path, a condensate pump does the lifting — it's a common HVAC accessory sold separately, and one we don't stock. Do still drain and dry the pan before storing the unit for winter.",
    },
    {
      q: "Is a self-evaporating portable air conditioner with heat worth it?",
      a: "It can be, if you want one machine covering both seasons. The Duo listing we link is titled \"with Heat\" alongside its cooling, which is what would make that variant a year-round unit rather than a summer one. Two honesty notes before you buy on that basis. Midea sells more than one Duo model number and they do not all heat — Midea's own page for the MAP14S1TBL prints \"Heat | No\" in its spec table — so match the model number on the listing against the one you actually want rather than trusting the word \"Duo\". And where heat is present, our catalog describes it as supplemental warmth for mild cold, not a substitute for a furnace in deep winter. Drainage behaviour in heat mode isn't something the manufacturers publish clearly, so check the manual for your specific unit before assuming it self-evaporates the same way it does when cooling.",
    },
  ],
  relatedGuides: [
    "best-portable-air-conditioners",
    "single-hose-vs-dual-hose-portable-ac",
    "what-size-portable-ac-do-i-need",
  ],
  sources: [
    {
      label: "Midea Duo (MAP14S1TBL) — official product page (dual-hose inverter design)",
      url: "https://www.midea.com/us/store/cooling-and-heating/portable-air-conditioners/midea-duo-smart-inverter-portable-air-conditioner.map14s1tbl",
    },
    {
      label: "Midea Duo 14,000 BTU (MAP14S1TBL) — Amazon listing",
      url: "https://www.amazon.com/dp/B0FC2SGGF9?tag=blackboxsuppl-20",
    },
    {
      label: "Whynter — official site (NEX ARC-1230WN dual-hose inverter portable AC)",
      url: "https://www.whynter.com",
    },
    {
      label: "Whynter NEX ARC-1230WN — Amazon listing",
      url: "https://www.amazon.com/dp/B09TP51PPH?tag=blackboxsuppl-20",
    },
    {
      label: "BLACK+DECKER BPACT10WT — official product page (cools, dehumidifies and circulates air)",
      url: "https://www.blackanddecker.com/products/bpact10wt",
    },
    {
      label: "BLACK+DECKER BPACT10WT — Amazon listing",
      url: "https://www.amazon.com/dp/B01DLPUWG2?tag=blackboxsuppl-20",
    },
    {
      label: "RTINGS — Whynter NEX ARC-1230WN review page (RTINGS lists the unit among the air conditioners it has bought and tested; its full result table is behind a membership)",
      url: "https://www.rtings.com/air-conditioner/reviews/whynter/nex-arc-1230wn",
    },
    {
      label: "TechGearLab — independent test of the Whynter ARC-1230WN (\"produced 58.4 dBa running four feet from the SPL meter with the fan on high\")",
      url: "https://www.techgearlab.com/reviews/electronics/portable-air-conditioner/whynter-arc-1230wn",
    },
    {
      label: "BlackBox: Best portable AC for a garage with no window",
      url: "/guides/best-portable-ac-garage-no-window",
    },
    {
      label: "BlackBox: Single-hose vs dual-hose portable AC",
      url: "/guides/single-hose-vs-dual-hose-portable-ac",
    },
  ],
  heroImage: "/products/scene/midea-duo-14-000-btu-smart.webp",
  picks: [
    {
      id: "midea-duo-14-000-btu-smart",
      cat: "heat",
      label: "Quiet bedroom pick · self-draining window kit",
    },
    {
      id: "whynter-nex-arc-1230wn-14-000",
      cat: "heat",
      label: "Large or sun-facing rooms · dual-hose",
    },
    {
      id: "black-decker-10-000-btu-3",
      cat: "heat",
      label: "Dry climate value pick · small/medium rooms",
    },
  ],
};
