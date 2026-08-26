import Link from "next/link";
import { ProductThumb } from "@/components/product-thumb";
import { Spotlight } from "@/components/fx/spotlight";
import type { Product } from "@/lib/products";
import { getOutboundLink, outboundRel } from "@/lib/product-link";
import type { GuideRef } from "@/lib/guides";
import type { ResolvedUseCase } from "@/components/category/category-data";
import { categoryAccent } from "@/components/category/category-hero";

/** Section opener — glowing brass rule + amber eyebrow + serif title, matching the homepage SectionHead. */
export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span
          className="h-[2px] w-7 rounded-full bg-accent"
          style={{ boxShadow: "0 0 10px -1px rgba(217,154,69,0.75)" }}
          aria-hidden
        />
        <span className="eyebrow eyebrow-accent">{eyebrow}</span>
      </div>
      <h2 className="section-title mt-3.5">{title}</h2>
      {sub ? <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-ink-dim">{sub}</p> : null}
      <div className="rule-fade mt-5" />
    </div>
  );
}

/**
 * The single best starting point — a prominent premium card pointing at the category's flagship
 * comparison guide (with the "what matters most" one-liner). When no guide exists for the category,
 * it degrades to a browse link into the vertical hub.
 */
export function StartHereCard({
  problem,
  whatMatters,
  guideHref,
  guideTitle,
  guideDek,
  guideMeta,
  fallbackHref,
  fallbackLabel,
}: {
  problem: string;
  whatMatters: string;
  guideHref?: string;
  guideTitle?: string;
  guideDek?: string;
  guideMeta?: string;
  fallbackHref: string;
  fallbackLabel: string;
}) {
  const hasGuide = Boolean(guideHref && guideTitle);
  const href = hasGuide ? guideHref! : fallbackHref;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
      {/* the problem, stated plainly */}
      <div className="flex flex-col justify-center">
        <span className="eyebrow eyebrow-accent">The problem</span>
        <p className="mt-3 font-display text-[1.5rem] font-medium leading-[1.3] text-ink sm:text-[1.7rem]">{problem}</p>
        <div className="mt-5 flex items-start gap-2.5">
          <span
            aria-hidden
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            style={{ boxShadow: "0 0 9px 0 rgba(217,154,69,0.75)" }}
          />
          <p className="text-[0.98rem] leading-relaxed text-ink-dim">
            <span className="font-semibold text-ink-2">What matters most —</span> {whatMatters}
          </p>
        </div>
      </div>

      {/* the single best starting point */}
      <Spotlight className="rounded-2xl">
        <Link href={href} className="lit-card grad-border-amber lift focal-glow group flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
          <div>
            <span className="pill-amber">Start here</span>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink-strong transition-colors group-hover:text-accent sm:text-[1.75rem]">
              {hasGuide ? guideTitle : fallbackLabel}
            </h3>
            <p className="mt-3 text-[1rem] leading-relaxed text-ink-dim">
              {hasGuide
                ? guideDek
                : "Browse every researched pick in this category — each links straight to its exact Amazon page, with the honest catch surfaced up front."}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-line-soft pt-5">
            <span className="mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-faint">
              {hasGuide ? guideMeta ?? "Interactive comparison" : "Full catalog"}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-bright">
              {hasGuide ? "Compare, then buy" : fallbackLabel}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12 H19 M13 6 L19 12 L13 18" />
              </svg>
            </span>
          </div>
        </Link>
      </Spotlight>
    </div>
  );
}

/** "Best for X" intent paths — deep-links into the specific product each intent resolves to. */
export function UseCasePaths({ cases }: { cases: ResolvedUseCase[] }) {
  if (cases.length < 2) return null;
  // Colour the whole rail for the category these intents belong to.
  const a = categoryAccent(String(cases[0]?.product.category ?? ""));
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cases.map((c, i) => (
        <Link
          key={`${c.label}-${c.product.id}`}
          href={`/products/${c.product.id}`}
          className="lit-card lift group relative flex min-h-[9.5rem] flex-col gap-2 overflow-hidden p-5"
        >
          {/* soft category bloom, top-right — intensifies on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-9 -top-9 h-24 w-24 rounded-full opacity-55 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(closest-side, ${a.lo}33, transparent 72%)` }}
          />
          {/* glowing numeral chip — the lit-instrument look */}
          <span
            className="mono relative inline-flex h-7 w-7 items-center justify-center rounded-lg border text-[0.66rem] font-semibold nums"
            style={{
              color: a.hi,
              borderColor: `${a.hi}88`,
              background: `radial-gradient(125% 125% at 50% 22%, ${a.lo}30, transparent 72%)`,
              boxShadow: `0 0 16px -6px ${a.lo}, inset 0 0 10px -6px ${a.hi}`,
            }}
          >
            0{i + 1}
          </span>
          <span className="mono mt-1 text-[0.6rem] uppercase tracking-[0.16em]" style={{ color: a.hi }}>
            Best for
          </span>
          <span className="font-display text-[1.05rem] font-semibold leading-snug text-ink-strong transition-colors group-hover:text-accent">
            {c.label}
          </span>
          <span className="text-[0.86rem] leading-relaxed text-ink-dim">{c.note}</span>
          <span className="mono mt-auto line-clamp-1 pt-2 text-[0.64rem] uppercase tracking-[0.1em] text-ink-faint transition-colors group-hover:text-accent-bright">
            {c.product.name} →
          </span>
        </Link>
      ))}
    </div>
  );
}

