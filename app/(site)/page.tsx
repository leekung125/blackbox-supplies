import Link from "next/link";
import Image from "next/image";
import { NewsletterCta } from "@/components/newsletter-cta";
import { TrustStrip } from "@/components/trust-strip";
import { Spotlight } from "@/components/fx/spotlight";
import { Reveal } from "@/components/motion/reveal";
import { getAllArticles } from "@/lib/articles";
import { getAllProducts } from "@/lib/products";
import { COMPARISON_GUIDES } from "@/lib/comparison-guides";
import heatData from "@/data/heat-products.json";
import usefulData from "@/data/useful-products.json";

function lowPrice(pr: string) {
  const m = pr.match(/([0-9][0-9,]*)/);
  return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
}
// Premium only — BlackBox carries gear worth owning.
const HEAT_COUNT = (heatData as { priceRange: string }[]).filter((p) => lowPrice(p.priceRange) >= 50).length;
const USEFUL_COUNT = (usefulData as { priceRange: string }[]).filter((p) => lowPrice(p.priceRange) >= 50).length;
const CAR_CATS = new Set(["Jump Starters", "Tire Inflators", "Dash Cams", "Power & Charging", "Roadside Safety", "Car Utility"]);
const CAR_COUNT = getAllProducts().filter((p) => CAR_CATS.has(p.category as string)).length;

const VERTICALS = [
  {
    href: "/heat",
    name: "Cooling",
    tag: "Beat the heat",
    blurb: "Portable AC, fans, and evaporative coolers for apartments and dorms with no central air.",
    image: "/home/cool.jpg",
    count: HEAT_COUNT,
  },
  {
    href: "/useful",
    name: "Genuinely useful upgrades",
    tag: "Gear worth owning",
    blurb: "A curated shortlist of desk, charging, sleep, and travel upgrades built to last — not cheap gadgets.",
    image: "/home/useful.jpg",
    count: USEFUL_COUNT,
  },
  {
    href: "/gear",
    name: "Car & roadside",
    tag: "For when the road goes wrong",
    blurb: "Jump starters, tire inflators, dash cams, and emergency kits — the gear worth keeping in the trunk.",
    image: "/home/car.jpg",
    count: CAR_COUNT,
  },
];

const FEATURED_SLUGS = [
  "best-portable-ac-no-central-air",
  "how-to-cool-a-room-with-no-ac",
  "best-cooling-mattress-topper-hot-sleepers",
];

const WHY = [
  { title: "Chosen on merit", body: "Every pick earns its spot on specs, reputation, and real buyer demand — not paid placement. We tell you the best one, and the catch." },
  { title: "Guides, not guesswork", body: "Real buying guides that explain what actually matters, so you buy right the first time instead of returning it a week later." },
  { title: "Honest by default", body: "Specs come from public research and manufacturer listings, never invented reviews. Prices are approximate — confirm on Amazon." },
];

