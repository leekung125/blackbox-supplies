import { CategoryGlyph } from "@/components/category-glyph";
import type { Product } from "@/lib/products";

/**
 * The universal product visual, in priority order:
 *  1. A Higgsfield cinematic studio shot (path contains "/shot-") — the whole scene, full-bleed.
 *  2. A background-removed cutout — floats on a dark warm-glow tile with a contact shadow.
 *  3. No image — a premium spec-tile with the category glyph, brand, key spec, and price.
 * Never a bland white box.
 */
export function ProductThumb({
  product,
  className = "",
  pad = "p-6 sm:p-8",
}: {
  product: Pick<Product, "image" | "name" | "brand" | "category" | "keySpec" | "subcategory" | "priceRange">;
  className?: string;
  pad?: string;
}) {
  const img = product.image;

  // 1. Cinematic staged shot — full-bleed.
  if (img && img.includes("/shot-")) {
    return (
      <div className={`relative overflow-hidden bg-[#0c0906] ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[750ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.05]" />
      </div>
    );
  }

  // 2. Cutout on a dark warm-glow tile.
  if (img) {
    return (
      <div className={`cutout-tile relative overflow-hidden ${className}`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          className={`cutout-shadow relative h-full w-full object-contain ${pad} transition-transform duration-[650ms] ease-out group-hover:scale-[1.06]`}
        />
      </div>
    );
  }

  // 3. Spec-tile fallback.
  return (
    <div className={`cutout-tile relative overflow-hidden ${className}`}>
      <CategoryGlyph category={product.category} className="pointer-events-none absolute -bottom-6 -right-4 h-40 w-40 text-accent/15" />
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-center justify-between gap-2">
          <CategoryGlyph category={product.category} className="h-5 w-5 text-accent" />
          <span className="truncate font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint">{product.brand}</span>
        </div>
        <div>
          <p className="line-clamp-3 font-mono text-[0.68rem] leading-snug text-ink-2">{product.keySpec || product.subcategory}</p>
          <p className="nums mt-1.5 text-sm font-semibold text-ink">{product.priceRange}</p>
        </div>
      </div>
    </div>
  );
}
