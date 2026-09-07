import type { Article } from "@/lib/articles";

/**
 * Self-contained deep guide. Wire-in (orchestrator, one edit):
 *   lib/articles-extra.ts →
 *     import { PORTABLE_AC_RUNNING_BUT_ROOM_NOT_COOLING } from "./articles/portable-ac-running-but-room-not-cooling";
 *     ...and push PORTABLE_AC_RUNNING_BUT_ROOM_NOT_COOLING into DEEP_SEO_BATCH.
 *
 * Why this topic (2026-09-06, the Sunday destination step): five of the seven portable ACs
 * in lib/owner-evidence.ts carry a documented window-kit or sealing failure — the Whynter
 * ARC-14S thin bracket and weatherstrip, the DeLonghi Pinguino gaps at the sill, the Midea
 * Duo tabs owners tape together, the Whynter NEX panel that must be cut down, and the
 * BLACK+DECKER mount that needs modification. The site referenced that failure 29 times
 * across existing guides and no page owned it. It is the moment/failure-first wedge exactly:
 * the unit is running, the room is hot, and nothing tells you why.
 *
 * Honesty notes: every number here is traceable to a specific entry in lib/owner-evidence.ts
 * or to the SACC explainer already published in lib/comparison-guides.ts. Nothing is
 * lab-tested by us. Owner-reported figures are stated as owner reports, never as our
 * measurement, and the SACC-vs-ASHRAE gap is attributed to the DOE test procedure rather
 * than asserted as our finding. Sources are URLs this site already publishes and cites
 * elsewhere; no citation is invented. All four referenced products resolve via
 * getProductById against the same catalog best-portable-ac-garage-no-window uses, and all
 * four pass bb_products.good(). No `picks` (those resolve only against the heat/useful
 * catalogs).
 */
