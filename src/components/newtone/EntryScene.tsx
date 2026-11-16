'use client';

import Link from 'next/link';
import React, { useRef } from 'react';
const heroBlur = '/newtone/hero-blur.webp';
const waveB = '/newtone/wave-b.webp';
const crowd = '/newtone/crowd.webp';
import { SITE } from './site';
import { ArrowRight, BrushUnderline, Particles, SplitChars } from './parts';
import { gsap, revealOnce, useSceneMotion } from './motion';

const contactHref = SITE.contact.entryUrl ?? (SITE.contact.email ? `mailto:${SITE.contact.email}` : null);

/**
 * SCENE 08 — ENTRY / JOIN ＋ フッター
 * 最後は HERO の光へ戻り、大きなコピーと1つのボタンだけを残す。
 */
export const EntryScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useSceneMotion(ref, ({ desktop }) => {
    // 背景の巨大ロゴと光は、場面を通り過ぎるあいだずっとゆっくり流れる
    gsap
      .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.en__stage', start: 'top bottom', end: 'bottom top', scrub: true } })
      .fromTo('.en__mega', { xPercent: 0 }, { xPercent: -30, duration: 1 }, 0)
      .fromTo('.en .wave', { xPercent: 14, yPercent: 6 }, { xPercent: -6, yPercent: -6, duration: 1 }, 0)
      .fromTo('.en__crowd', { yPercent: 22 }, { yPercent: 0, duration: 0.6 }, 0);

    if (!desktop) {
      revealOnce(['.en .eyebrow', '.en__script', '.en__title', '.en__lead', '.en .cta--main', '.en__pending'], '.en__inner', { stagger: 0.1 });
      return;
    }
    gsap
      .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.en__inner', start: 'top 82%', end: 'center 52%', scrub: true } })
      .fromTo('.en .eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.15 }, 0)
      .fromTo('.en__script', { opacity: 0, xPercent: -12 }, { opacity: 1, xPercent: 0, duration: 0.25, ease: 'power2.out' }, 0.05)
      .fromTo('.en__title .char', { opacity: 0, yPercent: 70 }, { opacity: 1, yPercent: 0, duration: 0.3, stagger: 0.025, ease: 'power2.out' }, 0.12)
      .fromTo('.en .brush-path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.2, stagger: 0.05 }, '>-0.08')
      .fromTo(['.en__lead', '.en .cta--main', '.en__pending'], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.22, stagger: 0.07 }, '>-0.12');
  });

  return (
    <section id="contact" ref={ref} className="en" aria-labelledby="entry-title">
      <div className="en__stage">
        <div className="en__bg" style={{ backgroundImage: `url(${heroBlur})` }} aria-hidden="true">
          <div className="wave" style={{ backgroundImage: `url(${waveB})` }} />
          <div className="en__crowd" style={{ backgroundImage: `url(${crowd})` }} />
          <Particles count={16} seed={211} />
        </div>
        <p className="en__mega" aria-hidden="true">
          <span>NEWTONE 2027</span>
          <span>NEWTONE 2027</span>
          <span>NEWTONE 2027</span>
        </p>
        <div className="en__inner">
          <p className="eyebrow">07 — Entry / Join</p>
          <p className="en__script" aria-hidden="true">
            See you there.
          </p>
          <h2 id="entry-title" className="en__title">
            <SplitChars text="次の" />
            <span className="en__mark">
              <SplitChars text="“好き”" />
              <BrushUnderline id="brush-entry" />
            </span>
            <SplitChars text="に、" />
            <br />
            <SplitChars text="会いにきて。" />
          </h2>
          <p className="en__lead">
            あなたの“好き”が、次の美容のはじまりになる。
            <br />
            NEWTONE 2027 で、お待ちしています。
          </p>
          {contactHref ? (
            <a
              className="cta cta--main"
              href={contactHref}
              {...(SITE.contact.entryUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span>参加・お問い合わせ</span>
              <ArrowRight className="cta__arrow" />
            </a>
          ) : (
            <>
              <span className="cta cta--main" role="link" aria-disabled="true" aria-describedby="entry-pending">
                <span>参加・お問い合わせ</span>
                <ArrowRight className="cta__arrow" />
              </span>
              <p id="entry-pending" className="en__pending">
                受付窓口は準備が整い次第、こちらでご案内します。
              </p>
            </>
          )}
        </div>
      </div>

      <footer className="site-footer">
        <a href="#top" className="site-logo" aria-label="NEWTONE 2027 トップへ">
          <span className="site-logo__name">NEWTONE</span>
          <span className="site-logo__year">2027</span>
        </a>
        <p className="site-footer__tag">
          DISCOVER. <span className="accent-pink">CONNECT.</span> INSPIRE.
        </p>
        <p className="site-footer__copy">© NEWTONE 2027 — by NEXT BEAUTY ENTREPRENEURS.</p>
        <Link href="/" className="site-footer__arqo">
          Organized by ARQO
          <ArrowRight className="cta__arrow" />
        </Link>
      </footer>
    </section>
  );
};
