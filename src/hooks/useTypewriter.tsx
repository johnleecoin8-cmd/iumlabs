import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

export const useTypewriter = (
  text: string,
  options: UseTypewriterOptions = {}
) => {
  const { speed = 50, delay = 0, cursor = true, onComplete } = options;
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(cursor);

  const startTyping = useCallback(() => {
    setIsTyping(true);
    setDisplayText('');
    
    let currentIndex = 0;
    
    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeNextChar, speed);
      } else {
        setIsTyping(false);
        onComplete?.();
      }
    };
    
    setTimeout(typeNextChar, delay);
  }, [text, speed, delay, onComplete]);

  useEffect(() => {
    startTyping();
  }, []);

  // Cursor blink effect
  useEffect(() => {
    if (!cursor) return;
    
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => clearInterval(interval);
  }, [cursor]);

  return { 
    displayText, 
    isTyping, 
    cursorVisible: showCursor && cursor,
    restart: startTyping 
  };
};

export default useTypewriter;
