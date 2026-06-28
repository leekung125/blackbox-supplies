"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES } from "@/lib/categories";
import type { Category, Product } from "@/lib/products";

type Filter = Category | "all";

export function ProductBrowser({ products }: { products: Product[] }) {
  const [active, setActive] = useState<Filter>("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: products.length };
    for (const c of CATEGORIES) {
      map[c.name] = products.filter((p) => p.category === c.name).length;
    }
    return map;
  }, [products]);

  const filtered = useMemo(
    () =>
      active === "all"
        ? products
        : products.filter((p) => p.category === active),
    [products, active]
  );

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    ...CATEGORIES.map((c) => ({ key: c.name as Filter, label: c.name })),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              aria-pressed={isActive}
              className={`mono inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] transition-colors ${
                isActive
                  ? "border-accent/60 bg-accent/15 text-accent-bright"
                  : "border-line bg-card/40 text-ink-dim hover:border-accent/30 hover:text-ink"
              }`}
            >
              {f.label}
              <span
                className={
                  isActive ? "text-accent-bright/70" : "text-ink-faint"
                }
              >
                {counts[f.key]}
              </span>
            </button>
          );
        })}
        <span className="kicker ml-auto hidden text-ink-faint sm:inline">
          {filtered.length} unit{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
