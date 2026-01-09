import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Building, Zap, TrendingUp, Users, DollarSign, BarChart3, Trophy } from 'lucide-react';
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
const featuredProjects = [
  {
    name: 'MANTRA',
    tagline: "Building Korea's largest RWA community.",
    result: '+500% community growth.',
    image: mantraBg,
    slug: 'mantra',
    category: 'RWA L1',
    strategy: 'Community-First Strategy',
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
    strategy: 'Narrative-Led Strategy',
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
    strategy: 'Market Dominance Strategy',
    metrics: [
      { label: 'Market Rank', value: 1, prefix: '#' },
      { label: 'Mindshare', value: 78, suffix: '%' },
    ]
  },
];

const moreProjects = [
  { name: 'BNB Chain', image: bnbBg, slug: 'bnb-chain' },
  { name: 'Bybit', image: bybitBg, slug: 'bybit' },
  { name: 'KuCoin', image: kucoinBg, slug: 'kucoin' },
  { name: 'Sahara AI', image: saharaBg, slug: 'sahara-ai' },
  { name: 'OpenLedger', image: openledgerBg, slug: 'openledger' },
  { name: 'MegaETH', image: megaethBg, slug: 'megaeth' },
  { name: 'Ondo', image: ondoBg, slug: 'ondo' },
  { name: 'Polygon', image: polygonBg, slug: 'polygon' },
  { name: 'Tria', image: triaBg, slug: 'tria' },
];

const frameworkStages = [
  {
    number: '01',
    title: 'ANALYZE',
    subtitle: 'Intelligence',
    items: ['Deep Market Research', 'Competitor Analysis', 'Narrative Localization'],
    quote: '"We don\'t guess. We analyze."',
    icon: Search,
  },
  {
    number: '02',
    title: 'BUILD',
    subtitle: 'Foundation',
    items: ['Naver SEO Dominance', 'Community Infrastructure', 'Brand Localization'],
    quote: '"Building the localized infra."',
    icon: Building,
  },
  {
    number: '03',
    title: 'IGNITE',
    subtitle: 'Launch',
    items: ['Tier-1 KOL Activation', 'Media Blitz Campaign', 'Viral Marketing'],
    quote: '"Maximum noise, maximum impact."',
    icon: Zap,
  },
  {
    number: '04',
    title: 'SCALE',
    subtitle: 'Growth',
    items: ['Events & Partnerships', 'Liquidity Campaigns', 'Retention Programs'],
    quote: '"Turning hype into retention."',
    icon: TrendingUp,
  },
];


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
  const count = useCountUp({ end: value, delay: delay * 1000, isVisible, duration: 2000 });
  
  return (
    <div className="text-center group">
      <motion.p 
        className="text-4xl md:text-5xl lg:text-6xl font-medium bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay, duration: 0.5, type: "spring" }}
      >
        {prefix}{count}{suffix}
      </motion.p>
      <p className="text-xs text-muted-foreground mt-2 tracking-wider uppercase">{label}</p>
    </div>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="min-h-[85vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-20 bg-background">
      <div className="max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-muted-foreground text-sm tracking-widest uppercase mb-6"
        >
          Korea GTM Strategy
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[1.05] tracking-tight text-foreground mb-8"
        >
          Engineered for
          <br />
          <span className="text-primary">Liquidity.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12"
        >
          Launch in Korea with the most data-driven GTM framework.
          <br />
          We turn cultural barriers into your competitive moat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-8 md:gap-12"
        >
          <AnimatedStat value={30} suffix="+" label="Projects" delay={0.6} isVisible={isInView} />
          <div className="w-px h-12 bg-border" />
          <AnimatedStat value={50} prefix="$" suffix="M+" label="Volume Generated" delay={0.8} isVisible={isInView} />
          <div className="w-px h-12 bg-border" />
          <AnimatedStat value={340} suffix="%" label="Avg. Growth" delay={1.0} isVisible={isInView} />
        </motion.div>
      </div>
    </section>
  );
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

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${isHighlight ? 'text-primary' : 'text-foreground/80'}`}>
          {label}
        </span>
        <span className={`text-sm font-mono ${isHighlight ? 'text-primary' : 'text-muted-foreground'}`}>
          {value}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isHighlight ? 'bg-primary' : 'bg-foreground/30'}`}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: delay }}
        />
      </div>
    </div>
  );
};

