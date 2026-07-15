import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { getAllSystems, SYSTEMS_PROMISE } from "@/lib/systems";
import { SystemsIndexCard } from "./systems-index-card";
import { SystemsDisclosure } from "./systems-disclosure";

const BASE = "https://www.blackboxsupplies.com";

export const metadata: Metadata = {
  title: "Systems — Printable & Fillable Readiness Plans, Made By Us",
  description:
    "BlackBox Systems are printable + fillable plans that keep you organized for the moments that actually happen. Made by us, sold by us — no affiliate links, one flat price, 30-day refund.",
  alternates: { canonical: "/systems" },
  openGraph: {
    type: "website",
    title: "Systems — Printable & Fillable Readiness Plans · BlackBox Supplies",
    description:
      "Printable + fillable plans that keep you organized. Made by us, sold by us. The Digital Glovebox — everything about your car, in one place, before you need it.",
    url: "/systems",
  },
};

export default function SystemsIndexPage() {
  const systems = getAllSystems();

  // ItemList of the real Systems (honest: name + on-site URL, no ratings, no fabricated offers —
  // per-product Offer schema lives on each landing page).
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BlackBox Systems",
    numberOfItems: systems.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: systems.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${BASE}/systems/${s.slug}`,
    })),
  };

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={[
          webPageSchema("/systems", "BlackBox Systems", SYSTEMS_PROMISE),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Systems", path: "/systems" },
          ]),
          itemList,
        ]}
      />

      {/* ambient lamp behind the masthead */}
      <div
        aria-hidden
        className="glow-amber-soft pointer-events-none left-1/2 top-[-5rem] h-72 w-[38rem] max-w-[92vw] -translate-x-1/2"
      />

      <nav className="relative flex flex-wrap items-center gap-2 text-sm text-ink-dim">
        <Link href="/" className="hover:text-accent-strong">Home</Link>
        <span aria-hidden>/</span>
        <span className="text-ink">Systems</span>
      </nav>

      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent mt-6 inline-block">Systems · made by us</span>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] text-ink headline-glow sm:text-5xl">
          The plans that keep you organized for the moment.
        </h1>
        <p className="lede mt-4 max-w-2xl">
          {SYSTEMS_PROMISE} Our gear picks are the hardware; Systems are the plan around it —
          printable, fillable, and in your car or on your phone before you need them. One flat
          price, no subscription, 30-day refund.
        </p>
      </Reveal>

      {/* the SKU shelf — premium tool cards, never interleaved with affiliate picks */}
      <div className="relative mt-10 grid gap-6 sm:grid-cols-2">
        {systems.map((s) => (
          <Reveal key={s.slug} blur={false}>
            <SystemsIndexCard system={s} />
          </Reveal>
        ))}

        {/* honest "more coming" placeholder — no fake waitlist, no invented price */}
        <div className="lit-card grad-border relative flex h-full flex-col justify-center overflow-hidden rounded-2xl border-dashed p-6">
          <span className="mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">More systems</span>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">
            We build one, get it right, then add the next — an Outage Planner and a Winter Driving
            System are in the works. No waitlist theater; they appear here when they&rsquo;re real.
          </p>
        </div>
      </div>

      {/* the trust-separation block — this is what makes the layers legible */}
      <div className="relative mt-12">
        <SystemsDisclosure />
      </div>

      {/* how Systems differ from the free answer (useful-first, never a gate) */}
      <section className="relative mt-14 grid gap-5 sm:grid-cols-3">
        {[
          {
            t: "The answer stays free",
            b: "Everything a System teaches — what to do in a breakdown, what to photograph at a scene — is in our guides and always will be. Systems organize it; they don't gate it.",
          },
          {
            t: "One flat price",
            b: "A number we set, shown plainly. No compare-at theater, no countdowns, no scarcity — and no ratings, because none exist yet and we won't invent them.",
          },
          {
            t: "Yours forever",
            b: "One-time purchase, free updates to the edition, no account, no app, nothing renews. And a 30-day refund, any reason — you keep the files.",
          },
        ].map((c) => (
          <div key={c.t} className="lit-card rounded-2xl p-5">
            <h3 className="font-display text-lg font-semibold text-ink-strong">{c.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{c.b}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
