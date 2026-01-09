import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Activity, Play, Video } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

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
import mantraBg from '@/assets/projects/mantra-bg.jpg';
import storyBg from '@/assets/projects/story-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import bnbBg from '@/assets/projects/bnb-bg.jpg';
import bybitBg from '@/assets/projects/bybit-bg.jpg';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';
import saharaBg from '@/assets/projects/sahara-ai-bg.jpg';
import megaethBg from '@/assets/projects/megaeth-bg.jpg';
import ondoBg from '@/assets/projects/ondo-bg.jpg';
import polygonBg from '@/assets/projects/polygon-bg.jpg';
import triaBg from '@/assets/projects/tria-bg.jpg';

// Featured Projects Data with videos
const featuredProjects = [
  {
    name: 'MANTRA',
    slug: 'mantra',
    logo: mantraLogo,
    image: mantraBg,
    video: '/videos/projects/mantra-hero.mp4',
    category: 'RWA L1',
    strategy: 'KRW Market Entry',
    metric: { value: 450, suffix: '%', label: 'Volume Growth' },
    color: 'orange',
    glowColor: 'rgba(251,146,60,0.5)',
  },
  {
    name: 'Story Protocol',
    slug: 'story-protocol',
    logo: storyLogo,
    image: storyBg,
    video: '/videos/projects/story-hero.mp4',
    category: 'IP Protocol',
    strategy: 'Narrative-Led FOMO',
    metric: { value: 1, suffix: 'st', prefix: '#', label: 'Kaito Ranking' },
    color: 'purple',
    glowColor: 'rgba(168,85,247,0.5)',
  },
  {
    name: 'peaq',
    slug: 'peaq',
    logo: peaqLogo,
    image: peaqBg,
    video: '/videos/projects/peaq-hero.mp4',
    category: 'DePIN',
    strategy: 'Wallet Acquisition',
    metric: { value: 85, suffix: 'K+', label: 'Community' },
    color: 'cyan',
    glowColor: 'rgba(34,211,238,0.5)',
  },
];

// Extended Portfolio Projects with videos
const moreProjects = [
  { name: 'Sahara AI', slug: 'sahara-ai', logo: saharaLogo, image: saharaBg, video: '/videos/projects/sahara-hero.mp4', result: 'AI Partner' },
  { name: 'KuCoin', slug: 'kucoin', logo: kucoinLogo, image: kucoinBg, video: '/videos/projects/kucoin-hero.mp4', result: 'Exchange Partner' },
  { name: 'Bybit', slug: 'bybit', logo: bybitLogo, image: bybitBg, video: '/videos/projects/bybit-hero.mp4', result: 'Top 3 CEX' },
  { name: 'BNB Chain', slug: 'bnb-chain', logo: bnbLogo, image: bnbBg, video: '/videos/projects/bnb-hero.mp4', result: 'Ecosystem Partner' },
  { name: 'OpenLedger', slug: 'openledger', logo: openledgerLogo, image: saharaBg, video: null, result: 'AI Infrastructure' },
  { name: 'MegaETH', slug: 'megaeth', logo: megaethLogo, image: megaethBg, video: null, result: 'L2 Launch' },
  { name: 'Ondo', slug: 'ondo', logo: ondoLogo, image: ondoBg, video: null, result: 'RWA Leader' },
  { name: 'Polygon', slug: 'polygon', logo: polygonLogo, image: polygonBg, video: null, result: 'L2 Partner' },
  { name: 'Tria', slug: 'tria', logo: triaLogo, image: triaBg, video: null, result: 'Wallet Infra' },
];

// Network Stats
const networkStats = [
  { value: 30, suffix: '+', label: 'Projects', sublabel: '프로젝트' },
  { value: 1.5, suffix: 'B+', prefix: '$', label: 'Volume', sublabel: '거래량' },
  { value: 340, suffix: '%', label: 'Avg Growth', sublabel: '평균 성장' },
  { value: 100, suffix: '%', label: 'Retention', sublabel: '재계약율' },
];

