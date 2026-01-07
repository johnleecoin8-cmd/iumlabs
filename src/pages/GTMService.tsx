import { useRef, useState, useEffect } from 'react';
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
// "Data-Driven Growth in Korea. Powered by Deep Research."
// ============================================
const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const brandY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  const featuredProjects = [
    { title: "MANTRA", subtitle: "From Zero to Market Leader", image: mantraBg },
    { title: "Story Protocol", subtitle: "Korea Launch Campaign", image: storyBg },
    { title: "peaq", subtitle: "DePIN Infrastructure GTM", image: peaqBg },
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen bg-white flex flex-col justify-between overflow-hidden pt-20"
      style={{ opacity }}
    >
      {/* Main content */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: customEase }}
            >
              {/* Badge - Marketing + Research */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full mb-8"
              >
                <span className="text-xs font-medium text-neutral-600">Marketing</span>
                <span className="w-1 h-1 bg-violet-500 rounded-full" />
                <span className="text-xs font-medium text-neutral-600">Research</span>
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
                  <div className="w-10 h-10 rounded-full border border-black/20 group-hover:border-violet-600 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Right - Floating project card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: customEase }}
              className="relative"
            >
              <div className="relative">
                <motion.div 
                  className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src={featuredProjects[hoveredProject ?? 0].image}
                    alt="Featured project"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-white/60 text-sm">{featuredProjects[hoveredProject ?? 0].title}</span>
                    <h3 className="text-white text-xl font-bold mt-1">
                      {featuredProjects[hoveredProject ?? 0].subtitle}
                    </h3>
                  </div>
                </motion.div>
                
                <div className="flex gap-2 mt-4 justify-center">
                  {featuredProjects.map((_, index) => (
                    <button
                      key={index}
                      onMouseEnter={() => setHoveredProject(index)}
                      onClick={() => setHoveredProject(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        (hoveredProject ?? 0) === index ? 'bg-black' : 'bg-neutral-300'
                      }`}
                    />
                  ))}
                </div>
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
// High Risk, High Return
// ============================================
const ChallengeSection = () => {
  const opportunities = [
    { icon: "📈", text: "글로벌 거래량 Top 5" },
    { icon: "🔥", text: "트렌드 세터로서의 한국" },
    { icon: "👥", text: "열정적인 커뮤니티 베이스" },
    { icon: "💰", text: "높은 유동성과 참여율" },
  ];

  const barriers = [
    { icon: "📋", text: "복잡한 VASP 규제" },
    { icon: "🌐", text: "폐쇄적인 언어 장벽" },
    { icon: "🔒", text: "까다로운 커뮤니티 문화" },
    { icon: "⚠️", text: "빠르게 변하는 트렌드" },
  ];

  return (
    <section className="py-24 md:py-32 bg-neutral-950 text-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-violet-400 text-sm tracking-wider uppercase font-medium">The Challenge</span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mt-4">
            Why Korea?
          </h2>
          <p className="text-white/50 text-xl md:text-2xl mt-4 font-medium">
            High Risk, High Return.
          </p>
        </motion.div>
        
        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          {/* The Carrot - Opportunity */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-2xl">🥕</span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-emerald-400">The Carrot</h3>
                  <p className="text-white/50 text-sm">Massive Opportunity</p>
                </div>
              </div>
              
              <ul className="space-y-4">
                {opportunities.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-white/80 text-lg">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* The Stick - Barrier */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-2xl">🚧</span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-red-400">The Stick</h3>
                  <p className="text-white/50 text-sm">Formidable Barriers</p>
                </div>
              </div>
              
              <ul className="space-y-4">
                {barriers.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-white/80 text-lg">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 md:mt-24 text-center"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-4xl mx-auto">
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
// 철저하게 설계된 4단계 공식
// ============================================
const ApproachSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const approaches = [
    {
      number: "01",
      title: "Discovery",
      titleKr: "진단",
      tagline: "의사가 처방 전 진찰하듯",
      description: "리서치를 통해 시장과 타겟을 정밀 분석합니다. 표면적인 번역이 아닌, 한국 유저의 심층 심리를 해부합니다.",
      highlight: "Deep Research First",
      image: storyBg,
      link: "/services/deep-research"
    },
    {
      number: "02",
      title: "Strategy",
      titleKr: "설계",
      tagline: "데이터 기반 로드맵",
      description: "분석된 데이터를 바탕으로 GTM 로드맵과 KPI를 설정합니다. 한국의 규제와 트렌드에 맞춘 커스텀 전략.",
      highlight: "Custom GTM Blueprint",
      image: peaqBg,
      link: "/services/gtm"
    },
    {
      number: "03",
      title: "Execution",
      titleKr: "타격",
      tagline: "통합된 메시지, 통합된 임팩트",
      description: "PR, KOL, 커뮤니티를 따로국밥으로 하지 않고, 하나의 메시지로 통합 타격합니다.",
      highlight: "Unified Voice",
      image: mantraBg,
      link: "/services/community"
    },
    {
      number: "04",
      title: "Scale",
      titleKr: "확장",
      tagline: "일회성 펌핑이 아닌",
      description: "지속 가능한 성장을 위한 최적화. 단순 진입을 넘어 생태계를 구축합니다.",
      highlight: "Sustainable Growth",
      image: saharaAiBg,
      link: "/services/pr"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-violet-600 text-sm tracking-wider uppercase font-medium">Our Approach</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mt-4">
            우리는 운에 맡기지 않습니다.
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl mt-6 max-w-2xl">
            철저하게 설계된 4단계 공식을 따릅니다.
          </p>
        </motion.div>
        
        {/* Approach grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {approaches.map((item, index) => (
            <Link
              key={item.number}
              to={item.link}
              className="group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* Highlight badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-violet-600 text-white text-xs font-medium rounded-full">
                    {item.highlight}
                  </span>
                </div>
                
                {/* Image container */}
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden mb-6 bg-neutral-100">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  
                  {/* Number overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="text-white text-4xl font-black opacity-50">{item.number}</span>
                  </div>
                </div>
                
                {/* Text content */}
                <div>
                  {/* Tagline */}
                  <p className="text-violet-600 text-sm italic mb-2">{item.tagline}</p>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-neutral-400 text-sm">{item.titleKr}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-black group-hover:text-violet-600 transition-colors mt-1">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>
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
// SECTION 4: TRACK RECORD - 증명 (Proven Results)
// Metrics First + 상승 곡선 시각화
// ============================================
const TrackRecordSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const metrics = [
    { value: "500%+", label: "Average Community Growth" },
    { value: "30+", label: "Successful Launches" },
    { value: "100M+", label: "Media Impressions" },
    { value: "Top 5", label: "Korea Mindshare Ranking" },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-neutral-950 text-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-violet-400 text-sm tracking-wider uppercase font-medium">Proven Track Record</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4">
            우리의 전략은 가설에 그치지 않습니다.
          </h2>
          <p className="text-white/50 text-xl mt-4">
            결과로 증명되었습니다.
          </p>
        </motion.div>
        
        {/* Metrics First - Big numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-violet-400">{metric.value}</div>
              <div className="text-white/50 text-sm md:text-base mt-3">{metric.label}</div>
            </motion.div>
          ))}
        </div>
        
        {/* Growth curve visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Text */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                우리가 개입한 후
              </h3>
              <p className="text-white/50 text-lg mt-2">
                그래프가 이렇게 꺾였습니다
              </p>
            </div>
            
            {/* SVG Growth Curve */}
            <div className="flex-1 h-40 md:h-48 relative">
              <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="130" x2="400" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                <line x1="0" y1="70" x2="400" y2="70" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                
                {/* Intervention marker */}
                <line x1="150" y1="10" x2="150" y2="130" stroke="rgba(139,92,246,0.5)" strokeWidth="2" strokeDasharray="5,5"/>
                <text x="150" y="145" fill="rgba(139,92,246,0.8)" fontSize="10" textAnchor="middle">IUM 개입</text>
                
                {/* Gradient fill */}
                <defs>
                  <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(139,92,246,0.3)"/>
                    <stop offset="100%" stopColor="rgba(139,92,246,0)"/>
                  </linearGradient>
                </defs>
                
                {/* Area under curve */}
                <motion.path
                  d="M0,130 L0,120 Q75,115 150,100 Q200,60 250,40 Q300,25 350,20 Q375,18 400,15 L400,130 Z"
                  fill="url(#curveGradient)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                
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
// SECTION 5: WORK - 포트폴리오 (Archetypes of Success)
// Category 중심 프로젝트 쇼케이스
// ============================================
const WorkSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const projects = [
    { 
      category: "L1 Infrastructure Strategy",
      categoryKr: "레이어1 인프라 전략",
      client: "MANTRA",
      result: "한국 커뮤니티 500% 성장",
      image: mantraBg,
      slug: "mantra" 
    },
    { 
      category: "IP & Creative Platform Launch",
      categoryKr: "IP/크리에이티브 플랫폼 론칭",
      client: "Story Protocol",
      result: "업계 Top 10 인지도 달성",
      image: storyBg,
      slug: "story-protocol" 
    },
    { 
      category: "DePIN Market Entry",
      categoryKr: "디핀 시장 진입",
      client: "peaq",
      result: "국내 최초 DePIN 브랜딩",
      image: peaqBg,
      slug: "peaq" 
    },
    { 
      category: "AI × Blockchain Narrative",
      categoryKr: "AI x 블록체인 내러티브",
      client: "Sahara AI",
      result: "한국 AI 커뮤니티 확보",
      image: saharaAiBg,
      slug: "sahara-ai" 
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24"
        >
          <div>
            <span className="text-violet-600 text-sm tracking-wider uppercase font-medium">Work</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mt-4">
              Archetypes of Success
            </h2>
            <p className="text-neutral-500 text-lg mt-4 max-w-xl">
              어떤 섹터든 우리는 그에 맞는 '맞춤형 전략'을 가지고 있습니다.
            </p>
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
        
        {/* Projects grid - 2x2 */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to={`/projects/${project.slug}`} className="group block">
                {/* Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6">
                  <motion.img
                    src={project.image}
                    alt={project.category}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  
                  {/* Result badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-white/90 text-black text-xs font-medium rounded-full">
                      {project.result}
                    </span>
                  </div>
                </div>
                
                {/* Text */}
                <div>
                  <span className="text-neutral-400 text-sm">{project.client}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-black group-hover:text-violet-600 transition-colors mt-1">
                    {project.category}
                  </h3>
                  <p className="text-neutral-500 text-sm mt-2">{project.categoryKr}</p>
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
// SECTION 6: NETWORK - 글로벌 확장 (Global Network)
// 서울 중심 연결 시각화
// ============================================
const NetworkSection = () => {
  const locations = [
    { city: "Seoul", status: "Headquarters", active: true, position: { x: 50, y: 40 } },
    { city: "Tokyo", status: "Partner Network", active: true, position: { x: 70, y: 35 } },
    { city: "Singapore", status: "Partner Network", active: true, position: { x: 55, y: 65 } },
    { city: "New York", status: "Expanding", active: false, position: { x: 20, y: 30 } },
  ];

  return (
    <section className="py-24 md:py-32 bg-neutral-950 text-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-violet-400 text-sm tracking-wider uppercase font-medium">Global Network</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mt-4">
            <span className="text-white/30">Seoul is just the beginning.</span>
          </h2>
          <p className="text-white/50 text-xl md:text-2xl mt-6 max-w-2xl mx-auto">
            한국은 시작점일 뿐입니다.<br />
            우리는 당신을 전 세계 주요 크립토 허브와 연결합니다.
          </p>
        </motion.div>
        
        {/* Network visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl bg-gradient-to-br from-violet-500/5 to-transparent border border-white/10 overflow-hidden"
        >
          {/* Abstract network lines from Seoul */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Connection lines from Seoul */}
            {locations.filter(l => l.city !== "Seoul").map((loc, index) => (
              <motion.line
                key={loc.city}
                x1="50" y1="40"
                x2={loc.position.x} y2={loc.position.y}
                stroke={loc.active ? "rgba(139,92,246,0.4)" : "rgba(139,92,246,0.2)"}
                strokeWidth="0.3"
                strokeDasharray={loc.active ? "0" : "1,1"}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: index * 0.3 }}
              />
            ))}
          </svg>
          
          {/* Location dots */}
          {locations.map((loc, index) => (
            <motion.div
              key={loc.city}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${loc.position.x}%`, top: `${loc.position.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Pulse effect for Seoul */}
              {loc.city === "Seoul" && (
                <div className="absolute inset-0 w-16 h-16 -m-6">
                  <div className="absolute inset-0 bg-violet-500/20 rounded-full animate-ping" />
                </div>
              )}
              
              {/* Dot */}
              <div className={`relative w-4 h-4 rounded-full ${
                loc.city === "Seoul" 
                  ? 'bg-violet-500' 
                  : loc.active 
                    ? 'bg-white/60' 
                    : 'bg-white/30'
              }`}>
                {loc.active && loc.city !== "Seoul" && (
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse" />
                )}
              </div>
              
              {/* Label */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                <p className={`font-bold ${loc.city === "Seoul" ? 'text-violet-400' : 'text-white/80'}`}>
                  {loc.city}
                </p>
                <p className="text-white/40 text-xs">{loc.status}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: CTA - 최종 전환 (Ready to Unlock Korea?)
// ============================================
const CTASection = () => {
  return (
    <section className="py-32 md:py-48 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
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
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-black text-white font-bold text-lg rounded-full hover:bg-violet-600 transition-colors duration-300"
            >
              <span>Start Your Journey</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
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
