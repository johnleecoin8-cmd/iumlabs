import { useState, useEffect, useCallback, useRef } from 'react';
import { appendVersion, hdVariant } from '@/hooks/useVideoPlayer';
import heroVideo from '@/assets/videos/hero-background.mp4.asset.json';

interface PageIntroProps {
  onComplete: () => void;
}

const MIN_DISPLAY_TIME = 600;
const MAX_LOAD_TIME = 3500; // hard cap: reveal after 3.5s even if videos still buffering
const VIDEO_POLL_INTERVAL = 200;

const PageIntro = ({ onComplete }: PageIntroProps) => {
  const [phase, setPhase] = useState<'loading' | 'fadeout' | 'done'>('loading');
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(() => Date.now());
  const displayProgress = useRef(0);
  const rafRef = useRef<number | null>(null);
  const videoReady = useRef(false);
  const fontsReady = useRef(false);

  const handleComplete = useCallback(() => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);

    setTimeout(() => {
      setPhase('fadeout');
      setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 500);
    }, remaining);
  }, [startTime, onComplete]);

  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { fontsReady.current = true; });
    } else {
      fontsReady.current = true;
    }

    // The intro should not lift until the page's top videos are actually loaded.
    // The Why-Choose / Selected-Work clips are lazy, so at intro time only the hero
    // has begun loading — we proactively prefetch the rest into HTTP cache here.
    // Gate the reveal on the two full-bleed loops (hero + Why-Choose) finishing,
    // and warm the Selected-Work gallery clips in the background so they're cached
    // by the time the user scrolls down. MAX_LOAD_TIME is the hard ceiling either way.
    // Match the exact versioned URL the <video> element requests, so the prefetch
    // warms the same cache entry (no double download).
    // Desktop (>=1024) plays the high-quality -hd variant for project clips.
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const hq = (u: string) => (isDesktop ? hdVariant(u) : u);
    const GATED = [
      appendVersion(heroVideo.url),
      appendVersion(hq('/videos/about-background.mp4?v=3')),
    ];
    const WARM = [
      '/videos/projects/bnb-hero.mp4', '/videos/projects/aptos-hero.mp4',
      '/videos/projects/bybit-hero.mp4', '/videos/projects/sahara-hero.mp4',
      '/videos/projects/kite-hero.mp4', '/videos/projects/mantra-hero.mp4',
    ].map(hq);

    WARM.forEach((u) => {
      fetch(u, { cache: 'force-cache' }).catch(() => {});
    });

    let remaining = GATED.length;
    const markIfDone = () => {
      remaining -= 1;
      if (remaining <= 0) videoReady.current = true;
    };
    GATED.forEach((u) => {
      fetch(u, { cache: 'force-cache' })
        .then((r) => r.blob())
        .catch(() => {})
        .finally(markIfDone);
    });

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

      if (videoReady.current && fontsReady.current) {
        target = 100;
      } else if (videoReady.current || fontsReady.current) {
        target = Math.min(90, 30 + elapsed * 0.012);
      } else {
        target = Math.min(60, elapsed * 0.015);
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

  return (
    <div
      className={`fixed inset-0 z-[10002] flex items-center justify-center bg-[#0A0A0A] transition-opacity duration-500 ${
        phase === 'fadeout' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className={`flex flex-col items-center transition-all duration-400 ${
        phase === 'fadeout' ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        <span
          className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-white tabular-nums"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(progress).padStart(3, '0')}
        </span>
        <div className="w-48 sm:w-64 h-[1px] bg-white/10 mt-6 overflow-hidden">
          <div
            className="h-full bg-white/60 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageIntro;
