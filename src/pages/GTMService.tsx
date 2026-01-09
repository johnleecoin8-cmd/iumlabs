import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

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
// FEATURED PROJECTS DATA
// ============================================
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

// ============================================
// HERO SECTION - Text only, minimal
// ============================================
const HeroSection = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-20 bg-background">
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
          className="text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[1.05] tracking-tight text-foreground"
        >
          We bridge global Web3 projects
          <br />
          <span className="text-muted-foreground">to Korea's most active</span>
          <br />
          crypto market.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center gap-8 mt-12 text-muted-foreground"
        >
          <span className="text-sm">30+ Projects</span>
          <span className="text-sm">$50M+ Volume</span>
          <span className="text-sm">Since 2024</span>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// FEATURED WORK - Droga5 style large cards
// ============================================
const FeaturedWorkSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-20 bg-background">
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="text-muted-foreground text-sm tracking-widest uppercase mb-16"
      >
        Featured Work
      </motion.p>

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
              </div>

              {/* Info */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs tracking-widest uppercase">
                    {project.category}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-medium text-foreground">
                    {project.name}
                  </h2>
                  <p className="text-muted-foreground max-w-xl">
                    {project.tagline} {project.result}
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
// MORE WORK - Grid of thumbnails
// ============================================
const MoreWorkSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-20 bg-background border-t border-border">
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="text-muted-foreground text-sm tracking-widest uppercase mb-12"
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
// RECOGNITION / TAGLINE
// ============================================
const RecognitionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-20 bg-background border-t border-border">
      <motion.blockquote
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <p className="text-[clamp(1.5rem,4vw,2.5rem)] font-medium leading-snug text-foreground">
          "Korea's fastest-growing Web3 GTM agency"
        </p>
        <footer className="mt-6 text-muted-foreground text-sm">
          — Trusted by 30+ global projects since 2024
        </footer>
      </motion.blockquote>
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
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-32 bg-foreground text-background">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h2 className="text-[clamp(2rem,6vw,4rem)] font-medium leading-tight mb-8">
          Ready to launch in Korea?
        </h2>
        
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
    "We bridge global Web3 projects to Korea's dynamic ecosystem. 30+ projects launched. $50M+ volume generated."
  );

  return (
    <>
      <ServiceSchema
        name="Korea GTM Strategy"
        description="Go-to-market strategy for Web3 projects entering the Korean market."
        url="/services/gtm"
        provider="Ium Labs"
        areaServed="South Korea"
      />
      <Navbar />
      <main className="bg-background">
        <HeroSection />
        <FeaturedWorkSection />
        <MoreWorkSection />
        <RecognitionSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default GTMService;
