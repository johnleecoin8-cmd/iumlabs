import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import PerformanceSection from '@/components/gtm/PerformanceSection';
import AuthoritySection from '@/components/gtm/AuthoritySection';
import MobileCTAButton from '@/components/gtm/MobileCTAButton';
import ServiceSchema from '@/components/ServiceSchema';
import GTMContactFormSection from '@/components/gtm/GTMContactFormSection';
import CTABannerSection from '@/components/CTABannerSection';
import FooterLinksSection from '@/components/FooterLinksSection';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Building, Zap, TrendingUp, Users, DollarSign, BarChart3, Trophy, Cpu, Database, Activity, LineChart, Target, Sparkles } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import TestimonialsSection from '@/components/gtm/TestimonialsCarousel';
import { Button } from '@/components/ui/button';

// Project backgrounds
import storyBg from '@/assets/projects/story-bg.jpg';
import mantraBg from '@/assets/projects/mantra-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import bnbBg from '@/assets/projects/bnb-bg.jpg';
import saharaBg from '@/assets/projects/sahara-ai-bg.jpg';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';
import bybitBg from '@/assets/projects/bybit-bg.jpg';
import openledgerBg from '@/assets/campaigns/openledger-hero-official.png';
import megaethBg from '@/assets/projects/megaeth-bg.jpg';
import ondoBg from '@/assets/projects/ondo-bg.jpg';
import polygonBg from '@/assets/projects/polygon-bg.jpg';
import triaBg from '@/assets/projects/tria-bg.jpg';
import synfuturesBg from '@/assets/projects/synfutures-bg.jpg';
import fogoBg from '@/assets/projects/fogo-bg.jpg';

// ============================================
// DATA
// ============================================
const featuredProjects = [{
  name: 'Polygon',
  tagline: 'Ecosystem Bootstrapping',
  result: '$2M TVL Generated in 30 Days',
  image: polygonBg,
  slug: 'polygon',
  category: 'INFRASTRUCTURE',
  strategy: 'Strategic DeFi partnerships & developer incentive programs',
  descEn: 'Executed a developer-focused GTM strategy that accelerated TVL growth and dApp deployment across the ecosystem.',
  metrics: [{
    label: 'TVL Generated',
    value: 2,
    prefix: '$',
    suffix: 'M'
  }, {
    label: 'Timeline',
    value: 30,
    suffix: ' Days'
  }]
}, {
  name: 'BNB Chain',
  tagline: 'Volume Engineering',
  result: '+340% Trading Volume Growth',
  image: bnbBg,
  slug: 'bnb-chain',
  category: 'EXCHANGE ECOSYSTEM',
  strategy: 'Localized trading competitions & community airdrops',
  descEn: 'Revitalized the Korean trading ecosystem through strategic community campaigns and exchange partnerships.',
  metrics: [{
    label: 'Volume Growth',
    value: 340,
    prefix: '+',
    suffix: '%'
  }, {
    label: 'Community Activation',
    value: 100,
    suffix: '%'
  }]
}, {
  name: 'Story Protocol',
  tagline: 'Narrative Domination',
  result: '5K+ Korean Creators Onboarded',
  image: storyBg,
  slug: 'story-protocol',
  category: 'IP & NARRATIVE',
  strategy: 'Narrative localization & hands-on creator workshops',
  descEn: 'Transformed a complex IP protocol into Korea\'s leading Web3 narrative through targeted creator education.',
  metrics: [{
    label: 'Creators Onboarded',
    value: 5,
    suffix: 'K+'
  }, {
    label: 'Market Dominance',
    value: 1,
    prefix: '#'
  }]
}, {
  name: 'Bybit',
  tagline: 'Traffic Acceleration',
  result: '#2 Korean Traffic Ranking',
  image: bybitBg,
  slug: 'bybit',
  category: 'USER ACQUISITION',
  strategy: 'Performance-driven SEO & KOL funnel optimization',
  descEn: 'Captured the #2 position in Korean exchange traffic through data-driven performance marketing.',
  metrics: [{
    label: 'Traffic Ranking',
    value: 2,
    prefix: '#'
  }, {
    label: 'SEO Performance',
    value: 95,
    suffix: '%'
  }]
}];
const moreProjects = [{
  name: 'BNB Chain',
  image: bnbBg,
  slug: 'bnb-chain'
}, {
  name: 'Bybit',
  image: bybitBg,
  slug: 'bybit'
}, {
  name: 'KuCoin',
  image: kucoinBg,
  slug: 'kucoin'
}, {
  name: 'Sahara AI',
  image: saharaBg,
  slug: 'sahara-ai'
}, {
  name: 'OpenLedger',
  image: openledgerBg,
  slug: 'openledger'
}, {
  name: 'MegaETH',
  image: megaethBg,
  slug: 'megaeth'
}, {
  name: 'Ondo',
  image: ondoBg,
  slug: 'ondo'
}, {
  name: 'Polygon',
  image: polygonBg,
  slug: 'polygon'
}, {
  name: 'Tria',
  image: triaBg,
  slug: 'tria'
}];
const frameworkStages = [{
  number: '01',
  title: 'ANALYZE',
  subtitle: 'Intelligence',
  items: ['Competitor Share-of-Voice (SOV) Analysis', 'On-chain Behavior & Wallet Profiling', 'Market Opportunity & Gap Mapping'],
  quote: '"Every strategy begins with deep market intelligence."',
  icon: Search
}, {
  number: '02',
  title: 'BUILD',
  subtitle: 'Foundation',
  items: ['Korea-Fit Narrative & Identity Design', 'Local Ecosystem Integration (Naver/Kakao)', '24/7 Community Infrastructure Setup'],
  quote: '"We rebuild your presence to connect authentically."',
  icon: Building
}, {
  number: '03',
  title: 'IGNITE',
  subtitle: 'Launch',
  items: ['Tier-1 Media Coverage (BlockMedia, CoinNess)', 'Verified KOL & Alpha Community Deployment', 'Coordinated Viral Marketing Campaigns'],
  quote: '"All channels fire simultaneously for maximum impact."',
  icon: Zap
}, {
  number: '04',
  title: 'SCALE',
  subtitle: 'Growth',
  items: ['Exchange Liquidity & Tokenomics Support', 'Strategic Partnerships & Offline Activations', 'User Retention & DApp Engagement Programs'],
  quote: '"Turning initial hype into sustainable retention."',
  icon: TrendingUp
}];

// ============================================
// ANIMATED STAT COMPONENT
// ============================================
const AnimatedStat = ({
  value,
  suffix = '',
  prefix = '',
  label,
  delay = 0,
  isVisible = true
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
  isVisible?: boolean;
}) => {
  const count = useCountUp({
    end: value,
    delay: delay * 1000,
    isVisible,
    duration: 2000
  });
  return <div className="text-center group">
      <motion.p className="text-4xl md:text-5xl lg:text-6xl font-medium bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent" initial={{
      opacity: 0,
      scale: 0.5
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      delay: delay,
      duration: 0.5,
      type: "spring"
    }}>
        {prefix}{count}{suffix}
      </motion.p>
      <p className="text-xs text-muted-foreground mt-2 tracking-wider uppercase">{label}</p>
    </div>;
};

// ============================================
// FLOATING 3D GRAPHIC ELEMENTS
// ============================================
const FloatingGraphics = () => {
  return <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating orb 1 */}
      <motion.div className="absolute top-1/4 right-[15%] w-32 h-32 rounded-full opacity-30" style={{
      background: 'radial-gradient(circle at 30% 30%, hsl(var(--primary)), transparent 70%)',
      filter: 'blur(40px)'
    }} animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1]
    }} transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }} />
      
      {/* Floating orb 2 */}
      <motion.div className="absolute bottom-1/3 right-[25%] w-48 h-48 rounded-full opacity-20" style={{
      background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.5), transparent 60%)',
      filter: 'blur(60px)'
    }} animate={{
      y: [0, 40, 0],
      x: [0, -20, 0]
    }} transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
      backgroundSize: '60px 60px'
    }} />

      {/* Animated line */}
      <motion.div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" initial={{
      scaleX: 0,
      opacity: 0
    }} animate={{
      scaleX: 1,
      opacity: 1
    }} transition={{
      duration: 1.5,
      delay: 0.5
    }} />
    </div>;
};

