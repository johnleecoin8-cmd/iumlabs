// Per-category accent system — a16zcrypto.com mechanism (extracted 2026-07-02):
// they swap a whole-page --brand-color per focus area (html.color-theme-*)
// and use it as a text HIGHLIGHTER (dark text inside a brand-color box),
// never as text-on-dark. We scope the swap to the blog surfaces by
// overriding --primary/--brand inline, so every existing text-primary /
// bg-primary / border-primary utility inherits the category color.
//
// Hues: a16z theme values (#F46565 red, #D6ABF7 magenta, #B882ED article
// accent) + the site's own blogCover palette (#7A8CFF #FFD166 #62D6D6
// #06D6A0 #FF9DD7), all light pastels that carry black text like a16z's
// text-neutral-5-inside-highlight.

const CATEGORY_HEX: Record<string, string> = {
  "Market Research": "#7A8CFF",
  "Strategy": "#FFD166",
  "GTM Strategy": "#FFD166",
  "Regulation": "#F46565",
  "Marketing": "#D6ABF7",
  "Technology": "#62D6D6",
  "Stablecoins": "#06D6A0",
  "DeFi": "#B882ED",
  "Community": "#FF9DD7",
};

const DEFAULT_HSL = "158 64% 52%"; // site emerald (--brand)

function hexToHslTriplet(hex: string): string {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

const HSL_CACHE: Record<string, string> = {};

/** HSL triplet ("H S% L%") for a category, for --primary/--brand overrides. */
export function categoryHsl(category?: string | null): string {
  if (!category || !CATEGORY_HEX[category]) return DEFAULT_HSL;
  return (HSL_CACHE[category] ??= hexToHslTriplet(CATEGORY_HEX[category]));
}

/** Inline style object scoping the category accent onto a subtree. */
export function categoryAccentStyle(category?: string | null): Record<string, string> {
  const hsl = categoryHsl(category);
  return { "--primary": hsl, "--brand": hsl };
}

export function categoryHex(category?: string | null): string {
  return (category && CATEGORY_HEX[category]) || "#36d399";
}

/** Raw HSL parts of a category accent (for canvas rendering). */
export function categoryHslParts(category?: string | null): { h: number; s: number; l: number } {
  const [h, s, l] = categoryHsl(category).split(" ");
  return { h: parseFloat(h), s: parseFloat(s) / 100, l: parseFloat(l) / 100 };
}
