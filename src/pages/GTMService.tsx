import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight, Mail, Globe, Database, Users, ChevronRight, MessageCircle, Award, TrendingUp, Target, Megaphone, Calendar, Search, BarChart3 } from 'lucide-react';
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

// Service images
import communityGrowth from '@/assets/services/community-growth.jpg';
import prMedia from '@/assets/services/pr-media.jpg';
import kolNetwork from '@/assets/services/kol-network.jpg';
import seoAds from '@/assets/services/seo-ads.jpg';
import events from '@/assets/services/events.jpg';

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
import saharaLogo from '@/assets/logos/sahara-ai.png';
import megaethLogo from '@/assets/logos/megaeth.png';
import polygonLogo from '@/assets/logos/polygon.svg';

// ============================================
// FLOATING SERVICE TAGS (Lunar Strategy Style)
// ============================================
const FloatingServiceTags = () => {
  const tags = [
    { label: "PR & Media", top: "20%", left: "8%" },
    { label: "Community", top: "25%", right: "10%" },
    { label: "Influencer Marketing", bottom: "35%", left: "5%" },
    { label: "GTM Strategy", bottom: "30%", right: "8%" },
    { label: "Events", top: "45%", left: "12%" },
    { label: "Research", top: "40%", right: "15%" },
  ];

  return (
    <>
      {tags.map((tag, index) => (
        <motion.span
          key={tag.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0, 10, 0],
          }}
          transition={{ 
            delay: 1.5 + index * 0.2,
            duration: 0.5,
            y: {
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="hidden lg:block absolute text-[10px] tracking-[0.2em] uppercase px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 text-white/60"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
            bottom: tag.bottom,
          }}
        >
          {tag.label}
        </motion.span>
      ))}
    </>
  );
};

