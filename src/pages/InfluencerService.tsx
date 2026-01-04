import { useState } from "react";
import { Star, Users, TrendingUp, Target, Sparkles, Crown, Award, Zap } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageMeta } from "@/hooks/usePageMeta";

const ACCENT_COLOR = "#F59E0B";

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
  // Global KOLs - Using real, verifiable accounts
  { name: "Pentoshi", handle: "@Pentosh1", followers: "610K", tier: "platinum", expertise: "Trading", region: "global" },
  { name: "Hsaka", handle: "@HsakaTrades", followers: "450K", tier: "gold", expertise: "TA", region: "global" },
  { name: "Route 2 FI", handle: "@Route2FI", followers: "280K", tier: "gold", expertise: "DeFi", region: "global" },
  { name: "Daan Crypto", handle: "@DaanCrypto", followers: "380K", tier: "gold", expertise: "Trading", region: "global" },
  { name: "ColdBloodShill", handle: "@ColdBloodShill", followers: "310K", tier: "gold", expertise: "TA", region: "global" },
  { name: "Tetranode", handle: "@Tetranode", followers: "310K", tier: "gold", expertise: "DeFi", region: "global" },
  // Korean KOLs
  { name: "CryptoQuant", handle: "@cryptoquant_com", followers: "280K", tier: "gold", expertise: "On-chain Analysis", region: "korean" },
  { name: "Phyrex", handle: "@Phyrex_Ni", followers: "333K", tier: "gold", expertise: "Data Analysis", region: "korean" },
  { name: "Hebi", handle: "@hebi555", followers: "377K", tier: "gold", expertise: "Trading", region: "korean" },
  { name: "KuiGas", handle: "@KuiGas", followers: "96K", tier: "silver", expertise: "Research", region: "korean" },
  { name: "Coinboy", handle: "@coinboy717", followers: "50K", tier: "bronze", expertise: "Trading", region: "korean" },
  { name: "Nakju", handle: "@nakjumon", followers: "18.7K", tier: "bronze", expertise: "Trading", region: "korean" },
];

const tierData = [
  { tier: "Platinum", icon: Crown, count: "5+", reach: "1M+", color: "from-purple-400 to-purple-600" },
  { tier: "Gold", icon: Award, count: "20+", reach: "300K-1M", color: "from-amber-400 to-amber-600" },
  { tier: "Silver", icon: Star, count: "25+", reach: "100K-300K", color: "from-gray-300 to-gray-500" },
  { tier: "Bronze", icon: Zap, count: "20+", reach: "50K-100K", color: "from-orange-600 to-orange-800" },
];

const regionData = [
  { id: "all", label: "All", count: "70+" },
  { id: "global", label: "Global", count: "40+" },
  { id: "korean", label: "Korean 🇰🇷", count: "30+" },
];

const InfluencerService = () => {
  usePageMeta(
    "Influencer/KOL Marketing",
    "Access 70+ Korean and global crypto KOLs with 15M+ total reach. Strategic influencer campaigns for Web3 brand promotion.",
    "/services/influencer"
  );
  const [activeTier, setActiveTier] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<string>("all");
  
  const filteredKOLs = kolProfiles
    .filter(kol => activeRegion === "all" || kol.region === activeRegion)
    .filter(kol => !activeTier || kol.tier === activeTier);
  
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
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="influencer"
    >
      {/* KOL Network Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="KOL Network" badge="Featured Creators" />

          <div className="py-10 md:py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              {/* Region Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {regionData.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(region.id)}
                    className={`px-4 py-2 rounded-full border transition-all text-sm font-medium ${
                      activeRegion === region.id
                        ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                        : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {region.label}
                    <span className="ml-1.5 text-xs opacity-60">{region.count}</span>
                  </button>
                ))}
              </div>

              {/* Tier Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button
                  onClick={() => setActiveTier(null)}
                  className={`px-5 py-2.5 rounded-full border transition-all text-sm font-medium ${
                    activeTier === null
                      ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                      : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                  }`}
                >
                  All Tiers
                </button>
                {tierData.map((tier) => (
                  <button
                    key={tier.tier}
                    onClick={() => setActiveTier(tier.tier.toLowerCase())}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all text-sm font-medium ${
                      activeTier === tier.tier.toLowerCase()
                        ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                        : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    <tier.icon className="w-4 h-4" />
                    {tier.tier}
                    <span className="text-xs opacity-60">{tier.count}</span>
                  </button>
                ))}
              </div>

              {/* Tier Stats (when filtered) */}
              {activeTier && (
                <div className="mb-8 overflow-hidden">
                  {tierData.filter(t => t.tier.toLowerCase() === activeTier).map((tier) => (
                    <div 
                      key={tier.tier}
                      className="p-6 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                          <tier.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-xl">{tier.tier} Tier</h3>
                          <p className="text-white/40">Reach: {tier.reach} followers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>{tier.count}</p>
                        <p className="text-white/40 text-xs">Creators</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* KOL Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredKOLs.map((kol, index) => (
                  <a
                    key={index}
                    href={`https://x.com/${kol.handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group cursor-pointer block hover:border-amber-500/50 transition-all hover:scale-[1.02]"
                    style={{
                      boxShadow: 'none'
                    }}
                  >
                    {/* Tier Badge */}
                    <div 
                      className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        kol.tier === 'platinum' ? 'bg-purple-500' :
                        kol.tier === 'gold' ? 'bg-amber-500' :
                        kol.tier === 'silver' ? 'bg-gray-400 text-black' : 'bg-orange-600'
                      }`}
                    >
                      {kol.tier}
                    </div>

                    {/* Avatar */}
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-amber-400 transition-colors">
                      <img 
                        src={`https://unavatar.io/twitter/${kol.handle.replace('@', '')}`}
                        alt={kol.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=1a1a1a`;
                        }}
                      />
                    </div>

                    <div className="text-sm font-medium text-center mb-0.5">{kol.name}</div>
                    <div className="text-[10px] text-amber-400 text-center mb-1">{kol.handle}</div>
                    <div className="text-xs text-white/60 text-center mb-2">{kol.followers} followers</div>
                    
                    <div 
                      className="text-[9px] px-2 py-1 rounded-full text-center mx-auto w-fit"
                      style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}
                    >
                      {kol.expertise}
                    </div>
                  </a>
                ))}
              </div>

              <p className="text-center text-white/40 text-sm mt-8">
                {activeTier 
                  ? `Showing ${filteredKOLs.length} ${activeTier} tier creators · Click to view on 𝕏`
                  : 'Click to view on 𝕏 · These are a sample of our network'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

    </ServicePageLayout>
  );
};

export default InfluencerService;