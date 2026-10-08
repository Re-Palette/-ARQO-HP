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
  legalName: "株式会社ARQO",
  url: resolveSiteUrl(),
  mission: "人と可能性の間に架け橋をつくる。",
  missionEn: "Building bridges between people and possibility.",
  description:
    "ARQOは、美容・教育・コミュニティの3つの事業を通じて、一人ひとりが新しい一歩を踏み出せる機会を創造するソーシャルベンチャーです。",
  contactEmail: "contact@example.com",
  locale: "ja_JP",
} as const;

/** Pages that bring their own header and footer (e.g. the NEWTONE event site). */
export const standalonePages = ["/projects/newtone"];
export const isStandalonePage = (pathname: string) => standalonePages.some((p) => pathname.startsWith(p));

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Service", href: "/service" },
  { label: "Vision", href: "/vision" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

export const domains = ["Beauty", "Education", "Community"] as const;

export type Service = {
  slug: string;
  no: string;
  title: string;
  ja: string;
  /** "\n" marks the preferred line break on the narrow home cards. */
  description: string;
  image: string;
  /** Full-bleed photo for the detail page hero (falls back to a night gradient). */
  heroImage?: { src: string; alt: string; position?: string };
  /** Detail page */
  lead: string;
  body: string[];
  pillars: { en: string; title: string; text: string }[];
  /** Projects run under this business; `slug` links to /projects/[slug]. */
  initiatives?: { name: string; text: string; slug?: string }[];
};

export const services: Service[] = [
  {
    slug: "re-palette",
    no: "01",
    title: "Re-Palette",
    ja: "美容福祉事業",
    description: "美容を通じて、社会的孤立状態にある\n若者の社会復帰を支援します。",
    image: "/images/services/repalette.jpg",
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
      { name: "Re-Palette", slug: "re-palette", text: "美容を通じた社会参加支援プロジェクト。ARQOの原点となる取り組みです。" },
    ],
  },
  {
    slug: "education",
    no: "02",
    title: "Education",
    ja: "教育事業",
    description: "人の可能性を広げる教育を通じて、\n未来の選択肢を増やします。",
    image: "/images/services/education.jpg",
    heroImage: { src: "/images/education-hero.jpg", alt: "校舎を背に、夕方の空を見上げる制服姿の学生", position: "74% center" },
    lead: "学びの選択肢が、人生の選択肢になる。",
    body: [
      "どこで生まれ、どんな環境で育ったかによって、出会える学びは大きく変わります。ARQOの教育事業は、学校や家庭だけでは届きにくい実践的な学びを、次世代に開いていく取り組みです。",
      "美容・クリエイティブなど、ARQOの事業現場そのものを教材に。実際の仕事に触れる経験を通じて、「やってみたい」を「できる」に変えていきます。",
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
    image: "/images/services/community.jpg",
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
      { name: "Nuance Lounge", slug: "nuance-lounge", text: "世代や立場を超えて語り合える、開かれた交流コミュニティ。" },
      { name: "NEWTONE", slug: "newtone", text: "企画から演出まで学生が担う、次世代のビューティーイベント。" },
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Slug of the business this project belongs to. */
  service: string;
  tagline: string;
  en: string;
  lead: string;
  image: string;
  story: string[];
  features: { en: string; title: string; text: string }[];
  flow: { title: string; text: string }[];
  join: { title: string; who: string[]; text: string }[];
  /** Upcoming event shown in the project hero (date as ISO). */
  event?: {
    date: string;
    weekday: string;
    time: string;
    venue: string;
    address: string;
    fees: { label: string; price: string }[];
  };
};

/**
 * Project pages (/projects/[slug]). Copy is a first draft — review against the
 * real programme details before launch.
 */
export const projects: Project[] = [
  {
    slug: "re-palette",
    name: "Re-Palette",
    category: "Beauty & Welfare",
    service: "re-palette",
    tagline: "美容を通じた社会参加支援",
    en: "Color your next step.",
    lead: "ヘアメイクと撮影の体験を入口に、自分を好きになる一歩をつくる。",
    image: "/images/services/repalette.jpg",
    story: [
      "Re-Paletteは、社会的孤立やひきこもりの状態にある若者を対象にした、美容体験型の社会参加支援プロジェクトです。プロのヘアメイクと撮影を通じて「いつもと違う自分」に出会う時間をつくり、外に出るきっかけと、自分を肯定できる感覚を取り戻すことを目指しています。",
      "美容師・メイクアップアーティスト・フォトグラファー、そして支援機関の担当者がひとつのチームとなり、体験の前後まで一人ひとりに伴走します。ARQOのすべての事業の原点となった取り組みです。",
    ],
    features: [
      { en: "Hair & Make", title: "プロによるヘアメイク", text: "一人ひとりの希望を丁寧に聞き取り、なりたい自分をかたちにします。" },
      { en: "Photo", title: "撮影体験", text: "変化した自分を写真に残し、自分を見つめ直すきっかけをつくります。" },
      { en: "Follow-up", title: "体験後のフォロー", text: "支援機関と連携し、体験後も次の一歩に向けて関わり続けます。" },
    ],
    flow: [
      { title: "ご相談・お申し込み", text: "ご本人・ご家族・支援機関の方から、フォームでご相談ください。" },
      { title: "事前カウンセリング", text: "体験の内容や不安なことを、事前にゆっくりお話しします。" },
      { title: "ヘアメイク・撮影", text: "安心できる環境で、プロのチームが体験をサポートします。" },
      { title: "フォローアップ", text: "体験後の気持ちを共有し、次にやってみたいことを一緒に考えます。" },
    ],
    join: [
      { title: "参加したい方", who: ["社会的孤立・ひきこもりの状態にある若者", "ご家族の方", "支援機関の方"], text: "ご本人だけでなく、ご家族や支援者の方からのご相談も受け付けています。" },
      { title: "協力したい方", who: ["美容師・メイクアップアーティスト", "フォトグラファー", "サロン・企業・支援団体"], text: "技術や場所の提供、プロジェクトへのご協賛など、関わり方はさまざまです。" },
    ],
  },
  {
    slug: "nuance-lounge",
    name: "Nuance Lounge",
    category: "Community",
    service: "community",
    tagline: "世代や立場を超えた交流コミュニティ",
    en: "Conversations without titles.",
    lead: "肩書きを置いて、ひとりの人として語り合える場所を。",
    image: "/images/services/education.jpg",
    event: {
      date: "2026-07-05",
      weekday: "SUN",
      time: "15:30 - 18:30",
      venue: "TOMAP OFFICE",
      address: "東京都渋谷区渋谷3-1-25 3F",
      fees: [
        { label: "美容学生・高校生", price: "¥500" },
        { label: "大学生以上", price: "¥1,000" },
      ],
    },
    story: [
      "Nuance Loungeは、学生・社会人・クリエイター・支援者など、世代や立場の異なる人たちが肩書きを置いて語り合う交流コミュニティです。進路やキャリア、挑戦したいことについて、少人数でじっくり話せる時間を大切にしています。",
      "一度きりのイベントで終わらせず、出会った人同士がつながり続け、互いの挑戦を応援し合える関係性を育てていきます。",
    ],
    features: [
      { en: "Small Talk", title: "少人数の対話", text: "大人数の交流会ではなく、一人ひとりの言葉が届く距離で語り合います。" },
      { en: "Theme Talk", title: "テーマ別トーク", text: "キャリア、学び、挑戦など、毎回テーマを設けて対話を深めます。" },
      { en: "Community", title: "つながり続ける仕組み", text: "イベント後も交流が続くよう、参加者同士のコミュニティを運営します。" },
    ],
    flow: [
      { title: "お申し込み", text: "開催情報はニュースやSNSでお知らせします。" },
      { title: "当日参加", text: "初めての方でも参加しやすい雰囲気づくりを大切にしています。" },
      { title: "テーマトーク", text: "少人数のグループで、テーマに沿って語り合います。" },
      { title: "つながり続ける", text: "イベント後も、参加者コミュニティで交流が続きます。" },
    ],
    join: [
      { title: "参加したい方", who: ["学生", "社会人", "クリエイター・起業家"], text: "どなたでも参加できます。ひとりでの参加も歓迎です。" },
      { title: "協力したい方", who: ["ゲストスピーカー", "会場のご提供", "協賛企業・団体"], text: "場づくりを一緒に担ってくださる方を募集しています。" },
    ],
  },
  {
    slug: "newtone",
    name: "NEWTONE",
    category: "Event",
    service: "community",
    tagline: "学生主体の次世代ビューティーイベント",
    en: "The first light for new talent.",
    lead: "企画から演出まで、学生がつくるビューティーステージ。",
    image: "/images/services/community.jpg",
    story: [
      "NEWTONEは、企画・演出・ヘアメイク・運営まで、学生が主体となってつくり上げる次世代のビューティーイベントです。美容を学ぶ学生をはじめ、さまざまな分野の学生がチームを組み、ひとつのステージを完成させます。",
      "本気でものづくりに向き合う経験は、参加した学生にとって次のキャリアへの確かな一歩になります。新しい才能が最初に光を浴びる場所として、NEWTONEは毎年進化を続けます。",
    ],
    features: [
      { en: "Student-led", title: "学生主体の運営", text: "企画から当日の運営まで、学生がチームで意思決定します。" },
      { en: "Beauty Stage", title: "ビューティーステージ", text: "ヘアメイク・スタイリング・演出が一体となったステージをつくります。" },
      { en: "Next Career", title: "次のキャリアへ", text: "プロや企業との出会いを通じて、卒業後の進路にもつなげます。" },
    ],
    flow: [
      { title: "学生スタッフ募集", text: "企画・演出・ヘアメイク・広報などのスタッフを募集します。" },
      { title: "チーム結成・企画", text: "チームごとにコンセプトを考え、ステージを設計します。" },
      { title: "制作・リハーサル", text: "プロのアドバイスを受けながら、作品と演出を磨き上げます。" },
      { title: "本番", text: "観客の前で、チームでつくり上げたステージを披露します。" },
    ],
    join: [
      { title: "参加したい方", who: ["学生スタッフ", "出演者・モデル", "観覧希望の方"], text: "経験は問いません。本気で取り組みたい学生をお待ちしています。" },
      { title: "協力したい方", who: ["協賛企業", "サロン・美容メーカー", "メディア"], text: "次世代の才能を応援してくださるパートナーを募集しています。" },
    ],
  },
];

export type NewsItem = {
  slug: string;
  date: string;
  category: "Event" | "Brand" | "Community";
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
  lines: ["美容・教育・コミュニティで、", "誰もが自分らしく生きられる", "社会をつくる。"],
  en: "Infrastructure for every possibility.",
  text: "生まれた環境や今いる場所に関わらず、誰もが「次の一歩」を自分で選べる社会。ARQOは、そのための機会と仕組みを、事業として持続可能なかたちでつくり続けます。",
};

/** /vision page copy (first draft — review before launch). */
export const visionPage = {
  why: {
    title: ["生まれた場所や環境で、", "選べる未来が決まらないように。"],
    body: [
      "どんな家庭に生まれたか、どの地域で育ったか、いまどんな状況にいるか。それだけで、出会える人や学び、挑戦の機会は大きく変わってしまいます。",
      "社会的に孤立している若者、進路に迷う学生、新しい一歩を踏み出せずにいる人。可能性がないのではなく、可能性に気づくきっかけと、そこへ渡るための橋が足りていない。ARQOはそう考えています。",
    ],
  },
  goals: [
    { en: "Open", title: "機会が、誰にでもひらかれている社会", text: "美容・学び・出会いの機会が、環境に関わらずすべての人に届くこと。" },
    { en: "Together", title: "挑戦する人を、応援し合える社会", text: "一歩を踏み出す人を、世代や立場を越えて支え合える関係があること。" },
    { en: "Dignity", title: "自分を好きでいられる社会", text: "一人ひとりが自分の価値を感じ、自分らしい生き方を選べること。" },
  ],
};

export const mission = {
  lines: ["人と可能性の間に", "架け橋をつくる。"],
  en: "Building bridges between people and possibility.",
  text: "可能性は、すべての人の中にある。足りないのは、それに気づくきっかけと、踏み出すための橋です。ARQOは、美容・教育・コミュニティという3つの入口から、一人ひとりと可能性をつなぐ橋をかけていきます。",
};

/**
 * Company profile — placeholders marked with 〇 must be replaced with real
 * registration details before launch.
 */
export const companyProfile: { label: string; value: string }[] = [
  { label: "会社名", value: "株式会社ARQO" },
  { label: "所在地", value: "〒〇〇〇-〇〇〇〇 〇〇県〇〇市〇〇" },
  { label: "設立", value: "〇〇〇〇年〇月" },
  { label: "代表者", value: "代表取締役　鈴木陽大" },
  { label: "事業内容", value: "美容福祉事業／教育事業／コミュニティ・イベント事業" },
  { label: "お問い合わせ", value: "contact@example.com" },
];

export const contactCategories = ["イベント参加申し込み", "事業提携・協業", "取材・メディア", "採用", "協賛・スポンサー", "サービスについて", "その他"] as const;

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
] as const;
