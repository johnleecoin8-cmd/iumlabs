import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";
import ResearchHeader from "@/components/research/ResearchHeader";
import SpotlightCard from "@/components/research/SpotlightCard";
import ReportListItem from "@/components/research/ReportListItem";
import TrendingSidebar from "@/components/research/TrendingSidebar";
import ResearchCard from "@/components/research/ResearchCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useQuery } from "@tanstack/react-query";

// Research thumbnail images
import ecosystemGrowthImg from "@/assets/blog/ecosystem-growth-2025.jpg";
import aiAgentsDefiImg from "@/assets/blog/ai-agents-defi.jpg";
import avoidFloppedTgeImg from "@/assets/blog/avoid-flopped-tge.jpg";
import communityGrowthAiImg from "@/assets/blog/community-growth-ai.jpg";
import nftEvolutionImg from "@/assets/blog/nft-evolution.jpg";
import cryptoMarketingBearImg from "@/assets/blog/crypto-marketing-bear.jpg";
import kolMarketingImg from "@/assets/blog/kol-marketing.jpg";
import kaitoMindshareImg from "@/assets/blog/kaito-mindshare.jpg";

// Hardcoded research posts data
export const researchPosts = [
  {
    id: "1",
    slug: "ecosystem-growth-2025",
    title: "The State of Ecosystem Growth in 2025: Key Insights from the Ium Labs Research Report",
    image: ecosystemGrowthImg,
    date: "Dec 11, 2024",
    readTime: "18 min read",
    category: "Market Research",
    author: "James Lee",
    authorRole: "Co-Founder & Ex-Lead of Korea at KuCoin",
    excerpt: "A comprehensive analysis of the current state of Web3 ecosystem growth, focusing on Korean market dynamics, institutional trends, and actionable strategies for projects entering the Asian market.",
    tags: ["Ecosystem", "Growth", "Korea", "2025", "Institutional"],
    content: `## Executive Summary\n\nThe Web3 ecosystem in 2025 represents a pivotal transformation from previous cycles. With total crypto market capitalization exceeding $4 trillion and daily trading volumes in Korea alone surpassing $15 billion, the landscape has fundamentally shifted from speculative trading to infrastructure-driven growth.\n\nThis research report analyzes 127 projects across 8 sectors, incorporating data from on-chain analytics, exchange reports, and exclusive interviews with 34 institutional investors. Our findings reveal three mega-trends shaping ecosystem development: institutional infrastructure maturation, regulatory clarity acceleration, and the emergence of Korea as a critical growth market.\n\n## Part 1: The Institutional Transformation\n\n### 1.1 The New Institutional Landscape\n\nThe institutional landscape has undergone a seismic shift. What began as tentative exploration in 2021 has evolved into aggressive infrastructure building and product launches.\n\n**Key Statistics:**\n- 73% of hedge funds now have crypto exposure (up from 29% in 2022)\n- $47 billion in new institutional custody solutions launched in 2024\n- 156 crypto ETF products now available globally\n\n### 1.2 Korean Institutional Development\n\nKorea presents a unique case study in institutional adoption. All top 5 banks now offer crypto custody with combined custody assets exceeding $28 billion.\n\n## Part 2: Korean Market Deep Dive\n\n### 2.1 Market Structure Analysis\n\nThe Korean cryptocurrency market operates with distinct characteristics that differentiate it from Western markets.\n\n**The Kimchi Premium Phenomenon**\n- Average premium in 2024: 2.8% (down from 8.3% in 2021)\n- Premium volatility has decreased 67% due to improved arbitrage infrastructure\n\n### 2.2 Regulatory Framework\n\nKorea's regulatory environment has matured significantly with 35 licensed VASPs as of Q1 2025.\n\n## Conclusion\n\nThe ecosystem growth trajectory in 2025 points toward continued maturation and mainstream integration. Korea stands at the center of this transformation.`,
  },
  {
    id: "2",
    slug: "ai-agents-defi",
    title: "AI Agents & DeFi: The DeFAI Revolution Transforming Finance in 2025",
    image: aiAgentsDefiImg,
    date: "Dec 10, 2024",
    readTime: "22 min read",
    category: "DeFi",
    author: "David Kim",
    authorRole: "Co-Founder & Ex-Head of BD at Binance",
    excerpt: "A comprehensive deep-dive into the revolutionary intersection of artificial intelligence and decentralized finance, exploring market dynamics, technical architecture, and investment opportunities.",
    tags: ["AI", "DeFi", "Agents", "Automation", "DeFAI"],
    content: `## The Dawn of DeFAI\n\nThe convergence of artificial intelligence and decentralized finance represents perhaps the most significant innovation since the advent of smart contracts. This fusion—which we term "DeFAI"—is creating entirely new financial primitives.\n\n## Part 1: Understanding AI Agents in DeFi\n\n### 1.1 Defining AI Agents\n\nAI agents in the DeFi context are autonomous software systems that can perceive, reason, act, and learn.\n\n### 1.2 The Technology Stack\n\nModern DeFAI agents operate on a sophisticated multi-layer architecture including data infrastructure, intelligence engine, execution framework, and security controls.\n\n## Part 2: Primary Use Cases\n\n### 2.1 Automated Yield Optimization\n\nThis represents the largest DeFAI segment by TVL with agents monitoring yield opportunities across 200+ protocols.\n\n### 2.2 MEV Protection & Extraction\n\nMaximum Extractable Value represents both a threat and opportunity for AI agents.\n\n## Conclusion\n\nThe DeFAI revolution is just beginning. Projects that successfully integrate AI capabilities will have significant competitive advantages.`,
  },
  {
    id: "3",
    slug: "avoid-flopped-tge",
    title: "Why Most Token Launches Fail in Korea (And How to Avoid a Flopped TGE)",
    image: avoidFloppedTgeImg,
    date: "Dec 8, 2024",
    readTime: "15 min read",
    category: "Strategy",
    author: "James Lee",
    authorRole: "Co-Founder & Ex-Lead of Korea at KuCoin",
    excerpt: "An in-depth analysis of the critical mistakes that lead to failed token launches in the Korean market, with actionable strategies to ensure a successful TGE.",
    tags: ["TGE", "Token Launch", "Korea", "Strategy"],
    content: `## Introduction\n\nThe Korean market represents one of the most lucrative but challenging territories for token launches. Understanding why most TGEs fail here is crucial for success.\n\n## Part 1: Common Failure Patterns\n\n### 1.1 Underestimating Localization\n\nMachine translations alienate users and lack of local support frustrates early adopters.\n\n### 1.2 Insufficient Runway\n\nAverage time to major exchange listing: 14 months. Many projects exhaust budgets before achieving critical mass.\n\n## Part 2: Success Strategies\n\n### 2.1 Building Local Presence\n\nEstablish Korean legal entity and hire native community managers.\n\n### 2.2 Exchange Strategy\n\nBegin discussions with Tier 2 exchanges first, then target major listings.\n\n## Conclusion\n\nSuccess in Korea requires deep localization commitment, regulatory compliance from day one, and patient community building.`,
  },
  {
    id: "4",
    slug: "community-growth-ai",
    title: "Community Growth in the Age of AI: Building Engaged Web3 Communities",
    image: communityGrowthAiImg,
    date: "Dec 5, 2024",
    readTime: "14 min read",
    category: "Community",
    author: "David Kim",
    authorRole: "Co-Founder & Ex-Head of BD at Binance",
    excerpt: "How AI tools are revolutionizing community management and growth strategies in the Web3 space, with practical implementation guides.",
    tags: ["Community", "AI", "Growth", "Discord", "Telegram"],
    content: `## The New Era of Community Building\n\nAI is transforming how Web3 projects build and engage their communities.\n\n## Part 1: AI-Powered Community Tools\n\n### 1.1 Automated Moderation\n\nAI moderation tools can handle 90% of routine community management tasks.\n\n### 1.2 Sentiment Analysis\n\nReal-time sentiment tracking helps identify issues before they escalate.\n\n## Part 2: Implementation Strategies\n\n### 2.1 Discord Automation\n\nSet up AI bots for onboarding, FAQ handling, and engagement tracking.\n\n### 2.2 Telegram Management\n\nLeverage AI for spam filtering and community analytics.\n\n## Conclusion\n\nAI augments human community managers rather than replacing them.`,
  },
  {
    id: "5",
    slug: "nft-evolution",
    title: "The Evolution of NFTs: From JPEGs to Real-World Assets",
    image: nftEvolutionImg,
    date: "Dec 3, 2024",
    readTime: "16 min read",
    category: "NFT",
    author: "James Lee",
    authorRole: "Co-Founder & Ex-Lead of Korea at KuCoin",
    excerpt: "Tracing the transformation of NFTs from digital collectibles to tokenized real-world assets, examining the technology, regulation, and market opportunities.",
    tags: ["NFT", "RWA", "Tokenization", "Art"],
    content: `## The NFT Transformation\n\nNFTs have evolved far beyond profile pictures and digital art.\n\n## Part 1: The RWA Revolution\n\n### 1.1 Tokenizing Real Assets\n\nReal estate, art, and commodities are being brought on-chain.\n\n### 1.2 Regulatory Landscape\n\nDifferent jurisdictions are taking varying approaches to NFT regulation.\n\n## Part 2: Market Opportunities\n\n### 2.1 Infrastructure Plays\n\nPlatforms enabling RWA tokenization represent significant opportunities.\n\n### 2.2 Korean Market Specifics\n\nKorea's tech-forward culture creates unique NFT opportunities.\n\n## Conclusion\n\nThe future of NFTs lies in utility and real-world applications.`,
  },
  {
    id: "6",
    slug: "crypto-marketing-bear",
    title: "Crypto Marketing in a Bear Market: Survival Strategies for 2024-2025",
    image: cryptoMarketingBearImg,
    date: "Nov 28, 2024",
    readTime: "12 min read",
    category: "Marketing",
    author: "David Kim",
    authorRole: "Co-Founder & Ex-Head of BD at Binance",
    excerpt: "Strategic marketing approaches for cryptocurrency projects during market downturns, focusing on capital efficiency and sustainable growth.",
    tags: ["Marketing", "Bear Market", "Strategy", "Survival"],
    content: `## Navigating the Bear\n\nBear markets require different marketing strategies than bull runs.\n\n## Part 1: Capital Efficiency\n\n### 1.1 Prioritizing ROI\n\nFocus on channels with measurable returns.\n\n### 1.2 Community Over Paid\n\nOrganic growth becomes more important when budgets are tight.\n\n## Part 2: Survival Tactics\n\n### 2.1 Building During the Bear\n\nUse downtime to strengthen fundamentals.\n\n### 2.2 Maintaining Visibility\n\nStay active without burning through resources.\n\n## Conclusion\n\nProjects that build through bear markets emerge stronger.`,
  },
  {
    id: "7",
    slug: "kol-marketing-guide",
    title: "The Ultimate KOL Marketing Guide for Web3 Projects in Korea",
    image: kolMarketingImg,
    date: "Nov 25, 2024",
    readTime: "20 min read",
    category: "Marketing",
    author: "James Lee",
    authorRole: "Co-Founder & Ex-Lead of Korea at KuCoin",
    excerpt: "A comprehensive guide to leveraging Key Opinion Leaders for Web3 marketing in the Korean market, including pricing, selection criteria, and campaign management.",
    tags: ["KOL", "Marketing", "Korea", "Influencer"],
    content: `## The KOL Landscape in Korea\n\nKorean crypto KOLs operate differently than Western influencers.\n\n## Part 1: Selection Criteria\n\n### 1.1 Engagement Over Followers\n\nFocus on engagement rates above 5%.\n\n### 1.2 Niche Alignment\n\nMatch KOL expertise with your project focus.\n\n## Part 2: Campaign Management\n\n### 2.1 Pricing Structures\n\nUnderstand the Korean market rates.\n\n### 2.2 Measuring Success\n\nTrack conversions, not just impressions.\n\n## Conclusion\n\nEffective KOL marketing requires local expertise and relationship building.`,
  },
  {
    id: "8",
    slug: "kaito-mindshare",
    title: "Mastering Kaito Mindshare: The Complete Guide to Social Intelligence",
    image: kaitoMindshareImg,
    date: "Nov 20, 2024",
    readTime: "18 min read",
    category: "Strategy",
    author: "David Kim",
    authorRole: "Co-Founder & Ex-Head of BD at Binance",
    excerpt: "Deep dive into Kaito's mindshare metrics and how to leverage social intelligence for Web3 marketing success.",
    tags: ["Kaito", "Mindshare", "Social", "Analytics"],
    content: `## Understanding Kaito Mindshare\n\nKaito has emerged as the definitive social intelligence platform for crypto.\n\n## Part 1: Core Metrics\n\n### 1.1 What Mindshare Measures\n\nShare of voice, engagement quality, and sentiment analysis.\n\n### 1.2 The Algorithm\n\nHow Kaito weighs different factors in its scoring.\n\n## Part 2: Optimization Strategies\n\n### 2.1 Content That Performs\n\nCreate content optimized for Kaito's algorithm.\n\n### 2.2 Common Mistakes\n\nAvoid tactics that destroy mindshare.\n\n## Conclusion\n\nMindshare is earned through consistent, authentic engagement.`,
  },
];

