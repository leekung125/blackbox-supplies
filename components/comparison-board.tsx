"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CategoryMeta, ComparableProduct } from "@/lib/comparison-schema";
import { getOwnerEvidence } from "@/lib/owner-evidence";
import {
  valOf,
  fmtSpec,
  heroStat,
  resolveHeroKeys,
  resolveHero,
  isDeadSort,
  maxForKey,
  barKeyFor,
} from "@/components/guide/board-utils";

export interface SortOption {
  id: string;
  label: string;
  /** short label used in the spotlight kicker, e.g. "Quietest". */
  crown?: string;
  /** spec key or "price"; absent → editor's original order. */
  key?: string;
  dir?: "asc" | "desc";
}

const REL = "sponsored nofollow noopener noreferrer";

/* ─────────────────────────────────────────────────── outbound CTA (one, big) */
function BuyButton({
  p,
  size = "md",
  where = "gallery",
}: {
  p: ComparableProduct;
  size?: "md" | "lg";
  where?: "spotlight" | "gallery";
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
      onClick={() => track("product_outbound", { product: p.id, category: p.category, where, affiliate: true })}
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
      {headline && headline !== "—" ? (
        <span className="nums font-display text-2xl font-semibold leading-none text-ink-strong">{headline}</span>
      ) : null}
      <span className="mono mt-1 text-[0.54rem] uppercase tracking-[0.12em] text-ink-faint">photo coming</span>
    </div>
  );
}

/* ───────────────────────── one big signature figure (number / enum / bool aware) */
function BigStat({
  p,
  keyName,
  meta,
  size,
}: {
  p: ComparableProduct;
  keyName: string;
  meta: CategoryMeta;
  size: "spotlight" | "card";
}) {
  const f = meta.fields[keyName];
  const raw = valOf(p, keyName);
  const { value, unit } = heroStat(p, keyName, meta);
  if (value === "—") return null;
  const isNum = typeof raw === "number";
  if (size === "spotlight") {
    return (
      <div>
        <div
          className={`nums font-display font-semibold leading-none text-accent-bright ${isNum ? "text-3xl" : "text-2xl"}`}
        >
          {value}
          {unit ? <span className="ml-1 text-base font-medium text-ink-dim">{unit}</span> : null}
        </div>
        <div className="mono mt-1.5 text-[0.6rem] uppercase tracking-[0.1em] text-ink-faint">{f?.label ?? keyName}</div>
      </div>
    );
  }
  return (
    <div className="flex items-baseline gap-1.5">
      <span className={`nums font-display font-semibold text-accent-bright ${isNum ? "text-lg" : "text-base"}`}>
        {value}
      </span>
      {unit ? <span className="text-[0.7rem] text-ink-dim">{unit}</span> : null}
      <span className="mono text-[0.56rem] uppercase tracking-[0.08em] text-ink-faint">{f?.label ?? keyName}</span>
    </div>
  );
}

/* ─────────────────────── real data-viz bar for the single decisive numeric spec */
function SpecBar({
  p,
  barKey,
  max,
  meta,
}: {
  p: ComparableProduct;
  barKey: string;
  max: number;
  meta: CategoryMeta;
}) {
  const f = meta.fields[barKey];
  const raw = valOf(p, barKey);
  if (typeof raw !== "number" || max <= 0) return null;
  const pct = Math.max(6, Math.round((raw / max) * 100));
  const leads = raw >= max;
  const un = p.unverified?.includes(barKey);
  return (
    <div className="mt-3">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="mono text-[0.56rem] uppercase tracking-[0.1em] text-ink-faint">{f?.label ?? barKey}</span>
        <span className="nums text-[0.72rem] font-semibold text-ink-2">
          {fmtSpec(raw, f)}
          {un ? <span className="ml-0.5 text-ink-faint" title="Estimated / not officially published">~</span> : null}
          {leads ? <span className="pill-amber ml-2 !py-0 !px-1.5 !text-[0.5rem]">Leads</span> : null}
        </span>
      </div>
      <div className="spec-track">
        <div
          className="spec-fill"
          style={{ width: `${pct}%`, opacity: leads ? 1 : 0.62, boxShadow: leads ? undefined : "none" }}
        />
      </div>
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
                {fmtSpec(v, f)}
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
      <OwnerReportStrip id={p.id} />
    </div>
  );
}

