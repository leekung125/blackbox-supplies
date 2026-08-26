"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import type { Product } from "@/lib/products";
import { getOutboundLink, outboundRel } from "@/lib/product-link";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";

/* ============================================================================
   KIT BUILDER — an interactive loadout tier switcher for /kits pages.
   The reader toggles STARTER · BETTER · PREMIUM; the product grid, the live
   price band, and the "what you get" line recompute with smooth animation.

   Design: "a premium gear magazine at night, lit by ONE amber lamp."
   The active tier is the lit object; everything else recedes into warm dark.
   All motion is guarded by useReducedMotion.
============================================================================ */

export interface KitTierProduct {
  id: string;
  name: string;
  category: string;
  /** Approximate price, e.g. "$70–$90" or "$120". Parsed for the live band. */
  priceRange: string;
  image?: string;
  verdict?: string;
  affiliateUrl?: string;
  role?: "must-have" | "upgrade" | "optional";
}

export interface KitBuilderProps {
  /** The one thing to buy first — always shown, highlighted as the hero. */
  buyFirst: KitTierProduct;
  /** Start-here essentials. */
  starter: KitTierProduct[];
  /** Upgrades to add for coverage + convenience. */
  better: KitTierProduct[];
  /** Do-it-right, no-compromise additions. */
  premium: KitTierProduct[];
  /** Optional: short strings of things to skip for now. */
  toSkip?: string[];
  /** Optional: honest mistakes people make with this kind of gear. */
  commonMistakes?: string[];
}

/* ─────────────────────────────────────────────────── tier model */

type TierId = "starter" | "better" | "premium";

const TIERS: ReadonlyArray<{ id: TierId; label: string; blurb: string }> = [
  { id: "starter", label: "Starter", blurb: "The essentials to solve the problem." },
  { id: "better", label: "Better", blurb: "Add coverage and convenience." },
  { id: "premium", label: "Premium", blurb: "The do-it-right, no-compromise loadout." },
];

const ROLE_LABEL: Record<NonNullable<KitTierProduct["role"]>, string> = {
  "must-have": "Must-have",
  upgrade: "Upgrade",
  optional: "Optional",
};

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────── price parsing */

/** Extract the low/high from a price string like "$70–$90", "$1,299", "$50-70". */
function parseBand(range: string): { low: number; high: number } {
  const nums = range.match(/\d[\d,]*(?:\.\d+)?/g);
  if (!nums || nums.length === 0) return { low: 0, high: 0 };
  const vals = nums.map((n) => parseFloat(n.replace(/,/g, "")));
  return { low: vals[0], high: vals.length > 1 ? vals[vals.length - 1] : vals[0] };
}

/** Sum the lows and the highs across every shown product. */
function sumBand(products: KitTierProduct[]): { low: number; high: number } {
  return products.reduce(
    (acc, p) => {
      const b = parseBand(p.priceRange);
      return { low: acc.low + b.low, high: acc.high + b.high };
    },
    { low: 0, high: 0 },
  );
}

/* ─────────────────────────────────────────────────── animated count-up */

function CountUp({ value, reduce }: { value: number; reduce: boolean }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (reduce || prev.current === value) {
      setDisplay(value);
      prev.current = value;
      return;
    }
    const controls = animate(prev.current, value, {
      duration: 0.55,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, reduce]);

  return <>{`$${Math.round(display).toLocaleString()}`}</>;
}

/* ─────────────────────────────────────────────────── shared bits */

function ArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 L17 7 M9 7 h8 v8" />
    </svg>
  );
}

/** Product media: photo via next/image, else a .pill-amber brand tile. */
function KitMedia({ p, sizes }: { p: KitTierProduct; sizes: string }) {
  if (p.image) {
    const cover = p.image.includes("/shot-");
    return (
      <div className={`relative h-full w-full ${cover ? "bg-[#0c0906]" : "cutout-tile"}`}>
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes={sizes}
          className={
            cover
              ? "object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.05]"
              : "cutout-shadow object-contain p-5 transition-transform duration-[650ms] ease-out group-hover:scale-[1.05]"
          }
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.05]" />
      </div>
    );
  }
  return (
    <div className="cutout-tile relative flex h-full w-full flex-col items-center justify-center gap-2.5 p-4 text-center">
      <span className="pill-amber">{p.category}</span>
      <span className="line-clamp-2 font-display text-sm font-semibold leading-snug text-ink-strong">{p.name}</span>
    </div>
  );
}

