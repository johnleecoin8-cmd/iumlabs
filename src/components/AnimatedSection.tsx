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

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className,
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    rootMargin: '80px',
    triggerOnce: true
  });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] ease-out',
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: '600ms',
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate3d(0,0,0)'
          : direction === 'up' ? 'translate3d(0,20px,0)'
          : direction === 'down' ? 'translate3d(0,-20px,0)'
          : direction === 'left' ? 'translate3d(20px,0,0)'
          : direction === 'right' ? 'translate3d(-20px,0,0)'
          : 'none',
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
  staggerDelay = 40,
  direction = 'up',
  className,
  childClassName,
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    rootMargin: '80px',
    triggerOnce: true
  });

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={cn(
            'transition-[opacity,transform] ease-out',
            childClassName
          )}
          style={{
            transitionDelay: `${baseDelay + index * staggerDelay}ms`,
            transitionDuration: '500ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? 'translate3d(0,0,0)'
              : direction === 'up' ? 'translate3d(0,16px,0)'
              : direction === 'down' ? 'translate3d(0,-16px,0)'
              : direction === 'left' ? 'translate3d(16px,0,0)'
              : direction === 'right' ? 'translate3d(-16px,0,0)'
              : 'none',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default AnimatedSection;
