import { useState, useEffect, useRef, useCallback } from 'react';
import { useMobileOptimization } from './useMobileOptimization';

declare const __BUILD_TIMESTAMP__: string;

const VIDEO_VERSION = typeof __BUILD_TIMESTAMP__ !== 'undefined' ? __BUILD_TIMESTAMP__ : Date.now().toString(36);

interface NetworkInfo {
  effectiveType: '4g' | '3g' | '2g' | 'slow-2g';
  downlink: number;
  saveData: boolean;
}

interface UseVideoPlayerOptions {
  /** Video source URL */
  src: string;
  /** Poster image URL for fallback */
  poster?: string;
  /** Enable auto-play on mount */
  autoPlay?: boolean;
  /** Whether to preload video */
  preload?: 'auto' | 'metadata' | 'none';
  /** Delay before first play attempt (ms) */
  playDelay?: number;
  /** Custom quality variants { lowRes: string, highRes: string } */
  qualityVariants?: {
    low?: string;   // e.g., 480p version
    high?: string;  // e.g., 1080p version
  };
  /** Force first frame load with #t=0.001 */
  forceFirstFrame?: boolean;
  /** Max retries for network errors (default: 3) */
  maxRetries?: number;
  /** Load timeout in ms (default: 8000) */
  loadTimeout?: number;
  /** Lazy load: only attach video source when element enters viewport (default: false) */
  lazyLoad?: boolean;
  /** IntersectionObserver rootMargin for lazy load (default: '200px') */
  lazyRootMargin?: string;
}

interface UseVideoPlayerReturn {
  /** Ref to attach to video element */
  videoRef: React.RefObject<HTMLVideoElement>;
  /** Whether video is ready to play */
  isVideoReady: boolean;
  /** Whether video encountered an error */
  hasVideoError: boolean;
  /** Current video quality level */
  quality: 'low' | 'high' | 'auto';
  /** Optimized video source based on network */
  optimizedSrc: string;
  /** Network connection info */
  networkInfo: NetworkInfo | null;
  /** Whether video should be disabled (mobile/reduced-motion) */
  shouldDisableVideo: boolean;
  /** Whether video is currently loading */
  isLoading: boolean;
  /** Manual play trigger */
  play: () => void;
  /** Manual pause trigger */
  pause: () => void;
  /** Reset video to beginning */
  reset: () => void;
  /** Force reload with fresh URL (cache bust) */
  forceRefresh: () => void;
  /** Key that changes on forceRefresh to trigger React remount */
  forceKey: number;
  /** Video event handlers to spread on video element */
  videoProps: {
    autoPlay: boolean;
    muted: boolean;
    loop: boolean;
    playsInline: boolean;
    'webkit-playsinline': string;
    'x5-playsinline': string;
    'x5-video-player-type': string;
    preload: string;
    poster: string;
    disablePictureInPicture: boolean;
    controls: boolean;
    'aria-hidden': boolean;
    tabIndex: number;
    style: React.CSSProperties;
    onLoadedMetadata: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
    onCanPlay: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
    onLoadedData: () => void;
    onError: () => void;
  };
  /** Poster image props for fallback layer */
  posterProps: {
    src: string;
    alt: string;
    className: string;
    loading: 'eager' | 'lazy';
    style: React.CSSProperties;
  };
  /** Shimmer overlay component for loading state */
  ShimmerOverlay: React.FC;
  /** Error overlay component for failed video */
  ErrorOverlay: React.FC;
}

const appendVersion = (url: string): string => {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}v=${VIDEO_VERSION}`;
};

const getVideoSource = (src: string, forceFirstFrame: boolean): string => {
  const versioned = appendVersion(src);
  if (forceFirstFrame && !versioned.includes('#t=')) {
    return `${versioned}#t=0.001`;
  }
  return versioned;
};

/**
 * Comprehensive video player hook with mobile optimization and network-aware quality
 * 
 * Features:
 * - Automatic retry logic for mobile autoplay restrictions
 * - Network-adaptive quality selection (4G/3G/2G detection)
 * - Data saver mode detection
 * - Fallback poster management
 * - Mobile optimization integration
 * - First frame forced loading with #t=0.001
 * - Network error retry with exponential backoff
 */
