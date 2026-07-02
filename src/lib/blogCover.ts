import { categoryHslParts } from "@/lib/categoryTheme";
import { COVER_ASSIGN, type CoverAssignment } from "@/lib/coverAssignments";

// Photo pool for dithered-photograph covers (the reference technique:
// a real photograph halftoned in a single hue). Iconic, no faces.
import phSeoulGangnam from "@/assets/backgrounds/seoul-gangnam-night.jpg";
import phSeoulDdp from "@/assets/backgrounds/seoul-ddp-night.jpg";
import phSeoulHanriver from "@/assets/backgrounds/seoul-hanriver-twilight.jpg";
import phSeoulTech from "@/assets/backgrounds/seoul-tech-future.jpg";
import phPalace from "@/assets/backgrounds/korea-palace-modern.jpg";
import phMoon from "@/assets/backgrounds/realistic-moon.png";
import phSaturn from "@/assets/backgrounds/saturn-rings.jpg";
import phMars from "@/assets/backgrounds/mars-surface.jpg";
import phNebula from "@/assets/backgrounds/cosmic-nebula.jpg";
import phEarth from "@/assets/backgrounds/earth-space.jpg";
import phSun from "@/assets/backgrounds/sun-corona.jpg";
import phHanok from "@/assets/campaigns/bnb-hanok-event.jpg";
import phFisheye from "@/assets/campaigns/event-fisheye.jpg";
import phBillboard from "@/assets/campaigns/synfutures-billboard.jpg";
import phMegaeth from "@/assets/campaigns/megaeth-launch.jpg";
import phAptosEvent from "@/assets/campaigns/aptos-seoul-event.jpg";

const PHOTO_POOL = [
  phSeoulGangnam, phSeoulDdp, phSeoulHanriver, phSeoulTech, phPalace,
  phMoon, phSaturn, phMars, phNebula, phEarth, phSun,
  phHanok, phFisheye, phBillboard, phMegaeth, phAptosEvent,
];
const IMG_CACHE: Record<string, HTMLImageElement> = {};
function poolImage(url: string): HTMLImageElement {
  if (!IMG_CACHE[url]) {
    const im = new Image();
    im.src = url;
    IMG_CACHE[url] = im;
  }
  return IMG_CACHE[url];
}

