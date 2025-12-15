import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Import blog images
import aiAgentsImg from "@/assets/blog/ai-agents-defi.jpg";
import ecosystemImg from "@/assets/blog/ecosystem-growth-2025.jpg";
import kolImg from "@/assets/blog/kol-marketing.jpg";
import communityImg from "@/assets/blog/community-growth-ai.jpg";

const insights = [
  {
    id: "ai-agents-defi",
    title: "AI Agents Are Revolutionizing DeFi",
    excerpt: "How autonomous AI is reshaping liquidity and trading strategies in crypto.",
    date: "Dec 2024",
    readTime: "5 min",
    category: "AI",
    image: aiAgentsImg,
    gradient: "from-emerald-400 to-cyan-400"
  },
  {
    id: "ecosystem-growth-2025",
    title: "Ecosystem Growth Strategies for 2025",
    excerpt: "Proven frameworks for building sustainable Web3 communities.",
    date: "Dec 2024",
    readTime: "8 min",
    category: "Strategy",
    image: ecosystemImg,
    gradient: "from-purple-400 to-pink-400"
  },
  {
    id: "kol-marketing",
    title: "The State of KOL Marketing",
    excerpt: "What works and what doesn't in crypto influencer campaigns.",
    date: "Nov 2024",
    readTime: "6 min",
    category: "Marketing",
    image: kolImg,
    gradient: "from-orange-400 to-rose-400"
  },
  {
    id: "community-growth-ai",
    title: "Building Communities with AI Tools",
    excerpt: "Leveraging automation for authentic community engagement.",
    date: "Nov 2024",
    readTime: "7 min",
    category: "Community",
    image: communityImg,
    gradient: "from-blue-400 to-indigo-400"
  }
];

const InsightsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 2;
  const maxIndex = Math.max(0, insights.length - visibleCards);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="relative bg-[#0A0A0B] py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header - 2 Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left - Title & CTA */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sticky top-32"
            >
              <span className="text-sm font-mono text-gray-500 mb-4 block">/ INSIGHTS</span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Latest
                <br />
                <span className="text-gray-500">Research</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-sm">
                Deep dives into Web3 marketing trends, strategies, and the Korean crypto ecosystem.
              </p>
              
              <Link 
                to="/research"
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors mb-8"
              >
                View all research
                <ExternalLink className="w-4 h-4" />
              </Link>

              {/* Navigation */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= maxIndex}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right - Cards Carousel */}
          <div className="lg:col-span-8 overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -currentIndex * 52 + "%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  className="flex-shrink-0 w-[calc(50%-12px)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/research/${insight.id}`} className="group block">
                    {/* Card with Pastel Gradient Background */}
                    <div className="relative rounded-2xl overflow-hidden h-[320px] mb-4">
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} opacity-80`} />
                      
                      {/* Image */}
                      <img 
                        src={insight.image} 
                        alt={insight.title}
                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-3 py-1.5 rounded-full">
                          {insight.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors line-clamp-2">
                        {insight.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {insight.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{insight.date}</span>
                        <span>·</span>
                        <span>{insight.readTime} read</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
