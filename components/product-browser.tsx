"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES } from "@/lib/categories";
import type { Category, Product } from "@/lib/products";

/* ── verticals ─────────────────────────────────────────────────────────────
   The three cross-catalog lanes. A product's vertical is derived from its
   category, so a single flat catalog resolves into Cooling / Car / Useful. */
type VerticalId = "all" | "cooling" | "car" | "useful";

const COOLING_CATS = new Set<string>([
  "Portable AC",
  "Cooling Fans",
  "Personal Cooling",
  "Cooling Sleep",
  "Dorm Cooling",
]);
const CAR_CATS = new Set<string>([
  "Jump Starters",
  "Tire Inflators",
  "Dash Cams",
  "Power & Charging",
  "Roadside Safety",
  "Car Utility",
]);

function verticalOf(p: Product): Exclude<VerticalId, "all"> {
  const c = p.category as string;
  if (COOLING_CATS.has(c)) return "cooling";
  if (CAR_CATS.has(c)) return "car";
  return "useful";
}

const VERTICALS: { id: VerticalId; label: string }[] = [
  { id: "all", label: "All gear" },
  { id: "cooling", label: "Cooling" },
  { id: "useful", label: "Useful" },
  { id: "car", label: "Car & roadside" },
];

type CatFilter = Category | "all";
type SortId = "featured" | "asc" | "desc";

const SORTS: { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "asc", label: "Price: low → high" },
  { id: "desc", label: "Price: high → low" },
];

/** Parse the low number out of a priceRange like "$80–$100", "$1,299", or "$23/hr". */
function priceLow(p: Product): number {
  const m = p.priceRange?.match(/\$?\s*([\d,]+)/);
  if (!m) return Number.POSITIVE_INFINITY;
  const n = Number(m[1].replace(/,/g, ""));
  return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
}

export function ProductBrowser({ products }: { products: Product[] }) {
  const reduce = useReducedMotion();
  const [vertical, setVertical] = useState<VerticalId>("all");
  const [cat, setCat] = useState<CatFilter>("all");
  const [sort, setSort] = useState<SortId>("featured");

  // per-vertical totals for the segmented control
  const verticalCounts = useMemo(() => {
    const map: Record<VerticalId, number> = { all: products.length, cooling: 0, car: 0, useful: 0 };
    for (const p of products) map[verticalOf(p)] += 1;
    return map;
  }, [products]);

  // products in the active vertical (category chips + grid derive from this)
  const inVertical = useMemo(
    () => (vertical === "all" ? products : products.filter((p) => verticalOf(p) === vertical)),
    [products, vertical],
  );

  // category chips for the active vertical — only categories that actually have items
  const catChips = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of inVertical) counts.set(p.category as string, (counts.get(p.category as string) ?? 0) + 1);
    const chips: { key: CatFilter; label: string; count: number }[] = [
      { key: "all", label: "All categories", count: inVertical.length },
    ];
    for (const c of CATEGORIES) {
      const n = counts.get(c.name) ?? 0;
      if (n > 0) chips.push({ key: c.name as CatFilter, label: c.name, count: n });
    }
    return chips;
  }, [inVertical]);

  const filtered = useMemo(
    () => (cat === "all" ? inVertical : inVertical.filter((p) => p.category === cat)),
    [inVertical, cat],
  );

  const sorted = useMemo(() => {
    if (sort === "featured") return filtered;
    const rows = filtered.map((p, i) => ({ p, i, v: priceLow(p) }));
    rows.sort((a, b) => {
      const af = Number.isFinite(a.v);
      const bf = Number.isFinite(b.v);
      if (!af && !bf) return a.i - b.i; // both unpriced → keep order
      if (!af) return 1; // unpriced sink to the bottom
      if (!bf) return -1;
      return sort === "asc" ? a.v - b.v : b.v - a.v;
    });
    return rows.map((r) => r.p);
  }, [filtered, sort]);

  // reset category when switching verticals (its chips change)
  function pickVertical(id: VerticalId) {
    setVertical(id);
    setCat("all");
  }

  return (
    <div>
      {/* ── control bar ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface/95 p-4 sm:p-5">
        {/* vertical + sort row */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="mono mb-2 block text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint">Vertical</span>
            <div className="flex flex-wrap gap-1.5">
              {VERTICALS.map((v) => {
                const on = vertical === v.id;
                const count = verticalCounts[v.id];
                if (v.id !== "all" && count === 0) return null;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => pickVertical(v.id)}
                    aria-pressed={on}
                    className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      on ? "text-on-accent" : "text-ink-2 hover:text-ink-strong"
                    }`}
                  >
                    {on ? (
                      <motion.span
                        layoutId="vertical-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-accent shadow-[0_10px_30px_-12px_rgba(217,154,69,0.7)]"
                        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                        aria-hidden
                      />
                    ) : null}
                    {v.label}
                    <span className={`nums text-[0.72rem] font-bold ${on ? "text-on-accent/70" : "text-ink-faint"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:text-right">
            <span className="mono mb-2 block text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint">Sort</span>
            <div className="inline-flex flex-wrap gap-1 rounded-full border border-line-strong bg-dark/40 p-1">
              {SORTS.map((s) => {
                const on = sort === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSort(s.id)}
                    aria-pressed={on}
                    className={`relative rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold transition-colors ${
                      on ? "text-on-accent" : "text-ink-dim hover:text-ink-strong"
                    }`}
                  >
                    {on ? (
                      <motion.span
                        layoutId="sort-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-accent"
                        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                        aria-hidden
                      />
                    ) : null}
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* category chips — reflect the active vertical */}
        {catChips.length > 2 ? (
          <div>
            <span className="mono mb-2 block text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint">Category</span>
            <div className="flex flex-wrap gap-2">
              {catChips.map((c) => {
                const on = cat === c.key;
                return (
                  <button
                    key={String(c.key)}
                    type="button"
                    onClick={() => setCat(c.key)}
                    aria-pressed={on}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[0.82rem] font-medium transition-colors ${
                      on
                        ? "border-accent bg-accent/15 text-accent-bright"
                        : "border-line-strong bg-surface text-ink-2 hover:border-accent/50 hover:text-ink-strong"
                    }`}
                  >
                    {c.label}
                    <span className={`nums text-[0.68rem] font-bold ${on ? "text-accent-bright/70" : "text-ink-faint"}`}>
                      {c.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      {/* ── result count ───────────────────────────────────────────────── */}
      <div className="mt-6 flex items-baseline gap-2">
        <span className="nums font-display text-lg font-semibold text-ink-strong">{sorted.length}</span>
        <span className="text-sm text-ink-dim">
          {sorted.length === 1 ? "pick" : "picks"}
          {vertical !== "all" ? ` in ${VERTICALS.find((v) => v.id === vertical)?.label.toLowerCase()}` : ""}
          {cat !== "all" ? ` · ${String(cat)}` : ""}
        </span>
      </div>

      {/* ── grid ───────────────────────────────────────────────────────── */}
      <motion.div layout={!reduce} className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {sorted.map((p) => (
            <motion.div
              key={p.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {sorted.length === 0 ? (
        <p className="mt-10 text-center text-sm text-ink-dim">
          Nothing in this slice yet — try another vertical or category.
        </p>
      ) : null}
    </div>
  );
}
