import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OutboundLink } from "@/components/outbound-link";
import { StickyCta } from "@/components/sticky-cta";
import { DecisionReceipt } from "@/components/decision-receipt";
import { MethodologyPanel } from "@/components/methodology-panel";
import { ProductCard } from "@/components/product-card";
import { ProductThumb } from "@/components/product-thumb";
import { BuyCta } from "@/components/product/buy-cta";
import { DecisionStrip } from "@/components/product/decision-strip";
import { CompareAlternatives } from "@/components/product/compare-alternatives";
import { ImageZoom } from "@/components/product/image-zoom";
import { getCategoryByName, getCategoryBySlug, categorySlug } from "@/lib/categories";
import { getAllGuidesForProduct } from "@/lib/guides";
import { KITS } from "@/lib/kits";
import { getAllProducts, getProductById, getRelatedProducts } from "@/lib/products";
import { GuideFaq } from "@/components/guide/guide-faq";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, productSchema, productFaqSchema } from "@/lib/schema";

export const dynamicParams = false;

/** Single honest "as of" date for approximate prices + the desk byline. No live-price fabrication. */
const AS_OF = "July 2026";

/** Clamp to a char budget on a word boundary (no mid-word cuts, no ellipsis). */
function clampWords(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const at = cut.lastIndexOf(" ");
  return (at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s,;:—-]+$/, "");
}

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Not found" };

  // Keyword-first title: "<Name> Review — <key spec/benefit>". The root layout template
  // appends " · BlackBox Supplies", so the brand is NOT repeated here. Budget the %s core so
  // the full tag stays near the ~60-char / 600px cutoff.
  const hook = (product.keySpec || product.bestFor).trim();
  const withHook = `${product.name} Review — ${hook}`;
  const title =
    hook && withHook.length <= 62
      ? withHook
      : clampWords(`${product.name} Review: specs, verdict & honest trade-offs`, 60);

  // Answer-first description (~150–160 chars): lead with the verdict, then who it's for,
  // trimmed to a word boundary. Never fabricated — all fields are editorial copy.
  const lead = (product.verdict || product.problemSolved).trim();
  const withWho =
    product.bestFor && `${lead} Best for ${product.bestFor.trim()}.`.length <= 160
      ? `${lead} Best for ${product.bestFor.trim()}.`
      : lead;
  const description = clampWords(withWho, 160);

  // OpenGraph is standalone (no template applied), so it keeps the brand for shareability.
  const ogTitle = `${title} · BlackBox Supplies`;
  return {
    title,
    description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      type: "article",
      title: ogTitle,
      description,
      url: `/products/${product.id}`,
      ...(product.image ? { images: [{ url: product.image }] } : {}),
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const meta = getCategoryByName(product.category);
  // Off-brand products keep their page but their (drift) category has no hub — render that
  // breadcrumb crumb as text, not a 404 link.
  const catHasHub = !!getCategoryBySlug(meta.slug);
  // Unified resolver: matches legacy AND comparison guides (the crown-jewel pages that
  // getGuidesForProduct never knew about).
  const guideRef = getAllGuidesForProduct(product.id)[0];
  const kit = KITS.find((k) =>
    [k.buyFirstId, ...k.starterIds, ...k.betterIds, ...k.premiumIds].includes(product.id)
  );
  const alternatives = getRelatedProducts(product, 3);
  // The two rivals CompareAlternatives actually renders (mirrors its own slice) — excluded from
  // the "More in {category}" grid below so the same picks aren't surfaced twice on one page.
  const comparedIds = new Set(
    alternatives.filter((p) => p.id !== product.id).slice(0, 2).map((p) => p.id),
  );
  const moreInCategory = getRelatedProducts(product, 6)
    .filter((p) => !comparedIds.has(p.id))
    .slice(0, 3);

  // Breadcrumb middle crumb = the product's vertical (not always "Gear"/car).
  const COOLING_CATS = new Set(["Portable AC", "Cooling Fans", "Personal Cooling", "Cooling Sleep", "Dorm Cooling"]);
  const CAR_CATS = new Set(["Jump Starters", "Tire Inflators", "Dash Cams", "Power & Charging", "Roadside Safety", "Car Utility"]);
  const vertical = COOLING_CATS.has(String(product.category))
    ? { label: "Cooling", href: "/heat" }
    : CAR_CATS.has(String(product.category))
      ? { label: "Car & roadside", href: "/gear" }
      : { label: "Useful gear", href: "/useful" };

  const hasReadMore =
    !!product.whyItMatters?.trim() || !!product.buyingNotes?.trim();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: vertical.label, path: vertical.href },
            ...(catHasHub ? [{ name: meta.name, path: `/category/${categorySlug(product.category)}` }] : []),
            { name: product.name, path: `/products/${product.id}` },
          ]),
        ]}
      />
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-dim">
        <Link href="/" className="hover:text-accent-strong">Home</Link>
        <span aria-hidden>/</span>
        <Link href={vertical.href} className="hover:text-accent-strong">{vertical.label}</Link>
        <span aria-hidden>/</span>
        {catHasHub ? (
          <Link href={`/category/${categorySlug(product.category)}`} className="hover:text-accent-strong">{meta.name}</Link>
        ) : (
          <span className="text-ink-dim">{meta.name}</span>
        )}
      </nav>

      {/* ── HERO HEADER — the name leads, then the instant-decision signals ────────────── */}
      <header className="mt-7 rise">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="eyebrow eyebrow-accent">{meta.name}</span>
          <span className="h-3 w-px bg-line-strong" aria-hidden />
          <span className="mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">{product.brand}</span>
        </div>
        <h1 className="mt-3.5 max-w-3xl text-balance font-display text-[2.15rem] font-semibold leading-[1.04] text-ink-strong headline-glow sm:text-[3rem]">
          {product.name}
        </h1>
        <p className="mt-3.5 text-sm text-ink-dim">
          By the{" "}
          <Link href="/methodology" className="ulink font-medium">BlackBox gear desk</Link>
          {" "}· Researched &amp; cited, not personally tested · Updated {AS_OF}
        </p>

        <DecisionStrip product={product} asOf={AS_OF} className="mt-7" />

        {/* Mobile/tablet: a buy action inside the first viewport. On lg+ the sticky buy card in
            the left rail is already in view, so this is hidden there to avoid a duplicate CTA. */}
        <BuyCta product={product} block disclosure="compact" className="mt-5 lg:hidden" />
      </header>

      {/* ── MAIN — lit product rail + the article ─────────────────────────────────────── */}
      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,0.92fr)_1.08fr]">
        {/* LEFT — cinematic hero image + sticky buy card (a lit object, not a white box) */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {/* hero image, lit by one amber lamp bleeding around the frame */}
          <div className="relative isolate">
            <div
              aria-hidden
              className="glow-amber absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 opacity-80"
            />
            <div className="grad-border-amber focal-glow relative overflow-hidden rounded-2xl">
              <ImageZoom image={product.image} name={product.name} className="aspect-[4/3] sm:aspect-square">
                <ProductThumb product={product} className="h-full w-full" pad="p-8 sm:p-10" />
              </ImageZoom>
            </div>
          </div>

          {/* buy card — big mono price + the one glowing amber CTA */}
          <div className="lit-card grad-border-amber mt-5 p-5 sm:p-6">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-ink-faint">
                  Typical price <span className="text-ink-faint/80">· as of {AS_OF}</span>
                </p>
                <p className="mono nums mt-1.5 text-[2.15rem] font-semibold leading-none text-ink-strong">{product.priceRange}</p>
              </div>
              <span className="pill-amber shrink-0">Approx.</span>
            </div>

            {product.keySpec ? (
              <div className="mt-4 rounded-xl border border-line-soft bg-well/60 p-3.5">
                <p className="mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-ink-faint">Key spec</p>
                <p className="mt-1 text-[0.9rem] leading-snug text-ink">{product.keySpec}</p>
              </div>
            ) : null}

            <BuyCta product={product} block disclosure="full" className="mt-5" />

            <p className="mt-3 text-xs leading-relaxed text-ink-dim">
              Opens the exact product on Amazon — confirm the model and current price there.
            </p>
          </div>

          {/* Sentinel: once this scrolls past, the mobile sticky buy bar slides up. */}
          <div id="sticky-cta-anchor" aria-hidden className="h-px w-full" />
        </div>

        {/* RIGHT — the writeup, read as ONE article ─────────────────────────────────── */}
        <div className="min-w-0">
          <p className="lede">{product.problemSolved}</p>

          {/* quick verdict — the warm block, distinct from every other section */}
          {product.verdict ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-accent/25 bg-accent-tint p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <span className="pill-amber">Quick verdict</span>
              </div>
              <p className="mt-3 text-[1.06rem] leading-relaxed text-ink">{product.verdict}</p>
              {product.bestFor ? (
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-2">
                  <span className="mono text-[0.62rem] uppercase tracking-[0.12em] text-accent-strong">Best for</span>
                  {"  "}
                  {product.bestFor}
                </p>
              ) : null}
            </div>
          ) : null}

          {/* key features */}
          {product.keyFeatures.length ? (
            <section className="mt-9">
              <h2 className="font-display text-xl font-semibold text-ink-strong">What earns it the pick</h2>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {product.keyFeatures.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[0.95rem] leading-snug text-ink-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 13 L9 17 L19 6" /></svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* what to know before you buy */}
          {product.cons.length ? (
            <section className="mt-9">
              <h2 className="font-display text-xl font-semibold text-ink-strong">The honest catch</h2>
              <p className="mt-1.5 text-sm text-ink-faint">What we&rsquo;d want you to know before you buy.</p>
              <ul className="mt-4 space-y-2.5">
                {product.cons.map((c) => (
                  <li key={c} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* the full picture — why it matters + what to check, as one prose cluster */}
          {hasReadMore ? (
            <section className="mt-9 space-y-6">
              {product.whyItMatters ? (
                <div>
                  <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-strong">Why it matters</span>
                  <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">{product.whyItMatters}</p>
                </div>
              ) : null}
              {product.buyingNotes ? (
                <div>
                  <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-strong">What to check when buying</span>
                  <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">{product.buyingNotes}</p>
                </div>
              ) : null}
            </section>
          ) : null}

          {/* buyer FAQ — accordion + FAQPage JSON-LD for AI-Overview / People-Also-Ask citations */}
          {product.faq?.length ? (
            <>
              <GuideFaq faq={product.faq} />
              <JsonLd data={productFaqSchema(product.faq)} />
            </>
          ) : null}

          {/* compare — what beats it / what it beats */}
          {alternatives.length ? (
            <>
              <div className="rule-fade my-9" />
              <CompareAlternatives product={product} alternatives={alternatives} />
            </>
          ) : null}

          <div className="rule-fade my-9" />

          {/* the decision receipt — the honest backbone */}
          <DecisionReceipt product={product} />

          {/* the research trail */}
          <MethodologyPanel updated={AS_OF} className="mt-6" />

          {/* repeat CTA after the receipt */}
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="font-display text-lg font-semibold text-ink-strong">Decided it&rsquo;s the one?</p>
              <p className="mt-1 text-sm text-ink-dim">Check the live price and exact model on Amazon.</p>
            </div>
            <OutboundLink product={product} variant="primary" disclosure="compact" className="shrink-0" />
          </div>
        </div>
      </div>

      {/* related guide + kit */}
      {(guideRef || kit) ? (
        <section className="mt-16 grid gap-5 sm:grid-cols-2">
          {guideRef ? (
            <Link href={`/guides/${guideRef.slug}`} className="lit-card lift group p-5">
              <span className="eyebrow eyebrow-accent">{guideRef.kind === "comparison" ? "Compared in a guide" : "Featured in a guide"}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink-strong group-hover:text-accent">{guideRef.title}</h3>
              <p className="mt-1 text-sm text-ink-dim">See how it stacks up against the field in {guideRef.categoryLabel}.</p>
            </Link>
          ) : null}
          {kit ? (
            <Link href={`/kits/${kit.id}`} className="lit-card lift group p-5">
              <span className="eyebrow eyebrow-accent">Part of a kit</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink-strong group-hover:text-accent">{kit.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-ink-dim">{kit.dek}</p>
            </Link>
          ) : null}
        </section>
      ) : null}

      {/* alternatives — excludes the rivals already shown in the compare table above */}
      {moreInCategory.length ? (
        <section className="mt-16 border-t border-line pt-12">
          <h2 className="font-display text-2xl font-semibold text-ink-strong">More in {meta.name}</h2>
          <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-3">
            {moreInCategory.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Mobile: persistent buy action once the top buy card scrolls away */}
      <StickyCta product={product} />
    </div>
  );
}
