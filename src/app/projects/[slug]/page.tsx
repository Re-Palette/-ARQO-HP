import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { NuanceLoungeHero } from "@/components/page/NuanceLoungeHero";
import { PageHero } from "@/components/page/PageHero";
import { Arrow } from "@/components/ui/ArrowLink";
import { projects, services } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  // NEWTONE has its own event site at /projects/newtone (src/app/projects/newtone).
  return projects.filter((p) => p.slug !== "newtone").map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name}｜${p.tagline}`,
    description: `${p.lead}${p.story[0]}`.slice(0, 120),
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { images: [{ url: p.image }] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const service = services.find((s) => s.slug === p.service);
  const others = projects.filter((x) => x.slug !== p.slug);
  const crumbs = [
    { label: "Service", href: "/service" },
    ...(service ? [{ label: service.title, href: `/service/${service.slug}` }] : []),
    { label: p.name },
  ];

  return (
    <main id="main">
      {p.slug === "nuance-lounge" ? (
        <NuanceLoungeHero project={p} crumbs={crumbs} />
      ) : (
        <PageHero eyebrow={`Project — ${p.category}`} title={[p.name]} en={p.en} lead={p.lead} crumbs={crumbs} />
      )}

      {/* About the project */}
      <section aria-labelledby="project-about" className="relative overflow-hidden bg-white py-24 md:py-36">
        <div className="container-x grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-ink/60">About</p>
            </Reveal>
            <TextReveal
              id="project-about"
              lines={[p.tagline]}
              className="heading-ja mt-8 text-[clamp(1.35rem,2.4vw,2.1rem)] text-ink"
              lineClassName="tracking-[0.14em]"
            />
            <div className="mt-10 space-y-6">
              {p.story.map((para, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="font-mincho text-[0.9375rem] leading-[2.3] tracking-[0.06em] text-ink-2 md:text-base">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal y={40} className="lg:col-span-5 lg:col-start-8">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[3px] shadow-[0_30px_70px_-35px_rgba(40,50,90,0.5)]">
              <Image src={p.image} alt="" fill quality={90} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <span className="absolute bottom-6 left-6 font-display text-3xl text-white [text-shadow:0_2px_16px_rgba(6,12,30,0.5)]">
                {p.name}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="project-features" className="relative overflow-hidden bg-mist py-24 md:py-36">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-0 size-[640px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-sky)_28%,transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 size-[600px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-lavender)_30%,transparent)]" />
        <div className="container-x relative">
          <Reveal>
            <p className="eyebrow text-ink/60">Features</p>
          </Reveal>
          <TextReveal
            id="project-features"
            lines={["特徴"]}
            className="heading-ja mt-6 text-[clamp(1.4rem,2.4vw,2.1rem)] text-ink"
            lineClassName="tracking-[0.2em]"
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {p.features.map((f, i) => (
              <li key={f.en}>
                <Reveal delay={i * 0.1} y={30} className="h-full">
                  <div className="glass flex h-full flex-col rounded-[10px] p-8 md:p-10">
                    <span className="font-display text-sm text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-8 font-display text-[clamp(1.8rem,2.6vw,2.4rem)] leading-none text-ink">{f.en}</p>
                    <h3 className="heading-ja mt-4 text-base text-ink">{f.title}</h3>
                    <p className="mt-5 font-mincho text-sm leading-[2.1] tracking-[0.04em] text-ink-2">{f.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Flow */}
      <section aria-labelledby="project-flow" className="bg-white py-24 md:py-36">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-ink/60">Flow</p>
          </Reveal>
          <TextReveal
            id="project-flow"
            lines={["参加の流れ"]}
            className="heading-ja mt-6 text-[clamp(1.4rem,2.4vw,2.1rem)] text-ink"
            lineClassName="tracking-[0.2em]"
          />
          <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            <span aria-hidden className="absolute left-[22px] top-0 h-full w-px bg-line md:left-0 md:top-[22px] md:h-px md:w-full" />
            {p.flow.map((step, i) => (
              <li key={step.title} className="relative pl-16 md:pl-0 md:pt-16">
                {/* Marker sits outside Reveal: a transformed parent would re-anchor it mid-animation */}
                <span className="absolute left-0 top-0 grid size-11 place-items-center rounded-full border border-ink/20 bg-white font-display text-sm text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Reveal delay={i * 0.1} y={20}>
                  <h3 className="heading-ja text-base tracking-[0.1em] text-ink">{step.title}</h3>
                  <p className="mt-3 font-mincho text-sm leading-[2] tracking-[0.04em] text-ink-2">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Join */}
      <section aria-labelledby="project-join" className="relative isolate overflow-hidden bg-night py-24 text-white md:py-36">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -left-40 top-0 size-[640px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-sky-deep)_40%,transparent)]" />
          <div className="absolute -right-20 bottom-0 size-[620px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-lavender)_30%,transparent)]" />
        </div>
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-white/70">Join</p>
          </Reveal>
          <TextReveal
            id="project-join"
            lines={[`${p.name} に関わる`]}
            className="heading-ja mt-6 text-[clamp(1.4rem,2.4vw,2.1rem)]"
            lineClassName="tracking-[0.14em]"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {p.join.map((j, i) => (
              <Reveal key={j.title} delay={i * 0.1} y={30} className="h-full">
                <div className="glass-dark flex h-full flex-col rounded-[10px] p-8 md:p-10">
                  <h3 className="heading-ja text-lg tracking-[0.14em]">{j.title}</h3>
                  <ul className="mt-6 space-y-2">
                    {j.who.map((w) => (
                      <li key={w} className="flex items-center gap-3 font-mincho text-sm text-white/90">
                        <span className="h-px w-4 bg-white/40" />
                        {w}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 font-mincho text-sm leading-[2] text-white/75">{j.text}</p>
                  <Link
                    href={`/contact?category=${encodeURIComponent(i === 0 ? "サービスについて" : "事業提携・協業")}`}
                    className="group mt-auto inline-flex items-center gap-5 self-start pt-10 text-[0.8125rem] tracking-[0.12em]"
                  >
                    <span className="grid size-12 place-items-center rounded-full border border-white/60 transition-colors duration-500 group-hover:bg-white group-hover:text-ink">
                      <Arrow className="w-4" />
                    </span>
                    <span className="link-underline pb-1">お問い合わせ</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other projects */}
      <nav aria-label="ほかのプロジェクト" className="bg-mist">
        <div className="container-x grid border-t border-line md:grid-cols-2">
          {others.map((o, i) => (
            <Link
              key={o.slug}
              href={`/projects/${o.slug}`}
              className={`group flex items-center justify-between gap-6 py-10 md:py-14 ${i === 1 ? "md:border-l md:border-line md:pl-12" : "md:pr-12"}`}
            >
              <span>
                <span className="block text-[0.625rem] uppercase tracking-[0.28em] text-ink/50">Project — {o.category}</span>
                <span className="mt-3 block font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                  {o.name}
                </span>
                <span className="mt-3 block font-mincho text-[0.8125rem] tracking-[0.08em] text-ink-2">{o.tagline}</span>
              </span>
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
                <Arrow className="w-4" />
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}