const Research = () => {
  usePageTitle("Research");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Fetch from DB, fallback to hardcoded data
  const { data: dbPosts } = useQuery({
    queryKey: ['research-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_posts')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  // Use DB data if available, otherwise fallback to hardcoded
  const posts = useMemo(() => {
    if (dbPosts && dbPosts.length > 0) {
      return dbPosts.map(post => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        image: post.image || '',
        date: post.date || '',
        readTime: post.read_time || '',
        category: post.category || '',
        author: post.author || '',
        authorRole: post.author_role || '',
        excerpt: post.excerpt || '',
        tags: post.tags || [],
      }));
    }
    return researchPosts;
  }, [dbPosts]);

  // Filter posts based on search and tab
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const categoryMap: Record<string, string> = {
        "all": "All",
        "market-research": "Market Research",
        "defi": "DeFi",
        "strategy": "Strategy",
      };
      
      const matchesCategory = activeTab === "all" || post.category === categoryMap[activeTab];
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, activeTab]);

  // Featured post is the first one
  const spotlightPost = posts[0];
  // Latest reports are posts 1-4 (excluding spotlight)
  const latestReports = posts.slice(1, 5);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubscribing(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: newsletterEmail });

      if (error) {
        if (error.code === "23505") {
          toast.error("This email is already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Successfully subscribed to research updates!");
        setNewsletterEmail("");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Sticky Research Header */}
      <ResearchHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content - 3 Column Layout */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column - Spotlight */}
          <div className="lg:col-span-4">
            <div className="sticky top-36">
              <SpotlightCard
                slug={spotlightPost.slug}
                title={spotlightPost.title}
                excerpt={spotlightPost.excerpt}
                image={spotlightPost.image}
                category={spotlightPost.category}
                date={spotlightPost.date}
                readTime={spotlightPost.readTime}
                author={spotlightPost.author}
                authorRole={spotlightPost.authorRole}
              />
            </div>
          </div>

          {/* Center Column - Latest Reports */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white">Latest Reports</h2>
              <span className="text-xs text-white/30 font-mono">{latestReports.length} items</span>
            </div>
            
            <div className="space-y-1 p-2 rounded-xl bg-white/[0.01] border border-white/[0.04]">
              {latestReports.map((post) => (
                <ReportListItem
                  key={post.id}
                  slug={post.slug}
                  title={post.title}
                  image={post.image}
                  category={post.category}
                  date={post.date}
                  readTime={post.readTime}
                  author={post.author}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Trending Sidebar */}
          <div className="lg:col-span-3">
            <TrendingSidebar />
          </div>
        </div>
      </main>

      {/* All Research Section */}
      <section className="border-t border-white/[0.04] bg-[#080808]" id="all-research">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-emerald-500 rounded-full" />
              <h2 className="text-lg font-semibold text-white">All Research</h2>
            </div>
            <span className="text-xs text-white/40">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredPosts.map((post, index) => (
                <ResearchCard
                  key={post.id}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.image}
                  category={post.category}
                  date={post.date}
                  readTime={post.readTime}
                  author={post.author}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/40">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="border-t border-white/[0.04] bg-[#0A0A0A]">
        <div className="container mx-auto px-4 sm:px-6 py-16">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-5 h-5 text-emerald-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3">
              Stay Updated
            </h2>
            <p className="text-white/50 mb-8 text-sm">
              Get the latest research reports and market insights delivered to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30 focus:border-emerald-500/50 rounded-lg"
              />
              <Button 
                type="submit" 
                disabled={isSubscribing}
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 rounded-lg"
              >
                {isSubscribing ? "..." : "Subscribe"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Research;