/**
 * Generative halftone cover engine for the blog.
 *
 * Each post's cover renders a TOPICAL SYMBOL in the halftone dot style, chosen
 * from ~100 keyword archetypes in the title/slug/category: KakaoTalk gets a
 * Kakao speech bubble, corporate-ban posts get institutional columns, RWA gets
 * a tokenized-asset grid, funnels get a conversion path, ETF posts get fund
 * bars, and so on. Symbols are drawn in their real brand/topic colours onto an
 * offscreen canvas, then sampled cell-by-cell into a halftone grid so the dot
 * size and dot COLOUR both come from the artwork. A faint topical dot field sits
 * behind the symbol. Posts with no symbol match fall back to a seeded abstract
 * field (still title-derived, so still unique). Even when multiple articles
 * share a glyph family, the matched archetype + slug/title seed drives a unique
 * micro-pixel fingerprint, palette shift, glyph offset, pattern grammar, and
 * field rhythm.
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
const TAU = Math.PI * 2;

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
function rgbaStr(c: RGB, a: number) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

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

function gAssetGrid(o: CanvasRenderingContext2D, W: number, H: number, rand: () => number) {
  // Tokenized real-world assets: a hard-edged asset cube split into on-chain tiles.
  const cx = W * 0.5, cy = H * 0.5, s = Math.min(W, H) * 0.38;
  const colors = ["#62D6D6", "#7A8CFF", "#E8D66B", "#6BE38F"];
  o.save();
  o.translate(cx, cy); o.rotate((rand() - 0.5) * 0.22);
  const n = 4, gap = s * 0.045, tile = (s - gap * (n - 1)) / n;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const px = -s / 2 + x * (tile + gap), py = -s / 2 + y * (tile + gap);
      o.fillStyle = colors[(x + y * 2 + Math.floor(rand() * 3)) % colors.length];
      o.fillRect(px, py, tile, tile);
    }
  }
  o.strokeStyle = "#EAFBFF"; o.lineWidth = s * 0.045;
  o.strokeRect(-s / 2 - gap, -s / 2 - gap, s + gap * 2, s + gap * 2);
  o.restore();
}

function gGateOpen(o: CanvasRenderingContext2D, W: number, H: number) {
  // Ban lifted / market opening: two heavy gates opening into a bright lane.
  const cx = W * 0.5, top = H * 0.28, bot = H * 0.74, w = W * 0.44;
  o.fillStyle = "#8C7CFF";
  o.save(); o.translate(cx - w * 0.31, (top + bot) / 2); o.rotate(-0.22); o.fillRect(-w * 0.24, -(bot - top) / 2, w * 0.32, bot - top); o.restore();
  o.save(); o.translate(cx + w * 0.31, (top + bot) / 2); o.rotate(0.22); o.fillRect(-w * 0.08, -(bot - top) / 2, w * 0.32, bot - top); o.restore();
  o.fillStyle = "#F0E6A0";
  o.beginPath(); o.moveTo(cx - w * 0.08, bot); o.lineTo(cx + w * 0.08, bot); o.lineTo(cx + w * 0.03, top + H * 0.08); o.lineTo(cx - w * 0.03, top + H * 0.08); o.closePath(); o.fill();
  o.fillRect(cx - w * 0.4, top - H * 0.035, w * 0.8, H * 0.05);
}

function gNetworkNodes(o: CanvasRenderingContext2D, W: number, H: number, rand: () => number) {
  const pts = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * TAU + rand() * 0.18;
    const r = Math.min(W, H) * (0.12 + (i % 3) * 0.055 + rand() * 0.025);
    return [W * 0.5 + Math.cos(a) * r, H * 0.5 + Math.sin(a) * r] as const;
  });
  o.strokeStyle = "#55D7FF"; o.lineWidth = W * 0.018; o.lineCap = "round";
  for (let i = 0; i < pts.length; i++) {
    const [x, y] = pts[i], [nx, ny] = pts[(i + 2 + (i % 3)) % pts.length];
    o.beginPath(); o.moveTo(x, y); o.lineTo(nx, ny); o.stroke();
  }
  pts.forEach(([x, y], i) => { o.fillStyle = i % 3 === 0 ? "#F7F7F7" : i % 3 === 1 ? "#55D7FF" : "#A7FF6A"; o.beginPath(); o.arc(x, y, W * (0.035 + (i % 2) * 0.012), 0, TAU); o.fill(); });
}

function gSearchLens(o: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W * 0.45, cy = H * 0.45, R = Math.min(W, H) * 0.2;
  o.strokeStyle = "#6BF3A0"; o.lineWidth = R * 0.28;
  o.beginPath(); o.arc(cx, cy, R, 0, TAU); o.stroke();
  o.beginPath(); o.moveTo(cx + R * 0.7, cy + R * 0.7); o.lineTo(cx + R * 1.65, cy + R * 1.65); o.stroke();
  o.strokeStyle = "#E8FFF0"; o.lineWidth = R * 0.1;
  for (let i = -1; i <= 1; i++) { o.beginPath(); o.moveTo(cx - R * 0.58, cy + i * R * 0.36); o.lineTo(cx + R * 0.52, cy + i * R * 0.36); o.stroke(); }
}

function gEventStage(o: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W * 0.5, base = H * 0.72, s = Math.min(W, H) * 0.42;
  o.fillStyle = "#FFB14A";
  o.fillRect(cx - s * 0.5, base - s * 0.12, s, s * 0.18);
  o.fillStyle = "#FF6C6C";
  o.beginPath(); o.moveTo(cx - s * 0.52, base - s * 0.12); o.lineTo(cx, base - s * 0.62); o.lineTo(cx + s * 0.52, base - s * 0.12); o.closePath(); o.fill();
  o.strokeStyle = "#FFE5A7"; o.lineWidth = s * 0.04;
  for (const x of [-0.34, 0, 0.34]) { o.beginPath(); o.moveTo(cx + x * s, base - s * 0.16); o.lineTo(cx + x * s, base - s * 0.74); o.stroke(); }
}

function gWallet(o: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W * 0.5, cy = H * 0.52, s = Math.min(W, H) * 0.38;
  o.fillStyle = "#42D190"; o.fillRect(cx - s * 0.58, cy - s * 0.34, s * 1.16, s * 0.68);
  o.fillStyle = "#0B2D22"; o.fillRect(cx + s * 0.08, cy - s * 0.15, s * 0.45, s * 0.3);
  o.fillStyle = "#F4FFB8"; o.beginPath(); o.arc(cx + s * 0.23, cy, s * 0.055, 0, TAU); o.fill();
}

function gStack(o: CanvasRenderingContext2D, W: number, H: number, rand: () => number) {
  const cx = W * 0.5, cy = H * 0.5, s = Math.min(W, H) * 0.34;
  const colors = ["#EF476F", "#FFD166", "#06D6A0", "#6C8CFF"];
  for (let i = 0; i < 4; i++) {
    o.fillStyle = colors[(i + Math.floor(rand() * 2)) % colors.length];
    o.fillRect(cx - s * 0.55 + i * s * 0.07, cy - s * 0.38 + i * s * 0.17, s * 0.86, s * 0.14);
  }
}

// ---- topic router: slug/title/category -> {symbol glyph, ambient hue} ----
interface Topic { draw: Glyph; hue: number; archetype: number; label: string; }

const TOPIC_ARCHETYPES: Array<{ label: string; keywords: string[]; draw: Glyph; hue: number }> = [
  { label: "won stablecoin", keywords: ["won-stablecoin", "krw stablecoin", "won stablecoin", "stablecoin", "daba", "digital asset basic act", "bank of korea"], draw: gCoin, hue: 204 },
  { label: "corporate ban lift", keywords: ["corporate-crypto-ban", "corporate ban", "crypto ban", "ban lifted", "institutional playbook"], draw: gGateOpen, hue: 262 },
  { label: "cex acquisition funnel", keywords: ["cex-user-acquisition", "user-acquisition", "acquisition", "install", "sign-up", "first deposit", "funnel"], draw: gFunnel, hue: 220 },
  { label: "rwa tokenization", keywords: ["rwa", "tokenized assets", "tokenized asset", "real world asset", "trust-first"], draw: gAssetGrid, hue: 184 },
  { label: "gtm stack", keywords: ["gtm-stack", "go-to-market framework", "gtm framework", "market entry stack"], draw: gTaegeuk, hue: 224 },
  { label: "kakaotalk", keywords: ["kakaotalk", "kakao", "open chat", "openchat"], draw: gSpeechBubble, hue: 84 },
  { label: "upbit dominance", keywords: ["upbit", "dominance", "power map", "market share"], draw: gCandles, hue: 206 },
  { label: "memecoin paradox", keywords: ["memecoin", "meme coin", "zero organic", "$4.7b"], draw: gCandles, hue: 318 },
  { label: "naver search", keywords: ["naver", "search", "seo", "serp", "blog seo"], draw: gSearchLens, hue: 146 },
  { label: "telegram", keywords: ["telegram", "tg channel", "paper plane"], draw: gPaperPlane, hue: 200 },
  { label: "defi", keywords: ["defi", "yield", "liquidity pool", "amm", "dex"], draw: gChain, hue: 264 },
  { label: "ai crypto", keywords: ["ai-crypto", "ai agent", "agents", "machine learning", "artificial intelligence"], draw: gChip, hue: 158 },
  { label: "depin", keywords: ["depin", "physical infrastructure", "robotics", "iot"], draw: gNetworkNodes, hue: 174 },
  { label: "kol influencer", keywords: ["kol", "influencer", "creator", "youtube", "twitter", "x spaces"], draw: gMegaphone, hue: 330 },
  { label: "token launch", keywords: ["token-launch", "tge", "launch token", "launching token"], draw: gRocket, hue: 24 },
  { label: "spot etf", keywords: ["spot etf", "etf", "fund", "asset manager"], draw: gFundUp, hue: 168 },
  { label: "tax", keywords: ["tax", "2027", "capital gains", "withholding"], draw: gPercent, hue: 14 },
  { label: "regulation", keywords: ["regulation", "vaupa", "travel-rule", "travel rule", "compliance", "fsc", "fiU", "vasp", "aml"], draw: gShield, hue: 222 },
  { label: "family office", keywords: ["vc-family", "family-office", "family office", "venture capital", "allocators"], draw: gCoin, hue: 280 },
  { label: "institutional", keywords: ["institutional", "corporate treasury", "treasury", "pension", "custody"], draw: gColumns, hue: 42 },
  { label: "bithumb", keywords: ["bithumb", "squeeze", "exchange war"], draw: gCandles, hue: 38 },
  { label: "kimchi premium", keywords: ["kimchi", "premium", "arbitrage"], draw: gCandles, hue: 112 },
  { label: "listing", keywords: ["exchange-listing", "listing", "cex listing", "upbit listing", "bithumb listing"], draw: gRocket, hue: 28 },
  { label: "community", keywords: ["community", "discord", "chat", "moderation", "ambassador"], draw: gNetworkNodes, hue: 96 },
  { label: "offline event", keywords: ["offline", "event", "kbw", "conference", "meetup", "summit", "side event"], draw: gEventStage, hue: 32 },
  { label: "pr media", keywords: ["pr", "media", "press", "newsroom", "interview", "coverage"], draw: gMegaphone, hue: 350 },
  { label: "wallet", keywords: ["wallet", "account abstraction", "aa", "onboarding", "paymaster"], draw: gWallet, hue: 140 },
  { label: "payments", keywords: ["payment", "payments", "pay", "fintech", "toss"], draw: gWallet, hue: 110 },
  { label: "layer 2", keywords: ["layer 2", "l2", "rollup", "zk", "optimistic"], draw: gStack, hue: 252 },
  { label: "tokenomics", keywords: ["tokenomics", "emission", "vesting", "supply", "float"], draw: gPercent, hue: 54 },
  { label: "otc capital", keywords: ["otc", "capital", "market making", "liquidity", "mm"], draw: gCandles, hue: 174 },
  { label: "gaming", keywords: ["gaming", "gamefi", "game", "metaverse"], draw: gAssetGrid, hue: 292 },
  { label: "nft", keywords: ["nft", "collectible", "pfp", "creator economy"], draw: gAssetGrid, hue: 312 },
  { label: "security", keywords: ["security", "audit", "exploit", "hack", "risk"], draw: gShield, hue: 10 },
  { label: "bridge", keywords: ["bridge", "cross-chain", "interoperability", "interop"], draw: gChain, hue: 188 },
  { label: "oracle", keywords: ["oracle", "data feed", "price feed"], draw: gNetworkNodes, hue: 52 },
  { label: "socialfi", keywords: ["socialfi", "social", "attention", "mindshare"], draw: gMegaphone, hue: 300 },
  { label: "dao", keywords: ["dao", "governance", "voting", "proposal"], draw: gColumns, hue: 72 },
  { label: "staking", keywords: ["staking", "restaking", "validator", "delegation"], draw: gFundUp, hue: 126 },
  { label: "stablecoin rails", keywords: ["rails", "settlement", "remittance", "onramp", "offramp"], draw: gWallet, hue: 190 },
  { label: "korea market", keywords: ["korea market", "korean market", "korea crypto", "korea web3", "korean crypto"], draw: gTaegeuk, hue: 224 },
  { label: "japan comparison", keywords: ["vs-japan", "japan", "jp market"], draw: gRisingSun, hue: 0 },
  { label: "china hk", keywords: ["hong kong", "china", "mainland", "hk"], draw: gColumns, hue: 4 },
  { label: "asia", keywords: ["asia", "apac", "asian"], draw: gNetworkNodes, hue: 180 },
  { label: "legal entity", keywords: ["local entity", "subsidiary", "entity", "license"], draw: gShield, hue: 236 },
  { label: "banking", keywords: ["bank", "banking", "kookmin", "shinhan", "woori", "nh"], draw: gColumns, hue: 46 },
  { label: "exchange", keywords: ["exchange", "cex", "order book", "trading"], draw: gCandles, hue: 152 },
  { label: "research", keywords: ["research", "report", "market intelligence", "thesis"], draw: gSearchLens, hue: 196 },
  { label: "growth", keywords: ["growth", "scale", "retention", "activation"], draw: gFundUp, hue: 92 },
  { label: "paid ads", keywords: ["paid ads", "ads", "performance marketing", "cpi", "cpa"], draw: gFunnel, hue: 34 },
  { label: "ama", keywords: ["ama", "ask me anything", "space", "live session"], draw: gSpeechBubble, hue: 58 },
  { label: "branding", keywords: ["brand", "branding", "positioning", "narrative"], draw: gStack, hue: 338 },
  { label: "analytics", keywords: ["analytics", "data", "dashboard", "metrics", "kpi"], draw: gCandles, hue: 214 },
  { label: "fundraising", keywords: ["fundraising", "raise", "investor", "deal flow"], draw: gCoin, hue: 286 },
  { label: "airdrop", keywords: ["airdrop", "points", "quest", "campaign"], draw: gRocket, hue: 72 },
  { label: "mining", keywords: ["mining", "hash", "pow", "bitcoin miner"], draw: gChip, hue: 48 },
  { label: "bitcoin", keywords: ["bitcoin", "btc", "satoshi"], draw: gCoin, hue: 34 },
  { label: "ethereum", keywords: ["ethereum", "eth", "evm"], draw: gAssetGrid, hue: 250 },
  { label: "solana", keywords: ["solana", "sol"], draw: gNetworkNodes, hue: 286 },
  { label: "aptos", keywords: ["aptos", "move language", "movevm"], draw: gStack, hue: 172 },
  { label: "sui", keywords: ["sui", "object model"], draw: gStack, hue: 200 },
  { label: "bnb", keywords: ["bnb", "binance"], draw: gNetworkNodes, hue: 48 },
  { label: "polygon", keywords: ["polygon", "matic"], draw: gChain, hue: 276 },
  { label: "bybit", keywords: ["bybit"], draw: gCandles, hue: 48 },
  { label: "peaq", keywords: ["peaq"], draw: gNetworkNodes, hue: 166 },
  { label: "spacecoin", keywords: ["spacecoin", "satellite", "space"], draw: gNetworkNodes, hue: 226 },
  { label: "sahara ai", keywords: ["sahara", "sahara ai"], draw: gChip, hue: 154 },
  { label: "mantra", keywords: ["mantra"], draw: gAssetGrid, hue: 26 },
  { label: "ondo", keywords: ["ondo"], draw: gAssetGrid, hue: 192 },
  { label: "privacy", keywords: ["privacy", "zkpass", "zero knowledge", "zk", "identity"], draw: gShield, hue: 276 },
  { label: "identity", keywords: ["identity", "did", "credential", "kyc"], draw: gShield, hue: 206 },
  { label: "real name", keywords: ["real-name", "real name", "bank account"], draw: gColumns, hue: 54 },
  { label: "retail", keywords: ["retail", "retail investors", "users"], draw: gNetworkNodes, hue: 94 },
  { label: "institutional custody", keywords: ["custodian", "custody", "qualified investor"], draw: gColumns, hue: 210 },
  { label: "market maker", keywords: ["market maker", "market-making", "liquidity provider"], draw: gCandles, hue: 176 },
  { label: "otc desk", keywords: ["otc desk", "block trade", "broker"], draw: gCoin, hue: 174 },
  { label: "stablecoin issuer", keywords: ["issuer", "issuance", "mint", "reserve"], draw: gCoin, hue: 202 },
  { label: "reserves", keywords: ["reserves", "100% reserve", "cash equivalent"], draw: gColumns, hue: 58 },
  { label: "capital controls", keywords: ["capital flight", "capital controls", "cross-border"], draw: gShield, hue: 12 },
  { label: "compliance calendar", keywords: ["timeline", "calendar", "deadline", "implementation"], draw: gStack, hue: 22 },
  { label: "naver cafe", keywords: ["naver cafe", "cafe", "knowledge in"], draw: gNaver, hue: 146 },
  { label: "youtube", keywords: ["youtube", "video", "shorts"], draw: gMegaphone, hue: 4 },
  { label: "discord", keywords: ["discord", "guild"], draw: gNetworkNodes, hue: 246 },
  { label: "reddit", keywords: ["reddit"], draw: gSpeechBubble, hue: 16 },
  { label: "content", keywords: ["content", "editorial", "article", "blog"], draw: gSearchLens, hue: 198 },
  { label: "localization", keywords: ["localization", "translation", "korean copy"], draw: gTaegeuk, hue: 350 },
  { label: "trust", keywords: ["trust", "credibility", "reputation"], draw: gShield, hue: 186 },
  { label: "distribution", keywords: ["distribution", "channel", "channels"], draw: gNetworkNodes, hue: 78 },
  { label: "competition", keywords: ["competitor", "competitive", "landscape"], draw: gCandles, hue: 294 },
  { label: "playbook", keywords: ["playbook", "framework", "strategy"], draw: gStack, hue: 226 },
  { label: "seoul", keywords: ["seoul", "gangnam", "han river"], draw: gEventStage, hue: 204 },
  { label: "policy", keywords: ["policy", "law", "bill", "national assembly"], draw: gShield, hue: 218 },
  { label: "consumer app", keywords: ["consumer", "app", "mobile"], draw: gWallet, hue: 104 },
  { label: "enterprise", keywords: ["enterprise", "b2b", "saas"], draw: gColumns, hue: 232 },
  { label: "infrastructure", keywords: ["infrastructure", "middleware", "protocol"], draw: gNetworkNodes, hue: 168 },
  { label: "founder", keywords: ["founder", "operator", "team"], draw: gRocket, hue: 20 },
  { label: "bear market", keywords: ["bear", "downturn", "winter"], draw: gCandles, hue: 204 },
  { label: "bull market", keywords: ["bull", "cycle", "rally"], draw: gFundUp, hue: 88 },
  { label: "education", keywords: ["education", "guide", "primer", "explained"], draw: gSearchLens, hue: 52 },
  { label: "advisory", keywords: ["advisory", "consulting", "consultation"], draw: gColumns, hue: 188 },
];

function archetypeIndex(label: string, keywords: string[]) {
  return xmur3(`${label}|${keywords.join("|")}`)() % 100;
}

function route(k: string, category?: string): Topic | null {
  let best: { spec: (typeof TOPIC_ARCHETYPES)[number]; score: number } | null = null;
  for (const spec of TOPIC_ARCHETYPES) {
    for (const raw of spec.keywords) {
      const needle = raw.toLowerCase();
      if (!needle || !k.includes(needle)) continue;
      const exactBoost = new RegExp(`(^|[^a-z0-9])${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z0-9]|$)`).test(k) ? 80 : 0;
      const score = needle.length * 3 + exactBoost + spec.keywords.length;
      if (!best || score > best.score) best = { spec, score };
    }
  }
  if (best) return { draw: best.spec.draw, hue: best.spec.hue, archetype: archetypeIndex(best.spec.label, best.spec.keywords), label: best.spec.label };

  // category fallback before abstract
  const c = (category || "").toLowerCase();
  if (c === "marketing") return { draw: gFunnel, hue: 330, archetype: 61, label: "category marketing" };
  if (c === "regulation") return { draw: gShield, hue: 222, archetype: 62, label: "category regulation" };
  if (c === "community") return { draw: gNetworkNodes, hue: 96, archetype: 63, label: "category community" };
  if (c === "market research") return { draw: gSearchLens, hue: 196, archetype: 64, label: "category market research" };
  if (c === "strategy") return { draw: gStack, hue: 226, archetype: 65, label: "category strategy" };
  if (c === "defi") return { draw: gChain, hue: 264, archetype: 66, label: "category defi" };
  if (c === "technology") return { draw: gChip, hue: 158, archetype: 67, label: "category technology" };
  if (c === "stablecoins") return { draw: gCoin, hue: 204, archetype: 68, label: "category stablecoins" };
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

function fillSeededBackdrop(ctx: CanvasRenderingContext2D, W: number, H: number, baseHue: number, rand: () => number) {
  const hue = baseHue + (rand() - 0.5) * 74;
  const bg0 = hsl(hue, 0.46 + rand() * 0.18, 0.035 + rand() * 0.02);
  const bg1 = hsl(hue + 38 + rand() * 90, 0.42 + rand() * 0.22, 0.075 + rand() * 0.035);
  const bg2 = hsl(hue - 70 - rand() * 60, 0.38 + rand() * 0.22, 0.055 + rand() * 0.028);
  const grad = ctx.createLinearGradient(W * rand(), 0, W * (1 - rand()), H);
  grad.addColorStop(0, rgbStr(bg0));
  grad.addColorStop(0.58, rgbStr(bg1));
  grad.addColorStop(1, rgbStr(bg2));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
}

function makeMicroParams(rand: () => number) {
  return [
    rand() * TAU,
    rand() * TAU,
    2.6 + rand() * 8.5,
    3.2 + rand() * 10.5,
    4.5 + rand() * 14,
    0.18 + rand() * 0.64,
    0.18 + rand() * 0.64,
    2 + Math.floor(rand() * 7),
  ];
}

function seededMicroValue(x: number, y: number, params: number[]) {
  const [a, b, f1, f2, f3, px, py, arms] = params;
  const u = x * Math.cos(a) + y * Math.sin(a);
  const v = -x * Math.sin(a) + y * Math.cos(a);
  const d = Math.hypot(x - px, y - py);
  const th = Math.atan2(y - py, x - px);
  const waves = Math.sin((u * f1 + b) * TAU) * 0.36 + Math.cos((v * f2 - b) * TAU) * 0.28;
  const spiral = Math.sin(d * f3 * TAU + th * arms + b * 2.7) * Math.exp(-d * 0.85) * 0.42;
  return clamp(0.38 + waves + spiral);
}

function drawFingerprintMarks(ctx: CanvasRenderingContext2D, W: number, H: number, hue: number, rand: () => number) {
  const a = hsl(hue + 155 + rand() * 80, 0.62, 0.58);
  const b = hsl(hue - 110 - rand() * 60, 0.55, 0.46);
  const count = 34 + Math.floor(rand() * 52);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < count; i++) {
    const edge = Math.floor(rand() * 4);
    const x = edge < 2 ? W * rand() : edge === 2 ? W * (0.04 + rand() * 0.18) : W * (0.78 + rand() * 0.18);
    const y = edge === 0 ? H * (0.04 + rand() * 0.18) : edge === 1 ? H * (0.78 + rand() * 0.17) : H * rand();
    const w = W * (0.004 + rand() * 0.018);
    const h = H * (0.003 + rand() * 0.014);
    ctx.fillStyle = rgbaStr(rand() > 0.5 ? a : b, 0.12 + rand() * 0.2);
    if (rand() > 0.58) {
      ctx.beginPath(); ctx.arc(x, y, Math.max(w, h) * (0.55 + rand()), 0, TAU); ctx.fill();
    } else {
      ctx.fillRect(x, y, w, h);
    }
  }
  ctx.restore();
}

function drawArchetypeTexture(ctx: CanvasRenderingContext2D, W: number, H: number, hue: number, archetype: number, rand: () => number) {
  const primary = hsl(hue + archetype * 7.3, 0.56, 0.52);
  const secondary = hsl(hue - 120 + archetype * 3.1, 0.48, 0.4);
  const mode = archetype % 10;
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = rgbaStr(primary, 0.16);
  ctx.fillStyle = rgbaStr(secondary, 0.12);
  ctx.lineWidth = W * (0.003 + (archetype % 5) * 0.0016);

  if (mode === 0) {
    const bands = 5 + (archetype % 7);
    for (let i = 0; i < bands; i++) {
      const y = H * (0.18 + i * 0.11 + rand() * 0.025);
      ctx.beginPath();
      for (let x = W * 0.08; x <= W * 0.92; x += W * 0.07) {
        const yy = y + Math.sin((x / W) * TAU * (1.2 + archetype * 0.03) + i) * H * 0.025;
        x === W * 0.08 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
  } else if (mode === 1) {
    const n = 3 + (archetype % 4);
    for (let i = 0; i < n; i++) {
      ctx.strokeRect(W * (0.12 + i * 0.07), H * (0.17 + i * 0.055), W * (0.58 - i * 0.07), H * (0.46 - i * 0.035));
    }
  } else if (mode === 2) {
    const rays = 9 + (archetype % 11), cx = W * (0.25 + rand() * 0.5), cy = H * (0.25 + rand() * 0.45);
    for (let i = 0; i < rays; i++) {
      const a = (i / rays) * TAU + rand() * 0.05;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * W * 0.45, cy + Math.sin(a) * H * 0.45); ctx.stroke();
    }
  } else if (mode === 3) {
    const steps = 7 + (archetype % 8);
    for (let i = 0; i < steps; i++) {
      ctx.fillRect(W * (0.12 + i * 0.085), H * (0.76 - i * 0.04), W * 0.045, H * (0.035 + i * 0.012));
    }
  } else if (mode === 4) {
    const cx = W * (0.5 + (rand() - 0.5) * 0.18), cy = H * (0.5 + (rand() - 0.5) * 0.18);
    for (let r = 0; r < 5 + (archetype % 5); r++) {
      ctx.beginPath(); ctx.arc(cx, cy, W * (0.06 + r * 0.045), 0, TAU); ctx.stroke();
    }
  } else if (mode === 5) {
    const cols = 4 + (archetype % 5), rows = 4 + ((archetype >> 1) % 5);
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      if ((x + y + archetype) % 3 === 0) ctx.fillRect(W * (0.12 + x * 0.17), H * (0.18 + y * 0.13), W * 0.045, H * 0.045);
    }
  } else if (mode === 6) {
    const nodes = 8 + (archetype % 7);
    let px = W * (0.14 + rand() * 0.1), py = H * (0.18 + rand() * 0.12);
    for (let i = 1; i < nodes; i++) {
      const x = W * (0.14 + i * 0.72 / nodes + (rand() - 0.5) * 0.08), y = H * (0.2 + rand() * 0.55);
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y, W * 0.012, 0, TAU); ctx.fill();
      px = x; py = y;
    }
  } else if (mode === 7) {
    const count = 18 + (archetype % 20);
    for (let i = 0; i < count; i++) {
      const x = W * (0.1 + rand() * 0.8), y = H * (0.16 + rand() * 0.66);
      ctx.beginPath(); ctx.arc(x, y, W * (0.006 + rand() * 0.018), 0, TAU); ctx.fill();
    }
  } else if (mode === 8) {
    const cx = W * 0.5, cy = H * 0.5;
    for (let i = 0; i < 3 + (archetype % 4); i++) {
      const a = rand() * TAU;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(a); ctx.strokeRect(-W * (0.1 + i * 0.04), -H * (0.19 + i * 0.035), W * (0.2 + i * 0.08), H * (0.38 + i * 0.07)); ctx.restore();
    }
  } else {
    const bars = 6 + (archetype % 9);
    for (let i = 0; i < bars; i++) {
      const x = W * (0.14 + i * 0.72 / bars);
      ctx.beginPath(); ctx.moveTo(x, H * 0.18); ctx.lineTo(x + W * (rand() - 0.5) * 0.12, H * 0.82); ctx.stroke();
    }
  }
  ctx.restore();
}

/** Render a topic-derived halftone cover onto a canvas (uses backing-store size). */
/** Premium duotone backdrop: near-black field, one faint category-tinted
 * radial glow (raycast.com card-glow language) and a whisper dot grid
 * (vercel.com). Replaces the old multi-hue gradient + confetti marks. */
