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
      className="relative overflow-hidden bg-mist py-24 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-20 size-[720px] rounded-full bg-sky/25 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 size-[640px] rounded-full bg-lavender/30 blur-[140px]" />

      <div className="container-x relative">
        {/* Heading · intro · link */}
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end xl:grid-cols-[auto_1fr_auto] xl:gap-14">
          <div>
            <Reveal>
              <p className="eyebrow text-ink/60">Service</p>
            </Reveal>
            <TextReveal
              id="service-heading"
              lines={["4つの事業で、", "社会に新しい価値を。"]}
              className="heading-ja mt-5 text-[clamp(1.35rem,2.3vw,2rem)] text-ink sm:flex"
              lineClassName="whitespace-nowrap tracking-[0.12em] md:tracking-[0.16em]"
            />
          </div>
          <Reveal delay={0.15} className="md:order-3 md:col-span-2 xl:order-none xl:col-span-1 xl:justify-self-center xl:pb-1">
            <p className="font-mincho text-[0.8125rem] leading-[2] tracking-[0.08em] text-ink-2">
              ARQOは、美容・教育・コミュニティ・テクノロジーの
              <br className="hidden sm:block" />
              {"4つの事業を軸に、社会の可能性を広げる"}
              <br className="hidden sm:block" />
              {"ソーシャルベンチャーです。"}
            </p>
          </Reveal>
          <Reveal delay={0.25} className="md:pb-2">
            <ArrowLink href="#vision">事業内容を見る</ArrowLink>
          </Reveal>
        </div>

        {/* Portrait photo cards: swipe on mobile, 2-up on tablet, 4-up on desktop */}
        <ul
          data-lenis-prevent-touch
          className="-mx-[clamp(1.25rem,4.5vw,4.5rem)] mt-12 flex snap-x snap-mandatory scroll-px-[clamp(1.25rem,4.5vw,4.5rem)] gap-4 overflow-x-auto px-[clamp(1.25rem,4.5vw,4.5rem)] pb-4 [scrollbar-width:none] md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          {services.map((s, i) => (
            <li key={s.no} className="w-[76vw] max-w-[340px] shrink-0 snap-start md:w-auto md:max-w-none">
              <Reveal delay={i * 0.1} y={36} amount={0.05} className="h-full">
                <a
                  href="#vision"
                  className="group relative isolate flex aspect-[5/6] flex-col justify-between overflow-hidden rounded-[3px] p-5 text-white shadow-[0_24px_60px_-30px_rgba(40,50,90,0.45)] transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_36px_80px_-30px_rgba(40,50,90,0.55)] md:p-6"
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    quality={90}
                    sizes="(min-width: 1280px) 24vw, (min-width: 768px) 45vw, 76vw"
                    className="-z-10 object-cover transition-transform duration-[1600ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.08]"
                  />
                  {/* Legibility washes: light at the top for the index, deeper under the copy */}
                  <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(18,22,44,0.28)_0%,rgba(18,22,44,0)_22%,rgba(18,22,44,0)_42%,rgba(18,22,44,0.45)_62%,rgba(18,22,44,0.72)_100%)]" />

                  <div className="[text-shadow:0_1px_8px_rgba(6,12,30,0.4)]">
                    <span className="font-display text-lg tracking-[0.08em]">{s.no}</span>
                    <span aria-hidden className="mt-2 block h-px w-10 bg-white/60 transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-16" />
                  </div>

                  <div className="[text-shadow:0_1px_2px_rgba(6,12,30,0.5),0_2px_18px_rgba(6,12,30,0.45)]">
                    <h3 className="font-display text-[clamp(1.55rem,2vw,2rem)] leading-none tracking-[0.01em]">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 font-mincho text-[0.8125rem] font-medium tracking-[0.16em]">{s.ja}</p>
                    {/* "\n" in the copy marks the break used on the narrow 4-up desktop cards */}
                    <p className="mt-3 font-mincho text-xs font-medium leading-[1.9] tracking-[0.04em] text-white/95 xl:text-[0.65rem] min-[1440px]:text-[0.6875rem] 2xl:text-xs">
                      {s.description.split("\n").map((part) => (
                        <span key={part} className="xl:block">
                          {part}
                        </span>
                      ))}
                    </p>
                    <span className="mt-5 grid size-10 place-items-center rounded-full border border-white/80 bg-white/5 backdrop-blur-sm transition-colors duration-700 group-hover:bg-white group-hover:text-ink md:size-11">
                      <Arrow className="w-4 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
