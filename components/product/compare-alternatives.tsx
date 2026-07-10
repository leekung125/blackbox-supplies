import Link from "next/link";
import { lowPrice, type Product } from "@/lib/products";

/**
 * One honest, price-derived directional tag that resolves the choice against the CURRENT product.
 * Uses the low end of each approximate price band (the only structured signal we have) — no spec
 * claims are invented. Returns null when either band is unparseable, so a tag never lies.
 */
function positionTag(current: Product, rival: Product): { label: string; tone: "down" | "up" | "flat" } | null {
  const a = lowPrice(current.priceRange);
  const b = lowPrice(rival.priceRange);
  if (!a || !b) return null;
  const r = b / a;
  if (r <= 0.8) return { label: "Cheaper", tone: "down" };
  if (r >= 1.25) return { label: "Pricier", tone: "up" };
  return { label: "Similar price", tone: "flat" };
}

function TagPill({ tag }: { tag: { label: string; tone: "down" | "up" | "flat" } }) {
  const tone =
    tag.tone === "down"
      ? "border-accent/40 text-accent-bright"
      : tag.tone === "up"
        ? "border-line-strong text-ink-dim"
        : "border-line-soft text-ink-faint";
  return (
    <span className={`mono shrink-0 rounded-full border px-1.5 py-0.5 text-[0.5rem] font-medium uppercase leading-none tracking-[0.1em] ${tone}`}>
      {tag.label}
    </span>
  );
}

function Scale() {
  return (
    <svg className="h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3 V21 M5 7 H19 M5 7 L3 13 A2.4 2.4 0 0 0 7 13 Z M19 7 L17 13 A2.4 2.4 0 0 0 21 13 Z M8 21 H16" />
    </svg>
  );
}

/** One product column's decisive facts, honestly empty-safe. */
function facts(p: Product) {
  return {
    price: p.priceRange?.trim() || "—",
    spec: p.keySpec?.trim() || "—",
    verdict: (p.verdict || p.problemSolved || "").trim() || "—",
  };
}

/**
 * Compare-alternatives mini — this product beside its top same-category rivals on the three
 * dimensions that actually decide it: price band, the key spec, and the one-line verdict. It
 * answers "what beats it / what it beats" without leaving the page. Every alternative column
 * links to its own decision page. Honest by construction: nothing is invented — an absent field
 * shows "—", and price bands are already approximate. Horizontally scrolls on narrow screens so
 * the page body never scrolls sideways.
 */
export function CompareAlternatives({
  product,
  alternatives,
  className = "",
}: {
  product: Product;
  alternatives: Product[];
  className?: string;
}) {
  const rivals = alternatives.filter((p) => p.id !== product.id).slice(0, 2);
  if (rivals.length === 0) return null;

  const columns = [{ p: product, current: true }, ...rivals.map((p) => ({ p, current: false }))];
  const rows: { label: string; get: (p: Product) => string; mono?: boolean }[] = [
    { label: "Price band", get: (p) => facts(p).price, mono: true },
    { label: "Key spec", get: (p) => facts(p).spec },
    { label: "Verdict", get: (p) => facts(p).verdict },
  ];

  return (
    <section className={`lit-card overflow-hidden ${className}`} aria-label={`How ${product.name} compares to alternatives`}>
      <div className="flex items-center gap-2 border-b border-line-soft bg-surface-2 px-5 py-3">
        <Scale />
        <h2 className="mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-accent-strong">How it compares</h2>
      </div>

      {/* MOBILE — stacked cards (the table's columns get cut off on a phone) */}
      <div className="space-y-3 p-4 sm:hidden">
        {columns.map(({ p, current }) => (
          <div key={p.id} className={`rounded-xl border p-4 ${current ? "border-accent/45 bg-accent-tint" : "border-line-soft bg-surface"}`}>
            <div className="flex items-center gap-2">
              <span className={`mono text-[0.56rem] uppercase tracking-[0.14em] ${current ? "text-accent-bright" : "text-ink-faint"}`}>
                {current ? "You're viewing" : "Alternative"}
              </span>
              {!current && positionTag(product, p) ? <TagPill tag={positionTag(product, p)!} /> : null}
            </div>
            <p className="mt-1 font-display text-[1rem] font-semibold leading-tight text-ink-strong">
              {current ? product.name : <Link href={`/products/${p.id}`} className="transition-colors hover:text-accent">{p.name}</Link>}
            </p>
            <dl className="mt-3 space-y-2">
              {rows.map((r) => (
                <div key={r.label} className="flex gap-3">
                  <dt className="mono w-[5.5rem] shrink-0 pt-0.5 text-[0.56rem] uppercase tracking-[0.1em] text-ink-faint">{r.label}</dt>
                  <dd className={r.mono ? "mono nums text-[0.88rem] font-semibold text-ink" : "text-[0.85rem] leading-snug text-ink-2"}>{r.get(p)}</dd>
                </div>
              ))}
            </dl>
            {!current ? (
              <Link href={`/products/${p.id}`} className="ulink mt-3 inline-block text-[0.82rem] font-semibold">See its case →</Link>
            ) : null}
          </div>
        ))}
      </div>

      {/* DESKTOP — full comparison table */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <thead>
            <tr>
              <th className="w-[7rem] px-4 py-3.5 align-bottom sm:w-[8.5rem]" />
              {columns.map(({ p, current }) => (
                <th
                  key={p.id}
                  className={`px-4 py-3.5 align-bottom ${current ? "relative bg-accent-tint" : ""}`}
                >
                  {current ? (
                    <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent to-transparent" />
                  ) : null}
                  <div className="flex items-center gap-2">
                    <span className={`mono text-[0.58rem] uppercase tracking-[0.14em] ${current ? "text-accent-bright" : "text-ink-faint"}`}>
                      {current ? "You're viewing" : "Alternative"}
                    </span>
                    {!current && positionTag(product, p) ? <TagPill tag={positionTag(product, p)!} /> : null}
                  </div>
                  <p className="mt-1.5 font-display text-[0.98rem] font-semibold leading-tight text-ink-strong">
                    {current ? (
                      product.name
                    ) : (
                      <Link href={`/products/${p.id}`} className="transition-colors hover:text-accent">
                        {p.name}
                      </Link>
                    )}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-line-soft align-top">
                <th scope="row" className="px-4 py-3.5 text-left">
                  <span className="mono text-[0.62rem] uppercase tracking-[0.1em] text-ink-faint">{r.label}</span>
                </th>
                {columns.map(({ p, current }) => (
                  <td key={p.id} className={`px-4 py-3.5 ${current ? "bg-accent-tint/60" : ""}`}>
                    <span
                      className={
                        r.mono
                          ? "mono nums text-[0.9rem] font-semibold text-ink"
                          : "block max-w-[16rem] text-[0.85rem] leading-snug text-ink-2 " + (r.label === "Verdict" ? "line-clamp-4" : "line-clamp-2")
                      }
                    >
                      {r.get(p)}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-line-soft">
              <th scope="row" className="px-4 py-3.5" />
              {columns.map(({ p, current }) => (
                <td key={p.id} className={`px-4 py-3.5 ${current ? "bg-accent-tint/60" : ""}`}>
                  {current ? (
                    <span className="mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">This page</span>
                  ) : (
                    <Link href={`/products/${p.id}`} className="ulink text-[0.82rem] font-semibold">
                      See its case →
                    </Link>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="border-t border-line-soft px-5 py-3 text-xs leading-relaxed text-ink-dim">
        Same category, ranked by our research priority. Specs and price bands are approximate — confirm the
        current price on Amazon.
      </p>
    </section>
  );
}
