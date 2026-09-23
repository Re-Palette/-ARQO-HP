/**
 * Generates cinematic placeholder imagery for the ARQO site.
 *
 * All visuals are rendered from SVG (gradients, turbulence, blur) so the
 * project works offline and carries no licensing risk. Replace any file in
 * /public/images with real photography of the same name and aspect ratio.
 *
 * hero.jpg and og.jpg are real photography and are intentionally not
 * generated here, so re-running this script never overwrites them.
 *
 *   npm run images
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "images");

/* ------------------------------------------------------------------ */
/* helpers                                                            */
/* ------------------------------------------------------------------ */

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const svg = (w, h, body, defs = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs}</defs>${body}</svg>`;

/** Fractal-noise clouds, alpha-masked so only the bright lumps remain. */
const cloudFilter = (id, { freq = 0.004, octaves = 5, seed = 3, cut = -0.55, gain = 2.4 } = {}) => `
  <filter id="${id}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="${freq} ${freq * 2.2}" numOctaves="${octaves}" seed="${seed}" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 ${gain} ${cut}" result="c"/>
    <feGaussianBlur in="c" stdDeviation="6"/>
  </filter>`;

const grain = (id, opacity = 0.06) => `
  <filter id="${id}">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 ${opacity} 0"/>
  </filter>`;

const blur = (id, sd) =>
  `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${sd}"/></filter>`;

/** A soft city skyline silhouette along the bottom edge. */
function skyline(w, h, baseY, { seed = 1, color = "#6d7f9c", opacity = 1, minH = 40, maxH = 260, gap = 4 } = {}) {
  const r = rng(seed);
  let x = -20;
  let d = "";
  while (x < w + 20) {
    const bw = 18 + r() * 70;
    const bh = minH + Math.pow(r(), 2.2) * (maxH - minH);
    d += `M${x.toFixed(1)} ${h} V${(baseY - bh).toFixed(1)} H${(x + bw).toFixed(1)} V${h} Z `;
    // occasional antenna
    if (r() > 0.85) {
      const ax = x + bw / 2;
      d += `M${(ax - 1.2).toFixed(1)} ${(baseY - bh).toFixed(1)} V${(baseY - bh - 30 - r() * 40).toFixed(1)} H${(ax + 1.2).toFixed(1)} V${(baseY - bh).toFixed(1)} Z `;
    }
    x += bw + gap * r();
  }
  return `<path d="${d}" fill="${color}" opacity="${opacity}"/>`;
}

function bokeh(w, h, n, { seed = 4, colors = ["#fff"], rMin = 8, rMax = 60, oMin = 0.05, oMax = 0.35 } = {}) {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < n; i++) {
    const c = colors[Math.floor(r() * colors.length)];
    out += `<circle cx="${(r() * w).toFixed(0)}" cy="${(r() * h).toFixed(0)}" r="${(rMin + r() * (rMax - rMin)).toFixed(0)}" fill="${c}" opacity="${(oMin + r() * (oMax - oMin)).toFixed(2)}"/>`;
  }
  return out;
}

async function write(name, w, h, markup, quality = 78) {
  await sharp(Buffer.from(markup), { density: 72 })
    .resize(w, h)
    .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, name));
  console.log("  ✓", name);
}

/* ------------------------------------------------------------------ */
/* scenes                                                             */
/* ------------------------------------------------------------------ */

