import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { PageHero } from "@/components/page/PageHero";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { companyProfile, mission, services, vision } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "ARQOのミッション・ビジョンと会社概要。人と可能性の間に架け橋をつくるソーシャルベンチャーです。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About"
        title={["すべての人に、", "自分らしく生きる選択肢を。"]}
        en="A social venture for what’s next."
        image="/images/about.jpg"
        imageAlt="白い曲線の建築の下、夕暮れの都市を見渡す女性"
        position="40% center"
        crumbs={[{ label: "About" }]}
      />

      {/* Mission */}
      <section aria-labelledby="mission-heading" className="relative overflow-hidden bg-white py-28 md:py-44">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-0 size-[620px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-sky)_28%,transparent)]" />
        <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-ink/60">Mission</p>
            </Reveal>
            <TextReveal
              id="mission-heading"
              lines={mission.lines}
              className="heading-ja mt-8 text-[clamp(1.75rem,3.4vw,3rem)] text-ink"
              lineClassName="tracking-[0.18em]"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 font-display text-xl italic text-ink/50 md:text-2xl">{mission.en}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <Reveal delay={0.15}>
              <p className="font-mincho text-[0.9375rem] leading-[2.3] tracking-[0.08em] text-ink-2 md:text-base">
                {mission.text}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section aria-labelledby="vision-heading" className="relative isolate overflow-hidden bg-night py-32 text-white md:py-48">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image src="/images/vision.jpg" alt="" fill sizes="100vw" className="object-cover object-bottom opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/30 to-night/60" />
        </div>
        <div className="container-x text-center">
          <Reveal>
            <p className="eyebrow justify-center text-white/80">Vision</p>
          </Reveal>
          <TextReveal
            id="vision-heading"
            lines={vision.lines}
            stagger={0.16}
            className="heading-ja mx-auto mt-10 text-[clamp(1.3rem,2.8vw,2.5rem)] leading-[1.85] [text-shadow:0_4px_40px_rgba(20,20,50,0.4)]"
            lineClassName="md:whitespace-nowrap"
          />
          <Reveal delay={0.4}>
            <p className="mt-8 font-display text-[clamp(1.15rem,2vw,1.75rem)] italic text-white/80">{vision.en}</p>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="mx-auto mt-10 max-w-[36em] font-mincho text-[0.9375rem] leading-[2.2] tracking-[0.08em] text-white/90">
              {vision.text}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Domains */}
      <section aria-labelledby="domains-heading" className="bg-mist py-28 md:py-40">
        <div className="container-x">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal>
                <p className="eyebrow text-ink/60">Our Domains</p>
              </Reveal>
              <TextReveal
                id="domains-heading"
                lines={["3つの入口から、", "可能性への橋をかける。"]}
                className="heading-ja mt-6 text-[clamp(1.4rem,2.4vw,2.1rem)] text-ink sm:flex"
                lineClassName="whitespace-nowrap tracking-[0.14em]"
              />
            </div>
            <Reveal delay={0.2}>
              <ArrowLink href="/service">事業内容を見る</ArrowLink>
            </Reveal>
          </div>
          <ul className="mt-14 border-t border-line">
            {services.map((s, i) => (
              <li key={s.slug} className="border-b border-line">
                <Reveal delay={i * 0.06} y={20}>
                  <Link
                    href={`/service/${s.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-8 md:grid-cols-[80px_1fr_1.3fr_auto] md:gap-10 md:py-10"
                  >
                    <span className="font-display text-lg text-ink/40">{s.no}</span>
                    <span>
                      <span className="block font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                        {s.title}
                      </span>
                      <span className="mt-2 block font-mincho text-[0.8125rem] tracking-[0.16em] text-ink-2">{s.ja}</span>
                    </span>
                    <span className="hidden font-mincho text-sm leading-[2] text-ink-2 md:block">{s.lead}</span>
                    <span className="grid size-11 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
                      <Arrow className="w-4" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Company */}
      <section aria-labelledby="company-heading" className="bg-white py-28 md:py-40">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-ink/60">Company</p>
            </Reveal>
            <TextReveal
              id="company-heading"
              lines={["会社概要"]}
              className="heading-ja mt-6 text-[clamp(1.4rem,2.4vw,2.1rem)] text-ink"
              lineClassName="tracking-[0.2em]"
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-8">
            <dl className="border-t border-line">
              {companyProfile.map((row) => (
                <div key={row.label} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[160px_1fr] sm:gap-8">
                  <dt className="font-mincho text-[0.8125rem] tracking-[0.16em] text-ink/55">{row.label}</dt>
                  <dd className="font-mincho text-[0.9375rem] leading-[1.9] tracking-[0.06em] text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
