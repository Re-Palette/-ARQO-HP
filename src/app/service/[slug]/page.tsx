import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { PageHero } from "@/components/page/PageHero";
import { Arrow } from "@/components/ui/ArrowLink";
import { projectHref, projects, services } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.title}｜${s.ja}`,
    description: `${s.lead}${s.body[0]}`.slice(0, 120),
    alternates: { canonical: `/service/${s.slug}` },
    openGraph: { images: [{ url: s.image }] },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = services.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const s = services[index];
  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];

  return (
    <main id="main">
      <PageHero
        eyebrow={`Service ${s.no} — ${s.ja}`}
        title={[s.title]}
        lead={s.lead}
        crumbs={[{ label: "Service", href: "/service" }, { label: s.title }]}
      />

      {/* Overview */}
      <section aria-labelledby="overview-heading" className="relative overflow-hidden bg-white py-24 md:py-36">
        <div className="container-x grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal y={40} className="lg:col-span-5">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[3px] shadow-[0_30px_70px_-35px_rgba(40,50,90,0.5)]">
              <Image src={s.image} alt="" fill priority quality={90} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <Reveal>
              <p className="eyebrow text-ink/60">Overview</p>
            </Reveal>
            <TextReveal
              id="overview-heading"
              lines={[s.lead]}
              className="heading-ja mt-8 text-[clamp(1.3rem,2.2vw,1.9rem)] text-ink"
              lineClassName="tracking-[0.12em]"
            />
            <div className="mt-10 space-y-6">
              {s.body.map((para, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="font-mincho text-[0.9375rem] leading-[2.3] tracking-[0.06em] text-ink-2 md:text-base">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section aria-labelledby="pillars-heading" className="relative overflow-hidden bg-mist py-24 md:py-36">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-0 size-[640px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-lavender)_30%,transparent)]" />
        <div className="container-x relative">
          <Reveal>
            <p className="eyebrow text-ink/60">What we do</p>
          </Reveal>
          <TextReveal
            id="pillars-heading"
            lines={["取り組み"]}
            className="heading-ja mt-6 text-[clamp(1.4rem,2.4vw,2.1rem)] text-ink"
            lineClassName="tracking-[0.2em]"
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {s.pillars.map((p, i) => (
              <li key={p.en}>
                <Reveal delay={i * 0.1} y={30} className="h-full">
                  <div className="glass flex h-full flex-col rounded-[10px] p-8 md:p-10">
                    <span className="font-display text-sm text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-8 font-display text-[clamp(1.8rem,2.6vw,2.4rem)] leading-none text-ink">{p.en}</p>
                    <h3 className="heading-ja mt-4 text-base text-ink">{p.title}</h3>
                    <p className="mt-5 font-mincho text-sm leading-[2.1] tracking-[0.04em] text-ink-2">{p.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Initiatives */}
      {s.initiatives?.length ? (
        <section aria-labelledby="initiatives-heading" className="bg-white py-24 md:py-32">
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow text-ink/60">Projects</p>
              </Reveal>
              <TextReveal
                id="initiatives-heading"
                lines={["主なプロジェクト"]}
                className="heading-ja mt-6 text-[clamp(1.4rem,2.4vw,2.1rem)] text-ink"
                lineClassName="tracking-[0.2em]"
              />
            </div>
            <ul className="border-t border-line lg:col-span-8">
              {s.initiatives.map((it, i) => (
                <li key={it.name} className="border-b border-line">
                  <Reveal delay={i * 0.08} y={20}>
                    {it.slug ? (
                      <Link
                        href={projectHref(projects.find((x) => x.slug === it.slug) ?? { slug: it.slug })}
                        {...(isExternal(it.slug) ? { target: "_blank", rel: "noopener" } : {})}
                        className="group grid items-center gap-3 py-8 sm:grid-cols-[220px_1fr_auto] sm:gap-8"
                      >
                        <p className="font-display text-[clamp(1.6rem,2.4vw,2.1rem)] leading-none text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                          {it.name}
                        </p>
                        <p className="font-mincho text-[0.9375rem] leading-[2] tracking-[0.06em] text-ink-2">{it.text}</p>
                        <span className="mt-2 inline-flex items-center gap-4 text-[0.75rem] tracking-[0.12em] text-ink sm:mt-0">
                          <span className="link-underline pb-0.5">詳細を見る</span>
                          <span className="grid size-11 place-items-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
                            <Arrow className="w-4" />
                          </span>
                        </span>
                      </Link>
                    ) : (
                      <div className="grid gap-3 py-8 sm:grid-cols-[220px_1fr] sm:gap-8">
                        <p className="font-display text-[clamp(1.6rem,2.4vw,2.1rem)] leading-none text-ink">{it.name}</p>
                        <p className="font-mincho text-[0.9375rem] leading-[2] tracking-[0.06em] text-ink-2">{it.text}</p>
                      </div>
                    )}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Prev / next */}
      <nav aria-label="ほかの事業" className="bg-mist">
        <div className="container-x grid border-t border-line md:grid-cols-2">
          {[
            { dir: "Prev", s: prev },
            { dir: "Next", s: next },
          ].map(({ dir, s: o }, i) => (
            <Link
              key={dir}
              href={`/service/${o.slug}`}
              className={`group flex items-center justify-between gap-6 py-10 md:py-14 ${i === 1 ? "md:border-l md:border-line md:pl-12" : "md:pr-12"}`}
            >
              <span>
                <span className="block text-[0.625rem] uppercase tracking-[0.28em] text-ink/50">{dir} — {o.ja}</span>
                <span className="mt-3 block font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                  {o.title}
                </span>
              </span>
              <span className={`grid size-12 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:bg-ink group-hover:text-white ${dir === "Prev" ? "rotate-180" : ""}`}>
                <Arrow className="w-4" />
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}

function isExternal(slug: string) {
  return !!projects.find((x) => x.slug === slug)?.externalUrl;
}