// ============================================
// GLITCH TEXT EFFECT
// ============================================
const GlitchText = ({
  children,
  className = ''
}: {
  children: string;
  className?: string;
}) => {
  return <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span className="absolute top-0 left-0 text-primary opacity-70 z-0" style={{
      clipPath: 'inset(0 0 50% 0)'
    }} animate={{
      x: [0, -2, 2, 0],
      opacity: [0.7, 0.5, 0.8, 0.7]
    }} transition={{
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 3
    }}>
        {children}
      </motion.span>
      <motion.span className="absolute top-0 left-0 text-cyan-400 opacity-50 z-0" style={{
      clipPath: 'inset(50% 0 0 0)'
    }} animate={{
      x: [0, 2, -2, 0],
      opacity: [0.5, 0.3, 0.6, 0.5]
    }} transition={{
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 3,
      delay: 0.1
    }}>
        {children}
      </motion.span>
    </span>;
};

// ============================================
// HERO SECTION - Enhanced with Interactive Showcase
// ============================================
const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true
  });
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  
  // Interactive showcase state
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Showcase projects data - only projects with videos
  const showcaseProjects = [
    { 
      name: 'BNB Chain', 
      result: '+340%', 
      category: 'Exchange',
      description: 'Volume Growth',
      image: bnbBg,
      video: '/videos/projects/bnb-hero.mp4',
      slug: 'bnb-chain'
    },
    { 
      name: 'Story Protocol', 
      result: '5K+', 
      category: 'IP Platform',
      description: 'Creators Onboarded',
      image: storyBg,
      video: '/videos/projects/story-hero.mp4',
      slug: 'story-protocol'
    },
    { 
      name: 'Bybit', 
      result: '#2', 
      category: 'Exchange',
      description: 'Traffic Ranking',
      image: bybitBg,
      video: '/videos/projects/bybit-hero.mp4',
      slug: 'bybit'
    },
    { 
      name: 'MANTRA', 
      result: '200K+', 
      category: 'RWA',
      description: 'Community Members',
      image: mantraBg,
      video: '/videos/projects/mantra-hero.mp4',
      slug: 'mantra'
    },
    { 
      name: 'peaq', 
      result: '50+', 
      category: 'DePIN',
      description: 'Media Coverage',
      image: peaqBg,
      video: '/videos/projects/peaq-hero.mp4',
      slug: 'peaq'
    },
    { 
      name: 'Sahara AI', 
      result: '#1', 
      category: 'AI',
      description: 'Mindshare Ranking',
      image: saharaBg,
      video: '/videos/projects/sahara-hero.mp4',
      slug: 'sahara-ai'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate showcase
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseProjects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering, showcaseProjects.length]);

  return <section ref={ref} className="relative min-h-screen flex flex-col justify-center px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-24 bg-background overflow-hidden w-full">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />
      
      {/* Subtle radial glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Floating graphics */}
      <FloatingGraphics />
      
      {/* Mouse follow glow */}
      <motion.div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none" style={{
      background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
      left: `calc(${mousePosition.x * 100}% - 250px)`,
      top: `calc(${mousePosition.y * 100}% - 250px)`
    }} animate={{
      scale: [1, 1.1, 1]
    }} transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }} />

      {/* 2-Column Layout - 6:4 ratio */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 xl:gap-16 items-center w-full max-w-[1600px] mx-auto">
        
        {/* Left Column - Text Content */}
        <div className="relative">
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-muted-foreground text-sm tracking-widest uppercase mb-6 flex items-center gap-3">
            <motion.span className="w-8 h-px bg-primary" initial={{
            scaleX: 0
          }} animate={{
            scaleX: 1
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} />
            Korea GTM Strategy
          </motion.p>
          
          <motion.h1 initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.1
        }} className="text-[clamp(1.75rem,5vw,4rem)] font-medium leading-[1.1] tracking-tight text-foreground mb-4 md:mb-6">
            <span className="block overflow-hidden">
              <motion.span className="block" initial={{
              y: '100%'
            }} animate={{
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.33, 1, 0.68, 1]
            }}>
                <GlitchText className="text-primary">"The Gateway to Korea"</GlitchText>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block text-foreground/80" initial={{
              y: '100%'
            }} animate={{
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.33, 1, 0.68, 1]
            }}>
                Your Strategic Bridge to the Korean Ecosystem.
              </motion.span>
            </span>
          </motion.h1>

          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.5
        }} className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-lg leading-relaxed">
            The #2 global crypto market by volume. 4x faster trading velocity. A retail-driven ecosystem where projects build their strongest foundations.
          </motion.p>

          {/* Stats Row */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.7
        }} className="flex flex-row items-center gap-4 md:gap-10">
            <div className="text-center group">
              <motion.p className="text-2xl md:text-4xl font-medium bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent" initial={{
                opacity: 0,
                scale: 0.5
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: 0.8,
                duration: 0.5,
                type: "spring"
              }}>
                #2
              </motion.p>
              <p className="text-[11px] md:text-xs text-muted-foreground mt-1 tracking-wider uppercase">Global Volume</p>
            </div>
            <div className="w-px h-6 md:h-10 bg-gradient-to-b from-transparent via-border to-transparent" />
            <div className="text-center group">
              <motion.p className="text-2xl md:text-4xl font-medium bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent" initial={{
                opacity: 0,
                scale: 0.5
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: 1.0,
                duration: 0.5,
                type: "spring"
              }}>
                4x
              </motion.p>
              <p className="text-[11px] md:text-xs text-muted-foreground mt-1 tracking-wider uppercase">Velocity</p>
            </div>
            <div className="w-px h-6 md:h-10 bg-gradient-to-b from-transparent via-border to-transparent" />
            <div className="text-center group">
              <motion.p className="text-2xl md:text-4xl font-medium bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent" initial={{
                opacity: 0,
                scale: 0.5
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: 1.2,
                duration: 0.5,
                type: "spring"
              }}>
                100%
              </motion.p>
              <p className="text-[11px] md:text-xs text-muted-foreground mt-1 tracking-wider uppercase">Retail-Driven</p>
            </div>
          </motion.div>

        </div>

        {/* Right Column - Interactive Project Showcase (Now visible on all screens) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Media Container */}
          <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] overflow-hidden border border-border/30">
            {/* Background Video/Image with Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0"
              >
                {/* Video if available, otherwise image */}
                {showcaseProjects[activeIndex].video ? (
                  <video
                    key={showcaseProjects[activeIndex].video}
                    src={showcaseProjects[activeIndex].video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={showcaseProjects[activeIndex].image} 
                    alt={showcaseProjects[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Category */}
                  <span className="text-[10px] text-primary tracking-widest uppercase mb-2 md:mb-3 block">
                    {showcaseProjects[activeIndex].category}
                  </span>
                  
                  {/* Project name */}
                  <Link 
                    to={`/projects/${showcaseProjects[activeIndex].slug}`}
                    className="inline-flex items-center gap-2 text-xl md:text-2xl text-foreground font-medium hover:text-primary transition-colors group"
                  >
                    {showcaseProjects[activeIndex].name}
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 border-t border-r border-primary/30" />
            <div className="absolute bottom-0 left-0 w-12 h-12 md:w-20 md:h-20 border-b border-l border-primary/30" />
          </div>

          {/* Project Selector Bar - 6x1 Compact */}
          <div className="flex mt-2 md:mt-3 border border-border/30">
            {showcaseProjects.map((project, index) => (
              <motion.button
                key={project.slug}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`flex-1 py-2.5 md:py-2 px-1 md:px-2 relative transition-all duration-300 border-r border-border/30 last:border-r-0 min-h-[44px] ${
                  activeIndex === index 
                    ? 'bg-primary/10' 
                    : 'bg-transparent hover:bg-muted/50'
                }`}
              >
                {/* Index number */}
                <span className={`text-[10px] md:text-[10px] font-mono block transition-colors ${
                  activeIndex === index ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  0{index + 1}
                </span>
                
                {/* Project name */}
                <span className={`text-[11px] md:text-xs font-medium block truncate transition-colors ${
                  activeIndex === index ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {project.name}
                </span>

                {/* Active indicator line */}
                {activeIndex === index && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-3 md:mt-4 text-right"
          >
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              View all projects
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - Hidden on mobile for more space */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }} 
        className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-3"
      >
        <motion.span 
          className="text-sm text-muted-foreground tracking-[0.3em] uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div 
          className="w-8 h-14 border-2 border-primary/50 rounded-full flex items-start justify-center p-2"
          animate={{ 
            borderColor: ['hsl(var(--primary) / 0.3)', 'hsl(var(--primary) / 0.8)', 'hsl(var(--primary) / 0.3)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-primary rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>;
};

// ============================================
// ANIMATED PROGRESS BAR
// ============================================
const AnimatedProgressBar = ({
  label,
  percentage,
  value,
  delay = 0,
  isHighlight = false,
  isVisible = true
}: {
  label: string;
  percentage: number;
  value: string;
  delay?: number;
  isHighlight?: boolean;
  isVisible?: boolean;
}) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setWidth(percentage), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage, delay]);
  return <div className="space-y-2 md:space-y-2">
      <div className="flex justify-between items-center">
        <span className={`text-xs md:text-sm font-medium ${isHighlight ? 'text-primary' : 'text-foreground/80'}`}>
          {label}
        </span>
        <span className={`text-xs md:text-sm font-mono ${isHighlight ? 'text-primary' : 'text-muted-foreground'}`}>
          {value}
        </span>
      </div>
      <div className="h-3 md:h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className={`h-full rounded-full ${isHighlight ? 'bg-primary' : 'bg-foreground/30'}`} initial={{
        width: 0
      }} animate={{
        width: `${width}%`
      }} transition={{
        duration: 1,
        ease: "easeOut",
        delay: delay
      }} />
      </div>
    </div>;
};

// ============================================
// KOREA MAP SVG COMPONENT
// ============================================
const KoreaMapVisualization = ({
  isVisible
}: {
  isVisible: boolean;
}) => {
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const dataPoints = [{
    id: 0,
    x: 65,
    y: 25,
    city: 'Seoul',
    value: '45%',
    label: 'Trading Volume',
    delay: 0.2
  }, {
    id: 1,
    x: 75,
    y: 45,
    city: 'Busan',
    value: '18%',
    label: 'Trading Volume',
    delay: 0.4
  }, {
    id: 2,
    x: 45,
    y: 35,
    city: 'Daegu',
    value: '12%',
    label: 'Trading Volume',
    delay: 0.6
  }, {
    id: 3,
    x: 55,
    y: 50,
    city: 'Gwangju',
    value: '8%',
    label: 'Trading Volume',
    delay: 0.8
  }];
  return <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
      {/* Glow background */}
      <motion.div className="absolute inset-0 opacity-30" style={{
      background: 'radial-gradient(ellipse at 60% 40%, hsl(var(--primary) / 0.3) 0%, transparent 60%)'
    }} animate={{
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.4, 0.3]
    }} transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }} />

      {/* Korea Map SVG */}
      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
        {/* Simplified Korea peninsula shape */}
        <motion.path d="M55 5 
             C 70 5, 85 15, 85 30
             C 85 45, 80 55, 75 65
             C 70 75, 65 85, 60 90
             C 55 95, 50 95, 45 90
             C 40 85, 35 75, 30 65
             C 25 55, 20 45, 25 35
             C 30 25, 40 15, 55 5 Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" initial={{
        pathLength: 0,
        opacity: 0
      }} animate={isVisible ? {
        pathLength: 1,
        opacity: 1
      } : {}} transition={{
        duration: 2,
        ease: "easeInOut"
      }} />
        
        {/* Gradient fill */}
        <motion.path d="M55 5 
             C 70 5, 85 15, 85 30
             C 85 45, 80 55, 75 65
             C 70 75, 65 85, 60 90
             C 55 95, 50 95, 45 90
             C 40 85, 35 75, 30 65
             C 25 55, 20 45, 25 35
             C 30 25, 40 15, 55 5 Z" fill="url(#koreaGradient)" initial={{
        opacity: 0
      }} animate={isVisible ? {
        opacity: 0.3
      } : {}} transition={{
        delay: 1,
        duration: 1
      }} />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="koreaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines inside Korea */}
        {[20, 40, 60, 80].map((y, i) => <motion.line key={`h-${i}`} x1="25" y1={y} x2="85" y2={y} stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.3" strokeDasharray="2 2" initial={{
        opacity: 0
      }} animate={isVisible ? {
        opacity: 1
      } : {}} transition={{
        delay: 1.5 + i * 0.1
      }} />)}

        {/* Data points */}
        {dataPoints.map(point => <g key={point.id}>
            {/* Pulse ring */}
            <motion.circle cx={point.x} cy={point.y} r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" initial={{
          scale: 0,
          opacity: 0
        }} animate={isVisible ? {
          scale: [1, 2, 1],
          opacity: [0.8, 0, 0.8]
        } : {}} transition={{
          duration: 2,
          repeat: Infinity,
          delay: point.delay + 1,
          ease: "easeOut"
        }} />
            
            {/* Center dot */}
            <motion.circle cx={point.x} cy={point.y} r="2" fill="hsl(var(--primary))" filter="url(#glow)" initial={{
          scale: 0
        }} animate={isVisible ? {
          scale: 1
        } : {}} transition={{
          delay: point.delay + 1,
          type: "spring"
        }} onMouseEnter={() => setActivePoint(point.id)} onMouseLeave={() => setActivePoint(null)} className="cursor-pointer" />
          </g>)}
      </svg>

      {/* Data point tooltips */}
      {dataPoints.map(point => <motion.div key={`tooltip-${point.id}`} className="absolute pointer-events-none" style={{
      left: `${point.x}%`,
      top: `${point.y}%`,
      transform: 'translate(-50%, -150%)'
    }} initial={{
      opacity: 0,
      y: 10
    }} animate={activePoint === point.id || isVisible && point.id === 0 ? {
      opacity: 1,
      y: 0
    } : {
      opacity: 0,
      y: 10
    }} transition={{
      duration: 0.2
    }}>
          <div className="bg-background/90 backdrop-blur-sm border border-primary/50 px-3 py-2 text-center">
            <p className="text-xs font-medium text-primary">{point.city}</p>
            <p className="text-lg font-bold text-foreground">{point.value}</p>
            
          </div>
        </motion.div>)}

      {/* Legend */}
      <motion.div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6" initial={{
      opacity: 0,
      y: 20
    }} animate={isVisible ? {
      opacity: 1,
      y: 0
    } : {}} transition={{
      delay: 2
    }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground">Trading Hub</span>
        </div>
      </motion.div>
    </div>;
};

