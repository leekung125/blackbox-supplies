import type { Article } from "@/lib/articles";

/**
 * Commercial-investigation comparison page.
 * Target long-tail keyword: "single hose vs dual hose portable AC which is better".
 * Buyer is mid-decision between the two unit types and wants to know whether the
 * dual-hose premium is worth it before checkout.
 *
 * Honesty laws (match the shipped voice): researched & cited, NOT personally tested;
 * no fabricated ratings/prices; every number traces to the catalog or a named
 * manufacturer figure. Picks/product cards route buyers to our own /products pages.
 *
 * Self-contained file. Wire-in: import + push into EXTRA_ARTICLES in lib/articles-extra.ts.
 */
export const SINGLE_VS_DUAL_HOSE_AC: Article = {
  slug: "single-hose-vs-dual-hose-portable-ac",
  title: "Single-Hose vs Dual-Hose Portable AC: Which Should You Buy?",
  dek: "Single hose vs dual hose portable AC — which is better? The honest physics, a side-by-side, and a decision rule by room size, sun exposure, and budget, so you know before checkout whether the dual-hose premium is worth it.",
  category: "Cooling",
  readMinutes: 8,
  updated: "July 2026",
  answerFirst:
    "For a small, shaded bedroom, a single-hose unit is the better buy — cheaper, simpler, and enough. A dual-hose unit is better for a large or sun-facing room: it draws its cooling air from outside instead of your room, so it cools faster and doesn't fight itself. Match the hose count to the room, not the marketing.",
  sections: [
    {
      heading: "Single-hose vs dual-hose portable AC: which is better?",
      body: [
        "Neither is universally better — they win different rooms. The whole question comes down to where the air conditioner gets the air it uses to cool its own compressor. That one design choice decides how fast the room cools, how hard the unit has to work, and whether you should pay the premium.",
        "A single-hose portable AC uses room air to cool its condenser, then blows that air out the window through its one hose. That air has to be replaced — and it gets replaced by warm, unconditioned air sneaking in through every gap in the house. A dual-hose unit pulls its condenser air from outside through a second hose, so it never robs the room it's trying to cool. That's the entire difference, and everything below flows from it.",
        "So the honest answer to \"single hose vs dual hose portable AC, which is better\" is: dual-hose is more efficient and cools a hard room faster, but that advantage only earns its higher price in a large, sunny, or hot space. In a small shaded bedroom, the extra hose and extra cost are overkill.",
      ],
    },
    {
      heading: "The physics, honestly: negative pressure vs. a sealed loop",
      body: [
        "Every portable AC has to dump the heat it removes somewhere outside — that's what the exhaust hose does. The catch is that the condenser also needs a stream of air to carry that heat away, and where it takes that air from is what separates the two designs.",
        "A single-hose unit takes it from the room. As it blows conditioned room air out the window, the pressure inside your room drops slightly below the pressure outside. Air always moves from high pressure to low, so warm outside air is pulled back in through door gaps, outlets, and window seals — a phenomenon called negative-pressure infiltration. The unit is effectively cooling air that it partly replaces with hot air. It still works; it just has to run longer and harder to win, and it can hit a ceiling on the hottest days.",
        "A dual-hose unit closes that loop. One hose brings outdoor air in to cool the condenser, the other sends it back out — the whole heat-rejection circuit runs on outside air and never touches the air you're paying to keep cold. No vacuum, no infiltration, less re-heating. On paper and in practice this is the more efficient way to move heat, which is why every dual-hose maker leads with it.",
        "The honest footnote: no portable AC is as efficient as a same-BTU window unit, because a window unit puts the whole hot half of the machine outside. Dual-hose narrows that gap; it doesn't close it.",
      ],
    },
    {
      heading: "Single-hose vs dual-hose: side by side",
      body: [
        "The trade is efficiency and speed against price and setup simplicity. Here's the split at a glance, with the catalog specs for the units we recommend for each branch.",
      ],
      table: {
        caption: "Single-hose vs dual-hose portable AC, compared",
        columns: ["", "Single-hose", "Dual-hose"],
        rows: [
          ["How it cools the condenser", "Uses room air, exhausts it outside", "Draws outside air in and back out"],
          ["Side effect", "Negative pressure pulls warm air back in", "Sealed loop — no room air lost"],
          ["Cooling speed in a hot room", "Slower; can plateau in a heatwave", "Faster; holds up in sun and heat"],
          ["Efficiency", "Lower (fights its own infiltration)", "Higher (no re-heating penalty)"],
          ["Setup", "One hose to route — simplest", "Two hoses; needs more window width"],
          ["Typical price", "$280–$360 (BLACK+DECKER 10,000 BTU)", "$500–$720 (Midea Duo / Whynter NEX)"],
          ["Best room", "Small, shaded, well-insulated", "Large, sun-facing, or top-floor/kitchen"],
        ],
      },
    },
    {
      heading: "The decision rule: room size, sun exposure, and budget",
      body: [
        "Three inputs decide this, in order. Run them top to bottom and stop at the first one that pushes you to dual-hose.",
      ],
      list: [
        "Room size|Under ~300 sq ft, single-hose is genuinely fine — the room is small enough that infiltration never overwhelms it. Over ~400 sq ft, or an open-plan space, dual-hose's speed and efficiency start to matter.",
        "Sun and heat load|A room with big west- or south-facing windows, a top-floor room, or a kitchen gains heat all afternoon. That's exactly where a single-hose unit runs flat-out and never quite catches up — and where dual-hose earns its price.",
        "Climate|In a punishing, prolonged heatwave, the dual-hose efficiency edge compounds day after day. In a mild climate where you cool a few evenings a month, a single-hose unit is the rational spend.",
        "Budget|If the honest choice is a single-hose unit you'll actually be happy with versus a dual-hose unit that strains the budget for a small room, buy the cheaper one and keep the money. Overkill isn't a virtue.",
      ],
    },
    {
      heading: "The catch: dual-hose only pays off in a big, sunny room",
      body: [
        "This is the part most comparison pages skip. Dual-hose is the better technology, but \"better technology\" and \"better purchase\" aren't the same thing. In a small, shaded, well-sealed bedroom, a single-hose unit barely creates enough negative pressure to matter — the infiltration penalty is small because the room is small. You'd pay $200+ more, route a second hose, and give up window width for an efficiency gain you'd struggle to feel.",
        "Put the same dual-hose unit in a 500 sq ft sun-baked living room and the story flips completely: now the single-hose unit is the one that disappoints, running non-stop and losing ground every afternoon while the dual-hose unit holds temperature. Same two machines, opposite verdicts — because the room changed, not the hardware.",
        "So don't buy dual-hose as a status upgrade for a small space, and don't buy single-hose to save money on a big hot one. The room writes the answer.",
      ],
    },
    {
      heading: "Who should buy dual-hose (and our two picks)",
      body: [
        "Buy dual-hose if your room is large, open-plan, sun-facing, on a top floor, or a kitchen — anywhere the heat load is real and constant. You accept a higher price and a second hose to route in exchange for faster cooling that holds up when a single-hose unit would plateau. Both picks below are inverter units, so they modulate quietly instead of slamming on and off.",
        "The Whynter NEX ARC-1230WN is the dual-hose specialist: 14,000 BTU (12,000 SACC), rated for rooms up to 600 sq ft, with Wi-Fi control. The Midea Duo is the quieter, cool-and-heat alternative — 14,000 BTU (12,000 SACC), up to 550 sq ft, an inverter compressor rated near 42 dB, plus Alexa/Google and a heat mode for year-round use. Specs are from each manufacturer; we research and cite rather than lab-test.",
        "The honest catch on both: they're large, heavy units that still need a nearby window, and the dual-hose window kit needs more width than a single-hose bracket — measure your opening before you order.",
      ],
      productIds: ["whynter-nex-arc-1230wn-14-000", "midea-duo-14-000-btu-smart"],
    },
    {
      heading: "Who should buy single-hose (our value pick)",
      body: [
        "Buy single-hose if your room is small to medium (up to ~450 sq ft), shaded, and reasonably sealed — a typical bedroom or home office. You get the lowest price, the simplest one-hose setup, and cooling that's perfectly adequate for the space. You give up inverter quiet and dual-hose efficiency you wouldn't have used anyway.",
        "The BLACK+DECKER BPACT10WT is the honest budget pick: 10,000 BTU (5,500 DOE) rated to 450 sq ft, a 3-in-1 that also dehumidifies and runs as a fan, with a 'Follow Me' remote that reads the temperature where you sit. At about 47.3 lb on casters, with side carrying handles, it rolls between rooms easily enough — no lighter than most portable ACs, so plan for it to live in one room.",
        "The honest catch: it's a fixed-speed single-hose unit, so it cycles on and off with an audible thump rather than the steady low hum of an inverter, and there's no app or voice control. Light sleepers and anyone cooling a large, sunny room should step up to an inverter or dual-hose unit instead.",
      ],
      productIds: ["black-decker-10-000-btu-3"],
    },
    {
      heading: "Specific failure modes to avoid",
      list: [
        "Buying a single-hose unit for a big sunny room|The #1 regret — it runs flat-out, never catches up in a heatwave, and people blame the weather. That room needs dual-hose or more BTU.",
        "Buying dual-hose for a small shaded bedroom|You pay the premium and route a second hose for an efficiency gain you can't feel. Save the money.",
        "Comparing units by the box BTU|The giant headline number is the old ASHRAE rating. SACC (or DOE) is the tested, real-world figure and it's often 30–50% lower. Compare units by SACC/DOE or you're comparing marketing to marketing.",
        "Undersizing the unit|Roughly 20 SACC BTU per square foot, then add margin for sun, top floors, and kitchens. A too-small unit that runs non-stop is the most common complaint in the category.",
        "Not measuring the window|Dual-hose kits need more width than single-hose ones. Confirm your window opening fits the bracket before ordering — this is easy to miss and expensive to return.",
        "Assuming 'portable' means light|Most real units are heavy; even the budget BLACK+DECKER is 47.3 lb, so read 'portable' as rolls-on-casters rather than carryable, and don't expect it to cool a large room.",
      ],
    },
  ],
  faq: [
    {
      q: "Is single hose or dual hose portable AC better?",
      a: "It depends on the room. Dual-hose is more efficient and cools faster because it uses outside air for its condenser instead of robbing the room, so it's better for large, sunny, or hot spaces. Single-hose is cheaper and simpler and is the better buy for a small, shaded bedroom where dual-hose is overkill.",
    },
    {
      q: "Is a dual-hose portable AC really worth the extra money?",
      a: "In a big, sun-facing, or top-floor room, yes — the efficiency and speed advantage is real and compounds through a heatwave. In a small shaded room, no — the negative-pressure penalty a single-hose unit suffers is small there, so you'd pay $200+ more for a gain you'd struggle to feel.",
    },
    {
      q: "Why does a single-hose portable AC cool slower?",
      a: "It exhausts conditioned room air out the window, which drops the room's pressure slightly below outside. That vacuum pulls warm, unconditioned air back in through gaps, so the unit is partly re-heating the room it's cooling. It still works; it just has to run longer and can plateau on the hottest days.",
    },
    {
      q: "Can I convert a single-hose portable AC to dual-hose?",
      a: "Not reliably. Some owners rig a second intake, but the unit's condenser fan, ducting, and window kit are engineered for single-hose airflow, so aftermarket conversions rarely deliver a true dual-hose result. If you need dual-hose performance, buy a unit built for it.",
    },
    {
      q: "Do both single-hose and dual-hose portable ACs need a window?",
      a: "Yes — both vent hot air outside through a hose and window kit. A dual-hose unit simply needs more window width for its second hose. The only portable ACs that skip a permanent window vent are small battery-capable spot coolers built for tents and vans, not full rooms.",
    },
  ],
  relatedGuides: [
    "best-portable-air-conditioners",
    "best-portable-ac-garage-no-window",
    "do-swamp-coolers-work-in-humid-climates",
  ],
  sources: [
    { label: "Whynter — official site (NEX ARC-1230WN dual-hose portable AC)", url: "https://www.whynter.com" },
    { label: "Midea Duo (MAP14S1TBL) — official product page (dual-hose design)", url: "https://www.midea.com/us/store/cooling-and-heating/portable-air-conditioners/midea-duo-smart-inverter-portable-air-conditioner.map14s1tbl" },
    { label: "BLACK+DECKER BPACT10WT — official product page", url: "https://www.blackanddecker.com/products/bpact10wt" },
    { label: "ENERGY STAR — Room Air Conditioners Key Product Criteria (CEER efficiency criteria by BTU capacity)", url: "https://www.energystar.gov/products/room_air_conditioners/key_product_criteria" },
    { label: "BlackBox: The Best Portable Air Conditioners, compared (SACC-first)", url: "/guides/best-portable-air-conditioners" },
  ],
  heroImage: "/products/scene/whynter-nex-arc-1230wn-14-000.webp",
  picks: [
    { id: "whynter-nex-arc-1230wn-14-000", cat: "heat", label: "Best dual-hose · large/sunny rooms" },
    { id: "black-decker-10-000-btu-3", cat: "heat", label: "Best single-hose value · small/shaded" },
    { id: "midea-duo-14-000-btu-smart", cat: "heat", label: "Quietest dual-hose · cool + heat" },
  ],
};