/* Condensed owner-evidence inside the expand — real cited owner data per product (renders only where we have it). */
function OwnerReportStrip({ id }: { id: string }) {
  const oe = getOwnerEvidence(id);
  if (!oe) return null;
  return (
    <div className="mt-4 border-t border-line-soft pt-3.5">
      <span className="mono text-[0.6rem] uppercase tracking-[0.12em] text-accent-strong">What owners actually report</span>
      {oe.realWorldNumbers.length ? (
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
          {oe.realWorldNumbers.slice(0, 3).map((n) => (
            <span key={n.label} className="text-[0.8rem]">
              <span className="nums font-semibold text-ink">{n.value}</span>
              <span className="text-ink-faint"> · {n.label}</span>
            </span>
          ))}
        </div>
      ) : null}
      {oe.failureModes[0] ? (
        <p className="mt-2 text-[0.82rem] leading-snug text-ink-2">
          <span className="font-semibold text-ink">Most-reported issue:</span> {oe.failureModes[0].mode} — {oe.failureModes[0].note}
        </p>
      ) : null}
      <p className="mono mt-2 text-[0.55rem] uppercase tracking-[0.1em] text-ink-faint">Aggregated from owner reviews — not our own test</p>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────── the board */
export function ComparisonBoard({
  products,
  meta,
  sorts,
  sortId: sortIdProp,
  onSortChange,
}: {
  products: ComparableProduct[];
  meta: CategoryMeta;
  sorts: SortOption[];
  /** Controlled active sort id (kept in sync with the sticky decision summary). Optional. */
  sortId?: string;
  onSortChange?: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  const [sortIdInternal, setSortIdInternal] = useState(sorts[0]?.id ?? "rank");
  const sortId = sortIdProp ?? sortIdInternal;
  const setSort = (id: string) => {
    onSortChange?.(id);
    if (sortIdProp === undefined) setSortIdInternal(id);
  };
  const [openId, setOpenId] = useState<string | null>(null);

  const heroKeys = useMemo(() => resolveHeroKeys(meta), [meta]);
  const deadIds = useMemo(
    () => new Set(sorts.filter((s) => isDeadSort(products, s)).map((s) => s.id)),
    [products, sorts],
  );
  const barKey = useMemo(() => barKeyFor(meta, products), [meta, products]);
  const barMax = useMemo(() => (barKey ? maxForKey(products, barKey) : null), [barKey, products]);

  const { activeSort, hero, rest } = useMemo(() => resolveHero(products, sorts, sortId), [products, sorts, sortId]);
  const crown = activeSort?.crown ?? "Editor's choice";

  return (
    <div>
      {/* the one simple knob */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mono mr-1 text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">Show me the</span>
        {sorts.map((s) => {
          const active = s.id === sortId;
          const dead = deadIds.has(s.id);
          if (dead) {
            return (
              <span
                key={s.id}
                aria-disabled
                title="Not enough published data to rank honestly — most units don't list this figure."
                className="cursor-not-allowed rounded-full border border-line px-4 py-1.5 text-[0.82rem] font-semibold text-ink-faint/60 line-through decoration-ink-faint/40"
              >
                {s.label}
              </span>
            );
          }
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setSort(s.id);
                track("compare_sort", { category: meta.label, sort: s.id });
              }}
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
          id={`pick-${hero.id}`}
          className="lit-card grad-border-amber focal-glow relative mt-6 scroll-mt-28 overflow-hidden"
        >
          <div className="bbx-aurora absolute inset-0" aria-hidden />
          <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
            {/* image stage */}
            <div className="relative flex items-center justify-center">
              <div className="glow-amber absolute h-56 w-56 opacity-80" aria-hidden />
              <Media
                p={hero}
                headline={heroStat(hero, heroKeys[0], meta).value}
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

              {/* big signature stats */}
              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
                {heroKeys.map((key) => (
                  <BigStat key={key} p={hero} keyName={key} meta={meta} size="spotlight" />
                ))}
              </div>

              {/* the decisive spec, drawn as a real bar against the field */}
              {barKey && barMax ? <SpecBar p={hero} barKey={barKey} max={barMax} meta={meta} /> : null}

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="nums font-display text-xl font-semibold text-ink-strong">
                  {hero.priceRange ?? `$${hero.price}`}
                </span>
                <BuyButton p={hero} size="lg" where="spotlight" />
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
                id={`pick-${p.id}`}
                className="bbx-card card-lift flex scroll-mt-28 flex-col overflow-hidden"
              >
                <Media
                  p={p}
                  headline={heroStat(p, heroKeys[0], meta).value}
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
                    {heroKeys.slice(0, 2).map((key) => (
                      <BigStat key={key} p={p} keyName={key} meta={meta} size="card" />
                    ))}
                  </div>

                  {/* decisive spec bar — the visual at-a-glance ranking */}
                  {barKey && barMax ? <SpecBar p={p} barKey={barKey} max={barMax} meta={meta} /> : null}

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                    <span className="nums font-display text-lg font-semibold text-ink-strong">
                      {p.priceRange ?? `$${p.price}`}
                    </span>
                    <BuyButton p={p} where="gallery" />
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

      <p className="mt-5 text-[0.72rem] leading-relaxed text-ink-dim">
        Ranked from manufacturer specs, standardized test ratings where they exist, and independent
        reviews. A “~” marks an
        estimated or unpublished figure — we never invent one. As an Amazon Associate, BlackBox earns
        from qualifying purchases, at no extra cost to you.
      </p>
    </div>
  );
}
