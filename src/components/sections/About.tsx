"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Parallax } from "@/components/motion/Parallax";
import { EASE, Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { domains } from "@/lib/content";

const principles = [
  { no: "01", en: "Access", ja: "機会へのアクセスを、誰にでも。" },
  { no: "02", en: "Design", ja: "美しい体験で、人の行動を変える。" },
  { no: "03", en: "Scale", ja: "テクノロジーで、仕組みとして広げる。" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative bg-white py-28 md:py-44">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-ink/60">About</p>
          </Reveal>
          <TextReveal
            id="about-heading"
            lines={["すべての人に、", "自分らしく生きる", "選択肢を。"]}
            className="heading-ja mt-10 text-[clamp(1.75rem,3.2vw,2.9rem)] leading-[1.65] text-ink"
            lineClassName="tracking-[0.16em]"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 font-display text-xl italic text-ink/50 md:text-2xl">
              Designing opportunity — not charity.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-[34em] text-sm leading-[2.2] tracking-[0.06em] text-ink-2">
              ARQOは、美容・教育・コミュニティ・テクノロジーの4つの事業を軸に、社会の可能性を広げるソーシャルベンチャーです。支援する側・される側という境界を越えて、誰もが自分の意思で次の一歩を選べる社会のインフラをつくります。
            </p>
          </Reveal>
          <Reveal delay={0.4} className="mt-12">
            <ArrowLink href="#service" circle>
              私たちについて
            </ArrowLink>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7 lg:pl-10">
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-[4px]"
            initial={{ clipPath: "inset(12% 12% 12% 12%)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 2, ease: EASE }}
          >
            <Parallax className="absolute -inset-y-[10%] inset-x-0" speed={14}>
              <Image
                src="/images/about-architecture.jpg"
                alt="空に向かって伸びる白い曲線の建築"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-l from-white/25 to-transparent" />

            <ul className="absolute right-6 top-1/2 -translate-y-1/2 space-y-5 text-right md:right-10">
              {domains.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.8 + i * 0.12 }}
                  className="text-[0.625rem] uppercase tracking-[0.34em] text-ink/70 md:text-[0.6875rem]"
                >
                  {d}
                </motion.li>
              ))}
              <li aria-hidden className="ml-auto h-12 w-px bg-ink/30" />
            </ul>
          </motion.div>
          <p className="mt-4 text-right text-[0.625rem] uppercase tracking-[0.3em] text-ink/40">
            Bridge between people &amp; possibility
          </p>
        </div>
      </div>

      <div className="container-x mt-28 md:mt-40">
        <ul className="grid gap-px overflow-hidden rounded-[4px] bg-line md:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.no} className="bg-white">
              <Reveal delay={i * 0.12} className="flex h-full flex-col gap-10 px-2 py-10 md:px-10 md:py-14">
                <span className="text-[0.6875rem] tracking-[0.24em] text-ink/40">{p.no}</span>
                <div>
                  <p className="font-display text-4xl text-ink md:text-5xl">{p.en}</p>
                  <p className="heading-ja mt-4 text-sm text-ink-2">{p.ja}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
