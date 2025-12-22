import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import CalendlyButton from "@/components/CalendlyButton";
import { ArrowRight, Star, Users, TrendingUp, Target, Zap, Crown, Award, Sparkles } from "lucide-react";
import kolImage from "@/assets/services/kol-network.jpg";
import seoulDDP from "@/assets/backgrounds/seoul-ddp-night.jpg";

const themeConfig = {
  accentColor: "#F59E0B",
  accentColorHover: "#D97706",
};

// Famous Crypto KOLs with DiceBear avatars
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

// Extended KOL list for full network section
const extendedKOLs = [
  { name: "Larry Cermak", handle: "@lawmaster", followers: "420K", expertise: "Data" },
  { name: "Crypto Bird", handle: "@crypto_birb", followers: "410K", expertise: "TA" },
  { name: "Frank", handle: "@frankdegods", followers: "390K", expertise: "NFT" },
  { name: "Loomdart", handle: "@loomdart", followers: "380K", expertise: "DeFi" },
  { name: "Crypto Cobain", handle: "@CryptoCobain", followers: "350K", expertise: "DeFi" },
  { name: "Andrew Kang", handle: "@Rewkang", followers: "340K", expertise: "VC" },
  { name: "Tetranode", handle: "@Tetranode", followers: "310K", expertise: "DeFi" },
  { name: "Altcoin Psycho", handle: "@AltcoinPsycho", followers: "295K", expertise: "Alt" },
  { name: "GCR", handle: "@GCRClassic", followers: "290K", expertise: "Macro" },
  { name: "Route 2 FI", handle: "@Route2FI", followers: "280K", expertise: "DeFi" },
  { name: "DeFi Dad", handle: "@DeFi_Dad", followers: "240K", expertise: "DeFi" },
  { name: "Cred", handle: "@CryptoCred", followers: "230K", expertise: "TA" },
  { name: "Satoshi Flipper", handle: "@SatoshiFlipper", followers: "210K", expertise: "TA" },
  { name: "Light", handle: "@LightCrypto", followers: "195K", expertise: "Trading" },
  { name: "CryptoGarga", handle: "@CryptoGarga", followers: "195K", expertise: "NFT" },
  { name: "Fiskantes", handle: "@Fiskantes", followers: "185K", expertise: "VC" },
  { name: "Defi Edge", handle: "@thedefiedge", followers: "185K", expertise: "DeFi" },
  { name: "CL", handle: "@CL207", followers: "180K", expertise: "Alt" },
  { name: "Taiki Maeda", handle: "@TaikiMaeda2", followers: "180K", expertise: "DeFi" },
  { name: "Tyler D", handle: "@Tyler_Did_It", followers: "165K", expertise: "Gems" },
  { name: "DCF GOD", handle: "@dcaboredape", followers: "155K", expertise: "NFT" },
  { name: "Mando", handle: "@TheCryptoMando", followers: "145K", expertise: "NFT" },
  { name: "Thor Hartvigsen", handle: "@ThorHartvigsen", followers: "125K", expertise: "DeFi" },
  { name: "Rune", handle: "@RuneKek", followers: "120K", expertise: "Memes" },
  { name: "Smol Dingus", handle: "@SmolDingus", followers: "95K", expertise: "Memes" },
  { name: "Flood", handle: "@ThinkingUSD", followers: "35K", expertise: "Macro" },
  { name: "Kano", handle: "@CryptoKano", followers: "28K", expertise: "BTC" },
  { name: "CryptoTony", handle: "@CryptoTony__", followers: "48K", expertise: "TA" },
];

const networkNodes = [
  { x: 50, y: 30, size: 60, label: "Your Project" },
  { x: 20, y: 20, size: 40, label: "Tier 1 KOL" },
  { x: 80, y: 25, size: 40, label: "Tier 1 KOL" },
  { x: 15, y: 50, size: 35, label: "Tier 2 KOL" },
  { x: 85, y: 55, size: 35, label: "Tier 2 KOL" },
  { x: 30, y: 70, size: 30, label: "Micro KOL" },
  { x: 70, y: 75, size: 30, label: "Micro KOL" },
];

