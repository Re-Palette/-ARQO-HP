"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useMotionAllowed } from "@/components/motion/useMotionAllowed";
import { ArrowLink } from "@/components/ui/ArrowLink";

/**
 * Pinned scene: the panel slides up over the receding Hero carrying a framed
 * photo, the frame opens to full-bleed while the image settles, then the copy
 * arrives line by line — every step tied to the scroll position.
 */
export function About() {
  const ref = useRef<HTMLElement>(null);
  const allowed = useMotionAllowed();
  // 0 → section top enters at the bottom · ~0.43 → pinned · 1 → section end reaches the bottom.
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end end"] });

  const inset = useTransform(p, [0.3, 0.68], allowed ? [14, 0] : [0, 0]);
  const radius = useTransform(p, [0.3, 0.68], allowed ? [28, 0] : [0, 0]);
  const clipPath = useTransform(
    [inset, radius],
    ([i, r]: number[]) => `inset(${i}% ${i * 1.4}% ${i}% ${i * 1.4}% round ${r}px)`,
  );
  const imgScale = useTransform(p, [0.2, 1], allowed ? [1.35, 1.02] : [1, 1]);
  const washOpacity = useTransform(p, (v) => (allowed ? clamp01((v - 0.5) / 0.15) : 1));

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 h-[230vh] rounded-t-[28px] bg-mist shadow-[0_-40px_80px_-20px_rgba(10,20,40,0.35)] md:rounded-t-[40px]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden rounded-t-[inherit]">
        <motion.div style={{ clipPath }} className="absolute inset-0 isolate text-white">
          <motion.div style={{ scale: imgScale }} className="absolute inset-0 -z-10 will-change-transform">
            <Image
              src="/images/about.jpg"
              alt="白い曲線の建築の下、夕暮れの都市を見渡す女性"
              fill
              quality={90}
              sizes="100vw"
              className="object-cover object-[35%_center] md:object-center"
            />
          </motion.div>
          {/* Legibility washes fade in with the copy (right on desktop, bottom on mobile) */}
          <motion.div style={{ opacity: washOpacity }} className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(12,32,66,0.68)_0%,rgba(12,32,66,0.5)_30%,rgba(12,32,66,0.2)_50%,rgba(12,32,66,0)_66%)] max-md:hidden" />
            <div className="absolute right-0 top-1/2 h-[80%] w-[55%] -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(10,26,56,0.42),transparent)] max-md:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0f2240]/40 to-transparent max-md:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-[80%] bg-[linear-gradient(0deg,rgba(15,34,64,0.9)_0%,rgba(15,34,64,0.62)_45%,rgba(15,34,64,0.25)_75%,rgba(15,34,64,0)_100%)] md:hidden" />
          </motion.div>

          <div className="container-x flex h-full items-end pb-24 pt-32 md:items-center md:justify-end md:pb-0">
            <div className="max-w-[560px] [text-shadow:0_1px_3px_rgba(6,20,46,0.6),0_4px_30px_rgba(6,20,46,0.55)] md:mr-[2%] md:-mt-[6vh]">
              <Line p={p} at={0.56} allowed={allowed}>
                <span className="eyebrow text-white">About</span>
              </Line>
              <h2
                id="about-heading"
                className="heading-ja mt-8 text-[clamp(1.3rem,2.5vw,2.4rem)] font-medium leading-[1.7] md:mt-10"
              >
                <Line p={p} at={0.6} allowed={allowed} className={HEADING_LINE}>
                  すべての人に、
                </Line>
                <Line p={p} at={0.64} allowed={allowed} className={HEADING_LINE}>
                  自分らしく生きる選択肢を。
                </Line>
              </h2>
              <Line p={p} at={0.7} allowed={allowed} className="mt-8 block">
                <span className="block font-mincho text-[0.9375rem] font-medium leading-[2.2] tracking-[0.1em] md:text-base">
                  ARQOは、美容・教育・コミュニティ・テクノロジーの
                  <br className="hidden md:block" />
                  {"4つの事業を軸に、社会の可能性を広げる"}
                  <br className="hidden md:block" />
                  {"ソーシャルベンチャーです。"}
                </span>
              </Line>
              <Line p={p} at={0.76} allowed={allowed} className="mt-10 block md:mt-12">
                <ArrowLink href="#service" circle tone="light" className="text-white">
                  詳しく見る
                </ArrowLink>
              </Line>
            </div>
          </div>
        </motion.div>

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

const HEADING_LINE = "block whitespace-nowrap tracking-[0.1em] sm:tracking-[0.14em] md:tracking-[0.18em]";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** A piece of copy that slides in from the right, unblurs and fades up over a short scroll window. */
function Line({
  p,
  at,
  allowed,
  className = "block",
  children,
}: {
  p: MotionValue<number>;
  at: number;
  allowed: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const t = useTransform(p, (v) => (allowed ? clamp01((v - at) / 0.1) : 1));
  const x = useTransform(t, (v) => (1 - v) * 70);
  const filter = useTransform(t, (v) => `blur(${(1 - v) * 8}px)`);
  return (
    <motion.span style={{ x, opacity: t, filter }} className={className}>
      {children}
    </motion.span>
  );
}
