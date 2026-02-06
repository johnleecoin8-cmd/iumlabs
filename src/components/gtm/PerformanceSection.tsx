import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { Progress } from '@/components/ui/progress';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

// Project logos
import mantraLogo from '@/assets/logos/mantra.png';
import storyLogo from '@/assets/logos/story-protocol.png';
import peaqLogo from '@/assets/logos/peaq.png';
import bnbLogo from '@/assets/logos/bnb.png';
import bybitLogo from '@/assets/logos/bybit.png';
import kucoinLogo from '@/assets/logos/kucoin.svg';
import saharaLogo from '@/assets/logos/sahara-ai.png';
import megaethLogo from '@/assets/logos/megaeth.png';
import fogoLogo from '@/assets/logos/fogo.png';
import polygonLogo from '@/assets/logos/polygon.svg';
import triaLogo from '@/assets/logos/tria-official.png';
import openledgerLogo from '@/assets/campaigns/openledger-hero-official.png';

// All Projects Data for 4-row Marquee
const allProjects = [
  // Row 1 (→ right) - Featured Case Studies
  // Story Protocol hidden
  {
    name: 'peaq',
    slug: 'peaq',
    logo: peaqLogo,
    bgImage: '/images/projects/peaq-bg.jpg',
    bgVideo: '/videos/projects/peaq-hero.mp4',
    category: 'DePIN',
    strategy: 'User Acquisition',
    metric: { value: 25, suffix: 'K+', label: 'Active Wallets' },
    result: 'Converted community hype into actual on-chain users',
    color: 'cyan',
    glowColor: 'rgba(34,211,238,0.5)',
    progress: 88
  },
  {
    name: 'MANTRA',
    slug: 'mantra',
    logo: mantraLogo,
    bgImage: '/images/projects/mantra-bg.jpg',
    bgVideo: '/videos/projects/mantra-hero.mp4',
    category: 'RWA L1',
    strategy: 'Market Impact',
    metric: { value: 450, suffix: '%', prefix: '+', label: 'Volume Growth' },
    result: 'Engineered sustainable liquidity through strategic KRW pairing',
    color: 'orange',
    glowColor: 'rgba(251,146,60,0.5)',
    progress: 92
  },
  // Row 2 (← left)
  {
    name: 'BNB Chain',
    slug: 'bnb-chain',
    logo: bnbLogo,
    bgImage: '/images/projects/bnb-bg.jpg',
    bgVideo: '/videos/projects/bnb-hero.mp4',
    category: 'L1 Ecosystem',
    strategy: 'Exchange Partnership',
    metric: { value: 850, suffix: 'K', label: 'Impressions' },
    color: 'yellow',
    glowColor: 'rgba(234,179,8,0.5)',
    progress: 95
  },
  {
    name: 'Bybit',
    slug: 'bybit',
    logo: bybitLogo,
    bgImage: '/images/projects/bybit-bg.jpg',
    bgVideo: '/videos/projects/bybit-hero.mp4',
    category: 'CEX',
    strategy: 'User Acquisition',
    metric: { value: 45, suffix: 'K+', label: 'New Users' },
    color: 'orange',
    glowColor: 'rgba(251,146,60,0.5)',
    progress: 89
  },
  {
    name: 'KuCoin',
    slug: 'kucoin',
    logo: kucoinLogo,
    bgImage: '/images/projects/kucoin-bg.jpg',
    bgVideo: '/videos/projects/kucoin-hero.mp4',
    category: 'CEX',
    strategy: 'Community Airdrop',
    metric: { value: 35, suffix: 'K', label: 'New Users' },
    color: 'green',
    glowColor: 'rgba(34,197,94,0.5)',
    progress: 91
  },
  // Row 3 (→ right)
  {
    name: 'Sahara AI',
    slug: 'sahara-ai',
    logo: saharaLogo,
    bgImage: '/images/projects/sahara-ai-bg.jpg',
    bgVideo: '/videos/projects/sahara-hero.mp4',
    category: 'AI Infra',
    strategy: 'Thought Leadership',
    metric: { value: 8, suffix: 'K+', label: 'Community' },
    color: 'blue',
    glowColor: 'rgba(59,130,246,0.5)',
    progress: 87
  },
  {
    name: 'OpenLedger',
    slug: 'openledger',
    logo: openledgerLogo,
    bgImage: '/images/projects/openledger-hero-official.png',
    bgVideo: undefined,
    category: 'Data Layer',
    strategy: 'Developer Outreach',
    metric: { value: 12, suffix: 'K', label: 'Downloads' },
    color: 'purple',
    glowColor: 'rgba(168,85,247,0.5)',
    progress: 82
  },
  {
    name: 'MegaETH',
    slug: 'megaeth',
    logo: megaethLogo,
    bgImage: '/images/projects/megaeth-bg.jpg',
    bgVideo: undefined,
    category: 'L2',
    strategy: 'Hype Building',
    metric: { value: 38, suffix: 'K+', label: 'MAU' },
    color: 'pink',
    glowColor: 'rgba(236,72,153,0.5)',
    progress: 94
  },
  // Row 4 (← left)
  {
    name: 'FOGO',
    slug: 'fogo',
    logo: fogoLogo,
    bgImage: '/images/projects/fogo-bg.jpg',
    bgVideo: undefined,
    category: 'L1',
    strategy: 'Community Building',
    metric: { value: 4, suffix: 'K+', label: 'Community' },
    color: 'orange',
    glowColor: 'rgba(251,146,60,0.5)',
    progress: 88
  },
  {
    name: 'Polygon',
    slug: 'polygon',
    logo: polygonLogo,
    bgImage: '/images/projects/polygon-bg.jpg',
    bgVideo: undefined,
    category: 'L2',
    strategy: 'Ecosystem Growth',
    metric: { value: 280, suffix: '%', label: 'TVL Growth' },
    color: 'purple',
    glowColor: 'rgba(168,85,247,0.5)',
    progress: 86
  },
  {
    name: 'Tria',
    slug: 'tria',
    logo: triaLogo,
    bgImage: '/images/projects/tria-bg.jpg',
    bgVideo: undefined,
    category: 'Wallet',
    strategy: 'User Acquisition',
    metric: { value: 28, suffix: 'K', label: 'Signups' },
    color: 'cyan',
    glowColor: 'rgba(34,211,238,0.5)',
    progress: 83
  },
];

