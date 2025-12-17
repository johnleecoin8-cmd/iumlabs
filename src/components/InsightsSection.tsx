import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
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

const IndigoSphere = () => (
  <motion.div
    className="relative w-40 h-40 mx-auto"
    animate={{ rotateY: 360, rotateX: 15 }}
    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    style={{ transformStyle: "preserve-3d" }}
  >
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 30%, #818CF8 50%, #4F46E5 70%, #3730A3 100%)",
        boxShadow: "0 20px 40px rgba(79, 70, 229, 0.4), inset 0 0 60px rgba(255, 255, 255, 0.1)"
      }}
    />
    <div
      className="absolute inset-6 rounded-full"
      style={{
        background: "linear-gradient(225deg, #818CF8 0%, #6366F1 50%, #4F46E5 100%)",
        opacity: 0.8
      }}
    />
    {/* Book icon overlay */}
    <div className="absolute inset-0 flex items-center justify-center">
      <BookOpen className="w-12 h-12 text-white/40" strokeWidth={1} />
    </div>
  </motion.div>
);

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

  return (
    <section className="bg-[#0A0A0A] relative overflow-hidden">
      {/* Deep blue/indigo gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row relative">
        {/* Left: Articles List */}
        <div className="w-full lg:w-2/3 lg:border-r border-white/10">
          {insights.map((article, index) => {
            const colors = categoryColors[article.category] || categoryColors["Strategy"];
            
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/research/${article.id}`}
                  className={`group block p-8 md:p-10 transition-colors duration-300 hover:bg-white/5 relative ${
                    index < insights.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  {/* Left accent bar on hover */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: colors.text }}
                  />
                  
                  <div className="flex items-center gap-3 text-white/40 text-xs mb-3">
                    <span 
                      className="uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`
                      }}
                    >
                      {article.category}
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime} read</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/80 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-white/40 group-hover:text-indigo-400 transition-colors text-sm">
                    Read article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* View All Link */}
          <div className="p-8 md:p-10 border-t border-white/10">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
            >
              View all research
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right: Newsletter CTA */}
        <motion.div
          className="w-full lg:w-1/3 p-8 md:p-12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Latest <span className="text-indigo-400">Research</span>
          </h2>
          <p className="text-white/50 leading-relaxed mb-8">
            Stay ahead with our insights on Korean Web3 market trends, marketing strategies, and ecosystem analysis.
          </p>

          <form onSubmit={handleSubscribe} className="mb-12">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent px-4 py-3 border border-indigo-500/30 text-white placeholder:text-white/40 mb-3 focus:outline-none focus:border-indigo-400 transition-colors rounded"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-6 py-3 text-sm font-medium hover:from-indigo-600 hover:to-violet-600 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-indigo-500/20 rounded"
            >
              {isSubmitting ? "Subscribing..." : "SUBSCRIBE"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <IndigoSphere />

          <div className="mt-12 pt-8 border-t border-indigo-500/20">
            <p className="text-white/40 text-sm">
              Join <span className="text-indigo-400">500+</span> Web3 founders and marketers getting our weekly insights.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InsightsSection;
