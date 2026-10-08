'use client';

import Link from 'next/link';
import React, { useRef } from 'react';
const heroBlur = '/newtone/hero-blur.webp';
const waveB = '/newtone/wave-b.webp';
import { SITE } from './site';
import { ArrowRight, BrushUnderline, Particles, SplitChars } from './parts';
import { gsap, useSceneMotion } from './motion';

const contactHref = SITE.contact.entryUrl ?? (SITE.contact.email ? `mailto:${SITE.contact.email}` : null);

/** SCENE 06 — ENTRY / JOIN ＋ ACCESS / NEWS ＋ フッター */
export const EntryScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { venue, address, schedule } = SITE.access;
  const hasAccess = Boolean(venue || address || schedule);

  useSceneMotion(ref, () => {
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '.entry__inner', start: 'top 75%', end: 'center 50%', scrub: true },
      })
      .fromTo('.entry .wave', { xPercent: 12, opacity: 0 }, { xPercent: 0, opacity: 0.4, duration: 1 }, 0)
      .fromTo('.entry .eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, 0)
      .fromTo('.entry__title .char', { opacity: 0, yPercent: 60 }, { opacity: 1, yPercent: 0, duration: 0.3, stagger: 0.025 }, 0.1)
      .fromTo('.entry .brush-path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.2, stagger: 0.05 }, '>-0.05')
      .fromTo(['.entry__lead', '.entry .cta--main', '.entry__pending'], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.06 }, '>-0.1');

    gsap.fromTo(
      '.info__col',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.info', start: 'top 92%', end: 'top 65%', scrub: true } },
    );
  });

  return (
    <section id="contact" ref={ref} className="scene entry" aria-labelledby="entry-title">
      <div className="scene__sticky">
        <div className="scene__bg" style={{ backgroundImage: `url(${heroBlur})` }} aria-hidden="true">
          <div className="wave" style={{ backgroundImage: `url(${waveB})` }} />
          <Particles count={18} seed={211} />
        </div>
        <div className="entry__inner">
          <p className="eyebrow">04 — Entry / Join</p>
          <h2 id="entry-title" className="entry__title">
            <SplitChars text="次の美容を、" />
            <br />
            <span className="together">
              <SplitChars text="一緒に" />
              <BrushUnderline id="brush-entry" />
            </span>
            <SplitChars text="つくろう。" />
          </h2>
          <p className="entry__lead">あなたの“好き”が、次の美容のはじまりになる。</p>
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
              <p id="entry-pending" className="entry__pending">
                受付窓口は準備が整い次第、こちらでご案内します。
              </p>
            </>
          )}
        </div>
      </div>

      <div className="info">
        <div id="access" className="info__col">
          <h3 className="info__label">ACCESS</h3>
          {hasAccess ? (
            <p className="info__text">
              {schedule && (
                <>
                  {schedule}
                  <br />
                </>
              )}
              {venue && (
                <>
                  {venue}
                  <br />
                </>
              )}
              {address}
            </p>
          ) : (
            <p className="info__text">開催日時・会場は、決定次第お知らせします。</p>
          )}
        </div>
        <div id="news" className="info__col">
          <h3 className="info__label">NEWS</h3>
          {SITE.news.length ? (
            <ul className="info__news">
              {SITE.news.map((n) => (
                <li key={`${n.date}-${n.title}`}>
                  <time>{n.date}</time>
                  {n.url ? <a href={n.url}>{n.title}</a> : <span>{n.title}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="info__text">最新情報は、こちらで順次公開していきます。</p>
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
