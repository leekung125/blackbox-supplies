import Link from "next/link";
import Image from "next/image";
import type { ComparisonGuide } from "@/lib/comparison-guides";
import type { SpecFieldMeta } from "@/lib/comparison-schema";

/**
 * Homepage proof-of-concept: an ACTUAL ranked comparison (not a text card about comparison).
 * Shows the featured guide's top 3 picks with real thumbnails, role, price, and the ONE deciding
 * spec rendered as a glowing spec-bar — the "side by side" the page keeps promising.
 */
export function FeaturedComparison({ guide }: { guide: ComparisonGuide }) {
  const picks = guide.products.slice(0, 3);
  // The deciding metric: the first sort with a numeric spec key (not price), else first numeric column.
  const specKey =
    guide.sorts.find((s) => s.key && s.key !== "price")?.key ??
    guide.meta.columns.find((k) => guide.meta.fields[k]?.type === "number");
  const field: SpecFieldMeta | undefined = specKey ? guide.meta.fields[specKey] : undefined;
  const values = picks.map((p) => {
    const v = specKey ? (p.specs as unknown as Record<string, unknown>)[specKey] : null;
    return typeof v === "number" ? v : null;
  });
  const max = Math.max(1, ...values.map((v) => v ?? 0));
  const roleFor = (i: number) => picks[i].role ?? ["Best overall", "Best value", "Premium"][i];

  return (
    <div className="lit-card grad-border-amber relative overflow-hidden">
      {/* atmosphere: the lamp in the corner + a faint technical grid, under everything */}
      <div aria-hidden className="glow-amber-soft pointer-events-none left-[-14%] top-[-22%] h-[55%] w-[52%]" style={{ opacity: 0.55 }} />
      <div aria-hidden className="atmo-grid pointer-events-none absolute inset-0 opacity-50" />

      {/* header */}
      <div className="relative flex flex-wrap items-end justify-between gap-3 border-b border-line-soft px-5 py-4 sm:px-7">
        <div>
          <span className="mono inline-flex items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-accent-bright">
            <span aria-hidden className="fresh-dot" style={{ width: "0.4rem", height: "0.4rem" }} />
            ★ Featured comparison
          </span>
          <h3 className="mt-1.5 font-display text-xl font-semibold text-ink-strong sm:text-2xl">{guide.title}</h3>
        </div>
        <Link href={`/guides/${guide.slug}`} className="mono shrink-0 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:text-accent-bright">
          Full comparison →
        </Link>
      </div>

      {/* the three picks, side by side (stacks on mobile) */}
      <div className="relative divide-y divide-line-soft">
        {picks.map((p, i) => {
          const v = values[i];
          const pct = v !== null ? Math.max(8, Math.round((v / max) * 100)) : 0;
          const top = i === 0;
          return (
            <div
              key={p.id}
              className="group/row relative flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2 sm:px-7"
              style={top ? { background: "linear-gradient(90deg, rgba(217,154,69,0.055), transparent 55%)" } : undefined}
            >
              {/* the champion's filament — a lit left edge on the #1 pick, brighter on hover */}
              <span
                aria-hidden
                className="absolute left-0 top-1/2 h-9 w-[3px] -translate-y-1/2 rounded-r-full transition-opacity duration-300"
                style={{
                  background: "linear-gradient(180deg, #edba66, #a86f2c)",
                  boxShadow: "0 0 12px rgba(217,154,69,0.7)",
                  opacity: top ? 0.9 : 0,
                }}
              />
              {/* rank — the top pick wears a glowing amber medallion; runners-up stay quiet rings */}
              <span
                className="mono flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular"
                style={
                  top
                    ? {
                        color: "#edba66",
                        border: "1px solid #edba66bb",
                        background: "radial-gradient(120% 120% at 50% 20%, #d99a4540, transparent 75%)",
                        boxShadow: "0 0 16px -3px #d99a45, inset 0 0 10px -5px #edba66",
                        textShadow: "0 0 10px rgba(217,154,69,0.8)",
                      }
                    : { color: "var(--color-ink-faint)", border: "1px solid var(--color-line-strong)" }
                }
              >
                {i + 1}
              </span>
              <Link href={`/products/${p.id}`} className="group flex min-w-0 flex-1 items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-line bg-well transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_0_16px_-4px_rgba(217,154,69,0.55)]">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill sizes="56px" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]" />
                  ) : (
                    <span className="mono flex h-full items-center justify-center text-[0.5rem] uppercase text-accent-bright">{p.brand?.slice(0, 3)}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="pill-amber" style={top ? { boxShadow: "0 0 16px -5px rgba(217,154,69,0.8)" } : undefined}>{roleFor(i)}</span>
                  </div>
                  <p className="mt-1 truncate font-display text-[0.98rem] font-semibold text-ink-strong transition-colors group-hover:text-accent">{p.name}</p>
                  {/* the deciding spec as a real bar — sweeps in on load, staggered by rank */}
                  {field && v !== null ? (
                    <div className="mt-2 flex items-center gap-2.5">
                      <div className="spec-track w-full max-w-[13rem]">
                        <div className="spec-fill fcx-fill" style={{ width: `${pct}%`, animationDelay: `${0.25 + i * 0.14}s` }} />
                      </div>
                      <span className="mono shrink-0 text-[0.72rem] font-semibold text-accent-bright">
                        {v >= 1000 ? v.toLocaleString() : v}
                        {field.unit ? <span className="text-ink-dim"> {field.unit}</span> : null}
                      </span>
                    </div>
                  ) : null}
                </div>
              </Link>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <div className="mono text-[0.82rem] font-semibold tabular text-accent-bright" style={top ? { textShadow: "0 0 14px rgba(237,186,102,0.45)" } : undefined}>{p.priceRange ?? `$${p.price}`}</div>
                {/* the direct money path from the homepage's most commercial element */}
                {p.affiliateUrl ? (
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="group/cta cta-sheen mono inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-on-accent shadow-[0_0_18px_-6px_rgba(217,154,69,0.75)] transition-all hover:bg-accent-strong hover:shadow-[0_0_26px_-6px_rgba(217,154,69,0.95)]"
                  >
                    Check price
                    <span aria-hidden className="transition-transform group-hover/cta:translate-x-0.5">→</span>
                  </a>
                ) : (
                  <div className="mono text-[0.56rem] uppercase tracking-[0.08em] text-ink-faint">{field?.label ?? "spec"}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
