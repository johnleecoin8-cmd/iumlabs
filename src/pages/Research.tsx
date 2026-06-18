import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Clock, ArrowRight, ArrowUpRight, TrendingUp, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import SEOHead from "@/components/SEOHead";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import BlogCover from "@/components/BlogCover";
import { Link, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import CalendlyButton from "@/components/CalendlyButton";
import { useQuery } from "@tanstack/react-query";
import { staticResearchPosts } from "@/data/static-research-posts";

const categories = ["All", "Market Research", "Strategy", "DeFi", "Marketing", "Technology", "Stablecoins"];

const calculateReadTime = (content: string | null): string => {
  if (!content) return "5 min read";
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const Research = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const postsPerPage = 9;

  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setSelectedTag(tagParam);
      setSelectedCategory("All");
      setCurrentPage(1);
    }
  }, [searchParams]);

  const { data: dbPosts, isLoading } = useQuery({
    queryKey: ['research-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_posts')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const dbTransformed = (dbPosts || []).map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    image: post.image || '',
    date: post.date || new Date(post.created_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: post.read_time || calculateReadTime(post.content),
    category: post.category || 'Blog',
    author: post.author || 'Ium Labs',
    authorRole: post.author_role || 'Ium Labs Team',
    excerpt: post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : ''),
    tags: post.tags || [],
    content: post.content || '',
    isFeatured: (post as any).is_featured || false
  }));

  const posts = useMemo(() => [...staticResearchPosts, ...dbTransformed], [dbTransformed]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "All" ||
        (post.category && post.category.toLowerCase().includes(selectedCategory.toLowerCase()));
      const matchesTag = !selectedTag || (post.tags && post.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase()));
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [posts, searchQuery, selectedCategory, selectedTag]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) { toast.error("Please enter your email address"); return; }
    setIsSubscribing(true);
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({ email: newsletterEmail });
      if (error) {
        if (error.code === "23505") toast.error("This email is already subscribed!");
        else throw error;
      } else {
        toast.success("Successfully subscribed to blog updates!");
        setNewsletterEmail("");
      }
    } catch { toast.error("Failed to subscribe. Please try again."); }
    finally { setIsSubscribing(false); }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Web3 Market Intelligence & Insights | ium Labs Blog"
        description="Deep-dive research, data-driven analyses, and institutional insights on the evolving Korean crypto landscape and Web3 ecosystem."
        path="/blog"
        keywords={['Korea Web3', 'Korea Crypto', 'Korea Web3 Marketing', 'Korea Crypto Agency', 'Korean Crypto Blog', 'Web3 Market Insights Korea']}
      />
      <BreadcrumbSchema items={[{ name: "ium Labs", url: "https://iumlabs.io/" }, { name: "Blog", url: "https://iumlabs.io/blog" }]} />
      <Navbar />

      {/* Hero - Compact Editorial Header */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-xs text-white/40 font-mono">01</span>
                <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.25em]">Research & Insights</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight">
                Web3 Market
                <span className="block text-white/90">Intelligence</span>
              </h1>
              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-white/50 leading-relaxed max-w-lg">
                Deep research on Korea's crypto landscape. Market structure, regulation, and go-to-market strategy for Web3 founders.
              </p>
            </div>

            {/* Search */}
            <div className="w-full lg:w-80">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-white/[0.04] border-white/[0.08] rounded-full pl-11 pr-5 h-12 text-sm text-white placeholder:text-white/30 focus:border-primary/40 focus:ring-0 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-8 sm:mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSelectedTag(null); setSearchParams({}); setCurrentPage(1); }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 ${
                  selectedCategory === cat && !selectedTag
                    ? "bg-white text-black"
                    : "bg-white/[0.04] text-white/50 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Active tag filter */}
          {selectedTag && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-white/30">Filtered by tag:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-emerald-300 text-xs font-medium">
                {selectedTag}
                <button
                  onClick={() => { setSelectedTag(null); setSearchParams({}); }}
                  className="hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          )}

          {/* Stats bar */}
          {!searchQuery && !selectedTag && selectedCategory === "All" && (
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-6 sm:gap-10 py-5 border-t border-white/10">
              <div>
                <span className="text-xl sm:text-2xl font-light text-white">{posts.length}</span>
                <span className="text-xs text-white/40 ml-2">Articles</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-light text-white">{categories.length - 1}</span>
                <span className="text-xs text-white/40 ml-2">Categories</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-light text-white">{new Set(posts.flatMap(p => p.tags || [])).size}</span>
                <span className="text-xs text-white/40 ml-2">Topics</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Article Grid */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 border-t border-white/10" id="articles">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] sm:text-xs text-white/40 font-mono">02</span>
                <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.25em]">Library</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                {searchQuery ? `Results for "${searchQuery}"` : selectedCategory !== "All" ? selectedCategory : "All Articles"}
              </h2>
            </div>
            <span className="text-xs text-white/30">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-white/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : currentPosts.length === 0 ? (
            <div className="text-center py-20">
              <TrendingUp className="w-10 h-10 text-white/10 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No articles found</h3>
              <p className="text-sm text-white/40">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 sm:gap-x-6 gap-y-8 sm:gap-y-10">
              {currentPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group flex flex-col">
                  <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
                    <BlogCover post={post} variant="art" className="aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-sm text-white/85 text-[10px] uppercase tracking-[0.16em] font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base sm:text-[17px] font-medium text-white leading-snug tracking-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-white/45 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-3.5 flex items-center gap-2 text-[11px] text-white/35">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                    <span className="text-white/20">·</span>
                    <span>{post.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 sm:mt-16">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center disabled:opacity-20 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all"
              >
                <ChevronLeft className="w-4 h-4 text-white/60" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                    currentPage === page
                      ? "bg-white text-black"
                      : "bg-white/[0.04] text-white/50 border border-white/[0.08] hover:bg-white/[0.08]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center disabled:opacity-20 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all"
              >
                <ChevronRight className="w-4 h-4 text-white/60" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 md:py-28 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] sm:text-xs text-white/40 font-mono">03</span>
              <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.25em]">Newsletter</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight mb-4 sm:mb-5">
              Stay ahead of<br />the market.
            </h2>
            <p className="text-sm sm:text-base text-white/40 mb-7 sm:mb-9 leading-relaxed">
              Weekly research drops, market signals, and Korea-specific intel. Trusted by 500+ Web3 operators.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <Input
                type="email"
                placeholder="your@email.com"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white/[0.04] border-white/[0.08] rounded-full px-5 h-12 text-sm text-white placeholder:text-white/25 focus:border-primary/40 focus:ring-0"
                required
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 h-12 text-sm font-semibold rounded-full hover:bg-white/90 transition-all disabled:opacity-50 shrink-0"
              >
                {isSubscribing ? "..." : "Subscribe"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 md:py-28 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="text-[10px] sm:text-xs text-white/40 font-mono">04</span>
            <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.25em]">Custom Research</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-5">
            Need tailored intelligence?
          </h2>
          <p className="text-sm sm:text-base text-white/35 max-w-lg mx-auto mb-8">
            Our research team builds bespoke market reports and GTM analysis for Web3 projects entering Korea.
          </p>
          <CalendlyButton className="inline-flex items-center gap-2.5 bg-white text-black px-7 py-3.5 text-sm font-semibold rounded-full hover:bg-white/90 hover:-translate-y-0.5 transition-all">
            Schedule a Consultation
            <ArrowRight className="w-4 h-4" />
          </CalendlyButton>
        </div>
      </section>

      <ContactFormSection />
      <FooterLinksSection />
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Research;
