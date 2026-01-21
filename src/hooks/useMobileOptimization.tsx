import { useState, useEffect } from 'react';

interface MobileOptimizationState {
  isMobile: boolean;
  isLowPerformance: boolean;
  prefersReducedMotion: boolean;
  shouldDisableHeavyAnimations: boolean;
  shouldDisable3D: boolean;
  shouldDisableVideo: boolean;
}

/**
 * Hook to detect mobile devices and performance constraints
 * Used to conditionally disable heavy animations, 3D components, and videos
 */
export const useMobileOptimization = (): MobileOptimizationState => {
  const [state, setState] = useState<MobileOptimizationState>({
    isMobile: false,
    isLowPerformance: false,
    prefersReducedMotion: false,
    shouldDisableHeavyAnimations: false,
    shouldDisable3D: false,
    shouldDisableVideo: false,
  });

  useEffect(() => {
    const checkPerformance = () => {
      // Check if mobile
      const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check for low-end device indicators
      const isLowPerformance = 
        navigator.hardwareConcurrency <= 4 || // Low CPU cores
        (navigator as any).deviceMemory <= 4 || // Low memory (Chrome only)
        /Android/.test(navigator.userAgent) && !/Chrome\/[8-9][0-9]|Chrome\/1[0-9][0-9]/.test(navigator.userAgent); // Older Android
      
      // Determine what to disable
      const shouldDisableHeavyAnimations = isMobile || prefersReducedMotion || isLowPerformance;
      const shouldDisable3D = isMobile || isLowPerformance;
      const shouldDisableVideo = isMobile && isLowPerformance;

      setState({
        isMobile,
        isLowPerformance,
        prefersReducedMotion,
        shouldDisableHeavyAnimations,
        shouldDisable3D,
        shouldDisableVideo,
      });
    };

    checkPerformance();
    
    // Re-check on resize (for responsive testing)
    const handleResize = () => {
      // Debounce resize handler
      clearTimeout((window as any).__mobileOptimizationTimeout);
      (window as any).__mobileOptimizationTimeout = setTimeout(checkPerformance, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Listen for reduced motion preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkPerformance);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', checkPerformance);
    };
  }, []);

  return state;
};

export default useMobileOptimization;
