import type { Category } from "@/lib/products";

/**
 * Question & comparison articles — the long-tail content engine.
 * Different shape from Guides (best-of roundups): these answer ONE query
 * decisively, answer-first, with tables and honest research framing.
 * Rendering: same /guides/ namespace (topical authority stays concentrated).
 *
 * Language laws: never "we tested" (we don't), no superlatives without a
 * spec behind them, every number traceable to the catalog or a manufacturer
 * rating (say whose rating it is).
 */

export interface ArticleTable {
  caption?: string;
  columns: string[];
  rows: string[][];
}

export interface ArticleSection {
  heading: string;
  /** Paragraphs. Plain text. */
  body?: string[];
  table?: ArticleTable;
  /** Bulleted list items ("Label|detail" renders label bold). */
  list?: string[];
  /** Product ids to surface as pick cards under this section. */
  productIds?: string[];
}

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface Article {
  slug: string;
  title: string;
  dek: string;
  /** Display tag. Car articles use a Category; broadened verticals use a free label (e.g. "Cooling"). */
  category: Category | string;
  readMinutes: number;
  updated: string;
  /** The 40–60 word direct answer that opens the page. */
  answerFirst: string;
  sections: ArticleSection[];
  faq?: ArticleFaq[];
  relatedGuides: string[];
  /** Named sources — the "useful resources" leg of the no-testing trust model. */
  sources?: { label: string; url: string }[];
  /** Optional cinematic hero image (relit product shot) for the guides index card. */
  heroImage?: string;
  /** Affiliate "buy" picks. `cat` is optional and decorative - resolvePicks looks the id up
   * across ALL catalogs. Changing this shape without changing lib/affiliate-picks.ts breaks
   * the build; they are two declarations of the same thing. */
  picks?: { id: string; cat?: "heat" | "useful"; label?: string }[];
}

