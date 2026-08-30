import type { Article } from "@/lib/articles";

/**
 * Long-tail buyer-intent article (self-contained; orchestrator wires it into
 * EXTRA_ARTICLES). Target keyword: "do batteryless / supercapacitor jump
 * starters work". Failure-first framing: the documented way a lithium jump
 * starter fails is dying in storage, and this is the category that claims to
 * fix it.
 *
 * HONESTY NOTES — every number below traces to lib/owner-evidence.ts:
 *  - Autowit figures (2-3 min self-charge, ~5V bootstrap, -40F to 158F, ~800A
 *    burst, 10-30 min charge decay, the 2.5L diesel miss at 15-17F) come from
 *    the autowit-supercap-2 entry.
 *  - NOCO GB40 and GOOLOO GP2000 storage/self-discharge figures come from their
 *    own entries. Prices are the catalog priceRange values.
 *  - The Autowit evidence base is THIN (several first-hand reports, not a large
 *    star-count sample) and the page says so out loud rather than presenting it
 *    as settled. No invented tests, no ratings, no review counts.
 */
export const DO_BATTERYLESS_SUPERCAPACITOR_JUMP_STARTERS_WORK: Article = {
  slug: "do-batteryless-supercapacitor-jump-starters-work",
  title: "Do Batteryless (Supercapacitor) Jump Starters Actually Work?",
  dek: "A supercapacitor jump starter holds no charge of its own — it borrows a little from your dying battery, then cranks. That genuinely fixes the way lithium packs fail (dead in the glovebox), but it trades that problem for a different one. Here's what owners actually report, and who should buy which.",
  category: "Jump Starters",
  readMinutes: 7,
  updated: "August 2026",
  answerFirst:
    "Yes, with a real condition attached. A supercapacitor pack has no lithium cell to self-discharge, so it survives months in a hot or freezing car — the exact failure that kills forgotten lithium packs. But it stores nothing, so it must borrow charge before each crank: about 2-3 minutes off your own weak battery, or roughly 10 minutes from USB. If your battery is stone dead at 0V or has a shorted cell, it cannot self-charge at all and you need a power bank or another car.",
  sections: [
    {
      heading: "The failure this category exists to fix",
      body: [
        "Here is the moment that sends people to this page. The car is dead, you reach for the jump starter you bought for exactly this — and the jump starter is dead too. It has been in the glovebox since last winter.",
        "That is not bad luck, it is the documented failure mode of lithium jump starters, and you can see it in owners' own reports on both of the popular packs we cover. On the NOCO GB40, owners describe leaving it in a glovebox for months without a top-up until the cell drops too low to wake — forgotten units are the single most common 'won't turn on' cause. On the GOOLOO GP2000, owners report the unit failing to recharge or start after long idle storage unless it is topped up roughly every three months, and units left uncharged can fail to recover within about two years.",
        "So the real-world requirement of a lithium jump starter is a calendar reminder every one to three months, for a device you hope to never use. A supercapacitor pack is the industry's answer to precisely that, and the reason it can make that claim is that there is no battery inside to go flat.",
      ],
      productIds: ["noco-boost-gb40-1000a-ultrasafe", "gooloo-gp2000-2000a-compact-lithium"],
    },
    {
      heading: "How a batteryless jump starter actually works",
      body: [
        "A supercapacitor stores energy in an electric field rather than a chemical reaction. That gives it the opposite personality to a lithium cell: it charges in minutes instead of hours, it does not degrade the way a battery does with cycles, and it shrugs off temperature — the Autowit SuperCap 2 is rated from -40F to 158F. The trade is capacity. A capacitor of this size holds only enough energy for a short, violent burst, which happens to be all an engine start needs: owners describe roughly an 800A crank window lasting about 5-10 seconds.",
        "Because it holds so little, it does not arrive charged. You clamp it to the dead battery and it pulls what it needs from whatever charge is left — owners report about 2-3 minutes from the car's own weak battery, or roughly 10 minutes from a USB source. One owner reports bootstrapping it from a battery down at about 5V, which is well below the point where the engine will do anything but click. Then you crank.",
        "That is the whole trick, and it is a genuinely clever one: your battery usually is not empty, it is just too weak to deliver the huge current a starter motor demands. The capacitor borrows the energy slowly and gives it back fast.",
      ],
      productIds: ["autowit-supercap-2-batteryless-supercapacitor"],
    },
    {
      heading: "The catch: it borrows charge, so it needs something to borrow from",
      body: [
        "This is the part the marketing does not lead with, and it is the reason this page is not a straight recommendation. A supercapacitor pack has no reserve of its own. If the battery is truly at 0V, or has a shorted cell, there is nothing to charge from and the device cannot help you unaided — owners in that situation have to feed it from a USB power bank or another car's battery first. A lithium pack, if you kept it charged, does not care about any of that.",
        "There is a second consequence of storing energy in a field rather than a chemical: it leaks. Owners report the charge bleeding away within roughly 10 to 30 minutes. You cannot charge it in the driveway and carry it around ready to go — it has to be charged immediately before each attempt. And if an attempt fails, you recharge before trying again, which matters more than it sounds: one owner found it insufficient to crank a cold 2.5L diesel at 15-17F despite the unit's 4.0L-diesel rating, and every miss meant another wait.",
        "So the honest summary of the trade is this. Lithium fails on maintenance — it dies because you forgot it. Supercapacitor fails on preconditions — it needs residual voltage or a USB source, and it needs your engine to be within its cranking ability on the first or second try. Neither is strictly better; they fail in different directions.",
      ],
      list: [
        "Carry a USB power bank with it|This is the fix for the one scenario the supercapacitor cannot handle alone. A power bank turns a 0V or shorted battery from a dead end into a roughly ten-minute wait, and it is the difference between a self-rescue tool and a paperweight.",
        "Do not pre-charge it and wander off|Usable charge is gone in about 10-30 minutes. Charge it at the car, immediately before you crank.",
        "Give the engine your best first attempt|Each failed crank means recharging before the next. Clean clamp contact, headlights and accessories off, key ready.",
      ],
      productIds: ["anker-power-bank-20-000mah-with"],
    },
    {
      heading: "Supercapacitor vs lithium, side by side",
      table: {
        caption:
          "How the two approaches fail differently (owner-reported figures from our evidence pages; prices approximate and drift with the market)",
        columns: ["", "Supercapacitor (Autowit SuperCap 2)", "Lithium (NOCO GB40 / GOOLOO GP2000)"],
        rows: [
          [
            "Ready after months of storage",
            "Yes — no cell to self-discharge or swell",
            "Only if topped up; GB40 wants every 1-3 months, GP2000 about every 3",
          ],
          [
            "Works with a 0V or shorted battery",
            "No — needs residual voltage, USB, or another car",
            "Yes — it carries its own charge",
          ],
          [
            "Holds charge once charged",
            "No — bleeds off in roughly 10-30 minutes",
            "Yes — GB40 owners report about 15-20 gas starts per charge",
          ],
          [
            "Temperature tolerance",
            "Rated -40F to 158F; heat does not degrade it",
            "GB40 weakens below about 10F; hot-car storage above ~140F degrades or swells cells",
          ],
          [
            "Repeat attempts",
            "Recharge between each try",
            "GB40 about 15-20 starts; GP2000 about 4-5 per full charge",
          ],
          ["Approximate price", "$90-130", "GB40 $80-100 / GP2000 $60-80"],
        ],
      },
      productIds: [
        "autowit-supercap-2-batteryless-supercapacitor",
        "noco-boost-gb40-1000a-ultrasafe",
        "gooloo-gp2000-2000a-compact-lithium",
      ],
    },
    {
      heading: "Who should buy which",
      list: [
        "Buy the supercapacitor if: you know you will never maintain it|This is the honest core of the recommendation. If the pack is going to live in the trunk untouched for a year, a lithium unit will very likely be dead when you need it and this one will not. Owners specifically praise that it can sit in the vehicle for months and still work.",
        "Buy the supercapacitor if: your car bakes or freezes|A pack rated -40F to 158F with no cell to swell is the right answer for a car parked outside in Phoenix or Minnesota. Hot-car storage is a documented killer of lithium packs.",
        "Buy lithium if: you want a guaranteed crank with no preconditions|A charged lithium pack works on a battery that is completely flat, cranks repeatedly, and needs nothing borrowed. If you are the sort of person who will actually top it up, it is the more capable tool.",
        "Buy lithium if: you drive a big or hard-starting engine|The supercapacitor's burst is short and one owner found it short of a cold 2.5L diesel. For diesels and cold climates, a high-amp lithium pack is the safer sizing — see our diesel jump starter guide for the amp math.",
        "Buy neither alone if: you are often somewhere remote|Both are single points of failure. Heavy 1-gauge cables and a second vehicle do not care about charge state or temperature, which is exactly why they still belong in the trunk.",
      ],
      productIds: ["energizer-1-gauge-800a-heavy"],
    },
    {
      heading: "How we researched this (and what we didn't do)",
      body: [
        "We did not test these packs. We do not crank engines on a bench and we will not pretend otherwise. What we did was read the real evidence base for each product and report what owners actually say, including where it contradicts the marketing.",
        "You should know that the evidence base for the supercapacitor category is thinner than for the lithium packs, and that is a real caveat rather than a formality. The Autowit figures here come from independent hands-on reviews, an overlander owner thread, and forum and Q&A reports — several first-hand accounts, not the thousands of reviews behind a NOCO or GOOLOO pack. The 2.5L diesel result is one owner's experience, not a pattern we can call typical. Treat the long-life claim with the same caution: the maker cites a 10-20 year lifespan and thousands of cycles, long-term owner data is still thin, and the unit carries a one-year warranty.",
        "Prices are approximate and move with sales, so confirm the current listing before you buy.",
      ],
    },
  ],
  faq: [
    {
      q: "Do batteryless jump starters really work with no battery inside?",
      a: "Yes, but 'batteryless' means it stores nothing until you charge it at the car. It pulls energy from your weak battery in about 2-3 minutes (or roughly 10 minutes from USB), then delivers it back as a short high-current burst — owners describe about 800A over roughly 5-10 seconds. The engine start is a brief, huge demand, which is exactly what a capacitor is good at.",
    },
    {
      q: "What happens if my battery is completely dead at 0 volts?",
      a: "Then a supercapacitor pack cannot help you on its own. It needs residual voltage to charge from, and a stone-dead or shorted-cell battery gives it nothing. Owners in that case charge it from a USB power bank or another car's battery first. This is the main reason to carry a power bank alongside it — or to buy a lithium pack instead, since a charged lithium unit does not need anything from your battery.",
    },
    {
      q: "Can I charge a supercapacitor jump starter at home and leave it in the car?",
      a: "No — and this is the most common misunderstanding about them. The charge bleeds away in roughly 10 to 30 minutes, so it must be charged right before each crank. What it does do is sit uncharged in your car for months without degrading, which is the opposite of a lithium pack's storage behavior.",
    },
    {
      q: "Is a supercapacitor jump starter good for a diesel?",
      a: "Be cautious. The Autowit SuperCap 2 carries a 4.0L diesel rating, but one owner reported it was not enough to crank a cold 2.5L diesel at 15-17F, and each failed attempt means recharging before the next. For diesels — especially in the cold — a high-amp lithium pack sized by the manufacturer's engine-size rating is the more dependable choice.",
    },
    {
      q: "Which lasts longer, a supercapacitor or a lithium jump starter?",
      a: "On paper the capacitor, because there is no cell to degrade — the maker cites a 10-20 year lifespan and thousands of cycles. In practice, long-term owner data on these is still thin and the warranty is one year, so treat that as a claim rather than a proven result. Lithium packs are better documented: owners of both the GB40 and GP2000 report roughly 3-5 years when they keep them topped up, with cell swelling or lost capacity as the usual end.",
    },
  ],
  relatedGuides: ["best-jump-starters-compared", "roadside-emergency-kit", "battery-or-alternator-how-to-tell"],
  sources: [
    { label: "Nerd Techy — Autowit SuperCap 2 hands-on review", url: "https://nerdtechy.com/autowit-supercap-2-review" },
    { label: "The Gadgeteer — Autowit SuperCap 2 review", url: "https://the-gadgeteer.com/2020/07/28/autowit-supercap-2-jump-starter-review/" },
    { label: "Expedition Portal — owner thread on the Autowit SuperCap 2", url: "https://forum.expeditionportal.com/threads/autowit-supercap-2-jump-starter.221222/" },
    { label: "BobIsTheOilGuy — Autowit SuperCap 2 owner discussion", url: "https://bobistheoilguy.com/forums/threads/autowit-supercap-2.340275/" },
    { label: "GarageJournal — NOCO GB40 cold-weather owner thread", url: "https://www.garagejournal.com/forum/threads/bad-experience-with-noco-gb-40-in-cold-weather.381251/" },
  ],
  heroImage: "/products/scene/autowit-supercap-2-batteryless-supercapacitor.webp",
};
