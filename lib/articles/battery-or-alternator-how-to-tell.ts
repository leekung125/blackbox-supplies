import type { Article } from "@/lib/articles";

/**
 * Long-tail buyer-intent article targeting:
 *   "how to tell if it's the battery or the alternator"
 *
 * Problem-first informational → converts to the ANCEL BA101 tester as the
 * confirm-it tool. Self-contained; the orchestrator wires it into
 * EXTRA_ARTICLES (see wire-in note in the handoff).
 *
 * HONESTY: voltage reference values (12.6V rested / 13.5–14.7V running) are
 * general, widely-documented automotive charging-system facts — NOT test
 * results we produced. No fabricated readings, no invented specs, no ratings.
 */
export const BATTERY_OR_ALTERNATOR_ARTICLE: Article = {
  slug: "battery-or-alternator-how-to-tell",
  title:
    "How to Tell If It's Your Battery or Your Alternator (3 Tests + the $25 Tool That Reads Both)",
  dek:
    "Three free tests tell you whether it's the battery or the alternator before you spend a dime — the jump-start test, the headlight-rev test, and a multimeter reading. Then the cheap tester that confirms both, and its honest limits.",
  category: "Car Utility",
  readMinutes: 8,
  updated: "July 2026",
  answerFirst:
    "Quickest read: jump the car, then pull the cables. If it keeps running, it's the battery; if it dies within seconds, the alternator isn't charging. Confirm with a multimeter — a healthy battery rests near 12.6V engine-off, and a healthy alternator pushes 13.5–14.7V with the engine running. No meter, or you don't trust yours? A $25 battery-and-alternator tester like the ANCEL BA101 reads both.",
  sections: [
    {
      heading: "The 30-second version",
      body: [
        "A car that won't start, cranks slow, or dies right after a jump has one of two hearts failing: the battery (stores the energy to start) or the alternator (refills that energy while the engine runs). They fail in ways that feel identical from the driver's seat, which is exactly why people replace the wrong one.",
        "The good news: you can separate them in a few minutes with tools you probably already have — a set of jumper cables or a jump starter, your own eyes, and ideally a $10 multimeter. Below are the three tests, cheapest first, then the one $25 tool that gives you a plain go/no-go on both parts if you'd rather not read a meter.",
        "One rule before you touch anything: if the battery terminals are visibly corroded, loose, or the cables are frayed, clean and tighten them first. A bad connection mimics both a dead battery and a dead alternator, and it's free to fix.",
      ],
      list: [
        "Symptom: dead every morning, fine after a drive|Usually a weak or aging battery (or a parasitic drain) — the alternator charges it while you drive, then it can't hold overnight.",
        "Symptom: starts, then dies once you unhook the jump|Classic alternator — the engine only ran on the donor's power; nothing is recharging.",
        "Symptom: dimming/flickering lights, whining, battery light on|Alternator territory — the charging system can't keep voltage up under load.",
        "Symptom: slow lazy crank when cold, then nothing|Leans battery, especially past 4–5 years — but confirm, because a weak alternator starves it too.",
      ],
    },
    {
      heading: "Test 1 — The jump-start test (the fastest tell)",
      body: [
        "This is the single most decisive free test, and it needs nothing but a jump. Jump start the car normally. Let it settle to a steady idle, then disconnect the jumper cables (or unclip the jump starter) and watch.",
        "If the engine keeps running on its own, the alternator is doing its job — your problem is the battery, which just couldn't hold enough charge to crank. If the engine sputters and dies within a few seconds of removing the cables, the alternator is not generating power; the car was running entirely on the donor battery or pack, and nothing was replacing it.",
        "The honest catch: a car that keeps running still tells you nothing about how healthy the battery is — only that the alternator works. A battery on its last legs will pass this test and still strand you tomorrow morning. That's what Test 3 (and the tester) are for.",
      ],
    },
    {
      heading: "Test 2 — The headlight-rev test (no tools at all)",
      body: [
        "If you can't get a jump but the car will idle, this one costs nothing. Start the engine, turn the headlights on, and point them at a wall or garage door so you can see their brightness clearly. Now rev the engine to around 2,000 RPM and hold it.",
        "Healthy charging system: the headlights stay steady or get slightly brighter as RPM rises — the alternator is spinning faster and pushing more current. Failing alternator: the lights are dim at idle and get noticeably brighter when you rev, then sag again at idle, or they flicker and pulse. That swing means the alternator can't hold steady voltage, so the battery is quietly filling the gap until it's empty.",
        "This is a directional test, not a verdict — it flags an alternator that's struggling, but it won't catch a battery with a dead cell, and ambient light can fool your eyes. Treat a failed headlight-rev test as a strong reason to move to a meter or a tester, not a diagnosis you'd spend $200 on.",
      ],
    },
    {
      heading: "Test 3 — The multimeter voltage test (the numbers that settle it)",
      body: [
        "A $10 multimeter turns guesswork into two readings. Set it to DC volts (the 20V range) and touch red to the battery's positive post, black to negative. You'll take one reading with the engine off and one with it running.",
        "Engine OFF, car sitting a few hours: a healthy fully-charged 12V battery reads about 12.6–12.8V. Around 12.4V is roughly 75% charged; 12.2V is about 50%; 12.0V or below is deeply discharged and likely failing. If it won't climb past the low 12s even after charging, the battery is the suspect.",
        "Engine RUNNING at idle: a working alternator raises system voltage to roughly 13.5–14.7V as it charges. Below ~13.2V running means the alternator isn't charging enough (or a belt/connection issue) — the car is draining the battery as you drive. Above ~15V means an overcharging alternator or bad voltage regulator, which cooks batteries. Turn on the headlights, AC, and rear defroster while running: voltage should stay in that 13.5–14.7 band under load. If it collapses toward 12s with accessories on, the alternator can't keep up.",
        "The honest catch with voltage alone: it's a snapshot, not a load test. A battery can read a healthy 12.6V at rest and still have a weak cell that collapses the instant the starter pulls hundreds of amps — voltage at rest won't catch that. That specific blind spot is why a tool that measures cranking behavior and CCA earns its keep.",
      ],
      table: {
        caption: "Reference voltages — general 12V charging-system values, not product-specific specs",
        columns: ["Reading", "Engine off (rested)", "Engine running (idle)"],
        rows: [
          ["Healthy", "12.6–12.8V", "13.5–14.7V"],
          ["Marginal / weak", "12.2–12.4V", "13.0–13.4V (undercharging)"],
          ["Failing", "≤12.0V", "≤12.6V (alternator not charging)"],
          ["Overcharging", "—", "≥15.0V (regulator fault — cooks the battery)"],
        ],
      },
    },
    {
      heading: "How to tell if it's the battery or the alternator, in one table",
      body: [
        "Put the three tests together and the pattern is clear. This is the whole diagnosis on one screen — match your symptom, run the cheapest test that fits, and you'll know which part to spend money on.",
      ],
      table: {
        columns: ["What you see", "Battery", "Alternator"],
        rows: [
          ["Keeps running after you pull the jump cables", "Likely the battery", "Alternator is fine"],
          ["Dies within seconds of removing the jump", "Battery may be fine", "Alternator not charging"],
          ["Lights flicker/dim, whine, battery-light on", "Less likely", "Strong sign"],
          ["Rests at 12.6V+ but cranks slow / dead cold", "Weak cell under load", "—"],
          ["Reads 13.5–14.7V running", "—", "Alternator healthy"],
          ["Reads under ~13.2V running", "—", "Alternator undercharging"],
          ["Dead every morning, fine after driving", "Aging battery or parasitic drain", "Charging works, battery can't hold"],
        ],
      },
    },
    {
      heading: "The $25 tool that reads both — and its honest limits",
      body: [
        "If you don't own a multimeter, don't trust your reading, or just want a plain-English answer instead of interpreting numbers, a dedicated battery-and-alternator tester is the confirm-it tool. The ANCEL BA101 is the widely-owned budget pick: you clamp it to the battery, enter the battery's rated CCA (printed on the battery label), and it reports battery health across roughly 100–2000 CCA, plus a separate charging-system check that tells you whether the alternator's cranking and charging output is in range. It's a 12V-only handheld — not 6V, not 24V.",
        "Where it beats a bare multimeter: it doesn't just read resting voltage, it estimates the battery's cranking capacity and gives a go/no-go on the alternator's charging test — catching the weak-cell case that a rest-voltage reading misses. For most owners that's the difference between 'the battery reads 12.6V so it must be fine' and actually knowing it can't crank.",
        "The honest catch — and we won't oversell a $25 tool: a budget handheld gives you a go/no-go and an estimated CCA, not a lab-grade capacity number. It's not a carbon-pile load bank, so a borderline battery can read differently between attempts, and its alternator check is a spot reading, not a full ripple/diode analysis a shop's tester does. For a clear pass or a clear fail it's genuinely useful insurance; for a borderline result on an expensive decision, treat it as a strong hint and get a free load test at an auto-parts store to confirm.",
      ],
      productIds: ["ancel-ba101-12v-car-battery"],
    },
    {
      heading: "Who it's for — and who should skip it",
      list: [
        "Buy it if|You diagnose your own no-starts, own more than one vehicle, or want to check a battery's health before winter or a road trip instead of guessing. At $25–45 it pays for itself the first time it stops you buying the wrong part.",
        "Buy it if|You don't own or don't trust a multimeter and want a plain go/no-go rather than interpreting DC-volt readings.",
        "Skip it if|You already own a multimeter and are comfortable with the two readings above — the meter covers the same ground for less, minus the CCA estimate.",
        "Skip it if|You'd rather not diagnose at all. Most chain auto-parts stores test your battery and alternator for free in the parking lot; if that's your plan, you don't need to own a tester.",
        "Skip it if|Your vehicle is 6V or 24V — this is a 12V-only tool.",
      ],
    },
    {
      heading: "You've diagnosed it — now what",
      body: [
        "If the battery is the culprit and it's under about 4 years old, it may just be discharged, not dead. A smart charger/maintainer like the NOCO GENIUS5 can recharge and often recondition a run-down 12V battery — and left connected during storage or short-trip season, it stops the slow discharge that kills batteries early. If the battery is old and failing a load test, replace it; charging won't save a dead cell.",
        "If the alternator is the culprit, that's a repair, not a top-up — but you still need to get there. A lithium jump starter like the NOCO GB40 lets you start the car yourself without flagging down a stranger, so you can drive straight to a shop instead of waiting on a tow. Keep expectations honest: on a dead alternator the car will only run until the battery drains again, so plan the shortest possible trip.",
        "Either way, don't throw parts at it. The whole point of the three tests and the tester is to spend money once, on the part that's actually failing.",
      ],
      productIds: ["noco-genius5-smart-battery-charger", "noco-boost-gb40-1000a-ultrasafe"],
    },
    {
      heading: "Mistakes people make diagnosing a no-start",
      list: [
        "Replacing the battery because it's cheaper|A new battery on a bad alternator dies in days. Confirm the alternator charges (13.5–14.7V running) before you spend.",
        "Trusting resting voltage alone|12.6V at rest doesn't prove the battery can crank — a weak cell collapses under load, which only a load/CCA test catches.",
        "Ignoring the connections|Corroded or loose terminals fake both failures. Clean and tighten first; it's free and it's the actual fix more often than people expect.",
        "Skipping the CCA entry on the tester|The BA101 leans on the battery's rated CCA for an accurate read. Enter the number off the battery label — guessing skews the result.",
        "Assuming a jump 'fixed' it|A jump only proves the car can start once. If the alternator's dead, you're stranded again the moment the borrowed charge runs out.",
      ],
    },
  ],
  faq: [
    {
      q: "Why does my car start then die right after a jump?",
      a: "That's the textbook sign of a failed alternator. When you jump the car, it starts on the donor battery's power — but if the alternator isn't generating electricity, nothing recharges your battery once the cables come off, so the engine dies within seconds. If it keeps running after you disconnect, the alternator is fine and the battery was the problem.",
    },
    {
      q: "How do I tell if it's the battery or the alternator without any tools?",
      a: "Use the jump-start test and the headlight-rev test. Jump the car and pull the cables — keeps running means battery, dies means alternator. Or at idle, rev to ~2,000 RPM and watch the headlights: steady or brighter is a healthy alternator; dim-then-brighter or flickering points to an alternator that can't hold voltage. Neither catches a weak battery cell, so confirm with a meter or tester before spending big.",
    },
    {
      q: "What voltage should my battery and alternator read?",
      a: "A healthy 12V battery rests around 12.6–12.8V with the engine off. With the engine running, a working alternator should raise system voltage to about 13.5–14.7V. Below roughly 13.2V running means the alternator is undercharging; above 15V means it's overcharging and cooking the battery. These are general reference values for 12V systems, not readings from a specific product.",
    },
    {
      q: "Can a bad alternator drain a good battery?",
      a: "Yes. A failing alternator that doesn't charge forces the engine to run off the battery, draining even a healthy new one — which is why people replace a battery, drive a few days, and end up dead again. It's also why you confirm the alternator charges before assuming the battery was the whole story.",
    },
    {
      q: "Is a $25 battery tester accurate enough, or do I need a multimeter?",
      a: "For a clear pass or fail, a budget tester like the ANCEL BA101 is accurate enough and easier — it estimates cranking capacity and gives a go/no-go on the alternator, catching weak-cell batteries a resting-voltage reading misses. Its limit: it's not a lab-grade load bank, so a borderline result can vary between tries. A multimeter covers the same voltage checks for less if you're comfortable reading it; for a borderline battery on an expensive decision, get a free load test at a parts store to confirm.",
    },
  ],
  relatedGuides: ["car-gear-worth-keeping-in-your-trunk", "roadside-emergency-kit"],
  sources: [
    {
      label: "U.S. DOE FuelEconomy.gov — batteries & cold-weather charging basics",
      url: "https://www.fueleconomy.gov/feg/coldweather.shtml",
    },
  ],
};
