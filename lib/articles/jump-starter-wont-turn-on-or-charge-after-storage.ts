import type { Article } from "@/lib/articles";

/**
 * Self-contained deep guide. Wire-in (orchestrator, one edit):
 *   lib/articles-extra.ts →
 *     import { JUMP_STARTER_WONT_TURN_ON_OR_CHARGE_AFTER_STORAGE } from "./articles/jump-starter-wont-turn-on-or-charge-after-storage";
 *     ...and push JUMP_STARTER_WONT_TURN_ON_OR_CHARGE_AFTER_STORAGE into DEEP_SEO_BATCH.
 *
 * Why this topic (2026-09-13, the Sunday destination step): storage failure is the most widely
 * shared complaint in the jump-starter half of lib/owner-evidence.ts. Six of the eight jump starters
 * there carry a self-discharge, deep-discharge lockout, won't-recharge or swelling report (NOCO GB40,
 * NOCO GB70, Fanttik T8 APEX, GOOLOO GP4000, GOOLOO GP2000, DeWalt DXAEPS14); the HULKMAN Alpha85
 * explicitly shows no such pattern, and the Autowit SuperCap 2 exists to avoid it. Two cordless
 * inflators carry the same failure (Fanttik X8 APEX, HOTO). No page owned the moment itself: the car
 * is dead, and the pack bought for exactly this is dead too. It is the failure-first wedge exactly,
 * and September is when a pack comes out of a summer in a hot trunk.
 *
 * Honesty notes: every product figure traces to that product's entry in lib/owner-evidence.ts.
 * Maker guidance is labelled as maker guidance and owner reports as owner reports, and the top-up
 * table says which is which per row. The evidence has no frequency counts, so the page never claims
 * a failure is "the most common" — only which packs it appears on. Nothing is tested by us. No
 * recovery procedure is invented — the page sends the reader to the manual and the maker. Every
 * external source URL is one this site already cites in lib/owner-evidence.ts. Adversarially
 * checked against owner-evidence.ts before publishing (11 overstatements/misattributions corrected).
 * All referenced products pass bb_products.good(). No `picks`.
 */
