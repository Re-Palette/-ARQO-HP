import Link from "next/link";
import { Arrow } from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-night text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 size-[640px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-sky-deep)_45%,transparent)]" />
        <div className="absolute -right-20 bottom-0 size-[620px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-lavender)_35%,transparent)]" />
      </div>
      <div className="container-x">
        <p className="eyebrow text-white/70">404 — Not Found</p>
        <h1 className="mt-8 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95]">Lost in between.</h1>
        <p className="heading-ja mt-8 text-base tracking-[0.12em] text-white/85">お探しのページは見つかりませんでした。</p>
        <Link href="/" className="group mt-12 inline-flex items-center gap-5 text-[0.8125rem] tracking-[0.12em]">
          <span className="grid size-14 place-items-center rounded-full border border-white/60 transition-colors duration-500 group-hover:bg-white group-hover:text-ink">
            <Arrow className="w-5" />
          </span>
          <span className="link-underline pb-1">トップへ戻る</span>
        </Link>
      </div>
    </main>
  );
}
