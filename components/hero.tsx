"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { CornerTicks } from "@/components/corner-ticks";
import { CategoryObject } from "@/components/object-art";
import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic } from "@/components/motion/magnetic";
import { Tilt } from "@/components/motion/tilt";
import { CountUp } from "@/components/motion/count-up";
import { ShaderBackground } from "@/components/motion/shader-bg";
import { EASE } from "@/components/motion/reveal";

const HEADLINE = ["Gear for", "bad timing."];

export function Hero({ total }: { total: number }) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22, filter: "blur(7px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.85, delay, ease: EASE },
        };

  return (
    <section className="relative overflow-hidden border-b border-line">
      <ShaderBackground className="pointer-events-none absolute inset-0 opacity-90" />
      <div className="grid-faint pointer-events-none absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-base to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-32">
        <div>
          <motion.div className="flex items-center gap-2.5" {...rise(0.05)}>
            <span className="h-px w-7 bg-accent/50" aria-hidden />
            <span className="kicker text-ink-dim">Field Catalog</span>
          </motion.div>

          <h1 className="mt-6 max-w-xl text-balance text-[2.7rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-6xl">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={reduce ? undefined : { y: "115%" }}
                  animate={reduce ? undefined : { y: 0 }}
                  transition={{ duration: 0.95, delay: 0.12 + i * 0.1, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-md text-base leading-relaxed text-ink-dim sm:text-lg"
            {...rise(0.36)}
          >
            A premium index of practical gear for the moments everyday systems fail — dead phone,
            dark road, flat tire, lost keys, power out. Honestly sourced. Never overclaimed.
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap items-center gap-3" {...rise(0.46)}>
            <Magnetic>
              <ButtonLink href="/products">Browse gear</ButtonLink>
            </Magnetic>
            <Magnetic strength={0.25}>
              <ButtonLink href="/kits" variant="ghost">
                Field kits
              </ButtonLink>
            </Magnetic>
          </motion.div>

          <motion.div
            className="mono mt-9 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint"
            {...rise(0.56)}
          >
            <span className="text-ink-dim">
              <CountUp to={total} /> units
            </span>
            <span aria-hidden>·</span>
            <span>4 fields</span>
            <span aria-hidden>·</span>
            <span>not personally tested</span>
          </motion.div>
        </div>

        {/* the black-box display — reveal → float → cursor-tilt */}
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.94, filter: "blur(10px)" },
                animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
                transition: { duration: 1, delay: 0.32, ease: EASE },
              })}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity }}
          >
            <Tilt max={6} scale={1.02}>
              <Link href="/category/power" className="group relative block">
                <div className="bloom pointer-events-none absolute inset-0 scale-90 opacity-60 blur-2xl" aria-hidden />
                <div className="panel-sheen relative overflow-hidden rounded-2xl border border-line bg-card/30 transition-colors group-hover:border-accent/30">
                  <div className="grid-faint absolute inset-0 opacity-40" aria-hidden />
                  <CornerTicks className="border-accent/20" />
                  <div className="absolute left-4 top-3.5 z-10">
                    <span className="kicker text-ink-faint">BBX · POWER · 001</span>
                  </div>
                  <div className="relative flex aspect-[5/4] items-center justify-center p-10">
                    <CategoryObject
                      category="Power"
                      className="h-full w-full max-w-[19rem] drop-shadow-[0_28px_55px_rgba(0,0,0,0.55)]"
                    />
                  </div>
                  <div className="relative flex items-center justify-between border-t border-line-soft px-4 py-3">
                    <span className="text-sm font-medium text-ink">Compact Power Bank</span>
                    <span className="mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                      Illustration
                    </span>
                  </div>
                </div>
              </Link>
            </Tilt>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
