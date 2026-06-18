/**
 * Generative halftone cover engine for the blog.
 *
 * Every post's cover is derived deterministically from its title/slug: a seeded
 * PRNG drives a continuous colour (hue, saturation, optional duotone), a motif
 * (one of several parametric fields, plus topical candlestick/coin masks), the
 * motif's parameters (angles, frequencies, centres, counts) and the dot density.
 * Because all of that comes from the title hash, the space of possible covers is
 * effectively unbounded and no two distinct titles render the same image.
 * Rendered onto a <canvas> by BlogCover. The layout/structure lives in BlogCover.
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

function palette(rand: () => number): { stops: Stop[]; bg: string; h1: number; s: number } {
  const h1 = rand() * 360;
  const dual = rand() < 0.5;
  const h2 = dual ? (h1 + 50 + rand() * 150) % 360 : h1;
  const s = 0.45 + rand() * 0.45;
  const stops: Stop[] = [
    [0, hsl(h1, s * 0.6, 0.1)],
    [0.36, hsl(h1, s, 0.34)],
    [0.64, hsl(h2, s, 0.6)],
    [0.85, hsl(h2, s * 0.45, 0.85)],
    [1, [255, 255, 255]],
  ];
  const b = hsl(h1, s * 0.5, 0.045);
  return { stops, bg: `rgb(${b[0]},${b[1]},${b[2]})`, h1, s };
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

// ---- parametric field motif (all params seeded, closure uses only consts) ----
function makeField(rand: () => number): (x: number, y: number) => number {
  const mode = Math.floor(rand() * 7);
  const ang = rand() * Math.PI;
  const a = Math.cos(ang), b = Math.sin(ang);
  const f1 = 9 + rand() * 30, f2 = 9 + rand() * 30;
  const cx = 0.25 + rand() * 0.5, cy = 0.25 + rand() * 0.5;
  const ph = rand() * 6.283, ph2 = rand() * 6.283;
  const lx = 0.2 + rand() * 0.6, ly = 0.12 + rand() * 0.55, lr = 0.28 + rand() * 0.34;
  const glow = (x: number, y: number) => Math.exp(-(((x - lx) ** 2 + (y - ly) ** 2)) / (lr * lr));

  if (mode === 0) {
    const nb = 2 + Math.floor(rand() * 3);
    const blobs: number[][] = [];
    for (let i = 0; i < nb; i++) blobs.push([rand(), rand(), 0.13 + rand() * 0.24, 0.5 + rand() * 0.6]);
    return (x, y) => { let v = 0.1 + 0.14 * (1 - y); for (const bb of blobs) v += bb[3] * Math.exp(-(((x - bb[0]) ** 2 + (y - bb[1]) ** 2) / (bb[2] * bb[2]))); return v; };
  }
  if (mode === 1) {
    return (x, y) => { const d = Math.hypot(x - cx, y - cy); return 0.13 + 0.55 * (0.5 + 0.5 * Math.sin(f1 * d - ph)) * Math.exp(-d * 0.6) + 0.5 * glow(x, y); };
  }
  if (mode === 2) {
    const S: number[][] = [];
    for (let i = 0; i < 3; i++) S.push([rand(), rand()]);
    return (x, y) => { let s = 0; for (let i = 0; i < S.length; i++) s += Math.sin(f1 * Math.hypot(x - S[i][0], y - S[i][1]) - ph * (i + 1)); return 0.28 + 0.12 * s + 0.3 * glow(x, y); };
  }
  if (mode === 3) {
    return (x, y) => { const u = x * a + y * b, w = -x * b + y * a; const p = Math.abs(Math.sin(f1 * u + ph)), q = Math.abs(Math.sin(f2 * w + ph2)); return 0.14 + 0.6 * Math.pow(p * q, 0.5) + 0.16 * glow(x, y); };
  }
  if (mode === 4) {
    const lp = (f: number) => { f = f - Math.floor(f); const g = f < 0.5 ? f : 1 - f; return Math.exp(-((g / 0.06) ** 2)); };
    return (x, y) => { const u = x * a + y * b; return 0.15 + 0.55 * Math.max(lp(u * f1 * 0.5), lp(y * f2 * 0.5)) + 0.34 * glow(x, y); };
  }
  if (mode === 5) {
    const arms = 2 + Math.floor(rand() * 6);
    return (x, y) => { const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy), th = Math.atan2(dy, dx); return 0.14 + 0.5 * (0.5 + 0.5 * Math.sin(f1 * d + arms * th + ph)) * Math.exp(-d * 0.7) + 0.4 * glow(x, y); };
  }
  // mode 6: radial beams
  const beams = 3 + Math.floor(rand() * 8);
  return (x, y) => { const th = Math.atan2(y - cy, x - cx); return 0.15 + 0.5 * (0.5 + 0.5 * Math.sin(beams * th + ph)) * glow(x, y) + 0.18 * glow(x, y); };
}

/** Render a topic-derived halftone cover onto a canvas (uses backing-store size). */
export function drawCover(canvas: HTMLCanvasElement, key: string) {
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx || W === 0 || H === 0) return;
  const k = (key || "ium").toLowerCase();
  const rand = mulberry32(xmur3(k)());

  const pal = palette(rand);
  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, W, H);

  const cols = 34 + Math.floor(rand() * 16);

  // Topical masks for a few obvious themes; everything else gets a parametric field.
  let data: Uint8ClampedArray | null = null;
  let val: ((x: number, y: number) => number) | null = null;
  const useCoin = /stablecoin|won-?stablecoin/.test(k);
  const useCandles = !useCoin && /memecoin|kimchi|premium|candlestick/.test(k);
  if (useCoin || useCandles) {
    const off = document.createElement("canvas"); off.width = W; off.height = H;
    const o = off.getContext("2d")!;
    o.fillStyle = "#000"; o.fillRect(0, 0, W, H);
    o.fillStyle = "#fff"; o.strokeStyle = "#fff"; o.lineCap = "round";
    o.filter = `blur(${Math.max(1.5, W * 0.004)}px)`;
    (useCoin ? coin : candles)(o, W, H, rand);
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
      else { const px = Math.min(W - 1, Math.round(cx)), py = Math.min(H - 1, Math.round(cy)); v = 0.12 + 0.86 * (data![(py * W + px) * 4] / 255); }
      v = clamp(v + (((c * 7 + r * 13) % 5) - 2) * 0.008);
      ctx.fillStyle = ramp(pal.stops, v);
      ctx.beginPath(); ctx.arc(cx, cy, half * (0.24 + 0.74 * v), 0, 6.2832); ctx.fill();
    }
  }
}

/** Year label from a post date string (falls back to 2026). */
export function coverYear(date?: string): string {
  const m = (date || "").match(/(20\d\d)/);
  return m ? m[1] : "2026";
}