// ============================================
// MARKET INTELLIGENCE - Why Korea?
// ============================================
const MarketIntelligenceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10%"
  });

  // Fiat Volume Data - The Fiat Impact (Source: Kaiko, Bloomberg)
  const fiatVolumeData = [{
    label: 'USD',
    percentage: 100,
    value: '$18.5 B',
    isHighlight: false
  }, {
    label: 'KRW',
    percentage: 65,
    value: '$4.2-6.0 B',
    isHighlight: true
  }, {
    label: 'EUR',
    percentage: 12,
    value: '$1.1 B',
    isHighlight: false
  }, {
    label: 'JPY',
    percentage: 4,
    value: '$0.4 B',
    isHighlight: false
  }];

  // Market Logic Data - 3 Column (Enhanced with aggressive narrative)
  const marketLogic = [{
    number: '01',
    title: 'The Alpha Origin',
    subtitle: 'Global Trend Testbed',
    description: "Korea is the global testbed. Trends validated on Upbit & Bithumb determine the success metrics for Binance and Coinbase listings. We don't just follow trends—we create the 'Kimchi Premium'."
  }, {
    number: '02',
    title: 'High-Velocity Traders',
    subtitle: 'Highest Transaction Frequency',
    description: "Unlike passive Western holders, Korean users are active traders seeking volatility and narrative. 10% of the population trades; 40% of young adults are active crypto investors."
  }, {
    number: '03',
    title: 'Liquidity Super-Cycle',
    subtitle: 'Retail Drives Volume',
    description: "Retail drives the volume, volume attracts the whales. Korean retail FOMO creates enough liquidity depth to sustain price floors even in bear markets."
  }];
  return <section ref={ref} className="px-4 md:px-8 lg:px-12 py-12 md:py-16 bg-muted/30 border-y border-border w-full">
      <motion.div initial={{
      opacity: 0
    }} animate={isInView ? {
      opacity: 1
    } : {}} className="w-full">
        <p className="text-muted-foreground text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">
          01 The Strategic Imperative
        </p>
        <h2 className="text-xl md:text-3xl lg:text-4xl font-medium text-foreground mb-2">
          Why Korea?
        </h2>
        <p className="text-muted-foreground text-sm md:text-lg mb-8 md:mb-16">
          The world's most dynamic crypto market demands a specialized approach.
        </p>

        {/* Module A: The Market Logic - 3 Column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-16">
          {marketLogic.map((item, i) => <motion.div key={item.number} initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          delay: i * 0.15
        }} className="relative p-4 md:p-6 border border-border bg-background hover:border-primary/30 transition-colors group">
              <span className="absolute -top-3 left-4 md:left-6 px-2 py-0.5 bg-muted text-[10px] md:text-xs font-mono text-muted-foreground">
                {item.number}
              </span>
              <p className="text-[10px] md:text-xs tracking-widest text-primary font-medium mb-2 mt-2">
                {item.subtitle}
              </p>
              <h3 className="text-base md:text-xl font-medium text-foreground mb-2 md:mb-3">
                {item.title}
              </h3>
              <p className="text-[11px] md:text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>)}
        </div>

        {/* Module B: Data Visualization - Stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-10 md:mb-16">
          {/* Chart 1: The Fiat Impact */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          delay: 0.3
        }} className="p-4 md:p-6 border border-border bg-background">
            <p className="text-[10px] md:text-xs tracking-widest text-primary font-medium mb-4 md:mb-6">
              THE FIAT IMPACT — Average Daily Volume per Fiat Pair
            </p>
            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              {fiatVolumeData.map((item, i) => <AnimatedProgressBar key={item.label} label={item.label} percentage={item.percentage} value={item.value} delay={i * 0.15 + 0.3} isHighlight={item.isHighlight} isVisible={isInView} />)}
            </div>
            <p className="text-xs md:text-sm text-muted-foreground italic border-t border-border pt-3 md:pt-4">
              "KRW isn't just a challenger. It <span className="text-primary font-medium">surpassed USD volume in Q1 2024</span>." — Kaiko Data
            </p>
          </motion.div>

          {/* Chart 2: Velocity Comparison */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          delay: 0.4
        }} className="p-4 md:p-6 border border-border bg-background">
            <p className="text-[10px] md:text-xs tracking-widest text-primary font-medium mb-4 md:mb-6">
              VELOCITY COMPARISON — Token Velocity Ratio
            </p>
            <div className="space-y-4 md:space-y-6 mb-4 md:mb-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-medium text-foreground/80">Global Average</span>
                  <span className="text-xs md:text-sm font-mono text-muted-foreground">0.15</span>
                </div>
                <div className="h-3 md:h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-foreground/30 rounded-full" initial={{
                  width: 0
                }} animate={isInView ? {
                  width: '18%'
                } : {}} transition={{
                  duration: 1,
                  delay: 0.5
                }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-medium text-primary">Korea Market</span>
                  <span className="text-xs md:text-sm font-mono text-primary">0.85</span>
                </div>
                <div className="h-3 md:h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-primary rounded-full" initial={{
                  width: 0
                }} animate={isInView ? {
                  width: '100%'
                } : {}} transition={{
                  duration: 1.2,
                  delay: 0.6
                }} />
                </div>
              </div>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground italic border-t border-border pt-3 md:pt-4">
              "Same market cap, <span className="text-primary font-medium">5.6x more trading velocity</span> in Korea."
            </p>
          </motion.div>
        </div>

        {/* Key Stats - 2x2 on mobile (Updated with real data) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          <div className="p-3 md:p-4 border border-border bg-background text-center">
            <p className="text-xl md:text-3xl font-medium text-primary">#2</p>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Global Fiat Pair</p>
          </div>
          <div className="p-3 md:p-4 border border-border bg-background text-center">
            <p className="text-xl md:text-3xl font-medium text-foreground">6.5M</p>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Active Investors (12%)</p>
          </div>
          <div className="p-3 md:p-4 border border-border bg-background text-center">
            <p className="text-xl md:text-3xl font-medium text-primary">80%</p>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Altcoin Trading Rate</p>
          </div>
          <div className="p-3 md:p-4 border border-border bg-background text-center">
            <p className="text-xl md:text-3xl font-medium text-foreground">4x</p>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Volume Multiplier</p>
          </div>
        </div>

        {/* Philosophy Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center p-4 md:p-6 border border-primary/20 bg-primary/5"
        >
          <p className="text-sm md:text-base text-foreground italic">
            "In the West, they invest. In Korea, they trade. We turn this velocity into your project's liquidity."
          </p>
          <p className="text-xs text-muted-foreground mt-2">— The ium Philosophy</p>
        </motion.div>

        <motion.blockquote initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        delay: 0.5
      }} className="border-l-2 border-primary pl-4 md:pl-6">
          <p className="text-base md:text-xl text-foreground italic leading-relaxed">
            "Korean users are the most engaged crypto community in the world. We transform that energy into your project's strongest foundation."
          </p>
          <footer className="mt-2 text-xs md:text-sm text-muted-foreground">
            — The ium Philosophy
          </footer>
        </motion.blockquote>
      </motion.div>
    </section>;
};

// ============================================
// CIRCULAR PROGRESS RING COMPONENT
// ============================================
const CircularProgressRing = ({
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 8,
  label,
  suffix = '%',
  prefix = '',
  delay = 0,
  isVisible = true,
  color = 'primary'
}: {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  suffix?: string;
  prefix?: string;
  delay?: number;
  isVisible?: boolean;
  color?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const [progress, setProgress] = useState(0);
  const displayValue = useCountUp({
    end: value,
    delay: delay * 1000,
    isVisible,
    duration: 2000
  });
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(value / maxValue * 100);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, value, maxValue, delay]);
  const strokeDashoffset = circumference - progress / 100 * circumference;
  return <div className="flex flex-col items-center">
      <div className="relative" style={{
      width: size,
      height: size
    }}>
        {/* Background circle */}
        <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
          {/* Progress circle */}
          <motion.circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={`hsl(var(--${color}))`} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} initial={{
          strokeDashoffset: circumference
        }} animate={{
          strokeDashoffset
        }} transition={{
          duration: 1.5,
          ease: "easeOut",
          delay
        }} style={{
          filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))'
        }} />
        </svg>
        
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span className="text-2xl md:text-3xl font-bold text-foreground" initial={{
          opacity: 0,
          scale: 0.5
        }} animate={isVisible ? {
          opacity: 1,
          scale: 1
        } : {}} transition={{
          delay: delay + 0.5,
          type: "spring"
        }}>
            {prefix}{displayValue}{suffix}
          </motion.span>
        </div>
        
        {/* Glow effect */}
        <motion.div className="absolute inset-0 rounded-full" style={{
        background: `radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)`
      }} animate={{
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.8, 0.5]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
      </div>
      <p className="text-sm font-medium text-foreground mt-4">{label}</p>
    </div>;
};