/** White curved architecture ("sail") against a soft sky (About). */
function architecture(w, h) {
  const defs = `
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#b9d4ee"/>
      <stop offset="0.55" stop-color="#dbe7f4"/>
      <stop offset="1" stop-color="#f3dfe6"/>
    </linearGradient>
    <linearGradient id="sail" x1="0" y1="0" x2="1" y2="0.3">
      <stop offset="0" stop-color="#f7f8fa"/>
      <stop offset="0.45" stop-color="#e3e8ef"/>
      <stop offset="0.7" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#cfd8e4"/>
    </linearGradient>
    <linearGradient id="sail2" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#c7d3e2" stop-opacity="0.8"/>
    </linearGradient>
    <radialGradient id="flare" cx="0.62" cy="0.18" r="0.35">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    ${cloudFilter("clouds", { freq: 0.003, seed: 31, cut: -0.66, gain: 2.4 })}
    ${blur("b2", 2)}${blur("b30", 30)}
    ${grain("grain", 0.06)}`;
  const body = `
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <rect width="${w}" height="${h}" filter="url(#clouds)" opacity="0.8"/>
    <path d="M${-w * 0.05} ${-h * 0.05} C ${w * 0.25} ${h * 0.1}, ${w * 0.45} ${h * 0.35}, ${w * 0.55} ${h * 1.05} L ${-w * 0.05} ${h * 1.05} Z" fill="url(#sail)"/>
    <path d="M${-w * 0.05} ${-h * 0.05} C ${w * 0.25} ${h * 0.1}, ${w * 0.45} ${h * 0.35}, ${w * 0.55} ${h * 1.05}" fill="none" stroke="#ffffff" stroke-width="3" filter="url(#b2)"/>
    <path d="M${w * 0.1} ${-h * 0.05} C ${w * 0.35} ${h * 0.02}, ${w * 0.62} ${h * 0.12}, ${w * 0.8} ${h * 0.4} L ${w * 0.62} ${h * 0.42} C ${w * 0.5} ${h * 0.2}, ${w * 0.3} ${h * 0.06}, ${w * 0.1} ${-h * 0.05} Z" fill="url(#sail2)" opacity="0.85"/>
    <line x1="${w * 0.3}" y1="${h * 0.36}" x2="${w * 0.3}" y2="${h * 1.05}" stroke="#8a97a8" stroke-width="5" opacity="0.6"/>
    <rect width="${w}" height="${h}" fill="url(#flare)"/>
    <rect width="${w}" height="${h}" filter="url(#grain)"/>`;
  return svg(w, h, body, defs);
}

/** Pastel prism / light-leak portrait mood (Re-Palette). */
function prism(w, h, seed = 1) {
  const defs = `
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f6e4ea"/>
      <stop offset="0.5" stop-color="#e6ddf5"/>
      <stop offset="1" stop-color="#dfe9f7"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.55" cy="0.35" r="0.5">
      <stop offset="0" stop-color="#fff5ef" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#fff5ef" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffc4d0" stop-opacity="0"/>
      <stop offset="0.25" stop-color="#ffd6c2" stop-opacity="0.8"/>
      <stop offset="0.45" stop-color="#fff2c4" stop-opacity="0.7"/>
      <stop offset="0.6" stop-color="#c9f0e4" stop-opacity="0.6"/>
      <stop offset="0.78" stop-color="#c7d4ff" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#e2c8ff" stop-opacity="0"/>
    </linearGradient>
    ${blur("b60", 60)}${blur("b20", 20)}${blur("b120", 120)}
    ${grain("grain", 0.06)}`;
  const body = `
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <ellipse cx="${w * 0.52}" cy="${h * 0.36}" rx="${w * 0.24}" ry="${h * 0.22}" fill="#f2d3d6" filter="url(#b120)" opacity="0.9"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.9}" rx="${w * 0.45}" ry="${h * 0.25}" fill="#e9d8ef" filter="url(#b120)"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>
    <g filter="url(#b20)" transform="rotate(-28 ${w / 2} ${h / 2})">
      <rect x="${-w * 0.2}" y="${h * 0.52}" width="${w * 1.4}" height="${h * 0.07}" fill="url(#rainbow)"/>
      <rect x="${-w * 0.2}" y="${h * 0.66}" width="${w * 1.4}" height="${h * 0.035}" fill="url(#rainbow)" opacity="0.7"/>
    </g>
    <g filter="url(#b60)">${bokeh(w, h, 16, { seed: seed + 40, colors: ["#ffffff", "#ffe3ea", "#e5dcff"], rMin: 20, rMax: 110, oMax: 0.55 })}</g>
    <rect width="${w}" height="${h}" filter="url(#grain)"/>`;
  return svg(w, h, body, defs);
}

