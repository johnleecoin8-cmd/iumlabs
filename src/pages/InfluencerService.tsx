import { useState, useEffect, useRef } from "react";
import { Star, Users, TrendingUp, Target, Sparkles, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

const ACCENT_COLOR = "#F59E0B";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "Influencer Marketing", url: "https://iumlabs.io/services/influencer" }
];

const serviceTags: ServiceTag[] = [
  { label: "Global KOL" },
  { label: "Korean KOL" },
  { label: "Campaign Strategy" },
  { label: "Content Coordination" },
  { label: "Performance Tracking" },
  { label: "Korean YouTubers/Bloggers" },
];

const stats: ServiceStat[] = [
  { value: 70, label: "KOL Network", suffix: "+" },
  { value: 15, label: "Total Reach", suffix: "M+" },
  { value: 15, label: "Campaigns Delivered", suffix: "+" },
  { value: 4, label: "Avg Engagement", suffix: "x" },
];

const processSteps: ProcessStep[] = [
  { 
    number: "01", 
    title: "Discovery", 
    description: "Identify ideal KOL profiles matching your project's narrative and target audience.", 
    icon: Target 
  },
  { 
    number: "02", 
    title: "Outreach", 
    description: "Negotiate terms, align on messaging, and coordinate campaign timelines.", 
    icon: Users 
  },
  { 
    number: "03", 
    title: "Activation", 
    description: "Launch coordinated content across platforms with real-time monitoring.", 
    icon: TrendingUp 
  },
  { 
    number: "04", 
    title: "Amplification", 
    description: "Analyze performance and optimize for maximum reach and engagement.", 
    icon: Sparkles 
  },
];

