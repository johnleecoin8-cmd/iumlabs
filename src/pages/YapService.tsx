import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Volume2, Users, Zap, FileText, Radio, Waves, MessageCircle, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";
import seoulTech from "@/assets/backgrounds/seoul-tech-future.jpg";

// Electric Cyan accent
const ACCENT_COLOR = "#22D3EE";

// Famous Crypto KOLs with DiceBear avatars, followers and expertise
const cryptoKOLs = [
  { name: "Cobie", handle: "@colobie", followers: "800K", expertise: "Trading" },
  { name: "ZachXBT", handle: "@zachxbt", followers: "650K", expertise: "On-chain" },
  { name: "Hsaka", handle: "@HsakaTrades", followers: "450K", expertise: "TA" },
  { name: "Loomdart", handle: "@loomdart", followers: "380K", expertise: "DeFi" },
  { name: "Ansem", handle: "@blknoiz06", followers: "520K", expertise: "Memes" },
  { name: "GCR", handle: "@GCRClassic", followers: "290K", expertise: "Macro" },
  { name: "CL", handle: "@CL207", followers: "180K", expertise: "Alt" },
  { name: "Pentoshi", handle: "@Pentosh1", followers: "610K", expertise: "Trading" },
  { name: "Crypto Cobain", handle: "@CryptoCobain", followers: "350K", expertise: "DeFi" },
  { name: "Route 2 FI", handle: "@Route2FI", followers: "280K", expertise: "DeFi" },
  { name: "Degen Spartan", handle: "@DegenSpartan", followers: "220K", expertise: "Yield" },
  { name: "Light", handle: "@LightCrypto", followers: "195K", expertise: "Trading" },
  { name: "Arthur Hayes", handle: "@CryptoHayes", followers: "580K", expertise: "Macro" },
  { name: "Tetranode", handle: "@Tetranode", followers: "310K", expertise: "DeFi" },
  { name: "Mando", handle: "@TheCryptoMando", followers: "145K", expertise: "NFT" },
  { name: "Cred", handle: "@CryptoCred", followers: "230K", expertise: "TA" },
  { name: "Tyler D", handle: "@Tyler_Did_It", followers: "165K", expertise: "Gems" },
  { name: "Rune", handle: "@RuneKek", followers: "120K", expertise: "Memes" },
  { name: "Fiskantes", handle: "@Fiskantes", followers: "185K", expertise: "VC" },
  { name: "Larry Cermak", handle: "@lawmaster", followers: "420K", expertise: "Data" },
  { name: "Frank", handle: "@frankdegods", followers: "390K", expertise: "NFT" },
  { name: "Punk6529", handle: "@punk6529", followers: "510K", expertise: "NFT" },
  { name: "Irene Zhao", handle: "@IreneZhao_", followers: "480K", expertise: "Web3" },
  { name: "Andrew Kang", handle: "@Rewkang", followers: "340K", expertise: "VC" },
  { name: "Trader Joe", handle: "@CryptoGodJohn", followers: "275K", expertise: "Trading" },
  { name: "Satoshi Flipper", handle: "@SatoshiFlipper", followers: "210K", expertise: "TA" },
  { name: "Kaleo", handle: "@CryptoKaleo", followers: "620K", expertise: "Trading" },
  { name: "Altcoin Psycho", handle: "@AltcoinPsycho", followers: "295K", expertise: "Alt" },
  { name: "Defi Edge", handle: "@thedefiedge", followers: "185K", expertise: "DeFi" },
  { name: "Smol Dingus", handle: "@SmolDingus", followers: "95K", expertise: "Memes" },
  { name: "Willy Woo", handle: "@woonomic", followers: "1.1M", expertise: "Data" },
  { name: "PlanB", handle: "@100trillionUSD", followers: "1.9M", expertise: "BTC" },
  { name: "Crypto Dog", handle: "@TheCryptoDog", followers: "750K", expertise: "Trading" },
  { name: "Crypto Bird", handle: "@crypto_birb", followers: "410K", expertise: "TA" },
  { name: "Thor Hartvigsen", handle: "@ThorHartvigsen", followers: "125K", expertise: "DeFi" },
  { name: "Taiki Maeda", handle: "@TaikiMaeda2", followers: "180K", expertise: "DeFi" },
  { name: "DCF GOD", handle: "@dcaboredape", followers: "155K", expertise: "NFT" },
  { name: "Sandra", handle: "@sandra_leadswf", followers: "85K", expertise: "Web3" },
  { name: "DeFi Dad", handle: "@DeFi_Dad", followers: "240K", expertise: "DeFi" },
  { name: "CryptoGarga", handle: "@CryptoGarga", followers: "195K", expertise: "NFT" },
];

