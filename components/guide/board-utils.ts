import type { CategoryMeta, ComparableProduct, SpecFieldMeta } from "@/lib/comparison-schema";
import type { SortOption } from "@/components/comparison-board";

/**
 * Shared, pure comparison helpers — the ONE source of truth for sorting, hero selection, spec
 * formatting, and the data-viz bar. Both the interactive <ComparisonBoard/> and the sticky
 * decision summary read from here so the spotlight the buyer sees and the "check price" the rail
 * offers can never drift apart. No fabrication: a null spec is a real gap, shown as "—".
 */

type SpecRec = Record<string, number | string | boolean | null | undefined>;

export type SpecValue = number | string | boolean | null;

export function valOf(p: ComparableProduct, key: string): SpecValue {
  if (key === "price") return p.price;
  const v = (p.specs as unknown as SpecRec)[key];
  return v === undefined ? null : v;
}

/** Human-readable spec value: number + unit, Yes/No, or the enum label. */
export function fmtSpec(v: SpecValue, f?: SpecFieldMeta): string {
  if (v === null) return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "number") {
    const n = v >= 1000 ? v.toLocaleString() : `${v}`;
    return f?.unit ? `${n} ${f.unit}` : n;
  }
  return f?.enumLabels?.[v] ?? v;
}

/**
 * A signature figure for the big-stat treatment, generalized past numbers so a category whose
 * decisive spec is an enum (dash-cam resolution) or bool (diesel-rated) still gets a real headline
 * figure — this is the fix for the old "first 3 numeric columns" heuristic.
 */
export function heroStat(p: ComparableProduct, key: string, meta: CategoryMeta): { value: string; unit: string } {
  const f = meta.fields[key];
  const v = valOf(p, key);
  if (v === null) return { value: "—", unit: "" };
  if (typeof v === "number") return { value: v >= 1000 ? v.toLocaleString() : `${v}`, unit: f?.unit ?? "" };
  if (typeof v === "boolean") return { value: v ? "Yes" : "No", unit: "" };
  return { value: f?.enumLabels?.[v] ?? v, unit: "" };
}

/** The 2–3 signature spec keys for this category — explicit `heroKeys`, else first numeric columns. */
export function resolveHeroKeys(meta: CategoryMeta): string[] {
  if (meta.heroKeys?.length) return meta.heroKeys;
  return meta.columns.filter((k) => meta.fields[k]?.type === "number").slice(0, 3);
}

/** Products sorted by a sort knob. Missing keys sink to the bottom; editor's order when no key. */
export function applySort(products: ComparableProduct[], sort?: SortOption): ComparableProduct[] {
  if (!sort?.key) return products;
  const { key, dir = "desc" } = sort;
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
}

/** The active sort + the resulting hero (spotlight) and the rest of the lineup. */
export function resolveHero(products: ComparableProduct[], sorts: SortOption[], sortId: string) {
  const activeSort = sorts.find((s) => s.id === sortId);
  const sorted = applySort(products, activeSort);
  const [hero, ...rest] = sorted;
  return { activeSort, sorted, hero, rest };
}

/** How many products publish a real (non-null) number for a spec key. */
function nonNullNumericCount(products: ComparableProduct[], key: string): number {
  return products.reduce((n, p) => (typeof valOf(p, key) === "number" ? n + 1 : n), 0);
}

/**
 * A sort is "dead" when it can't honestly reorder anything: its spec key is null on all-but-≤1
 * product, so tapping it just reshuffles ties. Price and editor's-rank are always alive. Dead
 * sorts are greyed out rather than silently lying about a ranking we can't support.
 */
export function isDeadSort(products: ComparableProduct[], sort: SortOption): boolean {
  if (!sort.key || sort.key === "price") return false;
  return nonNullNumericCount(products, sort.key) < 2;
}

/** Max value for a numeric key across the lineup — the denominator for the data-viz bar. */
export function maxForKey(products: ComparableProduct[], key: string): number | null {
  let max: number | null = null;
  for (const p of products) {
    const v = valOf(p, key);
    if (typeof v === "number" && (max === null || v > max)) max = v;
  }
  return max;
}

/**
 * The spec to draw as a real bar per product: the first signature key that is numeric, higher-is-
 * better, and published by at least half the lineup. Returns null when no honest bar exists
 * (e.g. every value is a marketing-hidden gap) — we draw nothing rather than a fake bar.
 */
export function barKeyFor(meta: CategoryMeta, products: ComparableProduct[]): string | null {
  const enough = (key: string) => {
    const f = meta.fields[key];
    return f?.type === "number" && f.higherIsBetter === true && nonNullNumericCount(products, key) >= Math.ceil(products.length / 2);
  };
  // explicit opt-out: no honest numeric decides this category
  if (meta.barKey === null) return null;
  // explicit honest override (e.g. bar the engine rating, not the inflated peak-amp headline)
  if (meta.barKey && enough(meta.barKey)) return meta.barKey;
  for (const key of resolveHeroKeys(meta)) {
    if (enough(key)) return key;
  }
  return null;
}
