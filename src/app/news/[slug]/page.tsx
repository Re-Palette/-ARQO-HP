import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/page/PageHero";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { news, site } from "@/lib/content";

type Params = { slug: string };

const fmt = (iso: string) => iso.replaceAll("-", ".");

export function generateStaticParams(): Params[] {
  return news.map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const n = news.find((x) => x.slug === slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.excerpt,
    alternates: { canonical: `/news/${n.slug}` },
    openGraph: { type: "article", publishedTime: n.date, images: [{ url: n.image }] },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  const n = sorted.find((x) => x.slug === slug);
  if (!n) notFound();
  const related = sorted.filter((x) => x.slug !== n.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: n.title,
    datePublished: n.date,
    image: [`${site.url}${n.image}`],
    publisher: { "@type": "Organization", name: site.legalName },
  };

  return (
    <main id="main">
      <PageHero
        eyebrow={`${fmt(n.date)} — ${n.category}`}
        title={[n.title]}
        crumbs={[{ label: "News", href: "/news" }, { label: n.title }]}
        compact
      />

      <article className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-[760px]">
            <Reveal y={30}>
              <div className="relative aspect-[16/9] overflow-hidden rounded-[6px] shadow-[0_30px_70px_-40px_rgba(40,50,90,0.5)]">
                <Image src={n.image} alt="" fill priority sizes="(min-width: 800px) 760px, 100vw" className="object-cover" />
              </div>
            </Reveal>
            <div className="mt-14 space-y-7">
              {n.body.map((para, i) => (
                <Reveal key={i} delay={i * 0.05} y={16}>
                  <p className="font-mincho text-[0.9375rem] leading-[2.3] tracking-[0.06em] text-ink-2 md:text-base">{para}</p>
                </Reveal>
              ))}
            </div>
            <div className="mt-16 border-t border-line pt-10">
              <ArrowLink href="/news" circle>
                ニュース一覧へ戻る
              </ArrowLink>
            </div>
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </article>

      {related.length ? (
        <section aria-labelledby="related-heading" className="bg-mist py-20 md:py-28">
          <div className="container-x">
            <p className="eyebrow text-ink/60">More News</p>
            <h2 id="related-heading" className="heading-ja mt-5 text-xl tracking-[0.18em] text-ink">
              その他のお知らせ
            </h2>
            <ul className="mt-10 border-t border-line">
              {related.map((r) => (
                <li key={r.slug} className="border-b border-line">
                  <Link href={`/news/${r.slug}`} className="group grid grid-cols-[1fr_auto] items-center gap-6 py-7 md:grid-cols-[140px_120px_1fr_auto]">
                    <time dateTime={r.date} className="text-[0.6875rem] tracking-[0.2em] text-ink/50">{fmt(r.date)}</time>
                    <span className="hidden text-[0.625rem] uppercase tracking-[0.22em] text-ink/50 md:block">{r.category}</span>
                    <span className="col-span-1 font-mincho text-[0.9375rem] tracking-[0.06em] text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 max-md:order-3 max-md:col-span-2">
                      {r.title}
                    </span>
                    <Arrow className="w-6 text-ink/50 transition-transform duration-700 group-hover:translate-x-1 group-hover:text-ink" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
