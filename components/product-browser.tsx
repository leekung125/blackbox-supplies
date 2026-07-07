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
    for (const c of CATEGORIES) map[c.name] = products.filter((p) => p.category === c.name).length;
    return map;
  }, [products]);

  const filtered = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.category === active)),
    [products, active]
  );

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All gear" },
    // only show categories that actually have products in this set (no dead "Kitchen 0" chips)
    ...CATEGORIES.filter((c) => (counts[c.name] ?? 0) > 0).map((c) => ({ key: c.name as Filter, label: c.name })),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const on = active === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              aria-pressed={on}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                on
                  ? "border-accent bg-accent text-on-accent"
                  : "border-line-strong bg-surface text-ink-2 hover:border-accent hover:text-accent-strong"
              }`}
            >
              {f.label}
              <span className={on ? "text-white/60" : "text-ink-faint"}>{counts[f.key]}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
