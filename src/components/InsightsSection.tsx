import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import aiAgentsDefi from "@/assets/blog/ai-agents-defi.jpg";
import kaitoMindshare from "@/assets/blog/kaito-mindshare.jpg";
import ecosystemGrowth from "@/assets/blog/ecosystem-growth-2025.jpg";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "AI & Blockchain": { bg: "rgba(139, 92, 246, 0.15)", text: "#A78BFA", border: "rgba(139, 92, 246, 0.3)" },
  "Marketing": { bg: "rgba(59, 130, 246, 0.15)", text: "#60A5FA", border: "rgba(59, 130, 246, 0.3)" },
  "Strategy": { bg: "rgba(16, 185, 129, 0.15)", text: "#34D399", border: "rgba(16, 185, 129, 0.3)" },
};

const insights = [
  {
    id: "ai-agents-defi",
    title: "AI Agents in DeFi: The Next Frontier",
    excerpt: "How autonomous AI agents are reshaping decentralized finance and what it means for your project.",
    date: "Dec 10, 2024",
    readTime: "8 min",
    category: "AI & Blockchain",
    image: aiAgentsDefi,
    featured: true
  },
  {
    id: "kaito-mindshare",
    title: "Understanding Kaito Mindshare",
    excerpt: "A deep dive into the emerging mindshare metrics and how to leverage them for Web3 marketing.",
    date: "Dec 8, 2024",
    readTime: "6 min",
    category: "Marketing",
    image: kaitoMindshare,
    featured: false
  },
  {
    id: "ecosystem-growth-2025",
    title: "Ecosystem Growth Strategies for 2025",
    excerpt: "Key trends and strategies that will define successful Web3 ecosystem growth in the coming year.",
    date: "Dec 5, 2024",
    readTime: "10 min",
    category: "Strategy",
    image: ecosystemGrowth,
    featured: false
  }
];

const InsightsSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);

      if (error) throw error;

      toast.success("Successfully subscribed!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const featuredArticle = insights[0];
  const sideArticles = insights.slice(1);

  return (
    <section className="bg-[#0A0A0A] relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-indigo-400/60 text-sm uppercase tracking-wider mb-2">Latest Insights</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Research & <span className="text-indigo-400">Analysis</span>
            </h2>
          </div>
          <Link
            to="/research"
            className="hidden sm:inline-flex items-center gap-2 text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 1 + 2 Magazine Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured Article (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:row-span-2"
          >
            <Link
              to={`/research/${featuredArticle.id}`}
              className="group block h-full rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/30 transition-all duration-500 relative"
            >
              {/* Image */}
              <div className="relative h-64 lg:h-full lg:min-h-[420px] overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                {/* Category */}
                <span 
                  className="self-start px-3 py-1 rounded-full text-xs font-medium mb-4"
                  style={{ 
                    backgroundColor: categoryColors[featuredArticle.category].bg,
                    color: categoryColors[featuredArticle.category].text,
                    border: `1px solid ${categoryColors[featuredArticle.category].border}`
                  }}
                >
                  {featuredArticle.category}
                </span>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-indigo-100 transition-colors">
                  {featuredArticle.title}
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
                  {featuredArticle.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-white/40 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {featuredArticle.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.readTime}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side Articles (Small) */}
          <div className="space-y-6">
            {sideArticles.map((article, index) => {
              const colors = categoryColors[article.category] || categoryColors["Strategy"];
              
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/research/${article.id}`}
                    className="group flex gap-4 md:gap-6 p-4 rounded-xl border border-white/10 hover:border-indigo-500/30 hover:bg-white/[0.02] transition-all duration-300"
                  >
                    {/* Thumbnail */}
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <span 
                        className="self-start px-2 py-0.5 rounded-full text-[10px] font-medium mb-2"
                        style={{ 
                          backgroundColor: colors.bg,
                          color: colors.text
                        }}
                      >
                        {article.category}
                      </span>
                      <h4 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-indigo-100 transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-3 text-white/40 text-xs">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-violet-500/5"
            >
              <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
              <p className="text-white/50 text-sm mb-4">
                Get our weekly insights on Korean Web3 market trends.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2.5 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "..." : "Subscribe"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
          >
            View all research
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
