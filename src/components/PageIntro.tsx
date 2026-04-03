import { useState, useEffect, useCallback, useRef } from 'react';

interface PageIntroProps {
  onComplete: () => void;
}

const MIN_DISPLAY_TIME = 2000;
const MAX_LOAD_TIME = 8000;

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
      }, 800);
    }, remaining);
  }, [startTime, onComplete]);

  // Track real loading progress from multiple sources
  useEffect(() => {
    let loadedCount = 0;
    const totalTasks = 4; // video, fonts, images, DOM

    const updateReal = () => {
      realProgress.current = Math.min((loadedCount / totalTasks) * 100, 100);
    };

    // 1. Hero video preload
    const video = document.createElement('video');
    video.src = '/videos/hero-background.mp4#t=0.001';
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.load();

    const onVideoReady = () => {
      loadedCount++;
      updateReal();
    };
    video.addEventListener('canplaythrough', onVideoReady, { once: true });
    video.addEventListener('loadeddata', onVideoReady, { once: true });

    // 2. Fonts ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        loadedCount++;
        updateReal();
      });
    } else {
      loadedCount++;
      updateReal();
    }

    // 3. Critical images (hero poster, logo)
    const criticalImages = ['/images/hero-poster.jpg'];
    let imgDone = false;
    const checkImg = () => {
      if (imgDone) return;
      imgDone = true;
      loadedCount++;
      updateReal();
    };
    const img = new Image();
    img.onload = checkImg;
    img.onerror = checkImg;
    img.src = criticalImages[0];

    // 4. DOM content loaded
    if (document.readyState === 'complete') {
      loadedCount++;
      updateReal();
    } else {
      window.addEventListener('load', () => {
        loadedCount++;
        updateReal();
      }, { once: true });
    }

    // Max timeout fallback
    const maxTimer = setTimeout(() => {
      realProgress.current = 100;
    }, MAX_LOAD_TIME);

    return () => {
      video.removeEventListener('canplaythrough', onVideoReady);
      video.removeEventListener('loadeddata', onVideoReady);
      video.pause();
      video.src = '';
      clearTimeout(maxTimer);
    };
  }, []);

  // Smooth display counter that chases real progress
  useEffect(() => {
    const animate = () => {
      const target = realProgress.current;
      const current = displayProgress.current;

      if (current < target) {
        const gap = target - current;
        const speed = gap > 20 ? 2.5 : gap > 5 ? 1.2 : 0.5;
        displayProgress.current = Math.min(current + speed, 100);
        setProgress(Math.floor(displayProgress.current));
      } else if (target < 100) {
        // Slow steady climb until everything loads — never stops
        const slowdown = current > 80 ? 0.05 : current > 60 ? 0.1 : 0.2;
        displayProgress.current = Math.min(current + slowdown, 99.5);
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

  // When progress hits 100, trigger completion
  useEffect(() => {
    if (progress >= 100) {
      handleComplete();
    }
  }, [progress, handleComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[10002] flex items-center justify-center bg-background">
      {/* White overlay that expands on complete */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-700 ${
          phase === 'whiteout' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Content - fades out during whiteout */}
      <div className={`relative z-10 flex flex-col items-center transition-opacity duration-500 ${
        phase === 'whiteout' ? 'opacity-0' : 'opacity-100'
      }`}>
        {/* Counter */}
        <div className="mb-8">
          <span
            className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-foreground tabular-nums"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {String(Math.floor(progress)).padStart(3, '0')}
          </span>
        </div>

        {/* Progress bar */}
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
