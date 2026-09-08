import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { PowerStationCalculator } from "@/components/tools/power-station-calculator";

/**
 * ⛔ WHY A TOOL AND NOT ANOTHER GUIDE. Search Console, 2026-09-08: EXTERNAL LINKS = 0 across 239
 * indexed pages and 78 guides. Three content strategies were tested and falsified the same day
 * (question-shaped pages, Bing/DuckDuckGo, low-demand targeting) - the site ranks at a uniform
 * median ~31-53 regardless, which is the signature of an authority ceiling, not a content
 * problem. Prose does not get cited. A calculator whose arithmetic is correct and visible can be.
 *
 * This is a link asset first and an affiliate page second, which is why it sells nothing above
 * the fold and shows its working in full.
 */

export const metadata: Metadata = {
  title: "Power Station Size Calculator (Duty Cycle + Surge)",
  description:
    "Work out the Wh capacity and inverter surge you actually need. Accounts for fridge duty cycle and motor startup surge, which most sizing calculators ignore.",
  alternates: { canonical: "/tools/power-station-sizing" },
  openGraph: {
    type: "website",
    title: "Power Station Size Calculator — Duty Cycle and Surge Included",
    description:
      "Most sizing calculators treat a fridge as a constant load and ignore startup surge. This one does neither, and shows its arithmetic.",
    url: "/tools/power-station-sizing",
  },
};

const FAQ: [string, string][] = [
  [
    "What size power station do I need to run a refrigerator?",
    "Far less than a naive calculation suggests. A full-size fridge draws around 150 W while the compressor runs, but it only runs about a third of the time — so a day is roughly 150 × 24 × 0.35 ≈ 1,260 Wh, not 3,600 Wh. The harder constraint is startup surge: the compressor pulls around 1,200 W for a moment, so the inverter has to clear that even though the battery barely notices it.",
  ],
  [
    "Why does my power station trip when the fridge starts?",
    "Because it was sized on running watts. Induction motors draw two to three times their running wattage for a fraction of a second at startup. A station rated 1,000 W continuous can be perfectly adequate for a 150 W fridge and still shut down the instant that 1,200 W surge arrives, unless its surge rating covers it.",
  ],
  [
    "Can a power station run a sump pump during an outage?",
    "Sometimes, and surge is the deciding factor rather than capacity. A 1/3 HP sump pump runs at roughly 800 W but can spike past 2,200 W starting. Energy use is usually modest because the pump only runs when water arrives — but if the inverter cannot clear the surge, the runtime is zero no matter how large the battery is.",
  ],
  [
    "How much capacity do I lose to the inverter?",
    "Roughly 15% converting DC to AC on a decent unit, so a 1,000 Wh pack delivers about 850 Wh at the outlet. It is also worth leaving about 20% in reserve rather than planning to a completely flat battery.",
  ],
  [
    "Why can't a power station run a space heater for long?",
    "Resistive heating has no duty cycle worth the name and no efficiency trick — 1,500 W is 1,500 W, continuously. That empties a 1,000 Wh station in well under an hour. Heat is the one load where battery power is almost always the wrong answer.",
  ],
];

export default function PowerStationSizingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Power station sizing", path: "/tools/power-station-sizing" },
          ]),
          faqSchema(FAQ.map(([q, a]) => ({ q, a }))),
        ]}
      />

      <span className="eyebrow eyebrow-accent">Free tool</span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
        Power station size calculator
      </h1>
      <p className="lede mt-4">
        Two numbers decide whether a power station works for you, and they answer different
        questions. <strong className="text-ink">Capacity</strong> in watt-hours decides how long
        it lasts. <strong className="text-ink">Surge</strong> in watts decides whether it starts
        your appliances at all. A unit can pass one and fail the other.
      </p>
      <p className="mt-3 text-ink-dim">
        This calculator accounts for the two things most sizing tools leave out — the{" "}
        <strong className="text-ink">duty cycle</strong> of anything with a compressor, and the{" "}
        <strong className="text-ink">startup surge</strong> of anything with a motor. It shows its
        arithmetic below so you can check it rather than trust it.
      </p>

      <PowerStationCalculator />

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-ink">Questions this raises</h2>
        <div className="mt-5 space-y-6">
          {FAQ.map(([q, a]) => (
            <div key={q}>
              <h3 className="font-medium text-ink">{q}</h3>
              <p className="mt-1.5 text-ink-dim">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-lg border border-line-soft p-5">
        <h2 className="font-display text-xl font-semibold text-ink">Related reading</h2>
        <ul className="mt-3 space-y-2 text-ink-dim">
          <li>
            <Link className="underline hover:text-ink" href="/guides/what-size-power-station-do-i-need-to-run-a-sump-pump">
              What size power station do I need to run a sump pump?
            </Link>
          </li>
          <li>
            <Link className="underline hover:text-ink" href="/guides/portable-power-station-vs-jump-starter-which-do-i-need">
              Portable power station vs jump starter — which do I need?
            </Link>
          </li>
          <li>
            <Link className="underline hover:text-ink" href="/guides/best-power-stations-compared">
              Power stations compared
            </Link>
          </li>
        </ul>
        <p className="mt-4 text-xs text-ink-faint">
          Planning figures are typical values for common household units, not measurements of your
          specific appliance. The nameplate on the unit always wins.
        </p>
      </section>
    </div>
  );
}
