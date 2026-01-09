import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Activity } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { Progress } from '@/components/ui/progress';

// Project logos
import mantraLogo from '@/assets/logos/mantra.png';
import storyLogo from '@/assets/logos/story-protocol.png';
import peaqLogo from '@/assets/logos/peaq.png';
import bnbLogo from '@/assets/logos/bnb.png';
import bybitLogo from '@/assets/logos/bybit.png';
import kucoinLogo from '@/assets/logos/kucoin.png';
import saharaLogo from '@/assets/logos/sahara-ai.png';
import megaethLogo from '@/assets/logos/megaeth.png';
import ondoLogo from '@/assets/logos/ondo.svg';
import polygonLogo from '@/assets/logos/polygon.svg';
import triaLogo from '@/assets/logos/tria-official.png';
import openledgerLogo from '@/assets/campaigns/openledger-hero-official.png';

// Project backgrounds
import bnbBg from '@/assets/projects/bnb-bg.jpg';
import bybitBg from '@/assets/projects/bybit-bg.jpg';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';
import saharaBg from '@/assets/projects/sahara-ai-bg.jpg';
import megaethBg from '@/assets/projects/megaeth-bg.jpg';
import ondoBg from '@/assets/projects/ondo-bg.jpg';
import polygonBg from '@/assets/projects/polygon-bg.jpg';
import triaBg from '@/assets/projects/tria-bg.jpg';

// Featured Projects Data
const featuredProjects = [
  {
    name: 'MANTRA',
    slug: 'mantra',
    logo: mantraLogo,
    category: 'RWA L1',
    strategy: 'KRW Market Entry',
    metric: { value: 450, suffix: '%', label: 'Volume Growth' },
    color: 'orange',
    glowColor: 'rgba(251,146,60,0.5)',
    progress: 92
  },
  {
    name: 'Story Protocol',
    slug: 'story-protocol',
    logo: storyLogo,
    category: 'IP Protocol',
    strategy: 'Narrative-Led FOMO',
    metric: { value: 1, suffix: 'st', prefix: '#', label: 'Kaito Ranking' },
    color: 'purple',
    glowColor: 'rgba(168,85,247,0.5)',
    progress: 100
  },
  {
    name: 'peaq',
    slug: 'peaq',
    logo: peaqLogo,
    category: 'DePIN',
    strategy: 'Wallet Acquisition',
    metric: { value: 85, suffix: 'K+', label: 'Community' },
    color: 'cyan',
    glowColor: 'rgba(34,211,238,0.5)',
    progress: 88
  },
];

// Extended Portfolio Projects
const moreProjects = [
  { name: 'BNB Chain', slug: 'bnb-chain', logo: bnbLogo, image: bnbBg },
  { name: 'Bybit', slug: 'bybit', logo: bybitLogo, image: bybitBg },
  { name: 'KuCoin', slug: 'kucoin', logo: kucoinLogo, image: kucoinBg },
  { name: 'Sahara AI', slug: 'sahara-ai', logo: saharaLogo, image: saharaBg },
  { name: 'OpenLedger', slug: 'openledger', logo: openledgerLogo, image: saharaBg },
  { name: 'MegaETH', slug: 'megaeth', logo: megaethLogo, image: megaethBg },
  { name: 'Ondo', slug: 'ondo', logo: ondoLogo, image: ondoBg },
  { name: 'Polygon', slug: 'polygon', logo: polygonLogo, image: polygonBg },
  { name: 'Tria', slug: 'tria', logo: triaLogo, image: triaBg },
];

// Network Stats
const networkStats = [
  { value: 30, suffix: '+', label: 'Projects', sublabel: '프로젝트' },
  { value: 1.5, suffix: 'B+', prefix: '$', label: 'Volume', sublabel: '거래량' },
  { value: 340, suffix: '%', label: 'Avg Growth', sublabel: '평균 성장' },
  { value: 100, suffix: '%', label: 'Retention', sublabel: '재계약율' },
];

// Featured Project Card for Marquee
const FeaturedProjectCard = ({
  project,
}: {
  project: typeof featuredProjects[0];
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
        `}
      >
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
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className={`w-4 h-4 ${colors.text}`} />
        </div>
      </div>
    </Link>
  );
};

// Marquee Component
const ProjectMarquee = ({ direction = 'left' }: { direction?: 'left' | 'right' }) => {
  // Duplicate projects for seamless loop
  const duplicatedProjects = [...featuredProjects, ...featuredProjects, ...featuredProjects];
  
  return (
    <div className="relative overflow-hidden">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%']
        }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop'
          }
        }}
      >
        {duplicatedProjects.map((project, index) => (
          <FeaturedProjectCard
            key={`${project.slug}-${index}`}
            project={project}
          />
        ))}
      </motion.div>
    </div>
  );
};

// More Project Tile
const ProjectTile = ({
  project,
  index,
  isVisible
}: {
  project: typeof moreProjects[0];
  index: number;
  isVisible: boolean;
}) => {
  return (
    <Link to={`/projects/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
        className="group relative aspect-square rounded-lg overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-300 hover:scale-105"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-3 flex flex-col justify-end">
          <img 
            src={project.logo} 
            alt={project.name}
            className="h-6 w-auto object-contain mb-1 opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
            {project.name}
          </span>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
        </div>
      </motion.div>
    </Link>
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

        {/* Featured Projects Marquee */}
        <div className="mb-12 -mx-6 md:-mx-12 lg:-mx-20">
          <ProjectMarquee direction="left" />
        </div>

        {/* More Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Extended Network • {moreProjects.length} Projects
            </span>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
            {moreProjects.map((project, index) => (
              <ProjectTile
                key={project.slug}
                project={project}
                index={index}
                isVisible={isInView}
              />
            ))}
          </div>
        </motion.div>

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

          {/* Full Progress Bar */}
          <div className="p-4 border border-border/30 rounded-lg bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-muted-foreground">NETWORK STATUS</span>
              <span className="text-green-500">100% ACTIVE</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceSection;