// ============================================
// MARKET INTELLIGENCE - Why Korea?
// ============================================
const MarketIntelligenceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const volumeData = [
    { label: 'United States', percentage: 100, value: '45%', isHighlight: false },
    { label: 'Japan', percentage: 62, value: '28%', isHighlight: false },
    { label: 'South Korea', percentage: 40, value: '18%', isHighlight: true },
    { label: 'Others', percentage: 20, value: '9%', isHighlight: false },
  ];

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-muted/30 border-y border-border">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-6xl mx-auto"
      >
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
          01 The Strategic Imperative
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-16">
          Why Korea?
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left: Data Visualization */}
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-widest text-primary font-medium mb-4">
                GLOBAL TRADING VOLUME SHARE
              </p>
              <div className="space-y-4">
                {volumeData.map((item, i) => (
                  <AnimatedProgressBar
                    key={item.label}
                    label={item.label}
                    percentage={item.percentage}
                    value={item.value}
                    delay={i * 0.15}
                    isHighlight={item.isHighlight}
                    isVisible={isInView}
                  />
                ))}
              </div>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 border border-border bg-background">
                <p className="text-2xl md:text-3xl font-medium text-foreground">18%</p>
                <p className="text-xs text-muted-foreground mt-1">of Global Volume</p>
              </div>
              <div className="p-4 border border-border bg-background">
                <p className="text-2xl md:text-3xl font-medium text-foreground">5.2x</p>
                <p className="text-xs text-muted-foreground mt-1">Higher Engagement</p>
              </div>
            </div>
          </div>

          {/* Right: Insights */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs tracking-widest text-primary font-medium">CULTURE</p>
                <p className="text-xl font-medium text-foreground">High-Risk, High-Reward</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Korean traders move fast and commit hard. When they believe in a project, they go all in.
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs tracking-widest text-primary font-medium">BARRIER</p>
                <p className="text-xl font-medium text-foreground">Unique Ecosystem</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Naver, Kakao, VASP regulations, and cultural nuances. Global strategies fail here without localization.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs tracking-widest text-primary font-medium">OPPORTUNITY</p>
                <p className="text-xl font-medium text-foreground">First-Mover Advantage</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Most global projects underestimate Korea. Those who get it right dominate.
                </p>
              </div>
            </div>
          </div>
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="border-l-2 border-primary pl-6"
        >
          <p className="text-lg md:text-xl text-foreground italic">
            "Global projects succeed in the West, but they explode in Korea."
          </p>
          <footer className="mt-2 text-sm text-muted-foreground">
            — You need a local algorithm.
          </footer>
        </motion.blockquote>
      </motion.div>
    </section>
  );
};

