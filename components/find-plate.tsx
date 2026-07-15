import type { RareFind } from "@/lib/rare-finds";

/** Deterministic small hash so each plate gets a stable, unique-feeling composition
 *  without Math.random (which would change between server/client renders). */
function seed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Filmic grain (premium magazine texture) as an inline SVG noise field.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * The Rare Finds visual: a designed warm-dark editorial "curiosity plate" — NOT a
 * product photo. Reasoned from BRAND_INTENT: a photo spoils the "wait, what is that?",
 * and we don't use Amazon imagery or fake photoreal shots of real branded products.
 * The curiosity is the hook; the plate protects it, stays honest, and still reads as
 * a crafted object (light-from-the-letter, grain, editorial frame).
 */
export function FindPlate({
  find,
  className = "",
  big = false,
}: {
  find: Pick<RareFind, "id" | "name" | "category">;
  className?: string;
  big?: boolean;
}) {
  const h = seed(find.id);
  const gx = 20 + (h % 60); // glow x: 20–80%
  const gy = 16 + ((h >> 7) % 40); // glow y: 16–56% (light tends to come from above)
  const rot = ((h >> 13) % 13) - 6; // initial rotation: -6..6deg

  const initial = find.name.replace(/^(the|a|an)\s+/i, "").charAt(0).toUpperCase();

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      {/* warm espresso base */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(155deg,#221a0f 0%,#160f08 55%,#0a0603 100%)" }} />

      {/* soft amber glow + a brighter core, seeded — reads as a single light source */}
      <div
        className="absolute h-[135%] w-[135%]"
        style={{
          left: `${gx}%`,
          top: `${gy}%`,
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(closest-side, rgba(224,162,78,0.30), rgba(217,154,69,0.08) 44%, transparent 70%)",
        }}
      />
      <div
        className="absolute h-16 w-16"
        style={{
          left: `${gx}%`,
          top: `${gy}%`,
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(closest-side, rgba(255,221,160,0.34), transparent 72%)",
          filter: "blur(6px)",
        }}
      />

      {/* ghosted serif initial, lit from the glow */}
      <span
        className={`pointer-events-none absolute left-1/2 top-1/2 font-display font-semibold leading-none ${big ? "text-[13rem] sm:text-[19rem]" : "text-[8rem] sm:text-[9.5rem]"}`}
        style={{
          transform: `translate(-50%,-50%) rotate(${rot}deg)`,
          color: "rgba(244,214,164,0.12)",
          textShadow: "0 2px 50px rgba(224,162,78,0.28)",
        }}
      >
        {initial}
      </span>

      {/* filmic grain */}
      <div className="absolute inset-0" style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px", opacity: 0.05, mixBlendMode: "soft-light" }} />

      {/* depth vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(130% 120% at 50% -8%, transparent 50%, rgba(0,0,0,0.55))" }} />

      {/* editorial hairline frame */}
      <div className={`absolute rounded-[6px] ${big ? "inset-4" : "inset-3"}`} style={{ border: "1px solid rgba(248,236,214,0.06)" }} />

      {/* labels */}
      <div className={`absolute inset-0 flex flex-col justify-between ${big ? "p-6" : "p-4"}`}>
        <span className="font-mono uppercase tracking-[0.24em]" style={{ fontSize: big ? "0.72rem" : "0.62rem", color: "rgba(214,182,126,0.78)" }}>
          {find.category}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-px w-7" style={{ background: "rgba(224,162,78,0.7)" }} />
          <span className="font-mono uppercase tracking-[0.24em]" style={{ fontSize: big ? "0.66rem" : "0.6rem", color: "rgba(214,182,126,0.78)" }}>
            BlackBox
          </span>
        </span>
      </div>
    </div>
  );
}
