import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Clock, ArrowRight, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Research thumbnail images
import ecosystemGrowthImg from "@/assets/blog/ecosystem-growth-2025.jpg";
import aiAgentsDefiImg from "@/assets/blog/ai-agents-defi.jpg";
import avoidFloppedTgeImg from "@/assets/blog/avoid-flopped-tge.jpg";
import communityGrowthAiImg from "@/assets/blog/community-growth-ai.jpg";
import nftEvolutionImg from "@/assets/blog/nft-evolution.jpg";
import cryptoMarketingBearImg from "@/assets/blog/crypto-marketing-bear.jpg";
import kolMarketingImg from "@/assets/blog/kol-marketing.jpg";
import kaitoMindshareImg from "@/assets/blog/kaito-mindshare.jpg";

// Research posts data - keeping the same content structure
export const researchPosts = [
  {
    id: "1",
    slug: "ecosystem-growth-2025",
    title: "The State of Ecosystem Growth in 2025",
    image: ecosystemGrowthImg,
    date: "Dec 11, 2024",
    readTime: "18 min read",
    category: "Market Research",
    author: "James Lee",
    authorRole: "Co-Founder",
    excerpt: "A comprehensive analysis of the current state of Web3 ecosystem growth, focusing on Korean market dynamics and institutional trends.",
    tags: ["Ecosystem", "Growth", "Korea", "2025"],
    content: `Full content here...`,
  },
  {
    id: "2",
    slug: "ai-agents-defi",
    title: "AI Agents & DeFi: The DeFAI Revolution",
    image: aiAgentsDefiImg,
    date: "Dec 10, 2024",
    readTime: "22 min read",
    category: "DeFi",
    author: "David Kim",
    authorRole: "Co-Founder",
    excerpt: "Deep-dive into the intersection of artificial intelligence and decentralized finance, exploring market dynamics and opportunities.",
    tags: ["AI", "DeFi", "Agents", "Automation"],
    content: `Full content here...`,
  },
  {
    id: "3",
    slug: "avoid-flopped-tge",
    title: "How to Avoid a Flopped TGE in 2025",
    image: avoidFloppedTgeImg,
    date: "Dec 9, 2024",
    readTime: "15 min read",
    category: "Strategy",
    author: "James Lee",
    authorRole: "Co-Founder",
    excerpt: "Critical strategies and common pitfalls to avoid when planning your token generation event in today's market.",
    tags: ["TGE", "Token", "Strategy", "Launch"],
    content: `Full content here...`,
  },
  {
    id: "4",
    slug: "community-growth-ai",
    title: "Building Sticky Communities with AI Tools",
    image: communityGrowthAiImg,
    date: "Dec 5, 2024",
    readTime: "12 min read",
    category: "Community",
    author: "David Kim",
    authorRole: "Co-Founder",
    excerpt: "How to leverage AI-powered tools to build and maintain engaged Web3 communities that drive long-term value.",
    tags: ["Community", "AI", "Growth", "Discord"],
    content: `Full content here...`,
  },
  {
    id: "5",
    slug: "nft-evolution",
    title: "The Evolution of NFTs: Beyond PFPs",
    image: nftEvolutionImg,
    date: "Dec 1, 2024",
    readTime: "14 min read",
    category: "NFT",
    author: "James Lee",
    authorRole: "Co-Founder",
    excerpt: "How NFTs are evolving from profile pictures to utility-driven assets and what it means for the Korean market.",
    tags: ["NFT", "Evolution", "Utility", "Art"],
    content: `Full content here...`,
  },
  {
    id: "6",
    slug: "crypto-marketing-bear",
    title: "Marketing in a Bear Market: What Works",
    image: cryptoMarketingBearImg,
    date: "Nov 28, 2024",
    readTime: "10 min read",
    category: "Marketing",
    author: "David Kim",
    authorRole: "Co-Founder",
    excerpt: "Proven strategies for maintaining visibility and community engagement during market downturns.",
    tags: ["Marketing", "Bear Market", "Strategy"],
    content: `Full content here...`,
  },
  {
    id: "7",
    slug: "kol-marketing",
    title: "The Complete Guide to KOL Marketing in Korea",
    image: kolMarketingImg,
    date: "Nov 25, 2024",
    readTime: "20 min read",
    category: "Marketing",
    author: "James Lee",
    authorRole: "Co-Founder",
    excerpt: "Everything you need to know about working with Korean crypto influencers for maximum impact.",
    tags: ["KOL", "Influencer", "Korea", "Marketing"],
    content: `Full content here...`,
  },
  {
    id: "8",
    slug: "kaito-mindshare",
    title: "Mastering Kaito Mindshare Rankings",
    image: kaitoMindshareImg,
    date: "Nov 20, 2024",
    readTime: "16 min read",
    category: "Strategy",
    author: "David Kim",
    authorRole: "Co-Founder",
    excerpt: "A tactical guide to improving your project's visibility and ranking on Kaito's mindshare metrics.",
    tags: ["Kaito", "Mindshare", "Social", "Strategy"],
    content: `Full content here...`,
  },
];

