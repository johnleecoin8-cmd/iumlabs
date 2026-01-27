import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

// Lazy load 3D logo to reduce initial bundle
const Logo3D = lazy(() => import("@/components/Logo3D"));

// Helper function to calculate read time from content
const calculateReadTime = (content: string | null): string => {
  if (!content) return "5 min";
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
};

// Separate component to use hooks properly
interface InsightArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const InsightArticleCard = ({ article, index }: { article: InsightArticle; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '30px',
    triggerOnce: true
  });

  return (
    <div 
      ref={ref} 
      className={cn(
        "transition-all duration-500 ease-out will-change-transform flex-1 min-w-0",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )} 
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link 
        to={`/blog/${article.id}`} 
        className="group block h-full"
      >
        {/* Card Image - Large on top */}
        <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-secondary mb-3">
          {article.image ? (
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-secondary" />
          )}
        </div>
        
        {/* Card Content */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-muted-foreground text-[9px] sm:text-xs mb-1 sm:mb-2">
          <span className="uppercase tracking-wider">{article.category}</span>
          <span>•</span>
          <span>{article.date}</span>
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 group-hover:text-foreground/80 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors text-[10px] sm:text-xs mt-2">
          <span className="group-hover:underline underline-offset-4">Read</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  );
};

const InsightsSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldLoadLogo, setShouldLoadLogo] = useState(false);
  const { shouldDisable3D } = useMobileOptimization();

  // Delay 3D logo loading to avoid blocking initial render - skip entirely on mobile
  useEffect(() => {
    if (shouldDisable3D) return;
    const timer = setTimeout(() => setShouldLoadLogo(true), 3000);
    return () => clearTimeout(timer);
  }, [shouldDisable3D]);

  // Fetch latest 3 published research posts from DB
  const { data: insights = [] } = useQuery({
    queryKey: ['insights-research-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_posts')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })
        .limit(3);
      if (error) throw error;
      return (data || []).map(post => ({
        id: post.slug,
        title: post.title,
        excerpt: post.excerpt || (post.content ? post.content.substring(0, 120) + '...' : ''),
        date: post.date || new Date(post.created_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: post.read_time || calculateReadTime(post.content),
        category: post.category || 'Blog',
        image: post.image || '',
      }));
    },
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert([{ email }]);
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
    <section className="bg-background p-4 sm:p-6 md:p-8">
      {/* Header Row: Title + Subscribe */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        {/* Left: Title & Description */}
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1">
            Latest Blog
          </h2>
          <p className="text-muted-foreground text-[11px] sm:text-xs md:text-sm">
            Stay ahead with our insights on Korean Web3 market trends and strategies.
          </p>
        </div>

        {/* Right: Subscribe Form */}
        <form onSubmit={handleSubscribe} className="flex items-center gap-2 flex-shrink-0">
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            className="bg-transparent px-3 py-2 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors min-h-[40px] text-xs sm:text-sm w-40 sm:w-48" 
            required 
          />
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="group flex items-center justify-center gap-1.5 bg-foreground text-background px-4 py-2 text-[11px] sm:text-xs font-medium rounded-full hover:bg-foreground/90 active:bg-foreground/80 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 min-h-[40px] whitespace-nowrap"
          >
            {isSubmitting ? "..." : "SUBSCRIBE"}
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>
      </div>

      {/* Cards Grid - 1 Row */}
      {insights.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          <p>No blog articles yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {insights.map((article, index) => (
            <InsightArticleCard 
              key={article.id} 
              article={article} 
              index={index} 
            />
          ))}
        </div>
      )}

      {/* Footer Row */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <p className="text-muted-foreground text-[10px] sm:text-xs">
          Join 500+ Web3 founders getting our weekly insights.
        </p>
        <Link to="/blog" className="group inline-flex items-center gap-1.5 text-foreground font-medium hover:text-foreground/70 transition-colors text-[10px] sm:text-xs">
          <span className="group-hover:underline underline-offset-4">View all</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default InsightsSection;
