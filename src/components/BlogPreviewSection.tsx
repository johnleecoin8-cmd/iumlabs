import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const blogPosts = [
  {
    slug: "korean-crypto-market-2024",
    title: "The Ultimate Guide to Korean Crypto Market in 2024",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    date: "Dec 10, 2024",
  },
  {
    slug: "kol-marketing-strategies",
    title: "KOL Marketing Strategies That Actually Work in Korea",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
    date: "Dec 08, 2024",
  },
  {
    slug: "community-building-korea",
    title: "Building a Loyal Community in the Korean Crypto Space",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    date: "Dec 05, 2024",
  },
  {
    slug: "exchange-listing-guide",
    title: "Complete Exchange Listing Guide for Korean Markets",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=300&fit=crop",
    date: "Dec 01, 2024",
  },
  {
    slug: "regulatory-landscape",
    title: "Understanding Korea's Crypto Regulatory Landscape",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=400&h=300&fit=crop",
    date: "Nov 28, 2024",
  },
  {
    slug: "pr-media-coverage",
    title: "How to Get PR & Media Coverage in Korean Crypto News",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop",
    date: "Nov 25, 2024",
  },
  {
    slug: "telegram-discord-growth",
    title: "Telegram & Discord Growth Hacks for Korean Audiences",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
    date: "Nov 20, 2024",
  },
  {
    slug: "nft-marketing-korea",
    title: "NFT Marketing Playbook for the Korean Market",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
    date: "Nov 15, 2024",
  },
];

const BlogPreviewSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-24 px-4 flex-1">
      <div className="container mx-auto max-w-7xl">
        {/* Header Row */}
        <div className={`grid lg:grid-cols-2 gap-8 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left - Title */}
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-light text-[#1a1a1a]">
            <span className="serif-italic">Blog</span>
          </h2>
          
          {/* Right - Description */}
          <p className="text-lg text-[#1a1a1a]/60 leading-relaxed self-end">
            Our blog is a dedicated channel for insights into Korean crypto marketing, 
            regulatory updates, and proven strategies for Web3 projects entering Korea.
          </p>
        </div>

        {/* Sub-header Row */}
        <div className={`flex items-center justify-between mb-8 pb-4 border-b border-[#1a1a1a]/10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-2 text-sm text-[#1a1a1a]/50">
            <span>↓</span>
            <span>Recent News</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#1a1a1a]/40">+10 articles</span>
            <Link
              to="/research"
              className="px-4 py-2 rounded-full border border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors text-sm"
            >
              all articles
            </Link>
          </div>
        </div>

        {/* Blog Grid - 4 columns */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {blogPosts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/research/${post.slug}`}
              className="group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#1a1a1a]/5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5 text-[#1a1a1a]" />
                  </div>
                </div>
              </div>
              
              {/* Date */}
              <p className="text-xs text-[#1a1a1a]/40 mb-2">{post.date}</p>
              
              {/* Title */}
              <h3 className="text-sm font-medium text-[#1a1a1a]/90 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
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