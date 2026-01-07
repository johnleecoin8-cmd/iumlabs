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
// SECTION 1: HERO - innocean style white background + oversized typography
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

  // Featured projects for floating card
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
      {/* Main content - innocean asymmetric layout */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: customEase }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-neutral-500 text-lg md:text-xl mb-6"
              >
                새로운 경험을 설계하고
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight"
              >
                브랜드의 가능성을<br />
                바꿉니다.
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-neutral-400 text-base md:text-lg mt-8 max-w-md"
              >
                Your Strategic Gateway to the Korean Web3 Market.
                Launch in Korea with precision, Scale Globally with confidence.
              </motion.p>
              
              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-10"
              >
                <Link 
                  to="/contact"
                  className="group inline-flex items-center gap-3 text-black hover:text-violet-600 transition-colors"
                >
                  <span className="text-lg font-medium">View Our All Work</span>
                  <div className="w-10 h-10 rounded-full border border-black/20 group-hover:border-violet-600 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Right - Floating project card (innocean style) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: customEase }}
              className="relative"
            >
              <div className="relative">
                {/* Main featured image */}
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
                  
                  {/* Project info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-white/60 text-sm">{featuredProjects[hoveredProject ?? 0].title}</span>
                    <h3 className="text-white text-xl font-bold mt-1">
                      {featuredProjects[hoveredProject ?? 0].subtitle}
                    </h3>
                  </div>
                </motion.div>
                
                {/* Project selector dots */}
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
      
      {/* Bottom - Oversized brand text (innocean signature) */}
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
// SECTION 2: EXPERTISE - innocean clean grid style
// ============================================
const ExpertiseSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const expertises = [
    {
      number: "01",
      title: "Discovery & Research",
      titleKr: "심층 분석",
      description: "표면적인 번역이 아닌, 한국 유저의 심층 심리를 분석합니다.",
      image: storyBg,
      link: "/services/deep-research"
    },
    {
      number: "02",
      title: "GTM Strategy",
      titleKr: "진출 전략",
      description: "한국의 규제와 트렌드에 맞춘 '커스텀 GTM'을 설계합니다.",
      image: peaqBg,
      link: "/services/gtm"
    },
    {
      number: "03",
      title: "Execution & Growth",
      titleKr: "실행 및 성장",
      description: "흩어진 채널이 아닌, 통합된 목소리로 임팩트를 만듭니다.",
      image: mantraBg,
      link: "/services/community"
    },
    {
      number: "04",
      title: "Scale & Ecosystem",
      titleKr: "확장 및 생태계",
      description: "단순 진입을 넘어, 지속 가능한 생태계를 구축합니다.",
      image: saharaAiBg,
      link: "/services/pr"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header - innocean minimal style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-neutral-400 text-sm tracking-wider uppercase">Expertise</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mt-4">
            우리는 감으로 일하지 않습니다.
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl mt-6 max-w-2xl">
            철저한 데이터와 검증된 4단계 프레임워크로 움직입니다.
          </p>
        </motion.div>
        
        {/* Expertise grid - clean cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {expertises.map((item, index) => (
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
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  
                  {/* Number overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="text-white/80 text-sm font-medium">{item.number}</span>
                  </div>
                </div>
                
                {/* Text content */}
                <div>
                  <span className="text-neutral-400 text-sm">{item.titleKr}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-black group-hover:text-violet-600 transition-colors mt-1">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm mt-3 line-clamp-2">
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
// SECTION 3: WORK - innocean project showcase style
// ============================================
const WorkSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const projects = [
    { 
      title: "From Zero to Market Leader", 
      client: "MANTRA",
      category: "GTM Strategy",
      image: mantraBg,
      slug: "mantra" 
    },
    { 
      title: "Korea Launch Campaign", 
      client: "Story Protocol",
      category: "Brand Launch",
      image: storyBg,
      slug: "story-protocol" 
    },
    { 
      title: "DePIN Infrastructure GTM", 
      client: "peaq",
      category: "Market Entry",
      image: peaqBg,
      slug: "peaq" 
    },
    { 
      title: "AI + Blockchain Campaign", 
      client: "Sahara AI",
      category: "Community Growth",
      image: saharaAiBg,
      slug: "sahara-ai" 
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-neutral-50">
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
            <span className="text-neutral-400 text-sm tracking-wider uppercase">Work</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mt-4">
              Client Stories
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
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                </div>
                
                {/* Text */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-neutral-400 text-sm">{project.client}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-black group-hover:text-violet-600 transition-colors mt-1">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-neutral-400 text-sm flex-shrink-0">{project.category}</span>
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
// SECTION 4: VALUES - innocean full-width statement
// ============================================
const ValuesSection = () => {
  return (
    <section className="py-32 md:py-48 bg-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <span className="text-neutral-400 text-sm tracking-wider uppercase">Values</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mt-8 leading-tight max-w-5xl mx-auto">
            <span className="text-neutral-300">Seoul is just the beginning.</span>
            <br />
            당신과 세계를 잇습니다.
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl mt-10 max-w-2xl mx-auto">
            우리의 본진은 서울이지만, 시야는 세계를 향해 있습니다.
            서울에서의 성공을 발판 삼아 도쿄, 싱가포르, 뉴욕으로 연결합니다.
          </p>
        </motion.div>
      </div>
      
      {/* Stats marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-24 md:mt-32 border-y border-neutral-200 py-8"
      >
        <div className="flex items-center justify-center gap-12 md:gap-24 flex-wrap px-6">
          {[
            { value: "30+", label: "Projects" },
            { value: "500M+", label: "Impressions" },
            { value: "95%", label: "Success Rate" },
            { value: "#1", label: "Korea GTM Partner" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-black">{stat.value}</div>
              <div className="text-neutral-400 text-sm mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// SECTION 5: ABOUT - innocean team intro style
// ============================================
const AboutSection = () => {
  return (
    <section className="py-24 md:py-32 bg-black text-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image/Video */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <video
                src="/videos/gtm-hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </motion.div>
          
          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white/40 text-sm tracking-wider uppercase">About</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
              Meet <span className="text-violet-400">Ium Labs</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl mt-8 leading-relaxed">
              서울을 기반으로 글로벌 Web3 프로젝트의 한국 시장 진출을 돕는 
              전문 마케팅 팀입니다. 데이터 기반 전략과 깊은 현지 이해로 
              당신의 성공을 설계합니다.
            </p>
            <p className="text-white/40 text-base mt-6">
              이음(ium)은 이름 그대로 당신과 세계를 잇습니다.
            </p>
            
            <Link 
              to="/contact"
              className="inline-flex items-center gap-3 mt-10 text-white hover:text-violet-400 transition-colors group"
            >
              <span className="text-lg font-medium">Connect with us</span>
              <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-violet-400 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: CTA - innocean minimal contact style
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
            <span className="text-neutral-300">Unlock Korea?</span>
          </h2>
          
          <p className="text-neutral-500 text-lg md:text-xl mt-10 max-w-xl mx-auto">
            한국 시장 진출은 옵션이 아닌 필수입니다.
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
              <span>Get in touch</span>
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
    "Korean Web3 GTM Strategy | Ium Labs",
    "Your Strategic Gateway to the Korean Web3 Market. Launch in Korea with precision, Scale Globally with confidence.",
    "/services/gtm"
  );

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <ServiceSchema 
        name="GTM Strategy - Korea Market Entry"
        description="한국 시장 진출을 위한 전문 GTM 전략 서비스"
        provider="Ium Labs"
        areaServed="Korea"
        url="https://iumlabs.io/services/gtm"
      />
      
      <Navbar />
      
      {/* 1. HERO - White bg + oversized typography + floating project card */}
      <HeroSection />
      
      {/* 2. EXPERTISE - Clean 4-card grid */}
      <ExpertiseSection />
      
      {/* 3. WORK - Project showcase */}
      <WorkSection />
      
      {/* 4. VALUES - Full-width statement + stats */}
      <ValuesSection />
      
      {/* 5. ABOUT - Team intro */}
      <AboutSection />
      
      {/* 6. CTA - Minimal contact */}
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default GTMService;
