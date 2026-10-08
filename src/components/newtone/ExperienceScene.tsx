'use client';

import React, { useRef } from 'react';
import { EXPERIENCE_CATEGORIES } from './site';
import { gsap, useSceneMotion } from './motion';

const pad = (n: number) => String(n).padStart(2, '0');
const TOTAL = EXPERIENCE_CATEGORIES.length;

/** 切り替えにかける長さ（1カテゴリー=1単位のうち） */
const SWITCH = 0.5;
/** クリップは同じ書式で統一（Anton の字形が切れないよう上下左右に余白を持たせる） */
const CLIP_SHOWN = 'inset(-25% -5% -25% -5%)';
const CLIP_BELOW = 'inset(125% -5% -25% -5%)';
const CLIP_ABOVE = 'inset(-25% -5% 125% -5%)';
const ITEM_ACTIVE = { opacity: 1, color: '#ff4fa3', x: -10 };
const ITEM_IDLE = { opacity: 0.5, color: '#ffffff', x: 0 };

/** SCENE 05 — POPUP EXPERIENCE：HERO右側のカテゴリー表記を発展させ、スクロールで切り替える */
export const ExperienceScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useSceneMotion(ref, ({ desktop }) => {
    if (!desktop) {
      gsap.utils.toArray<HTMLElement>('.exp__item').forEach((item) => {
        gsap.fromTo(
          item.querySelector('.exp__item-word'),
          { clipPath: 'inset(-20% 100% -20% 0%)' },
          { clipPath: 'inset(-20% 0% -20% 0%)', ease: 'none', scrollTrigger: { trigger: item, start: 'top 88%', end: 'top 55%', scrub: true } },
        );
      });
      return;
    }

    const words = gsap.utils.toArray<HTMLElement>('.exp__word');
    const copies = gsap.utils.toArray<HTMLElement>('.exp__copy');
    const nums = gsap.utils.toArray<HTMLElement>('.exp__counter b');
    const items = gsap.utils.toArray<HTMLElement>('.exp__list li');
    const orbs = gsap.utils.toArray<HTMLElement>('.exp__orb');

    // 状態はすべて明示する（逆スクロール・再訪問・途中からの読み込みでも同じ見た目に戻る）
    gsap.set(words, { clipPath: CLIP_BELOW, yPercent: 35 });
    gsap.set(words[0], { clipPath: CLIP_SHOWN, yPercent: 0 });
    gsap.set(copies, { autoAlpha: 0, y: 20 });
    gsap.set(copies[0], { autoAlpha: 1, y: 0 });
    gsap.set(nums, { autoAlpha: 0 });
    gsap.set(nums[0], { autoAlpha: 1 });
    gsap.set(items, ITEM_IDLE);
    gsap.set(items[0], ITEM_ACTIVE);
    gsap.set(orbs, { opacity: 0 });
    gsap.set(orbs[0], { opacity: 1 });

    // 1カテゴリー = 1単位。各単位の前後 1/4 で切り替え、残り半分は静止して読める時間にする
    const tl = gsap.timeline({
      defaults: { ease: 'none', immediateRender: false },
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom bottom', scrub: true },
    });
    tl.fromTo('.exp__head', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: true }, 0);

    for (let i = 1; i < TOTAL; i++) {
      const at = i - SWITCH / 2;
      const ease = 'power2.inOut';
      // 前の単語は上へ抜け、同時に次の単語が下から立ち上がる（中央が空になる瞬間を作らない）
      tl.fromTo(words[i - 1], { clipPath: CLIP_SHOWN, yPercent: 0 }, { clipPath: CLIP_ABOVE, yPercent: -35, duration: SWITCH, ease }, at)
        .fromTo(words[i], { clipPath: CLIP_BELOW, yPercent: 35 }, { clipPath: CLIP_SHOWN, yPercent: 0, duration: SWITCH, ease }, at)
        .fromTo(copies[i - 1], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -20, duration: SWITCH * 0.5 }, at)
        .fromTo(copies[i], { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: SWITCH * 0.5 }, at + SWITCH * 0.5)
        .fromTo(nums[i - 1], { autoAlpha: 1 }, { autoAlpha: 0, duration: SWITCH * 0.3 }, at + SWITCH * 0.35)
        .fromTo(nums[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: SWITCH * 0.3 }, at + SWITCH * 0.35)
        .fromTo(items[i - 1], ITEM_ACTIVE, { ...ITEM_IDLE, duration: SWITCH }, at)
        .fromTo(items[i], ITEM_IDLE, { ...ITEM_ACTIVE, duration: SWITCH }, at)
        .fromTo(orbs[i - 1], { opacity: 1 }, { opacity: 0, duration: SWITCH }, at)
        .fromTo(orbs[i], { opacity: 0 }, { opacity: 1, duration: SWITCH }, at);
    }
    // 全体の長さを TOTAL 単位にそろえる（最後のカテゴリーも同じだけ静止）
    tl.to({}, { duration: 0.001 }, TOTAL - 0.001);
  });

  return (
    <section id="program" ref={ref} className="scene scene--pin experience" aria-labelledby="exp-title">
      <div className="scene__sticky">
        <div className="scene__bg" aria-hidden="true">
          {EXPERIENCE_CATEGORIES.map((c) => (
            <div key={c.key} className="exp__orb" style={{ ['--orb' as string]: c.hue }} />
          ))}
        </div>

        {/* Desktop：ピン留めして1カテゴリーずつ切り替え */}
        <div className="exp__desk" aria-hidden="true">
          <div className="exp__head">
            <p className="eyebrow">03 — Popup Experience</p>
            <p className="exp__title">
              POPUP
              <br />
              EXPERIENCE
            </p>
          </div>
          <div className="exp__words">
            {EXPERIENCE_CATEGORIES.map((c) => (
              <span key={c.key} className="exp__word">
                {c.key}
              </span>
            ))}
          </div>
          {EXPERIENCE_CATEGORIES.map((c) => (
            <p key={c.key} className="exp__copy">
              {c.copy}
            </p>
          ))}
          <p className="exp__counter">
            <span style={{ position: 'relative', display: 'inline-block', minWidth: '2ch' }}>
              {EXPERIENCE_CATEGORIES.map((c, i) => (
                <b key={c.key} style={i ? { position: 'absolute', left: 0, top: 0 } : undefined}>
                  {pad(i + 1)}
                </b>
              ))}
            </span>{' '}
            / {pad(TOTAL)}
          </p>
          <ul className="exp__list">
            {EXPERIENCE_CATEGORIES.map((c) => (
              <li key={c.key}>{c.key}</li>
            ))}
          </ul>
        </div>

        {/* スマートフォン / 静的表示：読みやすいリスト */}
        <div className="exp__mobile">
          <p className="eyebrow">03 — Popup Experience</p>
          <h2 id="exp-title" className="exp__title">
            POPUP
            <br />
            EXPERIENCE
          </h2>
          {EXPERIENCE_CATEGORIES.map((c, i) => (
            <div key={c.key} className="exp__item" style={{ ['--hue' as string]: c.hue }}>
              <span className="exp__item-no">
                {pad(i + 1)} / {pad(TOTAL)}
              </span>
              <span className="exp__item-word">{c.key}</span>
              <p className="exp__item-copy">{c.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
