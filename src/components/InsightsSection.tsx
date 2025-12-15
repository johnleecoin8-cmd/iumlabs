import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Mail, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import aiAgentsImg from "@/assets/blog/ai-agents-defi.jpg";
import kaitoImg from "@/assets/blog/kaito-mindshare.jpg";
import ecosystemImg from "@/assets/blog/ecosystem-growth-2025.jpg";

const insights = [{
  id: "ai-agents-defi",
  title: "The Rise of AI Agents in DeFi",
  excerpt: "How autonomous AI agents are reshaping decentralized finance and creating new opportunities in the Korean market.",
  date: "Dec 10, 2024",
  readTime: "8 min read",
  category: "Research",
  image: aiAgentsImg,
  trending: true
}, {
  id: "kaito-mindshare",
  title: "Kaito Mindshare: New Metric for Web3",
  excerpt: "Understanding the emerging mindshare metrics and their impact on Web3 marketing strategies.",
  date: "Dec 8, 2024",
  readTime: "6 min read",
  category: "Analysis",
  image: kaitoImg,
  trending: false
}, {
  id: "ecosystem-growth-2025",
  title: "Ecosystem Growth Strategies for 2025",
  excerpt: "Key trends and strategies for sustainable ecosystem growth in the evolving Web3 landscape.",
  date: "Dec 5, 2024",
  readTime: "10 min read",
  category: "Strategy",
  image: ecosystemImg,
  trending: true
}];

const InsightsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({ email });
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
    <section ref={ref} className="px-4 bg-[#0A0A0B] py-16 md:py-24">
      <div className="container mx-auto max-w-7xl">
        {/* Option B Header */}
        <motion.div 
          className="relative mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="absolute -top-8 left-0 text-[100px] md:text-[140px] font-bold text-white/[0.03] leading-none pointer-events-none select-none">
            08
          </span>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-white/50">Latest</span>{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Research
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mt-4 rounded-full" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left - Newsletter */}
          <div className={`lg:col-span-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="lg:sticky lg:top-32">
              <p className="text-white/60 mb-8">
                Stay ahead with our market insights, research reports, and strategy guides for the Korean Web3 ecosystem.
              </p>

              {/* Newsletter Form - Dark Glass Style */}
              <form onSubmit={handleSubscribe} className="space-y-4 p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}</span>
                </button>
              </form>

              <Link
                to="/research"
                className="group inline-flex items-center gap-2 text-white/40 hover:text-primary transition-colors mt-6 text-sm"
              >
                View all research
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right - Articles */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {insights.map((article, index) => (
                <Link
                  key={article.id}
                  to={`/research/${article.id}`}
                  className={`group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.06] transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
                  </div>

                  {/* Image */}
                  <div className="relative md:w-56 h-40 rounded-xl overflow-hidden flex-shrink-0 border border-white/[0.08]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {article.trending && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md bg-primary/90 backdrop-blur-sm">
                        <TrendingUp className="w-3 h-3 text-white" />
                        <span className="text-[10px] text-white font-medium uppercase">Trending</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-primary uppercase tracking-wider font-medium px-2 py-1 rounded-md bg-primary/10 border border-primary/20">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-white/40">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-white/40 text-xs">
                      <span>{article.date}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/[0.05] backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary/20 border border-white/[0.1]">
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;