import { useState, useEffect, useCallback, useRef } from 'react';
import introBridge from '@/assets/intro/intro-bridge.png';

interface PageIntroProps {
  onComplete: () => void;
}

const MIN_DISPLAY_TIME = 2500;

const PageIntro = ({ onComplete }: PageIntroProps) => {
  const [phase, setPhase] = useState<'loading' | 'expand' | 'done'>('loading');
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(() => Date.now());
  const videoLoaded = useRef(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const handleComplete = useCallback(() => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);
    
    setTimeout(() => {
      setPhase('expand');
      setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 600);
    }, remaining);
  }, [startTime, onComplete]);

  // Progress counter animation - waits at 95% until video is ready
  useEffect(() => {
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        // If not loaded, slow crawl up to 95% max
        if (!videoLoaded.current) {
          const next = prev + 1.5;
          return next >= 95 ? 95 : next; // Cap at 95% until video ready
        }
        
        // Video loaded - sprint to 100%
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
    video.src = '/videos/hero-background.mp4#t=0.001';
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

  // Calculate clipPath for center-outward reveal
  const revealPercent = Math.max(0, 50 - progress / 2);

  return (
    <div
      className={`fixed inset-0 z-[10002] flex items-center justify-center bg-background transition-all duration-700 ${
        phase === 'expand' ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Bridge logo with center-outward reveal + overlaid counter */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        {/* Subtle glow behind */}
        <div 
          className="absolute inset-0 blur-[60px] opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(var(--foreground)) 0%, transparent 70%)',
          }}
        />
        
        {/* Bridge logo with clipPath reveal */}
        <div 
          className="absolute inset-0 transition-[clip-path] duration-100 ease-linear"
          style={{ 
            clipPath: `inset(0 ${revealPercent}% 0 ${revealPercent}%)` 
          }}
        >
          <img 
            src={introBridge} 
            alt="Ium Labs Bridge" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Centered 3-digit counter overlaid on logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground tabular-nums"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {String(Math.floor(progress)).padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageIntro;
