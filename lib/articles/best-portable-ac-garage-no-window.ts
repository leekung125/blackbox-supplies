import type { Article } from "@/lib/articles";

/**
 * Deep buyer-intent article — self-contained.
 * Target keyword: "best portable AC for a garage with no window".
 * Wire-in: import + push into EXTRA_ARTICLES (lib/articles-extra.ts).
 * Honesty: all specs traced to the heat-products.json catalog + named
 * manufacturer/DOE ratings. No fabricated ratings, prices are ranges.
 */
export const BEST_PORTABLE_AC_GARAGE_NO_WINDOW: Article = {
  slug: "best-portable-ac-garage-no-window",
  title: "Best Portable AC for a Garage With No Window (Why Dual-Hose Is the Real Answer)",
  dek: "In a sealed one-to-two-car garage, the single-hose bargain fights itself. The best portable AC for a garage with no window is a 12,000+ SACC dual-hose unit vented through the wall or door — here's why, plus how to exhaust it and when to skip a portable entirely.",
  category: "Cooling",
  readMinutes: 9,
  updated: "July 2026",
  answerFirst:
    "For a sealed one-to-two-car garage with no window, buy a dual-hose portable AC of at least 12,000 SACC — our pick is the Whynter NEX ARC-1230WN. A dual-hose unit pulls its exhaust air from outside, so it won't create the negative pressure that sucks hot air back in through the garage-door gaps. Vent it through the wall or under the door. Single-hose bargains fight themselves in a sealed room.",
  sections: [
    {
      heading: "The honest verdict up front",
      body: [
        "A garage is the hardest room in the house to cool: little or no insulation, a giant uninsulated door that soaks up sun, concrete that holds heat, and — the constraint that brought you here — no window to vent a portable AC through. That combination is exactly where the cheap single-hose unit everyone reaches for quietly fails.",
        "The short version: size matters, but hose count matters more. In a normally-sealed garage you want at least 12,000 BTU SACC of capacity, and it should be a DUAL-hose unit. A single-hose AC exhausts air out of the room to cool its compressor, which lowers the pressure inside the garage; the garage then pulls hot, unconditioned outside air back in through every gap around that big door to replace it. The AC ends up fighting the leak it created. A dual-hose unit draws its compressor-cooling air from outside instead, so it doesn't depressurize the room — which is why it cools faster and holds temperature in a leaky, sun-loaded space.",
        "If your garage is permanent workspace you'll use for years, read the 'who should skip' section first — a ductless mini-split is a better long-term answer. But if you want something you can buy, roll in, and vent this weekend, this is the honest path.",
      ],
    },
    {
      heading: "Why a single-hose AC fights itself in a sealed garage",
      body: [
        "Every portable AC has to dump the heat it removes somewhere, and it needs a stream of air to cool its own compressor. How it gets that air is the whole difference between the two designs.",
        "A single-hose unit uses room air for both jobs: it pulls air from inside the garage, runs it over the hot compressor coils, and blows it out the one exhaust hose. That air has to be replaced, and in a closed room the only place replacement air comes from is outside — infiltrating through the gaps around the garage door, the service door, and any wall penetrations. On a hot day that incoming air is the same hot, humid air you're paying to remove. Engineers call this negative-pressure infiltration, and it's why single-hose units are widely measured to deliver noticeably less effective cooling than their sticker BTU suggests. In a well-sealed bedroom it's a modest tax; in a garage with a leaky roll-up door it can gut the unit's real output.",
        "A dual-hose unit splits the two jobs. One hose brings outdoor air in to cool the compressor; the second hose exhausts that same air straight back out. Because the compressor loop is sealed off from the room, the AC isn't constantly pumping conditioned air outside and sucking hot air back in. The room stays at roughly neutral pressure, and more of the machine's capacity actually goes into cooling the space. That efficiency edge is small in a tight room and large in a leaky, sun-baked garage — which is the exact case you have.",
      ],
    },
    {
      heading: "How to size it: read the SACC number, not the BTU",
      body: [
        "The headline BTU on a portable AC box is the old, generous rating. The number that actually tells you how much room a unit cools is its SACC (Seasonally Adjusted Cooling Capacity), the DOE test figure that bakes in real-world losses — including the single-hose infiltration penalty above. It's always lower than the marketing BTU, and it's the honest one to size against.",
        "Both 14,000 BTU picks here carry a SACC of about 12,000. That's sized for roughly 500–600 sq ft of normal room — but a garage is not a normal room. Poor insulation, a hot door, and concrete thermal mass mean you should treat a garage as if it were considerably larger than its floor area, and expect the unit to run longer to hold a setpoint. Size up, never down: an oversized portable in a garage has margin to fight the heat load; an undersized one runs flat-out and never catches up.",
      ],
      table: {
        caption: "Garage size → what to look for (portable AC, closed garage)",
        columns: ["Your garage", "SACC to look for", "Design that fits"],
        rows: [
          ["Single bay, insulated door, shaded", "10,000–12,000 SACC", "Dual-hose strongly preferred"],
          ["Single bay, bare metal door, some sun", "12,000 SACC minimum", "Dual-hose — single-hose will lag"],
          ["Two-bay or west-facing full sun", "12,000+ SACC, size up", "Dual-hose, or step to a mini-split"],
          ["Detached shop, insulated, year-round use", "Permanent load", "Ductless mini-split (not a portable)"],
        ],
      },
    },
    {
      heading: "Best portable AC for a garage with no window: the three units, compared",
      body: [
        "Three units, three honest roles. The Whynter is the pick because it's the dual-hose design this whole page argues for. The Midea is the near-silent alternative if the AC will sit next to a workbench you actually work at. The BLACK+DECKER is here as the honest counter-example — a perfectly good single-hose unit for a room with a window, and the wrong tool for a sealed garage. Specs below are the manufacturers' own ratings; we research from published specs and owner reviews and don't bench-test units ourselves. Prices are approximate ranges.",
      ],
      table: {
        caption: "Whynter NEX vs Midea Duo vs BLACK+DECKER — for a windowless garage",
        columns: ["Unit", "Capacity", "Hose design", "Noise", "Garage verdict"],
        rows: [
          [
            "Whynter NEX ARC-1230WN",
            "14,000 BTU / ~12,000 SACC",
            "Dual-hose",
            "Low (NEX inverter)",
            "Best pick — the design that won't depressurize the room",
          ],
          [
            "Midea Duo (MAP14S1TBL)",
            "14,000 BTU / ~12,000 SACC",
            "Single-hose (per our catalog)",
            "Near-silent ~42 dB inverter",
            "Quiet alternative — pick if noise beats max efficiency",
          ],
          [
            "BLACK+DECKER BPACT10WT",
            "10,000 BTU / ~5,550 DOE",
            "Single-hose",
            "Fixed-speed, cycles louder",
            "Don't do this for a sealed garage — great for a windowed room",
          ],
        ],
      },
      productIds: [
        "whynter-nex-arc-1230wn-14-000",
        "midea-duo-14-000-btu-smart",
        "black-decker-10-000-btu-3",
      ],
    },
    {
      heading: "The catch on each pick (read before you buy)",
      list: [
        "Whynter NEX ARC-1230WN|The catch: two hoses need more width than a single-hose kit and take longer to route, and it carries a premium price. For a sealed garage that efficiency is exactly what you're paying for — but confirm your planned wall or door opening can fit the dual-hose bracket first.",
        "Midea Duo (quiet alternative)|The catch: our catalog lists it as a single-hose inverter, so in a truly sealed garage it gives up some of the dual-hose efficiency the Whynter keeps. Its real edge is near-silent ~42 dB inverter operation — pick it only if the unit sits beside a workspace where noise matters more than squeezing out maximum efficiency.",
        "BLACK+DECKER BPACT10WT|The catch: it's a single-hose unit rated ~5,550 DOE (its '10,000 BTU' is the old number), which is genuinely fine for a windowed bedroom or office up to ~450 sq ft — and genuinely undersized and self-defeating in a sealed, sun-loaded garage. We list it so you can recognize the tempting bargain that's the wrong tool here.",
      ],
    },
    {
      heading: "How to vent a portable AC in a garage with no window",
      body: [
        "No window doesn't mean no venting — the heat just has to leave through a different opening. You have three realistic exits, in rough order of how well they work.",
        "The best option is a permanent through-wall vent: cut a hole to the outside, mount a wall exhaust plate (many portable ACs sell one, or you build one from a scrap of plywood or foam board), and run the hose or hoses through it. This is the cleanest, most efficient path and the only one that fully solves 'no window.' For a dual-hose unit you need enough width for both an intake and an exhaust penetration — plan the opening around the bracket before you cut anything.",
        "The second option is venting through the garage door itself or the gap beneath it. Some owners build a panel that drops into the door track, or seal the hose through a modified door bottom. It works, but it puts the exhaust right where the door's own leaks are, so seal around it well. If you go this route, weatherstrip the rest of the door — an under-door seal and side gaskets — because every gap you close is hot air the AC no longer has to fight.",
        "The third option is an existing penetration: a dryer vent, a wall louver, or a service-door transom. Usable in a pinch, but the opening is often the wrong size and you'll lose efficiency to poor sealing. Whatever you choose, keep the hose runs short and as straight as possible — long, kinked, uninsulated hoses radiate the heat you just collected right back into the garage.",
      ],
    },
    {
      heading: "The honest catch: no portable beats an uninsulated door in full sun",
      body: [
        "Here's the limit worth setting your expectations against before you spend $500–700. A portable AC — any portable AC — is inherently less efficient than a window unit or a mini-split, because a chunk of the heat it collects leaks back off the hoses and body into the room it's standing in. That's physics, not a defect, and it's true even of the dual-hose pick.",
        "Now stack a garage's heat load on top: a bare metal roll-up door facing afternoon sun can act like a radiator, dumping heat in faster than a 12,000-SACC portable can pull it out. On the worst days, in the worst-oriented garage, a single portable won't reach a crisp 72°F — it'll take the edge off and hold the space livable, which is often all you actually need to work in there. If you want true cold in a sun-blasted two-bay, the answer isn't a bigger portable; it's insulating that door and stepping up to a mini-split.",
        "Two cheap moves multiply whatever unit you buy: insulate the garage door (foam-board or a kit) so it stops radiating, and weatherstrip the perimeter so the AC isn't cooling the outdoors. Do those first and a mid-size dual-hose portable punches well above its rating. Skip them and no portable will save you.",
      ],
    },
    {
      heading: "Who it's for — and who should skip a portable entirely",
      body: [
        "A portable AC is the right call when the need is seasonal or occasional and you don't want to modify the building much: summer projects, a home gym you use a few months a year, a workshop you want tolerable on hot weekends, or a rental where a permanent install isn't allowed. It's movable, it's here-this-week, and a wall vent is reversible.",
        "Skip the portable and go straight to a ductless mini-split if the garage is permanent, daily, year-round workspace — an office, a serious shop, a converted room. A mini-split is far more efficient, quieter, heats as well as cools, and costs less to run over its life; the tradeoff is a bigger upfront price and a real installation. For occasional off-grid or very small sealed spaces where you truly can't cut any vent, a battery-capable unit like the EcoFlow WAVE 3 exists — but at 6,100 BTU it's built for a tent or van, not a one-to-two-car garage, so don't mistake it for a garage solution.",
      ],
      productIds: ["ecoflow-wave-3-portable-air-conditioner"],
    },
    {
      heading: "Mistakes people make cooling a windowless garage",
      list: [
        "Buying single-hose to save money|In a sealed garage the negative-pressure infiltration hands back much of what you saved as lost cooling. Dual-hose is the point, not an upsell.",
        "Sizing by the box BTU|The SACC (or DOE) number is the honest capacity. A '14,000 BTU' unit is really ~12,000 SACC — size the garage against that lower figure and then size up for poor insulation.",
        "Venting long, kinked, bare hoses|Every foot of uninsulated exhaust hose radiates collected heat back into the room. Keep runs short, straight, and sealed at the opening.",
        "Ignoring the door|An uninsulated door in full sun out-heats the AC. Foam-board insulation and perimeter weatherstripping are the cheapest cooling you'll ever buy.",
        "Expecting bedroom-cold in a two-bay|A single portable holds a leaky, sunny garage 'livable,' not frigid. If you need true cold, insulate the door and move to a mini-split.",
        "Treating a battery mini-AC as a garage unit|A 6,100 BTU cordless unit is for tents and vans. It won't cool a garage — don't let 'no window needed' fool you into undersizing.",
      ],
    },
  ],
  faq: [
    {
      q: "What is the best portable AC for a garage with no window?",
      a: "A dual-hose unit of at least 12,000 SACC — our pick is the Whynter NEX ARC-1230WN (14,000 BTU / ~12,000 SACC). Dual-hose is the key: it pulls compressor-cooling air from outside instead of from the room, so it doesn't create the negative pressure that draws hot air back in through the garage door gaps. Vent it through the wall or under the door rather than a window.",
    },
    {
      q: "Why is dual-hose better than single-hose for a garage?",
      a: "A single-hose AC exhausts room air outside to cool its compressor, which lowers the pressure inside and pulls hot outdoor air back in through every gap around the garage door — so it partly fights itself. A dual-hose unit draws that air from outside instead, keeping the room at neutral pressure. The efficiency gap is small in a tight bedroom and large in a leaky, sun-loaded garage.",
    },
    {
      q: "How do I vent a portable AC in a garage with no window?",
      a: "Three ways, best first: a permanent through-wall vent with an exhaust plate (cleanest and most efficient); a panel built into the garage door or the gap beneath it (seal it well); or an existing opening like a dryer vent or wall louver (works in a pinch, less efficient). Keep hose runs short and straight, and weatherstrip the rest of the door.",
    },
    {
      q: "What size portable AC do I need for a two-car garage?",
      a: "Size against SACC, not the box BTU. A 12,000-SACC (14,000 BTU) dual-hose unit is the practical starting point, and you should size up because a garage's poor insulation, hot door, and concrete mass make it behave like a much larger room. For a full-sun, west-facing two-bay, insulate the door first or step up to a mini-split — a single portable may only take the edge off.",
    },
    {
      q: "Should I just get a mini-split instead?",
      a: "If the garage is permanent, daily, year-round workspace, yes — a ductless mini-split is more efficient, quieter, heats as well as cools, and costs less to run over its life, at the price of a bigger upfront cost and a real install. A portable AC wins when the need is seasonal or occasional, you rent, or you don't want to modify the building much.",
    },
    {
      q: "Will a portable AC actually cool a hot metal-door garage?",
      a: "It will make it livable, not necessarily frigid. Every portable is less efficient than a window unit or mini-split, and a bare metal door in afternoon sun radiates heat faster than a mid-size portable can remove it. Insulate the door and weatherstrip the perimeter and a dual-hose portable performs well above its rating; skip those and no portable will keep up on the worst days.",
    },
  ],
  // Legacy-guide cross-links only render for getGuideBySlug; no cooling legacy
  // guide exists, so we cross-link cooling content in prose/sources instead.
  relatedGuides: [],
  sources: [
    {
      label: "ENERGY STAR — Portable Air Conditioners (explains SACC/DOE ratings)",
      url: "https://www.energystar.gov/products/portable_air_conditioners",
    },
    { label: "Whynter — official site", url: "https://www.whynter.com" },
    { label: "Midea — official site", url: "https://www.midea.com" },
  ],
  heroImage: "/products/heat/whynter-nex-arc-1230wn-14-000.png",
  picks: [
    { id: "whynter-nex-arc-1230wn-14-000", cat: "heat", label: "Best dual-hose pick" },
    { id: "midea-duo-14-000-btu-smart", cat: "heat", label: "Quiet alternative" },
    { id: "black-decker-10-000-btu-3", cat: "heat", label: "Budget (windowed rooms)" },
  ],
};