export const PORTABLE_AC_RUNNING_BUT_ROOM_NOT_COOLING: Article = {
  slug: "portable-ac-running-but-room-not-cooling",
  seoTitle: "Portable AC Running But Room Not Cooling? 3 Causes",
  seoDescription:
    "The compressor is on and the room will not drop. The three common causes are all boring - start at the window-kit seam, then check the SACC size.",
  title:
    "Your Portable AC Is Running and the Room Is Still Hot: The Three Real Reasons",
  dek: "The compressor is on, air is coming out, the thermostat says 72 and the room refuses to drop. Before you decide the unit is broken, know that the three common causes are all boring: the window kit is leaking hot air straight back in, the unit was sized to a marketing number instead of the tested one, or it is single-hose and fighting itself. Here is how to tell which one you have in about ten minutes, and which are worth fixing.",
  category: "Cooling",
  readMinutes: 9,
  updated: "September 2026",
  answerFirst:
    "Check three things in this order. First the window kit: put your hand along the seam where the panel meets the sash and along the hose fitting — if you feel warm air, the unit is cooling the room and the window is refilling it, and this is the most common cause and the cheapest fix. Second the size: find the SACC rating rather than the big BTU number on the box, because SACC is the tested figure and is often far lower — roughly 20 SACC BTU per square foot is the working rule, so a genuinely 400 sq ft room wants about 8,000 SACC. Third the hose count: a single-hose unit pushes conditioned air outside and pulls unconditioned air back in through every gap in the room, which caps how cold it can get in a large or sunny space. If the air coming out of the vent is not noticeably cold at all, that is a different problem — skip to the last section, because that points at drainage or the compressor rather than at the room.",
  sections: [
    {
      heading: "Cause #1: the window kit is letting the heat back in",
      body: [
        "This is the first thing to check because it is the most common, the cheapest to fix, and the least likely to be mentioned anywhere in the manual. A portable AC dumps its heat out of a hose, and that hose has to leave through a window panel that was designed to fit every window and therefore fits none of them properly. Every gap left at the sash, the sill, or around the hose fitting is a hole that outside air pours back through — and it pours in fastest exactly when it is hottest outside, which is when you notice.",
        "The reason to suspect the kit before anything else is how consistently owners report it across completely different units. On the Whynter ARC-14S, the included window bracket and weatherstrip are described as thin and leaving gaps, so hot outside air leaks back in unless owners add aftermarket foam or seals. On the DeLonghi Pinguino PACEX390LVYN, the wide round exhaust fitting and imperfect seal nets leave gaps at the sill, specifically on high-lip windows. On the Midea Duo, owners report snapping the thin plastic tabs that lock the hose adapter into the window insert and ending up taping the kit together. On the Whynter NEX ARC-1230WN, the roughly 28-inch extension panel is reported as too wide for common windows and often has to be cut down before it will seal properly. And on the BLACK+DECKER BPACT10WT, reviewers report the window-mount pieces fit poorly and need modification, with minimal weather stripping and a short exhaust hose that lets warm air seep back in.",
        "Five different manufacturers, five versions of the same complaint. That is not a defect in your unit; it is the state of the category, and it means the sealing job is effectively yours to finish. The good news is that this is the one cause on this page you can fix in an afternoon for very little money, and it is usually the one that changes the temperature.",
        "Test it before you spend anything. With the unit running on high, run the back of your hand slowly along the whole seam — where the panel meets the sash, where the panel meets the sill, and around the hose fitting itself. Warm air anywhere along that path is your answer. Do the same along the length of the hose: a hose that is warm along its whole run is normal, but a hose that is hot and sagging is radiating that heat back into the room it just removed it from, so keep it short and as straight as the layout allows rather than coiling the excess.",
      ],
      list: [
        "Feel the whole seam, not just the panel|Gaps at the sill and around the hose fitting are reported as often as gaps at the sash. The Pinguino complaint is specifically about the sill on high-lip windows.",
        "Expect to add foam or seals|Whynter ARC-14S owners report adding aftermarket foam or seals because the included weatherstrip is too thin to close the gap on its own.",
        "Check the panel actually fits your window|The Whynter NEX extension panel is reported as too wide for common windows and often needs cutting down. A panel that does not fit cannot seal.",
        "Do not force the plastic tabs|Midea Duo owners report snapping the thin tabs that lock the hose adapter to the insert. If it does not click, work out why rather than pushing harder.",
        "Keep the hose short and straight|A long coiled hose radiates the heat it is carrying back into the room. BLACK+DECKER owners report the opposite problem — a hose so short it forces the unit against the window.",
      ],
      productIds: ["whynter-nex-arc-1230wn-14-000"],
    },
    {
      heading: "Cause #2: you sized the unit to the box, not to the tested number",
      body: [
        "The large BTU number on the front of a portable AC box is usually the old ASHRAE rating. SACC — Seasonally Adjusted Cooling Capacity — is the U.S. Department of Energy's tested figure, and it is the one that describes what the machine does in a real room. The gap between the two is not a rounding error, and if you sized your purchase on the headline you may simply own a smaller air conditioner than you think you bought.",
        "Two units in our own catalog show the size of that gap. The BLACK+DECKER BPACT10WT is marketed as 10,000 BTU on the ASHRAE scale, while the real SACC/DOE rating is only about 5,500 BTU — and owners report it comfortably cools roughly 150 sq ft rather than the advertised 450 sq ft. The Shinco SPF1-08C is marketed at 8,000 BTU with a real SACC output of only about 4,550, and owners say it struggles beyond roughly 200 sq ft. In both cases the machine is doing what it was built to do; the number on the box described something else.",
        "The working rule is about 20 SACC BTU per square foot, so a genuinely 400 sq ft room wants around 8,000 SACC, not the 12,000 a box might promise. Add margin for a top floor, a west-facing wall, direct sun, or a kitchen. If you run the arithmetic and find your unit is two sizes under the room, no amount of sealing or servicing closes that gap — the honest answer is that it is the wrong machine for that space, and it may be a perfectly good machine for a smaller one.",
        "There is a version of this worth naming separately, because it is a mismatch rather than a shortfall. A battery-capable unit like the EcoFlow Wave 3 is a spot cooler built for tents and vans, not a room unit. Judged as a room air conditioner it will disappoint; judged as what it is, it is a different product entirely. Undersizing and misapplying look identical from the sofa, and neither is fixed by running it longer.",
      ],
      table: {
        caption: "The headline number against the tested one, from our catalog",
        columns: ["Unit", "Marketed (ASHRAE)", "Real SACC/DOE", "What owners report it actually cools"],
        rows: [
          [
            "BLACK+DECKER BPACT10WT",
            "10,000 BTU",
            "~5,500 BTU",
            "Roughly 150 sq ft, against an advertised 450 sq ft",
          ],
          [
            "Shinco SPF1-08C",
            "8,000 BTU",
            "~4,550 BTU",
            "Struggles beyond roughly 200 sq ft",
          ],
        ],
      },
      productIds: ["black-decker-10-000-btu-3"],
    },
    {
      heading: "Cause #3: it is single-hose, and it is fighting itself",
      body: [
        "A single-hose portable AC takes air from the room, uses it to cool the condenser, and blows it out of the window. That air has to be replaced, and it is replaced by outside air pulled in through every gap in the room — under the door, around the window frame, through the wall sockets. The unit creates negative pressure and then works against it, which is why a single-hose unit has a ceiling on how cold it can make a room no matter how long it runs.",
        "A dual-hose design draws outside air through a second hose to cool the compressor and pushes it back out, so it is not exhausting the room's conditioned air to do it. That is why dual-hose units cool a full room faster and more efficiently, and it is the single design difference that most changes the result in a big or sunny space. In a small, shaded room a single-hose unit is genuinely fine and cheaper; in a large or hot one it is the reason the temperature stalls.",
        "This one you cannot fix with foam. You can reduce how much makeup air the room pulls in — close interior doors, block the obvious gaps — and that helps at the margin, but you are managing a design characteristic rather than repairing a fault. If you have sealed the window properly, the unit is sized correctly for the room, and it still cannot get there on the hottest afternoons, single-hose is the likely explanation and a dual-hose unit is the actual fix.",
        "This is also the point at which it is worth being honest about cost. A dual-hose inverter is the most expensive and heaviest option in the category, and it earns that on a large or sunny room and nowhere else. If your room is small, do not buy the answer to a problem you do not have.",
      ],
      list: [
        "Single-hose creates negative pressure|It exhausts room air out of the window, and outside air is pulled back in through every gap to replace it. That is the cap on how cold it can get.",
        "Dual-hose draws its own outside air|The second hose feeds the condenser from outside instead of from your room, so it cools faster and more efficiently in a real space.",
        "Closing interior doors helps a little|Less makeup air means less heat pulled back in. It manages the characteristic; it does not remove it.",
        "Small and shaded is fine on single-hose|The design is not a defect. It is a trade — cheaper and simpler, with a lower ceiling.",
        "Only pay for dual-hose if the room needs it|It is the heaviest and priciest option in the category and earns that only on a big or sunny room.",
      ],
      productIds: ["midea-duo-14-000-btu-smart"],
    },
    {
      heading: "If the air is not cold at all: drainage, or the compressor",
      body: [
        "Everything above assumes the vent is blowing genuinely cold air and the room is not keeping up. If the air itself is not cold, that is a different failure and none of the fixes above apply.",
        "Check the water first, because it is the recoverable one. Many units advertise self-evaporation and then need help in humid weather. On the LG LP1419IVSM, roughly 15% of owners report the self-evaporating system overflowing in high humidity, or when the drain pan clogs or the unit sits unlevel, spilling water onto the floor. On the Whynter NEX ARC-1230WN, owners report water leaking from the bottom when the unit is moved, as the self-evaporation system can overflow in humid conditions. On the Midea Duo, some report water pooling or leaks — one causing drywall damage — and note that certain modes still need manual draining despite the self-evaporation marketing. On the BLACK+DECKER, owners report the internal reservoir filling within a day or two in humid conditions and needing frequent draining. A unit that is full, clogged, or standing unlevel can stop cooling properly, and that is worth ruling out before assuming the worst.",
        "If the water is fine and the air still is not cold, the honest possibility is the sealed system, and it usually arrives with a distinctive signature: the fan runs, the compressor may even sound like it is running, and nothing cold comes out. DeLonghi Pinguino-line owners report exactly that — units running the fan but no longer cooling, sometimes after a winter of storage or within a year, which points to compressor or refrigerant issues. Whynter ARC-14S owners report the compressor running but barely cooling around the two-year mark. On the LG, about 10% of units are reported to suffer compressor or electronic failure within the first two years, which is painful against a one-year parts-and-labour warranty. On the Midea Duo, around 18% of owners cite build quality, with some units dying in the first week and at least one reported to have stopped blowing cold at about 1.5 years.",
        "A sealed refrigerant system is not a home repair, and on most portable units the repair cost lands close enough to replacement that the warranty status is the whole decision. So check the date of purchase before you check anything else. One limitation worth stating plainly: these are owner reports aggregated from published reviews, not our teardown, and a percentage of owners reporting a failure is not the same as a failure rate for the model — people with a working air conditioner rarely write about it.",
      ],
      table: {
        caption: "Match the symptom to the cause",
        columns: ["What you see", "Most likely cause", "First move"],
        rows: [
          [
            "Cold air at the vent, room will not drop",
            "Window kit leaking, or undersized for the room",
            "Feel the whole seam for warm air, then check the SACC rating against the room",
          ],
          [
            "Cools well at night, stalls on hot afternoons",
            "Single-hose negative pressure, or undersized",
            "Close interior doors; compare SACC to ~20 BTU per sq ft",
          ],
          [
            "Air is barely cool, unit otherwise normal",
            "Drain full, drain pan clogged, or unit unlevel",
            "Drain it, level it, clear the pan — then re-test",
          ],
          [
            "Fan runs, nothing cold, often after storage",
            "Compressor or refrigerant",
            "Check the warranty date first; the repair often costs near replacement",
          ],
        ],
      },
      productIds: ["ecoflow-wave-3-portable-air-conditioner"],
    },
    {
      heading: "The ten-minute version",
      body: [
        "Work it in this order, because it runs cheapest-and-most-likely first. Feel the window seam and the hose fitting for warm air — if you find it, seal it, and re-test before doing anything else. Then find the SACC rating for your model and compare it to the room at roughly 20 BTU per square foot; if you are two sizes under, that is the answer and no repair changes it. Then count the hoses: one hose plus a large or sunny room explains a stall that sealing and sizing do not. Only after those three does it make sense to look at the machine itself, and there the water comes before the compressor.",
        "The reason this order matters is that the expensive conclusion — that the unit is broken — is the least likely one, and it is the one people reach first. Across our catalog the sealing complaint appears on five of seven units and the compressor complaint on three, and the sealing complaint is the one you can fix yourself this afternoon.",
      ],
      list: [
        "Seal the window kit first|Five of the seven portable ACs in our catalog carry an owner-reported sealing or window-panel complaint. It is the most common cause and the cheapest fix.",
        "Compare SACC, not ASHRAE, to the room|About 20 SACC BTU per sq ft. The tested number is often far below the box headline — 5,500 against 10,000 on the BLACK+DECKER.",
        "Count the hoses before blaming the unit|Single-hose has a real ceiling in a large or sunny room. It is a trade-off, not a fault.",
        "Drain and level it before suspecting the compressor|Overflow and clogged drain pans are reported across LG, Whynter, Midea and BLACK+DECKER units in humid weather.",
        "Check the warranty date before paying for a repair|On a sealed-system failure the repair often costs close to replacement, so the warranty status is usually the whole decision.",
      ],
    },
  ],
  faq: [
    {
      q: "Why is my portable air conditioner running but not cooling the room?",
      a: "Most often the window kit is leaking hot air back in as fast as the unit removes it. Owners report thin or poorly fitting window panels and weatherstrips across many different models — the Whynter ARC-14S bracket and weatherstrip leaving gaps, the DeLonghi Pinguino leaving gaps at the sill on high-lip windows, and the BLACK+DECKER window-mount pieces needing modification. The next most likely causes are that the unit is undersized because it was bought on the ASHRAE headline rather than the tested SACC rating, or that it is a single-hose design fighting negative pressure in a room that is too big or too sunny for it. If the air at the vent is not cold at all, that is a separate problem — check the drain and whether the unit is level before suspecting the compressor.",
    },
    {
      q: "What is SACC and why is it lower than the BTU number on the box?",
      a: "SACC stands for Seasonally Adjusted Cooling Capacity and it is the U.S. Department of Energy's tested rating, measured under a standard test procedure. The larger number usually printed on the box is the older ASHRAE rating, and the gap between the two is often substantial: the BLACK+DECKER BPACT10WT is marketed as 10,000 BTU with a real SACC/DOE rating of about 5,500, and the Shinco SPF1-08C is marketed at 8,000 with a real SACC of about 4,550. Size to SACC at roughly 20 BTU per square foot, and add margin for sun, top floors and kitchens.",
    },
    {
      q: "How do I know if my portable AC window kit is leaking?",
      a: "Run the unit on high and move the back of your hand slowly along the entire seal — where the panel meets the sash, where it meets the sill, and around the hose fitting itself. Warm air anywhere along that path is the leak. Check the hose too: a hose that is hot and coiled is radiating heat back into the room, so keep it as short and straight as the layout allows. Many owners end up adding aftermarket foam or seals because the included weatherstrip is too thin to close the gap, and some panels need cutting down to fit a particular window at all.",
    },
    {
      q: "Is a single-hose portable AC worth keeping?",
      a: "In a small or shaded room, yes — it is cheaper and simpler and the design is not a defect. In a large or sunny room it has a real ceiling: it exhausts conditioned room air out of the window, and outside air is pulled back in through every gap to replace it, so the temperature stalls no matter how long it runs. If the window is properly sealed and the unit is correctly sized for the space and it still cannot keep up on the hottest afternoons, a dual-hose unit is the actual fix, because it draws outside air through a second hose to cool the condenser instead of using your cooled air to do it.",
    },
    {
      q: "My portable AC is leaking water — is that why it stopped cooling?",
      a: "It can be, and it is worth ruling out first because it is recoverable. Self-evaporation is marketed heavily and needs help in humid weather. Roughly 15% of LG LP1419IVSM owners report the self-evaporating system overflowing in high humidity or when the drain pan clogs or the unit sits unlevel; Whynter NEX owners report water leaking from the bottom when the unit is moved; Midea Duo owners report water pooling and note that certain modes still need manual draining despite the marketing; and BLACK+DECKER owners report the reservoir filling within a day or two in humid conditions. Drain it, level it and clear the pan, then re-test before assuming a compressor problem.",
    },
    {
      q: "The fan runs but no cold air comes out — can that be fixed?",
      a: "That signature usually points at the sealed refrigerant system rather than anything in the room, and it is not a home repair. DeLonghi Pinguino-line owners report units running the fan but no longer cooling, sometimes after a winter of storage or within a year; Whynter ARC-14S owners report the compressor running but barely cooling around the two-year mark; about 10% of LG LP1419IVSM units are reported to suffer compressor or electronic failure within the first two years. On most portable units a sealed-system repair costs close enough to replacement that the warranty status decides it, so check your purchase date first. Note these are aggregated owner reports from published reviews rather than measured failure rates.",
    },
  ],
  relatedGuides: [
    "single-hose-vs-dual-hose-portable-ac",
    "best-portable-air-conditioners",
    "best-portable-ac-garage-no-window",
    "portable-air-conditioner-that-doesnt-need-to-be-drained",
  ],
  sources: [
    {
      label:
        "U.S. Department of Energy — Portable Air Conditioners: current standard & test procedure (SACC, 10 CFR 430 Appendix CC)",
      url: "https://www.energy.gov/cmei/buildings/portable-air-conditioners",
    },
    {
      label: "ENERGY STAR — Room Air Conditioners Key Product Criteria",
      url: "https://www.energystar.gov/products/room_air_conditioners/key_product_criteria",
    },
    {
      label: "BLACK+DECKER BPACT10WT — official product page",
      url: "https://www.blackanddecker.com/products/bpact10wt",
    },
    {
      label: "Midea Duo (MAP14S1TBL) — official product page (dual-hose design)",
      url: "https://www.midea.com/us/store/cooling-and-heating/portable-air-conditioners/midea-duo-smart-inverter-portable-air-conditioner.map14s1tbl",
    },
    {
      label: "Whynter — official site (NEX ARC-1230WN dual-hose portable AC)",
      url: "https://www.whynter.com",
    },
    {
      label: "Companion explainer: Single-Hose vs Dual-Hose Portable AC (BlackBox)",
      url: "https://www.blackboxsupplies.com/guides/single-hose-vs-dual-hose-portable-ac",
    },
    {
      label: "Full comparison: The Best Portable Air Conditioners, SACC-first (BlackBox)",
      url: "https://www.blackboxsupplies.com/guides/best-portable-air-conditioners",
    },
  ],
};
