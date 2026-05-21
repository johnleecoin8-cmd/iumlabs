import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Clock, ArrowRight, ArrowUpRight, TrendingUp, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import SEOHead from "@/components/SEOHead";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
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

  const featuredPost = posts.find(p => p.isFeatured) || posts[0];
  const secondaryPosts = posts.filter(p => p !== featuredPost).slice(0, 2);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const isFiltering = searchQuery || selectedCategory !== "All" || selectedTag;
      if (!isFiltering && post === featuredPost && currentPage === 1) return false;
      if (!isFiltering && secondaryPosts.includes(post) && currentPage === 1) return false;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "All" ||
        (post.category && post.category.toLowerCase().includes(selectedCategory.toLowerCase()));
      const matchesTag = !selectedTag || (post.tags && post.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase()));
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [posts, searchQuery, selectedCategory, selectedTag, currentPage, featuredPost, secondaryPosts]);

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
        title="Korea Crypto & Web3 Blog | Market Insights by ium Labs"
        description="Data-driven Korea crypto and Web3 insights. Ecosystem analysis, market intelligence, and strategic research for blockchain projects entering the Korean market."
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
              <p className="text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.3em] mb-3 sm:mb-4 font-medium">Research & Insights</p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
                Web3 Market
                <span className="block bg-gradient-to-r from-[#b48cde] via-[#a78bfa] to-[#c084fc] bg-clip-text text-transparent">Intelligence</span>
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
                  className="w-full bg-white/[0.04] border-white/[0.08] rounded-full pl-11 pr-5 h-12 text-sm text-white placeholder:text-white/30 focus:border-[#b48cde]/40 focus:ring-0 transition-colors"
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b48cde]/15 border border-[#b48cde]/25 text-[#d8b4fe] text-xs font-medium">
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
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-6 sm:gap-10 py-4 border-t border-white/[0.04]">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-white">{posts.length}</span>
                <span className="text-xs text-white/30 ml-2">Articles</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-white">{categories.length - 1}</span>
                <span className="text-xs text-white/30 ml-2">Categories</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-white">{new Set(posts.flatMap(p => p.tags || [])).size}</span>
                <span className="text-xs text-white/30 ml-2">Topics</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Bento Section */}
      {currentPage === 1 && selectedCategory === "All" && !searchQuery && !selectedTag && featuredPost && (
        <section className="px-4 sm:px-6 lg:px-10 pb-6 sm:pb-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Main Featured */}
              <Link to={`/blog/${featuredPost.slug}`} className="group lg:col-span-2 block">
                <div className="relative h-full min-h-[280px] sm:min-h-[400px] lg:min-h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                  {featuredPost.image ? (
                    <img src={featuredPost.image} alt={featuredPost.title} loading="eager" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#b48cde]/20 to-[#0A0A0A]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      {featuredPost.category && (
                        <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-[10px] sm:text-xs font-medium border border-white/10">
                          {featuredPost.category}
                        </span>
                      )}
                      <span className="text-white/40 text-[10px] sm:text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2 sm:mb-3 group-hover:text-[#d8b4fe] transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                    <p className="text-sm sm:text-base text-white/50 line-clamp-2 max-w-2xl mb-4 sm:mb-5 hidden sm:block">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-[10px] sm:text-xs font-semibold text-white border border-white/10">
                        {featuredPost.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-white/80 font-medium">{featuredPost.author}</p>
                        <p className="text-[10px] sm:text-xs text-white/30">{featuredPost.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/10">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
              </Link>

              {/* Secondary Posts Stack */}
              <div className="flex flex-col gap-3 sm:gap-4">
                {secondaryPosts.map(post => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="group block flex-1">
                    <div className="relative h-full min-h-[180px] sm:min-h-[228px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                      {post.image ? (
                        <img src={post.image} alt={post.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#b48cde]/10 to-[#0A0A0A]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                        <div className="flex items-center gap-2 mb-2">
                          {post.category && (
                            <span className="px-2 py-0.5 bg-white/10 backdrop-blur-sm text-white/80 rounded-full text-[9px] sm:text-[10px] font-medium border border-white/10">
                              {post.category}
                            </span>
                          )}
                          <span className="text-white/30 text-[9px] sm:text-[10px] flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white leading-snug group-hover:text-[#d8b4fe] transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="mt-1.5 text-[10px] sm:text-xs text-white/30">{post.author} · {post.date}</p>
                      </div>
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/10">
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="px-4 sm:px-6 lg:px-10 py-8 sm:py-12" id="articles">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              {searchQuery ? `Results for "${searchQuery}"` : selectedCategory !== "All" ? selectedCategory : "All Articles"}
            </h2>
            <span className="text-xs text-white/30 font-medium">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-white/20 border-t-[#b48cde] rounded-full animate-spin" />
            </div>
          ) : currentPosts.length === 0 ? (
            <div className="text-center py-20">
              <TrendingUp className="w-10 h-10 text-white/10 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No articles found</h3>
              <p className="text-sm text-white/40">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {currentPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                  <article className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden">
                    {/* Thumbnail */}
                    <div className="aspect-[16/9] overflow-hidden">
                      {post.image ? (
                        <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#b48cde]/10 to-[#0A0A0A] flex items-center justify-center">
                          <TrendingUp className="w-8 h-8 text-white/10" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-2 mb-3">
                        {post.category && (
                          <span className="px-2 py-0.5 bg-white/[0.06] text-white/60 rounded text-[10px] sm:text-xs font-medium">
                            {post.category}
                          </span>
                        )}
                        <span className="text-white/25 text-[10px] sm:text-xs flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-semibold text-white leading-snug group-hover:text-[#d8b4fe] transition-colors duration-200 line-clamp-2 mb-2 sm:mb-3">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-white/35 line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center text-[9px] font-semibold text-white/60">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-[10px] sm:text-xs text-white/40">{post.author}</span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-white/25">{post.date}</span>
                      </div>
                    </div>
                  </article>
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
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-[#b48cde]/[0.06] via-[#0F0F0F] to-[#0F0F0F]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(180,140,222,0.08),transparent_60%)]" />
            <div className="relative px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20">
              <div className="max-w-2xl">
                <p className="text-[10px] sm:text-xs text-[#b48cde]/60 uppercase tracking-[0.25em] mb-3 font-medium">Newsletter</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 sm:mb-4">
                  Stay ahead of<br />the market.
                </h2>
                <p className="text-sm sm:text-base text-white/40 mb-6 sm:mb-8 leading-relaxed">
                  Weekly research drops, market signals, and Korea-specific intel. Trusted by 500+ Web3 operators.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-white/[0.04] border-white/[0.08] rounded-full px-5 h-12 text-sm text-white placeholder:text-white/25 focus:border-[#b48cde]/40 focus:ring-0"
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
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-10 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] sm:text-xs text-white/20 uppercase tracking-[0.3em] mb-4">Custom Research</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
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
