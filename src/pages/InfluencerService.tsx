import { useEffect, useRef, useState } from "react";
import { Star, Users, TrendingUp, Target, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

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
  { value: 83, label: "Verified KOL Network", suffix: "" },
  { value: 22.5, label: "Total Combined Reach", suffix: "M" },
  { value: 36, label: "Campaigns Executed", suffix: "" },
  { value: 4.7, label: "Avg. Engagement Rate", suffix: "%" },
];

const processSteps: ProcessStep[] = [
  { 
    number: "01", 
    title: "Discovery", 
    description: "We find the KOLs who speak your language and share your audience.", 
    icon: Target 
  },
  { 
    number: "02", 
    title: "Outreach", 
    description: "We handle the negotiations and align everyone on the mission.", 
    icon: Users 
  },
  { 
    number: "03", 
    title: "Activation", 
    description: "Content goes live across X, YouTube, and Telegram with real-time monitoring.", 
    icon: TrendingUp 
  },
  { 
    number: "04", 
    title: "Amplification", 
    description: "We analyze the wins and optimize for maximum lasting impact.", 
    icon: Sparkles 
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Smart Selection",
    items: [
      "The Shortlist: We don't just send a list; we curate a selection of KOLs who actually fit your project's vibe",
      "Vibe Check: We verify engagement rates and audience quality to make sure you're not paying for bots",
    ],
  },
  {
    title: "Full Management",
    items: [
      "Narrative Shaping: We help craft the messaging so the content feels organic, not like a scripted ad",
      "Coordination: We handle the outreach, the brief, and the posting schedule so you don't have to manage 20 different DM threads",
    ],
  },
  {
    title: "Data & Analytics",
    items: [
      "Performance Reports: See exactly how your campaign performed with clear ROI and engagement data",
      "Scaling Tips: We tell you which creators worked best and how to double down for the next round",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Do you have a specialized Korean KOL network?",
    answer: "Yes. Beyond the global names, we have deep ties with Korea's top crypto YouTubers, Telegram alpha callers, and Naver bloggers who dominate the local scene.",
  },
  {
    question: "What's the budget for a KOL campaign?",
    answer: "It varies. We can run anything from a targeted 'micro-KOL' blitz to a massive campaign with top-tier influencers. We'll help you build a plan that fits your goals.",
  },
  {
    question: "How do you measure success?",
    answer: "We look at more than just likes. We track reach, engagement quality, and sentiment to make sure people are actually talking about your project in a positive way.",
  },
  {
    question: "Is the content organic?",
    answer: "We prioritize authenticity. We work with KOLs who actually like your tech, so their threads and videos feel like a natural part of the conversation.",
  },
];

// Featured KOLs for carousel
const featuredKOLs = [
  { name: "Pentoshi", handle: "@Pentosh1", followers: "680K", expertise: "Trading", bio: "Crypto trader & investor. Top 10 most followed on CT." },
  { name: "Murad", handle: "@MustStopMurad", followers: "280K", expertise: "Memes", bio: "Memecoin connoisseur. Culture analyst." },
  { name: "Hsaka", handle: "@HsakaTrades", followers: "450K", expertise: "TA", bio: "Technical analyst. Chart wizard." },
  { name: "Route 2 FI", handle: "@Route2FI", followers: "280K", expertise: "DeFi", bio: "DeFi strategist. Yield optimizer." },
  { name: "Tetranode", handle: "@Tetranode", followers: "310K", expertise: "DeFi", bio: "DeFi power user. Protocol architect." },
];

// Full KOL Grid
const cryptoKOLs = [
  { name: "Coinboy", handle: "@coinboy717", followers: "50K", expertise: "Trading" },
  { name: "ONEMINNFT", handle: "@ONEMINNFT", followers: "45K", expertise: "NFT" },
  { name: "Nakju", handle: "@nakjumon", followers: "18.7K", expertise: "Trading" },
  { name: "KuiGas", handle: "@KuiGas", followers: "96K", expertise: "Research" },
  { name: "Jason Chen", handle: "@jason_chen998", followers: "90K", expertise: "Trading" },
  { name: "Calman", handle: "@CalmanBTC", followers: "70K", expertise: "BTC" },
  { name: "Phyrex", handle: "@Phyrex_Ni", followers: "333K", expertise: "Data" },
  { name: "Hebi", handle: "@hebi555", followers: "377K", expertise: "Trading" },
  { name: "Koji Higashi", handle: "@Coin_and_Peace", followers: "48K", expertise: "BTC" },
  { name: "DEG", handle: "@DEG_2020", followers: "32K", expertise: "Trading" },
  { name: "miin", handle: "@NftPinuts", followers: "85K", expertise: "NFT" },
  { name: "ikehaya", handle: "@IHayato", followers: "100K", expertise: "NFT" },
  { name: "Murad", handle: "@MustStopMurad", followers: "280K", expertise: "Memes" },
  { name: "Novogratz", handle: "@novogratz", followers: "450K", expertise: "Macro" },
  { name: "Sassano", handle: "@sassal0x", followers: "290K", expertise: "ETH" },
  { name: "Tone Vays", handle: "@ToneVays", followers: "280K", expertise: "Trading" },
  { name: "Nick Szabo", handle: "@NickSzabo4", followers: "340K", expertise: "BTC" },
  { name: "Frank", handle: "@frankdegods", followers: "390K", expertise: "NFT" },
  { name: "Route 2 FI", handle: "@Route2FI", followers: "280K", expertise: "DeFi" },
  { name: "CredibleCrypto", handle: "@CredibleCrypto", followers: "410K", expertise: "TA" },
  { name: "Crypto Birb", handle: "@crypto_birb", followers: "410K", expertise: "TA" },
  { name: "Altcoin Psycho", handle: "@AltcoinPsycho", followers: "295K", expertise: "Alt" },
  { name: "Trader XO", handle: "@TraderXO", followers: "290K", expertise: "TA" },
  { name: "SmartContracter", handle: "@SmartContracter", followers: "265K", expertise: "Trading" },
  { name: "DeFi Dad", handle: "@DeFi_Dad", followers: "240K", expertise: "DeFi" },
  { name: "Larry Cermak", handle: "@lawmaster", followers: "420K", expertise: "Data" },
  { name: "VentureCoinist", handle: "@VentureCoinist", followers: "210K", expertise: "VC" },
  { name: "inversebrah", handle: "@inversebrah", followers: "320K", expertise: "Memes" },
  { name: "GCR", handle: "@GCRClassic", followers: "290K", expertise: "Macro" },
  { name: "Hsaka", handle: "@HsakaTrades", followers: "450K", expertise: "TA" },
  { name: "Tetranode", handle: "@Tetranode", followers: "310K", expertise: "DeFi" },
  { name: "Andrew Kang", handle: "@Rewkang", followers: "340K", expertise: "VC" },
  { name: "Light", handle: "@LightCrypto", followers: "195K", expertise: "Trading" },
  { name: "Loomdart", handle: "@loomdart", followers: "380K", expertise: "DeFi" },
  { name: "Fiskantes", handle: "@Fiskantes", followers: "185K", expertise: "VC" },
  { name: "Gareth Soloway", handle: "@GarethSoloway", followers: "310K", expertise: "TA" },
  { name: "Thor", handle: "@ThorHartvigsen", followers: "95K", expertise: "DeFi" },
  { name: "Defi Edge", handle: "@thedefiedge", followers: "85K", expertise: "DeFi" },
  { name: "Taiki Maeda", handle: "@TaikiMaeda2", followers: "80K", expertise: "DeFi" },
  { name: "CryptoGodJohn", handle: "@CryptoGodJohn", followers: "45K", expertise: "Trading" },
  { name: "Posty", handle: "@PostyXBT", followers: "38K", expertise: "TA" },
  { name: "DegenSpartan", handle: "@DegenSpartan", followers: "42K", expertise: "DeFi" },
  { name: "Flood", handle: "@ThinkingUSD", followers: "35K", expertise: "Macro" },
  { name: "CryptoTony", handle: "@CryptoTony__", followers: "48K", expertise: "TA" },
  { name: "Rager", handle: "@Raboratory", followers: "125K", expertise: "Trading" },
  { name: "Bluntz", handle: "@Bluntz_Capital", followers: "180K", expertise: "TA" },
  { name: "Pentoshi", handle: "@Pentosh1", followers: "680K", expertise: "Trading" },
  { name: "ColdBloodShill", handle: "@ColdBloodShill", followers: "310K", expertise: "TA" },
  { name: "Daan Crypto", handle: "@DaanCrypto", followers: "380K", expertise: "Trading" },
  { name: "CryptoCred", handle: "@CryptoCred", followers: "290K", expertise: "TA" },
];

const InfluencerService = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const { isMobile, shouldDisableHeavyAnimations } = useMobileOptimization();

  usePageMeta({
    title: "Korea's Elite KOL Network & Web3 Influencer Marketing | ium Labs",
    description: "Access 70+ Korean and global crypto KOLs with 15M+ total reach. Data-driven influencer campaigns for DeFi, GameFi, and L2 projects.",
    path: "/services/influencer",
    image: "/og-image.png",
    keywords: ["Korean KOL Network", "Crypto Influencer Korea", "Web3 KOL Marketing", "YouTube Crypto Korea", "KOL Marketing Korea"]
  });

  // Sound wave animation - DISABLED on mobile for performance
  useEffect(() => {
    // Skip canvas animation on mobile to prevent phone shutdown
    if (isMobile || shouldDisableHeavyAnimations) return;

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
      
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(245, 158, 11, ${0.3 - layer * 0.1})`;
        ctx.lineWidth = 2 - layer * 0.5;
        
        for (let x = 0; x < width; x++) {
          const y = height / 2 + 
            Math.sin(x * 0.02 + time + layer) * (30 + layer * 10) +
            Math.sin(x * 0.01 + time * 0.5) * 15;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      
      time += 0.02;
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile, shouldDisableHeavyAnimations]);
  
  return (
    <ServicePageLayout
      serviceName="Influencer/KOL"
      serviceTitle="Influencer &"
      serviceSubtitle="KOL Network"
      serviceDescription="Get the right eyes on your project. We connect you with our hand-picked network of 70+ elite crypto KOLs, reaching over 15M+ followers across X, YouTube, and Telegram. We don't just 'shill'—we build narratives."
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
      {/* KOL Network Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="Featured Creators" badge="Global & Local Legends" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-4">
            <p className="text-white/60 text-sm max-w-3xl">
              From global giants like Pentoshi, Cobie, and Miles Deutscher to the most influential voices in the Korean market, we provide direct access to the creators who move the needle.
            </p>
          </div>

          <div className="py-8 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              {/* Featured KOLs Carousel */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white/60 text-xs uppercase tracking-wider">Featured Creators</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFeaturedIndex(prev => prev === 0 ? featuredKOLs.length - 1 : prev - 1)}
                      className="p-2 rounded-full border border-white/20 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4 text-white/60" />
                    </button>
                    <button
                      onClick={() => setFeaturedIndex(prev => (prev + 1) % featuredKOLs.length)}
                      className="p-2 rounded-full border border-white/20 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all"
                    >
                      <ChevronRight className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                </div>
                
                <div className="relative overflow-hidden">
                  <a
                    key={featuredIndex}
                    href={`https://x.com/${featuredKOLs[featuredIndex].handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all block"
                  >
                    <div 
                      className="w-20 h-20 rounded-full overflow-hidden border-2 flex-shrink-0"
                      style={{ borderColor: ACCENT_COLOR }}
                    >
                      <img 
                        src={`https://unavatar.io/twitter/${featuredKOLs[featuredIndex].handle.replace('@', '')}`}
                        alt={featuredKOLs[featuredIndex].name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(featuredKOLs[featuredIndex].name)}&backgroundColor=0a0a0a`;
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <h4 className="text-white font-bold text-lg">{featuredKOLs[featuredIndex].name}</h4>
                        <span className="text-amber-400 text-xs">{featuredKOLs[featuredIndex].handle}</span>
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}
                        >
                          {featuredKOLs[featuredIndex].expertise}
                        </span>
                      </div>
                      <p className="text-white/60 mb-2">{featuredKOLs[featuredIndex].bio}</p>
                      <p className="text-white/40 text-sm">{featuredKOLs[featuredIndex].followers} followers</p>
                    </div>
                  </a>
                  
                  {/* Pagination dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {featuredKOLs.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFeaturedIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          featuredIndex === idx 
                            ? 'w-6 bg-amber-500' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sound Wave Canvas */}
              <div className="relative h-16 mb-8">
                <canvas 
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full opacity-60"
                />
              </div>

              {/* KOL Avatar Grid */}
              <div className="grid grid-cols-6 md:grid-cols-10 gap-2 md:gap-3">
                {cryptoKOLs.map((kol) => {
                  const avatarUrl = `https://unavatar.io/twitter/${kol.handle.replace('@', '')}`;
                  const fallbackUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=0a0a0a`;
                  const twitterUrl = `https://x.com/${kol.handle.replace('@', '')}`;
                  
                  return (
                    <a
                      key={kol.handle}
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square"
                    >
                      <div 
                        className="w-full h-full rounded-xl overflow-hidden border-2 transition-all duration-300 group-hover:scale-105"
                        style={{ 
                          borderColor: `${ACCENT_COLOR}30`,
                          backgroundColor: '#0a0a0a'
                        }}
                      >
                        <img 
                          src={avatarUrl}
                          alt={kol.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = fallbackUrl;
                          }}
                        />
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-1 rounded-xl">
                          <span className="text-[9px] font-medium text-white text-center">{kol.name}</span>
                          <span className="text-[7px] text-amber-400 text-center">{kol.followers}</span>
                          <span 
                            className="text-[6px] px-1.5 py-0.5 rounded-full mt-0.5"
                            style={{ backgroundColor: `${ACCENT_COLOR}30`, color: ACCENT_COLOR }}
                          >
                            {kol.expertise}
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <p className="text-center text-white/40 text-sm mt-8">
                70+ elite KOLs ready to amplify your project · Click to view on 𝕏
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