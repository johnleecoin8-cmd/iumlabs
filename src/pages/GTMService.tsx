import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Zap, Shield, Globe, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

// Seoul Cyberpunk backgrounds
import seoulGangnamNight from '@/assets/backgrounds/seoul-gangnam-night.jpg';
import seoulDdpNight from '@/assets/backgrounds/seoul-ddp-night.jpg';
import seoulTechFuture from '@/assets/backgrounds/seoul-tech-future.jpg';

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
const heroBackgrounds = [seoulGangnamNight, seoulDdpNight, seoulTechFuture];

const featuredProjects = [
  {
    name: 'Story Protocol',
    tagline: 'Korea launch for the leading IP infrastructure.',
    result: '+340% trading volume in first month.',
    image: storyBg,
    slug: 'story-protocol',
    category: 'IP Protocol',
  },
  {
    name: 'MANTRA',
    tagline: "Building Korea's largest RWA community.",
    result: '+500% community growth in 8 weeks.',
    image: mantraBg,
    slug: 'mantra',
    category: 'RWA L1',
  },
  {
    name: 'peaq Network',
    tagline: 'Establishing DePIN leadership in Korea.',
    result: '#1 DePIN project in Korean market.',
    image: peaqBg,
    slug: 'peaq',
    category: 'DePIN',
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

const barriers = [
  { icon: Shield, label: 'VASP Regulations', desc: 'Complex compliance requirements' },
  { icon: Globe, label: 'Language Walls', desc: 'Korean-only communities' },
  { icon: Zap, label: 'Isolated Ecosystem', desc: 'Unique platforms & influencers' },
];

// ============================================
// HERO: "Korea, The Engine of Crypto"
// ============================================
const HeroSection = () => {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBg}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={heroBackgrounds[currentBg]}
            alt="Seoul"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-32 pb-20">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary text-sm tracking-widest uppercase mb-6 font-medium"
          >
            Korea GTM Strategy
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(2.5rem,8vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground mb-8"
          >
            Unlock the World's
            <br />
            <span className="text-primary">Most Active Liquidity.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-foreground/80 max-w-2xl mb-12"
          >
            Korea isn't just a market. It's the ignition key for global hype.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href="#why-korea"
              className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <span className="text-sm tracking-wide">Discover Why</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-10 border-t border-foreground/10 bg-background/50 backdrop-blur-sm"
      >
        <div className="px-6 md:px-12 lg:px-20 py-6 flex flex-wrap gap-8 md:gap-16">
          <div>
            <p className="text-3xl md:text-4xl font-medium text-primary">#3</p>
            <p className="text-xs text-foreground/60 uppercase tracking-wider mt-1">Global Trading Volume</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-medium text-primary">#1</p>
            <p className="text-xs text-foreground/60 uppercase tracking-wider mt-1">Altcoin Volume</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-medium text-primary">30%+</p>
            <p className="text-xs text-foreground/60 uppercase tracking-wider mt-1">Kimchi Premium (Peak)</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// WHY KOREA: "The Challenge"
// ============================================
const WhyKoreaSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="why-korea" ref={ref} className="px-6 md:px-12 lg:px-20 py-32 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4">The Challenge</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight text-foreground max-w-4xl">
            Global projects succeed in the West,
            <br />
            <span className="text-foreground/60">but they explode in Korea.</span>
          </h2>
          <p className="text-foreground/70 text-xl mt-6 max-w-2xl">
            The Kimchi Premium isn't just a price difference—it's proof of overwhelming buying power. 
            Can you afford to miss it?
          </p>
        </motion.div>

        {/* Key insight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-8">
            <div className="border-l-2 border-primary pl-6">
              <p className="text-foreground/60 text-sm uppercase tracking-wider mb-2">Key Insight</p>
              <p className="text-2xl md:text-3xl font-medium text-foreground">
                "The Kimchi Premium is Real Power."
              </p>
              <p className="text-foreground/70 mt-4">
                When Korean traders move, the global market follows. 
                This isn't speculation—it's a pattern proven over 10+ years.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="bg-foreground/5 border border-foreground/10 p-6 rounded-lg"
            >
              <TrendingUp className="w-8 h-8 text-primary mb-4" />
              <p className="text-3xl font-medium text-foreground">$2.8B</p>
              <p className="text-foreground/60 text-sm mt-1">Daily Trading Volume</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="bg-foreground/5 border border-foreground/10 p-6 rounded-lg"
            >
              <Zap className="w-8 h-8 text-primary mb-4" />
              <p className="text-3xl font-medium text-foreground">15M+</p>
              <p className="text-foreground/60 text-sm mt-1">Active Traders</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// OUR SOLUTION: "We Tame the Beast"
// ============================================
const SolutionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-32 bg-foreground text-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4">Our Solution</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight max-w-4xl">
            High Rewards come with
            <br />
            <span className="text-background/60">High Barriers.</span>
          </h2>
          <p className="text-background/70 text-xl mt-6 max-w-2xl">
            We are the bridge that turns these barriers into your moat.
          </p>
        </motion.div>

        {/* Barriers Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {barriers.map((barrier, i) => (
            <motion.div
              key={barrier.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              className="border border-background/20 p-8 hover:border-primary/50 transition-colors group"
            >
              <barrier.icon className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-medium mb-2">{barrier.label}</h3>
              <p className="text-background/60">{barrier.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Solution statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="border-t border-background/20 pt-12"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-2xl md:text-3xl font-medium leading-snug">
                Born in 2024. We match Korea's speed.
              </p>
              <p className="text-background/70 mt-4">
                This fast market needs a fast team. We're native to both worlds—
                global Web3 standards and Korean market dynamics.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 border border-background/30 text-sm">Native Korean Team</span>
              <span className="px-4 py-2 border border-background/30 text-sm">VASP Compliant</span>
              <span className="px-4 py-2 border border-background/30 text-sm">24/7 Operations</span>
              <span className="px-4 py-2 border border-background/30 text-sm">Data-Driven</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// TRACK RECORD: Featured Work
// ============================================
const FeaturedWorkSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-32 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <p className="text-primary text-sm tracking-widest uppercase mb-4">Track Record</p>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight text-foreground">
          Results speak louder.
        </h2>
      </motion.div>

      <div className="space-y-32">
        {featuredProjects.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.8 }}
          >
            <Link 
              to={`/projects/${project.slug}`}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-muted mb-8">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-primary text-xs tracking-widest uppercase">
                    {project.category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-medium text-foreground">
                    {project.name}
                  </h3>
                  <p className="text-foreground/70 max-w-xl">
                    {project.tagline} <span className="text-foreground font-medium">{project.result}</span>
                  </p>
                </div>
                
                <span className="inline-flex items-center gap-2 text-sm text-foreground group-hover:text-primary group-hover:gap-3 transition-all">
                  View Case Study
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
// MORE WORK - Grid
// ============================================
const MoreWorkSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-20 bg-background border-t border-border">
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="text-foreground/60 text-sm tracking-widest uppercase mb-12"
      >
        More Work
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {moreProjects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <Link
              to={`/projects/${project.slug}`}
              className="group block"
            >
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
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
        >
          View all projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
};

// ============================================
// SIMPLE CTA
// ============================================
const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-32 bg-primary text-primary-foreground">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h2 className="text-[clamp(2rem,6vw,4rem)] font-medium leading-tight mb-8">
          Ready to ignite Korea?
        </h2>
        <p className="text-primary-foreground/80 text-xl mb-12 max-w-xl">
          Let's discuss how we can turn Korea's barriers into your competitive advantage.
        </p>
        
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground font-medium text-sm tracking-wide hover:bg-background/90 transition-colors"
        >
          Schedule a Call
          <ArrowRight className="w-4 h-4" />
        </Link>
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
    "Unlock the world's most active liquidity. Korea isn't just a market—it's the ignition key for global hype."
  );

  return (
    <>
      <ServiceSchema
        name="Korea GTM Strategy"
        description="Go-to-market strategy for Web3 projects entering the Korean market. We bridge global projects to Korea's most active crypto ecosystem."
        url="/services/gtm"
        provider="Ium Labs"
        areaServed="South Korea"
      />
      <Navbar />
      <main className="bg-background">
        {/* Intro: Korea, The Engine of Crypto */}
        <HeroSection />
        
        {/* Why Korea: The Challenge */}
        <WhyKoreaSection />
        
        {/* Our Solution: We Tame the Beast */}
        <SolutionSection />
        
        {/* Track Record: Evidence */}
        <FeaturedWorkSection />
        
        {/* More Work */}
        <MoreWorkSection />
        
        {/* CTA */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default GTMService;