/**
 * The category's #1 pick as a large, art-directed spotlight card — image + rich verdict + the one
 * spec that matters + a direct "Check price on Amazon" CTA. Sits above the standard product grid.
 */
export function FeaturedSpotlight({ product }: { product: Product }) {
  const { href, isAffiliate } = getOutboundLink(product);
  const blurb = product.verdict || product.whyItMatters || product.problemSolved;
  const a = categoryAccent(String(product.category));
  return (
    <Spotlight className="rounded-2xl">
      <div className="lit-card grad-border-amber focal-glow lift group relative grid overflow-hidden sm:grid-cols-[minmax(0,0.95fr)_1.1fr]">
        <Link href={`/products/${product.id}`} className="relative block aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[20rem]">
          <ProductThumb product={product} className="h-full w-full" />
          {/* category lamp raking across the product from the top */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full opacity-70 mix-blend-screen"
            style={{ background: `radial-gradient(closest-side, ${a.lo}40, transparent 72%)` }}
          />
          <span className="pill-amber absolute left-4 top-4 z-10">Editor&rsquo;s pick</span>
        </Link>

        <div className="relative flex flex-col justify-center gap-4 p-6 sm:p-8">
          <div>
            <span className="eyebrow" style={{ color: a.hi }}>{product.brand || String(product.category)}</span>
            <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink-strong sm:text-[1.9rem]">
              <Link href={`/products/${product.id}`} className="transition-colors hover:text-accent">
                {product.name}
              </Link>
            </h3>
          </div>
          {blurb ? <p className="text-[1.02rem] leading-relaxed text-ink-dim">{blurb}</p> : null}
          {product.keySpec ? (
            <div className="flex items-start gap-2.5">
              <span
                aria-hidden
                className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: a.hi, boxShadow: `0 0 8px 0 ${a.lo}` }}
              />
              <p className="mono line-clamp-2 text-[0.72rem] leading-relaxed text-ink-faint">{product.keySpec}</p>
            </div>
          ) : null}
          <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span
              className="nums font-display text-[1.7rem] font-medium text-ink-strong"
              style={{ textShadow: `0 0 22px ${a.lo}3a` }}
            >
              {product.priceRange}
            </span>
            <a href={href} target="_blank" rel={outboundRel(isAffiliate)} className="cta-amber text-[0.92rem]">
              Check price on Amazon
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 17 L17 7 M9 7 h8 v8" />
              </svg>
            </a>
            <Link href={`/products/${product.id}`} className="ulink text-sm font-semibold">
              Full breakdown
            </Link>
          </div>
        </div>
      </div>
    </Spotlight>
  );
}

/** Related guides — cross-links to sibling money pages so the hub is a real hub, not a dead end. */
export function RelatedGuides({ guides }: { guides: GuideRef[] }) {
  if (!guides.length) return null;
  const AMBER = { hi: "#edba66", lo: "#d99a45" };
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((g) => {
        const isCompare = g.kind === "comparison";
        return (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="lit-card lift group relative flex h-full flex-col overflow-hidden p-5"
          >
            {/* soft brass bloom, top-right */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-9 -top-9 h-24 w-24 rounded-full opacity-50 transition-opacity duration-500 group-hover:opacity-90"
              style={{ background: `radial-gradient(closest-side, ${AMBER.lo}30, transparent 72%)` }}
            />
            <div className="flex items-center gap-3">
              {/* glowing guide glyph chip */}
              <span
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                style={{
                  borderColor: `${AMBER.hi}aa`,
                  background: `radial-gradient(125% 125% at 50% 22%, ${AMBER.lo}33, transparent 72%)`,
                  boxShadow: `0 0 18px -6px ${AMBER.lo}, inset 0 0 10px -6px ${AMBER.hi}`,
                }}
              >
                <svg
                  className="h-[1.05rem] w-[1.05rem]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={AMBER.hi}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: `drop-shadow(0 0 4px ${AMBER.lo})` }}
                  aria-hidden
                >
                  {isCompare ? (
                    <>
                      <path d="M4 7h7M4 12h7M4 17h7" />
                      <path d="M17 5v14M14.5 7.5 17 5l2.5 2.5M19.5 16.5 17 19l-2.5-2.5" />
                    </>
                  ) : (
                    <>
                      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5z" />
                      <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5z" />
                    </>
                  )}
                </svg>
              </span>
              <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-strong">
                {isCompare ? "Comparison guide" : "Buying guide"}
              </span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink-strong transition-colors group-hover:text-accent">
              {g.title}
            </h3>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-accent">
              Read the guide
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12 H19 M13 6 L19 12 L13 18" />
              </svg>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
