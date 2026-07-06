"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { Tilt } from "@/components/fx/tilt";
import { Magnetic } from "@/components/fx/magnetic";
import { CountUp } from "@/components/fx/count-up";
import type { Product } from "@/lib/products";

const LINE1 = ["Gear", "for", "the", "road."];
const LINE2 = ["Before", "the", "road", "becomes", "a"];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } };
const word: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero({ product, stats }: { product: Product | null; stats: { products: number; guides: number; kits: number } }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yProduct = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <motion.div
        style={{ y: yText, opacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 pt-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-24"
      >
        <div className="max-w-xl">
          <motion.span variants={fade} className="eyebrow eyebrow-accent block">Car · Roadside · Backup power</motion.span>
          <h1 className="mt-5 font-display text-[3rem] font-semibold leading-[0.94] tracking-[-0.03em] text-ink-strong sm:text-6xl lg:text-[4.4rem]">
            <span className="block">
              {LINE1.map((w, i) => (
                <motion.span key={i} variants={word} className="mr-[0.24em] inline-block">{w}</motion.span>
              ))}
            </span>
            <span className="mt-1 block">
              {LINE2.map((w, i) => (
                <motion.span key={i} variants={word} className="mr-[0.24em] inline-block text-[0.62em] font-medium text-ink-dim">{w}</motion.span>
              ))}
              <motion.span variants={word} className="text-glow inline-block text-[0.62em] font-semibold text-accent">problem.</motion.span>
            </span>
          </h1>
          <motion.p variants={fade} className="mt-7 max-w-lg text-lg leading-relaxed text-ink-dim">
            The jump starters, inflators, dash cams, and power stations actually worth owning — chosen
            on merit, explained straight, and linked to the exact one to buy.
          </motion.p>
          <motion.div variants={fade} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link href="/guides" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-semibold text-on-accent shadow-[0_10px_40px_-8px_rgba(217,154,69,0.5)] transition-colors hover:bg-accent-strong">
                Read the buying guides
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12 H19 M13 6 L19 12 L13 18" /></svg>
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href="/gear" className="inline-flex items-center rounded-full border border-line-strong glass px-7 py-3.5 text-[0.95rem] font-semibold text-ink transition-colors hover:border-accent hover:text-accent">Shop the gear</Link>
            </Magnetic>
          </motion.div>
          <motion.div variants={fade} className="mt-10 flex gap-8">
            {[{ n: stats.products, s: "+", label: "verified picks" }, { n: stats.guides, s: "", label: "buying guides" }, { n: stats.kits, s: "", label: "gear kits" }].map((st) => (
              <div key={st.label}>
                <div className="nums font-display text-3xl font-semibold text-ink-strong"><CountUp to={st.n} suffix={st.s} /></div>
                <div className="mt-0.5 text-xs uppercase tracking-wide text-ink-dim">{st.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CENTERPIECE — the cinematic studio shot, framed and floating */}
        {product ? (
          <motion.div style={{ y: yProduct }} variants={fade} className="relative mx-auto w-full max-w-[27rem]">
            <div className="relative">
              <div className="glow-blob left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 opacity-85" />
              <Tilt max={10} className="relative">
                <div className="hero-float relative overflow-hidden rounded-[1.5rem] border border-line-strong shadow-[0_0_60px_-4px_rgba(217,154,69,0.30),0_0_120px_-10px_rgba(217,154,69,0.18),0_46px_90px_-34px_rgba(0,0,0,0.85)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt={product.name} className="block aspect-square w-full object-cover" />
                  <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/[0.08]" />
                </div>
              </Tilt>
            </div>
            <Link href={`/products/${product.id}`} className="group mx-auto mt-6 flex max-w-xs items-center justify-center gap-2.5 rounded-full glass px-5 py-2.5 text-sm transition-colors hover:border-accent">
              <span className="eyebrow eyebrow-accent">This week&rsquo;s pick</span>
              <span className="nums font-semibold text-accent">{product.priceRange}</span>
              <span className="text-accent transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
            </Link>
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
