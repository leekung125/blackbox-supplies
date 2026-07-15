"use client";

/**
 * PreviewGallery — "flip through the real pages."
 *
 * The #1 conversion lever on a System landing page: the buyer SEES the actual rendered pages
 * before paying. The filmstrip lives on a WARM ESPRESSO STAGE (a lit reading table under the
 * amber lamp — never paper pasted on near-black), and every page goes through PaperPreview:
 * cream-warmed, amber hairline, layered soft+amber shadow, edge melt. A scroll-snap filmstrip
 * (mobile-first, works with a thumb) with a gentle 3D tilt + lift on hover (fine pointers
 * only), arrow paging + a live counter, and a full-screen zoom lightbox (Escape / arrows /
 * backdrop-click, body scroll locked while open) whose zoomed page carries the exact same
 * warm paper tone via PAPER_FILTER.
 *
 * Honesty + perf laws: only REAL renders from the actual pack are ever passed in — no mockup
 * theater; no ambient animation loops (tilt is pointer-driven, counter updates are
 * rAF-throttled and re-render only when the index changes); everything is reduced-motion
 * gated; images are lazy except in the lightbox.
 */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import PaperPreview, {
  PAPER_FILTER,
  PAPER_H,
  PAPER_W,
} from "@/app/(site)/systems/paper-preview";

export interface PreviewPage {
  src: string;
  title: string;
  caption: string;
  /** Small mono chip on the card, e.g. "System 01" or "The pack". */
  tag?: string;
}

/** Pointer-driven 3D tilt via CSS vars written straight to the element — zero React state. */
function useTilt() {
  const fine = useRef(false);
  useEffect(() => {
    fine.current =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const onMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (!fine.current) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
  }, []);

  const onLeave = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return { onMove, onLeave };
}

export function PreviewGallery({ pages }: { pages: PreviewPage[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { onMove, onLeave } = useTilt();

  // rAF-throttled scroll → active card index for the counter (re-renders only on change).
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestD = Infinity;
        for (let i = 0; i < el.children.length; i++) {
          const c = el.children[i] as HTMLElement;
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        setIndex((prev) => (prev === best ? prev : best));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToCard = useCallback((i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (!child) return;
    const left = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, []);

  // Lightbox: Escape / arrow keys, body scroll lock, focus the close control.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? i : (i + 1) % pages.length));
      else if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? i : (i - 1 + pages.length) % pages.length));
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, pages.length]);

  if (!pages.length) return null;
  const zoomed = lightbox === null ? null : pages[lightbox];

  return (
    <div>
      {/* ── the warm reading table — filmstrip on an espresso stage, not a void ── */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          background:
            "radial-gradient(130% 110% at 50% 0%, #1e150c 0%, #150e08 55%, #0c0805 100%)",
          boxShadow:
            "inset 0 0 0 1px rgba(217,154,69,0.14), inset 0 1px 0 rgba(237,186,102,0.07), 0 24px 60px -30px rgba(0,0,0,0.55)",
        }}
      >
        {/* the lamp over the table */}
        <div
          aria-hidden
          className="glow-amber-soft pointer-events-none left-1/2 top-[-6rem] h-56 w-[26rem] max-w-[92%] -translate-x-1/2"
        />

        {/* controls row — counter + arrows (the filmstrip also just scrolls/swipes) */}
        <div className="relative flex items-center justify-between gap-4 px-5 pt-5 sm:px-6">
          <p className="mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">
            <span className="nums text-accent-bright">{String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden> / </span>
            <span className="nums">{String(pages.length).padStart(2, "0")}</span>
            <span className="ml-3 hidden sm:inline">Tap any page to zoom</span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous page"
              disabled={index === 0}
              onClick={() => scrollToCard(Math.max(0, index - 1))}
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink-dim transition-colors hover:border-accent/50 hover:text-accent-bright disabled:cursor-default disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-dim"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              aria-label="Next page"
              disabled={index === pages.length - 1}
              onClick={() => scrollToCard(Math.min(pages.length - 1, index + 1))}
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink-dim transition-colors hover:border-accent/50 hover:text-accent-bright disabled:cursor-default disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-dim"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>

        {/* the filmstrip */}
        <div
          ref={scrollerRef}
          className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-7 pt-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {pages.map((p, i) => (
            <figure key={p.src} className="group w-[212px] shrink-0 snap-center sm:w-[272px]">
              <button
                type="button"
                onClick={() => setLightbox(i)}
                onPointerMove={onMove}
                onPointerLeave={onLeave}
                aria-label={`Zoom — ${p.title}`}
                className="relative block w-full cursor-zoom-in text-left transition-transform duration-200 ease-out will-change-transform [transform:perspective(1000px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_translateY(var(--ty,0px))] hover:[--ty:-6px] motion-reduce:hover:[--ty:0px]"
              >
                <PaperPreview
                  src={p.src}
                  alt={p.title}
                  label={p.tag}
                  sizes="(min-width: 640px) 272px, 212px"
                />
                {/* amber edge-light on hover — the lamp finds the page you're on */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[12px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(237,186,102,0.55), 0 0 34px -6px rgba(217,154,69,0.5)",
                  }}
                />
                {/* zoom glyph */}
                <span
                  aria-hidden
                  className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-[rgba(16,12,7,0.78)] text-accent-bright opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-4 w-4">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M16 16 L21 21 M11 8 V14 M8 11 H14" />
                  </svg>
                </span>
              </button>
              <figcaption className="mt-4 px-1">
                <p className="font-display text-[1rem] font-semibold leading-snug text-ink-strong">
                  {p.title}
                </p>
                <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink-dim">{p.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* ── zoom lightbox ─────────────────────────────────────────────────────── */}
      {zoomed ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomed.title}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[rgba(12,8,5,0.92)] p-4 backdrop-blur-md sm:p-8"
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close preview"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent/50 hover:text-accent-bright"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4" aria-hidden>
              <path d="M6 6 L18 18 M18 6 L6 18" />
            </svg>
          </button>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={zoomed.src}
              alt={zoomed.title}
              width={PAPER_W}
              height={PAPER_H}
              sizes="(min-width: 1024px) 640px, 92vw"
              className="h-auto max-h-[76vh] w-auto rounded-lg"
              style={{
                filter: PAPER_FILTER,
                boxShadow:
                  "0 0 0 1px rgba(217,154,69,0.3), 0 0 60px -10px rgba(217,154,69,0.35), 0 40px 90px -20px rgba(0,0,0,0.8)",
              }}
            />
          </div>

          <div
            className="mt-4 flex w-full max-w-2xl items-center justify-between gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => setLightbox((i) => (i === null ? i : (i - 1 + pages.length) % pages.length))}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink-dim transition-colors hover:border-accent/50 hover:text-accent-bright"
            >
              <Chevron dir="left" />
            </button>
            <div className="min-w-0 text-center">
              <p className="font-display text-base font-semibold leading-snug text-ink-strong sm:text-lg">
                {zoomed.title}
              </p>
              <p className="mono mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-ink-faint">
                <span className="nums">{String((lightbox ?? 0) + 1).padStart(2, "0")}</span> /{" "}
                <span className="nums">{String(pages.length).padStart(2, "0")}</span> · real page from
                the pack
              </p>
            </div>
            <button
              type="button"
              aria-label="Next page"
              onClick={() => setLightbox((i) => (i === null ? i : (i + 1) % pages.length))}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink-dim transition-colors hover:border-accent/50 hover:text-accent-bright"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      {dir === "left" ? <path d="M14 6 L8 12 L14 18" /> : <path d="M10 6 L16 12 L10 18" />}
    </svg>
  );
}
