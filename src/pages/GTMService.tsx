import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Building, Zap, TrendingUp } from 'lucide-react';

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
// STRATEGY IN ACTION - Case Studies (2xN Grid)
// ============================================
const StrategyInActionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-background border-t border-border">
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="text-muted-foreground text-sm tracking-widest uppercase mb-12"
      >
        Strategy in Action
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {featuredProjects.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <Link to={`/projects/${project.slug}`} className="group block">
              <div className="relative aspect-[3/2] overflow-hidden bg-muted mb-4">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs tracking-widest text-primary uppercase">
                  {project.category}
                </p>
                <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.tagline}
                </p>
                <p className="text-sm text-foreground font-medium">
                  {project.result}
                </p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
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
        <StrategyInActionSection />
        <ClientLogosMarquee />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default GTMService;