function fillPremiumBackdrop(ctx: CanvasRenderingContext2D, W: number, H: number, h: number, sat: number, rand: () => number) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, `hsl(${h}, ${Math.round(sat * 28)}%, 4.5%)`);
  g.addColorStop(1, `hsl(${h}, ${Math.round(sat * 22)}%, 3%)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  const gx = W * (0.3 + rand() * 0.4), gy = H * (0.3 + rand() * 0.35);
  const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(W, H) * 0.75);
  glow.addColorStop(0, `hsla(${h}, ${Math.round(sat * 100)}%, 60%, 0.10)`);
  glow.addColorStop(1, "hsla(0, 0%, 0%, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  // whisper dot grid
  const step = Math.max(14, W / 40);
  ctx.fillStyle = `hsla(${h}, ${Math.round(sat * 60)}%, 70%, 0.05)`;
  for (let y = step / 2; y < H; y += step) {
    for (let x = step / 2; x < W; x += step) {
      ctx.beginPath(); ctx.arc(x, y, 0.7, 0, TAU); ctx.fill();
    }
  }
}

/** The reference technique: a real photograph, seeded crop, luma-normalized,
 * halftoned edge-to-edge in the category hue. Dot radius carries the tone. */
function renderPhotoHalftone(
  ctx: CanvasRenderingContext2D, W: number, H: number,
  img: HTMLImageElement, rand: () => number,
  hue: number, catSat: number, catLig: number,
  fixed?: CoverAssignment,
  mark?: HTMLCanvasElement | HTMLImageElement | null,
) {
  const off = document.createElement("canvas"); off.width = W; off.height = H;
  const o = off.getContext("2d")!;
  // seeded cover-crop: zoom 1.05-1.4 with a seeded focal point
  const zoom = 1.05 + rand() * 0.35;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const scale = Math.max(W / iw, H / ih) * zoom;
  const dw = iw * scale, dh = ih * scale;
  const dx = -(dw - W) * rand();
  const dy = -(dh - H) * rand();
  const flip = rand() > 0.5;
  if (flip) { o.save(); o.translate(W, 0); o.scale(-1, 1); }
  o.drawImage(img, flip ? W - dx - dw : dx, dy, dw, dh);
  if (flip) o.restore();
  // Subject mark (project logo or topic glyph) composited INTO the photo
  // before dithering, so it prints as part of the halftone like a moon:
  // a dark pocket behind it for contrast, then the mark lifted to bright.
  if (mark) {
    const mw2 = (mark as HTMLImageElement).naturalWidth || (mark as HTMLCanvasElement).width;
    const mh2 = (mark as HTMLImageElement).naturalHeight || (mark as HTMLCanvasElement).height;
    if (mw2 > 0 && mh2 > 0) {
      const targetW = W * (0.34 + rand() * 0.16);
      const ratio = mh2 / mw2;
      const targetH = targetW * ratio;
      const mx = W * (0.28 + rand() * 0.44);
      const my = H * (0.26 + rand() * 0.3);
      const pocket = o.createRadialGradient(mx, my, 0, mx, my, Math.max(targetW, targetH) * 0.85);
      pocket.addColorStop(0, "rgba(0,0,0,0.62)");
      pocket.addColorStop(1, "rgba(0,0,0,0)");
      o.fillStyle = pocket;
      o.fillRect(0, 0, W, H);
      o.save();
      o.filter = `grayscale(1) brightness(1.9) blur(${Math.max(1, W * 0.002)}px)`;
      o.globalCompositeOperation = "lighter";
      o.drawImage(mark, mx - targetW / 2, my - targetH / 2, targetW, targetH);
      o.restore();
    }
  }

  const data = o.getImageData(0, 0, W, H).data;

  // luma histogram stretch (5th-95th percentile-ish via coarse sampling)
  let lo = 1, hi = 0;
  const samples: number[] = [];
  for (let i = 0; i < data.length; i += 4 * 97) {
    samples.push((0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255);
  }
  samples.sort((a, b) => a - b);
  lo = samples[Math.floor(samples.length * 0.04)] ?? 0;
  hi = samples[Math.floor(samples.length * 0.96)] ?? 1;
  const span = Math.max(0.12, hi - lo);

  // ---- Variation axes (the combination space is what makes every cover
  // unique): screen ANGLE like a real print halftone, hex-offset rows,
  // dot shape, posterized tone, coarse-to-fine density. ----
  // Logos need dot resolution to stay recognizable: enforce a fine grid
  // and a gentle screen angle whenever an explicit mark is present.
  const isLogo = !!mark && (mark as HTMLImageElement).naturalWidth !== undefined && (mark as HTMLImageElement).naturalWidth > 0;
  let density = fixed ? fixed.density : 34 + Math.floor(rand() * 42);
  let angle = fixed ? (fixed.angle * Math.PI) / 180 : (rand() - 0.5) * 0.62;
  if (isLogo) { density = Math.max(density, 56); angle = Math.max(-0.14, Math.min(0.14, angle)); }
  const hexOffset = fixed ? fixed.hex : rand() > 0.45;
  const shapeRoll = rand();
  const shape = fixed ? fixed.shape
    : shapeRoll < 0.5 ? "circle" : shapeRoll < 0.7 ? "square" : shapeRoll < 0.85 ? "diamond" : "dash";
  const posterLevels = isLogo ? 0 : (fixed ? fixed.poster : (rand() < 0.35 ? 3 + Math.floor(rand() * 2) : 0));
  const gamma = 0.75 + rand() * 0.4;

  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, W, H);
  const s2 = W / density, half = s2 / 2;
  const satPct = Math.round(catSat * 100);
  const cosA = Math.cos(angle), sinA = Math.sin(angle);
  const diag = Math.ceil(Math.hypot(W, H) / s2) + 2;
  const midX = W / 2, midY = H / 2;

  for (let r = -diag; r < diag; r++) {
    for (let c = -diag; c < diag; c++) {
      const gx = (c + (hexOffset && (r & 1) ? 0.5 : 0)) * s2;
      const gy = r * s2;
      const cx = midX + gx * cosA - gy * sinA;
      const cy = midY + gx * sinA + gy * cosA;
      if (cx < -s2 || cx > W + s2 || cy < -s2 || cy > H + s2) continue;
      const px = Math.min(W - 1, Math.max(0, Math.round(cx)));
      const py = Math.min(H - 1, Math.max(0, Math.round(cy)));
      const idx = (py * W + px) * 4;
      const raw = (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) / 255;
      let L = Math.min(1, Math.max(0, (raw - lo) / span));
      if (posterLevels) L = Math.round(L * (posterLevels - 1)) / (posterLevels - 1);
      const radius = half * (0.14 + 0.88 * Math.pow(L, gamma));
      const lig = 10 + Math.pow(L, 0.92) * (catLig * 100 + 30 - 10);
      ctx.fillStyle = `hsl(${hue}, ${satPct}%, ${Math.min(95, Math.round(lig))}%)`;
      if (shape === "circle") {
        ctx.beginPath(); ctx.arc(cx, cy, radius, 0, TAU); ctx.fill();
      } else if (shape === "square") {
        ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      } else if (shape === "diamond") {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.PI / 4);
        ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
        ctx.restore();
      } else {
        // dash: horizontal tick, scanline feel
        ctx.beginPath();
        ctx.roundRect(cx - radius * 1.3, cy - radius * 0.45, radius * 2.6, radius * 0.9, radius * 0.45);
        ctx.fill();
      }
    }
  }
}

export function drawCover(canvas: HTMLCanvasElement, key: string, category?: string, markUrl?: string) {
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx || W === 0 || H === 0) return;
  const k = (key || "ium").toLowerCase();
  const rand = mulberry32(xmur3(k)());
  const topic = route(k, category);

  // Photo-dither path (the reference look): seeded photo + seeded crop +
  // category hue. Falls back to the procedural scene while loading/on error.
  const cat0 = categoryHslParts(category);
  const hue0 = (category ? cat0.h : (topic ? topic.hue : 220)) + (rand() - 0.5) * 14;
  const slug = k.split("|")[0];
  const assign = COVER_ASSIGN[slug];
  const photoUrl = PHOTO_POOL[assign ? assign.photo % PHOTO_POOL.length : Math.floor(rand() * PHOTO_POOL.length)];
  const img = poolImage(photoUrl);
  // Subject mark: explicit logo takes priority; otherwise the topic glyph
  // keeps every cover on-subject (John: the picture must relate to the topic).
  const markImg = markUrl ? poolImage(markUrl) : null;
  const glyphMark = (!markImg && topic) ? (() => {
    const gcv = document.createElement("canvas");
    gcv.width = 900; gcv.height = 900;
    const g = gcv.getContext("2d")!;
    g.lineCap = "round"; g.lineJoin = "round";
    topic.draw(g, 900, 900, mulberry32(xmur3(k + "|glyph")()));
    return gcv;
  })() : null;
  const paintPhoto = () => {
    if (canvas.width !== W || canvas.height !== H) return; // stale after resize
    if (markImg && !(markImg.complete && markImg.naturalWidth > 0)) return;
    renderPhotoHalftone(ctx, W, H, img, mulberry32(xmur3(k + "|crop")()),
      hue0, category ? cat0.s : 0.55, category ? cat0.l : 0.62, assign,
      markImg ?? glyphMark);
  };
  const photoReady = img.complete && img.naturalWidth > 0;
  const markReady = !markImg || (markImg.complete && markImg.naturalWidth > 0);
  if (photoReady && markReady) { paintPhoto(); return; }
  if (!photoReady) img.addEventListener("load", paintPhoto, { once: true });
  if (markImg && !markReady) markImg.addEventListener("load", paintPhoto, { once: true });
  if (photoReady || markReady) { /* one of them will fire paintPhoto */ }

  // ---- Fallback: full-bleed GRAYSCALE SCENE offscreen ----
  // Book-cover halftone: a seeded landscape — sky gradient, one celestial
  // object (the topic glyph or a moon disc), and 2-3 silhouette ridges —
  // then the whole canvas is dithered edge-to-edge, dot size carrying luma.
  const off = document.createElement("canvas"); off.width = W; off.height = H;
  const o = off.getContext("2d")!;
  o.fillStyle = "#000"; o.fillRect(0, 0, W, H);
  o.lineCap = "round"; o.lineJoin = "round";

  // Sky: seeded brightness falling toward the horizon.
  const horizon = H * (0.52 + rand() * 0.24);
  const skyTop = 0.10 + rand() * 0.10;
  const sky = o.createLinearGradient(0, 0, 0, horizon * 1.15);
  const g0 = Math.round(skyTop * 255), g1 = Math.round(0.07 * 255);
  sky.addColorStop(0, `rgb(${g0},${g0},${g0})`);
  sky.addColorStop(1, `rgb(${g1},${g1},${g1})`);
  o.fillStyle = sky; o.fillRect(0, 0, W, H);

  // Celestial object: topic glyph lifted to near-white, or a moon disc.
  const ccx = W * (0.22 + rand() * 0.56), ccy = H * (0.14 + rand() * 0.3);
  const useGlyph = !!topic && rand() < 0.78;
  if (useGlyph && topic) {
    const gcv = document.createElement("canvas"); gcv.width = W; gcv.height = H;
    const g = gcv.getContext("2d")!;
    g.lineCap = "round"; g.lineJoin = "round";
    g.save();
    g.translate(ccx, ccy);
    g.rotate((rand() - 0.5) * 0.5);
    const gs = 0.34 + rand() * 0.22;
    g.scale(gs * (rand() > 0.5 ? -1 : 1), gs);
    g.translate(-W * 0.5, -H * 0.5);
    topic.draw(g, W, H, rand);
    g.restore();
    o.save();
    o.filter = `grayscale(1) brightness(1.55) contrast(0.9) blur(${Math.max(1, W * 0.0025)}px)`;
    o.globalCompositeOperation = "lighter";
    o.drawImage(gcv, 0, 0);
    o.restore();
    // faint halo behind the glyph so it breathes like the reference moon
    const halo = o.createRadialGradient(ccx, ccy, 0, ccx, ccy, W * 0.4);
    halo.addColorStop(0, "rgba(255,255,255,0.26)");
    halo.addColorStop(1, "rgba(255,255,255,0)");
    o.save(); o.globalCompositeOperation = "lighter";
    o.fillStyle = halo; o.fillRect(0, 0, W, H); o.restore();
  } else {
    const mr = W * (0.05 + rand() * 0.07);
    const glow = o.createRadialGradient(ccx, ccy, 0, ccx, ccy, mr * 5);
    glow.addColorStop(0, "rgba(255,255,255,0.95)");
    glow.addColorStop(0.12, "rgba(255,255,255,0.7)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    o.fillStyle = glow;
    o.beginPath(); o.arc(ccx, ccy, mr * 5, 0, TAU); o.fill();
    o.fillStyle = "#fff"; o.beginPath(); o.arc(ccx, ccy, mr, 0, TAU); o.fill();
  }

  // Silhouette ridges: 2-3 seeded layers, darker as they come forward.
  const layers = 2 + Math.floor(rand() * 2);
  for (let i = 0; i < layers; i++) {
    const base = horizon + (H - horizon) * (i / layers) * 0.72;
    const amp = H * (0.05 + rand() * 0.11) * (1 - i * 0.18);
    const f1 = 1.2 + rand() * 2.4, f2 = 3.1 + rand() * 4.2;
    const p1 = rand() * TAU, p2 = rand() * TAU;
    const sharp = rand() > 0.55; // peaked vs rolling
    // moonlit bodies: nearer layers darker, all above the sky floor
    const lum = Math.max(0.09, 0.34 - i * 0.11 + rand() * 0.04);
    const gl = Math.round(lum * 255);
    const pts: Array<[number, number]> = [];
    for (let x = -2; x <= W + 2; x += Math.max(3, W / 160)) {
      const t = x / W;
      let y = base - amp * (0.62 * Math.sin(t * f1 * TAU + p1) + 0.38 * Math.sin(t * f2 * TAU + p2));
      if (sharp) y = base - Math.abs(base - y) * 1.25;
      pts.push([x, y]);
    }
    o.fillStyle = `rgb(${gl},${gl},${gl})`;
    o.beginPath();
    o.moveTo(-2, H + 2);
    pts.forEach(([x, y]) => o.lineTo(x, y));
    o.lineTo(W + 2, H + 2);
    o.closePath();
    o.fill();
    // lit ridge edge
    const el = Math.min(0.62, lum + 0.24 + rand() * 0.08);
    const egl = Math.round(el * 255);
    o.strokeStyle = `rgb(${egl},${egl},${egl})`;
    o.lineWidth = Math.max(2, W * 0.006);
    o.beginPath();
    pts.forEach(([x, y], j) => (j === 0 ? o.moveTo(x, y) : o.lineTo(x, y)));
    o.stroke();
  }

  // ---- 2) Halftone the whole scene, edge to edge ----
  const data = o.getImageData(0, 0, W, H).data;
  const cat = categoryHslParts(category);
  const hue = (category ? cat.h : (topic ? topic.hue : 220)) + (rand() - 0.5) * 14;
  const catSat = category ? cat.s : 0.55;
  const catLig = category ? cat.l : 0.62;

  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, W, H);

  const cols = 48 + Math.floor(rand() * 14);
  const s2 = W / cols, rows = Math.ceil(H / s2) + 1, half = s2 / 2;
  const satPct = Math.round(catSat * 100);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = (c + 0.5) * s2, cy = (r + 0.5) * s2;
      const px = Math.min(W - 1, Math.round(cx)), py = Math.min(H - 1, Math.round(cy));
      const idx = (py * W + px) * 4;
      const L = (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) / 255;
      // Every cell gets a dot (the reference texture has no voids): tone
      // lives in dot RADIUS first, lightness second.
      const radius = half * (0.16 + 0.86 * Math.pow(L, 0.85));
      const lig = 12 + Math.pow(L, 0.9) * (catLig * 100 + 26 - 12);
      ctx.fillStyle = `hsl(${hue}, ${satPct}%, ${Math.min(94, Math.round(lig))}%)`;
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, TAU); ctx.fill();
    }
  }
}

/** Year label from a post date string (falls back to 2026). */
export function coverYear(date?: string): string {
  const m = (date || "").match(/(20\d\d)/);
  return m ? m[1] : "2026";
}
