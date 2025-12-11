import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Search, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import CalendlyButton from "@/components/CalendlyButton";
import Planet3D from "@/components/Planet3D";
import cosmicNebula from "@/assets/backgrounds/cosmic-nebula.jpg";

// Blog thumbnail images
import ecosystemGrowthImg from "@/assets/blog/ecosystem-growth-2025.jpg";
import aiAgentsDefiImg from "@/assets/blog/ai-agents-defi.jpg";
import avoidFloppedTgeImg from "@/assets/blog/avoid-flopped-tge.jpg";
import communityGrowthAiImg from "@/assets/blog/community-growth-ai.jpg";
import nftEvolutionImg from "@/assets/blog/nft-evolution.jpg";
import cryptoMarketingBearImg from "@/assets/blog/crypto-marketing-bear.jpg";
import kolMarketingImg from "@/assets/blog/kol-marketing.jpg";
import kaitoMindshareImg from "@/assets/blog/kaito-mindshare.jpg";

// Blog posts data
const blogPosts = [
  {
    id: "1",
    slug: "korean-crypto-market-2024",
    title: "The State of Ecosystem Growth in 2025: Key Insights from the CryptoBridge Research Report",
    image: ecosystemGrowthImg,
    date: "Dec 11, 2024",
    featured: true,
  },
  {
    id: "2",
    slug: "ai-agents-defi",
    title: "AI Agents & DeFi: The DeFAI Future Powering Finance in 2025 & Beyond!",
    image: aiAgentsDefiImg,
    date: "Dec 10, 2024",
  },
  {
    id: "3",
    slug: "avoid-flopped-tge",
    title: "How to Avoid a Flopped TGE: Building a Solid Foundation for Success",
    image: avoidFloppedTgeImg,
    date: "Dec 8, 2024",
  },
  {
    id: "4",
    slug: "community-growth-ai",
    title: "How to Grow Your Community in the Age of AI in 2025",
    image: communityGrowthAiImg,
    date: "Dec 5, 2024",
  },
  {
    id: "5",
    slug: "nft-evolution",
    title: "The Evolution of NFTs: From PFPs in 2021 to Nodes and Memberships in 2025",
    image: nftEvolutionImg,
    date: "Nov 28, 2024",
  },
  {
    id: "6",
    slug: "crypto-marketing-bear-market",
    title: "Top 5 Steps To Rejuvenate Your Crypto Marketing In Bear Market in 2025",
    image: cryptoMarketingBearImg,
    date: "Nov 25, 2024",
  },
  {
    id: "7",
    slug: "kol-marketing-strategy",
    title: "The Strategic Role of KOLs in Crypto Marketing: How Top Agencies Drive Success",
    image: kolMarketingImg,
    date: "Nov 20, 2024",
  },
  {
    id: "8",
    slug: "kaito-mindshare",
    title: "Top 5 Strategies to Dominate Kaito Mindshare Before TGE",
    image: kaitoMindshareImg,
    date: "Nov 15, 2024",
  },
];

const floatingTags = [
  { label: "Insights", top: "20%", left: "5%", mobileTop: "12%", mobileLeft: "3%", color: "bg-pink-400 text-white" },
  { label: "Guides", top: "32%", left: "20%", mobileTop: "15%", mobileRight: "3%", color: "bg-cyan-400 text-black" },
  { label: "Strategy", top: "50%", left: "4%", mobileTop: "75%", mobileLeft: "3%", color: "bg-purple-400 text-white" },
  { label: "Research", top: "52%", left: "24%", color: "bg-fuchsia-400 text-white" },
  { label: "Analysis", top: "18%", right: "12%", color: "bg-cyan-300 text-black" },
  { label: "Reports", top: "32%", right: "5%", color: "bg-pink-300 text-black" },
  { label: "News", top: "50%", right: "10%", color: "bg-purple-300 text-black" },
  { label: "Trends", bottom: "28%", right: "16%", color: "bg-fuchsia-500 text-white" },
];

