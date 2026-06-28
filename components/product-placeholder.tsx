import { CategoryObject } from "@/components/object-art";
import { CornerTicks } from "@/components/corner-ticks";
import { getCategoryByName } from "@/lib/categories";
import type { Category } from "@/lib/products";

type Aspect = "square" | "video" | "wide";

const RATIO: Record<Aspect, string> = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[3/2]",
};

/**
 * Code/CSS placeholder for product imagery. We hold NO licensed product photos,
 * so every product renders a consistent generated tile: graphite panel + faint
 * grid + category lettermark watermark + glyph + cold-blue glow. It is openly
 * labeled a placeholder ("Studio placeholder").
 */
export function ProductPlaceholder({
  category,
  caption,
  aspect = "square",
  className = "",
}: {
  category: Category;
  caption?: string;
  aspect?: Aspect;
  className?: string;
}) {
  const meta = getCategoryByName(category);

  return (
    <div
      className={`relative overflow-hidden rounded-md border border-line bg-card-2 grid-faint ${RATIO[aspect]} ${className}`}
    >
      {/* cold-blue bloom */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bloom h-2/3 w-2/3 rounded-full opacity-70 blur-2xl" />
      </div>

      {/* giant lettermark watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="mono select-none text-[5.5rem] font-bold leading-none tracking-tight text-white/[0.035]">
          {meta.lettermark}
        </span>
      </div>

      {/* code-drawn object illustration (same identity as the films) */}
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <CategoryObject
          category={category}
          className="h-[82%] w-[82%] drop-shadow-[0_0_26px_rgba(77,139,176,0.22)]"
        />
      </div>

      {/* top-left HUD tag */}
      <div className="kicker absolute left-3 top-3 text-ink-faint">
        Blackbox // {meta.lettermark}
      </div>

      {/* honest placeholder label + optional caption */}
      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
        <span className="kicker text-[0.5625rem] tracking-[0.18em] text-ink-faint/70">
          Illustration
        </span>
        {caption ? (
          <span className="kicker max-w-[52%] truncate text-[0.5625rem] tracking-[0.14em] text-ink-faint/70">
            {caption}
          </span>
        ) : null}
      </div>

      {/* fine scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 3px)",
        }}
        aria-hidden
      />

      <CornerTicks className="border-accent/30" />
    </div>
  );
}
