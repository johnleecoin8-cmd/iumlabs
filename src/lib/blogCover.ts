/**
 * Generative halftone cover engine for the blog.
 *
 * Every post gets a unique, topic-matched cover: a fine dot-matrix (halftone)
 * rendering of a generative motif (candlestick chart, coin field, ripple rings,
 * circuit weave, block grid, wave interference, or a soft bloom), tinted with a
 * per-topic palette. A per-slug seed varies the composition so two posts that
 * share a motif still look different. Rendered to a <canvas> by BlogCover.
 */

export type Motif = "candles" | "coin" | "rings" | "maze" | "grid" | "waves" | "bloom";
type Stop = [number, [number, number, number]];

const PALETTES: Record<string, Stop[]> = {
  EM: [[0, [10, 30, 24]], [0.35, [18, 120, 90]], [0.62, [56, 200, 156]], [0.82, [160, 242, 214]], [1, [255, 255, 255]]],
  GO: [[0, [22, 18, 8]], [0.4, [120, 90, 30]], [0.68, [210, 170, 70]], [0.86, [245, 225, 160]], [1, [255, 250, 230]]],
  CY: [[0, [8, 24, 40]], [0.35, [20, 110, 160]], [0.62, [70, 200, 230]], [0.82, [180, 240, 250]], [1, [255, 255, 255]]],
  VI: [[0, [28, 20, 54]], [0.35, [86, 64, 170]], [0.62, [150, 120, 225]], [0.82, [205, 195, 245]], [1, [255, 255, 255]]],
  BL: [[0, [12, 18, 50]], [0.35, [30, 70, 200]], [0.62, [80, 140, 250]], [0.82, [185, 210, 250]], [1, [255, 255, 255]]],
  MG: [[0, [40, 14, 46]], [0.35, [140, 40, 150]], [0.62, [220, 90, 200]], [0.82, [245, 190, 235]], [1, [255, 255, 255]]],
};
const BG: Record<string, string> = { EM: "#06120d", GO: "#0d0a04", CY: "#04101a", VI: "#0a0820", BL: "#060a1c", MG: "#16071a" };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
function ramp(s: Stop[], v: number): string {
  v = clamp(v);
  for (let i = 0; i < s.length - 1; i++) {
    const a = s[i], b = s[i + 1];
    if (v <= b[0]) {
      const t = b[0] > a[0] ? (v - a[0]) / (b[0] - a[0]) : 0, c = a[1], d = b[1];
      return `rgb(${Math.round(lerp(c[0], d[0], t))},${Math.round(lerp(c[1], d[1], t))},${Math.round(lerp(c[2], d[2], t))})`;
    }
  }
  const e = s[s.length - 1][1];
  return `rgb(${e[0]},${e[1]},${e[2]})`;
}

// Deterministic 0..1 seed from a slug.
function seedOf(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) { h ^= slug.charCodeAt(i); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 10000) / 10000;
}

// ---- Mask motifs (drawn white-on-black, then halftone-sampled) ----
function candles(o: CanvasRenderingContext2D, W: number, H: number, sd: number) {
  const n = 15, m = W * 0.05, span = W - 2 * m, step = span / n, base = H * 0.95, top = H * 0.3;
  let price = 0.35 + sd * 0.1;
  for (let i = 0; i < n; i++) {
    const x = m + step * (i + 0.5);
    price += Math.sin(i * 1.3 + sd * 6) * 0.045 + 0.018 + (i / n) * 0.02;
    const open = price - Math.sin(i * 2.1 + sd) * 0.06;
    const hi = Math.max(price, open) + 0.05, lo = Math.min(price, open) - 0.05;
    const Y = (p: number) => base - (base - top) * clamp(p);
    const bw = step * 0.52;
    o.fillRect(x - W * 0.0024, Y(hi), W * 0.0048, Y(lo) - Y(hi));
    const by = Y(Math.max(open, price)), bh = Math.max(H * 0.006, Y(Math.min(open, price)) - by);
    o.fillRect(x - bw / 2, by, bw, bh);
  }
}
function coin(o: CanvasRenderingContext2D, W: number, H: number, sd: number) {
  const disk = (cx: number, cy: number, r: number, won: boolean) => {
    o.beginPath(); o.arc(cx, cy, r, 0, 6.2832); o.fill();
    if (won) {
      o.globalCompositeOperation = "destination-out";
      o.font = `bold ${r * 1.35}px Arial`; o.textAlign = "center"; o.textBaseline = "middle";
      o.fillText("₩", cx, cy + r * 0.05);
      o.globalCompositeOperation = "source-over";
    }
  };
  disk(W * 0.5, H * 0.58, W * 0.22, true);
  disk(W * (0.76 + sd * 0.06), H * 0.32, W * 0.075, false);
  disk(W * (0.2 + sd * 0.05), H * 0.8, W * 0.1, false);
  o.lineWidth = W * 0.012; o.beginPath(); o.arc(W * 0.5, H * 0.58, W * 0.31, 0, 6.2832); o.stroke();
}

