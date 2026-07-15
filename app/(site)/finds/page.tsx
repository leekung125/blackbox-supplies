import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Reveal } from "@/components/motion/reveal";
import { getCoreProducts } from "@/lib/products";
import { JsonLd } from "@/components/json-ld";
import { affiliateListSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Value Picks — genuinely useful gear under $50 worth owning",
  description:
    "The affordable end of the catalog, curated for value — cooling, car, roadside, power, and work-desk gear from $25 to $50 that's genuinely useful and still worth owning. Not deal-hunting; value that lasts.",
  alternates: { canonical: "/finds" },
};

function lowPrice(pr: string) {
  const m = pr.match(/([0-9][0-9,]*)/);
  return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
}

export default function FindsPage() {
  // The cross-vertical budget feed. These sub-$50 picks are hidden from /heat & /useful
  // (which show premium ≥$50 only), so this is their home — and the "cheap X" entry point.
  const finds = getCoreProducts()
    .filter((p) => {
      const lp = lowPrice(p.priceRange);
      return lp >= 25 && lp < 50;
    })
    .sort((a, b) => lowPrice(a.priceRange) - lowPrice(b.priceRange));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Value Picks", path: "/finds" }]),
        affiliateListSchema(
          "Value Picks — genuinely useful gear under $50",
          finds.map((p) => ({ id: p.id, name: p.name, brand: p.brand, image: p.image ?? "", blurb: p.verdict || p.problemSolved })),
        ),
      ]} />
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">Value Picks</span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Genuinely useful gear under $50 that&apos;s still worth owning.
        </h1>
        <p className="lede mt-4 max-w-2xl">
          Not every fix needs a big-ticket buy. This is the affordable end of the catalog, curated for
          value — the clever, well-made upgrades that earn their spot across cooling, car, roadside, power,
          and the work desk. {finds.length} picks from $25 to $50, each linking straight to Amazon.
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
