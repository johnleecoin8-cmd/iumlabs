import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import SectionHeader from '@/components/SectionHeader';

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
import spacecoinLogo from '@/assets/logos/spacecoin.png';

export interface FeaturedProject {
  name: string;
  slug: string;
  logo: string;
  category: string;
  metric: { value: number; suffix?: string; prefix?: string; label: string };
  result: string;
  color: 'orange' | 'purple' | 'cyan' | 'yellow' | 'green' | 'blue' | 'pink';
  progress: number;
}

// Full project data registry
const projectRegistry: Record<string, FeaturedProject> = {
  'story-protocol': {
    name: 'Story Protocol',
    slug: 'story-protocol',
    logo: storyLogo,
    category: 'IP Infra',
    metric: { value: 1, prefix: '#', label: 'Share of Voice' },
    result: 'Dominated crypto-social discussions for 3 consecutive weeks',
    color: 'purple',
    progress: 100
  },
  'peaq': {
    name: 'peaq',
    slug: 'peaq',
    logo: peaqLogo,
    category: 'DePIN',
    metric: { value: 25, suffix: 'K+', label: 'Active Wallets' },
    result: 'Converted community hype into actual on-chain users',
    color: 'cyan',
    progress: 88
  },
  'mantra': {
    name: 'MANTRA',
    slug: 'mantra',
    logo: mantraLogo,
    category: 'RWA L1',
    metric: { value: 450, suffix: '%', prefix: '+', label: 'Volume Growth' },
    result: 'Engineered sustainable liquidity through strategic KRW pairing',
    color: 'orange',
    progress: 92
  },
  'bnb-chain': {
    name: 'BNB Chain',
    slug: 'bnb-chain',
    logo: bnbLogo,
    category: 'L1 Ecosystem',
    metric: { value: 850, suffix: 'K', label: 'Impressions' },
    result: 'Massive reach through exchange partnership campaign',
    color: 'yellow',
    progress: 95
  },
  'bybit': {
    name: 'Bybit',
    slug: 'bybit',
    logo: bybitLogo,
    category: 'CEX',
    metric: { value: 45, suffix: 'K+', label: 'New Users' },
    result: 'User acquisition through strategic Korean market campaign',
    color: 'orange',
    progress: 89
  },
  'kucoin': {
    name: 'KuCoin',
    slug: 'kucoin',
    logo: kucoinLogo,
    category: 'CEX',
    metric: { value: 35, suffix: 'K', label: 'New Users' },
    result: 'Community airdrop drove massive user growth',
    color: 'green',
    progress: 91
  },
  'sahara-ai': {
    name: 'Sahara AI',
    slug: 'sahara-ai',
    logo: saharaLogo,
    category: 'AI Infra',
    metric: { value: 8, suffix: 'K+', label: 'Community' },
    result: 'Built thought leadership in AI x Crypto space',
    color: 'blue',
    progress: 87
  },
  'megaeth': {
    name: 'MegaETH',
    slug: 'megaeth',
    logo: megaethLogo,
    category: 'L2',
    metric: { value: 38, suffix: 'K+', label: 'MAU' },
    result: 'Viral hype building pre-launch success',
    color: 'pink',
    progress: 94
  },
  'fogo': {
    name: 'FOGO',
    slug: 'fogo',
    logo: fogoLogo,
    category: 'L1',
    metric: { value: 4, suffix: 'K+', label: 'Community' },
    result: 'Grassroots community building from scratch',
    color: 'orange',
    progress: 88
  },
  'polygon': {
    name: 'Polygon',
    slug: 'polygon',
    logo: polygonLogo,
    category: 'L2',
    metric: { value: 280, suffix: '%', label: 'TVL Growth' },
    result: 'Ecosystem growth through strategic partnerships',
    color: 'purple',
    progress: 86
  },
  'tria': {
    name: 'Tria',
    slug: 'tria',
    logo: triaLogo,
    category: 'Wallet',
    metric: { value: 28, suffix: 'K', label: 'Signups' },
    result: 'User acquisition success in Korean market',
    color: 'cyan',
    progress: 83
  },
  'openledger': {
    name: 'OpenLedger',
    slug: 'openledger',
    logo: openledgerLogo,
    category: 'Data Layer',
    metric: { value: 12, suffix: 'K', label: 'Downloads' },
    result: 'Developer outreach campaign success',
    color: 'purple',
    progress: 82
  },
  'spacecoin': {
    name: 'SpaceCoin',
    slug: 'spacecoin',
    logo: spacecoinLogo,
    category: 'Infrastructure',
    metric: { value: 200, suffix: 'K+', label: 'Impressions' },
    result: 'Decentralized satellite internet awareness',
    color: 'blue',
    progress: 85
  },
};

