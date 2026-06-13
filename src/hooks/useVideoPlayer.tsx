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
  /** Lazy load: only attach video source when element enters viewport (default: true) */
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
  /** Whether the video source should be attached (true unless lazyLoad is waiting for viewport) */
  shouldLoad: boolean;
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
  /** Mobile debug banner showing readyState / frame / poster transition */
  DebugBanner: React.FC;
}

const MAX_PLAY_ATTEMPTS = 8;
const PLAY_COOLDOWN_MS = 1800;
const PLAY_RETRY_THROTTLE_MS = 250;
const MOBILE_STALL_WINDOW_MS = 2600;
const MOBILE_RELOAD_COOLDOWN_MS = 2200;
const MAX_HARD_RELOADS = 2;

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
    lazyLoad = true,
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
  const frameReadyRef = useRef(false);
  const frameCallbackIdRef = useRef<number | null>(null);
  const playAttemptsRef = useRef(0);
  const lastPlayAttemptRef = useRef(0);
  const lastProgressAtRef = useRef(0);
  const lastCurrentTimeRef = useRef(0);
  const lastHardReloadAtRef = useRef(0);
  const hardReloadCountRef = useRef(0);
  const loadGateOpenedAtRef = useRef(0);
  const [debugTick, setDebugTick] = useState(0);

  const { isMobile, shouldDisableVideo, prefersReducedMotion } = useMobileOptimization();

  // Lazy load: observe video element and only mark for loading when it enters viewport
  useEffect(() => {
    if (!lazyLoad || shouldLoad) return;
    const el = videoRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            console.log('[VideoPlayer] hero in viewport — beginning video load');
            setShouldLoad(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: lazyRootMargin, threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lazyLoad, shouldLoad, lazyRootMargin]);


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

  const markVideoReady = useCallback(() => {
    if (readyRef.current) return; // single, irreversible poster→video transition
    readyRef.current = true;
    frameReadyRef.current = true;
    setIsVideoReady(true);
    setDebugTick((t) => t + 1);
  }, []);

  const scheduleFrameReady = useCallback((video: HTMLVideoElement) => {
    if (frameReadyRef.current) return;

    const requestVideoFrame = (video as HTMLVideoElement & {
      requestVideoFrameCallback?: (callback: () => void) => number;
      cancelVideoFrameCallback?: (handle: number) => void;
    }).requestVideoFrameCallback;

    if (typeof requestVideoFrame === 'function') {
      frameCallbackIdRef.current = requestVideoFrame.call(video, () => {
        frameCallbackIdRef.current = null;
        markVideoReady();
      });
      return;
    }

    requestAnimationFrame(() => {
      if (!video.isConnected) return;
      markVideoReady();
    });
  }, [markVideoReady]);

  const clearFrameReadyCallback = useCallback((video?: HTMLVideoElement | null) => {
    if (!video || frameCallbackIdRef.current == null) return;

    const cancelVideoFrame = (video as HTMLVideoElement & {
      cancelVideoFrameCallback?: (handle: number) => void;
    }).cancelVideoFrameCallback;

    if (typeof cancelVideoFrame === 'function') {
      cancelVideoFrame.call(video, frameCallbackIdRef.current);
    }

    frameCallbackIdRef.current = null;
  }, []);

  const tryPlay = useCallback(async (video: HTMLVideoElement) => {
    if (!video.paused) return;
    if (playAttemptsRef.current >= MAX_PLAY_ATTEMPTS) return;
    const now = performance.now();
    if (now - lastPlayAttemptRef.current < PLAY_RETRY_THROTTLE_MS) return; // throttle bursts
    lastPlayAttemptRef.current = now;
    playAttemptsRef.current += 1;
    setDebugTick((t) => t + 1);
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.defaultMuted = true;
    try {
      const p = video.play();
      if (p && typeof p.then === 'function') {
        await p;
      }
      lastProgressAtRef.current = performance.now();
    } catch {
      // Silent — bounded retry handled by the interval/burst caller.
    }
  }, []);

  const hardReload = useCallback((video: HTMLVideoElement, reason: string) => {
    const now = performance.now();
    if (hardReloadCountRef.current >= MAX_HARD_RELOADS) return;
    if (now - lastHardReloadAtRef.current < MOBILE_RELOAD_COOLDOWN_MS) return;

    hardReloadCountRef.current += 1;
    lastHardReloadAtRef.current = now;
    readyRef.current = false;
    frameReadyRef.current = false;
    setIsVideoReady(false);
    setDebugTick((t) => t + 1);
    console.warn(`[VideoPlayer] hard reload ${hardReloadCountRef.current}/${MAX_HARD_RELOADS} — ${reason}`);

    try {
      video.pause();
      video.load();
    } catch {
      return;
    }

    window.setTimeout(() => {
      if (video.isConnected) {
        tryPlay(video);
      }
    }, 80);
  }, [tryPlay]);

  const triggerPlaybackBurst = useCallback((video: HTMLVideoElement, immediateDelay = 0) => {
    const attempts = [immediateDelay, 80, 220, 500, 1200];
    const timers = attempts.map((delay) => window.setTimeout(() => {
      if (video.isConnected && video.paused) {
        tryPlay(video);
      }
    }, delay));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [tryPlay]);

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

  // Auto-play on mount with a single deterministic playback path.
  // On mobile, lazy loading prevents below-the-fold background videos from
  // competing with the hero video during initial page load.
  useEffect(() => {
    if (!autoPlay || shouldDisableVideo || hasVideoError || !shouldLoad) return;

    const video = videoRef.current;
    if (!video) return;
    let clearPlaybackBurst = () => {};
    loadGateOpenedAtRef.current = performance.now();
    lastProgressAtRef.current = performance.now();
    lastCurrentTimeRef.current = video.currentTime;

    const playNow = (delay = 0) => {
      clearPlaybackBurst();
      clearPlaybackBurst = triggerPlaybackBurst(video, delay);
    };

    // Reliable playback detection via timeupdate
    const handleTimeUpdate = () => {
      if (video.currentTime > lastCurrentTimeRef.current + 0.01) {
        lastCurrentTimeRef.current = video.currentTime;
        lastProgressAtRef.current = performance.now();
      }
      if (video.currentTime > 0) {
        scheduleFrameReady(video);
      }
    };

    const handlePlaying = () => {
      lastProgressAtRef.current = performance.now();
      lastCurrentTimeRef.current = video.currentTime;
      scheduleFrameReady(video);
    };

    video.addEventListener('timeupdate', handleTimeUpdate, { passive: true });
    video.addEventListener('playing', handlePlaying, { passive: true });

    // If video is already cached/loaded, play immediately
    if (video.readyState >= 3) {
      playNow();
    } else {
      // Initial play attempt
      playNow(playDelay);
    }

    // Bounded periodic retry — handles browsers that block initial autoplay.
    // Stops on success OR when MAX_PLAY_ATTEMPTS is reached (poster stays).
    const retryInterval = setInterval(() => {
      if (!video.paused) {
        clearInterval(retryInterval);
        return;
      }
      if (playAttemptsRef.current >= MAX_PLAY_ATTEMPTS) {
        clearInterval(retryInterval);
        console.warn('[VideoPlayer] play attempts exhausted — keeping poster');
        setDebugTick((t) => t + 1);
        return;
      }
      tryPlay(video);
    }, PLAY_COOLDOWN_MS);

    const stallMonitor = window.setInterval(() => {
      if (!video.isConnected || document.visibilityState !== 'visible') return;

      const now = performance.now();
      const madeProgress = video.currentTime > lastCurrentTimeRef.current + 0.01;
      if (madeProgress) {
        lastCurrentTimeRef.current = video.currentTime;
        lastProgressAtRef.current = now;
      }

      if (!readyRef.current && video.readyState >= 2 && video.currentTime > 0) {
        scheduleFrameReady(video);
      }

      if (!isMobile) return;

      const stalledFor = now - lastProgressAtRef.current;
      const exceededInitialWindow = now - loadGateOpenedAtRef.current > MOBILE_STALL_WINDOW_MS;

      if (video.paused && exceededInitialWindow && playAttemptsRef.current < MAX_PLAY_ATTEMPTS) {
        tryPlay(video);
        return;
      }

      if (exceededInitialWindow && stalledFor > MOBILE_STALL_WINDOW_MS) {
        hardReload(video, video.paused ? 'paused on mobile after load window' : 'currentTime stalled on mobile');
      }
    }, 1200);

    // Also try on user interaction (for strict autoplay policies)
    const handleUserInteraction = () => {
      tryPlay(video);
    };

    const handleVisibilityResume = () => {
      if (document.visibilityState === 'visible') {
        playNow();
      }
    };

    document.addEventListener('touchstart', handleUserInteraction, { passive: true });
    document.addEventListener('touchmove', handleUserInteraction, { passive: true });
    document.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('scroll', handleUserInteraction, { passive: true });
    window.addEventListener('pageshow', handleVisibilityResume, { passive: true });
    window.addEventListener('focus', handleVisibilityResume, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityResume, { passive: true });

    return () => {
      clearInterval(retryInterval);
      window.clearInterval(stallMonitor);
      clearPlaybackBurst();
      clearFrameReadyCallback(video);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('playing', handlePlaying);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('touchmove', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('pageshow', handleVisibilityResume);
      window.removeEventListener('focus', handleVisibilityResume);
      document.removeEventListener('visibilitychange', handleVisibilityResume);
    };
  }, [autoPlay, playDelay, shouldDisableVideo, hasVideoError, shouldLoad, isMobile, tryPlay, hardReload, triggerPlaybackBurst, scheduleFrameReady, clearFrameReadyCallback]);

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
    playAttemptsRef.current = 0;
    lastPlayAttemptRef.current = 0;
    setForceKey(k => k + 1);
    if (videoRef.current) {
      videoRef.current.src = appendVersion(src) + `&_r=${Date.now()}`;
      videoRef.current.load();
    }
  }, [src]);

  // Reset state when source changes
  useEffect(() => {
    readyRef.current = false;
    frameReadyRef.current = false;
    frameCallbackIdRef.current = null;
    lastProgressAtRef.current = 0;
    lastCurrentTimeRef.current = 0;
    lastHardReloadAtRef.current = 0;
    hardReloadCountRef.current = 0;
    loadGateOpenedAtRef.current = 0;
    setIsVideoReady(false);
    setHasVideoError(false);
    setRetryCount(0);
  }, [optimizedSrc]);

  // When lazyLoad gate opens (shouldLoad turns true) AFTER mount, force the
  // <video> element to (re)load. Without this, mobile Safari ignores newly
  // appended <source> children and the video never starts.
  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;
    loadGateOpenedAtRef.current = performance.now();
    lastProgressAtRef.current = performance.now();
    lastCurrentTimeRef.current = video.currentTime;
    try {
      video.load();
    } catch {}
    // Try playing immediately and again shortly after metadata is likely ready
    tryPlay(video);
    const t = setTimeout(() => tryPlay(video), 250);
    return () => clearTimeout(t);
  }, [shouldLoad, tryPlay]);

  // Video element props
  const videoProps = {
    src: shouldLoad ? optimizedSrc : undefined,
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
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      willChange: 'opacity',
      pointerEvents: 'none', // never clickable — no play button, no interaction
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
      if (e.currentTarget.paused) tryPlay(e.currentTarget);
    },
    onPlaying: () => {
      if (loadStartRef.current != null && !playLoggedRef.current) {
        playLoggedRef.current = true;
        console.log(`[VideoPlayer] playback started in ${(performance.now() - loadStartRef.current).toFixed(0)}ms`);
      }
      if (videoRef.current) {
        scheduleFrameReady(videoRef.current);
      }
    },
    onLoadedData: () => {
      if (videoRef.current && videoRef.current.currentTime > 0) {
        scheduleFrameReady(videoRef.current);
      }
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
    // Silent fallback: when video errors, the poster image stays visible (handled via posterProps opacity).
    return null;
  };

  // Mobile debug banner — only renders on mobile when ?vdebug=1 is in the URL
  // or localStorage.videoDebug === '1'. Shows readyState / frame / attempts /
  // poster state so we can diagnose mobile playback issues live on-device.
  const DebugBanner: React.FC = () => {
    const [, force] = useState(0);
    useEffect(() => {
      const id = setInterval(() => force((n) => n + 1), 500);
      return () => clearInterval(id);
    }, []);
    const enabled = (() => {
      if (typeof window === 'undefined') return false;
      try {
        if (new URLSearchParams(window.location.search).get('vdebug') === '1') return true;
        if (window.localStorage?.getItem('videoDebug') === '1') return true;
      } catch {}
      return false;
    })();
    if (!enabled || !isMobile) return null;
    const v = videoRef.current;
    const rs = v?.readyState ?? -1;
    const rsLabels = ['NOTHING', 'METADATA', 'CURRENT', 'FUTURE', 'ENOUGH'];
    return (
      <div
        className="fixed top-2 left-2 z-[9999] rounded-md bg-black/80 px-2.5 py-1.5 text-[10px] leading-tight text-white/90 font-mono pointer-events-none"
        aria-hidden
      >
        <div>rs: {rs} {rs >= 0 ? rsLabels[rs] : ''}</div>
        <div>frame: {frameReadyRef.current ? '✓' : '…'} · ready: {isVideoReady ? '✓' : '…'}</div>
        <div>poster: {(!isVideoReady || hasVideoError || shouldDisableVideo) ? 'shown' : 'hidden'}</div>
        <div>play: {playAttemptsRef.current}/{MAX_PLAY_ATTEMPTS} {v?.paused ? '(paused)' : '(playing)'}</div>
        <div>err: {hasVideoError ? 'yes' : 'no'} · tick: {debugTick}</div>
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
    // Note: do NOT include prefersReducedMotion here. iOS Low Power Mode can
    // report reduced-motion, which would hide the muted background video
    // entirely on most phones. Keep the muted loop; users who explicitly
    // request reduced motion still see the poster underneath until canplay.
    shouldDisableVideo,
    shouldLoad,
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
    DebugBanner,
  };
};

export default useVideoPlayer;
