import { Star, Users, TrendingUp, Target, Sparkles } from "lucide-react";
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

const kolProfiles = [
  // Global KOLs - Tier 1
  { name: "Pentoshi", handle: "@Pentosh1", followers: "610K", expertise: "Trading" },
  { name: "Hsaka", handle: "@HsakaTrades", followers: "450K", expertise: "TA" },
  { name: "Daan Crypto", handle: "@DaanCrypto", followers: "380K", expertise: "Trading" },
  { name: "ColdBloodShill", handle: "@ColdBloodShill", followers: "310K", expertise: "TA" },
  { name: "Tetranode", handle: "@Tetranode", followers: "310K", expertise: "DeFi" },
  { name: "Route 2 FI", handle: "@Route2FI", followers: "280K", expertise: "DeFi" },
  { name: "Cobie", handle: "@coaborting", followers: "740K", expertise: "Commentary" },
  { name: "Bluntz", handle: "@Bluntz_Capital", followers: "290K", expertise: "TA" },
  { name: "Crypto Birb", handle: "@crypto_birb", followers: "710K", expertise: "TA" },
  { name: "Tyler", handle: "@ApeDurden", followers: "185K", expertise: "Trading" },
  // Global KOLs - Tier 2
  { name: "Kaleo", handle: "@CryptoKaleo", followers: "580K", expertise: "Trading" },
  { name: "SmartContracter", handle: "@SmartContracter", followers: "250K", expertise: "TA" },
  { name: "Loomdart", handle: "@loomdart", followers: "180K", expertise: "DeFi" },
  { name: "Ansem", handle: "@blaborance", followers: "520K", expertise: "Memecoins" },
  { name: "Crypto Tony", handle: "@CryptoTony__", followers: "410K", expertise: "TA" },
  { name: "The DeFi Edge", handle: "@thedefiedge", followers: "390K", expertise: "DeFi" },
  { name: "Miles Deutscher", handle: "@milesdeutscher", followers: "560K", expertise: "Research" },
  { name: "Crypto Rover", handle: "@rovercrc", followers: "480K", expertise: "News" },
  // Global KOLs - Tier 3
  { name: "Crypto Rand", handle: "@crypto_rand", followers: "620K", expertise: "Trading" },
  { name: "Lark Davis", handle: "@TheCryptoLark", followers: "510K", expertise: "Education" },
  { name: "Jacob Bury", handle: "@JacobCryptoBury", followers: "170K", expertise: "Research" },
  { name: "Crypto Banter", handle: "@cryptobanter", followers: "680K", expertise: "News" },
  { name: "DeFi Dad", handle: "@DeFi_Dad", followers: "140K", expertise: "DeFi" },
  { name: "Crypto Wendy", handle: "@CryptoWendyO", followers: "320K", expertise: "Education" },
  // Korean KOLs - Tier 1
  { name: "CryptoQuant", handle: "@cryptoquant_com", followers: "280K", expertise: "On-chain" },
  { name: "Phyrex", handle: "@Phyrex_Ni", followers: "333K", expertise: "Data" },
  { name: "Hebi", handle: "@hebi555", followers: "377K", expertise: "Trading" },
  { name: "KuiGas", handle: "@KuiGas", followers: "96K", expertise: "Research" },
  { name: "Coinboy", handle: "@coinboy717", followers: "50K", expertise: "Trading" },
  { name: "Nakju", handle: "@nakjumon", followers: "18.7K", expertise: "Trading" },
  // Korean KOLs - Tier 2
  { name: "코인니스", handle: "@Coinness_ko", followers: "85K", expertise: "News" },
  { name: "비트코인갤러리", handle: "@btcgall", followers: "45K", expertise: "Community" },
  { name: "코인연구", handle: "@coin_study", followers: "32K", expertise: "Research" },
  { name: "크립토문", handle: "@cryptomoon_kr", followers: "28K", expertise: "Trading" },
  { name: "디파이코리아", handle: "@defi_korea", followers: "22K", expertise: "DeFi" },
  { name: "NFT서울", handle: "@nft_seoul", followers: "19K", expertise: "NFT" },
];

const InfluencerService = () => {
  usePageMeta({
    title: "Korean Crypto KOL Marketing",
    description: "Access 70+ Korean and global crypto KOLs with 15M+ total reach. Korean Web3 marketing through strategic influencer campaigns.",
    path: "/services/influencer",
    image: "/og/og-influencer.jpg"
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
      {/* KOL Network Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="KOL Network" badge="Featured Creators" />

          <div className="py-6 sm:py-10 md:py-14">
            <div className="container mx-auto px-3 sm:px-6 lg:px-16">
              {/* KOL Grid - First 24 (6x4) visible */}
              <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-4">
                {kolProfiles.slice(0, 24).map((kol, index) => (
                  <a
                    key={index}
                    href={`https://x.com/${kol.handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group cursor-pointer block hover:border-amber-500/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-amber-400 transition-colors">
                      <img 
                        src={`https://unavatar.io/twitter/${kol.handle.replace('@', '')}`}
                        alt={kol.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=1a1a1a`;
                        }}
                      />
                    </div>

                    <div className="text-xs sm:text-sm font-medium text-center mb-0.5 truncate">{kol.name}</div>
                    <div className="text-[9px] sm:text-[10px] text-amber-400 text-center mb-0.5 sm:mb-1 truncate">{kol.handle}</div>
                    <div className="text-[10px] sm:text-xs text-white/60 text-center mb-1.5 sm:mb-2">{kol.followers}</div>
                    
                    <div 
                      className="text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-center mx-auto w-fit"
                      style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}
                    >
                      {kol.expertise}
                    </div>
                  </a>
                ))}
              </div>

              {/* Faded KOL Grid - Remaining KOLs */}
              <div className="relative mt-3 sm:mt-4">
                <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-4 opacity-30 blur-[2px] pointer-events-none select-none">
                  {kolProfiles.slice(24).map((kol, index) => (
                    <div
                      key={index}
                      className="relative p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5"
                    >
                      <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 rounded-full overflow-hidden border-2 border-white/20">
                        <img 
                          src={`https://unavatar.io/twitter/${kol.handle.replace('@', '')}`}
                          alt={kol.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-center mb-0.5 truncate">{kol.name}</div>
                      <div className="text-[9px] sm:text-[10px] text-amber-400 text-center mb-0.5 sm:mb-1">{kol.handle}</div>
                      <div className="text-[10px] sm:text-xs text-white/60 text-center mb-1.5 sm:mb-2">{kol.followers}</div>
                      <div 
                        className="text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-center mx-auto w-fit"
                        style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}
                      >
                        {kol.expertise}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F0F0F]/60 to-[#0F0F0F] pointer-events-none" />
                
                {/* More KOLs text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white/50 text-sm sm:text-lg font-medium tracking-wide">+50 More KOLs in Our Network</span>
                </div>
              </div>

              <p className="text-center text-white/40 text-xs sm:text-sm mt-6 sm:mt-8">
                Click to view on 𝕏 · These are a sample of our network
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