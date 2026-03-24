import { useState, useEffect, useRef, useCallback } from "react";
import { Clock, ArrowRight, TrendingUp, Star, ArrowUpRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import ResearchHeroSection from "@/components/ResearchHeroSection";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import CalendlyButton from "@/components/CalendlyButton";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";

const calculateReadTime = (content: string | null): string => {
  if (!content) return "5 min read";
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

/* ── Glow Card Component ─────────────────────────────────── */
const GlowCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group/card relative rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-px overflow-hidden transition-all duration-500 hover:from-purple-500/20 hover:to-cyan-500/20 ${className}`}
    >
      {/* Spotlight follow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168,85,247,0.12), transparent 60%)",
        }}
      />
      {/* Inner surface */}
      <div className="relative rounded-[15px] bg-[#111111] h-full z-10">
        {children}
      </div>
    </div>
  );
};

/* ── Main Page ────────────────────────────────────────────── */
const Research = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const postsPerPage = 9;

  const { data: dbPosts, isLoading } = useQuery({
    queryKey: ["research-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("research_posts")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const posts = (dbPosts || []).map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    image: post.image || "",
    date:
      post.date ||
      new Date(post.created_at || "").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    readTime: post.read_time || calculateReadTime(post.content),
    category: post.category || "Blog",
    author: post.author || "Ium Labs",
    authorRole: post.author_role || "Ium Labs Team",
    excerpt:
      post.excerpt || (post.content ? post.content.substring(0, 150) + "..." : ""),
    tags: post.tags || [],
    content: post.content || "",
    isFeatured: (post as any).is_featured || false,
  }));

  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isDefaultView = currentPage === 1 && selectedCategory === "All" && !searchQuery;
  const gridPosts = isDefaultView
    ? filteredPosts.filter((p) => p.id !== featuredPost?.id)
    : filteredPosts;

  const totalPages = Math.ceil(gridPosts.length / postsPerPage);
  const currentPosts = gridPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error("Please enter your email address");
      return;
    }
    setIsSubscribing(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: newsletterEmail });
      if (error) {
        if (error.code === "23505") {
          toast.error("This email is already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Successfully subscribed to blog updates!");
        setNewsletterEmail("");
      }
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Korea Crypto & Web3 Blog | Market Insights by ium Labs"
        description="Data-driven Korea crypto and Web3 insights. Ecosystem analysis, market intelligence, and strategic research for blockchain projects entering the Korean market."
        path="/blog"
        keywords={[
          "Korea Web3",
          "Korea Crypto",
          "Korea Web3 Marketing",
          "Korea Crypto Agency",
          "Korean Crypto Blog",
          "Web3 Market Insights Korea",
        ]}
      />
      <Navbar />

      <ResearchHeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        totalResults={filteredPosts.length}
      />

      <main className="bg-[#0A0A0A] relative">
        {/* Ambient background */}
        <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none overflow-hidden">
          <div className="absolute top-40 right-[10%] w-[500px] h-[500px] bg-purple-600/[0.04] rounded-full blur-[180px]" />
          <div className="absolute top-[400px] left-[15%] w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[150px]" />
        </div>

        {/* ═══ Featured Article ═══ */}
        {isDefaultView && featuredPost && (
          <section className="container mx-auto max-w-7xl px-4 md:px-8 pt-12 sm:pt-16 relative z-10">
            <Link to={`/blog/${featuredPost.slug}`} className="group block">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
                {/* Glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-pink-500/10 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                <div className="relative border border-white/[0.08] rounded-2xl sm:rounded-3xl overflow-hidden group-hover:border-white/[0.15] transition-all duration-500">
                  {/* Image */}
                  <div className="aspect-[2/1] sm:aspect-[2.4/1] relative overflow-hidden">
                    {featuredPost.image ? (
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        loading="eager"
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[800ms] ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-cyan-900/20 flex items-center justify-center">
                        <TrendingUp className="w-20 h-20 text-purple-400/20" />
                      </div>
                    )}
                    {/* Multi-layer gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/30 to-transparent" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 lg:p-14">
                    <div className="flex items-center gap-3 mb-4 sm:mb-5">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/20 backdrop-blur-md text-purple-300 rounded-full text-[11px] sm:text-xs font-semibold border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                      {featuredPost.category && (
                        <span className="px-3 py-1.5 bg-white/[0.08] backdrop-blur-md text-white/70 rounded-full text-[11px] sm:text-xs border border-white/[0.06]">
                          {featuredPost.category}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.15] mb-3 sm:mb-4 max-w-3xl group-hover:text-purple-100 transition-colors duration-500">
                      {featuredPost.title}
                    </h2>

                    <p className="text-sm sm:text-base text-white/40 line-clamp-2 max-w-2xl mb-5 sm:mb-6 hidden sm:block leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-white/[0.1] flex items-center justify-center text-[11px] font-semibold text-white/80">
                          {featuredPost.author.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/35">
                          <span className="text-white/50">{featuredPost.author}</span>
                          <span>·</span>
                          <span>{featuredPost.date}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {featuredPost.readTime}
                          </span>
                        </div>
                      </div>
                      <span className="hidden sm:flex items-center gap-2 text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-3 group-hover:translate-x-0">
                        Read article
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ═══ Article Grid ═══ */}
        <section className="container mx-auto max-w-7xl px-4 md:px-8 py-12 sm:py-16 md:py-20 relative z-10">
          {/* Section label */}
          {isDefaultView && currentPosts.length > 0 && (
            <div className="flex items-center gap-3 mb-8 sm:mb-10">
              <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-purple-500/50 to-transparent" />
              <span className="text-xs text-white/30 font-mono tracking-[0.15em] uppercase">Latest Articles</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-purple-500/20 border-t-purple-400 animate-spin" />
                <div className="absolute inset-0 w-10 h-10 rounded-full blur-md bg-purple-500/10 animate-pulse" />
              </div>
              <p className="text-xs text-white/20 mt-4 font-mono">Loading articles...</p>
            </div>
          ) : currentPosts.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-5">
                <Sparkles className="w-6 h-6 text-white/15" />
              </div>
              <h3 className="text-lg font-semibold text-white/70 mb-2">No articles found</h3>
              <p className="text-sm text-white/30">
                {searchQuery || selectedCategory !== "All"
                  ? "Try adjusting your search or filters."
                  : "Check back soon for our latest research and insights."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {currentPosts.map((post, idx) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group block"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <GlowCard>
                    {/* Thumbnail */}
                    <div className="aspect-[16/10] overflow-hidden rounded-t-[15px] relative">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-cyan-900/15 flex items-center justify-center">
                          <TrendingUp className="w-8 h-8 text-purple-400/20" />
                        </div>
                      )}
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />

                      {/* Category badge on image */}
                      {post.category && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md text-white/80 rounded-lg text-[10px] font-semibold tracking-wide border border-white/[0.08]">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      {/* Meta row */}
                      <div className="flex items-center gap-2.5 mb-3 text-[11px] text-white/30">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 rounded-full bg-white/15" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[15px] sm:text-base font-semibold text-white leading-snug group-hover:text-purple-300 transition-colors duration-300 mb-2.5 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-[13px] text-white/35 line-clamp-2 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>

                      {/* Author + Read More */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/[0.08] flex items-center justify-center text-[9px] font-semibold text-white/50">
                            {post.author.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="text-[11px] text-white/35">{post.author}</span>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] text-purple-400/60 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                          Read <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </GlowCard>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14 sm:mt-18">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-2.5 rounded-xl text-xs font-medium bg-white/[0.03] border border-white/[0.06] text-white/40 disabled:opacity-25 hover:bg-white/[0.07] hover:border-white/[0.12] hover:text-white/60 transition-all duration-300"
              >
                Previous
              </button>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-xs font-medium transition-all duration-300 ${
                      currentPage === page
                        ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        : "text-white/30 hover:bg-white/[0.05] hover:text-white/50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 rounded-xl text-xs font-medium bg-white/[0.03] border border-white/[0.06] text-white/40 disabled:opacity-25 hover:bg-white/[0.07] hover:border-white/[0.12] hover:text-white/60 transition-all duration-300"
              >
                Next
              </button>
            </div>
          )}
        </section>

        {/* ═══ Newsletter ═══ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/[0.03] to-transparent pointer-events-none" />
          <div className="border-t border-white/[0.06]" />
          <div className="container mx-auto max-w-7xl px-4 md:px-8 py-20 sm:py-24 relative z-10">
            <div className="max-w-lg mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/15 rounded-full text-[11px] text-purple-400 font-medium mb-5">
                <Sparkles className="w-3 h-3" />
                Newsletter
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                Stay ahead of the curve
              </h2>
              <p className="text-sm text-white/35 mb-8 leading-relaxed">
                Weekly insights on Korean Web3 markets, delivered to 500+ founders and builders.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-md mx-auto">
                <div className="relative flex-1 group">
                  <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="relative flex-1 bg-[#111111] border-white/[0.08] rounded-xl px-4 h-12 text-sm text-white placeholder:text-white/25 focus:border-white/[0.15] transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-6 h-12 text-xs font-semibold rounded-xl bg-white text-black hover:bg-white/90 transition-all disabled:opacity-50 whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  {isSubscribing ? "..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="border-t border-white/[0.06]">
          <div className="container mx-auto max-w-7xl px-4 md:px-8 py-16 sm:py-20">
            <GlowCard className="max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
                    Need custom research?
                  </h2>
                  <p className="text-sm text-white/35">
                    Tailored market analysis for your Web3 project in Korea.
                  </p>
                </div>
                <CalendlyButton className="inline-flex items-center gap-2.5 bg-gradient-to-r from-purple-500/15 to-cyan-500/15 border border-purple-500/20 text-purple-300 px-7 py-3.5 text-sm font-semibold rounded-xl hover:from-purple-500/25 hover:to-cyan-500/25 hover:border-purple-400/30 transition-all duration-300 whitespace-nowrap shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                  Book a Call
                  <ArrowRight className="w-4 h-4" />
                </CalendlyButton>
              </div>
            </GlowCard>
          </div>
        </section>
      </main>

      <FooterLinksSection />
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Research;
