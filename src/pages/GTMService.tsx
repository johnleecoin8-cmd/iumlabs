import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';
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
// ANIMATION VARIANTS
// ============================================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8 } }
};

// ============================================
// SECTION 1: HERO
// ============================================
const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  return (
    <motion.section 
      ref={sectionRef}
      className="relative h-screen bg-white flex items-center overflow-hidden"
      style={{ opacity }}
    >
      <motion.div 
        className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16"
        style={{ y, scale }}
      >
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] text-neutral-400 tracking-[0.3em] uppercase"
            >
              Marketing × Research
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[clamp(2.5rem,6vw,5rem)] font-black text-black leading-[1.05] mt-4"
            >
              Data-Driven<br />
              Growth in Korea.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-violet-600 font-medium mt-4"
            >
              Powered by Deep Research.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-neutral-500 text-sm mt-6 max-w-md leading-relaxed"
            >
              We are your strategic partner for landing and scaling your business in Korea.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <Link 
                to="/projects"
                className="group inline-flex items-center gap-2 text-sm text-black hover:text-violet-600 transition-colors"
              >
                <span className="font-medium">See How We Work</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
          
          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img src={mantraBg} alt="Featured" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Bottom brand */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 overflow-hidden pb-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="text-[12vw] font-black text-black/5 leading-none tracking-tighter text-center select-none whitespace-nowrap">
          IUM LABS
        </div>
      </motion.div>
    </motion.section>
  );
};

