import { useState } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
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
      
      {/* Hero - Dark Section */}
      <section className="section-dark pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <span className="number-badge text-[hsl(var(--dark-fg))] opacity-60 mb-4 inline-block">Blog</span>
              <h1 className="text-5xl md:text-7xl font-light text-[hsl(var(--dark-fg))] leading-tight mb-6">
                Latest <span className="serif-italic">Insights</span>
              </h1>
              <p className="text-lg text-[hsl(var(--dark-fg))] opacity-60 mb-8 max-w-lg">
                Marketing strategies, guides, and insights for succeeding in Korea's Web3 market.
              </p>
              <CalendlyButton className="lunar-btn">
                <Calendar className="w-4 h-4" />
                <span>Book a Consultation</span>
              </CalendlyButton>
            </div>

            {/* Right - Categories */}
            <div>
              <h2 className="text-2xl font-light text-[hsl(var(--dark-fg))] mb-6">Topics</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-[hsl(var(--dark-fg))] opacity-60 border-[hsl(var(--dark-fg))] border-opacity-30 hover:opacity-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid - Light */}
      <section ref={ref} className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {filteredPosts.map((post, index) => (
              <Link 
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-card border border-border/50 group-hover:border-primary/50 transition-all">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 text-primary font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} read
                    </span>
                  </div>

                  <h2 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