// ---- Analytic motifs (value field at x,y in [0,1]) ----
function valFor(motif: Motif, sd: number): (x: number, y: number) => number {
  const ph = sd * 6.283;
  if (motif === "rings") {
    const cx = 0.5 + (sd - 0.5) * 0.22, cy = 0.72;
    return (x, y) => { const d = Math.hypot(x - cx, y - cy); return 0.13 + 0.5 * (0.5 + 0.5 * Math.sin(30 * d - ph)) * Math.exp(-d * 0.7) + 0.45 * Math.exp(-(d * d) / 0.018); };
  }
  if (motif === "maze") {
    return (x, y) => { const a = Math.abs(Math.sin(30 * (x + y) + ph)), b = Math.abs(Math.sin(28 * (x - y) + ph * 0.5)); return 0.15 + 0.6 * Math.pow(a * b, 0.55); };
  }
  if (motif === "waves") {
    const S: [number, number][] = [[0.3 + sd * 0.1, 0.72], [0.72 - sd * 0.1, 0.56], [0.5, 0.92]];
    return (x, y) => { let s = 0; for (let i = 0; i < S.length; i++) { const d = Math.hypot(x - S[i][0], y - S[i][1]); s += Math.sin(24 * d - ph * (i + 1)); } return 0.3 + 0.13 * s; };
  }
  if (motif === "grid") {
    const lp = (f: number) => { f = f - Math.floor(f); const g = f < 0.5 ? f : 1 - f; return Math.exp(-Math.pow(g / 0.05, 2)); };
    const gx = 0.31 + sd * 0.05;
    return (x, y) => { const xx = x + 0.32 * y; return 0.15 + 0.56 * Math.max(lp(xx * 9 + gx), lp(y * 12)) + 0.32 * Math.exp(-((x - 0.5) ** 2 + (y - 0.62) ** 2) / 0.1); };
  }
  // bloom (soft metaball nebula)
  const B: [number, number, number, number][] = [
    [0.42 + sd * 0.16, 0.36 + sd * 0.1, 0.34, 0.95],
    [0.72 - sd * 0.12, 0.66, 0.24, 0.55],
    [0.6, 0.2 + sd * 0.1, 0.16, 0.5],
  ];
  return (x, y) => {
    let v = 0.1 + 0.16 * (1 - y);
    for (const b of B) { const dx = x - b[0], dy = y - b[1]; v += b[3] * Math.exp(-((dx * dx + dy * dy) / (b[2] * b[2]))); }
    v += 0.06 * Math.sin(5.5 * x + 3.2 * y + ph);
    return v;
  };
}

