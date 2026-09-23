/**
 * Site copy and dummy content.
 * Everything visitors read lives here so it can later be moved to a CMS.
 */

export const site = {
  name: "ARQO",
  legalName: "ARQO Inc.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  mission: "人と可能性の間に架け橋をつくる。",
  missionEn: "Building bridges between people and possibility.",
  description:
    "ARQOは、美容・教育・コミュニティ・テクノロジーの4つの事業を通じて、一人ひとりが新しい一歩を踏み出せる機会を創造するソーシャルベンチャーです。",
  contactEmail: "contact@example.com",
  locale: "ja_JP",
} as const;

export const nav = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Service", href: "#service" },
  { label: "Brands", href: "#brands" },
  { label: "Vision", href: "#vision" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
] as const;

export const domains = ["Beauty", "Education", "Community", "Technology"] as const;

export type Service = {
  no: string;
  title: string;
  ja: string;
  description: string;
  image: string;
  tone: "light" | "dark";
};

export const services: Service[] = [
  {
    no: "01",
    title: "Re-Palette",
    ja: "美容福祉事業",
    description: "美容の力で、社会的孤立の状態にある若者の社会参加と自己肯定感の回復を支援します。",
    image: "/images/service-repalette.jpg",
    tone: "light",
  },
  {
    no: "02",
    title: "Education",
    ja: "教育事業",
    description: "人の可能性を広げる学びの場をつくり、未来の選択肢を増やします。",
    image: "/images/service-education.jpg",
    tone: "light",
  },
  {
    no: "03",
    title: "Community & Events",
    ja: "コミュニティ・イベント事業",
    description: "世代や立場を超えて人がつながり、刺激し合う場から新しい価値を生み出します。",
    image: "/images/service-community.jpg",
    tone: "dark",
  },
  {
    no: "04",
    title: "AI & Technology",
    ja: "AI・IT事業",
    description: "テクノロジーで美容・教育・福祉の可能性を拡張し、社会実装まで届けます。",
    image: "/images/service-ai.jpg",
    tone: "dark",
  },
];

export type Brand = {
  name: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
};

export const brands: Brand[] = [
  {
    name: "Re-Palette",
    category: "Beauty & Welfare",
    tagline: "美容を通じた社会参加支援",
    description:
      "ヘアメイクや撮影体験をきっかけに、自分を好きになる一歩をつくる。美容と福祉をつなぐARQOの原点となるプロジェクト。",
    image: "/images/brand-repalette.jpg",
  },
  {
    name: "Nuance Lounge",
    category: "Community",
    tagline: "世代や立場を超えた交流コミュニティ",
    description:
      "学生、社会人、クリエイター、支援者。肩書きを置いて語り合える、開かれたサードプレイス。",
    image: "/images/brand-nuance.jpg",
  },
  {
    name: "NEWTONE",
    category: "Event",
    tagline: "学生主体の次世代ビューティーイベント",
    description:
      "企画から演出まで学生が担う、次世代のためのビューティーステージ。新しい才能が最初に光を浴びる場所。",
    image: "/images/brand-newtone.jpg",
  },
];

export type NewsItem = {
  date: string;
  category: "Event" | "Brand" | "Tech" | "Community";
  title: string;
  excerpt: string;
  image: string;
};

/** Dummy entries — replace with real announcements before launch. */
export const news: NewsItem[] = [
  {
    date: "2026-09-12",
    category: "Event",
    title: "Nuance Lounge 2nd 開催決定",
    excerpt: "学生と社会人が肩書きを越えて語り合う交流イベント「Nuance Lounge」の第2回を開催します。",
    image: "/images/news-event.jpg",
  },
  {
    date: "2026-08-28",
    category: "Brand",
    title: "Re-Palette 公式サイトを公開しました",
    excerpt: "美容福祉プロジェクト Re-Palette の取り組みと参加方法をまとめた公式サイトを公開しました。",
    image: "/images/news-brand.jpg",
  },
  {
    date: "2026-08-05",
    category: "Tech",
    title: "ARQO、AI事業の開発を始動",
    excerpt: "美容・教育・福祉の現場に寄り添うAIプロダクトの研究開発をスタートしました。",
    image: "/images/news-tech.jpg",
  },
  {
    date: "2026-07-18",
    category: "Community",
    title: "NEWTONE 2026 学生スタッフ募集",
    excerpt: "企画・演出・ヘアメイクなど、次世代ビューティーイベントをともにつくる学生を募集します。",
    image: "/images/news-community.jpg",
  },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
] as const;
