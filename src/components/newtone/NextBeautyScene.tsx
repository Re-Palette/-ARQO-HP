'use client';

import React, { useRef } from 'react';
const waveB = '/newtone/wave-b.webp';
import { Particles, SplitChars } from './parts';
import { gsap, useSceneMotion } from './motion';

/** SCENE 03 — THE NEXT BEAUTY：巨大タイポとマスクで次の美容の可能性を展開 */
export const NextBeautyScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useSceneMotion(ref, ({ desktop }) => {
    // 画面に入ってくる間に、2行の巨大タイポが左右から交差して現れる
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: desktop ? 'top top' : 'top 15%', scrub: true },
      })
      .fromTo('.nb__big--a', { xPercent: 28 }, { xPercent: 0 }, 0)
      .fromTo('.nb__big--b', { xPercent: -28 }, { xPercent: 0 }, 0)
      .fromTo('.nb__typo .blob', { scale: 0.7 }, { scale: 1 }, 0);

    if (!desktop) {
      gsap
        .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.nb__script', start: 'top 90%', end: 'top 50%', scrub: true } })
        .fromTo('.nb__script', { clipPath: 'inset(-20% 100% -20% 0)' }, { clipPath: 'inset(-20% 0% -20% 0)' });
      gsap.utils.toArray<HTMLElement>('.nb__copy').forEach((copy) => {
        gsap.fromTo(
          copy.querySelectorAll('.char'),
          { opacity: 0, yPercent: 50 },
          { opacity: 1, yPercent: 0, stagger: 0.03, ease: 'none', scrollTrigger: { trigger: copy, start: 'top 85%', end: 'center 55%', scrub: true } },
        );
      });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom bottom', scrub: true },
    });
    tl.fromTo('.nb__script', { clipPath: 'inset(-20% 100% -20% 0)' }, { clipPath: 'inset(-20% 0% -20% 0)', duration: 0.2 }, 0.02)
      .to('.nb__big--a', { xPercent: -8, duration: 0.4 }, 0)
      .to('.nb__big--b', { xPercent: 8, duration: 0.4 }, 0)
      // 光の円がひらき、次のコピーの世界へ
      .fromTo('.nb__reveal', { clipPath: 'circle(0% at 50% 54%)' }, { clipPath: 'circle(80% at 50% 54%)', duration: 0.26 }, 0.26)
      .fromTo('.nb__reveal .wave', { scale: 1.25, rotate: -6 }, { scale: 1, rotate: 0, duration: 0.6 }, 0.26)
      .fromTo('.nb__copy--1 .char', { opacity: 0, yPercent: 60 }, { opacity: 1, yPercent: 0, duration: 0.1, stagger: 0.01 }, 0.4)
      .to('.nb__copy--1', { yPercent: -18, opacity: 0, duration: 0.12 }, 0.64)
      .fromTo('.nb__copy--2', { clipPath: 'inset(100% 0 0 0)', yPercent: 12 }, { clipPath: 'inset(0% 0 0 0)', yPercent: 0, duration: 0.14 }, 0.7)
      .fromTo('.nb__copy--2 .tagline', { opacity: 0, letterSpacing: '0.9em' }, { opacity: 1, letterSpacing: '0.4em', duration: 0.12 }, 0.8)
      .to('.nb__reveal .blob--1', { xPercent: 40, yPercent: -20, duration: 0.5 }, 0.5)
      .to('.nb__reveal .blob--2', { xPercent: -30, yPercent: 20, duration: 0.5 }, 0.5);
  });

  return (
    <section ref={ref} className="scene scene--pin nextbeauty" aria-label="The Next Beauty">
      <div className="scene__sticky">
        <div className="scene__bg" aria-hidden="true" />
        <div className="nb__typo">
          <div className="blob blob--1" style={{ width: '42vw', height: '42vw', left: '-8vw', top: '8vh', ['--blob' as string]: '#ff4fa3', opacity: 0.7 }} aria-hidden="true" />
          <div className="blob blob--2" style={{ width: '46vw', height: '46vw', right: '-10vw', bottom: '-6vh', ['--blob' as string]: '#4f6dff', opacity: 0.8 }} aria-hidden="true" />
          <h2 className="sr-only">The Next Beauty.</h2>
          <span className="nb__big nb__big--a" aria-hidden="true">The Next</span>
          <span className="nb__big nb__big--b" aria-hidden="true">Beauty</span>
          <span className="nb__script" aria-hidden="true">The Next Beauty.</span>
        </div>
        <div className="nb__reveal">
          <div className="wave" style={{ backgroundImage: `url(${waveB})` }} aria-hidden="true" />
          <div className="blob blob--1" style={{ width: '36vw', height: '36vw', left: '6vw', top: '10vh', ['--blob' as string]: '#ff4fa3', opacity: 0.6 }} aria-hidden="true" />
          <div className="blob blob--2" style={{ width: '40vw', height: '40vw', right: '4vw', bottom: '0', ['--blob' as string]: '#4f6dff', opacity: 0.6 }} aria-hidden="true" />
          <Particles count={30} seed={57} />
          <div className="nb__copy nb__copy--1">
            <h3>
              <SplitChars text="まだ知らない" />
              <br />
              <SplitChars text="美しさと、出会おう。" />
            </h3>
          </div>
          <div className="nb__copy nb__copy--2">
            <h3>
              未来の“好き”に、
              <br />
              きっと出会える。
            </h3>
            <p className="tagline">
              DISCOVER. <span className="accent-pink">CONNECT.</span> INSPIRE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
