import type { Metadata } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/guide-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { getAllGuides } from "@/lib/guides";
import { EXTRA_ARTICLES } from "@/lib/articles-extra";
import { COMPARISON_GUIDES } from "@/lib/comparison-guides";

export const metadata: Metadata = {
  title: "Buying Guides",
  description:
    "Practical, research-based buying guides — portable AC and cooling, car and roadside power, and the everyday gear worth owning. Source-linked picks, honest tradeoffs, no fake testing.",
};

export default function GuidesPage() {
  const guides = getAllGuides();
  const [lead, ...rest] = guides;
  const cooling = EXTRA_ARTICLES;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">Buying guides</span>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
          Figure out what to buy — before you need it.
        </h1>
        <p className="lede mt-4 max-w-2xl">
          Clear, research-based guides to the gear that matters. Each one ends in source-linked picks with
          honest tradeoffs — no fluff, no fake testing, no pressure.
        </p>
      </Reveal>

      {COMPARISON_GUIDES.length ? (
        <section className="mt-12">
          <Reveal blur={false}>
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
              <h2 className="font-display text-2xl font-semibold text-ink-strong sm:text-3xl">Interactive comparisons</h2>
              <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-accent-strong">Compare every option · sort · buy</span>
            </div>
          </Reveal>
          <Stagger className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMPARISON_GUIDES.map((g) => (
              <StaggerItem key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="bbx-card card-lift group flex h-full flex-col overflow-hidden ring-1 ring-accent/25">
                  {g.heroImage ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0c0906]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={g.heroImage} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[750ms] ease-out group-hover:scale-[1.06]" />
                      <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em] text-on-accent">★ Compare {g.products.length}</span>
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mono text-[0.65rem] uppercase tracking-[0.14em] text-accent-strong">{g.categoryLabel} · interactive</span>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink-strong transition-colors group-hover:text-accent">{g.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{g.dek}</p>
                    <span className="mt-3 text-sm font-semibold text-accent">Compare {g.products.length} side by side →</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      ) : null}

      {cooling.length ? (
        <section className="mt-14">
          <Reveal blur={false}>
            <h2 className="border-b border-line pb-4 font-display text-2xl font-semibold text-ink-strong sm:text-3xl">Cooling &amp; seasonal</h2>
          </Reveal>
          <Stagger className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cooling.map((a) => (
              <StaggerItem key={a.slug}>
                <Link href={`/guides/${a.slug}`} className="bbx-card card-lift group flex h-full flex-col overflow-hidden">
                  {a.heroImage ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0c0906]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.heroImage} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[750ms] ease-out group-hover:scale-[1.06]" />
                      <span className="absolute left-3 top-3 z-10 rounded-full bg-dark/80 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-on-dark-dim ring-1 ring-white/10">Guide</span>
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mono text-[0.65rem] uppercase tracking-[0.14em] text-accent-strong">{a.category} · {a.readMinutes} min read</span>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink-strong transition-colors group-hover:text-accent">{a.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{a.dek}</p>
                    <span className="mt-3 text-sm font-semibold text-accent">Read the guide →</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      ) : null}

      <section className="mt-14">
        <Reveal blur={false}>
          <h2 className="border-b border-line pb-4 font-display text-2xl font-semibold text-ink-strong sm:text-3xl">Car &amp; roadside</h2>
        </Reveal>
        <Reveal blur={false} className="mt-6">
          <GuideCard guide={lead} featured />
        </Reveal>
        <Stagger className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((g) => (
            <StaggerItem key={g.slug}>
              <GuideCard guide={g} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <div className="mt-16">
        <NewsletterCta />
      </div>
    </div>
  );
}
