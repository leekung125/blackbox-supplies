import type { Metadata } from "next";
import { ProductBrowser } from "@/components/product-browser";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Reveal } from "@/components/motion/reveal";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "All Gear",
  description:
    "Browse the full catalog — jump starters, tire inflators, dash cams, power stations, roadside safety, and car utility gear. Picks chosen from public research and manufacturer specs, with honest tradeoffs and links straight to Amazon.",
};

export default function GearPage() {
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">The catalog</span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">All gear</h1>
        <p className="lede mt-4 max-w-2xl">
          {products.length} products across six categories — jump starters, tire inflators, dash cams,
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
