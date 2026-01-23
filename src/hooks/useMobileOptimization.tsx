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
 */
export const useMobileOptimization = (): MobileOptimizationState => {
  const [state, setState] = useState<MobileOptimizationState>(() => {
    // Initial state - assume mobile if touch device or small screen
    const isMobileInitial = typeof window !== 'undefined' && (
      window.innerWidth < 1024 || 
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );
    
    return {
      isMobile: isMobileInitial,
      isLowPerformance: isMobileInitial, // Assume low performance on mobile
      prefersReducedMotion: false,
      shouldDisableHeavyAnimations: isMobileInitial,
      shouldDisable3D: isMobileInitial,
      shouldDisableVideo: false,
    };
  });

  useEffect(() => {
    const checkPerformance = () => {
      // Check if mobile - more aggressive detection
      const isMobile = 
        window.innerWidth < 1024 || 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check for low-end device indicators - more aggressive
      const isLowPerformance = 
        (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4) ||
        ((navigator as any).deviceMemory !== undefined && (navigator as any).deviceMemory <= 4) ||
        /Android/.test(navigator.userAgent) ||
        /iPhone|iPad|iPod/.test(navigator.userAgent);
      
      // AGGRESSIVE: Disable heavy stuff on ALL mobile devices
      const shouldDisableHeavyAnimations = isMobile || prefersReducedMotion || isLowPerformance;
      const shouldDisable3D = isMobile || isLowPerformance;
      // Allow video on mobile unless user prefers reduced motion
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

    checkPerformance();
    
    // Re-check on resize (for responsive testing) - debounced
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
  }, []);

  return state;
};

export default useMobileOptimization;
