import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, Zap, Rocket, TrendingUp, Award, Globe } from 'lucide-react';
import CalendlyButton from '@/components/CalendlyButton';

// Campaign images
import seoulMetroBillboard from '@/assets/campaigns/seoul-metro-billboard-new.jpeg';
import mantraParty from '@/assets/campaigns/mantra-party.jpg';
import storyOriginSummit from '@/assets/campaigns/story-origin-summit.jpg';
import synfuturesBillboard from '@/assets/campaigns/synfutures-billboard.jpg';
import peaqSummit from '@/assets/campaigns/peaq-summit.jpg';
import megaethLaunch from '@/assets/campaigns/megaeth-launch.jpg';

// Project logos
import mantraLogo from '@/assets/logos/mantra.png';
import storyLogo from '@/assets/logos/story-protocol.png';
import peaqLogo from '@/assets/logos/peaq.svg';
import bnbLogo from '@/assets/logos/bnb.svg';
import bybitLogo from '@/assets/logos/bybit.png';
import kucoinLogo from '@/assets/logos/kucoin.svg';
import ondoLogo from '@/assets/logos/ondo.svg';
import saharaLogo from '@/assets/logos/sahara-ai.png';
import polygonLogo from '@/assets/logos/polygon.svg';
import megaethLogo from '@/assets/logos/megaeth.png';
import synfuturesLogo from '@/assets/logos/synfutures.png';
import triaLogo from '@/assets/logos/tria-official.png';

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const stats = [
    { value: "#2", label: "Global Fiat Volume" },
    { value: "4-5x", label: "Higher Velocity" },
    { value: "30+", label: "Projects Launched" },
  ];

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/gtm-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-[0.3em] text-primary/80 uppercase mb-6 block">
            Go-To-Market Strategy
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6">
            Access the KRW
            <br />
            <span className="text-primary">Liquidity Pool</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12">
            The only fiat pair that challenges the Dollar.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-light text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs tracking-widest text-muted-foreground uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ============================================
