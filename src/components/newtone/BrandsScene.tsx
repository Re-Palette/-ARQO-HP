'use client';

/* eslint-disable @next/next/no-img-element -- art-directed layers ported as-is from the NEWTONE site */
import React, { useRef } from 'react';
import { BRANDS, BRAND_PLACEHOLDER_COUNT, type Brand } from './brands';
import { gsap, useSceneMotion } from './motion';

const pad = (n: number) => String(n).padStart(2, '0');

/** カードごとに光の球の表情を少しずつ変える */
const orbStyle = (i: number) =>
  ({ ['--ox' as string]: `${[28, 70, 40, 76, 22, 58][i % 6]}%`, ['--oy' as string]: `${[72, 30, 80, 66, 36, 24][i % 6]}%` }) as React.CSSProperties;

const BrandCard: React.FC<{ brand: Brand; index: number }> = ({ brand, index }) => {
  const inner = (
    <>
      {brand.image ? <img className="brand-card__img" src={brand.image} alt={`${brand.name} のプロダクト`} loading="lazy" /> : <div className="brand-card__orb" style={orbStyle(index)} aria-hidden="true" />}
      <div className="brand-card__shade" aria-hidden="true" />
      <span className="brand-card__no">{pad(index + 1)}</span>
      {brand.logo && <img className="brand-card__logo" src={brand.logo} alt={`${brand.name} ロゴ`} loading="lazy" />}
      <div className="brand-card__body">
        {brand.category && <span className="brand-card__tag">{brand.category}</span>}
        <h3 className="brand-card__name">{brand.name}</h3>
        <p className="brand-card__concept">{brand.concept}</p>
      </div>
    </>
  );
  return brand.url ? (
    <a className="brand-card" href={brand.url} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <article className="brand-card">{inner}</article>
  );
};

const PlaceholderCard: React.FC<{ index: number }> = ({ index }) => (
  <article className="brand-card brand-card--soon" aria-label={`参加ブランド ${pad(index + 1)}：近日公開`}>
    <div className="brand-card__orb" style={orbStyle(index)} aria-hidden="true" />
    <div className="brand-card__shade" aria-hidden="true" />
    <span className="brand-card__no">{pad(index + 1)}</span>
    <div className="brand-card__body">
      <h3 className="brand-card__name">COMING SOON</h3>
      <p className="brand-card__concept">参加ブランドは決定次第、順次公開します。</p>
    </div>
  </article>
);

/** SCENE 04 — BRANDS：スクロールに合わせてブランドが横方向に、奥行きを伴って登場 */
export const BrandsScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const hasBrands = BRANDS.length > 0;

  useSceneMotion(ref, ({ desktop, scope }) => {
    gsap.fromTo(
      '.brands__head > *',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.brands__head', start: 'top 90%', end: 'top 55%', scrub: true } },
    );

    const track = scope.querySelector<HTMLElement>('.brands__track');
    const cards = gsap.utils.toArray<HTMLElement>('.brand-card');
    if (!track) return;

    if (!desktop) {
      // スマートフォン：横スワイプはネイティブに任せ、登場だけを一度だけ
      gsap.from(cards, { opacity: 0, x: 60, stagger: 0.08, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: track, start: 'top 85%', once: true } });
      return;
    }

    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const move = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: scope.querySelector('.scene__sticky'),
        start: 'top top',
        end: () => `+=${Math.max(distance(), window.innerHeight * 0.6)}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // 各カードは画面中央に近づくほど手前に来る
    cards.forEach((card) => {
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: card, containerAnimation: move, start: 'left right', end: 'right left', scrub: true },
        })
        .fromTo(card, { rotateY: -18, scale: 0.86, opacity: 0.45, z: -120 }, { rotateY: 0, scale: 1, opacity: 1, z: 0, duration: 0.5 })
        .to(card, { rotateY: 14, scale: 0.9, opacity: 0.6, z: -80, duration: 0.5 });
    });
  });

  return (
    <section id="brands" ref={ref} className="scene brands" aria-labelledby="brands-title">
      <div className="scene__sticky">
        <div className="brands__head">
          <div>
            <p className="eyebrow">02 — Brands</p>
            <h2 id="brands-title" className="brands__title">BRANDS</h2>
          </div>
          <p className="brands__lead">
            学生起業家や若いクリエイターが生み出す、次世代の美容ブランドが集まります。
            {!hasBrands && (
              <>
                <br />
                参加ブランドは決定次第、こちらで順次ご紹介します。
              </>
            )}
          </p>
        </div>
        <div className="brands__viewport">
          <div className="brands__track">
            {hasBrands
              ? BRANDS.map((b, i) => <BrandCard key={b.id} brand={b} index={i} />)
              : Array.from({ length: BRAND_PLACEHOLDER_COUNT }, (_, i) => <PlaceholderCard key={i} index={i} />)}
          </div>
        </div>
        <p className="brands__note">{hasBrands ? 'AND MORE BRANDS…' : 'NEXT BEAUTY BRANDS — COMING SOON'}</p>
      </div>
    </section>
  );
};
