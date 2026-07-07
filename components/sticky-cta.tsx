"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { getOutboundLink, outboundRel, type Product } from "@/lib/products";

/** The page places this id right after the main in-page buy CTA; the bar keys off it. */
const ANCHOR_ID = "sticky-cta-anchor";

/**
 * Premium mobile buy bar (hidden on lg+ where a desktop CTA is already in view).
 * Slides up only once the reader scrolls PAST the main in-page CTA, and retreats
 * again near the top. Warm glass, a hairline top border with a faint amber glow,
 * iOS safe-area padding, and one big amber "Check price on Amazon" pill.
 *
 * Uses an IntersectionObserver on a lightweight anchor the page drops right below
 * its primary CTA — no scroll-thrash, INP-safe (state only flips on crossing).
 */
export function StickyCta({ product }: { product: Product }) {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const anchor = document.getElementById(ANCHOR_ID);
    if (!anchor) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // Reveal only when the anchor has scrolled up out of view (past the CTA),
        // never when it sits below the fold near the top of the page.
        setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 0 },
    );
    io.observe(anchor);
    return () => io.disconnect();
  }, []);

  const { href, isAffiliate } = getOutboundLink(product);
  if (!href) return null;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={reduce ? { opacity: 0 } : { y: "110%", opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "110%", opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.6rem)",
            paddingTop: "0.6rem",
            background: "rgba(19,15,9,0.78)",
            backdropFilter: "blur(18px) saturate(1.2)",
            WebkitBackdropFilter: "blur(18px) saturate(1.2)",
            borderTop: "1px solid rgba(217,154,69,0.22)",
            boxShadow: "0 -10px 40px -18px rgba(0,0,0,0.85)",
          }}
        >
          {/* hairline amber glow riding the top edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-px h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(217,154,69,0.65) 30%, rgba(237,186,102,0.9) 50%, rgba(217,154,69,0.65) 70%, transparent)",
            }}
          />
          {/* soft aura bleeding up from the edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-10"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 0%, rgba(217,154,69,0.12), transparent 72%)",
            }}
          />

          <div className="relative mx-auto flex max-w-3xl items-center gap-3 px-4">
            {/* thumbnail */}
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line-strong bg-gradient-to-b from-[#221a11] to-[#100c07]">
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-accent-bright">
                  {product.brand?.slice(0, 3) || "BBX"}
                </span>
              )}
            </span>

            {/* name + price */}
            <div className="min-w-0 flex-1">
              <p className="mono text-[0.56rem] uppercase tracking-[0.16em] text-accent-strong">
                Top pick
              </p>
              <p className="mt-0.5 flex items-baseline gap-1.5 leading-tight">
                <span className="truncate text-[0.82rem] font-semibold text-ink-strong">
                  {product.name}
                </span>
                {product.priceRange ? (
                  <span className="nums shrink-0 text-[0.78rem] font-medium text-ink-dim">
                    {product.priceRange}
                  </span>
                ) : null}
              </p>
            </div>

            {/* the amber pill */}
            <a
              href={href}
              target="_blank"
              rel={outboundRel(isAffiliate)}
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-[0.82rem] font-semibold text-on-accent shadow-[0_10px_30px_-12px_rgba(217,154,69,0.8)] transition-colors hover:bg-accent-strong"
            >
              <span className="sm:hidden">Check price</span>
              <span className="hidden sm:inline">Check price on Amazon</span>
              <svg
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 17 L17 7 M9 7 h8 v8" />
              </svg>
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
