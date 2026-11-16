'use client';

/* eslint-disable @next/next/no-img-element -- art-directed crop of the hero key visual */
import React, { useRef } from 'react';
import { BrushUnderline, SplitChars } from './parts';
import { gsap, useSceneMotion } from './motion';

const waveA = '/newtone/wave-a.webp';
const face = '/newtone/face.webp';

const PILLARS = [
  { en: 'DISCOVER', ja: '新しい美容と、出会う。' },
  { en: 'CONNECT', ja: 'つくり手と、つながる。' },
  { en: 'INSPIRE', ja: '明日の自分が、ときめく。' },
] as const;

/**
 * SCENE 02 — MANIFESTO
 * HEROのネイビーをそのまま受け取り、キービジュアルの横顔とコンセプトを雑誌の見開きのように組む。
 * コピーはスクロールに合わせて1文字ずつ灯る（opacity のみ）。
 */
export const ManifestoScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useSceneMotion(ref, ({ desktop }) => {
    // 横顔のフレーム：下からせり上がり、中の写真はゆっくり逆方向へ流れる
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '.mf__visual', start: 'top 95%', end: 'bottom 10%', scrub: true },
      })
      .fromTo('.mf__frame', { y: desktop ? 110 : 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0)
      .fromTo('.mf__img', { yPercent: -5 }, { yPercent: 5, duration: 1 }, 0)
      .fromTo('.mf__script', { xPercent: -16, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.22, ease: 'power2.out' }, 0.22)
      .fromTo('.mf__vert', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.2 }, 0.26)
      .fromTo('.mf__wave', { xPercent: 10, yPercent: 8 }, { xPercent: -8, yPercent: -10, duration: 1 }, 0);

    // コピー：読む速さで文字が灯っていく
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '.mf__text', start: 'top 88%', end: desktop ? 'bottom 80%' : 'bottom 82%', scrub: true },
      })
      .fromTo('.mf .eyebrow', { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.1 }, 0)
      .fromTo('.mf__title .char', { opacity: 0.12 }, { opacity: 1, duration: 0.08, stagger: 0.028 }, 0.04)
      .fromTo('.mf__title .brush-path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.12, stagger: 0.04 }, '>-0.04')
      .fromTo('.mf__body p', { opacity: 0.14, y: 14 }, { opacity: 1, y: 0, duration: 0.16, stagger: 0.11 }, '>-0.08')
      .fromTo('.mf__pillar', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.14, stagger: 0.06 }, '>-0.06');
  });

  return (
    <section id="about" ref={ref} className="mf" aria-labelledby="mf-title">
      <div className="mf__bg" aria-hidden="true">
        <div className="wave mf__wave" style={{ backgroundImage: `url(${waveA})` }} />
      </div>
      <div className="mf__grid">
        <div className="mf__visual" aria-hidden="true">
          <div className="mf__frame">
            <img className="mf__img" src={face} alt="" width={660} height={660} loading="lazy" decoding="async" draggable={false} />
          </div>
          <p className="mf__script">The Next Beauty.</p>
          <p className="mf__vert">NEWTONE 2027 — BEAUTY BRAND POPUP</p>
        </div>

        <div className="mf__text">
          <p className="eyebrow">01 — Concept</p>
          <h2 id="mf-title" className="mf__title">
            <SplitChars className="line" text="美しさは、" />
            <SplitChars className="line" text="わたしたちが" />
            <span className="line">
              <SplitChars text="つくる" />
              <span className="mf__future">
                <SplitChars text="未来。" />
                <BrushUnderline id="brush-manifesto" />
              </span>
            </span>
          </h2>
          <div className="mf__body">
            <p>美容は、外見を変えるためだけのものじゃない。</p>
            <p>自分らしさを見つけて、新しい価値観をかたちにする、ひとつの表現。</p>
            <p>
              学生起業家や若きクリエイターが生み出したブランドに、
              <br className="pc-br" />
              直接出会えるPOPUP。それが、NEWTONE です。
            </p>
          </div>
          <ul className="mf__pillars">
            {PILLARS.map((p) => (
              <li key={p.en} className="mf__pillar">
                <span className="mf__pillar-en">{p.en}</span>
                <span className="mf__pillar-ja">{p.ja}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

/** 場面転換の帯：巨大なタイポが左右へすれ違う（transform のみ） */
export const TickerBand: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useSceneMotion(ref, () => {
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      .fromTo('.tk__row--a', { xPercent: -2 }, { xPercent: -27 }, 0)
      .fromTo('.tk__row--b', { xPercent: -30 }, { xPercent: -8 }, 0);
  });

  return (
    <div ref={ref} className="tk" aria-hidden="true">
      <div className="tk__row tk__row--a">
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>
            DISCOVER. <em>CONNECT.</em> INSPIRE.
          </span>
        ))}
      </div>
      <div className="tk__row tk__row--b">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i}>
            The Next Beauty. <i>✦</i> <b>未来の“好き”に、きっと出会える。</b> <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
};
