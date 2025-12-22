import { motion } from "framer-motion";
import { ArrowRight, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import aiAgentsDefi from "@/assets/blog/ai-agents-defi.jpg";
import kaitoMindshare from "@/assets/blog/kaito-mindshare.jpg";
import ecosystemGrowth from "@/assets/blog/ecosystem-growth-2025.jpg";

const insights = [
  {
    id: "ai-agents-defi",
    title: "AI Agents in DeFi: The Next Frontier",
    excerpt: "How autonomous AI agents are reshaping decentralized finance and what it means for your project.",
    date: "Dec 10, 2024",
    readTime: "8 min",
    category: "AI & Blockchain",
    image: aiAgentsDefi
  },
  {
    id: "kaito-mindshare",
    title: "Understanding Kaito Mindshare",
    excerpt: "A deep dive into the emerging mindshare metrics and how to leverage them for your Web3 marketing.",
    date: "Dec 8, 2024",
    readTime: "6 min",
    category: "Marketing",
    image: kaitoMindshare
  },
  {
    id: "ecosystem-growth-2025",
    title: "Ecosystem Growth Strategies for 2025",
    excerpt: "Key trends and strategies that will define successful Web3 ecosystem growth in the coming year.",
    date: "Dec 5, 2024",
    readTime: "10 min",
    category: "Strategy",
    image: ecosystemGrowth
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
  const otherArticles = insights.slice(1);

  return (
    <section className="relative bg-[#0A0A0A] py-20 overflow-hidden">
      {/* Magazine Masthead Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/10"
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <Newspaper className="w-5 h-5 text-blue-400" />
            </motion.div>
            <div>
              <p className="text-white/40 text-xs tracking-[0.3em] uppercase">Research & Insights</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">The Journal</h2>
            </div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm md:text-right max-w-md"
          >
            Weekly insights on Korean Web3 market trends, marketing strategies, and ecosystem analysis.
          </motion.p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Article - Large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <Link to={`/research/${featuredArticle.id}`} className="block">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Featured badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Featured
                  </span>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 text-white/60 text-xs mb-3">
                    <span className="uppercase tracking-wider">{featuredArticle.category}</span>
                    <span>•</span>
                    <span>{featuredArticle.date}</span>
                    <span>•</span>
                    <span>{featuredArticle.readTime} read</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-4 max-w-lg">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors text-sm font-medium">
                    Read article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right side - Other articles + Newsletter */}
          <div className="flex flex-col gap-6">
            {/* Other Articles - Smaller cards */}
            {otherArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/research/${article.id}`}
                  className="group flex gap-5 p-4 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
                      <span className="uppercase tracking-wider">{article.category}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-white font-semibold group-hover:text-white/80 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Newsletter Card - Floating style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative mt-auto"
            >
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10 border border-white/10">
                <div className="absolute -top-3 -right-3 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
                
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Newsletter</p>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Get Weekly Insights
                </h3>
                
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-black/30 backdrop-blur-sm px-4 py-2.5 text-sm border border-white/10 text-white placeholder:text-white/30 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "..." : <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
                
                <p className="text-white/30 text-xs mt-3">
                  Join 500+ Web3 founders
                </p>
              </div>
            </motion.div>

            {/* View all link */}
            <Link
              to="/research"
              className="inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors"
            >
              View all research
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
