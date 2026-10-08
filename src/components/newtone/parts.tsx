'use client';

import React from 'react';

/** 1文字ずつ span に分割（読み上げ用に元テキストを保持） */
export const SplitChars: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <span className={className}>
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span className="char" key={i}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  </span>
);

export const ArrowRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 34 16" fill="none" aria-hidden="true">
    <path d="M0 8h32M25 1l7 7-7 7" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

/** 参考画像の「未来。」下のピンク〜ブルーの筆致ライン */
export const BrushUnderline: React.FC<{ id: string; className?: string }> = ({ id, className = 'brush-underline' }) => (
  <svg className={className} viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#ff4fa3" />
        <stop offset="0.6" stopColor="#d65ce6" />
        <stop offset="1" stopColor="#6f8bff" />
      </linearGradient>
    </defs>
    <path
      className="brush-path"
      d="M4 30 C 70 22, 150 14, 296 6"
      stroke={`url(#${id})`}
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
      pathLength={1}
    />
    <path
      className="brush-path"
      d="M30 36 C 110 28, 190 22, 270 15"
      stroke={`url(#${id})`}
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
      opacity="0.7"
      pathLength={1}
    />
  </svg>
);

/** スクロールに関係なく常に同じ配置になる、決定的な光の粒子 */
export const Particles: React.FC<{ count: number; seed: number; className?: string }> = ({ count, seed, className = 'particles' }) => {
  const dots = React.useMemo(() => {
    let s = seed;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: count }, () => {
      const size = 2 + rnd() * 7;
      return { left: rnd() * 100, top: rnd() * 100, size, opacity: 0.35 + rnd() * 0.65 };
    });
  }, [count, seed]);
  return (
    <div className={className} aria-hidden="true">
      {dots.map((d, i) => (
        <i key={i} style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size, opacity: d.opacity }} />
      ))}
    </div>
  );
};
