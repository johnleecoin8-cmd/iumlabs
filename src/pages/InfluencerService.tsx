import { motion } from "framer-motion";
import { Star, Users, TrendingUp, Target, Sparkles, Crown, Award, Zap } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep } from "@/components/ServicePageLayout";
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
  usePageTitle("Influencer Marketing");
  
  return (
    <ServicePageLayout
      serviceName="Influencer Strategy"
      serviceTitle="Connect with"
      serviceSubtitle="Crypto's Top Voices"
      serviceDescription="Access our exclusive network of 120+ crypto KOLs and reach 50M+ engaged followers across X, YouTube, and Telegram."
      serviceIcon={Star}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      processSteps={processSteps}
      currentSlug="influencer"
    >
      {/* KOL Network Section */}
      <section className="scroll-reveal bg-[#0A0A0A]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="KOL Network" badge="Featured Creators" />

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              {/* Tier Overview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {tierData.map((tier, index) => (
                  <motion.div
                    key={tier.tier}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl border border-white/10 bg-white/5 text-center hover:border-white/20 transition-all"
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                      <tier.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-medium mb-1">{tier.tier}</h3>
                    <p className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>{tier.count}</p>
                    <p className="text-white/40 text-sm">{tier.reach} reach</p>
                  </motion.div>
                ))}
              </div>

              {/* KOL Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {kolProfiles.map((kol, index) => (
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
              </div>

              <p className="text-center text-white/40 text-sm mt-8">
                Click to view on 𝕏 · These are a sample of our network
              </p>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default InfluencerService;
