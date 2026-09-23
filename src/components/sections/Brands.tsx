"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { brands } from "@/lib/content";

export function Brands() {
  return (
    <section
      id="brands"
      aria-labelledby="brands-heading"
      className="relative isolate overflow-hidden bg-night py-28 text-white md:py-40"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -right-20 -top-40 size-[760px] rounded-full bg-[#5a4ba8]/30 blur-[150px]" />
        <div className="absolute left-1/4 top-1/3 size-[620px] rounded-full bg-sky-deep/15 blur-[150px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-night" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4 lg:pt-6">
          <Reveal>
            <p className="eyebrow text-white/60">Brands</p>
          </Reveal>
          <TextReveal
            id="brands-heading"
            lines={["私たちの想いを", "カタチにした", "3つのブランド。"]}
            className="heading-ja mt-8 text-[clamp(1.6rem,2.6vw,2.4rem)] text-white"
          />
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-[28em] text-sm leading-[2.2] tracking-[0.06em] text-white/65">
              ARQOは、それぞれの領域で社会に新しい価値を届けるブランドを展開しています。事業をつくり、コミュニティを育て、仕組みとして社会に実装していきます。
            </p>
          </Reveal>
          <Reveal delay={0.35} className="mt-12">
            <ArrowLink href="#news" tone="light" className="text-white/90">
              ブランド一覧を見る
            </ArrowLink>
          </Reveal>
        </div>

        <ul className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
          {brands.map((b, i) => (
            <li key={b.name}>
              <Reveal delay={i * 0.12} y={50}>
                <article className="group relative aspect-[3/4] overflow-hidden rounded-[6px] border border-white/10">
                  <Image
                    src={b.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1800ms] ease-[var(--ease-out-expo)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-night/0 backdrop-blur-0 transition-all duration-1000 ease-[var(--ease-out-expo)] group-hover:bg-night/45 group-hover:backdrop-blur-[6px]" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="text-[0.625rem] uppercase tracking-[0.28em] text-white/60">{b.category}</p>
                    <h3 className="mt-3 font-display text-[clamp(1.75rem,2.4vw,2.4rem)] leading-none">{b.name}</h3>
                    <p className="mt-3 font-mincho text-[0.6875rem] tracking-[0.04em] text-white/85">{b.tagline}</p>

                    {/* Detail — always visible on touch, revealed on hover elsewhere */}
                    <div className="grid transition-[grid-template-rows,opacity] duration-1000 ease-[var(--ease-out-expo)] [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100">
                      <div className="overflow-hidden">
                        <p className="mt-5 border-t border-white/20 pt-5 text-xs leading-[2] text-white/75">
                          {b.description}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-3 text-[0.625rem] uppercase tracking-[0.24em]">
                          View Brand <Arrow className="w-5" />
                        </span>
                      </div>
                    </div>
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
