import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, Megaphone, Calendar, Database, Target } from 'lucide-react';

// Campaign preview thumbnails
import storyOriginSummit from '@/assets/campaigns/story-origin-summit.jpg';
import mantraParty from '@/assets/campaigns/mantra-party.jpg';
import peaqSummit from '@/assets/campaigns/peaq-summit.jpg';

const FloatingServiceTags = () => {
  const tags = [
    { label: "커뮤니티", icon: Users, top: "18%", left: "6%" },
    { label: "인플루언서", icon: Users, top: "22%", right: "8%" },
    { label: "PR", icon: Megaphone, bottom: "38%", left: "4%" },
    { label: "오프라인", icon: Calendar, bottom: "32%", right: "6%" },
    { label: "리서치", icon: Database, top: "48%", left: "10%" },
    { label: "광고", icon: Target, top: "42%", right: "12%" },
  ];

  return (
    <>
      {tags.map((tag, index) => (
        <motion.div
          key={tag.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -12, 0, 12, 0],
          }}
          transition={{ 
            delay: 1 + index * 0.15,
            duration: 0.5,
            y: {
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="hidden lg:flex absolute items-center gap-2.5 px-5 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg shadow-violet-500/10"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
            bottom: tag.bottom,
          }}
        >
          <tag.icon className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-medium text-white/80">{tag.label}</span>
        </motion.div>
      ))}
    </>
  );
};

// Mouse follow button component
const MouseFollowButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] hover:scale-105"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
      <span className="relative z-10">{children}</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
    </motion.a>
  );
};

const EnhancedHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // Inline image thumbnails for headline
  const inlineImages = [storyOriginSummit, mantraParty, peaqSummit];
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % inlineImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      {/* Video Background with enhanced effects */}
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
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
      </motion.div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Floating Service Tags */}
      <FloatingServiceTags />

      {/* Center Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        style={{ opacity, y: textY }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm font-medium mb-8"
        >
          <Zap className="w-4 h-4" />
          <span>Korea's #1 Web3 GTM Agency</span>
        </motion.div>

        {/* Giant Headline with inline images - Noomo style */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center max-w-6xl"
        >
          <span className="block text-[clamp(2.5rem,8vw,5.5rem)] font-black text-white leading-[1.1] tracking-tight">
            한국
            {/* Inline rotating image */}
            <span className="relative inline-block mx-4 w-[clamp(60px,10vw,120px)] h-[clamp(40px,6vw,80px)] rounded-lg overflow-hidden align-middle">
              {inlineImages.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt=""
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: activeImage === i ? 1 : 0,
                    scale: activeImage === i ? 1 : 0.8
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}
            </span>
            시장,
          </span>
          <span className="block text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[1.1] tracking-tight mt-2">
            혼자
            <span className="relative inline-block mx-4 w-[clamp(60px,10vw,120px)] h-[clamp(40px,6vw,80px)] rounded-lg overflow-hidden align-middle">
              {inlineImages.map((img, i) => (
                <motion.img
                  key={i}
                  src={inlineImages[(i + 1) % inlineImages.length]}
                  alt=""
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: activeImage === i ? 1 : 0,
                    scale: activeImage === i ? 1 : 0.8
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}
            </span>
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">하시겠습니까?</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl text-center mt-8 leading-relaxed"
        >
          We've helped <span className="text-white font-semibold">30+ global Web3 projects</span> crack Korea's{' '}
          <span className="text-primary font-semibold">$50B</span> crypto market with data-driven strategies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <MouseFollowButton href="/contact">
            무료 상담 예약하기
          </MouseFollowButton>
          <Link 
            to="/projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white/5 border border-white/20 text-white/80 rounded-full font-medium text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300"
          >
            케이스 스터디 보기
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-12"
        >
          <a 
            href="#social-proof"
            className="group inline-flex flex-col items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            <span>Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-white/40 rounded-full" />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EnhancedHero;
