import type { Metadata } from "next";
import { ProductBrowser } from "@/components/product-browser";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { affiliateListSchema, breadcrumbSchema } from "@/lib/schema";
import { getAllProducts, isMainProduct } from "@/lib/products";

// The sitewide "shop all" page — the full cross-vertical catalog (cooling + useful +
// car & roadside) in one faceted browser. /gear, /heat, and /useful are the per-vertical
// pages; this is the everything view with vertical + category + price facets.
export const metadata: Metadata = {
  title: "Shop All Gear — Cooling, Car & Utility",
  description:
    "Browse the full catalog of genuinely useful gear — cooling, everyday utility, and car & roadside kit in one place. Filter by category, sort by price, buy on Amazon. Researched from real specs, with honest tradeoffs.",
  alternates: { canonical: "/products" },
};

export default function ProductsIndex() {
  // Main grid = on-brand, ≥$25 picks (isMainProduct), ordered by editorial priority (highest
  // first) so sub-$25 items don't top the catalog; the browser's sort can override. Sub-$25 stays
  // reachable via /finds, kits, and category detail pages.
  const products = getAllProducts()
    .filter(isMainProduct)
    .sort((a, b) => b.priority - a.priority);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Shop all gear", path: "/products" }]),
        affiliateListSchema(
          "BlackBox Supplies — full catalog",
          products.map((p) => ({ id: p.id, name: p.name, brand: p.brand, image: p.image ?? "", blurb: p.verdict || p.problemSolved })),
        ),
      ]} />
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
