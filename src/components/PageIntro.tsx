import { useState, useEffect, useCallback, useRef } from 'react';

interface PageIntroProps {
  onComplete: () => void;
}

const MIN_DISPLAY_TIME = 800;
const MAX_LOAD_TIME = 3000;

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
      }, 400);
    }, remaining);
  }, [startTime, onComplete]);

  // Track real loading progress — wait for ALL page images
  useEffect(() => {
    let loadedCount = 0;
    let totalTasks = 1; // fonts only

    const updateReal = () => {
      realProgress.current = Math.min((loadedCount / totalTasks) * 100, 100);
    };

    // 1. Fonts ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        loadedCount++;
        updateReal();
      });
    } else {
      loadedCount++;
      updateReal();
    }

    // 2. Wait for visible images (eager only, skip lazy)
    const waitForAllImages = () => {
      const eagerImages = document.querySelectorAll('img[loading="eager"]');
      const pendingImages = Array.from(eagerImages).filter(img => !(img as HTMLImageElement).complete);

      if (pendingImages.length === 0) {
        realProgress.current = 100;
        return;
      }

      totalTasks = 1 + pendingImages.length;
      let imgLoadedCount = 0;

      pendingImages.forEach((img) => {
        const onDone = () => {
          imgLoadedCount++;
          loadedCount++;
          updateReal();
        };
        img.addEventListener('load', onDone, { once: true });
        img.addEventListener('error', onDone, { once: true });
      });
    };

    // Wait a tick for React to render images to DOM
    const imgTimer = setTimeout(waitForAllImages, 500);

    // Max timeout fallback
    const maxTimer = setTimeout(() => {
      realProgress.current = 100;
    }, MAX_LOAD_TIME);

    return () => {
      clearTimeout(maxTimer);
      clearTimeout(imgTimer);
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
