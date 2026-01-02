import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Volume2, Users, Zap, FileText, Target } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

const ACCENT_COLOR = "#22D3EE";

const serviceTags: ServiceTag[] = [
  { label: "Yapper Network" },
  { label: "Organic Buzz" },
  { label: "Thread Campaigns" },
  { label: "Mindshare Growth" },
  { label: "Quote RT Strategy" },
  { label: "Meme Content" },
];

const stats: ServiceStat[] = [
  { value: 150, label: "Yapper Network", suffix: "+" },
  { value: 3, label: "Total Reach", suffix: "M+" },
  { value: 12, label: "Campaigns Delivered", suffix: "+" },
  { value: 3, label: "Avg Engagement", suffix: "x" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Strategy & Onboarding",
    description: "We align on your goals, messaging, timing, and target audiences. Then we define campaign angles and prepare materials.",
    icon: Target,
  },
  {
    number: "02",
    title: "Campaign Setup",
    description: "We publish the briefing to our 150+ Yap Circle creators — inviting them to participate based on interest and fit.",
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

const deliverables: Deliverable[] = [
  {
    title: "Campaign Materials",
    items: [
      "Campaign brief & guidelines",
      "Key messaging points",
      "Visual assets & templates",
      "Hashtag strategy",
    ],
  },
  {
    title: "Creator Coordination",
    items: [
      "150+ yapper activation",
      "Content quality review",
      "Posting schedule management",
      "Real-time amplification",
    ],
  },
  {
    title: "Performance Tracking",
    items: [
      "Impression tracking",
      "Engagement metrics",
      "Top performer highlights",
      "Campaign summary report",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What's the difference between Yap and KOL marketing?",
    answer: "Yap marketing focuses on creating organic buzz through many smaller creators (yappers) rather than relying on a few large influencers. This creates more authentic engagement and wider reach across different communities.",
  },
  {
    question: "How do you ensure content quality from 150+ creators?",
    answer: "We provide clear briefs and guidelines, and our team reviews content before amplification. Creators in our 150+ network are vetted for quality and authentic engagement.",
  },
  {
    question: "How long does a typical Yap campaign run?",
    answer: "Standard campaigns run 1-2 weeks with concentrated posting periods. We can also run extended campaigns for ongoing mindshare building around key milestones.",
  },
  {
    question: "Can you target specific crypto niches?",
    answer: "Yes! Our network includes creators across DeFi, NFT, trading, research, memes, and regional communities. We match your campaign with the most relevant creator segments.",
  },
];

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

// Featured yappers for carousel - Using verifiable accounts
const featuredYappers = [
  { name: "Pentoshi", handle: "@Pentosh1", followers: "680K", expertise: "Trading", bio: "Crypto trader & investor. Top 10 most followed on CT." },
  { name: "Murad", handle: "@MustStopMurad", followers: "280K", expertise: "Memes", bio: "Memecoin connoisseur. Culture analyst." },
  { name: "Hsaka", handle: "@HsakaTrades", followers: "450K", expertise: "TA", bio: "Technical analyst. Chart wizard." },
  { name: "Route 2 FI", handle: "@Route2FI", followers: "280K", expertise: "DeFi", bio: "DeFi strategist. Yield optimizer." },
  { name: "Tetranode", handle: "@Tetranode", followers: "310K", expertise: "DeFi", bio: "DeFi power user. Protocol architect." },
];

const YapService = () => {
  usePageTitle("Yap Strategy");
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

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
    <ServicePageLayout
      serviceName="Yap Strategy"
      serviceTitle="Yap"
      serviceSubtitle="Strategy"
      serviceDescription="Amplify your message with 150+ aligned yappers — driving mindshare and organic buzz across Crypto X."
      serviceIcon={Volume2}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="yap"
    >
      {/* Creator Network Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="Creator Network" badge="150+ Yappers" />

          <div className="py-10 md:py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              {/* Featured Yappers Carousel */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white/60 text-xs uppercase tracking-wider">Featured Creators</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFeaturedIndex(prev => prev === 0 ? featuredYappers.length - 1 : prev - 1)}
                      className="p-2 rounded-full border border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4 text-white/60" />
                    </button>
                    <button
                      onClick={() => setFeaturedIndex(prev => (prev + 1) % featuredYappers.length)}
                      className="p-2 rounded-full border border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                    >
                      <ChevronRight className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                </div>
                
                <div className="relative overflow-hidden">
                  <a
                    key={featuredIndex}
                    href={`https://x.com/${featuredYappers[featuredIndex].handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all block"
                  >
                    <div 
                      className="w-20 h-20 rounded-full overflow-hidden border-2 flex-shrink-0"
                      style={{ borderColor: ACCENT_COLOR }}
                    >
                      <img 
                        src={`https://unavatar.io/twitter/${featuredYappers[featuredIndex].handle.replace('@', '')}`}
                        alt={featuredYappers[featuredIndex].name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(featuredYappers[featuredIndex].name)}&backgroundColor=0a0a0a`;
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <h4 className="text-white font-bold text-lg">{featuredYappers[featuredIndex].name}</h4>
                        <span className="text-cyan-400 text-xs">{featuredYappers[featuredIndex].handle}</span>
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}
                        >
                          {featuredYappers[featuredIndex].expertise}
                        </span>
                      </div>
                      <p className="text-white/60 mb-2">{featuredYappers[featuredIndex].bio}</p>
                      <p className="text-white/40 text-sm">{featuredYappers[featuredIndex].followers} followers</p>
                    </div>
                  </a>
                  
                  {/* Pagination dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {featuredYappers.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFeaturedIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          featuredIndex === idx 
                            ? 'w-6 bg-cyan-500' 
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
                          <span className="text-[7px] text-cyan-400 text-center">{kol.followers}</span>
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
                150+ creators ready to amplify your message · Click to view on 𝕏
              </p>
            </div>
          </div>
        </div>
      </section>

    </ServicePageLayout>
  );
};

export default YapService;