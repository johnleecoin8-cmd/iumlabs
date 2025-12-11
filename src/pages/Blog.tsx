import { useState, useEffect } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CalendlyButton from "@/components/CalendlyButton";
import { Link } from "react-router-dom";
import Planet3D from "@/components/Planet3D";
import cosmicNebula from "@/assets/backgrounds/cosmic-nebula.jpg";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  style: "blue-glitch" | "dark-stats" | "white-crypto" | "blue-gradient" | "dark-bold" | "white-bold";
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "korean-crypto-market-2024",
    title: "Don't Panic!",
    subtitle: "Marketing in Uncertain Markets: A Cycle-Tested Playbook",
    category: "Guide",
    date: "Dec 2024",
    style: "blue-glitch",
  },
  {
    id: "2",
    slug: "top-korean-kols",
    title: "How to Take a Project to Market in the InfoFi Era",
    subtitle: "Created by CryptoBridge Korea",
    category: "Strategy",
    date: "Dec 2024",
    style: "dark-stats",
  },
  {
    id: "3",
    slug: "vasp-compliance",
    title: "Crypto Ecosystem Growth Guide",
    subtitle: "Created by CryptoBridge Korea",
    category: "Guide",
    date: "Nov 2024",
    style: "white-crypto",
  },
  {
    id: "4",
    slug: "community-building",
    title: "The Ultimate Crypto Social Media Growth Guide",
    subtitle: "Created by CryptoBridge Korea",
    category: "Strategy",
    date: "Nov 2024",
    style: "blue-gradient",
  },
  {
    id: "5",
    slug: "korea-blockchain-week",
    title: "The Ultimate Brand Playbook for Dominating Kaito Mindshare",
    category: "Events",
    date: "Oct 2024",
    style: "dark-bold",
  },
  {
    id: "6",
    slug: "exchange-listing",
    title: "Founder-Led Marketing Guide ✌️",
    category: "Exchange",
    date: "Oct 2024",
    style: "white-bold",
  },
];

const categories = ["All", "Guide", "Strategy", "Events", "Exchange"];

const floatingTags = [
  { label: "Insights", top: "20%", left: "5%", mobileTop: "12%", mobileLeft: "3%", color: "bg-pink-400 text-white" },
  { label: "Guides", top: "32%", left: "20%", mobileTop: "15%", mobileRight: "3%", color: "bg-cyan-400 text-black" },
  { label: "Strategy", top: "50%", left: "4%", mobileTop: "75%", mobileLeft: "3%", color: "bg-purple-400 text-white" },
  { label: "Research", top: "52%", left: "24%", color: "bg-fuchsia-400 text-white" },
  { label: "Analysis", top: "18%", right: "12%", color: "bg-cyan-300 text-black" },
  { label: "Reports", top: "32%", right: "5%", color: "bg-pink-300 text-black" },
  { label: "News", top: "50%", right: "10%", color: "bg-purple-300 text-black" },
  { label: "Trends", bottom: "28%", right: "16%", color: "bg-fuchsia-500 text-white" },
];

// Card style components
const BlueGlitchCard = ({ post }: { post: BlogPost }) => (
  <div className="relative h-full bg-[hsl(220,90%,55%)] p-6 flex flex-col overflow-hidden group">
    {/* Glitch overlay effect */}
    <div className="absolute inset-0 opacity-20 mix-blend-multiply">
      <div className="absolute top-1/3 left-0 right-0 h-32 bg-gradient-to-r from-transparent via-green-400 to-transparent transform -skew-y-12" />
    </div>
    
    {/* Corner brackets */}
    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/40" />
    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/40" />
    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/40" />
    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/40" />
    
    <div className="relative z-10 flex-1">
      <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-3 tracking-tight" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}>
        {post.title}
      </h2>
      <p className="text-sm md:text-base font-bold text-white/90 uppercase tracking-wide">
        {post.subtitle}
      </p>
    </div>
    
    {/* Bottom image placeholder */}
    <div className="relative mt-auto pt-8">
      <div className="aspect-[4/3] bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white text-2xl">📊</span>
          </div>
        </div>
        {/* Pixel/glitch decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-[hsl(220,90%,55%)]" />
        <div className="absolute top-6 left-6 w-3 h-3 bg-[hsl(220,90%,55%)]" />
        <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-400" />
      </div>
    </div>
    
    {/* Hover arrow */}
    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
      <ArrowUpRight className="w-5 h-5 text-white" />
    </div>
  </div>
);

