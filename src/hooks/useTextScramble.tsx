import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTextScrambleOptions {
  speed?: number;
  tick?: number;
  step?: number;
  scrambleOnHover?: boolean;
}

const chars = '!<>-_\\/[]{}—=+*^?#________';

export const useTextScramble = (
  finalText: string,
  options: UseTextScrambleOptions = {}
) => {
  const { speed = 30, tick = 1, step = 1, scrambleOnHover = false } = options;
  const [displayText, setDisplayText] = useState(scrambleOnHover ? finalText : '');
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef(0);
  const resolveRef = useRef<(() => void) | null>(null);
  const queueRef = useRef<Array<{ from: string; to: string; start: number; end: number; char?: string }>>([]);

  const randomChar = useCallback(() => {
    return chars[Math.floor(Math.random() * chars.length)];
  }, []);

  const scramble = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const oldText = scrambleOnHover ? finalText : '';
    const newText = finalText;
    const length = Math.max(oldText.length, newText.length);
    
    queueRef.current = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queueRef.current.push({ from, to, start, end });
    }
    
    cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    
    const update = () => {
      let output = '';
      let complete = 0;
      
      for (let i = 0; i < queueRef.current.length; i++) {
        let { from, to, start, end, char } = queueRef.current[i];
        
        if (frameRef.current >= end) {
          complete++;
          output += to;
        } else if (frameRef.current >= start) {
          if (!char || Math.random() < 0.28) {
            char = randomChar();
            queueRef.current[i].char = char;
          }
          output += `<span class="text-primary/60">${char}</span>`;
        } else {
          output += from;
        }
      }
      
      setDisplayText(output);
      
      if (complete === queueRef.current.length) {
        setIsAnimating(false);
        setDisplayText(finalText);
        resolveRef.current?.();
      } else {
        frameRef.current += step;
        requestAnimationFrame(update);
      }
    };
    
    update();
  }, [finalText, isAnimating, randomChar, scrambleOnHover, step]);

  const triggerScramble = useCallback(() => {
    scramble();
  }, [scramble]);

  // Auto-start on mount if not hover-based
  useEffect(() => {
    if (!scrambleOnHover) {
      const timeout = setTimeout(() => {
        scramble();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [scrambleOnHover, scramble]);

  return { displayText, isAnimating, triggerScramble };
};

export default useTextScramble;