const processSteps = [
  {
    number: "01",
    title: "Strategy & Onboarding",
    description: "We align on your goals, messaging, timing, and target audiences. Then we define campaign angles and prepare materials.",
    icon: Target,
  },
  {
    number: "02",
    title: "Campaign Setup",
    description: "We publish the briefing to our 600+ Yap Circle creators — inviting them to participate based on interest and fit.",
    icon: Users,
  },
  {
    number: "03",
    title: "Activation",
    description: "Creators begin posting organically across X: threads, quote RTs, memes, and reactions. We amplify high-performing posts.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Reporting",
    description: "We deliver a full report on campaign performance: reach, impressions, engagement, and smart follower exposure.",
    icon: FileText,
  },
];

const stats = [
  { value: "600+", label: "Yapper Network" },
  { value: "10M+", label: "Total Reach" },
];

const YapService = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sound wave animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    let time = 0;

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw multiple wave layers
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.3 - layer * 0.1})`;
        ctx.lineWidth = 2 - layer * 0.5;
        
        for (let x = 0; x < width; x++) {
          const y = height / 2 + 
            Math.sin(x * 0.02 + time + layer) * (30 + layer * 10) +
            Math.sin(x * 0.01 + time * 0.5) * 20;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      
      time += 0.03;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-0.5 sm:p-1 md:p-2">
      <div className="min-h-screen bg-[#0A0A0A] rounded-xl sm:rounded-2xl overflow-hidden relative">
        {/* Ambient Glow */}
        <div 
          className="fixed top-0 left-0 w-[50vw] h-[50vh] pointer-events-none z-0 opacity-15"
          style={{ background: `radial-gradient(ellipse at 0% 0%, ${ACCENT_COLOR} 0%, transparent 60%)` }}
        />
        <div 
          className="fixed bottom-0 right-0 w-[40vw] h-[40vh] pointer-events-none z-0 opacity-10"
          style={{ background: `radial-gradient(ellipse at 100% 100%, ${ACCENT_COLOR} 0%, transparent 60%)` }}
        />
        
        <Navbar />

        {/* Hero Section - Sound Wave Style */}
        <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-[-5%] bg-cover bg-center bg-no-repeat animate-kenburns"
              style={{ 
                backgroundImage: `url(${seoulTech})`,
                filter: "brightness(0.2) saturate(1.2)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]" />
          </div>

          {/* Sound Wave Canvas */}
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-60 pointer-events-none z-[1]"
          />

          {/* Floating Speech Bubbles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute z-10 hidden md:block"
              style={{ 
                left: `${10 + i * 15}%`, 
                top: `${25 + (i % 3) * 15}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                y: [0, -30, -60],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
              }}
            >
              <MessageCircle className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
            </motion.div>
          ))}

          {/* Content */}
          <div className="container mx-auto px-6 lg:px-16 pt-32 pb-16 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                style={{ borderColor: `${ACCENT_COLOR}50`, backgroundColor: `${ACCENT_COLOR}10` }}
              >
                <Volume2 className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                <span className="text-sm" style={{ color: ACCENT_COLOR }}>Yap Strategy</span>
              </motion.div>
              
              <h1 className="text-white mb-6">
                <span className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95]">
                  Yap
                </span>
                <span 
                  className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95]"
                  style={{ color: ACCENT_COLOR }}
                >
                  Strategy
                </span>
              </h1>

              <p className="text-white/70 text-lg max-w-xl mb-8 font-light leading-relaxed">
                Amplify your message with 600+ aligned yappers — driving mindshare and organic buzz across Crypto X.
              </p>

              <div className="flex flex-wrap gap-4">
                <CalendlyButton 
                  className="inline-flex items-center gap-3 px-6 py-3 font-medium text-sm transition-all duration-300 hover:scale-105 rounded-lg"
                  style={{ backgroundColor: ACCENT_COLOR, color: '#000' }}
                >
                  <Calendar className="w-4 h-4" />
                  Book a Meeting
                </CalendlyButton>
                
                {/* Sound Wave Visual Badge */}
                <div 
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border"
                  style={{ borderColor: `${ACCENT_COLOR}30` }}
                >
                  <Radio className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                  <span className="text-white/60 text-sm">600+ Active Creators</span>
                  <motion.div
                    className="flex gap-0.5"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 rounded-full"
                        style={{ backgroundColor: ACCENT_COLOR }}
                        animate={{ height: [4, 16, 4] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Network Section */}
        <section 
          className="relative py-20"
          style={{ background: `linear-gradient(to bottom, #0A0A0A, ${ACCENT_COLOR}08, #0A0A0A)` }}
        >
          <div 
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${ACCENT_COLOR}60, transparent)` }}
          />

          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex items-center gap-3 mb-12">
              <span className="text-xs font-mono" style={{ color: ACCENT_COLOR }}>01</span>
              <h2 className="text-2xl md:text-3xl font-medium text-white">Creator Network</h2>
            </div>

            {/* Network Visualization */}
            <div className="relative mb-16">
              <div className="grid grid-cols-6 md:grid-cols-10 gap-2 md:gap-3">
                {Array.from({ length: 60 }).map((_, i) => {
                  const kol = i < cryptoKOLs.length ? cryptoKOLs[i] : null;
                  const hasKol = kol !== null;
                  const avatarUrl = hasKol 
                    ? `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=0a0a0a`
                    : null;
                  const twitterUrl = hasKol ? `https://x.com/${kol.handle.replace('@', '')}` : null;
                  
                  return (
                    <motion.a
                      key={i}
                      href={twitterUrl || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.015 }}
                      className="aspect-square rounded-lg flex items-center justify-center relative group cursor-pointer overflow-hidden"
                      style={{ 
                        backgroundColor: hasKol ? '#0a0a0a' : `${ACCENT_COLOR}10`,
                        border: `1px solid ${hasKol ? ACCENT_COLOR + '60' : ACCENT_COLOR + '20'}`,
                      }}
                      onClick={(e) => !hasKol && e.preventDefault()}
                    >
                      {hasKol ? (
                        <>
                          <img 
                            src={avatarUrl!}
                            alt={kol.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          {/* Hover overlay with name */}
                          <div 
                            className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-1"
                          >
                            <span className="text-[8px] md:text-[10px] font-medium text-white text-center leading-tight">{kol.name}</span>
                            <span className="text-[6px] md:text-[8px] text-cyan-400 text-center">{kol.followers}</span>
                            <span 
                              className="text-[5px] md:text-[7px] px-1.5 py-0.5 rounded-full mt-0.5"
                              style={{ backgroundColor: `${ACCENT_COLOR}40`, color: ACCENT_COLOR }}
                            >
                              {kol.expertise}
                            </span>
                            <span className="text-[5px] md:text-[6px] text-white/50 mt-1">Click to view ↗</span>
                          </div>
                          {/* Glow effect on hover */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{ 
                              boxShadow: `inset 0 0 20px ${ACCENT_COLOR}40, 0 0 15px ${ACCENT_COLOR}30` 
                            }}
                          />
                        </>
                      ) : (
                        <Users className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
                      )}
                      {/* Pulse effect on some KOL cells */}
                      {hasKol && i % 7 === 0 && (
                        <motion.div
                          className="absolute inset-0 rounded-lg pointer-events-none"
                          style={{ border: `2px solid ${ACCENT_COLOR}` }}
                          animate={{ opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Center Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A] border-2 px-8 py-4 rounded-xl z-10"
                style={{ borderColor: ACCENT_COLOR }}
              >
                <p className="text-3xl font-bold text-center" style={{ color: ACCENT_COLOR }}>600+</p>
                <p className="text-white/60 text-sm text-center">Yappers</p>
              </motion.div>
            </div>

            {/* About Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Yap Circle is our curated Yapper network designed to give your project consistent Mindshare and credible exposure across X. We activate waves of organic content around your narrative — a flexible, always-on strategy that reaches deep into crypto's most active segments.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-xl border"
                      style={{ borderColor: `${ACCENT_COLOR}30`, backgroundColor: `${ACCENT_COLOR}05` }}
                    >
                      <p className="text-3xl font-bold" style={{ color: ACCENT_COLOR }}>{stat.value}</p>
                      <p className="text-white/50 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sound Wave Visual */}
              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  {/* Concentric circles */}
                  {[1, 2, 3, 4].map((ring) => (
                    <motion.div
                      key={ring}
                      className="absolute rounded-full border"
                      style={{
                        width: `${ring * 25}%`,
                        height: `${ring * 25}%`,
                        top: `${50 - ring * 12.5}%`,
                        left: `${50 - ring * 12.5}%`,
                        borderColor: `${ACCENT_COLOR}${40 - ring * 10}`,
                      }}
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: ring * 0.3 }}
                    />
                  ))}
                  {/* Center icon */}
                  <div 
                    className="relative z-10 w-20 h-20 mx-auto rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${ACCENT_COLOR}30`, border: `2px solid ${ACCENT_COLOR}` }}
                  >
                    <Waves className="w-10 h-10" style={{ color: ACCENT_COLOR }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - Concentric Diffusion */}
        <section className="bg-[#0A0A0A] relative py-20">
          <div 
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${ACCENT_COLOR}40, transparent)` }}
          />

          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex items-center gap-3 mb-12">
              <span className="text-xs font-mono" style={{ color: ACCENT_COLOR }}>02</span>
              <h2 className="text-2xl md:text-3xl font-medium text-white">Process</h2>
            </div>

            {/* Diffusion Style - Expanding Outward */}
            <div className="relative max-w-4xl mx-auto">
              {processSteps.map((step, index) => {
                const size = 100 + index * 60; // Each step expands outward
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="relative mb-6"
                    style={{
                      width: `${Math.min(100, 60 + index * 15)}%`,
                      marginLeft: `${(100 - Math.min(100, 60 + index * 15)) / 2}%`,
                    }}
                  >
                    <div 
                      className="p-6 rounded-2xl border relative overflow-hidden"
                      style={{ borderColor: `${ACCENT_COLOR}30` }}
                    >
                      {/* Background wave effect */}
                      <motion.div
                        className="absolute inset-0 opacity-10"
                        style={{ backgroundColor: ACCENT_COLOR }}
                        animate={{ opacity: [0.05, 0.1, 0.05] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      />
                      
                      <div className="flex items-start gap-4 relative z-10">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${ACCENT_COLOR}20` }}
                        >
                          <step.icon className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono" style={{ color: ACCENT_COLOR }}>{step.number}</span>
                            <h3 className="text-white font-medium">{step.title}</h3>
                          </div>
                          <p className="text-white/50 text-sm">{step.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connecting ripple */}
                    {index < processSteps.length - 1 && (
                      <motion.div
                        className="absolute left-1/2 -bottom-4 w-8 h-8 -translate-x-1/2"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <div 
                          className="w-full h-full rounded-full"
                          style={{ 
                            background: `radial-gradient(circle, ${ACCENT_COLOR}40, transparent)`,
                          }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <CalendlyButton 
                className="inline-flex items-center gap-2 px-8 py-4 font-medium transition-all duration-300 hover:scale-105 rounded-lg"
                style={{ backgroundColor: ACCENT_COLOR, color: '#000' }}
              >
                <Volume2 className="w-5 h-5" />
                Amplify Your Message
              </CalendlyButton>
            </div>
          </div>
        </section>

        {/* Full Creator Network Section */}
        <section className="bg-[#0A0A0A] border-t border-white/10 py-20">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono" style={{ color: ACCENT_COLOR }}>03</span>
              <h2 className="text-2xl md:text-3xl font-medium text-white">Full Creator Network</h2>
            </div>
            <p className="text-white/50 mb-12 max-w-2xl">
              Explore our complete network of 600+ active creators across all crypto verticals
            </p>

            {/* Full Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
              {cryptoKOLs.map((kol, index) => (
                <motion.a
                  key={index}
                  href={`https://x.com/${kol.handle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.01 }}
                >
                  <div 
                    className="w-full h-full rounded-lg overflow-hidden border transition-all"
                    style={{ 
                      borderColor: `${ACCENT_COLOR}30`,
                      backgroundColor: '#0a0a0a'
                    }}
                  >
                    <img 
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=0a0a0a`}
                      alt={kol.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-1 rounded-lg">
                      <span className="text-[7px] md:text-[9px] font-medium text-white text-center leading-tight">{kol.name}</span>
                      <span className="text-[5px] md:text-[7px] text-cyan-400 text-center">{kol.followers}</span>
                      <span 
                        className="text-[4px] md:text-[6px] px-1 py-0.5 rounded-full mt-0.5"
                        style={{ backgroundColor: `${ACCENT_COLOR}40`, color: ACCENT_COLOR }}
                      >
                        {kol.expertise}
                      </span>
                    </div>
                    
                    {/* Glow on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-lg"
                      style={{ boxShadow: `inset 0 0 15px ${ACCENT_COLOR}30, 0 0 10px ${ACCENT_COLOR}20` }}
                    />
                  </div>
                </motion.a>
              ))}
              
              {/* Placeholder cells for 600+ network feeling */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`placeholder-${i}`}
                  className="aspect-square rounded-lg border border-dashed flex items-center justify-center"
                  style={{ borderColor: `${ACCENT_COLOR}20`, backgroundColor: `${ACCENT_COLOR}05` }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (cryptoKOLs.length + i) * 0.01 }}
                >
                  <Users className="w-3 h-3 text-white/10" />
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <CalendlyButton 
                className="inline-flex items-center gap-2 px-8 py-4 font-medium rounded-lg"
                style={{ backgroundColor: ACCENT_COLOR, color: '#000' }}
              >
                Access Full Network <ArrowRight className="w-4 h-4" />
              </CalendlyButton>
            </div>
          </div>
        </section>

        {/* More Services */}
        <section className="bg-[#0A0A0A] border-t border-white/10 py-20">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-mono text-white/40">04</span>
              <h2 className="text-xl font-medium text-white">More Services</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { slug: "community", title: "Community Management", color: "#5865F2" },
                { slug: "social-media", title: "Social Media Marketing", color: "#EC4899" },
                { slug: "influencer", title: "Influencer Strategy", color: "#F59E0B" },
                { slug: "gtm", title: "GTM Strategy", color: "#10B981" },
                { slug: "pr", title: "PR & Media", color: "#8B5CF6" },
              ].map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group p-6 border border-white/10 rounded-xl hover:border-white/30 transition-all duration-300"
                  style={{ ['--service-color' as string]: service.color }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white group-hover:text-[var(--service-color)] transition-colors">
                      {service.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[var(--service-color)] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default YapService;
