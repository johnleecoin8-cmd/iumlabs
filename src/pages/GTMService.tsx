import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Compass, ArrowRight, Play } from 'lucide-react';

// ============================================
// IMAGE SLOTS
// ============================================
import storyBg from '@/assets/projects/story-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import mantraBg from '@/assets/projects/mantra-featured-bg.jpg';
import bybitBg from '@/assets/projects/bybit-bg.jpg';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';

// ============================================
// CONSTANTS
// ============================================
const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ============================================
// SECTION 1: HERO - monks.com style + Narrative Hook
// ============================================
const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <motion.section 
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Video background */}
      <video
        src="/videos/gtm-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto"
        style={{ scale, y: titleY }}
      >
        {/* Oversized brand text */}
        <div className="overflow-hidden mb-8">
          <motion.h1 
            className="text-[18vw] md:text-[14vw] lg:text-[12vw] leading-[0.85] font-black text-white tracking-tighter"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: customEase }}
          >
            .ium
          </motion.h1>
        </div>
        
        {/* Main Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-white/70 text-lg md:text-2xl lg:text-3xl font-light italic max-w-3xl mx-auto"
        >
          Your Strategic Gateway to the Korean Web3 Market.
        </motion.p>
        
        {/* Sub tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-white/40 text-sm md:text-base mt-4"
        >
          Launch in Korea with precision, Scale Globally with confidence.
        </motion.p>
        
        {/* Narrative Hook - NEW */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-white/60 text-base md:text-lg mt-8 max-w-2xl mx-auto border-t border-white/10 pt-8"
        >
          한국 시장 진출은 옵션이 아닌 필수입니다.<br className="hidden md:block" />
          <span className="text-violet-400">가장 확실한 파트너</span>와 시작하세요.
        </motion.p>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div 
            className="w-1 h-2 bg-white/60 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// ============================================
// SECTION 2: CHALLENGE - Why Korea? (NEW)
// ============================================
const ChallengeSection = () => {
  const narrativeCards = [
    {
      type: "Opportunity",
      title: "High Liquidity & Passionate Community",
      description: "세계 5대 시장, 글로벌 거래량 10%를 차지하는 기회의 땅",
      icon: TrendingUp,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      borderColor: "border-emerald-400/20"
    },
    {
      type: "Barrier", 
      title: "Cultural & Regulatory Wall",
      description: "VASP 규제, 언어 장벽, 까다로운 커뮤니티 성향",
      icon: Shield,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      borderColor: "border-orange-400/20"
    },
    {
      type: "Solution Hint",
      title: "You need a local expert",
      description: "글로벌 언어를 구사하는 로컬 전문가가 필요합니다",
      icon: Compass,
      color: "text-violet-400",
      bgColor: "bg-violet-400/10",
      borderColor: "border-violet-400/20"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16 md:mb-20"
        >
          <span className="text-violet-400 text-sm tracking-wider uppercase mb-4 block">Why Korea?</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            "한국은 세계 5대 시장이자 글로벌 거래량의 10%를 차지하는{' '}
            <span className="text-violet-400">'기회의 땅'</span>입니다.
          </h2>
          <p className="text-2xl md:text-3xl text-white/40 mt-4 font-light">
            하지만...
          </p>
        </motion.div>
        
        {/* 3 Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {narrativeCards.map((card, index) => (
            <motion.div
              key={card.type}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`group relative p-8 rounded-2xl border ${card.borderColor} ${card.bgColor} hover:scale-[1.02] transition-transform duration-300`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center mb-6`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              
              {/* Type badge */}
              <span className={`text-xs tracking-wider uppercase ${card.color} font-medium`}>
                {card.type}
              </span>
              
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white mt-3 mb-4">
                {card.title}
              </h3>
              
              {/* Description */}
              <p className="text-white/60 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            당신에겐 <span className="text-violet-400 italic">'지도'</span>가 필요합니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: APPROACH - 4-Step Framework (Enhanced)
// ============================================
const ApproachSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const steps = [
    {
      number: "01",
      title: "Discovery",
      subtitle: "시장 분석",
      description: "표면적인 번역이 아닌, 한국 유저의 심층 심리를 분석합니다.",
      image: storyBg,
      link: "/services/deep-research"
    },
    {
      number: "02", 
      title: "Strategy",
      subtitle: "전략 수립",
      description: "한국의 규제와 트렌드에 맞춘 '커스텀 GTM'을 설계합니다.",
      image: peaqBg,
      link: "/services/gtm"
    },
    {
      number: "03",
      title: "Execution",
      subtitle: "실행 단계",
      description: "흩어진 채널이 아닌, 통합된 목소리로 임팩트를 만듭니다.",
      image: mantraBg,
      link: "/services/community"
    },
    {
      number: "04",
      title: "Scale",
      subtitle: "확장 및 성장",
      description: "단순 진입을 넘어, 지속 가능한 생태계를 구축합니다.",
      image: saharaAiBg,
      link: "/services/pr"
    }
  ];

  return (
    <section className="relative py-8 md:py-12 bg-black">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8">
        {/* Section Header - NEW */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            우리는 <span className="text-violet-400">감</span>으로 일하지 않습니다.
          </h2>
          <p className="text-xl md:text-2xl text-white/50">
            철저한 데이터와 검증된 4단계 프레임워크로 움직입니다.
          </p>
        </motion.div>
        
        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
          {steps.map((step, index) => (
            <Link
              key={step.number}
              to={step.link}
              className="group relative block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div 
                className="relative aspect-[4/5] overflow-hidden bg-neutral-900"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* Background image */}
                <motion.img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                    opacity: hoveredIndex === index ? 1 : 0.4
                  }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Top - Number */}
                  <div className="flex items-start justify-between">
                    <span className="text-6xl md:text-7xl font-black text-white/10 group-hover:text-violet-400/30 transition-colors duration-500">
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Bottom - Info */}
                  <div>
                    <span className="text-violet-400/80 text-xs tracking-wider uppercase">
                      {step.subtitle}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-2 group-hover:text-violet-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    {/* Description - shows on hover */}
                    <motion.p
                      className="text-white/60 text-sm mt-3 line-clamp-2"
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        y: hoveredIndex === index ? 0 : 10
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: PROVEN TRACK RECORD (NEW)
// ============================================
const ProvenTrackRecordSection = () => {
  const stats = [
    { value: "30+", label: "Projects Launched", sublabel: "한국 시장 진출 성공" },
    { value: "500M+", label: "Total Impressions", sublabel: "누적 노출 수" },
    { value: "95%", label: "Client Retention", sublabel: "고객 재계약률" }
  ];

  return (
    <section className="py-24 md:py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            말뿐인 전략은 <span className="text-violet-400">의미가 없습니다.</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/50">
            숫자가 증명합니다.
          </p>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4">
                {stat.value}
              </div>
              <div className="text-lg md:text-xl font-bold text-white mb-2">
                {stat.label}
              </div>
              <div className="text-white/40 text-sm">
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: MANTRA SPOTLIGHT (NEW)
// ============================================
const MANTRASpotlightSection = () => {
  const achievements = [
    { icon: TrendingUp, label: "커뮤니티 성장 500%" },
    { icon: "📰", label: "미디어 노출 100+" },
    { icon: "👥", label: "한국 DAU 300% 증가" }
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-black via-violet-950/10 to-black">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img 
              src={mantraBg} 
              alt="MANTRA Case Study"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-8 md:p-16 lg:p-20">
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded-full text-violet-300 text-xs tracking-wider uppercase mb-6"
            >
              Featured Case Study
            </motion.span>
            
            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
            >
              From Zero to<br />
              <span className="text-violet-400">Market Leader</span>
            </motion.h2>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/60 text-lg md:text-xl max-w-2xl mb-8"
            >
              MANTRA가 한국에서 어떻게 인지도를 0에서 100으로 끌어올렸는지 확인하세요.
            </motion.p>
            
            {/* Achievement Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.label}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
                >
                  {typeof achievement.icon === 'string' ? (
                    <span>{achievement.icon}</span>
                  ) : (
                    <achievement.icon className="w-4 h-4 text-violet-400" />
                  )}
                  <span className="text-white/80 text-sm font-medium">{achievement.label}</span>
                </div>
              ))}
            </motion.div>
            
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-white/40 text-sm mb-4 italic">
                이것은 곧 당신의 이야기가 될 수 있습니다.
              </p>
              <Link
                to="/projects/mantra"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-violet-500 hover:bg-violet-400 text-white font-bold rounded-full transition-colors"
              >
                <span>케이스 스터디 보기</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: CLIENT STORIES - Enhanced Header
// ============================================
const ClientStoriesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const projects = [
    { 
      title: "Korea Launch Campaign", 
      client: "Story Protocol",
      image: storyBg,
      slug: "story-protocol" 
    },
    { 
      title: "Web3 Infrastructure GTM", 
      client: "peaq",
      image: peaqBg,
      slug: "peaq" 
    },
    { 
      title: "AI + Blockchain Campaign", 
      client: "Sahara AI",
      image: saharaAiBg,
      slug: "sahara-ai" 
    },
    { 
      title: "Exchange Partnership", 
      client: "Bybit",
      image: bybitBg,
      slug: "bybit" 
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Enhanced Header - Storytelling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 max-w-4xl"
        >
          <span className="text-violet-400 text-sm tracking-wider uppercase mb-4 block">Selected Work</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            업계를 선도하는 <span className="text-violet-400">Top-tier 프로젝트</span>들이 이미 이음 랩스를 선택했습니다.
          </h2>
          <p className="text-white/50 text-lg md:text-xl">
            Story Protocol, peaq, Sahara AI... 혁신적인 기술을 가진 그들이 한국 파트너로 우리를 택한 이유는 분명합니다.
          </p>
        </motion.div>
        
        {/* Project list */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link 
                to={`/projects/${project.slug}`}
                className="group flex items-center gap-6 py-6 md:py-8 border-b border-white/10 hover:border-white/20 transition-colors"
              >
                {/* Thumbnail */}
                <motion.div
                  className="hidden md:block relative w-[120px] h-[80px] rounded overflow-hidden flex-shrink-0"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 0.9,
                    x: hoveredIndex === index ? 0 : -10
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src={project.image} 
                    alt={project.client}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span className="text-white/40 text-sm">{project.client}</span>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:text-violet-300 transition-colors mt-1">
                    {project.title}
                  </h3>
                </div>
                
                {/* Arrow */}
                <motion.div 
                  className="text-white/30 group-hover:text-white transition-colors"
                  animate={{ x: hoveredIndex === index ? 5 : 0 }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* View all work */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Link 
            to="/projects"
            className="text-violet-400 hover:text-violet-300 text-sm tracking-wider uppercase transition-colors"
          >
            View all work
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: GLOBAL NETWORK (NEW)
// ============================================
const GlobalNetworkSection = () => {
  const locations = [
    { city: "Seoul", status: "Headquarters", active: true },
    { city: "Tokyo", status: "Partner Network", active: false },
    { city: "Singapore", status: "Partner Network", active: false },
    { city: "New York", status: "Coming Soon", active: false }
  ];

  return (
    <section className="py-24 md:py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-violet-400 text-sm tracking-wider uppercase mb-4 block">Global Vision</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Seoul is just<br />
              <span className="text-violet-400">the beginning.</span>
            </h2>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-8">
              우리의 본진은 서울이지만, 시야는 세계를 향해 있습니다. 
              서울에서의 성공을 발판 삼아 도쿄, 싱가포르, 뉴욕으로 연결합니다. 
              <span className="text-violet-400">이음(ium)</span>은 이름 그대로 당신과 세계를 잇습니다.
            </p>
          </motion.div>
          
          {/* Right - Locations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {locations.map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`flex items-center justify-between p-6 rounded-xl border ${
                  location.active 
                    ? 'border-violet-500/30 bg-violet-500/10' 
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    location.active ? 'bg-violet-400 animate-pulse' : 'bg-white/20'
                  }`} />
                  <span className="text-xl md:text-2xl font-bold text-white">
                    {location.city}
                  </span>
                </div>
                <span className={`text-sm ${
                  location.active ? 'text-violet-400' : 'text-white/40'
                }`}>
                  {location.status}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 8: INSIGHTS
// ============================================
const InsightsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Featured report */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-white/40 text-xs tracking-wider uppercase">Report</span>
        </motion.div>
        
        <Link to="/research" className="group block">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="relative aspect-[21/9] md:aspect-[3/1]">
              <img 
                src={mantraBg} 
                alt="Featured report"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
            
            <div className="absolute inset-0 flex items-center p-8 md:p-16">
              <div className="max-w-2xl">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  <span className="italic text-white/70">Unlocking Korea:</span> The Marketer's Playbook for Web3 Market Entry
                </h3>
                <div className="flex items-center gap-4 mt-6 text-white/50 text-sm">
                  <span>By Ium Labs</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
        
        {/* Secondary articles */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { title: "한국 시장 진출 체크리스트", tag: "Guide", time: "3 min" },
            { title: "커뮤니티 성장 전략 2025", tag: "Blog Post", time: "4 min" },
            { title: "VASP 규제 완벽 가이드", tag: "Report", time: "6 min" },
          ].map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link 
                to="/research"
                className="group block p-6 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                <span className="text-white/40 text-xs tracking-wider uppercase">{article.tag}</span>
                <h4 className="text-lg font-bold text-white mt-2 group-hover:text-violet-300 transition-colors">
                  {article.title}
                </h4>
                <p className="text-white/40 text-sm mt-2">By Ium Labs • {article.time} read</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 9: AWARDS
// ============================================
const AwardsSection = () => {
  const awards = [
    { 
      title: "Korea's #1 Web3 GTM Partner",
      subtitle: "Market Leader 2024"
    },
    { 
      title: "30+ Successful Project Launches",
      subtitle: "Verified Track Record"
    },
    { 
      title: "500M+ Total Impressions",
      subtitle: "Proven Impact"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-white mb-12 md:mb-16"
        >
          Awards
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-black text-white/20 mb-4">
                .ium
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                {award.title}
              </h3>
              <p className="text-white/40 text-sm">
                {award.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 10: CTA - "Ready to Unlock Korea?"
// ============================================
const CTASection = () => {
  const ctaWords = ["Ready", "to", "Unlock", "Korea", "?"];
  
  return (
    <section className="relative py-32 md:py-48 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Interactive headline */}
          <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2 mb-12">
            {ctaWords.map((word, i) => (
              <motion.span
                key={i}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white/20 hover:text-white transition-colors duration-500 cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          
          {/* Sub message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-white/40 text-lg mb-8 max-w-xl mx-auto"
          >
            한국 시장 진출은 옵션이 아닌 필수입니다.<br />
            가장 확실한 파트너와 시작하세요.
          </motion.p>
          
          {/* CTA Button */}
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-violet-400 transition-colors duration-300"
          >
            <span>Unlock Korea Now</span>
            <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const GTMService = () => {
  usePageMeta(
    "Korean Web3 GTM Strategy | Ium Labs",
    "Your Strategic Gateway to the Korean Web3 Market. Launch in Korea with precision, Scale Globally with confidence.",
    "/services/gtm"
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ServiceSchema 
        name="GTM Strategy - Korea Market Entry"
        description="한국 시장 진출을 위한 전문 GTM 전략 서비스"
        provider="Ium Labs"
        areaServed="Korea"
        url="https://iumlabs.io/services/gtm"
      />
      
      <Navbar />
      
      {/* 1. HERO */}
      <HeroSection />
      
      {/* 2. CHALLENGE - Why Korea? */}
      <ChallengeSection />
      
      {/* 3. APPROACH - 4 Step Framework */}
      <ApproachSection />
      
      {/* 4. PROVEN TRACK RECORD */}
      <ProvenTrackRecordSection />
      
      {/* 5. MANTRA SPOTLIGHT */}
      <MANTRASpotlightSection />
      
      {/* 6. CLIENT STORIES */}
      <ClientStoriesSection />
      
      {/* 7. GLOBAL NETWORK */}
      <GlobalNetworkSection />
      
      {/* 8. INSIGHTS */}
      <InsightsSection />
      
      {/* 9. AWARDS */}
      <AwardsSection />
      
      {/* 10. CTA */}
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default GTMService;
