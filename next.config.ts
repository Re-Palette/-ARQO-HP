import type { NextConfig } from "next";
import { projects } from "./src/lib/content";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Projects that live on their own site: keep old /projects/[slug] URLs working.
  async redirects() {
    return projects
      .filter((p) => p.externalUrl)
      .map((p) => ({ source: `/projects/${p.slug}`, destination: p.externalUrl!, permanent: false }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
