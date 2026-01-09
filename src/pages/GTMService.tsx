import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Building, Zap, TrendingUp, Users, DollarSign, BarChart3, Trophy, Clock, Database, Network, Sparkles } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import TestimonialsSection from '@/components/gtm/TestimonialsCarousel';

// Project backgrounds
import storyBg from '@/assets/projects/story-bg.jpg';
import mantraBg from '@/assets/projects/mantra-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';

// Client logos
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

// ============================================
// DATA
// ============================================
const featuredProjects = [
  {
    name: 'MANTRA',
    tagline: "Building Korea's largest RWA community.",
    result: '+500% community growth.',
    image: mantraBg,
    slug: 'mantra',
    category: 'RWA L1',
    metrics: [
      { label: 'Community Growth', value: 500, suffix: '%' },
      { label: 'Korean Users', value: 85, suffix: 'K+' },
    ]
  },
  {
    name: 'Story Protocol',
    tagline: 'Korea launch for the leading IP infrastructure.',
    result: '+340% trading volume.',
    image: storyBg,
    slug: 'story-protocol',
    category: 'IP Protocol',
    metrics: [
      { label: 'Trading Volume', value: 340, suffix: '%' },
      { label: 'Media Coverage', value: 50, suffix: '+' },
    ]
  },
  {
    name: 'peaq Network',
    tagline: 'Establishing DePIN leadership in Korea.',
    result: '#1 in Korean market.',
    image: peaqBg,
    slug: 'peaq',
    category: 'DePIN',
    metrics: [
      { label: 'Market Rank', value: 1, prefix: '#' },
      { label: 'Mindshare', value: 78, suffix: '%' },
    ]
  },
];

const frameworkStages = [
  { number: '01', title: 'ANALYZE', items: ['Deep Market Research', 'Competitor Analysis', 'Narrative Localization'], icon: Search },
  { number: '02', title: 'BUILD', items: ['Naver SEO', 'Community Infra', 'Brand Localization'], icon: Building },
  { number: '03', title: 'IGNITE', items: ['Tier-1 KOL Activation', 'Media Blitz', 'Viral Marketing'], icon: Zap },
  { number: '04', title: 'SCALE', items: ['Events & Partnerships', 'Liquidity Campaigns', 'Retention Programs'], icon: TrendingUp },
];

const clientLogos = [
  { name: 'BNB Chain', logo: bnbLogo },
  { name: 'Bybit', logo: bybitLogo },
  { name: 'KuCoin', logo: kucoinLogo },
  { name: 'MANTRA', logo: mantraLogo },
  { name: 'peaq', logo: peaqLogo },
  { name: 'Story Protocol', logo: storyLogo },
  { name: 'Sahara AI', logo: saharaLogo },
  { name: 'MegaETH', logo: megaethLogo },
  { name: 'Polygon', logo: polygonLogo },
  { name: 'Ondo', logo: ondoLogo },
  { name: 'Tria', logo: triaLogo },
  { name: 'SynFutures', logo: synfuturesLogo },
  { name: 'Fogo', logo: fogoLogo },
  { name: 'zkPass', logo: zkpassLogo },
];

// ============================================
// ANIMATED STAT
// ============================================
const AnimatedStat = ({ value, suffix = '', prefix = '', label, delay = 0, isVisible = true }: { 
  value: number; suffix?: string; prefix?: string; label: string; delay?: number; isVisible?: boolean;
}) => {
  const count = useCountUp({ end: value, delay: delay * 1000, isVisible, duration: 2000 });
  return (
    <div className="text-center">
      <motion.p 
        className="text-4xl md:text-5xl lg:text-6xl font-medium bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5, type: "spring" }}
      >
        {prefix}{count}{suffix}
      </motion.p>
      <p className="text-xs text-muted-foreground mt-2 tracking-wider uppercase">{label}</p>
    </div>
  );
};

