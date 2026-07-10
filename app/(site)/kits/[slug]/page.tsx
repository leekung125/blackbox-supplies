import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { KitBuilder } from "@/components/kits/kit-builder";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getKitById, KIT_SLUGS } from "@/lib/kits";
import { guideRefForSlug } from "@/lib/guides";
import { getProductById, type Product } from "@/lib/products";
import { MethodologyPanel } from "@/components/methodology-panel";

export const dynamicParams = false;

export function generateStaticParams() {
  return KIT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const kit = getKitById(slug);
  if (!kit) return { title: "Kit not found" };
  return { title: kit.name, description: kit.dek, alternates: { canonical: `/kits/${kit.id}` } };
}

export default async function KitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kit = getKitById(slug);
  if (!kit) notFound();

  // Role badge each item earns: solves the core problem → must-have, situational → optional, else upgrade.
  const roleFor = (id: string): "must-have" | "optional" | "upgrade" =>
    kit.mustHaveIds.includes(id) ? "must-have" : kit.optionalIds.includes(id) ? "optional" : "upgrade";
  const withRole = (p: Product) => ({ ...p, role: roleFor(p.id) });

  const rawBuyFirst = getProductById(kit.buyFirstId);
  const buyFirst = rawBuyFirst ? withRole(rawBuyFirst) : undefined;
  const starters = kit.starterIds.filter((id) => id !== kit.buyFirstId).map(getProductById).filter((p): p is Product => Boolean(p)).map(withRole);
  const betters = kit.betterIds.map(getProductById).filter((p): p is Product => Boolean(p)).map(withRole);
  const premium = kit.premiumIds.map(getProductById).filter((p): p is Product => Boolean(p)).map(withRole);
  // Unified resolver: kit guides now resolve to comparison guides too (were silently dropped).
  const guides = kit.relatedGuides.map(guideRefForSlug).filter(Boolean);

  const kitImage: Record<string, string> = {
    "roadside-kit": "/brand/kit-roadside.png",
    "road-trip-kit": "/brand/kit-roadtrip.png",
    "backup-power-kit": "/brand/kit-outage.png",
    "winter-car-kit": "/brand/kit-winter.png",
    "garage-starter-kit": "/brand/kit-garage.png",
  };
  const heroImg = kitImage[kit.id];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Kits", href: "/kits" },
          { label: kit.name },
        ]}
      />

      {/* cinematic kit hero — the loadout as a buyable system */}
      {heroImg ? (
        <div className="lit-card relative mt-5 aspect-[16/8] overflow-hidden sm:aspect-[16/6]">
          <Image src={heroImg} alt={kit.name} fill priority sizes="(max-width:1024px) 100vw, 60rem" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0d0906] via-[#0d0906]/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <span className="pill-amber">Gear kit</span>
            <h1 className="mt-2.5 text-balance font-display text-4xl font-semibold leading-[1.04] text-ink-strong sm:text-5xl">{kit.name}</h1>
            <p className="mt-2 text-lg font-medium text-accent-bright">{kit.tagline}</p>
          </div>
        </div>
      ) : (
        <header className="mt-5 max-w-3xl">
          <span className="eyebrow eyebrow-accent">Gear kit</span>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">{kit.name}</h1>
          <p className="mt-3 text-lg font-medium text-accent-strong">{kit.tagline}</p>
        </header>
      )}
      <p className="lede mt-5 max-w-3xl">{kit.dek}</p>

      <div className="mt-7 rounded-2xl border border-line bg-surface-2 p-5 sm:p-6">
        <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink-2">The problem it solves</h2>
        <p className="mt-2 text-[1.02rem] leading-relaxed text-ink">{kit.problem}</p>
      </div>

      {/* Interactive loadout builder — starter / better / premium tiers */}
      {buyFirst ? (
        <div className="mt-12">
          <KitBuilder buyFirst={buyFirst} starter={starters} better={betters} premium={premium} toSkip={kit.toSkip} commonMistakes={kit.commonMistakes} />
        </div>
      ) : null}

      {guides.length ? (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink">Read the guides</h2>
          <div className="mt-4 flex flex-col gap-3">
            {guides.map((g) => (
              <Link key={g!.slug} href={`/guides/${g!.slug}`} className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40">
                <div>
                  <span className="eyebrow eyebrow-accent">{g!.categoryLabel}</span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink group-hover:text-accent-strong">{g!.title}</h3>
                </div>
                <span className="shrink-0 text-accent-strong" aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-12">
        <MethodologyPanel updated="July 2026" specsLabel="Every item researched & spec-checked" />
      </div>

      <p className="mt-8 text-xs leading-relaxed text-ink-dim">
        Outbound links are Amazon affiliate links. As an Amazon Associate, BlackBox Supplies earns from qualifying purchases, at no extra cost to you. Prices are approximate — confirm the current price on Amazon. <Link href="/disclosure" className="ulink font-semibold">Full disclosure</Link>.
      </p>

      <div className="mt-14">
        <NewsletterCta />
      </div>
    </div>
  );
}
