'use client';

import React, { useRef } from 'react';
import { Phrases } from './parts';
import { gsap, revealOnce, useSceneMotion } from './motion';

const waveA = '/newtone/wave-a.webp';
const waveB = '/newtone/wave-b.webp';
const crowd = '/newtone/crowd.webp';

interface Experience {
  en: string;
  title: string;
  text: string;
  hue: string;
  art: 'wave-b' | 'crowd' | 'wave-a' | 'orbs';
}

/** 会場での過ごし方。具体的な特典・プログラムは確定後に追記する（ここでは約束しない表現にとどめる） */
const EXPERIENCES: Experience[] = [
  {
    en: 'TOUCH & TRY',
    title: '触れて、試して、|確かめる。',
    text: '気になったアイテムは、その場で手に取って。質感も、色も、香りも。画面越しではわからないことを、自分の感覚で。',
    hue: '#ff6bb5',
    art: 'wave-b',
  },
  {
    en: 'MEET THE FOUNDERS',
    title: 'つくり手に、|会える。',
    text: 'ブランドを立ち上げた本人が、すぐそこに。生まれたきっかけも、こだわりも、直接聞ける距離で。',
    hue: '#c9a6ff',
    art: 'crowd',
  },
  {
    en: 'FIND YOUR NEXT',
    title: '知らない“好き”を、|見つける。',
    text: 'コスメからフレグランスまで。次の定番になるかもしれないブランドに、誰よりも早く出会う。',
    hue: '#8fa6ff',
    art: 'wave-a',
  },
  {
    en: 'TAKE IT HOME',
    title: 'お気に入りを、|連れて帰る。',
    text: '心が動いたものは、あなたの毎日へ。ここでの出会いが、明日の美容をすこし変えていく。',
    hue: '#ff9fd0',
    art: 'orbs',
  },
];

const artStyle = (art: Experience['art']): React.CSSProperties | undefined => {
  if (art === 'wave-b') return { backgroundImage: `url(${waveB})` };
  if (art === 'wave-a') return { backgroundImage: `url(${waveA})` };
  if (art === 'crowd') return { backgroundImage: `url(${crowd})` };
  return undefined;
};

/**
 * SCENE 03 — EXPERIENCE
 * デスクトップ：1画面ぶんをピン留めし、縦スクロールで4つの体験が横へ流れるギャラリー。
 * スマートフォン：ピン留めせず、指で横にめくるカード。
 */
export const ExperienceScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useSceneMotion(ref, ({ desktop, scope }) => {
    if (desktop) {
      const track = scope.querySelector<HTMLElement>('.xp__track');
      if (!track) return;
      // 幅の計測は refresh 時のみ（スクロール中はレイアウトを読まない）
      const distance = () => -(track.scrollWidth - window.innerWidth);
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true },
        })
        .to(track, { x: distance, duration: 1 }, 0)
        .fromTo('.xp__art-in', { xPercent: -7 }, { xPercent: 7, duration: 1 }, 0)
        .fromTo('.xp__progress i', { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
        .to('.xp__hint', { opacity: 0, duration: 0.08 }, 0.02);

      // ピン留めされる直前に、見出しとカードが立ち上がる
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: scope, start: 'top 70%', end: 'top top', scrub: true },
        })
        .fromTo('.xp__intro > *', { opacity: 0, y: 46 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0)
        .fromTo('.xp__card', { opacity: 0, y: 90 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, 0.2);
      return;
    }
    revealOnce('.xp__intro > *', '.xp__intro');
    revealOnce('.xp__card', '.xp__cards', { y: 0, x: 44, stagger: 0.1 });
  });

  return (
    <section id="program" ref={ref} className="xp" aria-labelledby="xp-title">
      <div className="xp__sticky">
        <div className="xp__bg" aria-hidden="true" />
        <div className="xp__track">
          <header className="xp__intro">
            <p className="eyebrow">02 — Experience</p>
            <h2 id="xp-title" className="xp__title">
              <span className="xp__en" aria-hidden="true">
                WHAT <i>AWAITS</i> YOU
              </span>
              <span className="xp__ja">
                <Phrases text="ここでしか出会えない、|4つの体験。" />
              </span>
            </h2>
            <p className="xp__lead">
              見て、触れて、話して、持ち帰る。
              <br />
              NEWTONE は、次の美容を全身で確かめにいく場所です。
            </p>
            <p className="xp__hint" aria-hidden="true">
              <span>SCROLL</span>
              <svg viewBox="0 0 60 12" fill="none">
                <path d="M0 6h58M52 1l6 5-6 5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </p>
          </header>

          <ol className="xp__cards">
            {EXPERIENCES.map((x, i) => (
              <li key={x.en} className="xp__card" style={{ ['--hue' as string]: x.hue }}>
                <div className={`xp__art xp__art--${x.art}`} aria-hidden="true">
                  <div className="xp__art-in" style={artStyle(x.art)}>
                    {x.art === 'orbs' && (
                      <>
                        <i className="xp__orb xp__orb--a" />
                        <i className="xp__orb xp__orb--b" />
                        <i className="xp__orb xp__orb--c" />
                      </>
                    )}
                  </div>
                  {x.art === 'crowd' && (
                    <>
                      <i className="xp__ring xp__ring--a" />
                      <i className="xp__ring xp__ring--b" />
                    </>
                  )}
                  <span className="xp__num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="xp__label">{x.en}</p>
                <h3 className="xp__card-title">
                  <Phrases text={x.title} />
                </h3>
                <p className="xp__text">{x.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="xp__progress" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
};
