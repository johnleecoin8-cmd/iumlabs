import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
  autoStart?: boolean;
  delay?: number;
}

const chars = '!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const ScrambleText = ({ 
  text, 
  className = '', 
  scrambleOnHover = false,
  autoStart = true,
  delay = 0
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(scrambleOnHover ? text : '');
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef(0);
  const queueRef = useRef<Array<{ from: string; to: string; start: number; end: number; char?: string }>>([]);

  const randomChar = useCallback(() => {
    return chars[Math.floor(Math.random() * chars.length)];
  }, []);

  const scramble = useCallback((fromText: string = '') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const oldText = fromText;
    const newText = text;
    const length = Math.max(oldText.length, newText.length);
    
    queueRef.current = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queueRef.current.push({ from, to, start, end });
    }
    
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
          output += char;
        } else {
          output += from;
        }
      }
      
      setDisplayText(output);
      
      if (complete === queueRef.current.length) {
        setIsAnimating(false);
        setDisplayText(text);
      } else {
        frameRef.current++;
        requestAnimationFrame(update);
      }
    };
    
    update();
  }, [text, isAnimating, randomChar]);

  // Auto-start on mount
  useEffect(() => {
    if (autoStart && !scrambleOnHover) {
      const timeout = setTimeout(() => {
        scramble('');
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [autoStart, scrambleOnHover, delay, scramble]);

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      scramble(text);
    }
  };

  return (
    <span 
      className={`${className} ${scrambleOnHover ? 'cursor-pointer' : ''}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;
