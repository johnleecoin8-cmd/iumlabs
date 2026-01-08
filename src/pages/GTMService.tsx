import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Globe, Database, Users, ChevronRight, MessageCircle, TrendingUp, Megaphone, Calendar, Search, Check, X, Zap, Shield, BarChart3, Target } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ============================================
// IMAGE IMPORTS
// ============================================
import storyBg from '@/assets/projects/story-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import mantraBg from '@/assets/projects/mantra-featured-bg.jpg';
import openledgerHero from '@/assets/campaigns/openledger-hero-official.png';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';

import seoulMetroBillboard from '@/assets/campaigns/seoul-metro-billboard.jpeg';
import storyOriginSummit from '@/assets/campaigns/story-origin-summit.jpg';
import ondoSeminar from '@/assets/campaigns/ondo-seminar.jpg';
import mantraParty from '@/assets/campaigns/mantra-party.jpg';
import peaqSummit from '@/assets/campaigns/peaq-summit.jpg';
import bnbEvent from '@/assets/campaigns/bnb-event.jpg';
import openledgerEvent from '@/assets/campaigns/openledger-event.jpg';
import kucoinCampaign from '@/assets/campaigns/kucoin-campaign.jpg';

import discoveryResearch from '@/assets/process/discovery-research.jpg';
import strategyPlanning from '@/assets/process/strategy-planning.jpg';
import executionGrowth from '@/assets/process/execution-growth.jpg';
import scaleSuccess from '@/assets/process/scale-success.jpg';

import communityGrowth from '@/assets/services/community-growth.jpg';
import prMedia from '@/assets/services/pr-media.jpg';
import kolNetwork from '@/assets/services/kol-network.jpg';
import seoAds from '@/assets/services/seo-ads.jpg';
import events from '@/assets/services/events.jpg';