// ============================================
// MINI CIRCULAR GAUGE COMPONENT
// ============================================
const MiniGauge = ({
  value,
  maxValue = 100,
  size = 48,
  label,
  color = 'primary',
  delay = 0,
  isVisible = true
}: {
  value: number;
  maxValue?: number;
  size?: number;
  label: string;
  color?: string;
  delay?: number;
  isVisible?: boolean;
}) => {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setProgress(value / maxValue * 100), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, value, maxValue, delay]);
  const strokeDashoffset = circumference - progress / 100 * circumference;
  const colorClass = color === 'green' ? 'hsl(142, 76%, 36%)' : color === 'yellow' ? 'hsl(48, 96%, 53%)' : 'hsl(var(--primary))';
  return <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{
      width: size,
      height: size
    }}>
        <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
          <motion.circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={colorClass} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} initial={{
          strokeDashoffset: circumference
        }} animate={{
          strokeDashoffset
        }} transition={{
          duration: 1.5,
          ease: "easeOut",
          delay
        }} style={{
          filter: `drop-shadow(0 0 4px ${colorClass})`
        }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span className="text-xs font-bold text-foreground" initial={{
          opacity: 0
        }} animate={isVisible ? {
          opacity: 1
        } : {}} transition={{
          delay: delay + 0.5
        }}>
            {value}%
          </motion.span>
        </div>
      </div>
      <span className="text-[10px] text-muted-foreground text-center">{label}</span>
    </div>;
};

