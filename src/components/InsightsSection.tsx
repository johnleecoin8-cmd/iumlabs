import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Pillars3D from "./Pillars3D";

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
  return (
    <section className="relative bg-[#0A0A0B] overflow-hidden">
      {/* 4pillars-style Hero with 3D Pillars */}
      <div className="relative min-h-[60vh] flex flex-col items-center justify-center py-20">
        {/* 3D Pillars Background */}
        <div className="absolute inset-0 w-full h-full">
          <Pillars3D className="w-full h-full" />
        </div>
        
        {/* Content over pillars */}
        <div className="relative z-10 text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/90 text-sm md:text-base uppercase tracking-[0.3em] mb-4"
          >
            Professional Research For
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-primary text-lg md:text-xl uppercase tracking-[0.2em] mb-8"
          >
            Web3 Projects and Crypto Natives
          </motion.h3>
          
          {/* Search Bar - 4pillars style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white/[0.05] border border-white/10 rounded-full px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          </motion.div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="bg-[#F5F5F5] py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          {/* Comments/Articles Header */}
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-gray-900 font-semibold uppercase tracking-wider">Research</h4>
            <Link 
              to="/research" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              VIEW ALL <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Horizontal Scrollable Cards - 4pillars style */}
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {insights.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex-shrink-0 w-[320px] md:w-[380px]"
              >
                <Link 
                  to={`/research/${article.id}`} 
                  className="group block bg-[#1a1a1a] rounded-2xl overflow-hidden hover:bg-[#222] transition-colors"
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <span className="text-primary text-xs font-medium whitespace-nowrap">
                        {article.date}
                      </span>
                      <h4 className="text-white font-medium text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-cyan-400" />
                      <span className="text-white/50 text-xs">{article.category}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            {/* View More Arrow */}
            <div className="flex-shrink-0 flex items-center justify-center w-16">
              <Link 
                to="/research"
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500 hover:bg-gray-100 transition-all"
              >
                <ArrowRight className="w-5 h-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
