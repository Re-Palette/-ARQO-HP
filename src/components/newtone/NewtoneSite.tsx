'use client';

import { SiteHeader } from './SiteHeader';
import { HeroScene } from './HeroScene';
import { ConceptScene } from './ConceptScene';
import { NextBeautyScene } from './NextBeautyScene';
import { BrandsScene } from './BrandsScene';
import { ExperienceScene } from './ExperienceScene';
import { EntryScene } from './EntryScene';
import { useScrollSync } from './motion';
import './newtone.css';

/** NEWTONE 2027 の特設サイト（Re-Palette/newtone2027 から移植）。ARQO の /projects/newtone に組み込む */
export function NewtoneSite({ fontClassName }: { fontClassName: string }) {
  useScrollSync();
  return (
    <div className={`nt ${fontClassName}`}>
      <SiteHeader />
      <main id="main">
        <HeroScene />
        <ConceptScene />
        <NextBeautyScene />
        <BrandsScene />
        <ExperienceScene />
        <EntryScene />
      </main>
    </div>
  );
}
