/**
 * Generative halftone cover engine for the blog.
 *
 * Every post's cover is derived deterministically from its title/slug (and,
 * when given, its category). A seeded PRNG drives:
 *   - a palette ARCHETYPE (mono, complementary duotone, analogous, neon-accent)
 *     whose base hue is anchored to the post's category so topics read as colour
 *     families, then jittered by the title hash so no two posts share a shade;
 *   - a TONAL KEY (low-key moody, mid, or high-key bright) and a contrast gamma,
 *     so some covers are dark and sparse, others luminous and dense;
 *   - one of ~11 MOTIF archetypes (metaballs, ripples, interference, weave,
 *     lattice, spiral, beams, gradient sweep, contour ridges, scatter clusters,
 *     plus topical candlestick/coin masks) with all parameters seeded;
 *   - the dot GRID density, dot SHAPE (disc vs rounded square) and size gamma.
 * The product of those axes is effectively unbounded, so distinct titles render
 * visibly distinct covers with their own vibe. Rendered onto a <canvas> by
 * BlogCover; the title/footer chrome lives in BlogCover.
 */

type RGB = [number, number, number];
type Stop = [number, RGB];

// ---- hashing + PRNG (deterministic per title) ----
function xmur3(str: string): () => number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}
function mulberry32(a: number): () => number {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function hsl(h: number, s: number, l: number): RGB {
  h = ((h % 360) + 360) % 360 / 360;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

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

// Category -> anchor hue, so topics read as colour families. Title hash jitters
// around the anchor (and rotates the accent), so posts in the same category are
// related but never identical, and adjacent posts of different categories never
// collide the way three title-random blues did.
const CATEGORY_HUE: Record<string, number> = {
  regulation: 212,
  "market research": 158,
  marketing: 322,
  strategy: 268,
  "gtm strategy": 286,
  defi: 36,
  stablecoins: 178,
  technology: 196,
  community: 14,
};

interface Palette { stops: Stop[]; bg: string; }

function palette(rand: () => number, category?: string): Palette {
  const anchor = category ? CATEGORY_HUE[category.toLowerCase()] : undefined;
  // Base hue: category anchor jittered +/-34 deg, else free across the wheel.
  const h1 = anchor != null ? (anchor + (rand() - 0.5) * 68 + 360) % 360 : rand() * 360;

  // Four palette archetypes for genuinely different colour stories.
  const scheme = Math.floor(rand() * 4);
  let h2 = h1;
  if (scheme === 1) h2 = (h1 + 150 + rand() * 70) % 360;      // complementary-ish
  else if (scheme === 2) h2 = (h1 + 26 + rand() * 36) % 360;  // analogous
  else if (scheme === 3) h2 = (h1 + 110 + rand() * 40) % 360;  // split accent

  const sat = 0.5 + rand() * 0.45;
  // Tonal key: 0 low-key (dark, sparse glow), 1 mid, 2 high-key (luminous, dense).
  const key = Math.floor(rand() * 3);
  const bgL = key === 0 ? 0.035 + rand() * 0.02 : key === 1 ? 0.055 + rand() * 0.03 : 0.07 + rand() * 0.04;
  const midL = key === 2 ? 0.5 + rand() * 0.12 : 0.32 + rand() * 0.12;
  const peak: RGB = rand() < 0.7 ? [255, 255, 255] : hsl(h2, sat * 0.5, 0.92);

  const stops: Stop[] = [
    [0, hsl(h1, sat * 0.7, bgL + 0.02)],
    [0.28, hsl(h1, sat, Math.max(0.14, midL * 0.6))],
    [0.6, hsl(h1, sat, midL)],
    [0.82, hsl(h2, sat * 0.85, Math.min(0.78, midL + 0.3))],
    [1, peak],
  ];
  const b = hsl(h1, sat * 0.55, bgL);
  return { stops, bg: `rgb(${b[0]},${b[1]},${b[2]})` };
}

// ---- mask motifs (white-on-black, halftone-sampled) ----
function candles(o: CanvasRenderingContext2D, W: number, H: number, rand: () => number) {
  const n = 13 + Math.floor(rand() * 6), m = W * 0.05, span = W - 2 * m, step = span / n;
  const base = H * 0.95, top = H * 0.28;
  let price = 0.3 + rand() * 0.2;
  const drift = 0.012 + rand() * 0.02, jit = 0.04 + rand() * 0.05;
  for (let i = 0; i < n; i++) {
    const x = m + step * (i + 0.5);
    price += Math.sin(i * 1.3 + rand() * 6) * jit + drift;
    const open = price - Math.sin(i * 2.1) * 0.06;
    const hi = Math.max(price, open) + 0.05, lo = Math.min(price, open) - 0.05;
    const Y = (p: number) => base - (base - top) * clamp(p);
    const bw = step * 0.52;
    o.fillRect(x - W * 0.0024, Y(hi), W * 0.0048, Y(lo) - Y(hi));
    const by = Y(Math.max(open, price)), bh = Math.max(H * 0.006, Y(Math.min(open, price)) - by);
    o.fillRect(x - bw / 2, by, bw, bh);
  }
}
function coin(o: CanvasRenderingContext2D, W: number, H: number, rand: () => number) {
  const cy = 0.5 + rand() * 0.18;
  const disk = (cx: number, cyy: number, r: number, won: boolean) => {
    o.beginPath(); o.arc(cx, cyy, r, 0, 6.2832); o.fill();
    if (won) {
      o.globalCompositeOperation = "destination-out";
      o.font = `bold ${r * 1.35}px Arial`; o.textAlign = "center"; o.textBaseline = "middle";
      o.fillText("₩", cx, cyy + r * 0.05);
      o.globalCompositeOperation = "source-over";
    }
  };
  disk(W * 0.5, H * cy, W * 0.22, true);
  disk(W * (0.72 + rand() * 0.1), H * (0.28 + rand() * 0.1), W * 0.07, false);
  disk(W * (0.2 + rand() * 0.08), H * (0.78 + rand() * 0.06), W * 0.1, false);
  o.lineWidth = W * 0.012; o.beginPath(); o.arc(W * 0.5, H * cy, W * 0.31, 0, 6.2832); o.stroke();
}
// node-graph mask for community / network themed posts
function graph(o: CanvasRenderingContext2D, W: number, H: number, rand: () => number) {
  const n = 7 + Math.floor(rand() * 6);
  const pts: number[][] = [];
  for (let i = 0; i < n; i++) pts.push([W * (0.12 + rand() * 0.76), H * (0.14 + rand() * 0.72)]);
  o.lineWidth = Math.max(1, W * 0.004);
  for (let i = 0; i < n; i++) {
    const links = 1 + Math.floor(rand() * 2);
    for (let l = 0; l < links; l++) {
      const j = Math.floor(rand() * n);
      if (j === i) continue;
      o.beginPath(); o.moveTo(pts[i][0], pts[i][1]); o.lineTo(pts[j][0], pts[j][1]); o.stroke();
    }
  }
  for (const p of pts) { o.beginPath(); o.arc(p[0], p[1], W * (0.012 + rand() * 0.03), 0, 6.2832); o.fill(); }
}

// ---- parametric field motif (all params seeded, closure uses only consts) ----
function makeField(rand: () => number): (x: number, y: number) => number {
  const mode = Math.floor(rand() * 11);
  const ang = rand() * Math.PI;
  const a = Math.cos(ang), b = Math.sin(ang);
  const f1 = 8 + rand() * 34, f2 = 8 + rand() * 34;
  const cx = 0.22 + rand() * 0.56, cy = 0.22 + rand() * 0.56;
  const ph = rand() * 6.283, ph2 = rand() * 6.283;
  const lx = 0.2 + rand() * 0.6, ly = 0.12 + rand() * 0.6, lr = 0.26 + rand() * 0.36;
  const glow = (x: number, y: number) => Math.exp(-(((x - lx) ** 2 + (y - ly) ** 2)) / (lr * lr));

  if (mode === 0) { // metaballs
    const nb = 2 + Math.floor(rand() * 4);
    const blobs: number[][] = [];
    for (let i = 0; i < nb; i++) blobs.push([rand(), rand(), 0.12 + rand() * 0.26, 0.55 + rand() * 0.7]);
    return (x, y) => { let v = 0.08 + 0.12 * (1 - y); for (const bb of blobs) v += bb[3] * Math.exp(-(((x - bb[0]) ** 2 + (y - bb[1]) ** 2) / (bb[2] * bb[2]))); return v; };
  }
  if (mode === 1) { // concentric ripples
    return (x, y) => { const d = Math.hypot(x - cx, y - cy); return 0.12 + 0.6 * (0.5 + 0.5 * Math.sin(f1 * d - ph)) * Math.exp(-d * 0.55) + 0.45 * glow(x, y); };
  }
  if (mode === 2) { // multi-source interference
    const S: number[][] = [];
    for (let i = 0; i < 3; i++) S.push([rand(), rand()]);
    return (x, y) => { let s = 0; for (let i = 0; i < S.length; i++) s += Math.sin(f1 * Math.hypot(x - S[i][0], y - S[i][1]) - ph * (i + 1)); return 0.3 + 0.13 * s + 0.28 * glow(x, y); };
  }
  if (mode === 3) { // weave / plaid
    return (x, y) => { const u = x * a + y * b, w = -x * b + y * a; const p = Math.abs(Math.sin(f1 * u + ph)), q = Math.abs(Math.sin(f2 * w + ph2)); return 0.13 + 0.62 * Math.pow(p * q, 0.5) + 0.14 * glow(x, y); };
  }
  if (mode === 4) { // lattice lines
    const lp = (f: number) => { f = f - Math.floor(f); const g = f < 0.5 ? f : 1 - f; return Math.exp(-((g / 0.06) ** 2)); };
    return (x, y) => { const u = x * a + y * b; return 0.14 + 0.58 * Math.max(lp(u * f1 * 0.5), lp(y * f2 * 0.5)) + 0.32 * glow(x, y); };
  }
  if (mode === 5) { // spiral arms
    const arms = 2 + Math.floor(rand() * 6);
    return (x, y) => { const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy), th = Math.atan2(dy, dx); return 0.13 + 0.52 * (0.5 + 0.5 * Math.sin(f1 * d + arms * th + ph)) * Math.exp(-d * 0.65) + 0.38 * glow(x, y); };
  }
  if (mode === 6) { // radial beams
    const beams = 3 + Math.floor(rand() * 9);
    return (x, y) => { const th = Math.atan2(y - cy, x - cx); return 0.14 + 0.55 * (0.5 + 0.5 * Math.sin(beams * th + ph)) * glow(x, y) + 0.16 * glow(x, y); };
  }
  if (mode === 7) { // diagonal gradient sweep with banding
    const bands = 3 + Math.floor(rand() * 7);
    return (x, y) => { const u = x * a + y * b; return 0.1 + 0.7 * clamp(u) * (0.7 + 0.3 * Math.sin(u * bands * 3.14 + ph)) + 0.2 * glow(x, y); };
  }
  if (mode === 8) { // contour ridges (folded sine)
    return (x, y) => { const u = (x - cx) * a + (y - cy) * b; const w = -(x - cx) * b + (y - cy) * a; const r = Math.sin(f1 * u + 0.6 * Math.sin(f2 * w + ph2)); return 0.16 + 0.58 * (0.5 + 0.5 * r) + 0.16 * glow(x, y); };
  }
  if (mode === 9) { // sparse scatter clusters
    const nb = 3 + Math.floor(rand() * 4);
    const blobs: number[][] = [];
    for (let i = 0; i < nb; i++) blobs.push([rand(), rand(), 0.05 + rand() * 0.1, 0.6 + rand() * 0.7]);
    return (x, y) => { let v = 0.07; for (const bb of blobs) v += bb[3] * Math.exp(-(((x - bb[0]) ** 2 + (y - bb[1]) ** 2) / (bb[2] * bb[2]))); return v; };
  }
  // mode 10: horizon / atmospheric gradient with a sun
  return (x, y) => { const horizon = 0.45 + 0.2 * Math.sin(x * 6.283 + ph); return 0.12 + 0.5 * clamp((y - horizon) * 2) + 0.55 * glow(x, y); };
}

/** Render a topic-derived halftone cover onto a canvas (uses backing-store size). */
export function drawCover(canvas: HTMLCanvasElement, key: string, category?: string) {
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx || W === 0 || H === 0) return;
  const k = (key || "ium").toLowerCase();
  const rand = mulberry32(xmur3(k)());

  const pal = palette(rand, category);
  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, W, H);

  // Grid density varies a lot: coarse statement grids vs fine misty halftones.
  const cols = 26 + Math.floor(rand() * 34);
  const square = rand() < 0.28;          // some covers use rounded squares
  const sizeGamma = 0.7 + rand() * 1.2;  // dot-size response curve
  const valGamma = 0.7 + rand() * 1.1;   // value contrast curve
  const minDot = 0.16 + rand() * 0.16;

  // Topical masks for obvious themes; everything else gets a parametric field.
  let data: Uint8ClampedArray | null = null;
  let val: ((x: number, y: number) => number) | null = null;
  const useCoin = /stablecoin|won-?stablecoin/.test(k);
  const useCandles = !useCoin && /memecoin|kimchi|premium|candlestick|launch-timing|squeeze/.test(k);
  const useGraph = !useCoin && !useCandles && /telegram|community|kakaotalk|naver|kol|funnel/.test(k);
  if (useCoin || useCandles || useGraph) {
    const off = document.createElement("canvas"); off.width = W; off.height = H;
    const o = off.getContext("2d")!;
    o.fillStyle = "#000"; o.fillRect(0, 0, W, H);
    o.fillStyle = "#fff"; o.strokeStyle = "#fff"; o.lineCap = "round";
    o.filter = `blur(${Math.max(1.5, W * 0.004)}px)`;
    (useCoin ? coin : useCandles ? candles : graph)(o, W, H, rand);
    o.filter = "none";
    data = o.getImageData(0, 0, W, H).data;
  } else {
    val = makeField(rand);
  }

  const s = W / cols, rows = Math.ceil(H / s) + 1, half = s / 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = (c + 0.5) * s, cy = (r + 0.5) * s;
      let v: number;
      if (val) v = val(cx / W, cy / H);
      else { const px = Math.min(W - 1, Math.round(cx)), py = Math.min(H - 1, Math.round(cy)); v = 0.1 + 0.88 * (data![(py * W + px) * 4] / 255); }
      v = clamp(v + (((c * 7 + r * 13) % 5) - 2) * 0.008);
      const vc = Math.pow(clamp(v), valGamma);
      ctx.fillStyle = ramp(pal.stops, vc);
      const rad = half * (minDot + (0.95 - minDot) * Math.pow(vc, sizeGamma));
      if (square) {
        const rr = rad * 1.18, q = Math.min(rr * 0.4, half * 0.3);
        const x0 = cx - rr, y0 = cy - rr, sz = rr * 2;
        ctx.beginPath();
        ctx.moveTo(x0 + q, y0);
        ctx.arcTo(x0 + sz, y0, x0 + sz, y0 + sz, q);
        ctx.arcTo(x0 + sz, y0 + sz, x0, y0 + sz, q);
        ctx.arcTo(x0, y0 + sz, x0, y0, q);
        ctx.arcTo(x0, y0, x0 + sz, y0, q);
        ctx.fill();
      } else {
        ctx.beginPath(); ctx.arc(cx, cy, rad, 0, 6.2832); ctx.fill();
      }
    }
  }
}

/** Year label from a post date string (falls back to 2026). */
export function coverYear(date?: string): string {
  const m = (date || "").match(/(20\d\d)/);
  return m ? m[1] : "2026";
}
