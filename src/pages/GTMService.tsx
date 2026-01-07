import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';

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
// SECTION 1: HERO - monks.com style fullscreen with oversized typography
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
      
      {/* Content - monks style centered */}
      <motion.div 
        className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto"
        style={{ scale, y: titleY }}
      >
        {/* Oversized brand text - monks style */}
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
        
        {/* Tagline - like monks "Accelerating growth through Marketing and Technology" */}
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
// SECTION 2: SOLUTIONS - monks.com style numbered cards grid
// ============================================
const SolutionsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const solutions = [
    {
      number: "01",
      category: "Solutions",
      title: "Discovery & Research",
      description: "표면적인 번역이 아닌, 한국 유저의 심층 심리를 분석합니다.",
      image: storyBg,
      link: "/services/deep-research"
    },
    {
      number: "02",
      category: "Solutions", 
      title: "GTM Strategy",
      description: "한국의 규제와 트렌드에 맞춘 '커스텀 GTM'을 설계합니다.",
      image: peaqBg,
      link: "/services/gtm"
    },
    {
      number: "03",
      category: "Solutions",
      title: "Execution & Growth",
      description: "흩어진 채널이 아닌, 통합된 목소리로 임팩트를 만듭니다.",
      image: mantraBg,
      link: "/services/community"
    },
    {
      number: "04",
      category: "Solutions",
      title: "Scale & Ecosystem",
      description: "단순 진입을 넘어, 지속 가능한 생태계를 구축합니다.",
      image: saharaAiBg,
      link: "/services/pr"
    }
  ];

  return (
    <section className="relative py-8 md:py-12 bg-black">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8">
        {/* Solutions grid - monks style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
          {solutions.map((solution, index) => (
            <Link
              key={solution.number}
              to={solution.link}
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
                  src={solution.image}
                  alt={solution.title}
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
                    <span className="text-6xl md:text-7xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-500">
                      {solution.number}
                    </span>
                  </div>
                  
                  {/* Bottom - Info */}
                  <div>
                    <span className="text-white/50 text-xs tracking-wider uppercase">
                      {solution.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-2 group-hover:text-violet-300 transition-colors duration-300">
                      {solution.title}
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
                      {solution.description}
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
// SECTION 3: CONNECT CTA - monks.com style
// ============================================
const ConnectSection = () => {
  return (
    <section className="py-6 md:py-8 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-end">
        <Link 
          to="/contact"
          className="group inline-flex items-center gap-3 text-white hover:text-violet-300 transition-colors"
        >
          <span className="text-lg font-medium">Connect</span>
          <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-violet-400 flex items-center justify-center transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: INTERACTIVE TEXT - "What can we do for you?"
// ============================================
const InteractiveTextSection = () => {
  const words = ["What", "can", "we", "do", "for", "you", "?"];
  
  return (
    <section className="relative py-32 md:py-48 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <motion.div 
          className="flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="text-5xl md:text-7xl lg:text-[100px] font-black text-white/15 hover:text-white transition-colors duration-500 cursor-default tracking-tight"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Reach out link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-lg transition-colors group"
          >
            <span className="underline underline-offset-4">Reach out</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: CLIENT STORIES - monks.com text list style
// ============================================
const ClientStoriesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const projects = [
    { 
      title: "From Zero to Market Leader", 
      client: "MANTRA",
      image: mantraBg,
      slug: "mantra" 
    },
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
  ];

  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white">Client Stories</h2>
        </motion.div>
        
        {/* Project list - monks style */}
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
                {/* Thumbnail - shows on hover */}
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
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
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
// SECTION 6: AWARDS - monks.com style horizontal badges
// ============================================
const AwardsSection = () => {
  const awards = [
    { 
      logo: ".monks", 
      title: "Korea's #1 Web3 GTM Partner",
      subtitle: "Market Leader 2024"
    },
    { 
      logo: ".monks", 
      title: "30+ Successful Project Launches",
      subtitle: "Verified Track Record"
    },
    { 
      logo: ".monks", 
      title: "500M+ Total Impressions",
      subtitle: "Proven Impact"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-white mb-12 md:mb-16"
        >
          Awards
        </motion.h2>
        
        {/* Awards grid - monks style horizontal cards */}
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
              {/* Logo/Icon */}
              <div className="text-4xl md:text-5xl font-black text-white/20 mb-4">
                .ium
              </div>
              
              {/* Award title */}
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                {award.title}
              </h3>
              
              {/* Subtitle */}
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
// SECTION 7: INSIGHTS - monks.com style featured report
// ============================================
const InsightsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Featured report - large card */}
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
            {/* Background image */}
            <div className="relative aspect-[21/9] md:aspect-[3/1]">
              <img 
                src={mantraBg} 
                alt="Featured report"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
            
            {/* Content */}
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
// SECTION 8: MEET THE TEAM - monks.com style video section
// ============================================
const MeetSection = () => {
  const marqueeText = "meet the ium labs team ";
  
  return (
    <section className="py-16 md:py-24 bg-black overflow-hidden">
      {/* Marquee */}
      <div className="border-y border-white/10 py-4 mb-16">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-lg md:text-xl font-medium text-white/20 mx-4">
              {marqueeText}
            </span>
          ))}
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Video/Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900"
          >
            <video
              src="/videos/gtm-hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            
            {/* Duration */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white/50 text-xs">
              <span>00:00 / 00:32</span>
            </div>
          </motion.div>
          
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white/40 text-sm">Meet</span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">
              <span className="text-violet-400">Ium Labs</span> Team
            </h3>
            <p className="text-white/50 text-lg mt-6 leading-relaxed">
              서울을 기반으로 글로벌 Web3 프로젝트의 한국 시장 진출을 돕는 
              전문 마케팅 팀입니다. 데이터 기반 전략과 깊은 현지 이해로 
              당신의 성공을 설계합니다.
            </p>
            
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 mt-8 group"
            >
              <span>Connect with us</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 9: CTA - monks.com style "Let's unlock what's possible together"
// ============================================
const CTASection = () => {
  const ctaWords = ["Let's", "unlock", "what's", "possible", "together."];
  
  return (
    <section className="relative py-32 md:py-48 bg-black overflow-hidden">
      {/* Subtle gradient */}
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
          
          {/* Form intro */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-white/40 text-lg mb-8"
          >
            Hey 👋 Please fill out the following quick questions so our team can get in touch with you.
          </motion.p>
          
          {/* CTA Button */}
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-violet-400 transition-colors duration-300"
          >
            <span>Get in touch</span>
            <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
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
      
      {/* 1. HERO - Fullscreen with oversized typography */}
      <HeroSection />
      
      {/* 2. SOLUTIONS - 4 numbered cards grid */}
      <SolutionsSection />
      
      {/* 3. CONNECT CTA */}
      <ConnectSection />
      
      {/* 4. INTERACTIVE TEXT */}
      <InteractiveTextSection />
      
      {/* 5. CLIENT STORIES */}
      <ClientStoriesSection />
      
      {/* 6. AWARDS */}
      <AwardsSection />
      
      {/* 7. INSIGHTS */}
      <InsightsSection />
      
      {/* 8. MEET THE TEAM */}
      <MeetSection />
      
      {/* 9. CTA */}
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default GTMService;
