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

  // The frame "opens" by scaling a clipped layer (compositor-only) instead of
  // animating clip-path, which would repaint the full-screen photo every frame.
  // Same footprint as the old 7% side/top inset: 86% wide, 93% tall, anchored at the bottom.
  const open = (v: number) => (allowed ? clamp01(v / 0.4) : 1);
  const sx = (v: number) => 0.86 + 0.14 * open(v);
  const sy = (v: number) => 0.93 + 0.07 * open(v);
  const zoom = (v: number) => (allowed ? 1.38 - 0.36 * clamp01((v - 0.1) / 0.9) : 1);
  const frameX = useTransform(p, sx);
  const frameY = useTransform(p, sy);
  const capsOpacity = useTransform(p, (v) => (open(v) < 0.999 ? 1 : 0)); // flips once; never animates
  // Counter-scale so the photo keeps its proportions and its own slow zoom.
  const imgX = useTransform(p, (v) => zoom(v) / sx(v));
  const imgYScale = useTransform(p, (v) => zoom(v) / sy(v));
  const imgY = useTransform(p, (v) => (allowed ? `${-6 + 6 * clamp01(v)}%` : "0%"));
  const eyebrow = useTransform(p, (v) => (allowed ? clamp01((v - 0.3) / 0.1) : 1));
  const tail = useTransform(p, (v) => (allowed ? clamp01((v - 0.86) / 0.08) : 1));
  const tailY = useTransform(tail, (v) => (1 - v) * 30);

  return (
    <section ref={ref} id="vision" aria-labelledby="vision-heading" className="relative h-[260vh] bg-night">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          style={{ scaleX: frameX, scaleY: frameY }}
          className="absolute inset-0 origin-bottom overflow-hidden will-change-transform"
        >
          <motion.div style={{ scaleX: imgX, scaleY: imgYScale, y: imgY }} className="absolute inset-0 will-change-transform">
            <Image src="/images/vision.jpg" alt="夕焼けに染まる都市の風景" fill sizes="100vw" className="object-cover object-bottom" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-night/45 via-night/5 to-night/35" />
          <motion.div aria-hidden style={{ opacity: capsOpacity }} className="corner-caps [--cap:var(--color-night)] [--r:30px]" />
        </motion.div>

        {/* Copy sits above the frame, unscaled */}
        <div className="relative flex h-full items-center">
          <div className="container-x text-center text-white">
            <motion.p style={{ opacity: eyebrow }} className="eyebrow justify-center text-white/75 will-change-[opacity]">
              Our Vision
            </motion.p>
            <ScrubText
              id="vision-heading"
              progress={p}
              range={[0.42, 0.84]}
              lines={["美容・教育・コミュニティ・テクノロジーで、", "誰もが自分らしく生きられる", "社会をつくる。"]}
              className="heading-ja mx-auto mt-12 text-[clamp(1.3rem,3vw,2.75rem)] leading-[1.85] text-white [text-shadow:0_3px_22px_rgba(20,20,50,0.38)]"
              lineClassName="md:whitespace-nowrap"
            />
            <motion.p
              style={{ opacity: tail, y: tailY }}
              className="mt-12 will-change-[opacity,transform] font-display text-[clamp(1.25rem,2.2vw,2rem)] italic text-white/80"
            >
              Infrastructure for every possibility.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
