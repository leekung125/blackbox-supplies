import type { Metadata } from "next";
import { ProductBrowser } from "@/components/product-browser";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Reveal } from "@/components/motion/reveal";
import { getAllProducts } from "@/lib/products";

// The sitewide "shop all" page — the full cross-vertical catalog (cooling + useful +
// car & roadside) in one faceted browser. /gear, /heat, and /useful are the per-vertical
// pages; this is the everything view with vertical + category + price facets.
export const metadata: Metadata = {
  title: "Shop All Gear",
  description:
    "The full BlackBox catalog — cooling, everyday useful gear, and car & roadside kit in one place. Filter by vertical and category, sort by price, and jump straight to Amazon. Every pick is researched from manufacturer specs and public sources, with honest tradeoffs.",
  alternates: { canonical: "/products" },
};

export default function ProductsIndex() {
  // Featured order = editorial priority (highest first); the browser's sort can override.
  const products = [...getAllProducts()].sort((a, b) => b.priority - a.priority);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">The full catalog</span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-strong sm:text-5xl">
          Shop all gear
          <span className="ml-3 align-middle text-2xl font-normal text-ink-faint sm:text-3xl">
            {products.length} picks
          </span>
        </h1>
        <p className="lede mt-4 max-w-2xl">
          Every researched pick in one place — cooling, everyday useful gear, and car &amp; roadside
          kit. Filter by vertical and category, sort by price, and go straight to Amazon. Nothing here
          is sponsored placement; each entry earns its spot on merit, with the honest tradeoffs kept in
          plain sight.
        </p>
      </Reveal>

      <div className="mt-10">
        <ProductBrowser products={products} />
      </div>

      <div className="mt-16">
        <NewsletterCta
          heading="New finds, picked and explained."
          dek="A few times a month we send the gear worth knowing about — with the honest tradeoffs, not just the hype."
        />
      </div>
    </div>
  );
}
