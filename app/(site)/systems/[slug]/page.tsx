import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { GuideFaq } from "@/components/guide/guide-faq";
import { BuyButton } from "@/components/systems/buy-button";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { breadcrumbSchema, digitalProductSchema } from "@/lib/schema";
import { getAllSystems, getSystem, type System } from "@/lib/systems";
import { KITS } from "@/lib/kits";
import { getAllGuides } from "@/lib/guides";
import { getAllArticles } from "@/lib/articles";
import { COMPARISON_GUIDES } from "@/lib/comparison-guides";
import { TrackSystemView } from "./track-view";
import { SystemsDisclosure } from "../systems-disclosure";
import { SystemsHeroShowcase, type HeroSpread } from "../systems-hero";
import { PreviewGallery, type PreviewPage } from "../preview-gallery";
import PaperPreview from "@/app/(site)/systems/paper-preview";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSystems().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) return { title: "Not found" };
  return {
    title: system.seoTitle,
    description: system.seoDescription,
    alternates: { canonical: `/systems/${system.slug}` },
    openGraph: {
      type: "website",
      title: `${system.title} · BlackBox Supplies`,
      description: system.seoDescription,
      url: `/systems/${system.slug}`,
    },
  };
}

/** Resolve a guide/comparison/article slug to its title for the honest cross-link row (they all
 *  live under /guides/[slug]). Returns undefined if the slug doesn't resolve, so the link is
 *  skipped rather than rendering a fabricated name or a dead link. */
function guideTitle(slug: string): string | undefined {
  const g =
    COMPARISON_GUIDES.find((c) => c.slug === slug) ??
    getAllGuides().find((x) => x.slug === slug) ??
    getAllArticles().find((x) => x.slug === slug);
  return g?.title;
}

/* ────────────────────────────────────────────────────────────────────────────────
   REAL PAGE PREVIEWS — rendered from the actual pack files (assets pipeline output
   in /public/systems/previews). Keyed by slug: a System without an entry simply
   renders no showcase/filmstrip and no thumbnails — nothing fake ever ships.
   ──────────────────────────────────────────────────────────────────────────────── */
const PV = "/systems/previews";

interface SystemPreviews {
  /** Hero composition: [front focal page, back-right, back-left]. */
  spreads: HeroSpread[];
  /** The flip-through filmstrip, in narrative order. */
  gallery: PreviewPage[];
  /** Manifest thumbnails, keyed by the EXACT content name in lib/systems.ts. */
  contentThumbs: Record<string, string>;
}

const SYSTEM_PREVIEWS: Record<string, SystemPreviews> = {
  "digital-glovebox": {
    spreads: [
      { src: `${PV}/glovebox-cover.png`, alt: "The Digital Glovebox — cover of the actual pack" },
      { src: `${PV}/glovebox-accident.png`, alt: "The Accident Protocol page with the ten-photo shot list" },
      { src: `${PV}/glovebox-vehicle-record.png`, alt: "The Vehicle Record page, filled in with the demo vehicle" },
    ],
    gallery: [
      {
        src: `${PV}/glovebox-cover.png`,
        tag: "The pack",
        title: "The cover",
        caption:
          "The pack itself — eight systems in one fillable file, version and changelog printed inside so you always know which edition you own.",
      },
      {
        src: `${PV}/glovebox-vehicle-record.png`,
        tag: "System 01",
        title: "The Vehicle Record, filled in",
        caption:
          "The page that answers every parts-counter question. Ten minutes with your door jamb sticker and owner’s manual, once — then it’s just true forever.",
      },
      {
        src: `${PV}/glovebox-card.png`,
        tag: "System 02",
        title: "The Contacts Card",
        caption:
          "Insurer, claims line, roadside membership, tow preference, two people who pick up — the page that matters most on a dark shoulder. Two pages like this are also the free sample.",
      },
      {
        src: `${PV}/glovebox-worked-example.png`,
        tag: "Worked example",
        title: "A page in use",
        caption:
          "Every preview is rendered from the actual pack and filled with a clearly-labeled demo vehicle — never fake ownership, just a worked example of how it reads.",
      },
      {
        src: `${PV}/glovebox-seasonal.png`,
        tag: "System 06",
        title: "The Seasonal Readiness Checklists",
        caption:
          "Going into winter, going into summer — battery, tires, coolant, wipers, kit swap. Twenty minutes each, twice a year. A checklist, not a curriculum.",
      },
      {
        src: `${PV}/glovebox-accident.png`,
        tag: "System 07",
        title: "The Accident Protocol spread",
        caption:
          "The ten photos insurers actually ask for, in the order you take them. This page exists because nobody remembers this under stress — that’s the point of it being printed.",
      },
    ],
    contentThumbs: {
      "Vehicle Record": `${PV}/glovebox-vehicle-record.png`,
      "Contacts Card": `${PV}/glovebox-card.png`,
      "Seasonal Readiness Checklists": `${PV}/glovebox-seasonal.png`,
      "Accident Protocol + Photo Shot List": `${PV}/glovebox-accident.png`,
    },
  },
};

