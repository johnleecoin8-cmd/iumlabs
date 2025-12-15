import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";

// Import blog images
import aiAgentsImg from "@/assets/blog/ai-agents-defi.jpg";
import ecosystemImg from "@/assets/blog/ecosystem-growth-2025.jpg";
import kolImg from "@/assets/blog/kol-marketing.jpg";
import communityImg from "@/assets/blog/community-growth-ai.jpg";
import cryptoMarketingImg from "@/assets/blog/crypto-marketing-bear.jpg";

const insights = [
  {
    id: "ai-agents-defi",
    title: "AI Agents Are Revolutionizing DeFi",
    excerpt: "How autonomous AI is reshaping liquidity and trading strategies in crypto.",
    date: "2 days ago",
    readTime: "5 min",
    category: "AI",
    image: aiAgentsImg,
  },
  {
    id: "ecosystem-growth-2025",
    title: "Ecosystem Growth Strategies for 2025",
    excerpt: "Proven frameworks for building sustainable Web3 communities.",
    date: "5 days ago",
    readTime: "8 min",
    category: "Strategy",
    image: ecosystemImg,
  },
  {
    id: "kol-marketing",
    title: "The State of KOL Marketing",
    excerpt: "What works and what doesn't in crypto influencer campaigns.",
    date: "1 week ago",
    readTime: "6 min",
    category: "Marketing",
    image: kolImg,
  },
  {
    id: "community-growth-ai",
    title: "Building Communities with AI Tools",
    excerpt: "Leveraging automation for authentic community engagement.",
    date: "2 weeks ago",
    readTime: "7 min",
    category: "Community",
    image: communityImg,
  },
  {
    id: "crypto-marketing-bear",
    title: "Marketing in Bear Markets",
    excerpt: "Strategic approaches to maintain growth during market downturns.",
    date: "3 weeks ago",
    readTime: "6 min",
    category: "Strategy",
    image: cryptoMarketingImg,
  }
];

const InsightsSection = () => {
  const featuredArticle = insights[0];
  const listArticles = insights.slice(1, 5);

  return (
    <section className="relative bg-gradient-to-br from-[#0A0A0B] via-[#0D1117] to-[#0A0A0B] py-20 md:py-28 overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/8 to-primary/8 blur-[120px] pointer-events-none animate-blob-delay-2" />
      <div className="absolute bottom-20 -left-20 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-primary/10 to-cyan-500/5 blur-[100px] pointer-events-none animate-blob" />
      
      {/* Dot Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
      
      {/* Glow Line Top */}
      <div className="absolute top-0 left-0 right-0 h-px glow-line-cyan" />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* 4pillars-style Header */}
        <SectionHeader 
          title="INSIGHTS" 
          linkTo="/research" 
          linkText="VIEW ALL"
          dark={true}
        />

        {/* Featured + List Layout */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left - Featured Article (Large Card) - Enhanced 4pillars Style */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to={`/research/${featuredArticle.id}`} className="group block">
              <div 
                className="relative rounded-2xl overflow-hidden h-[400px] md:h-[480px] lg:h-[520px] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl"
                style={{ perspective: "1000px" }}
              >
                {/* Background Image with Enhanced Zoom */}
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 lg:p-10 flex flex-col justify-end">
                  {/* Category Badge - Enhanced */}
                  <motion.span 
                    className="inline-block bg-white/10 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 w-fit border border-white/20 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300"
                  >
                    {featuredArticle.category}
                  </motion.span>

                  {/* Title - Much Larger */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight group-hover:text-white transition-colors">
                    {featuredArticle.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-white/70 text-base md:text-lg lg:text-xl mb-6 line-clamp-2 max-w-2xl">
                    {featuredArticle.excerpt}
                  </p>

                  {/* Meta + Read More */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-white/50 text-sm font-mono">{featuredArticle.date}</span>
                      <span className="text-white/30">·</span>
                      <span className="text-white/50 text-sm">{featuredArticle.readTime} read</span>
                    </div>
                    
                    {/* Read More Arrow */}
                    <div className="flex items-center gap-2 text-white/50 group-hover:text-primary transition-colors">
                      <span className="text-sm font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        Read article
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right - Article List - Enhanced */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {listArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link 
                  to={`/research/${article.id}`} 
                  className="group flex gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-white/[0.15] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-lg overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-primary/80 text-xs font-semibold">{article.category}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-white/40 text-xs font-mono">{article.date}</span>
                    </div>
                    
                    <h4 className="text-white font-semibold text-sm md:text-base group-hover:text-primary transition-colors line-clamp-2 mb-1">
                      {article.title}
                    </h4>
                    
                    <span className="text-white/30 text-xs">{article.readTime} read</span>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 self-center">
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Glow Line Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
    </section>
  );
};

export default InsightsSection;
