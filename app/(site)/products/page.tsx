import type { Metadata } from "next";
import { ProductBrowser } from "@/components/product-browser";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "All Gear",
  description:
    "The full Blackbox Supply catalog — power, car, light and carry gear for bad timing. Filter by field. Honestly sourced, not personally tested.",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="flex items-center gap-2">
        <span className="h-px w-6 bg-accent/60" aria-hidden />
        <span className="kicker text-accent-bright">The catalog</span>
      </div>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        All gear
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-dim">
        {products.length} units across four fields. Every entry is sourced from
        public research, not personally tested, and links out to a retailer or
        review source.
      </p>

      <div className="mt-10">
        <ProductBrowser products={products} />
      </div>
    </div>
  );
}