/** The 30-day guarantee as a premium design object — an engraved brass seal, not a bullet. */
function GuaranteeSeal() {
  return (
    <div className="relative grid h-28 w-28 shrink-0 place-items-center" aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <path id="seal-ring" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
        </defs>
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(237,186,102,0.42)" strokeWidth="1" />
        <circle cx="50" cy="50" r="47.5" fill="none" stroke="rgba(217,154,69,0.28)" strokeWidth="1" strokeDasharray="2 3.2" />
        <text fontSize="6.7" letterSpacing="1.9" fill="#d99a45" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          <textPath href="#seal-ring">30 DAYS · ANY REASON · KEEP THE FILES</textPath>
        </text>
      </svg>
      <div className="text-center" style={{ filter: "drop-shadow(0 0 14px rgba(217,154,69,0.35))" }}>
        <span className="block font-display text-3xl font-semibold leading-none text-accent-bright">30</span>
        <span className="mono mt-1 block text-[0.5rem] uppercase tracking-[0.18em] text-ink-faint">day refund</span>
      </div>
    </div>
  );
}

/** Split the title so the last word catches the amber lamp. */
function TitleWithGlow({ system }: { system: System }) {
  const words = system.title.split(" ");
  const last = words.pop();
  return (
    <h1 className="relative mt-4 text-balance font-display text-[2.6rem] font-semibold leading-[1.02] text-ink-strong headline-glow sm:text-[3.4rem] lg:text-[3.7rem]">
      {words.join(" ")} <span className="amber-word">{last}</span>
    </h1>
  );
}