/** Warm daylight interior with window light (Education / Nuance Lounge). */
function interior(w, h, { seed = 2, green = false } = {}) {
  const r = rng(seed);
  const defs = `
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${green ? "#e8e6d9" : "#efe9e1"}"/>
      <stop offset="0.6" stop-color="${green ? "#cfcfbd" : "#d9d0c4"}"/>
      <stop offset="1" stop-color="${green ? "#6f735f" : "#9d9284"}"/>
    </linearGradient>
    <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fffaf0" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#fffaf0" stop-opacity="0"/>
    </linearGradient>
    ${blur("b4", 4)}${blur("b18", 18)}${blur("b50", 50)}
    ${grain("grain", 0.08)}`;
  let windows = "";
  const cols = 5;
  for (let i = 0; i < cols; i++) {
    const x = w * 0.08 + i * (w * 0.84) / cols;
    windows += `<rect x="${x}" y="${h * 0.06}" width="${(w * 0.84) / cols - 14}" height="${h * 0.42}" fill="#fffdf7" opacity="0.95"/>`;
    windows += `<line x1="${x}" y1="${h * 0.27}" x2="${x + (w * 0.84) / cols - 14}" y2="${h * 0.27}" stroke="#b9ad9c" stroke-width="5"/>`;
  }
  let plants = "";
  if (green) {
    for (let i = 0; i < 40; i++) {
      const cx = w * (0.05 + r() * 0.25);
      const cy = h * (0.35 + r() * 0.35);
      plants += `<ellipse cx="${cx}" cy="${cy}" rx="${20 + r() * 50}" ry="${8 + r() * 20}" transform="rotate(${r() * 180} ${cx} ${cy})" fill="${r() > 0.5 ? "#4d6a3f" : "#6f8f55"}" opacity="0.85"/>`;
    }
  }
  let tables = "";
  for (let i = 0; i < 3; i++) {
    const y = h * (0.62 + i * 0.12);
    tables += `<rect x="${w * (0.1 - i * 0.05)}" y="${y}" width="${w * (0.8 + i * 0.1)}" height="${h * 0.03}" rx="6" fill="#c4b39c" opacity="${0.6 + i * 0.1}"/>`;
    for (let j = 0; j < 4 + i; j++) {
      const cx = w * (0.14 + j * (0.72 / (3 + i))) + r() * 20;
      tables += `<ellipse cx="${cx}" cy="${y - h * 0.05}" rx="${w * 0.04 + i * 8}" ry="${h * 0.05 + i * 8}" fill="${["#fbfaf7", "#e8e1d6", "#8c7f73"][Math.floor(r() * 3)]}" opacity="0.8"/>`;
      tables += `<circle cx="${cx}" cy="${y - h * 0.11 - i * 4}" r="${w * 0.02 + i * 5}" fill="#5a4a40" opacity="0.55"/>`;
    }
  }
  const body = `
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <g filter="url(#b18)">${windows}</g>
    <polygon points="${w * 0.1},${h * 0.1} ${w * 0.9},${h * 0.1} ${w * 1.2},${h} ${w * 0.3},${h}" fill="url(#beam)" filter="url(#b50)" opacity="0.7"/>
    <g filter="url(#b18)">${plants}</g>
    <g filter="url(#b18)" opacity="0.75">${tables}</g>
    <rect width="${w}" height="${h}" fill="#fff6ea" opacity="0.12"/>
    <rect width="${w}" height="${h}" filter="url(#grain)"/>`;
  return svg(w, h, body, defs);
}

