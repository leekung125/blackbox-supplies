/**
 * THE "WHEN IT BREAKS" SCENARIO PILLARS — the category-defining wedge, as content.
 *
 * The broad incumbents (Wirecutter/RTINGS) own the calm researcher weeks before buying.
 * Nobody owns the panic-buyer at the moment of failure. These pages do: a real failure
 * scenario, answered in the order a stranded person actually needs it —
 *   1. DO THIS NOW (free)  — the no-purchase triage that builds trust + information gain
 *   2. FIX IT NOW          — the one thing to buy to solve it today
 *   3. SO IT NEVER HAPPENS — the thing to own so you're never here again
 * Each page is a high-intent, long-tail SEO target a new site can actually rank for, AND
 * the exact "problem → hero product" object that converts on Pinterest. Honest throughout:
 * research-based, cited, never a faked hands-on test.
 */

export interface ScenarioStep {
  step: string;
  detail: string;
}
export interface ScenarioBuy {
  blurb: string;
  productIds: string[];
  guideHref?: string;
  guideLabel?: string;
}
export interface Scenario {
  slug: string;
  /** The search-intent situation, e.g. "Car won't start". */
  situation: string;
  h1: string;
  /** ~155-char answer-first meta description. */
  metaDescription: string;
  eyebrow: string;
  /** The urgent 2-3 sentence framing at the top. */
  intro: string;
  /** The free triage — what to actually DO, in order. This is the trust/information-gain core. */
  doNow: ScenarioStep[];
  fixNow: ScenarioBuy;
  prevent: ScenarioBuy;
  faq: { q: string; a: string }[];
  /** Other scenarios worth cross-linking. */
  related: string[];
  updated: string;
}

