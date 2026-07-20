"use client";

import { useId, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/**
 * PROBLEM-TO-GEAR NAVIGATOR — the homepage decision cockpit.
 *
 * Not a grid of links: an interactive router. The reader picks a real-world
 * problem (left rail on desktop, a scrollable tab row on mobile) and the right
 * panel resolves — crossfading + sliding — to the matched recommendation: the
 * why, the honest price band, a glowing product cutout, and two doors (the
 * compared-picks guide, or the pre-built kit).
 *
 * Amber is the only light in the room. Motion is GPU-cheap and fully
 * reduced-motion guarded. Design tokens + utilities from app/globals.css.
 */

type Problem = {
  id: string;
  tag: string;
  problem: string;
  why: string;
  fixNow: string;
  guide: { label: string; href: string };
  kit: { label: string; href: string };
  category: string;
  priceBand: string;
  img: string;
};

const PROBLEMS: Problem[] = [
  {
    id: "battery",
    tag: "12V",
    problem: "Dead in the driveway",
    why: "A dead battery is the #1 roadside failure. A lithium jump starter cranks it yourself in minutes — no second car, no waiting.",
    fixNow: "Turn off the headlights, heater, and radio, then try again — a weak battery sometimes has one crank left. Just clicking or dead silent? Re-seat the battery terminals. Still nothing → it needs a jump.",
    guide: { label: "Jump starters, compared", href: "/guides/best-jump-starters-compared" },
    kit: { label: "The Roadside Kit", href: "/kits/roadside-kit" },
    category: "Jump starters",
    priceBand: "$70–$150",
    img: "/products/scene/noco-boost-gb40-1000a-ultrasafe.png",
  },
  {
    id: "tire",
    tag: "PSI",
    problem: "Flat, miles from home",
    why: "A cordless inflator reinflates a low tire on the shoulder so you drive to a shop on your own schedule instead of waiting for a tow.",
    fixNow: "Still round and holding some air? Reinflate and drive straight to a shop. A loud hiss, a sidewall gash, or the tire off the rim → don't drive on it, call a tow.",
    guide: { label: "Tire inflators, compared", href: "/guides/best-tire-inflators-compared" },
    kit: { label: "The Roadside Kit", href: "/kits/roadside-kit" },
    category: "Tire inflators",
    priceBand: "$40–$90",
    img: "/products/scene/fanttik-x8-apex-portable-tire.png",
  },
  {
    id: "power",
    tag: "kWh",
    problem: "The night the lights die",
    why: "A LiFePO4 power station keeps the fridge, CPAP, phones and lights running through an outage — sized by watt-hours, not headline watts.",
    fixNow: "Keep the fridge shut — it holds cold about 4 hours. Drop phones to battery-saver and unplug the phantom draws. For anything past a few hours, you need stored watt-hours.",
    guide: { label: "Power stations, compared", href: "/guides/best-power-stations-compared" },
    kit: { label: "The Backup Power Kit", href: "/kits/backup-power-kit" },
    category: "Backup power",
    priceBand: "$300–$900",
    img: "/products/scene/jackery-explorer-1000-v2-portable.png",
  },
  {
    id: "heat",
    tag: "°F",
    problem: "A room like an oven",
    why: "Cool the room that actually gets hot. Buy on SACC (the honest cooling number), not the inflated BTU on the box.",
    fixNow: "Close the blinds on the sunny side, and put a box fan in a window blowing OUT to dump hot air — especially after dark. When the room still won't drop → size real cooling by SACC.",
    guide: { label: "Portable ACs, compared", href: "/guides/best-portable-air-conditioners" },
    kit: { label: "Cooling gear", href: "/heat" },
    category: "Cooling",
    priceBand: "$250–$500",
    img: "/products/scene/midea-duo-14-000-btu-smart.png",
  },
  {
    id: "dashcam",
    tag: "REC",
    problem: "Your word against theirs",
    why: "A dash cam is your word against theirs — proof in a hit-and-run, an insurance dispute, or a rideshare shift.",
    fixNow: "In the moment: photograph both cars, the plates, and the whole scene, and note the time and any witnesses. A dash cam does all of that automatically, every drive — before you need it.",
    guide: { label: "Dash cams, compared", href: "/guides/best-dash-cams-compared" },
    kit: { label: "The Road Trip Kit", href: "/kits/road-trip-kit" },
    category: "Dash cams",
    priceBand: "$100–$250",
    img: "/products/scene/viofo-a229-plus.png",
  },
  {
    id: "kit",
    tag: "KIT",
    problem: "Ready before it happens",
    why: "Skip the guesswork — a curated loadout tells you what to buy first, what to add later, and what to skip.",
    fixNow: "The cheapest readiness step is free: throw a charged jump pack, an inflator, and water in the trunk today. Then build out the rest deliberately, not in a panic.",
    guide: { label: "All buying guides", href: "/guides" },
    kit: { label: "Browse the kits", href: "/kits" },
    category: "Loadouts",
    priceBand: "$120–$400",
    img: "/products/scene/bluetti-ac180-portable-power-station.png",
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12 H19 M13 6 L19 12 L13 18" />
    </svg>
  );
}

/* Per-problem icons — glowing, color-coded gauges (not flat "12V/PSI" line codes).
   Each draws with a bright→deep gradient stroke of its own category color and an outer
   glow, so the rail reads like lit instruments. Cool cyan = cooling, red = record, warm = roadside/power. */
const ICON_PATHS: Record<string, ReactNode> = {
  battery: <><rect x="3" y="7.5" width="18" height="11" rx="2.4" /><path d="M7 7.5V5.5h2.5v2M14.5 7.5V5.5H17v2" /><path d="M7.5 13h3M9 11.5v3M13.5 13h3" /></>,
  tire: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.3" /><path d="M12 3v2.6M12 18.4V21M3 12h2.6M18.4 12H21M5.64 5.64l1.84 1.84M16.52 16.52l1.84 1.84M18.36 5.64l-1.84 1.84M5.64 18.36l1.84-1.84" /></>,
  power: <path d="M13 2 L4 14h6l-1 8 L20 10h-6z" />,
  heat: <><path d="M12 2v20M3.34 7L20.66 17M20.66 7L3.34 17" /><path d="M9.5 3.8L12 2l2.5 1.8M9.5 20.2L12 22l2.5-1.8M4.4 8.7l2.7-.2M4.4 15.3l2.7.2M19.6 8.7l-2.7-.2M19.6 15.3l-2.7.2" /></>,
  dashcam: <><rect x="2.5" y="7" width="13" height="10" rx="2.2" /><circle cx="9" cy="12" r="2.7" /><path d="M15.5 10L21 7.5v9L15.5 14" /></>,
  kit: <><path d="M12 2.8L20.5 7v10L12 21.2 3.5 17V7z" /><path d="M3.5 7L12 11.2 20.5 7M12 11.2V21.2" /></>,
};
const COLORS: Record<string, { hi: string; lo: string }> = {
  battery: { hi: "#ffc24d", lo: "#f5a623" },
  tire: { hi: "#f2a04a", lo: "#e07a1e" },
  power: { hi: "#ffd24d", lo: "#ffb020" },
  heat: { hi: "#5fd3ec", lo: "#2fbfe0" },
  dashcam: { hi: "#f26350", lo: "#e03a24" },
  kit: { hi: "#e6b45a", lo: "#cf8a2a" },
};
function iconColor(id: string) {
  return COLORS[id] ?? COLORS.kit;
}
function ProblemIcon({ id, className }: { id: string; className?: string }) {
  const uid = useId().replace(/[:]/g, "");
  const c = iconColor(id);
  const gid = `pgi-${id}-${uid}`;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ filter: `drop-shadow(0 0 5px ${c.lo}) drop-shadow(0 0 1.5px ${c.hi})` }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff4da" />
          <stop offset="0.55" stopColor={c.hi} />
          <stop offset="1" stopColor={c.lo} />
        </linearGradient>
      </defs>
      <g stroke={`url(#${gid})`} strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round">
        {ICON_PATHS[id] ?? ICON_PATHS.kit}
      </g>
    </svg>
  );
}