/** Night stage with beams and crowd silhouette (Community / NEWTONE). */
function stage(w, h, { seed = 3, hue = "violet" } = {}) {
  const r = rng(seed);
  const palette =
    hue === "violet"
      ? { top: "#0f1330", mid: "#2a1d57", beam: ["#b7a6ff", "#ff9fd4", "#8fd3ff"] }
      : { top: "#0b1228", mid: "#15254f", beam: ["#9ab8ff", "#d3b3ff", "#ffffff"] };
  const defs = `
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${palette.top}"/>
      <stop offset="0.6" stop-color="${palette.mid}"/>
      <stop offset="1" stop-color="#0a0b18"/>
    </linearGradient>
    ${palette.beam
      .map(
        (c, i) => `<linearGradient id="beam${i}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c}" stop-opacity="0.95"/>
      <stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient>`
      )
      .join("")}
    ${blur("b8", 8)}${blur("b30", 30)}${blur("b3", 3)}
    ${grain("grain", 0.1)}`;
  let beams = "";
  for (let i = 0; i < 9; i++) {
    const x = w * (0.1 + r() * 0.8);
    const spread = w * (0.08 + r() * 0.2);
    const tilt = (r() - 0.5) * w * 0.6;
    beams += `<polygon points="${x},${-10} ${x + 6},${-10} ${x + tilt + spread},${h * 0.9} ${x + tilt - spread},${h * 0.9}" fill="url(#beam${i % 3})" opacity="${0.25 + r() * 0.35}"/>`;
  }
  let crowd = "";
  for (let i = 0; i < 70; i++) {
    const cx = r() * w;
    const cy = h * (0.84 + r() * 0.12);
    const s = 14 + r() * 18;
    crowd += `<circle cx="${cx}" cy="${cy}" r="${s}" fill="#05060d"/><rect x="${cx - s * 1.5}" y="${cy + s * 0.7}" width="${s * 3}" height="${h}" rx="${s}" fill="#05060d"/>`;
    if (r() > 0.8) crowd += `<rect x="${cx + s * 0.6}" y="${cy - s * 4}" width="${s * 0.45}" height="${s * 4}" rx="4" fill="#05060d" transform="rotate(${(r() - 0.5) * 30} ${cx} ${cy})"/>`;
  }
  const body = `
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <g filter="url(#b8)" style="mix-blend-mode:screen">${beams}</g>
    <g filter="url(#b30)">${bokeh(w, h * 0.7, 28, { seed: seed + 9, colors: palette.beam, rMin: 6, rMax: 40, oMin: 0.2, oMax: 0.7 })}</g>
    <g filter="url(#b3)">${crowd}</g>
    <rect width="${w}" height="${h}" filter="url(#grain)"/>`;
  return svg(w, h, body, defs);
}

/** Deep blue constellation / neural network (AI & Technology). */
function network(w, h, seed = 5) {
  const r = rng(seed);
  const nodes = Array.from({ length: 90 }, () => [r() * w, r() * h, r()]);
  let lines = "";
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i][0] - nodes[j][0];
      const dy = nodes[i][1] - nodes[j][1];
      const d = Math.hypot(dx, dy);
      if (d < w * 0.12)
        lines += `<line x1="${nodes[i][0]}" y1="${nodes[i][1]}" x2="${nodes[j][0]}" y2="${nodes[j][1]}" stroke="#bcd3ff" stroke-width="1.2" opacity="${(0.55 * (1 - d / (w * 0.12))).toFixed(2)}"/>`;
    }
  }
  const dots = nodes
    .map(([x, y, s]) => `<circle cx="${x}" cy="${y}" r="${1.5 + s * 3.5}" fill="#eaf1ff" opacity="${0.4 + s * 0.6}"/>`)
    .join("");
  const defs = `
    <radialGradient id="bg" cx="0.65" cy="0.35" r="0.9">
      <stop offset="0" stop-color="#3a5aa6"/>
      <stop offset="0.45" stop-color="#1b2a5c"/>
      <stop offset="1" stop-color="#0a1130"/>
    </radialGradient>
    <radialGradient id="aura" cx="0.6" cy="0.4" r="0.4">
      <stop offset="0" stop-color="#b8a7ff" stop-opacity="0.6"/>
      <stop offset="1" stop-color="#b8a7ff" stop-opacity="0"/>
    </radialGradient>
    ${blur("b2", 1.2)}${blur("b10", 10)}
    ${grain("grain", 0.08)}`;
  const body = `
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <rect width="${w}" height="${h}" fill="url(#aura)"/>
    <g filter="url(#b2)">${lines}</g>
    <g filter="url(#b10)">${dots}</g>
    <g>${dots}</g>
    <rect width="${w}" height="${h}" filter="url(#grain)"/>`;
  return svg(w, h, body, defs);
}

