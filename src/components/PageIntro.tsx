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
      className={`fixed inset-0 z-[10002] flex items-center justify-center bg-background transition-all duration-500 ${
        phase === 'expand' ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute w-[500px] h-[500px] rounded-full blur-[150px] transition-all duration-700 ${
            phase === 'logo' ? 'opacity-30' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Logo animation */}
      <div className="relative z-10">
        <div 
          className={`flex flex-col items-center transition-all duration-500 ${
            phase === 'logo' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          {/* Brand logo */}
          <div className="relative w-20 h-20 mb-6">
            <img 
              src={logo} 
              alt="ium Labs" 
              className="w-full h-full object-contain brightness-0 invert animate-intro-pulse"
            />
          </div>
          
          {/* Brand name with staggered animation */}
          <div className="flex gap-0.5 text-3xl font-bold tracking-tight">
            {'ium Labs'.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block animate-letter-pop"
                style={{ animationDelay: `${300 + i * 50}ms` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
          
          {/* Tagline */}
          <p className="text-muted-foreground text-sm mt-3 animate-fade-up">
            Web3 Marketing Agency
          </p>
        </div>
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48">
        <div className="h-0.5 bg-border/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full animate-loading-bar"
          />
        </div>
      </div>
    </div>
  );
};

export default PageIntro;
