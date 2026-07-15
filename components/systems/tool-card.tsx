"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { getSystem } from "@/lib/systems";
import { PaperPreview, PAPER_W, PAPER_H } from "@/app/(site)/systems/paper-preview";

/**
 * ToolCard — the paired-System attach card (Wave 3 contextual wiring).
 *
 * This is the ONE paid card a page may carry, and it exists to be visually + verbally DISTINCT
 * from affiliate product cards (trust-separation, IA §5.3 / BEHAVIORAL_UX §13 visual law):
 *   • its OWN glyph family — a layered-document blueprint mark, NEVER a product photo;
 *   • its only imagery is our OWN rendered pages (PagePeek / SYSTEM_PREVIEWS) — paper, not gear;
 *   • it always reads "A BlackBox System · Made by us, sold by us" (the SYSTEMS_DISCLOSURE one-liner);
 *   • it is styled as a TOOL (amber-lamp lit-card), so it can never be mistaken for an Amazon pick,
 *     and must never be interleaved with affiliate picks (the consumer places it alone, post-verdict).
 *
 * Three tier variants encode the CROSS_SELL priority ladder (CROSS_SELL_RULES §1):
 *   • essential — full card: title, the one-line problem it solves, "N systems · fillable PDF",
 *                 the flat price, and the "See the Glovebox →" link to the landing page.
 *   • strong    — 2-line compact card (same trust framing, less weight).
 *   • optional  — a single quiet line (the load-shedding valve; first to be suppressed).
 *
 * `quiet` dampens the treatment for anxiety/safety contexts (CS-5): no amber bloom, muted accent —
 * "never monetize fear at full volume."
 *
 * Instrumentation (KPI §1): fires `system_view {product,path,slot,tier}` once when the card enters
 * the viewport, and `system_card_click {product,path,slot,tier}` on navigation.
 *
 * HARD invariants the consumer must uphold (this component cannot enforce them alone):
 *   one ToolCard per page, secondary to the free answer, never before the affiliate verdict/BuyCta,
 *   never in a hero or sticky element.
 */

export type ToolCardTier = "essential" | "strong" | "optional";

export interface ToolCardProps {
  /** Which System to attach. Defaults to the flagship. Reads title/price/contents from getSystem(). */
  slug?: string;
  /** Priority tier → card weight (CROSS_SELL_RULES §1). */
  tier: ToolCardTier;
  /** Placement slot for analytics (e.g. "kit-s3", "guide-s3", "product-post-receipt"). */
  slot: string;
  /** The page path the card sits on — for analytics attribution. */
  path: string;
  /** Anxiety/health/safety context → dampened, quiet treatment (CS-5). */
  quiet?: boolean;
  className?: string;
}

