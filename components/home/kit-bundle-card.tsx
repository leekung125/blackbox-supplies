import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

function low(pr: string) { const m = pr.match(/([0-9][0-9,]*)/); return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0; }
function high(pr: string) { const m = pr.match(/[–-]\s*\$?([0-9][0-9,]*)/); return m ? parseInt(m[1].replace(/,/g, ""), 10) : low(pr); }

/**
 * A kit rendered as a visual BUNDLE, not a text card: a cluster of the real product images in
 * the loadout + item count + total price band. Makes a kit feel like a buyable system.
 */
export function KitBundleCard({
  id,
  name,
  problem,
  products,
}: {
  id: string;
  name: string;
  problem: string;
  products: Product[];
}) {
  const items = products.filter(Boolean);
  const cluster = items.slice(0, 4);
  const totalLow = items.reduce((s, p) => s + low(p.priceRange), 0);
  const totalHigh = items.reduce((s, p) => s + high(p.priceRange), 0);
  const band = totalLow ? `$${totalLow.toLocaleString()}–$${totalHigh.toLocaleString()}` : "";

  return (
    <Link href={`/kits/${id}`} className="lit-card lift group flex h-full flex-col overflow-hidden">
      {/* product cluster on a lit stage */}
      <div className="relative grid grid-cols-2 gap-px overflow-hidden bg-well">
        <div aria-hidden className="glow-amber-soft absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2" />
        {cluster.map((p) => (
          <div key={p.id} className="relative aspect-[4/3] overflow-hidden">
            {p.image ? (
              <Image src={p.image} alt={`${p.name} — part of the ${name} kit`} fill sizes="(max-width:640px) 45vw, 20vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <span className="mono flex h-full items-center justify-center text-[0.6rem] uppercase text-accent-bright">{p.brand?.slice(0, 3)}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="pill-amber">{items.length}-piece kit</span>
          {band ? <span className="mono text-[0.72rem] font-semibold text-accent-bright">{band}</span> : null}
        </div>
        <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug text-ink-strong transition-colors group-hover:text-accent-bright">{name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-dim">{problem}</p>
        <span className="mt-3 text-sm font-semibold text-ink-dim transition-colors group-hover:text-accent-bright">Build the loadout →</span>
      </div>
    </Link>
  );
}
