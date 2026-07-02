"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

type SceneData = {
  field: string;
  moment: string;
  line: string;
  img: string;
  href: string;
  cta: string;
};

const SCENES: SceneData[] = [
  {
    field: "Power",
    moment: "The phone dies.",
    line: "3% on a wet platform, and the last train just left. No map, no call, no light.",
    img: "/products/power-bank-compact-10k.jpg",
    href: "/products/power-bank-compact-10k",
    cta: "The 10K power bank",
  },
  {
    field: "Light",
    moment: "The road goes dark.",
    line: "No streetlights for two miles. Both hands full. The shoulder drops off to your right.",
    img: "/products/light-headlamp.jpg",
    href: "/products/light-headlamp",
    cta: "The headlamp",
  },
  {
    field: "Car",
    moment: "The tire gives out.",
    line: "Low-pressure light at 11pm. Every gas-station air pump out of service. Forty minutes from home.",
    img: "/products/car-tire-inflator-cordless.jpg",
    href: "/products/car-tire-inflator-cordless",
    cta: "The cordless inflator",
  },
  {
    field: "Power",
    moment: "The block goes black.",
    line: "The whole street loses power. The fridge ticks off. Phones at half, and the night just started.",
    img: "/products/power-station-300wh.jpg",
    href: "/products/power-station-300wh",
    cta: "The 300Wh station",
  },
];

/**
 * "Four ways a night goes wrong" — the failure-moment showcase.
 *
 * Deliberately LIGHTWEIGHT: a normal-flow responsive grid of lazy-loaded, fixed-aspect images.
 * (An earlier version pinned four full-screen images with GPU masks/blur and crashed mobile Safari's
 * render process — "this page couldn't load". Never stack multiple full-viewport composited images.)
 * Only transform/opacity reveals here; nothing that can exhaust GPU memory on a phone.
 */
export function FailureScroll() {
  return (
    <section className="border-y border-line bg-panel/20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <div className="flex items-center gap-2.5">
            <span className="h-px w-7 bg-accent/50" aria-hidden />
            <span className="kicker text-ink-dim">Four ways a night goes wrong</span>
          </div>
          <h2 className="mt-4 max-w-xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The moment it goes wrong — and the thing that ends it.
          </h2>
        </Reveal>

        <Stagger className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SCENES.map((s, i) => (
            <StaggerItem key={`${s.field}-${i}`}>
              <Link
                href={s.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card/40 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-card"
              >
                <div className="relative overflow-hidden border-b border-line bg-base/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.img}
                    alt={`${s.cta} — ${s.moment}`}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(6,7,11,0.82), rgba(6,7,11,0.12) 55%, transparent)",
                    }}
                    aria-hidden
                  />
                  <span className="absolute left-4 top-4 mono text-[0.62rem] uppercase tracking-[0.24em] text-accent-bright">
                    {String(i + 1).padStart(2, "0")} · {s.field}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
                    {s.moment}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.line}</p>
                  <span className="mono mt-4 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim transition-colors group-hover:text-accent-bright">
                    <span className="text-accent/80">The fix</span>
                    {s.cta}
                    <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
