'use client';

import React, { useEffect, useRef } from 'react';
const heroImg = '/newtone/hero.webp';
const heroImg2x = '/newtone/hero-2x.webp';
const heroBlur = '/newtone/hero-blur.webp';
const titleMask = '/newtone/hero-title-mask.webp';
/** スマートフォン用のキービジュアル（縦長のポスター。ヘッダー部分だけ画像から除き、HTML のヘッダーを重ねる） */
const heroSp = '/newtone/hero-sp.webp';
const heroLights = '/newtone/hero-lights.webp';
import { gsap, useSceneMotion } from './motion';

/** PC（横長）版とスマホ（縦長）版の切り替え条件。CSS の .hero__desk / .hero__poster と同じ */
const MQ_DESK = '(min-width: 768px) and (min-aspect-ratio: 6/5)';
const MQ_POSTER = 'not all and (min-width: 768px) and (min-aspect-ratio: 6/5)';
/** 表示しない側の画像を読み込まないための 1px の透明 GIF */
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/** 高解像度ディスプレイ・大画面では2倍画像を使う */
const heroSrcSet = `${heroImg} 1672w, ${heroImg2x} 3344w`;

const maskStyle: React.CSSProperties = {
  WebkitMaskImage: `url(${titleMask})`,
  maskImage: `url(${titleMask})`,
};

const ScrollMark: React.FC = () => (
  <svg viewBox="0 0 14 26" fill="none" aria-hidden="true">
    <path className="scroll-line" d="M7 0v16" stroke="currentColor" strokeWidth="1.2" />
    <path d="M1.5 18.5 7 24l5.5-5.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/**
 * SCENE 01 — HERO
 * 参考ビジュアル（ナビ・SCROLL表示を除いた同一画像）をそのままベースに使用。
 * HTMLで重ねるのは、画像に含まれないヘッダーとSCROLL表示、そして光の演出レイヤーのみ。
 */
export const HeroScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);

  // 画面比が極端なときだけ、画像の端を背景へなじませる
  useEffect(() => {
    const desk = deskRef.current;
    if (!desk) return;
    const update = () => {
      const stage = desk.querySelector<HTMLElement>('.hero__stage');
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      const gap = r.width < desk.clientWidth - 2 ? 'x' : r.height < desk.clientHeight - 2 ? 'y' : '';
      if (gap) desk.dataset.gap = gap;
      else delete desk.dataset.gap;
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(desk);
    return () => ro.disconnect();
  }, []);

  useSceneMotion(ref, ({ desktop }) => {
    if (desktop) {
      // 進行度0 = 参考画像そのもの。スクロールに合わせて光が動き出す
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom bottom', scrub: true },
      });
      tl.to('.hero__desk .hero__media', { scale: 1.06, yPercent: -2.5, duration: 1 }, 0)
        .fromTo('.hero__desk .hero__lights', { autoAlpha: 0, xPercent: -6, yPercent: 4 }, { autoAlpha: 0.75, xPercent: 5, yPercent: -6, duration: 0.7 }, 0)
        .fromTo('.hero__desk .hero__sheen-band', { xPercent: 0 }, { xPercent: -68.75, duration: 0.55 }, 0.04)
        .set('.hero__desk .hero__sheen', { autoAlpha: 0 }, 0.6)
        .to('.hero__desk .hero__scroll', { opacity: 0, y: 12, duration: 0.08 }, 0)
        // ネイビーが下からせり上がり、最後は Scene 02 と同じ色一色になって継ぎ目なく次へ（transform のみ）
        .fromTo('.hero__desk .hero__veil', { autoAlpha: 1, yPercent: 0 }, { yPercent: -100, duration: 0.45 }, 0.55)
        // 完全に覆われたら下の層は描画しない
        .set('.hero__desk .hero__stage', { autoAlpha: 0 }, 0.999);
      return;
    }
    // スマートフォン：ピン留めせず、画面外へ抜ける間だけ穏やかに動かす
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
    });
    // ポスターがゆっくり寄りながら少し遅れて抜け、光の層が流れる（transform・opacity のみ）
    tl.fromTo('.poster__media', { scale: 1, yPercent: 0 }, { scale: 1.08, yPercent: 8 }, 0)
      .fromTo('.hero__poster .hero__lights', { autoAlpha: 0, yPercent: 6 }, { autoAlpha: 0.6, yPercent: -8 }, 0);
  });

  return (
    <section id="top" ref={ref} className="hero" aria-label="NEWTONE 2027 次世代の美容ブランドPOPUP">
      <h1 className="sr-only">NEWTONE 2027 — 次世代の美容ブランドPOPUP / The Next Beauty.</h1>
      <div className="hero__sticky">
        {/* ---------- Desktop / landscape ---------- */}
        <div className="hero__desk" ref={deskRef}>
          <div className="hero__fill" style={{ backgroundImage: `url(${heroBlur})` }} aria-hidden="true" />
          <div className="hero__stage">
            <div className="hero__media">
              {/* スマホでは表示しないので読み込まない（picture の source で透明 GIF に差し替え） */}
              <picture>
                <source media={MQ_POSTER} srcSet={BLANK} />
                <img
                  className="hero__img"
                  src={heroImg}
                  srcSet={heroSrcSet}
                  sizes="100vw"
                  width={1672}
                  height={941}
                  alt="光と髪がきらめく女性のビジュアルと、NEWTONE 2027 The Next Beauty. のタイトル。美しさは、わたしたちがつくる未来。美の常識を、アップデートしよう。"
                  fetchPriority="high"
                  decoding="async"
                  draggable={false}
                />
              </picture>
              <div className="hero__sheen" style={maskStyle} aria-hidden="true">
                <div className="hero__sheen-band" />
              </div>
            </div>
            <div className="hero__lights" style={{ backgroundImage: `url(${heroLights})` }} aria-hidden="true" />
          </div>
          <div className="hero__veil" aria-hidden="true" />
          <a className="hero__scroll" href="#about">
            <span>SCROLL</span>
            <ScrollMark />
          </a>
        </div>

        {/* ---------- Smartphone / portrait：縦長のポスターをそのまま使う ---------- */}
        <div className="hero__poster">
          <div className="poster__media">
            {/* PC では表示しないので読み込まない */}
            <picture>
              <source media={MQ_DESK} srcSet={BLANK} />
              <img
                className="poster__img"
                src={heroSp}
                width={941}
                height={1672}
                alt="光と髪がきらめく女性のビジュアルと、NEWTONE 2027 The Next Beauty. のタイトル。美しさは、わたしたちがつくる未来。未来の“好き”に、きっと出会える。学生起業家が生み出す、新しい美容のカタチ。COSMETICS、SKINCARE、HAIRCARE、INNERCARE、BEAUTY TOOL、FRAGRANCE、AND MORE。"
                decoding="async"
                draggable={false}
              />
            </picture>
            <div className="hero__lights" style={{ backgroundImage: `url(${heroLights})` }} aria-hidden="true" />
          </div>
          {/* 画像の中の「SCROLL」の位置に、押せる範囲だけを重ねる */}
          <a className="poster__scroll-hit" href="#about" aria-label="下へスクロール" />
        </div>
      </div>
    </section>
  );
};
