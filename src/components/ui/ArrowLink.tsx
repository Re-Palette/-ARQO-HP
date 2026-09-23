import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Wrap the arrow in a hairline circle (primary CTA style). */
  circle?: boolean;
  tone?: "ink" | "light";
};

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 12" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M0 6h22M17 1l5 5-5 5" />
    </svg>
  );
}

export function ArrowLink({ href, children, className = "", circle = false, tone = "ink" }: ArrowLinkProps) {
  const border = tone === "ink" ? "border-ink/25" : "border-white/80";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-4 text-[0.8125rem] tracking-[0.12em] ${className}`}
    >
      {circle ? (
        <span
          className={`relative grid size-14 place-items-center overflow-hidden rounded-full border ${border} transition-[border-color,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105`}
        >
          <span className="absolute inset-0 origin-center scale-0 rounded-full bg-current opacity-[0.08] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-100" />
          <Arrow className="w-5 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
        </span>
      ) : null}
      <span className="link-underline pb-1">{children}</span>
      {!circle ? (
        <Arrow className="w-6 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
      ) : null}
    </Link>
  );
}
