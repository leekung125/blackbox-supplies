"use client";

/**
 * SystemsHeroShowcase — the cinematic product composition for a System landing page.
 *
 * Real rendered pages from the actual pack float as layered, angled paper spreads on a WARM
 * ESPRESSO STAGE — a lit desk under the amber lamp, not a void. Every page goes through
 * PaperPreview (cream-warmed, amber hairline, layered soft+amber shadow, edge melt) so no
 * hard white rectangle ever touches the dark. A slow CSS float + a whisper of pointer
 * parallax keep it alive; all the SELLING copy stays server-rendered in page.tsx.
 *
 * Mobile law: the whole composition is percent-based inside a capped-width stage with real
 * padding, and every page offset is non-negative — at 375px it scales down gracefully and
 * can never overflow the viewport.
 *
 * Motion/perf law (the site constitution): parallax attaches ONLY on fine pointers with no
 * reduced-motion preference, is rAF-throttled, and writes ONE pair of CSS vars on the root —
 * every layer consumes them via composited transforms (no React re-render per pointer event,
 * no ambient rAF loop; the only idle animation is `.hero-float`, which globals.css already
 * gates behind prefers-reduced-motion).
 */

import { useEffect, useRef } from "react";
import PaperPreview from "@/app/(site)/systems/paper-preview";

export interface HeroSpread {
  src: string;
  alt: string;
}

function Page({
  spread,
  rotate,
  front = false,
  float,
  sizes,
}: {
  spread: HeroSpread;
  rotate: number;
  /** The focal page — gets the amber lamp treatment + priority loading (it is the hero LCP). */
  front?: boolean;
  /** Optional float period, e.g. "6.5s". Omit for a static page. */
  float?: string;
  sizes: string;
}) {
  return (
    <div style={{ transform: `rotate(${rotate}deg)` }}>
      <div
        className={float ? "hero-float" : undefined}
        style={float ? { animationDuration: float } : undefined}
      >
        <PaperPreview
          src={spread.src}
          alt={spread.alt}
          sizes={sizes}
          priority={front}
          focal={front}
        />
      </div>
    </div>
  );
}

/** Parallax wrapper — slides its child by (--px, --py) scaled to this layer's depth. */
function Layer({
  depth,
  className,
  children,
}: {
  depth: number;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div
        style={{
          transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function SystemsHeroShowcase({
  spreads,
  badge,
  className = "",
}: {
  /** Up to three rendered pages: [front focal, back-right, back-left]. */
  spreads: HeroSpread[];
  /** Small honest chip under the composition, e.g. "Real pages · rendered from v1.0". */
  badge?: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      px = 0;
      py = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const front = spreads[0];
  const right = spreads[1];
  const left = spreads[2];
  if (!front) return null;

  return (
    <div ref={rootRef} className={`relative ${className}`.trim()}>
      {/* ── the warm stage — an espresso desk under the lamp, NOT near-black void ── */}
      <div
        className="relative overflow-hidden rounded-[1.75rem] px-6 py-8 sm:px-8 sm:py-10"
        style={{
          background:
            "radial-gradient(120% 95% at 50% 32%, #1f150c 0%, #150e08 58%, #0b0805 100%)",
          boxShadow:
            "inset 0 0 0 1px rgba(217,154,69,0.14), inset 0 1px 0 rgba(237,186,102,0.07), 0 24px 60px -30px rgba(0,0,0,0.6)",
        }}
      >
        {/* the amber lamp behind the paper */}
        <div
          aria-hidden
          className="glow-amber pointer-events-none absolute left-1/2 top-[44%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 opacity-55"
        />
        <div
          aria-hidden
          className="glow-amber-soft pointer-events-none right-[-3rem] top-[-4rem] h-44 w-64"
        />

        <div className="relative mx-auto aspect-[10/9.2] w-full max-w-[17.5rem] sm:max-w-[22rem] lg:max-w-[24rem]">
          {left ? (
            <Layer depth={6} className="left-[1%] top-[12%] w-[44%]">
              <Page
                spread={left}
                rotate={-8}
                float="7.2s"
                sizes="(min-width: 1024px) 180px, 34vw"
              />
            </Layer>
          ) : null}
          {right ? (
            <Layer depth={10} className="right-[1%] top-[2%] w-[44%]">
              <Page
                spread={right}
                rotate={8}
                float="6.1s"
                sizes="(min-width: 1024px) 180px, 34vw"
              />
            </Layer>
          ) : null}
          <Layer depth={15} className="left-1/2 top-[12%] w-[56%] -translate-x-1/2">
            <Page
              spread={front}
              rotate={-2.5}
              front
              float="5.4s"
              sizes="(min-width: 1024px) 230px, 44vw"
            />
          </Layer>

          {/* floor contact shadow — grounds the composition on the desk */}
          <div
            aria-hidden
            className="absolute bottom-[-1%] left-1/2 h-9 w-[70%] -translate-x-1/2 rounded-full bg-black/45 blur-2xl"
          />
        </div>
      </div>

      {badge ? (
        <p className="pill-amber relative mx-auto mt-5 w-fit">{badge}</p>
      ) : null}
    </div>
  );
}
