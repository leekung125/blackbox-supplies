"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CategoryMeta, ComparableProduct, SpecFieldMeta } from "@/lib/comparison-schema";

export interface SortOption {
  id: string;
  label: string;
  /** short label used in the spotlight kicker, e.g. "Quietest". */
  crown?: string;
  /** spec key or "price"; absent → editor's original order. */
  key?: string;
  dir?: "asc" | "desc";
}

type SpecRec = Record<string, number | string | boolean | null | undefined>;

function valOf(p: ComparableProduct, key: string): number | string | boolean | null {
  if (key === "price") return p.price;
  const v = (p.specs as unknown as SpecRec)[key];
  return v === undefined ? null : v;
}

/** number + unit, "Yes/No", or enum label. */
function fmt(v: number | string | boolean | null, f?: SpecFieldMeta): string {
  if (v === null) return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "number") {
    const n = v >= 1000 ? v.toLocaleString() : `${v}`;
    return f?.unit ? `${n} ${f.unit}` : n;
  }
  return f?.enumLabels?.[v] ?? v;
}

/** split a numeric value into { num, unit } for the big stat treatment. */
function bigStat(v: number | null, f?: SpecFieldMeta) {
  if (v === null) return { num: "—", unit: "" };
  return { num: v >= 1000 ? v.toLocaleString() : `${v}`, unit: f?.unit ?? "" };
}

const REL = "sponsored nofollow noopener noreferrer";

