import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight, Mail, Globe, Database, Users, ChevronRight } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

// ============================================
// IMAGE IMPORTS
// ============================================
// Project backgrounds
import storyBg from '@/assets/projects/story-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import mantraBg from '@/assets/projects/mantra-featured-bg.jpg';
import openledgerHero from '@/assets/campaigns/openledger-hero-official.png';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';

// Campaign images
import seoulMetroBillboard from '@/assets/campaigns/seoul-metro-billboard.jpeg';
import storyOriginSummit from '@/assets/campaigns/story-origin-summit.jpg';
import ondoSeminar from '@/assets/campaigns/ondo-seminar.jpg';
import mantraParty from '@/assets/campaigns/mantra-party.jpg';
import peaqSummit from '@/assets/campaigns/peaq-summit.jpg';
import bnbEvent from '@/assets/campaigns/bnb-event.jpg';
import openledgerEvent from '@/assets/campaigns/openledger-event.jpg';
import kucoinCampaign from '@/assets/campaigns/kucoin-campaign.jpg';

// Process images
import discoveryResearch from '@/assets/process/discovery-research.jpg';
import strategyPlanning from '@/assets/process/strategy-planning.jpg';
import executionGrowth from '@/assets/process/execution-growth.jpg';
import scaleSuccess from '@/assets/process/scale-success.jpg';

// Other assets
import dashboardMockup from '@/assets/dashboard-mockup.png';
import officeImage from '@/assets/office/ium-labs-office.webp';

// Logo imports
import bybitLogo from '@/assets/logos/bybit.png';
import mantraLogo from '@/assets/logos/mantra.png';
import peaqLogo from '@/assets/logos/peaq.svg';
import storyLogo from '@/assets/logos/story-protocol.png';
import kucoinLogo from '@/assets/logos/kucoin.svg';
import bnbLogo from '@/assets/logos/bnb.svg';
import coindeskLogo from '@/assets/logos/coindesk.png';
import cointelegraphLogo from '@/assets/logos/cointelegraph.png';
import blockmediaLogo from '@/assets/logos/blockmedia-new.png';