// ============================================
// LLM ENGINE VISUALIZATION COMPONENT
// ============================================
const LLMEngineVisualization = ({
  isVisible
}: {
  isVisible: boolean;
}) => {
  const [activeDataSource, setActiveDataSource] = useState<number | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  // Simulated live data values
  const [liveData, setLiveData] = useState({
    onchain: 847,
    social: 1243,
    market: 2891,
    // Output metrics (range: 55-98%)
    timing: 78,
    channels: 65,
    budget: 88,
    volume: 72
  });
  useEffect(() => {
    if (!isVisible) return;

    // Animate processing bar and sync output updates at 100%
    const progressTimer = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          // Update output metrics when processing completes
          setLiveData(prevData => ({
            ...prevData,
            timing: Math.floor(55 + Math.random() * 43),
            channels: Math.floor(55 + Math.random() * 43),
            budget: Math.floor(55 + Math.random() * 43),
            volume: Math.floor(55 + Math.random() * 43)
          }));
          return 0;
        }
        return prev + 2;
      });
    }, 50);

    // Cycle through phases
    const phaseTimer = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % 4);
    }, 3000);

    // Simulate live data source updates (input data only)
    const dataTimer = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        onchain: Math.floor(800 + Math.random() * 100),
        social: Math.floor(1200 + Math.random() * 100),
        market: Math.floor(2800 + Math.random() * 200)
      }));
    }, 2500);
    return () => {
      clearInterval(progressTimer);
      clearInterval(phaseTimer);
      clearInterval(dataTimer);
    };
  }, [isVisible]);
  const dataSources = [{
    id: 0,
    icon: Activity,
    label: 'Social Sentiment',
    items: ['X (Twitter) Mentions', 'Telegram Buzz', 'Naver Blog & Cafe', 'Kakao Communities'],
    value: liveData.social,
    suffix: '+ signals',
    color: 'from-purple-500/20 to-transparent',
    borderColor: 'border-purple-500/50',
    activeBorder: 'border-purple-500',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-500',
    dotColor: 'bg-purple-500',
    barColor: 'bg-purple-500/50'
  }, {
    id: 1,
    icon: Database,
    label: 'On-chain Activity',
    items: ['Wallet Growth', 'Contract Interaction', 'Token Transfers', 'DeFi Activity'],
    value: liveData.onchain,
    suffix: ' wallets',
    color: 'from-blue-500/20 to-transparent',
    borderColor: 'border-blue-500/50',
    activeBorder: 'border-blue-500',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-500',
    dotColor: 'bg-blue-500',
    barColor: 'bg-blue-500/50'
  }, {
    id: 2,
    icon: LineChart,
    label: 'Market Intelligence',
    items: ['Sector Dominance', 'Narrative Share', 'Relative Strength', 'Community Mindshare'],
    value: liveData.market,
    suffix: ' data points',
    color: 'from-cyan-500/20 to-transparent',
    borderColor: 'border-cyan-500/50',
    activeBorder: 'border-cyan-500',
    iconBg: 'bg-cyan-500/20',
    iconColor: 'text-cyan-500',
    dotColor: 'bg-cyan-500',
    barColor: 'bg-cyan-500/50'
  }];
  const pipelineStages = [{
    label: 'COLLECT',
    desc: 'Real-time data ingestion',
    icon: Database
  }, {
    label: 'PROCESS',
    desc: 'AI pattern recognition',
    icon: Cpu
  }, {
    label: 'OPTIMIZE',
    desc: 'Strategy generation',
    icon: Target
  }, {
    label: 'EXECUTE',
    desc: 'Precision timing',
    icon: Zap
  }];
  const outputMetrics = [{
    label: 'Market Heat Index',
    sublabel: 'Optimal Entry Timing Detection',
    value: liveData.timing,
    color: 'green',
    icon: Target
  }, {
    label: 'Sentiment Score',
    sublabel: 'Real-time Brand Sentiment Analysis',
    value: liveData.channels,
    color: 'primary',
    icon: Users
  }, {
    label: 'Buzz Velocity',
    sublabel: 'Community Spread Rate Measurement',
    value: liveData.budget,
    color: 'primary',
    icon: Sparkles
  }, {
    label: 'Community Readiness',
    sublabel: 'Initial Traction & Cohesion Diagnosis',
    value: liveData.volume,
    color: 'green',
    icon: TrendingUp
  }];
  return <motion.div initial={{
    opacity: 0,
    y: 30
  }} animate={isVisible ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.8
  }} className="mb-8 md:mb-20 p-4 md:p-6 lg:p-10 border border-primary/30 bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: `
          linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
        `,
      backgroundSize: '40px 40px'
    }} />

      {/* Floating particles - reduced on mobile */}
      {[...Array(4)].map((_, i) => <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-primary/40 hidden md:block" style={{
      left: `${20 + i * 15}%`,
      top: `${30 + i % 3 * 20}%`
    }} animate={{
      y: [0, -30, 0],
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.5, 1]
    }} transition={{
      duration: 3 + i * 0.5,
      repeat: Infinity,
      delay: i * 0.3
    }} />)}

      {/* Central glow */}
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{
      background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 60%)'
    }} animate={{
      scale: [1, 1.15, 1],
      opacity: [0.3, 0.5, 0.3]
    }} transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }} />

      <div className="relative z-10">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-8 md:mb-12">
          <motion.div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 border border-primary/30 rounded-full mb-3 md:mb-4" animate={{
          boxShadow: ['0 0 20px hsl(var(--primary) / 0.1)', '0 0 40px hsl(var(--primary) / 0.2)', '0 0 20px hsl(var(--primary) / 0.1)'],
          borderColor: ['hsl(var(--primary) / 0.3)', 'hsl(var(--primary) / 0.6)', 'hsl(var(--primary) / 0.3)']
        }} transition={{
          duration: 2,
          repeat: Infinity
        }}>
            <motion.div animate={{
            rotate: [0, 360]
          }} transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}>
              <Cpu className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            </motion.div>
            <span className="text-[10px] md:text-xs font-mono text-primary tracking-wider">INTELLIGENCE ENGINE</span>
          </motion.div>
          <h3 className="text-lg md:text-2xl lg:text-3xl font-medium text-foreground mb-2 md:mb-3">
            Data-Driven Decision Making
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xs md:text-sm">
            Our proprietary intelligence system analyzes <span className="text-primary font-medium">social sentiment and on-chain behavior</span> in real-time to identify optimal market entry strategies.
          </p>
        </div>

        {/* Pipeline stages - Horizontal scroll on mobile */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap justify-start md:justify-center gap-2 mb-6 md:mb-12 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {pipelineStages.map((stage, i) => <motion.div key={stage.label} initial={{
          opacity: 0,
          scale: 0.8
        }} animate={isVisible ? {
          opacity: 1,
          scale: 1
        } : {}} transition={{
          delay: i * 0.1 + 0.3
        }} className="flex items-center gap-2 flex-shrink-0">
              <motion.div className={`px-3 md:px-4 py-2 md:py-3 bg-background border transition-all duration-300 min-w-[100px] md:min-w-0 ${currentPhase === i ? 'border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]' : 'border-border'}`} animate={currentPhase === i ? {
            scale: [1, 1.02, 1]
          } : {}} transition={{
            duration: 0.5
          }}>
                <div className="flex items-center gap-2 mb-1">
                  <stage.icon className={`w-3 h-3 ${currentPhase === i ? 'text-primary' : 'text-muted-foreground'}`} />
                  <p className={`text-[10px] md:text-xs font-mono ${currentPhase === i ? 'text-primary' : 'text-muted-foreground'}`}>{stage.label}</p>
                </div>
                <p className="text-[9px] md:text-[10px] text-muted-foreground">{stage.desc}</p>
                {currentPhase === i && <motion.div className="h-0.5 bg-primary mt-2 rounded-full" initial={{
              width: 0
            }} animate={{
              width: '100%'
            }} transition={{
              duration: 2.5
            }} />}
              </motion.div>
              {i < pipelineStages.length - 1 && <motion.div className="hidden md:block" animate={{
            x: [0, 5, 0],
            opacity: currentPhase === i ? [0.8, 1, 0.8] : [0.3, 0.5, 0.3]
          }} transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15
          }}>
                  <ArrowRight className={`w-4 h-4 ${currentPhase === i ? 'text-primary' : 'text-primary/30'}`} />
                </motion.div>}
            </motion.div>)}
        </div>

        {/* Main visualization grid - Stack on mobile, 5-col on desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto_auto_auto_1fr] gap-6 lg:gap-0 items-center relative">

          {/* Data Sources */}
          <div className="space-y-3 md:space-y-4 relative z-10 w-full lg:w-auto">
            <p className="text-[10px] md:text-xs tracking-widest text-muted-foreground mb-3 md:mb-4 text-center lg:text-left flex items-center gap-2 justify-center lg:justify-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              LIVE DATA SOURCES
            </p>
            {dataSources.map((source, i) => <motion.div key={source.id} initial={{
            opacity: 0,
            x: -30
          }} animate={isVisible ? {
            opacity: 1,
            x: 0
          } : {}} transition={{
            delay: i * 0.1 + 0.5
          }} onMouseEnter={() => setActiveDataSource(source.id)} onMouseLeave={() => setActiveDataSource(null)} className={`relative p-4 border bg-background transition-all duration-300 cursor-pointer overflow-hidden ${activeDataSource === source.id ? `${source.activeBorder} shadow-[0_0_25px_hsl(var(--primary)/0.15)]` : `${source.borderColor} hover:${source.activeBorder}`}`}>
                {/* Gradient overlay on hover */}
                <motion.div className={`absolute inset-0 bg-gradient-to-r ${source.color} opacity-0`} animate={{
              opacity: activeDataSource === source.id ? 0.5 : 0
            }} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${source.iconBg}`}>
                        <source.icon className={`w-4 h-4 transition-colors ${source.iconColor}`} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{source.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.span className={`w-2 h-2 rounded-full ${source.dotColor}`} animate={{
                    opacity: [1, 0.3, 1],
                    scale: [1, 0.8, 1]
                  }} transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }} />
                      <motion.span key={source.value} initial={{
                    opacity: 0.5,
                    y: -5
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} className={`text-xs font-mono ${source.iconColor}`}>
                        {source.value.toLocaleString()}{source.suffix}
                      </motion.span>
                    </div>
                  </div>
                  
                  {/* Data items with mini progress indicators */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {source.items.map((item, j) => <motion.div key={j} className="flex items-center gap-1.5" initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} transition={{
                  delay: i * 0.1 + j * 0.05 + 0.6
                }}>
                        <motion.div className={`w-1 h-1 rounded-full ${source.dotColor}/50`} animate={{
                    scale: [1, 1.5, 1]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: j * 0.2
                  }} />
                        <span className="text-[10px] text-muted-foreground">{item}</span>
                      </motion.div>)}
                  </div>

                  {/* Mini throughput bar */}
                  <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div className={`h-full ${source.barColor} rounded-full`} animate={{
                  width: ['0%', '100%', '0%']
                }} transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5
                }} />
                  </div>
                </div>

                {/* Animated data flow particles */}
                {activeDataSource === source.id && <motion.div className={`absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${source.dotColor}`} animate={{
              x: [0, 20],
              opacity: [1, 0]
            }} transition={{
              duration: 0.8,
              repeat: Infinity
            }} />}
              </motion.div>)}
          </div>

          {/* Connection Lines: Data Sources → AI Core */}
          <div className="hidden lg:flex flex-col items-center justify-center px-4 py-8 relative z-10">
            {/* Animated connection lines from each data source */}
            {[0, 1, 2].map(i => <motion.div key={i} className="relative h-16 flex items-center" initial={{
            opacity: 0
          }} animate={isVisible ? {
            opacity: 1
          } : {}} transition={{
            delay: 0.6 + i * 0.1
          }}>
                {/* Main connection line */}
                <div className={`w-16 h-0.5 relative overflow-hidden ${i === 0 ? 'bg-gradient-to-r from-blue-500/60 to-primary/40' : i === 1 ? 'bg-gradient-to-r from-purple-500/60 to-primary/40' : 'bg-gradient-to-r from-red-500/60 to-primary/40'}`}>
                  {/* Animated particle */}
                  <motion.div className={`absolute h-full w-3 ${i === 0 ? 'bg-blue-400' : i === 1 ? 'bg-purple-400' : 'bg-red-400'}`} animate={{
                x: ['-100%', '600%']
              }} transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear"
              }} />
                </div>
                {/* Arrow head */}
                <motion.div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-primary/60" animate={{
              opacity: [0.6, 1, 0.6]
            }} transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }} />
              </motion.div>)}
          </div>

          {/* LLM Core - Enhanced */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} animate={isVisible ? {
          opacity: 1,
          scale: 1
        } : {}} transition={{
          delay: 0.8,
          type: "spring"
        }} className="relative flex flex-col items-center z-10">

            {/* Main LLM Core Box */}
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div className="absolute -inset-4 rounded-lg" style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)'
            }} animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }} transition={{
              duration: 3,
              repeat: Infinity
            }} />

              {/* Gradient border wrapper */}
              <div className="relative p-[2px] bg-gradient-to-br from-blue-500 via-purple-500 to-red-500">
                <div className="relative p-8 bg-background">
                  {/* Pulsing border overlay */}
                  <motion.div className="absolute inset-0 border-2 border-transparent rounded-sm" style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(168,85,247,0.3), rgba(239,68,68,0.3))',
                  opacity: 0
                }} animate={{
                  opacity: [0, 0.5, 0]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }} />
                  
                  {/* Corner accents with gradient colors */}
                  <motion.div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500" animate={{
                  opacity: [0.5, 1, 0.5]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0
                }} />
                  <motion.div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-500" animate={{
                  opacity: [0.5, 1, 0.5]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.2
                }} />
                  <motion.div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-500" animate={{
                  opacity: [0.5, 1, 0.5]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.4
                }} />
                  <motion.div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500" animate={{
                  opacity: [0.5, 1, 0.5]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.6
                }} />
                
                <div className="text-center space-y-4">
                  {/* Rotating icon with glow */}
                  <div className="relative w-20 h-20 mx-auto">
                    {/* SVG Gradient Definition */}
                    <svg width="0" height="0" className="absolute">
                      <defs>
                        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <motion.div className="absolute inset-0 rounded-full" style={{
                      background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)'
                    }} animate={{
                      scale: [1, 1.3, 1]
                    }} transition={{
                      duration: 2,
                      repeat: Infinity
                    }} />
                    <motion.div animate={{
                      rotate: [0, 360]
                    }} transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }} className="relative">
                      <Sparkles className="w-20 h-20" style={{
                        stroke: 'url(#iconGradient)'
                      }} />
                    </motion.div>
                  </div>
                  
                  <div>
                    <p className="text-lg font-medium text-foreground">ium AI Core</p>
                    <p className="text-xs text-muted-foreground">Quant-driven Intelligence</p>
                  </div>

                  {/* Processing visualization */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                      <span>ANALYZING</span>
                      <span>{Math.floor(processingProgress)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden relative">
                      <motion.div className="h-full bg-gradient-to-r from-primary via-primary to-primary/50 rounded-full" style={{
                        width: `${processingProgress}%`
                      }} />
                      {/* Shimmer effect */}
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" animate={{
                        x: ['-100%', '100%']
                      }} transition={{
                        duration: 1.5,
                        repeat: Infinity
                      }} />
                    </div>
                    <div className="flex justify-center gap-4 text-[9px] text-muted-foreground">
                      <span>50+ signals</span>
                      <span>•</span>
                      <span>Real-time</span>
                      <span>•</span>
                      <span>AI-powered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </motion.div>

          {/* Connection Lines: AI Core → Output */}
          <div className="hidden lg:flex flex-col items-center justify-center px-4 py-8 relative z-10">
            {/* Single connection with multiple particles */}
            <motion.div className="relative flex items-center" initial={{
            opacity: 0
          }} animate={isVisible ? {
            opacity: 1
          } : {}} transition={{
            delay: 1
          }}>
              {/* Main connection line */}
              <div className="w-16 h-0.5 bg-gradient-to-r from-primary/60 to-primary/40 relative overflow-hidden">
                {/* Multiple animated particles */}
                {[0, 1, 2].map(i => <motion.div key={i} className="absolute h-full w-3 bg-primary" animate={{
                x: ['-100%', '600%']
              }} transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear"
              }} />)}
              </div>
              {/* Arrow head */}
              <motion.div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-primary/80" animate={{
              opacity: [0.6, 1, 0.6]
            }} transition={{
              duration: 1,
              repeat: Infinity
            }} />
            </motion.div>
          </div>

          {/* Output Panel - Simplified */}
          <div className="space-y-4 relative z-10">
            <p className="text-xs tracking-widest text-muted-foreground mb-4 text-center lg:text-right flex items-center gap-2 justify-center lg:justify-end">
              STRATEGIC OUTPUT
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </p>
            
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={isVisible ? {
            opacity: 1,
            x: 0
          } : {}} transition={{
            delay: 1
          }} className="p-5 border border-primary/50 bg-background relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)',
              backgroundSize: '16px 16px'
            }} />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-1.5 rounded bg-primary/20">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Optimized Strategy</span>
                  <motion.span className="ml-auto text-[10px] px-2 py-0.5 bg-green-500/20 text-green-500 rounded-full" animate={{
                  opacity: [0.7, 1, 0.7]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }}>
                    LIVE
                  </motion.span>
                </div>

                {/* Simplified Metric Cards - 2x2 Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {outputMetrics.map((metric, i) => <motion.div key={metric.label} initial={{
                  opacity: 0,
                  y: 10
                }} animate={isVisible ? {
                  opacity: 1,
                  y: 0
                } : {}} transition={{
                  delay: 1.2 + i * 0.1
                }} className="p-3 bg-muted/30 border border-border/50 rounded-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <metric.icon className={`w-3.5 h-3.5 ${metric.color === 'green' ? 'text-green-500' : metric.color === 'yellow' ? 'text-yellow-500' : 'text-primary'}`} />
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{metric.label}</span>
                      </div>
                      
                      <div className="flex items-end justify-between gap-2 mb-2">
                        <motion.span key={metric.value} initial={{
                      opacity: 0.5
                    }} animate={{
                      opacity: 1
                    }} className={`text-xl font-mono font-medium ${metric.color === 'green' ? 'text-green-500' : metric.color === 'yellow' ? 'text-yellow-500' : 'text-primary'}`}>
                          {metric.value}%
                        </motion.span>
                      </div>
                      
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div className={`h-full rounded-full ${metric.color === 'green' ? 'bg-green-500' : metric.color === 'yellow' ? 'bg-yellow-500' : 'bg-primary'}`} initial={{
                      width: 0
                    }} animate={isVisible ? {
                      width: `${metric.value}%`
                    } : {}} transition={{
                      duration: 1,
                      delay: 1.3 + i * 0.1
                    }} />
                      </div>
                      
                      <p className="text-[9px] text-muted-foreground mt-1.5">{metric.sublabel}</p>
                    </motion.div>)}
                </div>
              </div>
            </motion.div>

            {/* Confidence Summary */}
            <motion.div initial={{
            opacity: 0,
            y: 10
          }} animate={isVisible ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            delay: 1.6
          }} className="p-3 border border-green-500/30 bg-green-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div className="w-2.5 h-2.5 rounded-full bg-green-500" animate={{
                  scale: [1, 1.2, 1]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }} />
                  <span className="text-xs font-medium text-green-500">High Confidence</span>
                </div>
                <span className="text-xs font-mono text-green-500">
                  {Math.floor((liveData.timing + liveData.channels + liveData.budget + liveData.volume) / 4)}%
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Connection to Framework */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isVisible ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        delay: 2
      }} className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-border bg-muted/30 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground">This intelligence powers every stage of our framework</p>
          </div>
          <motion.div className="mt-4" animate={{
          y: [0, 8, 0]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }}>
            <ArrowRight className="w-6 h-6 text-primary mx-auto rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>;
};

