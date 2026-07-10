import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BlackBox Supplies — genuinely useful gear, researched.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Warm-dark editorial identity — matches the on-site wordmark + box mark, not the old spaced caps.
const GROUND = "#0b0806";
const INK = "#efe7d6";
const DIM = "#b2a78e";
const AMBER = "#d99a45";
const AMBER_DIM = "#8a7c60";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: GROUND,
          fontFamily: "sans-serif",
        }}
      >
        {/* warm amber glow, upper-center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 48% at 50% 30%, rgba(217,154,69,0.20) 0%, rgba(217,154,69,0.04) 42%, rgba(11,8,6,0) 70%)",
          }}
        />
        {/* fine top + bottom hairlines for the editorial frame */}
        <div style={{ position: "absolute", top: 46, left: 64, right: 64, height: 1, background: "rgba(217,154,69,0.28)" }} />
        <div style={{ position: "absolute", bottom: 46, left: 64, right: 64, height: 1, background: "rgba(236,228,210,0.10)" }} />

        {/* top kicker */}
        <div
          style={{
            position: "absolute",
            top: 66,
            fontSize: 21,
            letterSpacing: 8,
            color: AMBER_DIM,
            display: "flex",
          }}
        >
          UTILITY &amp; READINESS GEAR
        </div>

        {/* lockup: box mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          {/* the "supply box" mark — a rounded box holding a warm amber slot */}
          <div
            style={{
              width: 92,
              height: 70,
              borderRadius: 20,
              border: `6px solid ${INK}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 38, height: 11, borderRadius: 6, background: AMBER }} />
          </div>
          <div style={{ display: "flex", alignItems: "baseline", fontSize: 92, letterSpacing: -2 }}>
            <span style={{ fontWeight: 800, color: INK }}>BlackBox</span>
            <span style={{ fontWeight: 400, color: DIM }}>Supplies</span>
          </div>
        </div>

        {/* tagline */}
        <div style={{ marginTop: 34, fontSize: 31, color: "#cec6b1", display: "flex" }}>
          Genuinely useful gear — researched, ranked, honest about the catch.
        </div>

        {/* category chips */}
        <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 18, fontSize: 19, letterSpacing: 3, color: AMBER_DIM }}>
          <span style={{ display: "flex" }}>COOLING</span>
          <span style={{ display: "flex", color: "#584d3a" }}>·</span>
          <span style={{ display: "flex" }}>CAR &amp; ROADSIDE</span>
          <span style={{ display: "flex", color: "#584d3a" }}>·</span>
          <span style={{ display: "flex" }}>BACKUP POWER</span>
          <span style={{ display: "flex", color: "#584d3a" }}>·</span>
          <span style={{ display: "flex" }}>TOOLS</span>
        </div>

        {/* footer domain */}
        <div style={{ position: "absolute", bottom: 62, fontSize: 22, letterSpacing: 1, color: AMBER, display: "flex" }}>
          blackboxsupplies.com
        </div>
      </div>
    ),
    { ...size }
  );
}
