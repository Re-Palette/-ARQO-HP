"use client";

import { motion, type MotionValue } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";

type LogoProps = {
  className?: string;
  /** Stroke width in CSS pixels (non-scaling). */
  stroke?: number;
  /** Draw the letterforms in when scrolled into view. */
  draw?: boolean;
  title?: string;
  /** Optional per-glyph horizontal offsets (A, R, Q, O) in SVG units, e.g. scroll-driven. */
  glyphX?: [MotionValue<number>, MotionValue<number>, MotionValue<number>, MotionValue<number>];
};

/**
 * ARQO wordmark — hairline geometric letterforms.
 * The open "A" (no crossbar) reads as an arch: a bridge between two points.
 */
export function Logo({ className, stroke = 1.4, draw = false, title = "ARQO", glyphX }: LogoProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    vectorEffect: "non-scaling-stroke" as const,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const anim = (i: number) =>
    draw
      ? {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.4 },
          transition: {
            pathLength: { duration: 2.2, delay: 0.15 * i, ease: EASE },
            opacity: { duration: 0.4, delay: 0.15 * i },
          },
        }
      : {};

  return (
    <svg viewBox="-2 -2 416 112" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <motion.g style={{ x: glyphX?.[0] }}>
        <motion.path d="M2 102 L44 2 L86 102" {...common} {...anim(0)} />
      </motion.g>
      <motion.g style={{ x: glyphX?.[1] }}>
        <motion.path d="M118 102 V2 H146 A25 25 0 0 1 146 52 H118 M142 52 L176 102" {...common} {...anim(1)} />
      </motion.g>
      <motion.g style={{ x: glyphX?.[2] }}>
        <motion.circle cx="250" cy="52" r="50" {...common} {...anim(2)} />
        <motion.path d="M270 80 L298 108" {...common} {...anim(3)} />
      </motion.g>
      <motion.g style={{ x: glyphX?.[3] }}>
        <motion.circle cx="360" cy="52" r="50" {...common} {...anim(4)} />
      </motion.g>
    </svg>
  );
}