const DarkStatsCard = ({ post }: { post: BlogPost }) => (
  <div className="relative h-full bg-gradient-to-br from-[#0a1628] to-[#1a2a4a] p-6 flex flex-col overflow-hidden group">
    {/* Top section */}
    <div className="relative z-10 mb-6">
      <h2 className="text-3xl md:text-4xl font-light text-white leading-tight mb-2">
        {post.title}
      </h2>
      <p className="text-sm text-white/50">{post.subtitle}</p>
    </div>
    
    {/* Stats mockup */}
    <div className="flex-1 flex items-center justify-center">
      <div className="relative w-full max-w-xs">
        {/* Central logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3">
            <span className="text-2xl font-bold text-[#0a1628]">CB</span>
          </div>
          <span className="text-white font-medium">CryptoBridge Korea</span>
          <span className="text-white/50 text-sm">@CryptoBridgeKR</span>
        </div>
        
        {/* Stats badges */}
        <div className="absolute -top-2 -left-4 bg-primary/90 rounded-lg px-3 py-2">
          <span className="text-xs text-white/70">7 Day Change</span>
          <div className="text-lg font-bold text-white">+270</div>
        </div>
        <div className="absolute top-4 -right-2 bg-primary/90 rounded-lg px-3 py-2">
          <span className="text-xs text-white/70">24h Change</span>
          <div className="text-lg font-bold text-white">+52</div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-primary/90 rounded-lg px-3 py-2">
          <span className="text-xs text-white/70">Mindshare</span>
          <div className="text-lg font-bold text-white">8,175</div>
        </div>
      </div>
    </div>
    
    {/* Hover arrow */}
    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
      <ArrowUpRight className="w-5 h-5 text-white" />
    </div>
  </div>
);

