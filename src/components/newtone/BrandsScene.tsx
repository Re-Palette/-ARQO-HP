'use client';

/* eslint-disable @next/next/no-img-element -- brand assets are supplied as plain files under public/newtone/brands */
import React, { useRef } from 'react';
import { BRANDS, BRAND_PLACEHOLDER_COUNT, type Brand } from './brands';
import { Phrases } from './parts';
import { gsap, revealOnce, useSceneMotion } from './motion';

const HUES = ['#ff4fa3', '#a35cf0', '#4f6dff', '#e46bff', '#7f93f6'];
const pad = (n: number) => String(n).padStart(2, '0');

const BrandCard: React.FC<{ brand: Brand; index: number }> = ({ brand, index }) => {
  const body = (
    <>
      {brand.image && <img className="br__img" src={brand.image} alt="" loading="lazy" decoding="async" />}
      <span className="br__no" aria-hidden="true">
        {pad(index + 1)}
      </span>
      <span className="br__meta">
        {brand.category && <span className="br__cat">{brand.category}</span>}
        {brand.logo ? <img className="br__logo" src={brand.logo} alt={brand.name} loading="lazy" /> : <span className="br__name">{brand.name}</span>}
        <span className="br__concept">{brand.concept}</span>
      </span>
    </>
  );
  return brand.url ? (
    <a className="br__card br__card--live" href={brand.url} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  ) : (
    <div className="br__card br__card--live">{body}</div>
  );
};

const PlaceholderCard: React.FC<{ index: number }> = ({ index }) => (
  <div className="br__card br__card--soon">
    <span className="br__sheen" aria-hidden="true" />
    <span className="br__tag" aria-hidden="true">
      BRAND
    </span>
    <span className="br__no" aria-hidden="true">
      {pad(index + 1)}
    </span>
    <span className="br__soon">Coming soon</span>
    <span className="br__soon-ja">近日公開</span>
  </div>
);

/**
 * SCENE 05 — BRANDS
 * brands.ts の内容をそのまま並べる。未登録の間は COMING SOON の枠だけを見せる。
 */
export const BrandsScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const hasBrands = BRANDS.length > 0;
  const count = hasBrands ? BRANDS.length : BRAND_PLACEHOLDER_COUNT;

  useSceneMotion(ref, ({ desktop }) => {
    if (!desktop) {
      revealOnce('.br__head > *', '.br__head');
      revealOnce('.br__item', '.br__grid', { y: 50, stagger: 0.08 });
      return;
    }
    gsap
      .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.br__head', start: 'top 88%', end: 'top 35%', scrub: true } })
      .fromTo('.br .eyebrow', { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.3 }, 0)
      .fromTo('.br__en .char', { yPercent: 105 }, { yPercent: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out' }, 0)
      .fromTo(['.br__ja', '.br__lead'], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 }, 0.45);

    // 列ごとに速度を変えて、縦にずれながら流れる
    gsap
      .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.br__grid', start: 'top bottom', end: 'bottom top', scrub: true } })
      .fromTo('.br__item:nth-child(odd)', { y: 90 }, { y: -70, duration: 1 }, 0)
      .fromTo('.br__item:nth-child(even)', { y: 170 }, { y: -130, duration: 1 }, 0)
      .fromTo('.br__item', { opacity: 0 }, { opacity: 1, duration: 0.16, stagger: 0.03 }, 0.04);
  });

  return (
    <section id="brands" ref={ref} className="br" aria-labelledby="br-title">
      <div className="br__bg" aria-hidden="true" />
      <header className="br__head">
        <p className="eyebrow">04 — Brands</p>
        <h2 id="br-title" className="br__title">
          <span className="br__en" aria-hidden="true">
            {Array.from('LINEUP').map((ch, i) => (
              <span className="char" key={i}>
                {ch}
              </span>
            ))}
          </span>
          <span className="br__ja">
            <Phrases text="次の定番は、|ここから生まれる。" />
          </span>
        </h2>
        <p className="br__lead">
          {hasBrands ? (
            <>学生起業家や若きクリエイターが手がけるブランドが、NEWTONE に集まります。</>
          ) : (
            <>
              出展ブランドは、決定次第こちらで順次公開します。
              <br />
              どんな出会いが待っているか、楽しみにお待ちください。
            </>
          )}
        </p>
      </header>

      <ul className="br__grid" style={{ ['--cols' as string]: Math.min(count, 5) }}>
        {hasBrands
          ? BRANDS.map((b, i) => (
              <li key={b.id} className="br__item" style={{ ['--hue' as string]: HUES[i % HUES.length] }}>
                <BrandCard brand={b} index={i} />
              </li>
            ))
          : Array.from({ length: count }, (_, i) => (
              <li key={i} className="br__item" style={{ ['--hue' as string]: HUES[i % HUES.length], ['--i' as string]: i }}>
                <PlaceholderCard index={i} />
              </li>
            ))}
      </ul>
    </section>
  );
};