export default function HomePage() {
  const articles = getAllArticles();
  const featured = FEATURED_SLUGS.map((s) => articles.find((a) => a.slug === s)).filter(Boolean).slice(0, 3);
  const acCompare = COMPARISON_GUIDES[0];
  const totalPicks = getAllProducts().length;

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {/* ambient cinematic depth — warm aurora sunk behind the hero, a faint top hairline of light */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 right-[-10%] h-[46rem] w-[52rem] rounded-full opacity-70" style={{ background: "radial-gradient(46% 46% at 60% 42%, rgba(217,154,69,0.13), rgba(217,154,69,0.03) 46%, transparent 72%)" }} />
          <div className="absolute -top-24 left-[-12%] h-[38rem] w-[42rem] rounded-full opacity-60" style={{ background: "radial-gradient(50% 50% at 40% 40%, rgba(120,90,180,0.08), transparent 70%)" }} />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20 lg:pt-24">
          <div className="max-w-xl">
            <span className="eyebrow eyebrow-accent block">Cooling · Useful gear · Car &amp; roadside</span>
            <h1 className="mt-5 font-display text-[2.9rem] font-semibold leading-[0.96] tracking-[-0.03em] text-ink-strong sm:text-6xl lg:text-[4.1rem]">
              Genuinely useful gear<span className="text-accent">.</span>
              <span className="mt-2 block text-[0.56em] font-medium leading-tight text-ink-dim">
                The stuff you didn&rsquo;t know you needed — until the moment you did.
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-dim">
              Real, researched picks that solve real problems: cooling for a no-AC apartment, clever home and desk
              upgrades, car and roadside essentials. Chosen on merit, explained straight, linked to the exact one to buy.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/useful"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-semibold text-on-accent shadow-[0_10px_40px_-8px_rgba(217,154,69,0.5)] transition-colors hover:bg-accent-strong"
              >
                Browse useful gear
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12 H19 M13 6 L19 12 L13 18" /></svg>
              </Link>
              <Link href="/heat" className="inline-flex items-center rounded-full border border-line-strong glass px-7 py-3.5 text-[0.95rem] font-semibold text-ink transition-colors hover:border-accent hover:text-accent">Beat the heat</Link>
            </div>
            <div className="mt-10 flex gap-8">
              {[{ n: `${totalPicks}+`, label: "researched picks" }, { n: `${articles.length}`, label: "buying guides" }, { n: "0", label: "paid placements" }].map((st) => (
                <div key={st.label}>
                  <div className="nums font-display text-3xl font-semibold text-ink-strong">{st.n}</div>
                  <div className="mt-0.5 text-xs uppercase tracking-wide text-ink-dim">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* showcase — this week's cooling pick */}
          <Reveal blur={false}>
            <div className="relative mx-auto w-full max-w-[25rem]">
              <div className="glow-blob left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 opacity-80" />
              <Link href="/heat" className="hero-float relative block aspect-square overflow-hidden rounded-[1.5rem] border border-line-strong bg-[#0c0906] shadow-[0_0_60px_-4px_rgba(217,154,69,0.28),0_46px_90px_-34px_rgba(0,0,0,0.85)]">
                <Image src="/home/hero.jpg" alt="A cool, calm room at golden hour — genuinely useful gear in context" fill priority sizes="(max-width: 1024px) 90vw, 420px" className="object-cover" />
                <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/[0.06]" />
              </Link>
              <p className="eyebrow eyebrow-accent mt-5 text-center">This week — beat the heat →</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST BAND — why believe this */}
      <TrustStrip />

      {/* VERTICALS */}
      <section className="border-y border-line glass-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal blur={false}><SectionHead eyebrow="What we cover" title="Three things worth owning" /></Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VERTICALS.map((v, i) => (
              <Reveal key={v.href} delay={i * 0.05}>
                <Spotlight className="h-full rounded-2xl">
                  <Link href={v.href} className="bbx-card card-lift group flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#0c0906]">
                      <Image src={v.image} alt={v.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-[750ms] ease-out group-hover:scale-[1.05]" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="eyebrow eyebrow-accent">{v.tag}</span>
                      <h3 className="mt-1.5 font-display text-xl font-semibold text-ink-strong transition-colors group-hover:text-accent">{v.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{v.blurb}</p>
                      <span className="mt-3 text-sm font-semibold text-accent">{v.count} picks →</span>
                    </div>
                  </Link>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal blur={false}><SectionHead eyebrow="Read before you buy" title="The buying guides" href="/guides" linkLabel="All guides" /></Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {acCompare ? (
            <Reveal>
              <Link href={`/guides/${acCompare.slug}`} className="bbx-card card-lift group flex h-full flex-col p-5 ring-1 ring-accent/30">
                <span className="mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-accent-bright">★ Interactive · compare {acCompare.products.length}</span>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink-strong transition-colors group-hover:text-accent">{acCompare.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">Sort by cooling, quiet, or price — the winner rises to the top, each links straight to Amazon.</p>
                <span className="mt-3 text-sm font-semibold text-accent">Compare &amp; pick →</span>
              </Link>
            </Reveal>
          ) : null}
          {featured.map((a, i) => (
            <Reveal key={a!.slug} delay={(i + 1) * 0.05}>
              <Link href={`/guides/${a!.slug}`} className="bbx-card card-lift group flex h-full flex-col p-5">
                <span className="mono text-[0.65rem] uppercase tracking-[0.14em] text-accent-strong">{a!.category}</span>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink-strong transition-colors group-hover:text-accent">{a!.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{a!.dek}</p>
                <span className="mt-3 text-sm font-semibold text-accent">{a!.readMinutes} min read →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal blur={false}>
            <span className="eyebrow eyebrow-accent">Why BlackBox</span>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold text-ink-strong sm:text-4xl">Genuinely useful gear, chosen with care and explained straight.</h2>
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
        </div>
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
