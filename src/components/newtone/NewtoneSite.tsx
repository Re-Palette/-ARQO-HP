'use client';

import { SiteHeader } from './SiteHeader';
import { HeroScene } from './HeroScene';
import { ManifestoScene, TickerBand } from './ManifestoScene';
import { ExperienceScene } from './ExperienceScene';
import { CategoriesScene } from './CategoriesScene';
import { BrandsScene } from './BrandsScene';
import { ForYouScene } from './ForYouScene';
import { InfoScene } from './InfoScene';
import { EntryScene } from './EntryScene';
import { useScrollSync } from './motion';
import './newtone.css';
import './scenes.css';

/** NEWTONE 2027 の特設サイト（Re-Palette/newtone2027 から移植）。ARQO の /projects/newtone に組み込む */
export function NewtoneSite() {
  useScrollSync();
  return (
    <div className="nt">
      <SiteHeader />
      <main id="main">
        <HeroScene />
        <ManifestoScene />
        <TickerBand />
        <ExperienceScene />
        <CategoriesScene />
        <BrandsScene />
        <ForYouScene />
        <InfoScene />
        <EntryScene />
      </main>
    </div>
  );
}
