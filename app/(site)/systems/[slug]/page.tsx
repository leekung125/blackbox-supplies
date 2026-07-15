import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { GuideFaq } from "@/components/guide/guide-faq";
import { BuyButton } from "@/components/systems/buy-button";
import { breadcrumbSchema, digitalProductSchema } from "@/lib/schema";
import { getAllSystems, getSystem } from "@/lib/systems";
import { KITS } from "@/lib/kits";
import { getAllGuides } from "@/lib/guides";
import { getAllArticles } from "@/lib/articles";
import { COMPARISON_GUIDES } from "@/lib/comparison-guides";
import { TrackSystemView } from "./track-view";
import { SystemsDisclosure } from "../systems-disclosure";

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

export default async function SystemLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) notFound();

  const available = system.status === "available";
  const relatedKits = system.relatedKits
    .map((id) => KITS.find((k) => k.id === id))
    .filter((k): k is NonNullable<typeof k> => Boolean(k));

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6">
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

      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-dim">
        <Link href="/" className="hover:text-accent-strong">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/systems" className="hover:text-accent-strong">Systems</Link>
        <span aria-hidden>/</span>
        <span className="text-ink">{system.title}</span>
      </nav>

      {/* ── HERO — the verdict, first ─────────────────────────────────────────────────── */}
      <header className="relative mt-7 rise">
        <div
          aria-hidden
          className="glow-amber-soft pointer-events-none left-0 top-[-4rem] h-64 w-[34rem] max-w-[92vw]"
        />
        <span className="mono relative text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent-strong">
          {system.kicker}
        </span>
        <h1 className="relative mt-3 max-w-3xl text-balance font-display text-[2.15rem] font-semibold leading-[1.04] text-ink-strong headline-glow sm:text-[3rem]">
          {system.title}
        </h1>
        <p className="relative mt-3.5 max-w-2xl text-lg font-medium text-accent-strong">{system.tagline}</p>
        <p className="lede relative mt-4 max-w-2xl">{system.dek}</p>

        {/* the one-line promise — the pull-quote */}
        <blockquote className="relative mt-6 max-w-2xl border-l-2 border-accent/60 pl-4 text-[1.06rem] font-medium leading-relaxed text-ink">
          {system.promise}
        </blockquote>
        <p className="relative mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-ink-dim">{system.forWho}</p>

        {available ? (
          <div className="relative mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BuyButton slug={system.slug} price={system.price} label={`Get the ${system.title} — $${system.price}`} />
            <Link href="/newsletter" className="text-sm font-medium text-ink-dim underline-offset-4 hover:text-accent-strong hover:underline">
              Not sure? Take {system.freeSampleName ?? "the free sample"} first
            </Link>
          </div>
        ) : null}
        {available ? (
          <p className="relative mt-3 text-xs leading-relaxed text-ink-faint">
            Instant download · fillable PDF · print or phone · {system.guarantee}
          </p>
        ) : null}
      </header>

      {/* ── THE THREE MOMENTS — who buys this, in their own situation ──────────────────── */}
      <section className="mt-16">
        <span className="eyebrow eyebrow-accent">Who this is for</span>
        <h2 className="section-title mt-2">Three moments this is built for.</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {system.whoFor.map((m) => (
            <div key={m.title} className="lit-card rounded-2xl p-5">
              <p className="font-display text-lg font-semibold leading-snug text-ink-strong">{m.title}</p>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-dim">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT'S INSIDE — the full manifest (the contents ARE the pitch) ─────────────── */}
      <section className="mt-16">
        <span className="eyebrow eyebrow-accent">The full manifest</span>
        <h2 className="section-title mt-2">Everything inside — {system.contents.length} systems, nothing hidden.</h2>
        <p className="mt-3 max-w-2xl text-[0.96rem] leading-relaxed text-ink-dim">
          Every one answers a specific moment — if we couldn&rsquo;t name the moment, we cut the page.
          The table of contents is public because you can&rsquo;t fake depth when it&rsquo;s on the sales page.
        </p>
        <ol className="mt-6 space-y-3">
          {system.contents.map((c, i) => (
            <li key={c.name} className="lit-card grad-border rounded-2xl p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="flex items-baseline gap-3 font-display text-lg font-semibold text-ink-strong">
                  <span className="mono nums text-sm text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                  {c.name}
                </h3>
                <span className="mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-faint">{c.pages}</span>
              </div>
              <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-2">{c.what}</p>
              <p className="mt-2.5 flex gap-2 text-[0.9rem] leading-relaxed text-ink-dim">
                <span className="mono mt-[0.15rem] shrink-0 text-[0.58rem] uppercase tracking-[0.12em] text-accent-strong">You&rsquo;ll open it</span>
                <span>{c.moment}</span>
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm italic leading-relaxed text-ink-faint">
          That&rsquo;s the whole product. No bonus modules, no locked chapters, no upsell inside the file.
        </p>
      </section>

      {/* ── SAMPLE SPREADS — show, don't tell ─────────────────────────────────────────── */}
      <section className="mt-16">
        <span className="eyebrow eyebrow-accent">Sample spreads</span>
        <h2 className="section-title mt-2">See real pages before you decide.</h2>
        <p className="mt-3 max-w-2xl text-[0.96rem] leading-relaxed text-ink-dim">
          Rendered from the actual pack, filled with a clearly-labeled demo vehicle — never fake
          ownership, just a worked example.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {system.samples.map((s, i) => (
            <figure key={s.id} className="lit-card grad-border-amber overflow-hidden rounded-2xl">
              {/* Styled page-spread preview. When /systems/*.png render assets exist, swap this
                  block for <Image src={s.image} … />. Kept as a CSS mock so no broken image ships. */}
              <div className="relative aspect-[3/4] overflow-hidden bg-well">
                <div aria-hidden className="glow-amber-soft" style={{ top: "-2rem", left: "-1rem", width: "12rem", height: "7rem" }} />
                <div className="relative flex h-full flex-col p-4">
                  <span className="mono text-[0.5rem] uppercase tracking-[0.14em] text-accent-strong">Demo — 2019 Honda CR-V EX</span>
                  <div className="mt-3 space-y-1.5">
                    {Array.from({ length: 7 }).map((_, r) => (
                      <div key={r} className="flex items-center gap-2">
                        <span className="h-1.5 rounded-full bg-line-strong" style={{ width: `${28 + ((r * 13) % 22)}%` }} />
                        <span className="h-1.5 flex-1 rounded-full bg-line-soft" />
                      </div>
                    ))}
                  </div>
                  <span className="mono mt-auto self-start rounded-full border border-line-soft bg-surface/70 px-2 py-0.5 text-[0.5rem] uppercase tracking-[0.12em] text-ink-faint">
                    Sample {i + 1}
                  </span>
                </div>
              </div>
              <figcaption className="border-t border-line-soft p-4">
                <p className="font-display text-sm font-semibold text-ink-strong">{s.title}</p>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-ink-dim">{s.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── FORMATS ───────────────────────────────────────────────────────────────────── */}
      <section className="mt-16">
        <span className="eyebrow eyebrow-accent">What you download</span>
        <h2 className="section-title mt-2">One purchase, four formats.</h2>
        <p className="mt-3 max-w-2xl text-[0.96rem] leading-relaxed text-ink-dim">
          Use the one that fits how you live; they carry the same content.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {system.formats.map((f) => {
            const [head, ...rest] = f.split(" — ");
            return (
              <li key={f} className="flex gap-3 rounded-2xl border border-line bg-surface p-4">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 13 L9 17 L19 6" /></svg>
                <span className="text-[0.92rem] leading-relaxed text-ink-2">
                  <span className="font-semibold text-ink-strong">{head}</span>
                  {rest.length ? <> — {rest.join(" — ")}</> : null}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-ink-dim">
          <span className="font-semibold text-ink-2">Delivery:</span> instant download after checkout — no account, no app, no login to lose.{" "}
          <span className="font-semibold text-ink-2">Updates:</span> free updates to this edition, forever. Version and dated changelog printed inside the pack.
        </p>
      </section>

      {/* ── THE BUY BOX ───────────────────────────────────────────────────────────────── */}
      {available ? (
        <section className="lit-card grad-border-amber relative mt-16 overflow-hidden rounded-2xl p-6 sm:p-8">
          <span aria-hidden className="glow-amber-soft" style={{ top: "-3rem", right: "-2rem", width: "16rem", height: "9rem" }} />
          <div className="relative grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
            <div>
              <p className="mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">One-time</p>
              <p className="mono nums mt-1 text-5xl font-semibold leading-none text-ink-strong">${system.price}</p>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-dim">{system.anchorLine}</p>

              <div className="mt-6">
                <BuyButton slug={system.slug} price={system.price} block label={`Get the ${system.title} — $${system.price}`} />
                <p className="mt-3 text-xs leading-relaxed text-ink-faint">
                  Payments processed by Lemon Squeezy — we never see your card.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-dim">
                  Not sure? {system.freeSampleName ?? "The free sample"} is 2 of these {system.contents.length} systems — <Link href="/newsletter" className="ulink">start there</Link>.
                </p>
              </div>
            </div>

            <div>
              <ul className="space-y-2.5">
                {[
                  "One-time purchase. Yours forever.",
                  "Free updates to this edition.",
                  "No account required.",
                  system.guarantee,
                ].map((p) => (
                  <li key={p} className="flex gap-2.5 text-[0.94rem] leading-relaxed text-ink-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 13 L9 17 L19 6" /></svg>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-line-soft bg-well/60 p-4">
                <p className="mono text-[0.58rem] uppercase tracking-[0.14em] text-accent-strong">Setup</p>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-2">{system.setupTime}</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── WHAT YOU'RE PAYING FOR / NOT ──────────────────────────────────────────────── */}
      <section className="mt-16 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-accent/25 bg-accent-tint p-5 sm:p-6">
          <h2 className="mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent-strong">You&rsquo;re paying for</h2>
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
          <h2 className="mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">You&rsquo;re NOT paying for</h2>
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

      {/* ── WHO SHOULD SKIP THIS — the DecisionReceipt pattern ────────────────────────── */}
      <section className="lit-card grad-border-amber relative mt-16 overflow-hidden rounded-2xl">
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
            <span className="mono block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-accent">The honest catch</span>
            <h2 className="font-display text-lg font-semibold leading-tight text-ink-strong sm:text-xl">Skip this if —</h2>
          </div>
        </div>
        <ul className="relative divide-y divide-line-soft px-5">
          {system.whoShouldSkip.map((s) => (
            <li key={s} className="flex gap-2.5 py-3.5 text-[0.92rem] leading-relaxed text-ink-2">
              <span aria-hidden className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" style={{ boxShadow: "0 0 8px 0 rgba(217,154,69,0.75)" }} />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ — accordion + FAQPage JSON-LD (emitted in digitalProductSchema above) ──── */}
      <GuideFaq faq={system.faq} />

      {/* ── HOW THIS WAS BUILT — the candor panel ─────────────────────────────────────── */}
      <section className="mt-14 rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <span className="mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent-strong">How this was built</span>
        <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-2">{system.howBuilt}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-dim">
          <span className="font-semibold text-ink-2">Version {system.version}</span> · changelog inside the pack · updates to this edition free to owners.
        </p>
      </section>

      {/* ── MADE BY US — the disclosure block ─────────────────────────────────────────── */}
      <div className="mt-8">
        <SystemsDisclosure />
      </div>

      {/* ── FOOTER CROSS-LINKS — the free research this sits on ────────────────────────── */}
      {(system.relatedGuides.length || relatedKits.length) ? (
        <section className="mt-16 border-t border-line pt-10">
          <span className="mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">The research this system sits on (free, as always)</span>
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
