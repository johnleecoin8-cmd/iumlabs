import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Building, Zap, TrendingUp, Users, DollarSign, BarChart3, Trophy, Cpu, Database, Activity, LineChart, Target, Sparkles } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import TestimonialsSection from '@/components/gtm/TestimonialsCarousel';

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

// ============================================
// DATA
// ============================================
const featuredProjects = [{
  name: 'MANTRA',
  tagline: "Building Korea's largest RWA community.",
  result: '+450% real volume growth post-KRW entry.',
  image: mantraBg,
  slug: 'mantra',
  category: 'RWA L1',
  strategy: 'KRW Market Entry',
  metrics: [{
    label: 'Real Volume Growth',
    value: 450,
    suffix: '%',
    prefix: '+'
  }, {
    label: 'Post-KRW Entry',
    value: 85,
    suffix: 'K+ Users'
  }]
}, {
  name: 'Story Protocol',
  tagline: 'Korea launch for the leading IP infrastructure.',
  result: '#1 Media Share of Voice in Korea.',
  image: storyBg,
  slug: 'story-protocol',
  category: 'IP Protocol',
  strategy: 'Narrative Dominance',
  metrics: [{
    label: 'Share of Voice',
    value: 1,
    prefix: '#'
  }, {
    label: 'Media Coverage',
    value: 50,
    suffix: '+ Articles'
  }]
}, {
  name: 'peaq Network',
  tagline: 'Establishing DePIN leadership in Korea.',
  result: '85K+ local wallet growth.',
  image: peaqBg,
  slug: 'peaq',
  category: 'DePIN',
  strategy: 'Wallet Acquisition',
  metrics: [{
    label: 'Wallet Adoption',
    value: 85,
    suffix: 'K+'
  }, {
    label: 'Market Position',
    value: 1,
    prefix: '#'
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
  items: ['Deep Market Research', 'Competitor Analysis', 'Narrative Localization'],
  quote: '"We don\'t guess. We analyze."',
  icon: Search
}, {
  number: '02',
  title: 'BUILD',
  subtitle: 'Foundation',
  items: ['Naver SEO Dominance', 'Community Infrastructure', 'Brand Localization'],
  quote: '"Building the localized infra."',
  icon: Building
}, {
  number: '03',
  title: 'IGNITE',
  subtitle: 'Launch',
  items: ['Tier-1 KOL Activation', 'Media Blitz Campaign', 'Viral Marketing'],
  quote: '"Maximum noise, maximum impact."',
  icon: Zap
}, {
  number: '04',
  title: 'SCALE',
  subtitle: 'Growth',
  items: ['Events & Partnerships', 'Liquidity Campaigns', 'Retention Programs'],
  quote: '"Turning hype into retention."',
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
// HERO SECTION - Enhanced with Graphics
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
  return <section ref={ref} className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-20 bg-background overflow-hidden">
      {/* Floating graphics */}
      <FloatingGraphics />
      
      {/* Mouse follow glow */}
      <motion.div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none" style={{
      background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
      left: `calc(${mousePosition.x * 100}% - 250px)`,
      top: `calc(${mousePosition.y * 100}% - 250px)`
    }} animate={{
      scale: [1, 1.1, 1]
    }} transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }} />

      <div className="relative max-w-5xl z-10">
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
      }} className="text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[1.02] tracking-tight text-foreground mb-8">
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
              Engineered for
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block" initial={{
            y: '100%'
          }} animate={{
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.35,
            ease: [0.33, 1, 0.68, 1]
          }}>
              <GlitchText className="text-primary">Liquidity.</GlitchText>
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
      }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-16">
          Launch in Korea with the most data-driven GTM framework.
          <br />
          <span className="text-foreground/80">We turn cultural barriers into your competitive moat.</span>
        </motion.p>

        {/* Stats with enhanced styling */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.7
      }} className="flex flex-wrap items-center gap-8 md:gap-12">
          <AnimatedStat value={30} suffix="+" label="Projects Launched" delay={0.8} isVisible={isInView} />
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent" />
          <AnimatedStat value={50} prefix="$" suffix="M+" label="Volume Generated" delay={1.0} isVisible={isInView} />
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent" />
          <AnimatedStat value={340} suffix="%" label="Avg. Growth Rate" delay={1.2} isVisible={isInView} />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.5
      }} className="absolute bottom-8 left-0 flex items-center gap-3">
          <motion.div className="w-6 h-10 border border-muted-foreground/30 rounded-full flex items-start justify-center p-2" animate={{
          borderColor: ['hsl(var(--muted-foreground) / 0.3)', 'hsl(var(--primary) / 0.5)', 'hsl(var(--muted-foreground) / 0.3)']
        }} transition={{
          duration: 2,
          repeat: Infinity
        }}>
            <motion.div className="w-1 h-2 bg-primary rounded-full" animate={{
            y: [0, 8, 0]
          }} transition={{
            duration: 1.5,
            repeat: Infinity
          }} />
          </motion.div>
          <span className="text-xs text-muted-foreground tracking-wider">SCROLL</span>
        </motion.div>
      </div>
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
  return <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${isHighlight ? 'text-primary' : 'text-foreground/80'}`}>
          {label}
        </span>
        <span className={`text-sm font-mono ${isHighlight ? 'text-primary' : 'text-muted-foreground'}`}>
          {value}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
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

  // Fiat Volume Data - The Fiat Impact
  const fiatVolumeData = [{
    label: 'USD',
    percentage: 100,
    value: '$XX B',
    isHighlight: false
  }, {
    label: 'KRW',
    percentage: 85,
    value: '$XX B',
    isHighlight: true
  }, {
    label: 'EUR',
    percentage: 35,
    value: '$XX B',
    isHighlight: false
  }, {
    label: 'JPY',
    percentage: 15,
    value: '$XX B',
    isHighlight: false
  }];

  // Market Logic Data - 3 Column
  const marketLogic = [{
    number: '01',
    title: 'The KRW Premium',
    subtitle: '#2 Global Fiat Volume',
    description: 'The Korean Won (KRW) consistently rivals the USD in crypto trading volume, often surpassing the Euro. Securing a foothold in the KRW market isn\'t just about exposure—it\'s about accessing a liquidity pool that rivals the global reserve currency.'
  }, {
    number: '02',
    title: 'High-Velocity Turnover',
    subtitle: 'Highest Capital Efficiency',
    description: 'Korean portfolios turn over 4-5x faster than the global average. A mere $10M in market cap here generates the trading volume of a $100M project elsewhere. This velocity creates the active charts that global market makers look for.'
  }, {
    number: '03',
    title: 'The Organic Multiplier',
    subtitle: 'Retail-Driven Price Discovery',
    description: 'Unlike markets dominated by institutional algorithms, Korea is powered by real retail conviction. Winning the "mindshare" of Korean users creates a sustained buy-pressure floor that defends your token against global volatility.'
  }];

  return <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-muted/30 border-y border-border">
      <motion.div initial={{
      opacity: 0
    }} animate={isInView ? {
      opacity: 1
    } : {}} className="max-w-7xl mx-auto">
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
          01 The Strategic Imperative
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-2">
          The Power of KRW Liquidity
        </h2>
        <p className="text-muted-foreground text-lg mb-16">
          Access the world's most active fiat gateway.
        </p>

        {/* Module A: The Market Logic - 3 Column */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {marketLogic.map((item, i) => (
            <motion.div 
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="relative p-6 border border-border bg-background hover:border-primary/30 transition-colors group"
            >
              <span className="absolute -top-3 left-6 px-2 py-0.5 bg-muted text-xs font-mono text-muted-foreground">
                {item.number}
              </span>
              <p className="text-xs tracking-widest text-primary font-medium mb-2 mt-2">
                {item.subtitle}
              </p>
              <h3 className="text-xl font-medium text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Module B: Data Visualization */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Chart 1: The Fiat Impact */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="p-6 border border-border bg-background"
          >
            <p className="text-xs tracking-widest text-primary font-medium mb-6">
              THE FIAT IMPACT — Average Daily Volume per Fiat Pair
            </p>
            <div className="space-y-4 mb-6">
              {fiatVolumeData.map((item, i) => (
                <AnimatedProgressBar 
                  key={item.label} 
                  label={item.label} 
                  percentage={item.percentage} 
                  value={item.value} 
                  delay={i * 0.15 + 0.3} 
                  isHighlight={item.isHighlight} 
                  isVisible={isInView} 
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground italic border-t border-border pt-4">
              "KRW is the only fiat pair that challenges the USD."
            </p>
          </motion.div>

          {/* Chart 2: Velocity Comparison */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="p-6 border border-border bg-background"
          >
            <p className="text-xs tracking-widest text-primary font-medium mb-6">
              VELOCITY COMPARISON — Token Velocity Ratio (Volume / Market Cap)
            </p>
            <div className="space-y-6 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground/80">Global Average</span>
                  <span className="text-sm font-mono text-muted-foreground">0.15</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-foreground/30 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '22%' } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-primary">Korea Market</span>
                  <span className="text-sm font-mono text-primary">0.68</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : {}}
                    transition={{ duration: 1.2, delay: 0.6 }}
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic border-t border-border pt-4">
              "Same Market Cap, <span className="text-primary font-medium">4x More Volume</span> in Korea."
            </p>
          </motion.div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 border border-border bg-background text-center">
            <p className="text-2xl md:text-3xl font-medium text-primary">#2</p>
            <p className="text-xs text-muted-foreground mt-1">Global Fiat Volume (KRW)</p>
          </div>
          <div className="p-4 border border-border bg-background text-center">
            <p className="text-2xl md:text-3xl font-medium text-foreground">4-5x</p>
            <p className="text-xs text-muted-foreground mt-1">Higher Velocity</p>
          </div>
          <div className="p-4 border border-border bg-background text-center">
            <p className="text-2xl md:text-3xl font-medium text-foreground">$10M</p>
            <p className="text-xs text-muted-foreground mt-1">= $100M Volume Elsewhere</p>
          </div>
          <div className="p-4 border border-border bg-background text-center">
            <p className="text-2xl md:text-3xl font-medium text-foreground">100%</p>
            <p className="text-xs text-muted-foreground mt-1">Retail-Driven</p>
          </div>
        </div>

        <motion.blockquote initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        delay: 0.5
      }} className="border-l-2 border-primary pl-6">
          <p className="text-lg md:text-xl text-foreground italic">
            "Securing a foothold in the KRW market isn't just about exposure—it's about plugging into the only fiat pair that challenges the Dollar."
          </p>
          <footer className="mt-2 text-sm text-muted-foreground">
            — The Strategic Imperative
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
// ANIMATED BAR CHART COMPONENT
// ============================================
const AnimatedBarChart = ({
  isVisible
}: {
  isVisible: boolean;
}) => {
  const data = [{
    label: 'Q1',
    value: 65,
    color: 'primary'
  }, {
    label: 'Q2',
    value: 85,
    color: 'primary'
  }, {
    label: 'Q3',
    value: 120,
    color: 'primary'
  }, {
    label: 'Q4',
    value: 180,
    color: 'primary'
  }];
  const maxValue = Math.max(...data.map(d => d.value));
  return <div className="h-48 flex items-end justify-center gap-4">
      {data.map((item, i) => <div key={item.label} className="flex flex-col items-center gap-2 flex-1 max-w-16">
          <motion.div className="w-full bg-primary/80 rounded-t relative overflow-hidden" initial={{
        height: 0
      }} animate={isVisible ? {
        height: `${item.value / maxValue * 100}%`
      } : {
        height: 0
      }} transition={{
        delay: i * 0.15,
        duration: 0.8,
        ease: "easeOut"
      }}>
            {/* Shimmer effect */}
            <motion.div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent" initial={{
          y: '100%'
        }} animate={isVisible ? {
          y: '-100%'
        } : {
          y: '100%'
        }} transition={{
          delay: i * 0.15 + 0.8,
          duration: 0.6
        }} />
            
            {/* Value label */}
            <motion.span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-primary" initial={{
          opacity: 0
        }} animate={isVisible ? {
          opacity: 1
        } : {
          opacity: 0
        }} transition={{
          delay: i * 0.15 + 0.5
        }}>
              +{item.value}%
            </motion.span>
          </motion.div>
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>)}
    </div>;
};

// ============================================
// RESULTS DASHBOARD SECTION
// ============================================
const ResultsDashboardSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10%"
  });
  const ringMetrics = [{
    value: 340,
    maxValue: 400,
    label: 'Avg. Growth',
    suffix: '%',
    prefix: '+',
    delay: 0.2
  }, {
    value: 85,
    maxValue: 100,
    label: 'Success Rate',
    suffix: '%',
    prefix: '',
    delay: 0.4
  }, {
    value: 50,
    maxValue: 100,
    label: 'Volume ($M)',
    suffix: 'M',
    prefix: '$',
    delay: 0.6
  }];
  const metrics = [{
    icon: TrendingUp,
    value: 340,
    suffix: '%',
    prefix: '+',
    label: 'Average Growth',
    description: 'Trading volume increase for launched projects'
  }, {
    icon: DollarSign,
    value: 50,
    suffix: 'M+',
    prefix: '$',
    label: 'Volume Generated',
    description: 'Total trading volume driven by our campaigns'
  }, {
    icon: Users,
    value: 500,
    suffix: 'K+',
    prefix: '',
    label: 'Korean Users',
    description: 'Community members across all projects'
  }, {
    icon: Trophy,
    value: 1,
    suffix: '',
    prefix: '#',
    label: 'Market Position',
    description: 'Kaito mindshare ranking for key clients'
  }];
  return <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-background border-b border-border overflow-hidden">
      <motion.div initial={{
      opacity: 0
    }} animate={isInView ? {
      opacity: 1
    } : {}} className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
            03 Results
          </p>
          <h2 className="text-3xl md:text-5xl font-medium text-foreground mb-4">
            The Numbers That Matter
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our data-driven approach delivers measurable results. Here's what we've achieved for our clients.
          </p>
        </div>

        {/* Circular Progress Rings */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-20">
          {ringMetrics.map(metric => <CircularProgressRing key={metric.label} value={metric.value} maxValue={metric.maxValue} label={metric.label} suffix={metric.suffix} prefix={metric.prefix} delay={metric.delay} isVisible={isInView} size={140} strokeWidth={10} />)}
        </div>

        {/* Quarterly Growth Chart */}
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        delay: 0.8
      }} className="max-w-2xl mx-auto mb-20">
          <p className="text-xs tracking-widest text-primary font-medium mb-6 text-center">
            QUARTERLY GROWTH TRAJECTORY
          </p>
          <div className="p-6 border border-border bg-muted/30 rounded-lg">
            <AnimatedBarChart isVisible={isInView} />
          </div>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => <motion.div key={metric.label} initial={{
          opacity: 0,
          y: 40
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          delay: i * 0.1 + 1,
          duration: 0.6
        }} className="group relative p-6 border border-border bg-background hover:border-primary/50 transition-all duration-300">
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <metric.icon className="w-5 h-5 text-primary" />
              </div>

              {/* Value with count-up */}
              <p className="text-4xl md:text-5xl font-medium text-foreground mb-2">
                {useCountUp({
              end: metric.value,
              prefix: metric.prefix,
              suffix: metric.suffix,
              delay: i * 100 + 1000,
              isVisible: isInView,
              duration: 2000
            })}
              </p>

              {/* Label */}
              <p className="text-sm font-medium text-foreground mb-1">{metric.label}</p>
              <p className="text-xs text-muted-foreground">{metric.description}</p>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
              </div>
            </motion.div>)}
        </div>
      </motion.div>
    </section>;
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
      const timer = setTimeout(() => setProgress((value / maxValue) * 100), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, value, maxValue, delay]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const colorClass = color === 'green' ? 'hsl(142, 76%, 36%)' : color === 'yellow' ? 'hsl(48, 96%, 53%)' : 'hsl(var(--primary))';

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colorClass}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay }}
            style={{ filter: `drop-shadow(0 0 4px ${colorClass})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-xs font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.5 }}
          >
            {value}%
          </motion.span>
        </div>
      </div>
      <span className="text-[10px] text-muted-foreground text-center">{label}</span>
    </div>
  );
};

