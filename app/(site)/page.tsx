import Link from "next/link";
import { CornerTicks } from "@/components/corner-ticks";
import { ProductCard } from "@/components/product-card";
import { CategoryObject } from "@/components/object-art";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { CATEGORIES } from "@/lib/categories";
import { BRAND, FAILURE_MOMENTS, VIDEO_DROPS } from "@/lib/content";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  type Category,
} from "@/lib/products";

const KIT_LINES: Record<Category, string> = {
  Power: "Phone, car, outlet, backup — four failure points, one small system.",
  Car: "Flat tire, dead battery, dark shoulder, messy trunk.",
  Light: "Hands-free, outage-ready, road-safe.",
  Carry: "Keep what matters locatable, contained, reachable.",
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const total = getAllProducts().length;

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-faint pointer-events-none absolute inset-0 opacity-40" />
        <div className="bloom pointer-events-none absolute right-0 top-0 hidden h-[42rem] w-[42rem] translate-x-1/3 opacity-50 blur-3xl lg:block" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-28">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-px w-7 bg-accent/50" aria-hidden />
              <span className="kicker text-ink-dim">Field Catalog</span>
            </div>

            <h1 className="mt-6 max-w-xl text-balance text-[2.7rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
              {BRAND.tagline}
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-dim sm:text-lg">
              A premium index of practical gear for the moments everyday systems fail — dead
              phone, dark road, flat tire, lost keys, power out. Honestly sourced. Never
              overclaimed.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/products">Browse gear</ButtonLink>
              <ButtonLink href="/kits" variant="ghost">
                Field kits
              </ButtonLink>
            </div>

            <div className="mono mt-9 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
              <span className="text-ink-dim">{total} units</span>
              <span aria-hidden>·</span>
              <span>4 fields</span>
              <span aria-hidden>·</span>
              <span>not personally tested</span>
            </div>
          </div>

          {/* the black-box display */}
          <Link href="/category/power" className="group relative block">
            <div className="bloom pointer-events-none absolute inset-0 scale-90 opacity-60 blur-2xl" aria-hidden />
            <div className="panel-sheen relative overflow-hidden rounded-2xl border border-line bg-card/30 transition-colors group-hover:border-accent/30">
              <div className="grid-faint absolute inset-0 opacity-40" aria-hidden />
              <CornerTicks className="border-accent/20" />
              <div className="absolute left-4 top-3.5 z-10">
                <span className="kicker text-ink-faint">BBX · POWER · 001</span>
              </div>
              <div className="relative flex aspect-[5/4] items-center justify-center p-10">
                <CategoryObject
                  category="Power"
                  className="h-full w-full max-w-[19rem] drop-shadow-[0_28px_55px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="relative flex items-center justify-between border-t border-line-soft px-4 py-3">
                <span className="text-sm font-medium text-ink">Compact Power Bank</span>
                <span className="mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                  Illustration
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ----------------------------------------------------- FAILURE MOMENTS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="h-px w-7 bg-accent/40" aria-hidden />
          <span className="kicker text-ink-dim">The moments we build for</span>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {FAILURE_MOMENTS.map((m, i) => (
            <Link
              key={m.label}
              href={`/category/${m.categorySlug}`}
              className="group relative overflow-hidden rounded-lg border border-line bg-card/40 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:bg-card"
            >
              <CornerTicks className="border-accent/0 transition-colors group-hover:border-accent/25" />
              <span className="mono text-[0.6rem] tracking-[0.18em] text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm font-medium text-ink">{m.label}</p>
              <p className="mt-1 text-xs text-ink-faint">{m.line}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- FEATURED */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          kicker="Featured"
          title="Standard issue"
          description="A spread across all four fields — the gear that earns its place in a bag, a glovebox, a drawer by the door."
          action={
            <ButtonLink href="/products" variant="ghost">
              All gear →
            </ButtonLink>
          }
        />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- FIELD KITS */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          kicker="Field kits"
          title="Response systems, not collections"
          description="Each kit answers a whole class of bad timing — the smallest set that covers a failure mode."
          action={
            <ButtonLink href="/kits" variant="ghost">
              View kits →
            </ButtonLink>
          }
        />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CATEGORIES.map((c) => {
            const count = getProductsByCategory(c.name).length;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group relative flex items-center gap-5 overflow-hidden rounded-xl border border-line bg-card/40 p-5 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:bg-card"
              >
                <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-base/60">
                  <div className="grid-faint absolute inset-0 opacity-50" aria-hidden />
                  <CategoryObject category={c.name} className="relative h-[80%] w-[80%]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-ink">{c.kitName}</h3>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{KIT_LINES[c.name]}</p>
                </div>
                <span
                  className="mono ml-auto hidden shrink-0 text-ink-faint transition-colors group-hover:text-accent-bright sm:block"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* -------------------------------------------------------- LATEST DROPS */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          kicker="Latest drops"
          title="The films"
          description="Silent product micro-films, one per failure moment — cinematic, honest, made by the engine."
        />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {VIDEO_DROPS.map((d) => (
            <Link
              key={d.code}
              href={`/category/${d.categorySlug}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-card/40 transition-all hover:-translate-y-1 hover:border-accent/30"
            >
              <div className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.thumb}
                  alt={`${d.title} — Blackbox Supply film`}
                  className="aspect-[3/4] w-full border-b border-line object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute right-3 top-3">
                  <Badge variant="accent">{d.status}</Badge>
                </div>
              </div>
              <div className="p-4">
                <p className="kicker text-ink-faint">{d.code}</p>
                <h3 className="mt-2 text-base font-semibold text-ink">{d.title}</h3>
                <p className="mt-1.5 text-sm italic leading-relaxed text-ink-dim">
                  &ldquo;{d.hook}&rdquo;
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mono mt-6 text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
          Some links are affiliate links · we have not personally tested these products ·{" "}
          <Link
            href="/disclosure"
            className="text-ink-dim underline decoration-line underline-offset-2 hover:text-accent-bright"
          >
            disclosure
          </Link>
        </p>
      </section>
    </>
  );
}
