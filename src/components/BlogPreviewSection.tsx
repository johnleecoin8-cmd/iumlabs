import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";

const blogPosts = [
  {
    slug: "korean-crypto-market-2024",
    title: "Korean Crypto Market in 2024: What You Need to Know",
    excerpt: "A comprehensive guide to understanding Korea's unique crypto landscape and regulations.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    category: "Market Insights",
    readTime: "8 min",
    date: "Dec 5, 2024",
  },
  {
    slug: "top-korean-kols",
    title: "Top 10 Korean Crypto KOLs for Your Next Campaign",
    excerpt: "Discover the most influential crypto opinion leaders in Korea and how to work with them.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    category: "KOL Marketing",
    readTime: "6 min",
    date: "Dec 1, 2024",
  },
  {
    slug: "nft-marketing-korea",
    title: "NFT Marketing Strategies That Work in Korea",
    excerpt: "Learn the proven tactics for launching successful NFT collections in the Korean market.",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=600&h=400&fit=crop",
    category: "NFT",
    readTime: "10 min",
    date: "Nov 28, 2024",
  },
  {
    slug: "exchange-listing-korea",
    title: "How to List Your Token on Korean Exchanges",
    excerpt: "Step-by-step guide to navigating VASP compliance and Korean exchange listings.",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop",
    category: "Exchange",
    readTime: "12 min",
    date: "Nov 20, 2024",
  },
];

const BlogPreviewSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <div className="section-header mb-2">
              Recent News <span className="text-muted-foreground/60">• {blogPosts.length} articles</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Latest <span className="serif-italic">Insights</span>
            </h2>
          </div>
          <Link to="/blog" className="bracket-link group">
            <span>All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Horizontal Scroll */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-6" style={{ minWidth: 'max-content' }}>
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className={`group flex-shrink-0 w-[340px] bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-primary uppercase tracking-wider font-medium">
                      {post.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
