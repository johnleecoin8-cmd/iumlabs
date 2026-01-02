import React, { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  threshold?: number;
}

const directionStyles = {
  up: {
    hidden: 'translate-y-8 opacity-0',
    visible: 'translate-y-0 opacity-100',
  },
  down: {
    hidden: '-translate-y-8 opacity-0',
    visible: 'translate-y-0 opacity-100',
  },
  left: {
    hidden: 'translate-x-8 opacity-0',
    visible: 'translate-x-0 opacity-100',
  },
  right: {
    hidden: '-translate-x-8 opacity-0',
    visible: 'translate-x-0 opacity-100',
  },
  none: {
    hidden: 'opacity-0',
    visible: 'opacity-100',
  },
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className,
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useScrollAnimation({ 
    threshold, 
    rootMargin: '50px',
    triggerOnce: true 
  });

  const styles = directionStyles[direction];

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out will-change-transform',
        isVisible ? styles.visible : styles.hidden,
        className
      )}
      style={{ 
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Staggered children wrapper - for cards, items, etc.
interface StaggeredChildrenProps {
  children: ReactNode[];
  baseDelay?: number;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  childClassName?: string;
  threshold?: number;
}

export const StaggeredChildren: React.FC<StaggeredChildrenProps> = ({
  children,
  baseDelay = 0,
  staggerDelay = 50,
  direction = 'up',
  className,
  childClassName,
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useScrollAnimation({ 
    threshold,
    rootMargin: '50px',
    triggerOnce: true 
  });

  const styles = directionStyles[direction];

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={cn(
            'transition-all duration-500 ease-out will-change-transform',
            isVisible ? styles.visible : styles.hidden,
            childClassName
          )}
          style={{ 
            transitionDelay: `${baseDelay + index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default AnimatedSection;
