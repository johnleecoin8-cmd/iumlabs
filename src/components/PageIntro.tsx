import { useState, useEffect, useCallback, useRef } from 'react';

interface PageIntroProps {
  onComplete: () => void;
}

const MIN_DISPLAY_TIME = 2500;

const PageIntro = ({ onComplete }: PageIntroProps) => {
  const [phase, setPhase] = useState<'loading' | 'whiteout' | 'done'>('loading');
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(() => Date.now());
  const videoLoaded = useRef(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

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

  // Progress counter animation
  useEffect(() => {
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (!videoLoaded.current) {
          const next = prev + 1.5;
          return next >= 95 ? 95 : next;
        }
        
        const next = prev + 10;
        if (next >= 100) {
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }
          return 100;
        }
        return next;
      });
    }, 50);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // When progress hits 100, trigger completion
  useEffect(() => {
    if (progress >= 100) {
      handleComplete();
    }
  }, [progress, handleComplete]);

  // Preload hero video
  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/videos/hero-background.mp4?v=2#t=0.001';
    video.preload = 'metadata';
    
    const handleVideoReady = () => {
      videoLoaded.current = true;
    };

    video.addEventListener('loadedmetadata', handleVideoReady);
    video.addEventListener('canplay', handleVideoReady);
    
    const maxTimer = setTimeout(() => {
      videoLoaded.current = true;
    }, 4000);

    return () => {
      video.removeEventListener('loadedmetadata', handleVideoReady);
      video.removeEventListener('canplay', handleVideoReady);
      clearTimeout(maxTimer);
    };
  }, []);

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
            className="h-full bg-foreground rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageIntro;
