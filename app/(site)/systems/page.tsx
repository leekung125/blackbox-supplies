import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { getAllSystems, SYSTEMS_PROMISE } from "@/lib/systems";
import { PaperPreview } from "./paper-preview";
import { SystemsIndexCard } from "./systems-index-card";
import { SystemsDisclosure } from "./systems-disclosure";

const BASE = "https://www.blackboxsupplies.com";

/** Hero fan uses the flagship's rendered spreads. (Hardcoded here — this is a server
 *  component, so it can't import the client-side SYSTEM_PREVIEWS manifest from tool-card.tsx.) */
const HERO_FAN = {
  front: "/systems/previews/glovebox-cover.png",
  left: "/systems/previews/glovebox-vehicle-record.png",
  right: "/systems/previews/glovebox-accident.png",
};

export const metadata: Metadata = {
  title: "Systems — Printable & Fillable Readiness Plans, Made By Us",
  description:
    "BlackBox Systems are printable + fillable plans that keep you organized for the moments that actually happen. Made by us, sold by us — no affiliate links, one flat price, 30-day refund.",
  alternates: { canonical: "/systems" },
  openGraph: {
    type: "website",
    title: "Systems — Printable & Fillable Readiness Plans · BlackBox Supplies",
    description:
      "Printable + fillable plans that keep you organized. Made by us, sold by us. The Digital Glovebox — everything about your car, in one place, before you need it.",
    url: "/systems",
  },
};

