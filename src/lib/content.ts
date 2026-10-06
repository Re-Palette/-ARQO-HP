/**
 * Site copy and dummy content.
 * Everything visitors read lives here so it can later be moved to a CMS.
 */

/**
 * Canonical origin. Falls back to Vercel's system env vars, then localhost.
 * Empty or scheme-less values (e.g. "arqo.jp") are tolerated.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];
  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    const withScheme = /^https?:\/\//.test(value) ? value : `https://${value}`;
    try {
      return new URL(withScheme).origin;
    } catch {
      // ignore malformed values and try the next candidate
    }
  }
  return "http://localhost:3000";
}

export const site = {
  name: "ARQO",
  legalName: "ARQO Inc.",
  url: resolveSiteUrl(),
  mission: "人と可能性の間に架け橋をつくる。",
  missionEn: "Building bridges between people and possibility.",
  description:
    "ARQOは、美容・教育・コミュニティ・テクノロジーの4つの事業を通じて、一人ひとりが新しい一歩を踏み出せる機会を創造するソーシャルベンチャーです。",
  contactEmail: "contact@example.com",
  locale: "ja_JP",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Service", href: "/service" },
  { label: "Vision", href: "/#vision" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

export const domains = ["Beauty", "Education", "Community", "Technology"] as const;

export type Service = {
  slug: string;
  no: string;
  title: string;
  ja: string;
  /** "\n" marks the preferred line break on the narrow home cards. */
  description: string;
  image: string;
  /** Detail page */
  lead: string;
  body: string[];
  pillars: { en: string; title: string; text: string }[];
  initiatives?: { name: string; text: string }[];
};

