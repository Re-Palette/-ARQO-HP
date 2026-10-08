"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { EASE } from "@/components/motion/Reveal";
import { useMotionAllowed } from "@/components/motion/useMotionAllowed";
import { Arrow } from "@/components/ui/ArrowLink";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: EASE, delay },
});

/**
 * Re-Palette (美容福祉事業) hero: a dark, editorial key visual — the photo
 * collage with its handwritten notes and brush strokes sits on the right, the
 * copy and the latest event on the left.
 */
export function RePaletteHero({ crumbs }: { crumbs: Crumb[] }) {
  const ref = useRef<HTMLElement>(null);
  const allowed = useMotionAllowed();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(p, (v) => (allowed ? v * 14 : 0) + "%");
  const copyY = useTransform(p, (v) => (allowed ? v * -110 : 0));
  const copyOpacity = useTransform(p, (v) => (allowed ? Math.max(0, 1 - v / 0.6) : 1));

  return (
    <section
      ref={ref}
      aria-labelledby="repalette-title"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-[#0d0f14] text-white"
    >
      {/* Key visual */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.div style={{ y: imgY }} className="absolute -inset-y-[5%] inset-x-0 will-change-transform">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.6, ease: EASE }}
          >
            <Image
              src="/images/repalette-hero.jpg"
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-[53%_center] lg:object-[right_center]"
            />
          </motion.div>
        </motion.div>
        {/* Copy side shade; on phones the copy sits low, so the shade comes from below */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,18,0.55)_0%,rgba(10,12,18,0.25)_30%,rgba(10,12,18,0)_45%)] max-lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/85 to-transparent lg:hidden" />
      </div>

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="container-x flex w-full flex-col justify-end pb-10 pt-[46svh] will-change-[opacity,transform] lg:justify-between lg:pb-12 lg:pt-[clamp(6.5rem,19svh,12rem)]"
      >
        <div className="max-w-[640px] [text-shadow:0_1px_3px_rgba(0,0,0,0.45),0_4px_28px_rgba(0,0,0,0.35)]">
          <motion.p {...fadeUp(0.3)} className="font-mincho text-[clamp(1rem,1.35vw,1.25rem)] font-medium leading-[1.9] tracking-[0.2em]">
            美容の力で、
            <br />
            孤立した若者に“次の一歩”を。
          </motion.p>

          <motion.h1
            id="repalette-title"
            {...fadeUp(0.5)}
            className="mt-6 whitespace-nowrap font-playfair text-[clamp(3.4rem,7.6vw,7.75rem)] font-normal leading-[1.02] tracking-[-0.01em] lg:mt-8"
          >
            <span className="bg-[linear-gradient(90deg,#fff_0%,#fff_40%,#f6c4dc_47%,#cfe6f6_57%,#fff_66%,#fff3b8_78%,#fff_92%)] bg-clip-text text-transparent [text-shadow:none] [filter:drop-shadow(0_2px_18px_rgba(0,0,0,0.35))]">
              Re<span className="text-white/55">-</span>Palette
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.7)} className="mt-6 font-mincho text-[clamp(1.05rem,1.55vw,1.5rem)] font-medium tracking-[0.14em] sm:tracking-[0.28em] lg:mt-8">
            美容 × 福祉 = 新しい社会のインフラ
          </motion.p>

          <motion.p
            {...fadeUp(0.85)}
            className="mt-8 font-mincho text-[0.875rem] font-medium leading-[2.1] tracking-[0.14em] text-white/90 lg:mt-10 lg:text-[0.9375rem] [@media(min-height:900px)]:lg:mt-12"
          >
            美容を通じて、社会から孤立した若者たちに
            <br />
            自信と居場所を届ける。
            <br />
            私たちは、美容を「社会復帰インフラ」として
            <br />
            機能させる仕組みをつくります。
          </motion.p>
        </div>

        <div className="mt-12 max-w-[560px] lg:mt-8">
          <motion.a
            href="#overview-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.3 }}
            className="hidden items-end gap-4 text-[0.6875rem] uppercase tracking-[0.3em] text-white/90 [@media(min-height:860px)]:lg:flex"
            aria-label="概要へスクロール"
          >
            <span className="relative block h-20 w-px overflow-hidden bg-white/25">
              <span className="absolute inset-0 bg-white/85 [animation:scroll-line-y_2.8s_var(--ease-soft)_infinite]" />
            </span>
            Scroll
          </motion.a>

          {/* Latest event */}
          <motion.div {...fadeUp(1.1)} className="mt-8 border-y border-white/25 lg:mt-6">
            <Link href="/projects/nuance-lounge" className="group flex items-center gap-5 py-3 sm:gap-6">
              <span className="relative block aspect-[160/86] w-[34%] max-w-[160px] shrink-0 overflow-hidden">
                <Image
                  src="/images/repalette-event-thumb.jpg"
                  alt="窓の大きなラウンジ"
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.625rem] uppercase tracking-[0.24em] text-white/70">Event</span>
                <span className="mt-1.5 block font-mincho text-[0.8125rem] font-medium tracking-[0.1em] sm:text-[0.875rem]">
                  美容×福祉の未来をつくる、特別な場所。
                </span>
                <span className="mt-1.5 block text-[0.6875rem] tracking-[0.08em] text-white/75">Nuance Lounge（交流イベント）</span>
              </span>
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/70 bg-[#0d0f14]/45 transition-colors duration-500 group-hover:bg-white group-hover:text-ink sm:size-14">
                <Arrow className="w-4 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="sr-only">
          <Breadcrumbs items={crumbs} />
        </div>
      </motion.div>
    </section>
  );
}
