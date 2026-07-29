import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { AffiliateCard, type AffiliateProduct } from "@/components/affiliate-card";
import { SectionNav } from "@/components/section-nav";
import { JsonLd } from "@/components/json-ld";
import { affiliateListSchema, breadcrumbSchema } from "@/lib/schema";
import { EXTRA_ARTICLES } from "@/lib/articles-extra";
import usefulData from "@/data/useful-products.json";

const GUIDES = EXTRA_ARTICLES.filter((a) => a.category === "Useful Gear");

// On-brand only — off-brand drift (kitchen, sleep, home-org, lifestyle) is excluded from browse.
const ALL = (usefulData as (AffiliateProduct & { offBrand?: boolean })[]).filter((p) => !p.offBrand);

function lowPrice(pr: string) {
  const m = pr.match(/([0-9][0-9,]*)/);
  return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
}
// Premium only — BlackBox carries gear worth owning, not $10 gadgets.
const ITEMS = ALL.filter((p) => lowPrice(p.priceRange) >= 50);

const ORDER = ["Desk & Tech", "Travel & EDC", "Problem Solvers"];
const CAT_BLURB: Record<string, string> = {
  "Desk & Tech": "The upgrades that quietly make a work setup better — lighting, charging, power, mounts.",
  "Travel & EDC": "Everyday-carry tools and tech built to last, not to break in a month — multitools, chargers, trackers.",
  "Problem Solvers": "Practical fixes for the everyday annoyances worth spending on.",
};

export const metadata: Metadata = {
  title: "Work & Everyday Utility — Gear Worth Owning",
  description:
    "The practical work-desk and everyday-carry gear worth owning — charging, power, lighting, mounts, trackers, and multitools. Real, verified Amazon picks with honest notes.",
  alternates: { canonical: "/useful" },
  openGraph: {
    type: "website",
    title: "Work & Everyday Utility — Gear Worth Owning",
    description: "Practical work-desk and everyday-carry utility gear worth the money — charging, power, mounts, tools. Real, verified picks.",
    url: "/useful",
  },
};

export default function UsefulPage() {
  const cats = ORDER.filter((c) => ITEMS.some((p) => p.category === c));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Useful", path: "/useful" }]),
        affiliateListSchema("Genuinely useful upgrades — gear worth owning", ITEMS),
      ]} />
      <span className="eyebrow eyebrow-accent">Work &amp; everyday utility</span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">Gear worth owning</h1>
      <p className="lede mt-4 max-w-2xl">
        A curated shortlist of {ITEMS.length} practical work-desk and everyday-carry upgrades worth the money —
        charging, power, lighting, mounts, trackers, and multitools built to last. Every pick is a real, verified
        Amazon listing, researched from specs and reviews, with an honest note on why it earns its place.
      </p>
      <AffiliateDisclosure className="mt-5 max-w-2xl" />

      {GUIDES.length ? (
        <section className="mt-10 rounded-2xl border border-line-strong bg-surface p-5 sm:p-6">
          <span className="eyebrow eyebrow-accent">Read first — useful-gear guides</span>
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

      <SectionNav sections={cats.map((c) => ({ id: c.toLowerCase().replace(/[^a-z0-9]+/g, "-"), label: c }))} />

      {cats.map((cat) => (
        <section key={cat} className="mt-14 scroll-mt-24" id={cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{cat}</h2>
          <p className="mt-2 max-w-2xl text-ink-dim">{CAT_BLURB[cat]}</p>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ITEMS.filter((p) => p.category === cat).map((p) => (
              <AffiliateCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
