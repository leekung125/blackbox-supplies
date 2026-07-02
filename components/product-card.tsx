import Link from "next/link";
import { ProductThumb } from "@/components/product-thumb";
import type { Product } from "@/lib/products";

/**
 * Product card — a framed, elevated card on the dark ground. Real product photo on a warm
 * studio tile (or a premium spec-tile), a price badge, category, name, and the one-line verdict.
 * `role` shows a guide/kit pick label when used inside a guide or kit.
 */
export function ProductCard({ product, role }: { product: Product; role?: string }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="bbx-card card-lift group flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden">
        <ProductThumb product={product} className="h-full w-full" />
        {role ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 text-[0.68rem] font-semibold text-on-accent shadow-md shadow-black/30">
            {role}
          </span>
        ) : null}
        <span className="nums absolute right-3 top-3 z-10 rounded-full bg-dark/80 px-2.5 py-1 text-xs font-semibold text-on-dark ring-1 ring-white/10 backdrop-blur-sm">
          {product.priceRange}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="eyebrow">{product.category}</span>
        <h3 className="mt-1.5 line-clamp-2 font-display text-[1.02rem] font-semibold leading-snug text-ink-strong transition-colors group-hover:text-accent">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-dim">
          {product.verdict || product.problemSolved}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          See the pick
          <svg className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12 H19 M13 6 L19 12 L13 18" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