const tierData = [
  { tier: "Platinum", icon: Crown, count: "10+", reach: "1M+", color: "from-purple-400 to-purple-600" },
  { tier: "Gold", icon: Award, count: "30+", reach: "500K-1M", color: "from-amber-400 to-amber-600" },
  { tier: "Silver", icon: Star, count: "50+", reach: "100K-500K", color: "from-gray-300 to-gray-500" },
  { tier: "Bronze", icon: Zap, count: "30+", reach: "50K-100K", color: "from-orange-600 to-orange-800" },
];

const processSteps = [
  { number: "01", title: "Discovery", description: "Identify ideal KOL profiles matching your project's narrative and target audience.", icon: Target },
  { number: "02", title: "Outreach", description: "Negotiate terms, align on messaging, and coordinate campaign timelines.", icon: Users },
  { number: "03", title: "Activation", description: "Launch coordinated content across platforms with real-time monitoring.", icon: TrendingUp },
  { number: "04", title: "Amplification", description: "Analyze performance and optimize for maximum reach and engagement.", icon: Sparkles },
];

const allServices = [
  { slug: "community", title: "Community", color: "#3B82F6" },
  { slug: "social-media", title: "Social Media", color: "#EC4899" },
  { slug: "gtm", title: "GTM Strategy", color: "#10B981" },
  { slug: "yap", title: "Yap Strategy", color: "#22D3EE" },
  { slug: "pr", title: "PR & Media", color: "#8B5CF6" },
];

const stats = [
  { value: "120+", label: "KOL Network" },
  { value: "50M+", label: "Total Reach" },
];

