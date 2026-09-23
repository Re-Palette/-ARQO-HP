"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * True when scroll-synced motion should run: the viewer has not asked for
 * reduced motion and the viewport is at least `minWidth` wide.
 */
export function useMotionAllowed(minWidth = 0) {
  const reduced = useReducedMotion();
  const [wideEnough, setWideEnough] = useState(minWidth === 0);

  useEffect(() => {
    if (minWidth === 0) return;
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setWideEnough(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [minWidth]);

  return !reduced && wideEnough;
}
