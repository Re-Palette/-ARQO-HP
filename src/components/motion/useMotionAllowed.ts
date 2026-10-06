"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * True when scroll-synced motion should run: the viewer has not asked for
 * reduced motion and the viewport is at least `minWidth` wide.
 */
/**
 * Heuristic for devices that struggle with heavy compositing: few cores, little
 * memory, or the viewer asked to save data.
 */
export function isLiteDevice() {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return (
    (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4 || nav.connection?.saveData === true
  );
}

/** True on low-power devices (client only; false during SSR and first paint). */
export function useLite() {
  const [lite, setLite] = useState(false);
  useEffect(() => setLite(isLiteDevice()), []);
  return lite;
}

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
