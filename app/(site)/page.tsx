import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { NewsletterCta } from "@/components/newsletter-cta";
import { ProblemNavigator } from "@/components/home/problem-navigator";
import { FeaturedComparison } from "@/components/home/featured-comparison";
import { Spotlight } from "@/components/fx/spotlight";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { getAllArticles } from "@/lib/articles";
import { getAllProducts, getProductById, isMainProduct, type Product } from "@/lib/products";
import { TOTAL_PICKS, BROWSABLE_PICKS, TOTAL_GUIDES, CAR_PICKS, approx } from "@/lib/site-stats";
import { COMPARISON_GUIDES } from "@/lib/comparison-guides";
import { KITS } from "@/lib/kits";
import { KitBundleCard } from "@/components/home/kit-bundle-card";
import { QuickFixesRail } from "@/components/home/quick-fixes-rail";
import { JsonLd } from "@/components/json-ld";
import { webPageSchema } from "@/lib/schema";
import heatData from "@/data/heat-products.json";
import usefulData from "@/data/useful-products.json";

function lowPrice(pr: string) {
  const m = pr.match(/([0-9][0-9,]*)/);
  return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
}
// Premium + on-brand only — BlackBox carries utility gear worth owning (off-brand drift excluded).
const HEAT_COUNT = (heatData as { priceRange: string; offBrand?: boolean }[]).filter((p) => !p.offBrand && lowPrice(p.priceRange) >= 50).length;
const USEFUL_COUNT = (usefulData as { priceRange: string; offBrand?: boolean }[]).filter((p) => !p.offBrand && lowPrice(p.priceRange) >= 50).length;
// Car & roadside count comes from lib/site-stats so this card can never again
// disagree with the /gear page it links to.
const CAR_COUNT = CAR_PICKS;

const VERTICALS = [
  {
    href: "/gear",
    name: "Car & roadside",
    tag: "For when the road goes wrong",
    blurb: "Jump starters, tire inflators, dash cams, and emergency kits — the gear worth keeping in the trunk.",
    image: "/brand/hero-car.png",
    count: CAR_COUNT,
  },
  {
    href: "/heat",
    name: "Cooling",
    tag: "Beat the heat",
    blurb: "Portable AC, fans, and evaporative coolers for apartments and dorms with no central air.",
    image: "/brand/hero-cooling.png",
    count: HEAT_COUNT,
  },
  {
    href: "/useful",
    name: "Work & everyday utility",
    tag: "Gear worth owning",
    blurb: "Practical work-desk and everyday-carry upgrades — charging, power, mounts, trackers, and multitools built to last.",
    image: "/brand/hero-desk.png",
    count: USEFUL_COUNT,
  },
];

// Real, on-brand readiness articles (the prior slugs didn't exist → the section rendered empty).
const FEATURED_SLUGS = [
  "best-jump-starter-diesel-truck-cold-winter",
  "winter-car-emergency-kit-new-driver",
  "best-power-station-apartment-power-outage",
];

const WHY = [
  { title: "Chosen on merit", body: "Every pick earns its spot on specs, reputation, and real buyer demand — not paid placement. We tell you the best one, and the catch." },
  { title: "Guides, not guesswork", body: "Real buying guides that explain what actually matters, so you buy right the first time instead of returning it a week later." },
  { title: "Honest by default", body: "Specs come from public research and manufacturer listings, never invented reviews. Prices are approximate — confirm on Amazon." },
];

