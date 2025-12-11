import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

// Blog posts data
const blogPosts = [
  {
    id: "1",
    slug: "korean-crypto-market-2024",
    title: "The State of Ecosystem Growth in 2025: Key Insights from the CryptoBridge Research Report",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop",
    date: "Dec 11, 2024",
    featured: true,
  },
  {
    id: "2",
    slug: "ai-agents-defi",
    title: "AI Agents & DeFi: The DeFAI Future Powering Finance in 2025 & Beyond!",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    date: "Dec 10, 2024",
  },
  {
    id: "3",
    slug: "avoid-flopped-tge",
    title: "How to Avoid a Flopped TGE: Building a Solid Foundation for Success",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&h=500&fit=crop",
    date: "Dec 8, 2024",
  },
  {
    id: "4",
    slug: "community-growth-ai",
    title: "How to Grow Your Community in the Age of AI in 2025",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
    date: "Dec 5, 2024",
  },
  {
    id: "5",
    slug: "nft-evolution",
    title: "The Evolution of NFTs: From PFPs in 2021 to Nodes and Memberships in 2025",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&h=500&fit=crop",
    date: "Nov 28, 2024",
  },
  {
    id: "6",
    slug: "crypto-marketing-bear-market",
    title: "Top 5 Steps To Rejuvenate Your Crypto Marketing In Bear Market in 2025",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop",
    date: "Nov 25, 2024",
  },
  {
    id: "7",
    slug: "kol-marketing-strategy",
    title: "The Strategic Role of KOLs in Crypto Marketing: How Top Agencies Drive Success",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    date: "Nov 20, 2024",
  },
  {
    id: "8",
    slug: "kaito-mindshare",
    title: "Top 5 Strategies to Dominate Kaito Mindshare Before TGE",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop",
    date: "Nov 15, 2024",
  },
];

const Blog = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Blue Background with Moon */}
      <section className="relative bg-primary min-h-[70vh] flex items-end overflow-hidden">
        {/* Moon Image */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-2/5">
          <div 
            className="absolute inset-0 bg-cover bg-left"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=1200&h=1200&fit=crop)`,
              filter: "brightness(0.9) contrast(1.1)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pb-24 pt-40">
          <h1 className="text-[20vw] md:text-[200px] lg:text-[280px] font-light text-white leading-[0.8] tracking-tight">
            Bl<span className="serif-italic">o</span>g
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 text-white/60">
          <ChevronDown className="w-8 h-8 animate-bounce" />
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
              {sidebarPosts.map((post, index) => (
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
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="name"
              className="flex-1 bg-[hsl(0,0%,92%)] border-0 rounded-2xl h-16 px-6 text-lg text-[hsl(0,0%,10%)]"
            />
            <Input
              type="email"
              placeholder="e-mail"
              className="flex-1 bg-[hsl(0,0%,92%)] border-0 rounded-2xl h-16 px-6 text-lg text-[hsl(0,0%,10%)]"
            />
            <button className="bg-[hsl(0,0%,15%)] text-white px-12 h-16 rounded-2xl text-lg font-medium hover:bg-[hsl(0,0%,20%)] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Blog;