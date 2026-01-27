import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Route-based video preload mapping
 * Maps routes to their likely next video preloads
 */
const routeVideoMap: Record<string, string[]> = {
  '/': ['/videos/projects-background.mp4', '/videos/services-background.mp4'],
  '/projects': ['/videos/projects/story-hero.mp4', '/videos/projects/mantra-hero.mp4'],
  '/services': ['/videos/services-background.mp4'],
  '/contact': [],
  '/research': ['/videos/research-background.mp4'],
};

/**
 * Max videos to keep preloaded (memory limit)
 */
const MAX_PRELOADED_VIDEOS = 3;

/**
 * Hook for route-based video prefetching
 * Preloads videos based on current route and network conditions
 */
export const useVideoPreload = () => {
  const location = useLocation();
  const preloadedVideosRef = useRef<Set<string>>(new Set());
  const linkElementsRef = useRef<HTMLLinkElement[]>([]);

  useEffect(() => {
    // Check if we should skip preloading
    const connection = (navigator as any).connection;
    const shouldSkipPreload = 
      connection?.saveData === true ||
      connection?.effectiveType === '2g' ||
      connection?.effectiveType === 'slow-2g';

    if (shouldSkipPreload) {
      return;
    }

    // Get videos to preload for current route
    const currentPath = location.pathname;
    const videosToPreload = routeVideoMap[currentPath] || [];

    // Clean up old preloads if we're over the limit
    if (preloadedVideosRef.current.size + videosToPreload.length > MAX_PRELOADED_VIDEOS) {
      // Remove oldest preloaded links
      const excessCount = preloadedVideosRef.current.size + videosToPreload.length - MAX_PRELOADED_VIDEOS;
      linkElementsRef.current.slice(0, excessCount).forEach(link => {
        link.remove();
      });
      linkElementsRef.current = linkElementsRef.current.slice(excessCount);
      
      // Update the set
      const newSet = new Set<string>();
      linkElementsRef.current.forEach(link => {
        newSet.add(link.href);
      });
      preloadedVideosRef.current = newSet;
    }

    // Preload new videos
    videosToPreload.forEach(videoSrc => {
      if (!preloadedVideosRef.current.has(videoSrc)) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'video';
        link.href = videoSrc;
        document.head.appendChild(link);
        
        preloadedVideosRef.current.add(videoSrc);
        linkElementsRef.current.push(link);
      }
    });

    return () => {
      // Cleanup on unmount - remove all preload links
      linkElementsRef.current.forEach(link => {
        if (link.parentNode) {
          link.remove();
        }
      });
    };
  }, [location.pathname]);
};

/**
 * Utility function to manually preload a specific video
 */
export const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = src;
    
    video.onloadedmetadata = () => {
      resolve();
    };
    
    video.onerror = () => {
      reject(new Error(`Failed to preload video: ${src}`));
    };
  });
};

export default useVideoPreload;
