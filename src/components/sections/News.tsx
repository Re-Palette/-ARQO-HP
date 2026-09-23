"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { news } from "@/lib/content";

const fmt = (iso: string) => iso.replaceAll("-", ".");

export function News() {
  return (
    <section
      id="news"
      aria-labelledby="news-heading"
      className="relative isolate overflow-hidden bg-mist py-28 md:py-40"
    >
      {/* Colour field behind the glass cards */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-20 top-10 size-[560px] rounded-full bg-sky/55 blur-[120px] [animation:drift_22s_ease-in-out_infinite]" />
        <div className="absolute right-0 top-1/3 size-[620px] rounded-full bg-lavender/60 blur-[130px] [animation:drift_26s_ease-in-out_infinite_reverse]" />
        <div className="absolute bottom-0 left-1/3 size-[520px] rounded-full bg-sunset/50 blur-[130px]" />
      </div>

      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <Reveal>
            <p className="eyebrow text-ink/60">News</p>
          </Reveal>
          <TextReveal
            id="news-heading"
            lines={["最新情報を", "お届けします。"]}
            className="heading-ja mt-8 text-[clamp(1.6rem,2.4vw,2.25rem)] text-ink"
          />
          <Reveal delay={0.25} className="mt-10">
            <ArrowLink href="#news">一覧を見る</ArrowLink>
          </Reveal>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-9 xl:grid-cols-4">
          {news.map((n, i) => (
            <li key={n.title}>
              <Reveal delay={i * 0.1} y={36} className="h-full">
                <article className="glass group relative flex h-full flex-col overflow-hidden rounded-[10px] p-3 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[6px]">
                    <Image
                      src={n.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 18vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                    <p className="flex items-center gap-4 text-[0.625rem] uppercase tracking-[0.22em] text-ink/55">
                      <time dateTime={n.date}>{fmt(n.date)}</time>
                      <span className="h-px w-4 bg-ink/25" />
                      {n.category}
                    </p>
                    <h3 className="heading-ja mt-4 text-[0.9375rem] leading-[1.8] tracking-[0.06em] text-ink">
                      <a href="#news" className="after:absolute after:inset-0">
                        {n.title}
                      </a>
                    </h3>
                    <p className="mt-3 line-clamp-3 text-xs leading-[1.9] text-ink-2/80">{n.excerpt}</p>
                    <span className="mt-auto flex justify-end pt-6 text-ink/60 transition-colors duration-500 group-hover:text-ink">
                      <Arrow className="w-6 transition-transform duration-700 group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
