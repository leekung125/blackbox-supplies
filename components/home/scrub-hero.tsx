"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Magnetic } from "@/components/fx/magnetic";
import { CountUp } from "@/components/fx/count-up";

/**
 * Mouse-scrub cinematic hero (technique from reference-06/09/10).
 * Horizontal cursor position scrubs an all-keyframe MP4 frame-by-frame via a rAF loop that lerps
 * video.currentTime toward the target, with a seek-guard. Desktop = scrub; touch / reduced-motion =
 * autoplay-muted loop (mobile has no mouse). The trunk-gear clip is the niche, cinematically lit.
 */
export function ScrubHero({ stats }: { stats: { products: number; guides: number; kits: number } }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const current = useRef(0);
  const seeking = useRef(false);
  const [scrub, setScrub] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    const wrap = wrapRef.current;
    if (!v || !wrap) return;
    const canScrub = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canScrub || reduce) {
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.play().catch(() => {});
      return;
    }

    setScrub(true);
    v.pause();
    let dur = v.duration || 5;
    const onMeta = () => (dur = v.duration || 5);
    const onSeeked = () => (seeking.current = false);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("seeked", onSeeked);

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      // ease the ends slightly so the very edges settle
      target.current = x * (dur - 0.05);
    };
    wrap.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const loop = () => {
      current.current += (target.current - current.current) * 0.16;
      if (!seeking.current && Math.abs(v.currentTime - current.current) > 0.018) {
        seeking.current = true;
        try {
          v.currentTime = current.current;
        } catch {
          seeking.current = false;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("seeked", onSeeked);
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative isolate min-h-[88vh] overflow-hidden border-b border-line">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src="/video/car-scrub.mp4"
        poster="/video/car-scrub.jpg"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* readability scrims — left column stays dark for the headline */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0705] via-[#0a0705]/70 to-[#0a0705]/10 sm:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0705] via-transparent to-[#0a0705]/50" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
        <div className="max-w-xl">
          <span className="eyebrow eyebrow-accent rise block">Car · Roadside · Backup power</span>
          <h1 className="rise mt-5 font-display text-[3rem] font-semibold leading-[0.94] tracking-[-0.03em] text-ink-strong sm:text-6xl lg:text-[4.6rem] text-glow" style={{ animationDelay: "80ms" }}>
            Gear for the road.
            <span className="mt-1 block text-[0.62em] font-medium text-ink-dim">
              Before the road becomes a <span className="font-semibold text-accent">problem.</span>
            </span>
          </h1>
          <p className="rise mt-7 max-w-lg text-lg leading-relaxed text-ink-dim" style={{ animationDelay: "150ms" }}>
            The jump starters, inflators, dash cams, and power stations actually worth owning — chosen
            on merit, explained straight, and linked to the exact one to buy.
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "220ms" }}>
            <Magnetic>
              <Link href="/guides" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-semibold text-on-accent shadow-[0_10px_40px_-8px_rgba(217,154,69,0.5)] transition-colors hover:bg-accent-strong">
                Read the buying guides
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12 H19 M13 6 L19 12 L13 18" /></svg>
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href="/gear" className="inline-flex items-center rounded-full border border-line-strong glass px-7 py-3.5 text-[0.95rem] font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                Shop the gear
              </Link>
            </Magnetic>
          </div>
          <div className="rise mt-10 flex gap-8" style={{ animationDelay: "280ms" }}>
            {[
              { n: stats.products, s: "+", label: "verified picks" },
              { n: stats.guides, s: "", label: "buying guides" },
              { n: stats.kits, s: "", label: "gear kits" },
            ].map((st) => (
              <div key={st.label}>
                <div className="nums font-display text-3xl font-semibold text-ink-strong">
                  <CountUp to={st.n} suffix={st.s} />
                </div>
                <div className="mt-0.5 text-xs uppercase tracking-wide text-ink-dim">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* scrub hint (desktop only) */}
      {scrub ? (
        <div className="rise pointer-events-none absolute bottom-6 right-6 hidden items-center gap-2.5 text-ink-faint lg:flex" style={{ animationDelay: "500ms" }}>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em]">Move to explore the scene</span>
          <span className="relative flex h-5 w-12 items-center">
            <span className="h-px w-full bg-line-strong" />
            <span className="scrub-dot absolute h-2 w-2 rounded-full bg-accent" />
          </span>
        </div>
      ) : null}
    </section>
  );
}
