import Link from "next/link";
import { CornerTicks } from "@/components/corner-ticks";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Hero } from "@/components/hero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TrustStrip } from "@/components/trust-strip";
import { Tilt } from "@/components/motion/tilt";
import { CATEGORIES } from "@/lib/categories";
import { FAILURE_MOMENTS, VIDEO_DROPS } from "@/lib/content";
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
      <Hero total={total} />

      <TrustStrip />

      {/* ----------------------------------------------------- FAILURE MOMENTS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-2.5">
            <span className="h-px w-7 bg-accent/40" aria-hidden />
            <span className="kicker text-ink-dim">The moments we build for</span>
          </div>
        </Reveal>
        <Stagger className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {FAILURE_MOMENTS.map((m, i) => (
            <StaggerItem key={m.label}>
              <Link
                href={`/category/${m.categorySlug}`}
                className="group relative block overflow-hidden rounded-xl border border-line bg-card/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-card"
              >
                <CornerTicks className="border-accent/0 transition-colors group-hover:border-accent/25" />
                <span className="mono text-[0.62rem] tracking-[0.2em] text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2.5 text-[0.95rem] font-semibold leading-snug text-ink">{m.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-dim">{m.line}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ----------------------------------------------------------- FEATURED */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
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
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <StaggerItem key={p.id}>
              <Tilt max={6}>
                <ProductCard product={p} />
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ---------------------------------------------------------- FIELD KITS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
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
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CATEGORIES.map((c) => {
            const count = getProductsByCategory(c.name).length;
            return (
              <StaggerItem key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="group relative flex items-center gap-5 overflow-hidden rounded-xl border border-line bg-card/40 p-5 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:bg-card"
                >
                  <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-base/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.repImage}
                      alt={`${c.kitName} — representative gear`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ background: "radial-gradient(120% 80% at 50% 0%, transparent 55%, rgba(3,4,8,0.5))" }}
                      aria-hidden
                    />
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
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* -------------------------------------------------------- LATEST DROPS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <SectionHeading
            kicker="Latest drops"
            title="The films"
            description="Silent product micro-films, one per failure moment — cinematic, honest, made by the engine."
          />
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {VIDEO_DROPS.map((d) => (
            <StaggerItem key={d.code}>
              <Tilt max={5}>
                <Link
                  href={`/category/${d.categorySlug}`}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-card/40 transition-all hover:border-accent/30"
                >
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={d.thumb}
                      alt={`${d.title} — Blackbox Supply film`}
                      className="aspect-[3/4] w-full border-b border-line object-cover transition-transform duration-700 group-hover:scale-[1.03]"
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
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.05}>
          <p className="mono mt-6 text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
            Source-only links · we have not personally tested these products ·{" "}
            <Link
              href="/disclosure"
              className="text-ink-dim underline decoration-line underline-offset-2 hover:text-accent-bright"
            >
              disclosure
            </Link>
          </p>
        </Reveal>
      </section>
    </>
  );
}