// The home page is the ONE page that should canonical to "/" (the global canonical was removed
// from the root layout because it leaked onto every page).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const articles = getAllArticles();
  const featured = FEATURED_SLUGS.map((s) => articles.find((a) => a.slug === s)).filter(Boolean).slice(0, 3);
  const flagship = COMPARISON_GUIDES.find((g) => g.slug === "best-jump-starters-compared") ?? COMPARISON_GUIDES[0];
  const otherGuides = COMPARISON_GUIDES.filter((g) => g.slug !== flagship.slug);

  // Homepage identity node + an ItemList of the primary verticals (the "what we cover" map)
  // so crawlers + AI Overviews get a clean, citable model of the site's top-level sections.
  const HOME_BASE = "https://www.blackboxsupplies.com";
  const homeVerticals = [
    { name: "Cooling", path: "/heat" },
    { name: "Car & roadside", path: "/gear" },
    { name: "Useful gear", path: "/useful" },
    { name: "Buying guides", path: "/guides" },
  ];
  const homeItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BlackBox Supplies — what we cover",
    numberOfItems: homeVerticals.length,
    itemListElement: homeVerticals.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: v.name,
      url: `${HOME_BASE}${v.path}`,
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/",
            "BlackBox Supplies — Utility & Readiness Gear, Researched",
            "Utility and readiness gear for real problems — dead batteries, flat tires, outages, heat. Researched, compared, and cited buying guides plus honest picks across cooling, car & roadside, and everyday useful gear.",
          ),
          homeItemList,
        ]}
      />
      {/* Page-scoped cinema: entrance cascade, slow ken-burns settle, drifting embers.
          Pure CSS, always ends visible, fully reduced-motion gated. */}
      <style>{`
        .bbxh-scene { position: absolute; inset: 0; animation: bbxh-drift 26s cubic-bezier(0.22,1,0.36,1) both; will-change: transform; }
        @keyframes bbxh-drift { from { transform: scale(1.07) translateX(1.2%); } to { transform: scale(1) translateX(0); } }
        .bbxh-in { opacity: 0; animation: bbxh-rise 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes bbxh-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        /* LCP headline: paints immediately (opacity stays 1) — only a subtle transform settles in. */
        .bbxh-h1 { animation: bbxh-h1 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes bbxh-h1 { from { transform: translateY(10px); } to { transform: translateY(0); } }
        .bbxh-d1 { animation-delay: 0.08s; } .bbxh-d2 { animation-delay: 0.2s; } .bbxh-d3 { animation-delay: 0.34s; }
        .bbxh-d4 { animation-delay: 0.48s; } .bbxh-d5 { animation-delay: 0.62s; }
        .bbxh-tick { transform-origin: left; animation: bbxh-tick 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        @keyframes bbxh-tick { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .bbxh-ember { position: absolute; bottom: 8%; width: 4px; height: 4px; border-radius: 9999px;
          background: radial-gradient(circle, #ffd9a0, #d99a45 60%, transparent);
          box-shadow: 0 0 8px 1px rgba(217,154,69,0.65); opacity: 0;
          animation: bbxh-ember 11s linear infinite; }
        @keyframes bbxh-ember {
          0% { opacity: 0; transform: translate3d(0, 0, 0) scale(0.7); }
          8% { opacity: 0.85; }
          55% { opacity: 0.5; }
          100% { opacity: 0; transform: translate3d(2.2rem, -78vh, 0) scale(0.25); } }
        .bbxh-stat { position: relative; transition: transform 0.4s cubic-bezier(0.22,1,0.36,1); }
        .bbxh-stat::before { content: ""; position: absolute; top: -1.55rem; left: 0; height: 2px; width: 1.6rem; border-radius: 2px;
          background: linear-gradient(90deg, var(--color-accent), transparent); opacity: 0.85; }
        .bbxh-stat:hover { transform: translateY(-2px); }
        .fcx-fill { transform-origin: left; animation: fcx-fill 1.1s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes fcx-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @media (prefers-reduced-motion: reduce) {
          .bbxh-scene, .bbxh-in, .bbxh-h1, .bbxh-tick, .fcx-fill { animation: none; opacity: 1; transform: none; }
          .bbxh-ember { display: none; }
          .bbxh-stat:hover { transform: none; }
        }
      `}</style>

      {/* HERO — the cinematic "Gear Decision Cockpit" scene; headline reads over a warm-to-clear scrim */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          {/* the scene: landscape on desktop, portrait crop on mobile — slow ken-burns settle */}
          <div className="bbxh-scene">
            {/* Field CWV is mobile-weighted, so only the mobile crop gets priority (preloaded).
                The desktop crop is off-screen for phones — lazy so we don't ship ~2.7MB per visit. */}
            <Image src="/brand/hero-command.png" alt="" fill sizes="100vw" className="hidden object-cover object-center sm:block" />
            <Image src="/brand/hero-command-mobile.png" alt="" fill priority sizes="100vw" className="object-cover object-center sm:hidden" />
          </div>
          {/* readability scrims: dark on the left (behind copy) fading to reveal the gear + glow on the right */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #070504 0%, rgba(7,5,4,0.93) 24%, rgba(7,5,4,0.6) 50%, rgba(7,5,4,0.18) 76%, rgba(7,5,4,0.05) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, #070504 2%, rgba(7,5,4,0.25) 26%, transparent 56%)" }} />
          <div className="absolute inset-0 sm:hidden" style={{ background: "linear-gradient(0deg, #070504 0%, rgba(7,5,4,0.4) 34%, rgba(7,5,4,0.55) 100%)" }} />
          {/* the lamp: a breathing amber bloom over the gear side of the scene */}
          <div className="glow-amber-soft scn-breathe right-[-8%] top-[6%] hidden h-[62%] w-[46%] sm:block" style={{ opacity: 0.7 }} />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
          {/* drifting embers — sparks rising off the amber lamp */}
          <div className="bbxh-ember left-[58%]" style={{ animationDelay: "0s" }} />
          <div className="bbxh-ember left-[72%]" style={{ animationDelay: "3.4s", animationDuration: "13s" }} />
          <div className="bbxh-ember left-[84%]" style={{ animationDelay: "6.8s", animationDuration: "10s" }} />
          <div className="bbxh-ember left-[64%]" style={{ animationDelay: "8.6s", animationDuration: "14s" }} />
        </div>
        <div className="mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 lg:min-h-[90vh]">
          <div className="max-w-xl">
            <div className="bbxh-in bbxh-d1 flex items-center gap-2.5">
              <span className="bbxh-tick h-px w-6 bg-accent" aria-hidden />
              <span className="mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent-bright">The utility field guide</span>
            </div>
            <h1 className="bbxh-h1 hero-display headline-glow mt-6 text-ink-strong">
              The right gear,<br />before you <span className="amber-word" style={{ textShadow: "0 0 34px rgba(237,186,102,0.45)" }}>need</span> it.
            </h1>
            <p className="bbxh-in bbxh-d3 mt-6 max-w-md text-[1.15rem] leading-relaxed text-ink/90">
              Utility &amp; readiness gear for real problems — dead batteries, flat tires, outages, heat. We research,
              compare, and cite, so you decide in minutes: what to buy, why it wins, and the honest catch.
            </p>
            <div className="bbxh-in bbxh-d4 mt-9 flex flex-wrap items-center gap-4">
              <Link href="#start-here" className="cta-amber cta-sheen">
                What&rsquo;s the problem?
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 5 V19 M6 13 L12 19 L18 13" /></svg>
              </Link>
              <Link href="/guides" className="group inline-flex items-center gap-1.5 py-2 text-[0.95rem] font-semibold text-ink transition-colors hover:text-accent-bright">
                Compare the picks
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12 H19 M13 6 L19 12 L13 18" /></svg>
              </Link>
            </div>
            <div className="bbxh-in bbxh-d5 relative mt-12 flex gap-10 pt-6">
              <div aria-hidden className="rule-fade absolute inset-x-0 top-0" />
              {/* "N+" is rounded DOWN via approx() so the claim stays true as the catalog moves; the
                  exact totals live on /about. Guides = every published guide page, not just articles. */}
              {[{ n: approx(TOTAL_PICKS), s: "+", label: "researched picks" }, { n: TOTAL_GUIDES, s: "", label: "buying guides" }, { n: 0, s: "", label: "paid placements" }].map((st) => (
                <div key={st.label} className="bbxh-stat">
                  <div className="nums font-display text-[2.4rem] font-medium leading-none text-ink-strong">
                    <CountUp to={st.n} /><span className="text-accent-bright" style={{ textShadow: "0 0 18px rgba(237,186,102,0.5)" }}>{st.s}</span>
                  </div>
                  <div className="mono mt-2 text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE — a moving chapter seam (replaces the static trust strip) */}
      <div className="full-bleed border-y border-line-strong bg-[#191309]">
        <div className="marquee py-4">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <div className="flex" key={k} aria-hidden={k === 1}>
                {["Zero paid placements", "Cited specs", `${approx(TOTAL_PICKS)}+ researched picks`, "Updated regularly", "Honest tradeoffs", "No fake testing"].map((t) => (
                  <span key={t} className="marquee-item">{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* START HERE — problem-first router (the 5-second "where do I click" answer) */}
      <section id="start-here" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
        <Reveal blur={false}>
          <ProblemNavigator />
        </Reveal>
      </section>

      {/* VERTICALS */}
      <section className="border-y border-line glass-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal blur={false}><SectionHead eyebrow="What we cover" title="Three things worth owning" href="/products" linkLabel="Shop all" /></Reveal>
          {/* Each vertical count is a main-grid subset, so it's deliberately smaller than the headline
              total — say so, rather than let three numbers quietly fail to add up to it. */}
          <Reveal blur={false}>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-dim">
              Each number below is that vertical&rsquo;s main grid — cooling and useful gear over $50, car
              &amp; roadside over $25. All {BROWSABLE_PICKS} picks over $25 sit together in{" "}
              <Link href="/products" className="ulink font-semibold">shop all</Link>; the cheaper quick fixes
              are further down this page.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VERTICALS.map((v, i) => (
              <Reveal key={v.href} delay={i * 0.05}>
                <Spotlight className="h-full rounded-2xl">
                  <Link href={v.href} className="lit-card lift group flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#0c0906]">
                      <Image src={v.image} alt={v.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-[750ms] ease-out group-hover:scale-[1.05]" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="eyebrow eyebrow-accent">{v.tag}</span>
                      <h3 className="mt-1.5 font-display text-xl font-semibold text-ink-strong transition-colors group-hover:text-accent">{v.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{v.blurb}</p>
                      <span className="mt-3 text-sm font-semibold text-ink-dim transition-colors group-hover:text-accent-bright">{v.count} picks →</span>
                    </div>
                  </Link>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE & DECIDE — lead with a REAL ranked comparison, then a quiet list of the rest */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal blur={false}><SectionHead eyebrow="Compare &amp; decide" title="Every option, side by side" href="/guides" linkLabel="All guides" /></Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <Reveal blur={false} className="min-w-0">
            <FeaturedComparison guide={flagship} />
          </Reveal>
          <Reveal blur={false} delay={0.08} className="min-w-0">
            <div className="lit-card grad-border flex h-full flex-col overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line-soft px-5 py-4">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(217,154,69,0.55)]" />
                <span className="mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">More head-to-heads</span>
              </div>
              <div className="flex flex-1 flex-col divide-y divide-line-soft">
                {otherGuides.map((g) => (
                  <Link key={g.slug} href={`/guides/${g.slug}`} className="group flex flex-1 items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-surface-2">
                    {/* glowing comparison chip — the "side by side" glyph, lit like the nav badges */}
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-accent-bright transition-transform duration-300 group-hover:scale-105"
                      style={{
                        border: "1px solid #edba66bb",
                        background: "radial-gradient(125% 125% at 50% 22%, #d99a453d, transparent 72%)",
                        boxShadow: "0 0 20px -5px #d99a45, inset 0 0 12px -6px #edba66",
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" style={{ filter: "drop-shadow(0 0 4px #d99a45)" }}>
                        <rect x="5" y="11" width="4" height="8" rx="1" />
                        <rect x="15" y="6" width="4" height="13" rx="1" />
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-[0.98rem] font-semibold text-ink-strong transition-colors group-hover:text-accent-bright">{g.title.replace(/^The Best |^The /, "")}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="mono text-[0.56rem] uppercase tracking-[0.1em] text-accent/85">{g.products.length} compared</span>
                        <span aria-hidden className="h-0.5 w-0.5 rounded-full bg-line-strong" />
                        <span className="mono truncate text-[0.56rem] uppercase tracking-[0.1em] text-ink-faint">{g.categoryLabel}</span>
                      </div>
                    </div>
                    <span className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* KITS — buy the whole setup at once (highest revenue-per-visit) */}
      <section className="border-t border-line glass-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal blur={false}><SectionHead eyebrow="Loadouts" title="Buy the whole setup at once" href="/kits" linkLabel="All kits" /></Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {KITS.slice(0, 4).map((k, i) => {
              const ids = Array.from(new Set([k.buyFirstId, ...k.starterIds, ...k.betterIds, ...k.premiumIds]));
              const prods = ids.map(getProductById).filter((p): p is Product => Boolean(p));
              return (
                <Reveal key={k.id} delay={i * 0.04}>
                  <KitBundleCard id={k.id} name={k.name} problem={k.problem} products={prods} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUICK FIXES — the sub-$25 readiness rail (kept out of the revenue grids, surfaced here) */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal blur={false}><QuickFixesRail /></Reveal>
      </section>

      {/* BUYING GUIDES — asymmetric editorial: one lead + a stacked list (not a card grid) */}
      <section className="border-t border-line mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal blur={false}><SectionHead eyebrow="Read before you buy" title="The buying guides" href="/guides" linkLabel="All guides" /></Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {featured[0] ? (
            <Reveal blur={false} className="min-w-0">
              <Link href={`/guides/${featured[0].slug}`} className="lit-card lift group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden bg-well">
                  <Image src="/brand/hero-cooling.png" alt="" fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0d0906]/85 via-[#0d0906]/20 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent-bright">{featured[0].category} · {featured[0].readMinutes} min read</span>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink-strong transition-colors group-hover:text-accent-bright">{featured[0].title}</h3>
                  <p className="mt-2 flex-1 text-[0.98rem] leading-relaxed text-ink-dim">{featured[0].dek}</p>
                  <span className="mt-4 text-sm font-semibold text-accent">Read the guide →</span>
                </div>
              </Link>
            </Reveal>
          ) : null}
          <Reveal blur={false} delay={0.08} className="min-w-0">
            <div className="lit-card flex h-full flex-col p-2">
              <div className="flex-1 divide-y divide-line-soft">
                {featured.slice(1).map((a) => (
                  <Link key={a!.slug} href={`/guides/${a!.slug}`} className="group flex flex-col gap-1 rounded-xl px-4 py-4 transition-colors hover:bg-surface-2">
                    <span className="mono text-[0.56rem] uppercase tracking-[0.1em] text-ink-faint">{a!.category} · {a!.readMinutes} min</span>
                    <p className="font-display text-[1.05rem] font-semibold leading-snug text-ink-strong transition-colors group-hover:text-accent-bright">{a!.title}</p>
                    <p className="line-clamp-2 text-sm leading-relaxed text-ink-dim">{a!.dek}</p>
                  </Link>
                ))}
              </div>
              <Link href="/guides" className="mt-2 flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-surface-2 hover:text-accent-bright">
                All buying guides <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY — the manifesto: the trust statement, in-brand dark with amber emphasis (was an off-brand white block) */}
      <section className="full-bleed relative overflow-hidden border-t border-line-strong bg-[#120d07]">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(66% 90% at 18% 0%, rgba(217,154,69,0.12), rgba(217,154,69,0.02) 52%, transparent 68%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:px-8">
          <Reveal blur={false}>
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-accent" aria-hidden />
              <span className="mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-accent-bright">How we choose</span>
            </div>
            <h2 className="mt-5 max-w-3xl font-display text-[2.2rem] font-medium leading-[1.08] tracking-[-0.01em] text-ink-strong sm:text-[3.1rem]">
              No hype. No paid placements. Just the pick — and the <span className="amber-word">receipt</span> behind it.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06}>
                <div className="border-t border-line-strong pt-5">
                  <span className="mono text-sm font-semibold text-accent-bright">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl font-medium text-ink-strong">{w.title}</h3>
                  <p className="mt-2.5 text-[0.98rem] leading-[1.6] text-ink-dim">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal blur={false}>
            <div className="mt-14 border-t border-line pt-8">
              <Link href="/methodology" className="cta-amber">
                Read the full methodology
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12 H19 M13 6 L19 12 L13 18" /></svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEWSLETTER — full-bleed amber CTA band on a near-black ground (tonal contrast) */}
      <section className="full-bleed relative border-t border-line-strong bg-[#0b0805]">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 120% at 50% 0%, rgba(217,154,69,0.16), rgba(217,154,69,0.04) 55%, transparent 72%)" }} />
        <div className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6">
          <NewsletterCta />
        </div>
      </section>
    </>
  );
}

function SectionHead({ eyebrow, title, href, linkLabel }: { eyebrow: string; title: string; href?: string; linkLabel?: string }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-px w-6 bg-accent" aria-hidden />
            <span className="eyebrow eyebrow-accent">{eyebrow}</span>
          </div>
          <h2 className="section-title mt-3.5">{title}</h2>
        </div>
        {href && linkLabel ? (
          <Link href={href} className="ulink hidden shrink-0 pb-1.5 text-sm font-semibold sm:block">{linkLabel} →</Link>
        ) : null}
      </div>
      <div className="rule-fade mt-5" />
    </div>
  );
}
