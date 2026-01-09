import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { Progress } from '@/components/ui/progress';

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
  // Row 1 (→ right)
  {
    name: 'Story Protocol',
    slug: 'story-protocol',
    logo: storyLogo,
    bgImage: '/images/projects/story-bg.jpg',
    bgVideo: '/videos/projects/story-hero.mp4',
    category: 'IP Protocol',
    strategy: 'Branding & Hype',
    metric: { value: 1, suffix: '', prefix: '#', label: 'Share of Voice' },
    color: 'purple',
    glowColor: 'rgba(168,85,247,0.5)',
    progress: 100
  },
  {
    name: 'peaq',
    slug: 'peaq',
    logo: peaqLogo,
    bgImage: '/images/projects/peaq-bg.jpg',
    bgVideo: '/videos/projects/peaq-hero.mp4',
    category: 'DePIN',
    strategy: 'User Acquisition',
    metric: { value: 85, suffix: 'K+', label: 'Active Wallets' },
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
    metric: { value: 450, suffix: '%', label: 'Volume Growth' },
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
    metric: { value: 2.1, suffix: 'M', label: 'Impressions' },
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
    metric: { value: 180, suffix: 'K+', label: 'New Users' },
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
    metric: { value: 150, suffix: 'K', label: 'New Users' },
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
    metric: { value: 500, suffix: 'K+', label: 'Community' },
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
    metric: { value: 45, suffix: 'K', label: 'Downloads' },
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
    metric: { value: 150, suffix: 'K+', label: 'MAU' },
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
    metric: { value: 200, suffix: 'K+', label: 'Community' },
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
    metric: { value: 120, suffix: 'K', label: 'Signups' },
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

// Network Stats
const networkStats = [
  { value: 1, suffix: '', prefix: '#', label: 'Trend Setter', sublabel: '트렌드 선도' },
  { value: 95, suffix: '%', label: 'Engagement', sublabel: '활성 참여율' },
  { value: 3, suffix: 'x', label: 'Viral Rate', sublabel: '바이럴 확산' },
  { value: 100, suffix: '%', label: 'Retail-Driven', sublabel: '리테일 중심' },
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
          group relative p-6 w-[320px] h-[280px]
          border ${colors.border} rounded-xl
          bg-background/80 backdrop-blur-sm
          transition-all duration-500
          ${colors.glow}
          hover:border-opacity-60
          overflow-hidden
        `}
      >
        {/* Background Video or Image - shows on hover */}
        {project.bgVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-70 transition-opacity duration-500 scale-105 group-hover:scale-100"
            src={project.bgVideo}
            muted
            loop
            playsInline
            autoPlay
          />
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-70 transition-all duration-500 scale-105 group-hover:scale-100"
            style={{ backgroundImage: `url(${project.bgImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content wrapper */}
        <div className="relative z-10">
        {/* Header: Logo + Live Indicator */}
        <div className="flex items-center justify-between mb-4">
          <img 
            src={project.logo} 
            alt={project.name}
            className="h-8 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${colors.indicator} ${isLive ? 'opacity-100' : 'opacity-30'} transition-opacity`} />
            <span className={`text-[10px] font-mono uppercase tracking-wider ${colors.text}`}>
              LIVE
            </span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded ${colors.bg} ${colors.text}`}>
            {project.category}
          </span>
        </div>

        {/* Main Metric */}
        <div className="mb-4">
          <div className={`text-4xl font-bold font-mono ${colors.text}`}>
            {project.metric.prefix || ''}{project.metric.value}{project.metric.suffix}
          </div>
          <div className="text-sm text-muted-foreground font-mono uppercase tracking-wider">
            {project.metric.label}
          </div>
        </div>

        {/* Strategy Label */}
        <div className="mb-4">
          <div className="text-xs text-muted-foreground mb-1">STRATEGY</div>
          <div className="text-sm text-foreground font-medium">
            {project.strategy}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-muted-foreground">THROUGHPUT</span>
            <span className={colors.text}>{project.progress}%</span>
          </div>
          <div className="h-1 bg-border/30 rounded-full overflow-hidden">
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

// Marquee Row Component
const MarqueeRow = ({ 
  projects, 
  direction,
  speed = 25
}: { 
  projects: typeof allProjects;
  direction: 'left' | 'right';
  speed?: number;
}) => {
  // Duplicate projects 4 times for seamless loop
  const duplicated = [...projects, ...projects, ...projects, ...projects];
  
  return (
    <div className="relative overflow-hidden py-2">
      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === 'left' ? ['0%', '-25%'] : ['-25%', '0%']
        }}
        transition={{
          x: {
            duration: speed,
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
      className="text-center p-4 border border-border/30 rounded-lg bg-background/50 backdrop-blur-sm"
    >
      <div className="text-2xl md:text-3xl font-bold font-mono text-primary">
        {stat.prefix || ''}{count}
      </div>
      <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">
        {stat.label}
      </div>
      <div className="text-[10px] text-muted-foreground/60 mt-0.5">
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
      className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-mono text-sm">03</span>
            <div className="w-12 h-px bg-primary/50" />
            <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
              Portfolio
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <div className={`w-2 h-2 rounded-full bg-green-500 ${isLive ? 'opacity-100' : 'opacity-30'} transition-opacity`} />
              <span className="text-xs font-mono text-green-500">LIVE NETWORK</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Data doesn't lie. Our track record speaks for itself.
            <span className="text-foreground/60 block text-sm mt-1">
              데이터는 거짓말하지 않습니다. 우리의 실적이 증명합니다.
            </span>
          </p>
        </motion.div>

        {/* 4-Row Alternating Marquee */}
        <div className="mb-12 -mx-6 md:-mx-12 lg:-mx-20 space-y-2">
          {/* Gradient masks for entire section */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="space-y-2">
              {projectRows.map((rowProjects, index) => (
                <MarqueeRow
                  key={index}
                  projects={rowProjects}
                  direction={index % 2 === 0 ? 'right' : 'left'}
                  speed={22 + index * 2}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Network Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Network Statistics
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {networkStats.map((stat, index) => (
              <StatCard
                key={stat.label}
                stat={stat}
                index={index}
                isVisible={isInView}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceSection;
