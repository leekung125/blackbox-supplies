import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { BRAND } from "@/lib/content";
import { getCoreProducts } from "@/lib/products";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "About BlackBox Supplies — Genuinely Useful Gear, Honestly Researched",
  description:
    "BlackBox Supplies curates premium, genuinely useful gear — cooling, useful everyday upgrades, and car & roadside essentials — with honest, research-based buying guides. Here's who we are and how we work.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About BlackBox Supplies",
    description: "Genuinely useful gear, honestly researched. Here's who we are and how we work.",
    url: "/about",
  },
};

const PRINCIPLES = [
  {
    title: "Genuinely useful, not just popular",
    body: "We only cover gear that solves a real problem and is worth the money. Cooling that actually drops the temperature. Desk, kitchen, and travel upgrades built to last. Car gear that earns its place in the trunk. If something's overhyped, we leave it off — or say so.",
  },
  {
    title: "Honest by default",
    body: "Every pick is researched hard: we read verified-buyer reviews, manufacturer spec sheets, and price history, and weigh them against the independent outlets that lab-test — then tell you the best one and its honest catch. Every number is traceable. No invented reviews, no paid placement.",
  },
  {
    title: "Faceless on purpose",
    body: "There's no influencer here selling you a lifestyle. We let the research speak. That keeps the focus where it belongs: on which product is right for you, not on who's recommending it.",
  },
  {
    title: "Transparent about how we earn",
    body: "Our links go to Amazon with an affiliate tag. If you buy through one, we may earn a commission — at no extra cost to you. That's it. It never changes which product we pick as best.",
  },
];

export default function AboutPage() {
  // Single source of truth — the on-brand researched catalog (matches the homepage's "94+ picks").
  const totalPicks = getCoreProducts().length;
  const guideCount = getAllArticles().length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])]} />

      <span className="eyebrow eyebrow-accent">About BlackBox</span>
      <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
        Genuinely useful gear, honestly researched.
      </h1>
      <p className="lede mt-5">
        BlackBox Supplies exists to answer one question well: <em>what's actually worth buying?</em>{" "}We curate premium,
        genuinely useful gear across cooling, everyday useful upgrades, and car &amp; roadside essentials — and back
        every pick with a plain-language buying guide that gives you the best option and the honest trade-off.
      </p>

      <div className="mt-10 space-y-6">
        {PRINCIPLES.map((p, i) => (
          <div key={p.title} className="rounded-2xl border border-line bg-surface p-6">
            <span className="nums font-display text-2xl font-semibold text-accent">0{i + 1}</span>
            <h2 className="mt-2 font-display text-xl font-semibold text-ink-strong">{p.title}</h2>
            <p className="mt-2 leading-relaxed text-ink-dim">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-surface-2 p-6">
        <span className="eyebrow eyebrow-accent">The masthead</span>
        <h2 className="mt-2 font-display text-xl font-semibold text-ink-strong">Who stands behind the picks</h2>
        <p className="mt-3 leading-relaxed text-ink-dim">
          BlackBox Supplies is an independent editorial publication, operated under the BlackBox Supplies name and
          publishing since 2026. We&rsquo;re faceless by design — no influencer, no personal brand — but not
          anonymous about accountability: the BlackBox Supplies editorial desk owns the research standard on this site
          and answers for every pick, every spec, and every correction.
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 border-t border-line pt-4 text-sm text-ink-dim">
          <span><span className="nums font-semibold text-ink-strong">{totalPicks}</span> products researched</span>
          <span aria-hidden className="text-ink-faint">·</span>
          <span><span className="nums font-semibold text-ink-strong">{guideCount}</span> guides</span>
          <span aria-hidden className="text-ink-faint">·</span>
          <span>every spec traced to source</span>
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-accent/25 bg-accent-tint p-6">
        <h2 className="font-display text-xl font-semibold text-ink-strong">Want the details?</h2>
        <p className="mt-2 leading-relaxed text-ink-dim">
          Read exactly how we research and choose every pick on our{" "}
          <Link href="/methodology" className="ulink font-semibold">methodology page</Link>, or see our full{" "}
          <Link href="/disclosure" className="ulink font-semibold">affiliate disclosure</Link>. Questions? Reach us at{" "}
          <a href={`mailto:${BRAND.email}`} className="ulink font-semibold">{BRAND.email}</a>.
        </p>
        <p className="mt-3 leading-relaxed text-ink-dim">
          Spot an error? Email{" "}
          <a href={`mailto:${BRAND.email}`} className="ulink font-semibold">{BRAND.email}</a> — we log{" "}
          <Link href="/methodology" className="ulink font-semibold">methodology changes</Link> so you can see what we
          revised and when.
        </p>
      </div>

      <p className="mt-8 text-sm text-ink-dim">
        Start here: <Link href="/heat" className="ulink font-semibold">Cooling</Link> ·{" "}
        <Link href="/useful" className="ulink font-semibold">Useful gear</Link> ·{" "}
        <Link href="/gear" className="ulink font-semibold">Car &amp; roadside</Link> ·{" "}
        <Link href="/guides" className="ulink font-semibold">Buying guides</Link>
      </p>
    </div>
  );
}
