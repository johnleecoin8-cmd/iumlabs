import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

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
];

const BlogPreviewSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="section-light py-32 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Giant Typography Header - Lunar Strategy Style */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-[15vw] md:text-[180px] lg:text-[220px] font-light leading-[0.85] tracking-tight text-[hsl(var(--light-fg))]">
            Bl<span className="serif-italic text-primary">o</span>g
          </h2>
        </div>

        {/* Info Bar */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between mb-12 pb-8 border-b border-[hsl(var(--light-fg),0.1)] transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-2 text-[hsl(var(--light-fg),0.5)] text-sm mb-4 md:mb-0">
            <span>↓</span>
            <span>Recent News</span>
          </div>
          
          <div className="flex items-center gap-8">
            <span className="text-[hsl(var(--light-fg),0.5)] text-sm">
              +{blogPosts.length} articles
            </span>
            <Link to="/blog" className="flex items-center gap-2 text-[hsl(var(--light-fg))] text-sm font-medium hover:text-primary transition-colors">
              <span>[</span>
              <span>all articles</span>
              <span>]</span>
            </Link>
          </div>
        </div>

        {/* Blog Grid - 3 column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className={`group transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Arrow Icon on Hover */}
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
                
                <h3 className="text-xl font-medium text-[hsl(var(--light-fg))] mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-[hsl(var(--light-fg),0.6)] text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[hsl(var(--light-fg),0.2)] text-[hsl(var(--light-fg))] text-sm font-medium hover:bg-[hsl(var(--light-fg))] hover:text-[hsl(var(--light-bg))] transition-all duration-300">
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Decorative dotted line */}
        <div className="dotted-line-light mt-24" />
      </div>
    </section>
  );
};

export default BlogPreviewSection;
