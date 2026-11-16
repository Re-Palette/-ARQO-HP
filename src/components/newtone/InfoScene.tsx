'use client';

import React, { useRef } from 'react';
import { SITE } from './site';
import { gsap, revealOnce, useSceneMotion } from './motion';

const Pending: React.FC = () => (
  <>
    <span className="inf__tba">Coming soon</span>
    <span className="inf__tba-ja">決定次第お知らせします</span>
  </>
);

/**
 * SCENE 07 — INFORMATION（ACCESS / NEWS）
 * 開催概要を1枚の招待状のように見せる。値はすべて site.ts から。未確定の項目は「決定次第お知らせします」。
 */
export const InfoScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { venue, address, schedule } = SITE.access;
  const rows = [
    { en: 'DATE', ja: '開催日時', value: schedule },
    { en: 'VENUE', ja: '会場', value: venue },
    { en: 'ACCESS', ja: 'アクセス', value: address },
  ];

  useSceneMotion(ref, ({ desktop }) => {
    if (!desktop) {
      revealOnce('.inf__head > *', '.inf__head');
      revealOnce('.inf__card', '.inf__card', { y: 50 });
      revealOnce('.inf__news', '.inf__news');
      return;
    }
    gsap
      .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'top 10%', scrub: true } })
      .fromTo('.inf__head > *', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 }, 0)
      .fromTo('.inf__card', { opacity: 0, y: 90, rotate: -2.5 }, { opacity: 1, y: 0, rotate: 0, duration: 0.5, ease: 'power2.out' }, 0.15)
      .fromTo('.inf__row', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.25, stagger: 0.08 }, 0.4)
      .fromTo('.inf__news', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4 }, 0.4);
  });

  return (
    <section ref={ref} className="inf" aria-labelledby="inf-title">
      <header className="inf__head">
        <p className="eyebrow">06 — Information</p>
        <h2 id="inf-title" className="inf__title">
          <span className="inf__en" aria-hidden="true">
            INFORMATION
          </span>
          <span className="inf__ja">開催概要</span>
        </h2>
      </header>

      <div className="inf__grid">
        <div id="access" className="inf__card">
          <div className="inf__stub" aria-hidden="true">
            <p className="inf__stub-logo">
              NEWTONE
              <span>2027</span>
            </p>
            <p className="inf__stub-script">The Next Beauty.</p>
            <p className="inf__stub-note">BEAUTY BRAND POPUP</p>
          </div>
          <dl className="inf__rows">
            {rows.map((r) => (
              <div key={r.en} className="inf__row">
                <dt>
                  <span className="inf__dt-en" aria-hidden="true">
                    {r.en}
                  </span>
                  <span className="inf__dt-ja">{r.ja}</span>
                </dt>
                <dd className={r.value ? undefined : 'is-pending'}>{r.value ?? <Pending />}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="news" className="inf__news">
          <h3 className="inf__news-title">NEWS</h3>
          {SITE.news.length ? (
            <ul className="inf__news-list">
              {SITE.news.map((n) => (
                <li key={`${n.date}-${n.title}`}>
                  <time>{n.date}</time>
                  {n.url ? <a href={n.url}>{n.title}</a> : <span>{n.title}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="inf__news-empty">
              最新情報は、こちらで順次公開していきます。
              <br />
              開催日時・会場・出展ブランドの発表を、どうぞお楽しみに。
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
