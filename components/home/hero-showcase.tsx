"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useMotionValue } from "motion/react";

/**
 * The cinematic hero stage — "one product, lit by a single amber lamp, at night."
 * Six stacked z-planes, each moving at a different rate on cursor + scroll:
 *   godray shaft → amber bloom → inverse-scaling contact shadow → product cutout
 *   (drop-glow) → mirror reflection. All motion GPU-cheap + reduced-motion-guarded.
 */
export function HeroShowcase({
  productSrc,
  productAlt,
  productLabel,
  productHref,
}: {
  productSrc: string;
  productAlt: string;
  productLabel: string;
  productHref: string;
}) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end start"] });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.2]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 });
  const prodX = useTransform(sx, [-0.5, 0.5], [reduce ? 0 : -12, reduce ? 0 : 12]);
  const prodY = useTransform(sy, [-0.5, 0.5], [reduce ? 0 : -10, reduce ? 0 : 10]);
  const prodRotY = useTransform(sx, [-0.5, 0.5], [reduce ? 0 : 8, reduce ? 0 : -8]);
  const prodRotX = useTransform(sy, [-0.5, 0.5], [reduce ? 0 : -5, reduce ? 0 : 5]);
  const shaftX = useTransform(sx, [-0.5, 0.5], [reduce ? 0 : -6, reduce ? 0 : 6]);
  const bloomX = useTransform(sx, [-0.5, 0.5], [reduce ? 0 : -22, reduce ? 0 : 22]);
  const bloomY = useTransform(sy, [-0.5, 0.5], [reduce ? 0 : -16, reduce ? 0 : 16]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ y: stageY, scale: stageScale, opacity: stageOpacity }}
      className="relative flex min-h-[15rem] items-center justify-center [perspective:1200px] lg:min-h-[34rem]"
    >
      {/* 1 · godray light-shaft (breathing) */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[135%] w-[40%] -translate-x-1/2 -translate-y-1/2 [mix-blend-mode:screen]">
        <motion.div
          style={{ x: shaftX }}
          animate={reduce ? undefined : { opacity: [0.6, 0.85, 0.6] }}
          transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full [filter:blur(30px)]"
        >
          <div className="h-full w-full" style={{ background: "linear-gradient(180deg, transparent, rgba(237,186,102,0.18) 30%, rgba(217,154,69,0.11) 60%, transparent)" }} />
        </motion.div>
      </div>

      {/* 2 · amber bloom behind the product */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2">
        <motion.div style={{ x: bloomX, y: bloomY }} className="glow-amber inset-0 h-full w-full" />
      </div>

      {/* the product + its shadow, floating */}
      <div className="relative">
        {/* 3 · contact shadow — scales INVERSELY with the float (levitation cue) */}
        <motion.div
          aria-hidden
          animate={reduce ? undefined : { scale: [1, 0.9, 1], opacity: [0.55, 0.4, 0.55] }}
          transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -bottom-2 left-1/2 h-10 w-[78%] -translate-x-1/2 [filter:blur(24px)]"
          style={{ background: "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(0,0,0,0.6), transparent 70%)", transform: "translateX(-50%) scaleY(0.9)" }}
        />

        {/* 4 · the hero product cutout — floats + tilts to cursor, lit by the lamp */}
        <Link href={productHref} aria-label={productLabel} className="relative block">
          <motion.div
            style={{ x: prodX, y: prodY, rotateX: prodRotX, rotateY: prodRotY, transformStyle: "preserve-3d" }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -14, 0] }}
              transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={productSrc}
                alt={productAlt}
                width={640}
                height={640}
                priority
                sizes="(max-width: 1024px) 74vw, 460px"
                className="product-drop-glow h-auto w-[15rem] select-none sm:w-[19rem] lg:w-[27rem]"
              />
            </motion.div>
          </motion.div>
        </Link>

        {/* 5 · faint mirror reflection (desktop only — reads as a glitch at mobile scale) */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-full -z-0 hidden h-28 scale-y-[-1] opacity-[0.1] [mask-image:linear-gradient(to_bottom,#000,transparent_65%)] lg:block">
          <Image src={productSrc} alt="" width={640} height={640} className="mx-auto h-auto w-[27rem]" />
        </div>
      </div>

      {/* floating product tag */}
      <div className="pointer-events-none absolute bottom-1 right-0 hidden lg:block">
        <span className="pill-amber backdrop-blur">{productLabel}</span>
      </div>
    </motion.div>
  );
}
