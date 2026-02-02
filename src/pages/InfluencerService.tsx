import { useEffect, useRef, useState } from "react";
import { Star, Users, TrendingUp, Target, Sparkles, ChevronDown } from "lucide-react";
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

// Full KOL Grid - X (Twitter) KOLs
const twitterKOLs = [
  { name: "Coinboy", handle: "@coinboy717", followers: "50K", expertise: "Trading", platform: "x" },
  { name: "ONEMINNFT", handle: "@ONEMINNFT", followers: "45K", expertise: "NFT", platform: "x" },
  { name: "Nakju", handle: "@nakjumon", followers: "18.7K", expertise: "Trading", platform: "x" },
  { name: "KuiGas", handle: "@KuiGas", followers: "96K", expertise: "Research", platform: "x" },
  { name: "Jason Chen", handle: "@jason_chen998", followers: "90K", expertise: "Trading", platform: "x" },
  { name: "Calman", handle: "@CalmanBTC", followers: "70K", expertise: "BTC", platform: "x" },
  { name: "Phyrex", handle: "@Phyrex_Ni", followers: "333K", expertise: "Data", platform: "x" },
  { name: "Hebi", handle: "@hebi555", followers: "377K", expertise: "Trading", platform: "x" },
  { name: "Koji Higashi", handle: "@Coin_and_Peace", followers: "48K", expertise: "BTC", platform: "x" },
  { name: "DEG", handle: "@DEG_2020", followers: "32K", expertise: "Trading", platform: "x" },
  { name: "miin", handle: "@NftPinuts", followers: "85K", expertise: "NFT", platform: "x" },
  { name: "ikehaya", handle: "@IHayato", followers: "100K", expertise: "NFT", platform: "x" },
  { name: "Murad", handle: "@MustStopMurad", followers: "280K", expertise: "Memes", platform: "x" },
  { name: "Novogratz", handle: "@novogratz", followers: "450K", expertise: "Macro", platform: "x" },
  { name: "Sassano", handle: "@sassal0x", followers: "290K", expertise: "ETH", platform: "x" },
  { name: "Tone Vays", handle: "@ToneVays", followers: "280K", expertise: "Trading", platform: "x" },
  { name: "Nick Szabo", handle: "@NickSzabo4", followers: "340K", expertise: "BTC", platform: "x" },
  { name: "Frank", handle: "@frankdegods", followers: "390K", expertise: "NFT", platform: "x" },
  { name: "Route 2 FI", handle: "@Route2FI", followers: "280K", expertise: "DeFi", platform: "x" },
  { name: "CredibleCrypto", handle: "@CredibleCrypto", followers: "410K", expertise: "TA", platform: "x" },
  { name: "Crypto Birb", handle: "@crypto_birb", followers: "410K", expertise: "TA", platform: "x" },
  { name: "Altcoin Psycho", handle: "@AltcoinPsycho", followers: "295K", expertise: "Alt", platform: "x" },
  { name: "Trader XO", handle: "@TraderXO", followers: "290K", expertise: "TA", platform: "x" },
  { name: "SmartContracter", handle: "@SmartContracter", followers: "265K", expertise: "Trading", platform: "x" },
  { name: "DeFi Dad", handle: "@DeFi_Dad", followers: "240K", expertise: "DeFi", platform: "x" },
  { name: "Larry Cermak", handle: "@lawmaster", followers: "420K", expertise: "Data", platform: "x" },
  { name: "VentureCoinist", handle: "@VentureCoinist", followers: "210K", expertise: "VC", platform: "x" },
  { name: "inversebrah", handle: "@inversebrah", followers: "320K", expertise: "Memes", platform: "x" },
  { name: "GCR", handle: "@GCRClassic", followers: "290K", expertise: "Macro", platform: "x" },
  
  { name: "Andrew Kang", handle: "@Rewkang", followers: "340K", expertise: "VC", platform: "x" },
  { name: "Light", handle: "@LightCrypto", followers: "195K", expertise: "Trading", platform: "x" },
  { name: "Loomdart", handle: "@loomdart", followers: "380K", expertise: "DeFi", platform: "x" },
  { name: "Fiskantes", handle: "@Fiskantes", followers: "185K", expertise: "VC", platform: "x" },
  { name: "Gareth Soloway", handle: "@GarethSoloway", followers: "310K", expertise: "TA", platform: "x" },
  { name: "Defi Edge", handle: "@thedefiedge", followers: "85K", expertise: "DeFi", platform: "x" },
  { name: "Taiki Maeda", handle: "@TaikiMaeda2", followers: "80K", expertise: "DeFi", platform: "x" },
  { name: "CryptoGodJohn", handle: "@CryptoGodJohn", followers: "45K", expertise: "Trading", platform: "x" },
  { name: "Posty", handle: "@PostyXBT", followers: "38K", expertise: "TA", platform: "x" },
  { name: "DegenSpartan", handle: "@DegenSpartan", followers: "42K", expertise: "DeFi", platform: "x" },
  { name: "Flood", handle: "@ThinkingUSD", followers: "35K", expertise: "Macro", platform: "x" },
  { name: "CryptoTony", handle: "@CryptoTony__", followers: "48K", expertise: "TA", platform: "x" },
  { name: "Rager", handle: "@Raboratory", followers: "125K", expertise: "Trading", platform: "x" },
  { name: "Bluntz", handle: "@Bluntz_Capital", followers: "180K", expertise: "TA", platform: "x" },
  { name: "Pentoshi", handle: "@Pentosh1", followers: "680K", expertise: "Trading", platform: "x" },
  { name: "ColdBloodShill", handle: "@ColdBloodShill", followers: "310K", expertise: "TA", platform: "x" },
  { name: "Daan Crypto", handle: "@DaanCrypto", followers: "380K", expertise: "Trading", platform: "x" },
  { name: "CryptoCred", handle: "@CryptoCred", followers: "290K", expertise: "TA", platform: "x" },
];

