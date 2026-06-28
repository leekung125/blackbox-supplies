import Link from "next/link";
import { CategoryGlyph } from "@/components/category-glyph";
import { CornerTicks } from "@/components/corner-ticks";
import { ProductCard } from "@/components/product-card";
import { ProductPlaceholder } from "@/components/product-placeholder";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { CATEGORIES } from "@/lib/categories";
import { BRAND, FAILURE_MOMENTS, VIDEO_DROPS } from "@/lib/content";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
} from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const total = getAllProducts().length;

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-faint pointer-events-none absolute inset-0 opacity-60" />
        <div className="bloom pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 opacity-70 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-accent/60" aria-hidden />
            <span className="kicker text-accent-bright">
              {BRAND.name} · Field Catalog
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-7xl">
            {BRAND.tagline}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-dim">
            {BRAND.positioning}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/products">Browse all gear</ButtonLink>
            <ButtonLink href="/kits" variant="ghost">
              Field kits
            </ButtonLink>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Stat value={String(total)} label="Units catalogued" />
            <span className="h-8 w-px bg-line" aria-hidden />
            <Stat value="4" label="Field categories" />
            <span className="h-8 w-px bg-line" aria-hidden />
            <Stat value="0" label="Personally tested" warn />
          </div>
        </div>

        {/* incident-record HUD chip (tasteful restraint) */}
        <div className="relative mx-auto hidden max-w-6xl px-6 pb-6 sm:block">
          <div className="mono flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.2em] text-ink-faint">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-warn/80" aria-hidden />
              REC
            </span>
            <span>NO OUTLET IN RANGE</span>
            <span>·</span>
            <span>SIGNAL LOW</span>
            <span>·</span>
            <span>KEEP MOVING</span>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- FAILURE MOMENTS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="kicker text-ink-faint">The moments we build for</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {FAILURE_MOMENTS.map((m) => (
            <Link
              key={m.label}
              href={`/category/${m.categorySlug}`}
              className="group relative rounded-md border border-line bg-card/40 p-4 transition-colors hover:border-accent/40 hover:bg-card"
            >
              <CornerTicks className="border-accent/0 transition-colors group-hover:border-accent/30" />
              <p className="text-sm font-medium text-ink">{m.label}</p>
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
          title="Pack by failure, not by brand"
          description="Each category is a starter kit — the smallest set that covers a whole class of bad timing."
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
                className="group relative flex items-start gap-4 overflow-hidden rounded-lg border border-line bg-card/40 p-5 transition-all hover:border-accent/40 hover:bg-card"
              >
                <div className="bloom pointer-events-none absolute -right-10 -top-10 h-32 w-32 opacity-0 blur-2xl transition-opacity group-hover:opacity-60" />
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-md border border-line bg-base text-accent">
                  <CategoryGlyph category={c.name} className="h-6 w-6" />
                </span>
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-ink">
                      {c.kitName}
                    </h3>
                    <Badge variant="outline">{count} units</Badge>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
                    {c.blurb}
                  </p>
                </div>
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
          description="Silent product micro-films for each failure moment. In production — concept cards below."
        />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {VIDEO_DROPS.map((d) => (
            <Link
              key={d.code}
              href={`/category/${d.categorySlug}`}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-card/40 transition-colors hover:border-accent/40"
            >
              <div className="relative">
                <ProductPlaceholder
                  category={d.category}
                  caption={d.code}
                  aspect="video"
                  className="rounded-none border-0 border-b border-line"
                />
                <div className="absolute right-3 top-3">
                  <Badge variant="accent">{d.status}</Badge>
                </div>
              </div>
              <div className="p-4">
                <p className="kicker text-ink-faint">{d.code}</p>
                <h3 className="mt-2 text-base font-semibold text-ink">
                  {d.title}
                </h3>
                <p className="mt-1.5 text-sm italic leading-relaxed text-ink-dim">
                  &ldquo;{d.hook}&rdquo;
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mono mt-6 text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
          Some links on this site are affiliate links · we have not personally
          tested these products ·{" "}
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

function Stat({
  value,
  label,
  warn = false,
}: {
  value: string;
  label: string;
  warn?: boolean;
}) {
  return (
    <div>
      <p
        className={`text-2xl font-semibold tracking-tight ${
          warn ? "text-warn" : "text-ink"
        }`}
      >
        {value}
      </p>
      <p className="kicker mt-1 text-ink-faint">{label}</p>
    </div>
  );
}
