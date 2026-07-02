import Link from "next/link";
import { GuideCard } from "@/components/guide-card";
import { ProductCard } from "@/components/product-card";
import { ProductThumb } from "@/components/product-thumb";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/fx/marquee";
import { Spotlight } from "@/components/fx/spotlight";
import { Reveal } from "@/components/motion/reveal";
import { getAllGuides } from "@/lib/guides";
import { getAllKits } from "@/lib/kits";
import { getAllProducts, getFeaturedProducts, getProductById } from "@/lib/products";
import { CATEGORIES } from "@/lib/categories";
import { FAILURE_MOMENTS } from "@/lib/content";

const BRANDS = ["NOCO", "Jackery", "VIOFO", "DeWalt", "Anker", "EcoFlow", "BLUETTI", "Fanttik", "Milwaukee", "Garmin", "Nextbase", "First Alert"];

const WHY = [
  { title: "Chosen on merit", body: "Every pick earns its spot on specs, reputation, and real buyer demand — not paid placement. We tell you the best one, and the catch." },
  { title: "Guides, not guesswork", body: "Real buying guides that explain what actually matters — peak amps, PSI, sensor quality, watt-hours — so you buy right the first time." },
  { title: "Honest by default", body: "Specs come from public research and manufacturer listings, never invented reviews. Prices are approximate; confirm on Amazon." },
];

export default function HomePage() {
  const heroes = getFeaturedProducts();
  const showcase = getProductById("noco-boost-gb40-1000a-ultrasafe") ?? heroes.find((p) => p.image) ?? heroes[0];
  const guides = getAllGuides();
  const [leadGuide, ...restGuides] = guides;
  const kits = getAllKits();

  return (
    <>
      <Hero product={showcase} stats={{ products: getAllProducts().length, guides: guides.length, kits: kits.length }} />

      {/* driver-moment strip */}
      <div className="border-y border-line glass-2">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2.5 gap-y-2 px-4 py-3.5 sm:px-6">
          <span className="eyebrow mr-1 shrink-0">When it matters</span>
          {FAILURE_MOMENTS.map((m) => (
            <Link key={m.label} href={`/category/${m.categorySlug}`} className="group rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-sm text-ink-dim transition-colors hover:border-accent hover:text-accent">
              <span className="font-semibold text-ink group-hover:text-accent">{m.label}</span>
              <span className="text-ink-faint"> — {m.line}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* brand marquee */}
      <div className="border-b border-line py-6">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-ink-faint">The brands worth buying</p>
        <Marquee items={BRANDS} />
      </div>

      {/* TOP 5 */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal blur={false}><SectionHead eyebrow="Start here" title="The five to know" href="/gear" linkLabel="All gear" /></Reveal>
        <Reveal blur={false}><p className="mt-4 max-w-2xl text-ink-dim">If you buy nothing else, these cover the most ground — one from each thing a driver actually needs.</p></Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {heroes.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <Spotlight className="h-full rounded-2xl"><ProductCard product={p} /></Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y border-line glass-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal blur={false}><SectionHead eyebrow="Shop by category" title="Six things worth owning" href="/gear" linkLabel="All gear" /></Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => {
              const lead = getProductById(c.heroProductId);
              return (
                <Reveal key={c.slug} delay={i * 0.04}>
                  <Spotlight className="h-full rounded-2xl">
                    <Link href={`/category/${c.slug}`} className="bbx-card card-lift group flex h-full flex-col overflow-hidden">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {lead ? <ProductThumb product={lead} className="h-full w-full" pad="p-8" /> : null}
                        <span className="absolute left-4 top-4 z-30 rounded-full bg-dark/75 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-on-dark-dim ring-1 ring-white/10">{c.lettermark}</span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-display text-xl font-semibold text-ink-strong transition-colors group-hover:text-accent">{c.name}</h3>
                        <p className="mt-1 text-[0.9rem] font-medium text-accent-strong">{c.tagline}</p>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{c.blurb}</p>
                        <span className="mt-3 text-sm font-semibold text-accent">Browse {c.name} →</span>
                      </div>
                    </Link>
                  </Spotlight>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal blur={false}><SectionHead eyebrow="Know what to buy" title="The buying guides" href="/guides" linkLabel="All guides" /></Reveal>
        <Reveal blur={false}><div className="mt-8"><GuideCard guide={leadGuide} featured /></div></Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restGuides.slice(0, 3).map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.05}><GuideCard guide={g} /></Reveal>
          ))}
        </div>
      </section>

      {/* KITS */}
      <section className="border-y border-line glass-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal blur={false}><SectionHead eyebrow="Build it right" title="Gear kits by problem" href="/kits" linkLabel="All kits" /></Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {kits.map((k, i) => {
              const lead = getProductById(k.buyFirstId);
              return (
                <Reveal key={k.id} delay={i * 0.05}>
                  <Spotlight className="h-full rounded-2xl">
                    <Link href={`/kits/${k.id}`} className="bbx-card card-lift group flex h-full flex-col overflow-hidden">
                      <div className="relative aspect-square overflow-hidden">{lead ? <ProductThumb product={lead} className="h-full w-full" pad="p-7" /> : null}</div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="font-display text-lg font-semibold text-ink-strong transition-colors group-hover:text-accent">{k.name}</h3>
                        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-dim">{k.tagline}</p>
                        <span className="mt-3 text-sm font-semibold text-accent">Build it →</span>
                      </div>
                    </Link>
                  </Spotlight>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal blur={false}>
          <span className="eyebrow eyebrow-accent">Why BlackBox</span>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold text-ink-strong sm:text-4xl">The right gear, chosen with care and explained straight.</h2>
        </Reveal>
        <div className="mt-9 grid gap-6 sm:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <div className="glass h-full rounded-2xl p-6">
                <span className="nums font-display text-2xl font-semibold text-accent">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-strong">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal blur={false}><div className="mt-6"><Link href="/disclosure" className="ulink text-sm font-semibold">How we choose &amp; how we earn →</Link></div></Reveal>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <NewsletterCta />
      </section>
    </>
  );
}

function SectionHead({ eyebrow, title, href, linkLabel }: { eyebrow: string; title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
      <div>
        <span className="eyebrow eyebrow-accent">{eyebrow}</span>
        <h2 className="mt-2.5 font-display text-[2.1rem] font-semibold leading-[1.05] text-ink-strong sm:text-5xl">{title}</h2>
      </div>
      {href && linkLabel ? <Link href={href} className="ulink hidden shrink-0 pb-1.5 text-sm font-semibold sm:block">{linkLabel} →</Link> : null}
    </div>
  );
}