// ============================================
// THE IUM FRAMEWORK - Interactive Timeline
// ============================================
const FrameworkSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10%"
  });
  const [activeStage, setActiveStage] = useState<number | null>(null);
  return <section ref={ref} className="px-4 md:px-8 lg:px-12 py-16 bg-background relative overflow-hidden w-full">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
      </div>

      <motion.div initial={{
      opacity: 0
    }} animate={isInView ? {
      opacity: 1
    } : {}} className="w-full relative z-10">
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
          02 Our Process
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-6">
          The ium Framework
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          A battle-tested 4-stage methodology that has successfully launched 30+ projects into the Korean market.
        </p>

        {/* LLM Engine Visualization */}
        <LLMEngineVisualization isVisible={isInView} />

        {/* Timeline connector line */}
        <div className="hidden lg:block absolute top-[280px] left-[10%] right-[10%] h-px">
          <motion.div className="h-full bg-gradient-to-r from-border via-primary/50 to-border" initial={{
          scaleX: 0
        }} animate={isInView ? {
          scaleX: 1
        } : {}} transition={{
          duration: 1.5,
          delay: 0.3
        }} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {frameworkStages.map((stage, i) => <motion.div key={stage.number} initial={{
          opacity: 0,
          y: 40
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          delay: i * 0.15 + 0.2,
          duration: 0.6
        }} onMouseEnter={() => setActiveStage(i)} onMouseLeave={() => setActiveStage(null)} className={`group relative p-6 border bg-background transition-all duration-500 cursor-pointer ${activeStage === i ? 'border-primary shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)] scale-[1.02]' : 'border-border hover:border-primary/30'}`}>
              {/* Stage number badge */}
              <motion.div className={`absolute -top-3 left-6 px-3 py-1 text-xs font-mono transition-colors duration-300 ${activeStage === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`} whileHover={{
            scale: 1.05
          }}>
                STAGE {stage.number}
              </motion.div>

              {/* Icon with glow */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 mt-2 transition-all duration-300 ${activeStage === i ? 'bg-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.3)]' : 'bg-muted'}`}>
                <stage.icon className={`w-6 h-6 transition-colors duration-300 ${activeStage === i ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              
              <h3 className="text-2xl font-medium text-foreground mb-1">
                {stage.title}
              </h3>
              <p className="text-xs text-primary uppercase tracking-wide mb-4">
                {stage.subtitle}
              </p>

              <ul className="space-y-2 mb-4">
                {stage.items.map((item, itemIndex) => <motion.li key={item} className="text-sm text-muted-foreground flex items-center gap-2" initial={false} animate={activeStage === i ? {
              x: 5
            } : {
              x: 0
            }} transition={{
              delay: itemIndex * 0.05
            }}>
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeStage === i ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                    {item}
                  </motion.li>)}
              </ul>

              <p className="text-xs text-primary/80 italic border-t border-border pt-4 leading-relaxed">
                {stage.quote}
              </p>

              {/* Arrow connector (hidden on last item and mobile) */}
              {i < 3 && <motion.div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-background border border-border items-center justify-center" animate={activeStage === i ? {
            scale: 1.2,
            borderColor: 'hsl(var(--primary))'
          } : {
            scale: 1
          }}>
                  <ArrowRight className={`w-3 h-3 transition-colors duration-300 ${activeStage === i ? 'text-primary' : 'text-muted-foreground'}`} />
                </motion.div>}
            </motion.div>)}
        </div>
      </motion.div>
    </section>;
};

