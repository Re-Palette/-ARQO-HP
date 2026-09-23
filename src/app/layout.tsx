import type { Metadata, Viewport } from "next";
import {
  Geist,
  Instrument_Serif,
  Inter,
  Noto_Serif_JP,
  Playfair_Display,
  Shippori_Mincho,
} from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/lib/content";
import "./globals.css";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
  display: "swap",
});

const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-shippori",
  display: "swap",
  preload: false,
});

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-noto-serif-jp",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: false,
});

const title = `${site.name} | ${site.mission}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "ARQO",
    "ソーシャルベンチャー",
    "スタートアップ",
    "美容福祉",
    "教育",
    "コミュニティ",
    "AI",
    "Re-Palette",
    "Nuance Lounge",
    "NEWTONE",
  ],
  authors: [{ name: site.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/images/og.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f5",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  slogan: site.mission,
  description: site.description,
  brand: [
    { "@type": "Brand", name: "Re-Palette" },
    { "@type": "Brand", name: "Nuance Lounge" },
    { "@type": "Brand", name: "NEWTONE" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={[
        instrument.variable,
        playfair.variable,
        shippori.variable,
        notoSerif.variable,
        inter.variable,
        geist.variable,
      ].join(" ")}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-sm"
        >
          本文へスキップ
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