export const services: Service[] = [
  {
    slug: "re-palette",
    no: "01",
    title: "Re-Palette",
    ja: "美容福祉事業",
    description: "美容を通じて、社会的孤立状態にある\n若者の社会復帰を支援します。",
    image: "/images/service-repalette.jpg",
    lead: "美容は、自分を好きになるためのいちばん身近な入口。",
    body: [
      "社会的孤立やひきこもりの状態にある若者にとって、「外に出る理由」や「誰かと関わるきっかけ」は簡単には見つかりません。Re-Paletteは、ヘアメイクや撮影といった美容体験を入口に、自己肯定感の回復と社会との再接続を支えるプログラムです。",
      "美容師・メイクアップアーティスト・支援者がチームとなり、一人ひとりのペースに合わせて伴走。「変わった自分」を体験することから、次の一歩を一緒につくります。",
    ],
    pillars: [
      { en: "Experience", title: "美容体験", text: "プロによるヘアメイク・撮影で、新しい自分に出会う時間をつくります。" },
      { en: "Accompany", title: "伴走支援", text: "支援機関と連携し、体験後も継続的に関わりながら社会参加を後押しします。" },
      { en: "Connect", title: "社会との接続", text: "イベント出演や仕事体験など、次のステージにつながる機会を用意します。" },
    ],
    initiatives: [
      { name: "Re-Palette", text: "美容を通じた社会参加支援プロジェクト。ARQOの原点となる取り組みです。" },
    ],
  },
  {
    slug: "education",
    no: "02",
    title: "Education",
    ja: "教育事業",
    description: "人の可能性を広げる教育を通じて、\n未来の選択肢を増やします。",
    image: "/images/service-education.jpg",
    lead: "学びの選択肢が、人生の選択肢になる。",
    body: [
      "どこで生まれ、どんな環境で育ったかによって、出会える学びは大きく変わります。ARQOの教育事業は、学校や家庭だけでは届きにくい実践的な学びを、次世代に開いていく取り組みです。",
      "美容・クリエイティブ・テクノロジーなど、ARQOの事業現場そのものを教材に。実際の仕事に触れる経験を通じて、「やってみたい」を「できる」に変えていきます。",
    ],
    pillars: [
      { en: "Workshop", title: "実践型ワークショップ", text: "現場のプロと一緒に手を動かし、仕事のリアルを体験する学びの場。" },
      { en: "Career", title: "キャリア教育", text: "多様な働き方・生き方に触れ、自分の進路を自分で選べる力を育てます。" },
      { en: "Mentoring", title: "メンタリング", text: "少し先を行く先輩が伴走し、挑戦を続けられる関係性をつくります。" },
    ],
  },
  {
    slug: "community",
    no: "03",
    title: "Community & Events",
    ja: "コミュニティ・イベント事業",
    description: "人と人がつながり、挑戦し合う場をつくり、\n新しい価値を生み出します。",
    image: "/images/service-community.jpg",
    lead: "人と人が出会う場所から、新しい価値が生まれる。",
    body: [
      "世代や立場、肩書きを越えて人がつながる場は、誰かの挑戦を後押しする力を持っています。ARQOは、交流コミュニティやイベントの企画・運営を通じて、出会いが次のアクションにつながる仕組みをつくります。",
      "学生が主体となるステージから、社会人と学生が語り合うラウンジまで。参加する人自身が担い手になる、循環するコミュニティを育てています。",
    ],
    pillars: [
      { en: "Community", title: "コミュニティ運営", text: "学生・社会人・クリエイターが継続的に関わり合える場を運営します。" },
      { en: "Events", title: "イベント企画・制作", text: "企画から演出・運営まで、参加者が主役になるイベントをつくります。" },
      { en: "Partnership", title: "企業・団体との共創", text: "企業や自治体と連携し、社会課題に向き合う場を共につくります。" },
    ],
    initiatives: [
      { name: "Nuance Lounge", text: "世代や立場を超えて語り合える、開かれた交流コミュニティ。" },
      { name: "NEWTONE", text: "企画から演出まで学生が担う、次世代のビューティーイベント。" },
    ],
  },
  {
    slug: "ai-technology",
    no: "04",
    title: "AI & Technology",
    ja: "AI・IT事業",
    description: "テクノロジーで、教育・美容・福祉の\n可能性を広げます。",
    image: "/images/service-ai.jpg",
    lead: "テクノロジーで、想いを仕組みに変える。",
    body: [
      "美容・教育・福祉の現場には、人の手でしか届けられない価値と、仕組み化することで多くの人に届けられる価値があります。ARQOのAI・IT事業は、その両方をつなぐためのテクノロジーを開発します。",
      "現場で生まれた知見をプロダクトに落とし込み、支援の質を保ったまま、届けられる人の数を増やしていく。社会インフラとしてのテクノロジーを目指します。",
    ],
    pillars: [
      { en: "AI", title: "AIプロダクト開発", text: "美容・教育・福祉の現場に寄り添うAIツールの研究・開発を行います。" },
      { en: "DX", title: "現場のDX支援", text: "支援機関や事業者の業務をデジタル化し、本来の活動に集中できる環境をつくります。" },
      { en: "Data", title: "データ活用", text: "取り組みの成果を可視化し、より良い支援のあり方を検証します。" },
    ],
  },
];

export type NewsItem = {
  slug: string;
  date: string;
  category: "Event" | "Brand" | "Tech" | "Community";
  title: string;
  excerpt: string;
  image: string;
  body: string[];
};