// STRATEGIC IMPERATIVE - VIDEO GRID
// ============================================
const StrategicImperativeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const projects = [
    { 
      name: "MANTRA", 
      video: "/videos/projects/mantra-hero.mp4",
      stat: "+450%",
      label: "Volume Growth"
    },
    { 
      name: "Story Protocol", 
      video: "/videos/projects/story-hero.mp4",
      stat: "#1",
      label: "Share of Voice"
    },
    { 
      name: "peaq", 
      video: "/videos/projects/peaq-hero.mp4",
      stat: "85K+",
      label: "Wallet Growth"
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4 block">
            01 — The Strategic Imperative
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Real Results from Real Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Korean portfolios turn over 4-5x faster than the global average.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source src={project.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-4xl md:text-5xl font-light text-white mb-1">
                  {project.stat}
                </div>
                <div className="text-sm text-white/70 uppercase tracking-wider mb-2">
                  {project.label}
                </div>
                <div className="text-lg text-white font-medium">
                  {project.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-lg text-muted-foreground italic mt-16 max-w-2xl mx-auto"
        >
          "KRW is the only fiat pair that challenges the USD."
        </motion.p>
      </div>
    </section>
  );
};

// ============================================
// FRAMEWORK SECTION (SIMPLIFIED)
// ============================================
const FrameworkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const stages = [
    { num: "01", title: "ANALYZE", icon: Target, description: "Market research & competitive analysis" },
    { num: "02", title: "BUILD", icon: Users, description: "Community & narrative foundation" },
    { num: "03", title: "IGNITE", icon: Zap, description: "KOL activation & media coverage" },
    { num: "04", title: "SCALE", icon: Rocket, description: "Volume growth & market expansion" },
  ];

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4 block">
            02 — The Framework
          </span>
          <h2 className="text-3xl md:text-4xl font-medium">
            Our Process
          </h2>
        </motion.div>

        {/* Stages */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative p-6 md:p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div className="text-xs text-muted-foreground tracking-wider mb-4">
                  {stage.num}
                </div>
                <Icon className="w-8 h-8 text-primary mb-4 transition-transform group-hover:scale-110" />
                <h3 className="text-lg font-medium mb-2">{stage.title}</h3>
                
                {/* Hover tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 10
                  }}
                  className="text-sm text-muted-foreground"
                >
                  {stage.description}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================
// PROOF OF WORK - CAMPAIGN GALLERY
// ============================================
const ProofOfWorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const campaigns = [
    { src: seoulMetroBillboard, title: "Seoul Metro Billboard", project: "SynFutures" },
    { src: mantraParty, title: "Community Event", project: "MANTRA" },
    { src: storyOriginSummit, title: "Origin Summit", project: "Story Protocol" },
    { src: synfuturesBillboard, title: "OOH Campaign", project: "SynFutures" },
    { src: peaqSummit, title: "DePIN Summit", project: "peaq" },
    { src: megaethLaunch, title: "Launch Event", project: "MegaETH" },
  ];

  return (
    <>
      <section ref={ref} className="py-24 bg-background">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-16"
          >
            <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4 block">
              03 — Proof of Work
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              We Don't Just Plan. We Execute.
            </h2>
          </motion.div>

          {/* Campaign Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.title + index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedImage(campaign.src)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={campaign.src}
                  alt={campaign.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-white text-sm font-medium">{campaign.title}</div>
                  <div className="text-white/70 text-xs">{campaign.project}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Campaign"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </motion.div>
      )}
    </>
  );
};

// ============================================
// RESULTS SECTION (SIMPLIFIED)
// ============================================
const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    { value: "+450%", label: "Avg. Volume Growth", icon: TrendingUp },
    { value: "#1", label: "Media Share of Voice", icon: Award },
    { value: "85K+", label: "Wallet Acquisitions", icon: Users },
    { value: "30+", label: "Projects Delivered", icon: Globe },
  ];

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4 block">
            04 — Results
          </span>
          <h2 className="text-3xl md:text-4xl font-medium">
            Measured Impact
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="p-6 md:p-8 rounded-2xl bg-background border border-border/50 text-center"
              >
                <Icon className="w-6 h-6 text-primary mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-light text-primary mb-2">
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {metric.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CLIENT LOGOS SECTION
// ============================================
const ClientLogosSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const logos = [
    { src: mantraLogo, name: "MANTRA" },
    { src: storyLogo, name: "Story Protocol" },
    { src: peaqLogo, name: "peaq" },
    { src: bnbLogo, name: "BNB Chain" },
    { src: bybitLogo, name: "Bybit" },
    { src: kucoinLogo, name: "KuCoin" },
    { src: ondoLogo, name: "Ondo" },
    { src: saharaLogo, name: "Sahara AI" },
    { src: polygonLogo, name: "Polygon" },
    { src: megaethLogo, name: "MegaETH" },
    { src: synfuturesLogo, name: "SynFutures" },
    { src: triaLogo, name: "Tria" },
  ];

  return (
    <section ref={ref} className="py-16 bg-background border-y border-border/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {logos.map((logo, index) => (
            <motion.img
              key={logo.name}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.5 } : {}}
              whileHover={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              src={logo.src}
              alt={logo.name}
              className="h-6 md:h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-background">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Ready to Access the
            <br />
            <span className="text-primary">KRW Liquidity Pool?</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Let's discuss how we can help you enter the Korean market.
          </p>
          <CalendlyButton 
            size="lg"
            className="px-10 py-4 text-base"
          >
            Schedule a Call
            <ArrowRight className="ml-2 w-4 h-4" />
          </CalendlyButton>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
// ============================================
const GTMService = () => {
  usePageMeta({
    title: 'Korea GTM Strategy | ium Labs',
    description: 'Launch your Web3 project in Korea with our data-driven go-to-market strategy. Access the KRW liquidity pool.'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ServiceSchema
        name="Korea GTM Strategy"
        description="Launch your Web3 project in Korea with our data-driven go-to-market strategy."
        provider="ium Labs"
        url="https://iumlabs.com/services/gtm"
      />
      <Navbar />
      <main>
        <HeroSection />
        <StrategicImperativeSection />
        <FrameworkSection />
        <ProofOfWorkSection />
        <ResultsSection />
        <ClientLogosSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default GTMService;
