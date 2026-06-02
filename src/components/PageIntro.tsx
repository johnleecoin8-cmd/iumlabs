import { useState, useEffect, useCallback, useRef } from 'react';

interface PageIntroProps {
  onComplete: () => void;
}

const MIN_DISPLAY_TIME = 1800;
const MAX_LOAD_TIME = 12000;
const VIDEO_POLL_INTERVAL = 200;

const Starburst = ({ progress }: { progress: number }) => {
  const rays = 8;
  const size = 60;
  const center = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="animate-starburst-spin"
    >
      {Array.from({ length: rays }).map((_, i) => {
        const angle = (i * 360) / rays;
        const innerR = 4;
        const outerR = center - 4;
        const rad = (angle * Math.PI) / 180;
        const x1 = center + innerR * Math.cos(rad);
        const y1 = center + innerR * Math.sin(rad);
        const x2 = center + outerR * Math.cos(rad);
        const y2 = center + outerR * Math.sin(rad);

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="white"
            strokeWidth={i % 2 === 0 ? 1.5 : 1}
            strokeLinecap="round"
            style={{
              opacity: 0.4 + (progress / 100) * 0.6,
              transition: 'opacity 0.3s ease',
            }}
          />
        );
      })}
    </svg>
  );
};

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
      }, 600);
    }, remaining);
  }, [startTime, onComplete]);

  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { fontsReady.current = true; });
    } else {
      fontsReady.current = true;
    }

    let videoEl: HTMLVideoElement | null = null;

    const onPlaying = () => { videoReady.current = true; };

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

      tryPlay(videoEl);

      if (!videoEl.paused && videoEl.currentTime > 0) {
        videoReady.current = true;
        clearInterval(pollForVideo);
        return;
      }

      videoEl.addEventListener('playing', onPlaying, { once: true });
      videoEl.addEventListener('timeupdate', onPlaying, { once: true });
      clearInterval(pollForVideo);
    }, VIDEO_POLL_INTERVAL);

    const maxTimer = setTimeout(() => { videoReady.current = true; }, MAX_LOAD_TIME);

    return () => {
      clearInterval(pollForVideo);
      clearTimeout(maxTimer);
      if (videoEl) {
        videoEl.removeEventListener('playing', onPlaying);
        videoEl.removeEventListener('timeupdate', onPlaying);
      }
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
      className={`fixed inset-0 z-[10002] flex items-center justify-center bg-[#0A0A0A] transition-opacity duration-600 ${
        phase === 'fadeout' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className={`flex flex-col items-center gap-6 transition-all duration-500 ${
        phase === 'fadeout' ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        <Starburst progress={progress} />
        <p className="text-[13px] sm:text-sm text-white/60 font-medium tracking-wide">
          ium Labs
        </p>
      </div>
    </div>
  );
};

export default PageIntro;
