"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Wordmark } from "@/components/wordmark";

const NAV = [
  { href: "/useful", label: "Useful" },
  { href: "/heat", label: "Cooling" },
  { href: "/gear", label: "Car" },
  { href: "/guides", label: "Guides" },
  { href: "/finds", label: "Finds" },
];

/** Dark-accent header — the brand frame above the warm editorial content. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 bg-dark text-on-dark">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="BlackBox Supply — home" className="shrink-0">
          <Wordmark light markClassName="h-6 w-6 sm:h-7 sm:w-7" size="text-[0.95rem] sm:text-[1.05rem]" />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-1 text-sm font-medium transition-colors ${
                isActive(item.href) ? "text-on-dark" : "text-on-dark-dim hover:text-on-dark"
              }`}
            >
              {item.label}
              {isActive(item.href) ? (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-accent-bright" aria-hidden />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/newsletter"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-strong md:inline-flex"
          >
            Newsletter
          </Link>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-dark-line text-on-dark md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              {open ? <path d="M6 6 L18 18 M18 6 L6 18" /> : <path d="M4 7 H20 M4 12 H20 M4 17 H20" />}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-dark-2 md:hidden"
          >
            <div className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-dark-line py-3.5 text-[0.95rem] font-medium ${
                    isActive(item.href) ? "text-accent-bright" : "text-on-dark"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/newsletter"
                onClick={() => setOpen(false)}
                className="mt-3 mb-2 block rounded-full bg-accent py-3 text-center text-sm font-semibold text-on-accent"
              >
                Join the newsletter
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
