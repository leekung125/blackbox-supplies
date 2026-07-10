import Image from "next/image";
import { CategoryGlyph } from "@/components/category-glyph";
import type { Category } from "@/lib/products";

/**
 * Per-category accent — color that MEANS something (mirrors the nav's colour language):
 * cooling reads ice-cyan, power reads electric-gold, roadside/tire warm-orange, dash-cam alert-red,
 * jump-start battery-amber, everything else the house amber. `hi` = bright edge, `lo` = deep glow.
 */
export type Accent = { hi: string; lo: string };

const ACCENTS = {
  cooling: { hi: "#7fe0f2", lo: "#2fbfe0" },
  power: { hi: "#ffd24d", lo: "#ffb020" },
  roadside: { hi: "#f2a04a", lo: "#e07a1e" },
  record: { hi: "#f26350", lo: "#e03a24" },
  battery: { hi: "#ffc24d", lo: "#f5a623" },
  amber: { hi: "#edba66", lo: "#d99a45" },
} satisfies Record<string, Accent>;

const CATEGORY_TONE: Record<string, keyof typeof ACCENTS> = {
  "Portable AC": "cooling",
  "Cooling Fans": "cooling",
  "Personal Cooling": "cooling",
  "Dorm Cooling": "cooling",
  "Cooling Sleep": "cooling",
  "Power & Charging": "power",
  "Roadside Safety": "roadside",
  "Tire Inflators": "roadside",
  "Dash Cams": "record",
  "Jump Starters": "battery",
};

/** Resolve a category name → its accent pair. Unknown categories fall back to house amber. */
export function categoryAccent(name: string): Accent {
  return ACCENTS[CATEGORY_TONE[name] ?? "amber"];
}

// CategoryGlyph only ships line-art for the car verticals — supply matching glyphs for the newer
// cooling / useful categories so their heroes are iconed, not empty.
const GLYPH_COVERED = new Set([
  "Jump Starters",
  "Tire Inflators",
  "Dash Cams",
  "Power & Charging",
  "Roadside Safety",
  "Car Utility",
]);

function FallbackGlyph({ name, className }: { name: string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "Desk & Tech") {
    // Monitor on a stand.
    return (
      <svg {...common}>
        <rect x="3" y="4.5" width="18" height="11.5" rx="1.8" />
        <path d="M9.5 20h5M12 16v4" />
      </svg>
    );
  }
  if (name === "Travel & EDC") {
    // Compass.
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.6" />
        <path d="M15.4 8.6l-2.1 4.7-4.7 2.1 2.1-4.7z" />
      </svg>
    );
  }
  if (name === "Problem Solvers") {
    // Radiant spark.
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3.1" />
        <path d="M12 2.6V6M12 18v3.4M2.6 12H6M18 12h3.4M5.6 5.6l2.4 2.4M16 16l2.4 2.4M18.4 5.6L16 8M8 16l-2.4 2.4" />
      </svg>
    );
  }
  // Cooling default — snowflake.
  return (
    <svg {...common}>
      <path d="M12 2.4v19.2M4.1 7l15.8 10M19.9 7L4.1 17" />
      <path d="M12 5.7l2.3-1.6M12 5.7L9.7 4.1M12 18.3l2.3 1.6M12 18.3l-2.3 1.6" />
    </svg>
  );
}

/** CategoryGlyph where it exists, else a matched fallback glyph — never an empty chip. */
export function HeroGlyph({ name, className }: { name: string; className?: string }) {
  return GLYPH_COVERED.has(name) ? (
    <CategoryGlyph category={name as Category} className={className} />
  ) : (
    <FallbackGlyph name={name} className={className} />
  );
}

/**
 * Cinematic category hero — a big, art-directed banner the H1 lives inside. The brand plate sits
 * full-bleed under a bottom-up espresso scrim so the overlaid type stays legible against any image,
 * lit by ONE lamp coloured for the category (cooling = cyan, power = gold, etc.). A glowing category
 * glyph chip anchors the tagline, and a colour-matched under-rule seats the title. Taller on mobile,
 * wide 16/6-ish on desktop. Pure server component — no interactivity.
 */
export function CategoryHero({
  name,
  tagline,
  image,
  sceneMood,
}: {
  name: Category;
  tagline: string;
  image: string;
  /** Optional field-scene mood line, shown as a small kicker over the image. */
  sceneMood?: string;
}) {
  const c = categoryAccent(name);
  return (
    <div className="lit-card grad-border-amber relative isolate mt-6 aspect-[3/4] w-full overflow-hidden rounded-2xl sm:aspect-[16/7] lg:aspect-[16/6]">
      <Image
        src={image}
        alt={`${name} — BlackBox Supplies`}
        fill
        priority
        sizes="(min-width: 1024px) 72rem, 100vw"
        className="object-cover"
      />

      {/* legibility scrim — warm espresso rising from the bottom-left, plus a soft top vignette */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0d0906] via-[#0d0906]/55 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#0d0906]/72 via-transparent to-transparent" />
      {/* faint technical grid for depth, masked under the scrim */}
      <div aria-hidden className="atmo-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
      {/* one lamp, coloured for the category, sunk into the top-right corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full opacity-75 mix-blend-screen"
        style={{ background: `radial-gradient(closest-side, ${c.lo}47, transparent 72%)` }}
      />
      {/* a second, dimmer bloom low-left so the frame reads lit from two points, not flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-[-10%] h-56 w-72 rounded-full opacity-40 mix-blend-screen"
        style={{ background: `radial-gradient(closest-side, ${c.lo}2e, transparent 74%)` }}
      />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
        <div className="flex items-center gap-3">
          {/* glowing category glyph chip — the canonical glow-chip recipe */}
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
            style={{
              borderColor: `${c.hi}bb`,
              background: `radial-gradient(125% 125% at 50% 22%, ${c.lo}3d, transparent 72%)`,
              boxShadow: `0 0 20px -5px ${c.lo}, inset 0 0 12px -6px ${c.hi}`,
            }}
          >
            <span style={{ color: c.hi, filter: `drop-shadow(0 0 5px ${c.lo}) drop-shadow(0 0 1.5px ${c.hi})` }}>
              <HeroGlyph name={name} className="h-[1.35rem] w-[1.35rem]" />
            </span>
          </span>
          <span className="eyebrow" style={{ color: c.hi }}>
            {tagline}
          </span>
        </div>
        <h1
          className="mt-3.5 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.03] text-ink-strong sm:text-5xl lg:text-6xl"
          style={{ textShadow: `0 0 34px ${c.lo}42` }}
        >
          {name}
        </h1>
        {/* colour-matched under-rule seating the title */}
        <div
          aria-hidden
          className="mt-4 h-[2px] w-24 rounded-full"
          style={{ background: `linear-gradient(90deg, ${c.hi}, ${c.lo}00)`, boxShadow: `0 0 12px -2px ${c.lo}` }}
        />
        {sceneMood ? (
          <p className="mono mt-3.5 text-[0.72rem] uppercase tracking-[0.16em] text-ink-dim">{sceneMood}</p>
        ) : null}
      </div>
    </div>
  );
}