const Blog = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [newsletterData, setNewsletterData] = useState({ name: "", email: "" });
  const [isSubscribing, setIsSubscribing] = useState(false);
  const postsPerPage = 8;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredPost = blogPosts[featuredIndex];
  const sidebarPosts = blogPosts.slice(0, 6);
  
  const filteredPosts = searchQuery 
    ? blogPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : blogPosts;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % blogPosts.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterData.email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubscribing(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({
          name: newsletterData.name,
          email: newsletterData.email,
        });

      if (error) {
        if (error.code === "23505") {
          toast.error("This email is already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Successfully subscribed to newsletter!");
        setNewsletterData({ name: "", email: "" });
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Planetary Style with Nebula */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background - Cosmic Nebula */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${cosmicNebula})`,
              filter: "brightness(0.6) saturate(1.3)",
            }}
          />
          
          {/* Aurora light overlay - Nebula pink/purple/cyan theme */}
          <div className="absolute inset-0 animate-aurora">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/25 via-transparent to-cyan-500/20" />
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/20 via-transparent to-fuchsia-500/15" />
          </div>
          
          {/* Light sweep effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-light-sweep" />
          </div>
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.9)]" />
          
          {/* 3D Nebula Effect */}
          <Planet3D type="nebula" className="opacity-50" />
        </div>
        
        {/* Floating Tags with Parallax */}
        <div>
          {floatingTags.map((tag, index) => (
            <span
              key={`${tag.label}-${index}`}
              className={`absolute animate-float hidden sm:block px-4 py-2 rounded-md text-sm font-medium shadow-lg ${tag.color}`}
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right,
                bottom: tag.bottom,
                animationDelay: `${index * 0.3}s`,
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              {tag.label}
            </span>
          ))}
          {floatingTags.slice(0, 4).map((tag, index) => (
            <span
              key={`mobile-${tag.label}-${index}`}
              className={`absolute animate-float sm:hidden px-3 py-1.5 rounded-md text-xs font-medium shadow-lg ${tag.color}`}
              style={{
                top: tag.mobileTop,
                left: tag.mobileLeft,
                right: tag.mobileRight,
                animationDelay: `${index * 0.3}s`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Content with Stagger Animation */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-32 pb-24">
          <div className="mb-16">
            <span className="text-sm text-white/50 mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>[ Blog ]</span>
            <h1 className="text-[12vw] md:text-[150px] lg:text-[180px] font-light text-white leading-[0.85] tracking-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Bl<span className="serif-italic text-primary">o</span>g
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <p className="text-lg text-white/60 max-w-xl">
              Insights, guides, and research on Web3 marketing in the Korean market.
            </p>
            <CalendlyButton className="lunar-btn">
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </CalendlyButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Featured Article + Sidebar */}
      <section className="bg-[hsl(0,0%,96%)]">
        <div className="flex flex-col lg:flex-row">
          {/* Featured Article - Left Side */}
          <div className="lg:w-2/3 relative">
            <Link to={`/blog/${featuredPost.slug}`} className="block relative aspect-[16/10] lg:aspect-auto lg:h-[600px] group">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Logo Badge */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/80">
                <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
                  <span className="text-xs font-bold">CB</span>
                </div>
                <span className="text-sm">CryptoBridge Korea</span>
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={(e) => { e.preventDefault(); prevFeatured(); }}
                className="absolute top-6 left-6 text-white/60 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); nextFeatured(); }}
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wide leading-tight mb-4">
                  {featuredPost.title}
                </h2>
                <span className="text-white/60 text-sm">www.cryptobridgekorea.com/blog</span>
              </div>
            </Link>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:w-1/3 bg-white p-6 lg:p-8">
            <div className="space-y-0">
              {sidebarPosts.map((post) => (
                <Link 
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="flex gap-4 py-4 border-b border-[hsl(0,0%,90%)] last:border-0 group"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-16 flex-shrink-0 rounded overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[hsl(0,0%,10%)] leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <span className="text-xs text-[hsl(0,0%,50%)] mt-1 block">{post.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Article Info */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <span className="text-[hsl(0,0%,50%)] text-sm block mb-2">{featuredPost.date}</span>
          <h2 className="text-2xl md:text-3xl font-medium text-[hsl(0,0%,10%)]">
            {featuredPost.title}
          </h2>
        </div>
      </section>

      {/* Recent News Section */}
      <section className="bg-[hsl(0,0%,96%)] py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header with Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <span className="text-[hsl(0,0%,10%)] text-lg">recent news</span>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-80">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border-0 rounded-full pl-4 pr-10 h-12 text-[hsl(0,0%,10%)]"
                />
              </div>
              <button className="bg-primary text-white px-6 h-12 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentPosts.map((post) => (
              <Link 
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group"
              >
                {/* Image */}
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content */}
                <span className="text-[hsl(0,0%,50%)] text-sm block mb-2">{post.date}</span>
                <h3 className="text-base font-medium text-[hsl(0,0%,10%)] leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-[hsl(0,0%,85%)]">
              <span className="text-[hsl(0,0%,10%)]">{currentPage} / {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="text-[hsl(0,0%,10%)] hover:text-primary transition-colors disabled:opacity-50"
              >
                Next Page
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[hsl(0,0%,96%)] pb-24">
        {/* Yellow Marquee */}
        <div className="bg-[#DAFF00] py-3 overflow-hidden mb-16">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-black font-medium mx-8">Subscribe to Our Blog</span>
            ))}
          </div>
        </div>

        {/* Newsletter Form */}
        <div className="container mx-auto max-w-5xl px-4">
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="name"
              value={newsletterData.name}
              onChange={(e) => setNewsletterData({ ...newsletterData, name: e.target.value })}
              className="flex-1 bg-[hsl(0,0%,92%)] border-0 rounded-2xl h-16 px-6 text-lg text-[hsl(0,0%,10%)]"
            />
            <Input
              type="email"
              placeholder="e-mail"
              value={newsletterData.email}
              onChange={(e) => setNewsletterData({ ...newsletterData, email: e.target.value })}
              required
              className="flex-1 bg-[hsl(0,0%,92%)] border-0 rounded-2xl h-16 px-6 text-lg text-[hsl(0,0%,10%)]"
            />
            <button 
              type="submit"
              disabled={isSubscribing}
              className="bg-[hsl(0,0%,15%)] text-white px-12 h-16 rounded-2xl text-lg font-medium hover:bg-[hsl(0,0%,20%)] transition-colors disabled:opacity-50"
            >
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Blog;