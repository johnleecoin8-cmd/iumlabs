import { useState, useEffect, useCallback, useRef } from 'react';
import logo from '@/assets/logo.png';

interface PageIntroProps {
  onComplete: () => void;
}

const MIN_DISPLAY_TIME = 2500; // Minimum 2.5 seconds

const PageIntro = ({ onComplete }: PageIntroProps) => {
  const [phase, setPhase] = useState<'loading' | 'logo' | 'expand' | 'done'>('loading');
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(() => Date.now());
  const videoLoaded = useRef(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const handleComplete = useCallback(() => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);
    
    setTimeout(() => {
      // Show logo phase
      setPhase('logo');
      
      // After logo animation, expand and complete
      setTimeout(() => {
        setPhase('expand');
        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, 600);
      }, 800);
    }, remaining);
  }, [startTime, onComplete]);

  // Progress counter animation
  useEffect(() => {
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        // Speed up or slow down based on video loading
        const increment = videoLoaded.current ? 8 : 2;
        const next = prev + increment;
        
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
    
    // Fallback: force complete after max time
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
    <div
      className={`fixed inset-0 z-[10002] flex items-center justify-center bg-background transition-all duration-700 ${
        phase === 'expand' ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Loading phase - progress bar centered */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          phase === 'loading' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Center progress bar */}
        <div className="w-48 sm:w-64">
          <div className="h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom left counter */}
        <div className="absolute bottom-12 sm:bottom-16 left-8 sm:left-12">
          <span 
            className="text-6xl sm:text-8xl font-bold tracking-tighter text-white tabular-nums"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {String(Math.floor(progress)).padStart(2, '0')}
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-white/60 ml-1">%</span>
        </div>
      </div>

      {/* Logo phase - bridge logo appears */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
          phase === 'logo' || phase === 'expand' 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-75 pointer-events-none'
        }`}
      >
        {/* Glow effect behind logo */}
        <div 
          className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full blur-[100px] opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          }}
        />
        
        {/* Bridge logo */}
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 animate-intro-scale-in">
          <img 
            src={logo} 
            alt="ium Labs" 
            className="w-full h-full object-contain brightness-0 invert drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          />
        </div>
      </div>
    </div>
  );
};

export default PageIntro;
