import { useState } from "react";
import { ArrowRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CalendlyButton from "@/components/CalendlyButton";
import { Link } from "react-router-dom";

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

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { ref, isVisible } = useScrollAnimation();

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Dark Section with Giant Typography */}
      <section className="section-dark pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="text-sm text-white/50 mb-4 block">[ Blog ]</span>
            <h1 className="text-[12vw] md:text-[150px] lg:text-[180px] font-light text-white leading-[0.85] tracking-tight">
              Bl<span className="serif-italic text-primary">o</span>g
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10">
            <p className="text-lg text-white/60 max-w-xl">
              Marketing strategies, guides, and insights for succeeding in Korea's Web3 market.
            </p>
            <CalendlyButton className="lunar-btn">
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </CalendlyButton>
          </div>
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