const InfluencerService = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
          style={{ background: `radial-gradient(circle, ${themeConfig.accentColor}, transparent 70%)` }}
        />
      </div>

      {/* Hero Section - KOL Profile Cards Showcase */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={seoulDDP} 
            alt="Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>

        {/* Floating Star Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-amber-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${8 + Math.random() * 16}px`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ✦
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Title */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div 
                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{ 
                  background: `${themeConfig.accentColor}20`,
                  border: `1px solid ${themeConfig.accentColor}40`
                }}
              >
                ⭐ Influencer Strategy
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Connect with{" "}
                <span style={{ color: themeConfig.accentColor }}>
                  Crypto's Top Voices
                </span>
              </h1>
              
              <p className="text-lg text-white/60 mb-8 max-w-lg">
                Access our exclusive network of 120+ crypto KOLs and reach 50M+ engaged followers across X, YouTube, and Telegram.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="px-6 py-3 rounded-xl border border-white/10 bg-white/5"
                  >
                    <div className="text-2xl font-bold" style={{ color: themeConfig.accentColor }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              <CalendlyButton 
                className="px-8 py-4 rounded-xl font-medium text-black"
                style={{ background: themeConfig.accentColor }}
              >
                Build Your KOL Strategy
              </CalendlyButton>
            </motion.div>

            {/* Right - KOL Profile Cards Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {kolProfiles.map((kol, index) => (
                <motion.a
                  key={index}
                  href={`https://x.com/${kol.handle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group cursor-pointer block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: themeConfig.accentColor,
                    boxShadow: `0 0 30px ${themeConfig.accentColor}30`
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

                  {/* Avatar - DiceBear */}
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

                  {/* Name */}
                  <div className="text-sm font-medium text-center mb-0.5">{kol.name}</div>
                  
                  {/* Handle */}
                  <div className="text-[10px] text-amber-400 text-center mb-1">{kol.handle}</div>

                  {/* Followers */}
                  <div className="text-xs text-white/60 text-center mb-2">{kol.followers} followers</div>
                  
                  {/* Expertise Tag */}
                  <div 
                    className="text-[9px] px-2 py-1 rounded-full text-center mx-auto w-fit"
                    style={{ backgroundColor: `${themeConfig.accentColor}20`, color: themeConfig.accentColor }}
                  >
                    {kol.expertise}
                  </div>

                  {/* View on X indicator */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-[8px] text-white/60 flex items-center gap-1">
                      <span>View on</span>
                      <span className="font-bold">𝕏</span>
                    </div>
                  </div>

                  {/* Connection Line on Hover */}
                  <motion.div 
                    className="absolute -bottom-4 left-1/2 w-px h-4 bg-gradient-to-b from-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section className="scroll-reveal bg-[#0A0A0A]">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs font-mono tracking-widest" style={{ color: themeConfig.accentColor }}>01</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Network</h2>
            </div>
            <span 
              className="text-xs tracking-wider hidden sm:block px-3 py-1 border rounded-full"
              style={{ color: themeConfig.accentColor, borderColor: `${themeConfig.accentColor}40` }}
            >
              Your Project at the Center
            </span>
          </div>

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-8">
              <p className="text-white/60 text-center max-w-2xl mx-auto mb-16">
                We position your project at the heart of crypto's most influential network, creating authentic connections that drive real engagement.
              </p>

              {/* Network Graph Visualization */}
              <div className="relative h-[500px] max-w-4xl mx-auto">
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {networkNodes.slice(1).map((node, i) => (
                    <motion.line
                      key={i}
                      x1="50%"
                      y1="30%"
                      x2={`${node.x}%`}
                      y2={`${node.y}%`}
                      stroke={themeConfig.accentColor}
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.4 }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                    />
                  ))}
                </svg>

                {/* Nodes */}
                {networkNodes.map((node, index) => (
                  <motion.div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.15, type: "spring" }}
                  >
                    <motion.div
                      className={`rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 'bg-white/10 border border-white/20'
                      }`}
                      style={{ width: node.size, height: node.size }}
                      whileHover={{ scale: 1.2 }}
                      animate={index === 0 ? {
                        boxShadow: [`0 0 20px ${themeConfig.accentColor}40`, `0 0 40px ${themeConfig.accentColor}60`, `0 0 20px ${themeConfig.accentColor}40`]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {index === 0 ? (
                        <span className="text-2xl">🚀</span>
                      ) : (
                        <span className="text-lg">👤</span>
                      )}
                    </motion.div>
                    <span className="text-xs text-white/60 mt-2 whitespace-nowrap">{node.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="scroll-reveal bg-[#0A0A0A]">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs font-mono tracking-widest" style={{ color: themeConfig.accentColor }}>02</span>
              <h2 className="text-lg md:text-xl font-medium text-white">About</h2>
            </div>
            <span 
              className="text-xs tracking-wider hidden sm:block px-3 py-1 border rounded-full"
              style={{ color: themeConfig.accentColor, borderColor: `${themeConfig.accentColor}40` }}
            >
              Let Others Tell Your Story
            </span>
          </div>

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <img 
                    src={kolImage} 
                    alt="KOL Network" 
                    className="rounded-2xl w-full h-[400px] object-cover"
                    style={{ boxShadow: `0 0 60px ${themeConfig.accentColor}20` }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-white/60 mb-6 leading-relaxed">
                    We activate a wide range of crypto-native influencers, from top industry voices to niche micro-KOLs, 
                    to help you get seen by the right people. Our focus is on message alignment, credible distribution, 
                    and timing that supports your launch or campaign.
                  </p>
                  <p className="text-white/60 mb-8 leading-relaxed">
                    We work with creators who start conversations, drive growth, and move real mindshare in the Korean 
                    and global crypto communities.
                  </p>

                  <CalendlyButton 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium border transition-all hover:scale-105"
                    style={{ 
                      borderColor: themeConfig.accentColor,
                      color: themeConfig.accentColor
                    }}
                  >
                    Explore Our Network <ArrowRight className="w-4 h-4" />
                  </CalendlyButton>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Pyramid Section */}
      <section className="py-24 relative">
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${themeConfig.accentColor}40, transparent)` }}
        />

        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono">[ TIERS ]</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Multi-Tier <span style={{ color: themeConfig.accentColor }}>KOL Strategy</span>
            </h2>
          </div>

          {/* Pyramid Tiers */}
          <div className="max-w-3xl mx-auto space-y-4">
            {tierData.map((tier, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                style={{ 
                  marginLeft: `${index * 8}%`,
                  marginRight: `${index * 8}%`
                }}
              >
                <div 
                  className={`p-6 rounded-2xl border border-white/10 bg-gradient-to-r ${tier.color} bg-opacity-20 relative overflow-hidden group hover:border-white/30 transition-all`}
                >
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <tier.icon className="w-8 h-8" style={{ color: themeConfig.accentColor }} />
                      <div>
                        <div className="text-xl font-bold">{tier.tier}</div>
                        <div className="text-sm text-white/60">{tier.reach} followers</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: themeConfig.accentColor }}>{tier.count}</div>
                      <div className="text-xs text-white/60">KOLs</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 relative">
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${themeConfig.accentColor}40, transparent)` }}
        />

        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono">[ PROCESS ]</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              How We <span style={{ color: themeConfig.accentColor }}>Activate</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative p-6 rounded-2xl border border-white/10 bg-white/5 group hover:border-amber-500/50 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${themeConfig.accentColor}20`, border: `1px solid ${themeConfig.accentColor}40` }}
                >
                  <step.icon className="w-6 h-6" style={{ color: themeConfig.accentColor }} />
                </div>
                <div className="text-xs font-mono text-white/40 mb-2">[ {step.number} ]</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-white/60">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Network Section */}
      <section className="py-24 relative">
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${themeConfig.accentColor}40, transparent)` }}
        />

        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono">[ FULL NETWORK ]</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Explore Our <span style={{ color: themeConfig.accentColor }}>120+ KOL Network</span>
            </h2>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto">
              Access our complete network of verified crypto influencers across all tiers and specializations
            </p>
          </div>

          {/* Extended KOL Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {extendedKOLs.map((kol, index) => (
              <motion.a
                key={index}
                href={`https://x.com/${kol.handle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
              >
                <div 
                  className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5 group-hover:border-amber-400/60 transition-all relative"
                >
                  <img 
                    src={`https://unavatar.io/twitter/${kol.handle.replace('@', '')}`}
                    alt={kol.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=1a1a1a`;
                    }}
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2">
                    <span className="text-[9px] md:text-[11px] font-medium text-white text-center leading-tight">{kol.name}</span>
                    <span className="text-[7px] md:text-[9px] text-amber-400 text-center">{kol.followers}</span>
                    <span 
                      className="text-[6px] md:text-[8px] px-1.5 py-0.5 rounded-full mt-1"
                      style={{ backgroundColor: `${themeConfig.accentColor}40`, color: themeConfig.accentColor }}
                    >
                      {kol.expertise}
                    </span>
                  </div>
                  
                  {/* Glow on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ boxShadow: `inset 0 0 20px ${themeConfig.accentColor}30` }}
                  />
                </div>
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <CalendlyButton 
              className="px-8 py-4 rounded-xl font-medium text-black inline-flex items-center gap-2"
              style={{ background: themeConfig.accentColor }}
            >
              Access Full Network <ArrowRight className="w-4 h-4" />
            </CalendlyButton>
          </motion.div>
        </div>
      </section>

      {/* More Services */}
      <section className="py-24 relative">
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${themeConfig.accentColor}40, transparent)` }}
        />

        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono">[ MORE ]</span>
            <h2 className="text-2xl font-bold mt-4">Explore Other Services</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {allServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="block p-4 rounded-xl border border-white/10 bg-white/5 text-center hover:border-white/30 transition-all group"
                >
                  <span className="text-sm group-hover:text-white transition-colors" style={{ color: service.color }}>
                    {service.title}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactFormSection sectionNumber="04" />
      <Footer />
    </div>
  );
};

export default InfluencerService;
