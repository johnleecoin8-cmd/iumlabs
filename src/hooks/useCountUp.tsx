import { useEffect, useState } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  isVisible?: boolean;
  decimals?: number; // Support decimal values
}

export const useCountUp = ({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  isVisible = true,
  decimals,
}: UseCountUpOptions): string => {
  // Determine decimal places from the end value if not specified
  const autoDecimals = decimals ?? (end % 1 !== 0 ? String(end).split('.')[1]?.length || 1 : 0);
  
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isVisible || hasStarted) return;

    const timeout = setTimeout(() => {
      setHasStarted(true);
      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = start + (end - start) * easeOut;
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Ensure we end exactly at the target value
          setCount(end);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, hasStarted, start, end, duration, delay]);

  // Format the count with proper decimal handling
  const formattedCount = autoDecimals > 0 
    ? count.toFixed(autoDecimals)
    : Math.round(count).toLocaleString();

  return `${prefix}${formattedCount}${suffix}`;
};

export default useCountUp;
