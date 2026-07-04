import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { appendVersion, hdVariant } from '@/hooks/useVideoPlayer';
// All project media uses video first-frame posters from /images/posters/

const projects = [
  {
    name: "BNB Chain",
    category: "Infrastructure",
    result: "2M+ Social Impressions",
    media: "/images/posters/bnb-hero-poster.jpg",
    video: "/videos/projects/bnb-hero.mp4",
    slug: "bnb-chain"
  },
  {
    name: "Aptos",
    category: "Layer 1",
    result: "Ecosystem Growth",
    media: "/images/posters/aptos-hero-poster.jpg",
    video: "/videos/projects/aptos-hero.mp4",
    slug: "aptos"
  },
  {
    name: "Sahara AI",
    category: "AI Infrastructure",
    result: "4.2M Impressions",
    media: "/images/posters/sahara-hero-poster.jpg",
    video: "/videos/projects/sahara-hero.mp4",
    slug: "sahara-ai"
  },
  {
    name: "MANTRA",
    category: "L1 Infrastructure",
    result: "500% Growth",
    media: "/images/posters/mantra-hero-poster.jpg",
    video: "/videos/projects/mantra-hero.mp4",
    slug: "mantra"
  },
  {
    name: "Bybit",
    category: "Exchange",
    result: "#2 Traffic",
    media: "/images/posters/bybit-hero-poster.jpg",
    video: "/videos/projects/bybit-hero.mp4",
    slug: "bybit"
  },
  {
    name: "Kite AI",
    category: "AI",
    result: "Market Entry",
    media: "/images/posters/kite-hero-poster.jpg",
    video: "/videos/projects/kite-hero.mp4",
    slug: "kite"
  }
];

// "How we work" manifesto, folded into this section so the operating-model
// claims stand right next to the proof (the work reel), instead of repeating
// as a separate section. Answers the Web3 CMO buyer criteria (embedded operator
// shop, not a do-everything agency).
const PRINCIPLES = [
  { n: "01", title: "Embedded, not spread thin", body: "One team that lives in your launch, not a junior juggling ten other accounts." },
  { n: "02", title: "Operators, not account managers", body: "Ex-exchange and ex-foundation people who run Korea BD every day." },
  { n: "03", title: "Research deeper than your interns", body: "Primary-sourced Korea intelligence and our own GTM Index." },
  { n: "04", title: "On the ground, at Web3 speed", body: "At the Seoul meetup on a Sunday night. Replies in hours." },
];

const BUFFER_RANGE = 2;
const MOBILE_VIDEO_MAX_ATTEMPTS = 24;
const MOBILE_VIDEO_RETRY_MS = 750;

