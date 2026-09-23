"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

export function Vision() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  // The frame opens from an inset card to full-bleed as it enters the viewport.
  const inset = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const clipPath = useTransform(
    [inset, radius],
    ([i, r]: number[]) => `inset(${i}% ${i}% 0% ${i}% round ${r}px)`,
  );

  return (
    <section
      id="vision"
      ref={ref}
      aria-labelledby="vision-heading"
      className="relative bg-night"
    >
      <motion.div style={{ clipPath }} className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Parallax className="absolute -inset-y-[12%] inset-x-0" speed={16} scale={[1.22, 1]}>
            <Image src="/images/vision.jpg" alt="夕焼けに染まる都市の風景" fill sizes="100vw" className="object-cover object-bottom" />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-b from-night/45 via-night/5 to-night/35" />
        </div>

        <div className="container-x py-40 text-center text-white">
          <Reveal>
            <p className="eyebrow justify-center text-white/75">Our Vision</p>
          </Reveal>
          <TextReveal
            id="vision-heading"
            lines={["美容・教育・コミュニティ・テクノロジーで、", "誰もが自分らしく生きられる", "社会をつくる。"]}
            stagger={0.18}
            className="heading-ja mx-auto mt-12 text-[clamp(1.3rem,3vw,2.75rem)] leading-[1.85] text-white [text-shadow:0_4px_40px_rgba(20,20,50,0.35)]"
            lineClassName="md:whitespace-nowrap"
          />
          <Reveal delay={0.6}>
            <p className="mt-12 font-display text-[clamp(1.25rem,2.2vw,2rem)] italic text-white/80">
              Infrastructure for every possibility.
            </p>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
