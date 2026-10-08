"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { EASE } from "@/components/motion/Reveal";
import { useMotionAllowed } from "@/components/motion/useMotionAllowed";
import { Arrow } from "@/components/ui/ArrowLink";
import type { Project } from "@/lib/content";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: EASE, delay },
});

/**
 * Light, editorial event hero for Nuance Lounge: event details on the left,
 * a photo collage with handwritten notes, a message bubble and the four
 * things you get on the right.
 */
export function NuanceLoungeHero({ project: p, crumbs }: { project: Project; crumbs: Crumb[] }) {
  const ref = useRef<HTMLElement>(null);
  const allowed = useMotionAllowed();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const collageY = useTransform(scrollYProgress, (v) => (allowed ? v * -60 : 0));
  const bubbleY = useTransform(scrollYProgress, (v) => (allowed ? v * -110 : 0));
  const e = p.event;

  return (
    <section
      ref={ref}
      data-hero="light"
      aria-labelledby="project-title"
      className="relative isolate overflow-hidden bg-[#f6f3f1] pb-16 pt-28 text-ink md:pt-32 lg:min-h-[100svh] lg:pb-10"
    >
      {/* Soft light field */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/4 size-[560px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-lavender)_45%,transparent)]" />
        <div className="absolute left-1/3 top-0 size-[520px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-peach)_40%,transparent)]" />
        <div className="absolute -right-20 bottom-0 size-[620px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-sky)_40%,transparent)]" />
        <div className="absolute -right-[10%] top-[-20%] h-[140%] w-[30%] rotate-[24deg] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-6">
        {/* Event details */}
        <div className="relative z-10 lg:col-span-5">
          <motion.p {...fadeUp(0.2)} className="flex items-center gap-4 text-[0.6875rem] uppercase tracking-[0.3em] text-ink/70">
            <span className="h-px w-8 bg-ink/40" />
            Project
            <span className="h-px w-4 bg-ink/40" />
            {p.category}
          </motion.p>
          <motion.h1
            id="project-title"
            {...fadeUp(0.35)}
            className="mt-6 whitespace-nowrap font-playfair text-[clamp(2.9rem,4.9vw,4.6rem)] leading-[1.02] tracking-[-0.005em] text-[#1d2a48]"
          >
            {p.name}
          </motion.h1>
          <motion.p {...fadeUp(0.5)} className="mt-5 font-display text-[clamp(1.4rem,2.2vw,2.1rem)] italic text-[#1d2a48]/85">
            {p.en}
          </motion.p>
          <motion.p {...fadeUp(0.6)} className="heading-ja mt-5 text-[clamp(0.95rem,1.25vw,1.15rem)] tracking-[0.14em] text-ink">
            {p.lead}
          </motion.p>

          {e ? (
            <>
              <motion.dl {...fadeUp(0.75)} className="mt-10 flex flex-wrap items-stretch gap-x-6 gap-y-6 xl:gap-x-8">
                <div>
                  <dt className="sr-only">開催日時</dt>
                  <dd>
                    <time dateTime={e.date} className="flex items-baseline gap-3">
                      <span className="font-sans text-[clamp(1.6rem,2.3vw,2.1rem)] font-light tracking-[0.12em] text-[#1d2a48]">
                        {e.date.replaceAll("-", ".")}
                      </span>
                      <span className="text-xs tracking-[0.2em] text-ink/70">{e.weekday}</span>
                    </time>
                    <span className="mt-1 block font-sans text-lg font-light tracking-[0.16em] text-[#1d2a48]">{e.time}</span>
                  </dd>
                </div>
                <span aria-hidden className="hidden w-px bg-ink/25 sm:block lg:hidden 2xl:block" />
                <div className="flex gap-3">
                  <dt className="sr-only">会場</dt>
                  <svg aria-hidden viewBox="0 0 24 24" className="mt-1 size-5 shrink-0 text-[#1d2a48]" fill="currentColor">
                    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                  </svg>
                  <dd>
                    <span className="block text-[0.8125rem] uppercase tracking-[0.22em] text-[#1d2a48]">{e.venue}</span>
                    <span className="mt-1.5 block font-mincho text-[0.8125rem] tracking-[0.06em] text-ink-2">{e.address}</span>
                  </dd>
                </div>
              </motion.dl>

              <motion.div {...fadeUp(0.85)} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 font-mincho text-[0.875rem] tracking-[0.08em] text-ink">
                <span className="border border-ink/70 px-4 py-1.5 text-[0.8125rem]">参加費</span>
                {e.fees.map((f, i) => (
                  <span key={f.label} className="flex items-center gap-5">
                    {i > 0 ? <span aria-hidden className="h-4 w-px bg-ink/30" /> : null}
                    <span>
                      {f.label}
                      <span className="ml-3 font-sans">{f.price}</span>
                    </span>
                  </span>
                ))}
              </motion.div>

              <motion.div {...fadeUp(0.95)}>
                <Link
                  href={`/contact?category=${encodeURIComponent("イベント参加申し込み")}`}
                  className="group mt-10 inline-flex items-center gap-16 border border-ink/70 bg-white/40 px-8 py-4 font-mincho text-[0.9375rem] tracking-[0.14em] text-ink backdrop-blur-sm transition-colors duration-500 hover:bg-ink hover:text-white"
                >
                  参加申し込みはこちら
                  <Arrow className="w-7 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
                </Link>
              </motion.div>
            </>
          ) : null}

          <motion.div {...fadeUp(1.1)} className="mt-12 lg:mt-16">
            <Breadcrumbs items={crumbs} tone="dark" />
          </motion.div>
        </div>

        {/* Collage */}
        <div className="relative lg:col-span-7">
          <motion.div style={{ y: collageY }} className="relative w-full will-change-transform lg:w-[80%]">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
              className="relative aspect-[734/628] [mask-image:radial-gradient(ellipse_58%_58%_at_50%_50%,#000_62%,transparent_100%)]"
            >
              <Image
                src="/images/nuance-lounge-collage.jpg"
                alt="窓の大きなラウンジで、学生や社会人がテーブルを囲んで語り合う様子と、会場・ドリンクと軽食の写真"
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain"
              />
            </motion.div>

            <motion.p
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.4 }}
              className="absolute -bottom-6 left-[2%] -rotate-[9deg] font-hand text-[clamp(1.1rem,1.6vw,1.6rem)] leading-[1.15] text-ink/75 lg:-bottom-10"
            >
              Different backgrounds,
              <br />
              <span className="pl-[2.2em]">One conversation ~</span>
            </motion.p>
          </motion.div>

          {/* Handwritten tagline + message bubble */}
          <motion.p
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="absolute right-[1%] top-[2%] hidden -rotate-[14deg] font-hand text-[clamp(1.3rem,2vw,2rem)] leading-[1.1] text-[#1d2a48]/85 lg:block"
          >
            Beauty connects
            <br />
            <span className="pl-[3.2em]">people !</span>
          </motion.p>

          <motion.div style={{ y: bubbleY }} className="mt-10 flex justify-center will-change-transform lg:absolute lg:right-0 lg:top-[30%] lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 1 }}
              className="grid aspect-square w-[min(72vw,270px)] place-items-center rounded-full border border-[#c8b8e8]/70 bg-white/70 shadow-[0_20px_60px_-30px_rgba(80,70,140,0.35)] backdrop-blur-sm lg:w-[clamp(220px,19vw,280px)]"
            >
              <p className="text-center font-mincho text-[clamp(0.95rem,1.25vw,1.15rem)] leading-[2.05] tracking-[0.14em] text-ink">
                美容の
                <br />
                <span className="text-[#2c8a95]">悩み</span>も、興味も、
                <br />
                <span className="bg-gradient-to-r from-[#e3934f] via-[#c96fa4] to-[#7d6fd0] bg-clip-text text-transparent">アイデア</span>
                も。
                <br />
                ここで<span className="text-[#2f9a86]">シェア</span>して、
                <br />
                もっと自分らしく。
              </p>
            </motion.div>
          </motion.div>

          {/* What you get */}
          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.3 }}
            className="mt-14 grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:ml-auto lg:mt-12 lg:w-[72%]"
            aria-label="Nuance Lounge でできること"
          >
            {FEATURES.map((f, i) => (
              <li
                key={f.label}
                className={`flex flex-col items-center gap-2.5 text-[#1d2a48] ${i > 0 ? "sm:border-l sm:border-ink/20" : ""}`}
              >
                <svg viewBox="0 0 32 32" className="size-8" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {f.icon}
                </svg>
                <span className="text-[0.6875rem] tracking-[0.14em]">{f.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    label: "Networking",
    icon: (
      <>
        <circle cx="16" cy="10" r="3.2" />
        <circle cx="7.5" cy="13" r="2.6" />
        <circle cx="24.5" cy="13" r="2.6" />
        <path d="M10.5 24c0-3.3 2.5-6 5.5-6s5.5 2.7 5.5 6" />
        <path d="M3 24c0-2.8 2-4.9 4.5-4.9 1.2 0 2.2.4 3 1.1" />
        <path d="M29 24c0-2.8-2-4.9-4.5-4.9-1.2 0-2.2.4-3 1.1" />
      </>
    ),
  },
  {
    label: "Consultation",
    icon: (
      <>
        <path d="M5 8.5h15a2.5 2.5 0 0 1 2.5 2.5v6a2.5 2.5 0 0 1-2.5 2.5h-8l-4.5 3.5V19.5H5A2.5 2.5 0 0 1 2.5 17v-6A2.5 2.5 0 0 1 5 8.5Z" />
        <path d="M22.5 12.5H27a2.5 2.5 0 0 1 2.5 2.5v6A2.5 2.5 0 0 1 27 23.5h-1.5V27L21 23.5h-5a2.5 2.5 0 0 1-2.2-1.4" />
        <circle cx="8.5" cy="14" r=".6" fill="currentColor" />
        <circle cx="12.5" cy="14" r=".6" fill="currentColor" />
        <circle cx="16.5" cy="14" r=".6" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Knowledge",
    icon: (
      <>
        <path d="M16 9.5c-2.5-1.8-6-2.5-11-2.2v16.5c5-.3 8.5.4 11 2.2 2.5-1.8 6-2.5 11-2.2V7.3c-5-.3-8.5.4-11 2.2Z" />
        <path d="M16 9.5V26" />
      </>
    ),
  },
  {
    label: "Refreshments",
    icon: (
      <>
        <path d="M9 11h14l-1.6 16a2 2 0 0 1-2 1.8h-6.8a2 2 0 0 1-2-1.8L9 11Z" />
        <path d="M8 11h16" />
        <path d="M17.5 11 20 3.5l3.5 1" />
        <path d="M10.2 18h11.6" />
      </>
    ),
  },
];
