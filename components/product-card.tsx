import Link from "next/link";
import { NotTestedBadge } from "@/components/not-tested";
import { ProductPlaceholder } from "@/components/product-placeholder";
import { getCategoryByName } from "@/lib/categories";
import type { Product } from "@/lib/products";

/**
 * Catalog product card — a "field record", not an ecommerce tile.
 * Surfaces only honest fields: category · object illustration · name · problem ·
 * price (approx) · not-tested · View. The card links INTO the detail page; the
 * outbound/monetized link + full disclosure live there, never on the card.
 */
export function ProductCard({ product }: { product: Product }) {
  const meta = getCategoryByName(product.category);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-card/40 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-card"
    >
      {/* hover hairline — restrained, no glow */}
      <span
        className="absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent/70 to-transparent transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden
      />

      <div className="p-2.5 pb-0">
        <ProductPlaceholder
          category={product.category}
          caption={product.subcategory}
          aspect="square"
          className="rounded-lg"
          image={product.image}
        />
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="mono rounded-sm border border-line px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-ink-dim">
            {meta.name}
          </span>
          <span className="mono text-xs text-ink-dim">{product.priceRange}</span>
        </div>

        <h3 className="mt-3 text-[0.95rem] font-semibold leading-snug tracking-tight text-ink">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[0.8rem] leading-relaxed text-ink-dim">
          {product.problemSolved}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-line-soft pt-3.5">
          <NotTestedBadge tested={product.tested} />
          <span className="mono inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim transition-colors group-hover:text-accent-bright">
            View
            <svg
              className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12 H19 M13 6 L19 12 L13 18" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
