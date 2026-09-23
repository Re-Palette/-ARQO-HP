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
      className="relative overflow-hidden bg-mist py-24 md:py-36"
    >
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-20 size-[720px] rounded-full bg-sky/25 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 size-[640px] rounded-full bg-lavender/30 blur-[140px]" />

      <div className="container-x relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-ink/60">Our Service</p>
            </Reveal>
            <TextReveal
              id="service-heading"
              lines={["4つの事業で、", "社会に新しい価値を。"]}
              className="heading-ja mt-6 text-[clamp(1.35rem,2.4vw,2.1rem)] text-ink md:flex"
              lineClassName="tracking-[0.12em] md:tracking-[0.2em]"
            />
          </div>
          <Reveal delay={0.2} className="md:pb-2">
            <ArrowLink href="#brands">事業内容を見る</ArrowLink>
          </Reveal>
        </div>

        {/* Landscape photo cards: swipe on mobile, 2-up on tablet, 4-up on desktop */}
        <ul
          data-lenis-prevent-touch
          className="-mx-[clamp(1.25rem,4.5vw,4.5rem)] mt-12 flex snap-x snap-mandatory scroll-px-[clamp(1.25rem,4.5vw,4.5rem)] gap-4 overflow-x-auto px-[clamp(1.25rem,4.5vw,4.5rem)] pb-4 [scrollbar-width:none] md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          {services.map((s, i) => (
            <li key={s.no} className="w-[84vw] max-w-[400px] shrink-0 snap-start md:w-auto md:max-w-none">
              <Reveal delay={i * 0.1} y={36} amount={0.05} className="h-full">
                <a
                  href="#brands"
                  className="group relative block aspect-[4/3] overflow-hidden rounded-[4px] text-white shadow-[0_24px_60px_-30px_rgba(40,50,90,0.45)] transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_36px_80px_-30px_rgba(40,50,90,0.55)] xl:aspect-[3/2]"
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    quality={90}
                    sizes="(min-width: 1280px) 24vw, (min-width: 768px) 45vw, 84vw"
                    className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.08]"
                  />
                  {/* Legibility wash under the copy */}
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(18,22,44,0.72)_0%,rgba(18,22,44,0.5)_38%,rgba(18,22,44,0.12)_62%,rgba(18,22,44,0)_80%)] transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-white/0 transition-colors duration-700 group-hover:bg-white/[0.04]" />

                  <div className="absolute inset-x-0 bottom-0 p-5 [text-shadow:0_1px_2px_rgba(6,12,30,0.5),0_2px_18px_rgba(6,12,30,0.45)] md:p-6">
                    <h3 className="font-display text-[clamp(1.6rem,2.1vw,2.1rem)] leading-none tracking-[0.01em]">
                      {s.title}
                    </h3>
                    <p className="mt-3 font-mincho text-[0.8125rem] font-medium tracking-[0.18em]">{s.ja}</p>
                    <span aria-hidden className="mt-3 block h-px w-10 bg-white/50 transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-16" />
                    {/* "\n" in the copy marks the break used on the narrow 4-up desktop cards */}
                    <p className="mt-3 pr-10 font-mincho text-xs font-medium leading-[1.9] tracking-[0.04em] text-white/95 xl:pr-0 xl:text-[0.65rem] min-[1440px]:text-[0.6875rem] 2xl:text-xs">
                      {s.description.split("\n").map((part) => (
                        <span key={part} className="xl:block">
                          {part}
                        </span>
                      ))}
                    </p>
                    <Arrow className="absolute bottom-6 right-5 w-7 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 md:bottom-7 md:right-6" />
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
