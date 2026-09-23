"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { EASE } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { useMotionAllowed } from "@/components/motion/useMotionAllowed";
import { Arrow } from "@/components/ui/ArrowLink";
import { Logo } from "@/components/ui/Logo";
import { domains } from "@/lib/content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const allowed = useMotionAllowed();
  // The hero is sticky, so progress is measured in viewport heights scrolled from the top.
  const { scrollY } = useScroll();
  const p = useTransform(scrollY, (v) =>
    typeof window === "undefined" ? 0 : Math.min(1, Math.max(0, v / window.innerHeight)),
  );
  const m = (from: number, to: number) => (allowed ? [from, to] : [from, from]);

  // Scroll-synced depth: photo drifts and zooms, copy lifts away faster, and the
  // whole stage recedes into a rounded card while About slides over it.
  const bgY = useTransform(p, [0, 1], allowed ? ["0%", "10%"] : ["0%", "0%"]);
  const bgScale = useTransform(p, [0, 1], m(1, 1.12));
  const copyY = useTransform(p, [0, 1], m(0, -180));
  const copyOpacity = useTransform(p, (v) => (allowed ? Math.max(0, 1 - v / 0.55) : 1));
  const stageScale = useTransform(p, [0, 1], m(1, 0.88));
  const stageRadius = useTransform(p, [0, 1], m(0, 36));
  const dim = useTransform(p, (v) => (allowed ? v * 0.6 : 0));

  return (
    <section
      id="top"
      ref={ref}
      aria-label="ARQO — 人と可能性の間に架け橋をつくる。"
      className="sticky top-0 z-0 h-[100svh] min-h-[640px] overflow-hidden bg-night text-white"
    >
      <motion.div
        style={{ scale: stageScale, borderRadius: stageRadius }}
        className="relative isolate h-full origin-[50%_30%] overflow-hidden bg-sky-deep will-change-transform"
      >
      {/* Photo — slow settle-in zoom, then scroll parallax */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 -z-20">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3, ease: EASE }}
        >
          <Image
            src="/images/hero.jpg"
            alt="青空と都市を背景に、空を見上げる女性"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[68%_center] md:object-center"
          />
        </motion.div>
      </motion.div>

      {/* Legibility + light layers */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,36,72,0.58)_0%,rgba(14,36,72,0.34)_32%,rgba(14,36,72,0.08)_55%,rgba(14,36,72,0)_68%)]" />
        <div className="absolute left-0 top-1/2 h-[80%] w-[60%] -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(12,30,62,0.32),transparent)] max-md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0f2240]/85 via-[#0f2240]/35 to-transparent md:h-1/3 md:from-[#0f2240]/45" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1d3f6e]/20 to-transparent" />
        {/* Passing light reflection across a glass plane */}
        <div className="absolute -right-[15%] -top-[25%] h-[150%] w-[40%] rotate-[24deg] overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent [animation:sheen_11s_var(--ease-soft)_2.5s_infinite]" />
        </div>
      </div>

      {/* Copy */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="container-x relative flex h-full flex-col justify-end pb-28 pt-24 md:justify-center md:pb-0"
      >
        <div className="max-w-[620px] [text-shadow:0_1px_2px_rgba(8,24,52,0.45),0_4px_28px_rgba(8,24,52,0.4)]">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
          >
            <h1 className="sr-only">ARQO</h1>
            <Logo
              className="h-auto w-[clamp(200px,27vw,390px)] drop-shadow-[0_2px_16px_rgba(8,24,52,0.45)]"
              stroke={2.2}
              draw
            />
          </motion.div>

          <TextReveal
            as="p"
            immediate
            delay={0.9}
            lines={["人と可能性の間に", "架け橋をつくる。"]}
            className="heading-ja mt-8 text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-[1.75] tracking-[0.22em] md:mt-12"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: 1.5 }}
            className="mt-7 font-mincho text-sm font-medium leading-[2.1] tracking-[0.1em] text-white md:whitespace-nowrap md:text-[0.9375rem]"
          >
            私たちは、美容・教育・コミュニティ・テクノロジーを通じて、<br className="hidden md:block" />
            {"一人ひとりが新しい一歩を踏み出せる機会を創造します。"}
          </motion.p>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2 }}
            className="group mt-10 inline-flex items-center gap-6 text-[0.6875rem] uppercase tracking-[0.3em] text-white md:mt-14"
            aria-label="Aboutセクションへスクロール"
          >
            <span className="relative grid size-14 place-items-center overflow-hidden rounded-full border border-white/90 bg-white/10 backdrop-blur-sm transition-[transform,background-color,color] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:bg-white group-hover:text-sky-deep md:size-16">
              <Arrow className="w-5 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5" />
            </span>
            Scroll
          </motion.a>
        </div>
      </motion.div>

      {/* Bottom rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.2 }}
        className="container-x absolute inset-x-0 bottom-6 flex items-end justify-between text-[0.625rem] uppercase tracking-[0.3em] text-white/90 [text-shadow:0_1px_12px_rgba(8,24,52,0.5)] md:bottom-8"
      >
        <ul className="hidden items-center gap-4 sm:flex">
          {domains.map((d, i) => (
            <li key={d} className="flex items-center gap-4">
              {i > 0 ? <span className="h-px w-5 bg-white/40" /> : null}
              {d}
            </li>
          ))}
        </ul>
        <span className="hidden items-center gap-4 sm:flex">
          <span className="relative block h-px w-12 overflow-hidden bg-white/30">
            <span className="absolute inset-0 bg-white/80 [animation:scroll-line_2.8s_var(--ease-soft)_infinite]" />
          </span>
          A Social Venture for What&rsquo;s Next
        </span>
      </motion.div>

      {/* Darkens as the stage recedes behind the next section */}
      <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-night" />
      </motion.div>
    </section>
  );
}
