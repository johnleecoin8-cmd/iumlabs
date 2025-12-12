import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const blogPosts = [
  {
    slug: "korean-crypto-market-2024",
    title: "The Ultimate Guide to Korean Crypto Market in 2024",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    date: "Dec 10, 2024",
    category: "Market Analysis",
    categoryColor: "bg-purple-100 text-purple-700 border-purple-200",
  },
  {
    slug: "kol-marketing-strategies",
    title: "KOL Marketing Strategies That Actually Work in Korea",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
    date: "Dec 08, 2024",
    category: "Marketing",
    categoryColor: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    slug: "community-building-korea",
    title: "Building a Loyal Community in the Korean Crypto Space",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    date: "Dec 05, 2024",
    category: "Community",
    categoryColor: "bg-cyan-100 text-cyan-700 border-cyan-200",
  },
  {
    slug: "exchange-listing-guide",
    title: "Complete Exchange Listing Guide for Korean Markets",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=300&fit=crop",
    date: "Dec 01, 2024",
    category: "Exchange",
    categoryColor: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    slug: "regulatory-landscape",
    title: "Understanding Korea's Crypto Regulatory Landscape",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=400&h=300&fit=crop",
    date: "Nov 28, 2024",
    category: "Regulation",
    categoryColor: "bg-red-100 text-red-700 border-red-200",
  },
  {
    slug: "pr-media-coverage",
    title: "How to Get PR & Media Coverage in Korean Crypto News",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop",
    date: "Nov 25, 2024",
    category: "PR",
    categoryColor: "bg-green-100 text-green-700 border-green-200",
  },
  {
    slug: "telegram-discord-growth",
    title: "Telegram & Discord Growth Hacks for Korean Audiences",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
    date: "Nov 20, 2024",
    category: "Growth",
    categoryColor: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    slug: "nft-marketing-korea",
    title: "NFT Marketing Playbook for the Korean Market",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
    date: "Nov 15, 2024",
    category: "NFT",
    categoryColor: "bg-violet-100 text-violet-700 border-violet-200",
  },
];

const BlogPreviewSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-24 px-4 flex-1 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header Row */}
        <div className={`grid lg:grid-cols-2 gap-8 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left - Title */}
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-light text-[#1a1a1a]">
            <span className="serif-italic text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600">Blog</span>
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
              className="px-4 py-2 rounded-full border border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-transparent transition-all text-sm"
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
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${post.categoryColor}`}>
                    {post.category}
                  </span>
                </div>
              </div>
              
              {/* Date */}
              <p className="text-xs text-[#1a1a1a]/40 mb-2">{post.date}</p>
              
              {/* Title */}
              <h3 className="text-sm font-medium text-[#1a1a1a]/90 leading-snug line-clamp-2 group-hover:text-purple-600 transition-colors">
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