import Image from "next/image";

/**
 * PaperPreview — THE one way a rendered System page appears on the dark site.
 *
 * The preview PNGs are rendered from the actual pack and are near-white (#fdfcfa) — printed
 * correctly, but blazing on a warm-dark ground. This component warms them PRESENTATIONALLY
 * (the source files stay ink-white for print) and melts their edges into the room so a page
 * never reads as a hard white rectangle pasted on black:
 *
 *   • cream filter   — brightness/sepia/saturate/contrast turns glare-white into warm parchment
 *                      while every line of type stays fully legible;
 *   • soft geometry  — 12px corners + a warm amber hairline instead of a cold white ring;
 *   • layered light  — a wide soft dark drop (the room) + a faint amber halo (the lamp), and a
 *                      focal variant where the lamp visibly finds the front page;
 *   • edge melt      — a warm sheen at the top-light angle + a faint espresso fade at the foot
 *                      of the page, so paper settles into the ground instead of stopping at it.
 *
 * Pure presentation, zero hooks — safe in server AND client components. Import from
 * '@/app/(site)/systems/paper-preview'. Honesty law: only REAL renders from the actual pack
 * may be passed in — this component styles truth, it never fakes it.
 */

/** Intrinsic size of the preview renders (US-Letter portrait, assets-pipeline output). */
export const PAPER_W = 1632;
export const PAPER_H = 2112;

/**
 * The presentational warmth — near-white paper → warm cream/parchment. Exported so surfaces
 * that must keep a raw <Image> (e.g. a lightbox with viewport-fit sizing) can apply the exact
 * same tone and the paper reads identically everywhere.
 */
export const PAPER_FILTER =
  "brightness(0.9) sepia(0.1) saturate(1.06) contrast(0.97)";

/** The warm cream the filter lands on — used under the image so corners never flash white. */
export const PAPER_CREAM = "#e8dec7";

/** Ambient page — a soft dark drop into the room + a quiet warm halo + amber hairline. */
const SHADOW_AMBIENT =
  "0 0 0 1px rgba(217,154,69,0.22), 0 2px 6px rgba(0,0,0,0.38), 0 18px 40px -14px rgba(0,0,0,0.55), 0 0 34px -8px rgba(217,154,69,0.18)";

/** Focal page — the lamp finds it: brighter hairline, deeper drop, a visible amber glow. */
const SHADOW_FOCAL =
  "0 0 0 1px rgba(237,186,102,0.42), 0 2px 6px rgba(0,0,0,0.4), 0 26px 52px -18px rgba(0,0,0,0.6), 0 0 52px -8px rgba(217,154,69,0.42)";

export interface PaperPreviewProps {
  src: string;
  alt: string;
  /** Small mono chip on the paper, e.g. "System 01" or "The pack". */
  label?: string;
  className?: string;
  /** Eager-load — set on the hero LCP page only. */
  priority?: boolean;
  /** next/image responsive hint; default suits card-sized paper. */
  sizes?: string;
  /** Focal treatment — the amber lamp visibly finds this page (hero front page). */
  focal?: boolean;
  /** Corner radius in px (default 12). Match overlays a consumer stacks on top. */
  radius?: number;
  /** Set false to skip the bottom edge-melt (e.g. when the page sits on light ground). */
  fade?: boolean;
}

export default function PaperPreview({
  src,
  alt,
  label,
  className = "",
  priority = false,
  sizes = "(min-width: 640px) 280px, 60vw",
  focal = false,
  radius = 12,
  fade = true,
}: PaperPreviewProps) {
  return (
    <span
      className={`relative block overflow-hidden ${className}`.trim()}
      style={{
        borderRadius: radius,
        background: PAPER_CREAM,
        boxShadow: focal ? SHADOW_FOCAL : SHADOW_AMBIENT,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={PAPER_W}
        height={PAPER_H}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="block h-auto w-full"
        style={{ filter: PAPER_FILTER }}
      />

      {/* edge melt — a warm top-light sheen + the paper settling into the espresso ground */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          background: [
            "linear-gradient(115deg, rgba(255,246,229,0.12), transparent 38%)",
            fade
              ? "linear-gradient(180deg, transparent 68%, rgba(26,18,10,0.16) 86%, rgba(26,18,10,0.34) 100%)"
              : "",
          ]
            .filter(Boolean)
            .join(", "),
        }}
      />

      {label ? (
        <span className="mono absolute left-3 top-3 rounded-full border border-[rgba(224,163,82,0.4)] bg-[rgba(16,12,7,0.78)] px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-accent-bright">
          {label}
        </span>
      ) : null}
    </span>
  );
}

export { PaperPreview };
