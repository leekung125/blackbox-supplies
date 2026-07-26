import type { Metadata } from "next";
import { NewsletterForm } from "@/components/newsletter-form";
import { GuideCard } from "@/components/guide-card";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { webPageSchema } from "@/lib/schema";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Newsletter — Gear Notes & Buying Guides",
  description:
    "Get useful gear notes before you need them — practical buying guides, Amazon finds, and simple kit picks, a few times a month. No spam, no fake reviews, unsubscribe in one click.",
  alternates: { canonical: "/newsletter" },
};

const GET = [
  { t: "Useful finds", d: "A short list of the practical gear worth knowing about — with the honest tradeoffs, not just the hype." },
  { t: "Buying guides", d: "When a new guide lands (power, car, travel, home), you hear about it first." },
  { t: "Simple kit picks", d: "The few things actually worth having for power, the car, travel, and outages." },
];

const WONT = ["No spam — a few sends a month, that's it", "No fake reviews or invented testing", "No selling your email", "Unsubscribe in one click, anytime"];

export default function NewsletterPage() {
  const taste = getAllGuides().slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <JsonLd data={[webPageSchema("/newsletter", "Newsletter", "Get useful gear notes before you need them — practical buying guides, Amazon finds, and simple kit picks, a few times a month. No spam, no fake reviews, unsubscribe in one click.")]} />
      <Reveal blur={false}>
        <div className="text-center">
          <span className="eyebrow eyebrow-accent">The newsletter</span>
          <h1 className="mx-auto mt-3 max-w-2xl text-balance font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
            Get useful gear notes before you need them.
          </h1>
          <p className="lede mx-auto mt-4 max-w-xl">
            Practical buying guides, Amazon finds, and simple kit picks — a few times a month, for the
            everyday problems people usually prepare for too late.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-md">
          <NewsletterForm />
        </div>
      </Reveal>

      <Reveal blur={false} className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-ink">What you&rsquo;ll get</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {GET.map((g, i) => (
            <div key={g.t} className="rounded-2xl border border-line bg-surface p-5">
              <span className="nums font-display text-xl font-semibold text-accent-strong">0{i + 1}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">{g.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{g.d}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal blur={false} className="mt-12">
        <div className="rounded-2xl border border-line bg-surface-2 p-6">
          <h2 className="font-display text-xl font-semibold text-ink">And what you won&rsquo;t</h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {WONT.map((w) => (
              <li key={w} className="flex gap-2.5 text-sm text-ink-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 13 L9 17 L19 6" /></svg>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal blur={false} className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-ink">A taste of the guides</h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {taste.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
