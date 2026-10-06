import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { NewsList } from "@/components/page/NewsList";
import { news } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "ARQOの最新情報。イベント、プロジェクト、事業に関するお知らせをお届けします。",
  alternates: { canonical: "/news" },
};

export default function NewsIndexPage() {
  const items = [...news].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <main id="main">
      <PageHero
        eyebrow="News"
        title={["最新情報を", "お届けします。"]}
        image="/images/footer.jpg"
        position="center bottom"
        crumbs={[{ label: "News" }]}
        compact
      />
      <section aria-label="お知らせ一覧" className="relative isolate overflow-hidden bg-mist py-20 md:py-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -left-20 top-10 size-[560px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-sky)_50%,transparent)]" />
          <div className="absolute right-0 top-1/3 size-[620px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-lavender)_55%,transparent)]" />
          <div className="absolute bottom-0 left-1/3 size-[520px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-sunset)_45%,transparent)]" />
        </div>
        <div className="container-x">
          <NewsList items={items} />
        </div>
      </section>
    </main>
  );
}
