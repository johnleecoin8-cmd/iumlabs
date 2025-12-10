import { useEffect, useState, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  animation?: 'letter-pop' | 'letter-slide' | 'letter-fade';
}

const AnimatedText = ({ 
  text, 
  className = '', 
  delay = 0,
  staggerDelay = 50,
  animation = 'letter-pop'
}: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');
  
  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => {
            const totalIndex = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + charIndex;
            
            return (
              <span
                key={charIndex}
                className={`inline-block ${isVisible ? `animate-${animation}` : 'opacity-0'}`}
                style={{ 
                  animationDelay: `${delay + totalIndex * staggerDelay}ms`,
                  animationFillMode: 'both'
                }}
              >
                {char}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;
