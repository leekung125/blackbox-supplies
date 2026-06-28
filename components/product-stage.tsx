"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { CornerTicks } from "@/components/corner-ticks";
import { CategoryObject } from "@/components/object-art";
import { Tilt } from "@/components/motion/tilt";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Cinematic product stage — the homepage hero's signature module.
 * One object, lit on a pedestal, with a soft floor reflection. Controlled graphite
 * palette, a single cold-blue accent, no over-glow. A premium product shot, not a dashboard.
 */
export function ProductStage() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[27rem]"
      initial={reduce ? undefined : { opacity: 0, y: 26, filter: "blur(12px)" }}
      animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: 0.2, ease: EASE }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: 7.5, ease: "easeInOut", repeat: Infinity }}
      >
        <Tilt max={6} scale={1.01}>
          <Link
            href="/category/power"
            className="group relative block overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-card/80 via-card/40 to-base/30 transition-colors duration-300 hover:border-accent/35"
          >
            {/* studio top-light + sheen + faint grid */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-2/3"
              style={{ background: "radial-gradient(58% 90% at 50% -6%, rgba(255,255,255,0.06), transparent 72%)" }}
              aria-hidden
            />
            <div className="panel-sheen pointer-events-none absolute inset-0" aria-hidden />
            <div className="grid-faint pointer-events-none absolute inset-0 opacity-25" aria-hidden />
            <CornerTicks className="border-accent/20" />

            {/* header — failure → category */}
            <div className="relative flex items-center justify-between px-5 pt-4">
              <span className="kicker text-ink-faint">Dead phone</span>
              <span className="kicker text-accent-bright/75">PWR · 001</span>
            </div>

            {/* object on its pedestal */}
            <div className="relative px-8 pt-7">
              <div className="relative mx-auto aspect-square max-w-[17.5rem]">
                <div className="bloom pointer-events-none absolute inset-0 scale-90 opacity-70 blur-2xl" aria-hidden />
                <CategoryObject
                  category="Power"
                  className="relative z-10 h-full w-full drop-shadow-[0_30px_52px_rgba(0,0,0,0.65)]"
                />
                {/* soft floor reflection */}
                <div
                  className="absolute left-0 top-full h-full w-full"
                  style={{
                    transform: "scaleY(-1)",
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent 52%)",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent 52%)",
                    opacity: 0.16,
                  }}
                  aria-hidden
                >
                  <CategoryObject category="Power" className="h-full w-full" />
                </div>
              </div>
              {/* contact shadow */}
              <div className="mx-auto -mt-1 h-3.5 w-1/2 rounded-[50%] bg-black/55 blur-md" aria-hidden />
            </div>

            {/* footer caption */}
            <div className="relative mt-2 flex items-center justify-between border-t border-line-soft px-5 py-3.5">
              <div>
                <span className="block text-sm font-semibold text-ink">Compact Power Bank</span>
                <span className="mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-faint">
                  Illustration · ~$20–50
                </span>
              </div>
              <span className="mono inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim transition-colors group-hover:text-accent-bright">
                View
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12 H19 M13 6 L19 12 L13 18" />
                </svg>
              </span>
            </div>
          </Link>
        </Tilt>
      </motion.div>
    </motion.div>
  );
}
