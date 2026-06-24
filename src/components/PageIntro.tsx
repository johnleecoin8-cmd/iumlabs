import { useState, useEffect, useCallback, useRef } from 'react';
import { appendVersion, hdVariant } from '@/hooks/useVideoPlayer';
import heroImage from '@/assets/images/hero-background.jpg.asset.json';

interface PageIntroProps {
  onComplete: () => void;
}

const MIN_DISPLAY_TIME = 600;
const MAX_LOAD_TIME = 3500; // hard cap: reveal after 3.5s even if videos still buffering
const VIDEO_POLL_INTERVAL = 200;

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
      }, 750);
    }, remaining);
  }, [startTime, onComplete]);

  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { fontsReady.current = true; });
    } else {
      fontsReady.current = true;
    }

    // The intro should not lift until the page's top assets are actually loaded.
    // The Why-Choose / Selected-Work clips are lazy, so at intro time only the
    // about section video has begun loading — we proactively prefetch the rest
    // into HTTP cache here. Gate the reveal on the hero image and the
    // about-background video finishing, and warm the Selected-Work gallery clips
    // in the background so they're cached by the time the user scrolls down.
    // MAX_LOAD_TIME is the hard ceiling either way.
    // Match the exact versioned URL the <video> element requests, so the prefetch
    // warms the same cache entry (no double download).
    // Desktop (>=1024) plays the high-quality -hd variant for project clips.
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const hq = (u: string) => (isDesktop ? hdVariant(u) : u);
    const GATED = [
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = heroImage.url;
      }),
      appendVersion(hq('/videos/about-background.mp4?v=3')),
    ];
    const WARM = [
      '/videos/projects/bnb-hero.mp4', '/videos/projects/aptos-hero.mp4',
      '/videos/projects/bybit-hero.mp4', '/videos/projects/sahara-hero.mp4',
      '/videos/projects/kite-hero.mp4', '/videos/projects/mantra-hero.mp4',
    ].map(hq);

    WARM.forEach((u) => {
      fetch(u, { cache: 'force-cache' }).catch(() => {});
    });

    let remaining = GATED.length;
    const markIfDone = () => {
      remaining -= 1;
      if (remaining <= 0) videoReady.current = true;
    };
    GATED.forEach((u) => {
      if (typeof u === 'string') {
        fetch(u, { cache: 'force-cache' })
          .then((r) => r.blob())
          .catch(() => {})
          .finally(markIfDone);
      } else {
        u.finally(markIfDone);
      }
    });

    // Nudge any mounted <video> into muted autoplay so the hero paints promptly.
    const nudge = setInterval(() => {
      document.querySelectorAll('video').forEach((v) => {
        v.muted = true;
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      });
    }, VIDEO_POLL_INTERVAL);

    const maxTimer = setTimeout(() => {
      videoReady.current = true;
    }, MAX_LOAD_TIME);

    return () => {
      clearInterval(nudge);
      clearTimeout(maxTimer);
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

  const WORD = 'ium Labs';
  const lift = phase === 'fadeout';

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[10002] grid place-items-center bg-[#0A0A0A]"
      style={{
        transform: lift ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 700ms cubic-bezier(.76,0,.24,1)',
      }}
    >
      {/* brand accent frame */}
      <span
        className="pointer-events-none fixed inset-[14px] border"
        style={{ borderColor: 'hsl(var(--brand) / 0.4)' }}
      />

      {/* corner meta */}
      <div className="fixed top-6 left-7 font-mono text-[11px] uppercase tracking-[0.15em] text-white/90">
        ium&nbsp;Labs®
      </div>
      <div className="fixed top-6 right-7 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
        Korea Crypto GTM
      </div>

      {/* wordmark — letters rise from behind a mask */}
      <div className="flex overflow-hidden" style={{ paddingBottom: '0.12em' }}>
        {WORD.split('').map((ch, i) =>
          ch === ' ' ? (
            <span key={i} style={{ width: '0.32em' }} />
          ) : (
            <span
              key={i}
              className="inline-block font-display font-extrabold text-white"
              style={{
                fontSize: 'clamp(44px, 11vw, 128px)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                transform: 'translateY(110%)',
                animation: 'pageIntroRise .9s cubic-bezier(.22,1,.36,1) forwards',
                animationDelay: `${0.05 + i * 0.05}s`,
              }}
            >
              {ch}
            </span>
          )
        )}
      </div>

      {/* counter */}
      <div
        className="fixed right-7 bottom-6 font-mono text-xs text-white/45"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {String(progress).padStart(3, '0')}
      </div>

      {/* label */}
      <div className="fixed left-7 bottom-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
        Loading experience
      </div>

      {/* progress line */}
      <div
        className="fixed left-0 bottom-0 h-[2px] w-full origin-left"
        style={{ background: 'hsl(var(--brand))', transform: `scaleX(${progress / 100})` }}
      />

      <style>{`@keyframes pageIntroRise { to { transform: translateY(0); } }`}</style>
    </div>
  );
};

export default PageIntro;
