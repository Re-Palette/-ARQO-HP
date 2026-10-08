import Link from "next/link";
import { site } from "@/lib/content";

export type Crumb = { label: string; href?: string };

/** Visible breadcrumb trail + BreadcrumbList structured data. */
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="パンくずリスト">
      <ol
        className={`flex flex-wrap items-center gap-3 text-[0.625rem] uppercase tracking-[0.24em] ${
          dark ? "text-ink/60" : "text-white/70"
        }`}
      >
        {trail.map((c, i) => (
          <li key={i} className="flex items-center gap-3">
            {i > 0 ? <span aria-hidden className={`h-px w-4 ${dark ? "bg-ink/30" : "bg-white/40"}`} /> : null}
            {c.href && i < trail.length - 1 ? (
              <Link href={c.href} className={`link-underline ${dark ? "hover:text-ink" : "hover:text-white"}`}>
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === trail.length - 1 ? "page" : undefined} className={dark ? "text-ink" : "text-white/95"}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
