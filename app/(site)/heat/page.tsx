import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { AffiliateCard, type AffiliateProduct } from "@/components/affiliate-card";
import { SectionNav } from "@/components/section-nav";
import { JsonLd } from "@/components/json-ld";
import { affiliateListSchema, breadcrumbSchema } from "@/lib/schema";
import { EXTRA_ARTICLES } from "@/lib/articles-extra";
import { getComparisonGuideBySlug } from "@/lib/comparison-guides";
import heatData from "@/data/heat-products.json";

const AC_COMPARE = getComparisonGuideBySlug("best-portable-air-conditioners");

const GUIDES = EXTRA_ARTICLES.filter((a) => a.category === "Cooling");

// On-brand cooling appliances only — cooling-sleep bedding (mattress/sleep drift) is excluded.
const ALL = (heatData as (AffiliateProduct & { offBrand?: boolean })[]).filter((p) => !p.offBrand);

function lowPrice(pr: string) {
  const m = pr.match(/([0-9][0-9,]*)/);
  return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
}
// Premium only — the real cooling hardware, not $12 gadgets.
const HEAT = ALL.filter((p) => lowPrice(p.priceRange) >= 50);

const ORDER = ["Portable AC", "Cooling Fans", "Cooling Sleep", "Dorm Cooling", "Personal Cooling"];

const CAT_BLURB: Record<string, string> = {
  "Portable AC":
    "Real cooling for apartments, dorms, garages, and no-window rooms — including battery and evaporative options.",
  "Cooling Fans": "Tower and bladeless fans that move air across the whole room, quietly.",
  "Personal Cooling": "Neck coolers for when the room won't cool but you still have to.",
  "Cooling Sleep":
    "Toppers, sheets, and blankets that pull heat away so you can sleep when it won't drop below 80°.",
  "Dorm Cooling":
    "Mini fridges, tower fans, and cooling gear sized for a hot dorm and a hard move-in deadline.",
};

export const metadata: Metadata = {
  title: "Beat the Heat — Cooling Gear That Actually Works",
  description:
    "The gear that actually cools a room, a bed, or a body when it's 90° and there's no AC — portable AC, tower and bladeless fans, cooling sleep, and dorm cooling. Real picks, honest specs, links straight to Amazon.",
  alternates: { canonical: "/heat" },
  openGraph: {
    type: "website",
    title: "Beat the Heat — Cooling Gear That Actually Works",
    description: "Portable AC, tower & bladeless fans, cooling sleep, and dorm cooling that actually drop the temperature. Real, verified picks.",
    url: "/heat",
  },
};

/**
 * The eyebrow used to hardcode "summer 2026", so it goes stale the moment the calendar turns.
 * Derive it instead: the seasonal framing only appears during the months it's actually true
 * (May–September), and outside that window the page drops the season rather than lying about it.
 */
function seasonEyebrow(now: Date) {
  const month = now.getMonth();
  const year = now.getFullYear();
  return month >= 4 && month <= 8 ? `Beat the heat · summer ${year}` : `Cooling gear · ${year}`;
}

export default function HeatPage() {
  const cats = ORDER.filter((c) => HEAT.some((p) => p.category === c));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Cooling", path: "/heat" }]),
        affiliateListSchema("Beat the Heat — cooling picks", HEAT),
      ]} />
      <span className="eyebrow eyebrow-accent">{seasonEyebrow(new Date())}</span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
        When it won&apos;t cool down on its own
      </h1>
      <p className="lede mt-4 max-w-2xl">
        These are the {HEAT.length} things that actually drop the temperature of a room, a bed, or your
        body — built for apartments and dorms with no central AC. Every pick is a real, verified Amazon
        listing, researched from specs and reviews, linked straight to Amazon.
      </p>
      <AffiliateDisclosure className="mt-5 max-w-2xl" />

      {AC_COMPARE ? (
        <Link
          href={`/guides/${AC_COMPARE.slug}`}
          className="group mt-8 flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-accent/30 bg-surface p-5 ring-1 ring-accent/15 transition-colors hover:border-accent/60 sm:flex-row sm:items-center sm:p-6"
        >
          <div className="min-w-0 flex-1">
            <span className="mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-accent-bright">★ Interactive comparison</span>
            <h2 className="mt-1.5 font-display text-xl font-semibold text-ink-strong sm:text-2xl">
              Compare all {AC_COMPARE.products.length} portable air conditioners
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
              Sort by real cooling, quiet, or price — the winner rises to the top, each links straight to Amazon.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors group-hover:bg-accent-strong">
            Compare &amp; buy
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12 H19 M13 6 L19 12 L13 18" /></svg>
          </span>
        </Link>
      ) : null}

      {GUIDES.length ? (
        <section className="mt-10 rounded-2xl border border-line-strong bg-surface p-5 sm:p-6">
          <span className="eyebrow eyebrow-accent">Read first — cooling guides</span>
          <div className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {GUIDES.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group flex items-baseline gap-2 text-sm">
                <span className="font-medium text-ink transition-colors group-hover:text-accent">{g.title}</span>
                <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <SectionNav sections={cats.map((c) => ({ id: c.toLowerCase().replace(/\s+/g, "-"), label: c }))} />

      {cats.map((cat) => (
        <section key={cat} className="mt-14 scroll-mt-24" id={cat.toLowerCase().replace(/\s+/g, "-")}>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{cat}</h2>
          <p className="mt-2 max-w-2xl text-ink-dim">{CAT_BLURB[cat]}</p>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HEAT.filter((p) => p.category === cat).map((p) => (
              <AffiliateCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
