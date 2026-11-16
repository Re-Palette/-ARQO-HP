'use client';

import React, { useRef } from 'react';
import { EXPERIENCE_CATEGORIES } from './site';
import { gsap, revealOnce, useSceneMotion } from './motion';

const N = EXPERIENCE_CATEGORIES.length;
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * SCENE 04 — CATEGORIES
 * デスクトップ：ピン留めした画面のなかで、カテゴリー名が1つずつ中央へ送られ、
 * HEROのガラス玉と同じ球体の色とコピーが入れ替わる（transform / opacity のみ・1タイムライン）。
 * スマートフォン：そのまま読める一覧。
 */
export const CategoriesScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useSceneMotion(ref, ({ desktop, scope }) => {
    if (!desktop) {
      revealOnce('.ct__head > *', '.ct__head');
      gsap.utils.toArray<HTMLElement>('.ct__item', scope).forEach((item) => revealOnce(item, item, { y: 0, x: -28, duration: 0.8 }));
      return;
    }

    const items = gsap.utils.toArray<HTMLElement>('.ct__item', scope);
    const hues = gsap.utils.toArray<HTMLElement>('.ct__hue', scope);
    const copies = gsap.utils.toArray<HTMLElement>('.ct__orb-copy', scope);

    const HOLD = 0.6; // 最初と最後に少し留まる
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom bottom', scrub: true },
    });
    tl.fromTo('.ct__orb', { yPercent: 5, rotate: -4 }, { yPercent: -5, rotate: 4, duration: N - 1 + HOLD * 2 }, 0);

    for (let i = 1; i < N; i++) {
      const t = HOLD + (i - 1); // この時点から 0.55 かけて i 番目へ切り替わる
      tl.to('.ct__list', { yPercent: (-100 / N) * i, duration: 0.55, ease: 'power2.inOut' }, t)
        .fromTo(items[i], { opacity: 0.14 }, { opacity: 1, duration: 0.4 }, t + 0.1)
        .fromTo(items[i - 1], { opacity: 1 }, { opacity: 0, duration: 0.35, immediateRender: false }, t)
        .fromTo(hues[i], { opacity: 0 }, { opacity: 1, duration: 0.5 }, t)
        .fromTo(copies[i - 1], { opacity: 1, yPercent: 0 }, { opacity: 0, yPercent: -40, duration: 0.25, immediateRender: false }, t)
        .fromTo(copies[i], { opacity: 0, yPercent: 40 }, { opacity: 1, yPercent: 0, duration: 0.3 }, t + 0.25)
        .to('.ct__count-roll', { yPercent: (-100 / N) * i, duration: 0.4, ease: 'power2.inOut' }, t + 0.05);
    }
    tl.to({}, { duration: HOLD });

    // ピン留め前：球体と見出しが立ち上がる
    gsap
      .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: scope, start: 'top 75%', end: 'top top', scrub: true } })
      .fromTo('.ct__head > *', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, 0)
      .fromTo('.ct__orb-wrap', { scale: 0.72, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.1)
      .fromTo('.ct__stage', { xPercent: -8, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.7 }, 0.2);
  });

  return (
    <section ref={ref} className="ct" aria-labelledby="ct-title">
      <div className="ct__sticky">
        <div className="ct__bg" aria-hidden="true" />
        <header className="ct__head">
          <p className="eyebrow">03 — Categories</p>
          <h2 id="ct-title" className="ct__title">
            あなたの“好き”は、
            <br />
            どこから始まる？
          </h2>
        </header>

        <div className="ct__stage">
          <ol className="ct__list">
            {EXPERIENCE_CATEGORIES.map((c, i) => (
              <li key={c.key} className="ct__item" style={{ ['--hue' as string]: c.hue }}>
                <span className="ct__idx" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <span className="ct__name">{c.key}</span>
                <span className="ct__copy">{c.copy}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* 球体はデスクトップの演出専用（コピーは一覧側に同じ内容がある） */}
        <div className="ct__orb-wrap" aria-hidden="true">
          <div className="ct__orb">
            {EXPERIENCE_CATEGORIES.map((c) => (
              <i key={c.key} className="ct__hue" style={{ ['--hue' as string]: c.hue }} />
            ))}
            <span className="ct__gloss" />
          </div>
          <div className="ct__copies">
            {EXPERIENCE_CATEGORIES.map((c) => (
              <p key={c.key} className="ct__orb-copy">
                {c.copy.replace('、', '、\n')}
              </p>
            ))}
          </div>
        </div>
        <p className="ct__count" aria-hidden="true">
          <span className="ct__count-win">
            <span className="ct__count-roll">
              {EXPERIENCE_CATEGORIES.map((c, i) => (
                <span key={c.key}>{pad(i + 1)}</span>
              ))}
            </span>
          </span>
          <span className="ct__count-total">/ {pad(N)}</span>
        </p>
      </div>
    </section>
  );
};
