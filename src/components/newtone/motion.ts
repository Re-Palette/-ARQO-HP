'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useEffect, type RefObject } from 'react';
import { useLenis } from '@/components/motion/SmoothScroll';

gsap.registerPlugin(ScrollTrigger, useGSAP);

ScrollTrigger.config({ ignoreMobileResize: true });

/** newtone.css の「長いピン留め演出」と同じ条件。ここが true のときだけピン留めする */
export const MQ_DESKTOP = '(min-width: 768px) and (min-aspect-ratio: 6/5)';
export const MQ_REDUCE = '(prefers-reduced-motion: reduce)';

type Setup = (ctx: { desktop: boolean; scope: HTMLElement }) => void | (() => void);

/**
 * シーンごとのスクロール同期アニメーション。
 * - DOMの初期状態＝完成形。GSAPは「そこへ至る途中の状態」だけを scrub で与える
 * - prefers-reduced-motion: reduce のときは何もしない（完成形のまま表示）
 * - ブレークポイントを跨ぐと matchMedia が自動で revert / 再構築する
 */
export function useSceneMotion(scope: RefObject<HTMLElement | null>, setup: Setup) {
  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const mm = gsap.matchMedia(el);
      mm.add({ desktop: MQ_DESKTOP, reduce: MQ_REDUCE }, (c) => {
        const { desktop, reduce } = c.conditions as { desktop: boolean; reduce: boolean };
        if (reduce) return;
        return setup({ desktop, scope: el });
      });
      return () => mm.revert();
    },
    { scope },
  );
}

export { gsap, ScrollTrigger };

/**
 * ARQOサイト共通の慣性スクロール（Lenis）に ScrollTrigger を同期させる。
 * 独自の Lenis は作らず、フォント・画像の読み込みや bfcache 復帰時に位置を再計算する。
 */
export function useScrollSync() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const off = lenis.on('scroll', ScrollTrigger.update);
    ScrollTrigger.refresh();
    return off;
  }, [lenis]);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    const onShow = (e: PageTransitionEvent) => e.persisted && refresh();
    window.addEventListener('pageshow', onShow);
    return () => {
      window.removeEventListener('load', refresh);
      window.removeEventListener('pageshow', onShow);
    };
  }, []);
}

/**
 * ピン留めしない場面用：画面に入ったときに一度だけ、ふわりと現れる軽い演出（transform / opacity のみ）。
 * useSceneMotion の setup 内で呼ぶこと（matchMedia の revert でまとめて片付く）。
 */
export function revealOnce(targets: gsap.DOMTarget, trigger?: gsap.DOMTarget, vars: gsap.TweenVars = {}) {
  return gsap.from(targets, {
    opacity: 0,
    y: 34,
    duration: 0.95,
    ease: 'power3.out',
    stagger: 0.09,
    ...vars,
    scrollTrigger: { trigger: trigger ?? targets, start: 'top 86%', once: true },
  });
}
