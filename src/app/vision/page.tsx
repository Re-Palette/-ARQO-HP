import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { TextReveal } from "@/components/motion/TextReveal";
import { PageHero } from "@/components/page/PageHero";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { mission, services, vision, visionPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Vision",
  description: "美容・教育・コミュニティで、誰もが自分らしく生きられる社会をつくる。ARQOが目指す社会と、そこへの道筋。",
  alternates: { canonical: "/vision" },
};

export default function VisionPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Vision"
        title={["誰もが自分らしく", "生きられる社会をつくる。"]}
        en={vision.en}
        image="/images/vision.jpg"
        imageAlt="夕焼けに染まる都市の風景"
        position="center bottom"
        crumbs={[{ label: "Vision" }]}
      />

      {/* Statement — lights up with the scroll */}
      <section aria-labelledby="statement" className="relative overflow-hidden bg-white py-32 md:py-48">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-0 size-[640px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-sky)_26%,transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 size-[600px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-sunset)_24%,transparent)]" />
        <div className="container-x relative text-center">
          <Reveal>
            <p className="eyebrow justify-center text-ink/60">Our Vision</p>
          </Reveal>
          <ScrubText
            id="statement"
            lines={vision.lines}
            className="heading-ja mx-auto mt-12 text-[clamp(1.4rem,3vw,2.75rem)] leading-[1.85] text-ink"
            lineClassName="md:whitespace-nowrap"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-12 max-w-[36em] font-mincho text-[0.9375rem] leading-[2.3] tracking-[0.06em] text-ink-2 md:text-base">
              {vision.text}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <section aria-labelledby="why-heading" className="relative isolate overflow-hidden bg-night py-28 text-white md:py-40">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image src="/images/about.jpg" alt="" fill sizes="100vw" className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/50" />
        </div>
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-white/70">Why</p>
            </Reveal>
            <TextReveal
              id="why-heading"
              lines={visionPage.why.title}
              className="heading-ja mt-8 text-[clamp(1.35rem,2.4vw,2.1rem)] leading-[1.8]"
              lineClassName="tracking-[0.12em]"
            />
          </div>
          <div className="space-y-7 lg:col-span-6 lg:col-start-7 lg:pt-16">
            {visionPage.why.body.map((para, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="font-mincho text-[0.9375rem] leading-[2.3] tracking-[0.06em] text-white/85 md:text-base">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section aria-labelledby="goals-heading" className="relative overflow-hidden bg-mist py-28 md:py-40">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-0 size-[640px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-lavender)_30%,transparent)]" />
        <div className="container-x relative">
          <Reveal>
            <p className="eyebrow text-ink/60">The Society We Envision</p>
          </Reveal>
          <TextReveal
            id="goals-heading"
            lines={["ARQOが目指す社会"]}
            className="heading-ja mt-6 text-[clamp(1.4rem,2.4vw,2.1rem)] text-ink"
            lineClassName="tracking-[0.18em]"
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {visionPage.goals.map((g, i) => (
              <li key={g.en}>
                <Reveal delay={i * 0.1} y={30} className="h-full">
                  <div className="glass flex h-full flex-col rounded-[10px] p-8 md:p-10">
                    <span className="font-display text-sm text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-8 font-display text-[clamp(1.8rem,2.6vw,2.4rem)] leading-none text-ink">{g.en}</p>
                    <h3 className="heading-ja mt-4 text-base leading-[1.8] text-ink">{g.title}</h3>
                    <p className="mt-4 font-mincho text-sm leading-[2.1] tracking-[0.04em] text-ink-2">{g.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Approach — the three businesses as bridges */}
      <section aria-labelledby="approach-heading" className="bg-white py-28 md:py-40">
        <div className="container-x">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal>
                <p className="eyebrow text-ink/60">Approach</p>
              </Reveal>
              <TextReveal
                id="approach-heading"
                lines={["3つの事業が、", "可能性への橋になる。"]}
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

      {/* Mission bridge */}
      <section aria-labelledby="mission-link" className="relative overflow-hidden bg-mist py-24 md:py-32">
        <div className="container-x flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-ink/60">Mission</p>
            </Reveal>
            <TextReveal
              id="mission-link"
              lines={mission.lines}
              className="heading-ja mt-6 text-[clamp(1.4rem,2.4vw,2.1rem)] text-ink sm:flex"
              lineClassName="whitespace-nowrap tracking-[0.16em]"
            />
          </div>
          <Reveal delay={0.2}>
            <ArrowLink href="/about" circle>
              ARQOについて
            </ArrowLink>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