const categories = ["All", "Market Research", "DeFi", "Strategy", "Community", "NFT", "Marketing"];

const Research = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const filteredPosts = researchPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = researchPosts[0];
  const secondaryPosts = researchPosts.slice(1, 3);
  const remainingPosts = selectedCategory === "All" && !searchQuery 
    ? filteredPosts.slice(3) 
    : filteredPosts;

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
      
      {/* Newspaper-Style Masthead */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]">
        <section className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#0A0A0A] border-b border-indigo-500/20">
          <div className="container mx-auto max-w-7xl px-4 md:px-8 py-12 md:py-20">
            {/* Masthead */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-indigo-400/60 text-xs tracking-[0.3em] uppercase mb-4">Web3 Marketing Intelligence</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight">
                Ium Labs <span className="italic text-indigo-400">Research</span>
              </h1>
              <div className="flex items-center justify-center gap-4 mt-6 text-white/40 text-sm">
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span>{researchPosts.length} Articles</span>
              </div>
            </motion.div>

            {/* Search & Categories */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                      selectedCategory === category 
                        ? "bg-indigo-500 text-white" 
                        : "text-white/50 hover:text-white hover:bg-white/5 border border-white/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border-white/10 rounded-full pl-10 pr-4 h-10 text-white placeholder:text-white/40"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Featured Section: 1 Large + 2 Small */}
      {selectedCategory === "All" && !searchQuery && (
        <section className="bg-[#0A0A0A] py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Featured Article */}
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link to={`/research/${featuredPost.slug}`} className="group block">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-indigo-500 text-white text-xs rounded-full">Featured</span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-indigo-400 text-sm mb-2">{featuredPost.category}</p>
                      <h2 className="text-2xl md:text-3xl font-medium text-white leading-tight group-hover:text-indigo-100 transition-colors">
                        {featuredPost.title}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm font-medium">
                        {featuredPost.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white text-sm">{featuredPost.author}</p>
                        <p className="text-white/40 text-xs">{featuredPost.date} • {featuredPost.readTime}</p>
                      </div>
                    </div>
                    <span className="text-indigo-400 flex items-center gap-2 text-sm group-hover:gap-3 transition-all">
                      Read <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* Secondary Articles */}
              <div className="space-y-6">
                {secondaryPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/research/${post.slug}`} className="group flex gap-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-indigo-400/70 text-xs mb-1">{post.category}</p>
                        <h3 className="text-white text-sm font-medium leading-snug group-hover:text-indigo-100 transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-white/40 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                {/* Newsletter Mini Card */}
                <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                  <p className="text-white text-sm font-medium mb-1">Stay Updated</p>
                  <p className="text-white/50 text-xs mb-3">Get research updates weekly.</p>
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-400 transition-colors disabled:opacity-50"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article List - Horizontal Cards */}
      <section className="bg-[#0A0A0A] py-12 border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-medium text-white">
              {selectedCategory === "All" && !searchQuery ? "Latest Articles" : `${filteredPosts.length} Results`}
            </h2>
          </div>

          <div className="space-y-6">
            {(selectedCategory === "All" && !searchQuery ? remainingPosts : filteredPosts).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={`/research/${post.slug}`}
                  className="group flex flex-col md:flex-row gap-6 p-4 md:p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-indigo-500/30 hover:bg-white/[0.03] transition-all"
                >
                  {/* Image */}
                  <div className="w-full md:w-48 h-48 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-indigo-400/70 text-xs">{post.category}</span>
                        <span className="text-white/30 text-xs">•</span>
                        <span className="text-white/40 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-white group-hover:text-indigo-100 transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-white/50 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-white/50 text-xs">{post.author}</span>
                        <span className="text-white/30 text-xs">•</span>
                        <span className="text-white/40 text-xs">{post.date}</span>
                      </div>
                      <span className="text-indigo-400 flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Read <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Newsletter Banner */}
      <section className="bg-gradient-to-b from-[#0A0A0A] to-indigo-950/20 py-16 border-t border-indigo-500/20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Get <span className="italic text-indigo-400">research</span> in your inbox
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Weekly insights on Web3 marketing, Korean market trends, and actionable strategies.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubscribing ? "..." : "Subscribe"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Research;
