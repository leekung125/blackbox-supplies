"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { searchItems, bestSellers, type SearchItem, type SearchKind } from "@/lib/search-index";

const POPULAR = ["Portable AC", "Dash cam", "Cooling sheets", "Jump starter", "Power station", "Tire inflator"];

const GROUP_ORDER: { kind: SearchKind; label: string }[] = [
  { kind: "guide", label: "Guides & comparisons" },
  { kind: "product", label: "Products" },
  { kind: "category", label: "Shop by category" },
];

function Thumb({ it }: { it: SearchItem }) {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dark-line bg-gradient-to-b from-[#221a11] to-[#100c07]">
      {it.image ? (
        <Image src={it.image} alt="" fill sizes="40px" className="object-cover" />
      ) : it.kind === "category" ? (
        <svg className="h-4 w-4 text-accent/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden><path d="M4 6 h7 v7 h-7 z M13 6 h7 v7 h-7 z M4 15 h7 v3 h-7 z M13 15 h7 v3 h-7 z" /></svg>
      ) : (
        <svg className="h-4 w-4 text-on-dark-dim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden><path d="M4 8 l8 -4 l8 4 v8 l-8 4 l-8 -4 z M4 8 l8 4 M20 8 l-8 4 M12 12 v8" /></svg>
      )}
    </span>
  );
}

/**
 * Command-palette site search. Warm glass, amber focus glow, grouped results with headers,
 * keyboard-navigable active row, popular-search empty state, and a global "/" focus shortcut.
 * Client-side over the local index — instant, no backend, never a dead end.
 */
export function SiteSearch({
  className = "",
  onNavigate,
  placeholder = "Search gear, guides…",
}: {
  className?: string;
  onNavigate?: () => void;
  placeholder?: string;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  const results = useMemo(() => searchItems(q, 10), [q]);
  const typed = q.trim().length > 0;

  // ordered groups → flat nav list (display order) so ↑/↓ steps through what's shown
  const { groups, flat } = useMemo(() => {
    const source = results.length ? results : typed ? bestSellers(4) : [];
    const g = GROUP_ORDER.map((grp) => ({
      ...grp,
      items: source.filter((it) => it.kind === grp.kind),
    })).filter((grp) => grp.items.length);
    return { groups: g, flat: g.flatMap((grp) => grp.items) };
  }, [results, typed]);

  const showPanel = open && typed;

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // global "/" (and ⌘/Ctrl+K) to focus search from anywhere
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = useCallback(
    (it: SearchItem) => {
      setOpen(false);
      setQ("");
      inputRef.current?.blur();
      onNavigate?.();
      router.push(it.href);
    },
    [onNavigate, router],
  );

  function onKeyDown(e: React.KeyboardEvent) {
    if (!showPanel) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flat[active]) go(flat[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  let idx = -1; // running index across groups for active-row matching

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      {/* input — glass with amber focus glow */}
      <div
        className="flex items-center gap-2.5 rounded-full border px-3.5 py-2 transition-all duration-300"
        style={{
          background: focused ? "rgba(217,154,69,0.06)" : "rgba(255,255,255,0.04)",
          borderColor: focused ? "rgba(217,154,69,0.55)" : "rgba(64,52,31,0.9)",
          boxShadow: focused ? "0 0 0 3px rgba(217,154,69,0.12), 0 8px 30px -12px rgba(217,154,69,0.35)" : "none",
        }}
      >
        <svg className={`h-4 w-4 shrink-0 transition-colors ${focused ? "text-accent-bright" : "text-on-dark-dim"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21 L16 16" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => { setOpen(true); setFocused(true); }}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Search the site"
          className="w-full min-w-0 bg-transparent text-sm text-on-dark placeholder:text-on-dark-dim focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
        />
        {!typed ? (
          <kbd className="mono hidden shrink-0 select-none rounded-md border border-dark-line px-1.5 py-0.5 text-[0.62rem] font-medium text-on-dark-dim sm:inline-block">
            /
          </kbd>
        ) : null}
      </div>

      <AnimatePresence>
        {showPanel ? (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: reduce ? 0.12 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 top-[calc(100%+0.6rem)] z-50 w-[min(30rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-dark-line bg-[#141009]/95 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.92)] backdrop-blur-xl"
          >
            {/* soft amber aura at the top edge */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(217,154,69,0.14),transparent_70%)]" aria-hidden />

            <div className="relative max-h-[65vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="px-2.5 pb-1 pt-2">
                  <p className="text-[0.8rem] text-on-dark-dim">
                    No matches for <span className="font-semibold text-on-dark">&ldquo;{q.trim()}&rdquo;</span> — try a broader term, or start here:
                  </p>
                </div>
              ) : null}

              {groups.map((grp) => (
                <div key={grp.kind} className="mb-1 last:mb-0">
                  <div className="mono px-2.5 pb-1 pt-2 text-[0.6rem] uppercase tracking-[0.14em] text-accent/80">
                    {grp.label}
                  </div>
                  {grp.items.map((it) => {
                    idx += 1;
                    const on = idx === active;
                    const rowIndex = idx;
                    return (
                      <button
                        key={it.href}
                        type="button"
                        onMouseEnter={() => setActive(rowIndex)}
                        onClick={() => go(it)}
                        className="relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors"
                        style={{ background: on ? "rgba(217,154,69,0.13)" : "transparent" }}
                      >
                        {on ? (
                          <motion.span
                            layoutId="search-active"
                            className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-accent-bright"
                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            aria-hidden
                          />
                        ) : null}
                        <Thumb it={it} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[0.88rem] font-medium text-on-dark">{it.title}</span>
                          <span className="block truncate text-[0.72rem] text-on-dark-dim">{it.subtitle}</span>
                        </span>
                        {on ? (
                          <span className="mono hidden shrink-0 items-center gap-1 text-[0.62rem] text-accent-bright sm:inline-flex">
                            open <span className="rounded border border-accent/30 px-1 py-0.5">↵</span>
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* keyboard-hint footer — the command-palette signature */}
            <div className="flex items-center justify-between border-t border-dark-line bg-black/20 px-3 py-2 text-[0.62rem] text-on-dark-dim">
              <span className="flex items-center gap-3">
                <span className="mono flex items-center gap-1"><Key>↑</Key><Key>↓</Key> navigate</span>
                <span className="mono flex items-center gap-1"><Key>↵</Key> open</span>
                <span className="mono hidden items-center gap-1 sm:flex"><Key>esc</Key> close</span>
              </span>
              <span className="mono hidden text-on-dark-dim sm:inline">{flat.length} result{flat.length === 1 ? "" : "s"}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* popular-search chips when focused with an empty box (desktop) */}
      <AnimatePresence>
        {open && !typed && focused ? (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-[calc(100%+0.6rem)] z-50 hidden w-[min(30rem,calc(100vw-2rem))] rounded-2xl border border-dark-line bg-[#141009]/95 p-3 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.92)] backdrop-blur-xl sm:block"
          >
            <div className="mono mb-2 text-[0.6rem] uppercase tracking-[0.14em] text-accent/80">Popular searches</div>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR.map((p) => (
                <button
                  key={p}
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); setQ(p); }}
                  className="rounded-full border border-dark-line bg-white/[0.03] px-3 py-1.5 text-[0.78rem] text-on-dark-dim transition-colors hover:border-accent/50 hover:text-on-dark"
                >
                  {p}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-dark-line bg-white/[0.04] px-1 py-0.5 text-[0.6rem] leading-none text-on-dark">{children}</kbd>;
}