export const useVideoPlayer = (options: UseVideoPlayerOptions): UseVideoPlayerReturn => {
  const {
    src,
    poster = '/images/hero-poster.jpg',
    autoPlay = true,
    preload = 'auto',
    playDelay = 0,
    qualityVariants,
    forceFirstFrame = false,
    maxRetries = 3,
    loadTimeout = 8000,
    lazyLoad = false,
    lazyRootMargin = '200px',
  } = options;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [quality, setQuality] = useState<'low' | 'high' | 'auto'>('auto');
  const [retryCount, setRetryCount] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(!lazyLoad);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const readyRef = useRef(false);
  const loadStartRef = useRef<number | null>(null);
  const firstByteLoggedRef = useRef(false);
  const playLoggedRef = useRef(false);

  const { isMobile, shouldDisableVideo, prefersReducedMotion } = useMobileOptimization();

  // Detect network conditions
  useEffect(() => {
    const updateNetworkInfo = () => {
      const connection = (navigator as any).connection || 
                         (navigator as any).mozConnection || 
                         (navigator as any).webkitConnection;
      
      if (connection) {
        setNetworkInfo({
          effectiveType: connection.effectiveType || '4g',
          downlink: connection.downlink || 10,
          saveData: connection.saveData || false,
        });
      }
    };

    updateNetworkInfo();

    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateNetworkInfo);
      return () => connection.removeEventListener('change', updateNetworkInfo);
    }
  }, []);

  // Determine optimal quality based on network
  useEffect(() => {
    if (!networkInfo) {
      setQuality('auto');
      return;
    }

    // Data saver mode - always use low quality
    if (networkInfo.saveData) {
      setQuality('low');
      return;
    }

    // Network-based quality selection
    switch (networkInfo.effectiveType) {
      case 'slow-2g':
      case '2g':
        setQuality('low');
        break;
      case '3g':
        // Use low on mobile 3G, high on desktop 3G
        setQuality(isMobile ? 'low' : 'high');
        break;
      case '4g':
      default:
        setQuality('high');
        break;
    }
  }, [networkInfo, isMobile]);

  // Get optimized video source based on quality with first frame support
  const optimizedSrc = useCallback(() => {
    let baseSrc = src;
    
    if (qualityVariants) {
      switch (quality) {
        case 'low':
          baseSrc = qualityVariants.low || src;
          break;
        case 'high':
          baseSrc = qualityVariants.high || src;
          break;
        default:
          baseSrc = src;
      }
    }

    return getVideoSource(baseSrc, forceFirstFrame);
  }, [src, quality, qualityVariants, forceFirstFrame])();

  const tryPlay = useCallback(async (video: HTMLVideoElement) => {
    if (!video.paused) return;
    video.muted = true;
    try {
      await video.play();
    } catch {
      // Will retry via interval or user interaction
    }
  }, []);

  // Handle network error with retry
  const handleError = useCallback(() => {
    if (retryCount < maxRetries) {
      const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s
      console.log(`Video load failed, retrying in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
      
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setHasVideoError(false);
        
        // Force reload the video
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, delay);
    } else {
      setHasVideoError(true);
      console.warn('Video load failed after max retries, falling back to poster');
    }
  }, [retryCount, maxRetries]);

  // Manual controls
  const play = useCallback(() => {
    if (videoRef.current) {
      tryPlay(videoRef.current);
    }
  }, [tryPlay]);

  const pause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const reset = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  // Load timeout - fallback to poster if video takes too long
  useEffect(() => {
    if (shouldDisableVideo || hasVideoError || isVideoReady) return;

    timeoutRef.current = setTimeout(() => {
      if (!isVideoReady && videoRef.current) {
        tryPlay(videoRef.current);
      }
    }, loadTimeout);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [shouldDisableVideo, hasVideoError, isVideoReady, loadTimeout, tryPlay]);

  // Auto-play on mount if enabled - with visibility detection
  useEffect(() => {
    if (!autoPlay || shouldDisableVideo || hasVideoError) return;

    const video = videoRef.current;
    if (!video) return;

    // Reliable playback detection via timeupdate
    const handleTimeUpdate = () => {
      if (!readyRef.current) {
        readyRef.current = true;
        setIsVideoReady(true);
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate, { passive: true });

    // If video is already cached/loaded, play immediately
    if (video.readyState >= 3) {
      readyRef.current = true;
      setIsVideoReady(true);
      tryPlay(video);
    } else {
      // Initial play attempt
      setTimeout(() => tryPlay(video), playDelay);
    }

    // Periodic retry — handles browsers that block initial autoplay
    const retryInterval = setInterval(() => {
      if (!video.paused) {
        clearInterval(retryInterval);
        return;
      }
      tryPlay(video);
    }, 1500);

    // Also try on user interaction (for strict autoplay policies)
    const handleUserInteraction = () => {
      tryPlay(video);
    };

    document.addEventListener('touchstart', handleUserInteraction, { passive: true });
    document.addEventListener('click', handleUserInteraction, { passive: true });
    document.addEventListener('scroll', handleUserInteraction, { passive: true });

    // Intersection observer to play when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) tryPlay(video);
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    return () => {
      clearInterval(retryInterval);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      observer.disconnect();
    };
  }, [autoPlay, playDelay, shouldDisableVideo, hasVideoError, tryPlay]);

  // Cache bust verification via Performance API
  useEffect(() => {
    if (!isVideoReady || shouldDisableVideo) return;
    const check = () => {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const videoEntry = entries.find(e => e.name.includes('hero-background.mp4'));
      if (videoEntry) {
        const fromCache = videoEntry.transferSize === 0 && videoEntry.decodedBodySize > 0;
        console.log(`[VideoPlayer] cache-bust check: ${fromCache ? 'served from cache' : 'fetched from network'} (transferSize=${videoEntry.transferSize})`);
      }
    };
    setTimeout(check, 500);
  }, [isVideoReady, shouldDisableVideo]);

  const [forceKey, setForceKey] = useState(0);
  const forceRefresh = useCallback(() => {
    readyRef.current = false;
    setIsVideoReady(false);
    setHasVideoError(false);
    setRetryCount(0);
    setForceKey(k => k + 1);
    if (videoRef.current) {
      videoRef.current.src = appendVersion(src) + `&_r=${Date.now()}`;
      videoRef.current.load();
    }
  }, [src]);

  // Reset state when source changes
  useEffect(() => {
    readyRef.current = false;
    setIsVideoReady(false);
    setHasVideoError(false);
    setRetryCount(0);
  }, [optimizedSrc]);

  // Video element props
  const videoProps = {
    autoPlay: autoPlay && !shouldDisableVideo,
    muted: true,
    loop: true,
    playsInline: true,
    'webkit-playsinline': 'true',
    'x5-playsinline': 'true',
    'x5-video-player-type': 'h5',
    'x5-video-orientation': 'portraint',
    preload,
    poster,
    disablePictureInPicture: true,
    disableRemotePlayback: true,
    controls: false,
    controlsList: 'nodownload nofullscreen noplaybackrate',
    'aria-hidden': true as const,
    tabIndex: -1,
    style: {
      opacity: isVideoReady ? 1 : 0,
      transition: 'opacity 300ms ease',
    } as React.CSSProperties,
    onLoadStart: () => {
      loadStartRef.current = performance.now();
      firstByteLoggedRef.current = false;
      playLoggedRef.current = false;
      console.log('[VideoPlayer] loadstart', { src, t: 0 });
    },
    onLoadedMetadata: (e: React.SyntheticEvent<HTMLVideoElement>) => {
      if (loadStartRef.current != null) {
        console.log(`[VideoPlayer] loadedmetadata in ${(performance.now() - loadStartRef.current).toFixed(0)}ms`);
      }
      if (e.currentTarget.paused) tryPlay(e.currentTarget);
    },
    onCanPlay: (e: React.SyntheticEvent<HTMLVideoElement>) => {
      if (loadStartRef.current != null && !firstByteLoggedRef.current) {
        firstByteLoggedRef.current = true;
        console.log(`[VideoPlayer] canplay (ready to render) in ${(performance.now() - loadStartRef.current).toFixed(0)}ms`);
      }
      if (!readyRef.current) {
        readyRef.current = true;
        setIsVideoReady(true);
      }
      if (e.currentTarget.paused) tryPlay(e.currentTarget);
    },
    onPlaying: () => {
      if (loadStartRef.current != null && !playLoggedRef.current) {
        playLoggedRef.current = true;
        console.log(`[VideoPlayer] playback started in ${(performance.now() - loadStartRef.current).toFixed(0)}ms`);
      }
      if (!readyRef.current) {
        readyRef.current = true;
        setIsVideoReady(true);
      }
    },
    onLoadedData: () => {
      // no-op: isVideoReady is set by onPlaying instead
    },
    onError: handleError,
  };

  // Poster fallback props
  const posterProps = {
    src: poster,
    alt: '',
    width: 1920,
    height: 1080,
    className: 'absolute inset-0 w-full h-full object-cover z-0',
    loading: 'eager' as const,
    fetchPriority: 'high' as const,
    style: {
      opacity: shouldDisableVideo || hasVideoError || !isVideoReady ? 1 : 0,
      transition: 'opacity 400ms ease',
    } as React.CSSProperties,
  };

  const isLoading = !isVideoReady && !hasVideoError && !shouldDisableVideo;

  const ShimmerOverlay: React.FC = () => {
    if (!isLoading) return null;
    return (
      <div className="absolute inset-0 z-[5] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-[shimmer_2s_infinite]" style={{ backgroundSize: '200% 100%' }} />
        <div className="w-8 h-8 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
      </div>
    );
  };

  const ErrorOverlay: React.FC = () => {
    if (!hasVideoError) return null;
    return (
      <div className="absolute inset-0 z-[5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-white/30">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-[11px]">Video unavailable</span>
        </div>
      </div>
    );
  };

  return {
    videoRef,
    isVideoReady,
    hasVideoError,
    quality,
    optimizedSrc,
    networkInfo,
    shouldDisableVideo: shouldDisableVideo || prefersReducedMotion,
    isLoading,
    play,
    pause,
    reset,
    forceRefresh,
    forceKey,
    videoProps,
    posterProps,
    ShimmerOverlay,
    ErrorOverlay,
  };
};

export default useVideoPlayer;
