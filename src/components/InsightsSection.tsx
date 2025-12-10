import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const insights = [
  {
    id: 1,
    date: "Dec 2024",
    title: "Korea's Web3 Gaming Market: 2025 Outlook",
    author: "James",
    category: "Research",
    excerpt: "A deep dive into the rapidly evolving Korean GameFi landscape and what it means for global projects.",
  },
  {
    id: 2,
    date: "Nov 2024",
    title: "KOL Marketing Strategies for Korean Crypto Projects",
    author: "David",
    category: "Guide",
    excerpt: "How to effectively partner with Korean crypto influencers and measure ROI on your campaigns.",
  },
  {
    id: 3,
    date: "Nov 2024",
    title: "Regulatory Landscape: Korea's Crypto Framework",
    author: "James",
    category: "Analysis",
    excerpt: "Understanding VASP requirements, AML compliance, and the evolving regulatory environment in Korea.",
  },
];

const InsightsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Subscribed!",
      description: "You'll receive our latest insights directly to your inbox.",
    });
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Header + Newsletter */}
          <div className={`lg:col-span-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-primary font-mono text-sm tracking-wider mb-4 block">03. INSIGHTS</span>
            <h2 className="text-3xl md:text-4xl tracking-tight mb-4">
              <span className="font-sans font-bold text-foreground">Latest</span>{" "}
              <span className="font-serif italic text-primary">Research</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Deep dives into the Korean Web3 ecosystem, market trends, and strategic guides.
            </p>

            {/* Newsletter Signup - a16z style */}
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get weekly insights on Korea's crypto market delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 border-border/50 rounded-lg"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column - Articles */}
          <div className="lg:col-span-2 space-y-6">
            {insights.map((insight, index) => (
              <article
                key={insight.id}
                className={`group p-6 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${100 + index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                      {insight.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {insight.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {insight.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {insight.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3 h-3" />
                        {insight.author}
                      </span>
                    </div>
                  </div>

                  {/* Read More Arrow */}
                  <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium hidden md:inline">Read</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}

            {/* View All Link */}
            <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <Link 
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-sm"
              >
                View All Insights
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