export default async function SystemLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) notFound();

  const available = system.status === "available";
  const previews: SystemPreviews | undefined = SYSTEM_PREVIEWS[system.slug];
  const relatedKits = system.relatedKits
    .map((id) => KITS.find((k) => k.id === id))
    .filter((k): k is NonNullable<typeof k> => Boolean(k));

  const stats: { v: string; l: string }[] = [
    { v: String(system.contents.length), l: "systems inside" },
    { v: String(system.formats.length), l: "formats, one purchase" },
    { v: `$${system.price}`, l: "one-time · nothing renews" },
    { v: "30", l: "day refund · keep the files" },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <TrackSystemView slug={system.slug} />
      <JsonLd
        data={[
          ...digitalProductSchema({
            slug: system.slug,
            title: system.title,
            price: system.price,
            tagline: system.tagline,
            dek: system.dek,
            version: system.version,
            faq: system.faq,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Systems", path: "/systems" },
            { name: system.title, path: `/systems/${system.slug}` },
          ]),
        ]}
      />

      <nav className="relative flex flex-wrap items-center gap-2 text-sm text-ink-dim">
        <Link href="/" className="inline-flex items-center py-2 hover:text-accent-strong">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/systems" className="inline-flex items-center py-2 hover:text-accent-strong">Systems</Link>
        <span aria-hidden>/</span>
        <span className="text-ink">{system.title}</span>
      </nav>

      {/* ══ CINEMATIC HERO — the product, lit; the verdict, first ══════════════════════ */}
      <header className="relative isolate mt-8 sm:mt-10">
        {/* warm espresso ground — the hero lives in a lamplit room, never on raw black */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -bottom-10 -top-14 -z-20 rounded-[3rem] sm:-inset-x-10"
          style={{
            background:
              "radial-gradient(115% 85% at 60% 32%, #1c140b 0%, #140e08 52%, rgba(11,8,5,0) 100%)",
          }}
        />
        {/* the room: warm aura + a technical grid that fades out under the copy */}
        <div
          aria-hidden
          className="glow-amber-soft pointer-events-none left-[-6rem] top-[-6rem] h-80 w-[36rem] max-w-[94vw]"
        />
        <div aria-hidden className="atmo-grid pointer-events-none absolute inset-x-0 -top-8 -z-10 h-[26rem]" />

        <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8">
          <Reveal className="relative">
            <span className="pill-amber">{system.kicker}</span>
            <TitleWithGlow system={system} />
            <p className="relative mt-4 max-w-xl text-lg font-medium leading-snug text-accent-bright sm:text-xl">
              {system.tagline}
            </p>
            <p className="relative mt-5 max-w-xl text-[1.02rem] leading-relaxed text-ink-dim">
              {system.dek}
            </p>

            {available ? (
              <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BuyButton
                  slug={system.slug}
                  price={system.price}
                  label={`Get the ${system.title} — $${system.price}`}
                />
                <Link
                  href="/newsletter"
                  className="inline-flex items-center py-2 text-sm font-medium text-ink-dim underline-offset-4 hover:text-accent-strong hover:underline"
                >
                  Not sure? Take {system.freeSampleName ?? "the free sample"} first
                </Link>
              </div>
            ) : null}
            {available ? (
              <p className="relative mt-4 max-w-xl text-xs leading-relaxed text-ink-faint">
                Instant download · fillable PDF · print or phone · {system.guarantee}
              </p>
            ) : null}
          </Reveal>

          {previews ? (
            <Reveal delay={0.12} className="relative">
              {/* the lamp pool the paper sits IN — a warm ground, not a black void */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-4 -inset-y-8 -z-10 rounded-[3rem]"
                style={{
                  background:
                    "radial-gradient(74% 64% at 50% 46%, #221709 0%, #17100a 55%, rgba(11,8,5,0) 100%)",
                }}
              />
              {/* mobile-first sizing: the floating pages scale DOWN gracefully at 375px
                  instead of overflowing the viewport; full presence returns at sm+ */}
              <div className="mx-auto w-full max-w-[18rem] min-[420px]:max-w-[21rem] sm:max-w-[26rem]">
                <SystemsHeroShowcase
                  spreads={previews.spreads}
                  badge={`Real pages · rendered from v${system.version.split(" ")[0]}`}
                />
              </div>
            </Reveal>
          ) : null}
        </div>

        {/* the spec strip — big mono numbers, one glance */}
        <Reveal delay={0.2}>
          <dl className="lit-card grad-border relative mt-12 grid grid-cols-2 gap-y-6 rounded-2xl px-5 py-6 sm:mt-14 sm:grid-cols-4 sm:gap-y-0 sm:px-6">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className={`text-center ${i > 0 ? "sm:border-l sm:border-line-soft" : ""} ${
                  i >= 2 ? "border-t border-line-soft pt-6 sm:border-t-0 sm:pt-0" : ""
                }`}
              >
                <dt className="sr-only">{s.l}</dt>
                <dd>
                  <span className="mono nums block text-3xl font-semibold leading-none text-ink-strong sm:text-4xl">
                    {s.v}
                  </span>
                  <span className="mono mt-2 block text-[0.58rem] uppercase tracking-[0.14em] text-ink-faint">
                    {s.l}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      {/* ══ THE PROMISE — one dramatic type moment ═════════════════════════════════════ */}
      <section className="relative mt-20 sm:mt-24">
        <div aria-hidden className="glow-amber-soft pointer-events-none left-1/2 top-0 h-52 w-[30rem] max-w-[90vw] -translate-x-1/2" />
        <div className="rule-fade mx-auto max-w-3xl" />
        <blockquote className="relative mx-auto mt-9 max-w-3xl text-balance text-center font-display text-[1.55rem] font-medium leading-[1.28] text-ink-strong headline-glow sm:text-[2.05rem]">
          {system.promise}
        </blockquote>
        <p className="relative mx-auto mt-5 max-w-2xl text-center text-[0.95rem] leading-relaxed text-ink-dim">
          {system.forWho}
        </p>
        <div className="rule-fade mx-auto mt-9 max-w-3xl -scale-x-100" />
      </section>

      {/* ══ THE THREE MOMENTS — who buys this, in their own situation ══════════════════ */}
      <section className="relative mt-16 sm:mt-20">
        <span className="eyebrow eyebrow-accent">Who this is for</span>
        <h2 className="section-title mt-2">Three moments this is built for.</h2>
        <Stagger className="mt-8 grid gap-5 sm:grid-cols-3">
          {system.whoFor.map((m, i) => (
            <div key={m.title} className="lit-card grad-border lift relative overflow-hidden rounded-2xl p-6">
              <span
                aria-hidden
                className="glow-amber-soft"
                style={{ top: "-3rem", right: "-3rem", width: "10rem", height: "7rem" }}
              />
              <span className="mono nums relative text-sm text-accent-strong">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="relative mt-3 font-display text-xl font-semibold leading-snug text-ink-strong">
                {m.title}
              </p>
              <p className="relative mt-3 text-[0.93rem] leading-relaxed text-ink-dim">{m.body}</p>
            </div>
          ))}
        </Stagger>
      </section>

      {/* ══ FLIP THROUGH THE REAL PAGES — show, don't tell ═════════════════════════════ */}
      {previews ? (
        <section className="relative mt-20 sm:mt-24">
          {/* warm espresso ground under the filmstrip — paper never sits on raw black */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -bottom-6 -top-10 -z-10 rounded-[3rem] sm:-inset-x-10"
            style={{
              background:
                "radial-gradient(110% 90% at 50% 44%, #1b130b 0%, #130d08 55%, rgba(11,8,5,0) 100%)",
            }}
          />
          <div aria-hidden className="glow-amber-soft pointer-events-none right-[-6rem] top-[-3rem] h-64 w-[28rem] max-w-[90vw]" />
          <span className="eyebrow eyebrow-accent">Sample spreads</span>
          <h2 className="section-title mt-2">Flip through the real pages.</h2>
          <p className="mt-4 max-w-2xl text-[0.96rem] leading-relaxed text-ink-dim">
            Every preview is rendered from the actual pack, filled with a clearly-labeled demo
            vehicle — never fake ownership, just a worked example. What you see here is what you
            download.
          </p>
          <div className="mt-8">
            <PreviewGallery pages={previews.gallery} />
          </div>
        </section>
      ) : null}

      {/* ══ WHAT'S INSIDE — the full manifest (the contents ARE the pitch) ═════════════ */}
      <section className="relative mt-20 sm:mt-24">
        {/* gentle warm ground so the manifest cards sit in the same lamplit room */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -bottom-8 -top-10 -z-10 rounded-[3rem] sm:-inset-x-10"
          style={{
            background:
              "radial-gradient(115% 92% at 50% 36%, #19120b 0%, #120d08 58%, rgba(11,8,5,0) 100%)",
          }}
        />
        <span className="eyebrow eyebrow-accent">The full manifest</span>
        <h2 className="section-title mt-2">
          Everything inside — {system.contents.length} systems, nothing hidden.
        </h2>
        <p className="mt-4 max-w-2xl text-[0.96rem] leading-relaxed text-ink-dim">
          Every one answers a specific moment — if we couldn&rsquo;t name the moment, we cut the page.
          The table of contents is public because you can&rsquo;t fake depth when it&rsquo;s on the sales page.
        </p>
        <ol className="mt-8 space-y-4">
          {system.contents.map((c, i) => {
            const thumb = previews?.contentThumbs[c.name];
            return (
              <li key={c.name} className="lit-card grad-border lift relative overflow-hidden rounded-2xl">
                <div className="flex items-stretch gap-0">
                  <div className="min-w-0 flex-1 p-5 sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="flex items-baseline gap-3 font-display text-lg font-semibold text-ink-strong sm:text-xl">
                        <span className="mono nums text-sm text-accent-strong">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {c.name}
                      </h3>
                      <span className="mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-faint">
                        {c.pages}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-2">{c.what}</p>
                    <p className="mt-2.5 flex gap-2 text-[0.9rem] leading-relaxed text-ink-dim">
                      <span className="mono mt-[0.15rem] shrink-0 text-[0.58rem] uppercase tracking-[0.12em] text-accent-strong">
                        You&rsquo;ll open it
                      </span>
                      <span>{c.moment}</span>
                    </p>
                  </div>
                  {thumb ? (
                    <div
                      className="relative hidden w-28 shrink-0 items-center justify-center overflow-hidden border-l border-line-soft sm:flex"
                      style={{
                        background:
                          "radial-gradient(130% 120% at 50% 26%, #261b0e 0%, #170f08 100%)",
                      }}
                    >
                      <span
                        aria-hidden
                        className="glow-amber-soft"
                        style={{ top: "-1.5rem", right: "-2rem", width: "9rem", height: "6rem" }}
                      />
                      <PaperPreview
                        src={thumb}
                        alt={`${c.name} — page preview`}
                        sizes="88px"
                        radius={6}
                        className="relative w-[76%] rotate-3"
                      />
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-5 text-sm italic leading-relaxed text-ink-faint">
          That&rsquo;s the whole product. No bonus modules, no locked chapters, no upsell inside the file.
        </p>
      </section>

      {/* ══ FORMATS — one purchase, four formats ═══════════════════════════════════════ */}
      <section className="relative mt-20 sm:mt-24">
        <span className="eyebrow eyebrow-accent">What you download</span>
        <h2 className="section-title mt-2">One purchase, {system.formats.length === 4 ? "four" : String(system.formats.length)} formats.</h2>
        <p className="mt-4 max-w-2xl text-[0.96rem] leading-relaxed text-ink-dim">
          Use the one that fits how you live; they carry the same content.
        </p>
        <Stagger className="mt-7 grid gap-4 sm:grid-cols-2">
          {system.formats.map((f) => {
            const [head, ...rest] = f.split(" — ");
            return (
              <div key={f} className="lit-card lift flex gap-4 rounded-2xl p-5">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                  style={{
                    border: "1px solid rgba(224,163,82,0.55)",
                    background: "radial-gradient(125% 125% at 50% 22%, rgba(217,154,69,0.2), transparent 72%)",
                    boxShadow: "0 0 16px -5px rgba(217,154,69,0.7), inset 0 0 10px -6px rgba(237,186,102,0.8)",
                  }}
                  aria-hidden
                >
                  <svg className="h-4 w-4 text-accent-bright" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13 L9 17 L19 6" />
                  </svg>
                </span>
                <span className="text-[0.92rem] leading-relaxed text-ink-2">
                  <span className="font-display text-base font-semibold text-ink-strong">{head}</span>
                  {rest.length ? (
                    <span className="mt-1 block text-[0.88rem] text-ink-dim">{rest.join(" — ")}</span>
                  ) : null}
                </span>
              </div>
            );
          })}
        </Stagger>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink-dim">
          <span className="font-semibold text-ink-2">Delivery:</span> instant download after checkout — no account, no app, no login to lose.{" "}
          <span className="font-semibold text-ink-2">Updates:</span> free updates to this edition, forever. Version and dated changelog printed inside the pack.
        </p>
      </section>

      {/* ══ THE BUY BOX — the focal, confident price moment ════════════════════════════ */}
      {available ? (
        <div className="relative mt-20 sm:mt-24">
          {/* warm room behind the focal card — the price moment glows out of espresso, not black */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 rounded-[3rem] sm:-inset-x-10"
            style={{
              background:
                "radial-gradient(110% 95% at 50% 42%, #1d140c 0%, #140e08 55%, rgba(11,8,5,0) 100%)",
            }}
          />
        <section className="lit-card grad-border-amber focal-glow relative overflow-hidden rounded-3xl p-6 sm:p-10">
          {/* warm interior wash — the card reads lamplit espresso, never flat */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "radial-gradient(120% 90% at 18% 0%, rgba(64,45,24,0.42), transparent 58%), radial-gradient(130% 110% at 88% 112%, rgba(48,34,18,0.5), transparent 60%)",
            }}
          />
          <span aria-hidden className="glow-amber" style={{ top: "-5rem", right: "-4rem", width: "20rem", height: "14rem", opacity: 0.5 }} />
          <span aria-hidden className="glow-amber-soft" style={{ bottom: "-5rem", left: "-4rem", width: "18rem", height: "11rem" }} />

          <div className="relative grid gap-10 md:grid-cols-[1fr_1.05fr] md:items-center">
            <div>
              <p className="mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-faint">
                One-time · nothing renews
              </p>
              <p
                className="mono nums mt-2 text-6xl font-semibold leading-none text-ink-strong sm:text-7xl"
                style={{ textShadow: "0 0 44px rgba(217,154,69,0.3)" }}
              >
                ${system.price}
              </p>
              <p className="mt-4 max-w-sm text-[0.92rem] leading-relaxed text-ink-dim">
                {system.anchorLine}
              </p>

              <div className="mt-7">
                <BuyButton
                  slug={system.slug}
                  price={system.price}
                  block
                  label={`Get the ${system.title} — $${system.price}`}
                />
                <p className="mt-3 text-xs leading-relaxed text-ink-faint">
                  Payments processed by Lemon Squeezy — we never see your card.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-dim">
                  Not sure? {system.freeSampleName ?? "The free sample"} is 2 of these {system.contents.length} systems —{" "}
                  <Link href="/newsletter" className="ulink">start there</Link>.
                </p>
              </div>
            </div>

            <div>
              <div
                className="flex flex-col items-center gap-4 rounded-2xl border border-[rgba(224,163,82,0.28)] p-5 text-center sm:flex-row sm:gap-5 sm:text-left"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(48,34,18,0.55), rgba(30,22,13,0.6))",
                }}
              >
                <GuaranteeSeal />
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold leading-snug text-ink-strong">
                    For 30 days, the risk is ours.
                  </p>
                  <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-dim">{system.guarantee}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-2.5">
                {[
                  "One-time purchase. Yours forever.",
                  "Free updates to this edition.",
                  "No account required.",
                ].map((p) => (
                  <li key={p} className="flex gap-2.5 text-[0.94rem] leading-relaxed text-ink-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 13 L9 17 L19 6" />
                    </svg>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div
                className="mt-5 rounded-xl border border-line-soft p-4"
                style={{ background: "rgba(39,28,15,0.5)" }}
              >
                <p className="mono text-[0.58rem] uppercase tracking-[0.14em] text-accent-strong">Setup</p>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-2">{system.setupTime}</p>
              </div>
            </div>
          </div>
        </section>
        </div>
      ) : null}

      {/* ══ WHAT YOU'RE PAYING FOR / NOT ════════════════════════════════════════════════ */}
      <section className="mt-16 grid gap-5 sm:mt-20 sm:grid-cols-2">
        <div className="rounded-2xl border border-accent/25 bg-accent-tint p-5 sm:p-6">
          <h2 className="mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent-strong">
            You&rsquo;re paying for
          </h2>
          <ul className="mt-4 space-y-2.5">
            {system.payingFor.map((p) => (
              <li key={p} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-ink-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            You&rsquo;re NOT paying for
          </h2>
          <ul className="mt-4 space-y-2.5">
            {system.notPayingFor.map((p) => (
              <li key={p} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-ink-dim">
                <span className="mt-1.5 text-ink-faint" aria-hidden>&times;</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ WHO SHOULD SKIP THIS — the DecisionReceipt pattern ═════════════════════════ */}
      <section className="lit-card grad-border-amber relative mt-16 overflow-hidden rounded-2xl sm:mt-20">
        <span aria-hidden className="glow-amber-soft" style={{ top: "-3.5rem", left: "-2rem", width: "16rem", height: "9rem" }} />
        <div className="relative flex items-center gap-3 border-b border-line-soft px-5 py-4">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
            style={{
              border: "1px solid rgba(224,163,82,0.73)",
              background: "radial-gradient(125% 125% at 50% 22%, rgba(217,154,69,0.24), transparent 72%)",
              boxShadow: "0 0 20px -5px rgba(217,154,69,0.85), inset 0 0 12px -6px rgba(237,186,102,0.9)",
            }}
          >
            <svg className="h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 3 H18 V21 L15 19 L12 21 L9 19 L6 21 Z" />
              <path d="M9 8 H15 M9 12 H15 M9 16 H13" />
            </svg>
          </span>
          <div className="min-w-0">
            <span className="mono block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-accent">
              The honest catch
            </span>
            <h2 className="font-display text-lg font-semibold leading-tight text-ink-strong sm:text-xl">
              Skip this if —
            </h2>
          </div>
        </div>
        <ul className="relative divide-y divide-line-soft px-5">
          {system.whoShouldSkip.map((s) => (
            <li key={s} className="flex gap-2.5 py-3.5 text-[0.92rem] leading-relaxed text-ink-2">
              <span
                aria-hidden
                className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                style={{ boxShadow: "0 0 8px 0 rgba(217,154,69,0.75)" }}
              />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ══ FAQ — accordion + FAQPage JSON-LD (emitted in digitalProductSchema above) ══ */}
      <GuideFaq faq={system.faq} />

      {/* ══ HOW THIS WAS BUILT — the candor panel ══════════════════════════════════════ */}
      <section className="mt-16 rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <span className="mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent-strong">
          How this was built
        </span>
        <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-2">{system.howBuilt}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-dim">
          <span className="font-semibold text-ink-2">Version {system.version}</span> · changelog inside the pack · updates to this edition free to owners.
        </p>
      </section>

      {/* ══ MADE BY US — the disclosure block ══════════════════════════════════════════ */}
      <div className="mt-8">
        <SystemsDisclosure />
      </div>

      {/* ══ FOOTER CROSS-LINKS — the free research this sits on ════════════════════════ */}
      {(system.relatedGuides.length || relatedKits.length) ? (
        <section className="mt-16 border-t border-line pt-10 sm:mt-20">
          <span className="mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">
            The research this system sits on (free, as always)
          </span>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {system.relatedGuides.map((g) => {
              const t = guideTitle(g);
              if (!t) return null;
              return (
                <Link key={g} href={`/guides/${g}`} className="lit-card lift group p-5">
                  <span className="eyebrow eyebrow-accent">Guide</span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-ink-strong group-hover:text-accent">{t}</h3>
                </Link>
              );
            })}
            {relatedKits.map((k) => (
              <Link key={k.id} href={`/kits/${k.id}`} className="lit-card lift group p-5">
                <span className="eyebrow eyebrow-accent">Kit</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink-strong group-hover:text-accent">{k.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-ink-dim">{k.dek}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