/* ─── Mobile horizontal-scroll gallery (native touch swipe) ─── */
const MobileShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const visibleVideosRef = useRef<Set<number>>(new Set());
  const playAttemptsRef = useRef<Record<number, number>>({});
  const retryTimersRef = useRef<Record<number, ReturnType<typeof setTimeout> | null>>({});
  const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [readyVideos, setReadyVideos] = useState<Record<number, boolean>>({});

  const markReady = useCallback((index: number) => {
    setReadyVideos(prev => (prev[index] ? prev : { ...prev, [index]: true }));
  }, []);

  const setMobileVideoAttrs = useCallback((video: HTMLVideoElement) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.controls = false;
    video.disablePictureInPicture = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.setAttribute('x5-video-player-type', 'h5');
    video.removeAttribute('controls');
  }, []);

  const tryPlay = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (!video || !visibleVideosRef.current.has(index)) return;
    if (!video.paused && video.readyState >= 2) {
      markReady(index);
      return;
    }

    const attempts = playAttemptsRef.current[index] ?? 0;
    if (attempts >= MOBILE_VIDEO_MAX_ATTEMPTS) return;
    playAttemptsRef.current[index] = attempts + 1;
    setMobileVideoAttrs(video);

    video.play()
      .then(() => {
        if (video.readyState >= 2) markReady(index);
      })
      .catch(() => {
        if (!visibleVideosRef.current.has(index)) return;
        retryTimersRef.current[index] = setTimeout(() => tryPlay(index), MOBILE_VIDEO_RETRY_MS);
      });
  }, [markReady, setMobileVideoAttrs]);

  const refreshVisibleCards = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const root = scroller.getBoundingClientRect();
    const nextVisible = new Set<number>();
    const nextLoaded: Record<number, boolean> = {};
    projects.forEach((_, index) => {
      const card = cardRefs.current[index];
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const shouldLoad = rect.right >= root.left - 220 && rect.left <= root.right + 220;
      const isVisible = rect.right >= root.left + 12 && rect.left <= root.right - 12;
      if (shouldLoad) nextLoaded[index] = true;
      if (isVisible) nextVisible.add(index);
    });

    setLoadedVideos(prev => Object.keys(nextLoaded).some(key => !prev[Number(key)]) ? { ...prev, ...nextLoaded } : prev);
    visibleVideosRef.current.forEach(index => {
      if (!nextVisible.has(index)) {
        videoRefs.current[index]?.pause();
        if (retryTimersRef.current[index]) {
          clearTimeout(retryTimersRef.current[index]!);
          retryTimersRef.current[index] = null;
        }
      }
    });
    visibleVideosRef.current = nextVisible;
    nextVisible.forEach(index => tryPlay(index));
  }, [tryPlay]);

  // Mobile in-app browsers can show a native play overlay when autoplay is blocked.
  // Only load near-visible cards and keep the poster until playback has really started.
  useEffect(() => {
    const vids = Object.entries(videoRefs.current).filter((entry): entry is [string, HTMLVideoElement] => Boolean(entry[1]));
    vids.forEach(([index, v]) => {
      setMobileVideoAttrs(v);
      v.dataset.index = index;
    });
    refreshVisibleCards();

    const kick = () => {
      visibleVideosRef.current.forEach(index => {
        playAttemptsRef.current[index] = 0;
        tryPlay(index);
      });
    };

    const events = ["touchstart", "touchmove", "scroll", "visibilitychange", "pageshow", "focus"] as const;
    events.forEach((e) => window.addEventListener(e, kick, { passive: true }));
    const scroller = scrollRef.current;
    scroller?.addEventListener('scroll', refreshVisibleCards, { passive: true });
    window.addEventListener('resize', refreshVisibleCards, { passive: true });

    return () => {
      Object.values(retryTimersRef.current).forEach(timer => timer && clearTimeout(timer));
      events.forEach((e) => window.removeEventListener(e, kick));
      scroller?.removeEventListener('scroll', refreshVisibleCards);
      window.removeEventListener('resize', refreshVisibleCards);
    };
  }, [loadedVideos, refreshVisibleCards, setMobileVideoAttrs, tryPlay]);

  return (
    <section ref={ref} className="relative bg-black py-12">
      {/* How we work — manifesto first, work below */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="px-4 mb-10 text-center"
      >
        <span className="text-[10px] text-white/45 tracking-[0.4em] uppercase block mb-4">How we work</span>
        <h3 className="text-2xl font-extrabold text-white tracking-[-0.02em] leading-[1.08] mb-6">
          The do-everything agency is dead.{" "}
          <span className="text-primary">We work like the team you&apos;d hire.</span>
        </h3>
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 text-left">
          {PRINCIPLES.map((p) => (
            <div key={p.n}>
              <span className="font-mono text-[10px] text-primary/70">{p.n}</span>
              <h4 className="mt-1 text-[13px] font-bold text-white tracking-[-0.01em] leading-snug">{p.title}</h4>
              <p className="mt-1 text-[11px] text-white/50 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Selected Work header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="px-4 mb-5"
      >
        <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">
          Selected Work
        </span>
      </motion.div>

      {/* Horizontal scroll container */}
      <div ref={scrollRef} className="overflow-x-auto scrollbar-hide -mx-0">
        <div className="flex gap-3 px-4" style={{ width: `${projects.length * 72 + 25}vw` }}>
          {projects.map((project, i) => (
            <motion.div
              ref={(el) => { cardRefs.current[i] = el; }}
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.04 }}
              className="flex-shrink-0"
              style={{ width: '70vw', height: '55vh', minHeight: '320px' }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group relative block w-full h-full rounded-xl overflow-hidden"
              >
                {project.video ? (
                  <>
                    <img
                      src={project.media}
                      alt={project.name}
                      loading={i <= 2 ? "eager" : "lazy"}
                      decoding="async"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        readyVideos[i] ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    {loadedVideos[i] && (
                      <video
                        ref={(el) => { videoRefs.current[i] = el; }}
                        data-index={i}
                        muted
                        loop
                        playsInline
                        autoPlay={i === 0}
                        preload={i <= 1 ? "auto" : "metadata"}
                        poster={project.media}
                        controls={false}
                        disablePictureInPicture
                        aria-hidden="true"
                        tabIndex={-1}
                        onPlaying={() => markReady(i)}
                        onTimeUpdate={(e) => {
                          if (e.currentTarget.currentTime > 0.02) markReady(i);
                        }}
                        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${
                          readyVideos[i] ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <source src={`${appendVersion(project.video)}#t=0.001`} type="video/mp4" />
                      </video>
                    )}
                  </>
                ) : (
                  <img
                    src={project.media}
                    alt={project.name}
                    loading={i <= 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[9px] text-white/45 uppercase tracking-[0.15em] block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-white mb-0.5 tracking-[-0.02em] leading-[1.05]">
                    {project.name}
                  </h3>
                  <span className="text-[13px] text-primary font-medium">
                    {project.result}
                  </span>
                  <div className="flex items-center gap-1.5 mt-2.5 text-white/45 text-[11px]">
                    <span>View case</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* View All CTA */}
          <div className="flex-shrink-0 flex items-center justify-center" style={{ width: '50vw', height: '55vh', minHeight: '320px' }}>
            <Link
              to="/projects"
              className="flex flex-col items-center gap-3 text-white/35"
            >
              <span className="text-base font-semibold">View All</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Desktop layout (used for all viewports) ─── */
const DesktopShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [videoReady, setVideoReady] = useState<Record<number, boolean>>({});
  const [loadedSet, setLoadedSet] = useState<Set<number>>(new Set());
  const ref = useRef(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const isInView = useInView(ref, { once: true, margin: "400px" });
  const isMobile = useIsMobile();

  const getMountedIndices = useCallback((current: number) => {
    const indices = new Set<number>();
    for (let offset = -BUFFER_RANGE; offset <= BUFFER_RANGE; offset++) {
      const idx = (current + offset + projects.length) % projects.length;
      if (projects[idx].video) indices.add(idx);
    }
    loadedSet.forEach(idx => indices.add(idx));
    return indices;
  }, [loadedSet]);

  const mountedIndices = getMountedIndices(activeIndex);

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([idxStr, video]) => {
      if (!video) return;
      const idx = Number(idxStr);
      if (idx === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  // iOS Safari: retry play on first user interaction
  useEffect(() => {
    if (!isMobile) return;
    const tryPlay = () => {
      const video = videoRefs.current[activeIndex];
      if (video && video.paused) video.play().catch(() => {});
    };
    const events = ['touchstart', 'click', 'scroll'] as const;
    events.forEach(e => document.addEventListener(e, tryPlay, { once: true, passive: true }));
    return () => { events.forEach(e => document.removeEventListener(e, tryPlay)); };
  }, [isMobile, activeIndex]);

  useEffect(() => {
    if (isHovering || !isInView) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering, isInView]);

  const handleVideoReady = (index: number) => {
    setVideoReady(prev => ({ ...prev, [index]: true }));
    setLoadedSet(prev => new Set(prev).add(index));
  };


  return (
    <section ref={ref} className="relative bg-black overflow-hidden h-[90vh] min-h-[660px]">
      {projects.map((project, i) => {
        const isActive = i === activeIndex;
        const shouldMountVideo = mountedIndices.has(i);
        const isVideoReady = videoReady[i];

        return (
          <div
            key={project.slug}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1 : 0 }}
          >
            <img
              src={project.media}
              alt={project.name}
              loading={Math.abs(i - activeIndex) <= BUFFER_RANGE ? "eager" : "lazy"}
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                project.video && isActive && isVideoReady ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {project.video && shouldMountVideo && (
              <video
                ref={el => { videoRefs.current[i] = el; }}
                muted
                loop
                playsInline
                autoPlay
                preload={Math.abs(((i - activeIndex + projects.length) % projects.length)) <= 1 ? "auto" : "metadata"}
                onLoadedData={() => handleVideoReady(i)}
                onCanPlayThrough={() => handleVideoReady(i)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isActive && isVideoReady ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <source src={`${hdVariant(project.video)}#t=0.001`} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        );
      })}

      {/* Readability scrims: light center darkening for the manifesto (the slide
          already carries a bg-black/50), heavier bottom band for the work strip.
          Kept light so the footage reel still reads behind the text. */}
      <div className="absolute inset-0 z-[5] pointer-events-none" style={{ background: "radial-gradient(120% 95% at 50% 45%, rgba(0,0,0,0.12), rgba(0,0,0,0.42) 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 z-[5] pointer-events-none bg-gradient-to-t from-black/85 to-transparent" />

      <div className="relative z-10 h-full flex flex-col">
        {/* CENTER — how we work manifesto */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-5 lg:px-10 pt-16 pb-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[10px] text-white/45 tracking-[0.4em] uppercase mb-6"
          >
            How we work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-4xl font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-[-0.03em] leading-[1.02] text-white"
          >
            The do-everything agency is dead.{" "}
            <span className="text-primary">We work like the team you&apos;d hire.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 max-w-5xl w-full"
          >
            {PRINCIPLES.map((p) => (
              <div key={p.n} className="text-center">
                <span className="font-mono text-[11px] text-primary/70">{p.n}</span>
                <h4 className="mt-2.5 text-sm lg:text-base font-bold text-white tracking-[-0.01em] leading-snug">{p.title}</h4>
                <p className="mt-1.5 text-[12px] lg:text-[13px] text-white/55 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM — selected work, a filmstrip that switches the backdrop */}
        <div
          className="border-t border-white/10 px-5 lg:px-10 pt-4 pb-5 lg:pb-6"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Selected Work</span>
            <Link to="/projects" className="group inline-flex items-center gap-1.5 text-xs text-white/45 hover:text-white transition-colors">
              View All <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={(e) => { if (isMobile && activeIndex !== i) { e.preventDefault(); setActiveIndex(i); } }}
                className={`group flex-1 min-w-[128px] pt-3 border-t-2 transition-colors duration-200 ${activeIndex === i ? 'border-primary' : 'border-white/12 hover:border-white/35'}`}
              >
                <div className="flex items-baseline gap-2">
                  <span className={`font-mono text-[10px] transition-colors ${activeIndex === i ? 'text-primary' : 'text-white/30'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`font-display text-sm lg:text-base font-extrabold tracking-[-0.02em] leading-tight transition-colors ${activeIndex === i ? 'text-white' : 'text-white/55 group-hover:text-white'}`}>{project.name}</span>
                </div>
                <span className="mt-1 block text-[9px] lg:text-[10px] uppercase tracking-wider text-white/30">{project.category}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SelectedWorkShowcase = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileShowcase /> : <DesktopShowcase />;
};

export default SelectedWorkShowcase;
