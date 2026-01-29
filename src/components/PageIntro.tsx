import { useState, useEffect, useCallback } from 'react';
import logo from '@/assets/logo.png';

interface PageIntroProps {
  onComplete: () => void;
}

const MIN_DISPLAY_TIME = 2000; // Minimum 2 seconds

const PageIntro = ({ onComplete }: PageIntroProps) => {
  const [phase, setPhase] = useState<'logo' | 'expand' | 'done'>('logo');
  const [startTime] = useState(() => Date.now());

  const handleComplete = useCallback(() => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);
    
    setTimeout(() => {
      setPhase('expand');
      
      // After expand animation, mark as done
      setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 600);
    }, remaining);
  }, [startTime, onComplete]);

  useEffect(() => {
    // Preload the hero video
    const video = document.createElement('video');
    video.src = '/videos/hero-background.mp4#t=0.001';
    video.preload = 'metadata';
    
    const handleVideoReady = () => {
      handleComplete();
    };

    video.addEventListener('loadedmetadata', handleVideoReady);
    video.addEventListener('canplay', handleVideoReady);
    
    // Fallback: complete after max time regardless
    const maxTimer = setTimeout(() => {
      handleComplete();
    }, 3500);

    return () => {
      video.removeEventListener('loadedmetadata', handleVideoReady);
      video.removeEventListener('canplay', handleVideoReady);
      clearTimeout(maxTimer);
    };
  }, [handleComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[10002] flex items-center justify-center bg-background transition-all duration-700 ${
        phase === 'expand' ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Primary glow - center */}
      <div 
        className={`absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full blur-[120px] sm:blur-[150px] animate-glow-breathe ${
          phase === 'logo' ? 'opacity-50' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.5) 40%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Secondary glow - ambient */}
      <div 
        className={`absolute w-[800px] h-[800px] sm:w-[1000px] sm:h-[1000px] rounded-full blur-[200px] transition-opacity duration-700 ${
          phase === 'logo' ? 'opacity-20' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, hsl(217 91% 60% / 0.3) 0%, transparent 60%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Logo animation */}
      <div className="relative z-10">
        <div 
          className={`flex flex-col items-center transition-all duration-600 ${
            phase === 'logo' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
          }`}
        >
          {/* Brand logo - larger with glow */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-8 animate-intro-scale-in">
            <img 
              src={logo} 
              alt="ium Labs" 
              className="w-full h-full object-contain brightness-0 invert animate-intro-pulse drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            />
          </div>
          
          {/* Brand name with staggered animation - larger */}
          <div className="flex gap-1 text-4xl sm:text-5xl font-bold tracking-tight">
            {'ium Labs'.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block animate-letter-pop"
                style={{ animationDelay: `${400 + i * 60}ms` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
          
          {/* Tagline - enhanced */}
          <p className="text-muted-foreground text-base sm:text-lg mt-4 animate-fade-up tracking-wide">
            Web3 Marketing Agency
          </p>
        </div>
      </div>

      {/* Loading bar - refined */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-40 sm:w-56">
        <div className="h-[2px] bg-border/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary via-primary to-primary/60 rounded-full animate-loading-bar"
          />
        </div>
      </div>
    </div>
  );
};

export default PageIntro;