const deliverables: Deliverable[] = [
  {
    title: "KOL Selection",
    items: [
      "Curated KOL shortlist",
      "Audience analysis report",
      "Engagement rate verification",
      "Brand fit assessment",
    ],
  },
  {
    title: "Campaign Management",
    items: [
      "Messaging & brief creation",
      "Content approval workflow",
      "Posting schedule coordination",
      "Real-time monitoring",
    ],
  },
  {
    title: "Reporting & Analytics",
    items: [
      "Campaign performance report",
      "ROI analysis",
      "Audience insights",
      "Recommendations for scale",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Do you have a Korean KOL network?",
    answer: "Yes, we have a network of 50+ Korean crypto KOLs specializing in DeFi, NFT, trading, and research. We also connect you with bilingual Korean/English KOLs.",
  },
  {
    question: "Do you work with Korean YouTubers and bloggers?",
    answer: "Absolutely. We have an influencer network on Korean local platforms including Naver Blog, YouTube crypto channels, and Tistory. This enables effective content distribution for Korean SEO.",
  },
  {
    question: "What's the typical KOL campaign budget?",
    answer: "Budgets vary by KOL tier and campaign scope. Micro-influencer campaigns start from $5K, while multi-KOL launches can range $100K+. We recommend optimal combinations based on your goals.",
  },
  {
    question: "How do you measure campaign performance?",
    answer: "We track impressions, engagement rate, follower growth, website traffic, and community signups. For token projects, we also correlate with on-chain metrics like holder growth.",
  },
];

// KOL data with categories
const kolProfiles = [
  // Global KOLs - Tier 1
  { name: "Pentoshi", handle: "@Pentosh1", followers: "610K", expertise: "Trading", region: "Global" },
  { name: "Hsaka", handle: "@HsakaTrades", followers: "450K", expertise: "TA", region: "Global" },
  { name: "Daan Crypto", handle: "@DaanCrypto", followers: "380K", expertise: "Trading", region: "Global" },
  { name: "ColdBloodShill", handle: "@ColdBloodShill", followers: "310K", expertise: "TA", region: "Global" },
  { name: "Tetranode", handle: "@Tetranode", followers: "310K", expertise: "DeFi", region: "Global" },
  { name: "Route 2 FI", handle: "@Route2FI", followers: "280K", expertise: "DeFi", region: "Global" },
  { name: "Cobie", handle: "@coaborting", followers: "740K", expertise: "Commentary", region: "Global" },
  { name: "Bluntz", handle: "@Bluntz_Capital", followers: "290K", expertise: "TA", region: "Global" },
  { name: "Crypto Birb", handle: "@crypto_birb", followers: "710K", expertise: "TA", region: "Global" },
  { name: "Tyler", handle: "@ApeDurden", followers: "185K", expertise: "Trading", region: "Global" },
  // Global KOLs - Tier 2
  { name: "Kaleo", handle: "@CryptoKaleo", followers: "580K", expertise: "Trading", region: "Global" },
  { name: "SmartContracter", handle: "@SmartContracter", followers: "250K", expertise: "TA", region: "Global" },
  { name: "Loomdart", handle: "@loomdart", followers: "180K", expertise: "DeFi", region: "Global" },
  { name: "Ansem", handle: "@blaborance", followers: "520K", expertise: "Memecoins", region: "Global" },
  { name: "Crypto Tony", handle: "@CryptoTony__", followers: "410K", expertise: "TA", region: "Global" },
  { name: "The DeFi Edge", handle: "@thedefiedge", followers: "390K", expertise: "DeFi", region: "Global" },
  { name: "Miles Deutscher", handle: "@milesdeutscher", followers: "560K", expertise: "Research", region: "Global" },
  { name: "Crypto Rover", handle: "@rovercrc", followers: "480K", expertise: "News", region: "Global" },
  // Global KOLs - Tier 3
  { name: "Crypto Rand", handle: "@crypto_rand", followers: "620K", expertise: "Trading", region: "Global" },
  { name: "Lark Davis", handle: "@TheCryptoLark", followers: "510K", expertise: "Education", region: "Global" },
  { name: "Jacob Bury", handle: "@JacobCryptoBury", followers: "170K", expertise: "Research", region: "Global" },
  { name: "Crypto Banter", handle: "@cryptobanter", followers: "680K", expertise: "News", region: "Global" },
  { name: "DeFi Dad", handle: "@DeFi_Dad", followers: "140K", expertise: "DeFi", region: "Global" },
  { name: "Crypto Wendy", handle: "@CryptoWendyO", followers: "320K", expertise: "Education", region: "Global" },
  // Korean KOLs - Tier 1
  { name: "CryptoQuant", handle: "@cryptoquant_com", followers: "280K", expertise: "On-chain", region: "Korean" },
  { name: "Phyrex", handle: "@Phyrex_Ni", followers: "333K", expertise: "Data", region: "Korean" },
  { name: "Hebi", handle: "@hebi555", followers: "377K", expertise: "Trading", region: "Korean" },
  { name: "KuiGas", handle: "@KuiGas", followers: "96K", expertise: "Research", region: "Korean" },
  { name: "Coinboy", handle: "@coinboy717", followers: "50K", expertise: "Trading", region: "Korean" },
  { name: "Nakju", handle: "@nakjumon", followers: "18.7K", expertise: "Trading", region: "Korean" },
  // Korean KOLs - Tier 2
  { name: "코인니스", handle: "@Coinness_ko", followers: "85K", expertise: "News", region: "Korean" },
  { name: "비트코인갤러리", handle: "@btcgall", followers: "45K", expertise: "Community", region: "Korean" },
  { name: "코인연구", handle: "@coin_study", followers: "32K", expertise: "Research", region: "Korean" },
  { name: "크립토문", handle: "@cryptomoon_kr", followers: "28K", expertise: "Trading", region: "Korean" },
  { name: "디파이코리아", handle: "@defi_korea", followers: "22K", expertise: "DeFi", region: "Korean" },
  { name: "NFT서울", handle: "@nft_seoul", followers: "19K", expertise: "NFT", region: "Korean" },
];

// Get unique expertise categories
const expertiseCategories = ["All", ...Array.from(new Set(kolProfiles.map(k => k.expertise)))];
const regionCategories = ["All", "Global", "Korean"];

// Network visualization component
const KOLNetworkVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedKOL, setSelectedKOL] = useState<typeof kolProfiles[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeRegion, setActiveRegion] = useState("All");
  const [totalReach, setTotalReach] = useState(0);
  const [animatedReach, setAnimatedReach] = useState(0);

  // Filter KOLs based on selection
  const filteredKOLs = kolProfiles.filter(kol => {
    const expertiseMatch = activeFilter === "All" || kol.expertise === activeFilter;
    const regionMatch = activeRegion === "All" || kol.region === activeRegion;
    return expertiseMatch && regionMatch;
  });

  // Calculate reach
  useEffect(() => {
    const reach = filteredKOLs.reduce((sum, kol) => {
      const numStr = kol.followers.replace(/[KM+]/g, '');
      const multiplier = kol.followers.includes('M') ? 1000000 : kol.followers.includes('K') ? 1000 : 1;
      return sum + (parseFloat(numStr) * multiplier);
    }, 0);
    setTotalReach(reach);
  }, [filteredKOLs]);

  // Animate reach counter
  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const startValue = animatedReach;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedReach(Math.floor(startValue + (totalReach - startValue) * eased));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [totalReach]);

  // Canvas animation for network lines
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
    
    let animationFrame: number;
    let time = 0;
    
    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;
      
      // Draw connection lines from center
      filteredKOLs.slice(0, 12).forEach((_, index) => {
        const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
        const radius = Math.min(centerX, centerY) * 0.7;
        const endX = centerX + Math.cos(angle) * radius;
        const endY = centerY + Math.sin(angle) * radius;
        
        // Animated pulse along line
        const pulsePos = (time * 0.3 + index * 0.1) % 1;
        const pulseX = centerX + (endX - centerX) * pulsePos;
        const pulseY = centerY + (endY - centerY) * pulsePos;
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(245, 158, 11, 0.15)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw pulse
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${0.8 - pulsePos * 0.6})`;
        ctx.fill();
      });
      
      // Draw center node
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [filteredKOLs]);

  const formatReach = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="relative">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <div className="flex items-center gap-2 mr-4">
          <Filter className="w-4 h-4 text-white/50" />
          <span className="text-xs text-white/50 uppercase tracking-wider">Filter</span>
        </div>
        
        {/* Region Filter */}
        <div className="flex gap-1.5 mr-4">
          {regionCategories.map(region => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                activeRegion === region 
                  ? 'bg-amber-500 text-black font-medium' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
        
        {/* Expertise Filter */}
        <div className="flex flex-wrap gap-1.5">
          {expertiseCategories.slice(0, 8).map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-2.5 py-1 text-[10px] rounded-full transition-all ${
                activeFilter === category 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' 
                  : 'bg-white/5 text-white/40 hover:bg-white/10 border border-transparent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Network Visualization Area */}
      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden">
        {/* Canvas for network lines */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.8 }}
        />
        
        {/* Center Hub - Your Project */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/10 border-2 border-amber-500/50 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-amber-400 text-[10px] font-medium">YOUR</div>
              <div className="text-white text-xs font-bold">PROJECT</div>
            </div>
          </motion.div>
        </div>

        {/* KOL Grid Orbiting */}
        <div className="relative h-[400px] sm:h-[450px] md:h-[500px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full max-w-[600px] mx-auto">
              <AnimatePresence mode="popLayout">
                {filteredKOLs.slice(0, 12).map((kol, index) => {
                  const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
                  const radius = 42;
                  const x = 50 + Math.cos(angle) * radius;
                  const y = 50 + Math.sin(angle) * radius;
                  
                  return (
                    <motion.div
                      key={kol.handle}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onMouseEnter={() => setSelectedKOL(kol)}
                      onMouseLeave={() => setSelectedKOL(null)}
                    >
                      <a
                        href={`https://x.com/${kol.handle.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                          selectedKOL?.handle === kol.handle 
                            ? 'border-amber-400 shadow-lg shadow-amber-500/30' 
                            : 'border-white/20 hover:border-amber-400/50'
                        }`}
                      >
                        <img 
                          src={`https://unavatar.io/twitter/${kol.handle.replace('@', '')}`}
                          alt={kol.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=1a1a1a`;
                          }}
                        />
                      </a>
                      
                      {/* Tooltip */}
                      <AnimatePresence>
                        {selectedKOL?.handle === kol.handle && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 rounded-lg bg-black/90 border border-white/20 whitespace-nowrap z-30"
                          >
                            <div className="text-sm font-medium text-white">{kol.name}</div>
                            <div className="text-xs text-amber-400">{kol.handle}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-white/60">{kol.followers}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                                {kol.expertise}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0F0F0F] to-transparent">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-400">
                {filteredKOLs.length}
              </div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider">KOLs Selected</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {formatReach(animatedReach)}
              </div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider">Total Reach</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400">
                4.2x
              </div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider">Avg Engagement</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional KOL Grid */}
      <div className="mt-6">
        <div className="text-xs text-white/40 mb-3">+{Math.max(0, filteredKOLs.length - 12)} more in network</div>
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
          {filteredKOLs.slice(12, 24).map((kol, index) => (
            <motion.a
              key={kol.handle}
              href={`https://x.com/${kol.handle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              transition={{ delay: index * 0.03 }}
              className="w-8 h-8 rounded-full overflow-hidden border border-white/10 hover:border-amber-400/50"
            >
              <img 
                src={`https://unavatar.io/twitter/${kol.handle.replace('@', '')}`}
                alt={kol.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=1a1a1a`;
                }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

const InfluencerService = () => {
  usePageMeta({
    title: "Korea Crypto KOL Marketing & Web3 Influencer Agency",
    description: "Access top Korea Crypto KOLs and Web3 influencers. Our data-driven campaign management ensures high-impact marketing for DeFi, GameFi, and L2 projects.",
    path: "/services/influencer",
    image: "/og-image.png"
  });
  
  return (
    <ServicePageLayout
      serviceName="Influencer/KOL"
      serviceTitle="Access Our"
      serviceSubtitle="KOL Network"
      serviceDescription="Access our exclusive network of 70+ crypto KOLs and reach 15M+ engaged followers across X, YouTube, and Telegram."
      serviceIcon={Star}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      videoSrc="/videos/influencer-hero.mp4"
      posterSrc="/images/posters/influencer-hero.jpg"
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="influencer"
    >
      {/* Interactive KOL Network Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="KOL Network" badge="Interactive Map" />

          <div className="py-6 sm:py-10 md:py-14">
            <div className="container mx-auto px-3 sm:px-6 lg:px-16">
              <KOLNetworkVisualization />
              
              <p className="text-center text-white/40 text-xs sm:text-sm mt-6 sm:mt-8">
                Hover to explore · Click to view on 𝕏 · Filter by category
              </p>
            </div>
          </div>
        </div>
      </section>

      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Korean Crypto KOL Marketing"
        description="Access 70+ Korean and global crypto KOLs with 15M+ total reach. Korean Web3 marketing through strategic influencer campaigns."
        url="/services/influencer"
        serviceType={["KOL Marketing", "Influencer Marketing", "Crypto Marketing", "Web3 Marketing"]}
      />
    </ServicePageLayout>
  );
};

export default InfluencerService;