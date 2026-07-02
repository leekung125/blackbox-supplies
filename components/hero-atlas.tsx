"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { getProductById } from "@/lib/products";
import { Magnetic } from "@/components/motion/magnetic";

/**
 * THE INCIDENT ATLAS — the homepage centerpiece.
 *
 * Not a headline over a card grid. A field-system instrument: a framed cinematic incident viewport
 * the visitor can switch between failure moments (dead phone / dark road / flat tire / power out).
 * Switching swaps the scene, the incident, and the response object — genuine agency, the whole brand
 * told in one screen. Performant by construction: ONE contained viewport that cross-fades the active
 * scene (never the full-screen composited stack that crashed mobile Safari).
 */
type Moment = {
  id: string;
  field: string;
  label: string;
  incident: string;
  scene: string;
  productId: string;
  role: string;
  tone: "cold" | "ember";
};

const MOMENTS: Moment[] = [
  {
    id: "dead-phone",
    field: "Power",
    label: "Dead phone",
    incident: "3% on a wet platform. No map, no call, no light.",
    scene: "/scenes/dead-phone.jpg",
    productId: "power-bank-compact-10k",
    role: "Pocket backup — phone alive in minutes.",
    tone: "cold",
  },
  {
    id: "dark-road",
    field: "Light",
    label: "Dark road",
    incident: "No streetlights for two miles. Both hands full.",
    scene: "/scenes/dark-road.jpg",
    productId: "light-headlamp",
    role: "Hands-free beam — see the shoulder.",
    tone: "cold",
  },
  {
    id: "flat-tire",
    field: "Car",
    label: "Flat tire",
    incident: "Low-pressure light at 11pm. Every pump out of service.",
    scene: "/scenes/flat-tire.jpg",
    productId: "car-tire-inflator-cordless",
    role: "Reinflate on the shoulder — drive home.",
    tone: "ember",
  },
  {
    id: "power-out",
    field: "Power",
    label: "Power out",
    incident: "The block goes black. The fridge ticks off.",
    scene: "/scenes/power-out.jpg",
    productId: "power-station-300wh",
    role: "Outage power — lights, phones, hours.",
    tone: "cold",
  },
];

export function HeroAtlas({ total }: { total: number }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const m = MOMENTS[active];
  const product = getProductById(m.productId);
  const toneText = m.tone === "ember" ? "text-ember-bright" : "text-accent-bright";
  const toneBorder = m.tone === "ember" ? "border-ember/50" : "border-accent/50";

  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div className="bbx-aurora absolute inset-0 -z-10 opacity-50" aria-hidden />

      {/* system HUD bar */}
      <div className="border-b border-line-soft bg-base/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <span className="hud truncate text-ink-dim">
            Blackbox <span className="text-ink-faint">// field system for bad timing</span>
          </span>
          <span className="hud flex shrink-0 items-center gap-2 text-ink-faint">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent-bright" aria-hidden />
            {total} records · 4 fields
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:py-16">
        {/* ── THE INCIDENT VIEWPORT */}
        <div className="hero-rise order-1 lg:order-1" style={{ animationDelay: "40ms" }}>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-base">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={m.scene}
                src={m.scene}
                alt={`${m.label} — ${m.incident}`}
                fetchPriority="high"
                initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
            </AnimatePresence>

            {/* scanline + vignette + bottom scrim for legibility */}
            <div className="scan pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(6,7,11,0.92) 2%, rgba(6,7,11,0.25) 34%, transparent 60%)" }}
              aria-hidden
            />

            {/* corner ticks */}
            <Ticks />

            {/* top overlay: field + REC */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
              <span className={`hud rounded-sm border ${toneBorder} bg-base/50 px-2 py-1 ${toneText} backdrop-blur-sm`}>
                Field · {m.field}
              </span>
              <span className="hud flex items-center gap-1.5 text-ink-dim">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-warn" aria-hidden />
                Rec
              </span>
            </div>

            {/* bottom overlay: the incident */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={m.id}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="hud mb-1.5 text-ink-faint">Incident // {String(active + 1).padStart(3, "0")}</div>
                  <p className="max-w-md text-pretty text-[0.95rem] leading-snug text-ink sm:text-base">
                    {m.incident}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── THE CONTROL PANEL */}
        <div className="order-2 lg:order-2">
          <h1
            className="hero-rise text-balance text-[2.5rem] font-extrabold leading-[0.96] tracking-[-0.03em] text-white sm:text-[3.2rem] lg:text-[3.5rem]"
            style={{ animationDelay: "90ms" }}
          >
            Gear for the moment <span className="text-ink-dim">normal plans fail.</span>
          </h1>
          <p
            className="hero-rise mt-4 max-w-md text-[0.98rem] leading-relaxed text-ink-dim sm:text-lg"
            style={{ animationDelay: "150ms" }}
          >
            Everyday objects that only look boring — until the night they&rsquo;re the only thing that
            matters. Pick the moment. See what changes the outcome.
          </p>

          {/* moment selector */}
          <div className="hero-rise mt-7" style={{ animationDelay: "210ms" }}>
            <div className="hud mb-2.5 text-ink-faint">Select a failure moment</div>
            <div className="grid grid-cols-2 gap-2">
              {MOMENTS.map((mm, i) => {
                const on = i === active;
                return (
                  <button
                    key={mm.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={`group relative overflow-hidden rounded-lg border px-3.5 py-3 text-left transition-all duration-200 ${
                      on
                        ? "border-accent/60 bg-accent/12"
                        : "border-line bg-card/40 hover:border-accent/30 hover:bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-semibold ${on ? "text-white" : "text-ink"}`}>{mm.label}</span>
                      <span
                        className={`mono text-[0.6rem] uppercase tracking-[0.14em] ${
                          on ? (mm.tone === "ember" ? "text-ember-bright" : "text-accent-bright") : "text-ink-faint"
                        }`}
                      >
                        {mm.field}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* the response */}
          {product ? (
            <Link
              href={`/products/${product.id}`}
              className="hero-rise group mt-4 flex items-center gap-4 overflow-hidden rounded-xl border border-line bg-card/40 p-3 transition-all hover:border-accent/30 hover:bg-card"
              style={{ animationDelay: "260ms" }}
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-base">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="hud mb-1 text-ink-faint">The response</div>
                <div className="truncate text-sm font-semibold text-ink">{product.name}</div>
                <div className="truncate text-[0.8rem] leading-snug text-ink-dim">{m.role}</div>
              </div>
              <span className="mono shrink-0 text-ink-faint transition-colors group-hover:text-accent-bright" aria-hidden>
                →
              </span>
            </Link>
          ) : null}

          {/* CTAs */}
          <div className="hero-rise mt-6 flex flex-wrap items-center gap-3" style={{ animationDelay: "320ms" }}>
            <Magnetic>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-accent/60 bg-accent px-5 py-2.5 text-sm font-semibold text-[#04141d] shadow-[0_8px_24px_-12px_rgba(91,147,184,0.7)] transition-colors hover:bg-accent-bright"
              >
                Enter the system
              </Link>
            </Magnetic>
            <Link
              href="/kits"
              className="mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-dim underline decoration-line underline-offset-4 transition-colors hover:text-accent-bright"
            >
              Browse field kits →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticks() {
  const base =
    "pointer-events-none absolute h-4 w-4 border-accent/40";
  return (
    <div aria-hidden>
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} bottom-3 left-3 border-b border-l`} />
      <span className={`${base} bottom-3 right-3 border-b border-r`} />
    </div>
  );
}