/** Outbound "Check price on Amazon" — resolved through the shared product link rule. */
function BuyCta({ p, hero = false }: { p: KitTierProduct; hero?: boolean }) {
  // Products flow in as full catalog records; getOutboundLink falls back to the plain
  // Amazon URL when no affiliate link is set, so a live product always has a destination.
  const { href, isAffiliate } = getOutboundLink(p as unknown as Product);
  if (!href) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-[0.8rem] font-semibold text-ink-faint"
        title="We don't have a verified Amazon listing for this exact model yet."
      >
        Verifying listing
      </span>
    );
  }
  if (hero) {
    return (
      <a href={href} target="_blank" rel={outboundRel(isAffiliate)} className="cta-amber group text-[0.95rem]">
        Check price on Amazon
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    );
  }
  return (
    <>
    <a
      href={href}
      target="_blank"
      rel={outboundRel(isAffiliate)}
      className="group/btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[0.8rem] font-semibold text-on-accent transition-colors hover:bg-accent-strong"
    >
      Check price
      <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
    </a>
    {/* ⛔ FTC disclosure adjacent to the monetised CTA (the kit pages had it ~300 words away). */}
    <AffiliateDisclosure variant="compact" className="ml-2" />
    </>
  );
}

/* ─────────────────────────────────────────────────── product card */

function ProductCard({ p, reduce }: { p: KitTierProduct; reduce: boolean }) {
  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.2 } }}
      transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
      className="lit-card lift group flex h-full flex-col overflow-hidden"
    >
      <Link href={`/products/${p.id}`} className="relative block aspect-square overflow-hidden rounded-t-2xl">
        <KitMedia p={p} sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw" />
        {p.role ? (
          <span
            className={
              p.role === "must-have"
                ? "absolute left-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-on-accent shadow-md shadow-black/40"
                : "pill-amber absolute left-3 top-3 z-10"
            }
          >
            {ROLE_LABEL[p.role]}
          </span>
        ) : null}
        <span className="nums absolute right-3 top-3 z-10 rounded-full bg-dark/80 px-2.5 py-1 text-xs font-semibold text-on-dark ring-1 ring-white/10 backdrop-blur-sm">
          {p.priceRange}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="eyebrow">{p.category}</span>
        <h3 className="mt-1.5 font-display text-[1.02rem] font-semibold leading-snug text-ink-strong">
          <Link href={`/products/${p.id}`} className="line-clamp-2 transition-colors hover:text-accent">
            {p.name}
          </Link>
        </h3>
        {p.verdict ? (
          <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-dim">{p.verdict}</p>
        ) : (
          <span className="flex-1" />
        )}

        <div className="mt-3.5 flex items-center gap-3">
          <BuyCta p={p} />
          <Link href={`/products/${p.id}`} className="ulink shrink-0 text-xs font-semibold">
            Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────── the builder */

