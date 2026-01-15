import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Image imports
import storyBg from '@/assets/projects/story-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import mantraBg from '@/assets/projects/mantra-featured-bg.jpg';
import openledgerHero from '@/assets/campaigns/openledger-hero-official.png';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';
import bybitBg from '@/assets/projects/bybit-bg.jpg';
import bnbBg from '@/assets/projects/bnb-bg.jpg';

const SelectedWorkShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState<Record<number, boolean>>({});
  const ref = useRef(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      name: "Story Protocol",
      category: "IP Platform",
      result: "Korea #1",
      media: storyBg,
      video: "/videos/projects/story-hero.mp4",
      slug: "story-protocol"
    },
    {
      name: "MANTRA",
      category: "L1 Infrastructure",
      result: "500% Growth",
      media: mantraBg,
      video: "/videos/projects/mantra-hero.mp4",
      slug: "mantra"
    },
    {
      name: "peaq",
      category: "DePIN",
      result: "First Mover",
      media: peaqBg,
      video: "/videos/projects/peaq-hero.mp4",
      slug: "peaq"
    },
    {
      name: "BNB Chain",
      category: "Infrastructure",
      result: "+340% Volume",
      media: bnbBg,
      video: "/videos/projects/bnb-hero.mp4",
      slug: "bnb-chain"
    },
    {
      name: "Bybit",
      category: "Exchange",
      result: "#2 Traffic",
      media: bybitBg,
      video: "/videos/projects/bybit-hero.mp4",
      slug: "bybit"
    },
    {
      name: "FOGO",
      category: "L1 Chain",
      result: "Market Entry",
      media: storyBg,
      slug: "fogo"
    },
    {
      name: "OpenLedger",
      category: "Data Infra",
      result: "Market Entry",
      media: openledgerHero,
      slug: "openledger"
    }
  ];

  // Removed video preloading to improve initial page load speed
  // Videos will load on-demand when the section comes into view

  // Auto-rotate when not hovering
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering, projects.length]);

  const handleVideoLoad = (index: number) => {
    setVideoLoaded(prev => ({ ...prev, [index]: true }));
  };

  const currentProject = projects[activeIndex];
  const isCurrentVideoLoaded = videoLoaded[activeIndex];

  return (
    <section ref={ref} className="relative h-[80vh] md:h-screen bg-black overflow-hidden">
      {/* Videos load on-demand for better performance */}

      {/* Background Media */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Always show poster image first for instant feedback */}
          <img 
            src={currentProject.media} 
            alt={currentProject.name} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              currentProject.video && isCurrentVideoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
          
          {/* Video layer - lazy loaded */}
          {currentProject.video && (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              poster={typeof currentProject.media === 'string' ? currentProject.media : undefined}
              preload="none"
              onCanPlayThrough={() => handleVideoLoad(activeIndex)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isCurrentVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src={currentProject.video} type="video/mp4" />
            </video>
          )}
          
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content Grid */}
      <div className="relative z-10 h-full flex">
        {/* Left - Project List */}
        <div
          className="w-full lg:w-2/5 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-6 md:mb-8"
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
                  className="group block py-3 md:py-4 border-b border-white/10 hover:border-white/20 transition-colors"
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div className="flex items-center gap-4">
                    {/* Project Number */}
                    <span className={`text-xs font-mono w-6 transition-colors duration-300 ${activeIndex === i ? 'text-violet-400' : 'text-white/20'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    
                    {/* Project Name */}
                    <span className={`flex-1 text-lg md:text-2xl lg:text-3xl font-bold transition-colors duration-300 ${activeIndex === i ? 'text-white' : 'text-white/30'}`}>
                      {project.name}
                    </span>
                    
                    {/* Category - fixed width for alignment */}
                    <span className={`hidden md:block text-xs uppercase tracking-wider transition-colors duration-300 w-28 text-left ${activeIndex === i ? 'text-white/60' : 'text-white/20'}`}>
                      {project.category}
                    </span>
                    
                    {/* Arrow */}
                    <ArrowRight className={`w-4 h-4 transition-all duration-300 ${activeIndex === i ? 'text-white opacity-100 translate-x-0' : 'text-white/20 opacity-0 -translate-x-2'}`} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 lg:hidden"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-white border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>View Our Work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Right - About Content (Desktop) */}
        <div className="hidden lg:flex w-3/5 h-full items-center justify-end p-12 xl:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl text-right"
          >
            <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-6 md:mb-8 block">
              Our Mission
            </span>
            <h3 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-6">
              Real results, not just promises.
            </h3>
            <p className="text-white/50 text-sm md:text-lg xl:text-xl leading-relaxed mb-6">
              ium Labs bridges global Web3 projects with Korea's dynamic ecosystem. 'ium' Derived from the Korean word "to connect," we function as your foundational layer for market entry. We transcend standard marketing by leveraging proprietary analytics and data-driven research, providing the actionable insights needed to navigate and succeed in the Korean market.
            </p>
            <p className="text-violet-400 text-xs md:text-base xl:text-lg mb-10">
              Founded by former Binance & KuCoin executives
            </p>
            
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 text-lg xl:text-xl text-white border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>View Our Work</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorkShowcase;
