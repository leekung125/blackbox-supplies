import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BlackBox Supply — Gear for bad timing.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "radial-gradient(80% 60% at 50% 35%, #1a1712 0%, #0a0908 70%)",
          color: "#f4f2ec",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "10px 28px",
            border: "1.5px solid rgba(214,178,106,0.45)",
            borderRadius: 6,
          }}
        >
          <div style={{ fontSize: 54, fontWeight: 700, letterSpacing: 10 }}>BLACKBOX</div>
          <div style={{ fontSize: 54, fontWeight: 400, letterSpacing: 10, color: "#d6b26a" }}>SUPPLY</div>
        </div>
        <div style={{ marginTop: 34, fontSize: 30, letterSpacing: 5, color: "#c9c2b4" }}>
          GEAR FOR BAD TIMING.
        </div>
        <div style={{ marginTop: 20, fontSize: 20, letterSpacing: 2, color: "#8d8776" }}>
          Researched car & roadside gear — honest buying guides
        </div>
      </div>
    ),
    { ...size }
  );
}
