import { FileText, BookOpen, Newspaper, Globe, Twitter, MessageCircle, Youtube, ExternalLink, Clock, ChevronLeft, ChevronRight, TrendingUp, Users, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

// Import media logos
import cointelegraphLogo from "@/assets/logos/cointelegraph.png";
import coindeskLogo from "@/assets/logos/coindesk.png";
import blockmediaLogo from "@/assets/logos/blockmedia-new.png";
import bloomingbitLogo from "@/assets/logos/bloomingbit.png";
import coinessLogo from "@/assets/logos/coinness.png";
import economistLogo from "@/assets/logos/economist.png";

const ACCENT_COLOR = "#8B5CF6";

// News coverage data with real article links
const coverageData = [
  {
    id: 1,
    headline: "Story Protocol, 한국 시장 본격 진출…'IP 혁명' 이끈다",
    outlet: "BlockMedia",
    logo: blockmediaLogo,
    time: "Dec 2024",
    category: "Partnership",
    url: "https://www.blockmedia.co.kr/archives/tag/story-protocol",
  },
  {
    id: 2,
    headline: "peaq, 아시아 DePIN 생태계 확장 가속화",
    outlet: "Bloomingbit",
    logo: bloomingbitLogo,
    time: "Nov 2024",
    category: "Expansion",
    url: "https://bloomingbit.io/search?keyword=peaq",
  },
  {
    id: 3,
    headline: "MegaETH, 초고속 L2 솔루션으로 한국 시장 공략",
    outlet: "Coinness",
    logo: coinessLogo,
    time: "Dec 2024",
    category: "Market Entry",
    url: "https://coinness.com/search?q=megaeth",
  },
  {
    id: 4,
    headline: "Ondo Finance: RWA 토큰화의 미래를 열다",
    outlet: "CoinDesk",
    logo: coindeskLogo,
    time: "Oct 2024",
    category: "RWA",
    url: "https://www.coindesk.com/tag/ondo-finance/",
  },
  {
    id: 5,
    headline: "Sahara AI, Web3 AI 인프라의 새로운 표준 제시",
    outlet: "CoinTelegraph",
    logo: cointelegraphLogo,
    time: "Nov 2024",
    category: "AI x Crypto",
    url: "https://cointelegraph.com/tags/artificial-intelligence",
  },
];

// Channel Hub data
const channelData = {
  x: {
    name: "X (Twitter)",
    icon: Twitter,
    brandColor: "#000000",
    stats: [
      { label: "Followers", value: "50K+", icon: Users },
      { label: "Monthly Impressions", value: "200K+", icon: Eye },
      { label: "Engagement Rate", value: "4.2%", icon: TrendingUp },
    ],
    preview: {
      username: "@IumLabs",
      handle: "Ium Labs",
      content: "🚀 Just launched Story Protocol's Korea campaign — 500% CTR increase in first week!\n\nThe Korean market is hungry for quality Web3 projects. Let us help you enter.\n\n#Web3Korea #GTM #CryptoMarketing",
      likes: 234,
      retweets: 89,
      replies: 45,
      time: "2h",
    },
  },
  telegram: {
    name: "Telegram",
    icon: MessageCircle,
    brandColor: "#0088CC",
    stats: [
      { label: "Community Members", value: "30K+", icon: Users },
      { label: "Daily Active", value: "5K+", icon: Eye },
      { label: "Response Time", value: "<2min", icon: Clock },
    ],
    preview: {
      messages: [
        { user: "Admin", message: "📢 New partnership announcement dropping tomorrow!", isAdmin: true, time: "10:30 AM" },
        { user: "CryptoKorea", message: "기대됩니다! 🔥", time: "10:31 AM" },
        { user: "Web3Dev", message: "Any hints?", time: "10:32 AM" },
        { user: "Admin", message: "Stay tuned 👀", isAdmin: true, time: "10:33 AM" },
      ],
    },
  },
  blog: {
    name: "Blog",
    icon: FileText,
    brandColor: "#FF6B35",
    stats: [
      { label: "Articles Published", value: "100+", icon: FileText },
      { label: "Monthly Readers", value: "25K+", icon: Users },
      { label: "Avg. Read Time", value: "5 min", icon: Clock },
    ],
    preview: {
      articles: [
        { title: "How to Enter the Korean Crypto Market in 2024", reads: "2.3K", category: "Guide" },
        { title: "Top 10 KOLs for Web3 Marketing in Korea", reads: "1.8K", category: "Research" },
        { title: "Building Community: Discord vs Telegram in Asia", reads: "1.5K", category: "Analysis" },
      ],
    },
  },
  youtube: {
    name: "Youtube",
    icon: Youtube,
    brandColor: "#FF0000",
    stats: [
      { label: "Subscribers", value: "10K+", icon: Users },
      { label: "Total Views", value: "500K+", icon: Eye },
      { label: "Avg. Watch Time", value: "8 min", icon: Clock },
    ],
    preview: {
      videos: [
        { title: "Web3 Korea Market Update Q4 2024", views: "12K", duration: "15:32" },
        { title: "Interview: Story Protocol CEO on Asia Expansion", views: "8.5K", duration: "22:18" },
        { title: "Korean Crypto Regulations Explained", views: "6.2K", duration: "10:45" },
      ],
    },
  },
};

// Media partner data
const mediaPartners = {
  global: [
    { name: "CoinTelegraph", logo: cointelegraphLogo, articles: 45, reach: "2M+" },
    { name: "CoinDesk", logo: coindeskLogo, articles: 38, reach: "1.5M+" },
    { name: "The Economist", logo: economistLogo, articles: 12, reach: "5M+" },
  ],
  korea: [
    { name: "BlockMedia", logo: blockmediaLogo, articles: 120, reach: "500K+" },
    { name: "Bloomingbit", logo: bloomingbitLogo, articles: 85, reach: "300K+" },
    { name: "Coinness", logo: coinessLogo, articles: 95, reach: "400K+" },
  ],
};

const serviceTags: ServiceTag[] = [
  { label: "Press Releases" },
  { label: "Media Outreach" },
  { label: "Story Development" },
  { label: "Journalist Network" },
  { label: "Content Creation" },
  { label: "Brand Positioning" },
];

const stats: ServiceStat[] = [
  { value: 200, label: "Articles Published", suffix: "+" },
  { value: 50, label: "Media Partners", suffix: "+" },
  { value: 30, label: "Top-Tier Placements", suffix: "+" },
  { value: 95, label: "Client Satisfaction", suffix: "%" },
];

const processSteps: ProcessStep[] = [
  { 
    number: "01",
    title: "Story Discovery",
    description: "We research your project, identify newsworthy angles, and develop compelling narratives.",
    icon: FileText
  },
  { 
    number: "02",
    title: "Content Creation",
    description: "Our editorial team crafts press releases, articles, and media kits tailored to each outlet.",
    icon: BookOpen
  },
  { 
    number: "03",
    title: "Media Outreach",
    description: "We pitch to our network of journalists and secure placements across top publications.",
    icon: Newspaper
  },
  { 
    number: "04",
    title: "Publication & Amplification",
    description: "Articles go live, and we amplify reach through social and community channels.",
    icon: Globe
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Content Production",
    items: [
      "Press release writing",
      "Article drafting",
      "Media kit creation",
      "Executive bios & quotes",
    ],
  },
  {
    title: "Media Relations",
    items: [
      "Journalist outreach",
      "Interview coordination",
      "Exclusive story pitching",
      "Relationship management",
    ],
  },
  {
    title: "Coverage & Reporting",
    items: [
      "Publication tracking",
      "Coverage reports",
      "Social amplification",
      "Monthly PR summary",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Which media outlets do you work with?",
    answer: "We have relationships with major crypto outlets (CoinDesk, CoinTelegraph, The Block) and Korean media (BlockMedia, Bloomingbit, Coinness). We also work with mainstream tech and finance publications for broader reach.",
  },
  {
    question: "How long does it take to get published?",
    answer: "Timing varies by outlet and story type. Breaking news can be published within 24-48 hours. Feature stories typically take 1-2 weeks from pitch to publication.",
  },
  {
    question: "Do you guarantee placements?",
    answer: "While we can't guarantee specific placements (editorial independence matters), our track record shows 90%+ success rate for well-prepared stories. We focus on building genuine media relationships.",
  },
  {
    question: "Can you help with crisis communications?",
    answer: "Yes, we provide crisis PR support including rapid response drafting, media monitoring, and stakeholder communication. We recommend having a crisis plan in place before issues arise.",
  },
];

type ChannelKey = 'x' | 'telegram' | 'blog' | 'youtube';

const PRService = () => {
  usePageTitle("PR & Media");
  
  const [currentCoverage, setCurrentCoverage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeChannel, setActiveChannel] = useState<ChannelKey>('x');
  const [activeRegion, setActiveRegion] = useState<'global' | 'korea'>('global');
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  // Auto-play coverage carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentCoverage(prev => (prev + 1) % coverageData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextCoverage = () => {
    setIsAutoPlaying(false);
    setCurrentCoverage(prev => (prev + 1) % coverageData.length);
  };

  const prevCoverage = () => {
    setIsAutoPlaying(false);
    setCurrentCoverage(prev => (prev - 1 + coverageData.length) % coverageData.length);
  };

  const currentChannel = channelData[activeChannel];
  
  return (
    <ServicePageLayout
      serviceName="PR & Media"
      serviceTitle="PR &"
      serviceSubtitle="Media"
      serviceDescription="We help you craft the right narrative and secure placements in top crypto and tech media. From article creation to journalist outreach and timing coordination."
      serviceIcon={Newspaper}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="pr"
    >
      {/* Coverage Showcase Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="Coverage Showcase" badge="Live Feed" />

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              {/* Main Coverage Display */}
              <div 
                className="relative rounded-2xl overflow-hidden"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Background gradient */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ background: `linear-gradient(135deg, ${ACCENT_COLOR}, transparent)` }}
                />
                
                <div className="relative p-8 md:p-12 border border-white/10 rounded-2xl bg-white/[0.02]">
                  {/* Live indicator */}
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-medium text-white/60 uppercase tracking-wider">Recent Coverage</span>
                  </div>

                  {/* Coverage Carousel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCoverage}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="min-h-[180px]"
                    >
                      {/* Category Badge */}
                      <div 
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-6"
                        style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}
                      >
                        {coverageData[currentCoverage].category}
                      </div>

                      {/* Headline - Clickable */}
                      <a 
                        href={coverageData[currentCoverage].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group/link"
                      >
                        <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-8 group-hover/link:text-purple-400 transition-colors">
                          {coverageData[currentCoverage].headline}
                          <ExternalLink className="inline-block w-6 h-6 ml-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </h3>
                      </a>

                      {/* Meta */}
                      <div className="flex items-center gap-6">
                        <a 
                          href={coverageData[currentCoverage].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                        >
                          <img 
                            src={coverageData[currentCoverage].logo} 
                            alt={coverageData[currentCoverage].outlet}
                            className="h-6 object-contain brightness-0 invert opacity-70"
                          />
                          <span className="text-white/60 font-medium">
                            {coverageData[currentCoverage].outlet}
                          </span>
                        </a>
                        <div className="flex items-center gap-2 text-white/40">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{coverageData[currentCoverage].time}</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
                    {/* Dots */}
                    <div className="flex gap-2">
                      {coverageData.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setIsAutoPlaying(false);
                            setCurrentCoverage(index);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentCoverage 
                              ? 'w-8 bg-white' 
                              : 'bg-white/30 hover:bg-white/50'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Arrows */}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevCoverage}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextCoverage}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coverage Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { label: "Articles This Month", value: "24" },
                  { label: "Media Outlets", value: "12" },
                  { label: "Total Reach", value: "2.5M+" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-white/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Channel Hub Section */}
      <section className="scroll-reveal bg-[#121212]">
        <div className="border-t border-white/10">
          <SectionHeader number="02" title="Channel Hub" badge="Multi-Platform" />

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left - Channel Toggle & Stats */}
                <div>
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    We maintain active presence across all major platforms, ensuring your message reaches the right audience at the right time.
                  </p>

                  {/* Channel Toggle */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {(Object.keys(channelData) as ChannelKey[]).map((key) => {
                      const channel = channelData[key];
                      const Icon = channel.icon;
                      const isActive = activeChannel === key;
                      return (
                        <motion.button
                          key={key}
                          onClick={() => setActiveChannel(key)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                            isActive 
                              ? 'text-white shadow-lg' 
                              : 'bg-white/10 text-white/60 hover:bg-white/20'
                          }`}
                          style={isActive ? { 
                            backgroundColor: channel.brandColor,
                            boxShadow: `0 0 20px ${channel.brandColor}40`
                          } : {}}
                        >
                          <Icon className="w-4 h-4" />
                          {channel.name}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Channel Stats */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeChannel}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {currentChannel.stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                          >
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${currentChannel.brandColor}20` }}
                            >
                              <Icon className="w-5 h-5" style={{ color: currentChannel.brandColor }} />
                            </div>
                            <div>
                              <div className="text-xl font-bold text-white">{stat.value}</div>
                              <div className="text-sm text-white/40">{stat.label}</div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right - Channel Preview */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChannel}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    {activeChannel === 'x' && (
                      <div className="bg-black rounded-2xl overflow-hidden border border-white/10">
                        {/* X Post Preview */}
                        <div className="p-6">
                          <div className="flex gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold">
                              I
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white">{channelData.x.preview.handle}</span>
                                <span className="text-blue-400">✓</span>
                                <span className="text-white/40">{channelData.x.preview.username}</span>
                                <span className="text-white/40">·</span>
                                <span className="text-white/40">{channelData.x.preview.time}</span>
                              </div>
                              <p className="text-white mt-2 whitespace-pre-line">{channelData.x.preview.content}</p>
                              <div className="flex gap-8 mt-4 text-white/40">
                                <span className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
                                  💬 {channelData.x.preview.replies}
                                </span>
                                <span className="flex items-center gap-2 hover:text-green-400 cursor-pointer">
                                  🔄 {channelData.x.preview.retweets}
                                </span>
                                <span className="flex items-center gap-2 hover:text-red-400 cursor-pointer">
                                  ❤️ {channelData.x.preview.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeChannel === 'telegram' && (
                      <div className="bg-[#17212b] rounded-2xl overflow-hidden border border-white/10">
                        <div className="bg-[#232e3c] px-4 py-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                            I
                          </div>
                          <div>
                            <span className="text-white font-medium block">Ium Labs Korea</span>
                            <span className="text-xs text-gray-400">30,234 members</span>
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          {channelData.telegram.preview.messages.map((msg, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.15 }}
                              className={`flex gap-3 ${msg.isAdmin ? '' : 'pl-4'}`}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                msg.isAdmin ? 'bg-blue-500' : 'bg-gray-600'
                              }`}>
                                {msg.user[0]}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={`text-sm font-medium ${msg.isAdmin ? 'text-blue-400' : 'text-white'}`}>
                                    {msg.user}
                                  </span>
                                  {msg.isAdmin && <span className="text-xs px-1.5 py-0.5 bg-blue-500 text-white rounded">ADMIN</span>}
                                  <span className="text-xs text-gray-500">{msg.time}</span>
                                </div>
                                <p className="text-gray-300 text-sm mt-1">{msg.message}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeChannel === 'blog' && (
                      <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10">
                        <div className="p-6 border-b border-white/10">
                          <div className="flex items-center gap-2 text-orange-500 font-semibold">
                            <FileText className="w-5 h-5" />
                            Ium Labs Blog
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          {channelData.blog.preview.articles.map((article, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ x: 4 }}
                              className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                            >
                              <div className="flex-1">
                                <span className="text-xs text-orange-400 font-medium">{article.category}</span>
                                <h4 className="text-white font-medium mt-1 group-hover:text-orange-400 transition-colors">
                                  {article.title}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2 text-white/40 text-sm">
                                <Eye className="w-4 h-4" />
                                {article.reads}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeChannel === 'youtube' && (
                      <div className="bg-[#0f0f0f] rounded-2xl overflow-hidden border border-white/10">
                        <div className="p-6 border-b border-white/10">
                          <div className="flex items-center gap-2 text-red-500 font-semibold">
                            <Youtube className="w-5 h-5" />
                            Ium Labs Channel
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          {channelData.youtube.preview.videos.map((video, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                            >
                              <div className="w-32 h-20 rounded-lg bg-gradient-to-br from-red-900/50 to-red-600/30 flex items-center justify-center relative overflow-hidden">
                                <div className="w-10 h-10 rounded-full bg-red-600/80 flex items-center justify-center">
                                  <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-1" />
                                </div>
                                <span className="absolute bottom-1 right-1 text-xs bg-black/80 px-1 rounded">
                                  {video.duration}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-medium text-sm group-hover:text-red-400 transition-colors">
                                  {video.title}
                                </h4>
                                <div className="flex items-center gap-2 text-white/40 text-xs mt-2">
                                  <Eye className="w-3 h-3" />
                                  {video.views} views
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Network Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="03" title="Media Network" badge="Our Partners" />

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              {/* Region Toggle */}
              <div className="flex justify-center gap-2 mb-12">
                {(['global', 'korea'] as const).map((region) => (
                  <motion.button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      activeRegion === region
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {region === 'global' ? '🌍 Global Media' : '🇰🇷 Korean Media'}
                  </motion.button>
                ))}
              </div>

              {/* Partners Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRegion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {mediaPartners[activeRegion].map((partner, index) => (
                    <motion.div
                      key={partner.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredPartner(partner.name)}
                      onMouseLeave={() => setHoveredPartner(null)}
                      className="group relative"
                    >
                      <div className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                        hoveredPartner === partner.name
                          ? 'bg-white/10 border-white/30 scale-105'
                          : 'bg-white/5 border-white/10'
                      }`}>
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                          <img 
                            src={partner.logo} 
                            alt={partner.name}
                            className={`h-10 object-contain brightness-0 invert transition-opacity ${
                              hoveredPartner === partner.name ? 'opacity-100' : 'opacity-50'
                            }`}
                          />
                        </div>

                        {/* Name */}
                        <h4 className="text-center text-white font-semibold mb-4">{partner.name}</h4>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{partner.articles}</div>
                            <div className="text-xs text-white/40">Articles</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{partner.reach}</div>
                            <div className="text-xs text-white/40">Reach</div>
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <AnimatePresence>
                          {hoveredPartner === partner.name && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/80"
                            >
                              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors">
                                <ExternalLink className="w-4 h-4" />
                                View Coverage
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <p className="text-center text-white/40 text-sm mt-12">
                And 40+ more media partners across global and Korean markets
              </p>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default PRService;