// ============================================
// GLITCH TEXT
// ============================================
const GlitchText = ({ children, className = '' }: { children: string; className?: string }) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative z-10">{children}</span>
    <motion.span
      className="absolute top-0 left-0 text-primary opacity-70 z-0"
      style={{ clipPath: 'inset(0 0 50% 0)' }}
      animate={{ x: [0, -2, 2, 0], opacity: [0.7, 0.5, 0.8, 0.7] }}
      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
    >
      {children}
    </motion.span>
  </span>
);

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-16 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative max-w-5xl z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground text-sm tracking-widest uppercase mb-6 flex items-center gap-3"
        >
          <motion.span className="w-8 h-px bg-primary" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
          Korea GTM Strategy
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[1.05] tracking-tight text-foreground mb-6"
        >
          Engineered for<br />
          <GlitchText className="text-primary">Liquidity.</GlitchText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-muted-foreground max-w-xl mb-12"
        >
          Launch in Korea with the most data-driven GTM framework.
          <span className="text-foreground/80 block mt-1">We turn cultural barriers into your competitive moat.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center gap-8 md:gap-12"
        >
          <AnimatedStat value={30} suffix="+" label="Projects Launched" delay={0.8} isVisible={isInView} />
          <div className="w-px h-12 bg-border" />
          <AnimatedStat value={50} prefix="$" suffix="M+" label="Volume Generated" delay={1.0} isVisible={isInView} />
          <div className="w-px h-12 bg-border" />
          <AnimatedStat value={340} suffix="%" label="Avg. Growth" delay={1.2} isVisible={isInView} />
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// 01 WHY KOREA - COMPACT
// ============================================
const WhyKoreaSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const stats = [
    { value: '#2', label: 'Global Fiat Volume', sublabel: 'KRW Pairs' },
    { value: '#1', label: 'Altcoin Velocity', sublabel: '5x Global Avg' },
    { value: '90%', label: 'Market Share', sublabel: 'Upbit + Bithumb' },
  ];

  const exchangeData = [
    { name: 'Upbit (KRW)', volume: 800, percentage: 100, highlight: true },
    { name: 'Binance (USDT)', volume: 750, percentage: 94, highlight: false },
    { name: 'Coinbase (USD)', volume: 120, percentage: 15, highlight: false },
  ];

  const points = [
    { icon: TrendingUp, title: 'Dominance Over Dollar', desc: 'Upbit & Bithumb frequently surpass Binance in daily volume.' },
    { icon: Trophy, title: 'Verification Standard', desc: 'DAXA listing = the strictest regulatory seal of approval.' },
    { icon: Users, title: 'Sticky Liquidity', desc: 'Retail army creates organic buy pressure that defends your floor.' },
  ];

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-20 bg-muted/30 border-y border-border">
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="max-w-6xl mx-auto">
        <p className="text-primary text-xs tracking-widest uppercase mb-3">01 The Strategic Imperative</p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-2">The Kingmaker Exchanges</h2>
        <p className="text-muted-foreground mb-10">Where global price discovery begins.</p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 border border-border bg-background hover:border-primary/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs font-medium text-foreground">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        {/* Two Column: Chart + Points */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Volume Chart */}
          <div className="p-6 border border-border bg-background">
            <p className="text-xs tracking-widest text-primary font-medium mb-4">24H TRADING VOLUME EXAMPLE</p>
            {exchangeData.map((item, i) => (
              <div key={item.name} className="mb-3 last:mb-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className={item.highlight ? 'text-primary font-medium' : 'text-foreground/80'}>{item.name}</span>
                  <span className={item.highlight ? 'text-primary font-bold' : 'text-muted-foreground'}>${item.volume}M</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${item.highlight ? 'bg-primary' : 'bg-foreground/30'}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${item.percentage}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Key Points */}
          <div className="space-y-4">
            {points.map((point, i) => (
              <motion.div
                key={point.title}
                className="flex gap-4 p-4 border border-border bg-background hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <point.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">{point.title}</p>
                  <p className="text-xs text-muted-foreground">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upbit Pump Callout */}
        <motion.div
          className="p-5 bg-primary/5 border-l-2 border-primary"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs tracking-widest text-primary font-medium mb-1">THE "UPBIT PUMP" PHENOMENON</p>
          <p className="text-sm text-foreground">
            <span className="font-semibold text-primary">60% of major altcoin rallies in 2024</span> were preceded by a volume spike in KRW pairs. 
            Launching in Korea isn't just entering a market—it's <span className="font-semibold">igniting your next bull run.</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// 02 WHY IUM LABS - NEW STORYTELLING
// ============================================
const WhyIumLabsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const stories = [
    {
      icon: Clock,
      tagline: 'Since 2019',
      title: 'We Were There First',
      description: "6 years of hands-on experience in Korea's Web3 ecosystem. We've seen every market cycle and know what works.",
      stat: '30+',
      statLabel: 'Projects Launched',
    },
    {
      icon: Database,
      tagline: 'Proprietary Intel',
      title: 'Data, Not Guesswork',
      description: "Our research product tracks Kaito mindshare, Naver trends, and exchange flows in real-time. You get insights your competitors don't have.",
      stat: '24/7',
      statLabel: 'Market Monitoring',
    },
    {
      icon: Network,
      tagline: 'Deep Network',
      title: 'The Right Connections',
      description: "Direct relationships with Tier-1 KOLs, exchanges, media outlets, and communities. We don't just pitch—we open doors.",
      stat: '50+',
      statLabel: 'KOL Partners',
    },
  ];

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-20 bg-background border-b border-border">
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="max-w-6xl mx-auto">
        <p className="text-primary text-xs tracking-widest uppercase mb-3">02 Your Local Advantage</p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-2">Why ium Labs?</h2>
        <p className="text-muted-foreground mb-12 max-w-xl">The smartest projects choose us because we don't just enter Korea—we dominate it.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story.title}
              className="group relative p-6 border border-border bg-background hover:border-primary/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <story.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <p className="text-xs tracking-widest text-primary font-medium mb-1">{story.tagline}</p>
              <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">{story.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{story.description}</p>

              {/* Stat */}
              <div className="pt-4 border-t border-border">
                <p className="text-2xl font-bold text-primary">{story.stat}</p>
                <p className="text-xs text-muted-foreground">{story.statLabel}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-lg text-foreground/80 mt-12 italic"
        >
          "We don't just enter Korea. <span className="text-primary font-medium">We dominate it.</span>"
        </motion.p>
      </motion.div>
    </section>
  );
};

// ============================================
// 03 THE FRAMEWORK - COMPACT
// ============================================
const FrameworkSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-20 bg-muted/20">
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="max-w-6xl mx-auto">
        <p className="text-primary text-xs tracking-widest uppercase mb-3">03 Process</p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-2">The ium Algorithm</h2>
        <p className="text-muted-foreground mb-10">Our proven 4-stage framework has launched 30+ projects successfully.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {frameworkStages.map((stage, i) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setActiveStage(i)}
              onMouseLeave={() => setActiveStage(null)}
              className={`relative p-5 border bg-background transition-all duration-300 cursor-pointer ${
                activeStage === i ? 'border-primary shadow-lg' : 'border-border hover:border-primary/30'
              }`}
            >
              <div className="absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] font-mono bg-muted text-muted-foreground">
                STAGE {stage.number}
              </div>

              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 mt-1 transition-colors ${
                activeStage === i ? 'bg-primary/20' : 'bg-muted'
              }`}>
                <stage.icon className={`w-5 h-5 ${activeStage === i ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              
              <h3 className="text-xl font-medium text-foreground mb-3">{stage.title}</h3>

              <ul className="space-y-1.5">
                {stage.items.map(item => (
                  <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className={`w-1 h-1 rounded-full ${activeStage === i ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// 04 RESULTS - COMPACT (NO CIRCULAR RINGS)
// ============================================
const ResultsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const metrics = [
    { icon: TrendingUp, value: 340, suffix: '%', prefix: '+', label: 'Average Growth', desc: 'Trading volume increase' },
    { icon: DollarSign, value: 50, suffix: 'M+', prefix: '$', label: 'Volume Generated', desc: 'Total volume driven' },
    { icon: Users, value: 500, suffix: 'K+', label: 'Korean Users', desc: 'Community members' },
    { icon: Trophy, value: 1, prefix: '#', label: 'Market Position', desc: 'Kaito mindshare rank' },
  ];

  const quarterlyData = [
    { label: 'Q1', value: 65 },
    { label: 'Q2', value: 85 },
    { label: 'Q3', value: 120 },
    { label: 'Q4', value: 180 },
  ];
  const maxValue = Math.max(...quarterlyData.map(d => d.value));

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-20 bg-background border-b border-border">
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-xs tracking-widest uppercase mb-3">04 Results</p>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-2">The Numbers That Matter</h2>
          <p className="text-muted-foreground">Measurable results from our data-driven approach.</p>
        </div>

        {/* Metric Cards - 2x2 Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((metric, i) => {
            const displayValue = useCountUp({ end: metric.value, prefix: metric.prefix || '', suffix: metric.suffix || '', delay: i * 150, isVisible: isInView, duration: 2000 });
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="p-5 border border-border bg-background hover:border-primary/50 transition-colors"
              >
                <metric.icon className="w-5 h-5 text-primary mb-3" />
                <p className="text-3xl font-medium text-foreground">{displayValue}</p>
                <p className="text-sm font-medium text-foreground mt-1">{metric.label}</p>
                <p className="text-xs text-muted-foreground">{metric.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quarterly Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="max-w-xl mx-auto"
        >
          <p className="text-xs tracking-widest text-primary font-medium mb-4 text-center">QUARTERLY GROWTH TRAJECTORY</p>
          <div className="p-6 border border-border bg-muted/30 rounded-lg">
            <div className="h-32 flex items-end justify-center gap-6">
              {quarterlyData.map((item, i) => (
                <div key={item.label} className="flex flex-col items-center gap-2 flex-1 max-w-14">
                  <motion.div
                    className="w-full bg-primary/80 rounded-t"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${(item.value / maxValue) * 100}%` } : { height: 0 }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 0.8 }}
                  />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// 05 CASE STUDIES - COMPACT
// ============================================
const CaseStudiesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-20 bg-muted/20">
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="max-w-6xl mx-auto">
        <p className="text-primary text-xs tracking-widest uppercase mb-3">05 Strategy in Action</p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-2">Case Studies</h2>
        <p className="text-muted-foreground mb-10">Real results from real projects.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/projects/${project.slug}`} className="group block border border-border bg-background hover:border-primary/50 transition-colors overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs px-2 py-1 bg-primary text-primary-foreground">{project.category}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.tagline}</p>
                  <div className="mt-3 pt-3 border-t border-border space-y-1">
                    {project.metrics.map(metric => {
                      const val = useCountUp({ end: metric.value, prefix: metric.prefix || '', suffix: metric.suffix || '', delay: 500, isVisible: isInView, duration: 1500 });
                      return (
                        <div key={metric.label} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{metric.label}</span>
                          <span className="text-primary font-medium">{val}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link to="/projects" className="group inline-flex items-center gap-2 px-5 py-2.5 border border-border hover:border-primary text-sm text-muted-foreground hover:text-primary transition-colors">
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// 06 SOCIAL PROOF - INTEGRATED
// ============================================
const SocialProofSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="bg-background border-b border-border">
      {/* Testimonials */}
      <TestimonialsSection />

      {/* Client Logos */}
      <div className="py-12 bg-muted/30 border-t border-border overflow-hidden">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-muted-foreground text-xs tracking-widest uppercase mb-8 px-6 md:px-12 lg:px-20"
        >
          Trusted By Industry Leaders
        </motion.p>

        <div className="relative">
          <div className="flex animate-marquee">
            {[...clientLogos, ...clientLogos].map((client, i) => (
              <div key={`logo-${i}`} className="flex-shrink-0 mx-6 md:mx-10">
                <img src={client.logo} alt={client.name} className="h-8 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section 
      ref={ref} 
      className="relative px-6 md:px-12 lg:px-20 py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(240 10% 10%) 50%, hsl(var(--foreground)) 100%)' }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] pointer-events-none" style={{ background: 'hsl(var(--primary))' }} />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="relative max-w-3xl z-10"
      >
        <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-medium leading-tight mb-4 text-background">
          Ready to execute your<br />
          <span className="text-primary">Korea Strategy?</span>
        </h2>
        
        <p className="text-background/60 text-lg mb-8 max-w-xl">
          Join 30+ projects that have successfully launched in the Korean market.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link
            to="/research"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-background/30 text-background text-sm hover:border-primary hover:bg-primary/10 transition-all"
          >
            Get Market Report
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-all"
          >
            Schedule Strategy Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const GTMService = () => {
  usePageMeta(
    "Korea GTM Strategy | Ium Labs",
    "Engineered for Liquidity. Launch in Korea with the most data-driven GTM framework. 30+ projects. $50M+ volume."
  );

  return (
    <>
      <ServiceSchema
        name="Korea GTM Strategy"
        description="Go-to-market strategy for Web3 projects entering the Korean market. Data-driven 4-stage framework."
        url="/services/gtm"
        provider="Ium Labs"
        areaServed="South Korea"
      />
      <Navbar />
      <main className="bg-background">
        <HeroSection />
        <WhyKoreaSection />
        <WhyIumLabsSection />
        <FrameworkSection />
        <ResultsSection />
        <CaseStudiesSection />
        <SocialProofSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default GTMService;
