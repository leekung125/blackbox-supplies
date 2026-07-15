"use client";

/**
 * SystemsHeroShowcase — the cinematic product composition for a System landing page.
 *
 * Real rendered pages from the actual pack float as layered, angled paper spreads under the
 * amber lamp: paper depth (warm ring + layered contact/ambient shadow + a top-light sheen),
 * a slow CSS float, and a whisper of pointer parallax. All the SELLING copy stays
 * server-rendered in page.tsx — this island is pure presentation.
 *
 * Motion/perf law (the site constitution): parallax attaches ONLY on fine pointers with no
 * reduced-motion preference, is rAF-throttled, and writes ONE pair of CSS vars on the root —
 * every layer consumes them via composited transforms (no React re-render per pointer event,
 * no ambient rAF loop; the only idle animation is `.hero-float`, which globals.css already
 * gates behind prefers-reduced-motion).
 */

import Image from "next/image";
import { useEffect, useRef } from "react";

export interface HeroSpread {
  src: string;
  alt: string;
}

/** Intrinsic size of the preview renders (US-Letter portrait). */
const PAGE_W = 1632;
const PAGE_H = 2112;

function Page({
  spread,
  rotate,
  front = false,
  float,
  sizes,
}: {
  spread: HeroSpread;
  rotate: number;
  /** The focal page — gets the amber edge-light + priority loading (it is the hero LCP). */
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
        <div
          className="relative overflow-hidden rounded-[10px] bg-[#f4efe4]"
          style={{
            boxShadow: front
              ? "0 0 0 1px rgba(237,186,102,0.5), 0 0 44px -8px rgba(217,154,69,0.55), 0 2px 6px rgba(0,0,0,0.5), 0 28px 52px -18px rgba(0,0,0,0.72), 0 64px 96px -32px rgba(0,0,0,0.62)"
              : "0 0 0 1px rgba(235,227,209,0.14), 0 2px 5px rgba(0,0,0,0.45), 0 22px 44px -16px rgba(0,0,0,0.68), 0 52px 80px -30px rgba(0,0,0,0.55)",
          }}
        >
          <Image
            src={spread.src}
            alt={spread.alt}
            width={PAGE_W}
            height={PAGE_H}
            sizes={sizes}
            priority={front}
            className="block h-auto w-full"
          />
          {/* paper sheen — a raking top-light + a settle of shadow at the foot of the page */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.16), transparent 36%), linear-gradient(180deg, transparent 70%, rgba(21,17,11,0.16))",
            }}
          />
        </div>
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
      {/* the amber lamp behind the paper */}
      <div
        aria-hidden
        className="glow-amber pointer-events-none absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 opacity-60"
      />
      <div
        aria-hidden
        className="glow-amber-soft pointer-events-none absolute -right-8 -top-10 h-52 w-72"
      />

      <div className="relative mx-auto aspect-[10/9.4] w-full max-w-[28rem]">
        {left ? (
          <Layer depth={7} className="left-[-2%] top-[11%] w-[46%]">
            <Page
              spread={left}
              rotate={-10}
              float="7.2s"
              sizes="(min-width: 1024px) 200px, 42vw"
            />
          </Layer>
        ) : null}
        {right ? (
          <Layer depth={11} className="right-[-2%] top-[1%] w-[46%]">
            <Page
              spread={right}
              rotate={9}
              float="6.1s"
              sizes="(min-width: 1024px) 200px, 42vw"
            />
          </Layer>
        ) : null}
        <Layer depth={18} className="left-1/2 top-[13%] w-[58%] -translate-x-1/2">
          <Page
            spread={front}
            rotate={-3}
            front
            float="5.4s"
            sizes="(min-width: 1024px) 260px, 54vw"
          />
        </Layer>

        {/* floor contact shadow — grounds the composition in the room */}
        <div
          aria-hidden
          className="absolute bottom-[-3%] left-1/2 h-10 w-[72%] -translate-x-1/2 rounded-full bg-black/55 blur-2xl"
        />
      </div>

      {badge ? (
        <p className="pill-amber relative mx-auto mt-5 w-fit">{badge}</p>
      ) : null}
    </div>
  );
}
