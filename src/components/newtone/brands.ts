/**
 * 参加ブランドのデータ。
 * 出展が確定したブランドのみ追加してください。空配列の間は「COMING SOON」の枠が表示されます。
 *
 * 画像は public/newtone/brands/ に置き、パスで指定してください:
 *   { id: 'foo', name: 'FOO', concept: '...', logo: '/newtone/brands/foo-logo.png', image: '/newtone/brands/foo.jpg' }
 */

export interface Brand {
  id: string;
  /** ブランド名（表記はブランド指定どおりに） */
  name: string;
  /** ブランドコンセプト（1〜2文程度） */
  concept: string;
  /** ロゴ画像（任意） */
  logo?: string;
  /** 商品・キービジュアル画像（任意） */
  image?: string;
  /** EXPERIENCE のカテゴリー名（任意） */
  category?: string;
  /** 公式サイト / SNS（任意） */
  url?: string;
}

export const BRANDS: Brand[] = [];

/** 未登録時に表示する枠の数 */
export const BRAND_PLACEHOLDER_COUNT = 5;
