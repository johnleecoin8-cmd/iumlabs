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

  // Retry play logic for mobile browsers
  const tryPlay = useCallback((video: HTMLVideoElement) => {
    const attempt = () => video.play().catch(() => {});
    attempt();
    setTimeout(attempt, 120);
    setTimeout(attempt, 350);
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

  // Auto-play on mount if enabled
  useEffect(() => {
    if (!autoPlay || shouldDisableVideo || hasVideoError) return;

    const timer = setTimeout(() => {
      if (videoRef.current) {
        tryPlay(videoRef.current);
      }
    }, playDelay);

    return () => clearTimeout(timer);
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

  // Shimmer overlay component
  const ShimmerOverlay: React.FC = () => {
    if (!isLoading) return null;
    
    return (
      <div 
        className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* Base dark overlay */}
        <div className="absolute inset-0 bg-background/30" />
        
        {/* Shimmer effect */}
        <div 
          className="absolute inset-0 -translate-x-full animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(var(--foreground) / 0.08) 50%, transparent 100%)',
            animationDuration: '1.5s',
            animationIterationCount: 'infinite',
          }}
        />
        
        {/* Loading indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            {/* Animated spinner */}
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-foreground/10" />
              <div 
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-foreground/40 animate-spin"
                style={{ animationDuration: '1s' }}
              />
            </div>
            {/* Loading text */}
            <span className="text-xs text-foreground/40 font-light tracking-widest uppercase">
              Loading
            </span>
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