// ============================================
// SECTION 1: HERO (with Floating Tags - Lunar Strategy)
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

      {/* Floating Service Tags */}
      <FloatingServiceTags />

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
            crack Korea's <span className="text-primary font-bold">$50B</span> crypto market.
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

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-10"
        >
          <Link 
            to="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 text-sm font-semibold tracking-wide"
          >
            <span>Book a Free Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-16"
        >
          <a 
            href="#social-proof"
            className="group inline-flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
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
// SECTION 2: SOCIAL PROOF BAR (NoGood + Coinband Style)
// ============================================
const SocialProofBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    { value: 340, suffix: "%", label: "Avg. Volume Increase" },
    { value: 2.5, suffix: "M", label: "Organic Reach" },
    { value: 30, suffix: "+", label: "Projects Launched" },
    { value: 84, suffix: "%", label: "Client Retention" },
  ];

  const clientLogos = [
    { name: "Story Protocol", logo: storyLogo },
    { name: "MANTRA", logo: mantraLogo },
    { name: "peaq", logo: peaqLogo },
    { name: "Sahara AI", logo: saharaLogo },
    { name: "Bybit", logo: bybitLogo },
    { name: "KuCoin", logo: kucoinLogo },
    { name: "BNB Chain", logo: bnbLogo },
    { name: "MegaETH", logo: megaethLogo },
    { name: "Polygon", logo: polygonLogo },
  ];

  return (
    <section ref={ref} id="social-proof" className="relative py-16 md:py-20 bg-neutral-950 border-y border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16"
        >
          {stats.map((stat, i) => (
            <StatItem 
              key={stat.label}
              value={stat.value} 
              suffix={stat.suffix} 
              label={stat.label} 
              isInView={isInView}
              delay={i * 0.1}
            />
          ))}
        </motion.div>

        {/* Logo Marquee */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent z-10" />
          
          <motion.div 
            className="flex gap-12 items-center"
            animate={{ x: [0, -1200] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...clientLogos, ...clientLogos].map((client, i) => (
              <img
                key={`${client.name}-${i}`}
                src={client.logo}
                alt={client.name}
                className="h-8 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 flex-shrink-0"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ value, label, suffix = "", isInView, delay = 0 }: { 
  value: number; 
  label: string; 
  suffix?: string; 
  isInView: boolean;
  delay?: number;
}) => {
  const count = useCountUp({ end: value, isVisible: isInView, suffix });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="text-center"
    >
      <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
        {count}
      </span>
      <p className="text-white/40 text-xs md:text-sm mt-2 tracking-wide">{label}</p>
    </motion.div>
  );
};

// ============================================
// SECTION 3: PROBLEM + TESTIMONIAL (NoGood Style)
// ============================================
const ProblemTestimonial = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  
  const problemInView = useInView(problemRef, { once: true, margin: "-20%" });
  const testimonialInView = useInView(testimonialRef, { once: true, margin: "-20%" });

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

  return (
    <div ref={containerRef} id="problem" className="bg-black">
      {/* Problem Section */}
      <section ref={problemRef} className="relative py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
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

          {/* Problem Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {problems.map((problem, i) => (
              <motion.div
                key={problem.emphasis}
                initial={{ opacity: 0, y: 40 }}
                animate={problemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="group relative aspect-[4/5] overflow-hidden"
              >
                <img
                  src={problem.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                
                <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                  <span className="text-[clamp(3rem,8vw,5rem)] font-black text-primary leading-none">
                    {problem.emphasis}
                  </span>
                  <p className="text-white/70 text-sm md:text-base mt-3 leading-relaxed">
                    {problem.statement}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 90% Fail Stat */}
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

      {/* Transition + Testimonial */}
      <section ref={testimonialRef} className="relative py-24 md:py-32 bg-neutral-950">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
            className="text-[clamp(2rem,6vw,4.5rem)] font-black text-white text-center leading-tight mb-20"
          >
            But not the ones
            <br />
            <span className="text-primary">we work with.</span>
          </motion.h2>

          {/* Featured Testimonial Card (NoGood Style) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
              {/* Client Logo */}
              <div className="mb-8">
                <img src={storyLogo} alt="Story Protocol" className="h-8 w-auto brightness-0 invert opacity-80" />
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl lg:text-3xl text-white/90 font-medium leading-relaxed mb-8">
                "ium Labs made our Korea launch seamless. They understood our vision from day one and delivered beyond expectations."
              </blockquote>

              {/* Author + Result */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">SK</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Sarah Kim</p>
                    <p className="text-white/50 text-sm">Head of Marketing, Story Protocol</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-bold text-lg">340% Volume Growth</span>
                </div>
              </div>

              {/* View Case Study Link */}
              <Link 
                to="/projects/story-protocol"
                className="inline-flex items-center gap-2 mt-8 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                <span>View Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// ============================================
// SECTION 4: RESULTS GRID
// ============================================
const ResultsGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProject, setActiveProject] = useState(0);

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
    <section ref={ref} className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Track Record</span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4">
            The proof is in the numbers.
          </h3>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className={`group relative block aspect-[4/5] overflow-hidden transition-all duration-500 ${
                  activeProject === i ? 'ring-2 ring-primary' : ''
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
                  <p className="text-primary text-xs mt-1">{project.result}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
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
  );
};

// ============================================
// SECTION 5: SERVICES TABS (Coinband Style)
// ============================================
const ServicesTabs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      id: "community",
      label: "Community",
      icon: MessageCircle,
      image: communityGrowth,
      title: "Community Management",
      description: "Building engaged Korean communities that convert. 24/7 moderation, Discord/Telegram setup, event hosting, and ambassador programs.",
      features: ["24/7 Korean moderation", "Discord/Telegram setup", "Event & AMA hosting", "Ambassador programs"]
    },
    {
      id: "pr",
      label: "PR & Media",
      icon: Megaphone,
      image: prMedia,
      title: "PR & Media Relations",
      description: "Strategic media placements across Korea's top crypto outlets. CoinDesk Korea, BlockMedia, and 50+ tier-1 publications.",
      features: ["Tier-1 media placements", "Press release distribution", "Thought leadership", "Crisis management"]
    },
    {
      id: "influencer",
      label: "Influencer",
      icon: Users,
      image: kolNetwork,
      title: "Influencer Marketing",
      description: "Access to 500+ verified Korean crypto KOLs. Data-driven selection, performance tracking, and ROI optimization.",
      features: ["500+ verified KOLs", "Performance analytics", "Content creation", "Campaign management"]
    },
    {
      id: "seo",
      label: "SEO & Ads",
      icon: Search,
      image: seoAds,
      title: "SEO & Paid Ads",
      description: "Dominate Korean search with Naver SEO and targeted paid campaigns across Korea's unique ad ecosystem.",
      features: ["Naver SEO optimization", "Google Ads Korea", "Display advertising", "Retargeting campaigns"]
    },
    {
      id: "events",
      label: "Events",
      icon: Calendar,
      image: events,
      title: "Offline Events",
      description: "End-to-end event production in Korea. From intimate meetups to large-scale conferences and Web3 summits.",
      features: ["Conference hosting", "Meetup organization", "VIP networking", "Venue partnerships"]
    }
  ];

  const activeService = services[activeTab];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-neutral-950">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">What We Offer</span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4">
            Full-Stack GTM Services
          </h3>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
        >
          {services.map((service, i) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === i 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <service.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{service.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={activeService.image}
                alt={activeService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm">
                <activeService.icon className="w-4 h-4" />
                <span>{activeService.label}</span>
              </div>

              <h4 className="text-2xl md:text-4xl font-bold text-white">
                {activeService.title}
              </h4>

              <p className="text-white/60 text-lg leading-relaxed">
                {activeService.description}
              </p>

              <ul className="grid grid-cols-2 gap-3">
                {activeService.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-white/80 text-sm">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={`/services/${activeService.id}`}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: PROCESS (Numbered - Lunar Strategy Style)
// ============================================
const VisualProcess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      number: "01",
      week: "Week 1-2",
      title: "Discovery",
      image: discoveryResearch,
      tasks: ["Market research", "Competitor analysis", "Audience mapping", "Regulatory review"]
    },
    {
      number: "02",
      week: "Week 3-4",
      title: "Strategy",
      image: strategyPlanning,
      tasks: ["GTM roadmap", "Channel selection", "Budget allocation", "KPI definition"]
    },
    {
      number: "03",
      week: "Week 5-8",
      title: "Launch",
      image: executionGrowth,
      tasks: ["PR campaigns", "Community building", "KOL activation", "Event execution"]
    },
    {
      number: "04",
      week: "Ongoing",
      title: "Scale",
      image: scaleSuccess,
      tasks: ["Performance tracking", "Optimization", "Expansion planning", "Reporting"]
    }
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
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

        {/* Process Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredStep(i)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <img
                src={step.image}
                alt={step.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  hoveredStep === i ? 'scale-110' : 'scale-100'
                }`}
              />
              
              <div className={`absolute inset-0 transition-all duration-500 ${
                hoveredStep === i 
                  ? 'bg-primary/80' 
                  : 'bg-gradient-to-t from-black via-black/60 to-transparent'
              }`} />

              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                {/* Top - Number Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-4xl md:text-5xl font-black text-white/20">
                    [{step.number}]
                  </span>
                  <span className="text-xs font-medium tracking-wider uppercase px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80">
                    {step.week}
                  </span>
                </div>

                {/* Bottom */}
                <div>
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {step.title}
                  </h4>
                  
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
                      <li key={j} className="text-white/90 text-sm flex items-center gap-2">
                        <ChevronRight className="w-3 h-3" />
                        {task}
                      </li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: WHY US + AWARDS (Coinband Style)
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

  const awards = [
    { name: "Forbes Korea 30 Under 30", year: "2024" },
    { name: "Top Web3 Agency", year: "Clutch 2024" },
    { name: "Korea Marketing Excellence", year: "2025" },
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
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

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="group relative overflow-hidden bg-neutral-100"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center bg-primary">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h4 className="text-xl md:text-2xl font-bold text-black mb-3">
                  {item.title}
                </h4>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <span className="inline-block text-xs font-medium text-primary px-3 py-1 bg-primary/10">
                  {item.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Awards Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center pt-12 border-t border-neutral-200"
        >
          <span className="text-black/40 text-sm">Recognized Excellence</span>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-8">
            {awards.map((award) => (
              <div 
                key={award.name}
                className="flex items-center gap-3 px-6 py-4 bg-neutral-100 border border-neutral-200"
              >
                <Award className="w-6 h-6 text-primary" />
                <div className="text-left">
                  <p className="text-black font-semibold text-sm">{award.name}</p>
                  <p className="text-black/40 text-xs">{award.year}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 8: TESTIMONIAL CAROUSEL (NoGood Style)
// ============================================
const TestimonialCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      quote: "ium Labs completely transformed our Korean market presence. Their deep understanding of local culture and data-driven approach delivered results beyond our expectations.",
      author: "Sarah Kim",
      role: "Head of Marketing",
      company: "Story Protocol",
      logo: storyLogo,
      result: "340% Volume Growth"
    },
    {
      quote: "The team's execution was flawless. From community building to media relations, they handled everything with precision and professionalism.",
      author: "Michael Chen",
      role: "CEO",
      company: "DeFi Protocol",
      logo: mantraLogo,
      result: "500K+ Community"
    },
    {
      quote: "Working with ium Labs gave us a significant first-mover advantage in the Korean market. Their local expertise is unmatched.",
      author: "David Park",
      role: "BD Lead",
      company: "L1 Blockchain",
      logo: peaqLogo,
      result: "First Korean L1 Partner"
    }
  ];

  const campaignImages = [
    { src: bnbEvent, title: "BNB Chain Event" },
    { src: storyOriginSummit, title: "Story Origin Summit" },
    { src: peaqSummit, title: "peaq Summit" },
    { src: mantraParty, title: "MANTRA Party" },
    { src: openledgerEvent, title: "OpenLedger Event" },
    { src: kucoinCampaign, title: "KuCoin Campaign" },
  ];

  const [gallerySlide, setGallerySlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGallerySlide((prev) => (prev + 1) % campaignImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [campaignImages.length]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Testimonials</span>
          <h3 className="text-3xl md:text-5xl font-black text-white mt-4">
            Don't take it from us.
            <br />
            <span className="text-white/40">Hear from our clients.</span>
          </h3>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="relative max-w-4xl mx-auto mb-16"
        >
          {/* Navigation Arrows */}
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white transition-colors z-10"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white transition-colors z-10"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Author Photo Placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mx-auto md:mx-0">
                    <span className="text-3xl md:text-4xl font-bold text-primary">
                      {testimonials[currentSlide].author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <img 
                    src={testimonials[currentSlide].logo} 
                    alt={testimonials[currentSlide].company}
                    className="h-6 w-auto brightness-0 invert opacity-60 mb-6"
                  />

                  <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
                    "{testimonials[currentSlide].quote}"
                  </blockquote>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-white/10">
                    <div>
                      <p className="text-white font-semibold">{testimonials[currentSlide].author}</p>
                      <p className="text-white/50 text-sm">{testimonials[currentSlide].role}, {testimonials[currentSlide].company}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-semibold text-sm">{testimonials[currentSlide].result}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-8 h-1 transition-all duration-300 ${
                  currentSlide === i ? 'bg-primary' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Campaign Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="relative aspect-[21/9] overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={gallerySlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={campaignImages[gallerySlide].src}
                alt={campaignImages[gallerySlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
              
              <div className="absolute bottom-6 left-6">
                <span className="text-white/60 text-sm">{campaignImages[gallerySlide].title}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 right-6 flex gap-2">
            {campaignImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setGallerySlide(i)}
                className={`w-8 h-1 transition-all duration-300 ${
                  gallerySlide === i ? 'bg-primary' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Media Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <span className="text-white/30 text-sm">Featured in</span>
          
          <div className="mt-8 flex items-center justify-center gap-12 md:gap-16">
            {[coindeskLogo, cointelegraphLogo, blockmediaLogo].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt="Media"
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
// SECTION 9: CTA WITH TEAM PROFILES (Lunar Strategy Style)
// ============================================
const CTAWithTeam = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const team = [
    {
      name: "Tim Park",
      role: "CEO & Founder",
      initials: "TP",
      email: "tim@iumlabs.io",
      telegram: "@timpark_ium"
    },
    {
      name: "Jake Lee",
      role: "Head of BD",
      initials: "JL",
      email: "jake@iumlabs.io",
      telegram: "@jakelee_ium"
    }
  ];

  return (
    <section 
      ref={ref} 
      className={`relative min-h-screen flex items-center transition-colors duration-700 overflow-hidden ${
        isHovered ? 'bg-primary' : 'bg-black'
      }`}
    >
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

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 w-full py-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2.5rem,8vw,5rem)] font-black text-white leading-tight"
          >
            Ready to crack <span className="text-primary">Korea?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-lg md:text-xl mt-6 mb-12"
          >
            가장 확실한 파트너와 시작하세요.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 text-lg font-bold"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Team Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-12 border-t border-white/10"
        >
          <p className="text-white/40 text-sm text-center mb-8">Talk to our team</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
            {team.map((member) => (
              <div 
                key={member.name}
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-lg">{member.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold">{member.name}</p>
                  <p className="text-white/50 text-sm">{member.role}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <a href={`mailto:${member.email}`} className="text-primary hover:text-primary/80 text-xs flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      Email
                    </a>
                    <span className="text-white/30 text-xs">{member.telegram}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
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
        <SocialProofBar />
        <ProblemTestimonial />
        <ResultsGrid />
        <ServicesTabs />
        <VisualProcess />
        <WhyUs />
        <TestimonialCarousel />
        <CTAWithTeam />
      </main>
      <Footer />
    </>
  );
};

export default GTMService;