export const SCENARIOS: Scenario[] = [
  {
    slug: "car-wont-start",
    situation: "Car won't start",
    h1: "Your car won't start — here's exactly what to do",
    metaDescription:
      "Car won't start? Do these 4 free checks first (in order), how to tell the battery from the starter, and the one tool that jump-starts it yourself — no second car.",
    eyebrow: "When it breaks · Roadside",
    intro:
      "You're in the driveway or a parking lot, you turn the key, and nothing. Before you call anyone or buy anything, work these checks in order — most no-starts are a weak battery you can beat in two minutes.",
    doNow: [
      {
        step: "Turn everything off and try again",
        detail:
          "Kill the headlights, heater, A/C, and radio, then turn the key. A weak battery sometimes has exactly one crank left when nothing else is pulling power. Cold weather makes this worse — a battery that turned over fine last week can sag below cranking voltage on the first hard freeze.",
      },
      {
        step: "Listen — it tells you what broke",
        detail:
          "Rapid clicking when you turn the key is almost always the battery (not enough current to spin the starter). A single loud clunk, or dead silence with the dash lights still bright, points more at the starter or ignition. If it cranks strong but won't catch, that's fuel or spark, not the battery — a jump won't help.",
      },
      {
        step: "Check and re-seat the battery terminals",
        detail:
          "Pop the hood and grab each battery clamp. If it wiggles, it's loose — tighten it. White or green crust on the posts is corrosion breaking the connection; scrape it off with anything handy. A loose or corroded terminal fakes a 'dead battery' constantly, and re-seating it fixes a surprising number of no-starts for free.",
      },
      {
        step: "If it's the battery, jump it",
        detail:
          "Confirmed it's the battery and there's no second car around? A lithium jump starter cranks the engine yourself in about a minute — clamp it on, start the car, drive to a shop or auto-parts store to test the battery. It's the single most useful thing to keep in a glovebox.",
      },
    ],
    fixNow: {
      blurb:
        "The fix for a dead battery with no second car: a lithium jump starter. Clamp it to the terminals, start the engine, and you're moving — no cables strung to a stranger, no waiting on a tow. Keep it charged and it lives in the trunk for exactly this moment.",
      productIds: ["noco-boost-gb40-1000a-ultrasafe", "energizer-1-gauge-800a-heavy"],
      guideHref: "/guides/best-jump-starters-compared",
      guideLabel: "Jump starters, compared",
    },
    prevent: {
      blurb:
        "A dead battery is rarely random — it's a battery near the end of its life, or a car that sits too long between drives. A smart charger/maintainer keeps it topped up and healthy so it doesn't strand you again, and a jump starter in the trunk turns any repeat into a two-minute fix.",
      productIds: ["noco-genius5-smart-battery-charger"],
      guideHref: "/gear",
      guideLabel: "Car & roadside gear",
    },
    faq: [
      {
        q: "How can I tell if it's the battery or the starter?",
        a: "Rapid clicking when you turn the key usually means the battery — enough power for the solenoid to click but not enough to spin the starter. A single loud clunk or nothing at all (with bright dash lights) points more at the starter or ignition switch. If the engine cranks strongly but won't fire, the battery is fine and it's a fuel or spark problem.",
      },
      {
        q: "Will a jump starter work in cold weather?",
        a: "Yes, but lithium jump starters lose output in the cold like any battery. Owners report weak or refused boosts around 0–10°F unless the unit is warmed first (keep it inside, or against your body for a few minutes). Store it charged and warm and it will crank a normal car battery in seconds.",
      },
      {
        q: "How many times can a jump starter start a car before recharging?",
        a: "A compact 1000A pack like the NOCO GB40 holds roughly 15–20 gas-engine starts per charge in real-world use — fewer on larger or diesel engines and in the cold. For a single dead battery you have far more than enough; recharge it every couple of months so it's ready.",
      },
      {
        q: "Can I damage my car jump-starting it myself?",
        a: "Modern lithium jump starters with reverse-polarity and spark protection (like the UltraSafe line) are designed to be near-foolproof — they won't spark or send current until they detect a correct connection. Match red to positive, black to a ground/negative, and follow the unit's lights.",
      },
    ],
    related: ["power-outage"],
    updated: "Jul 2026",
  },
  {
    slug: "power-outage",
    situation: "The power just went out",
    h1: "The power's out — what to do, and what actually keeps you running",
    metaDescription:
      "Power outage? Keep the fridge shut (it holds ~4 hrs), save your phone, and here's the size of power station that actually runs a fridge, CPAP, and lights through it.",
    eyebrow: "When it breaks · Backup power",
    intro:
      "The lights just died. Before you do anything else, protect the two things that matter most — your food and your phone — then decide whether to wait it out or power up. Here's the order that keeps a short outage from becoming a bad night.",
    doNow: [
      {
        step: "Keep the fridge and freezer shut",
        detail:
          "A closed refrigerator holds food safe for about 4 hours; a full freezer holds ~48 hours (half-full, ~24). Every time you open the door to 'check,' you lose roughly an hour of that. Decide what you need, grab it fast, and keep the doors closed until power is back.",
      },
      {
        step: "Save your phone — it's your lifeline",
        detail:
          "Drop it to battery-saver / low-power mode, close background apps, and dim the screen. Unplug anything you don't need. Your phone is how you'll check the outage map, get restoration estimates, and call for help, so treat its battery as the scarce resource it is.",
      },
      {
        step: "Find out how long it'll last",
        detail:
          "Check your utility's outage map or text line (most have one). A quick flicker from a passing storm is very different from a downed-line outage with a multi-hour estimate. Knowing which one you're in tells you whether to simply wait it out or start powering essentials.",
      },
      {
        step: "For anything past a couple hours, power the essentials",
        detail:
          "Once it's clear the outage is real, a LiFePO4 power station quietly runs the fridge, a CPAP, phones, a router, and lights — indoors, with no fumes, unlike a gas generator. Size it by watt-hours (how long) and continuous watts (what it can run at once), not the headline number on the box.",
      },
    ],
    fixNow: {
      blurb:
        "The fix for a real outage: a portable power station. Big enough to cycle a full-size fridge for 12+ hours and keep phones, a router, a CPAP, and lights going — silent, fumeless, and safe to run inside (a gas generator is not). Keep it charged and it's ready the moment the grid isn't.",
      productIds: ["jackery-explorer-1000-v2-portable", "bluetti-ac180-portable-power-station"],
      guideHref: "/guides/best-power-stations-compared",
      guideLabel: "Power stations, compared",
    },
    prevent: {
      blurb:
        "Outages don't warn you, so the whole game is being charged and sized right before one hits. Keep a power station topped up (most hold a charge for months), size it to your real must-run loads — fridge, medical devices, phones — and you turn every future blackout into a non-event.",
      productIds: ["bluetti-ac180-portable-power-station"],
      guideHref: "/guides/best-power-stations-compared",
      guideLabel: "Power stations, compared",
    },
    faq: [
      {
        q: "How long will food last in the fridge during an outage?",
        a: "About 4 hours in a refrigerator if you keep the door closed, and roughly 48 hours in a full freezer (24 hours if half-full). The single biggest mistake is opening the door to check — each time costs you close to an hour. Above 40°F for more than 2 hours, perishable food should be tossed.",
      },
      {
        q: "What size power station do I need to run a refrigerator?",
        a: "A full-size fridge draws ~100–200W while running but spikes higher at startup, so you want a station with at least ~1000Wh of capacity and a pure sine-wave inverter rated ~1000W+ continuous. That runs a fridge (which cycles on and off) for roughly 12–18 hours while also charging phones and lights.",
      },
      {
        q: "Can I run a power station indoors?",
        a: "Yes — that's the main advantage over a gas generator. Battery power stations produce no exhaust and are safe to run inside, which is exactly what you want during an outage. Never run a fuel generator indoors or in a garage.",
      },
      {
        q: "How is a power station different from a generator?",
        a: "A power station is a big battery with AC outlets — silent, fumeless, indoor-safe, and instant, but limited by its stored watt-hours. A generator makes power continuously from fuel but is loud, produces deadly exhaust, and must run outside. For most home outages, a LiFePO4 power station sized to your essentials is the simpler, safer answer.",
      },
    ],
    related: ["car-wont-start"],
    updated: "Jul 2026",
  },
  {
    slug: "flat-tire-on-the-shoulder",
    situation: "You've got a flat tire",
    h1: "You've got a flat tire on the shoulder — here's exactly what to do",
    metaDescription:
      "Flat tire? Get fully off the road, hazards on, and stay safe first. When it's safe to fix it yourself, when to call a tow, and the one tool that gets you moving.",
    eyebrow: "When it breaks · Roadside",
    intro:
      "The car pulls, the wheel goes heavy, and you hear that flap-flap-flap. Before you think about the tire, get yourself out of traffic — most people hurt in a roadside breakdown are struck by passing cars, not injured by the flat itself. Work these steps in order: safety first, the fix second.",
    doNow: [
      {
        step: "Ease off and get fully off the road",
        detail:
          "Don't slam the brakes or yank the wheel — a sudden flat makes the car twitchy, and hard inputs make it worse. Grip the wheel firmly, lift off the accelerator, let the car slow on its own, then signal and coast onto the shoulder as far from traffic as you can. Put it in park, set the parking brake, and turn on your hazards before anything else. A bent rim is cheap next to your safety — keep rolling to a genuinely safe spot even if it finishes off the tire.",
      },
      {
        step: "Read the danger before you open the door",
        detail:
          "On a narrow shoulder or a busy highway with cars passing at 60–70 mph, do not change or plug the tire yourself — standing beside fast traffic is the single most dangerous thing you can do here. Stay in the car with your seatbelt on and call roadside assistance or a tow. Only consider a DIY fix if you're well clear of the travel lane on a wide, flat shoulder with clear space and light, slow traffic.",
      },
      {
        step: "Make yourself impossible to miss",
        detail:
          "Keep the hazards flashing. If you have reflective warning triangles or an LED flare, set them out behind the car — the standard is roughly 10 feet, 100 feet, and 200 feet back, or as far as you safely can, so drivers coming up on you have time to move over. On a highway, farther is better. When you get out, exit from the passenger side away from traffic and keep the vehicle between you and the road. Never stand between your car and oncoming traffic.",
      },
      {
        step: "Only if it's safe: air it up or plug it to reach a shop",
        detail:
          "If you're safely off the road and the damage is a nail or screw in the tread (not the sidewall), you can often self-recover. A portable inflator can re-air a slow leak enough to limp to a shop; a plug kit can seal a small tread puncture. Leave the nail in until you're ready to plug — pulling it early just lets the last air out. Then drive slowly and directly to a tire shop within a few miles. If the sidewall is torn, the tire blew apart, or the hole is bigger than about a quarter-inch, don't drive on it — fit the spare or get a tow.",
      },
    ],
    fixNow: {
      blurb:
        "The fastest way to self-recover a tread puncture and get moving: a portable tire inflator paired with a plug kit. Air the tire back up, plug a small nail hole in the tread, and you can limp to a shop instead of waiting on a tow — no jack, no lug wrench, no spare needed. It won't fix a blown sidewall, but for the everyday nail-in-the-tread flat, it's the whole rescue in a glovebox-sized package.",
      productIds: ["fanttik-x8-apex-portable-tire", "boulder-tools-heavy-duty-tire"],
      guideHref: "/guides/best-tire-inflators-compared",
      guideLabel: "Tire inflators, compared",
    },
    prevent: {
      blurb:
        "You can't stop a nail from finding your tire, but you can make sure the moment never turns dangerous. The thing to own ahead of time is the roadside safety layer that lives in your trunk: reflective warning triangles to make you visible the second you pull over, and a stocked roadside kit so you're never improvising on the shoulder. Buy it once, forget it's there, and you're covered for this and every other breakdown.",
      productIds: ["cartman-reflective-warning-triangle-kit", "lifeline-4388aaa-excursion-road-76"],
      guideHref: "/guides/best-tire-inflators-compared",
      guideLabel: "Tire inflators, compared",
    },
    faq: [
      {
        q: "Can I keep driving on a flat to reach an exit or gas station?",
        a: "Only very briefly and slowly. Driving on a fully flat tire destroys it and can damage the wheel and suspension, so it's a last resort to reach a safe spot just off the road — not a way to finish your trip. If the tire is still holding some air (a slow leak), you can cautiously drive a few miles to a shop at low speed; if it's shredded or you're riding on the rim, stop and call for a tow.",
      },
      {
        q: "Should I change the tire myself or call for help?",
        a: "It comes down to where you are. On a wide, quiet shoulder with plenty of room, changing or plugging it yourself is reasonable. On a highway, an interstate, or any narrow shoulder with fast traffic close by, don't — stay inside with your seatbelt on and call roadside assistance. Standing next to speeding traffic is far more dangerous than the flat itself.",
      },
      {
        q: "Will a portable inflator fix a flat tire?",
        a: "It depends on why the tire is flat. An inflator only re-adds air, so it can get you moving again if the cause is a slow leak from a small nail or a valve that lost pressure — usually paired with a plug to seal the hole first. It cannot fix a blowout, a torn sidewall, or a large gash; in those cases the tire has failed structurally and needs a spare or a tow. Inflators are for topping up and limping to a shop, not for structural damage.",
      },
      {
        q: "Is it safe to drive on a plugged tire?",
        a: "For a short distance, yes — a proper tread plug is meant to get you to a shop, and it holds well enough to drive slowly and carefully. It is not a permanent repair: have the tire inspected and professionally patched or replaced soon after. Plugs only work on the tread; a puncture in or near the sidewall can't be safely plugged and means the tire should be replaced.",
      },
    ],
    related: ["car-wont-start"],
    updated: "Jul 2026",
  },
  {
    slug: "ac-died-in-a-heatwave",
    situation: "The AC died in a heatwave",
    h1: "The AC Died in a Heatwave — Here's Exactly What to Do Right Now",
    metaDescription:
      "Your AC quit in a heatwave. Reset the breaker once, check the filter, never run a frozen coil, seal off one cool room, and watch for heat illness. Real triage, then what to buy.",
    eyebrow: "When it breaks · Cooling",
    intro:
      "The house is climbing past 85 and still rising, the vents are blowing warm air, and the forecast says three more days of this. Before you panic-buy or wait days for an HVAC tech, run the fast checks below — a surprising number of \"dead\" ACs are a tripped breaker, a dead thermostat battery, or a filter so clogged the airflow starved and the system shut itself down. The rest is about keeping one room and your own body safe until cool air returns.",
    doNow: [
      {
        step: "Reset the breaker, thermostat, and filter",
        detail:
          "Set the thermostat to COOL and a few degrees below room temp; if the screen is blank or unresponsive, swap the batteries. Find the HVAC breaker and, if it's tripped, reset it once. If it trips again immediately, stop — that's an electrical fault for a pro, not a retry. Then pull the air filter: if it's gray with dust, a clogged filter alone can choke airflow and trigger a safety shutdown, so slide in a clean one before you write off the whole system.",
      },
      {
        step: "Check the outdoor unit — and never run a frozen system",
        detail:
          "Walk to the outdoor condenser and clear any leaves, grass, or debris crowding it; it needs open airflow to dump heat. Then look at the copper refrigerant lines and the indoor coil: if you see ice or frost, shut the system OFF and leave it off. Running a frozen AC can burn out the compressor and turn a cheap fix into a full replacement. Let it thaw for a few hours (fan-only mode helps) before calling for service.",
      },
      {
        step: "Seal off one room and make it your cool corner",
        detail:
          "Don't try to cool the whole house — pick the smallest interior room, ideally on the lowest floor and away from the afternoon sun. Close its door, and shut the blinds and curtains on every south- and west-facing window to block radiant heat before it gets in. This is the room you'll cool, sleep in, and ride out the worst hours. A small sealed space is dramatically easier to bring down than an open floor plan.",
      },
      {
        step: "Cool your body and watch for heat illness",
        detail:
          "Sip water steadily and skip alcohol and caffeine, which speed dehydration. Wear loose, light clothing and lay a cool, damp cloth on your neck, wrists, and groin — where blood runs closest to the skin; a cool shower or bath works even better. A fan helps in a warm room but does much less once the air passes ~95°F, especially for older adults, so lean on wet-skin cooling too. Watch for heat stroke: confusion, a pounding heartbeat, nausea, or hot, flushed skin that has stopped sweating. If you see those signs, call 911, move the person somewhere cooler, and cool them aggressively with wet cloths or a cool bath — but don't force fluids on anyone who isn't fully alert.",
      },
    ],
    fixNow: {
      blurb:
        "If the checks didn't revive it and repair is days out, the one thing that actually cools air today — not just moves it — is a portable AC you can roll into your sealed cool room. Unlike a fan, it removes heat and drops the real temperature, which is what matters once the room is above the mid-90s. A 10,000–14,000 BTU single-room unit is enough to make one bedroom livable and sleepable while you wait for the tech.",
      productIds: ["black-decker-10-000-btu-3", "midea-duo-14-000-btu-smart"],
      guideHref: "/guides/best-portable-air-conditioners",
      guideLabel: "Portable ACs, compared",
    },
    prevent: {
      blurb:
        "The households that shrug off an AC failure are the ones who owned a backup before summer started. A battery-capable portable AC keeps cooling even if the outage that killed your central air also cut the power, so a breakdown becomes an inconvenience instead of an emergency. Pair it with a strong tower fan for the milder days, and a single hot afternoon never catches you flat again.",
      productIds: ["ecoflow-wave-3-portable-air-conditioner", "dreo-cruiser-pro-t1-oscillating-tower"],
      guideHref: "/guides/best-portable-air-conditioners",
      guideLabel: "Portable ACs, compared",
    },
    faq: [
      {
        q: "Can I just use a fan instead of buying a portable AC?",
        a: "Below about 95°F, a good fan genuinely helps by speeding evaporation off your skin. But once the room passes ~95°F, moving hot air does little to cool you and can accelerate dehydration, especially for older adults. A fan buys comfort in a warm room; only a portable AC (or your repaired central system) actually lowers the temperature in serious heat.",
      },
      {
        q: "Will a portable AC cool my whole house?",
        a: "No — and you shouldn't expect it to. A single portable unit is sized to cool one room, which is exactly why the smart move is to seal off one bedroom and concentrate the cooling there. Trying to cool an open floor plan with one portable AC just leaves everything lukewarm. Match the BTUs to that one room's square footage and it'll perform well.",
      },
      {
        q: "Is it worth buying a portable AC or should I just wait for the HVAC repair?",
        a: "If the tech is coming tomorrow, a fan and the cool-corner steps above may be enough. But in a multi-day heatwave with repair queues stretching a week, a portable AC pays for itself in safe sleep alone — and it stays useful afterward as a backup or a spot-cooler for a garage or office. It's a hedge, not a throwaway.",
      },
      {
        q: "Would a swamp (evaporative) cooler work instead?",
        a: "It depends entirely on your humidity. Evaporative coolers cool by evaporating water into the air, so they work well in dry, desert-style heat but do almost nothing — and add clamminess — in humid climates. If you're in the arid Southwest they're an efficient, low-power option; anywhere humid, a compressor-based portable AC is the reliable choice.",
      },
    ],
    related: ["room-wont-cool-no-central-air"],
    updated: "Jul 2026",
  },
  {
    slug: "room-wont-cool-no-central-air",
    situation: "A room that won't cool, no central air",
    h1: "The room won't cool and there's no central air — here's exactly what to do",
    metaDescription:
      "One hot room, no central AC? Block the sun, flush hot air at night, kill indoor heat sources, and cool yourself directly — plus the right unit to buy if that's not enough.",
    eyebrow: "When it breaks · Cooling",
    intro:
      "It's the hottest room in the house, there's no vent feeding it cool air, and a single fan is just pushing warm air around. Before you buy anything, four free moves will take the edge off in minutes — and they're the same steps that tell you whether you need a real cooling unit or just better airflow. Here's the honest triage, in order.",
    doNow: [
      {
        step: "Stop the heat coming in",
        detail:
          "Sun through glass is usually the single biggest reason one room bakes. Close curtains or blinds on any window the sun hits, and use blackout or light-colored coverings if you have them. Do this before the room heats up in the morning, not after — you can't easily undo solar gain once it's soaked into the walls and floor.",
      },
      {
        step: "Flush the hot air once it's cooler outside",
        detail:
          "After sunset, once outdoor air actually drops below your indoor temperature, put a box or window fan in the window facing OUT to push the trapped hot air out. Crack a window on the opposite side of the room so cooler air gets pulled in across it. Close everything back up before the day heats again to trap the cool you gained overnight. If it's still hotter outside than in, skip this step — you'll only pull more heat in.",
      },
      {
        step: "Kill the heat sources inside the room",
        detail:
          "Incandescent bulbs, a gaming PC or console, phone chargers, and especially any oven or stovetop all dump real heat into a small space. Swap to LED bulbs, unplug electronics you're not using, and avoid cooking hot meals in or near the room during the day. In a closed room these add up faster than people expect.",
      },
      {
        step: "Cool the person, not the room",
        detail:
          "Moving air evaporating sweat off your skin is what actually cools you, so point a fan directly at yourself rather than at the ceiling. Stay hydrated and lay a cool damp cloth on your neck or wrists. A bowl of ice set in front of a fan gives a modest, short-lived boost — helpful, but don't expect it to cool the whole room. Never run anything that burns fuel — a grill, camp stove, or generator — indoors to cope with heat; that's a carbon-monoxide risk, not a cooling method.",
      },
    ],
    fixNow: {
      blurb:
        "If the room genuinely won't drop — it's enclosed, humid, or the airflow tricks aren't enough — a portable AC is the only thing on this list that actually removes heat and pulls moisture out of the air, rather than just moving it around. It vents warm air out through a window kit you set up in minutes, so you can cool the one room that matters without central air. Size it to the room: a 14,000 BTU unit for a bedroom or living space, a smaller 10,000 BTU for a compact room or office.",
      productIds: ["midea-duo-14-000-btu-smart", "black-decker-10-000-btu-3"],
      guideHref: "/guides/best-tower-fans-compared",
      guideLabel: "Tower fans, compared",
    },
    prevent: {
      blurb:
        "To stop a room reaching crisis heat in the first place, own a strong circulating fan and keep air moving before the worst of the day — steady airflow makes a hot room livable and lets a portable unit work far less. A quiet oscillating tower fan is the everyday workhorse for a bedroom or living room, while a misting fan adds evaporative cooling that helps most in dry air and outdoors, on a patio or in a garage.",
      productIds: ["dreo-cruiser-pro-t1-oscillating-tower", "shark-flexbreeze-pro-mist-fan-fa302"],
      guideHref: "/guides/best-tower-fans-compared",
      guideLabel: "Tower fans, compared",
    },
    faq: [
      {
        q: "Will a portable AC or a swamp cooler cool my room better?",
        a: "It depends on your humidity. A portable AC uses refrigerant to remove both heat and moisture, so it works anywhere — including humid climates and closed rooms — and typically drops the temperature more. An evaporative (swamp) cooler adds moisture and only cools well in dry air, generally below about 50% humidity, and it needs a window or door cracked for fresh air. If you're in a humid area or a sealed room, go with a portable AC.",
      },
      {
        q: "Does a portable AC really need a window?",
        a: "Yes. A portable AC removes heat from the room and has to send that hot air somewhere, so it vents through a hose and a window kit that seals the opening. Without venting it would just move heat around the room and warm it up over time. If you truly have no window, an evaporative cooler or a battery-powered unit designed to run without ducting is the more realistic option — but expect noticeably less cooling.",
      },
      {
        q: "Why isn't my fan cooling the room down?",
        a: "A fan doesn't lower the actual air temperature — it cools you by evaporating sweat off your skin. That's why a fan feels great when it's pointed at you but does almost nothing for an empty room. To make a fan lower the room temperature, use it to exchange air with cooler outdoor air at night, or aim it directly at people. If you need the air itself to be colder, you need an AC.",
      },
      {
        q: "What size portable AC do I need for one room?",
        a: "A rough starting rule is about 20 BTU per square foot, but portable ACs lose some real-world capacity to their own exhaust and startup, so size conservatively. In practice a 10,000 BTU unit suits a small room or office up to roughly 300–450 sq ft, while a 14,000 BTU unit handles a bedroom or living space up to roughly 500–650 sq ft. Sun-facing rooms, top floors, and kitchens run hotter, so size up if that's your room. Ratings also vary by how they're measured (older ASHRAE numbers run higher than newer SACC ones), so check the specific unit's stated coverage before you buy — we don't test these in-house, so the manufacturer's room rating is your best reference.",
      },
    ],
    related: ["ac-died-in-a-heatwave"],
    updated: "Jul 2026",
  },
  {
    slug: "phone-dead-no-outlet",
    situation: "Phone's dead with no outlet in reach",
    h1: "Your phone died and there's no outlet — here's exactly what to do",
    metaDescription:
      "Phone dead with no outlet? Use any USB you have (laptop, car port), give a drained battery ~15 min to wake, cut the drain — plus what to carry so it never happens.",
    eyebrow: "When it breaks · Power",
    intro:
      "Black screen, no charger, no wall outlet anywhere — right when you need the phone to work. Before you assume it's bricked, there's almost always some power within reach, and a fully drained battery usually just needs a few minutes to come back to life. Work these in order.",
    doNow: [
      {
        step: "Find any power source you already have",
        detail:
          "You don't need a wall outlet — you need any USB port. A laptop's USB port, a car's built-in USB or 12V socket, a portable battery in someone's bag: all of them will charge a phone with your normal cable. Ask the people around you — most carry a cable or a power bank. Even a slow 5-watt trickle for five minutes can buy you enough for a call or a text.",
      },
      {
        step: "If it won't wake, give it time and the right temperature",
        detail:
          "A battery that's drained to zero often needs 10–20 minutes on power before it has enough voltage to even show the charging screen or logo, so plug it in and wait before deciding it's dead for good. Cold is the other silent culprit — phones shut themselves off in freezing temperatures even with charge left, so warm it against your body for a few minutes. If it's been baking in the sun, do the opposite: get it into shade to cool before it will charge, since phones refuse to charge when they're too hot.",
      },
      {
        step: "The moment it turns on, stop the drain and do the one urgent thing",
        detail:
          "Switch on airplane mode first — it's the single biggest battery saver because it stops the phone constantly hunting for a signal, which drains fastest in weak-coverage spots. Then drop the screen to minimum brightness and close background apps. With those few percent, immediately do the one thing that matters: screenshot your ticket or boarding pass, text someone your location, or save the address you need — before the battery is gone again.",
      },
      {
        step: "Track down a real outlet or charging station",
        detail:
          "Coffee shops, fast-food spots, libraries, hotel lobbies, airports, and transit stations almost always have outlets or charging kiosks, and staff will usually point you to one if you ask. When you can, plug your own charger into a standard wall outlet rather than a shared public USB port or free cable — it's the cleanest power and sidesteps any question about a tampered port. In a real pinch, a convenience store or electronics kiosk can sell you a cheap power bank or cable on the spot — often the fastest way out of the situation.",
      },
    ],
    fixNow: {
      blurb:
        "The fix you can buy today is a power bank. A 20,000mAh pack holds roughly two to four full phone charges — closer to three for a big-battery phone, four for a smaller one — and lives in a bag or glovebox, turning a dead phone into a two-minute plug-in instead of a scramble for an outlet. Get one with a built-in USB-C cable so a missing cord never strands you either.",
      productIds: ["anker-power-bank-20-000mah-with"],
      guideHref: "/guides/best-power-stations-compared",
      guideLabel: "Power stations, compared",
    },
    prevent: {
      blurb:
        "A dead phone with nowhere to charge stops being a problem the day you start carrying a charged power bank — keep a high-capacity one topped up and you've got several days of runway in your bag. Pair it with a fast multi-port wall charger so you leave the house full every morning, and this moment simply stops happening.",
      productIds: ["anker-prime-power-bank", "ugreen-nexode-pro-100w-3-port"],
      guideHref: "/guides/best-power-stations-compared",
      guideLabel: "Power stations, compared",
    },
    faq: [
      {
        q: "How long does a drained phone need to charge before it turns on?",
        a: "A battery drained all the way to zero often needs 10–20 minutes on power before it has enough voltage to even show the charging screen or logo, so plug it in and wait before assuming it's broken. If nothing appears after about 30 minutes on a charger and cable you know are good, then start suspecting the cable, the charging port, or the phone itself.",
      },
      {
        q: "What drains a phone battery the fastest when it's already low?",
        a: "The radios — especially cellular searching for a tower in a weak-signal area — along with screen brightness and background apps. Airplane mode is the single biggest saver because it stops the phone hunting for signal entirely; low-power mode and minimum brightness stack on top of that. Turn all three on the moment the phone comes back and you'll stretch a few percent a long way.",
      },
      {
        q: "How many phone charges does a 20,000mAh power bank actually give?",
        a: "Realistically two to four full charges for a typical phone. A phone battery is about 3,000–5,000mAh, but a power bank always loses some capacity to heat and voltage conversion, so plan on the lower end — a big-battery phone may only get about two and a half. A larger 27,000mAh-plus bank gets you roughly four to five and can also top up a tablet or laptop, at the cost of more weight in your bag.",
      },
      {
        q: "Can I charge my phone from my car without a cigarette-lighter adapter?",
        a: "Usually yes — most cars built in the last decade have a USB port in the dash or center console, so your normal cable plugs right in. It's slow (often around 5 watts), but a few minutes buys you a call or a map check. A 12V-socket adapter or a small car inverter charges much faster if you happen to have one.",
      },
    ],
    related: ["power-outage"],
    updated: "Jul 2026",
  },
  {
    slug: "stranded-on-a-dark-shoulder",
    situation: "Stranded on a dark shoulder at night",
    h1: "Stranded on a Dark Shoulder at Night — Here's Exactly What to Do",
    metaDescription:
      "Broken down on a dark shoulder at night? Hazards on, get fully off the road, make yourself visible, and call for help with your exact location. The real steps here.",
    eyebrow: "When it breaks · Roadside",
    intro:
      "Your car dies and the shoulder is pitch black, headlights blasting past at 70. This is one of the most dangerous places you can be, and the two things that keep you safe are being seen and not standing where a car can hit you. Do these four things in order — none of them cost anything.",
    doNow: [
      {
        step: "Hazards on, coast fully off the road",
        detail:
          "Turn on your hazard flashers the instant you feel trouble — that is your single most important signal in the dark. Coast as far onto the right shoulder as you can, getting all four wheels past the white line and onto flat, straight ground. Avoid stopping on a curve, bridge, or the crest of a hill where drivers can't see you until it's too late; if you have any roll left, keep going to a spot with a wide shoulder or an exit ramp.",
      },
      {
        step: "Decide: stay buckled in, or exit the side away from traffic",
        detail:
          "On a narrow, high-speed shoulder the safest place is often inside the car with your seatbelt fastened — most breakdown injuries happen to people standing outside, and the vehicle's frame shields you. Never step out into a live lane to inspect the damage. But if you can exit on the side away from traffic and reach safe ground off the roadway, do it: leave through the passenger door, get behind the guardrail, and stand well away from and behind the car — never in front of it, since a struck vehicle gets pushed forward.",
      },
      {
        step: "Make yourself and the car impossible to miss",
        detail:
          "At night visibility is everything. Leave the hazards flashing and turn on your interior dome light so passing drivers can see the car is occupied. If you can do it safely without stepping into a traffic lane, set reflective triangles or an LED flare on the shoulder behind your car — roughly 10 feet back, then 100 feet back — to give approaching drivers early warning. Wear something reflective or light-colored if you're outside.",
      },
      {
        step: "Call for help and give your exact location",
        detail:
          "Call 911 if you feel unsafe or your car is blocking a lane — a disabled vehicle in the dark is a genuine hazard and police can shield you. Otherwise call your roadside provider (AAA is 1-800-222-4357) or your insurer's roadside line. Read them the highway number, your direction of travel, and the nearest mile marker or exit; if you can't find one, open your phone's map and read the GPS coordinates aloud.",
      },
    ],
    fixNow: {
      blurb:
        "The immediate danger on a dark shoulder is that oncoming drivers simply can't see you until they're on top of you. A bright LED flare or a set of reflective warning triangles set out behind the car buys approaching traffic the seconds they need to move over. This is the category worth keeping in the trunk so the next stop-in-the-dark isn't invisible.",
      productIds: ["wagan-fred-flashing-roadside-emergency", "cartman-reflective-warning-triangle-kit"],
      guideHref: "/gear",
      guideLabel: "Car & roadside gear",
    },
    prevent: {
      blurb:
        "Most nighttime strandings trace back to two things you can get ahead of: a dying battery and a slow flat. A complete roadside kit puts jumper cables, first-aid, and warning gear in one bag so you're never improvising in the dark; a cheap 12V battery tester catches a weak battery in the driveway before it strands you at midnight; and a tire plug kit turns a slow leak into a ten-minute fix instead of a tow on the shoulder.",
      productIds: ["lifeline-4388aaa-excursion-road-76", "ancel-ba101-12v-car-battery"],
      guideHref: "/gear",
      guideLabel: "Car & roadside gear",
    },
    faq: [
      {
        q: "Should I stay in the car or get out?",
        a: "On a fast, narrow shoulder, staying inside with your seatbelt fastened is often safest — the car's frame is a protective cage, and most breakdown injuries happen to people standing outside. The exceptions are if you fear being struck from behind or there's a fire: then exit through the door away from traffic, get behind any guardrail, and stand well behind the vehicle and away from the roadway, never in front of it.",
      },
      {
        q: "How far behind the car should I put warning triangles or a flare?",
        a: "A common guideline is one about 10 feet behind the car and one around 100 feet back to give early warning, adding a third farther out on higher-speed roads. Only set them out if you can stay on the shoulder and out of a live lane — your own safety comes before perfect placement. On a busy highway at night, leaving hazards flashing and calling for help is safer than walking far up the shoulder.",
      },
      {
        q: "Is it safe to change a tire on the shoulder at night?",
        a: "Only if the flat is on the side away from traffic and you're fully off the road on flat, solid ground. If the flat faces oncoming traffic, or the shoulder is narrow, don't attempt it — call for a tow or roadside assistance and wait in the car. No tire is worth kneeling next to a lane of traffic in the dark.",
      },
      {
        q: "What do I tell 911 or roadside assistance so they can find me?",
        a: "Give the road name or number, your direction of travel (northbound, southbound, etc.), and the nearest mile marker or exit — mile markers are the fastest way for dispatch to locate you. If you can't see one, open your phone's map app and read the GPS coordinates. Describe your car's color and that your hazards are flashing so the responder spots you quickly in the dark.",
      },
    ],
    related: ["car-wont-start"],
    updated: "Jul 2026",
  },
  {
    slug: "fender-bender-no-proof",
    situation: "A fender-bender, your word against theirs",
    h1: "A fender-bender and it's your word against theirs — here's exactly what to do",
    metaDescription:
      "Minor collision and the other driver is changing the story? The 4 free steps to lock in evidence at the scene right now — plus how a dash cam settles it for good.",
    eyebrow: "When it breaks · Roadside",
    intro:
      "The bumpers touched, everyone's fine — and then the other driver starts telling a version of events that isn't what happened. In a low-speed collision there's rarely a clean skid mark or a totaled car to prove who did what, so the claim often comes down to whose story the insurer believes. The good news: in the next fifteen minutes you can build a record that speaks for you, no matter what the other person says.",
    doNow: [
      {
        step: "Get safe, then stay put",
        detail:
          "Check everyone in both vehicles first — if anyone is hurt, dazed, or unsure, call 911 immediately, because injuries change everything about how this is handled and getting help fast matters more than any photo. If the cars are drivable and blocking traffic, pull them onto the shoulder and switch on your hazards; if they're not drivable, leave them where they are and get yourself off the roadway. Never leave the scene of a collision, even a tiny one — that can turn a fender-bender into a hit-and-run charge.",
      },
      {
        step: "Photograph everything before anything moves",
        detail:
          "Shoot wide first — the whole scene, both cars in position, lane markings, traffic signals and any nearby signs — then close-ups of every point of contact on both vehicles. Capture both license plates and the other car's insurance card if they'll show it. Most phones embed time, date and, if location is on, GPS coordinates into each photo's metadata, and those details are exactly what an adjuster uses to reconstruct who was where — so turn location on if it isn't, and take far more shots than you think you need.",
      },
      {
        step: "Exchange info without admitting fault",
        detail:
          "Trade names, phone numbers, insurance company and policy numbers, plus the other driver's plate and license. Stick to facts — do not say \"sorry\" or \"my fault,\" because a casual apology can be read as an admission and used to shift blame onto you. Keep it brief and civil; you're gathering information, not negotiating the claim on the shoulder.",
      },
      {
        step: "Lock in witnesses and a police report",
        detail:
          "Anyone who saw it is your strongest neutral proof — get their name and number fast, before they drive off, and if they're willing, record a few seconds of what they saw on your phone. If police didn't come to the scene, call the non-emergency line and ask how to file an official report; that independent record, with the officer's diagram and notes, often outweighs two drivers contradicting each other. Then notify your own insurer promptly with everything you gathered, even if you think the other side will pay.",
      },
    ],
    fixNow: {
      blurb:
        "The one thing that ends \"your word against theirs\" for good is footage. A front-and-rear dash cam records the moments before, during and after impact from both directions — and since rear-end hits are the most common collision, the rear channel matters as much as the front. If you're shopping today, a dual-channel cam with a genuine sensor on both ends and buffered parking mode gives you objective proof the next time someone rewrites the story.",
      productIds: ["viofo-a229-plus", "redtiger-f7n"],
      guideHref: "/guides/best-dash-cams-compared",
      guideLabel: "Dash cams, compared",
    },
    prevent: {
      blurb:
        "Own the camera before you ever need it, and the dispute never happens — the footage simply exists. For fuller coverage, a three-channel setup adds an interior or cabin view alongside front and rear, and a smart cam with a hardwired parking mode keeps watching while you're away, so a hit-and-run in a parking lot is captured too — not just collisions you're awake for. Buy a card rated for the job (128GB or more) and let it run every drive; the whole point is that it's already recording when the unexpected happens.",
      productIds: ["viofo-a139-pro", "nextbase-iq-4k-smart-dash"],
      guideHref: "/guides/best-dash-cams-compared",
      guideLabel: "Dash cams, compared",
    },
    faq: [
      {
        q: "Is dash cam footage actually accepted as evidence for an insurance claim?",
        a: "Yes — insurers routinely accept dash cam video, and clear footage of who crossed a line or struck whom often resolves a disputed claim quickly. It carries weight precisely because it's an objective timestamped record rather than one driver's recollection. Save the clip immediately and don't let the camera overwrite it: pull the file off the card, or at minimum lock it so the loop recording can't erase it.",
      },
      {
        q: "Do I really need a rear camera, or is a front-only dash cam enough?",
        a: "A front-only cam misses the single most common crash — getting rear-ended — and in \"your word against theirs\" cases the disputed contact is often behind you. A dual-channel front-and-rear setup covers both directions, which is why it's the sensible default for most drivers. Front-only cams are cheaper and fine if your main concern is what happens ahead of you, but they leave a real gap.",
      },
      {
        q: "What's the difference between real 4K and 'fake' 4K, and does it matter?",
        a: "Native 4K means the sensor physically captures at 3840×2160; upscaled 4K uses a lower-resolution sensor and algorithmically stretches the image to fill a 4K file, adding no real detail. For evidence, what actually matters is reading a license plate — a strong 2K sensor with a good lens frequently beats an upscaled 4K one. Look at the sensor (Sony STARVIS 2 is a common quality marker) rather than trusting the headline resolution number alone.",
      },
      {
        q: "Will a dash cam keep recording while my car is parked?",
        a: "Only if it has a parking mode and a power source that stays live when the ignition is off — usually a hardwire kit wired to a constant-power fuse, or in some models a separate battery pack. Buffered parking mode is the most protective because it saves the seconds before a bump was detected, not just after. Note that continuous parking recording can slowly drain your car battery, so most people hardwire with a cutoff that stops before the battery gets too low.",
      },
    ],
    related: ["car-wont-start"],
    updated: "Jul 2026",
  },
  {
    slug: "too-hot-to-sleep",
    situation: "It's too hot to sleep",
    h1: "Too Hot to Sleep — Here's Exactly What to Do Tonight",
    metaDescription:
      "Can't sleep because it's too hot? Do this now: build a cross-breeze, cool your pulse points, strip the bed to breathable layers, and kill heat sources.",
    eyebrow: "When it breaks · Cooling",
    intro:
      "It's midnight, the room won't cool down, and you're lying on top of the covers doing the math on how little sleep you're about to get. Your body actually needs its core temperature to drop a degree or two to fall asleep — so the heat isn't just uncomfortable, it's physically blocking you from nodding off. Here's the fast, free triage that works before you buy anything.",
    doNow: [
      {
        step: "Build a cross-breeze and push the hot air out",
        detail:
          "Air needs an entry point and an exit point to actually move. Open two windows on opposite sides of the room (or a window and the door). If it's cooler outside than in, put a fan in one window facing OUT to exhaust the hot air — that pulls cooler air in through the other opening. If you have a ceiling fan, run it counterclockwise (blades sweeping so you feel air pushed down onto the bed).",
      },
      {
        step: "Cool your body, not the whole room",
        detail:
          "You don't have to cool the air — just your blood. Wrap an ice pack in a thin towel, or wet a washcloth with cold water, and hold it on your pulse points: the sides of your neck, your wrists, and your ankles. Blood vessels sit close to the skin there, so you cool the blood passing through and feel relief within minutes. A quick lukewarm-to-cool shower before bed does the same thing on a bigger scale and is the single most reliable trick — skip an ice-cold shower, which can make you rebound hotter.",
      },
      {
        step: "Strip the bed down to breathable layers",
        detail:
          "Heavy bedding and synthetic sheets trap heat against you. Pull off everything but a single lightweight cotton or linen sheet, and sleep in loose, breathable clothing or none. Try the 'starfish' — flat on your back, arms and legs spread — so heat escapes from your limbs instead of pooling. Sealing your pillowcase in a zip bag and stashing it in the freezer for a few minutes buys you a cool surface for those crucial first minutes of falling asleep.",
      },
      {
        step: "Kill the heat sources and hydrate",
        detail:
          "Lamps, TVs, laptops, and phone chargers all radiate real heat into a small room — power them fully off, not just to standby. During the day, keep blinds and curtains closed on the sunny side so the room doesn't bake in the first place. Drink a glass of water before bed, since dehydration makes you feel hotter. One caution: once it's roughly above 95°F with high humidity, a fan blowing hot air can actually work against you — in that case wet your skin first so the airflow evaporates it, or move to the coolest room in the home.",
      },
    ],
    fixNow: {
      blurb:
        "If the free steps aren't enough tonight, the one thing that reliably fixes it is moving air across your skin — that's evaporative cooling, the same mechanism as sweating, and it's what makes a hot room survivable. A quiet oscillating tower fan aimed at the bed gives you that all night without the rattle that wakes you up; a cordless clip-on fan on the headboard is the cheapest way to aim air right where you sleep.",
      productIds: ["dreo-cruiser-pro-t1-oscillating-tower", "koonie-10000mah-rechargeable-clip-on-fan"],
      guideHref: "/heat",
      guideLabel: "Cooling gear",
    },
    prevent: {
      blurb:
        "The heat you feel first is often the heat coming back up out of your mattress — foam stores your body heat and radiates it into you all night. A cooling gel topper pulls heat away from the sleep surface itself so you're not fighting the bed, and a permanent quiet bedroom fan means you're never scrambling on the next hot night. Own both and 'too hot to sleep' stops being a crisis.",
      productIds: ["serta-thermagel-cooling-memory-foam-mattress", "shark-turboblade-bladeless-tower-fan-tf202s"],
      guideHref: "/heat",
      guideLabel: "Cooling gear",
    },
    faq: [
      {
        q: "Does sleeping with a fan on actually cool the room, or just move hot air around?",
        a: "A fan doesn't lower the room's temperature — it cools you by helping sweat evaporate off your skin, which is genuine cooling for your body. That works great up to a point. Once the air is very hot and very humid (roughly above 95°F), the fan is mostly blowing hot air and evaporation stalls, so it can feel worse. In that case, dampen your skin first or point the fan out a window to exhaust heat instead of circulating it.",
      },
      {
        q: "What's the fastest way to cool down when I'm already in bed and can't fall asleep?",
        a: "Cool your pulse points. A cold, damp washcloth or a fabric-wrapped ice pack on your neck, wrists, and ankles cools the blood passing just under the skin and gives relief within a few minutes. Pair it with a fan moving air over you. If you can get up for two minutes, a quick cool (not ice-cold) shower is even faster and is the most reliable single fix.",
      },
      {
        q: "Will a cooling mattress topper really help, or is it marketing?",
        a: "A gel or cooling-foam topper doesn't refrigerate you, so be realistic — it won't feel like AC. What it does do is pull heat away from the surface and stop plain memory foam from trapping and radiating your body heat back at you, which is a common reason hot sleepers wake up sweating. It addresses the surface you're lying on, which fans can't reach, so it pairs well with airflow rather than replacing it.",
      },
      {
        q: "Is a neck fan or personal cooler worth it for sleeping, or just for daytime?",
        a: "Wearable and handheld coolers are built for when you're upright and moving — commutes, walks, working in the heat — not for lying still all night. For actual sleep you want a fan that oscillates over the whole bed or a cooler sleep surface. Keep the personal stuff for getting through the hot hours before bed and for the next heatwave outdoors.",
      },
    ],
    related: ["ac-died-in-a-heatwave"],
    updated: "Jul 2026",
  },
  {
    slug: "blackout-with-a-cpap",
    situation: "A blackout and someone needs a CPAP",
    h1: "A blackout and someone needs a CPAP — here's exactly what to do",
    metaDescription:
      "Blackout with a CPAP? Turn off the heated humidifier first — it roughly halves the draw — then size a power station by watt-hours. Here's the one that runs it all night.",
    eyebrow: "When it breaks · Backup power",
    intro:
      "The grid just dropped and the CPAP has to run tonight. Before you panic or grab the first battery you see, know this: the machine itself sips power — it's the heated humidifier and heated hose that drain a battery — and with those off, even a modest power station carries you through the night. Work these steps in order.",
    doNow: [
      {
        step: "Turn off the heated humidifier and hose",
        detail:
          "This is the single biggest battery saver — the heated humidifier and heated tubing can add 50-70% to what the machine draws. On a ResMed AirSense, set Climate Control to Manual and turn Humidity and Tube temperature OFF; on most machines it's one setting in the menu. The pressurized air is the actual therapy and it's unchanged — the heat is only comfort, so skipping it for a night or two costs you nothing but a slightly drier nose.",
      },
      {
        step: "Do the watt-hours math on what you have",
        detail:
          "With the heater off, most CPAPs pull only about 30-60W, so a full night runs roughly 240-480 watt-hours (higher pressures sit at the top of that range). That means a phone-sized power bank won't cut it, but a compact ~300Wh station covers a typical night and a 1kWh unit covers two to three. Check the label on your machine's power brick — it lists volts and amps, or watts — so you're sizing off your real number instead of guessing.",
      },
      {
        step: "Plug in the most efficient way",
        detail:
          "If your machine came with a matching 12V DC cord, running it from a station's car/DC port skips the AC-to-DC conversion and saves roughly 10-25% of the battery versus the wall brick. No DC cable? A pure sine-wave AC outlet — which every LiFePO4 power station here has — runs a CPAP safely, just a little less efficiently. If your station has a UPS/pass-through mode, leave the CPAP plugged into it so it never even pauses when grid power flickers.",
      },
      {
        step: "If a generator is your backup, keep it outside",
        detail:
          "A battery power station is safe indoors and by the bed — a fuel generator is not. Carbon monoxide is silent and deadly, so any gas generator must run well away from windows and doors, never in a garage, shed, or on a porch. Meanwhile keep a phone charged so you can check your utility's restoration estimate and reach your equipment supplier (DME) if the outage runs long.",
      },
    ],
    fixNow: {
      blurb:
        "The fix tonight is a LiFePO4 power station with a pure sine-wave inverter — safe to run indoors, silent beside the bed, and sized to carry a CPAP through the dark. With the humidifier off, a 1kWh unit like the Jackery Explorer 1000 v2 (1070Wh) runs most machines for two to three nights; the lighter, lower-cost EcoFlow RIVER 2 Pro (768Wh) still clears a full night if you want less to haul. Keep it topped off and it's ready the moment the lights go.",
      productIds: ["jackery-explorer-1000-v2-portable", "ecoflow-river-2-pro-portable"],
      guideHref: "/guides/best-power-stations-compared",
      guideLabel: "Power stations, compared",
    },
    prevent: {
      blurb:
        "So a blackout never interrupts a breath again, own a station with UPS pass-through and leave the CPAP plugged into it full-time. The BLUETTI AC180 carries a 1152Wh battery and switches from wall power to that battery in about 20 milliseconds — faster than the machine can register — so an outage at 3 a.m. doesn't even wake you. Top it off every few weeks and the next blackout becomes a non-event.",
      productIds: ["bluetti-ac180-portable-power-station"],
      guideHref: "/guides/best-power-stations-compared",
      guideLabel: "Power stations, compared",
    },
    faq: [
      {
        q: "Can I really run a CPAP off a portable power station?",
        a: "Yes. With the heater off a CPAP draws only about 30-60W, so any pure sine-wave LiFePO4 station handles it comfortably — the motor and electronics don't care that the power came from a battery. What matters is capacity: a ~300Wh unit covers a typical night, and a 1kWh unit covers two to three. Avoid cheap 'modified sine-wave' inverters, which can make sensitive medical electronics buzz or misbehave.",
      },
      {
        q: "How long will a power station run my CPAP overnight?",
        a: "It comes down to watt-hours and whether the heater is on. Heat off (roughly 30-40W average), a 1070Wh station like the Jackery Explorer 1000 v2 runs about 20+ hours — two to three full nights. Turn the humidifier and heated hose back on and that same battery might not finish a single night, which is why turning off the heat is the biggest lever you have.",
      },
      {
        q: "Is it safe to use my CPAP without the humidifier?",
        a: "For a night or two, yes — the humidifier adds comfort, not therapy. The pressurized air that actually treats your apnea is identical with the heater off; you may just wake with a drier nose or throat. The one thing never to do is skip the machine itself to save battery — cut the heat, not the therapy. For anything specific to your condition, follow your own provider's guidance.",
      },
      {
        q: "What size power station do I need for a CPAP in a blackout?",
        a: "For one night with the heater off, roughly 300Wh is enough for most machines — run it from the DC port if you can to keep the margin comfortable. For a full weekend, or to keep the humidifier running, step up to 1kWh or more. And if you want the same battery to also cover phones, a router, and a few lights through the outage, a 1000Wh+ station with a 1000W+ pure sine-wave inverter is the practical sweet spot.",
      },
    ],
    related: ["power-outage"],
    updated: "Jul 2026",
  },
];

export function getScenario(slug: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.slug === slug);
}

/**
 * Maps a comparison-guide slug to its matching "moment it breaks" scenario, so the calm
 * evergreen guide (researcher intent) and the urgent scenario (panic-buyer intent) link both
 * ways — a real topic cluster that compounds topical authority instead of scattered one-off pages.
 */
export const GUIDE_TO_SCENARIO: Record<string, string> = {
  "best-jump-starters-compared": "car-wont-start",
  "best-tire-inflators-compared": "flat-tire-on-the-shoulder",
  "best-power-stations-compared": "power-outage",
  "best-portable-air-conditioners": "ac-died-in-a-heatwave",
  "best-tower-fans-compared": "room-wont-cool-no-central-air",
  "best-dash-cams-compared": "fender-bender-no-proof",
};

export function getScenarioForGuide(guideSlug: string): Scenario | undefined {
  const s = GUIDE_TO_SCENARIO[guideSlug];
  return s ? getScenario(s) : undefined;
}
