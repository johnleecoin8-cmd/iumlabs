import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// Project assets
import storyLogo from '@/assets/logos/story-protocol.png';
import mantraLogo from '@/assets/logos/mantra.png';
import peaqLogo from '@/assets/logos/peaq.svg';
import saharaLogo from '@/assets/logos/sahara-ai.png';
import kucoinLogo from '@/assets/logos/kucoin.svg';
import bybitLogo from '@/assets/logos/bybit.png';

// Background images
import storyBg from '@/assets/projects/story-bg.jpg';
import mantraBg from '@/assets/projects/mantra-featured-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';
import bybitBg from '@/assets/projects/bybit-bg.jpg';

interface CaseStudy {
  name: string;
  slug: string;
  logo: string;
  image: string;
  video?: string;
  challenge: string;
  solution: string;
  result: string;
  resultSub: string;
  category: string;
}

const cases: CaseStudy[] = [
  {
    name: "Story Protocol",
    slug: "story-protocol",
    logo: storyLogo,
    image: storyBg,
    video: "/videos/projects/story-hero.mp4",
    challenge: "한국 진출 0에서 시작",
    solution: "커뮤니티 + PR + 인플루언서 통합 캠페인",
    result: "+340%",
    resultSub: "Trading Volume",
    category: "IP Protocol"
  },
  {
    name: "MANTRA",
    slug: "mantra",
    logo: mantraLogo,
    image: mantraBg,
    video: "/videos/projects/mantra-hero.mp4",
    challenge: "RWA 인지도 부족",
    solution: "타겟 미디어 + 프리미엄 이벤트",
    result: "+500%",
    resultSub: "Volume Growth",
    category: "RWA"
  },
  {
    name: "peaq",
    slug: "peaq",
    logo: peaqLogo,
    image: peaqBg,
    video: "/videos/projects/peaq-hero.mp4",
    challenge: "DePIN 시장 선점 필요",
    solution: "선제적 미디어 + 파트너십 구축",
    result: "#1",
    resultSub: "DePIN in Korea",
    category: "DePIN L1"
  },
  {
    name: "Sahara AI",
    slug: "sahara-ai",
    logo: saharaLogo,
    image: saharaAiBg,
    video: "/videos/projects/sahara-hero.mp4",
    challenge: "AI x Crypto 포지셔닝",
    solution: "교육 콘텐츠 + 커뮤니티 빌딩",
    result: "200K+",
    resultSub: "Community Built",
    category: "AI x Crypto"
  },
  {
    name: "KuCoin",
    slug: "kucoin",
    logo: kucoinLogo,
    image: kucoinBg,
    video: "/videos/projects/kucoin-hero.mp4",
    challenge: "한국 거래소 시장 진입",
    solution: "브랜드 인지도 + 유저 획득 캠페인",
    result: "Top 5",
    resultSub: "Exchange Korea",
    category: "Exchange"
  },
  {
    name: "Bybit",
    slug: "bybit",
    logo: bybitLogo,
    image: bybitBg,
    video: "/videos/projects/bybit-hero.mp4",
    challenge: "경쟁 심화 속 차별화",
    solution: "프리미엄 이벤트 + KOL 파트너십",
    result: "1M+",
    resultSub: "Korean Users",
    category: "Exchange"
  },
];

const FullscreenCaseSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeCase = cases[activeIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cases.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % cases.length);
    setIsAutoPlaying(false);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + cases.length) % cases.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Background Video/Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {activeCase.video ? (
            <video
              ref={videoRef}
              src={activeCase.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={activeCase.image}
              alt={activeCase.name}
              className="w-full h-full object-cover"
            />
          )}
          {/* Multiple gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Case Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                {/* Category Badge */}
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 text-sm mb-6">
                  {activeCase.category}
                </span>
                
                {/* Logo */}
                <img 
                  src={activeCase.logo} 
                  alt={activeCase.name}
                  className="h-12 md:h-16 w-auto brightness-0 invert mb-8"
                />
                
                {/* Challenge & Solution */}
                <div className="space-y-6 mb-8">
                  <div>
                    <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Challenge</span>
                    <p className="text-white/80 text-lg md:text-xl mt-2">{activeCase.challenge}</p>
                  </div>
                  <div>
                    <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Solution</span>
                    <p className="text-white/80 text-lg md:text-xl mt-2">{activeCase.solution}</p>
                  </div>
                </div>

                {/* Result */}
                <div className="flex items-center gap-4 mb-10 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 inline-flex">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <div>
                    <span className="text-green-400 font-black text-3xl md:text-4xl">{activeCase.result}</span>
                    <span className="text-white/50 text-sm block">{activeCase.resultSub}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link 
                  to={`/projects/${activeCase.slug}`}
                  className="group inline-flex items-center gap-3 text-white hover:text-primary transition-colors text-lg font-medium"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Right: Empty for visual balance with background */}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent py-8">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Slide Indicator */}
            <div className="flex items-center gap-6">
              <span className="font-mono text-white/40">
                <span className="text-white text-2xl font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="mx-2">/</span>
                <span>{String(cases.length).padStart(2, '0')}</span>
              </span>
              
              {/* Progress Dots */}
              <div className="hidden md:flex gap-2">
                {cases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className="group relative w-12 h-1 bg-white/20 rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: activeIndex === i ? "100%" : "0%" 
                      }}
                      transition={{ 
                        duration: activeIndex === i && isAutoPlaying ? 6 : 0.3,
                        ease: "linear"
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                {isAutoPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white" />
                )}
              </button>
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={goNext}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Case Thumbnails - Desktop */}
          <div className="hidden lg:flex gap-3 mt-6 overflow-x-auto pb-2">
            {cases.map((caseItem, i) => (
              <button
                key={caseItem.slug}
                onClick={() => goToSlide(i)}
                className={`relative flex-shrink-0 w-48 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  activeIndex === i 
                    ? 'border-primary scale-105' 
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={caseItem.image}
                  alt={caseItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <img
                    src={caseItem.logo}
                    alt={caseItem.name}
                    className="h-5 w-auto brightness-0 invert"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View All Link */}
      <div className="absolute bottom-8 right-6 md:right-16 z-20">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          <span>View All Projects</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default FullscreenCaseSlider;