export const JUMP_STARTER_WONT_TURN_ON_OR_CHARGE_AFTER_STORAGE: Article = {
  slug: "jump-starter-wont-turn-on-or-charge-after-storage",
  seoTitle: "Jump Starter Won't Turn On After Storage? 4 Causes",
  seoDescription:
    "The car is dead and so is the pack. Why lithium jump starters fail after months in a trunk, how to tell which cause you have, and how to prevent it.",
  title:
    "Your Jump Starter Is Dead Too: Why Packs Fail After Months in the Trunk",
  dek: "The car won't start, you reach for the jump starter you bought for exactly this moment, and it won't turn on either. That is not bad luck. Storage failure shows up in the owner evidence for five of the six popular lithium packs we track, and it has four distinct causes, only one of which is always the end of the pack. Here is how to tell which one you have, and the two habits that prevent most of it.",
  category: "Jump Starters",
  readMinutes: 8,
  updated: "September 2026",
  answerFirst:
    "Work out whether the problem is the pack or the car. If the pack's screen or lights stay dark, it has likely drained in storage until its protection circuit shut it down — try a full charge on its own charger and check the warranty. If the pack powers on but refuses to boost, your car battery may be too flat for it to detect, or the pack is too cold. If the case is bulging, stop using it. Most of this is prevented by charging the pack on the maker's schedule and keeping it out of a hot car.",
  sections: [
    {
      heading: "First: is it the pack, or the car battery?",
      body: [
        "Two different failures look identical from the driver's seat, and they have opposite fixes. In one, the jump starter itself is empty or damaged. In the other, the pack is working and is refusing to boost because of something about the car battery or the weather. Spend thirty seconds on the table below before you decide the pack is dead, because the second case can often be sorted on the spot.",
        "The one thing that should end the diagnosis immediately is a swollen case. A lithium pack whose plastic shell has bulged or split has a damaged cell. Do not charge it, do not clamp it to the car, and do not keep it in the vehicle.",
      ],
      table: {
        caption: "Match what the pack is doing to the likely cause",
        columns: ["What you see", "Likely cause", "First move"],
        rows: [
          [
            "Screen and lights stay dark, nothing responds",
            "The pack drained in storage and its low-voltage protection shut it down",
            "Charge it fully on its own charger and cable, then check the warranty date",
          ],
          [
            "Pack powers on, clamps connected, it will not boost",
            "The car battery is too flat for the pack to detect",
            "Check the manual for a manual-override or force mode, and read its warning first",
          ],
          [
            "Red error light or refused boost on a very cold morning",
            "The pack's cells are too cold to deliver current",
            "Warm the pack indoors or inside your jacket, then try again",
          ],
          [
            "Case bulging, split or swollen",
            "A damaged lithium cell — reported with age, and sometimes after hot-vehicle storage",
            "Stop using it. Do not charge it. Recycle it properly",
          ],
        ],
      },
    },
    {
      heading: "Cause #1: it drained in storage, and the protection circuit shut it down",
      body: [
        "A lithium jump starter loses charge slowly while it sits, whether or not you remember it exists. Fanttik's own support puts self-discharge on the T8 APEX at roughly 5-8% per month. That sounds harmless until you do the arithmetic on a pack that went into the glovebox last winter.",
        "The part that turns a flat pack into a dead one is the protection circuit. Lithium cells are damaged by being drained too far, so the pack's electronics shut it down once the voltage falls below a floor — and a pack that has sat past that floor for long enough may refuse to take a charge at all. That is why this cause is not always recoverable. On the NOCO GB70, owners describe exactly that: the protection circuit disables the pack once voltage drops too low, and neglected units refuse to recharge. NOCO GB40 reports describe packs left in a glovebox for months without a top-up dropping too low to wake — the most frequent won't-turn-on story in the reports we track for that pack. Fanttik's support says low-state-of-charge storage is the leading cause of a T8 APEX that will not recharge. On the GOOLOO GP2000, owners report units failing to recharge or start after long idle storage unless topped up roughly every three months.",
        "The DeWalt DXAEPS14 fails the same way for a different chemical reason. It uses a sealed lead-acid battery rather than lithium, and if it is not recharged regularly that battery self-discharges, deep-discharges and sulfates, then refuses to take or hold a charge. DeWalt's manual asks for a recharge at least every 30 days, and a full recharge takes around 10 hours.",
        "What to actually do: charge the pack fully on the charger and cable that came with it, following the manual, and give it the full time. If it will not take a charge, stop there — do not improvise a revival with another battery or charger. Check your purchase date: on the NOCO GB70, owners report this kind of failure often surfacing around the one-to-two-year mark, just past its one-year warranty. Contact the maker if you are still inside yours.",
      ],
      productIds: ["noco-boost-hd-gb70-2000a"],
    },
    {
      heading: "Cause #2: the pack is fine, and the car battery is too dead for it to see",
      body: [
        "This is the one that makes a working jump starter look broken. Many packs will not send current until they detect a small voltage from the car battery, because that detection is part of how they stop you frying something with the clamps on backwards. A battery that is completely flat may not produce enough voltage to be detected, so the pack sits there powered on and does nothing.",
        "On the HULKMAN Alpha85, owners report precisely this: it detects nothing on a completely flat battery unless they manually trigger Force Start. Owners also note that Force Start disables the reverse-polarity protection, so the clamps must be on the right terminals before you use it — that protection is the whole reason the pack refused in the first place.",
        "What to actually do: check the manual for a manual-override or force mode and read its warning before using it. Confirm red is on positive and black is on negative or a clean ground. And no amount of topping up the pack prevents this one — it is about the car battery, not the jump starter.",
      ],
      productIds: ["hulkman-alpha85-2000a-smart-jump"],
    },
    {
      heading: "If it engages but only clicks: the pack may be out of its depth",
      body: [
        "There is a third outcome that sits between the two above. The pack powers on, engages, and the starter just clicks without turning the engine over. That is not a storage failure; it is a compact pack meeting a job at the edge of what it can crank.",
        "On the GOOLOO GP2000, owners describe exactly that on fully dead or large diesel batteries, with a roughly 15-second auto-off per attempt that prevents any slow pre-charge of the flat battery. A battery that went flat enough to defeat a jump starter is also a battery worth testing, because it may need replacing anyway. If you regularly start a big diesel, size the pack for it rather than for the box's headline amps.",
      ],
    },
    {
      heading: "Cause #3: it is too cold to deliver current",
      body: [
        "Lithium cells lose output in the cold, and every pack has a temperature below which it will refuse to boost or boost weakly. On at least one popular pack, the limit owners report is well short of the number on the box.",
        "On the NOCO GB40, owners report a red error light or a refused boost around 0-10°F until the pack is warmed against the body or indoors first — well short of NOCO's stated -22°F. The NOCO GB70's usable cold limit is cited at about -4°F, with 30-50% fewer jumps per charge in cold weather. The Fanttik T8 APEX's stated cold limit is 5°F, and below that its cells lose output and it may refuse to jump until warmed indoors.",
        "What to actually do: bring the pack inside, or put it inside your jacket for a while, and try again. If you live somewhere that regularly drops below your pack's limit, store it indoors and carry it out to the car when you need it, rather than leaving it in the trunk.",
      ],
      productIds: ["noco-boost-gb40-1000a-ultrasafe"],
    },
    {
      heading: "Cause #4: a summer in a hot trunk",
      body: [
        "Heat does the opposite damage to cold, and it can be permanent. A pack stored in a vehicle through summer can come out with degraded or swollen cells, and swelling is the one outcome on this page with no recovery.",
        "On the NOCO GB70, owners report internal cells expanding and bulging the plastic case after storage in a hot vehicle trunk, forcing disposal. For the GOOLOO GP2000, leaving the lithium pack in a vehicle above roughly 140°F is widely cautioned as degrading or swelling the cells. Heat is not the only route to a swollen pack: on the NOCO GB40, swelling reports are tied to age rather than heat, with occasional but repeated reports of the battery swelling or dropping fast under load after a couple of years.",
        "What to actually do: look at the case before anything else. If it is bulging, the pack is finished — stop using it, do not charge it, and take it to a battery recycling point rather than the household trash. If it looks normal but you stored it in a hot car all summer, charge it fully now and treat its first real job with some suspicion.",
      ],
      productIds: ["gooloo-gp2000-2000a-compact-lithium"],
    },
    {
      heading: "The top-up calendar, pack by pack",
      body: [
        "Causes #1 and #4 are prevented by two boring habits: charge the pack on a schedule, and keep it out of a hot car. Cause #3 is managed by where you store it in winter, and cause #2 is about your car battery, not the pack. The charging interval is not the same for every pack, and some of these figures come from the maker while others come from owners, so the table says which. GOOLOO's FAQ, cited for its GP4000, also advises avoiding long glovebox or trunk storage.",
        "Not every pack is equally fragile, and it would be dishonest to imply they are. HULKMAN Alpha85 owners report about 95% charge after six to eight months in a trunk and only about 2% lost after three weeks at 15°F, and one GOOLOO GP4000 owner reports five years of service at about 90% capacity. Those are real reports, and they are exactly why the answer is a calendar reminder rather than a verdict on lithium packs.",
      ],
      table: {
        caption: "How often to top up, and where the figure comes from",
        columns: ["Pack", "Battery type", "Top-up interval", "Figure comes from"],
        rows: [
          ["DeWalt DXAEPS14", "Sealed lead-acid", "At least every 30 days", "DeWalt manual"],
          ["Fanttik T8 APEX", "Lithium", "About every 60 days", "Fanttik support"],
          ["GOOLOO GP4000", "Lithium", "Every 2-3 months", "GOOLOO"],
          ["NOCO Boost GB40", "Lithium", "Every 1-3 months", "Owner reports"],
          ["NOCO Boost HD GB70", "Lithium", "Monthly; failures reported when left past ~3 months", "Owner reports"],
          ["GOOLOO GP2000", "Lithium", "Roughly every 3 months", "Owner reports"],
          [
            "Autowit SuperCap 2",
            "Supercapacitor, no battery",
            "None in storage — it is charged right before each crank",
            "Owner reports and independent reviews",
          ],
        ],
      },
      list: [
        "Put it in your calendar, not your memory|Set a repeating reminder at the interval for your pack. This single habit prevents a common way these packs die.",
        "Charge it before winter, always|Cold cuts output and jumps per charge, so start the season full rather than discovering the level on the morning you need it.",
        "Keep it out of a hot car in summer|Heat is one of the things that swells cells, and swelling has no fix. Store it indoors when you can.",
        "Look at the case every time you charge it|A bulging shell means stop. It takes two seconds to check.",
        "Note your warranty date when you buy|Several storage failures are reported around the one-to-two-year mark, which can fall just after a one-year warranty ends.",
      ],
      productIds: ["fanttik-t8-apex-2000a-jump", "dewalt-dxaeps14-2000-peak-amp"],
    },
    {
      heading: "If you know you will never keep up with the calendar",
      body: [
        "There is a category built specifically for people who will forget. A supercapacitor jump starter such as the Autowit SuperCap 2 has no lithium cell to self-discharge or swell, so it can live in the car for months through heat and cold. The trade is real: it stores nothing, so it has to borrow charge from your weak battery for a few minutes before each crank, and it cannot help unaided if the battery is at 0V or has a shorted cell. Its owner evidence base is also thinner than the lithium packs'.",
        "We cover that trade properly in its own guide, linked below. The short version is that a lithium pack fails because you forgot it, and a supercapacitor pack fails when its preconditions are not met. Pick the failure you are more likely to cause.",
      ],
      productIds: ["autowit-supercap-2-batteryless-supercapacitor"],
    },
    {
      heading: "How we put this together (and what we did not do)",
      body: [
        "We did not test these packs. Everything on this page is aggregated from the owner reviews, owner forum threads, independent hands-on reviews and maker support material we track for each product, and each figure is attributed to the product it came from. Where a number is the maker's guidance we say so, and where it is an owner report we say that instead.",
        "One limitation worth stating plainly: a failure that owners report is not the same as a failure rate. People whose jump starter worked the one time they needed it rarely write about it. Treat this page as a guide to how these packs fail and how to prevent it, not as a measure of how often any one model does.",
      ],
    },
  ],
  faq: [
    {
      q: "Why won't my jump starter turn on after sitting in the car?",
      a: "A common cause is that it drained in storage until its low-voltage protection shut it down. Lithium packs self-discharge while they sit — Fanttik's support puts the T8 APEX at roughly 5-8% per month — and a pack left long enough below its floor may refuse to wake or recharge. NOCO GB40 reports describe packs left in a glovebox for months dropping too low to wake. Charge it fully on its own charger and cable per the manual; if it will not take a charge, check the warranty rather than improvising a fix.",
    },
    {
      q: "My jump starter turns on but won't jump the car. Is it broken?",
      a: "Often not. Many packs will not send current until they detect a small voltage from the car battery, and a completely flat battery may not be detectable, so the pack stays on and does nothing. HULKMAN Alpha85 owners report it detects nothing on a fully flat battery unless they trigger Force Start, which also disables reverse-polarity protection, so the clamps must be on the correct terminals first. It can also be the cold: NOCO GB40 owners report refused boosts around 0-10°F until the pack is warmed.",
    },
    {
      q: "How often should I charge a jump starter I am not using?",
      a: "Follow the maker's interval for your pack. DeWalt's manual asks for at least every 30 days on the lead-acid DXAEPS14, Fanttik's support says about every 60 days for the T8 APEX, and GOOLOO says every 2-3 months. NOCO GB40 owners report every 1-3 months, and GB70 owners who got years of service report topping it up monthly. Whatever the interval, charge it before winter.",
    },
    {
      q: "Is it safe to keep a jump starter in the car in summer?",
      a: "Heat is one way lithium cells get permanently damaged. NOCO GB70 owners report cells swelling and bulging the case after storage in a hot vehicle trunk, and leaving a lithium pack like the GOOLOO GP2000 in a vehicle above roughly 140°F is widely cautioned against. If you can, store the pack indoors in hot months and carry it out when you need it. If the case is ever bulging, stop using it, do not charge it, and recycle it.",
    },
    {
      q: "Can a dead jump starter be fixed?",
      a: "If it simply drained, a full charge on its own charger may bring it back. If it drained far enough and sat long enough, the protection circuit may refuse to recharge it — NOCO GB70 owners report neglected units that would not recharge, and DeWalt DXAEPS14 lead-acid batteries sulfate and stop holding charge after repeated deep discharge. A swollen pack cannot be fixed. Check your warranty before anything else, because several of these failures are reported around the one-to-two-year mark.",
    },
  ],
  relatedGuides: [
    "do-batteryless-supercapacitor-jump-starters-work",
    "what-size-jump-starter-do-i-need",
    "best-jump-starters-compared",
    "best-jump-starter-diesel-truck-cold-winter",
  ],
  sources: [
    {
      label: "Fanttik — T8 APEX troubleshooting guide (maker support)",
      url: "https://fanttik.com/blogs/support/fanttik-t8-apex-troubleshooting-guide",
    },
    {
      label: "GOOLOO — FAQs (maker guidance on storage and recharging)",
      url: "https://us.gooloo.com/pages/faqs",
    },
    {
      label: "DeWalt DXAEPS2 / DXAEPS14 manual — charging and storage (ManualsLib)",
      url: "https://www.manualslib.com/manual/1498464/Dewalt-Dxaeps2.html?page=12",
    },
    {
      label: "Garage Journal — owner thread: NOCO GB40 in cold weather",
      url: "https://www.garagejournal.com/forum/threads/bad-experience-with-noco-gb-40-in-cold-weather.381251/",
    },
    {
      label: "Garage Journal — owner thread: NOCO jump box issues",
      url: "https://www.garagejournal.com/forum/threads/battery-jump-box-noco-is-a-no-go.489624/",
    },
    {
      label: "How-To Geek — HULKMAN Alpha85 review",
      url: "https://www.howtogeek.com/128471/hulkman-alpha-85-portable-jump-starter-review-perfect-in-a-pinch/",
    },
    {
      label: "Companion explainer: Do Batteryless (Supercapacitor) Jump Starters Actually Work? (BlackBox)",
      url: "https://www.blackboxsupplies.com/guides/do-batteryless-supercapacitor-jump-starters-work",
    },
  ],
};
