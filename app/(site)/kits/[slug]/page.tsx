import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductThumb } from "@/components/product-thumb";
import { OutboundLink } from "@/components/outbound-link";
import { NewsletterCta } from "@/components/newsletter-cta";
import { getKitById, KIT_SLUGS } from "@/lib/kits";
import { getGuideBySlug } from "@/lib/guides";
import { getProductById } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return KIT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const kit = getKitById(slug);
  if (!kit) return { title: "Kit not found" };
  return { title: kit.name, description: kit.dek };
}

export default async function KitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kit = getKitById(slug);
  if (!kit) notFound();

  const buyFirst = getProductById(kit.buyFirstId);
  const starters = kit.starterIds.filter((id) => id !== kit.buyFirstId).map(getProductById).filter(Boolean);
  const betters = kit.betterIds.map(getProductById).filter(Boolean);
  const premium = kit.premiumIds.map(getProductById).filter(Boolean);
  const guides = kit.relatedGuides.map(getGuideBySlug).filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-dim">
        <Link href="/" className="hover:text-accent-strong">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/kits" className="hover:text-accent-strong">Kits</Link>
      </nav>

      <header className="mt-5 max-w-3xl">
        <span className="eyebrow eyebrow-accent">Gear kit</span>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">
          {kit.name}
        </h1>
        <p className="mt-3 text-lg font-medium text-accent-strong">{kit.tagline}</p>
        <p className="lede mt-4">{kit.dek}</p>
      </header>

      <div className="mt-7 rounded-2xl border border-line bg-surface-2 p-5 sm:p-6">
        <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink-2">The problem it solves</h2>
        <p className="mt-2 text-[1.02rem] leading-relaxed text-ink">{kit.problem}</p>
      </div>

      {/* Buy first */}
      {buyFirst ? (
        <section className="mt-10">
          <div className="flex items-center gap-2.5">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">Buy this first</span>
            <span className="text-sm text-ink-dim">The one thing to start with.</span>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-accent/25 bg-surface">
            <div className="flex flex-col sm:flex-row">
              <Link href={`/products/${buyFirst.id}`} className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-square sm:w-56">
                <ProductThumb product={buyFirst} className="h-full w-full" pad="p-6" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-6">
                <span className="eyebrow">{buyFirst.category}</span>
                <h3 className="mt-1.5 font-display text-2xl font-semibold text-ink">
                  <Link href={`/products/${buyFirst.id}`} className="hover:text-accent-strong">{buyFirst.name}</Link>
                </h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">{buyFirst.verdict}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <OutboundLink product={buyFirst} variant="primary" disclosure="compact" />
                  <Link href={`/products/${buyFirst.id}`} className="ulink text-sm font-semibold">Full details</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {starters.length ? (
        <KitTier label="Start with" note="The essentials for this kit." products={starters} />
      ) : null}
      {betters.length ? (
        <KitTier label="Then add" note="Upgrades for more coverage." products={betters} tone="outline" />
      ) : null}
      {premium.length ? (
        <KitTier label="Complete it" note="The premium, do-it-right additions." products={premium} tone="outline" />
      ) : null}

      {guides.length ? (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink">Read the guides</h2>
          <div className="mt-4 flex flex-col gap-3">
            {guides.map((g) => (
              <Link key={g!.slug} href={`/guides/${g!.slug}`} className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40">
                <div>
                  <span className="eyebrow eyebrow-accent">{g!.category}</span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink group-hover:text-accent-strong">{g!.title}</h3>
                </div>
                <span className="shrink-0 text-accent-strong" aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <p className="mt-10 rounded-xl border border-line bg-surface-2 p-4 text-xs leading-relaxed text-ink-dim">
        Outbound links are Amazon affiliate links. As an Amazon Associate, BlackBox Supply earns from qualifying purchases, at no extra cost to you. Prices are approximate — confirm the current price on Amazon. <Link href="/disclosure" className="ulink font-semibold">Full disclosure</Link>.
      </p>

      <div className="mt-14">
        <NewsletterCta />
      </div>
    </div>
  );
}

function KitTier({
  label,
  note,
  products,
  tone = "solid",
}: {
  label: string;
  note: string;
  products: Array<ReturnType<typeof getProductById>>;
  tone?: "solid" | "outline";
}) {
  return (
    <section className="mt-9">
      <div className="flex items-center gap-2.5">
        <span
          className={
            tone === "solid"
              ? "rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent"
              : "rounded-full border border-line-strong bg-surface px-3 py-1 text-xs font-semibold text-ink"
          }
        >
          {label}
        </span>
        <span className="text-sm text-ink-dim">{note}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (p ? <ProductCard key={p.id} product={p} /> : null))}
      </div>
    </section>
  );
}
