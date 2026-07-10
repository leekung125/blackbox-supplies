import type { Product } from "@/lib/products";

/**
 * The Decision Receipt — the honest backbone behind a recommendation, as a premium native card.
 * Assembles from data already on the product (verdict / bestFor / cons) plus the empty-safe
 * receipt fields (whoShouldAvoid / mainTradeoff / whatCouldChange). Rows only render when they
 * have real content — no filler, no fabricated sources. States plainly that it isn't lab-tested.
 */
export function DecisionReceipt({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const rows: { label: string; value?: string }[] = [
    { label: "Why it's here", value: product.verdict || product.problemSolved },
    { label: "Who should buy it", value: product.bestFor },
    { label: "Who should skip it", value: product.whoShouldAvoid },
    { label: "The main tradeoff", value: product.mainTradeoff || product.cons?.[0] },
    { label: "What could change this", value: product.whatCouldChange },
  ].filter((r) => r.value && r.value.trim().length > 0);

  if (rows.length < 2) return null; // not enough backbone to be worth a receipt

  return (
    <section className={`lit-card grad-border-amber relative overflow-hidden ${className}`}>
      {/* focal amber bloom behind the header — the lamp lighting the receipt */}
      <span
        aria-hidden
        className="glow-amber-soft"
        style={{ top: "-3.5rem", left: "-2rem", width: "16rem", height: "9rem" }}
      />

      <div className="relative flex items-center gap-3 border-b border-line-soft px-5 py-4">
        {/* glow-chip icon badge */}
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
          style={{
            border: "1px solid rgba(224,163,82,0.73)",
            background:
              "radial-gradient(125% 125% at 50% 22%, rgba(217,154,69,0.24), transparent 72%)",
            boxShadow:
              "0 0 20px -5px rgba(217,154,69,0.85), inset 0 0 12px -6px rgba(237,186,102,0.9)",
          }}
        >
          <Receipt />
        </span>
        <div className="min-w-0">
          <span className="mono block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-accent">
            The honest backbone
          </span>
          <h2 className="font-display text-lg font-semibold leading-tight text-ink-strong sm:text-xl">
            The Decision Receipt
          </h2>
        </div>
      </div>

      <dl className="relative divide-y divide-line-soft px-5">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[10.5rem_1fr] sm:gap-4">
            <dt className="mono flex items-start gap-2 text-[0.7rem] uppercase tracking-[0.1em] text-ink-dim">
              <span
                aria-hidden
                className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                style={{ boxShadow: "0 0 8px 0 rgba(217,154,69,0.75)" }}
              />
              <span>{r.label}</span>
            </dt>
            <dd className="text-[0.92rem] leading-relaxed text-ink-2">{r.value}</dd>
          </div>
        ))}
      </dl>

      <p className="relative border-t border-line-soft bg-[rgba(217,154,69,0.03)] px-5 py-3 text-xs leading-relaxed text-ink-dim">
        Built from the live Amazon listing, manufacturer specs, and owner-review patterns — not personally
        lab-tested. Prices are approximate; confirm the current price on Amazon.
      </p>
    </section>
  );
}

function Receipt() {
  return (
    <svg className="h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 3 H18 V21 L15 19 L12 21 L9 19 L6 21 Z" />
      <path d="M9 8 H15 M9 12 H15 M9 16 H13" />
    </svg>
  );
}