const colorClasses = {
  orange: {
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    glow: 'hover:shadow-[0_0_40px_-10px_rgba(251,146,60,0.4)]',
    indicator: 'bg-orange-500',
    progress: 'bg-orange-500'
  },
  purple: {
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    glow: 'hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]',
    indicator: 'bg-purple-500',
    progress: 'bg-purple-500'
  },
  cyan: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    glow: 'hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.4)]',
    indicator: 'bg-cyan-500',
    progress: 'bg-cyan-500'
  },
  yellow: {
    text: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    glow: 'hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.4)]',
    indicator: 'bg-yellow-500',
    progress: 'bg-yellow-500'
  },
  green: {
    text: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    glow: 'hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.4)]',
    indicator: 'bg-green-500',
    progress: 'bg-green-500'
  },
  blue: {
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    glow: 'hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)]',
    indicator: 'bg-blue-500',
    progress: 'bg-blue-500'
  },
  pink: {
    text: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    glow: 'hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.4)]',
    indicator: 'bg-pink-500',
    progress: 'bg-pink-500'
  }
};

// Project Card Component
const ProjectCard = ({ project }: { project: FeaturedProject }) => {
  const [isLive, setIsLive] = useState(true);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    const interval = setInterval(() => setIsLive(prev => !prev), 1000);
    return () => clearInterval(interval);
  }, []);

  const colors = colorClasses[project.color];

  return (
    <Link to={`/projects/${project.slug}`} className="block group">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={`
          relative p-4 md:p-6 h-full min-h-[200px] md:min-h-[240px]
          border ${colors.border} rounded-xl
          bg-background/80 backdrop-blur-sm
          transition-all duration-500
          ${colors.glow}
          hover:border-opacity-60
          overflow-hidden
        `}
      >
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header: Logo + Live Indicator */}
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <img 
              src={project.logo} 
              alt={project.name} 
              className="h-7 md:h-9 object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${colors.indicator} ${isLive ? 'animate-pulse' : 'opacity-50'}`} />
              <span className="text-[10px] md:text-xs text-white/40 font-medium">LIVE</span>
            </div>
          </div>

          {/* Category Tag */}
          <span className={`inline-flex self-start px-2 py-0.5 md:px-2.5 md:py-1 text-[10px] md:text-xs rounded-md ${colors.bg} ${colors.text} border ${colors.border} mb-3`}>
            {project.category}
          </span>

          {/* Metric */}
          <div className="mb-2 md:mb-3">
            <span className={`text-2xl md:text-3xl font-bold ${colors.text}`}>
              {project.metric.prefix}{project.metric.value}{project.metric.suffix}
            </span>
            <span className="block text-[10px] md:text-xs text-white/40 mt-0.5 uppercase tracking-wider">
              {project.metric.label}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">Execution</span>
              <span className={`text-[10px] md:text-xs ${colors.text}`}>{project.progress}%</span>
            </div>
            <div className="h-1 md:h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${colors.progress} rounded-full`}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${project.progress}%` } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>

          {/* Hover Result Text */}
          <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <p className="text-xs md:text-sm text-white/70 line-clamp-2 bg-black/60 backdrop-blur-sm p-2 rounded-lg border border-white/10">
              {project.result}
            </p>
          </div>

          {/* Arrow */}
          <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 md:w-5 md:h-5 text-white/20 group-hover:text-white/60 transition-colors" />
        </div>
      </motion.div>
    </Link>
  );
};

interface ServiceFeaturedCasesProps {
  projectSlugs: string[];
  sectionNumber: string;
  accentColor: string;
}

const ServiceFeaturedCases = ({ projectSlugs, sectionNumber, accentColor }: ServiceFeaturedCasesProps) => {
  // Get projects from registry
  const projects = projectSlugs
    .map(slug => projectRegistry[slug])
    .filter(Boolean);

  if (projects.length === 0) return null;

  return (
    <section className="bg-[#0F0F0F]">
      <div className="border-t border-white/10">
        <SectionHeader 
          number={sectionNumber} 
          title="Featured Cases" 
          badge="Proven Results" 
        />
        
        <div className="py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            {/* Grid of project cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>

            {/* View All Link */}
            <motion.div 
              className="mt-8 md:mt-10 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 text-sm font-medium"
              >
                <span>View All Cases</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeaturedCases;
