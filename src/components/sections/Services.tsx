"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section
      id="service"
      aria-labelledby="service-heading"
      className="relative overflow-hidden bg-mist py-28 md:py-40"
    >
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 size-[720px] rounded-full bg-sky/25 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 size-[640px] rounded-full bg-sunset/25 blur-[140px]" />

      <div className="container-x relative">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-ink/60">Our Service</p>
            </Reveal>
            <TextReveal
              id="service-heading"
              lines={["4つの事業で、", "社会に新しい価値を。"]}
              className="heading-ja mt-8 text-[clamp(1.6rem,2.8vw,2.5rem)] text-ink"
            />
          </div>
          <Reveal delay={0.2}>
            <ArrowLink href="#brands">事業内容を見る</ArrowLink>
          </Reveal>
        </div>

        {/* Cards: horizontal scroll-snap on mobile, expanding row on desktop */}
        <ul
          data-lenis-prevent-touch
          className="-mx-[clamp(1.25rem,4.5vw,4.5rem)] mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4.5vw,4.5rem)] pb-4 [scrollbar-width:none] md:mt-20 lg:mx-0 lg:h-[600px] lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {services.map((s, i) => {
            const dark = s.tone === "dark";
            return (
              <li
                key={s.no}
                className="group relative h-[520px] w-[80vw] max-w-[380px] shrink-0 snap-start lg:h-full lg:w-auto lg:max-w-none lg:flex-[1_1_0%] lg:transition-[flex-grow] lg:duration-[1100ms] lg:ease-[var(--ease-out-expo)] lg:hover:grow-[1.65]"
              >
                <Reveal delay={i * 0.1} y={40} className="h-full">
                  <a
                    href="#brands"
                    className="relative flex h-full flex-col justify-between overflow-hidden rounded-[6px] p-7 text-white md:p-8"
                  >
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 35vw, 80vw"
                      className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        dark
                          ? "from-night/85 via-night/20 to-transparent"
                          : "from-ink/60 via-ink/5 to-transparent"
                      }`}
                    />
                    <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink/30 to-transparent" />
                    <div className="absolute inset-0 bg-white/0 transition-colors duration-700 group-hover:bg-white/[0.04]" />

                    <div className="relative flex items-start justify-between">
                      <span className="text-[0.6875rem] tracking-[0.24em] text-white/80">{s.no}</span>
                      <span className="grid size-11 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:bg-white group-hover:text-ink">
                        <Arrow className="w-4" />
                      </span>
                    </div>

                    <div className="relative min-w-[240px]">
                      <h3 className="whitespace-nowrap font-display text-[clamp(2rem,2.6vw,2.75rem)] leading-none">
                        {s.title}
                      </h3>
                      <p className="heading-ja mt-4 flex items-center gap-4 text-[0.8125rem] text-white/90">
                        {s.ja}
                        <span className="h-px flex-1 bg-white/35" />
                      </p>
                      <p className="mt-5 max-w-[26em] text-[0.8125rem] leading-[2] text-white/80 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-1000 lg:ease-[var(--ease-out-expo)] lg:group-hover:max-h-40 lg:group-hover:opacity-100">
                        {s.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-3 text-[0.6875rem] tracking-[0.2em] text-white/90">
                        詳しく見る
                        <Arrow className="w-5 transition-transform duration-700 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
