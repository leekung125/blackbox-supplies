/**
 * Sticky in-page jump-nav — anchor chips that scroll to the section below (smooth-scroll is
 * global). Turns a long vertical page into a navigable shop so deep sections (Dorm Cooling,
 * Home & Organization) aren't scroll-only. Server-rendered; the ids must match each section's id.
 */
export function SectionNav({ sections }: { sections: { id: string; label: string }[] }) {
  if (sections.length < 2) return null;
  return (
    <nav
      aria-label="Jump to section"
      className="sticky top-16 z-30 -mx-4 mt-8 border-y border-line-strong bg-base/85 px-4 py-2.5 backdrop-blur-md sm:-mx-6 sm:px-6"
    >
      {/* amber seam — the lit hairline that reads as one system with the section rules */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="mono hidden shrink-0 items-center gap-1.5 pr-1 text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint sm:inline-flex">
          <span aria-hidden className="h-3 w-px bg-accent/70 shadow-[0_0_6px_1px_rgba(217,154,69,0.5)]" />
          Jump to
        </span>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group relative inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-[0.8rem] font-medium text-ink-2 transition-all duration-300 hover:-translate-y-px hover:border-accent/70 hover:text-accent-strong"
            style={{ background: "linear-gradient(180deg, rgba(235,227,209,0.05), rgba(0,0,0,0.16))" }}
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-accent/50 shadow-[0_0_7px_1px_rgba(217,154,69,0.4)] transition-all duration-300 group-hover:bg-accent group-hover:shadow-[0_0_12px_2px_rgba(217,154,69,0.75)]"
            />
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
