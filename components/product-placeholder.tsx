import { getCategoryByName } from "@/lib/categories";
import type { Category } from "@/lib/products";

type Aspect = "square" | "video" | "wide";

const RATIO: Record<Aspect, string> = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[4/3]",
};

/**
 * Clean product image tile for the editorial commerce theme. Shows the product photo on a soft
 * neutral tile — no overlays, no labels baked on top, no tactical framing. Falls back to a simple
 * monogram tile if a product has no image.
 */
export function ProductPlaceholder({
  category,
  caption,
  aspect = "square",
  className = "",
  image,
}: {
  category: Category;
  caption?: string;
  aspect?: Aspect;
  className?: string;
  image?: string;
}) {
  const meta = getCategoryByName(category);

  if (image) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-surface-2 ${RATIO[aspect]} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={caption ? `${meta.name} — ${caption}` : meta.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded-xl bg-surface-2 ${RATIO[aspect]} ${className}`}
    >
      <span className="font-display text-5xl font-semibold text-ink-faint/50">{meta.lettermark[0]}</span>
    </div>
  );
}
