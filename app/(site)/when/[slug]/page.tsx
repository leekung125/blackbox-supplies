import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SCENARIOS, getScenario, type ScenarioBuy } from "@/lib/scenarios";
import { getProductById, type Product } from "@/lib/products";
import { OutboundLink } from "@/components/outbound-link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { EDITOR } from "@/lib/content";

export const dynamicParams = false;
const BASE = "https://www.blackboxsupplies.com";

export function generateStaticParams() {
  return SCENARIOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getScenario(slug);
  if (!s) return {};
  return {
    title: s.h1,
    description: s.metaDescription,
    alternates: { canonical: `/when/${s.slug}` },
    openGraph: { type: "article", title: s.h1, description: s.metaDescription, url: `/when/${s.slug}` },
  };
}

/** A compact product card: real plate + name + price + the honest Amazon CTA. */
function BuyCard({ product }: { product: Product }) {
  return (
    <div className="lit-card flex flex-col overflow-hidden sm:flex-row">
      <div className="relative aspect-square w-full shrink-0 bg-[#0c0906] sm:w-40">
        {product.image ? (
          <Image src={product.image} alt={product.name} fill sizes="160px" className="object-cover" />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="mono text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">{product.category}</span>
        <h3 className="mt-1 font-display text-[1.05rem] font-semibold leading-snug text-ink-strong">{product.name}</h3>
        {product.verdict ? <p className="mt-1.5 line-clamp-2 text-[0.85rem] leading-relaxed text-ink-dim">{product.verdict}</p> : null}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <OutboundLink product={product} disclosure="none" />
          {product.priceRange ? <span className="mono text-[0.8rem] font-semibold text-accent-bright">{product.priceRange}</span> : null}
        </div>
      </div>
    </div>
  );
}

function BuyBlock({ buy }: { buy: ScenarioBuy }) {
  const products = buy.productIds.map(getProductById).filter((p): p is Product => Boolean(p));
  return (
    <>
      <p className="article mt-3 text-[1.02rem] leading-relaxed text-ink-dim">{buy.blurb}</p>
      <div className="mt-6 grid gap-4">
        {products.map((p) => <BuyCard key={p.id} product={p} />)}
      </div>
      {buy.guideHref ? (
        <Link href={buy.guideHref} className="ulink mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
          {buy.guideLabel ?? "Compare all the options"} <span aria-hidden>→</span>
        </Link>
      ) : null}
    </>
  );
}

export default async function ScenarioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getScenario(slug);
  if (!s) notFound();

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: s.h1,
    description: s.metaDescription,
    step: s.doNow.map((st, i) => ({ "@type": "HowToStep", position: i + 1, name: st.step, text: st.detail })),
  };
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: s.h1,
    description: s.metaDescription,
    author: { "@type": "Person", name: EDITOR.name, jobTitle: EDITOR.role, url: `${BASE}/methodology` },
    publisher: { "@type": "Organization", name: "BlackBox Supplies", url: BASE },
    mainEntityOfPage: `${BASE}/when/${s.slug}`,
  };
  const related = s.related.map(getScenario).filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "When it breaks", path: "/when" }, { name: s.situation, path: `/when/${s.slug}` }]),
        howTo, article, faqSchema(s.faq),
      ]} />

      {/* header */}
      <span className="eyebrow eyebrow-accent">{s.eyebrow}</span>
      <h1 className="mt-3 text-balance font-display text-[2rem] font-semibold leading-[1.06] text-ink-strong sm:text-[2.7rem]">{s.h1}</h1>
      <p className="lede mt-5 text-pretty">{s.intro}</p>
      <p className="mono mt-4 text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint">
        By {EDITOR.name} · Researched &amp; cited · Updated {s.updated}
      </p>

      {/* DO THIS NOW — the free triage (trust + information gain) */}
      <section className="mt-12">
        <div className="flex items-center gap-2.5">
          <span className="h-px w-6 bg-accent" aria-hidden />
          <span className="eyebrow eyebrow-accent">Do this now — free</span>
        </div>
        <h2 className="section-title mt-3">Before you buy anything</h2>
        <ol className="mt-6 space-y-4">
          {s.doNow.map((st, i) => (
            <li key={st.step} className="lit-card flex gap-4 p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-tint font-display text-[1.05rem] font-semibold text-accent-bright">{i + 1}</span>
              <div className="min-w-0">
                <h3 className="font-display text-[1.1rem] font-semibold text-ink-strong">{st.step}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-dim text-pretty">{st.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FIX IT NOW */}
      <section className="mt-14">
        <div className="flex items-center gap-2.5">
          <span className="h-px w-6 bg-accent" aria-hidden />
          <span className="eyebrow eyebrow-accent">Fix it now</span>
        </div>
        <h2 className="section-title mt-3">The one thing that solves it today</h2>
        <BuyBlock buy={s.fixNow} />
      </section>

      {/* PREVENT */}
      <section className="mt-14">
        <div className="flex items-center gap-2.5">
          <span className="h-px w-6 bg-accent" aria-hidden />
          <span className="eyebrow eyebrow-accent">So it never happens again</span>
        </div>
        <h2 className="section-title mt-3">Never get caught here twice</h2>
        <BuyBlock buy={s.prevent} />
      </section>

      {/* FAQ */}
      <section className="mt-14">
        <h2 className="section-title">Questions people ask</h2>
        <div className="mt-6 divide-y divide-line-soft">
          {s.faq.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-[1.05rem] font-semibold text-ink-strong marker:content-none">
                {f.q}
                <span aria-hidden className="shrink-0 text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-dim text-pretty">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {related.length ? (
        <section className="mt-14 border-t border-line pt-8">
          <span className="eyebrow eyebrow-accent">Also worth knowing</span>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r!.slug} href={`/when/${r!.slug}`} className="lit-card lift group p-5">
                <span className="mono text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">{r!.eyebrow}</span>
                <p className="mt-1.5 font-display text-[1.1rem] font-semibold text-ink-strong transition-colors group-hover:text-accent-bright">{r!.situation}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
