import { useState, useEffect, useCallback, useRef } from 'react';
import { appendVersion, hdVariant } from '@/hooks/useVideoPlayer';
import heroImage from '@/assets/images/hero-background.jpg.asset.json';

interface PageIntroProps {
  onComplete: () => void;
}

const MIN_DISPLAY_TIME = 600;
// Failsafe only: the loader is meant to wait until EVERY home video has fully
// downloaded. This cap exists purely so a dead/stalled network can never hang
// the page forever; on any working connection the real gate is asset load.
const MAX_LOAD_TIME = 60000;
const VIDEO_POLL_INTERVAL = 200;

const PageIntro = ({ onComplete }: PageIntroProps) => {
  const [phase, setPhase] = useState<'loading' | 'fadeout' | 'done'>('loading');
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(() => Date.now());
  const displayProgress = useRef(0);
  const rafRef = useRef<number | null>(null);
  const videoReady = useRef(false);
  const fontsReady = useRef(false);
  const loadedAssets = useRef(0);
  const totalAssets = useRef(1);

  const handleComplete = useCallback(() => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);

    setTimeout(() => {
      setPhase('fadeout');
      setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 750);
    }, remaining);
  }, [startTime, onComplete]);

  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { fontsReady.current = true; });
    } else {
      fontsReady.current = true;
    }

    // The intro must not lift until EVERY video the home page will play has
    // fully downloaded into the HTTP cache, so the page never reveals while a
    // clip is still buffering. We fetch each one to completion (await blob) and
    // only mark videoReady once all of them, plus the hero image, are in.
    // Match the exact versioned URL each <video> requests so the fetch warms the
    // same cache entry (no double download). Desktop (>=1024) plays the -hd
    // variant, so gate on whichever variant this device will actually request.
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const hq = (u: string) => (isDesktop ? hdVariant(u) : u);
    // Every video on the home route: hero + about backgrounds and the six
    // Selected-Work gallery clips. Keep in sync with the home sections.
    const HOME_VIDEOS = [
      appendVersion(hq('/videos/hero-background.mp4')),
      appendVersion(hq('/videos/about-background.mp4?v=3')),
      ...[
        '/videos/projects/aptos-hero.mp4', '/videos/projects/bnb-hero.mp4',
        '/videos/projects/bybit-hero.mp4', '/videos/projects/sahara-hero.mp4',
        '/videos/projects/kite-hero.mp4', '/videos/projects/mantra-hero.mp4',
      ].map((u) => appendVersion(hq(u))),
    ];

    const heroImagePromise = new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = heroImage.url;
    });

    const GATED: Array<Promise<unknown>> = [
      heroImagePromise,
      ...HOME_VIDEOS.map((u) => fetch(u, { cache: 'force-cache' }).then((r) => r.blob())),
    ];

    totalAssets.current = GATED.length;
    loadedAssets.current = 0;
    let remaining = GATED.length;
    const markIfDone = () => {
      loadedAssets.current += 1;
      remaining -= 1;
      if (remaining <= 0) videoReady.current = true;
    };
    GATED.forEach((p) => { p.catch(() => {}).finally(markIfDone); });

    // Nudge any mounted <video> into muted autoplay so the hero paints promptly.
    const nudge = setInterval(() => {
      document.querySelectorAll('video').forEach((v) => {
        v.muted = true;
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      });
    }, VIDEO_POLL_INTERVAL);

    const maxTimer = setTimeout(() => {
      videoReady.current = true;
    }, MAX_LOAD_TIME);

    return () => {
      clearInterval(nudge);
      clearTimeout(maxTimer);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const current = displayProgress.current;
      let target: number;

      // Progress tracks the real download: the bar fills as each home video
      // lands and only reaches 100 once every asset (and fonts) is in.
      const frac = loadedAssets.current / Math.max(1, totalAssets.current);
      if (videoReady.current && fontsReady.current) {
        target = 100;
      } else {
        // Reserve the last few percent for fonts/the final asset so the bar
        // never sits at 100 while something is still loading.
        target = Math.min(97, 5 + 92 * frac * (fontsReady.current ? 1 : 0.96));
      }

      if (current < target) {
        const gap = target - current;
        const speed = gap > 30 ? 2.5 : gap > 10 ? 1.2 : 0.5;
        displayProgress.current = Math.min(current + speed, 100);
      }

      setProgress(Math.floor(displayProgress.current));
      if (displayProgress.current >= 100) return;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [startTime]);

  useEffect(() => {
    if (progress >= 100) handleComplete();
  }, [progress, handleComplete]);

  if (phase === 'done') return null;

  const WORD = 'ium Labs';
  const lift = phase === 'fadeout';

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[10002] grid place-items-center bg-[#0A0A0A]"
      style={{
        transform: lift ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 700ms cubic-bezier(.76,0,.24,1)',
      }}
    >
      {/* corner meta */}
      <div className="fixed top-6 left-7 font-mono text-[11px] uppercase tracking-[0.15em] text-white/90">
        ium&nbsp;Labs®
      </div>
      <div className="fixed top-6 right-7 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
        Korea Crypto GTM
      </div>

      {/* wordmark: 'ium Labs' for the first half, then the brand line */}
      {progress < 50 ? (
        <div key="brand" className="flex overflow-hidden" style={{ paddingBottom: '0.12em' }}>
          {WORD.split('').map((ch, i) =>
            ch === ' ' ? (
              <span key={i} style={{ width: '0.32em' }} />
            ) : (
              <span
                key={i}
                className="inline-block font-display font-extrabold text-white"
                style={{
                  fontSize: 'clamp(44px, 11vw, 128px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  transform: 'translateY(110%)',
                  animation: 'pageIntroRise .9s cubic-bezier(.22,1,.36,1) forwards',
                  animationDelay: `${0.05 + i * 0.05}s`,
                }}
              >
                {ch}
              </span>
            )
          )}
        </div>
      ) : (
        <div
          key="tagline"
          className="flex flex-col items-center text-center px-6 font-display font-extrabold text-white"
          style={{
            fontSize: 'clamp(30px, 6vw, 84px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.98,
            animation: 'pageIntroFade .7s cubic-bezier(.22,1,.36,1) both',
          }}
        >
          <span>Your Crypto Ecosystem</span>
          <span>Growth Partner</span>
        </div>
      )}

      {/* counter */}
      <div
        className="fixed right-7 bottom-6 font-mono text-xs text-white/45"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {String(progress).padStart(3, '0')}
      </div>

      {/* label */}
      <div className="fixed left-7 bottom-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
        Loading experience
      </div>

      {/* progress line */}
      <div
        className="fixed left-0 bottom-0 h-[1px] w-full origin-left"
        style={{ background: 'rgba(255,255,255,0.45)', transform: `scaleX(${progress / 100})` }}
      />

      <style>{`@keyframes pageIntroRise { to { transform: translateY(0); } } @keyframes pageIntroFade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default PageIntro;