// ============================================
// SECTION 2: CHALLENGE
// ============================================
const ChallengeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const opportunities = ["글로벌 거래량 Top 5", "트렌드 세터", "열정적인 커뮤니티", "높은 참여율"];
  const barriers = ["VASP 규제", "언어 장벽", "폐쇄적 문화", "빠른 트렌드 변화"];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-neutral-950 text-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-5">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-[10px] text-white/40 tracking-[0.3em] uppercase"
            >
              The Challenge
            </motion.span>
            
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={1}
              className="text-4xl md:text-5xl font-black mt-3"
            >
              Why Korea?
            </motion.h2>
            
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={2}
              className="text-white/40 text-sm mt-2"
            >
              High Risk, High Return.
            </motion.p>
            
            {/* Sticky image */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={3}
              className="mt-10 hidden lg:block"
            >
              <div className="aspect-square overflow-hidden">
                <img src={storyBg} alt="Korea" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            </motion.div>
          </div>
          
          {/* Right - Lists */}
          <div className="lg:col-span-7">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12">
              {/* Opportunity */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <span className="text-xs text-emerald-400 tracking-widest uppercase">Opportunity</span>
                <motion.div variants={lineReveal} className="h-px bg-white/20 mt-3 mb-4" />
                {opportunities.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="py-3 text-white/70 text-sm border-b border-white/10 hover:text-white hover:pl-2 transition-all"
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Barrier */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <span className="text-xs text-red-400 tracking-widest uppercase">Barrier</span>
                <motion.div variants={lineReveal} className="h-px bg-white/20 mt-3 mb-4" />
                {barriers.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="py-3 text-white/70 text-sm border-b border-white/10 hover:text-white hover:pl-2 transition-all"
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Conclusion */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={6}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <p className="text-lg md:text-xl font-medium text-white leading-relaxed">
                그래서 당신에겐 <span className="text-violet-400">시장을 꿰뚫는 전문가</span>가 필요합니다.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: APPROACH
// ============================================
const ApproachSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState<number | null>(null);
  
  const approaches = [
    { num: "01", title: "Discovery", sub: "진단", desc: "시장과 타겟을 정밀 분석", image: storyBg, link: "/services/deep-research" },
    { num: "02", title: "Strategy", sub: "설계", desc: "GTM 로드맵과 KPI 설정", image: peaqBg, link: "/services/gtm" },
    { num: "03", title: "Execution", sub: "타격", desc: "통합 메시지로 임팩트 극대화", image: mantraBg, link: "/services/community" },
    { num: "04", title: "Scale", sub: "확장", desc: "지속 가능한 생태계 구축", image: saharaAiBg, link: "/services/pr" },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <span className="text-[10px] text-neutral-400 tracking-[0.3em] uppercase">Our Approach</span>
          <h2 className="text-3xl md:text-4xl font-black text-black mt-3">
            운에 맡기지 않습니다.
          </h2>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {approaches.map((item, index) => (
            <motion.div key={item.num} variants={fadeUp}>
              <Link
                to={item.link}
                className="group flex items-center gap-4 md:gap-8 py-5 border-b border-neutral-200 hover:bg-neutral-50 transition-colors -mx-4 px-4"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="text-3xl md:text-4xl font-black text-neutral-200 group-hover:text-violet-600 transition-colors w-16 md:w-20">
                  {item.num}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-lg md:text-xl font-bold text-black group-hover:text-violet-600 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-neutral-400 text-xs">{item.sub}</span>
                  </div>
                  <p className="text-neutral-500 text-xs mt-1">{item.desc}</p>
                </div>
                <div className={`hidden md:block overflow-hidden transition-all duration-400 ${hovered === index ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>
                  <img src={item.image} alt={item.title} className="w-32 h-20 object-cover" />
                </div>
                <svg className="w-4 h-4 text-neutral-300 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: TRACK RECORD
// ============================================
const TrackRecordSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const curveProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  
  const metrics = [
    { value: "500%", label: "Growth" },
    { value: "30+", label: "Launches" },
    { value: "100M", label: "Impressions" },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-neutral-100">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-[10px] text-neutral-400 tracking-[0.3em] uppercase"
        >
          Track Record
        </motion.span>
        
        {/* Metrics */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap gap-x-12 md:gap-x-20 gap-y-6 mt-8"
        >
          {metrics.map((m) => (
            <motion.div key={m.label} variants={fadeUp}>
              <span className="text-5xl md:text-7xl font-black text-black">{m.value}</span>
              <p className="text-neutral-500 text-xs mt-1">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Curve */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={4}
          className="mt-16 pt-12 border-t border-neutral-300"
        >
          <div className="flex items-end gap-8 md:gap-16">
            <div className="w-1/4">
              <p className="text-sm font-medium text-black">우리가 개입한 후</p>
              <p className="text-xs text-neutral-500 mt-1">성장 곡선이 바뀝니다</p>
            </div>
            <div className="flex-1 h-32 md:h-40">
              <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
                <line x1="120" y1="5" x2="120" y2="90" stroke="rgba(139,92,246,0.3)" strokeWidth="1" strokeDasharray="4,4"/>
                <text x="120" y="98" fill="rgba(139,92,246,0.6)" fontSize="8" textAnchor="middle">IUM</text>
                <motion.path
                  d="M0,85 Q60,82 120,70 Q180,40 240,25 Q320,12 400,8"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ pathLength: curveProgress }}
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
// SECTION 5: WORK
// ============================================
const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState<number | null>(null);
  
  const projects = [
    { cat: "L1 Infrastructure", client: "MANTRA", result: "500% 성장", image: mantraBg, slug: "mantra" },
    { cat: "IP Platform Launch", client: "Story Protocol", result: "Top 10", image: storyBg, slug: "story-protocol" },
    { cat: "DePIN Entry", client: "peaq", result: "최초 브랜딩", image: peaqBg, slug: "peaq" },
    { cat: "AI × Blockchain", client: "Sahara AI", result: "커뮤니티 확보", image: saharaAiBg, slug: "sahara-ai" },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-end justify-between mb-12">
          <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <span className="text-[10px] text-neutral-400 tracking-[0.3em] uppercase">Work</span>
            <h2 className="text-3xl md:text-4xl font-black text-black mt-3">Selected Projects</h2>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={1}>
            <Link to="/projects" className="text-xs text-neutral-500 hover:text-violet-600 transition-colors">
              View All →
            </Link>
          </motion.div>
        </div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((p, i) => (
            <motion.div key={p.slug} variants={fadeUp}>
              <Link
                to={`/projects/${p.slug}`}
                className="group flex items-center gap-4 md:gap-8 py-4 border-b border-neutral-200 hover:bg-neutral-50 transition-colors -mx-4 px-4"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="text-neutral-400 text-xs w-20 md:w-28">{p.client}</span>
                <h3 className="flex-1 text-base md:text-lg font-bold text-black group-hover:text-violet-600 transition-colors">
                  {p.cat}
                </h3>
                <span className="hidden md:block text-neutral-400 text-xs">{p.result}</span>
                <div className={`hidden lg:block overflow-hidden transition-all duration-400 ${hovered === i ? 'w-28 opacity-100' : 'w-0 opacity-0'}`}>
                  <img src={p.image} alt={p.cat} className="w-28 h-16 object-cover" />
                </div>
                <svg className="w-4 h-4 text-neutral-300 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: NETWORK
// ============================================
const NetworkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const locations = [
    { city: "Seoul", status: "HQ" },
    { city: "Tokyo", status: "Partner" },
    { city: "Singapore", status: "Partner" },
    { city: "New York", status: "Expanding" },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-neutral-950 text-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase">Network</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mt-3 leading-tight">
              Seoul is just<br /><span className="text-white/30">the beginning.</span>
            </h2>
            <p className="text-white/50 text-sm mt-6 max-w-sm">
              전 세계 주요 크립토 허브와 연결합니다.
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col justify-center"
          >
            {locations.map((loc) => (
              <motion.div
                key={loc.city}
                variants={fadeUp}
                className="flex items-center justify-between py-4 border-b border-white/10 hover:bg-white/5 transition-colors -mx-4 px-4"
              >
                <span className={`text-lg md:text-xl font-bold ${loc.city === "Seoul" ? "text-violet-400" : "text-white/70"}`}>
                  {loc.city}
                </span>
                <span className="text-white/40 text-xs">{loc.status}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: CTA
// ============================================
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-black"
        >
          Ready to<br /><span className="text-violet-600">Unlock Korea?</span>
        </motion.h2>
        
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
          className="text-neutral-500 text-sm mt-6"
        >
          가장 확실한 파트너와 시작하세요.
        </motion.p>
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2}
          className="mt-8"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-sm font-medium hover:bg-violet-600 transition-colors"
          >
            <span>Start Your Journey</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
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
    "Data-Driven Growth in Korea. Powered by Deep Research.",
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
      <HeroSection />
      <ChallengeSection />
      <ApproachSection />
      <TrackRecordSection />
      <WorkSection />
      <NetworkSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default GTMService;