import dashboardMockup from '@/assets/dashboard-mockup.png';
import officeImage from '@/assets/office/ium-labs-office.webp';

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
// FLOATING SERVICE TAGS (Korean Style)
// ============================================
const FloatingServiceTags = () => {
  const tags = [
    { label: "커뮤니티", top: "20%", left: "8%" },
    { label: "인플루언서", top: "25%", right: "10%" },
    { label: "PR", bottom: "35%", left: "5%" },
    { label: "오프라인", bottom: "30%", right: "8%" },
    { label: "리서치", top: "45%", left: "12%" },
    { label: "광고", top: "40%", right: "15%" },
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
// SECTION 1: HERO (Korean Storytelling Style)
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
          className="w-full h-full object-cover opacity-40"
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
          Korea Go-To-Market
        </motion.span>

        {/* Korean Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center max-w-5xl"
        >
          <span className="block text-[clamp(2.5rem,8vw,5.5rem)] font-black text-white leading-[1.1] tracking-tight">
            한국 시장,
          </span>
          <span className="block text-[clamp(2.5rem,8vw,5.5rem)] font-black text-white leading-[1.1] tracking-tight mt-2">
            혼자 하시겠습니까?
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-white/60 text-base md:text-lg max-w-2xl text-center mt-8 leading-relaxed"
        >
          We've helped <span className="text-white font-semibold">30+ global Web3 projects</span> crack Korea's{' '}
          <span className="text-primary font-semibold">$50B</span> crypto market.
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
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 text-sm font-bold tracking-wide"
          >
            <span>무료 상담 예약하기</span>
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
// SECTION 2: SOCIAL PROOF BAR
// ============================================
const SocialProofBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    { value: 340, suffix: "%", label: "평균 거래량 상승", labelEn: "Avg. Volume" },
    { value: 2.5, suffix: "M", label: "오가닉 도달", labelEn: "Organic Reach" },
    { value: 30, suffix: "+", label: "런칭 프로젝트", labelEn: "Projects Launched" },
    { value: 84, suffix: "%", label: "재계약률", labelEn: "Client Retention" },
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
    <section ref={ref} id="social-proof" className="relative py-16 md:py-24 bg-neutral-950 border-y border-white/5">
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

        {/* Media Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-6 mt-12 pt-12 border-t border-white/5"
        >
          <span className="text-white/30 text-xs tracking-wider">FEATURED IN</span>
          {[coindeskLogo, cointelegraphLogo, blockmediaLogo].map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt="Media"
              className="h-5 w-auto object-contain opacity-30 grayscale"
            />
          ))}
        </motion.div>
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
// SECTION 3: PROBLEM STATEMENT (Interactive Korean Style)
// ============================================
const ProblemStatement = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef, { once: true, margin: "-20%" });
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);

  const situations = [
    { id: 0, label: "한국 진출을 처음 시도합니다", icon: Target },
    { id: 1, label: "이미 진출했지만 성과가 없습니다", icon: X },
    { id: 2, label: "한국 파트너가 필요합니다", icon: Users },
    { id: 3, label: "커뮤니티가 성장하지 않습니다", icon: TrendingUp },
  ];

  const problems = [
    {
      emphasis: "99%",
      title: "언어 장벽",
      statement: "한국인은 한국어로만 검색합니다.",
      description: "영어 콘텐츠는 한국에서 전혀 도달하지 않습니다. 네이버, 카카오, 국내 커뮤니티 - 모든 것이 한국어입니다.",
      image: storyOriginSummit
    },
    {
      emphasis: "VASP",
      title: "규제 장벽",
      statement: "규정 미준수 = 문 닫습니다.",
      description: "한국의 VASP 규제는 세계에서 가장 엄격합니다. 규제 대응 없이는 지속 가능한 성장이 불가능합니다.",
      image: ondoSeminar
    },
    {
      emphasis: "24/7",
      title: "운영 장벽",
      statement: "관리 없는 커뮤니티는 죽은 커뮤니티.",
      description: "한국 유저들은 빠른 응답과 실시간 소통을 기대합니다. 시차를 고려한 24시간 운영이 필수입니다.",
      image: mantraParty
    }
  ];

  return (
    <div ref={containerRef} id="problem" className="bg-black">
      <section ref={problemRef} className="relative py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          {/* Interactive Question */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-4 block">Your Situation</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-8">
              지금 어떤 상황인가요?
            </h2>

            {/* Situation Buttons */}
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {situations.map((situation, i) => (
                <motion.button
                  key={situation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={problemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={() => setSelectedProblem(selectedProblem === situation.id ? null : situation.id)}
                  className={`flex items-center gap-2 px-5 py-3 border transition-all duration-300 text-sm ${
                    selectedProblem === situation.id
                      ? 'bg-primary border-primary text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <situation.icon className="w-4 h-4" />
                  <span>{situation.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Response Message */}
            <AnimatePresence>
              {selectedProblem !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 p-6 bg-primary/10 border border-primary/20 max-w-2xl mx-auto"
                >
                  <p className="text-primary text-lg font-medium">
                    많은 프로젝트들이 같은 고민을 했습니다.
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    하지만 대부분이 <span className="text-red-400">실패</span>했습니다. 이유가 뭘까요?
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white">
              Korea is different.
              <br />
              <span className="text-white/40">Really different.</span>
            </h3>
          </motion.div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {problems.map((problem, i) => (
              <motion.div
                key={problem.emphasis}
                initial={{ opacity: 0, y: 40 }}
                animate={problemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="group relative aspect-[4/5] overflow-hidden"
              >
                <img
                  src={problem.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                
                <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                  <span className="text-xs text-primary font-medium tracking-wider uppercase mb-2">
                    {problem.title}
                  </span>
                  <span className="text-[clamp(3rem,8vw,5rem)] font-black text-white leading-none">
                    {problem.emphasis}
                  </span>
                  <p className="text-white font-medium text-base mt-3">
                    {problem.statement}
                  </p>
                  <p className="text-white/50 text-sm mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {problem.description}
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
            <p className="text-white/40 text-sm tracking-widest uppercase mb-4">결과?</p>
            <span className="text-[clamp(4rem,15vw,10rem)] font-black text-white leading-none">
              90%
            </span>
            <p className="text-white/50 text-lg md:text-xl mt-4">
              6개월 내 <span className="text-red-400 font-semibold">실패</span>합니다.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// ============================================
// SECTION 4: SOLUTION BRIDGE (이음 Concept)
// ============================================
const SolutionBridge = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Globe,
      title: "Local DNA",
      subtitle: "Binance, KuCoin 출신 팀",
      description: "한국 크립토 생태계를 직접 만든 사람들이 함께합니다."
    },
    {
      icon: BarChart3,
      title: "Data-First",
      subtitle: "실시간 시장 분석",
      description: "감이 아닌 데이터로 의사결정합니다."
    },
    {
      icon: Zap,
      title: "Full-Stack",
      subtitle: "리서치부터 스케일까지",
      description: "모든 GTM 서비스를 원스톱으로 제공합니다."
    }
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-neutral-950">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-[clamp(2.5rem,8vw,5rem)] font-black text-white leading-tight"
          >
            하지만 우리와 함께한
            <br />
            <span className="text-primary">프로젝트는 다릅니다.</span>
          </motion.h2>
        </motion.div>

        {/* ium Meaning */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center mb-20 py-16 border-y border-white/10"
        >
          <span className="text-[clamp(4rem,12vw,8rem)] font-black bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            이음
          </span>
          <p className="text-white/40 text-lg mt-4 tracking-wider">
            연결하다, 잇다
          </p>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            ium Labs는 글로벌 프로젝트와 한국 시장을 잇는 다리가 됩니다.
          </p>
        </motion.div>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group p-8 bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
              <p className="text-primary text-sm font-medium mb-4">{item.subtitle}</p>
              <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: CASE STUDY SHOWCASE (Full Screen Slide)
// ============================================
const CaseStudyShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCase, setActiveCase] = useState(0);

  const cases = [
    {
      name: "Story Protocol",
      slug: "story-protocol",
      challenge: "한국 진출 0에서 시작",
      solution: "커뮤니티 + PR + 인플루언서 통합 캠페인",
      result: "340% 거래량 상승",
      resultSub: "한국 #1 커뮤니티",
      image: storyBg,
      logo: storyLogo
    },
    {
      name: "MANTRA",
      slug: "mantra",
      challenge: "RWA 인지도 부족",
      solution: "타겟 미디어 + 프리미엄 이벤트",
      result: "500% Volume Growth",
      resultSub: "500K+ 커뮤니티",
      image: mantraBg,
      logo: mantraLogo
    },
    {
      name: "peaq",
      slug: "peaq",
      challenge: "DePIN 시장 선점 필요",
      solution: "선제적 미디어 + 파트너십 구축",
      result: "First Mover",
      resultSub: "한국 최초 DePIN L1",
      image: peaqBg,
      logo: peaqLogo
    },
    {
      name: "Sahara AI",
      slug: "sahara-ai",
      challenge: "AI x Crypto 포지셔닝",
      solution: "교육 콘텐츠 + 커뮤니티 빌딩",
      result: "Community Built",
      resultSub: "열성 팬층 구축",
      image: saharaAiBg,
      logo: saharaLogo
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCase((prev) => (prev + 1) % cases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [cases.length]);

  const activeProject = cases[activeCase];

  return (
    <section ref={ref} className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCase}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.5, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={activeProject.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full min-h-screen flex items-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 w-full py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Case Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
            >
              <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Case Study</span>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCase}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={activeProject.logo} 
                    alt={activeProject.name}
                    className="h-10 w-auto brightness-0 invert mt-6 mb-8"
                  />
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <span className="text-white/40 text-xs tracking-wider uppercase">Challenge</span>
                      <p className="text-white/80 text-lg mt-1">{activeProject.challenge}</p>
                    </div>
                    <div>
                      <span className="text-white/40 text-xs tracking-wider uppercase">Solution</span>
                      <p className="text-white/80 text-lg mt-1">{activeProject.solution}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                    <div>
                      <span className="text-green-400 font-bold text-2xl">{activeProject.result}</span>
                      <span className="text-white/50 text-sm block">{activeProject.resultSub}</span>
                    </div>
                  </div>

                  <Link 
                    to={`/projects/${activeProject.slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <span>케이스 스터디 보기</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right: Case Navigation */}
            <div className="space-y-4">
              {cases.map((caseItem, i) => (
                <motion.button
                  key={caseItem.slug}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={() => setActiveCase(i)}
                  className={`w-full text-left p-6 border transition-all duration-300 ${
                    activeCase === i
                      ? 'bg-white/10 border-primary'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        src={caseItem.logo} 
                        alt={caseItem.name}
                        className={`h-6 w-auto transition-all ${
                          activeCase === i ? 'opacity-100' : 'opacity-40 grayscale'
                        }`}
                      />
                      <span className={`font-medium transition-colors ${
                        activeCase === i ? 'text-white' : 'text-white/50'
                      }`}>
                        {caseItem.name}
                      </span>
                    </div>
                    <span className={`text-sm ${
                      activeCase === i ? 'text-primary' : 'text-white/30'
                    }`}>
                      {caseItem.result}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
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
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: SERVICES ACCORDION (Korean Agency Style)
// ============================================
const ServicesAccordion = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredService, setHoveredService] = useState<string | null>("community");

  const services = [
    {
      id: "community",
      labelKo: "커뮤니티 관리",
      labelEn: "Community Management",
      icon: MessageCircle,
      image: communityGrowth,
      description: "24시간 한국어 모더레이션, Discord/Telegram 운영, AMA/이벤트 호스팅, 앰배서더 프로그램 운영",
      features: ["24/7 한국어 모더레이션", "Discord/Telegram 셋업", "AMA & 이벤트", "앰배서더 프로그램"],
      link: "/services/community"
    },
    {
      id: "pr",
      labelKo: "홍보 & 미디어",
      labelEn: "PR & Media Relations",
      icon: Megaphone,
      image: prMedia,
      description: "코인데스크 코리아, 블록미디어 등 50+ 미디어 네트워크를 통한 전략적 PR 캠페인",
      features: ["Tier-1 미디어 배치", "프레스 릴리스", "Thought Leadership", "위기 관리"],
      link: "/services/pr"
    },
    {
      id: "influencer",
      labelKo: "인플루언서 마케팅",
      labelEn: "Influencer Marketing",
      icon: Users,
      image: kolNetwork,
      description: "500+ 검증된 한국 크립토 KOL 네트워크, 데이터 기반 선정, 성과 추적, ROI 최적화",
      features: ["500+ 검증 KOL", "성과 분석", "콘텐츠 제작", "캠페인 관리"],
      link: "/services/influencer"
    },
    {
      id: "seo",
      labelKo: "검색최적화 & 광고",
      labelEn: "SEO & Paid Ads",
      icon: Search,
      image: seoAds,
      description: "네이버 SEO 최적화, 구글 코리아 광고, 디스플레이 광고, 리타게팅 캠페인",
      features: ["네이버 SEO", "구글 Ads 코리아", "디스플레이 광고", "리타게팅"],
      link: "/services/seo-ads"
    },
    {
      id: "events",
      labelKo: "오프라인 이벤트",
      labelEn: "Offline Events",
      icon: Calendar,
      image: events,
      description: "밋업부터 대규모 컨퍼런스까지, 한국 내 End-to-End 이벤트 프로덕션",
      features: ["컨퍼런스 호스팅", "밋업 조직", "VIP 네트워킹", "베뉴 파트너십"],
      link: "/services/offline-event"
    }
  ];

  const hoveredServiceData = services.find(s => s.id === hoveredService) || services[0];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">What We Offer</span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4">
            Full-Stack GTM 서비스
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Accordion */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-2" defaultValue="community">
              {services.map((service) => (
                <AccordionItem 
                  key={service.id} 
                  value={service.id}
                  className="border border-white/10 bg-white/[0.02] data-[state=open]:bg-white/[0.05] data-[state=open]:border-primary/30"
                  onMouseEnter={() => setHoveredService(service.id)}
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <service.icon className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium block">{service.labelKo}</span>
                        <span className="text-white/40 text-xs">{service.labelEn}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-white/60 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-2 gap-2 mb-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-white/70 text-xs">
                          <Check className="w-3 h-3 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-1 text-primary text-sm hover:text-primary/80 transition-colors"
                    >
                      <span>자세히 보기</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Right: Hover Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="relative aspect-[4/3] overflow-hidden sticky top-24 hidden lg:block"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={hoveredService}
                src={hoveredServiceData.image}
                alt={hoveredServiceData.labelKo}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-white font-medium">{hoveredServiceData.labelKo}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: PROCESS TIMELINE (Horizontal Scroll)
// ============================================
const ProcessTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      week: "Week 1-2",
      title: "Discovery",
      titleKo: "리서치",
      image: discoveryResearch,
      deliverables: ["시장 리서치 리포트", "경쟁사 분석", "타겟 오디언스 맵핑", "규제 검토"]
    },
    {
      number: "02",
      week: "Week 3-4",
      title: "Strategy",
      titleKo: "전략",
      image: strategyPlanning,
      deliverables: ["GTM 로드맵", "채널 전략", "예산 배분", "KPI 설정"]
    },
    {
      number: "03",
      week: "Week 5-8",
      title: "Launch",
      titleKo: "런칭",
      image: executionGrowth,
      deliverables: ["PR 캠페인", "커뮤니티 빌딩", "KOL 활성화", "이벤트 실행"]
    },
    {
      number: "04",
      week: "Ongoing",
      title: "Scale",
      titleKo: "스케일",
      image: scaleSuccess,
      deliverables: ["성과 트래킹", "최적화", "확장 기획", "정기 리포팅"]
    }
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Our Process</span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4">
            어떻게 진행되나요?
          </h3>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 hidden md:block" />

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-neutral-950 border-2 border-white/20 group-hover:border-primary transition-colors z-10 items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>

                {/* Card */}
                <div className="bg-white/[0.02] border border-white/10 p-6 mt-8 group-hover:border-primary/30 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-white/20">[{step.number}]</span>
                    <span className="text-xs text-primary font-medium px-2 py-1 bg-primary/10">
                      {step.week}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden mb-4">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-white mb-1">{step.title}</h4>
                  <p className="text-white/40 text-sm mb-4">{step.titleKo}</p>

                  {/* Deliverables */}
                  <ul className="space-y-2">
                    {step.deliverables.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-white/60 text-xs">
                        <ChevronRight className="w-3 h-3 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 8: WHY US (강화)
// ============================================
const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const differentiators = [
    {
      icon: Globe,
      title: "Local DNA, Global Network",
      titleKo: "현지 DNA, 글로벌 네트워크",
      description: "Binance & KuCoin 출신 경영진. 한국 크립토 생태계를 직접 만든 팀입니다.",
      highlight: "Binance & KuCoin Alumni",
      image: officeImage
    },
    {
      icon: Database,
      title: "Data-First Approach",
      titleKo: "데이터 기반 접근",
      description: "자체 개발 분석 대시보드로 실시간 시장 센티먼트, 경쟁사 동향, 커뮤니티 건강도 추적.",
      highlight: "Proprietary Analytics",
      image: dashboardMockup
    },
    {
      icon: Shield,
      title: "End-to-End Execution",
      titleKo: "원스톱 실행",
      description: "리서치부터 런칭, 스케일까지. 하나의 팀, 완전한 책임. 에이전시 간 핑퐁 없음.",
      highlight: "Full-Stack Team",
      image: seoulMetroBillboard
    }
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
            왜 이음랩스인가요?
          </h3>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group relative overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-xs text-primary font-medium mb-2">{item.highlight}</span>
                  <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white/60 text-xs mb-2">{item.titleKo}</p>
                  <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
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
// SECTION 9: GALLERY + TESTIMONIALS
// ============================================
const GalleryTestimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      quote: "ium Labs made our Korea launch seamless. They understood our vision from day one and delivered beyond expectations.",
      author: "Sarah Kim",
      role: "Head of Marketing",
      company: "Story Protocol",
      logo: storyLogo,
      result: "340% Volume Growth"
    },
    {
      quote: "The team's execution was flawless. From community building to media relations, they handled everything with precision.",
      author: "Michael Chen",
      role: "CEO",
      company: "DeFi Protocol",
      logo: mantraLogo,
      result: "500K+ Community"
    },
    {
      quote: "Working with ium Labs gave us a significant first-mover advantage in the Korean market.",
      author: "David Park",
      role: "BD Lead",
      company: "L1 Blockchain",
      logo: peaqLogo,
      result: "First Korean L1 Partner"
    }
  ];

  const galleryImages = [
    { src: bnbEvent, title: "BNB Chain Event" },
    { src: storyOriginSummit, title: "Story Origin Summit" },
    { src: peaqSummit, title: "peaq Summit" },
    { src: mantraParty, title: "MANTRA Party" },
    { src: openledgerEvent, title: "OpenLedger Event" },
    { src: kucoinCampaign, title: "KuCoin Campaign" },
  ];

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
            클라이언트가 말합니다.
          </h3>
        </motion.div>

        {/* Testimonial Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="relative max-w-4xl mx-auto mb-16"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
            >
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

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="relative aspect-[4/3] overflow-hidden group"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-medium">{img.title}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 10: CTA (Korean Style)
// ============================================
const CTASection = () => {
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
            한국 시장,
            <br />
            <span className={`transition-colors duration-500 ${isHovered ? 'text-white' : 'text-primary'}`}>
              함께 열겠습니다.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-base md:text-lg mt-6 mb-4"
          >
            Book a free 30-min strategy call.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-white/40 text-sm mb-12"
          >
            No commitment. Just clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 text-lg font-bold"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span>무료 상담 예약하기</span>
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
    "한국 GTM 전략 | Korea Go-To-Market | Ium Labs",
    "30+ 글로벌 Web3 프로젝트의 한국 시장 진출을 성공시켰습니다. 데이터 기반 GTM 전략, Binance & KuCoin 출신 팀."
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
        <ProblemStatement />
        <SolutionBridge />
        <CaseStudyShowcase />
        <ServicesAccordion />
        <ProcessTimeline />
        <WhyUs />
        <GalleryTestimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default GTMService;
