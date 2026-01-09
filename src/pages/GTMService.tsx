import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Search, Building, Zap, TrendingUp, Users, Mic2, Newspaper, Calendar, Palette } from 'lucide-react';

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
  },
  {
    name: 'Story Protocol',
    tagline: 'Korea launch for the leading IP infrastructure.',
    result: '+340% trading volume.',
    image: storyBg,
    slug: 'story-protocol',
    category: 'IP Protocol',
    strategy: 'Narrative-Led Strategy',
  },
  {
    name: 'peaq Network',
    tagline: 'Establishing DePIN leadership in Korea.',
    result: '#1 in Korean market.',
    image: peaqBg,
    slug: 'peaq',
    category: 'DePIN',
    strategy: 'Market Dominance Strategy',
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
    title: 'Share',
    description: 'Tell us about your project vision, target audience, budget range, and success metrics',
    icon: Search,
  },
  {
    number: '02',
    title: 'Propose',
    description: 'We analyze your needs and deliver a customized GTM strategy with clear milestones',
    icon: Building,
  },
  {
    number: '03',
    title: 'Launch',
    description: 'Execute your strategy with our network of media, KOLs, and community partners',
    icon: Zap,
  },
  {
    number: '04',
    title: 'Scale',
    description: 'Measure, optimize, and scale your presence based on real performance data',
    items: ['Performance tracking', 'Strategy optimization'],
    icon: TrendingUp,
  },
];

const toolkitServices = [
  { name: 'Research & Data', icon: Search, link: '/services/research' },
  { name: 'Influencer Marketing', icon: Users, link: '/services/influencer' },
  { name: 'PR & Media', icon: Newspaper, link: '/services/pr' },
  { name: 'Community Management', icon: Mic2, link: '/services/community' },
  { name: 'Offline Events', icon: Calendar, link: '/services/offline-event' },
  { name: 'Branding & Design', icon: Palette, link: '/services/branding' },
];

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-20 bg-background">
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
          className="flex flex-wrap items-center gap-8 text-foreground"
        >
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-medium">30+</p>
            <p className="text-xs text-muted-foreground mt-1">Projects</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-medium">$50M+</p>
            <p className="text-xs text-muted-foreground mt-1">Volume</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-medium">#1</p>
            <p className="text-xs text-muted-foreground mt-1">Growth Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MARKET INTELLIGENCE - Why Korea?
// ============================================
const MarketIntelligenceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const dataPoints = [
    {
      label: 'VOLUME',
      value: 'Global #3',
      description: 'Behind only the US and Japan in 24h trading volume.',
    },
    {
      label: 'CULTURE',
      value: 'High-Risk, High-Reward',
      description: 'Korean traders move fast and commit hard.',
    },
    {
      label: 'BARRIER',
      value: 'Unique Ecosystem',
      description: 'Naver, Kakao, VASP regulations. Global strategies fail here.',
    },
  ];

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-muted/30 border-y border-border">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-6xl mx-auto"
      >
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
          The Strategic Imperative
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-16">
          Why Korea?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {dataPoints.map((point, i) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="space-y-3"
            >
              <p className="text-xs tracking-widest text-primary font-medium">
                {point.label}
              </p>
              <p className="text-2xl md:text-3xl font-medium text-foreground">
                {point.value}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
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
              
              <h3 className="text-xl font-medium text-foreground mb-3">
                {stage.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4">
                {stage.description}
              </p>

              {stage.items && (
                <ul className="space-y-1">
                  {stage.items.map((item) => (
                    <li key={item} className="text-xs text-primary/80">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// STRATEGY IN ACTION - Case Studies
// ============================================
const StrategyInActionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-background border-t border-border">
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="text-muted-foreground text-sm tracking-widest uppercase mb-16"
      >
        Strategy in Action
      </motion.p>

      <div className="space-y-32">
        {featuredProjects.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.8 }}
          >
            <Link to={`/projects/${project.slug}`} className="group block">
              <div className="relative aspect-[16/9] overflow-hidden bg-muted mb-8">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-xs tracking-widest text-primary uppercase">
                    {project.category} · {project.strategy}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-medium text-foreground">
                    {project.name}
                  </h2>
                  <p className="text-muted-foreground max-w-xl">
                    {project.tagline} <span className="text-foreground font-medium">{project.result}</span>
                  </p>
                </div>
                
                <span className="inline-flex items-center gap-2 text-sm text-foreground group-hover:gap-3 transition-all">
                  Learn more
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

// ============================================
// THE TOOLKIT - Services Grid
// ============================================
const ToolkitSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-muted/30 border-y border-border">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-6xl mx-auto"
      >
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
          Full-Stack Capabilities
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-16">
          The Toolkit
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {toolkitServices.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Link
                to={service.link}
                className="group flex items-center gap-4 p-4 md:p-6 border border-border bg-background hover:border-primary/50 transition-colors"
              >
                <service.icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                  {service.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// CLIENT ARCHIVE - More Work Grid
// ============================================
const ClientArchiveSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-background">
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="text-muted-foreground text-sm tracking-widest uppercase mb-12"
      >
        Client Archive
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {moreProjects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <Link to={`/projects/${project.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-3">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                {project.name}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View all projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
};

// ============================================
// CTA SECTION - Dual CTA
// ============================================
const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-32 bg-foreground text-background">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h2 className="text-[clamp(2rem,6vw,4rem)] font-medium leading-tight mb-8">
          Ready to execute your
          <br />
          Korea Strategy?
        </h2>
        
        <div className="flex flex-wrap gap-4">
          <Link
            to="/research"
            className="inline-flex items-center gap-3 px-8 py-4 border border-background/30 text-background font-medium text-sm tracking-wide hover:bg-background/10 transition-colors"
          >
            Get the Market Report
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground font-medium text-sm tracking-wide hover:bg-background/90 transition-colors"
          >
            Schedule a Strategy Call
            <ArrowRight className="w-4 h-4" />
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
        <StrategyInActionSection />
        <ToolkitSection />
        <ClientArchiveSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default GTMService;
