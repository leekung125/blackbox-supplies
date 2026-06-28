"use client";

import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic } from "@/components/motion/magnetic";
import { CountUp } from "@/components/motion/count-up";
import { ShaderBackground } from "@/components/motion/shader-bg";
import { ProductStage } from "@/components/product-stage";
import { EASE } from "@/components/motion/reveal";

const HEADLINE = ["Gear for", "bad timing."];

export function Hero({ total }: { total: number }) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section className="relative overflow-hidden border-b border-line">
      <ShaderBackground className="pointer-events-none absolute inset-0 opacity-90" />
      <div className="grid-faint pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-base to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12 lg:py-28">
        {/* copy */}
        <div className="max-w-xl">
          <motion.div className="flex items-center gap-2.5" {...rise(0.04)}>
            <span className="h-px w-7 bg-accent/50" aria-hidden />
            <span className="kicker text-ink-dim">Field Catalog</span>
          </motion.div>

          <h1 className="mt-5 text-balance text-[2.55rem] font-bold leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={reduce ? undefined : { y: "115%" }}
                  animate={reduce ? undefined : { y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-ink-dim sm:text-lg"
            {...rise(0.32)}
          >
            A premium index of practical gear for the moments everyday systems fail — dead phone,
            dark road, flat tire, lost keys, power out. Honestly sourced, never overclaimed.
          </motion.p>

          <motion.div className="mt-7 flex flex-wrap items-center gap-3" {...rise(0.42)}>
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
            className="mono mt-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.16em] text-ink-faint"
            {...rise(0.52)}
          >
            <span className="text-ink-dim">
              <CountUp to={total} /> products
            </span>
            <span aria-hidden>·</span>
            <span>4 categories</span>
          </motion.div>
        </div>

        {/* cinematic product stage */}
        <ProductStage />
      </div>
    </section>
  );
}
