import type { Product } from "@/lib/products";

/**
 * At-a-glance decision strip — a compact horizontal row of the 3–4 signal facts that let a
 * skimmer reach the verdict in seconds: the price band, who it's for, the one spec that matters,
 * and who should skip it. Server-rendered, honest by construction — a tile only appears when its
 * field has real content, and long copy is line-clamped (never truncated in the DOM, so it stays
 * accessible and also lives in full inside the decision receipt below).
 */
export function DecisionStrip({
  product,
  asOf,
  className = "",
}: {
  product: Product;
  asOf?: string;
  className?: string;
}) {
  const all: { label: string; value: string; kind: "price" | "text" }[] = [
    { label: asOf ? `Typical price · ${asOf}` : "Typical price", value: product.priceRange, kind: "price" },
    { label: "Best for", value: product.bestFor, kind: "text" },
    { label: "Key spec", value: product.keySpec, kind: "text" },
    { label: "Skip it if", value: product.whoShouldAvoid || "", kind: "text" },
  ];
  const items = all.filter((i) => i.value && i.value.trim().length > 0);

  if (items.length < 2) return null;

  const cols =
    items.length >= 4 ? "sm:grid-cols-4" : items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <dl className={`grid grid-cols-2 gap-2.5 ${cols} ${className}`}>
      {items.map((i) => (
        <div key={i.label} className="lit-card grad-border-amber flex flex-col p-3.5 sm:p-4">
          <dt className="mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-ink-faint">{i.label}</dt>
          {i.kind === "price" ? (
            <dd className="mono nums mt-1.5 text-[1.35rem] font-semibold leading-none text-accent-bright">{i.value}</dd>
          ) : (
            <dd className="mt-1.5 line-clamp-3 text-[0.86rem] leading-snug text-ink">{i.value}</dd>
          )}
        </div>
      ))}
    </dl>
  );
}