export function KitBuilder({ buyFirst, starter, better, premium, toSkip, commonMistakes }: KitBuilderProps) {
  const reduce = !!useReducedMotion();
  const [tier, setTier] = useState<TierId>("starter");

  // Dedupe: a product appears once, in its earliest tier; buyFirst is never in the grid.
  const { s, b, p2 } = useMemo(() => {
    const seen = new Set<string>([buyFirst.id]);
    const take = (arr: KitTierProduct[]) => {
      const out: KitTierProduct[] = [];
      for (const x of arr) {
        if (!seen.has(x.id)) {
          seen.add(x.id);
          out.push(x);
        }
      }
      return out;
    };
    return { s: take(starter), b: take(better), p2: take(premium) };
  }, [buyFirst.id, starter, better, premium]);

  const visible = useMemo(() => {
    if (tier === "starter") return s;
    if (tier === "better") return [...s, ...b];
    return [...s, ...b, ...p2];
  }, [tier, s, b, p2]);

  const band = useMemo(() => sumBand([buyFirst, ...visible]), [buyFirst, visible]);
  const premiumBand = useMemo(() => sumBand([buyFirst, ...s, ...b, ...p2]), [buyFirst, s, b, p2]);
  const pct = premiumBand.high > 0 ? Math.min(100, Math.round((band.high / premiumBand.high) * 100)) : 100;

  const active = TIERS.find((t) => t.id === tier) ?? TIERS[0];
  const itemCount = visible.length + 1; // + buyFirst

  return (
    <section className="not-prose">
      {/* ── header + segmented tier control ─────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow eyebrow-accent">Kit builder</span>
          <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink-strong sm:text-3xl">
            Choose your tier
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Kit tier"
          className="flex w-full gap-1 overflow-x-auto rounded-full border border-line bg-surface-2 p-1 sm:w-auto"
        >
          {TIERS.map((t) => {
            const on = t.id === tier;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTier(t.id)}
                className={`relative min-h-[44px] flex-1 whitespace-nowrap rounded-full px-5 text-sm font-semibold transition-colors sm:flex-none ${
                  on ? "text-on-accent" : "text-ink-dim hover:text-ink"
                }`}
              >
                {on ? (
                  <motion.span
                    layoutId="kb-tier-pill"
                    className="absolute inset-0 rounded-full bg-accent shadow-[0_6px_20px_-8px_rgba(217,154,69,0.8)]"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden
                  />
                ) : null}
                <span className="relative z-10">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── summary panel: what you get + live price band ────────────────────── */}
      <div className="lit-card grad-border relative mt-5 grid gap-5 overflow-hidden rounded-2xl p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
        {/* the lamp sits behind the est-total — the one lit number in the panel */}
        <div aria-hidden className="glow-amber pointer-events-none -top-[30%] right-[-6%] h-[160%] w-[46%] opacity-70" />
        <div className="relative min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tier}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
            >
              <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-bright">
                {active.label} loadout
              </span>
              <p className="mt-1 text-[0.98rem] leading-relaxed text-ink-dim">{active.blurb}</p>
            </motion.div>
          </AnimatePresence>

          {/* price-band bar — this tier's high relative to the full premium build */}
          <div className="spec-track mt-4 max-w-sm" role="presentation">
            <motion.div
              className="spec-fill"
              style={reduce ? { width: `${pct}%` } : undefined}
              animate={reduce ? undefined : { width: `${pct}%` }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
        </div>

        <div className="relative shrink-0 sm:text-right">
          <div className="mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint">Est. total</div>
          <div className="nums tabular font-display text-3xl font-semibold leading-none text-accent-bright text-glow sm:text-[2.4rem]">
            <CountUp value={band.low} reduce={reduce} />
            {band.high !== band.low ? (
              <>
                <span className="mx-0.5 text-ink-faint">–</span>
                <CountUp value={band.high} reduce={reduce} />
              </>
            ) : null}
          </div>
          <div className="mono mt-1.5 text-[0.6rem] uppercase tracking-[0.12em] text-ink-faint">
            {itemCount} {itemCount === 1 ? "item" : "items"} · approx
          </div>
        </div>
      </div>

      {/* ── buy this first — the always-shown hero ───────────────────────────── */}
      <div className="grad-border-amber lit-card focal-glow relative mt-8 overflow-hidden rounded-2xl">
        <div aria-hidden className="glow-amber pointer-events-none right-[4%] top-[-16%] hidden h-[95%] w-[36%] opacity-55 sm:block" />
        <div className="relative flex flex-col sm:flex-row">
          <Link
            href={`/products/${buyFirst.id}`}
            className="group relative aspect-[16/11] w-full shrink-0 overflow-hidden sm:aspect-square sm:w-64"
          >
            <KitMedia p={buyFirst} sizes="(min-width: 640px) 16rem, 90vw" />
          </Link>
          <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-accent px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-on-accent">
                Buy this first
              </span>
              <span className="eyebrow">{buyFirst.category}</span>
            </div>
            <h3 className="mt-2.5 font-display text-2xl font-semibold leading-tight text-ink-strong">
              <Link href={`/products/${buyFirst.id}`} className="transition-colors hover:text-accent-bright">
                {buyFirst.name}
              </Link>
            </h3>
            {buyFirst.verdict ? (
              <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">{buyFirst.verdict}</p>
            ) : null}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <span className="nums font-display text-xl font-semibold text-ink-strong">{buyFirst.priceRange}</span>
              <BuyCta p={buyFirst} hero />
              <Link href={`/products/${buyFirst.id}`} className="ulink text-sm font-semibold">
                Full details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── the tier grid — items animate in as the tier grows ───────────────── */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((p) => (
            <ProductCard key={p.id} p={p} reduce={reduce} />
          ))}
        </AnimatePresence>
      </div>

      {/* ── common mistakes ──────────────────────────────────────────────────── */}
      {commonMistakes && commonMistakes.length > 0 ? (
        <div className="lit-card grad-border mt-8 rounded-xl p-5 sm:p-6">
          <span className="eyebrow eyebrow-accent">Common mistakes</span>
          <ul className="mt-3 flex flex-col gap-2.5">
            {commonMistakes.map((m) => (
              <li key={m} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-ink-2">
                <span className="mt-[0.3rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* ── skip for now ─────────────────────────────────────────────────────── */}
      {toSkip && toSkip.length > 0 ? (
        <div className="lit-card grad-border mt-8 rounded-xl p-4 sm:p-5">
          <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-faint">Skip for now</span>
          <ul className="mt-3 flex flex-wrap gap-2">
            {toSkip.map((skip) => (
              <li
                key={skip}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3 py-1.5 text-[0.8rem] text-ink-dim"
              >
                <span className="text-ink-faint" aria-hidden>
                  ×
                </span>
                {skip}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-6 text-xs leading-relaxed text-ink-dim">
        Prices are approximate — confirm the current price on Amazon. Outbound links are Amazon affiliate links; as an
        Amazon Associate, BlackBox Supplies earns from qualifying purchases, at no extra cost to you.
      </p>
    </section>
  );
}

export default KitBuilder;
