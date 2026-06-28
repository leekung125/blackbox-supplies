import type { Metadata } from "next";
import Link from "next/link";
import { CategoryObject } from "@/components/object-art";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { CATEGORIES } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Field Kits",
  description:
    "Pack by failure, not by brand. Power, Car, Light and Carry starter kits for bad timing — honestly sourced, not personally tested.",
};

export default function KitsPage() {
  return (
    <Reveal blur={false} className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="flex items-center gap-2">
        <span className="h-px w-6 bg-accent/60" aria-hidden />
        <span className="kicker text-accent-bright">Field kits</span>
      </div>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Pack by failure, not by brand
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-dim">
        Each field is a starter kit — the smallest set that covers a whole class of bad timing. Every
        unit is sourced from public research, not personally tested.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {CATEGORIES.map((c) => {
          const items = getProductsByCategory(c.name);
          return (
            <div
              key={c.slug}
              className="relative overflow-hidden rounded-lg border border-line bg-card/40 p-6"
            >
              <div className="bloom pointer-events-none absolute -right-12 -top-12 h-40 w-40 opacity-40 blur-2xl" />
              <div className="relative flex items-start gap-4">
                <span className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-base/60">
                  <div className="grid-faint absolute inset-0 opacity-50" aria-hidden />
                  <CategoryObject category={c.name} className="relative h-[80%] w-[80%]" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-ink">{c.kitName}</h2>
                    <Badge variant="outline">{items.length} units</Badge>
                  </div>
                  <p className="mono mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint">
                    {c.tagline}
                  </p>
                </div>
              </div>

              <p className="relative mt-4 text-sm leading-relaxed text-ink-dim">{c.blurb}</p>

              <ul className="relative mt-4 space-y-1.5 border-t border-line-soft pt-4">
                {items.slice(0, 5).map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3">
                    <Link
                      href={`/products/${p.id}`}
                      className="text-sm text-ink-dim transition-colors hover:text-accent-bright"
                    >
                      {p.name}
                    </Link>
                    <span className="mono shrink-0 text-xs text-ink-faint">{p.priceRange}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-5">
                <ButtonLink href={`/category/${c.slug}`} variant="ghost">
                  View {c.name} →
                </ButtonLink>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
