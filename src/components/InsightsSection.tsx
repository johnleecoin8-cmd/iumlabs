import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Import blog images
import aiAgentsImg from "@/assets/blog/ai-agents-defi.jpg";
import kaitoImg from "@/assets/blog/kaito-mindshare.jpg";
import ecosystemImg from "@/assets/blog/ecosystem-growth-2025.jpg";

const insights = [
  {
    id: "ai-agents-defi",
    title: "The Rise of AI Agents in DeFi",
    date: "Dec 10, 2024",
    category: "Research",
    image: aiAgentsImg,
  },
  {
    id: "kaito-mindshare",
    title: "Kaito Mindshare: New Metric for Web3",
    date: "Dec 8, 2024",
    category: "Analysis",
    image: kaitoImg,
  },
  {
    id: "ecosystem-growth-2025",
    title: "Ecosystem Growth Strategies for 2025",
    date: "Dec 5, 2024",
    category: "Strategy",
    image: ecosystemImg,
  },
];

const InsightsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email });

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
    <section ref={ref} className="py-32 px-4 bg-[hsl(0,0%,5%)]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left - Newsletter */}
          <div className={`lg:col-span-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="lg:sticky lg:top-32">
              <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
                Research & Insights
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Latest <span className="text-primary">Research</span>
              </h2>
              <p className="text-white/50 mb-8">
                Stay ahead with our market insights, research reports, and strategy guides for the Korean Web3 ecosystem.
              </p>

              {/* Newsletter Form */}
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
                </button>
              </form>

              <Link 
                to="/research" 
                className="group inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors mt-6"
              >
                View all research
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right - Articles */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {insights.map((article, index) => (
                <Link
                  key={article.id}
                  to={`/research/${article.id}`}
                  className={`group flex flex-col md:flex-row gap-6 p-4 rounded-2xl hover:bg-white/5 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Image */}
                  <div className="md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-primary uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span className="text-xs text-white/30">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center">
                    <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-primary transition-colors" />
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
