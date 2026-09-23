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

`NEXT_PUBLIC_SITE_URL` に本番URLを設定すると、canonical / OGP / sitemap / robots に反映されます（`.env.example` 参照）。未設定・空・不正な値の場合は Vercel のシステム環境変数（`VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL`）、最後に `http://localhost:3000` にフォールバックします。

## Structure

```
src/
  app/            layout (fonts, metadata, JSON-LD), page, sitemap, robots
  components/
    layout/       Header (glass nav + fullscreen menu), Footer (CTA + giant wordmark)
    sections/     Hero, About, Services, Vision, News
    motion/       SmoothScroll (Lenis), Reveal, TextReveal, Parallax (GSAP)
    ui/           Logo (SVG wordmark), ArrowLink
  lib/content.ts  すべての文言・ダミーデータ（CMS移行時の差し替えポイント）
scripts/generate-placeholders.mjs   ダミー画像ジェネレーター
```

## Sections

| Section  | 演出 |
| -------- | ---- |
| Hero     | フルスクリーンの人物写真。ゆっくりズームイン → スクロールでパララックス、光の反射。白文字のロゴは線を描くアニメーション、ヘッダーも写真上では白 |
| About    | フルスクリーンの写真に白文字（右寄せ）。スクロールに合わせてズームアウトするパララックス、見出しのテキストリビール |
| Services | 横長の写真カード4枚（文字は写真下部にオーバーレイ）。ホバーで浮き上がり＋画像ズーム、タブレット2列、モバイルは横スクロール |
| Vision   | 夕景の都市。スクロールに合わせてインセットのカードがフルブリードへ開き、背景がゆっくりズーム |
| News     | ガラスモーフィズムのカード4件 |
| Footer   | Contact CTA、ナビ、巨大な ARQO ワードマーク（線描アニメーション） |

### スクロール同期アニメーション

| 場所 | 動き |
| ---- | ---- |
| ページ上端 | スクロール量に応じて伸びるプログレスバー |
| Hero / About / Vision | 背景写真のパララックス＋ズーム、About の文章は写真より速く上がる |
| Vision | 見出しの文字がスクロールに合わせて一文字ずつ点灯（`ScrubText`） |
| Services / News | カードごとに移動量を変えた奥行きのあるドリフト（1280px 以上） |
| Footer | 「Let's build」が横からスライド、巨大ロゴがページ末尾でちょうど定位置に収まる |

部品は `src/components/motion/`（`ScrollProgress` / `ScrollDrift` / `ScrubText` / `Parallax`）。

`prefers-reduced-motion` を尊重し、その場合は Lenis・パララックス・スクロール同期の動きをすべて無効化します。

## Images (dummy)

`hero.jpg` / `about.jpg` / `service-*.jpg` / `og.jpg` は本番写真です（生成スクリプトの対象外なので上書きされません）。
それ以外の `public/images/*.jpg` は `npm run images` で SVG から生成したダミーです（外部依存・ライセンスなし）。
同じファイル名・近いアスペクト比の写真で置き換えるだけで本番画像に差し替えられます。

| File | 用途 | 推奨比率 |
| ---- | ---- | ---- |
| `hero.jpg` | Hero 背景（人物・空・都市）※本番写真 | 16:9 |
| `about.jpg` | About 背景（建築・夕景の都市）※本番写真 | 16:9 |
| `service-*.jpg` | Services カード ※本番写真 | 5:6（縦長） |
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
