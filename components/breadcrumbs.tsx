"use client";

import Link from "next/link";
import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface Crumb {
  label: string;
  /** Omit on the final (current) crumb. */
  href?: string;
}

/**
 * Premium editorial breadcrumb trail — Home / Section / Current.
 * Mono, tracked labels; warm amber link hover; graceful wrap on mobile.
 * The last item is treated as the current page (no href, aria-current).
 */
export function Breadcrumbs({ trail, className = "" }: { trail: Crumb[]; className?: string }) {
  const reduce = useReducedMotion();
  if (!trail.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          const content = (
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {crumb.label}
            </motion.span>
          );

          return (
            <Fragment key={`${crumb.label}-${i}`}>
              <li className="min-w-0">
                {isLast || !crumb.href ? (
                  <span
                    aria-current="page"
                    className="max-w-[60vw] truncate text-ink font-medium sm:max-w-none"
                  >
                    {content}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="group relative inline-flex text-ink-dim transition-colors duration-200 hover:text-accent-bright"
                  >
                    {content}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"
                    />
                  </Link>
                )}
              </li>
              {!isLast ? (
                <li aria-hidden className="select-none text-ink-faint/70">
                  /
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
