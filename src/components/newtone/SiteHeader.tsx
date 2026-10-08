'use client';

import React, { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from './site';
import { ArrowRight } from './parts';
import { ScrollTrigger } from './motion';

export const SiteHeader: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  // HEROを抜けたらヘッダーに薄いガラス背景を敷く（Reactの再レンダリングなし）
  useEffect(() => {
    const header = ref.current;
    const hero = document.getElementById('top');
    if (!header || !hero) return;
    const st = ScrollTrigger.create({
      trigger: hero,
      start: 'bottom top+=120',
      end: 'max',
      onToggle: (self) => header.classList.toggle('is-solid', self.isActive),
    });
    return () => st.kill();
  }, []);


  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header ref={ref} className="site-header">
        <a href="#top" className="site-logo" aria-label="NEWTONE 2027 トップへ">
          <span className="site-logo__name">NEWTONE</span>
          <span className="site-logo__year">2027</span>
        </a>
        <nav className="site-nav" aria-label="メインナビゲーション">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} style={{ ['--x' as string]: l.x }}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="cta cta--header">
          <span>ENTRY / JOIN</span>
          <ArrowRight className="cta__arrow" />
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </header>
      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="モバイルナビゲーション">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};