// Video Featured Project Card
const VideoFeaturedCard = ({
  project,
  index,
  isVisible
}: {
  project: typeof featuredProjects[0];
  index: number;
  isVisible: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const colorClasses = {
    orange: {
      text: 'text-orange-400',
      bg: 'bg-orange-500/20',
      border: 'border-orange-500/40',
      glow: 'shadow-[0_0_80px_-20px_rgba(251,146,60,0.6)]',
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/20',
      border: 'border-purple-500/40',
      glow: 'shadow-[0_0_80px_-20px_rgba(168,85,247,0.6)]',
    },
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/20',
      border: 'border-cyan-500/40',
      glow: 'shadow-[0_0_80px_-20px_rgba(34,211,238,0.6)]',
    }
  };

  const colors = colorClasses[project.color as keyof typeof colorClasses];
  
  const count = useCountUp({
    end: project.metric.value,
    duration: 2000,
    suffix: project.metric.suffix,
    isVisible
  });

  return (
    <Link to={`/projects/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          group relative overflow-hidden rounded-xl
          aspect-[4/3]
          border ${colors.border}
          transition-all duration-500
          ${isHovered ? colors.glow : ''}
          hover:border-opacity-80
        `}
      >
        {/* Background Image */}
        <motion.img
          src={project.image}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Video Overlay */}
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-500
              ${isPlaying ? 'opacity-100' : 'opacity-0'}
            `}
          />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        {/* Playing Indicator */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 left-4 flex items-center gap-2 z-10"
          >
            <motion.div
              className="w-2 h-2 bg-red-500 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
            <span className="text-xs font-mono text-white/80 uppercase tracking-wider">
              Playing
            </span>
          </motion.div>
        )}

        {/* Video Icon (when not playing) */}
        {project.video && !isPlaying && (
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <Video className="w-4 h-4 text-white/50" />
            <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
              Hover to Play
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full ${colors.bg} ${colors.text} backdrop-blur-sm`}>
            {project.category}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
          {/* Logo */}
          <img 
            src={project.logo} 
            alt={project.name}
            className="h-8 w-auto object-contain mb-3 opacity-90 group-hover:opacity-100 transition-opacity"
          />

          {/* Metric */}
          <div className="flex items-end gap-4 mb-2">
            <div className={`text-3xl md:text-4xl font-bold font-mono ${colors.text}`}
              style={{ textShadow: `0 0 40px ${project.glowColor}` }}
            >
              {project.metric.prefix || ''}{count}
            </div>
            <span className="text-white/70 font-mono text-sm mb-2 uppercase tracking-wider">
              {project.metric.label}
            </span>
          </div>

          {/* Strategy */}
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-xs font-mono">STRATEGY:</span>
            <span className="text-white/90 text-sm font-medium">
              {project.strategy}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <ArrowUpRight className={`w-5 h-5 ${colors.text}`} />
        </div>
      </motion.div>
    </Link>
  );
};

// Video Extended Project Card
const VideoProjectTile = ({
  project,
  index,
  isVisible
}: {
  project: typeof moreProjects[0];
  index: number;
  isVisible: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (project.video && videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link to={`/projects/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          group relative aspect-[4/3] rounded-xl overflow-hidden 
          border border-border/30 
          transition-all duration-300
          ${isHovered ? 'border-primary/50 scale-105 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)]' : ''}
        `}
      >
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.image})` }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Video Overlay */}
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-500
              ${isPlaying ? 'opacity-100' : 'opacity-0'}
            `}
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        {/* Playing Indicator */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-3 left-3 flex items-center gap-1.5 z-10"
          >
            <motion.div
              className="w-1.5 h-1.5 bg-red-500 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
            <span className="text-[9px] font-mono text-white/70 uppercase">Live</span>
          </motion.div>
        )}

        {/* Video Available Icon */}
        {project.video && !isPlaying && (
          <div className="absolute top-3 right-3 z-10">
            <Play className="w-3 h-3 text-white/40" />
          </div>
        )}
        
        {/* Content */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end z-10">
          <img 
            src={project.logo} 
            alt={project.name}
            className="h-7 w-auto object-contain mb-2 opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-xs font-mono text-white/50 group-hover:text-white/80 transition-colors">
            {project.result}
          </span>
        </div>

        {/* Hover glow */}
        <div className={`
          absolute inset-0 pointer-events-none transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
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
      className="text-center p-4 border border-border/30 rounded-lg bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
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

        {/* Featured Projects - 3 Column Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <VideoFeaturedCard
              key={project.slug}
              project={project}
              index={index}
              isVisible={isInView}
            />
          ))}
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
            <div className="flex items-center gap-1 ml-2">
              <Video className="w-3 h-3 text-primary/60" />
              <span className="text-[10px] font-mono text-primary/60">
                {moreProjects.filter(p => p.video).length} with video
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {moreProjects.map((project, index) => (
              <VideoProjectTile
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

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-center mt-8"
          >
            <Link 
              to="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-border/50 rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                View All Projects
              </span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceSection;