export const ARTICLES: Article[] = [
  {
    slug: "what-size-jump-starter-do-i-need",
    title: "What Size Jump Starter Do I Need?",
    dek: "Peak amps, cranking amps, and engine-size ratings, decoded — plus a sizing chart that tells you the number to look for before you buy.",
    category: "Jump Starters",
    readMinutes: 6,
    updated: "July 2026",
    answerFirst:
      "Most gasoline cars — anything up to about a 6.0L engine — are covered by a 1000A-peak lithium jump starter like the NOCO GB40. Diesels need roughly twice the cranking power of a same-size gas engine, so trucks and diesels should step up to a 2000A-class pack. Cold climates: size up one tier.",
    sections: [
      {
        heading: "The number that matters (and the one that doesn't)",
        body: [
          "Jump starter listings throw three numbers at you: peak amps, cranking amps, and milliamp-hours (mAh). Only the first two are about starting your car.",
          "Peak amps is the burst the pack can deliver for a moment when the starter first engages — it's the headline number on the box. Cranking amps (sometimes \"start current\") is what it can sustain for the few seconds the engine actually turns over, and it's always much lower than peak. mAh is just battery capacity — it tells you how many phone charges the pack holds, not whether it can start your engine. A 20,000mAh pack with weak output electronics will lose to a smaller pack built to dump current fast.",
          "The most reliable number of all isn't amps at all — it's the manufacturer's engine-size rating. When NOCO rates the GB40 for gas engines up to 6.0L and diesels up to 3.0L, that rating bakes in real cranking behavior. Trust the engine-size rating over raw amp claims, especially on brands you've never heard of — peak-amp numbers on no-name packs are routinely inflated.",
        ],
      },
      {
        heading: "The sizing chart",
        body: [
          "Rules of thumb, cross-checked against how the major manufacturers rate their own packs. When in doubt, buy the next tier up — an oversized jump starter starts your car with margin to spare; an undersized one just clicks.",
        ],
        table: {
          caption: "Engine size → what to look for",
          columns: ["Your engine", "Peak amps to look for", "Rated example"],
          rows: [
            ["Compact 4-cylinder gas (≤2.0L)", "600–1000A", "NOCO GB40 (1000A, rated to 6.0L gas)"],
            ["V6 / mid-size gas (2.0–4.0L)", "1000A", "NOCO GB40 — still inside its rating"],
            ["V8 / large gas (4.0–6.0L)", "1000–1500A", "GB40 at its ceiling — more margin never hurts"],
            ["Small diesel (≤3.0L)", "1000–1500A", "GB40 (rated to 3.0L diesel) at its limit"],
            ["Large gas (6.0L+) / mid diesel (3.0–6.0L)", "2000A", "HULKMAN Alpha85 (2000A, rated 8.5L gas / 6.0L diesel)"],
            ["Heavy diesel trucks (6.7L Cummins, Power Stroke)", "2000A+", "NOCO GB70-class and up"],
          ],
        },
      },
      {
        heading: "Why diesels need double",
        body: [
          "Diesel engines have no spark plugs — they ignite fuel with compression alone, which means compression ratios nearly double those of gas engines. Turning one over takes correspondingly more torque from the starter motor, which draws correspondingly more current. That's why the same GB40 that's rated for a 6.0L gas V8 is only rated for a 3.0L diesel.",
          "If you drive a diesel pickup, skip the compact tier entirely. The 2000A-class packs cost $20–50 more and remove the guesswork.",
        ],
      },
      {
        heading: "The cold-weather multiplier",
        body: [
          "Cold hits from both sides at once: your car's battery loses output as temperature drops, while thickened oil makes the engine physically harder to turn. The mornings you're most likely to need a jump are exactly the mornings that demand the most from the pack.",
          "If your winters regularly go below freezing, treat the chart above as one tier optimistic — a V6 owner in Minnesota should shop like a V8 owner in Florida. Lithium packs also crank weaker when the pack itself is frozen; keeping it in the cabin (or warming it inside your jacket for a few minutes) before use makes a real difference.",
        ],
      },
      {
        heading: "Mistakes people make buying by the numbers",
        list: [
          "Buying by mAh|Capacity is for charging phones. Output electronics decide whether your engine turns over.",
          "Ignoring the diesel factor|A pack rated for your engine size *in gas terms* can be undersized by half for a diesel.",
          "Assuming one charge = one jump|A charged GB40 is good for roughly 20 starts by NOCO's rating — but only if it's actually charged (see below).",
          "Letting it sit for a year|Lithium packs self-discharge slowly. Top it up every 3–6 months, and before winter — a dead rescue battery is a paperweight in a nice case.",
          "Skipping clamp protection|Spark-proof, reverse-polarity-protected clamps are non-negotiable. Every pack we shortlist has them; plenty of bargain packs don't.",
        ],
      },
      {
        heading: "Our researched picks by tier",
        body: [
          "Both picks below follow our research standard: manufacturer-verified specs, protection features confirmed, long-term owner reviews weighed. We haven't personally tested them — we don't pretend to. Full reasoning is in the jump starter guide.",
        ],
        productIds: ["noco-boost-gb40-1000a-ultrasafe", "hulkman-alpha85-2000a-smart-jump"],
      },
    ],
    faq: [
      {
        q: "How many amps do I need to jump start a V8?",
        a: "For a gasoline V8 up to about 6.0L, look for 1000–1500 amps peak — a 1000A pack like the GB40 sits at the edge of its rating, so stepping up to a 1500–2000A pack buys comfortable margin, especially in cold climates. Diesel V8s should go straight to 2000A-class.",
      },
      {
        q: "Can a jump starter damage my car's electronics?",
        a: "Quality packs with reverse-polarity and spark protection are designed to make the risky mistakes (backwards clamps, touching clamps) safe. That protection is exactly why we don't shortlist unprotected bargain packs.",
      },
      {
        q: "Will a jump starter start a completely dead battery?",
        a: "Usually, but not always. Some packs need to detect a small voltage from the car battery before they'll deliver current; if the battery is deeply discharged, look for a pack with a manual-override (force) mode — and expect that battery to need replacement soon anyway.",
      },
      {
        q: "How often should I recharge a jump starter I never use?",
        a: "Every 3–6 months, and always before winter. Lithium packs hold charge for months, not forever, and cold accelerates the loss.",
      },
    ],
    relatedGuides: ["best-jump-starters-compared", "roadside-emergency-kit"],
    sources: [
      { label: "NOCO GB40 official specifications", url: "https://no.co/gb40" },
      { label: "HULKMAN Alpha85 official specifications", url: "https://www.amazon.com/dp/B09696NZK5?tag=blackboxsuppl-20" },
    ],
  },
  {
    slug: "power-station-vs-jump-starter",
    title: "Can a Portable Power Station Jump Start a Car?",
    dek: "No — and the reason is the difference between steady watts and a cranking burst. Here's what each box actually does, and when you need both.",
    category: "Power & Charging",
    readMinutes: 5,
    updated: "July 2026",
    answerFirst:
      "No — a portable power station cannot jump start a car. Starting an engine takes a burst of hundreds of amps at 12V for a few seconds; power stations are built to deliver steady household power for hours, typically limited to 10A on their 12V ports. They solve different problems, and a prepared trunk eventually carries both.",
    sections: [
      {
        heading: "Why the big battery can't do the small battery's job",
        body: [
          "It feels backwards: a Jackery Explorer 1000 v2 holds 1,070 watt-hours — dozens of times the energy inside a pocket jump starter — yet the little pack starts your car and the big one can't.",
          "The difference is delivery, not storage. Cranking an engine demands an enormous burst: hundreds of amps at 12 volts, sustained for two or three seconds. Jump starters are built around high-discharge lithium cells and heavy-gauge clamps that exist purely to dump that burst. A power station's 12V output is a regulated accessory port — usually capped around 10 amps, roughly a hundredth of what a starter motor draws. Ask it to crank an engine and its protection circuitry simply shuts the port down.",
          "Marketing sometimes blurs this line. Unless a unit explicitly lists jump-starting with dedicated jumper clamps and a peak-amp rating, it cannot do it — wattage has nothing to do with it.",
        ],
      },
      {
        heading: "What each one is actually for",
        table: {
          columns: ["", "Jump starter", "Power station"],
          rows: [
            ["The job", "Restart a dead 12V car battery", "Run devices and appliances off-grid"],
            ["Output shape", "Massive burst, seconds long (e.g. 1000A peak)", "Steady AC/DC power, hours long (e.g. 1500W)"],
            ["Size / weight", "Fits in a glovebox, ~2 lb", "Small duffel, 20–30+ lb"],
            ["Typical price", "$70–130", "$400–800"],
            ["Lives in", "The trunk, year-round", "The house — travels for trips and outages"],
          ],
        },
      },
      {
        heading: "The overlap that confuses people",
        body: [
          "Both will charge your phone, and that's about where the overlap ends. A jump starter's USB ports are a bonus feature on a rescue tool; a power station is the real mobile outlet — laptops, a car fridge, CPAP machines, power tools, the router during an outage.",
          "One honest caveat in the other direction: a power station can slow-charge a dead car battery through a 12V maintainer over the course of hours. If you're stranded on a schedule, that's not a rescue — it's a science project. The $80 pack in your glovebox is the rescue.",
        ],
      },
      {
        heading: "What a prepared trunk actually carries",
        body: [
          "These aren't competing purchases — they're different layers of the same kit. The jump starter is layer one: cheap, permanent trunk residency, solves the most common roadside failure there is. The power station is a later layer for road trips, camping, and outages — bought by watt-hours, not amps.",
        ],
        productIds: ["noco-boost-gb40-1000a-ultrasafe", "jackery-explorer-1000-v2-portable"],
      },
    ],
    faq: [
      {
        q: "Can I jump start a car from a power station's 12V port?",
        a: "No. The 12V accessory port is typically limited to around 10 amps; a starter motor draws hundreds. The port's protection circuit will cut out long before the engine turns.",
      },
      {
        q: "Is there any device that does both?",
        a: "A few hybrid units exist, but they compromise both jobs — modest cranking power and small capacity. For trunk-kit purposes, a dedicated $80–100 jump starter beats every hybrid we've researched.",
      },
      {
        q: "Can a power station recharge my jump starter?",
        a: "Yes — over USB, and that's a genuinely useful pairing on long trips: the station keeps the rescue pack topped up.",
      },
    ],
    relatedGuides: ["best-power-stations-compared", "best-jump-starters-compared"],
    sources: [
      { label: "Jackery Explorer 1000 v2 official specifications", url: "https://www.amazon.com/dp/B0D7PPG25F?tag=blackboxsuppl-20" },
      { label: "NOCO GB40 official specifications", url: "https://no.co/gb40" },
    ],
  },
];

