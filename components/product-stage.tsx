"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { CornerTicks } from "@/components/corner-ticks";
import { Tilt } from "@/components/motion/tilt";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Cinematic product stage — the homepage hero's signature module.
 * The launch lead (Compact 10,000mAh power bank) shown as a real generated studio
 * plate, framed on a lit pedestal. Controlled graphite palette, a single cold-blue
 * accent, no over-glow. A premium product shot, not a dashboard. Honestly labeled
 * "Generated" and linked to the lead product record.
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
            href="/products/power-bank-compact-10k"
            className="group relative block overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-card/80 via-card/40 to-base/30 transition-colors duration-300 hover:border-accent/35"
          >
            {/* studio top-light + sheen */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-2/3"
              style={{ background: "radial-gradient(58% 90% at 50% -6%, rgba(255,255,255,0.05), transparent 72%)" }}
              aria-hidden
            />
            <div className="panel-sheen pointer-events-none absolute inset-0 z-20" aria-hidden />
            <CornerTicks className="z-30 border-accent/20" />

            {/* header — failure → category */}
            <div className="relative z-20 flex items-center justify-between px-5 pt-4">
              <span className="kicker text-ink-faint">Dead phone</span>
              <span className="kicker text-accent-bright/75">PWR · 001</span>
            </div>

            {/* the generated product plate */}
            <div className="relative px-5 pt-5">
              <div className="relative mx-auto aspect-square overflow-hidden rounded-xl border border-line-soft bg-card-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/products/power-bank-compact-10k.jpg"
                  alt="Compact 10,000mAh power bank — generated studio visual"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.035]"
                />
                {/* edge vignette so the plate seats into the frame */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "radial-gradient(132% 82% at 50% -8%, transparent 52%, rgba(3,4,8,0.55))" }}
                  aria-hidden
                />
                <span className="kicker absolute bottom-2.5 left-3 z-10 text-[0.5625rem] tracking-[0.18em] text-ink-faint/75">
                  Generated
                </span>
              </div>
            </div>

            {/* footer caption */}
            <div className="relative z-20 mt-3 flex items-center justify-between border-t border-line-soft px-5 py-3.5">
              <div>
                <span className="block text-sm font-semibold text-ink">Compact Power Bank</span>
                <span className="mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-faint">
                  Generated · ~$20–50
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