/* ─────────────────────────────────────────────────── outbound CTA (one, big) */
function BuyButton({
  p,
  size = "md",
}: {
  p: ComparableProduct;
  size?: "md" | "lg";
}) {
  const pad = size === "lg" ? "px-6 py-3 text-[0.95rem]" : "px-5 py-2.5 text-sm";
  if (!p.affiliateUrl) {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-line-strong ${pad} font-semibold text-ink-faint`}
        title="We don't have a verified Amazon listing for this exact model yet — we won't link to a guess."
      >
        Verifying listing
      </span>
    );
  }
  return (
    <a
      href={p.affiliateUrl}
      target="_blank"
      rel={REL}
      onClick={() => track("product_outbound", { product: p.id, category: p.category, affiliate: true })}
      className={`group inline-flex items-center gap-2 rounded-full bg-accent ${pad} font-semibold text-on-accent shadow-[0_10px_30px_-12px_rgba(217,154,69,0.7)] transition-colors hover:bg-accent-strong`}
    >
      Check price on Amazon
      <svg
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M7 17 L17 7 M9 7 h8 v8" />
      </svg>
    </a>
  );
}

/* ─────────────────────────────────────── product media: photo or typographic tile */
function Media({
  p,
  headline,
  sizes,
  className = "",
}: {
  p: ComparableProduct;
  headline?: string;
  sizes: string;
  className?: string;
}) {
  if (p.image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={p.image} alt={p.name} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div className={`cutout-tile relative flex flex-col items-center justify-center gap-1 px-4 text-center ${className}`}>
      <span className="mono text-[0.66rem] uppercase tracking-[0.16em] text-accent-bright">{p.brand}</span>
      {headline ? (
        <span className="nums font-display text-2xl font-semibold leading-none text-ink-strong">{headline}</span>
      ) : null}
      <span className="mono mt-1 text-[0.54rem] uppercase tracking-[0.12em] text-ink-faint">photo coming</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── expandable detail */
function Detail({
  p,
  meta,
  columns,
}: {
  p: ComparableProduct;
  meta: CategoryMeta;
  columns: string[];
}) {
  return (
    <div className="mt-4 rounded-xl border border-line bg-[#0f0b07] p-4">
      <div className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
        {columns.map((key) => {
          const f = meta.fields[key];
          if (!f) return null;
          const v = valOf(p, key);
          const un = p.unverified?.includes(key);
          return (
            <div key={key} className="flex items-baseline justify-between gap-3 border-b border-line-soft py-1.5">
              <span className="mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-faint" title={f.tooltip}>
                {f.label}
              </span>
              <span className="nums text-[0.82rem] font-semibold text-ink">
                {fmt(v, f)}
                {un && v !== null ? <span className="ml-0.5 text-ink-faint" title="Estimated / not officially published">~</span> : null}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <span className="mono text-[0.6rem] uppercase tracking-[0.12em] text-pine">Strengths</span>
          <ul className="mt-2 space-y-1.5">
            {p.pros.map((pro) => (
              <li key={pro} className="flex gap-2 text-[0.85rem] leading-snug text-ink-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-pine" aria-hidden />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="mono text-[0.6rem] uppercase tracking-[0.12em] text-accent-strong">Trade-offs</span>
          <ul className="mt-2 space-y-1.5">
            {p.cons.map((con) => (
              <li key={con} className="flex gap-2 text-[0.85rem] leading-snug text-ink-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────── the board */
export function ComparisonBoard({
  products,
  meta,
  sorts,
}: {
  products: ComparableProduct[];
  meta: CategoryMeta;
  sorts: SortOption[];
}) {
  const reduce = useReducedMotion();
  const [sortId, setSortId] = useState(sorts[0]?.id ?? "rank");
  const [openId, setOpenId] = useState<string | null>(null);

  const numericCols = useMemo(
    () => meta.columns.filter((k) => meta.fields[k]?.type === "number"),
    [meta],
  );
  const heroKeys = numericCols.slice(0, 3); // the up-to-3 signature figures

  const activeSort = sorts.find((s) => s.id === sortId);
  const sorted = useMemo(() => {
    if (!activeSort?.key) return products;
    const { key, dir = "desc" } = activeSort;
    return [...products].sort((a, b) => {
      const av = valOf(a, key);
      const bv = valOf(b, key);
      const an = typeof av === "number" ? av : null;
      const bn = typeof bv === "number" ? bv : null;
      if (an === null && bn === null) return 0;
      if (an === null) return 1;
      if (bn === null) return -1;
      return dir === "asc" ? an - bn : bn - an;
    });
  }, [products, activeSort]);

  const [hero, ...rest] = sorted;
  const crown = activeSort?.crown ?? "Editor's choice";

  return (
    <div>
      {/* the one simple knob */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mono mr-1 text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">Show me the</span>
        {sorts.map((s) => {
          const active = s.id === sortId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSortId(s.id)}
              aria-pressed={active}
              className={`rounded-full px-4 py-1.5 text-[0.82rem] font-semibold transition-colors ${
                active
                  ? "bg-accent text-on-accent"
                  : "border border-line-strong bg-surface text-ink-2 hover:border-accent/50 hover:text-ink"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* ── SPOTLIGHT — the beautiful focal pick ─────────────────────────────── */}
      {hero ? (
        <motion.div
          key={hero.id}
          layout={!reduce}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-6 overflow-hidden rounded-3xl border border-accent/30 bg-surface"
        >
          <div className="bbx-aurora absolute inset-0" aria-hidden />
          <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
            {/* image stage */}
            <div className="relative flex items-center justify-center">
              <div className="glow-blob absolute h-56 w-56 opacity-70" aria-hidden />
              <Media
                p={hero}
                headline={bigStat(typeof valOf(hero, heroKeys[0]) === "number" ? (valOf(hero, heroKeys[0]) as number) : null, meta.fields[heroKeys[0]]).num}
                sizes="(min-width: 1024px) 30rem, 90vw"
                className={`relative aspect-square w-full max-w-sm rounded-2xl border border-line ${reduce ? "" : "hero-float"}`}
              />
            </div>

            {/* content */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mono text-[0.66rem] font-bold uppercase tracking-[0.16em] text-accent-bright">
                  ★ {crown}
                </span>
                {hero.role ? (
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-on-accent">
                    {hero.role}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-[1.1] text-ink-strong sm:text-[1.9rem]">
                {hero.name}
              </h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">{hero.bestFor}</p>

              {/* big stats */}
              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
                {heroKeys.map((key) => {
                  const f = meta.fields[key];
                  const raw = valOf(hero, key);
                  if (f === undefined || typeof raw !== "number") return null;
                  const { num, unit } = bigStat(raw, f);
                  return (
                    <div key={key}>
                      <div className="nums font-display text-3xl font-semibold leading-none text-accent-bright">
                        {num}
                        {unit ? <span className="ml-1 text-base font-medium text-ink-dim">{unit}</span> : null}
                      </div>
                      <div className="mono mt-1.5 text-[0.6rem] uppercase tracking-[0.1em] text-ink-faint">
                        {f.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="nums font-display text-xl font-semibold text-ink-strong">
                  {hero.priceRange ?? `$${hero.price}`}
                </span>
                <BuyButton p={hero} size="lg" />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}

      {/* ── THE LINEUP — clean product gallery ───────────────────────────────── */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <AnimatePresence initial={false} mode="popLayout">
          {rest.map((p) => {
            const open = openId === p.id;
            return (
              <motion.article
                key={p.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bbx-card card-lift flex flex-col overflow-hidden"
              >
                <Media
                  p={p}
                  headline={bigStat(typeof valOf(p, heroKeys[0]) === "number" ? (valOf(p, heroKeys[0]) as number) : null, meta.fields[heroKeys[0]]).num}
                  sizes="(min-width: 640px) 24rem, 100vw"
                  className="aspect-[16/10] w-full border-b border-line"
                />

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  {p.role ? (
                    <span className="mono w-fit text-[0.6rem] font-bold uppercase tracking-[0.12em] text-accent-strong">
                      {p.role}
                    </span>
                  ) : null}
                  <h3 className="mt-1.5 font-display text-[1.05rem] font-semibold leading-snug text-ink-strong">
                    {p.name}
                  </h3>

                  {/* two signature figures — compact, not a data wall */}
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                    {heroKeys.slice(0, 2).map((key) => {
                      const f = meta.fields[key];
                      const raw = valOf(p, key);
                      if (f === undefined || typeof raw !== "number") return null;
                      const { num, unit } = bigStat(raw, f);
                      return (
                        <div key={key} className="flex items-baseline gap-1.5">
                          <span className="nums font-display text-lg font-semibold text-accent-bright">{num}</span>
                          <span className="text-[0.7rem] text-ink-dim">{unit}</span>
                          <span className="mono text-[0.56rem] uppercase tracking-[0.08em] text-ink-faint">{f.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                    <span className="nums font-display text-lg font-semibold text-ink-strong">
                      {p.priceRange ?? `$${p.price}`}
                    </span>
                    <BuyButton p={p} />
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : p.id)}
                    aria-expanded={open}
                    className="mt-3 inline-flex items-center gap-1.5 self-start text-[0.78rem] font-semibold text-accent transition-colors hover:text-accent-strong"
                  >
                    {open ? "Hide specs" : "Full specs & verdict"}
                    <svg
                      className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
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
                        key="d"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <Detail p={p} meta={meta} columns={meta.columns} />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      <p className="mt-5 text-[0.72rem] leading-relaxed text-ink-faint">
        Ranked from manufacturer specs, DOE/SACC data, and independent lab reviews. A “~” marks an
        estimated or unpublished figure — we never invent one. As an Amazon Associate, BlackBox earns
        from qualifying purchases, at no extra cost to you.
      </p>
    </div>
  );
}
