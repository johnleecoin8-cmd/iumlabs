import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const blogPosts = [
  {
    slug: "korean-crypto-market-2024",
    title: "The Ultimate Guide to Korean Crypto Market in 2024",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    date: "Dec 10, 2024",
    category: "Market Research",
  },
  {
    slug: "kol-marketing-strategies",
    title: "KOL Marketing Strategies That Actually Work in Korea",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
    date: "Dec 08, 2024",
    category: "Marketing",
  },
  {
    slug: "community-building-korea",
    title: "Building a Loyal Community in the Korean Crypto Space",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    date: "Dec 05, 2024",
    category: "Community",
  },
  {
    slug: "exchange-listing-guide",
    title: "Complete Exchange Listing Guide for Korean Markets",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=300&fit=crop",
    date: "Dec 01, 2024",
    category: "Exchange",
  },
  {
    slug: "regulatory-landscape",
    title: "Understanding Korea's Crypto Regulatory Landscape",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=400&h=300&fit=crop",
    date: "Nov 28, 2024",
    category: "Regulation",
  },
  {
    slug: "pr-media-coverage",
    title: "How to Get PR & Media Coverage in Korean Crypto News",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop",
    date: "Nov 25, 2024",
    category: "PR",
  },
  {
    slug: "telegram-discord-growth",
    title: "Telegram & Discord Growth Hacks for Korean Audiences",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
    date: "Nov 20, 2024",
    category: "Growth",
  },
  {
    slug: "nft-marketing-korea",
    title: "NFT Marketing Playbook for the Korean Market",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
    date: "Nov 15, 2024",
    category: "NFT",
  },
];

const topicTags = [
  { label: "DeFi", color: "bg-blue-500/20 text-blue-400 border-blue-400/30" },
  { label: "Marketing", color: "bg-pink-500/20 text-pink-400 border-pink-400/30" },
  { label: "Regulation", color: "bg-yellow-500/20 text-yellow-400 border-yellow-400/30" },
  { label: "Community", color: "bg-green-500/20 text-green-400 border-green-400/30" },
  { label: "NFT", color: "bg-purple-500/20 text-purple-400 border-purple-400/30" },
];

const GlowingOrbs = () => (
  <>
    <div 
      className="glowing-orb glowing-orb-orange w-[400px] h-[400px] -top-20 right-20"
      style={{ animationDelay: '0s' }}
    />
    <div 
      className="glowing-orb glowing-orb-purple w-[350px] h-[350px] bottom-40 -left-20"
      style={{ animationDelay: '-6s' }}
    />
  </>
);

const BlogPreviewSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-24 px-4 flex-1 bg-[hsl(0,0%,4%)] relative overflow-hidden">
      {/* Glowing Orbs */}
      <GlowingOrbs />

      {/* Floating Topic Tags */}
      <div className="absolute top-8 left-0 right-0 hidden lg:flex justify-center gap-3 z-20">
        {topicTags.map((tag, index) => (
          <span
            key={tag.label}
            className={`floating-tag px-4 py-2 text-xs rounded-full border backdrop-blur-sm ${tag.color}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Row */}
        <div className={`grid lg:grid-cols-2 gap-8 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left - Title */}
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-light text-white">
            <span className="serif-italic text-glow">Blog</span>
          </h2>
          
          {/* Right - Description */}
          <p className="text-lg text-white/50 leading-relaxed self-end">
            Our blog is a dedicated channel for insights into Korean crypto marketing, 
            regulatory updates, and proven strategies for Web3 projects entering Korea.
          </p>
        </div>

        {/* Sub-header Row */}
        <div className={`flex items-center justify-between mb-8 pb-4 border-b border-white/10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>↓</span>
            <span>Recent News</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/40">+10 articles</span>
            <Link
              to="/blog"
              className="lunar-btn text-sm"
            >
              all articles
            </Link>
          </div>
        </div>

        {/* Blog Grid - 4 columns with enhanced cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {blogPosts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group"
              style={{ 
                animationDelay: `${index * 50}ms`,
                transitionDelay: `${index * 75}ms`,
              }}
            >
              {/* Image with enhanced effects */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 glow-border card-shine">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay that animates */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Category pill */}
                <div className="absolute top-3 left-3">
                  <span className="glass-card px-3 py-1 rounded-full text-xs text-white/90">
                    {post.category}
                  </span>
                </div>
                
                {/* Hover overlay with arrow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Date */}
              <p className="text-xs text-white/40 mb-2">{post.date}</p>
              
              {/* Title */}
              <h3 className="text-sm font-medium text-white leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPreviewSection;
