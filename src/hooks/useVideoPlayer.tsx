import { useState, useEffect, useRef, useCallback } from 'react';
import { useMobileOptimization } from './useMobileOptimization';

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
}

/**
 * Comprehensive video player hook with mobile optimization and network-aware quality
 * 
 * Features:
 * - Automatic retry logic for mobile autoplay restrictions
 * - Network-adaptive quality selection (4G/3G/2G detection)
 * - Data saver mode detection
 * - Fallback poster management
 * - Mobile optimization integration
 */
export const useVideoPlayer = (options: UseVideoPlayerOptions): UseVideoPlayerReturn => {
  const {
    src,
    poster = '/images/hero-poster.jpg',
    autoPlay = true,
    preload = 'auto',
    playDelay = 0,
    qualityVariants,
  } = options;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [quality, setQuality] = useState<'low' | 'high' | 'auto'>('auto');

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

  // Get optimized video source based on quality
  const optimizedSrc = useCallback(() => {
    if (!qualityVariants) return src;

    switch (quality) {
      case 'low':
        return qualityVariants.low || src;
      case 'high':
        return qualityVariants.high || src;
      default:
        return src;
    }
  }, [src, quality, qualityVariants])();

  // Retry play logic for mobile browsers - more aggressive
  const tryPlay = useCallback((video: HTMLVideoElement) => {
    const attempt = () => {
      // Ensure video is muted (required for autoplay)
      video.muted = true;
      video.play().catch(() => {});
    };
    
    // Multiple retry attempts with increasing delays
    attempt();
    setTimeout(attempt, 100);
    setTimeout(attempt, 300);
    setTimeout(attempt, 600);
    setTimeout(attempt, 1000);
  }, []);

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

  // Auto-play on mount if enabled - with visibility detection
  useEffect(() => {
    if (!autoPlay || shouldDisableVideo || hasVideoError) return;

    const video = videoRef.current;
    if (!video) return;

    // Play when video element is ready
    const handleVideoReady = () => {
      tryPlay(video);
    };

    // Initial play attempt
    const timer = setTimeout(() => {
      tryPlay(video);
    }, playDelay);

    // Also try on user interaction (for strict autoplay policies)
    const handleUserInteraction = () => {
      tryPlay(video);
    };

    // Listen for any user interaction to trigger play
    document.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true });
    document.addEventListener('click', handleUserInteraction, { once: true, passive: true });
    document.addEventListener('scroll', handleUserInteraction, { once: true, passive: true });

    // Intersection observer to play when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryPlay(video);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      observer.disconnect();
    };
  }, [autoPlay, playDelay, shouldDisableVideo, hasVideoError, tryPlay]);

  // Reset state when source changes
  useEffect(() => {
    setIsVideoReady(false);
    setHasVideoError(false);
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
    preload,
    poster,
    disablePictureInPicture: true,
    controls: false,
    'aria-hidden': true as const,
    tabIndex: -1,
    style: {
      opacity: isVideoReady ? 1 : 0,
      transition: 'opacity 180ms ease',
    } as React.CSSProperties,
    onLoadedMetadata: (e: React.SyntheticEvent<HTMLVideoElement>) => {
      setIsVideoReady(true);
      tryPlay(e.currentTarget);
    },
    onCanPlay: (e: React.SyntheticEvent<HTMLVideoElement>) => {
      tryPlay(e.currentTarget);
    },
    onLoadedData: () => {
      setIsVideoReady(true);
    },
    onError: () => {
      setHasVideoError(true);
    },
  };

  // Poster fallback props
  const posterProps = {
    src: poster,
    alt: '',
    className: 'absolute inset-0 w-full h-full object-cover z-0',
    loading: 'eager' as const,
    style: {
      opacity: shouldDisableVideo || hasVideoError || !isVideoReady ? 1 : 0,
      transition: 'opacity 180ms ease',
    } as React.CSSProperties,
  };

  // Loading state
  const isLoading = !isVideoReady && !hasVideoError && !shouldDisableVideo;

  // Shimmer overlay component - Enhanced visibility with logo
  const ShimmerOverlay: React.FC = () => {
    if (!isLoading) return null;
    
    return (
      <div 
        className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* Darker overlay for better contrast */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Shimmer effect - more visible */}
        <div 
          className="absolute inset-0 -translate-x-full animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
            animationDuration: '1.8s',
            animationIterationCount: 'infinite',
          }}
        />
        
        {/* Enhanced Loading indicator with logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            {/* Logo with spinner ring */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28">
              {/* Outer glow effect */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)',
                  transform: 'scale(1.8)',
                }}
              />
              {/* Spinning ring */}
              <div 
                className="absolute inset-0 rounded-full border-[3px] border-white/10 animate-spin"
                style={{ 
                  animationDuration: '3s',
                  borderTopColor: 'rgba(255,255,255,0.6)',
                  borderRightColor: 'rgba(255,255,255,0.3)',
                }}
              />
              {/* Inner circle background */}
              <div className="absolute inset-2 rounded-full bg-black/50 backdrop-blur-sm" />
              {/* Logo centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Ium Labs"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain animate-pulse"
                  style={{ animationDuration: '2s' }}
                />
              </div>
            </div>
            {/* Loading text */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm sm:text-base text-white/80 font-medium tracking-[0.15em] uppercase">
                Loading
              </span>
              {/* Animated dots */}
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.6s' }}
                  />
                ))}
              </div>
            </div>
          </div>
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
    videoProps,
    posterProps,
    ShimmerOverlay,
  };
};

export default useVideoPlayer;
