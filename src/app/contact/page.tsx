import type { Metadata } from "next";
import { Suspense } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/page/ContactForm";
import { PageHero } from "@/components/page/PageHero";
import { contactCategories, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "事業提携・取材・採用・協賛など、ARQOへのお問い合わせはこちらから。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Contact"
        title={["お問い合わせ"]}
        en="Let’s build what’s next."
        lead="事業提携・取材・採用・協賛のご相談など、お気軽にお問い合わせください。"
        image="/images/hero.jpg"
        imageAlt=""
        position="70% center"
        crumbs={[{ label: "Contact" }]}
        compact
      />
      <section className="relative isolate overflow-hidden bg-mist py-20 md:py-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -left-20 top-0 size-[620px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-sky)_45%,transparent)]" />
          <div className="absolute -right-20 bottom-0 size-[620px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-lavender)_50%,transparent)]" />
        </div>
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-ink/60">Inquiry</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-ja mt-6 text-[clamp(1.4rem,2.2vw,1.9rem)] tracking-[0.16em] text-ink">お問い合わせフォーム</h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-8 font-mincho text-sm leading-[2.1] tracking-[0.06em] text-ink-2">
                以下の内容についてお受けしています。通常3営業日以内にご返信いたします。
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-3 border-t border-line pt-8 font-mincho text-sm text-ink">
                {contactCategories.map((c) => (
                  <li key={c} className="flex items-center gap-3">
                    <span className="h-px w-4 bg-ink/30" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="mt-10 text-[0.6875rem] uppercase tracking-[0.22em] text-ink/50">Email</p>
              <a href={`mailto:${site.contactEmail}`} className="link-underline mt-2 inline-block font-sans text-base text-ink">
                {site.contactEmail}
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.1} y={30} className="relative lg:col-span-8">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
