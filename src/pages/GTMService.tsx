import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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

// ============================================
// CONSTANTS
// ============================================
const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ============================================
// SECTION 1: HERO - 정체성 선언 (Identity & Promise)
// ============================================
const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const brandY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen bg-white flex flex-col justify-between overflow-hidden pt-20"
      style={{ opacity }}
    >
      {/* Main content */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: customEase }}
            >
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-8"
              >
                <span className="text-xs font-medium text-neutral-400 tracking-widest uppercase">
                  Marketing × Research
                </span>
              </motion.div>

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-[1.1]"
              >
                Data-Driven Growth<br />
                <span className="text-neutral-400">in Korea.</span>
              </motion.h1>
              
              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl md:text-2xl font-medium text-violet-600 mt-4"
              >
                Powered by Deep Research.
              </motion.p>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-neutral-500 text-base md:text-lg mt-8 max-w-lg leading-relaxed"
              >
                We are not just an agency. We are your strategic partner 
                for landing and scaling your business in Korea.
              </motion.p>
              
              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-10"
              >
                <Link 
                  to="/projects"
                  className="group inline-flex items-center gap-3 text-black hover:text-violet-600 transition-colors"
                >
                  <span className="text-lg font-medium">See How We Work</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Right - Featured image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: customEase }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={mantraBg}
                  alt="Featured project"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Bottom - Oversized brand text */}
      <motion.div 
        className="relative w-full overflow-hidden py-8 md:py-12"
        style={{ y: brandY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: customEase }}
          className="text-[20vw] md:text-[18vw] lg:text-[15vw] font-black text-black leading-none tracking-tighter text-center select-none"
        >
          IUM LABS
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// ============================================
// SECTION 2: CHALLENGE - 문제 제기 (Why Korea?)
// innocean 스타일 - 카드 없이 텍스트 블록 + 이미지
// ============================================
const ChallengeSection = () => {
  const opportunities = [
    "글로벌 거래량 Top 5",
    "트렌드 세터로서의 한국",
    "열정적인 커뮤니티 베이스",
    "높은 유동성과 참여율",
  ];

  const barriers = [
    "복잡한 VASP 규제",
    "폐쇄적인 언어 장벽",
    "까다로운 커뮤니티 문화",
    "빠르게 변하는 트렌드",
  ];

  return (
    <section className="py-24 md:py-40 bg-neutral-950 text-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Two column asymmetric layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Text content */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-white/40 tracking-widest uppercase"
            >
              The Challenge
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mt-4"
            >
              Why Korea?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 text-xl mt-4"
            >
              High Risk, High Return.
            </motion.p>
            
            {/* Opportunity section */}
            <div className="mt-16">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-lg font-medium text-emerald-400 mb-6"
              >
                The Opportunity
              </motion.h3>
              <ul>
                {opportunities.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="py-4 border-b border-white/10 text-white/70 text-lg hover:text-white transition-colors"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* Barrier section */}
            <div className="mt-12">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-lg font-medium text-red-400 mb-6"
              >
                The Barrier
              </motion.h3>
              <ul>
                {barriers.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="py-4 border-b border-white/10 text-white/70 text-lg hover:text-white transition-colors"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="sticky top-32">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={storyBg}
                  alt="Korea market"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-24 md:mt-32 pt-16 border-t border-white/10"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-4xl">
            그래서 당신에겐 단순한 번역가가 아닌,<br />
            <span className="text-violet-400">시장을 꿰뚫는 전문가</span>가 필요합니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: APPROACH - 해결책 (Our Approach)
// monks 스타일 - 수직 리스트 + 호버 이미지
// ============================================
const ApproachSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const approaches = [
    {
      number: "01",
      title: "Discovery",
      titleKr: "진단",
      tagline: "의사가 처방 전 진찰하듯",
      description: "리서치를 통해 시장과 타겟을 정밀 분석합니다.",
      image: storyBg,
      link: "/services/deep-research"
    },
    {
      number: "02",
      title: "Strategy",
      titleKr: "설계",
      tagline: "데이터 기반 로드맵",
      description: "분석된 데이터를 바탕으로 GTM 로드맵과 KPI를 설정합니다.",
      image: peaqBg,
      link: "/services/gtm"
    },
    {
      number: "03",
      title: "Execution",
      titleKr: "타격",
      tagline: "통합된 메시지, 통합된 임팩트",
      description: "PR, KOL, 커뮤니티를 하나의 메시지로 통합 타격합니다.",
      image: mantraBg,
      link: "/services/community"
    },
    {
      number: "04",
      title: "Scale",
      titleKr: "확장",
      tagline: "일회성 펌핑이 아닌",
      description: "지속 가능한 성장을 위한 최적화. 생태계를 구축합니다.",
      image: saharaAiBg,
      link: "/services/pr"
    }
  ];

  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-sm text-neutral-400 tracking-widest uppercase">Our Approach</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mt-4">
            우리는 운에 맡기지 않습니다.
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl mt-4">
            철저하게 설계된 4단계 공식을 따릅니다.
          </p>
        </motion.div>
        
        {/* Vertical list - no cards */}
        <div className="border-t border-neutral-200">
          {approaches.map((item, index) => (
            <Link
              key={item.number}
              to={item.link}
              className="group block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="py-8 md:py-10 border-b border-neutral-200 flex items-center gap-6 md:gap-12 hover:bg-neutral-50 transition-colors px-4 -mx-4"
              >
                {/* Number */}
                <span className="text-4xl md:text-6xl font-black text-neutral-200 group-hover:text-violet-600 transition-colors w-20 md:w-28 shrink-0">
                  {item.number}
                </span>
                
                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-xl md:text-3xl font-bold text-black group-hover:text-violet-600 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-neutral-400 text-sm">{item.titleKr}</span>
                  </div>
                  <p className="text-neutral-500 mt-1 text-sm md:text-base">{item.tagline}</p>
                  <p className="text-neutral-400 mt-2 text-sm hidden md:block">{item.description}</p>
                </div>
                
                {/* Hover image reveal */}
                <div className="hidden lg:block w-0 group-hover:w-48 overflow-hidden transition-all duration-500 shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-48 h-32 object-cover"
                  />
                </div>
                
                {/* Arrow */}
                <svg 
                  className="w-6 h-6 text-neutral-300 group-hover:text-violet-600 group-hover:translate-x-2 transition-all shrink-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: TRACK RECORD - 증명 (Proven Results)
// innocean 스타일 - 대형 숫자 타이포, 카드 없음
// ============================================
const TrackRecordSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const metrics = [
    { value: "500%+", label: "Community Growth" },
    { value: "30+", label: "Launches" },
    { value: "100M+", label: "Impressions" },
  ];

  return (
    <section ref={ref} className="py-24 md:py-40 bg-neutral-100">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-sm text-neutral-400 tracking-widest uppercase">Proven Track Record</span>
          <h2 className="text-4xl md:text-5xl font-black text-black mt-4">
            우리의 전략은 가설에 그치지 않습니다.
          </h2>
          <p className="text-neutral-500 text-lg mt-4">
            결과로 증명되었습니다.
          </p>
        </motion.div>
        
        {/* Metrics - Large typography, no cards */}
        <div className="flex flex-wrap gap-x-16 md:gap-x-24 lg:gap-x-32 gap-y-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-6xl md:text-8xl lg:text-9xl font-black text-black">
                {metric.value}
              </span>
              <p className="text-neutral-500 text-base md:text-lg mt-2">{metric.label}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Growth curve visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-32 pt-16 border-t border-neutral-300"
        >
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
            {/* Text */}
            <div className="md:w-1/3">
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                우리가 개입한 후
              </h3>
              <p className="text-neutral-500 text-lg mt-2">
                그래프가 이렇게 꺾였습니다
              </p>
            </div>
            
            {/* SVG Growth Curve */}
            <div className="flex-1 h-48 md:h-64 relative">
              <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="130" x2="400" y2="130" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
                
                {/* Intervention marker */}
                <line x1="150" y1="10" x2="150" y2="130" stroke="rgba(139,92,246,0.5)" strokeWidth="2" strokeDasharray="5,5"/>
                <text x="150" y="145" fill="rgba(139,92,246,0.8)" fontSize="10" textAnchor="middle">IUM 개입</text>
                
                {/* The curve line */}
                <motion.path
                  d="M0,120 Q75,115 150,100 Q200,60 250,40 Q300,25 350,20 Q375,18 400,15"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                
                {/* End point */}
                <motion.circle
                  cx="400"
                  cy="15"
                  r="6"
                  fill="#8B5CF6"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.3, delay: 2 }}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: WORK - 포트폴리오
// monks 스타일 - 텍스트 리스트 + 호버 이미지
// ============================================
const WorkSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const projects = [
    { 
      category: "L1 Infrastructure Strategy",
      client: "MANTRA",
      result: "커뮤니티 500% 성장",
      image: mantraBg,
      slug: "mantra" 
    },
    { 
      category: "IP & Creative Platform Launch",
      client: "Story Protocol",
      result: "Top 10 인지도 달성",
      image: storyBg,
      slug: "story-protocol" 
    },
    { 
      category: "DePIN Market Entry",
      client: "peaq",
      result: "국내 최초 DePIN 브랜딩",
      image: peaqBg,
      slug: "peaq" 
    },
    { 
      category: "AI × Blockchain Narrative",
      client: "Sahara AI",
      result: "한국 AI 커뮤니티 확보",
      image: saharaAiBg,
      slug: "sahara-ai" 
    },
  ];

  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24"
        >
          <div>
            <span className="text-sm text-neutral-400 tracking-widest uppercase">Work</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mt-4">
              Archetypes of Success
            </h2>
          </div>
          <Link 
            to="/projects"
            className="group inline-flex items-center gap-2 text-black hover:text-violet-600 transition-colors"
          >
            <span className="font-medium">View All Work</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
        
        {/* Project list - text-centric */}
        <div className="border-t border-neutral-200">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link 
                to={`/projects/${project.slug}`} 
                className="group block py-8 md:py-10 border-b border-neutral-200 hover:bg-neutral-50 transition-colors px-4 -mx-4"
              >
                <div className="flex items-center gap-6 md:gap-12">
                  {/* Client */}
                  <span className="text-neutral-400 text-sm w-24 md:w-32 shrink-0">{project.client}</span>
                  
                  {/* Category */}
                  <h3 className="flex-1 text-xl md:text-2xl lg:text-3xl font-bold text-black group-hover:text-violet-600 transition-colors">
                    {project.category}
                  </h3>
                  
                  {/* Result */}
                  <span className="hidden md:block text-neutral-500 text-sm">{project.result}</span>
                  
                  {/* Hover image */}
                  <div className="hidden lg:block w-0 group-hover:w-40 overflow-hidden transition-all duration-500 shrink-0">
                    <img 
                      src={project.image} 
                      alt={project.category}
                      className="w-40 h-24 object-cover"
                    />
                  </div>
                  
                  {/* Arrow */}
                  <svg 
                    className="w-5 h-5 text-neutral-300 group-hover:text-violet-600 group-hover:translate-x-2 transition-all shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: NETWORK - 글로벌 확장
// innocean 스타일 - 텍스트 중심, 카드 없음
// ============================================
const NetworkSection = () => {
  const locations = [
    { city: "Seoul", status: "Headquarters" },
    { city: "Tokyo", status: "Partner Network" },
    { city: "Singapore", status: "Partner Network" },
    { city: "New York", status: "Expanding" },
  ];

  return (
    <section className="py-24 md:py-40 bg-neutral-950 text-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Large text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm text-white/40 tracking-widest uppercase">Global Network</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4 leading-tight">
              Seoul is just<br />
              <span className="text-white/30">the beginning.</span>
            </h2>
            <p className="text-white/50 text-lg md:text-xl mt-8 max-w-lg">
              한국은 시작점일 뿐입니다. 우리는 당신을 전 세계 주요 크립토 허브와 연결합니다.
            </p>
          </motion.div>
          
          {/* Right - Location list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <ul className="border-t border-white/10">
              {locations.map((loc, index) => (
                <motion.li
                  key={loc.city}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="py-6 border-b border-white/10 flex items-center justify-between hover:bg-white/5 transition-colors px-4 -mx-4"
                >
                  <span className={`text-2xl md:text-3xl font-bold ${loc.city === "Seoul" ? "text-violet-400" : "text-white/80"}`}>
                    {loc.city}
                  </span>
                  <span className="text-white/40 text-sm">{loc.status}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: CTA - 최종 전환
// ============================================
const CTASection = () => {
  return (
    <section className="py-32 md:py-48 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Main CTA text */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-black leading-tight">
            Ready to<br />
            <span className="text-violet-600">Unlock Korea?</span>
          </h2>
          
          <p className="text-neutral-500 text-lg md:text-xl mt-10 max-w-xl mx-auto">
            가장 확실한 파트너와 시작하세요.
          </p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-black text-white font-bold text-lg hover:bg-violet-600 transition-colors duration-300"
            >
              <span>Start Your Journey</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
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
    "Data-Driven Korea GTM Strategy | Ium Labs",
    "Data-Driven Growth in Korea. Powered by Deep Research. Your strategic partner for landing and scaling your business in Korea.",
    "/services/gtm"
  );

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <ServiceSchema 
        name="GTM Strategy - Korea Market Entry"
        description="Data-Driven Growth in Korea. Powered by Deep Research."
        provider="Ium Labs"
        areaServed="Korea"
        url="https://iumlabs.io/services/gtm"
      />
      
      <Navbar />
      
      {/* 1. HERO - 정체성 선언 */}
      <HeroSection />
      
      {/* 2. CHALLENGE - 문제 제기 (Why Korea?) */}
      <ChallengeSection />
      
      {/* 3. APPROACH - 해결책 (4단계 공식) */}
      <ApproachSection />
      
      {/* 4. TRACK RECORD - 증명 (Metrics First) */}
      <TrackRecordSection />
      
      {/* 5. WORK - 포트폴리오 (Category 중심) */}
      <WorkSection />
      
      {/* 6. NETWORK - 글로벌 확장 */}
      <NetworkSection />
      
      {/* 7. CTA - 최종 전환 */}
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default GTMService;
