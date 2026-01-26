export type SparklineTrend = 'up' | 'down' | 'neutral';

type GenerateOptions = {
  /** Last/current value we want the sparkline to converge to */
  base: number;
  trend: SparklineTrend;
  /** deterministic seed */
  seed: number;
  /** number of points in sparkline */
  points?: number;
};

const seededRandom = (s: number) => {
  const x = Math.sin(s) * 10000;
  return x - Math.floor(x);
};

export const hashSeed = (input: string) =>
  input.split('').reduce((acc, ch, i) => acc + ch.charCodeAt(0) * (i + 1), 0);

/**
 * Generate a high-contrast but still natural-looking sparkline.
 * Deterministic: same (base, trend, seed) => same curve.
 */
export const generateFallbackSparkline = ({
  base,
  trend,
  seed,
  points = 14,
}: GenerateOptions): number[] => {
  const safeBase = Number.isFinite(base) && base > 0 ? base : 1;

  // Start a bit away from the end so the trend feels directional.
  const startMultiplier = trend === 'up' ? 0.75 : trend === 'down' ? 1.25 : 0.95;
  let current = safeBase * startMultiplier;

  // Higher values get larger amplitude; small values still get a visible curve.
  const amplitude = Math.max(safeBase * 0.08, 0.6);

  const out: number[] = [];

  for (let i = 0; i < points; i++) {
    // Smooth oscillation + light noise.
    const wave =
      Math.sin((i / (points - 1)) * Math.PI * 1.6 + seed * 0.01) * 0.8 +
      Math.sin((i / (points - 1)) * Math.PI * 3.2 + seed * 0.02) * 0.35;
    const noise = (seededRandom(seed + i * 19) - 0.5) * 0.35;

    // Move towards base gradually so the last point anchors.
    const remaining = Math.max(1, points - 1 - i);
    const drift = (safeBase - current) / remaining;

    current = current + drift * 0.55 + (wave + noise) * amplitude;

    // Prevent going negative / collapsing.
    current = Math.max(current, safeBase * 0.25);

    out.push(Math.round(current * 100) / 100);
  }

  // Anchor last point to base to match displayed value.
  out[points - 1] = Math.round(safeBase * 100) / 100;
  return out;
};

export const ensureSparkline = (
  sparkline: number[] | null | undefined,
  opts: Omit<GenerateOptions, 'base'> & { base?: number }
): number[] => {
  const data = (sparkline || []).filter((v) => typeof v === 'number' && Number.isFinite(v));

  const last = data.length ? data[data.length - 1] : undefined;
  const base = typeof opts.base === 'number' && Number.isFinite(opts.base) && opts.base > 0
    ? opts.base
    : typeof last === 'number' && last > 0
      ? last
      : 1;

  // If we only have 0-1 points OR everything is zero, generate a full curve.
  if (data.length < 2 || data.every((v) => v === 0)) {
    return generateFallbackSparkline({ base, trend: opts.trend, seed: opts.seed, points: opts.points });
  }

  return data;
};