/** Fire a callback exactly once, when `ref` first enters the viewport (falls back to mount). */
function useViewOnce(ref: React.RefObject<HTMLElement | null>, cb: () => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      cb();
      return;
    }
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired) {
            fired = true;
            cb();
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Rendered-page preview assets per System slug (from the Assets phase, /public/systems/previews).
 * These are OUR OWN rendered pages — paper, never gear — so showing them keeps the trust
 * separation intact while letting the buyer SEE the quality before the landing page.
 * Systems without an entry (e.g. in-development SKUs) gracefully render glyph-only.
 */
export interface SystemPreviews {
  /** The rendered cover page — the one small thumbnail attach-cards use. */
  cover: string;
  /** Supporting page renders, in display order — the index card fans these behind the cover. */
  pages: string[];
}

export const SYSTEM_PREVIEWS: Record<string, SystemPreviews> = {
  "digital-glovebox": {
    cover: "/systems/previews/glovebox-cover.png",
    pages: [
      "/systems/previews/glovebox-vehicle-record.png",
      "/systems/previews/glovebox-accident.png",
      "/systems/previews/glovebox-worked-example.png",
    ],
  },
};

/** Preview PNGs are US-Letter renders — one true aspect ratio everywhere (re-exported for
 *  older consumers; the source of truth lives in paper-preview.tsx). */
export const PREVIEW_W = PAPER_W;
export const PREVIEW_H = PAPER_H;

/**
 * PagePeek — a small tilted render of the System's cover page, through the shared
 * PaperPreview treatment (warm parchment tone, amber hairline, layered soft light — never
 * a hard white rectangle), with a gentle lift/tilt on card hover. Decorative (aria-hidden) —
 * the card copy carries the information. Stays a DOCUMENT, never a product photo.
 */
function PagePeek({ src, quiet, className = "" }: { src: string; quiet?: boolean; className?: string }) {
  return (
    <span className={`relative block shrink-0 ${className}`} aria-hidden>
      {!quiet && (
        <span
          className="absolute -inset-3 rounded-full opacity-80"
          style={{
            background: "radial-gradient(closest-side, rgba(217,154,69,0.30), transparent 72%)",
            filter: "blur(10px)",
          }}
        />
      )}
      <span className="relative block rotate-2 transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:-translate-y-1 group-hover:rotate-3">
        <PaperPreview src={src} alt="" sizes="96px" radius={6} />
      </span>
    </span>
  );
}

/** The System glyph — layered blueprint/document stack. Deliberately NOT a product photo. */
function ToolGlyph({ size, quiet }: { size: number; quiet?: boolean }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-2xl"
      style={
        quiet
          ? {
              width: size,
              height: size,
              border: "1px solid #40341f",
              background: "var(--color-accent-tint)",
            }
          : {
              width: size,
              height: size,
              border: "1px solid #edba66bb",
              background: "radial-gradient(125% 125% at 50% 22%, #d99a453d, transparent 72%)",
              boxShadow: "0 0 20px -5px #d99a45, inset 0 0 12px -6px #edba66",
            }
      }
      aria-hidden
    >
      <svg
        className={quiet ? "text-accent" : "text-accent-bright"}
        style={{ width: size * 0.5, height: size * 0.5 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 3 H15 L19 7 V19 A2 2 0 0 1 17 21 H7 A2 2 0 0 1 5 19 V5 A2 2 0 0 1 7 3 Z" />
        <path d="M15 3 V7 H19 M8.5 12 H15.5 M8.5 15.5 H15.5 M8.5 8.5 H11" />
      </svg>
    </span>
  );
}

export function ToolCard({
  slug = "digital-glovebox",
  tier,
  slot,
  path,
  quiet = false,
  className = "",
}: ToolCardProps) {
  const system = getSystem(slug);
  const ref = useRef<HTMLDivElement | null>(null);

  const product = slug;
  useViewOnce(ref, () => track("system_view", { product, path, slot, tier }));

  // getSystem should always resolve for a real slug; render nothing rather than a broken card.
  if (!system) return null;

  const href = `/systems/${system.slug}`;
  const onClick = () => track("system_card_click", { product, path, slot, tier });

  // "See the Glovebox →" — short, human link label derived from the title.
  const shortName = system.title.replace(/^The\s+/i, "").replace(/^Digital\s+/i, "");
  const linkLabel = `See the ${shortName}`;
  const manifest = `${system.contents.length} systems · fillable PDF`;
  const available = system.status === "available";
  const preview = SYSTEM_PREVIEWS[system.slug];

  const Arrow = (
    <svg
      className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
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
  );

  // ── OPTIONAL — a single quiet line (load-shedding valve) ─────────────────────
  if (tier === "optional") {
    return (
      <div ref={ref} className={className}>
        <Link
          href={href}
          onClick={onClick}
          className="group flex items-center gap-3 rounded-xl border border-line bg-surface/60 px-4 py-3 transition-colors hover:border-line-strong"
        >
          <ToolGlyph size={28} quiet />
          <span className="min-w-0 flex-1 text-sm text-ink-dim">
            <span className="font-medium text-ink">{system.title}</span>
            <span className="text-ink-faint"> — {system.tagline}</span>
          </span>
          <span className="mono hidden shrink-0 items-baseline gap-1 text-ink-faint sm:inline-flex">
            {available && (
              <span className="nums text-sm font-semibold text-ink">${system.price}</span>
            )}
          </span>
          <span className="shrink-0 text-accent transition-colors group-hover:text-accent-bright">
            {Arrow}
          </span>
        </Link>
      </div>
    );
  }

  // ── STRONG — 2-line compact card ─────────────────────────────────────────────
  if (tier === "strong") {
    return (
      <div ref={ref} className={className}>
        <Link
          href={href}
          onClick={onClick}
          className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 ${
            quiet ? "border border-line bg-surface" : "lit-card grad-border-amber lift"
          }`}
        >
          <ToolGlyph size={44} quiet={quiet} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="mono text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-accent-strong">
                A BlackBox System
              </span>
            </div>
            <h3 className="mt-1 font-display text-lg font-semibold leading-tight text-ink-strong transition-colors group-hover:text-accent-bright">
              {system.title}
            </h3>
            <p className="mt-1 text-sm leading-snug text-ink-dim">{system.tagline}</p>
          </div>
          {preview && <PagePeek src={preview.cover} quiet={quiet} className="hidden w-12 md:block" />}
          <div className="hidden shrink-0 flex-col items-end gap-1 text-right sm:flex">
            {available && (
              <span className="mono nums text-lg font-semibold leading-none text-ink-strong">
                ${system.price}
              </span>
            )}
            <span className="mono text-[0.54rem] uppercase tracking-[0.12em] text-ink-faint">
              Made by us
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors group-hover:text-accent-bright">
              {linkLabel} {Arrow}
            </span>
          </div>
        </Link>
      </div>
    );
  }

  // ── ESSENTIAL — the full paired-tool card ────────────────────────────────────
  return (
    <div ref={ref} className={className}>
      <Link
        href={href}
        onClick={onClick}
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 ${
          quiet ? "border border-line bg-surface" : "lit-card grad-border-amber lift"
        }`}
      >
        {!quiet && (
          <span
            aria-hidden
            className="glow-amber-soft"
            style={{ top: "-3rem", left: "-2rem", width: "15rem", height: "9rem" }}
          />
        )}

        <div className="relative flex items-start justify-between gap-4">
          <ToolGlyph size={48} quiet={quiet} />
          <span
            className={
              quiet
                ? "mono shrink-0 rounded-full border border-line px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-ink-faint"
                : "pill-amber shrink-0"
            }
          >
            A BlackBox System
          </span>
        </div>

        <div className="relative mt-5 flex items-start gap-5">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-2xl font-semibold text-ink-strong transition-colors group-hover:text-accent-bright">
              {system.title}
            </h3>
            {/* the one-line problem it solves */}
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">{system.tagline}</p>
          </div>
          {/* the rendered cover — the buyer SEES the paper before the landing page */}
          {preview && <PagePeek src={preview.cover} quiet={quiet} className="-mt-1 w-16 sm:w-20" />}
        </div>

        <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${
              quiet ? "border border-line text-ink-faint" : "text-accent-bright"
            }`}
            style={
              quiet
                ? undefined
                : {
                    border: "1px solid #edba66bb",
                    background: "radial-gradient(125% 125% at 50% 22%, #d99a453d, transparent 72%)",
                    boxShadow: "0 0 20px -5px #d99a45, inset 0 0 12px -6px #edba66",
                  }
            }
          >
            {manifest}
          </span>
          {available && (
            <span className="inline-flex items-baseline gap-2">
              <span className="mono nums text-2xl font-semibold leading-none text-ink-strong">
                ${system.price}
              </span>
              <span className="mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint">
                one-time
              </span>
            </span>
          )}
        </div>

        <div className="relative mt-5 flex items-center justify-between border-t border-line-soft pt-4">
          <span className="mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-faint">
            Made by us · sold by us
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors group-hover:text-accent-bright">
            {linkLabel}
            {Arrow}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default ToolCard;