export default function SystemsIndexPage() {
  const systems = getAllSystems();

  // ItemList of the real Systems (honest: name + on-site URL, no ratings, no fabricated offers —
  // per-product Offer schema lives on each landing page).
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BlackBox Systems",
    numberOfItems: systems.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: systems.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${BASE}/systems/${s.slug}`,
    })),
  };

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={[
          webPageSchema("/systems", "BlackBox Systems", SYSTEMS_PROMISE),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Systems", path: "/systems" },
          ]),
          itemList,
        ]}
      />

      {/* ── HERO — the category, photographed at night ─────────────────────────── */}
      <section className="relative isolate">
        {/* ambient: the lamp + a faint technical grid that fades out (all static paint) */}
        <div
          aria-hidden
          className="glow-amber-soft pointer-events-none left-1/2 top-[-6rem] -z-10 h-80 w-[42rem] max-w-[94vw] -translate-x-1/2"
        />
        <div aria-hidden className="atmo-grid pointer-events-none absolute inset-x-[-2rem] top-[-3rem] -z-10 h-[32rem]" />

        <nav className="relative flex flex-wrap items-center gap-2 text-sm text-ink-dim">
          <Link href="/" className="hover:text-accent-strong">Home</Link>
          <span aria-hidden>/</span>
          <span className="text-ink">Systems</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-12">
          {/* copy column */}
          <Reveal>
            <span className="eyebrow eyebrow-accent mt-8 inline-block">Systems · made by us, sold by us</span>
            <h1 className="mt-4 max-w-2xl text-balance font-display text-[2.6rem] font-semibold leading-[1.02] text-ink-strong headline-glow sm:text-6xl">
              The plans that keep you organized for <span className="amber-word">the moment</span>.
            </h1>
            <p className="lede mt-5 max-w-xl">
              {SYSTEMS_PROMISE} Our gear picks are the hardware; Systems are the plan around it —
              printable, fillable, and in your car or on your phone before you need them.
            </p>

            {/* the deal, as quiet spec chips — no theater, just the terms */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {[
                "One flat price",
                "30-day refund · keep the files",
                "No subscription, no account",
                "Fillable + printable",
              ].map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-dim"
                >
                  <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* the object itself — real rendered pages, fanned under the lamp */}
          <Reveal className="relative" delay={0.12}>
            <div className="relative mx-auto mt-10 h-[225px] w-[min(270px,72vw)] sm:mt-12 sm:h-[300px] sm:w-[340px] lg:mt-4 lg:h-[330px] lg:w-[380px]">
              {/* warm espresso pool — the paper sits on lit warm ground, never on near-black */}
              <div
                aria-hidden
                className="absolute -inset-10 -z-10 rounded-full sm:-inset-16"
                style={{
                  background:
                    "radial-gradient(closest-side, #241a10 0%, #1c140b 44%, rgba(11,8,5,0.5) 74%, transparent 100%)",
                }}
              />
              {/* the lamp behind the paper */}
              <span
                aria-hidden
                className="glow-amber"
                style={{ left: "50%", top: "50%", width: "min(24rem, 84vw)", height: "17rem", transform: "translate(-50%, -50%)" }}
              />

              <div className="hero-float absolute inset-0">
                {/* back-left spread */}
                <div className="absolute left-0 top-10 w-[56%] rotate-[-10deg]">
                  <PaperPreview
                    src={HERO_FAN.left}
                    alt=""
                    sizes="(min-width: 1024px) 213px, 160px"
                    radius={10}
                  />
                </div>
                {/* back-right spread */}
                <div className="absolute right-0 top-7 w-[56%] rotate-[9deg]">
                  <PaperPreview
                    src={HERO_FAN.right}
                    alt=""
                    sizes="(min-width: 1024px) 213px, 160px"
                    radius={10}
                  />
                </div>
                {/* the cover, front — the lamp finds it */}
                <div className="absolute left-1/2 top-0 w-[62%] -translate-x-1/2 rotate-[1.5deg]">
                  <PaperPreview
                    src={HERO_FAN.front}
                    alt="The Digital Glovebox — rendered cover page"
                    sizes="(min-width: 1024px) 236px, 180px"
                    priority
                    focal
                    radius={10}
                  />
                </div>
              </div>

              {/* contact shadow — warm dark, so the object sits on the ground without a hard void */}
              <span
                aria-hidden
                className="absolute bottom-[-6%] left-1/2 h-10 w-[72%] -translate-x-1/2 rounded-[100%] bg-[#0d0805]/60 blur-2xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── THE SHELF — premium tool cards, never interleaved with affiliate picks ── */}
      <section className="relative mt-16 sm:mt-20">
        <div className="flex items-center gap-4">
          <span className="rule-accent" aria-hidden />
          <h2 className="eyebrow">
            The shelf · {String(systems.length).padStart(2, "0")} {systems.length === 1 ? "system" : "systems"}
          </h2>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {systems.map((s) => (
            <Reveal key={s.slug}>
              <SystemsIndexCard system={s} />
            </Reveal>
          ))}

          {/* honest "more coming" placeholder — no fake waitlist, no invented price */}
          <div className="lit-card grad-border relative flex h-full flex-col justify-center overflow-hidden rounded-2xl border-dashed p-6">
            <span className="mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">More systems</span>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">
              We build one, get it right, then add the next — an Outage Planner and a Winter Driving
              System are in the works. No waitlist theater; they appear here when they&rsquo;re real.
            </p>
          </div>
        </div>
      </section>

      {/* ── how Systems differ from the free answer (useful-first, never a gate) ── */}
      <section className="relative mt-16 sm:mt-20">
        <div className="lit-card grad-border relative overflow-hidden rounded-3xl p-6 sm:p-10">
          <span
            aria-hidden
            className="glow-amber-soft"
            style={{ top: "-7rem", right: "-5rem", width: "26rem", height: "15rem" }}
          />

          <Reveal>
            <span className="eyebrow eyebrow-accent">The deal, plainly</span>
            <h2 className="section-title mt-3 max-w-2xl text-balance">
              Systems organize the answer. The answer itself stays free.
            </h2>
          </Reveal>

          <div className="relative mt-8 grid gap-8 sm:mt-10 sm:grid-cols-3 sm:gap-10">
            {[
              {
                n: "01",
                t: "The answer stays free",
                b: "Everything a System teaches — what to do in a breakdown, what to photograph at a scene — is in our guides and always will be. Systems organize it; they don't gate it.",
              },
              {
                n: "02",
                t: "One flat price",
                b: "A number we set, shown plainly. No compare-at theater, no countdowns, no scarcity — and no ratings, because none exist yet and we won't invent them.",
              },
              {
                n: "03",
                t: "Yours forever",
                b: "One-time purchase, free updates to the edition, no account, no app, nothing renews. And a 30-day refund, any reason — you keep the files.",
              },
            ].map((c) => (
              <div key={c.n} className="relative">
                <span className="mono nums text-sm font-semibold text-accent-bright" aria-hidden>
                  {c.n}
                </span>
                <div className="rule-fade mt-3" aria-hidden />
                <h3 className="mt-4 font-display text-xl font-semibold text-ink-strong">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── the trust-separation block — this is what makes the layers legible ── */}
      <div className="relative mt-12">
        <SystemsDisclosure />
      </div>
    </div>
  );
}