export function ProblemNavigator() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(PROBLEMS[0].id);
  const uid = useId().replace(/[:]/g, "");
  const active = PROBLEMS.find((p) => p.id === activeId) ?? PROBLEMS[0];
  const activeIndex = PROBLEMS.findIndex((p) => p.id === active.id);
  const activeC = iconColor(active.id);

  return (
    <div className="relative">
      {/* header — the framing question */}
      <div className="max-w-2xl">
        <span className="eyebrow eyebrow-accent">The moment it happens</span>
        <h2 className="section-title mt-3 text-balance">When it goes wrong.</h2>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-dim text-pretty">
          Six moments most people meet unprepared. Tap one — we tell you what to do right now, for free,
          then the one thing worth owning so it never strands you again.
        </p>
      </div>

      {/* MOBILE — scrollable problem tabs */}
      <div className="mt-8 lg:hidden">
        <div
          role="tablist"
          aria-label="Choose your problem"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PROBLEMS.map((p) => {
            const on = p.id === active.id;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActiveId(p.id)}
                className={[
                  "group flex min-h-[44px] shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-left transition-all duration-300",
                  on
                    ? "grad-border-amber text-accent-bright shadow-[0_0_20px_-5px_rgba(217,154,69,0.65)]"
                    : "border border-line-strong bg-surface text-ink-dim hover:text-ink",
                ].join(" ")}
              >
                <ProblemIcon id={p.id} className="h-[1.2rem] w-[1.2rem] shrink-0" />
                <span className="whitespace-nowrap text-[0.86rem] font-semibold">{p.problem}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* THE COCKPIT — rail + reveal */}
      <div className="mt-6 grid gap-5 lg:mt-10 lg:grid-cols-[minmax(0,0.9fr)_1.3fr] lg:gap-6">
        {/* DESKTOP — vertical problem rail */}
        <div className="hidden lg:block">
          <div className="lit-card grad-border p-2">
            <div role="tablist" aria-label="Choose your problem" aria-orientation="vertical">
              {PROBLEMS.map((p, i) => {
                const on = p.id === active.id;
                const c = iconColor(p.id);
                return (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActiveId(p.id)}
                    className={[
                      "group relative flex min-h-[44px] w-full items-center gap-3.5 rounded-xl px-4 py-3.5 text-left transition-colors duration-300",
                      on ? "bg-surface-2" : "hover:bg-surface",
                    ].join(" ")}
                  >
                    {/* sliding amber indicator */}
                    {on &&
                      (reduce ? (
                        <span className="absolute left-1 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-full bg-accent" aria-hidden />
                      ) : (
                        <motion.span
                          layoutId={`rail-indicator-${uid}`}
                          className="absolute left-1 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-full bg-accent"
                          style={{ boxShadow: "0 0 12px rgba(217,154,69,0.7)" }}
                          transition={{ type: "spring", stiffness: 520, damping: 40 }}
                          aria-hidden
                        />
                      ))}

                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300"
                      style={{
                        borderColor: on ? `${c.hi}bb` : `${c.hi}33`,
                        background: `radial-gradient(125% 125% at 50% 22%, ${c.lo}${on ? "3d" : "1f"}, transparent 72%)`,
                        boxShadow: on ? `0 0 20px -5px ${c.lo}, inset 0 0 12px -6px ${c.hi}` : "none",
                      }}
                    >
                      <ProblemIcon id={p.id} className="h-[1.35rem] w-[1.35rem]" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={[
                          "block font-display text-[1.02rem] font-semibold leading-snug transition-colors",
                          on ? "text-accent" : "text-ink-strong group-hover:text-accent",
                        ].join(" ")}
                      >
                        {p.problem}
                      </span>
                      <span className="mono mt-0.5 block text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">
                        {p.category}
                      </span>
                    </span>

                    <ArrowRight
                      className={[
                        "h-4 w-4 shrink-0 transition-all duration-300",
                        on ? "translate-x-0 text-accent opacity-100" : "-translate-x-1 text-ink-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                      ].join(" ")}
                    />
                    <span className="mono ml-1 hidden shrink-0 text-[0.56rem] tabular text-ink-faint xl:inline">
                      0{i + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* THE REVEAL PANEL */}
        <div className="lit-card grad-border-amber focal-glow relative overflow-hidden">
          {/* the lamp behind the product — breathing, like a real filament */}
          <div aria-hidden className="glow-amber scn-breathe right-[-6%] top-[-10%] h-[70%] w-[62%] sm:right-[2%] sm:h-[78%] sm:w-[52%]" />
          {/* faint technical grid, masked to the panel */}
          <div aria-hidden className="atmo-grid pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            {/* cockpit readout header */}
            <div className="mb-2 flex items-center justify-between">
              <span className="eyebrow inline-flex items-center gap-2 text-ink-faint">
                <span aria-hidden className="scn-dot-pulse h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(217,154,69,0.55)]" />
                Matched recommendation
              </span>
              <span className="mono text-[0.6rem] tabular text-ink-faint">
                <span className="text-accent-bright">0{activeIndex + 1}</span>
                <span className="px-1 opacity-40">/</span>0{PROBLEMS.length}
              </span>
            </div>
            {/* readout progress filament — tracks the selected problem across the six */}
            <div aria-hidden className="mb-6 h-px w-full overflow-hidden rounded-full bg-line-soft">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${((activeIndex + 1) / PROBLEMS.length) * 100}%`,
                  background: "linear-gradient(90deg, rgba(168,111,44,0.7), #d99a45 60%, #edba66)",
                  boxShadow: "0 0 10px rgba(217,154,69,0.7)",
                  transition: reduce ? "none" : "width 0.5s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                className="grid gap-7 sm:grid-cols-[1.15fr_0.85fr] sm:items-center"
              >
                {/* the argument */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border"
                      style={{
                        borderColor: `${activeC.hi}bb`,
                        background: `radial-gradient(125% 125% at 50% 22%, ${activeC.lo}44, transparent 72%)`,
                        boxShadow: `0 0 22px -5px ${activeC.lo}, inset 0 0 12px -6px ${activeC.hi}`,
                      }}
                    >
                      <ProblemIcon id={active.id} className="h-[1.4rem] w-[1.4rem]" />
                    </span>
                    <span className="mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint">{active.category}</span>
                  </div>

                  <h3 className="mt-4 font-display text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.015em] text-ink-strong text-balance sm:text-[2rem]">
                    {active.problem}
                  </h3>

                  <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-dim text-pretty">
                    {active.why}
                  </p>

                  {/* the free triage step — help first, sell second (the wedge: what to do the moment it breaks) */}
                  <div className="mt-5 rounded-xl border border-line-strong bg-surface-2/50 p-4">
                    <span className="mono flex items-center gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-ink-2">
                      <svg className="h-3.5 w-3.5 text-accent-bright" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L4 16.8 7.2 20l5.3-5.3a4 4 0 0 0 5.2-5.4l-2.4 2.4-2.1-2.1z" />
                      </svg>
                      Right now, for free
                    </span>
                    <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-2 text-pretty">{active.fixNow}</p>
                  </div>

                  {/* honest price band */}
                  <div
                    className="mt-6 inline-flex items-center gap-3 rounded-lg border border-line-strong bg-surface-2 px-4 py-2.5"
                    style={{ boxShadow: "inset 0 1px 0 rgba(235,227,209,0.06), 0 0 18px -8px rgba(217,154,69,0.5)" }}
                  >
                    <span className="mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-faint">Typical range</span>
                    <span className="mono text-[1rem] font-semibold tabular text-accent-bright" style={{ textShadow: "0 0 14px rgba(237,186,102,0.4)" }}>{active.priceBand}</span>
                  </div>

                  {/* the two doors */}
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link href={active.guide.href} aria-label={active.guide.label} className="cta-amber cta-sheen min-h-[44px]">
                      See the picks
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={active.kit.href}
                      aria-label={active.kit.label}
                      className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-[10px] border border-line-strong px-5 py-3 font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent-bright"
                    >
                      Or build the kit
                      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  </div>

                  <p className="mono mt-4 text-[0.6rem] uppercase tracking-[0.12em] text-ink-faint">
                    Opens · {active.guide.label}
                  </p>
                </div>

                {/* the matched product, shown in its real-use scene — clicks straight through to the picks */}
                <Link
                  href={active.guide.href}
                  aria-label={active.guide.label}
                  className="group relative block"
                >
                  <div className="lit-card grad-border-amber focal-glow relative aspect-square overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_0_0_1px_rgba(217,154,69,0.45),0_0_38px_-6px_rgba(217,154,69,0.6),0_0_120px_-18px_rgba(217,154,69,0.4)]">
                    <Image
                      src={active.img}
                      alt={`${active.category} — ${active.problem}`}
                      width={640}
                      height={640}
                      sizes="(max-width: 1024px) 60vw, 360px"
                      className="h-full w-full select-none object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
                    {/* contact shadow: the scene settles into the card, product reads grounded */}
                    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0d0906]/55 to-transparent" />
                    {/* HUD corner brackets — the reticle locks onto the matched gear */}
                    {[
                      "left-2.5 top-2.5 border-l-2 border-t-2 rounded-tl-md",
                      "right-2.5 top-2.5 border-r-2 border-t-2 rounded-tr-md",
                      "left-2.5 bottom-2.5 border-l-2 border-b-2 rounded-bl-md",
                      "right-2.5 bottom-2.5 border-r-2 border-b-2 rounded-br-md",
                    ].map((pos) => (
                      <span
                        key={pos}
                        aria-hidden
                        className={`pointer-events-none absolute h-4 w-4 border-accent-bright/70 opacity-60 transition-all duration-500 group-hover:opacity-100 ${pos}`}
                        style={{ filter: "drop-shadow(0 0 6px rgba(217,154,69,0.8))" }}
                      />
                    ))}
                    {/* readout chip pinned to the scene */}
                    <span className="pill-amber pointer-events-none absolute bottom-3 left-3 backdrop-blur-sm" style={{ background: "linear-gradient(180deg, rgba(20,14,7,0.78), rgba(20,14,7,0.66))" }}>
                      {active.category}
                    </span>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
