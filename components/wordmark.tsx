/** The Blackbox Supply mark — a quiet "black box" with a cold-blue core. */
export function BrandMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
    >
      <rect
        x="3.5"
        y="3.5"
        width="21"
        height="21"
        rx="4"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.3"
      />
      <rect
        x="9.5"
        y="9.5"
        width="9"
        height="9"
        rx="1.5"
        fill="#4d8bb0"
        fillOpacity="0.9"
      />
      <path
        d="M3.5 8 V6 A2.5 2.5 0 0 1 6 3.5 H8"
        stroke="#74aacb"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M24.5 20 V22 A2.5 2.5 0 0 1 22 24.5 H20"
        stroke="#74aacb"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Full lockup: mark + wordmark. */
export function Wordmark({
  className = "",
  markClassName = "h-7 w-7 text-ink",
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark className={markClassName} />
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-semibold uppercase tracking-[0.2em] text-ink">
          Blackbox
        </span>
        <span className="mono text-[0.6rem] uppercase tracking-[0.42em] text-ink-faint">
          Supply
        </span>
      </span>
    </span>
  );
}