ARTICLES.push(
  {
    slug: "cordless-vs-12v-tire-inflator",
    title: "Cordless vs 12V Tire Inflators: Which Should Live in Your Trunk?",
    dek: "Battery packs won the convenience war, but the cigarette-lighter models still win two scenarios that matter. Here's the honest breakdown — and the one unit that does both.",
    category: "Tire Inflators",
    readMinutes: 6,
    updated: "July 2026",
    answerFirst:
      "For most drivers, cordless wins: a battery inflator like the Fanttik X8 tops off a tire in about a minute with no cables and no engine running. Choose a 12V plug-in model if you regularly fill many or large tires — corded units never run out of battery mid-job. Can't decide? One unit genuinely does both.",
    sections: [
      {
        heading: "The difference that actually matters",
        body: [
          "Every tire inflator is the same machine at heart — a small compressor pushing air through a hose. The split is where the power comes from, and that changes when the tool works.",
          "A 12V model plugs into your car's accessory socket, which means it has power for as long as your car does — but it also means digging out the cable, running it to the tire, and keeping the car on while it works. A cordless model carries its own battery: grab it, clip it on, done — but the battery is the ceiling. Most cordless units handle roughly 4–8 car tires per charge, and like every lithium tool, one that's been ignored in a trunk for a year may greet you at 20%.",
          "There's a quieter difference people miss: a 12V inflator depends on your car having power. If you're dealing with a flat AND a weak battery on the same bad night — it happens more than you'd think — the cordless unit doesn't care.",
        ],
      },
      {
        heading: "Head to head",
        table: {
          columns: ["", "Cordless (battery)", "12V plug-in (corded)"],
          rows: [
            ["Setup", "Grab and go — nothing to plug in", "Uncoil cable, plug into socket, engine on"],
            ["Runtime", "~4–8 car tires per charge", "Unlimited — runs off the car"],
            ["Works when the car is dead", "Yes", "No"],
            ["Big tires / many tires", "Battery and heat become the limit", "The stronger choice"],
            ["Maintenance", "Recharge every few months", "None"],
            ["Typical price", "$50–90", "$25–40"],
          ],
        },
      },
      {
        heading: "When the cheap 12V model is genuinely the right call",
        body: [
          "Corded models get dismissed as the budget option, but two kinds of drivers should actively choose one. First: anyone maintaining a fleet of tires — a family with three cars, a trailer, a ride-on mower — where a battery would tap out mid-session. Second: anyone who wants zero maintenance. A corded unit that sits untouched for three years works exactly as well on day 1,000 as day one; no lithium pack to keep topped up.",
          "The honest trade: you'll always need the car running, the cable is always slightly too short, and roadside use in the rain is more miserable. For a garage tool, none of that matters.",
        ],
      },
      {
        heading: "The one that refuses to choose",
        body: [
          "DEWALT's 20V MAX inflator runs three ways — its own 20V battery, the car's 12V socket, or a wall outlet at home. It's bulkier and needs the battery sold separately, but it's the one unit in our catalog that covers the trunk emergency, the garage session, and the basement bike-tire job without compromise.",
        ],
      },
      {
        heading: "Our researched picks",
        body: [
          "Specs verified against manufacturer documentation; long-term owner feedback weighed. Here's exactly how we work: see our methodology.",
        ],
        productIds: ["fanttik-x8-apex-portable-tire", "epauto-12v-dc-portable-air", "dewalt-20v-max-corded-cordless"],
      },
      {
        heading: "Mistakes people make buying inflators",
        list: [
          "Shopping by max PSI alone|Every unit on our list exceeds car-tire pressure (32–36 PSI). Fill *speed* (liters per minute) and duty cycle separate the good from the frustrating.",
          "Ignoring auto-stop|Set 36 PSI, walk away, it stops itself. Skipping this feature means babysitting a gauge in the dark.",
          "Assuming the battery is charged|A cordless inflator is only as ready as its last top-up. Charge it when you charge your jump starter — every few months.",
          "Running cheap units too long|Small compressors overheat. If a unit needs a cooldown after one tire, that's a duty-cycle limit the listing didn't mention.",
        ],
      },
    ],
    faq: [
      {
        q: "Can a cordless tire inflator fill a completely flat tire?",
        a: "Yes — from flat (0 PSI) to drivable takes more battery and time than a top-off, but current units like the Fanttik X8 handle a full car tire in a few minutes. Expect a flat fill to use a meaningful chunk of one charge.",
      },
      {
        q: "Do 12V inflators drain the car battery?",
        a: "Run one with the engine on (or at least running periodically) and it's a non-issue. With the engine fully off, a long fill session pulls from the same battery that starts your car — another reason the pairing of a weak battery and a flat is worse with a corded unit.",
      },
      {
        q: "Are gas-station air pumps good enough to skip owning one?",
        a: "Until the night the flat happens twenty minutes from the nearest working pump. An inflator in the trunk turns a slow leak from a crisis into an errand.",
      },
    ],
    relatedGuides: ["best-tire-inflators-compared", "roadside-emergency-kit"],
    sources: [
      { label: "Fanttik X8 Apex official specifications", url: "https://www.amazon.com/dp/B09YD2D96V?tag=blackboxsuppl-20" },
      { label: "DEWALT 20V MAX inflator (DCC020IB) official page", url: "https://www.dewalt.com/product/dcc020ib/20v-max-corded-cordless-air-inflator-tool-only" },
    ],
  },
  {
    slug: "trunk-organizer-that-doesnt-slide",
    title: "The Trunk Organizer That Doesn't Slide Around",
    dek: "Every trunk organizer promises order. Most of them just become a box that surfs the trunk on the first hard corner. The difference is one feature almost nobody checks.",
    category: "Car Utility",
    readMinutes: 4,
    updated: "July 2026",
    answerFirst:
      "Trunk organizers slide because trunk floors are smooth carpet and most organizers are soft-sided boxes with nothing holding them down. The fix is an anchoring system: tie-downs, hook-and-loop strips, or rigid walls that brace against the trunk. The Drive Auto organizer combines reinforced walls with a tie-down anchor system — which is exactly why it's our pick.",
    sections: [
      {
        heading: "Why they all slide",
        body: [
          "A trunk floor is low-pile carpet designed to be vacuumed, not to grip. Put a smooth-bottomed fabric box on it, add twenty pounds of gear, and physics does the rest: every corner sends it skating, every hard stop dumps it forward. The organizer didn't fail at organizing — it failed at staying put, which turns out to be the entire job.",
          "This is the single most common complaint in long-term owner reviews across the category, and it's why 'has compartments' is the wrong shopping criterion. Compartments are table stakes. Anchoring is the product.",
        ],
      },
      {
        heading: "The three anchoring systems that work",
        list: [
          "Tie-down straps or anchor points|The organizer connects to your trunk's cargo hooks or seat hardware. Strongest hold — the box becomes part of the car. This is what the Drive Auto design uses.",
          "Hook-and-loop floor strips|Velcro-style strips grip the trunk carpet directly. Effective on most carpeted floors, less so on rubberized or plastic liners.",
          "Rigid, braced walls|Stiff walls let the organizer wedge against the trunk's sides and keep shape under load, so even without straps it resists surfing. Soft duffel-style organizers can't do this.",
        ],
      },
      {
        heading: "Our pick, and why",
        body: [
          "The Drive Auto trunk organizer earns the slot on the two features this article exists for: reinforced collapsible walls that hold their shape loaded, and a tie-down anchoring system that actually fixes it to the trunk. It folds flat when you need the whole trunk back. Around $35–45, and it solves the complaint that fills every competitor's review section.",
        ],
        productIds: ["drive-car-trunk-organizer"],
      },
      {
        heading: "If you're evaluating any other organizer",
        list: [
          "Anchor system present?|Straps, velcro strips, or anchor points. No anchoring, no purchase — that's the whole lesson.",
          "Walls that stand up loaded|Push a side wall in with a finger at the store. If it folds, so will your gear stack.",
          "Fold-flat design|Trunk space is shared space. A good organizer disappears when you need to haul something big.",
          "Sized to your actual trunk|Measure first. An organizer with six inches of slide room defeats its own anchors.",
        ],
      },
      {
        heading: "What actually belongs in it",
        body: [
          "An anchored organizer is the foundation of the roadside kit: jump starter, tire inflator, emergency light, and first-aid basics, each in a fixed spot instead of buried under grocery bags. We've mapped the full loadout — and the reasoning — in the roadside kit guide below.",
        ],
      },
    ],
    faq: [
      {
        q: "Do trunk organizers work in SUVs with flat cargo floors?",
        a: "Yes — arguably better than in sedans, since most SUVs have exposed cargo tie-down points that strap-based anchor systems are designed for.",
      },
      {
        q: "What about a milk crate or cardboard box?",
        a: "They hold things, they don't hold position — and unlike a soft organizer, a rigid crate becomes a projectile in a hard stop. Anchoring is the feature you're paying for.",
      },
    ],
    relatedGuides: ["car-gear-worth-keeping-in-your-trunk", "roadside-emergency-kit"],
  }
);

import { EXTRA_ARTICLES } from "./articles-extra";

const ALL_ARTICLES: Article[] = [...ARTICLES, ...EXTRA_ARTICLES];

export const ARTICLE_SLUGS = ALL_ARTICLES.map((a) => a.slug);

export function getArticleBySlug(slug: string): Article | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug);
}

export function getAllArticles(): Article[] {
  return ALL_ARTICLES;
}
