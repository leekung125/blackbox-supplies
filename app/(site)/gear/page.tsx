import type { Metadata } from "next";
import { ProductBrowser } from "@/components/product-browser";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Reveal } from "@/components/motion/reveal";
import { getAllProducts } from "@/lib/products";

// The car & roadside vertical = these six categories. /gear is the Car vertical page,
// parallel to /heat (Cooling) and /useful (Useful) — not a mixed "all catalog" dump.
const CAR_CATS = new Set([
  "Jump Starters",
  "Tire Inflators",
  "Dash Cams",
  "Power & Charging",
  "Roadside Safety",
  "Car Utility",
]);

export const metadata: Metadata = {
  title: "Car & Roadside Gear",
  description:
    "Car & roadside gear — jump starters, tire inflators, dash cams, power stations, roadside safety, and car utility. Picks chosen from public research and manufacturer specs, with honest tradeoffs and links straight to Amazon.",
  alternates: { canonical: "/gear" },
};

export default function GearPage() {
  const products = getAllProducts().filter((p) => CAR_CATS.has(p.category as string));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">Car &amp; roadside</span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">Car &amp; roadside gear</h1>
        <p className="lede mt-4 max-w-2xl">
          {products.length} picks across six categories — jump starters, tire inflators, dash cams,
          power &amp; charging, roadside safety, and car utility. Every entry is researched from
          manufacturer specs and public sources, and links straight to Amazon.
        </p>
      </Reveal>

      <div className="mt-10">
        <ProductBrowser products={products} />
      </div>

      <div className="mt-16">
        <NewsletterCta heading="New finds, picked and explained." dek="A few times a month we send the gear worth knowing about — with the honest tradeoffs, not just the hype." />
      </div>
    </div>
  );
}
