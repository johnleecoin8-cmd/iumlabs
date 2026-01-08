import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

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
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const projects = [{
    name: "Story Protocol",
    category: "IP Platform",
    result: "Korea #1",
    media: storyBg,
    video: "/videos/projects/story-hero.mp4",
    slug: "story-protocol"
  }, {
    name: "MANTRA",
    category: "L1 Infrastructure",
    result: "500% Growth",
    media: mantraBg,
    video: "/videos/projects/mantra-hero.mp4",
    slug: "mantra"
  }, {
    name: "Bybit",
    category: "Exchange",
    result: "#2 Traffic",
    media: bybitBg,
    video: "/videos/projects/bybit-hero.mp4",
    slug: "bybit"
  }, {
    name: "BNB Chain",
    category: "Infrastructure",
    result: "+340% Volume",
    media: bnbBg,
    video: "/videos/projects/bnb-hero.mp4",
    slug: "bnb-chain"
  }, {
    name: "peaq",
    category: "DePIN Entry",
    result: "First Branding",
    media: peaqBg,
    video: "/videos/projects/peaq-hero.mp4",
    slug: "peaq"
  }, {
    name: "Sahara AI",
    category: "AI × Blockchain",
    result: "Community Built",
    media: saharaAiBg,
    video: "/videos/projects/sahara-hero.mp4",
    slug: "sahara-ai"
  }, {
    name: "KuCoin",
    category: "Exchange Campaign",
    result: "Top Engagement",
    media: kucoinBg,
    video: "/videos/projects/kucoin-hero.mp4",
    slug: "kucoin"
  }, {
    name: "OpenLedger",
    category: "Data Infrastructure",
    result: "Market Entry",
    media: openledgerHero,
    slug: "openledger"
  }];

  // Auto-rotate when not hovering
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering, projects.length]);
  return <section ref={ref} className="relative h-[80vh] md:h-screen bg-black overflow-hidden">
      {/* Background Media */}
      <AnimatePresence mode="wait">
        <motion.div key={activeIndex} initial={{
        opacity: 0,
        scale: 1.1
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.7
      }} className="absolute inset-0">
          {projects[activeIndex].video ? <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src={projects[activeIndex].video} type="video/mp4" />
            </video> : <img src={projects[activeIndex].media} alt={projects[activeIndex].name} className="w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content Grid */}
      <div className="relative z-10 h-full flex">
        {/* Left - Project List */}
        <div className="w-full lg:w-2/5 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <motion.span initial={{
          opacity: 0
        }} animate={isInView ? {
          opacity: 1
        } : {}} className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-6 md:mb-8">
            Selected Work
          </motion.span>

          <div className="space-y-0">
            {projects.map((project, i) => <motion.div key={project.slug} initial={{
            opacity: 0,
            x: -30
          }} animate={isInView ? {
            opacity: 1,
            x: 0
          } : {}} transition={{
            delay: i * 0.1
          }}>
                <Link to={`/projects/${project.slug}`} className="group block py-3 md:py-4 border-b border-white/10" onMouseEnter={() => setActiveIndex(i)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-3 md:gap-4">
                      <span className={`text-xl md:text-3xl lg:text-4xl font-black transition-colors duration-300 ${activeIndex === i ? 'text-white' : 'text-white/30'}`}>
                        {project.name}
                      </span>
                      <span className={`hidden md:block text-xs transition-colors duration-300 ${activeIndex === i ? 'text-violet-400' : 'text-white/20'}`}>
                        {project.category}
                      </span>
                    </div>
                    <motion.svg className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${activeIndex === i ? 'text-white opacity-100 translate-x-0' : 'text-white/20 opacity-0 -translate-x-4'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </div>
                </Link>
              </motion.div>)}
          </div>

          
        </div>

        {/* Right - About Content (Desktop) */}
        <div className="hidden lg:flex w-3/5 h-full items-center justify-end p-12 xl:p-16">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="max-w-3xl text-right">
            <h3 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-6 whitespace-nowrap">
              Real results, not just promises.
            </h3>
            <p className="text-white/70 text-lg xl:text-xl leading-relaxed mb-6">
              ium Labs bridges global Web3 projects with Korea's dynamic ecosystem. 
              Derived from the Korean word "to connect," we function as your foundational 
              layer for market entry. We transcend standard marketing by leveraging 
              proprietary analytics and data-driven research, providing the actionable 
              insights needed to navigate and succeed in the Korean market.
            </p>
            <p className="text-violet-400 text-base xl:text-lg mb-10">
              Founded by former Binance & KuCoin executives
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-10 mb-10">
              <div className="text-right">
                <div className="text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white">340%</div>
                <div className="text-sm xl:text-base text-white/50 mt-2">Avg. Volume</div>
              </div>
              
            </div>
            
            <Link to="/projects" className="inline-flex items-center gap-3 text-lg xl:text-xl text-white border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300">
              <span>View Our Work</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default SelectedWorkShowcase;