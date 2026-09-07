import type { Article } from "@/lib/articles";

/**
 * Long-tail, buyer-intent article. Self-contained per the content recipe.
 * Wire-in: import + push into EXTRA_ARTICLES in lib/articles-extra.ts.
 *
 * Honesty laws honored: no "we tested", no fabricated ratings, every number
 * traceable to a manufacturer spec or a cited public source. The humidity/
 * temperature-drop table is framed as an approximate psychrometric estimate,
 * not a product test result.
 */
export const SWAMP_COOLER_HUMIDITY_ARTICLE: Article = {
  slug: "do-swamp-coolers-work-in-humid-climates",
  seoTitle: "Do Swamp Coolers Work in Humid Climates?",
  seoDescription:
    "A 15-30F drop at 10-20% humidity, often just 5-13F near 50% - and they add moisture. How to check your own climate before you spend.",
  title: "Do Evaporative Swamp Coolers Work in Humid Climates? The Honest Answer",
  dek:
    "Swamp coolers excel in dry heat — a 15–30°F drop at low humidity — but degrade sharply as the air gets muggy, and they add moisture to air that's already damp. Here's how to check your own climate before you spend, and what to buy instead if you're in the humid South.",
  category: "Cooling",
  readMinutes: 8,
  updated: "July 2026",
  answerFirst:
    "Partly — it depends entirely on your humidity. Evaporative (swamp) coolers cool by evaporating water into the air, so they work brilliantly in dry heat (a 15–30°F drop when relative humidity is roughly 10–20%) and barely at all in muggy air (often just 5–13°F near 50% RH, while making the room more humid). In the arid West, buy one. In the humid South or Southeast, skip it and buy a portable air conditioner instead.",
  sections: [
    {
      heading: "The physics in one sentence (why humidity is the whole story)",
      body: [
        "A swamp cooler doesn't have a compressor or refrigerant like an air conditioner. It pulls warm air through a wet pad, water evaporates, and evaporation absorbs heat — the same reason stepping out of a pool in a breeze feels cold. The air that comes out the other side is cooler and more humid.",
        "That last part is the catch. Evaporation only happens fast when the air has room to hold more moisture. Dry air is thirsty and drinks up a lot of water, so you get a big temperature drop. Air that's already saturated can't absorb much more, so evaporation slows to a crawl and the temperature barely moves — and whatever moisture the cooler does add just makes an already-clammy room feel worse.",
        "The technical name for the headroom is 'wet-bulb depression' — the gap between the actual air temperature and the lowest temperature evaporation could theoretically reach. A big gap (dry air) means a big possible drop; a small gap (humid air) means almost none. You don't need the math, just the rule: the drier your air, the better a swamp cooler works, and there is a humidity level above which it stops being worth owning.",
      ],
    },
    {
      heading: "Do evaporative swamp coolers work in humid climates? A humidity-to-temperature-drop reference",
      body: [
        "The table below is an approximate estimate from the physics of evaporative cooling (psychrometrics), not a product test — it assumes a hot ~95°F starting air temperature and a typical residential cooler running around 75–85% saturation efficiency. Real numbers vary with the unit, pad condition, and airflow. Use it to place your own climate, not as a spec sheet. The U.S. Department of Energy's guidance is blunter still: it recommends evaporative coolers only for climates where humidity is low.",
      ],
      table: {
        caption:
          "Approximate cooling from a swamp cooler vs. relative humidity (starting air ≈ 95°F; estimate, not a tested result)",
        columns: ["Relative humidity", "Approx. temperature drop", "What it feels like", "Verdict"],
        rows: [
          ["10% (desert dry)", "~25–30°F", "Genuinely cold, AC-like relief", "Ideal — this is what swamp coolers are for"],
          ["20% (arid West)", "~18–22°F", "Strongly cooling", "Excellent"],
          ["30% (dry summer)", "~13–17°F", "Clearly cooler, comfortable", "Good"],
          ["40% (borderline)", "~10–13°F", "Noticeable but modest", "Marginal — a fan-plus-mist, not AC"],
          ["50% (muggy)", "~7–11°F", "Faint cooling, room feels damp", "Poor — wrong tool"],
          ["60%+ (humid South)", "~3–7°F", "Little cooling, adds clamminess", "Don't — buy a portable AC"],
        ],
      },
    },
    {
      heading: "Check your local relative humidity FIRST (a 30-second step that saves $150)",
      body: [
        "Before buying anything, look up the summer afternoon relative humidity where you live — the hottest part of the day is when you'll actually run the cooler, and RH is usually lowest then. A weather app, your thermostat, or a $10 hygrometer all show it.",
        "One nuance that trips people up: humidity swings across the day. Deserts can read 40–60% at dawn and drop to 10–15% by mid-afternoon, so judge by the afternoon low, not the overnight high. Coastal and southeastern climates stay high all day — that's the tell that a swamp cooler is the wrong buy.",
      ],
      list: [
        "Afternoon RH regularly under ~30%|A swamp cooler is a great, low-energy, no-venting choice. Read on to the dry-heat picks.",
        "Afternoon RH between ~30% and 50%|Borderline. A swamp cooler helps a little in an open, well-ventilated space, but don't expect AC-level relief. Many people here are happier with a portable AC.",
        "Afternoon RH consistently above ~50%|Skip evaporative cooling entirely. It will barely cool and will make the room feel muggier. Go straight to a portable air conditioner.",
      ],
    },
    {
      heading: "The catch: in the humid South, a swamp cooler is the wrong tool",
      body: [
        "This is the honest part most product pages bury. If you live in Florida, the Gulf Coast, the Carolinas, the Deep South, or anywhere the summer is sticky, an evaporative cooler is not a cheaper air conditioner — it's a different machine that solves a problem you don't have. It will move air, add humidity, and disappoint you, and the reviews written by people in humid states saying 'it doesn't cool at all' are correct for their climate and wrong for a desert.",
        "There's also a ventilation requirement people miss: evaporative coolers need a cracked window or open door so the humid air they produce can escape and be replaced with fresh dry air. Run one in a sealed room and even in a dry climate the room's humidity climbs until the cooler stops working. That's the opposite of a portable AC, which wants the room closed up.",
        "If you're in a humid climate, the good news is the right answer is clear and we sell into it: a portable air conditioner removes heat AND wrings moisture out of the air, which is exactly what muggy heat calls for. Jump to the humid-climate picks below.",
      ],
    },
    {
      heading: "Who it's for (arid West): our two researched swamp-cooler picks",
      body: [
        "If your afternoons are dry, an evaporative cooler is a legitimately great buy: it uses a fraction of the electricity of an AC, needs no window venting kit, and adds welcome moisture to desert-dry air. Both picks below are researched from manufacturer specs and owner reviews — we don't personally lab-test — and prices are approximate ranges.",
        "The DREO 43\" is the quiet, indoor-friendly choice: a slim oscillating tower that chills air with ice packs, runs around 33 dB on low, and adds app plus Alexa/Google control. Its honest limits: it's not a true AC (it won't hit AC temperatures), its cooling is localized to the airflow path, and it needs regular water and ice-pack refills to feel genuinely cold.",
        "The Hessaire MC18M is the muscle: a rugged, wheeled 1,300 CFM unit rated for up to 500 sq ft of open space, with a continuous water-line hookup so you're not refilling a tank all day. Its honest limits: at about 53 dB it's louder than a home fan, it's built for open or semi-open spaces (garages, patios, workshops) rather than a sealed bedroom, and it wants a steady water supply. Both share the one non-negotiable caveat — they only cool well in dry heat.",
      ],
      productIds: [
        "dreo-43-evaporative-air-swamp-cooler",
        "hessaire-mc18m-portable-evaporative-swamp-cooler",
      ],
    },
    {
      heading: "Who should skip it (humid climates): buy a portable AC instead",
      body: [
        "If your summer air is damp, a portable air conditioner is the tool that actually works — it uses a refrigerant compressor to remove heat and dehumidify, so it cools regardless of outdoor humidity and leaves the room drier, not muggier. It costs more and needs its exhaust hose vented out a window, but in humid heat that's the price of real cooling.",
        "The Midea Duo (14,000 BTU / 12,000 SACC) is the quiet all-rounder: an inverter compressor that holds a steady temperature at around 42 dB instead of cycling loudly, rated for rooms up to 550 sq ft, with heat mode for year-round use and app/voice control. Honest catch: it still needs a window for the exhaust, it's large and heavy to move between rooms, and in very humid conditions the self-drain won't keep up so you'll occasionally drain it manually.",
        "The Whynter NEX ARC-1230WN (14,000 BTU / 12,000 SACC) is the dual-hose upgrade: a second hose pulls exhaust air from outside instead of from your room, which cools larger or sun-facing rooms (up to 600 sq ft) faster and more efficiently than single-hose units. Honest catch: two hoses take more setup, it carries a premium price, and it's a big unit that needs a nearby window. Either one is the correct buy where a swamp cooler would fail.",
      ],
      productIds: [
        "midea-duo-14-000-btu-smart",
        "whynter-nex-arc-1230wn-14-000",
      ],
    },
    {
      heading: "Swamp cooler vs. portable AC, side by side",
      table: {
        columns: ["", "Evaporative (swamp) cooler", "Portable air conditioner"],
        rows: [
          ["How it cools", "Evaporates water into the air", "Refrigerant compressor removes heat"],
          ["Effect on room humidity", "Adds moisture", "Removes moisture (dehumidifies)"],
          ["Best climate", "Dry heat (RH under ~30%)", "Any climate, including humid"],
          ["Window venting", "None — just crack a window for airflow", "Required — exhaust hose out a window"],
          ["Energy use", "Low (essentially a fan plus a water pump)", "Higher (a real compressor)"],
          ["Typical price", "~$150–220", "~$500–720"],
          ["Fails when", "The air is humid", "You want it cheaper and vent-free"],
        ],
      },
    },
    {
      heading: "Specific failure modes people run into",
      list: [
        "Running it in a humid state|The number-one mistake. In muggy air the temperature barely drops and the room gets clammier. No unit fixes this — it's physics, not a defect.",
        "Sealing the room|Evaporative coolers need an exit for the humid air. Closed up, even in a dry climate, indoor humidity climbs until cooling stalls. Crack a window.",
        "Expecting AC temperatures|Even in ideal dry heat a swamp cooler cools the airflow path, not the whole room to a set thermostat number. It's relief, not refrigeration.",
        "Letting the pad dry out or get scaly|A dry or mineral-crusted pad kills evaporation. Keep it wet in use; in hard-water areas, rinse or replace the pad periodically.",
        "Buying by CFM alone in a sealed room|High airflow (like the Hessaire's 1,300 CFM) shines in open garages and patios; in a small closed bedroom it's loud without the ventilation those units assume.",
        "Ignoring the water chore|These need water — a tank to refill or a hose hookup. Skip it and the 'cooler' is just a fan.",
      ],
    },
  ],
  faq: [
    {
      q: "Do evaporative swamp coolers work in humid climates?",
      a: "Not well. Evaporative cooling depends on dry air to evaporate water and absorb heat, so in humid climates (roughly 50%+ relative humidity) the temperature drop shrinks to about 5–13°F and the cooler adds moisture to already-damp air. In humid regions like the South and Southeast, a portable air conditioner is the right tool instead.",
    },
    {
      q: "What humidity is too high for a swamp cooler?",
      a: "As a practical rule, above about 50% relative humidity in the afternoon a swamp cooler stops being worth it — cooling becomes minimal and the added moisture makes the room feel muggier. They perform best under ~30% RH, and are ideal in desert-dry air around 10–20%.",
    },
    {
      q: "How much cooler does a swamp cooler actually make a room?",
      a: "In dry heat (around 10–20% humidity) expect roughly a 15–30°F drop in the air it blows; around 30% you'll see about 13–17°F; near 50% often just 7–11°F. These are approximate physics-based estimates for hot starting air, not tested product specs — real results vary with the unit, pad, and airflow.",
    },
    {
      q: "Do I need to open a window with a swamp cooler?",
      a: "Yes — unlike an air conditioner, a swamp cooler needs a cracked window or open door so the humid air it produces can escape and be replaced with fresh dry air. Run one in a sealed room and indoor humidity climbs until it stops cooling.",
    },
    {
      q: "Swamp cooler or portable AC — which should I buy?",
      a: "Check your afternoon humidity. Consistently dry (under ~30% RH)? A swamp cooler is cheaper, vent-free, and effective. Humid (over ~50%)? Buy a portable AC — it cools and dehumidifies regardless of outdoor humidity. Between the two, a portable AC is the safer choice if you're unsure.",
    },
  ],
  relatedGuides: [
    "best-portable-air-conditioners",
    "single-hose-vs-dual-hose-portable-ac",
    "best-portable-ac-garage-no-window",
  ],
  sources: [
    {
      label: "DREO 43\" Evaporative Air Cooler — official product page",
      url: "https://www.dreo.com/",
    },
    {
      label: "Hessaire MC18M (1300 CFM mobile cooler) — manufacturer product page",
      url: "https://hessaire.com/mobile-cooling/1300-cfm-mobile-cooler",
    },
  ],
  heroImage: "/products/scene/dreo-43-evaporative-air-swamp-cooler.webp",
  picks: [
    { id: "dreo-43-evaporative-air-swamp-cooler", cat: "heat", label: "Best quiet indoor swamp cooler (dry climates)" },
    { id: "hessaire-mc18m-portable-evaporative-swamp-cooler", cat: "heat", label: "Best high-output swamp cooler (dry climates)" },
    { id: "midea-duo-14-000-btu-smart", cat: "heat", label: "Best quiet portable AC (humid climates)" },
    { id: "whynter-nex-arc-1230wn-14-000", cat: "heat", label: "Best dual-hose portable AC (humid climates)" },
  ],
};
