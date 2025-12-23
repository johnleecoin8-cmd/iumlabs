import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

const BlueShape = () => (
  <motion.div
    className="relative w-24 h-24 mx-auto"
    animate={{ rotateY: 360 }}
    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    style={{ transformStyle: "preserve-3d" }}
  >
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #3B82F6 100%)",
        transform: "rotateX(30deg)",
        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
      }}
    />
    <div
      className="absolute inset-6 rounded-full"
      style={{
        background: "linear-gradient(225deg, #06B6D4 0%, #3B82F6 100%)",
        transform: "rotateX(30deg) translateZ(15px)"
      }}
    />
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
    <section className="bg-[#0A0A0A]">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Articles List */}
        <div className="w-full lg:w-2/3 lg:border-r border-white/10">
          {insights.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/research/${article.id}`}
                className={`group block p-8 md:p-10 transition-colors duration-300 hover:bg-white/5 ${
                  index < insights.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <div className="flex items-center gap-3 text-white/40 text-xs mb-3">
                  <span className="uppercase tracking-wider">{article.category}</span>
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
                <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors text-sm">
                  Read article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* View All Link */}
          <div className="px-8 md:px-10 py-4 border-t border-white/10">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors"
            >
              View all research
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right: Newsletter CTA */}
        <motion.div
          className="w-full lg:w-1/3 p-6 md:p-8 flex flex-col justify-center relative"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-6 right-6 opacity-30 pointer-events-none">
            <BlueShape />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Latest Research
          </h2>
          <p className="text-white/50 leading-relaxed mb-8">
            Stay ahead with our insights on Korean Web3 market trends, marketing strategies, and ecosystem analysis.
          </p>

          <form onSubmit={handleSubscribe} className="mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent px-4 py-3 border border-white/20 text-white placeholder:text-white/40 mb-3 focus:outline-none focus:border-white transition-colors"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Subscribing..." : "SUBSCRIBE"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-white/10">
            <p className="text-white/40 text-sm">
              Join 500+ Web3 founders and marketers getting our weekly insights.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InsightsSection;
