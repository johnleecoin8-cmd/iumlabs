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
        .limit(8);
      if (error) throw error;
      return (data || []).map(post => ({
        id: post.slug,
        title: post.title,
        date: post.date || new Date(post.created_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: post.read_time || calculateReadTime(post.content),
        category: post.category || 'Blog',
        image: post.image || '',
        author: post.author || '',
        authorImage: post.author_image || '',
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
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-xs sm:text-sm text-white/35">Deep research on the Korean crypto market.</p>
        </div>

        <Link to="/blog" className="group inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors flex-shrink-0">
          All articles <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 4x2 Grid */}
      {insights.length === 0 ? (
        <div className="p-8 text-center text-white/30 text-sm">No articles yet.</div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {insights.slice(0, 8).map((article) => (
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
              <div className="p-3">
                <div className="hidden sm:flex items-center gap-2 text-[10px] text-white/30 mb-1.5">
                  <span className="uppercase tracking-wider">{article.category}</span>
                  <span>·</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-white/80 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Subscribe row - hidden on mobile */}
      <form onSubmit={handleSubscribe} className="hidden sm:flex mt-5 flex-col sm:flex-row items-center gap-3 justify-center">
        <p className="text-[11px] text-white/25 hidden sm:block">Join 500+ Web3 founders</p>
        <div className="flex gap-1.5">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors w-full sm:w-48"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-lg hover:bg-white/90 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "..." : "Subscribe"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default InsightsSection;
