import Link from "next/link";
import { CornerTicks } from "@/components/corner-ticks";
import { Reveal } from "@/components/motion/reveal";

/**
 * "The fix" — the homepage payoff to the hero scene. The hero shows the bad night (phone dead on a
 * wet lot); this panel reveals the unremarkable object that ends it. Clean split card: a framed,
 * premium product plate beside a solid copy block (never text-over-busy-image). Honest by construction.
 */
export function ActiveCampaign() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
      <Reveal>
        <Link
          href="/products/power-bank-compact-10k"
          className="group block overflow-hidden rounded-2xl border border-line bg-card/40 transition-colors hover:border-accent/35"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
            {/* framed product plate — the object itself, lit on black */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-line lg:aspect-auto lg:border-b-0 lg:border-r">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/products/power-bank-compact-10k.jpg"
                alt="Compact 10,000mAh power bank — slim graphite brick"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.045]"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(120% 80% at 50% 0%, transparent 55%, rgba(6,7,11,0.5))" }}
                aria-hidden
              />
              <CornerTicks className="border-accent/25" />
              <span className="kicker absolute left-4 top-4 text-accent-bright/80">PWR · 001</span>
            </div>

            {/* solid copy block — the payoff lives here, never over the image */}
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-10">
              <span className="kicker text-ink-faint">The fix · Dead Phone</span>
              <h2 className="text-balance text-2xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-[1.9rem]">
                The boring object that ends the bad night.
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-ink-dim sm:text-base">
                Phone dead at 3%, the ride already coming. A slim 10,000mAh brick in the door pocket is the
                whole difference between a story and a non-event — unremarkable gear, remarkable timing.
              </p>
              <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-accent-bright">
                Open the field record
                <svg
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.9}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12 H19 M13 6 L19 12 L13 18" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