// Split into 4 rows
const projectRows = [
  allProjects.slice(0, 3),   // Row 1: MANTRA, Story, peaq
  allProjects.slice(3, 6),   // Row 2: BNB, Bybit, KuCoin
  allProjects.slice(6, 9),   // Row 3: Sahara, OpenLedger, MegaETH
  allProjects.slice(9, 12),  // Row 4: Ondo, Polygon, Tria
];

// Network Stats - Updated to reflect new messaging
const networkStats = [
  { value: 1, suffix: '', prefix: '#', label: 'Trend Setter', sublabel: 'Leading Asia trends' },
  { value: 95, suffix: '%', label: 'Engagement', sublabel: 'Highest engagement rate' },
  { value: 3, suffix: 'x', label: 'Viral Rate', sublabel: 'Viral amplification' },
  { value: 85, suffix: 'K+', label: 'Real Users', sublabel: 'Genuine user acquisition' },
];

// Project Card for Marquee
const ProjectCard = ({
  project,
}: {
  project: typeof allProjects[0];
}) => {
  const [isLive, setIsLive] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => setIsLive(prev => !prev), 1000);
    return () => clearInterval(interval);
  }, []);

  const colorClasses = {
    orange: {
      text: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      glow: 'hover:shadow-[0_0_60px_-15px_rgba(251,146,60,0.5)]',
      indicator: 'bg-orange-500',
      progress: 'bg-orange-500'
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      glow: 'hover:shadow-[0_0_60px_-15px_rgba(168,85,247,0.5)]',
      indicator: 'bg-purple-500',
      progress: 'bg-purple-500'
    },
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      glow: 'hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.5)]',
      indicator: 'bg-cyan-500',
      progress: 'bg-cyan-500'
    },
    yellow: {
      text: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      glow: 'hover:shadow-[0_0_60px_-15px_rgba(234,179,8,0.5)]',
      indicator: 'bg-yellow-500',
      progress: 'bg-yellow-500'
    },
    green: {
      text: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      glow: 'hover:shadow-[0_0_60px_-15px_rgba(34,197,94,0.5)]',
      indicator: 'bg-green-500',
      progress: 'bg-green-500'
    },
    blue: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      glow: 'hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.5)]',
      indicator: 'bg-blue-500',
      progress: 'bg-blue-500'
    },
    pink: {
      text: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/30',
      glow: 'hover:shadow-[0_0_60px_-15px_rgba(236,72,153,0.5)]',
      indicator: 'bg-pink-500',
      progress: 'bg-pink-500'
    }
  };

  const colors = colorClasses[project.color as keyof typeof colorClasses];

  return (
    <Link to={`/projects/${project.slug}`} className="block flex-shrink-0">
      <div
        className={`
          group relative p-3 md:p-6 w-[220px] md:w-[320px] h-[200px] md:h-[280px]
          border ${colors.border} rounded-xl
          bg-background/80 backdrop-blur-sm
          transition-all duration-500
          ${colors.glow}
          hover:border-opacity-60
          overflow-hidden
        `}
      >
        {/* Project background image - appears on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            backgroundImage: `url(${project.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark overlay on hover for readability */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content wrapper */}
        <div className="relative z-10">
        {/* Header: Logo + Live Indicator */}
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <img 
            src={project.logo} 
            alt={project.name}
            loading="lazy"
            decoding="async"
            className="h-5 md:h-8 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${colors.indicator} ${isLive ? 'opacity-100' : 'opacity-30'} transition-opacity`} />
            <span className={`text-[8px] md:text-[10px] font-mono uppercase tracking-wider ${colors.text}`}>
              LIVE
            </span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-2 md:mb-4">
          <span className={`px-1.5 md:px-2 py-0.5 text-[8px] md:text-[10px] font-mono uppercase tracking-wider rounded ${colors.bg} ${colors.text}`}>
            {project.category}
          </span>
        </div>

        {/* Main Metric */}
        <div className="mb-2 md:mb-4">
          <div className={`text-2xl md:text-4xl font-bold font-mono ${colors.text}`}>
            {project.metric.prefix || ''}{project.metric.value}{project.metric.suffix}
          </div>
          <div className="text-[10px] md:text-sm text-muted-foreground font-mono uppercase tracking-wider group-hover:text-white/70 transition-colors">
            {project.metric.label}
          </div>
        </div>

        {/* Strategy Label */}
        <div className="mb-2 md:mb-4">
          <div className="text-[8px] md:text-xs text-muted-foreground mb-0.5 md:mb-1 group-hover:text-white/50 transition-colors">STRATEGY</div>
          <div className="text-[10px] md:text-sm text-foreground font-medium group-hover:text-white transition-colors">
            {project.strategy}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-muted-foreground group-hover:text-white/50 transition-colors">EXECUTION</span>
            <span className={colors.text}>{project.progress}%</span>
          </div>
          <div className="h-1 bg-border/30 group-hover:bg-white/20 rounded-full overflow-hidden transition-colors">
            <div
              className={`h-full ${colors.progress} rounded-full`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <ArrowUpRight className={`w-4 h-4 ${colors.text}`} />
        </div>
        </div>
      </div>
    </Link>
  );
};

