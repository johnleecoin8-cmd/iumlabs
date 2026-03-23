import { useState, useEffect } from "react";
import { Clock, ArrowRight, TrendingUp, Star, ArrowUpRight } from "lucide-react";
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

// Helper function to calculate read time from content
const calculateReadTime = (content: string | null): string => {
  if (!content) return "5 min read";
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const Research = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const postsPerPage = 9;

  // Fetch from DB only
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

  // Transform DB data to display format
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

  // Get featured post
  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];

  // Reset page when filters change
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

  // For grid, exclude featured post on first page with no filters
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
    } catch (error) {
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

      {/* Hero with integrated search & filters */}
      <ResearchHeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        totalResults={filteredPosts.length}
      />

      <main className="bg-[#0A0A0A]">
        {/* Featured Article - only on default view */}
        {isDefaultView && featuredPost && (
          <section className="container mx-auto max-w-7xl px-4 md:px-8 pt-10 sm:pt-14 md:pt-16">
            <Link to={`/blog/${featuredPost.slug}`} className="group block">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                {/* Image */}
                <div className="aspect-[2/1] sm:aspect-[2.5/1] relative overflow-hidden">
                  {featuredPost.image ? (
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      loading="eager"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <TrendingUp className="w-16 h-16 text-primary/30" />
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10 lg:p-12">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/20 backdrop-blur-sm text-primary rounded-full text-[11px] sm:text-xs font-medium border border-primary/20">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </span>
                    {featuredPost.category && (
                      <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-white/80 rounded-full text-[11px] sm:text-xs">
                        {featuredPost.category}
                      </span>
                    )}
                    <span className="text-white/40 text-[11px] sm:text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-tight mb-2 sm:mb-3 max-w-3xl group-hover:text-primary/90 transition-colors duration-300">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm sm:text-base text-white/50 line-clamp-2 max-w-2xl mb-4 sm:mb-5 hidden sm:block">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-[10px] sm:text-xs font-medium text-white/80">
                      {featuredPost.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <span className="text-white/60">{featuredPost.author}</span>
                      <span>·</span>
                      <span>{featuredPost.date}</span>
                    </div>
                    <span className="ml-auto text-primary flex items-center gap-1.5 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      Read <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Article Grid */}
        <section className="container mx-auto max-w-7xl px-4 md:px-8 py-10 sm:py-14 md:py-16">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            </div>
          ) : currentPosts.length === 0 ? (
            <div className="text-center py-20">
              <TrendingUp className="w-10 h-10 text-white/15 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white/80 mb-2">No articles found</h3>
              <p className="text-sm text-white/40">
                {searchQuery || selectedCategory !== "All"
                  ? "Try adjusting your search or filters."
                  : "Check back soon for our latest research and insights."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {currentPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="h-full">
                    {/* Thumbnail */}
                    <div className="aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-400 relative">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-white/[0.04] to-white/[0.01] flex items-center justify-center">
                          <TrendingUp className="w-8 h-8 text-white/15" />
                        </div>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      {post.category && (
                        <span className="text-[11px] text-primary/80 font-medium">
                          {post.category}
                        </span>
                      )}
                      <span className="text-[11px] text-white/30 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-medium text-white leading-snug group-hover:text-primary/90 transition-colors duration-300 mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-white/40 line-clamp-2 mb-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Author & Date */}
                    <div className="flex items-center gap-2 text-[11px] text-white/30">
                      <span>{post.author}</span>
                      <span>·</span>
                      <span>{post.date}</span>
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
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-white/50 disabled:opacity-30 hover:bg-white/[0.08] transition-all"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
                      currentPage === page
                        ? "bg-white text-black"
                        : "text-white/40 hover:bg-white/[0.06] hover:text-white/60"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-white/50 disabled:opacity-30 hover:bg-white/[0.08] transition-all"
              >
                Next
              </button>
            </div>
          )}
        </section>

        {/* Newsletter - Minimal */}
        <section className="border-t border-white/[0.06]">
          <div className="container mx-auto max-w-7xl px-4 md:px-8 py-16 sm:py-20">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-xl sm:text-2xl font-medium text-white mb-3">
                Stay in the loop
              </h2>
              <p className="text-sm text-white/40 mb-6">
                Weekly insights on Korean Web3 markets. Join 500+ founders.
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="flex gap-3 max-w-sm mx-auto"
              >
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white/[0.04] border-white/[0.08] rounded-xl px-4 h-11 text-sm text-white placeholder:text-white/30 focus:border-white/20"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-5 h-11 text-xs font-medium rounded-xl bg-white text-black hover:bg-white/90 transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {isSubscribing ? "..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* CTA - Minimal */}
        <section className="border-t border-white/[0.06]">
          <div className="container mx-auto max-w-7xl px-4 md:px-8 py-16 sm:py-20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
              <div>
                <h2 className="text-lg sm:text-xl font-medium text-white mb-1.5">
                  Need custom research?
                </h2>
                <p className="text-sm text-white/40">
                  Tailored market analysis for your Web3 project in Korea.
                </p>
              </div>
              <CalendlyButton className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] text-white px-6 py-3 text-sm font-medium rounded-xl hover:bg-white/[0.1] hover:border-white/[0.2] transition-all whitespace-nowrap">
                Book a Call
                <ArrowRight className="w-3.5 h-3.5" />
              </CalendlyButton>
            </div>
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
