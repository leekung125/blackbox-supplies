"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { FaqItem } from "@/lib/comparison-guides";

/**
 * Buyer FAQ accordion — the honest "what people actually ask before buying" block. Motion is
 * reduced-motion guarded; the FAQPage JSON-LD is emitted separately (server) so this stays a pure
 * presentational island. One panel open at a time; first is open by default so the section reads.
 */
export function GuideFaq({ faq }: { faq: FaqItem[] }) {
  const reduce = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section className="mt-14">
      <span className="eyebrow eyebrow-accent">Before you buy</span>
      <h2 className="section-title mt-2">Common questions</h2>

      <div className="mt-5 space-y-3">
        {faq.map((item, i) => {
          const open = openIdx === i;
          return (
            <div key={item.q} className={`lit-card rounded-2xl ${open ? "grad-border-amber" : ""}`}>
              <button
                type="button"
                onClick={() => setOpenIdx(open ? -1 : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display text-[1.05rem] font-semibold leading-snug text-ink-strong">
                  {item.q}
                </span>
                <svg
                  className={`h-4 w-4 shrink-0 text-accent transition-transform ${open ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M6 9 L12 15 L18 9" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    key="a"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-[0.96rem] leading-relaxed text-ink-2">{item.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
