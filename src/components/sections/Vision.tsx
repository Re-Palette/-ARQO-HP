"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ScrubText } from "@/components/motion/ScrubText";
import { useMotionAllowed } from "@/components/motion/useMotionAllowed";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Pinned scene: the frame opens to full-bleed as it arrives, then — held in
 * place — the city slowly zooms out while the statement lights up character
 * by character and the English line settles in.
 */
export function Vision() {
  const ref = useRef<HTMLElement>(null);
  const allowed = useMotionAllowed();
  // 0 → top enters at the bottom · ~0.4 → pinned · 1 → end reaches the bottom.
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end end"] });

  const inset = useTransform(p, (v) => (allowed ? 7 * (1 - clamp01(v / 0.4)) : 0));
  const clipPath = useTransform(inset, (i) => `inset(${i}% ${i}% 0% ${i}% round ${i * 4}px)`);
  const imgScale = useTransform(p, (v) => (allowed ? 1.38 - 0.36 * clamp01((v - 0.1) / 0.9) : 1));
  const imgY = useTransform(p, (v) => (allowed ? `${-6 + 6 * clamp01(v)}%` : "0%"));
  const eyebrow = useTransform(p, (v) => (allowed ? clamp01((v - 0.3) / 0.1) : 1));
  const tail = useTransform(p, (v) => (allowed ? clamp01((v - 0.86) / 0.08) : 1));
  const tailY = useTransform(tail, (v) => (1 - v) * 30);

  return (
    <section ref={ref} id="vision" aria-labelledby="vision-heading" className="relative h-[260vh] bg-night">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ clipPath }} className="relative isolate flex h-full items-center overflow-hidden">
          <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0 -z-10 will-change-transform">
            <Image src="/images/vision.jpg" alt="夕焼けに染まる都市の風景" fill sizes="100vw" className="object-cover object-bottom" />
          </motion.div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/45 via-night/5 to-night/35" />

          <div className="container-x text-center text-white">
            <motion.p style={{ opacity: eyebrow }} className="eyebrow justify-center text-white/75">
              Our Vision
            </motion.p>
            <ScrubText
              id="vision-heading"
              progress={p}
              range={[0.42, 0.84]}
              lines={["美容・教育・コミュニティ・テクノロジーで、", "誰もが自分らしく生きられる", "社会をつくる。"]}
              className="heading-ja mx-auto mt-12 text-[clamp(1.3rem,3vw,2.75rem)] leading-[1.85] text-white [text-shadow:0_4px_40px_rgba(20,20,50,0.35)]"
              lineClassName="md:whitespace-nowrap"
            />
            <motion.p
              style={{ opacity: tail, y: tailY }}
              className="mt-12 font-display text-[clamp(1.25rem,2.2vw,2rem)] italic text-white/80"
            >
              Infrastructure for every possibility.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