// ============================================
// STRATEGY IN ACTION - Case Studies with 3D Tilt
// ============================================
const CaseMetricBar = ({
  label,
  value,
  suffix = '',
  prefix = '',
  delay = 0,
  isVisible = true
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  isVisible?: boolean;
}) => {
  const displayValue = useCountUp({
    end: value,
    prefix,
    suffix,
    delay: delay * 1000,
    isVisible,
    duration: 1500
  });
  return <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-primary">{displayValue}</span>
    </div>;
};

// 3D Tilt Card component
const TiltCaseCard = ({
  project,
  index,
  isVisible
}: {
  project: typeof featuredProjects[0];
  index: number;
  isVisible: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({
    x: 0,
    y: 0
  });
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * 10,
      y: (x - 0.5) * -10
    });
  };
  const handleMouseLeave = () => {
    setTilt({
      x: 0,
      y: 0
    });
    setIsHovered(false);
  };
  return <motion.article ref={cardRef} initial={{
    opacity: 0,
    y: 40
  }} animate={isVisible ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    delay: index * 0.1,
    duration: 0.6
  }} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleMouseLeave} style={{
    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
  }} className="relative">
      <Link to={`/projects/${project.slug}`} className="group block">
        {/* Glow effect on hover */}
        <motion.div className="absolute -inset-px rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
        background: `linear-gradient(135deg, hsl(var(--primary) / 0.2) 0%, transparent 50%, hsl(var(--primary) / 0.1) 100%)`
      }} />
        
        <div className="relative bg-background border border-border group-hover:border-primary/30 transition-colors duration-300 overflow-hidden">
          {/* Case Study Number Badge */}
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-background/90 backdrop-blur-sm border border-border">
            <span className="text-[10px] font-mono text-muted-foreground">CASE STUDY</span>
            <span className="text-xs font-mono text-primary ml-2">0{index + 1}</span>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-primary/90 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-primary-foreground uppercase tracking-wider">{project.category}</span>
          </div>

          {/* Image with parallax effect */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <motion.img src={project.image} alt={project.name} className="w-full h-full object-cover" animate={{
            scale: isHovered ? 1.1 : 1,
            x: isHovered ? tilt.y * 2 : 0,
            y: isHovered ? tilt.x * 2 : 0
          }} transition={{
            duration: 0.3
          }} />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Content on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">
                {project.name}
              </h3>
              <p className="text-lg text-white/90 font-medium mb-1">
                "{project.tagline}"
              </p>
              <p className="text-sm text-white/70">
                {project.descEn}
              </p>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Result Highlight */}
            <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/30">
              <Trophy className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Result</p>
                <p className="text-base font-medium text-primary">{project.result}</p>
              </div>
            </div>
            
            {/* Action */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider min-w-[50px]">Action:</span>
                <span className="text-sm text-foreground">{project.strategy}</span>
              </div>
            </div>
            
            {/* Metrics with animation */}
            <div className="pt-3 mt-3 border-t border-border grid grid-cols-2 gap-3">
              {project.metrics.map((metric, mi) => (
                <div key={metric.label} className="text-center p-2 bg-muted/30">
                  <CaseMetricBar label={metric.label} value={metric.value} suffix={metric.suffix} prefix={metric.prefix} delay={0.3 + mi * 0.1} isVisible={isVisible} />
                </div>
              ))}
            </div>
            
            {/* View Case Study CTA */}
            <motion.div 
              className="flex items-center justify-center gap-2 pt-2 text-sm text-primary group-hover:text-primary/80 transition-colors"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              <span>View Full Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.article>;
};

