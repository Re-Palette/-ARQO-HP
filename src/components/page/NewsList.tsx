"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { EASE } from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/ArrowLink";
import type { NewsItem } from "@/lib/content";

const fmt = (iso: string) => iso.replaceAll("-", ".");

/** Filterable news index. */
export function NewsList({ items }: { items: NewsItem[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((n) => n.category)))], [items]);
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? items : items.filter((n) => n.category === filter);

  return (
    <>
      <div role="tablist" aria-label="カテゴリー" className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = c === filter;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(c)}
              className={`relative rounded-full border px-5 py-2.5 text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-500 ${
                active ? "border-ink text-white" : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
              }`}
            >
              {active ? (
                <motion.span layoutId="news-filter" transition={{ duration: 0.6, ease: EASE }} className="absolute inset-0 -z-10 rounded-full bg-ink" />
              ) : null}
              <span className="relative">{c}</span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((n) => (
            <motion.li
              key={n.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <article className="glass group relative flex h-full flex-col overflow-hidden rounded-[10px] p-3 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[6px]">
                  <Image
                    src={n.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <p className="flex items-center gap-4 text-[0.625rem] uppercase tracking-[0.22em] text-ink/55">
                    <time dateTime={n.date}>{fmt(n.date)}</time>
                    <span className="h-px w-4 bg-ink/25" />
                    {n.category}
                  </p>
                  <h2 className="heading-ja mt-4 text-base leading-[1.8] tracking-[0.06em] text-ink">
                    <Link href={`/news/${n.slug}`} className="after:absolute after:inset-0">
                      {n.title}
                    </Link>
                  </h2>
                  <p className="mt-3 line-clamp-3 text-xs leading-[1.9] text-ink-2/80">{n.excerpt}</p>
                  <span className="mt-auto flex justify-end pt-6 text-ink/60 transition-colors duration-500 group-hover:text-ink">
                    <Arrow className="w-6 transition-transform duration-700 group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