/** Dusk city skyline with sunset gradient (Vision / Footer). */
function sunset(w, h, { seed = 8, deep = false } = {}) {
  const defs = `
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${deep ? "#1d2346" : "#34406f"}"/>
      <stop offset="0.35" stop-color="${deep ? "#4a3f78" : "#7a6aa6"}"/>
      <stop offset="0.6" stop-color="#d48ea6"/>
      <stop offset="0.78" stop-color="#f6b79a"/>
      <stop offset="0.9" stop-color="#ffd7a8"/>
      <stop offset="1" stop-color="#ffe7c7"/>
    </linearGradient>
    <radialGradient id="sun" cx="0.5" cy="0.86" r="0.35">
      <stop offset="0" stop-color="#fff3dc" stop-opacity="1"/>
      <stop offset="0.3" stop-color="#ffd6a6" stop-opacity="0.6"/>
      <stop offset="1" stop-color="#ffb58f" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff"/>
      <stop offset="0.55" stop-color="#fff" stop-opacity="0.8"/>
      <stop offset="0.85" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="cloudMask"><rect width="${w}" height="${h}" fill="url(#fade)"/></mask>
    ${cloudFilter("clouds", { freq: 0.0025, seed: seed + 3, cut: -0.64, gain: 2.5 })}
    ${blur("b3", 5)}${blur("b8", 10)}${blur("b60", 60)}
    ${grain("grain", 0.08)}`;
  const body = `
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <g opacity="0.5" mask="url(#cloudMask)">
      <rect width="${w}" height="${h}" filter="url(#clouds)"/>
    </g>
    <rect y="${h * 0.3}" width="${w}" height="${h * 0.7}" fill="url(#sun)"/>
    <g filter="url(#b8)">
      ${skyline(w, h, h * 0.93, { seed: seed + 20, color: "#8a6c8a", opacity: 0.45, minH: 30, maxH: 160, gap: 30 })}
    </g>
    <g filter="url(#b3)">
      ${skyline(w, h, h * 0.99, { seed: seed, color: "#2a2238", opacity: 0.88, minH: 10, maxH: 190, gap: 24 })}
    </g>
    <g filter="url(#b60)">${bokeh(w, h, 10, { seed: seed + 2, colors: ["#fff1e0"], rMin: 30, rMax: 80, oMax: 0.25 })}</g>
    <rect width="${w}" height="${h}" filter="url(#grain)"/>`;
  return svg(w, h, body, defs);
}

/** Cherry-blossom-ish pink bloom (news). */
function bloom(w, h, seed = 12) {
  const defs = `
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fbe7ee"/>
      <stop offset="1" stop-color="#eadcf5"/>
    </linearGradient>
    ${blur("b12", 12)}${blur("b2", 2)}
    ${grain("grain", 0.06)}`;
  const body = `
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <g filter="url(#b12)">${bokeh(w, h, 50, { seed, colors: ["#f5b8c9", "#ffd9e3", "#ffffff", "#e9c6f0"], rMin: 20, rMax: 90, oMin: 0.3, oMax: 0.8 })}</g>
    <g filter="url(#b2)">${bokeh(w, h, 40, { seed: seed + 1, colors: ["#f7c4d2", "#fff"], rMin: 6, rMax: 18, oMin: 0.4, oMax: 0.9 })}</g>
    <rect width="${w}" height="${h}" filter="url(#grain)"/>`;
  return svg(w, h, body, defs);
}

/* ------------------------------------------------------------------ */

await mkdir(OUT, { recursive: true });
console.log("Generating placeholders →", path.relative(process.cwd(), OUT));

await write("about-architecture.jpg", 1600, 1200, architecture(1600, 1200));
await write("service-repalette.jpg", 1000, 1400, prism(1000, 1400, 1));
await write("service-education.jpg", 1000, 1400, interior(1000, 1400, { seed: 2 }));
await write("service-community.jpg", 1000, 1400, stage(1000, 1400, { seed: 3, hue: "violet" }));
await write("service-ai.jpg", 1000, 1400, network(1000, 1400, 5));
await write("brand-repalette.jpg", 900, 1200, prism(900, 1200, 7));
await write("brand-nuance.jpg", 900, 1200, interior(900, 1200, { seed: 6, green: true }));
await write("brand-newtone.jpg", 900, 1200, stage(900, 1200, { seed: 13, hue: "blue" }));
await write("vision.jpg", 2400, 1400, sunset(2400, 1400, { seed: 8 }), 80);
await write("footer.jpg", 2400, 1200, sunset(2400, 1200, { seed: 17, deep: true }), 78);
await write("news-event.jpg", 1000, 640, interior(1000, 640, { seed: 9, green: true }));
await write("news-brand.jpg", 1000, 640, bloom(1000, 640, 12));
await write("news-tech.jpg", 1000, 640, network(1000, 640, 21));
await write("news-community.jpg", 1000, 640, stage(1000, 640, { seed: 30, hue: "violet" }));

console.log("Done.");