// Telegram KOLs (Korean)
const telegramKOLs = [
  { name: "변창호 코인사관학교", handle: "@bchosn", followers: "Top", expertise: "리서치", platform: "telegram" },
  { name: "DeFi 농부 조선생", handle: "@bsc_farmer_kr", followers: "50K+", expertise: "DeFi", platform: "telegram" },
  { name: "매실남", handle: "@waitstudy", followers: "30K+", expertise: "Trading", platform: "telegram" },
  { name: "잼민123", handle: "@mujammin123", followers: "25K+", expertise: "에어드랍", platform: "telegram" },
  { name: "해달의 투자 정보", handle: "@seaotterbtc", followers: "20K+", expertise: "시황", platform: "telegram" },
  { name: "차설 텔레그램", handle: "@chasul_trader", followers: "40K+", expertise: "TA", platform: "telegram" },
  { name: "머피", handle: "@murphybus", followers: "35K+", expertise: "Macro", platform: "telegram" },
  { name: "불개미 CRYPTO", handle: "@fireantcrypto", followers: "30K+", expertise: "초기투자", platform: "telegram" },
  { name: "차분남", handle: "@chavoonnam", followers: "25K+", expertise: "TA", platform: "telegram" },
  { name: "훈쌤의 차트 공부방", handle: "@hoon_trading", followers: "20K+", expertise: "교육", platform: "telegram" },
  { name: "베이지컬리", handle: "@basixally", followers: "15K+", expertise: "BTC", platform: "telegram" },
  { name: "젠티(Jenti)", handle: "@jenti_defi", followers: "18K+", expertise: "DeFi", platform: "telegram" },
  { name: "치코의 택배상자", handle: "@chikointhebox", followers: "15K+", expertise: "에어드랍", platform: "telegram" },
  // 추가 텔레그램 KOLs
  { name: "판테라의 ICO", handle: "@panteraico", followers: "Top", expertise: "ICO/IDO", platform: "telegram" },
  { name: "세나 리서치", handle: "@researchsena", followers: "50K+", expertise: "리서치", platform: "telegram" },
  { name: "비연세 학사 과정", handle: "@bityonsei", followers: "40K+", expertise: "시황분석", platform: "telegram" },
  { name: "치과아저씨의 투자 스케일링", handle: "@teamyonseident", followers: "25K+", expertise: "가치투자", platform: "telegram" },
  { name: "흑우냠냠의 흑우농장", handle: "@c0wfarm", followers: "35K+", expertise: "에어드랍", platform: "telegram" },
  { name: "크립토마카세", handle: "@cryptomacase", followers: "30K+", expertise: "온체인", platform: "telegram" },
  { name: "SB Crypto", handle: "@web3subin", followers: "25K+", expertise: "Web3", platform: "telegram" },
  { name: "SEALCRYPTO ONCHAIN", handle: "@sealcryptocvd", followers: "35K+", expertise: "온체인", platform: "telegram" },
  { name: "돌비콩의 코인정복", handle: "@dolbikong", followers: "25K+", expertise: "뉴스", platform: "telegram" },
  { name: "노스트라다무스 관점방", handle: "@nostradamousbtc", followers: "40K+", expertise: "TA", platform: "telegram" },
  { name: "Joshua 득", handle: "@joshuadeukkor", followers: "35K+", expertise: "Macro", platform: "telegram" },
  { name: "사스케의 차트 조각들", handle: "@sasukechart", followers: "20K+", expertise: "TA", platform: "telegram" },
  { name: "뀨's 데일리 WEB3", handle: "@ggyuweb3", followers: "25K+", expertise: "Web3", platform: "telegram" },
];

