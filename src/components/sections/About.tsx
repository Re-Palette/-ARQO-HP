"use client";

import Image from "next/image";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollDrift } from "@/components/motion/ScrollDrift";
import { TextReveal } from "@/components/motion/TextReveal";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative">
      {/* Full-bleed scene */}
      <div className="relative isolate flex min-h-[100svh] overflow-hidden text-white">
        <div className="absolute inset-0 -z-10">
          <Parallax className="absolute -inset-y-[8%] inset-x-0" speed={12} scale={[1.12, 1]}>
            <Image
              src="/images/about.jpg"
              alt="白い曲線の建築の下、夕暮れの都市を見渡す女性"
              fill
              quality={90}
              sizes="100vw"
              className="object-cover object-[35%_center] md:object-center"
            />
          </Parallax>
          {/* Legibility: tonal wash behind the copy column (right on desktop, bottom on mobile) */}
          <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(12,32,66,0.68)_0%,rgba(12,32,66,0.5)_30%,rgba(12,32,66,0.2)_50%,rgba(12,32,66,0)_66%)] max-md:hidden" />
          <div className="absolute right-0 top-1/2 h-[80%] w-[55%] -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(10,26,56,0.42),transparent)] max-md:hidden" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0f2240]/40 to-transparent max-md:hidden" />
          <div className="absolute inset-x-0 bottom-0 h-[80%] bg-[linear-gradient(0deg,rgba(15,34,64,0.9)_0%,rgba(15,34,64,0.62)_45%,rgba(15,34,64,0.25)_75%,rgba(15,34,64,0)_100%)] md:hidden" />
        </div>

        <div className="container-x flex flex-1 items-end pb-24 pt-32 md:items-center md:justify-end md:pb-0">
          <ScrollDrift distance={70} minWidth={768} className="max-w-[560px] [text-shadow:0_1px_3px_rgba(6,20,46,0.6),0_4px_30px_rgba(6,20,46,0.55)] md:mr-[2%] md:-mt-[6vh]">
            <Reveal>
              <p className="eyebrow text-white">About</p>
            </Reveal>
            <TextReveal
              id="about-heading"
              lines={["すべての人に、", "自分らしく生きる選択肢を。"]}
              className="heading-ja mt-8 text-[clamp(1.3rem,2.5vw,2.4rem)] font-medium leading-[1.7] md:mt-10"
              lineClassName="whitespace-nowrap tracking-[0.1em] sm:tracking-[0.14em] md:tracking-[0.18em]"
            />
            <Reveal delay={0.25}>
              <p className="mt-8 font-mincho text-[0.9375rem] font-medium leading-[2.2] tracking-[0.1em] md:text-base">
                ARQOは、美容・教育・コミュニティ・テクノロジーの
                <br className="hidden md:block" />
                {"4つの事業を軸に、社会の可能性を広げる"}
                <br className="hidden md:block" />
                {"ソーシャルベンチャーです。"}
              </p>
            </Reveal>
            <Reveal delay={0.4} className="mt-10 md:mt-12">
              <ArrowLink href="#service" circle tone="light" className="text-white">
                詳しく見る
              </ArrowLink>
            </Reveal>
          </ScrollDrift>
        </div>

        <div aria-hidden className="absolute bottom-8 left-[clamp(1.25rem,4.5vw,4.5rem)] hidden flex-col items-center gap-3 text-[0.625rem] uppercase tracking-[0.3em] text-white/85 md:flex">
          <span className="relative block h-14 w-px overflow-hidden bg-white/30">
            <span className="absolute inset-0 origin-top bg-white/90 [animation:scroll-line-y_2.8s_var(--ease-soft)_infinite]" />
          </span>
          Scroll
        </div>
      </div>
    </section>
  );
}
