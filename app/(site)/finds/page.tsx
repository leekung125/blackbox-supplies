import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Reveal } from "@/components/motion/reveal";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Budget Finds — the best genuinely useful gear under $50",
  description:
    "The affordable end of the catalog: genuinely useful cooling, car, desk, kitchen, and travel gear under $50 — the clever, cheap upgrades worth owning.",
  alternates: { canonical: "/finds" },
};

function lowPrice(pr: string) {
  const m = pr.match(/([0-9][0-9,]*)/);
  return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
}

export default function FindsPage() {
  // The cross-vertical budget feed. These sub-$50 picks are hidden from /heat & /useful
  // (which show premium ≥$50 only), so this is their home — and the "cheap X" entry point.
  const finds = getAllProducts()
    .filter((p) => {
      const lp = lowPrice(p.priceRange);
      return lp >= 15 && lp < 50;
    })
    .sort((a, b) => lowPrice(a.priceRange) - lowPrice(b.priceRange));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">Budget finds</span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
          The best useful gear under $50.
        </h1>
        <p className="lede mt-4 max-w-2xl">
          Not every fix needs a big-ticket buy. These are the clever, affordable upgrades worth owning —
          across cooling, car, desk, kitchen, and travel — {finds.length} picks, cheapest first, each linking
          straight to Amazon.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {finds.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <p className="mt-10 text-sm text-ink-dim">
        Want the premium picks? Browse <Link href="/heat" className="ulink font-semibold">Cooling</Link>,{" "}
        <Link href="/useful" className="ulink font-semibold">Useful gear</Link>, or{" "}
        <Link href="/gear" className="ulink font-semibold">Car &amp; roadside</Link> — or{" "}
        <Link href="/guides" className="ulink font-semibold">read the buying guides</Link>.
      </p>

      <div className="mt-16">
        <NewsletterCta />
      </div>
    </div>
  );
}
