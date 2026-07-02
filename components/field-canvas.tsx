"use client";

import { useEffect, useRef } from "react";

/**
 * THE FIELD — the site's living background instrument.
 *
 * A single, GPU-cheap 2D canvas fixed behind all content. It draws BlackBox's core idea as ambient
 * motion: a technical sensor grid that the visitor's cursor illuminates and parallaxes (depth), a
 * slow "signal sweep" that crosses the field, and — rarely — an "incident": a node flares amber and
 * emits an expanding ring. The recorder is always sensing; sometimes it catches something.
 *
 * Hard rules learned from the mobile crash:
 *  - ONE canvas, 2D context, plain arc fills (no per-node shadowBlur, no stacked composited images).
 *  - Device-pixel-ratio capped; far fewer nodes on small screens.
 *  - Paused when the tab is hidden; fully static (single frame) under prefers-reduced-motion.
 *  - Subtle by construction so text on top always stays readable — brightest only right at the cursor.
 */
export function FieldCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const mq = (q: string) => window.matchMedia(q).matches;
    const reduce = mq("(prefers-reduced-motion: reduce)");
    const finePointer = mq("(hover: hover) and (pointer: fine)");
    const mobile = !mq("(min-width: 768px)");

    // ── palette (cold steel-blue instrument light; warm amber alarm) ──────────
    const COLD = { r: 122, g: 173, b: 209 };
    const AMBER = { r: 240, g: 168, b: 92 };

    const SPACING = mobile ? 58 : 46; // px between nodes
    const DPR = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
    const PARALLAX = mobile ? 6 : 18; // px the deep layer shifts toward the cursor
    const INFLUENCE = mobile ? 170 : 235; // cursor light radius (px)

    type Node = { x: number; y: number; depth: number; phase: number; base: number };
    let nodes: Node[] = [];
    let w = 0;
    let h = 0;

    // deterministic per-position jitter (no Math.random — stable across resizes, no SSR mismatch)
    const hash = (gx: number, gy: number) => {
      const s = Math.sin(gx * 127.1 + gy * 311.7) * 43758.5453;
      return s - Math.floor(s); // 0..1
    };

    function build() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * DPR);
      canvas!.height = Math.round(h * DPR);
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);

      nodes = [];
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const jx = (hash(gx, gy) - 0.5) * SPACING * 0.32;
          const jy = (hash(gy, gx) - 0.5) * SPACING * 0.32;
          const depth = 0.35 + hash(gx * 2.3, gy * 1.7) * 0.65; // 0.35..1
          nodes.push({
            x: gx * SPACING + jx,
            y: gy * SPACING + jy,
            depth,
            phase: hash(gx * 5.1, gy * 9.3) * Math.PI * 2,
            base: 0.06 + hash(gy * 3.7, gx * 4.9) * 0.1, // 0.06..0.16 resting alpha
          });
        }
      }
    }

    // ── pointer / focus point ────────────────────────────────────────────────
    // Desktop: follows the cursor. Touch / no-pointer: a slow autonomous drift so it still breathes.
    const target = { x: w / 2, y: h / 2 };
    const focus = { x: w / 2, y: h / 2 };
    let pointerInside = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      pointerInside = true;
    };
    const onLeave = () => {
      pointerInside = false;
    };
    if (finePointer && !reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerout", onLeave, { passive: true });
    }

    // ── periodic events ────────────────────────────────────────────────────
    let lastSweep = -3000; // ms — start a sweep a few seconds in
    let sweep: { x: number; t: number } | null = null;
    let lastIncident = 0;
    let incident: { x: number; y: number; t: number } | null = null;
    let scrollMix = 0; // 0 (top, cold) → 1 (deep, faintly warmer)

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollMix = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── static render (reduced motion): one faint frame, no loop ─────────────
    function renderStatic() {
      build();
      ctx!.clearRect(0, 0, w, h);
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 0.7 + n.depth * 0.7, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${COLD.r},${COLD.g},${COLD.b},${(n.base * n.depth).toFixed(3)})`;
        ctx!.fill();
      }
    }

    if (reduce) {
      renderStatic();
      const onResize = () => renderStatic();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    // ── animation loop ───────────────────────────────────────────────────────
    let raf = 0;
    let running = true;
    let startTs = 0;
    let prevTs = 0;

    function frame(ts: number) {
      if (!running) return;
      if (!startTs) {
        startTs = ts;
        prevTs = ts;
      }
      const t = ts - startTs; // ms since start
      const dt = Math.min(64, ts - prevTs); // clamp (tab refocus)
      prevTs = ts;

      // autonomous focus drift when there's no live cursor
      if (!finePointer || !pointerInside) {
        target.x = w * (0.5 + 0.32 * Math.sin(t * 0.00017));
        target.y = h * (0.42 + 0.26 * Math.cos(t * 0.00013));
      }
      focus.x += (target.x - focus.x) * Math.min(1, dt * 0.006);
      focus.y += (target.y - focus.y) * Math.min(1, dt * 0.006);

      // schedule a signal sweep
      if (!sweep && t - lastSweep > 7600) {
        sweep = { x: -80, t };
        lastSweep = t;
      }
      if (sweep) {
        const sp = (t - sweep.t) / 1700; // 0..1 over ~1.7s
        sweep.x = -80 + sp * (w + 160);
        if (sp >= 1) sweep = null;
      }

      // schedule an incident pulse
      if (!incident && t - lastIncident > 12500 && nodes.length) {
        const n = nodes[Math.floor(hash(t, lastIncident) * nodes.length) % nodes.length];
        incident = { x: n.x, y: n.y, t };
        lastIncident = t;
      }
      const incidentAge = incident ? (t - incident.t) / 1500 : 1; // 0..1
      if (incident && incidentAge >= 1) incident = null;

      // parallax shift of the whole field toward the focus (depth illusion)
      const nx = (focus.x - w / 2) / (w / 2);
      const ny = (focus.y - h / 2) / (h / 2);

      // scroll-tinted base colour (cold → faintly warmer with depth)
      const cr = COLD.r + (AMBER.r - COLD.r) * scrollMix * 0.18;
      const cg = COLD.g + (AMBER.g - COLD.g) * scrollMix * 0.18;
      const cb = COLD.b + (AMBER.b - COLD.b) * scrollMix * 0.18;

      ctx!.clearRect(0, 0, w, h);

      // soft cursor light first (additive, very low alpha so text stays readable)
      ctx!.globalCompositeOperation = "lighter";
      const lr = INFLUENCE * 1.5;
      const grad = ctx!.createRadialGradient(focus.x, focus.y, 0, focus.x, focus.y, lr);
      grad.addColorStop(0, `rgba(${COLD.r},${COLD.g},${COLD.b},0.1)`);
      grad.addColorStop(0.5, `rgba(${COLD.r},${COLD.g},${COLD.b},0.035)`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = grad;
      ctx!.fillRect(focus.x - lr, focus.y - lr, lr * 2, lr * 2);

      // nodes
      const lit: { x: number; y: number; infl: number }[] = [];
      for (const n of nodes) {
        // slow positional drift — the field floats/shimmers, never dead-still
        const driftX = Math.sin(t * 0.00022 + n.phase) * n.depth * 2.6;
        const driftY = Math.cos(t * 0.00019 + n.phase * 1.3) * n.depth * 2.6;
        const px = n.x + nx * PARALLAX * n.depth + driftX;
        const py = n.y + ny * PARALLAX * n.depth + driftY;

        const dx = px - focus.x;
        const dy = py - focus.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        let infl = d < INFLUENCE ? 1 - d / INFLUENCE : 0;
        infl *= infl; // ease

        // gentle breathing
        const breath = 0.82 + 0.18 * Math.sin(t * 0.0007 + n.phase);

        // signal sweep boost
        let sweepBoost = 0;
        if (sweep) {
          const sd = Math.abs(px - sweep.x);
          if (sd < 70) sweepBoost = (1 - sd / 70) * 0.5;
        }

        const alpha = Math.min(0.9, n.base * n.depth * breath + infl * 0.55 + sweepBoost);
        const size = (0.85 + n.depth * 0.85) + infl * 2.1 + sweepBoost * 1.3;

        // colour: cold base → near-white at the cursor; amber if close to an active incident
        let R = cr, G = cg, B = cb;
        const mixWhite = Math.min(1, infl * 1.1 + sweepBoost);
        R += (235 - R) * mixWhite;
        G += (243 - G) * mixWhite;
        B += (255 - B) * mixWhite;
        if (incident) {
          const idx = px - incident.x;
          const idy = py - incident.y;
          const idd = Math.sqrt(idx * idx + idy * idy);
          const ring = incidentAge * 170;
          const near = Math.abs(idd - ring) < 26 ? 1 - Math.abs(idd - ring) / 26 : 0;
          const amberMix = near * (1 - incidentAge) * 0.9;
          if (amberMix > 0) {
            R += (AMBER.r - R) * amberMix;
            G += (AMBER.g - G) * amberMix;
            B += (AMBER.b - B) * amberMix;
          }
        }

        ctx!.beginPath();
        ctx!.arc(px, py, size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${R | 0},${G | 0},${B | 0},${alpha.toFixed(3)})`;
        ctx!.fill();

        if (infl > 0.14 && !mobile) lit.push({ x: px, y: py, infl });
      }

      // constellation lines — only among nodes already lit by the cursor (few, cheap, desktop only)
      if (lit.length > 1) {
        ctx!.lineWidth = 0.65;
        for (let i = 0; i < lit.length; i++) {
          for (let j = i + 1; j < lit.length; j++) {
            const a = lit[i];
            const b = lit[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dd = dx * dx + dy * dy;
            if (dd < 94 * 94) {
              const la = Math.min(a.infl, b.infl) * (1 - Math.sqrt(dd) / 94) * 0.62;
              ctx!.strokeStyle = `rgba(${COLD.r},${COLD.g},${COLD.b},${la.toFixed(3)})`;
              ctx!.beginPath();
              ctx!.moveTo(a.x, a.y);
              ctx!.lineTo(b.x, b.y);
              ctx!.stroke();
            }
          }
        }
      }

      // incident ring
      if (incident) {
        const ring = incidentAge * 170;
        ctx!.strokeStyle = `rgba(${AMBER.r},${AMBER.g},${AMBER.b},${((1 - incidentAge) * 0.5).toFixed(3)})`;
        ctx!.lineWidth = 1.1;
        ctx!.beginPath();
        ctx!.arc(incident.x, incident.y, ring, 0, Math.PI * 2);
        ctx!.stroke();
      }

      ctx!.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    }

    build();
    onScroll();
    raf = requestAnimationFrame(frame);

    // pause when hidden (battery + heat)
    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        startTs = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    // debounced resize rebuild
    let resizeT: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeT) clearTimeout(resizeT);
      resizeT = setTimeout(build, 180);
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      if (resizeT) clearTimeout(resizeT);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
