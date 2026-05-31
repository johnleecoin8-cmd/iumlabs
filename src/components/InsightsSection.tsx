import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

const calculateReadTime = (content: string | null): string => {
  if (!content) return "5 min";
  const minutes = Math.ceil(content.split(/\s+/).length / 200);
  return `${minutes} min`;
};

const InsightsSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const hideSlugs = ['deconstruction-of-move-vm-layer-1s-sui-vs-aptos', 'strategic-intelligence-report-the-structural-arbitrage-of-information-markets'];
  const mobileKeywords = ['monetizing', 'megaeth', 'forensic', 'death of'];
  const allArticles = insights.filter(a => !hideSlugs.includes(a.id)).slice(0, 6);
  const articles = isMobile
    ? allArticles.filter(a => mobileKeywords.some(k => a.title.toLowerCase().includes(k) || a.id.toLowerCase().includes(k))).slice(0, 4)
    : allArticles;

  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const resetAutoRotate = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (articles.length === 0) return;
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % articles.length);
    }, 2000);
  }, [articles.length]);

  useEffect(() => {
    resetAutoRotate();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetAutoRotate]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
    resetAutoRotate();
  }, [resetAutoRotate]);

  if (articles.length === 0) {
    return (
      <section className="p-5 sm:p-6 md:p-8">
        <div className="p-8 text-center text-white/30 text-sm">No articles yet.</div>
      </section>
    );
  }

  return (
    <section className="p-5 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <p className="text-xs sm:text-sm text-white/35">Deep research on the Korean crypto market.</p>
        <Link to="/blog" className="group inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors flex-shrink-0">
          All articles <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Filmstrip Gallery */}
      <div className="flex w-full items-center gap-2 sm:gap-3 lg:gap-4" style={{ height: 'clamp(280px, 50vh, 480px)' }}>
        {articles.map((article, index) => {
          const isActive = activeIndex === index;
          return (
            <motion.div
              key={article.id}
              className="relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl h-full"
              style={{ flexBasis: 0, flexShrink: 1 }}
              animate={{
                flexGrow: isActive ? 4 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleSelect(index)}
              onHoverStart={() => handleSelect(index)}
            >
              <Link to={`/blog/${article.id}`} className="block w-full h-full">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-white/[0.05]" />
                )}

                {/* Overlay */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                    />
                  )}
                </AnimatePresence>

                {/* Content — visible when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="absolute bottom-0 left-0 right-0 p-4 sm:p-5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider">{article.category}</span>
                        <span className="text-white/20">·</span>
                        <span className="text-[9px] sm:text-[10px] text-white/40">{article.date}</span>
                      </div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-2 text-white/50 text-[10px] sm:text-xs">
                        <span>{article.readTime} read</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed state — no overlay, just dark tint */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/30" />
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Subscribe row */}
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
