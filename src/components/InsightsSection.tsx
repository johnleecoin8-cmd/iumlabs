import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

const calculateReadTime = (content: string | null): string => {
  if (!content) return "5 min";
  const minutes = Math.ceil(content.split(/\s+/).length / 200);
  return `${minutes} min`;
};

interface InsightArticle {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const InsightsSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: insights = [] } = useQuery({
    queryKey: ['insights-research-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_posts')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })
        .limit(6);
      if (error) throw error;
      return (data || []).map(post => ({
        id: post.slug,
        title: post.title,
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
    } catch {
      toast.error("Failed to subscribe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

        {/* Left — sticky intro */}
        <div className="lg:w-[280px] xl:w-[320px] flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Latest Blog</h2>
          <p className="text-sm text-white/40 leading-relaxed mb-6">
            Deep research and strategic insights on the Korean crypto market — from exchange dynamics to KOL trends.
          </p>

          {/* Subscribe */}
          <form onSubmit={handleSubscribe} className="mb-5">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-white/90 transition-all disabled:opacity-50 flex-shrink-0"
              >
                {isSubmitting ? "..." : "Subscribe"}
              </button>
            </div>
            <p className="text-[10px] text-white/20 mt-2">Join 500+ Web3 founders. Weekly insights.</p>
          </form>

          <Link to="/blog" className="group inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
            View all articles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right — 3x2 grid */}
        <div className="flex-1 min-w-0">
          {insights.length === 0 ? (
            <div className="p-8 text-center text-white/30 text-sm">No articles yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {insights.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.id}`}
                  className="group block rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    {article.image ? (
                      <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-white/[0.03]" />
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 text-[10px] text-white/30 mb-1.5">
                      <span className="uppercase tracking-wider">{article.category}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
