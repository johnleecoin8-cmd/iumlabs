import { useState, useEffect, useCallback, useRef } from 'react';

interface PageIntroProps {
  onComplete: () => void;
}

const MIN_DISPLAY_TIME = 1500;
const MAX_LOAD_TIME = 12000;
const IMG_POLL_INTERVAL = 300;

const PageIntro = ({ onComplete }: PageIntroProps) => {
  const [phase, setPhase] = useState<'loading' | 'whiteout' | 'done'>('loading');
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(() => Date.now());
  const realProgress = useRef(0);
  const displayProgress = useRef(0);
  const rafRef = useRef<number | null>(null);

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
    let totalTasks = 0;
    let completedTasks = 0;
    let pollTimer: ReturnType<typeof setInterval> | null = null;

    const updateReal = () => {
      if (totalTasks === 0) return;
      realProgress.current = Math.min((completedTasks / totalTasks) * 100, 100);
    };

    const markDone = () => {
      completedTasks++;
      updateReal();
    };

    // 1. Fonts
    totalTasks++;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(markDone);
    } else {
      markDone();
    }

    // 2. Hero video
    totalTasks++;
    const video = document.createElement('video');
    video.src = '/videos/hero-background.mp4#t=0.001';
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.load();
    const onVideoReady = () => { markDone(); };
    video.addEventListener('canplaythrough', onVideoReady, { once: true });
    video.addEventListener('loadeddata', onVideoReady, { once: true });
    // Video timeout — don't block forever
    const videoTimeout = setTimeout(() => {
      if (completedTasks < totalTasks) markDone();
    }, 5000);

    // 3. Poll for ALL images on the page (including lazy-loaded ones from Suspense)
    const trackedImages = new Set<HTMLImageElement>();

    const pollImages = () => {
      const allImages = document.querySelectorAll('img[src]');
      allImages.forEach((el) => {
        const img = el as HTMLImageElement;
        if (trackedImages.has(img)) return;
        if (!img.src || img.src.startsWith('data:')) return;

        trackedImages.add(img);
        totalTasks++;

        if (img.complete && img.naturalWidth > 0) {
          markDone();
        } else {
          img.addEventListener('load', markDone, { once: true });
          img.addEventListener('error', markDone, { once: true });
        }
        updateReal();
      });
    };

    // Start polling after React renders
    const startPoll = setTimeout(() => {
      pollImages();
      pollTimer = setInterval(pollImages, IMG_POLL_INTERVAL);
    }, 200);

    // Stop polling after a while (all lazy components should be loaded by then)
    const stopPoll = setTimeout(() => {
      if (pollTimer) clearInterval(pollTimer);
      pollImages(); // one final check
    }, 6000);

    // Max timeout fallback
    const maxTimer = setTimeout(() => {
      realProgress.current = 100;
    }, MAX_LOAD_TIME);

    return () => {
      video.removeEventListener('canplaythrough', onVideoReady);
      video.removeEventListener('loadeddata', onVideoReady);
      video.pause();
      video.src = '';
      clearTimeout(videoTimeout);
      clearTimeout(startPoll);
      clearTimeout(stopPoll);
      clearTimeout(maxTimer);
      if (pollTimer) clearInterval(pollTimer);
    };
  }, []);

  // Smooth display counter
  useEffect(() => {
    const animate = () => {
      const target = realProgress.current;
      const current = displayProgress.current;

      if (current < target) {
        const gap = target - current;
        const speed = gap > 30 ? 3 : gap > 10 ? 1.5 : 0.6;
        displayProgress.current = Math.min(current + speed, 100);
        setProgress(Math.floor(displayProgress.current));
      } else if (target < 100) {
        const slowdown = current > 85 ? 0.03 : current > 70 ? 0.08 : 0.15;
        displayProgress.current = Math.min(current + slowdown, 99);
        setProgress(Math.floor(displayProgress.current));
      }

      if (displayProgress.current >= 100) {
        setProgress(100);
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
