import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Users, TrendingUp, Target, Sparkles, Crown, Award, Zap } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

const ACCENT_COLOR = "#F59E0B";

const serviceTags: ServiceTag[] = [
  { label: "KOL Network" },
  { label: "Campaign Strategy" },
  { label: "Content Coordination" },
  { label: "Performance Tracking" },
  { label: "Audience Matching" },
  { label: "Brand Alignment" },
];

const stats: ServiceStat[] = [
  { value: 120, label: "KOL Network", suffix: "+" },
  { value: 50, label: "Total Reach", suffix: "M+" },
  { value: 30, label: "Campaigns Delivered", suffix: "+" },
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
    question: "How do you select KOLs for our campaign?",
    answer: "We analyze your target audience, project narrative, and goals to match with KOLs who have genuine engagement and audience overlap. We verify engagement rates and check for authentic followers.",
  },
  {
    question: "What's the typical budget range for KOL campaigns?",
    answer: "Budgets vary widely based on KOL tier and campaign scope. We work with budgets from $5K for micro-influencer campaigns to $100K+ for multi-KOL launches. We'll recommend the optimal mix for your goals.",
  },
  {
    question: "Do you have Korean-speaking KOLs?",
    answer: "Yes, our network includes 50+ Korean crypto KOLs across different niches (DeFi, NFT, trading, research). We also work with bilingual KOLs who can reach both Korean and global audiences.",
  },
  {
    question: "How do you measure campaign success?",
    answer: "We track impressions, engagement rate, follower growth, website traffic, and community joins. For token projects, we can also correlate with on-chain metrics like holder growth.",
  },
];

const kolProfiles = [
  { name: "CryptoGodJohn", handle: "@CryptoGodJohn", followers: "45K", tier: "bronze", expertise: "Trading" },
  { name: "Posty", handle: "@PostyXBT", followers: "38K", tier: "bronze", expertise: "TA" },
  { name: "DegenSpartan", handle: "@DegenSpartan", followers: "42K", tier: "bronze", expertise: "DeFi" },
  { name: "Cobie", handle: "@colobie", followers: "800K", tier: "platinum", expertise: "Trading" },
  { name: "Crypto Dog", handle: "@TheCryptoDog", followers: "750K", tier: "gold", expertise: "Swing Trading" },
  { name: "ZachXBT", handle: "@zachxbt", followers: "650K", tier: "gold", expertise: "Investigation" },
  { name: "Kaleo", handle: "@CryptoKaleo", followers: "620K", tier: "gold", expertise: "Chart Analysis" },
  { name: "Pentoshi", handle: "@Pentosh1", followers: "610K", tier: "gold", expertise: "Trading" },
  { name: "Arthur Hayes", handle: "@CryptoHayes", followers: "580K", tier: "gold", expertise: "Macro" },
  { name: "Ansem", handle: "@blknoiz06", followers: "520K", tier: "gold", expertise: "Meme Coins" },
  { name: "Punk6529", handle: "@punk6529", followers: "510K", tier: "gold", expertise: "NFT Culture" },
  { name: "Hsaka", handle: "@HsakaTrades", followers: "450K", tier: "silver", expertise: "Technical Analysis" },
];

const tierData = [
  { tier: "Platinum", icon: Crown, count: "10+", reach: "1M+", color: "from-purple-400 to-purple-600" },
  { tier: "Gold", icon: Award, count: "30+", reach: "500K-1M", color: "from-amber-400 to-amber-600" },
  { tier: "Silver", icon: Star, count: "50+", reach: "100K-500K", color: "from-gray-300 to-gray-500" },
  { tier: "Bronze", icon: Zap, count: "30+", reach: "50K-100K", color: "from-orange-600 to-orange-800" },
];

const InfluencerService = () => {
  usePageTitle("Influencer/KOL");
  const [activeTier, setActiveTier] = useState<string | null>(null);
  
  const filteredKOLs = activeTier 
    ? kolProfiles.filter(kol => kol.tier === activeTier)
    : kolProfiles;
  
  return (
    <ServicePageLayout
      serviceName="Influencer/KOL"
      serviceTitle="Access Our"
      serviceSubtitle="KOL Network"
      serviceDescription="Access our exclusive network of 120+ crypto KOLs and reach 50M+ engaged followers across X, YouTube, and Telegram."
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

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
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