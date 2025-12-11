import { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CalendlyButton from "@/components/CalendlyButton";
import { Link } from "react-router-dom";
import moonBackground from "@/assets/moon-background.jpg";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "korean-crypto-market-2024",
    title: "How to Enter Korea's Web3 Market in 2025",
    excerpt: "A comprehensive guide for global Web3 projects looking to establish a presence in the Korean crypto market.",
    category: "Guide",
    date: "Dec 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
  },
  {
    id: "2",
    slug: "top-korean-kols",
    title: "Korean KOL Marketing: Complete Strategy Guide",
    excerpt: "Learn how to effectively partner with Korean crypto influencers and measure campaign ROI.",
    category: "Strategy",
    date: "Dec 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800",
  },
  {
    id: "3",
    slug: "vasp-compliance",
    title: "VASP Compliance Guide for Foreign Projects",
    excerpt: "Navigate Korean crypto regulations and understand what's required to operate legally.",
    category: "Regulatory",
    date: "Nov 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  },
  {
    id: "4",
    slug: "community-building",
    title: "Building Korean Crypto Communities",
    excerpt: "Best practices for Telegram, Discord, and KakaoTalk community management in Korea.",
    category: "Community",
    date: "Nov 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
  },
  {
    id: "5",
    slug: "korea-blockchain-week",
    title: "Korea Blockchain Week: Event Guide",
    excerpt: "How to maximize your presence at Korea's biggest blockchain event.",
    category: "Events",
    date: "Oct 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  },
  {
    id: "6",
    slug: "exchange-listing",
    title: "Korean Exchange Listing Strategies",
    excerpt: "Tips for successful listings on major Korean exchanges like Upbit, Bithumb, and Coinone.",
    category: "Exchange",
    date: "Oct 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800",
  },
];

const categories = ["All", "Guide", "Strategy", "Regulatory", "Community", "Events", "Exchange"];

const floatingTags = [
  { label: "Insights", top: "20%", left: "5%", mobileTop: "12%", mobileLeft: "3%", color: "bg-pink-400 text-white" },
  { label: "Guides", top: "32%", left: "20%", mobileTop: "15%", mobileRight: "3%", color: "bg-yellow-400 text-black" },
  { label: "Strategy", top: "50%", left: "4%", mobileTop: "75%", mobileLeft: "3%", color: "bg-white text-black border border-black" },
  { label: "Research", top: "52%", left: "24%", color: "bg-orange-400 text-white" },
  { label: "Analysis", top: "18%", right: "12%", color: "bg-white text-black border border-black" },
  { label: "Reports", top: "32%", right: "5%", color: "bg-yellow-400 text-black" },
  { label: "News", top: "50%", right: "10%", color: "bg-green-400 text-black" },
  { label: "Trends", bottom: "28%", right: "16%", color: "bg-green-500 text-white" },
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { ref, isVisible } = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Full Screen with Ken Burns Background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background - Vibrant Blue with Moon */}
        <div className="absolute inset-0 overflow-hidden bg-[hsl(220,90%,55%)]">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${moonBackground})`,
              filter: "brightness(0.9) saturate(1.2)",
              mixBlendMode: "overlay",
            }}
          />
          
          {/* Aurora light overlay */}
          <div className="absolute inset-0 animate-aurora">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-transparent to-cyan-400/20" />
            <div className="absolute inset-0 bg-gradient-to-bl from-indigo-600/20 via-transparent to-blue-400/10" />
          </div>
          
          {/* Light sweep effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-light-sweep" />
          </div>
        </div>
        
        {/* Floating Tags with Parallax - Colorful */}
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
              Marketing strategies, guides, and insights for succeeding in Korea's Web3 market.
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

      {/* Blog Grid - Light Theme */}
      <section ref={ref} className="section-light py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  selectedCategory === category
                    ? "bg-primary text-white border-primary"
                    : "bg-transparent text-[hsl(var(--light-fg),0.6)] border-[hsl(var(--light-fg),0.15)] hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {filteredPosts.map((post, index) => (
              <Link 
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Arrow on hover */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-primary uppercase tracking-wider font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-[hsl(var(--light-fg),0.4)]">
                      {post.date}
                    </span>
                  </div>

                  <h2 className="text-xl font-medium text-[hsl(var(--light-fg))] mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-[hsl(var(--light-fg),0.6)] text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--light-fg),0.5)] group-hover:text-primary group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="dotted-line-light mt-24" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;