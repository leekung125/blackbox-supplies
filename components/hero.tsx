"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic } from "@/components/motion/magnetic";

const PILLS = ["10,000 mAh", "USB-C charging", "Slim aluminum", "Pocket-size"];

/**
 * Homepage hero — the brand in one cinematic, interactive frame.
 *
 * A split stage: the value proposition on one side, the actual best product (the compact power bank)
 * on the other as a large floating object that reacts to the cursor (parallax tilt + a key light that
 * tracks the pointer) and to scroll (it drifts, scales, and fades as the page moves). On mobile it
 * stacks — copy first, product below. The copy is revealed by the pure-CSS `.hero-rise` animation, so
 * above-the-fold text is NEVER blank waiting on hydration; the motion is enhancement only.
 */
export function Hero({ total }: { total: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // ── scroll-linked: the product drifts up, scales, and fades as the hero scrolls away
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const prodY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const prodScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const prodOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 56]);

  // ── cursor-linked: the product tilts toward the pointer and the key light follows it
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 90, damping: 20, mass: 0.5 });
  const my = useSpring(myRaw, { stiffness: 90, damping: 20, mass: 0.5 });
  const rotX = useTransform(my, [-0.5, 0.5], [9, -9]);
  const rotY = useTransform(mx, [-0.5, 0.5], [-11, 11]);
  const driftX = useTransform(mx, [-0.5, 0.5], [-26, 26]);
  const driftY = useTransform(my, [-0.5, 0.5], [-18, 18]);
  const glowX = useTransform(mx, [-0.5, 0.5], [-80, 80]);
  const glowY = useTransform(my, [-0.5, 0.5], [-54, 54]);

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mxRaw.set((e.clientX - r.left) / r.width - 0.5);
    myRaw.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mxRaw.set(0);
    myRaw.set(0);
  }

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden border-b border-line"
    >
      {/* ambient field */}
      <div className="bbx-aurora absolute inset-0 -z-10 opacity-55" aria-hidden />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(120% 80% at 78% 36%, rgba(91,147,184,0.07), transparent 56%)" }}
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 pb-12 pt-28 sm:px-6 lg:grid-cols-[1.04fr_1fr] lg:gap-6 lg:pb-16 lg:pt-32">
        {/* ── COPY (pure-CSS reveal, JS-independent) */}
        <motion.div
          style={reduce ? undefined : { y: copyY }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <div className="hero-rise flex items-center gap-2.5" style={{ animationDelay: "40ms" }}>
            <span className="h-px w-7 bg-accent/60" aria-hidden />
            <span className="kicker text-accent-bright">The Dead Phone fix · Field 01 / Power</span>
          </div>

          <h1
            className="hero-rise mt-5 max-w-xl text-balance text-[2.55rem] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-[3.4rem] lg:text-[4rem] lg:leading-[0.95]"
            style={{ animationDelay: "110ms" }}
          >
            The gear that ends a bad night.
          </h1>

          <p
            className="hero-rise mt-5 max-w-md text-[1.02rem] leading-relaxed text-ink-dim sm:text-lg"
            style={{ animationDelay: "190ms" }}
          >
            Dead phone, dark road, flat tire, power out. Blackbox Supply is the small, well-chosen kit
            that quietly turns the moment around — starting with the one in your pocket.
          </p>

          <div
            className="hero-rise mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            style={{ animationDelay: "270ms" }}
          >
            <Magnetic>
              <ButtonLink href="/products/power-bank-compact-10k">Meet the power bank</ButtonLink>
            </Magnetic>
            <Magnetic strength={0.25}>
              <ButtonLink href="/products" variant="ghost">
                Shop all gear →
              </ButtonLink>
            </Magnetic>
          </div>

          <div
            className="hero-rise mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 lg:justify-start"
            style={{ animationDelay: "350ms" }}
          >
            {PILLS.map((p) => (
              <span
                key={p}
                className="mono rounded-full border border-line bg-card/40 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.14em] text-ink-dim sm:text-[0.66rem]"
              >
                {p}
              </span>
            ))}
          </div>

          <div
            className="hero-rise mono mt-7 flex items-center gap-2.5 text-[0.66rem] uppercase tracking-[0.16em] text-ink-faint"
            style={{ animationDelay: "430ms" }}
          >
            <span className="text-ink-dim">{total} products</span>
            <span aria-hidden>·</span>
            <span>4 fields</span>
            <span aria-hidden>·</span>
            <span>source-linked</span>
          </div>
        </motion.div>

        {/* ── PRODUCT (large, floating, interactive) */}
        <motion.div
          style={reduce ? undefined : { y: prodY, scale: prodScale, opacity: prodOpacity }}
          className="relative flex items-center justify-center"
        >
          {/* key light — tracks the cursor, anchored behind the product */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden md:block"
            style={{
              width: 720,
              height: 720,
              marginLeft: -360,
              marginTop: -360,
              x: reduce ? 0 : glowX,
              y: reduce ? 0 : glowY,
              background:
                "radial-gradient(circle, rgba(91,147,184,0.22), rgba(47,88,116,0.09) 40%, transparent 68%)",
            }}
          />
          <motion.div
            style={
              reduce
                ? undefined
                : { rotateX: rotX, rotateY: rotY, x: driftX, y: driftY, transformPerspective: 1200 }
            }
            className="relative flex items-center justify-center"
          >
            <motion.img
              src="/products/power-bank-compact-10k.jpg"
              alt="Blackbox Supply compact 10,000mAh USB-C power bank — matte graphite aluminum with a cold-blue rim light"
              fetchPriority="high"
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="h-auto w-auto max-h-[40vh] max-w-full select-none rounded-2xl sm:max-h-[46vh] lg:max-h-[64vh]"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3.5 flex justify-center" aria-hidden>
        <div className="mono flex flex-col items-center gap-1 text-[0.56rem] uppercase tracking-[0.24em] text-ink-faint">
          <span>Scroll</span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 5, 0], opacity: [0.35, 1, 0.35] }}
            transition={reduce ? undefined : { duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </div>
      </div>
    </section>
  );
}
