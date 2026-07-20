import type { Metadata } from "next";
import Link from "next/link";
import { SCENARIOS } from "@/lib/scenarios";
import { JsonLd } from "@/components/json-ld";
import { webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "When It Breaks — What to do the moment something fails | BlackBox Supplies",
  description:
    "Your car won't start, the power's out, it's 95° and the AC died. Step-by-step: what to do right now for free, then the one thing worth owning so it never strands you again.",
  alternates: { canonical: "/when" },
};

export default function WhenIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={[webPageSchema("/when", "When It Breaks — the readiness field guide", "What to do the moment something fails, then the gear that stops it happening again.")]} />
      <span className="eyebrow eyebrow-accent">When it breaks</span>
      <h1 className="mt-3 text-balance font-display text-[2.2rem] font-semibold leading-[1.06] text-ink-strong sm:text-[3rem]">
        The moment it fails — handled.
      </h1>
      <p className="lede mt-5 max-w-2xl text-pretty">
        Not a category review — a field guide for the exact moment something breaks. What to do right now, for free,
        then the one thing worth owning so you&rsquo;re never stranded there again.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {SCENARIOS.map((s) => (
          <Link key={s.slug} href={`/when/${s.slug}`} className="lit-card lift group flex flex-col p-6">
            <span className="mono text-[0.6rem] uppercase tracking-[0.14em] text-accent-bright">{s.eyebrow}</span>
            <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink-strong transition-colors group-hover:text-accent-bright">{s.situation}</h2>
            <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-dim text-pretty">{s.intro}</p>
            <span className="mt-4 text-sm font-semibold text-accent">What to do →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
