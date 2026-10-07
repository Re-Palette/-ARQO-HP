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

/**
 * The wordmark split into one SVG per letter, each in its own HTML layer, so
 * the letters can move independently on the compositor. (Moving <g> elements
 * inside a single SVG repaints the whole wordmark every frame.)
 * Geometry matches <Logo>; `glyphX` takes per-letter offsets in % of each letter's width.
 */
const GLYPHS = [
  { x: -2, w: 92 },
  { x: 114, w: 66 },
  { x: 198, w: 104 },
  { x: 308, w: 106 },
] as const;
const TOTAL_W = 416;

export function LogoSplit({
  className,
  stroke = 1.4,
  draw = false,
  title = "ARQO",
  glyphX,
}: Omit<LogoProps, "glyphX"> & {
  glyphX?: [MotionValue<string>, MotionValue<string>, MotionValue<string>, MotionValue<string>];
}) {
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
  const shapes = [
    <motion.path key="a" d="M2 102 L44 2 L86 102" {...common} {...anim(0)} />,
    <motion.path key="r" d="M118 102 V2 H146 A25 25 0 0 1 146 52 H118 M142 52 L176 102" {...common} {...anim(1)} />,
    <g key="q">
      <motion.circle cx="250" cy="52" r="50" {...common} {...anim(2)} />
      <motion.path d="M270 80 L298 108" {...common} {...anim(3)} />
    </g>,
    <motion.circle key="o" cx="360" cy="52" r="50" {...common} {...anim(4)} />,
  ];

  return (
    <div role="img" aria-label={title} className={`relative aspect-[416/112] ${className ?? ""}`}>
      {GLYPHS.map((g, i) => (
        <motion.div
          key={i}
          aria-hidden
          style={{ x: glyphX?.[i], left: `${((g.x + 2) / TOTAL_W) * 100}%`, width: `${(g.w / TOTAL_W) * 100}%` }}
          className="absolute inset-y-0 will-change-transform"
        >
          <svg viewBox={`${g.x} -2 ${g.w} 112`} className="h-full w-full overflow-visible">
            {shapes[i]}
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