// ============================================
// SECTION 1: HERO
// ============================================
const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section ref={sectionRef} className="relative h-[100vh] overflow-hidden bg-black">
      {/* Video Background */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/videos/gtm-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
      </motion.div>

      {/* Center Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        style={{ opacity, y: textY }}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[10px] tracking-[0.4em] text-white/50 uppercase mb-6"
        >
          Korea GTM Strategy
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center max-w-5xl"
        >
          <span className="block text-[clamp(1.8rem,5vw,4rem)] font-medium text-white/60 leading-tight mb-2">
            We've helped
          </span>
          <span className="block text-[clamp(2.5rem,8vw,6rem)] font-black text-white leading-[0.95] tracking-tight">
            30+ global Web3 projects
          </span>
          <span className="block text-[clamp(1.5rem,4vw,3rem)] font-medium text-white/60 leading-tight mt-4">
            crack Korea's <span className="text-violet-400 font-bold">$50B</span> crypto market.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-white text-lg md:text-xl font-medium mt-10"
        >
          Your turn.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-12"
        >
          <a 
            href="#problem"
            className="group inline-flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
          >
            <span>See how we do it</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-4 h-4 rotate-90" />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// SECTION 2: PROBLEM + PROOF (통합 섹션)
// ============================================
const ProblemProof = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const problemInView = useInView(problemRef, { once: true, margin: "-20%" });
  const transitionInView = useInView(transitionRef, { once: true, margin: "-30%" });
  const resultsInView = useInView(resultsRef, { once: true, margin: "-20%" });

  const [activeProject, setActiveProject] = useState(0);

  const problems = [
    {
      emphasis: "99%",
      statement: "of Koreans search in Korean only.",
      image: storyOriginSummit
    },
    {
      emphasis: "VASP",
      statement: "Korea's compliance shuts doors overnight.",
      image: ondoSeminar
    },
    {
      emphasis: "24/7",
      statement: "Korean users expect real engagement.",
      image: mantraParty
    }
  ];

  const projects = [
    { name: "Story Protocol", result: "Korea #1 Community", media: storyBg, slug: "story-protocol" },
    { name: "MANTRA", result: "500% Volume Growth", media: mantraBg, slug: "mantra" },
    { name: "peaq", result: "First Mover Advantage", media: peaqBg, slug: "peaq" },
    { name: "Sahara AI", result: "Community Built", media: saharaAiBg, slug: "sahara-ai" },
    { name: "OpenLedger", result: "Market Entry", media: openledgerHero, slug: "openledger" },
    { name: "KuCoin", result: "Top Engagement", media: kucoinBg, slug: "kucoin" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <div ref={containerRef} id="problem" className="bg-black">
      {/* Problem Section with Image Grid */}
      <section ref={problemRef} className="relative py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white">
              Korea is different.
              <br />
              <span className="text-white/40">Really different.</span>
            </h2>
          </motion.div>

          {/* Problem Cards with Images */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {problems.map((problem, i) => (
              <motion.div
                key={problem.emphasis}
                initial={{ opacity: 0, y: 40 }}
                animate={problemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="group relative aspect-[4/5] overflow-hidden"
              >
                {/* Background Image */}
                <img
                  src={problem.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                  <span className="text-[clamp(3rem,8vw,5rem)] font-black text-violet-400 leading-none">
                    {problem.emphasis}
                  </span>
                  <p className="text-white/70 text-sm md:text-base mt-3 leading-relaxed">
                    {problem.statement}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Result Stat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={problemInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center py-16 border-t border-white/10"
          >
            <p className="text-white/40 text-sm tracking-widest uppercase mb-4">Result?</p>
            <span className="text-[clamp(4rem,15vw,10rem)] font-black text-white leading-none">
              90%
            </span>
            <p className="text-white/50 text-lg md:text-xl mt-4">
              of Web3 projects <span className="text-red-400 font-semibold">fail</span> in Korea within 6 months.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Transition */}
      <section ref={transitionRef} className="h-[70vh] flex items-center justify-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={transitionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[clamp(2rem,8vw,6rem)] font-black text-white text-center leading-tight"
        >
          But not the ones
          <br />
          <span className="text-violet-400">we work with.</span>
        </motion.h2>
      </section>

      {/* Results with Project Slider */}
      <section ref={resultsRef} className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img
              src={projects[activeProject].media}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Track Record</span>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4">
              The proof is in the numbers.
            </h3>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-8 mb-20 max-w-3xl mx-auto"
          >
            <StatItem value={340} suffix="%" label="Avg. Volume Increase" isInView={resultsInView} />
            <StatItem value={2.5} suffix="M" label="Organic Reach" isInView={resultsInView} />
            <StatItem value={30} suffix="+" label="Projects Launched" isInView={resultsInView} />
          </motion.div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={resultsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className={`group relative block aspect-[4/5] overflow-hidden transition-all duration-500 ${
                    activeProject === i ? 'ring-2 ring-violet-500' : ''
                  }`}
                  onMouseEnter={() => setActiveProject(i)}
                >
                  <img
                    src={project.media}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                  
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <h4 className="text-white font-bold text-sm md:text-base">{project.name}</h4>
                    <p className="text-violet-400 text-xs mt-1">{project.result}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={resultsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const StatItem = ({ value, label, suffix = "", isInView }: { value: number; label: string; suffix?: string; isInView: boolean }) => {
  const count = useCountUp({ end: value, isVisible: isInView, suffix });

  return (
    <div className="text-center">
      <span className="text-4xl md:text-6xl font-black text-white">
        {count}{suffix}
      </span>
      <p className="text-white/40 text-xs md:text-sm mt-2">{label}</p>
    </div>
  );
};

// ============================================
// SECTION 3: PROCESS (이미지 기반)
// ============================================
const VisualProcess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      week: "Week 1-2",
      title: "Discovery",
      image: discoveryResearch,
      tasks: ["Market research", "Competitor analysis", "Audience mapping", "Regulatory review"]
    },
    {
      week: "Week 3-4",
      title: "Strategy",
      image: strategyPlanning,
      tasks: ["GTM roadmap", "Channel selection", "Budget allocation", "KPI definition"]
    },
    {
      week: "Week 5-8",
      title: "Launch",
      image: executionGrowth,
      tasks: ["PR campaigns", "Community building", "KOL activation", "Event execution"]
    },
    {
      week: "Ongoing",
      title: "Scale",
      image: scaleSuccess,
      tasks: ["Performance tracking", "Optimization", "Expansion planning", "Reporting"]
    }
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-neutral-950">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Our Process</span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4">
            How we get you there.
          </h3>
        </motion.div>

        {/* Process Cards with Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.week}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredStep(i)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Background Image */}
              <img
                src={step.image}
                alt={step.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  hoveredStep === i ? 'scale-110' : 'scale-100'
                }`}
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 transition-all duration-500 ${
                hoveredStep === i 
                  ? 'bg-violet-900/80' 
                  : 'bg-gradient-to-t from-black via-black/60 to-transparent'
              }`} />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                {/* Top */}
                <div>
                  <span className="inline-block text-xs font-medium tracking-wider uppercase px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80">
                    {step.week}
                  </span>
                </div>

                {/* Bottom */}
                <div>
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {step.title}
                  </h4>
                  
                  {/* Tasks - Show on hover */}
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredStep === i ? 1 : 0,
                      height: hoveredStep === i ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 overflow-hidden"
                  >
                    {step.tasks.map((task, j) => (
                      <li key={j} className="text-white/80 text-sm flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-violet-400" />
                        {task}
                      </li>
                    ))}
                  </motion.ul>
                </div>
              </div>

              {/* Step Number */}
              <div className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                <span className="text-white font-bold">{String(i + 1).padStart(2, '0')}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: WHY US (비주얼 카드)
// ============================================
const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const differentiators = [
    {
      icon: Globe,
      title: "Local DNA, Global Network",
      description: "Founded by former Binance & KuCoin executives. We don't just understand Korea—we built its crypto ecosystem.",
      highlight: "Binance & KuCoin Alumni",
      image: officeImage
    },
    {
      icon: Database,
      title: "Data-First Approach",
      description: "Proprietary analytics dashboard tracking real-time market sentiment, competitor moves, and community health.",
      highlight: "Proprietary Analytics",
      image: dashboardMockup
    },
    {
      icon: Users,
      title: "End-to-End Execution",
      description: "From research to launch to scale. One team. Complete accountability. No finger-pointing between agencies.",
      highlight: "Full-Stack Team",
      image: seoulMetroBillboard
    }
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-black/40 tracking-[0.4em] uppercase">Why Ium Labs</span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-black mt-4">
            What makes us different.
          </h3>
        </motion.div>

        {/* Cards with Images */}
        <div className="grid md:grid-cols-3 gap-6">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="group relative overflow-hidden bg-neutral-100"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center bg-violet-600">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h4 className="text-xl md:text-2xl font-bold text-black mb-3">
                  {item.title}
                </h4>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <span className="inline-block text-xs font-medium text-violet-600 px-3 py-1 bg-violet-100">
                  {item.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: TRUST + GALLERY
// ============================================
const TrustGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);

  const clientLogos = [
    { name: "Bybit", logo: bybitLogo },
    { name: "MANTRA", logo: mantraLogo },
    { name: "peaq", logo: peaqLogo },
    { name: "Story Protocol", logo: storyLogo },
    { name: "KuCoin", logo: kucoinLogo },
    { name: "BNB Chain", logo: bnbLogo },
  ];

  const mediaLogos = [
    { name: "CoinDesk", logo: coindeskLogo },
    { name: "CoinTelegraph", logo: cointelegraphLogo },
    { name: "BlockMedia", logo: blockmediaLogo },
  ];

  const campaignImages = [
    { src: bnbEvent, title: "BNB Chain Event" },
    { src: storyOriginSummit, title: "Story Origin Summit" },
    { src: peaqSummit, title: "peaq Summit" },
    { src: mantraParty, title: "MANTRA Party" },
    { src: openledgerEvent, title: "OpenLedger Event" },
    { src: kucoinCampaign, title: "KuCoin Campaign" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campaignImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [campaignImages.length]);

  const testimonial = {
    quote: "ium Labs understood the Korean market better than any agency we worked with. Their data-driven approach and local expertise made all the difference.",
    author: "Global Marketing Lead",
    company: "Top 10 L1 Project"
  };

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Trusted By</span>
          <h3 className="text-3xl md:text-5xl font-black text-white mt-4">Global leaders choose us</h3>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center mb-16"
        >
          {clientLogos.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="group"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-8 md:h-10 w-auto object-contain opacity-40 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Campaign Gallery Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="relative aspect-[21/9] mb-16 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={campaignImages[currentSlide].src}
                alt={campaignImages[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
              
              {/* Caption */}
              <div className="absolute bottom-6 left-6">
                <span className="text-white/60 text-sm">{campaignImages[currentSlide].title}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            {campaignImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-8 h-1 transition-all duration-300 ${
                  currentSlide === i ? 'bg-violet-500' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="max-w-3xl mx-auto text-center py-12 border-t border-white/10 mb-16"
        >
          <p className="text-xl md:text-2xl text-white/80 italic leading-relaxed mb-6">
            "{testimonial.quote}"
          </p>
          <div>
            <span className="text-white font-medium">{testimonial.author}</span>
            <span className="text-white/40 mx-2">·</span>
            <span className="text-violet-400">{testimonial.company}</span>
          </div>
        </motion.div>

        {/* Media Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <span className="text-white/30 text-sm">Featured in</span>
          
          <div className="mt-8 flex items-center justify-center gap-12 md:gap-16">
            {mediaLogos.map((media) => (
              <img
                key={media.name}
                src={media.logo}
                alt={media.name}
                className="h-6 md:h-8 w-auto object-contain opacity-30 hover:opacity-60 transition-opacity grayscale"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: CTA
// ============================================
const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      ref={ref} 
      className={`relative min-h-screen flex items-center transition-colors duration-700 overflow-hidden ${
        isHovered ? 'bg-violet-600' : 'bg-black'
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isHovered ? 'opacity-20' : 'opacity-30'
          }`}
        >
          <source src="/videos/gtm-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main CTA Text */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2.5rem,8vw,5rem)] font-black text-white leading-tight"
          >
            Ready to crack <span className="text-violet-400">Korea?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-lg md:text-xl mt-6 mb-12"
          >
            가장 확실한 파트너와 시작하세요.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black hover:bg-violet-500 hover:text-white transition-all duration-500 text-lg font-bold"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-8"
          >
            <a
              href="mailto:gm@iumlabs.io"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">gm@iumlabs.io</span>
            </a>
            <a
              href="https://calendly.com/iumlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <CalendarDays className="w-4 h-4" />
              <span className="text-sm">Calendly</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN
// ============================================
const GTMService = () => {
  usePageMeta(
    "Data-Driven Korea GTM Strategy | Ium Labs",
    "We've helped 30+ global Web3 projects crack Korea's $50B crypto market. Data-driven GTM strategy powered by former Binance & KuCoin executives."
  );

  return (
    <>
      <ServiceSchema
        name="Korea GTM Strategy"
        description="Data-driven go-to-market strategy for Web3 projects entering the Korean market. Powered by deep research and local expertise."
        url="/services/gtm"
        provider="Ium Labs"
        areaServed="South Korea"
      />
      <Navbar />
      <main>
        <Hero />
        <ProblemProof />
        <VisualProcess />
        <WhyUs />
        <TrustGallery />
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default GTMService;