// ============================================
// RESULTS DASHBOARD SECTION
// ============================================
const ResultsDashboardSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const metrics = [
    { 
      icon: TrendingUp, 
      value: 340, 
      suffix: '%', 
      prefix: '+', 
      label: 'Average Growth',
      description: 'Trading volume increase for launched projects'
    },
    { 
      icon: DollarSign, 
      value: 50, 
      suffix: 'M+', 
      prefix: '$', 
      label: 'Volume Generated',
      description: 'Total trading volume driven by our campaigns'
    },
    { 
      icon: Users, 
      value: 500, 
      suffix: 'K+', 
      prefix: '', 
      label: 'Korean Users',
      description: 'Community members across all projects'
    },
    { 
      icon: Trophy, 
      value: 1, 
      suffix: '', 
      prefix: '#', 
      label: 'Market Position',
      description: 'Kaito mindshare ranking for key clients'
    },
  ];

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-background border-b border-border">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-6xl mx-auto"
      >
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
          03 Results
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
          The Numbers That Matter
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-16">
          Our data-driven approach delivers measurable results. Here's what we've achieved for our clients.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative p-6 border border-border bg-background hover:border-primary/50 transition-all duration-300"
            >
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
                  delay: i * 200,
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// THE IUM FRAMEWORK - 4 Stage Process
// ============================================
const FrameworkSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-6xl mx-auto"
      >
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
          02 Process
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-16">
          The ium Algorithm
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {frameworkStages.map((stage, i) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="group relative p-6 border border-border bg-background hover:border-primary/50 transition-colors"
            >
              {/* Arrow connector (hidden on last item and mobile) */}
              {i < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-primary font-mono">{stage.number}</span>
                <stage.icon className="w-5 h-5 text-primary" />
              </div>
              
              <h3 className="text-xl font-medium text-foreground mb-1">
                {stage.title}
              </h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">
                {stage.subtitle}
              </p>

              <ul className="space-y-2 mb-6">
                {stage.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-primary/80 italic">
                {stage.quote}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// STRATEGY IN ACTION - Case Studies with Metrics
// ============================================
const CaseMetricBar = ({ label, value, suffix = '', prefix = '', delay = 0, isVisible = true }: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  isVisible?: boolean;
}) => {
  const displayValue = useCountUp({ end: value, prefix, suffix, delay: delay * 1000, isVisible, duration: 1500 });
  
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-primary">{displayValue}</span>
    </div>
  );
};

const StrategyInActionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="mb-12"
      >
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
          04 Strategy in Action
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground">
          Case Studies
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <Link to={`/projects/${project.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-4">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <p className="text-xs tracking-widest text-primary uppercase">
                    {project.category}
                  </p>
                  <span className="text-muted-foreground/50">•</span>
                  <p className="text-xs text-muted-foreground">
                    {project.strategy}
                  </p>
                </div>
                <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.tagline}
                </p>
                
                {/* Metrics */}
                <div className="pt-2 mt-2 border-t border-border">
                  {project.metrics.map((metric, mi) => (
                    <CaseMetricBar
                      key={metric.label}
                      label={metric.label}
                      value={metric.value}
                      suffix={metric.suffix}
                      prefix={metric.prefix}
                      delay={0.3 + mi * 0.1}
                      isVisible={isInView}
                    />
                  ))}
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* View All Projects Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          View All Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
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

const ClientLogosMarquee = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-muted/30 border-y border-border overflow-hidden">
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="text-muted-foreground text-sm tracking-widest uppercase mb-12 px-6 md:px-12 lg:px-20"
      >
        Trusted By Industry Leaders
      </motion.p>

      {/* First row - left to right */}
      <div className="relative mb-8">
        <div className="flex animate-marquee">
          {[...clientLogos, ...clientLogos].map((client, i) => (
            <div
              key={`row1-${i}`}
              className="flex-shrink-0 mx-8 md:mx-12 group"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-8 md:h-10 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Second row - right to left */}
      <div className="relative">
        <div className="flex animate-marquee-reverse">
          {[...clientLogos.slice().reverse(), ...clientLogos.slice().reverse()].map((client, i) => (
            <div
              key={`row2-${i}`}
              className="flex-shrink-0 mx-8 md:mx-12 group"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-8 md:h-10 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION - Enhanced with Gradient
// ============================================
const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section 
      ref={ref} 
      className="relative px-6 md:px-12 lg:px-20 py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(240 10% 10%) 50%, hsl(var(--foreground)) 100%)',
      }}
    >
      {/* Subtle glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: 'hsl(var(--primary))' }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative max-w-3xl z-10"
      >
        <h2 className="text-[clamp(2rem,6vw,4rem)] font-medium leading-tight mb-4 text-background">
          Ready to execute your
          <br />
          <span className="text-primary">Korea Strategy?</span>
        </h2>
        
        <p className="text-background/60 text-lg mb-10 max-w-xl">
          Join 30+ projects that have successfully launched in the Korean market with our data-driven GTM framework.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link
            to="/research"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-background/30 text-background font-medium text-sm tracking-wide hover:border-primary hover:bg-primary/10 transition-all duration-300"
          >
            Get the Market Report
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
          >
            Schedule a Strategy Call
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
        <MarketIntelligenceSection />
        <FrameworkSection />
        <ResultsDashboardSection />
        <StrategyInActionSection />
        <TestimonialsSection />
        <ClientLogosMarquee />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default GTMService;