// Combined KOL list
const cryptoKOLs = [...twitterKOLs, ...telegramKOLs];

// KOL Avatar Grid with fade effect
const KOLAvatarGrid = ({ kols, accentColor }: { kols: typeof cryptoKOLs; accentColor: string }) => {
  const [showAll, setShowAll] = useState(false);
  const { isMobile } = useMobileOptimization();
  
  // 5 rows: mobile 6 cols = 30, desktop 10 cols = 50
  const itemsPerRow = isMobile ? 6 : 10;
  const visibleRows = 5;
  const visibleCount = itemsPerRow * visibleRows;
  
  const displayedKOLs = showAll ? kols : kols.slice(0, visibleCount);
  const hasMore = kols.length > visibleCount;
  
  return (
    <div className="relative">
      <div className={`grid grid-cols-6 md:grid-cols-10 gap-2 md:gap-3 ${!showAll && hasMore ? 'pb-0' : ''}`}>
        {displayedKOLs.map((kol, index) => {
          const isTelegram = kol.platform === 'telegram';
          const avatarUrl = isTelegram 
            ? `https://unavatar.io/telegram/${kol.handle.replace('@', '')}`
            : `https://unavatar.io/twitter/${kol.handle.replace('@', '')}`;
          const fallbackUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=0a0a0a`;
          const profileUrl = isTelegram 
            ? `https://t.me/${kol.handle.replace('@', '')}`
            : `https://x.com/${kol.handle.replace('@', '')}`;
          
          // Last row fade effect
          const isInLastRow = !showAll && hasMore && index >= (visibleRows - 1) * itemsPerRow;
          
          return (
            <a
              key={kol.handle}
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square"
              style={{
                opacity: isInLastRow ? 0.3 : 1,
                transition: 'opacity 0.3s ease'
              }}
            >
              <div 
                className="w-full h-full rounded-xl overflow-hidden border-2 transition-all duration-300 group-hover:scale-105"
                style={{ 
                  borderColor: isTelegram ? '#0088cc30' : `${accentColor}30`,
                  backgroundColor: '#0a0a0a'
                }}
              >
                <img 
                  src={avatarUrl}
                  alt={kol.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = fallbackUrl;
                  }}
                />
              </div>
              
              {/* Hover Info */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex flex-col items-center justify-center p-1">
                <span className="text-white text-[10px] md:text-xs font-medium text-center truncate w-full px-1">{kol.name}</span>
                <span className="text-white/60 text-[8px] md:text-[10px] truncate w-full text-center">{kol.handle}</span>
                {isTelegram && (
                  <span className="text-sky-400 text-[8px] mt-0.5">TG</span>
                )}
              </div>
            </a>
          );
        })}
      </div>
      
      {/* Fade Overlay & Show More */}
      {!showAll && hasMore && (
        <div className="relative mt-0">
          <div className="absolute -top-20 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
          <button
            onClick={() => setShowAll(true)}
            className="w-full py-4 flex items-center justify-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <span className="text-sm">Show all {kols.length} KOLs</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {showAll && hasMore && (
        <button
          onClick={() => setShowAll(false)}
          className="w-full py-4 flex items-center justify-center gap-2 text-white/60 hover:text-white transition-colors mt-4"
        >
          <span className="text-sm">Show less</span>
          <ChevronDown className="w-4 h-4 rotate-180" />
        </button>
      )}
    </div>
  );
};

const InfluencerService = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      <section className="bg-[#0A0A0A]">
        <div className="border-t border-white/[0.06]">
          <SectionHeader title="Featured Creators" badge="Global & Local Legends" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-4">
            <p className="text-white/50 text-sm max-w-3xl">
              From global giants like Pentoshi, Cobie, and Miles Deutscher to the most influential voices in the Korean market, we provide direct access to the creators who move the needle.
            </p>
          </div>

          <div className="py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              <KOLAvatarGrid kols={cryptoKOLs} accentColor={ACCENT_COLOR} />
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