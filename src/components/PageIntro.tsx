import { useState, useEffect } from 'react';
import { brand, intro } from '@/config/content';

interface PageIntroProps {
  onComplete: () => void;
}

const PageIntro = ({ onComplete }: PageIntroProps) => {
  const [phase, setPhase] = useState<'logo' | 'expand' | 'done'>('logo');

  useEffect(() => {
    // Logo animation phase
    const logoTimer = setTimeout(() => {
      setPhase('expand');
    }, 1200);

    // Expand and fade out phase
    const expandTimer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(expandTimer);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[10002] flex items-center justify-center bg-background transition-all duration-700 ${
        phase === 'expand' ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-1000 ${
            phase === 'logo' ? 'opacity-60 scale-100' : 'opacity-0 scale-150'
          }`}
          style={{
            background: 'radial-gradient(circle, hsl(var(--gradient-purple)) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className={`absolute w-[400px] h-[400px] rounded-full blur-[100px] transition-all duration-1000 delay-100 ${
            phase === 'logo' ? 'opacity-40 scale-100' : 'opacity-0 scale-150'
          }`}
          style={{
            background: 'radial-gradient(circle, hsl(var(--gradient-pink)) 0%, transparent 70%)',
            top: '40%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Logo/Text animation */}
      <div className="relative z-10">
        <div 
          className={`flex flex-col items-center transition-all duration-500 ${
            phase === 'logo' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          {/* Animated logo lines */}
          <div className="relative w-20 h-20 mb-6">
            <svg viewBox="0 0 80 80" className="w-full h-full">
              {/* Animated circle */}
              <circle
                cx="40"
                cy="40"
                r="35"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="220"
                strokeDashoffset="220"
                className="animate-draw-circle"
              />
              {/* Inner elements */}
              <path
                d="M30 40 L40 50 L55 30"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="50"
                strokeDashoffset="50"
                className="animate-draw-check"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--gradient-purple))" />
                  <stop offset="50%" stopColor="hsl(var(--gradient-pink))" />
                  <stop offset="100%" stopColor="hsl(var(--gradient-orange))" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Brand text with stagger */}
          <div className="flex gap-1 text-3xl font-bold">
            {brand.name.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block animate-letter-pop"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {char}
              </span>
            ))}
          </div>
          
          {/* Tagline */}
          <p className="text-muted-foreground mt-2 animate-fade-up delay-500">
            {intro.tagline}
          </p>
        </div>
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48">
        <div className="h-0.5 bg-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-loading-bar"
          />
        </div>
      </div>
    </div>
  );
};

export default PageIntro;