const WhiteCryptoCard = ({ post }: { post: BlogPost }) => (
  <div className="relative h-full bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex flex-col overflow-hidden group">
    {/* Corner accent */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-primary" />
    <div className="absolute top-4 right-4 w-4 h-8 bg-white" />
    
    <div className="relative z-10 flex-1">
      <h2 className="text-3xl md:text-4xl font-light text-primary leading-tight mb-2">
        {post.title}
      </h2>
      <p className="text-sm text-slate-500">{post.subtitle}</p>
    </div>
    
    {/* 3D crypto coins mockup */}
    <div className="relative mt-auto pt-8 flex justify-end">
      <div className="relative w-48 h-48">
        <div className="absolute top-0 left-0 w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl flex items-center justify-center text-white font-bold">₿</div>
        <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl flex items-center justify-center text-white font-bold text-sm">Ξ</div>
        <div className="absolute bottom-4 left-8 w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-xl flex items-center justify-center text-white font-bold text-xs">◎</div>
        <div className="absolute bottom-0 right-4 w-16 h-16 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 shadow-xl transform rotate-12" />
      </div>
    </div>
    
    {/* Hover arrow */}
    <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
      <ArrowUpRight className="w-5 h-5 text-primary" />
    </div>
  </div>
);

const BlueGradientCard = ({ post }: { post: BlogPost }) => (
  <div className="relative h-full bg-gradient-to-br from-[hsl(220,90%,55%)] to-[hsl(220,90%,45%)] p-6 flex flex-col overflow-hidden group">
    {/* Logo */}
    <div className="flex items-center gap-2 mb-6">
      <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center">
        <span className="text-white font-bold text-sm">CB</span>
      </div>
      <span className="text-white/80 text-sm">CryptoBridge Korea</span>
    </div>
    
    {/* Diagonal lines */}
    <div className="absolute top-20 right-0 w-32 h-px bg-white/20 transform rotate-45" />
    <div className="absolute top-24 right-4 w-24 h-px bg-white/20 transform rotate-45" />
    
    <div className="relative z-10 flex-1">
      <h2 className="text-2xl md:text-3xl font-light text-white leading-tight mb-2">
        {post.title}
      </h2>
      <p className="text-sm text-white/60">{post.subtitle}</p>
    </div>
    
    {/* 3D bar chart mockup */}
    <div className="relative mt-auto pt-8">
      <div className="flex items-end gap-3 h-32">
        <div className="flex-1 bg-white/20 rounded-t-lg h-1/3 transform perspective-500" style={{ transform: "perspective(100px) rotateX(5deg)" }} />
        <div className="flex-1 bg-white/30 rounded-t-lg h-1/2 transform perspective-500" style={{ transform: "perspective(100px) rotateX(5deg)" }} />
        <div className="flex-1 bg-white/40 rounded-t-lg h-2/3 transform perspective-500" style={{ transform: "perspective(100px) rotateX(5deg)" }} />
        <div className="flex-1 bg-white/50 rounded-t-lg h-full transform perspective-500" style={{ transform: "perspective(100px) rotateX(5deg)" }} />
      </div>
    </div>
    
    {/* Hover arrow */}
    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
      <ArrowUpRight className="w-5 h-5 text-white" />
    </div>
  </div>
);

const DarkBoldCard = ({ post }: { post: BlogPost }) => (
  <div className="relative h-full bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-6 flex flex-col items-center justify-center overflow-hidden group">
    {/* Logo */}
    <div className="absolute top-6 left-6 flex items-center gap-2">
      <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
        <span className="text-white font-bold text-sm">CB</span>
      </div>
      <span className="text-white/60 text-sm">CryptoBridge Korea</span>
    </div>
    
    <div className="relative z-10 text-center px-4">
      <h2 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase tracking-wide">
        {post.title}
      </h2>
    </div>
    
    {/* Hover arrow */}
    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
      <ArrowUpRight className="w-5 h-5 text-white" />
    </div>
  </div>
);

const WhiteBoldCard = ({ post }: { post: BlogPost }) => (
  <div className="relative h-full bg-gradient-to-br from-[hsl(220,90%,55%)] to-[hsl(220,90%,50%)] p-6 flex flex-col overflow-hidden group">
    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-10" style={{ 
      backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
      backgroundSize: "20px 20px"
    }} />
    
    {/* Logo */}
    <div className="absolute top-6 right-6 flex items-center gap-2">
      <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center">
        <span className="text-white font-bold text-sm">CB</span>
      </div>
      <span className="text-white/80 text-sm">CryptoBridge Korea</span>
    </div>
    
    <div className="relative z-10 flex-1 flex items-center">
      <h2 className="text-3xl md:text-4xl font-black text-white leading-tight uppercase tracking-tight" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}>
        {post.title}
      </h2>
    </div>
    
    {/* Hover arrow */}
    <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
      <ArrowUpRight className="w-5 h-5 text-white" />
    </div>
  </div>
);

const BlogCard = ({ post }: { post: BlogPost }) => {
  switch (post.style) {
    case "blue-glitch": return <BlueGlitchCard post={post} />;
    case "dark-stats": return <DarkStatsCard post={post} />;
    case "white-crypto": return <WhiteCryptoCard post={post} />;
    case "blue-gradient": return <BlueGradientCard post={post} />;
    case "dark-bold": return <DarkBoldCard post={post} />;
    case "white-bold": return <WhiteBoldCard post={post} />;
    default: return <BlueGradientCard post={post} />;
  }
};

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
        {/* Background - Cosmic Nebula */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${cosmicNebula})`,
              filter: "brightness(0.6) saturate(1.3)",
            }}
          />
          
          {/* Aurora light overlay - Nebula pink/purple/cyan theme */}
          <div className="absolute inset-0 animate-aurora">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/25 via-transparent to-cyan-500/20" />
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/20 via-transparent to-fuchsia-500/15" />
          </div>
          
          {/* Light sweep effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-light-sweep" />
          </div>
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.9)]" />
          
          {/* 3D Nebula Effect */}
          <Planet3D type="nebula" className="opacity-50" />
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

      {/* Blog Grid - Dark Theme Magazine Style */}
      <section ref={ref} className="bg-background py-24 px-4">
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
                    : "bg-transparent text-white/60 border-white/20 hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid - Magazine Layout */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {filteredPosts.map((post, index) => (
              <Link 
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px] transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BlogCard post={post} />
              </Link>
            ))}
          </div>

          <div className="dotted-line mt-24" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
