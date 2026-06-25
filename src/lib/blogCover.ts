/**
 * Generative halftone cover engine for the blog.
 *
 * Each post's cover renders a TOPICAL SYMBOL in the halftone dot style, chosen
 * from the title/slug/category: KakaoTalk gets a Kakao speech bubble, the Korea
 * GTM framework gets the taegeuk flag, Telegram a paper plane, Naver an N,
 * DeFi interlocking chain links, AI a chip, stablecoins a ₩ coin, exchanges a
 * candlestick chart, and so on. Symbols are drawn in their real brand/topic
 * colours onto an offscreen canvas, then sampled cell-by-cell into a halftone
 * grid so the dot size and dot COLOUR both come from the artwork. A faint
 * topical dot field sits behind the symbol. Posts with no symbol match fall
 * back to a seeded abstract field (still title-derived, so still unique).
 * Rendered onto a <canvas> by BlogCover; title/footer chrome lives there.
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
function rgbStr(c: RGB) { return `rgb(${c[0]},${c[1]},${c[2]})`; }

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

// ============================================================
// TOPICAL SYMBOL GLYPHS — drawn in real brand/topic colours on an offscreen
// canvas (already filled black). Bold shapes only; fine detail is lost to the
// halftone sample. cx/cy/scale keep them centred and legibly large.
// ============================================================
type Glyph = (o: CanvasRenderingContext2D, W: number, H: number, rand: () => number) => void;

const KAKAO = "#FEE500", KAKAO_BROWN = "#3C1E1E";
const TG_BLUE = "#2AABEE", NAVER_GREEN = "#03C75A";
const FLAG_RED = "#CD2E3A", FLAG_BLUE = "#0047A0", FLAG_WHITE = "#EDEDED";

function gSpeechBubble(o: CanvasRenderingContext2D, W: number, H: number) {
  // Kakao-style rounded speech bubble with a tail.
  const cx = W * 0.5, cy = H * 0.47, bw = W * 0.5, bh = H * 0.34, r = Math.min(bw, bh) * 0.32;
  const x = cx - bw / 2, y = cy - bh / 2;
  o.fillStyle = KAKAO;
  o.beginPath();
  o.moveTo(x + r, y);
  o.arcTo(x + bw, y, x + bw, y + bh, r);
  o.arcTo(x + bw, y + bh, x, y + bh, r);
  o.arcTo(x, y + bh, x, y, r);
  o.arcTo(x, y, x + bw, y, r);
  o.closePath(); o.fill();
  // tail
  o.beginPath();
  o.moveTo(cx - bw * 0.18, y + bh - 1);
  o.lineTo(cx - bw * 0.30, y + bh + bh * 0.34);
  o.lineTo(cx - bw * 0.02, y + bh - 1);
  o.closePath(); o.fill();
  // chat dots
  o.fillStyle = KAKAO_BROWN;
  for (let i = -1; i <= 1; i++) { o.beginPath(); o.arc(cx + i * bw * 0.2, cy, bh * 0.085, 0, 6.2832); o.fill(); }
}

function gTaegeuk(o: CanvasRenderingContext2D, W: number, H: number) {
  // Korean flag: red/blue taegeuk circle + four white trigram clusters.
  const cx = W * 0.5, cy = H * 0.5, R = Math.min(W, H) * 0.2;
  // ring
  o.fillStyle = FLAG_WHITE; o.beginPath(); o.arc(cx, cy, R * 1.12, 0, 6.2832); o.fill();
  // top red half, bottom blue half (rotated ~33deg like the real flag)
  o.save(); o.translate(cx, cy); o.rotate(-0.58);
  o.fillStyle = FLAG_RED; o.beginPath(); o.arc(0, 0, R, Math.PI, 0); o.fill();
  o.fillStyle = FLAG_BLUE; o.beginPath(); o.arc(0, 0, R, 0, Math.PI); o.fill();
  // the swirl: two half-discs
  o.fillStyle = FLAG_RED; o.beginPath(); o.arc(-R / 2, 0, R / 2, Math.PI, 0); o.fill();
  o.fillStyle = FLAG_BLUE; o.beginPath(); o.arc(R / 2, 0, R / 2, 0, Math.PI); o.fill();
  o.restore();
  // four trigrams (3 bars each) at corners
  o.fillStyle = FLAG_WHITE;
  const bar = (gx: number, gy: number, ang: number, gaps: number[]) => {
    o.save(); o.translate(gx, gy); o.rotate(ang);
    const bw = R * 0.95, bh = R * 0.11, gap = R * 0.16;
    for (let i = 0; i < 3; i++) {
      const yy = (i - 1) * gap;
      if (gaps[i]) { o.fillRect(-bw / 2, yy - bh / 2, bw * 0.42, bh); o.fillRect(bw * 0.08, yy - bh / 2, bw * 0.42, bh); }
      else o.fillRect(-bw / 2, yy - bh / 2, bw, bh);
    }
    o.restore();
  };
  const d = R * 1.9;
  bar(cx - d, cy - d, 0.9, [0, 0, 0]);   // geon
  bar(cx + d, cy - d, -0.9, [1, 0, 1]);  // gam
  bar(cx - d, cy + d, -0.9, [0, 1, 0]);  // ri
  bar(cx + d, cy + d, 0.9, [1, 1, 1]);   // gon
}

function gPaperPlane(o: CanvasRenderingContext2D, W: number, H: number) {
  o.fillStyle = TG_BLUE;
  const cx = W * 0.5, cy = H * 0.5, s = Math.min(W, H) * 0.3;
  o.beginPath();
  o.moveTo(cx - s, cy + s * 0.1);
  o.lineTo(cx + s, cy - s * 0.85);
  o.lineTo(cx + s * 0.15, cy + s * 0.9);
  o.lineTo(cx - s * 0.1, cy + s * 0.25);
  o.closePath(); o.fill();
  o.fillStyle = "#7FD3F5";
  o.beginPath();
  o.moveTo(cx - s, cy + s * 0.1);
  o.lineTo(cx + s, cy - s * 0.85);
  o.lineTo(cx - s * 0.1, cy + s * 0.25);
  o.closePath(); o.fill();
}

function gNaver(o: CanvasRenderingContext2D, W: number, H: number) {
  const s = Math.min(W, H) * 0.42, x = W * 0.5 - s / 2, y = H * 0.5 - s / 2, r = s * 0.18;
  o.fillStyle = NAVER_GREEN;
  o.beginPath();
  o.moveTo(x + r, y); o.arcTo(x + s, y, x + s, y + s, r); o.arcTo(x + s, y + s, x, y + s, r);
  o.arcTo(x, y + s, x, y, r); o.arcTo(x, y, x + s, y, r); o.closePath(); o.fill();
  // white N
  o.fillStyle = "#fff";
  const m = s * 0.26, t = s * 0.16;
  o.fillRect(x + m, y + m, t, s - 2 * m);
  o.fillRect(x + s - m - t, y + m, t, s - 2 * m);
  o.save(); o.translate(x + m, y + m); o.rotate(Math.atan2(s - 2 * m, s - 2 * m - t));
  o.fillRect(0, 0, t, Math.hypot(s - 2 * m, s - 2 * m)); o.restore();
}

function gChip(o: CanvasRenderingContext2D, W: number, H: number) {
  const c = "#5BE3B0";
  const cx = W * 0.5, cy = H * 0.5, s = Math.min(W, H) * 0.34;
  o.fillStyle = c;
  o.fillRect(cx - s / 2, cy - s / 2, s, s);
  // notch out center
  o.fillStyle = "#0A0A0A"; o.fillRect(cx - s * 0.3, cy - s * 0.3, s * 0.6, s * 0.6);
  o.fillStyle = c; o.fillRect(cx - s * 0.12, cy - s * 0.12, s * 0.24, s * 0.24);
  // pins
  const pin = s * 0.12, plen = s * 0.18;
  for (let i = -1; i <= 1; i++) {
    o.fillRect(cx + i * s * 0.3 - pin / 2, cy - s / 2 - plen, pin, plen);
    o.fillRect(cx + i * s * 0.3 - pin / 2, cy + s / 2, pin, plen);
    o.fillRect(cx - s / 2 - plen, cy + i * s * 0.3 - pin / 2, plen, pin);
    o.fillRect(cx + s / 2, cy + i * s * 0.3 - pin / 2, plen, pin);
  }
}

function gChain(o: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W * 0.5, cy = H * 0.5, r = Math.min(W, H) * 0.16, off = r * 0.85;
  o.lineWidth = r * 0.5;
  o.strokeStyle = "#8B7CFF"; o.beginPath(); o.arc(cx - off, cy, r, 0, 6.2832); o.stroke();
  o.strokeStyle = "#4FD6E8"; o.beginPath(); o.arc(cx + off, cy, r, 0, 6.2832); o.stroke();
}

function gMegaphone(o: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W * 0.46, cy = H * 0.5, s = Math.min(W, H) * 0.34;
  o.fillStyle = "#FF5C93";
  o.beginPath();
  o.moveTo(cx - s, cy - s * 0.45); o.lineTo(cx + s * 0.2, cy - s * 0.85);
  o.lineTo(cx + s * 0.2, cy + s * 0.85); o.lineTo(cx - s, cy + s * 0.45);
  o.closePath(); o.fill();
  o.fillRect(cx - s * 1.25, cy - s * 0.28, s * 0.3, s * 0.56);
  // sound arcs
  o.strokeStyle = "#FFB3CE"; o.lineWidth = s * 0.1;
  for (let i = 1; i <= 3; i++) { o.beginPath(); o.arc(cx + s * 0.3, cy, s * (0.4 + i * 0.32), -0.7, 0.7); o.stroke(); }
}

function gFunnel(o: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W * 0.5, top = H * 0.28, w = Math.min(W, H) * 0.46;
  o.fillStyle = "#7FA8FF";
  o.beginPath();
  o.moveTo(cx - w / 2, top); o.lineTo(cx + w / 2, top);
  o.lineTo(cx + w * 0.1, top + H * 0.26); o.lineTo(cx + w * 0.1, H * 0.74);
  o.lineTo(cx - w * 0.1, H * 0.74); o.lineTo(cx - w * 0.1, top + H * 0.26);
  o.closePath(); o.fill();
  // dripping dots below
  o.fillStyle = "#C7D7FF";
  for (let i = 0; i < 3; i++) { o.beginPath(); o.arc(cx, H * 0.8 + i * H * 0.055, w * 0.04, 0, 6.2832); o.fill(); }
}

function gColumns(o: CanvasRenderingContext2D, W: number, H: number) {
  const c = "#D8BE78";
  const cx = W * 0.5, top = H * 0.32, bot = H * 0.7, w = Math.min(W, H) * 0.46;
  o.fillStyle = c;
  // pediment
  o.beginPath(); o.moveTo(cx - w * 0.6, top); o.lineTo(cx + w * 0.6, top); o.lineTo(cx, top - H * 0.13); o.closePath(); o.fill();
  // architrave + base
  o.fillRect(cx - w * 0.6, top, w * 1.2, H * 0.04);
  o.fillRect(cx - w * 0.62, bot, w * 1.24, H * 0.045);
  // columns
  const n = 4, span = w * 1.1, cw = span / (n * 1.8);
  for (let i = 0; i < n; i++) {
    const x = cx - span / 2 + (span / (n - 1)) * i;
    o.fillRect(x - cw / 2, top + H * 0.05, cw, bot - top - H * 0.05);
  }
}

function gRocket(o: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W * 0.5, cy = H * 0.48, s = Math.min(W, H) * 0.3;
  o.fillStyle = "#FF8A4C";
  // body
  o.beginPath();
  o.moveTo(cx, cy - s);
  o.quadraticCurveTo(cx + s * 0.55, cy - s * 0.1, cx + s * 0.4, cy + s * 0.7);
  o.lineTo(cx - s * 0.4, cy + s * 0.7);
  o.quadraticCurveTo(cx - s * 0.55, cy - s * 0.1, cx, cy - s);
  o.closePath(); o.fill();
  // window
  o.fillStyle = "#3A2A1A"; o.beginPath(); o.arc(cx, cy - s * 0.15, s * 0.18, 0, 6.2832); o.fill();
  // fins
  o.fillStyle = "#E0662E";
  o.beginPath(); o.moveTo(cx - s * 0.4, cy + s * 0.2); o.lineTo(cx - s * 0.72, cy + s * 0.75); o.lineTo(cx - s * 0.4, cy + s * 0.7); o.closePath(); o.fill();
  o.beginPath(); o.moveTo(cx + s * 0.4, cy + s * 0.2); o.lineTo(cx + s * 0.72, cy + s * 0.75); o.lineTo(cx + s * 0.4, cy + s * 0.7); o.closePath(); o.fill();
  // flame
  o.fillStyle = "#FFD24A";
  o.beginPath(); o.moveTo(cx - s * 0.22, cy + s * 0.7); o.lineTo(cx, cy + s * 1.25); o.lineTo(cx + s * 0.22, cy + s * 0.7); o.closePath(); o.fill();
}

function gPercent(o: CanvasRenderingContext2D, W: number, H: number) {
  o.fillStyle = "#F2754E";
  o.font = `bold ${Math.min(W, H) * 0.62}px Arial`;
  o.textAlign = "center"; o.textBaseline = "middle";
  o.fillText("%", W * 0.5, H * 0.52);
}

function gFundUp(o: CanvasRenderingContext2D, W: number, H: number) {
  // rising bars inside a ring = ETF / fund
  const cx = W * 0.5, cy = H * 0.5, R = Math.min(W, H) * 0.26;
  o.strokeStyle = "#5ACFB0"; o.lineWidth = R * 0.16;
  o.beginPath(); o.arc(cx, cy, R, 0, 6.2832); o.stroke();
  o.fillStyle = "#5ACFB0";
  const bw = R * 0.26, base = cy + R * 0.5;
  const hs = [0.5, 0.85, 1.25];
  for (let i = 0; i < 3; i++) { const x = cx - R * 0.5 + i * R * 0.5; o.fillRect(x - bw / 2, base - R * hs[i], bw, R * hs[i]); }
  // up arrow
  o.beginPath(); o.moveTo(cx + R * 0.55, cy - R * 0.55); o.lineTo(cx + R * 0.2, cy - R * 0.2); o.lineTo(cx + R * 0.45, cy - R * 0.05); o.closePath(); o.fill();
}

function gShield(o: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W * 0.5, top = H * 0.28, s = Math.min(W, H) * 0.26;
  o.fillStyle = "#6E96EB";
  o.beginPath();
  o.moveTo(cx, top); o.lineTo(cx + s, top + s * 0.5); o.lineTo(cx + s, top + s * 1.4);
  o.quadraticCurveTo(cx, top + s * 2.6, cx, top + s * 2.6);
  o.quadraticCurveTo(cx, top + s * 2.6, cx - s, top + s * 1.4);
  o.lineTo(cx - s, top + s * 0.5); o.closePath(); o.fill();
  // check
  o.strokeStyle = "#0A0A0A"; o.lineWidth = s * 0.22; o.lineCap = "round";
  o.beginPath(); o.moveTo(cx - s * 0.45, top + s * 1.15); o.lineTo(cx - s * 0.1, top + s * 1.5); o.lineTo(cx + s * 0.5, top + s * 0.75); o.stroke();
}

function gCoin(o: CanvasRenderingContext2D, W: number, H: number, rand: () => number) {
  const gold = "#E8C25A";
  const cy = 0.5 + rand() * 0.12;
  const disk = (cx: number, cyy: number, r: number, won: boolean) => {
    o.fillStyle = gold; o.beginPath(); o.arc(cx, cyy, r, 0, 6.2832); o.fill();
    if (won) {
      o.globalCompositeOperation = "destination-out";
      o.font = `bold ${r * 1.35}px Arial`; o.textAlign = "center"; o.textBaseline = "middle";
      o.fillText("₩", cx, cyy + r * 0.05);
      o.globalCompositeOperation = "source-over";
    }
  };
  disk(W * 0.5, H * cy, W * 0.22, true);
  disk(W * (0.72 + rand() * 0.08), H * (0.28 + rand() * 0.08), W * 0.07, false);
  disk(W * (0.22 + rand() * 0.06), H * (0.76 + rand() * 0.05), W * 0.09, false);
  o.strokeStyle = gold; o.lineWidth = W * 0.012; o.beginPath(); o.arc(W * 0.5, H * cy, W * 0.30, 0, 6.2832); o.stroke();
}

function gCandles(o: CanvasRenderingContext2D, W: number, H: number, rand: () => number) {
  const up = "#3FBF7F", down = "#E5524B", wick = "#9aa0a6";
  const n = 12 + Math.floor(rand() * 6), m = W * 0.07, span = W - 2 * m, step = span / n;
  const base = H * 0.92, top = H * 0.26;
  let price = 0.3 + rand() * 0.2;
  const drift = 0.012 + rand() * 0.02, jit = 0.05 + rand() * 0.05;
  for (let i = 0; i < n; i++) {
    const x = m + step * (i + 0.5);
    const open = price;
    price += Math.sin(i * 1.3 + rand() * 6) * jit + drift;
    const close = price;
    const hi = Math.max(close, open) + 0.05, lo = Math.min(close, open) - 0.05;
    const Y = (p: number) => base - (base - top) * clamp(p);
    const bw = step * 0.56;
    o.fillStyle = wick; o.fillRect(x - W * 0.0022, Y(hi), W * 0.0044, Y(lo) - Y(hi));
    o.fillStyle = close >= open ? up : down;
    const by = Y(Math.max(open, close)), bh = Math.max(H * 0.008, Y(Math.min(open, close)) - by);
    o.fillRect(x - bw / 2, by, bw, bh);
  }
}

function gRisingSun(o: CanvasRenderingContext2D, W: number, H: number) {
  // Korea (taegeuk-ish blue/red disc) on the left vs Japan (red rising sun) on the right.
  const cy = H * 0.5, R = Math.min(W, H) * 0.16;
  // left: Korea
  const lx = W * 0.31;
  o.save(); o.translate(lx, cy); o.rotate(-0.5);
  o.fillStyle = FLAG_RED; o.beginPath(); o.arc(0, 0, R, Math.PI, 0); o.fill();
  o.fillStyle = FLAG_BLUE; o.beginPath(); o.arc(0, 0, R, 0, Math.PI); o.fill();
  o.fillStyle = FLAG_RED; o.beginPath(); o.arc(-R / 2, 0, R / 2, Math.PI, 0); o.fill();
  o.fillStyle = FLAG_BLUE; o.beginPath(); o.arc(R / 2, 0, R / 2, 0, Math.PI); o.fill();
  o.restore();
  // right: Japan rising sun
  const rx = W * 0.69;
  o.fillStyle = "#BC002D";
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * 6.2832;
    o.save(); o.translate(rx, cy); o.rotate(a);
    o.beginPath(); o.moveTo(0, 0); o.lineTo(R * 1.7, -R * 0.16); o.lineTo(R * 1.7, R * 0.16); o.closePath(); o.fill();
    o.restore();
  }
  o.beginPath(); o.arc(rx, cy, R * 0.9, 0, 6.2832); o.fill();
}

// ---- topic router: slug/title/category -> {symbol glyph, ambient hue} ----
interface Topic { draw: Glyph; hue: number; }
function route(k: string, category?: string): Topic | null {
  const has = (...ws: string[]) => ws.some((w) => k.includes(w));
  if (has("kakao")) return { draw: gSpeechBubble, hue: 47 };
  if (has("telegram")) return { draw: gPaperPlane, hue: 200 };
  if (has("naver")) return { draw: gNaver, hue: 146 };
  if (has("gtm-stack")) return { draw: gTaegeuk, hue: 224 };
  if (has("vs-japan", "japan")) return { draw: gRisingSun, hue: 0 };
  if (has("defi")) return { draw: gChain, hue: 264 };
  if (has("ai-crypto", "depin")) return { draw: gChip, hue: 158 };
  if (has("kol", "influencer")) return { draw: gMegaphone, hue: 330 };
  if (has("funnel", "acquisition")) return { draw: gFunnel, hue: 220 };
  if (has("token-launch")) return { draw: gRocket, hue: 24 };
  if (has("etf")) return { draw: gFundUp, hue: 168 };
  if (has("tax")) return { draw: gPercent, hue: 14 };
  if (has("regulation", "vaupa", "travel-rule")) return { draw: gShield, hue: 222 };
  if (has("institutional", "vc-family", "family-office", "corporate-crypto-ban", "rwa")) return { draw: gColumns, hue: 42 };
  if (has("stablecoin", "won-stablecoin")) return { draw: gCoin, hue: 204 };
  if (has("upbit", "bithumb", "exchange-listing", "memecoin", "kimchi", "premium", "squeeze", "candlestick")) return { draw: gCandles, hue: 150 };
  // category fallback before abstract
  const c = (category || "").toLowerCase();
  if (c === "marketing") return { draw: gMegaphone, hue: 330 };
  if (c === "regulation") return { draw: gShield, hue: 222 };
  if (c === "community") return { draw: gPaperPlane, hue: 200 };
  return null;
}

// ---- abstract fallback (seeded field + palette) for unmatched posts ----
function palette(rand: () => number): { stops: Stop[]; bg: string } {
  const h1 = rand() * 360, scheme = Math.floor(rand() * 3);
  const h2 = scheme === 1 ? (h1 + 150 + rand() * 60) % 360 : scheme === 2 ? (h1 + 30 + rand() * 30) % 360 : h1;
  const s = 0.5 + rand() * 0.4;
  const stops: Stop[] = [
    [0, hsl(h1, s * 0.7, 0.07)], [0.3, hsl(h1, s, 0.3)], [0.62, hsl(h1, s, 0.5)],
    [0.84, hsl(h2, s * 0.85, 0.72)], [1, [255, 255, 255]],
  ];
  const b = hsl(h1, s * 0.55, 0.05);
  return { stops, bg: rgbStr(b) };
}
function makeField(rand: () => number): (x: number, y: number) => number {
  const mode = Math.floor(rand() * 6);
  const ang = rand() * Math.PI, a = Math.cos(ang), b = Math.sin(ang);
  const f1 = 9 + rand() * 28, f2 = 9 + rand() * 28;
  const cx = 0.25 + rand() * 0.5, cy = 0.25 + rand() * 0.5, ph = rand() * 6.283;
  const lx = 0.2 + rand() * 0.6, ly = 0.15 + rand() * 0.55, lr = 0.28 + rand() * 0.34;
  const glow = (x: number, y: number) => Math.exp(-(((x - lx) ** 2 + (y - ly) ** 2)) / (lr * lr));
  if (mode === 0) { const nb = 2 + Math.floor(rand() * 3); const B: number[][] = []; for (let i = 0; i < nb; i++) B.push([rand(), rand(), 0.13 + rand() * 0.24, 0.6 + rand() * 0.6]); return (x, y) => { let v = 0.1 + 0.12 * (1 - y); for (const bb of B) v += bb[3] * Math.exp(-(((x - bb[0]) ** 2 + (y - bb[1]) ** 2) / (bb[2] * bb[2]))); return v; }; }
  if (mode === 1) return (x, y) => { const d = Math.hypot(x - cx, y - cy); return 0.13 + 0.55 * (0.5 + 0.5 * Math.sin(f1 * d - ph)) * Math.exp(-d * 0.6) + 0.45 * glow(x, y); };
  if (mode === 2) return (x, y) => { const u = x * a + y * b, w = -x * b + y * a; return 0.14 + 0.6 * Math.pow(Math.abs(Math.sin(f1 * u + ph)) * Math.abs(Math.sin(f2 * w)), 0.5) + 0.15 * glow(x, y); };
  if (mode === 3) { const arms = 2 + Math.floor(rand() * 6); return (x, y) => { const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy), th = Math.atan2(dy, dx); return 0.14 + 0.5 * (0.5 + 0.5 * Math.sin(f1 * d + arms * th + ph)) * Math.exp(-d * 0.7) + 0.38 * glow(x, y); }; }
  if (mode === 4) { const bands = 3 + Math.floor(rand() * 7); return (x, y) => { const u = x * a + y * b; return 0.1 + 0.66 * clamp(u) * (0.7 + 0.3 * Math.sin(u * bands * 3.14 + ph)) + 0.2 * glow(x, y); }; }
  return (x, y) => { const d = Math.hypot(x - cx, y - cy); return 0.16 + 0.6 * (0.5 + 0.5 * Math.sin(f1 * d - ph)); };
}

/** Render a topic-derived halftone cover onto a canvas (uses backing-store size). */
export function drawCover(canvas: HTMLCanvasElement, key: string, category?: string) {
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx || W === 0 || H === 0) return;
  const k = (key || "ium").toLowerCase();
  const rand = mulberry32(xmur3(k)());
  const topic = route(k, category);

  if (topic) {
    // Symbol mode: draw the glyph in colour offscreen, halftone-sample colour + luma.
    const off = document.createElement("canvas"); off.width = W; off.height = H;
    const o = off.getContext("2d")!;
    o.fillStyle = "#000"; o.fillRect(0, 0, W, H);
    o.lineCap = "round"; o.lineJoin = "round";
    o.filter = `blur(${Math.max(1, W * 0.003)}px)`;
    topic.draw(o, W, H, rand);
    o.filter = "none";
    const data = o.getImageData(0, 0, W, H).data;

    const bg = hsl(topic.hue, 0.45, 0.045);
    ctx.fillStyle = rgbStr(bg); ctx.fillRect(0, 0, W, H);
    const ambient = hsl(topic.hue, 0.5, 0.2);

    const cols = 30 + Math.floor(rand() * 12);
    const s = W / cols, rows = Math.ceil(H / s) + 1, half = s / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = (c + 0.5) * s, cy = (r + 0.5) * s;
        const px = Math.min(W - 1, Math.round(cx)), py = Math.min(H - 1, Math.round(cy));
        const idx = (py * W + px) * 4;
        const pr = data[idx], pg = data[idx + 1], pb = data[idx + 2];
        const L = (0.299 * pr + 0.587 * pg + 0.114 * pb) / 255;
        if (L < 0.1) {
          // faint ambient grid behind the symbol
          const n = ((c * 5 + r * 11) % 7);
          const a = 0.22 + (n === 0 ? 0.22 : 0);
          ctx.fillStyle = `rgba(${ambient[0]},${ambient[1]},${ambient[2]},${a})`;
          ctx.beginPath(); ctx.arc(cx, cy, half * 0.16, 0, 6.2832); ctx.fill();
        } else {
          ctx.fillStyle = `rgb(${pr},${pg},${pb})`;
          ctx.beginPath(); ctx.arc(cx, cy, half * (0.32 + 0.62 * L), 0, 6.2832); ctx.fill();
        }
      }
    }
    return;
  }

  // Abstract fallback.
  const pal = palette(rand);
  ctx.fillStyle = pal.bg; ctx.fillRect(0, 0, W, H);
  const val = makeField(rand);
  const cols = 32 + Math.floor(rand() * 16);
  const s = W / cols, rows = Math.ceil(H / s) + 1, half = s / 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = (c + 0.5) * s, cy = (r + 0.5) * s;
      let v = val(cx / W, cy / H);
      v = clamp(v + (((c * 7 + r * 13) % 5) - 2) * 0.008);
      ctx.fillStyle = ramp(pal.stops, v);
      ctx.beginPath(); ctx.arc(cx, cy, half * (0.24 + 0.72 * v), 0, 6.2832); ctx.fill();
    }
  }
}

/** Year label from a post date string (falls back to 2026). */
export function coverYear(date?: string): string {
  const m = (date || "").match(/(20\d\d)/);
  return m ? m[1] : "2026";
}
