import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Clock, ArrowRight, TrendingUp, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";

import FooterLinksSection from "@/components/FooterLinksSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import ResearchHeroSection from "@/components/ResearchHeroSection";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import CalendlyButton from "@/components/CalendlyButton";
import { useQuery } from "@tanstack/react-query";
const categories = ["All", "Market Research", "Strategy", "DeFi", "Marketing", "Technology", "Industry"];

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
  const [scrollY, setScrollY] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const postsPerPage = 6;

  // Fetch from DB only
  const {
    data: dbPosts,
    isLoading
  } = useQuery({
    queryKey: ['research-posts'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('research_posts').select('*').eq('is_published', true).order('display_order', {
        ascending: true
      });
      if (error) throw error;
      return data;
    }
  });

  // Transform DB data to display format
  const posts = (dbPosts || []).map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    image: post.image || '',
    date: post.date || new Date(post.created_at || '').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    readTime: post.read_time || calculateReadTime(post.content),
    category: post.category || 'Blog',
    author: post.author || 'Ium Labs',
    authorRole: post.author_role || 'Ium Labs Team',
    excerpt: post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : ''),
    tags: post.tags || [],
    content: post.content || '',
    isFeatured: (post as any).is_featured || false
  }));

  // Get featured post (is_featured: true, or most recent if none featured)
  const featuredPost = posts.find(p => p.isFeatured) || posts[0];
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error("Please enter your email address");
      return;
    }
    setIsSubscribing(true);
    try {
      const {
        error
      } = await supabase.from("newsletter_subscribers").insert({
        email: newsletterEmail
      });
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
  return <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead title="Korea Crypto & Web3 Blog | Market Insights by ium Labs" description="Data-driven Korea crypto and Web3 insights. Ecosystem analysis, market intelligence, and strategic research for blockchain projects entering the Korean market." path="/blog" keywords={['Korea Web3', 'Korea Crypto', 'Korea Web3 Marketing', 'Korea Crypto Agency', 'Korean Crypto Blog', 'Web3 Market Insights Korea']} />
      <Navbar />
      
      {/* Hero Section - Homepage Style */}
      <main className="bg-[#0A0A0A]">
        <ResearchHeroSection />
      </main>

      {/* Filter Section */}
      

      {/* 02 - Featured Article Section */}
      {currentPage === 1 && selectedCategory === "All" && !searchQuery && featuredPost && <section className="bg-[#121212] border-t border-white/10" id="featured">
          {/* Section Header */}
          <div className="flex items-baseline justify-between p-3 sm:p-4 md:px-8 md:py-5 border-b border-white/5">
            <div className="flex items-baseline gap-4 sm:gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
              <h2 className="text-base sm:text-lg md:text-xl font-medium text-white flex items-center gap-2">
                Featured
                {featuredPost.isFeatured && <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />}
              </h2>
            </div>
            <span className="text-[10px] sm:text-xs text-white/50 tracking-wider hidden sm:block px-2 sm:px-3 py-1 border border-white/20 rounded-full">
              Latest Blog
            </span>
          </div>
          
          {/* Featured Content */}
          <div className="container mx-auto max-w-7xl px-4 md:px-8 py-8 sm:py-12 md:py-16">
            <Link to={`/blog/${featuredPost.slug}`} className="group block active:scale-[0.99]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-12 items-center">
                <div className="aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/30 transition-all duration-500 relative hover:scale-[1.02]">
                  {featuredPost.image ? <img src={featuredPost.image} alt={featuredPost.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /> : <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-primary/40" />
                    </div>}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                    <span className="px-2.5 sm:px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs sm:text-sm font-medium">
                      Read Article
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    {featuredPost.category && <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/10 text-primary rounded-full text-[10px] sm:text-caption border border-primary/20">
                        {featuredPost.category}
                      </span>}
                    <span className="text-white/40 text-[10px] sm:text-caption flex items-center gap-1 sm:gap-1.5">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-display-md text-white leading-tight mb-3 sm:mb-4 group-hover:text-primary/90 transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm sm:text-body-lg text-white/60 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/20 flex items-center justify-center text-[10px] sm:text-caption font-medium text-primary">
                        {featuredPost.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs sm:text-body-sm text-white font-medium">{featuredPost.author}</p>
                        <p className="text-[10px] sm:text-label text-white/40">{featuredPost.date}</p>
                      </div>
                    </div>
                    <span className="text-primary flex items-center gap-1.5 sm:gap-2 group-hover:gap-3 transition-all text-xs sm:text-body-sm font-medium">
                      Read More <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>}

      {/* 03 - Article Grid Section */}
      <section className="bg-[#0F0F0F] border-t border-white/10" id="articles">
        {/* Section Header */}
        <div className="flex items-baseline justify-between p-3 sm:p-4 md:px-8 md:py-5 border-b border-white/5">
          <div className="flex items-baseline gap-4 sm:gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">
              {currentPage === 1 && selectedCategory === "All" && !searchQuery && featuredPost ? "03" : "02"}
            </span>
            <h2 className="text-base sm:text-lg md:text-xl font-medium text-white">All Articles</h2>
          </div>
          <span className="text-[10px] sm:text-xs text-white/50 tracking-wider hidden sm:block px-2 sm:px-3 py-1 border border-white/20 rounded-full">
            {filteredPosts.length} Results
          </span>
        </div>
        
        {/* Article Grid Content */}
        <div className="container mx-auto max-w-7xl px-4 md:px-8 py-8 sm:py-12 md:py-16">
          {isLoading ? <div className="flex items-center justify-center py-12 sm:py-20">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary"></div>
            </div> : currentPosts.length === 0 ? <div className="text-center py-12 sm:py-20">
              <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-white/20 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-medium text-white mb-2">No articles yet</h3>
              <p className="text-sm sm:text-base text-white/60">Check back soon for our latest research and insights.</p>
            </div> : <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {currentPosts.map(post => <div key={post.id}>
                  <Link to={`/blog/${post.slug}`} className="group block active:scale-[0.98]">
                    <div className="relative hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform duration-300">
                      {/* Image */}
                      <div className="aspect-[16/10] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden mb-2 sm:mb-3 md:mb-4 border border-white/10 group-hover:border-primary/30 transition-all duration-500 relative">
                        {post.image ? <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-400" /> : <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary/40" />
                          </div>}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 flex items-center justify-between opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0">
                          <span className="text-white text-[10px] sm:text-xs md:text-sm font-medium">Read</span>
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-primary" />
                        </div>
                      </div>
                      
                      {/* Meta */}
                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-1 sm:mb-2 md:mb-3">
                        {post.category && <span className="px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 bg-primary/10 text-primary rounded text-[8px] sm:text-[10px] md:text-label border border-primary/20 truncate max-w-[60px] sm:max-w-none">
                            {post.category}
                          </span>}
                        <span className="text-white/40 text-[8px] sm:text-[10px] md:text-label flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
                          <Clock className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xs sm:text-sm md:text-body-lg font-medium text-white leading-snug group-hover:text-primary transition-colors duration-300 mb-1 sm:mb-2 md:mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      {/* Author & Date */}
                      <div className="flex items-center justify-between text-[8px] sm:text-[10px] md:text-label text-white/40">
                        <span className="truncate max-w-[50%]">{post.author}</span>
                        <span className="whitespace-nowrap">{post.date}</span>
                      </div>
                    </div>
                  </Link>
                </div>)}
            </div>}

          {/* Pagination */}
          {totalPages > 1 && <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-10 sm:mt-16">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2.5 sm:p-3 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 hover:border-primary/30 transition-all hover:scale-105 active:scale-95 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center">
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {Array.from({
              length: totalPages
            }, (_, i) => i + 1).map(page => <button key={page} onClick={() => setCurrentPage(page)} className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 ${currentPage === page ? "bg-primary text-primary-foreground" : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10 hover:border-primary/30"}`}>
                    {page}
                  </button>)}
              </div>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2.5 sm:p-3 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 hover:border-primary/30 transition-all hover:scale-105 active:scale-95 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>}
        </div>
      </section>


      {/* 04 - Newsletter Section */}
      <section className="bg-[#121212] border-t border-white/10" id="newsletter">
        {/* Section Header */}
        <div className="flex items-baseline justify-between p-4 md:px-8 md:py-5 border-b border-white/5">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">
              {currentPage === 1 && selectedCategory === "All" && !searchQuery && featuredPost ? "04" : "03"}
            </span>
            <h2 className="text-lg md:text-xl font-medium text-white">Subscribe</h2>
          </div>
          <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">
            Weekly Insights
          </span>
        </div>

        {/* Newsletter Content */}
        <div className="container mx-auto max-w-4xl px-4 md:px-8 py-20 text-center">
          <h2 className="text-display-md text-white mb-6">
            Stay Ahead of the Curve
          </h2>
          <p className="text-body-lg text-white/60 mb-8 max-w-2xl mx-auto">
            Get our latest research, market analysis, and strategic insights delivered directly to your inbox. Join 500+ Web3 founders staying informed.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} className="flex-1 bg-white/5 border-white/10 rounded-full px-6 h-14 text-white placeholder:text-white/40 focus:border-primary/50" required />
            <button type="submit" disabled={isSubscribing} className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 h-14 text-sm font-medium rounded-full hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-50">
              {isSubscribing ? "Subscribing..." : "Subscribe"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </section>

      {/* 06 - CTA Section */}
      <section className="bg-[#0F0F0F] border-t border-white/10" id="cta">
        {/* Section Header */}
        <div className="flex items-baseline justify-between p-4 md:px-8 md:py-5 border-b border-white/5">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">
              {currentPage === 1 && selectedCategory === "All" && !searchQuery && featuredPost ? "06" : "05"}
            </span>
            <h2 className="text-lg md:text-xl font-medium text-white">Get in Touch</h2>
          </div>
        </div>

        {/* CTA Content */}
        <div className="container mx-auto max-w-4xl px-4 md:px-8 py-20 text-center">
          <h2 className="text-display-md text-white mb-6">
            Need Custom Research?
          </h2>
          <p className="text-body-lg text-white/60 mb-8 max-w-2xl mx-auto">
            Our research team provides tailored market analysis and strategic insights for Web3 projects looking to enter the Korean market.
          </p>
          
          <CalendlyButton className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium rounded-full hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
            Schedule a Consultation
            <ArrowRight className="w-4 h-4" />
          </CalendlyButton>
        </div>
      </section>

      <ContactFormSection />
      
      <FooterLinksSection />
      <Footer />
      <FloatingContactButton />
    </div>;
};
export default Research;