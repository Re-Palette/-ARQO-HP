'use client';

import React, { useRef } from 'react';
const waveA = '/newtone/wave-a.webp';
import { BrushUnderline, Particles, SplitChars } from './parts';
import { gsap, useSceneMotion } from './motion';

/** SCENE 02 — BRAND CONCEPT：HEROの色と光を引き継ぎ、コピーがスクロールに合わせて現れる */
export const ConceptScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useSceneMotion(ref, ({ desktop }) => {
    const chars = gsap.utils.toArray<HTMLElement>('.concept__title .char');
    const brush = gsap.utils.toArray<SVGPathElement>('.concept__title .brush-path');

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: desktop
        ? { trigger: ref.current, start: 'top 60%', end: 'bottom bottom', scrub: true }
        : { trigger: '.concept__inner', start: 'top 85%', end: 'bottom 70%', scrub: true },
    });

    tl.fromTo('.concept .wave', { xPercent: -14, opacity: 0.15 }, { xPercent: 8, opacity: 0.55, duration: 1 }, 0)
      .fromTo('.trail-wipe', { xPercent: -100 }, { xPercent: 0, duration: 0.8 }, 0.05)
      .fromTo('.trail-wipe__inner', { xPercent: 100 }, { xPercent: 0, duration: 0.8 }, 0.05)
      .fromTo('.concept .eyebrow', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.08 }, 0.04)
      .fromTo(
        chars,
        { opacity: 0, yPercent: 55, rotate: 6 },
        { opacity: 1, yPercent: 0, rotate: 0, duration: 0.12, stagger: 0.022 },
        0.08,
      )
      .fromTo(brush, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.12, stagger: 0.04 }, '>-0.02')
      .fromTo('.concept__body', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.14 }, '>-0.04')
      .fromTo('.concept .particles', { yPercent: 10, autoAlpha: 0 }, { yPercent: -18, autoAlpha: 1, duration: 1 }, 0);

    if (desktop) tl.to('.concept__inner', { yPercent: -6, duration: 0.25 }, 0.75);
  });

  return (
    <section id="about" ref={ref} className="scene scene--pin concept" aria-labelledby="concept-title">
      <div className="scene__sticky">
        <div className="scene__bg" aria-hidden="true">
          <div className="wave" style={{ backgroundImage: `url(${waveA})` }} />
          <Particles count={22} seed={113} />
        </div>
        <div className="trail-wipe" aria-hidden="true">
          <div className="trail-wipe__inner">
        <svg className="concept__trail" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="trail-grad" x1="0" x2="1">
              <stop offset="0" stopColor="#ff4fa3" stopOpacity="0" />
              <stop offset="0.35" stopColor="#ff4fa3" />
              <stop offset="0.7" stopColor="#a35cf0" />
              <stop offset="1" stopColor="#4f6dff" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#trail-grad)" strokeLinecap="round">
            <path d="M-40 760 C 300 640, 520 820, 820 640 S 1300 420, 1660 520" strokeWidth="9" opacity="0.22" />
            <path d="M-40 760 C 300 640, 520 820, 820 640 S 1300 420, 1660 520" strokeWidth="1.6" />
            <path d="M-40 800 C 280 700, 560 860, 860 690 S 1320 480, 1660 580" strokeWidth="0.8" opacity="0.6" />
          </g>
        </svg>
          </div>
        </div>
        <div className="concept__inner">
          <p className="eyebrow">01 — Brand Concept</p>
          <h2 id="concept-title" className="concept__title">
            <SplitChars className="line" text="美しさは、" />
            <span className="line">
              <SplitChars text="わたしたちが" />
              <br className="sp-br" />
              <SplitChars text="つくる" />
              <span className="future">
                <SplitChars text="未来。" />
                <BrushUnderline id="brush-concept" />
              </span>
            </span>
          </h2>
          <p className="concept__body">
            美容は、外見を変えるためだけのものじゃない。
            <br />
            自分らしさを見つけて、新しい価値観をかたちにする、ひとつの表現。
            <br />
            次の世代がつくる美しさが、ここから動き出す。
          </p>
        </div>
      </div>
    </section>
  );
};
