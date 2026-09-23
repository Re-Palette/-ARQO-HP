"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMotionAllowed } from "./useMotionAllowed";

type ScrollDriftProps = {
  children: React.ReactNode;
  className?: string;
  /** Pixels of vertical travel on each side of rest while the element crosses the viewport. */
  distance?: number;
  /** Only drift at or above this viewport width (e.g. to keep swipe rows still on phones). */
  minWidth?: number;
};

/**
 * Scroll-synced vertical drift. Positive distances move against the scroll
 * (feels further away), negative ones move with it (feels closer).
 */
export function ScrollDrift({ children, className, distance = 40, minWidth = 0 }: ScrollDriftProps) {
  const ref = useRef<HTMLDivElement>(null);
  const allowed = useMotionAllowed(minWidth);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], allowed ? [distance, -distance] : [0, 0]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