/** Dummy entries — replace with real announcements before launch. */
export const news: NewsItem[] = [
  {
    slug: "nuance-lounge-2nd",
    date: "2026-09-12",
    category: "Event",
    title: "Nuance Lounge 2nd 開催決定",
    excerpt: "学生と社会人が肩書きを越えて語り合う交流イベント「Nuance Lounge」の第2回を開催します。",
    image: "/images/news-event.jpg",
    body: [
      "学生と社会人が肩書きを越えて語り合う交流イベント「Nuance Lounge」の第2回を開催します。",
      "前回は学生・社会人あわせて多くの方にご参加いただき、進路やキャリア、挑戦したいことについて少人数で語り合う時間となりました。第2回では、テーマ別のトークセッションに加え、参加者同士がつながり続けられる仕組みも用意します。",
      "日時・会場・申込方法の詳細は、決まり次第こちらのページでお知らせします。",
    ],
  },
  {
    slug: "re-palette-website",
    date: "2026-08-28",
    category: "Brand",
    title: "Re-Palette 公式サイトを公開しました",
    excerpt: "美容福祉プロジェクト Re-Palette の取り組みと参加方法をまとめた公式サイトを公開しました。",
    image: "/images/news-brand.jpg",
    body: [
      "美容福祉プロジェクト Re-Palette の取り組みと参加方法をまとめた公式サイトを公開しました。",
      "サイトでは、プログラムの流れや参加者の声、連携している支援機関・サロンの紹介を掲載しています。プログラムへの参加や、美容師・メイクアップアーティストとしての協力に関するお問い合わせも受け付けています。",
      "今後も活動の様子を随時更新していきます。",
    ],
  },
  {
    slug: "ai-business-launch",
    date: "2026-08-05",
    category: "Tech",
    title: "ARQO、AI事業の開発を始動",
    excerpt: "美容・教育・福祉の現場に寄り添うAIプロダクトの研究開発をスタートしました。",
    image: "/images/news-tech.jpg",
    body: [
      "美容・教育・福祉の現場に寄り添うAIプロダクトの研究開発をスタートしました。",
      "これまでの事業で得た現場の知見をもとに、支援者の業務負担を減らし、より多くの人に質の高い支援を届けるためのツールを開発します。まずは社内の各事業で検証を重ね、段階的に外部への提供を目指します。",
      "開発パートナー・実証フィールドとしてご協力いただける企業・団体の方は、お問い合わせフォームよりご連絡ください。",
    ],
  },
  {
    slug: "newtone-2026-staff",
    date: "2026-07-18",
    category: "Community",
    title: "NEWTONE 2026 学生スタッフ募集",
    excerpt: "企画・演出・ヘアメイクなど、次世代ビューティーイベントをともにつくる学生を募集します。",
    image: "/images/news-community.jpg",
    body: [
      "企画・演出・ヘアメイクなど、次世代ビューティーイベント NEWTONE をともにつくる学生スタッフを募集します。",
      "NEWTONE は、企画から当日の運営まで学生が主体となってつくり上げるビューティーイベントです。経験の有無は問いません。「何かに本気で取り組んでみたい」という方の参加をお待ちしています。",
      "募集職種や説明会の日程は、決まり次第お知らせします。",
    ],
  },
];

export const vision = {
  lines: ["美容・教育・コミュニティ・テクノロジーで、", "誰もが自分らしく生きられる", "社会をつくる。"],
  en: "Infrastructure for every possibility.",
  text: "生まれた環境や今いる場所に関わらず、誰もが「次の一歩」を自分で選べる社会。ARQOは、そのための機会と仕組みを、事業として持続可能なかたちでつくり続けます。",
};

export const mission = {
  lines: ["人と可能性の間に", "架け橋をつくる。"],
  en: "Building bridges between people and possibility.",
  text: "可能性は、すべての人の中にある。足りないのは、それに気づくきっかけと、踏み出すための橋です。ARQOは、美容・教育・コミュニティ・テクノロジーという4つの入口から、一人ひとりと可能性をつなぐ橋をかけていきます。",
};

/**
 * Company profile — placeholders marked with 〇 must be replaced with real
 * registration details before launch.
 */
export const companyProfile: { label: string; value: string }[] = [
  { label: "会社名", value: "ARQO Inc.（〇〇〇〇株式会社）" },
  { label: "所在地", value: "〒〇〇〇-〇〇〇〇 〇〇県〇〇市〇〇" },
  { label: "設立", value: "〇〇〇〇年〇月" },
  { label: "代表者", value: "代表取締役 〇〇 〇〇" },
  { label: "事業内容", value: "美容福祉事業／教育事業／コミュニティ・イベント事業／AI・IT事業" },
  { label: "お問い合わせ", value: "contact@example.com" },
];

export const contactCategories = ["事業提携・協業", "取材・メディア", "採用", "協賛・スポンサー", "サービスについて", "その他"] as const;

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
] as const;
