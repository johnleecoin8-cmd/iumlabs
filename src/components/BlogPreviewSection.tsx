import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    slug: "korean-crypto-market-2024",
    title: "Korean Crypto Market in 2024: What You Need to Know",
    excerpt: "A comprehensive guide to understanding Korea's unique crypto landscape and regulations.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    category: "Market Insights",
    author: "James Lee",
    readTime: "8 min",
    date: "Dec 5, 2024",
  },
  {
    slug: "top-korean-kols",
    title: "Top 10 Korean Crypto KOLs for Your Next Campaign",
    excerpt: "Discover the most influential crypto opinion leaders in Korea and how to work with them.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    category: "KOL Marketing",
    author: "Emily Park",
    readTime: "6 min",
    date: "Dec 1, 2024",
  },
  {
    slug: "nft-marketing-korea",
    title: "NFT Marketing Strategies That Work in Korea",
    excerpt: "Learn the proven tactics for launching successful NFT collections in the Korean market.",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=600&h=400&fit=crop",
    category: "NFT",
    author: "David Kim",
    readTime: "10 min",
    date: "Nov 28, 2024",
  },
];

const BlogPreviewSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
              From Our Blog
            </span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">
              Latest <span className="text-gradient">Insights</span>
            </h2>
          </div>
          <Link to="/blog">
            <Button variant="outline" className="group">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Link
              key={index}
              to={`/blog/${post.slug}`}
              className={`group bg-card border border-border/30 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <span className="text-xs text-primary uppercase tracking-wider">{post.category}</span>
                
                <h3 className="text-lg font-bold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;