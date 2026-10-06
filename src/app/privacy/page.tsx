import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ARQOの個人情報の取り扱いについて。",
  alternates: { canonical: "/privacy" },
};

/** Template policy — have it reviewed and completed (〇 placeholders) before launch. */
const sections: { title: string; body: string[] }[] = [
  {
    title: "個人情報の取得",
    body: ["当社は、お問い合わせフォーム、イベントへのお申し込み、各種サービスのご利用等を通じて、氏名、メールアドレス、所属先、お問い合わせ内容等の個人情報を適正な手段により取得します。"],
  },
  {
    title: "利用目的",
    body: ["取得した個人情報は、以下の目的の範囲内で利用します。", "・お問い合わせへの回答およびご連絡のため", "・当社事業・イベント・サービスに関するご案内のため", "・サービスの改善および新たなサービスの検討のため"],
  },
  {
    title: "第三者への提供",
    body: ["法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。"],
  },
  {
    title: "安全管理",
    body: ["当社は、個人情報の漏えい、滅失またはき損の防止その他の安全管理のために必要かつ適切な措置を講じます。"],
  },
  {
    title: "開示・訂正・削除等のご請求",
    body: [`ご本人からの個人情報の開示、訂正、利用停止、削除等のご請求には、法令に従い適切に対応します。ご請求は ${site.contactEmail} までご連絡ください。`],
  },
  {
    title: "アクセス解析について",
    body: ["当サイトでは、サービス向上のためアクセス解析ツールを利用する場合があります。これらは Cookie を使用して匿名のトラフィックデータを収集するもので、個人を特定するものではありません。"],
  },
  {
    title: "改定",
    body: ["本ポリシーの内容は、必要に応じて変更することがあります。変更後の内容は本ページに掲載した時点から効力を生じるものとします。"],
  },
];

export default function PrivacyPage() {
  return (
    <main id="main">
      <PageHero eyebrow="Privacy Policy" title={["プライバシーポリシー"]} crumbs={[{ label: "Privacy Policy" }]} compact />
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-[760px]">
            <p className="font-mincho text-[0.9375rem] leading-[2.2] tracking-[0.06em] text-ink-2">
              {site.legalName}（以下「当社」）は、個人情報の重要性を認識し、以下の方針に基づき適切に取り扱います。
            </p>
            <ol className="mt-14 space-y-12">
              {sections.map((sec, i) => (
                <li key={sec.title}>
                  <h2 className="heading-ja flex items-baseline gap-4 text-lg tracking-[0.12em] text-ink">
                    <span className="font-display text-sm text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                    {sec.title}
                  </h2>
                  <div className="mt-4 space-y-2 border-l border-line pl-6 md:ml-8">
                    {sec.body.map((b, j) => (
                      <p key={j} className="font-mincho text-[0.9375rem] leading-[2.1] tracking-[0.04em] text-ink-2">
                        {b}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-16 border-t border-line pt-8 text-right font-mincho text-sm text-ink-2">
              制定日：〇〇〇〇年〇月〇日
              <br />
              {site.legalName}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
