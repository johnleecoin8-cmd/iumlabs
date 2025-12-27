import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Users, TrendingUp, Target, Sparkles, Crown, Award, Zap } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

const ACCENT_COLOR = "#F59E0B";

const serviceTags: ServiceTag[] = [
  { label: "Global KOL" },
  { label: "Korean KOL" },
  { label: "Campaign Strategy" },
  { label: "Content Coordination" },
  { label: "Performance Tracking" },
  { label: "한국 유튜버/블로거" },
];

const stats: ServiceStat[] = [
  { value: 69, label: "KOL Network", suffix: "+" },
  { value: 15, label: "Total Reach", suffix: "M+" },
  { value: 12, label: "Campaigns Delivered", suffix: "+" },
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
    question: "한국 KOL 네트워크가 있나요?",
    answer: "네, 50명 이상의 한국 크립토 KOL을 보유하고 있습니다. DeFi, NFT, 트레이딩, 리서치 등 다양한 분야의 전문가들과 협력합니다. 한국어/영어 바이링구얼 KOL도 연결해 드립니다.",
  },
  {
    question: "한국 유튜버나 블로거와도 협업하나요?",
    answer: "물론입니다. 네이버 블로그, 유튜브 크립토 채널, 티스토리 등 한국 로컬 플랫폼의 인플루언서 네트워크도 보유하고 있습니다. 한국 SEO에 효과적인 콘텐츠 배포가 가능합니다.",
  },
  {
    question: "KOL 캠페인 예산은 어느 정도인가요?",
    answer: "KOL 티어와 캠페인 범위에 따라 다양합니다. 마이크로 인플루언서 캠페인은 $5K부터, 멀티 KOL 론칭은 $100K 이상까지 진행합니다. 목표에 맞는 최적의 조합을 추천해 드립니다.",
  },
  {
    question: "캠페인 성과는 어떻게 측정하나요?",
    answer: "노출수, 참여율, 팔로워 증가, 웹사이트 트래픽, 커뮤니티 가입을 추적합니다. 토큰 프로젝트의 경우 홀더 증가 등 온체인 지표와도 연계 분석합니다.",
  },
];

const kolProfiles = [
  // Global KOLs
  { name: "Cobie", handle: "@colobie", followers: "800K", tier: "platinum", expertise: "Trading", region: "global" },
  { name: "Crypto Dog", handle: "@TheCryptoDog", followers: "750K", tier: "gold", expertise: "Swing Trading", region: "global" },
  { name: "ZachXBT", handle: "@zachxbt", followers: "650K", tier: "gold", expertise: "Investigation", region: "global" },
  { name: "Kaleo", handle: "@CryptoKaleo", followers: "620K", tier: "gold", expertise: "Chart Analysis", region: "global" },
  { name: "Pentoshi", handle: "@Pentosh1", followers: "610K", tier: "gold", expertise: "Trading", region: "global" },
  { name: "Arthur Hayes", handle: "@CryptoHayes", followers: "580K", tier: "gold", expertise: "Macro", region: "global" },
  // Korean KOLs
  { name: "체인의정석", handle: "@ChainExpert_KR", followers: "85K", tier: "silver", expertise: "DeFi 분석", region: "korean" },
  { name: "크립토퀀트", handle: "@cryptoquant_com", followers: "280K", tier: "gold", expertise: "온체인 분석", region: "korean" },
  { name: "비트맨", handle: "@BitmanKR", followers: "120K", tier: "silver", expertise: "트레이딩", region: "korean" },
  { name: "블록인프레스", handle: "@blockinpress", followers: "95K", tier: "silver", expertise: "뉴스/리서치", region: "korean" },
  { name: "코인갤러리", handle: "@CoinGalleryKR", followers: "68K", tier: "bronze", expertise: "NFT/메타버스", region: "korean" },
  { name: "김프리", handle: "@Kimchi_Premium", followers: "52K", tier: "bronze", expertise: "김프 분석", region: "korean" },
];

const tierData = [
  { tier: "Platinum", icon: Crown, count: "5+", reach: "1M+", color: "from-purple-400 to-purple-600" },
  { tier: "Gold", icon: Award, count: "15+", reach: "500K-1M", color: "from-amber-400 to-amber-600" },
  { tier: "Silver", icon: Star, count: "30+", reach: "100K-500K", color: "from-gray-300 to-gray-500" },
  { tier: "Bronze", icon: Zap, count: "19+", reach: "50K-100K", color: "from-orange-600 to-orange-800" },
];

const regionData = [
  { id: "all", label: "All", count: "69+" },
  { id: "global", label: "Global", count: "40+" },
  { id: "korean", label: "Korean 🇰🇷", count: "29+" },
];

const InfluencerService = () => {
  usePageTitle("Influencer/KOL");
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
      serviceDescription="Access our exclusive network of 69+ crypto KOLs and reach 15M+ engaged followers across X, YouTube, and Telegram."
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
          <SectionHeader number="01" title="KOL Network" badge="Featured Creators" />

          <div className="py-12 md:py-16">
            <div className="container mx-auto px-6 lg:px-16">
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
              <AnimatePresence mode="wait">
                {activeTier && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 overflow-hidden"
                  >
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
                          <p className="text-3xl font-bold" style={{ color: ACCENT_COLOR }}>{tier.count}</p>
                          <p className="text-white/40 text-sm">Creators</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* KOL Grid */}
              <motion.div 
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                <AnimatePresence mode="popLayout">
                {filteredKOLs.map((kol, index) => (
                  <motion.a
                    key={index}
                    href={`https://x.com/${kol.handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group cursor-pointer block hover:border-amber-500/50 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: `0 0 30px ${ACCENT_COLOR}20`
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
                  </motion.a>
                ))}
                </AnimatePresence>
              </motion.div>

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