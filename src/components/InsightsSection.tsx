import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Logo3D from "@/components/Logo3D";

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

  return (
    <section className="bg-background">
      <div className="flex flex-col md:flex-row">
        {/* Left: Articles List */}
        <div className="w-full md:w-2/3 md:border-r border-border">
          {insights.map((article, index) => (
            <div key={article.id}>
              <Link
                to={`/research/${article.id}`}
                className={`group block p-4 sm:p-5 md:p-6 lg:p-8 transition-colors duration-300 hover:bg-secondary/50 active:bg-secondary/70 ${
                  index < insights.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-muted-foreground text-[10px] sm:text-xs mb-1.5 sm:mb-2">
                  <span className="uppercase tracking-wider">{article.category}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{article.date}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">{article.readTime} read</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2 group-hover:text-foreground/80 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors text-xs sm:text-sm min-h-[40px] sm:min-h-0">
                  <span className="group-hover:underline underline-offset-4">Read article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          ))}

          {/* View All Link */}
          <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-t border-border">
            <Link
              to="/research"
              className="group inline-flex items-center gap-2 text-foreground font-medium hover:text-foreground/70 transition-colors text-sm"
            >
              <span className="group-hover:underline underline-offset-4">View all research</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right: Newsletter CTA */}
        <div className="w-full md:w-1/3 p-4 sm:p-6 md:p-6 lg:p-8 flex flex-col justify-center">
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Latest Research
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-sm">
            Stay ahead with our insights on Korean Web3 market trends and strategies.
          </p>

          <form onSubmit={handleSubscribe} className="mb-4 sm:mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent px-3 sm:px-4 py-3 border border-border rounded-lg text-foreground placeholder:text-muted-foreground mb-2 sm:mb-3 focus:outline-none focus:border-foreground transition-colors min-h-[44px] text-sm"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full flex items-center justify-center gap-2 bg-foreground text-background px-5 sm:px-6 py-3 text-xs sm:text-sm font-medium rounded-full hover:bg-foreground/90 active:bg-foreground/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 min-h-[44px]"
            >
              {isSubmitting ? "Subscribing..." : "SUBSCRIBE"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="h-24 sm:h-32 w-full hidden sm:block">
            <Logo3D />
          </div>

          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
            <p className="text-muted-foreground text-xs sm:text-sm">
              Join 500+ Web3 founders getting our weekly insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