// ============================================
// LLM ENGINE VISUALIZATION COMPONENT
// ============================================
const LLMEngineVisualization = ({ isVisible }: { isVisible: boolean }) => {
  const [activeDataSource, setActiveDataSource] = useState<number | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  // Simulated live data values
  const [liveData, setLiveData] = useState({
    onchain: 847,
    social: 1243,
    market: 2891,
    // Output metrics
    timing: 94,
    channels: 87,
    budget: 92,
    risk: 23
  });

  useEffect(() => {
    if (!isVisible) return;
    
    // Animate processing bar
    const progressTimer = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    // Cycle through phases
    const phaseTimer = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % 4);
    }, 3000);

    // Simulate live data updates
    const dataTimer = setInterval(() => {
      setLiveData(prev => ({
        onchain: Math.floor(800 + Math.random() * 100),
        social: Math.floor(1200 + Math.random() * 100),
        market: Math.floor(2800 + Math.random() * 200),
        timing: Math.floor(92 + Math.random() * 6),
        channels: Math.floor(85 + Math.random() * 10),
        budget: Math.floor(90 + Math.random() * 8),
        risk: Math.floor(18 + Math.random() * 10)
      }));
    }, 2500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(phaseTimer);
      clearInterval(dataTimer);
    };
  }, [isVisible]);

  const dataSources = [
    { 
      id: 0, 
      icon: Database, 
      label: 'Onchain Data', 
      items: ['DEX Volume', 'Wallet Activity', 'Token Transfers', 'Smart Contracts'],
      value: liveData.onchain,
      suffix: ' signals',
      color: 'from-blue-500/20 to-transparent'
    },
    { 
      id: 1, 
      icon: Activity, 
      label: 'Social Signals', 
      items: ['Twitter/X Mentions', 'Naver Trends', 'Discord Activity', 'Telegram Buzz'],
      value: liveData.social,
      suffix: ' signals',
      color: 'from-purple-500/20 to-transparent'
    },
    { 
      id: 2, 
      icon: LineChart, 
      label: 'Market Data', 
      items: ['CEX Order Books', 'Price Action', 'Liquidity Depth', 'Funding Rates'],
      value: liveData.market,
      suffix: ' data points',
      color: 'from-green-500/20 to-transparent'
    }
  ];

  const pipelineStages = [
    { label: 'COLLECT', desc: 'Real-time data ingestion', icon: Database },
    { label: 'PROCESS', desc: 'AI pattern recognition', icon: Cpu },
    { label: 'OPTIMIZE', desc: 'Strategy generation', icon: Target },
    { label: 'EXECUTE', desc: 'Precision timing', icon: Zap }
  ];

  const outputMetrics = [
    { 
      label: 'Launch Timing', 
      sublabel: 'Optimal window confidence',
      value: liveData.timing, 
      color: 'green',
      icon: Target
    },
    { 
      label: 'Channel Mix', 
      sublabel: 'Platform optimization',
      value: liveData.channels, 
      color: 'primary',
      icon: Users
    },
    { 
      label: 'Budget Efficiency', 
      sublabel: 'ROI prediction',
      value: liveData.budget, 
      color: 'primary',
      icon: DollarSign
    },
    { 
      label: 'Risk Score', 
      sublabel: 'Market volatility factor',
      value: liveData.risk, 
      color: 'yellow',
      icon: Activity,
      inverted: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="mb-20 p-6 md:p-10 border border-primary/30 bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden"
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 3) * 20}%`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3
          }}
        />
      ))}

      {/* Central glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 60%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-4"
            animate={{ 
              boxShadow: ['0 0 20px hsl(var(--primary) / 0.1)', '0 0 40px hsl(var(--primary) / 0.2)', '0 0 20px hsl(var(--primary) / 0.1)'],
              borderColor: ['hsl(var(--primary) / 0.3)', 'hsl(var(--primary) / 0.6)', 'hsl(var(--primary) / 0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-xs font-mono text-primary tracking-wider">POWERED BY IUM ONCHAIN LLM ENGINE</span>
          </motion.div>
          <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-3">
            The Intelligence Engine
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            We don't guess. Our proprietary LLM analyzes <span className="text-primary font-medium">50+ onchain and social signals</span> in real-time to deliver data-driven Korea GTM strategies.
          </p>
        </div>

        {/* Pipeline stages with active indicator */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {pipelineStages.map((stage, i) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="flex items-center gap-2"
            >
              <motion.div 
                className={`px-4 py-3 bg-background border transition-all duration-300 ${currentPhase === i ? 'border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]' : 'border-border'}`}
                animate={currentPhase === i ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <stage.icon className={`w-3 h-3 ${currentPhase === i ? 'text-primary' : 'text-muted-foreground'}`} />
                  <p className={`text-xs font-mono ${currentPhase === i ? 'text-primary' : 'text-muted-foreground'}`}>{stage.label}</p>
                </div>
                <p className="text-[10px] text-muted-foreground">{stage.desc}</p>
                {currentPhase === i && (
                  <motion.div 
                    className="h-0.5 bg-primary mt-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5 }}
                  />
                )}
              </motion.div>
              {i < pipelineStages.length - 1 && (
                <motion.div
                  animate={{ 
                    x: [0, 5, 0], 
                    opacity: currentPhase === i ? [0.8, 1, 0.8] : [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                >
                  <ArrowRight className={`w-4 h-4 ${currentPhase === i ? 'text-primary' : 'text-primary/30'}`} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Main visualization grid */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
          {/* Data Sources */}
          <div className="space-y-4">
            <p className="text-xs tracking-widest text-muted-foreground mb-4 text-center lg:text-left flex items-center gap-2 justify-center lg:justify-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              LIVE DATA SOURCES
            </p>
            {dataSources.map((source, i) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.5 }}
                onMouseEnter={() => setActiveDataSource(source.id)}
                onMouseLeave={() => setActiveDataSource(null)}
                className={`relative p-4 border bg-background transition-all duration-300 cursor-pointer overflow-hidden ${activeDataSource === source.id ? 'border-primary shadow-[0_0_25px_hsl(var(--primary)/0.15)]' : 'border-border hover:border-primary/30'}`}
              >
                {/* Gradient overlay on hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-r ${source.color} opacity-0`}
                  animate={{ opacity: activeDataSource === source.id ? 0.5 : 0 }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${activeDataSource === source.id ? 'bg-primary/20' : 'bg-muted'}`}>
                        <source.icon className={`w-4 h-4 transition-colors ${activeDataSource === source.id ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{source.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.span 
                        className="w-2 h-2 rounded-full bg-green-500"
                        animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <motion.span 
                        key={source.value}
                        initial={{ opacity: 0.5, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-mono text-primary"
                      >
                        {source.value.toLocaleString()}{source.suffix}
                      </motion.span>
                    </div>
                  </div>
                  
                  {/* Data items with mini progress indicators */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {source.items.map((item, j) => (
                      <motion.div 
                        key={j} 
                        className="flex items-center gap-1.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 + j * 0.05 + 0.6 }}
                      >
                        <motion.div 
                          className="w-1 h-1 rounded-full bg-primary/50"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: j * 0.2 }}
                        />
                        <span className="text-[10px] text-muted-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mini throughput bar */}
                  <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary/50 rounded-full"
                      animate={{ width: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                  </div>
                </div>

                {/* Animated data flow particles */}
                {activeDataSource === source.id && (
                  <motion.div
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                    animate={{ x: [0, 20], opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* LLM Core - Enhanced */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, type: "spring" }}
            className="relative flex flex-col items-center mt-20 lg:mt-32"
          >
            {/* Connection lines with flowing particles - Left (Enhanced Wave) */}
            <div className="hidden lg:flex absolute left-0 top-1/2 -translate-x-full items-center w-32">
              {/* Glow background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent blur-md"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Multiple parallel lines with wave particles */}
              {[-8, 0, 8].map((offset, lineIndex) => (
                <div 
                  key={lineIndex}
                  className="absolute w-full h-px"
                  style={{ 
                    top: `calc(50% + ${offset}px)`,
                    background: `linear-gradient(to left, hsl(var(--primary) / ${0.6 - lineIndex * 0.1}), transparent)`
                  }}
                >
                  {/* Wave particles */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute top-0 rounded-full bg-primary -translate-y-1/2"
                      style={{ 
                        width: i % 2 === 0 ? '8px' : '5px',
                        height: i % 2 === 0 ? '8px' : '5px',
                        boxShadow: '0 0 8px hsl(var(--primary) / 0.8)'
                      }}
                      animate={{ 
                        x: [128, 0], 
                        y: [0, offset > 0 ? -6 : 6, 0, offset > 0 ? 6 : -6, 0],
                        opacity: [0, 0.7, 1, 0.7, 0],
                        scale: [0.4, 1, 1.3, 1, 0.4]
                      }}
                      transition={{ 
                        duration: 2.2 + lineIndex * 0.3, 
                        repeat: Infinity, 
                        delay: i * 0.35 + lineIndex * 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  
                  {/* Glow trail for each particle */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={`glow-${i}`}
                      className="absolute top-0 w-4 h-4 rounded-full -translate-y-1/2 blur-sm"
                      style={{ background: 'hsl(var(--primary) / 0.4)' }}
                      animate={{ 
                        x: [128, 0], 
                        y: [0, offset > 0 ? -6 : 6, 0, offset > 0 ? 6 : -6, 0],
                        opacity: [0, 0.5, 0.8, 0.5, 0]
                      }}
                      transition={{ 
                        duration: 2.2 + lineIndex * 0.3, 
                        repeat: Infinity, 
                        delay: i * 0.7 + lineIndex * 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              ))}
              
              {/* Pulsing line effect */}
              <motion.div
                className="absolute w-full h-0.5 top-1/2 -translate-y-1/2"
                style={{ background: 'linear-gradient(to left, hsl(var(--primary)), transparent)' }}
                animate={{ opacity: [0.2, 0.8, 0.2], scaleX: [0.7, 1, 0.7] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            </div>

            {/* Main LLM Core Box */}
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div 
                className="absolute -inset-4 rounded-lg"
                style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative p-8 border-2 border-primary bg-background">
                {/* Pulsing border */}
                <motion.div 
                  className="absolute inset-0 border-2 border-primary/50 rounded-sm"
                  animate={{ opacity: [0, 0.8, 0], scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Corner accents */}
                {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                  <motion.div 
                    key={i}
                    className={`absolute ${pos} w-3 h-3 border-primary ${i < 2 ? 'border-t-2' : 'border-b-2'} ${i % 2 === 0 ? 'border-l-2' : 'border-r-2'}`}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
                
                <div className="text-center space-y-4">
                  {/* Rotating icon with glow */}
                  <div className="relative w-20 h-20 mx-auto">
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)' }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="relative"
                    >
                      <Sparkles className="w-20 h-20 text-primary" />
                    </motion.div>
                  </div>
                  
                  <div>
                    <p className="text-lg font-medium text-foreground">ium LLM Core</p>
                    <p className="text-xs text-muted-foreground">Real-time Analysis Engine</p>
                  </div>

                  {/* Processing visualization */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                      <span>ANALYZING</span>
                      <span>{Math.floor(processingProgress)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden relative">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-primary via-primary to-primary/50 rounded-full"
                        style={{ width: `${processingProgress}%` }}
                      />
                      {/* Shimmer effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
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

            {/* Connection lines with flowing particles - Right (Enhanced Wave) */}
            <div className="hidden lg:flex absolute right-0 top-1/2 translate-x-full items-center w-32">
              {/* Glow background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent blur-md"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              
              {/* Multiple parallel lines with wave particles */}
              {[-8, 0, 8].map((offset, lineIndex) => (
                <div 
                  key={lineIndex}
                  className="absolute w-full h-px"
                  style={{ 
                    top: `calc(50% + ${offset}px)`,
                    background: `linear-gradient(to right, hsl(var(--primary) / ${0.6 - lineIndex * 0.1}), transparent)`
                  }}
                >
                  {/* Wave particles */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute top-0 rounded-full bg-primary -translate-y-1/2"
                      style={{ 
                        width: i % 2 === 0 ? '8px' : '5px',
                        height: i % 2 === 0 ? '8px' : '5px',
                        boxShadow: '0 0 8px hsl(var(--primary) / 0.8)'
                      }}
                      animate={{ 
                        x: [0, 128], 
                        y: [0, offset > 0 ? -6 : 6, 0, offset > 0 ? 6 : -6, 0],
                        opacity: [0, 0.7, 1, 0.7, 0],
                        scale: [0.4, 1, 1.3, 1, 0.4]
                      }}
                      transition={{ 
                        duration: 2.2 + lineIndex * 0.3, 
                        repeat: Infinity, 
                        delay: i * 0.35 + lineIndex * 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  
                  {/* Glow trail for each particle */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={`glow-${i}`}
                      className="absolute top-0 w-4 h-4 rounded-full -translate-y-1/2 blur-sm"
                      style={{ background: 'hsl(var(--primary) / 0.4)' }}
                      animate={{ 
                        x: [0, 128], 
                        y: [0, offset > 0 ? -6 : 6, 0, offset > 0 ? 6 : -6, 0],
                        opacity: [0, 0.5, 0.8, 0.5, 0]
                      }}
                      transition={{ 
                        duration: 2.2 + lineIndex * 0.3, 
                        repeat: Infinity, 
                        delay: i * 0.7 + lineIndex * 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              ))}
              
              {/* Pulsing line effect */}
              <motion.div
                className="absolute w-full h-0.5 top-1/2 -translate-y-1/2"
                style={{ background: 'linear-gradient(to right, hsl(var(--primary)), transparent)' }}
                animate={{ opacity: [0.2, 0.8, 0.2], scaleX: [0.7, 1, 0.7] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Output Panel - Enhanced with gauges */}
          <div className="space-y-4">
            <p className="text-xs tracking-widest text-muted-foreground mb-4 text-center lg:text-right flex items-center gap-2 justify-center lg:justify-end">
              STRATEGIC OUTPUT
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </p>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1 }}
              className="p-6 border border-primary/50 bg-background relative overflow-hidden"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)',
                backgroundSize: '16px 16px'
              }} />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-1.5 rounded bg-primary/20">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Optimized Strategy</span>
                  <motion.span 
                    className="ml-auto text-[10px] px-2 py-0.5 bg-green-500/20 text-green-500 rounded-full"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    LIVE
                  </motion.span>
                </div>

                {/* Circular Gauges Row */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {outputMetrics.map((metric, i) => (
                    <MiniGauge
                      key={metric.label}
                      value={metric.inverted ? 100 - metric.value : metric.value}
                      label={metric.label.split(' ')[0]}
                      color={metric.color}
                      delay={1.2 + i * 0.15}
                      isVisible={isVisible}
                      size={44}
                    />
                  ))}
                </div>

                {/* Detailed metrics with bars */}
                <div className="space-y-3">
                  {outputMetrics.map((metric, i) => (
                    <motion.div 
                      key={metric.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1.4 + i * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <metric.icon className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-foreground font-medium">{metric.label}</span>
                        </div>
                        <motion.span 
                          key={metric.value}
                          initial={{ opacity: 0.5 }}
                          animate={{ opacity: 1 }}
                          className={`text-xs font-mono ${metric.color === 'green' ? 'text-green-500' : metric.color === 'yellow' ? 'text-yellow-500' : 'text-primary'}`}
                        >
                          {metric.inverted ? `${metric.value}% (Low)` : `${metric.value}%`}
                        </motion.span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full rounded-full ${metric.color === 'green' ? 'bg-green-500' : metric.color === 'yellow' ? 'bg-yellow-500' : 'bg-primary'}`}
                            initial={{ width: 0 }}
                            animate={isVisible ? { width: `${metric.inverted ? metric.value : metric.value}%` } : {}}
                            transition={{ duration: 1.2, delay: 1.5 + i * 0.1 }}
                          />
                        </div>
                        <span className="text-[9px] text-muted-foreground w-20 text-right">{metric.sublabel}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Confidence Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8 }}
              className="p-4 border border-green-500/30 bg-green-500/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.2, 1], boxShadow: ['0 0 0 0 hsl(142, 76%, 36%, 0.4)', '0 0 0 8px hsl(142, 76%, 36%, 0)', '0 0 0 0 hsl(142, 76%, 36%, 0)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs font-medium text-green-500">High Confidence Output</span>
                </div>
                <span className="text-xs font-mono text-green-500">
                  {Math.floor((liveData.timing + liveData.channels + liveData.budget + (100 - liveData.risk)) / 4)}% avg
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Connection to Framework */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-border bg-muted/30 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground">This intelligence powers every stage of our framework</p>
          </div>
          <motion.div
            className="mt-4"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-6 h-6 text-primary mx-auto rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
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
  return <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-background relative overflow-hidden">
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
    } : {}} className="max-w-6xl mx-auto relative z-10">
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
          02 Process
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-6">
          The ium Algorithm
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          Our proven 4-stage framework has helped 30+ projects successfully launch in Korea.
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

              <ul className="space-y-2 mb-6">
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

              <p className="text-xs text-primary/80 italic border-t border-border pt-4">
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
          {/* Image with parallax effect */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.img src={project.image} alt={project.name} className="w-full h-full object-cover" animate={{
            scale: isHovered ? 1.1 : 1,
            x: isHovered ? tilt.y * 2 : 0,
            y: isHovered ? tilt.x * 2 : 0
          }} transition={{
            duration: 0.3
          }} />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Floating badge on hover */}
            <motion.div className="absolute bottom-4 left-4 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }} transition={{
            duration: 0.3
          }}>
              View Case Study →
            </motion.div>
          </div>

          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs tracking-widest text-primary uppercase font-medium">
                {project.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span className="text-xs text-muted-foreground">
                {project.strategy}
              </span>
            </div>
            
            <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
              {project.name}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.tagline}
            </p>
            
            {/* Metrics with animation */}
            <div className="pt-3 mt-3 border-t border-border space-y-1">
              {project.metrics.map((metric, mi) => <CaseMetricBar key={metric.label} label={metric.label} value={metric.value} suffix={metric.suffix} prefix={metric.prefix} delay={0.3 + mi * 0.1} isVisible={isVisible} />)}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>;
};
const StrategyInActionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10%"
  });
  return <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-muted/20 border-t border-border">
      <motion.div initial={{
      opacity: 0
    }} animate={isInView ? {
      opacity: 1
    } : {}} className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
            04 Strategy in Action
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Case Studies
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Real results from real projects. See how we've helped leading Web3 projects dominate the Korean market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, i) => <TiltCaseCard key={project.slug} project={project} index={i} isVisible={isInView} />)}
        </div>

        {/* View All Projects Link */}
        <motion.div initial={{
        opacity: 0
      }} animate={isInView ? {
        opacity: 1
      } : {}} transition={{
        delay: 0.5
      }} className="mt-16 text-center">
          <Link to="/projects" className="group inline-flex items-center gap-3 px-6 py-3 border border-border hover:border-primary text-sm text-muted-foreground hover:text-primary transition-all duration-300">
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>;
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true
  });
  return <section ref={ref} className="py-20 bg-muted/30 border-y border-border overflow-hidden">
      <motion.p initial={{
      opacity: 0
    }} animate={isInView ? {
      opacity: 1
    } : {}} className="text-muted-foreground text-sm tracking-widest uppercase mb-12 px-6 md:px-12 lg:px-20">
        Trusted By Industry Leaders
      </motion.p>

      {/* First row - left to right */}
      <div className="relative mb-8">
        <div className="flex animate-marquee">
          {[...clientLogos, ...clientLogos].map((client, i) => <div key={`row1-${i}`} className="flex-shrink-0 mx-8 md:mx-12 group">
              <img src={client.logo} alt={client.name} className="h-8 md:h-10 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
            </div>)}
        </div>
      </div>

      {/* Second row - right to left */}
      <div className="relative">
        <div className="flex animate-marquee-reverse">
          {[...clientLogos.slice().reverse(), ...clientLogos.slice().reverse()].map((client, i) => <div key={`row2-${i}`} className="flex-shrink-0 mx-8 md:mx-12 group">
              <img src={client.logo} alt={client.name} className="h-8 md:h-10 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
            </div>)}
        </div>
      </div>
    </section>;
};

// ============================================
// CTA SECTION - Enhanced with Gradient
// ============================================
const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true
  });
  return <section ref={ref} className="relative px-6 md:px-12 lg:px-20 py-32 overflow-hidden" style={{
    background: 'linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(240 10% 10%) 50%, hsl(var(--foreground)) 100%)'
  }}>
      {/* Subtle glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none" style={{
      background: 'hsl(var(--primary))'
    }} />
      
      <motion.div initial={{
      opacity: 0,
      y: 40
    }} animate={isInView ? {
      opacity: 1,
      y: 0
    } : {}} transition={{
      duration: 0.8
    }} className="relative max-w-3xl z-10">
        <h2 className="text-[clamp(2rem,6vw,4rem)] font-medium leading-tight mb-4 text-background">
          Ready to execute your
          <br />
          <span className="text-primary">Korea Strategy?</span>
        </h2>
        
        <p className="text-background/60 text-lg mb-10 max-w-xl">
          Join 30+ projects that have successfully launched in the Korean market with our data-driven GTM framework.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link to="/research" className="group inline-flex items-center gap-3 px-8 py-4 border border-background/30 text-background font-medium text-sm tracking-wide hover:border-primary hover:bg-primary/10 transition-all duration-300">
            Get the Market Report
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]">
            Schedule a Strategy Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>;
};

// ============================================
// MAIN COMPONENT
// ============================================
const GTMService = () => {
  usePageMeta("Korea GTM Strategy | Ium Labs", "Engineered for Liquidity. Launch in Korea with the most data-driven GTM framework. 30+ projects. $50M+ volume.");
  return <>
      <ServiceSchema name="Korea GTM Strategy" description="Go-to-market strategy for Web3 projects entering the Korean market. Data-driven 4-stage framework." url="/services/gtm" provider="Ium Labs" areaServed="South Korea" />
      <Navbar />
      <main className="bg-background">
        <HeroSection />
        <MarketIntelligenceSection />
        <FrameworkSection />
        <ResultsDashboardSection />
        <StrategyInActionSection />
        <TestimonialsSection />
        <ClientLogosMarquee />
        <CTASection />
      </main>
      <Footer />
    </>;
};
export default GTMService;