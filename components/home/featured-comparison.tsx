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
    <div className="lit-card grad-border-amber overflow-hidden">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line-soft px-5 py-4 sm:px-7">
        <div>
          <span className="mono text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-accent-bright">★ Featured comparison</span>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink-strong sm:text-2xl">{guide.title}</h3>
        </div>
        <Link href={`/guides/${guide.slug}`} className="mono shrink-0 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:text-accent-bright">
          Full comparison →
        </Link>
      </div>

      {/* the three picks, side by side (stacks on mobile) */}
      <div className="divide-y divide-line-soft">
        {picks.map((p, i) => {
          const v = values[i];
          const pct = v !== null ? Math.max(8, Math.round((v / max) * 100)) : 0;
          return (
            <div
              key={p.id}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2 sm:px-7"
            >
              <span className="mono w-4 shrink-0 text-center text-sm font-semibold text-ink-faint">{i + 1}</span>
              <Link href={`/products/${p.id}`} className="group flex min-w-0 flex-1 items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-line bg-well">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill sizes="56px" className="object-cover" />
                  ) : (
                    <span className="mono flex h-full items-center justify-center text-[0.5rem] uppercase text-accent-bright">{p.brand?.slice(0, 3)}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="pill-amber">{roleFor(i)}</span>
                  </div>
                  <p className="mt-1 truncate font-display text-[0.98rem] font-semibold text-ink-strong transition-colors group-hover:text-accent">{p.name}</p>
                  {/* the deciding spec as a real bar */}
                  {field && v !== null ? (
                    <div className="mt-2 flex items-center gap-2.5">
                      <div className="spec-track w-full max-w-[13rem]">
                        <div className="spec-fill" style={{ width: `${pct}%` }} />
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
                <div className="mono text-[0.82rem] font-semibold text-accent-bright">{p.priceRange ?? `$${p.price}`}</div>
                {/* the direct money path from the homepage's most commercial element */}
                {p.affiliateUrl ? (
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="group/cta mono inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-on-accent transition-colors hover:bg-accent-strong"
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
