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
      className="sticky top-16 z-30 -mx-4 mt-8 border-y border-line bg-base/85 px-4 py-2.5 backdrop-blur-md sm:-mx-6 sm:px-6"
    >
      <div className="flex gap-2 overflow-x-auto">
        <span className="mono hidden shrink-0 items-center pr-1 text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint sm:inline-flex">
          Jump to
        </span>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="shrink-0 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-[0.8rem] font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent-strong"
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
