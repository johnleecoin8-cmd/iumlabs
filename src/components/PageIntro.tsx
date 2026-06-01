import { useState, useEffect, useCallback, useRef } from 'react';

interface PageIntroProps {
  onComplete: () => void;
}

const MIN_DISPLAY_TIME = 1200;
const MAX_LOAD_TIME = 12000;
const VIDEO_POLL_INTERVAL = 200;

const PageIntro = ({ onComplete }: PageIntroProps) => {
  const [phase, setPhase] = useState<'loading' | 'whiteout' | 'done'>('loading');
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
      setPhase('whiteout');
      setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 500);
    }, remaining);
  }, [startTime, onComplete]);

  useEffect(() => {
    // Track fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { fontsReady.current = true; });
    } else {
      fontsReady.current = true;
    }

    // Poll for the ACTUAL hero video element rendered by HeroSection
    let videoEl: HTMLVideoElement | null = null;

    const onPlaying = () => {
      videoReady.current = true;
    };

    const tryPlay = (v: HTMLVideoElement) => {
      v.muted = true;
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    const pollForVideo = setInterval(() => {
      if (videoEl) return;
      const el = document.querySelector('video[src*="hero-background"], video source[src*="hero-background"]');
      if (!el) return;

      videoEl = el.tagName === 'SOURCE' ? el.parentElement as HTMLVideoElement : el as HTMLVideoElement;
      if (!videoEl) return;

      // Force play attempt while intro is still on top
      tryPlay(videoEl);

      // Mark ready only once video is actually playing (frame visible)
      if (!videoEl.paused && videoEl.currentTime > 0) {
        videoReady.current = true;
        clearInterval(pollForVideo);
        return;
      }

      videoEl.addEventListener('playing', onPlaying, { once: true });
      videoEl.addEventListener('timeupdate', onPlaying, { once: true });
      clearInterval(pollForVideo);
    }, VIDEO_POLL_INTERVAL);

    // Max timeout — never block forever
    const maxTimer = setTimeout(() => {
      videoReady.current = true;
    }, MAX_LOAD_TIME);

    return () => {
      clearInterval(pollForVideo);
      clearTimeout(maxTimer);
      if (videoEl) {
        videoEl.removeEventListener('playing', onPlaying);
        videoEl.removeEventListener('timeupdate', onPlaying);
      }
    };
  }, []);

  // Smooth progress animation tied to real loading state
  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const current = displayProgress.current;

      let target: number;

      if (videoReady.current && fontsReady.current) {
        target = 100;
      } else if (videoReady.current || fontsReady.current) {
        // One major task done — cap at 90, creep slowly
        target = Math.min(90, 30 + elapsed * 0.012);
      } else {
        // Nothing done yet — creep to ~60 based on time
        target = Math.min(60, elapsed * 0.015);
      }

      if (current < target) {
        const gap = target - current;
        const speed = gap > 30 ? 2.5 : gap > 10 ? 1.2 : 0.5;
        displayProgress.current = Math.min(current + speed, 100);
      }

      setProgress(Math.floor(displayProgress.current));

      if (displayProgress.current >= 100) {
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startTime]);

  useEffect(() => {
    if (progress >= 100) {
      handleComplete();
    }
  }, [progress, handleComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[10002] flex items-center justify-center bg-background">
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-700 ${
          phase === 'whiteout' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className={`relative z-10 flex flex-col items-center transition-opacity duration-500 ${
        phase === 'whiteout' ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="mb-8">
          <span
            className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-foreground tabular-nums"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {String(Math.floor(progress)).padStart(3, '0')}
          </span>
        </div>
        <div className="w-48 sm:w-64 md:w-80 h-[2px] bg-border/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageIntro;
