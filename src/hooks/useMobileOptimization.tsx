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
 * AGGRESSIVE detection to prevent phone shutdown from resource overload
 * 
 * SIMPLIFIED: Single useEffect with empty dependency array to prevent
 * React hook queue corruption in loop-rendered components
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
      const isMobile = 
        window.innerWidth < 1024 || 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const isLowPerformance = 
        (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4) ||
        ((navigator as any).deviceMemory !== undefined && (navigator as any).deviceMemory <= 4) ||
        /Android/.test(navigator.userAgent) ||
        /iPhone|iPad|iPod/.test(navigator.userAgent);
      
      const shouldDisableHeavyAnimations = isMobile || prefersReducedMotion || isLowPerformance;
      const shouldDisable3D = isMobile || isLowPerformance;
      const shouldDisableVideo = prefersReducedMotion;

      setState({
        isMobile,
        isLowPerformance,
        prefersReducedMotion,
        shouldDisableHeavyAnimations,
        shouldDisable3D,
        shouldDisableVideo,
      });
    };

    // Run immediately on mount
    checkPerformance();

    // Debounced resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkPerformance, 500);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Listen for reduced motion preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkPerformance);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', checkPerformance);
      clearTimeout(resizeTimeout);
    };
  }, []); // Empty dependency - runs once on mount

  return state;
};

export default useMobileOptimization;
