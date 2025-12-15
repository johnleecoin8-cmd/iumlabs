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
    date: "Dec 2024",
    readTime: "5 min",
    category: "AI",
    image: aiAgentsImg,
  },
  {
    id: "ecosystem-growth-2025",
    title: "Ecosystem Growth Strategies for 2025",
    excerpt: "Proven frameworks for building sustainable Web3 communities.",
    date: "Dec 2024",
    readTime: "8 min",
    category: "Strategy",
    image: ecosystemImg,
  },
  {
    id: "kol-marketing",
    title: "The State of KOL Marketing",
    excerpt: "What works and what doesn't in crypto influencer campaigns.",
    date: "Nov 2024",
    readTime: "6 min",
    category: "Marketing",
    image: kolImg,
  },
  {
    id: "community-growth-ai",
    title: "Building Communities with AI Tools",
    excerpt: "Leveraging automation for authentic community engagement.",
    date: "Nov 2024",
    readTime: "7 min",
    category: "Community",
    image: communityImg,
  },
  {
    id: "crypto-marketing-bear",
    title: "Marketing in Bear Markets",
    excerpt: "Strategic approaches to maintain growth during market downturns.",
    date: "Oct 2024",
    readTime: "6 min",
    category: "Strategy",
    image: cryptoMarketingImg,
  }
];

const InsightsSection = () => {
  const featuredArticle = insights[0];
  const listArticles = insights.slice(1, 5);

  return (
    <section className="relative bg-[#0A0A0B] py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* 4pillars-style Header */}
        <SectionHeader 
          title="INSIGHTS" 
          linkTo="/research" 
          linkText="VIEW ALL"
          dark={true}
        />

        {/* Featured + List Layout */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left - Featured Article (Large Card) */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to={`/research/${featuredArticle.id}`} className="group block">
              <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[480px] lg:h-[520px]">
                {/* Background Image */}
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  {/* Category Badge */}
                  <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full mb-4 w-fit border border-white/10">
                    {featuredArticle.category}
                  </span>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors line-clamp-3">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-white/70 text-base md:text-lg mb-4 line-clamp-2 max-w-xl">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center gap-4">
                    <span className="text-white/50 text-sm">{featuredArticle.date}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/50 text-sm">{featuredArticle.readTime} read</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right - Article List */}
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
                  className="group flex gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white/40 text-xs">{article.category}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-white/40 text-xs">{article.date}</span>
                    </div>
                    
                    <h4 className="text-white font-semibold text-sm md:text-base group-hover:text-white/80 transition-colors line-clamp-2 mb-1">
                      {article.title}
                    </h4>
                    
                    <span className="text-white/30 text-xs">{article.readTime} read</span>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 self-center">
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
