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
  <div
    className="relative w-24 h-24 mx-auto animate-spin"
    style={{ animationDuration: "25s", transformStyle: "preserve-3d" }}
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
  </div>
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
    <section className="bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Articles List */}
        <div className="w-full lg:w-2/3 lg:border-r border-border">
          {insights.map((article, index) => (
            <div key={article.id}>
              <Link
                to={`/research/${article.id}`}
                className={`group block p-5 sm:p-6 md:p-8 lg:p-10 transition-colors duration-300 hover:bg-secondary/50 active:bg-secondary/70 ${
                  index < insights.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-muted-foreground text-[11px] sm:text-xs mb-2 sm:mb-3">
                  <span className="uppercase tracking-wider">{article.category}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{article.date}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">{article.readTime} read</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors text-sm min-h-[44px] sm:min-h-0">
                  <span className="group-hover:underline underline-offset-4">Read article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          ))}

          {/* View All Link */}
          <div className="px-6 md:px-8 lg:px-10 py-4 border-t border-border">
            <Link
              to="/research"
              className="group inline-flex items-center gap-2 text-foreground font-medium hover:text-foreground/70 transition-colors"
            >
              <span className="group-hover:underline underline-offset-4">View all research</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right: Newsletter CTA */}
        <div className="w-full lg:w-1/3 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Latest Research
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
            Stay ahead with our insights on Korean Web3 market trends, marketing strategies, and ecosystem analysis.
          </p>

          <form onSubmit={handleSubscribe} className="mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent px-4 py-4 sm:py-3 border border-border rounded-lg text-foreground placeholder:text-muted-foreground mb-3 focus:outline-none focus:border-foreground transition-colors min-h-[48px]"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 sm:py-3 text-sm font-medium rounded-full hover:bg-foreground/90 active:bg-foreground/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 min-h-[48px]"
            >
              {isSubmitting ? "Subscribing..." : "SUBSCRIBE"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <BlueShape />

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-muted-foreground text-sm">
              Join 500+ Web3 founders and marketers getting our weekly insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
