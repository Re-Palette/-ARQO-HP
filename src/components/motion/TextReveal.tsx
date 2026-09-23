"use client";

import { motion } from "framer-motion";
import { EASE } from "./Reveal";

type Tag = "h1" | "h2" | "h3" | "p" | "div";

type TextRevealProps = {
  /** One entry per visual line. Each line slides up from behind a mask. */
  lines: string[];
  as?: Tag;
  id?: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of on scroll into view. */
  immediate?: boolean;
};

export function TextReveal({
  lines,
  as = "h2",
  id,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.12,
  immediate = false,
}: TextRevealProps) {
  const MotionTag = motion[as];
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={lines.join("")}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]" aria-hidden>
          <motion.span
            className={["block will-change-transform", lineClassName].filter(Boolean).join(" ")}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 1.3, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
