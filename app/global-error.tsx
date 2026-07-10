"use client";

/**
 * Global (root-layout) error boundary. Renders only when the root layout itself fails,
 * which means the app shell and global CSS are unavailable — so this is fully self-contained
 * with inline warm-dark styling. Kept deliberately minimal.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "radial-gradient(120% 90% at 50% 8%, #241a10 0%, #15110b 60%, #0a0704 100%)",
          color: "#ece4d2",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <div style={{ maxWidth: "34rem", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "1.05rem",
              letterSpacing: "-0.01em",
              marginBottom: "2rem",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden>
              <rect x="6.5" y="8" width="27" height="24" rx="6.5" stroke="#ece4d2" strokeWidth="2.6" />
              <rect x="13.5" y="18.4" width="13" height="3.2" rx="1.6" fill="#d99a45" />
            </svg>
            <span>
              <strong style={{ fontWeight: 700 }}>BlackBox</strong>
              <span style={{ color: "#b2a78e", fontWeight: 400 }}>Supplies</span>
            </span>
          </div>

          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontSize: "0.72rem",
              color: "#d99a45",
              marginBottom: "0.9rem",
            }}
          >
            Something broke
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "2rem",
              lineHeight: 1.1,
              fontWeight: 600,
              color: "#ece4d2",
            }}
          >
            The site hit an unexpected error.
          </h1>
          <p style={{ marginTop: "1rem", fontSize: "1.05rem", lineHeight: 1.6, color: "#b2a78e" }}>
            This one&rsquo;s on us. Reload to try again — if it persists, come back in a moment.
          </p>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                border: "none",
                cursor: "pointer",
                borderRadius: "10px",
                padding: "13px 26px",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#15110b",
                background: "linear-gradient(135deg, #edba66, #d99a45)",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                textDecoration: "none",
                borderRadius: "10px",
                padding: "12px 25px",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#ece4d2",
                border: "1px solid rgba(235,227,209,0.18)",
              }}
            >
              Back to home
            </a>
          </div>

          {error?.digest ? (
            <p
              style={{
                marginTop: "2rem",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                fontSize: "0.66rem",
                color: "#8a7f6a",
              }}
            >
              Reference · {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
