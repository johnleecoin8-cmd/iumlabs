import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
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

const BUFFER_RANGE = 2;

/* ─── Mobile horizontal-scroll gallery (native touch swipe) ─── */
const MobileShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  return (
    <section ref={ref} className="relative bg-black py-10">
      {/* Header */}
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
      <div className="overflow-x-auto scrollbar-hide -mx-0">
        <div className="flex gap-3 px-4" style={{ width: `${projects.length * 72 + 25}vw` }}>
          {projects.map((project, i) => (
            <motion.div
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
                <img
                  src={project.media}
                  alt={project.name}
                  loading={i <= 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {project.video && (
                  <video
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload={i <= 1 ? "auto" : "none"}
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[9px] text-white/45 uppercase tracking-[0.15em] block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-0.5 tracking-tight">
                    {project.name}
                  </h3>
                  <span className="text-[13px] text-violet-400 font-medium">
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
    if (isMobile) return; // Don't play videos on mobile to avoid resource overload
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
  }, [activeIndex, isMobile]);

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
    <section ref={ref} className="relative bg-black overflow-hidden h-[80vh] lg:h-[90vh]">
      {projects.map((project, i) => {
        const isActive = i === activeIndex;
        const shouldMountVideo = !isMobile && mountedIndices.has(i);
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
                project.video && isActive && isVideoReady && !isMobile ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {project.video && shouldMountVideo && (
              <video
                ref={el => { videoRefs.current[i] = el; }}
                muted
                loop
                playsInline
                preload={Math.abs(((i - activeIndex + projects.length) % projects.length)) <= 1 ? "auto" : "metadata"}
                onCanPlayThrough={() => handleVideoReady(i)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isActive && isVideoReady ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <source src={project.video} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        );
      })}

      <div className="relative z-10 h-full flex flex-col lg:flex-row">
        <div
          className="w-full lg:w-2/5 h-full flex flex-col justify-center px-5 py-6 lg:px-12 lg:py-0 lg:px-16"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-8"
          >
            Selected Work
          </motion.span>

          <div className="space-y-0">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block py-3 sm:py-4 border-b border-white/10 hover:border-white/20 transition-colors"
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={(e) => { if (isMobile && activeIndex !== i) { e.preventDefault(); setActiveIndex(i); } }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className={`text-[10px] sm:text-xs font-mono w-5 sm:w-6 transition-colors duration-300 ${activeIndex === i ? 'text-violet-400' : 'text-white/20'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`flex-1 text-base sm:text-2xl lg:text-3xl font-bold transition-colors duration-300 ${activeIndex === i ? 'text-white' : 'text-white/30'}`}>
                      {project.name}
                    </span>
                    <span className={`text-[10px] lg:text-xs uppercase tracking-wider transition-colors duration-300 text-left ${activeIndex === i ? 'text-white/50' : 'text-white/15'}`}>
                      {project.category}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${activeIndex === i ? 'text-white opacity-100 translate-x-0' : 'text-white/20 opacity-0 -translate-x-2'}`} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile mission + CTA */}
          <div className="lg:hidden mt-6 pt-5 border-t border-white/[0.08]">
            <p className="text-[13px] text-white/35 leading-relaxed mb-4">
              Former Binance, KuCoin, Upbit operators. We engineer your Korea market entry.
            </p>
            <Link to="/projects" className="inline-flex items-center gap-2 text-[12px] font-medium text-violet-400">
              View Our Work <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Right panel — clean text only */}
        <div className="hidden lg:flex absolute bottom-0 right-0 top-0 w-[50%] z-10 flex-col justify-center p-10 xl:p-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-lg ml-auto"
          >
            <span className="text-[10px] text-white/30 tracking-[0.4em] uppercase mb-5 block text-right">Our Mission</span>
            <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold mb-4 text-right leading-tight">
              <span className="bg-gradient-to-r from-[#b48cde] via-[#a78bfa] to-[#c084fc] bg-clip-text text-transparent">Real Results.<br />No Recycled Playbooks.</span>
            </h3>
            <p className="text-white/40 text-sm xl:text-base leading-relaxed mb-8 text-right">
              With a team from Binance, KuCoin, and Upbit, we engineer your success using the same logic that global exchanges and top-tier retail investors demand.
            </p>
            <div className="flex justify-end">
              <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors border border-white/15 hover:border-white/30 rounded-full px-6 py-2.5">
                View Our Work <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SelectedWorkShowcase = () => {
  return <DesktopShowcase />;
};

export default SelectedWorkShowcase;
