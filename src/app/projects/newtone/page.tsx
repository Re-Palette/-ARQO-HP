import type { Metadata, Viewport } from "next";
import { Anton, Cormorant_Garamond, Jost, Kaushan_Script, Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import { NewtoneSite } from "@/components/newtone/NewtoneSite";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-nt-anton", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-nt-cormorant", display: "swap" });
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-nt-jost", display: "swap" });
const kaushan = Kaushan_Script({ subsets: ["latin"], weight: "400", variable: "--font-nt-kaushan", display: "swap" });
const shippori = Shippori_Mincho({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-nt-shippori", display: "swap", preload: false });
const zen = Zen_Kaku_Gothic_New({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-nt-zen", display: "swap", preload: false });

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
  const fonts = [anton, cormorant, jost, kaushan, shippori, zen].map((f) => f.variable).join(" ");
  return <NewtoneSite fontClassName={fonts} />;
}