/** Render a halftone cover onto a canvas (uses its backing-store width/height). */
export function drawCover(canvas: HTMLCanvasElement, motif: Motif, palKey: string, slug: string) {
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx || W === 0 || H === 0) return;
  const pal = PALETTES[palKey] || PALETTES.EM;
  ctx.fillStyle = BG[palKey] || "#0a0a0a";
  ctx.fillRect(0, 0, W, H);
  const sd = seedOf(slug);

  let data: Uint8ClampedArray | null = null;
  if (motif === "candles" || motif === "coin") {
    const off = document.createElement("canvas"); off.width = W; off.height = H;
    const o = off.getContext("2d")!;
    o.fillStyle = "#000"; o.fillRect(0, 0, W, H);
    o.fillStyle = "#fff"; o.strokeStyle = "#fff"; o.lineCap = "round";
    o.filter = `blur(${Math.max(1.5, W * 0.004)}px)`;
    (motif === "candles" ? candles : coin)(o, W, H, sd);
    o.filter = "none";
    data = o.getImageData(0, 0, W, H).data;
  }
  const val = data ? null : valFor(motif, sd);

  const cols = 42, s = W / cols, rows = Math.ceil(H / s) + 1, half = s / 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = (c + 0.5) * s, cy = (r + 0.5) * s;
      let v: number;
      if (val) v = val(cx / W, cy / H);
      else { const px = Math.min(W - 1, Math.round(cx)), py = Math.min(H - 1, Math.round(cy)); v = 0.12 + 0.86 * (data![(py * W + px) * 4] / 255); }
      // light deterministic dither (no Math.random so it stays stable across redraws)
      v = clamp(v + (((c * 7 + r * 13) % 5) - 2) * 0.008);
      ctx.fillStyle = ramp(pal, v);
      ctx.beginPath(); ctx.arc(cx, cy, half * (0.24 + 0.74 * v), 0, 6.2832); ctx.fill();
    }
  }
}

type PostLike = { slug?: string; title?: string; category?: string | null; date?: string };

// Keyword -> {motif, palette}. First match in the (lowercased) title wins; then category; then default.
const KW: [RegExp, Motif, string][] = [
  [/won-?stablecoin|stablecoin endgame|basic act/i, "coin", "GO"],
  [/stablecoin|usdt|usdc/i, "coin", "CY"],
  [/memecoin|meme/i, "candles", "EM"],
  [/upbit|bithumb|exchange listing|listing|cex power|dominance/i, "candles", "BL"],
  [/kimchi|premium/i, "candles", "GO"],
  [/naver|search|seo/i, "rings", "VI"],
  [/kakao|telegram|community/i, "bloom", "MG"],
  [/kol|influencer/i, "waves", "MG"],
  [/\bai\b|depin/i, "maze", "CY"],
  [/regulation|vaupa|travel rule|ban\b|compliance/i, "maze", "CY"],
  [/rwa|tokeniz|institution|capital|family office|\bvc\b/i, "grid", "GO"],
  [/defi|on-?chain/i, "grid", "CY"],
  [/japan|vs |comparison/i, "grid", "BL"],
  [/gtm|go-?to-?market|funnel|acquisition/i, "waves", "EM"],
  [/launch timing|quarterly|cycle/i, "rings", "EM"],
];
const CAT: Record<string, [Motif, string]> = {
  "Regulation": ["maze", "CY"],
  "Market Research": ["candles", "EM"],
  "GTM Strategy": ["waves", "EM"],
  "Community": ["bloom", "MG"],
  "Technology": ["maze", "BL"],
  "Stablecoins": ["coin", "GO"],
  "DeFi": ["grid", "CY"],
  "Marketing": ["waves", "MG"],
  "Strategy": ["grid", "BL"],
};

export function coverFor(post: PostLike): { motif: Motif; pal: string; year: string } {
  const title = post.title || "";
  for (const [re, motif, pal] of KW) if (re.test(title)) return { motif, pal, year: yearOf(post) };
  const c = post.category && CAT[post.category];
  if (c) return { motif: c[0], pal: c[1], year: yearOf(post) };
  return { motif: "bloom", pal: "EM", year: yearOf(post) };
}

function yearOf(post: PostLike): string {
  const m = (post.date || "").match(/(20\d\d)/);
  return m ? m[1] : "2026";
}
