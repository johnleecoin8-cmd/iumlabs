import { useEffect, useState, useRef } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import ServicePageLayout, { ServiceTag, ServiceStat, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";
import { FileText, BarChart3, TrendingUp, Users, Newspaper, Share2, Search, PenTool, Send, ArrowRight, BookOpen, Mic2, Globe, Activity, Database, Wallet, ArrowUpRight, ArrowDownRight, Terminal } from "lucide-react";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

const ACCENT_COLOR = "#06B6D4";

const breadcrumbItems = [{
  name: "Home",
  url: "https://iumlabs.io"
}, {
  name: "Services",
  url: "https://iumlabs.io/services"
}, {
  name: "Deep Research",
  url: "https://iumlabs.io/services/deep-research"
}];

const serviceTags: ServiceTag[] = [{
  label: "Market Analysis"
}, {
  label: "Competitor Research"
}, {
  label: "Trend Reports"
}, {
  label: "Investment Thesis"
}, {
  label: "Media Distribution"
}, {
  label: "KOL Amplification"
}];

const stats: ServiceStat[] = [{
  value: 25,
  label: "Expert Reports Published",
  suffix: "+"
}, {
  value: 15,
  label: "Top-tier Distribution Partners",
  suffix: "+"
}, {
  value: 2,
  label: "Average Total Reach",
  suffix: "M+"
}, {
  value: 100,
  label: "Targeted KOL Reach",
  suffix: "K+"
}];

const processSteps: ProcessStep[] = [{
  number: "01",
  title: "Discovery",
  description: "We learn your tech and what you want to prove to the market.",
  icon: Search
}, {
  number: "02",
  title: "Analysis",
  description: "Our analysts dig into the data, specific to the Korean ecosystem.",
  icon: BarChart3
}, {
  number: "03",
  title: "Creation",
  description: "We turn complex data into beautiful, easy-to-read reports (KR/EN).",
  icon: PenTool
}, {
  number: "04",
  title: "Distribution",
  description: "We hit the 'Go' button on our network to maximize your brand authority.",
  icon: Send
}];

// Research Focus areas
const researchFocusAreas = [
  {
    title: "Market Analysis",
    description: "We size up the Korean crypto landscape so you know exactly where the opportunities are.",
    icon: BarChart3
  },
  {
    title: "Investment Thesis",
    description: "A deep look at your tokenomics and growth potential to convince the serious players.",
    icon: TrendingUp
  },
  {
    title: "User Behavior",
    description: "We analyze over 50k data points to understand how Korean degens and investors actually move.",
    icon: Users
  }
];

const deliverables: Deliverable[] = [{
  title: "The Research Suite",
  items: ["Market Entry Thesis: Your playbook for winning in Korea", "Competitor Decks: Know who you're up against and how to beat them", "Tokenomics Review: A technical health check on your project's economy"]
}, {
  title: "The Distribution Engine",
  items: ["Media Placement: Getting your research onto the screens of Korea's biggest crypto news sites", "KOL Review Threads: Influential voices breaking down your tech in easy-to-read threads", "Executive Briefings: High-level summaries for your VCs, partners, and stakeholders"]
}, {
  title: "Always On Support",
  items: ["Monthly Alpha: Regular updates on local trends before they go global", "Quarterly Deep Dives: Keeping your strategy fresh as the market evolves"]
}];

const faqItems: FAQItem[] = [{
  question: "What makes your research different?",
  answer: "We don't do generic summaries. We combine on-chain data with local market sentiment that you won't find on Google. It's 'boots-on-the-ground' intelligence."
}, {
  question: "Can you write in both Korean and English?",
  answer: "Yes. Every report is crafted to be native in both languages, ensuring your global team and local Korean community are on the same page."
}, {
  question: "How do you ensure people actually read the research?",
  answer: "Distribution is key. We don't just dump a PDF; we create snippets, threads, and media articles that make the research digestible and viral."
}, {
  question: "How long does a full report take?",
  answer: "Usually around 2 to 4 weeks, depending on the complexity of the data we're diving into."
}];

// Simulated market data
const marketMetrics = [
  { label: "Korean Retail Volume", value: "$4.2B", change: "+34.2%", trend: "up" },
  { label: "Upbit Dominance", value: "78.4%", change: "+2.1%", trend: "up" },
  { label: "KRW Premium", value: "2.8%", change: "-0.4%", trend: "down" },
  { label: "Active Wallets (KR)", value: "1.2M", change: "+12.5%", trend: "up" },
];

// On-chain data simulation
const onChainEvents = [
  { type: "transfer", hash: "0x7f3a...8b2c", amount: "450 ETH", time: "2s ago" },
  { type: "swap", hash: "0x2e9d...1f4a", amount: "$125K USDT", time: "5s ago" },
  { type: "stake", hash: "0x9c1b...3e7f", amount: "10,000 MATIC", time: "8s ago" },
  { type: "bridge", hash: "0x4d8a...6c2e", amount: "500 ETH", time: "12s ago" },
  { type: "mint", hash: "0x1f5e...9a3d", amount: "1,000 NFTs", time: "15s ago" },
];

// Research insights for typing effect
const researchInsights = [
  "Korean retail investors prefer Layer 2 solutions with low gas fees...",
  "Upbit listings correlate with 340% average volume spike in first 24h...",
  "DeFi adoption in Korea grew 156% YoY, led by lending protocols...",
  "Korean CEX users show 3.2x higher altcoin trading frequency vs global avg...",
  "Telegram remains #1 community platform for Korean crypto projects...",
];

// Interactive Research Dashboard
const ResearchDashboard = () => {
  const [activeTab, setActiveTab] = useState<"market" | "onchain" | "insights">("market");
  const [typedText, setTypedText] = useState("");
  const [currentInsight, setCurrentInsight] = useState(0);
  const [onChainData, setOnChainData] = useState(onChainEvents);
  const [chartData, setChartData] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isMobile, shouldDisableHeavyAnimations } = useMobileOptimization();

  // Generate fake chart data
  useEffect(() => {
    const data: number[] = [];
    let value = 50;
    for (let i = 0; i < 60; i++) {
      value += (Math.random() - 0.48) * 5;
      value = Math.max(20, Math.min(80, value));
      data.push(value);
    }
    setChartData(data);
  }, []);

  // Draw animated chart - DISABLED on mobile for performance
  useEffect(() => {
    // Skip canvas animation on mobile to prevent phone shutdown
    if (isMobile || shouldDisableHeavyAnimations) return;

    const canvas = canvasRef.current;
    if (!canvas || chartData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    let animationFrame: number;
    let progress = 0;
    let isAnimating = true;

    const draw = () => {
      if (!isAnimating) return;
      
      progress += 0.02;
      if (progress > 1) progress = 1;

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const padding = 10;

      // Draw gradient area
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

      ctx.beginPath();
      ctx.moveTo(padding, height - padding);

      const visiblePoints = Math.floor(chartData.length * progress);
      for (let i = 0; i < visiblePoints; i++) {
        const x = padding + (i / (chartData.length - 1)) * (width - 2 * padding);
        const y = height - padding - (chartData[i] / 100) * (height - 2 * padding);
        ctx.lineTo(x, y);
      }

      const lastX = padding + ((visiblePoints - 1) / (chartData.length - 1)) * (width - 2 * padding);
      ctx.lineTo(lastX, height - padding);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw line
      ctx.beginPath();
      for (let i = 0; i < visiblePoints; i++) {
        const x = padding + (i / (chartData.length - 1)) * (width - 2 * padding);
        const y = height - padding - (chartData[i] / 100) * (height - 2 * padding);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = '#06B6D4';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw static dot at end (no pulsing animation)
      if (visiblePoints > 0) {
        const dotX = padding + ((visiblePoints - 1) / (chartData.length - 1)) * (width - 2 * padding);
        const dotY = height - padding - (chartData[visiblePoints - 1] / 100) * (height - 2 * padding);
        
        ctx.beginPath();
        ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#06B6D4';
        ctx.fill();
      }

      // FIXED: Only continue animation if progress < 1 (stops infinite loop)
      if (progress < 1) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      isAnimating = false;
      cancelAnimationFrame(animationFrame);
    };
  }, [chartData, isMobile, shouldDisableHeavyAnimations]);

  // Typing effect for insights
  useEffect(() => {
    if (activeTab !== "insights") return;

    const insight = researchInsights[currentInsight];
    let charIndex = 0;
    setTypedText("");

    const typeInterval = setInterval(() => {
      if (charIndex < insight.length) {
        setTypedText(insight.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentInsight((prev) => (prev + 1) % researchInsights.length);
        }, 3000);
      }
    }, 40);

    return () => clearInterval(typeInterval);
  }, [currentInsight, activeTab]);

  // Simulate on-chain data updates
  useEffect(() => {
    if (activeTab !== "onchain") return;

    const interval = setInterval(() => {
      setOnChainData(prev => {
        const newEvent = {
          type: ["transfer", "swap", "stake", "bridge", "mint"][Math.floor(Math.random() * 5)],
          hash: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
          amount: `${Math.floor(Math.random() * 1000)} ETH`,
          time: "now"
        };
        return [newEvent, ...prev.slice(0, 4)];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [activeTab]);

  const tabs = [
    { id: "market" as const, label: "Market Data", icon: BarChart3 },
    { id: "onchain" as const, label: "On-Chain", icon: Database },
    { id: "insights" as const, label: "Insights", icon: Terminal },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-cyan-500/20 text-cyan-400' 
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dashboard Content */}
      <div className="relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent min-h-[400px] overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />

        <AnimatePresence mode="wait">
          {/* Market Data Tab */}
          {activeTab === "market" && (
            <motion.div
              key="market"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative z-10"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Korean Market Overview</h3>
                  <p className="text-xs text-white/50">Real-time market intelligence</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-400">Live</span>
                </div>
              </div>

              {/* Chart */}
              <div className="mb-6">
                <canvas 
                  ref={canvasRef}
                  className="w-full h-32"
                />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {marketMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="text-xs text-white/50 mb-1">{metric.label}</div>
                    <div className="text-xl font-bold text-white">{metric.value}</div>
                    <div className={`flex items-center gap-1 text-xs ${
                      metric.trend === "up" ? "text-green-400" : "text-red-400"
                    }`}>
                      {metric.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {metric.change}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* On-Chain Tab */}
          {activeTab === "onchain" && (
            <motion.div
              key="onchain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative z-10"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">On-Chain Activity</h3>
                  <p className="text-xs text-white/50">Live blockchain transactions</p>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-xs text-cyan-400">Monitoring</span>
                </div>
              </div>

              {/* Transaction Feed */}
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {onChainData.map((event, index) => (
                    <motion.div
                      key={`${event.hash}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10 font-mono"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        event.type === "transfer" ? "bg-blue-500/20" :
                        event.type === "swap" ? "bg-green-500/20" :
                        event.type === "stake" ? "bg-purple-500/20" :
                        event.type === "bridge" ? "bg-orange-500/20" :
                        "bg-pink-500/20"
                      }`}>
                        <Wallet className={`w-4 h-4 ${
                          event.type === "transfer" ? "text-blue-400" :
                          event.type === "swap" ? "text-green-400" :
                          event.type === "stake" ? "text-purple-400" :
                          event.type === "bridge" ? "text-orange-400" :
                          "text-pink-400"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-white uppercase">{event.type}</div>
                        <div className="text-[10px] text-white/40">{event.hash}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-cyan-400">{event.amount}</div>
                        <div className="text-[10px] text-white/30">{event.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">24.5K</div>
                  <div className="text-[10px] text-white/40 uppercase">Txns/Hour</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-400">$142M</div>
                  <div className="text-[10px] text-white/40 uppercase">Volume (24h)</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">+18.3%</div>
                  <div className="text-[10px] text-white/40 uppercase">Activity</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Insights Tab */}
          {activeTab === "insights" && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative z-10"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Research Insights</h3>
                  <p className="text-xs text-white/50">AI-powered analysis</p>
                </div>
                <div className="px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                  <span className="text-[10px] text-cyan-400 font-medium">Analyzing...</span>
                </div>
              </div>

              {/* Terminal-style insight display */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono min-h-[200px]">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-white/40 ml-2">research_terminal</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400">$</span>
                    <span className="text-green-400">analyze</span>
                    <span className="text-white/60">--market korean_crypto</span>
                  </div>
                  
                  <div className="pl-4 text-white/80 text-sm">
                    {typedText}
                    <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] text-white/40">Processing {currentInsight + 1}/{researchInsights.length} insights...</span>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                  <div className="text-lg font-bold text-white">156%</div>
                  <div className="text-[10px] text-white/40">DeFi Growth YoY</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                  <div className="text-lg font-bold text-cyan-400">3.2x</div>
                  <div className="text-[10px] text-white/40">Trading Frequency</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                  <div className="text-lg font-bold text-green-400">340%</div>
                  <div className="text-[10px] text-white/40">Listing Volume Spike</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const distributionChannels = [{
  name: "KOL Networks",
  icon: Mic2
}, {
  name: "Blog Platforms",
  icon: BookOpen
}, {
  name: "Media Outlets",
  icon: Globe
}];

const DeepResearchService = () => {
  usePageMeta({
    title: "On-chain Data Intelligence & Market Research Korea | ium Labs",
    description: "Deep dive into Korean crypto trends with our proprietary LLM-based 'ium K-Hype Intelligence Engine'. Data-backed decision making for Web3.",
    path: "/services/deep-research",
    image: "/og-image.png",
    keywords: ["On-chain Analysis Korea", "Market Intelligence", "Crypto Trend Report", "LLM Data Engine", "Korean Crypto Research"]
  });

  const [activeChannel, setActiveChannel] = useState(0);

  // Fetch latest research posts
  const { data: researchPosts } = useQuery({
    queryKey: ['research-posts-preview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_posts')
        .select('id, title, slug, excerpt, image, category, date, read_time')
        .eq('is_published', true)
        .order('date', { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChannel(prev => (prev + 1) % distributionChannels.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ServicePageLayout 
      serviceName="Deep Research" 
      serviceTitle="Deep Research" 
      serviceSubtitle="& Distribution" 
      serviceDescription="Establish your authority with data-driven insights. We produce deep-dive research on the Korean market and blast it through our elite network of KOLs and media outlets to make sure your message sticks." 
      serviceIcon={FileText} 
      serviceTags={serviceTags} 
      stats={stats} 
      processSteps={processSteps} 
      deliverables={deliverables} 
      faqItems={faqItems} 
      accentColor={ACCENT_COLOR} 
      videoSrc="/videos/deep-research-hero.mp4" 
      posterSrc="/images/posters/deep-research-hero.jpg"
      featuredProjectSlugs={['sahara-ai', 'openledger', 'spacecoin']}
      campaignImages={[
        { src: '/images/projects/sahara-ai-bg.jpg', title: 'AI Infrastructure Market Report', project: 'Sahara AI', result: 'Comprehensive Korean AI x Crypto landscape analysis' },
        { src: '/images/projects/openledger-hero-official.png', title: 'OpenLedger Technical Deep Dive', project: 'OpenLedger', result: 'Developer-focused research driving 12K downloads' },
        { src: '/images/projects/spacecoin-bg.jpg', title: 'SpaceCoin Infrastructure Report', project: 'SpaceCoin', result: 'First Korean-language satellite internet research' }
      ]}
      currentSlug="deep-research"
    >
      {/* Research Focus Section */}
      <section className="py-12 md:py-16 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-10">
            <span className="text-xs font-medium tracking-wider uppercase mb-3 block" style={{ color: ACCENT_COLOR }}>
              Beyond the Surface
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Research Focus
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              What we analyze to give you the edge in the Korean market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {researchFocusAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div 
                  key={area.title}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-cyan-500/30 transition-all"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${ACCENT_COLOR}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{area.title}</h3>
                  <p className="text-sm text-white/60">{area.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Research Dashboard Section */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-10">
            <span className="text-xs font-medium tracking-wider uppercase mb-3 block" style={{ color: ACCENT_COLOR }}>
              Live Dashboard
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Research That Drives Results
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Explore our real-time market intelligence dashboard. From on-chain data to actionable insights, 
              we deliver the analysis you need to succeed in the Korean market.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ResearchDashboard />
          </div>
        </div>
      </section>

      {/* Distribution Flow Section */}
      <section className="py-10 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8">
              {/* Research Icon */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3" style={{
                  backgroundColor: `${ACCENT_COLOR}20`
                }}>
                  <FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" style={{ color: ACCENT_COLOR }} />
                </div>
                <span className="text-sm font-medium text-foreground">Research</span>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#06B6D4] to-[#06B6D4]/30" />
                <Share2 className="w-5 h-5 mx-2" style={{ color: ACCENT_COLOR }} />
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#06B6D4]/30 to-[#06B6D4]" />
              </div>

              {/* Distribution Channels */}
              <div className="flex-1 max-w-sm w-full">
                <div className="text-center mb-3 sm:mb-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Distributed Through
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {distributionChannels.map((channel, index) => {
                    const Icon = channel.icon;
                    return (
                      <div 
                        key={channel.name} 
                        className={`p-2.5 sm:p-4 rounded-lg sm:rounded-xl border-2 bg-background/50 text-center transition-all flex flex-col items-center gap-1.5 sm:gap-2 ${
                          activeChannel === index ? 'scale-[1.08]' : ''
                        }`} 
                        style={{
                          borderColor: activeChannel === index ? ACCENT_COLOR : 'rgba(255,255,255,0.1)'
                        }}
                      >
                        <Icon 
                          className="w-4 h-4 sm:w-5 sm:h-5" 
                          style={{
                            color: activeChannel === index ? ACCENT_COLOR : 'rgba(255,255,255,0.5)'
                          }} 
                        />
                        <span className="text-[10px] sm:text-xs font-medium text-foreground">
                          {channel.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#06B6D4] to-[#06B6D4]/30" />
                <Newspaper className="w-5 h-5 mx-2" style={{ color: ACCENT_COLOR }} />
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#06B6D4]/30 to-[#06B6D4]" />
              </div>

              {/* Result */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3" style={{
                  backgroundColor: `${ACCENT_COLOR}20`
                }}>
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" style={{ color: ACCENT_COLOR }} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-foreground">Brand Authority</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Research Preview Section */}
      {researchPosts && researchPosts.length > 0 && (
        <section className="py-10 md:py-12 border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Latest Research</h3>
              <Link 
                to="/research" 
                className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {researchPosts.map(post => (
                <Link
                  key={post.id}
                  to={`/research/${post.slug}`}
                  className="group p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-cyan-500/50 transition-all"
                >
                  {post.image && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-3">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="text-xs text-cyan-400 mb-1">{post.category}</div>
                  <h4 className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="text-xs text-white/40 mt-2">{post.read_time}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Korean Crypto Market Research"
        description="Data-driven market research for the Korean crypto market. Korean Web3 marketing insights distributed through media and KOL networks."
        url="/services/deep-research"
        serviceType={["Market Research", "Competitor Analysis", "Investment Thesis", "Crypto Research"]}
      />
    </ServicePageLayout>
  );
};

export default DeepResearchService;