// ============================================
// SUCCESS STORIES SECTION - Real Data Case Studies
// ============================================
const SuccessStoriesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10%"
  });

  return <section ref={ref} className="px-4 md:px-8 lg:px-12 py-16 md:py-24 bg-muted/30 border-y border-border w-full">
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={isInView ? { opacity: 1 } : {}} 
      className="w-full"
    >
      <div className="mb-12">
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
          03 Case Studies
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
          Proven Results
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          Measurable outcomes from our flagship campaigns. Every metric backed by real on-chain data.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {featuredProjects.map((project, index) => (
          <TiltCaseCard key={project.slug} project={project} index={index} isVisible={isInView} />
        ))}
      </div>
    </motion.div>
  </section>;
};

const StrategyInActionSection = () => {
  // This section is now replaced by SuccessStoriesSection
  return null;
};

// ============================================
// CLIENT LOGOS MARQUEE
// ============================================
import bnbLogo from '@/assets/logos/bnb.png';
import bybitLogo from '@/assets/logos/bybit.png';
import kucoinLogo from '@/assets/logos/kucoin.png';
import mantraLogo from '@/assets/logos/mantra.png';
import peaqLogo from '@/assets/logos/peaq.png';
import storyLogo from '@/assets/logos/story-protocol.png';
import saharaLogo from '@/assets/logos/sahara-ai.png';
import megaethLogo from '@/assets/logos/megaeth.png';
import polygonLogo from '@/assets/logos/polygon.svg';
import ondoLogo from '@/assets/logos/ondo.svg';
import triaLogo from '@/assets/logos/tria-official.png';
import synfuturesLogo from '@/assets/logos/synfutures.png';
import fogoLogo from '@/assets/logos/fogo.png';
import zkpassLogo from '@/assets/logos/zkpass.png';
const clientLogos = [{
  name: 'BNB Chain',
  logo: bnbLogo
}, {
  name: 'Bybit',
  logo: bybitLogo
}, {
  name: 'KuCoin',
  logo: kucoinLogo
}, {
  name: 'MANTRA',
  logo: mantraLogo
}, {
  name: 'peaq',
  logo: peaqLogo
}, {
  name: 'Story Protocol',
  logo: storyLogo
}, {
  name: 'Sahara AI',
  logo: saharaLogo
}, {
  name: 'MegaETH',
  logo: megaethLogo
}, {
  name: 'Polygon',
  logo: polygonLogo
}, {
  name: 'Ondo',
  logo: ondoLogo
}, {
  name: 'Tria',
  logo: triaLogo
}, {
  name: 'SynFutures',
  logo: synfuturesLogo
}, {
  name: 'Fogo',
  logo: fogoLogo
}, {
  name: 'zkPass',
  logo: zkpassLogo
}];
const ClientLogosMarquee = () => {
  return null;
};

// ============================================
// CTA SECTION - Enhanced with Gradient
// ============================================
const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true
  });
  return <section ref={ref} className="py-20 bg-gradient-to-br from-primary/10 via-background to-background w-full">
      <div className="w-full px-4 md:px-8 lg:px-12 text-center">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 30
      }} transition={{
        duration: 0.6
      }}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Ready to Unlock Korea?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Stop relying on translation. Start engineering your growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="min-w-[220px] text-base">
                Schedule a Strategy Session
              </Button>
            </Link>
            <Link to="/research">
              <Button size="lg" variant="outline" className="min-w-[220px] text-base">
                Get the Market Report
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>;
};

// ============================================
// MAIN COMPONENT
// ============================================
const GTMService = () => {
  usePageMeta({
    title: "Korea Web3 GTM Strategy & Marketing Services",
    description: "Full-stack Korea GTM services for Web3 projects. Strategic market entry, KOL activation, community building, PR, events and more. 30+ projects. $1.5B+ volume facilitated.",
    path: "/services",
    image: "/og-image.png",
    suffix: "ium Labs"
  });
  return <>
      <ServiceSchema 
        name="Korea Web3 GTM Strategy & Marketing Services" 
        description="Full-stack go-to-market services for Web3 projects entering the Korean market. Data-driven 4-stage framework covering intelligence, localization, activation, and growth." 
        url="/services" 
        provider="ium Labs" 
        areaServed="South Korea"
        serviceType={["Web3 Marketing", "GTM Strategy", "KOL Marketing", "Community Building", "PR & Media"]}
      />
      <Navbar />
      <main className="bg-background">
        <HeroSection />
        <MarketIntelligenceSection />
        <FrameworkSection />
        <SuccessStoriesSection />
        <PerformanceSection />
        <AuthoritySection />
        <ClientLogosMarquee />
      </main>
      
      {/* Contact Section */}
      <GTMContactFormSection sectionNumber="05" />
      
      {/* CTA Banner */}
      <CTABannerSection />
      
      {/* Footer Links */}
      <FooterLinksSection />
      
      {/* Footer Brand */}
      <Footer />
      <MobileCTAButton />
    </>;
};
export default GTMService;