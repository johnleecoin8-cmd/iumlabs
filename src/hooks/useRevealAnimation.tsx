import { useEffect, useRef, useState, useCallback } from 'react';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'rotate';

interface UseRevealAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  direction?: RevealDirection;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

interface UseRevealAnimationReturn {
  ref: React.RefObject<HTMLDivElement>;
  isRevealed: boolean;
  className: string;
}

export const useRevealAnimation = (options: UseRevealAnimationOptions = {}): UseRevealAnimationReturn => {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    direction = 'up',
    delay = 0,
    staggerChildren = false,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay if specified
          if (delay > 0) {
            setTimeout(() => setIsRevealed(true), delay);
          } else {
            setIsRevealed(true);
          }
          
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, delay]);

  // Generate CSS class based on direction and state
  const getClassName = useCallback(() => {
    const baseClass = `reveal-${direction}`;
    const staggerClass = staggerChildren ? 'stagger-children' : '';
    const revealedClass = isRevealed ? 'is-revealed' : '';
    
    return [baseClass, staggerClass, revealedClass].filter(Boolean).join(' ');
  }, [direction, staggerChildren, isRevealed]);

  return {
    ref,
    isRevealed,
    className: getClassName(),
  };
};

// Hook for staggered children animation
export const useStaggeredReveal = (itemCount: number, baseDelay = 0, staggerInterval = 80) => {
  const [revealedItems, setRevealedItems] = useState<boolean[]>(new Array(itemCount).fill(false));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger reveal each item
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setRevealedItems(prev => {
                const newState = [...prev];
                newState[i] = true;
                return newState;
              });
            }, baseDelay + (i * staggerInterval));
          }
          observer.unobserve(container);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [itemCount, baseDelay, staggerInterval]);

  return {
    containerRef,
    revealedItems,
    getItemStyle: (index: number) => ({
      opacity: revealedItems[index] ? 1 : 0,
      transform: revealedItems[index] ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    }),
  };
};

// Hook for parallax scroll effect
export const useParallaxScroll = (multiplier = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distance = elementCenter - viewportCenter;
      
      setOffset(distance * multiplier * -1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [multiplier]);

  return {
    ref,
    style: {
      transform: `translateY(${offset}px)`,
      transition: 'transform 0.1s linear',
    },
  };
};

// Hook for magnetic button effect
export const useMagneticEffect = (strength = 0.3) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return {
    ref,
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: position.x === 0 && position.y === 0 ? 'transform 0.3s ease' : 'none',
    },
  };
};

export default useRevealAnimation;
