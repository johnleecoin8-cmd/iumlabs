// Lightweight local analytics store for video playback metrics.
// Persists to localStorage so we can inspect on-device trends without a
// backend round-trip. Bounded to the last N events per key to avoid bloat.

const STORAGE_KEY = 'ium.videoAnalytics.v1';
const MAX_EVENTS = 200;

export type VideoEventType =
  | 'loadstart'
  | 'ready'         // first-frame ready (poster→video swap)
  | 'stall'         // stall detected (no progress within window)
  | 'reload'        // hard/soft reload triggered
  | 'retry'         // play() retry attempt
  | 'error'         // onError fired
  | 'exhausted';    // play attempts exhausted, poster kept

export interface VideoEvent {
  ts: number;                // epoch ms
  type: VideoEventType;
  src?: string;              // basename only (avoid PII / long CDN urls)
  meta?: Record<string, number | string | boolean | null | undefined>;
}

export interface VideoAnalyticsSnapshot {
  events: VideoEvent[];
  counts: Partial<Record<VideoEventType, number>>;
}

const safeParse = (): VideoAnalyticsSnapshot => {
  if (typeof window === 'undefined') return { events: [], counts: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { events: [], counts: {} };
    const parsed = JSON.parse(raw) as VideoAnalyticsSnapshot;
    if (!parsed || !Array.isArray(parsed.events)) return { events: [], counts: {} };
    return { events: parsed.events, counts: parsed.counts ?? {} };
  } catch {
    return { events: [], counts: {} };
  }
};

const persist = (snap: VideoAnalyticsSnapshot) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snap));
  } catch {
    // localStorage may be full or blocked; ignore silently.
  }
};

const basename = (src?: string): string | undefined => {
  if (!src) return undefined;
  try {
    const u = new URL(src, typeof window !== 'undefined' ? window.location.href : 'http://x');
    const parts = u.pathname.split('/');
    return parts[parts.length - 1] || u.pathname;
  } catch {
    const q = src.split('?')[0];
    const parts = q.split('/');
    return parts[parts.length - 1] || q;
  }
};

export const logVideoEvent = (
  type: VideoEventType,
  src?: string,
  meta?: VideoEvent['meta'],
): void => {
  const snap = safeParse();
  snap.events.push({ ts: Date.now(), type, src: basename(src), meta });
  if (snap.events.length > MAX_EVENTS) {
    snap.events.splice(0, snap.events.length - MAX_EVENTS);
  }
  snap.counts[type] = (snap.counts[type] ?? 0) + 1;
  persist(snap);
};

export const getVideoAnalytics = (): VideoAnalyticsSnapshot => safeParse();

export const clearVideoAnalytics = (): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {}
};

// Expose for on-device debugging: `window.__videoAnalytics()` in the console.
if (typeof window !== 'undefined') {
  (window as unknown as { __videoAnalytics?: () => VideoAnalyticsSnapshot }).__videoAnalytics =
    getVideoAnalytics;
}
