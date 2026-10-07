import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/page/PageHero";
import { Arrow } from "@/components/ui/ArrowLink";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Service",
  description: "美容福祉・教育・コミュニティ＆イベントの各事業と、それを支える社内のAI活用についてご紹介します。",
  alternates: { canonical: "/service" },
};

export default function ServiceIndexPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Service"
        title={["4つの事業で、", "社会に新しい価値を。"]}
        lead="美容・教育・コミュニティ・テクノロジー。ARQOは4つの事業を軸に、一人ひとりが新しい一歩を踏み出せる機会と、それを支える仕組みをつくっています。"
        image="/images/vision.jpg"
        imageAlt="夕焼けに染まる都市の風景"
        position="center bottom"
        crumbs={[{ label: "Service" }]}
      />

      <section aria-label="事業一覧" className="relative overflow-hidden bg-mist py-24 md:py-36">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-40 size-[700px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-sky)_25%,transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 bottom-40 size-[640px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-lavender)_30%,transparent)]" />
        <ol className="container-x relative space-y-24 md:space-y-36">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={s.slug}>
                <article className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
                  <Reveal
                    y={40}
                    className={`md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`}
                  >
                    <Link
                      href={`/service/${s.slug}`}
                      className="group relative block aspect-[5/6] overflow-hidden rounded-[3px] shadow-[0_30px_70px_-35px_rgba(40,50,90,0.5)]"
                      tabIndex={-1}
                      aria-hidden
                    >
                      <Image
                        src={s.image}
                        alt=""
                        fill
                        quality={90}
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                      />
                      <span className="absolute left-6 top-6 font-display text-lg text-white [text-shadow:0_1px_8px_rgba(6,12,30,0.4)]">
                        {s.no}
                        <span className="mt-2 block h-px w-10 bg-white/70" />
                      </span>
                    </Link>
                  </Reveal>
                  <div className={`md:col-span-6 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
                    <Reveal>
                      <p className="eyebrow text-ink/50">{s.ja}</p>
                    </Reveal>
                    <Reveal delay={0.08}>
                      <h2 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.25rem)] leading-[1.02] text-ink">{s.title}</h2>
                    </Reveal>
                    <Reveal delay={0.14}>
                      <p className="heading-ja mt-6 text-[clamp(1.05rem,1.6vw,1.35rem)] text-ink">{s.lead}</p>
                    </Reveal>
                    <Reveal delay={0.2}>
                      <p className="mt-6 font-mincho text-[0.9375rem] leading-[2.2] tracking-[0.06em] text-ink-2">{s.body[0]}</p>
                    </Reveal>
                    <Reveal delay={0.26} className="mt-10">
                      <Link
                        href={`/service/${s.slug}`}
                        className="group inline-flex items-center gap-5 text-[0.8125rem] tracking-[0.12em] text-ink"
                      >
                        <span className="grid size-14 place-items-center rounded-full border border-ink/25 transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
                          <Arrow className="w-5 transition-transform duration-700 group-hover:translate-x-0.5" />
                        </span>
                        <span className="link-underline pb-1">{s.title} について詳しく</span>
                      </Link>
                    </Reveal>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
