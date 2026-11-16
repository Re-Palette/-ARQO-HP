import type { Metadata, Viewport } from "next";
import { NewtoneSite } from "@/components/newtone/NewtoneSite";

/*
 * NEWTONE's fonts load from Google Fonts in the browser, as on the original site.
 * next/font fetched them at build time, and Google Fonts started returning a font URL
 * without a file extension on Vercel's builders, which next/font cannot parse.
 */
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Anton&family=Cormorant+Garamond:wght@400;600&family=Jost:wght@400;500;600&family=Kaushan+Script&family=Shippori+Mincho:wght@500;600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap";

const description =
  "次世代の美容ブランドPOPUP『NEWTONE 2027』。美しさは、わたしたちがつくる未来。学生起業家が生み出す、新しい美容のカタチ。";

export const metadata: Metadata = {
  title: { absolute: "NEWTONE 2027 — 次世代の美容ブランドPOPUP" },
  description,
  alternates: { canonical: "/projects/newtone" },
  openGraph: {
    title: "NEWTONE 2027 — The Next Beauty.",
    description: "次世代の美容ブランドPOPUP。美しさは、わたしたちがつくる未来。",
    url: "/projects/newtone",
    images: [{ url: "/newtone/hero.webp", width: 1672, height: 941 }],
  },
  twitter: { card: "summary_large_image", images: ["/newtone/hero.webp"] },
};

export const viewport: Viewport = { themeColor: "#0d1452" };

export default function NewtonePage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* React hoists a stylesheet with `precedence` into <head> */}
      <link rel="stylesheet" href={FONTS_URL} precedence="default" />
      <NewtoneSite />
    </>
  );
}
