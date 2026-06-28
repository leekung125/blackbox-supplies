import Link from "next/link";
import { CategoryGlyph } from "@/components/category-glyph";
import { NotTestedBadge } from "@/components/not-tested";
import { ProductPlaceholder } from "@/components/product-placeholder";
import { Badge } from "@/components/ui/badge";
import { getCategoryByName } from "@/lib/categories";
import type { Product } from "@/lib/products";

/**
 * Catalog product card. Surfaces only honest fields:
 * name · category · problem solved · price range (approx) · best for · "View".
 * The whole card links INTO the detail page (where the outbound link + full
 * disclosure live). No outbound/monetized link sits on the card itself.
 */
export function ProductCard({ product }: { product: Product }) {
  const meta = getCategoryByName(product.category);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col rounded-lg border border-line bg-card/50 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-card hover:shadow-[0_18px_40px_-24px_rgba(77,139,176,0.5)]"
    >
      <ProductPlaceholder
        category={product.category}
        caption={product.subcategory}
        aspect="square"
      />

      <div className="mt-3 flex items-center justify-between gap-2">
        <Badge variant="accent">
          <CategoryGlyph category={product.category} className="h-3 w-3" />
          {meta.name}
        </Badge>
        <span className="mono text-xs text-ink-dim">≈ {product.priceRange}</span>
      </div>

      <h3 className="mt-2 text-sm font-medium leading-snug text-ink">
        {product.name}
      </h3>

      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-dim">
        {product.problemSolved}
      </p>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="kicker shrink-0">Best for</span>
        <span className="line-clamp-1 text-[0.6875rem] text-ink-faint">
          {product.bestFor}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-line-soft pt-2.5">
        <NotTestedBadge />
        <span className="mono inline-flex items-center gap-1 text-xs text-accent-bright">
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
    </Link>
  );
}
