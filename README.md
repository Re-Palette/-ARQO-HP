# ARQO Corporate Website

「人と可能性の間に架け橋をつくる。」— ARQO のコーポレートサイト。
美容・教育・コミュニティ・テクノロジーの4事業を展開するソーシャルベンチャーとして、
シリーズA前夜のグローバルスタートアップのトーン（Minimal / Editorial / Cinematic / Airy）で構成しています。

## Stack

- **Next.js 15** (App Router, static prerender) / **TypeScript**
- **Tailwind CSS v4** — デザイントークンは `src/app/globals.css` の `@theme`
- **Framer Motion** — フェードイン、テキストリビール、クリップパス、ホバー
- **GSAP + ScrollTrigger** — スクロール同期パララックス / 画像ズーム
- **Lenis** — スムーススクロール（GSAP ticker で駆動し ScrollTrigger と同期）

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

`NEXT_PUBLIC_SITE_URL` に本番URLを設定すると、canonical / OGP / sitemap / robots に反映されます（`.env.example` 参照）。

## Structure

```
src/
  app/            layout (fonts, metadata, JSON-LD), page, sitemap, robots
  components/
    layout/       Header (glass nav + fullscreen menu), Footer (CTA + giant wordmark)
    sections/     Hero, About, Services, Brands, Vision, News
    motion/       SmoothScroll (Lenis), Reveal, TextReveal, Parallax (GSAP)
    ui/           Logo (SVG wordmark), ArrowLink
  lib/content.ts  すべての文言・ダミーデータ（CMS移行時の差し替えポイント）
scripts/generate-placeholders.mjs   ダミー画像ジェネレーター
```

## Sections

| Section  | 演出 |
| -------- | ---- |
| Hero     | フルスクリーン。背景の空がゆっくりズームイン → スクロールでパララックス。右側はアーチ型（＝架け橋）のビジュアル、ガラスパネルと光の反射。ロゴは線を描くアニメーション |
| About    | 大きな余白。見出しのテキストリビール、建築写真のクリップパス展開 + GSAPパララックス、3つのプリンシプル |
| Services | 4枚の大型カード。デスクトップはホバーでカードが広がり画像がズーム、モバイルは横スクロールスナップ |
| Brands   | ダークセクション。Re-Palette / Nuance Lounge / NEWTONE。ホバーで詳細が展開（タッチ端末では常時表示） |
| Vision   | 夕景の都市。スクロールに合わせてインセットのカードがフルブリードへ開き、背景がゆっくりズーム |
| News     | ガラスモーフィズムのカード4件 |
| Footer   | Contact CTA、ナビ、巨大な ARQO ワードマーク（線描アニメーション） |

`prefers-reduced-motion` を尊重し、その場合は Lenis・パララックスを無効化します。

## Images (dummy)

`public/images/*.jpg` はすべて `npm run images` で SVG から生成したダミーです（外部依存・ライセンスなし）。
同じファイル名・近いアスペクト比の写真で置き換えるだけで本番画像に差し替えられます。

| File | 用途 | 推奨比率 |
| ---- | ---- | ---- |
| `hero.jpg` | Hero 背景（空・都市） | 16:10 |
| `hero-portrait.jpg` | Hero 右側アーチ（人物写真を想定） | 3:4 |
| `about-architecture.jpg` | About（建築・空） | 4:3 |
| `service-*.jpg` | Services カード | 5:7 |
| `brand-*.jpg` | Brands カード | 3:4 |
| `vision.jpg` / `footer.jpg` | 夕景の都市 | 16:9 |
| `news-*.jpg` | News サムネイル | 16:10 |
| `og.jpg` | OGP | 1200×630 |

## SEO

- `metadata`（title template / description / OGP / Twitter / canonical / robots）
- Organization + Brand の JSON-LD
- `sitemap.xml` / `robots.txt`
- セマンティックな見出し構造、`lang="ja"`、スキップリンク、画像の alt

## TODO before launch

- ニュース記事・SNSリンク・問い合わせ先（`src/lib/content.ts`）は仮データです
- 各カードのリンク先はページ内アンカーの仮置きです（下層ページ作成時に差し替え）