// Marquee Row with Touch Swipe Support
const MarqueeRow = ({ 
  projects, 
  direction,
  speed = 35
}: { 
  projects: typeof allProjects;
  direction: 'left' | 'right';
  speed?: number;
}) => {
  const { isMobile } = useMobileOptimization();
  // Mobile: 4x faster (quarter the duration)
  const actualSpeed = isMobile ? speed / 4 : speed;
  // Duplicate projects 4 times for seamless loop
  const duplicated = [...projects, ...projects, ...projects, ...projects];
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setDragStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPaused) return;
    const diff = e.touches[0].clientX - dragStart;
    setDragOffset(diff);
  };
  
  const handleTouchEnd = () => {
    setIsPaused(false);
    setDragOffset(0);
  };
  
  return (
    <div 
      className="relative overflow-hidden py-2 touch-pan-x"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="flex gap-3 md:gap-4"
        animate={isPaused ? {
          x: dragOffset
        } : {
          x: direction === 'left' ? ['0%', '-25%'] : ['-25%', '0%']
        }}
        transition={isPaused ? {
          type: 'tween',
          duration: 0
        } : {
          x: {
            duration: actualSpeed,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop'
          }
        }}
      >
        {duplicated.map((project, index) => (
          <ProjectCard
            key={`${project.slug}-${index}`}
            project={project}
          />
        ))}
      </motion.div>
    </div>
  );
};


// Stat Card
const StatCard = ({
  stat,
  index,
  isVisible
}: {
  stat: typeof networkStats[0];
  index: number;
  isVisible: boolean;
}) => {
  const count = useCountUp({
    end: stat.value,
    duration: 2000,
    suffix: stat.suffix,
    isVisible,
    decimals: stat.value % 1 !== 0 ? 1 : 0
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
      className="text-center p-3 md:p-4 border border-border/30 rounded-lg bg-background/50 backdrop-blur-sm"
    >
      <div className="text-xl md:text-3xl font-bold font-mono text-primary">
        {stat.prefix || ''}{count}
      </div>
      <div className="text-[10px] md:text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">
        {stat.label}
      </div>
      <div className="text-[9px] md:text-[10px] text-muted-foreground/60 mt-0.5">
        {stat.sublabel}
      </div>
    </motion.div>
  );
};

export const PerformanceSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setIsLive(prev => !prev), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={ref}
      className="relative py-[30px] px-4 md:px-8 lg:px-12 overflow-hidden w-full"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Scanline effect */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)'
          }}
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{ 
              left: `${15 + i * 15}%`, 
              top: `${20 + (i % 3) * 25}%` 
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 3 + i * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.3 
            }}
          />
        ))}

        {/* Connection lines SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.line
            x1="16.5%"
            y1="40%"
            x2="50%"
            y2="40%"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 2, delay: 1 }}
          />
          <motion.line
            x1="50%"
            y1="40%"
            x2="83.5%"
            y2="40%"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 2, delay: 1.2 }}
          />
          {/* Node points */}
          {[16.5, 50, 83.5].map((x, i) => (
            <motion.circle
              key={i}
              cx={`${x}%`}
              cy="40%"
              r="3"
              fill="hsl(var(--primary))"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.8 + i * 0.2 }}
            />
          ))}
        </svg>

        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-radial from-primary/5 via-transparent to-transparent"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="w-full relative z-10">

        {/* 4-Row Alternating Marquee */}
        <div className="mb-8 md:mb-12 -mx-4 md:-mx-8 lg:-mx-12 space-y-2">
          {/* Gradient masks for entire section */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 lg:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 lg:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="space-y-2 md:space-y-2">
              {projectRows.map((rowProjects, index) => (
                <MarqueeRow
                  key={index}
                  projects={rowProjects}
                  direction={index % 2 === 0 ? 'right' : 'left'}
                  speed={20 + index * 2}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
