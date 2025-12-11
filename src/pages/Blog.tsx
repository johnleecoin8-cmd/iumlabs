import { useState, useEffect } from "react";
import { ArrowUpRight, Calendar, Mail, ChevronLeft, ChevronRight, BookOpen, TrendingUp, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import CalendlyButton from "@/components/CalendlyButton";
import { Link } from "react-router-dom";
import Planet3D from "@/components/Planet3D";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import SectionBackground from "@/components/SectionBackground";
import FloatingSectionElements from "@/components/FloatingSectionElements";
import GiantSectionTitle from "@/components/GiantSectionTitle";
import GlowCard from "@/components/GlowCard";
import cosmicNebula from "@/assets/backgrounds/cosmic-nebula.jpg";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  readTime?: string;
  featured?: boolean;
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
    readTime: "8 min",
    featured: true,
    style: "blue-glitch",
  },
  {
    id: "2",
    slug: "top-korean-kols",
    title: "How to Take a Project to Market in the InfoFi Era",
    subtitle: "Created by CryptoBridge Korea",
    category: "Strategy",
    date: "Dec 2024",
    readTime: "12 min",
    featured: true,
    style: "dark-stats",
  },
  {
    id: "3",
    slug: "vasp-compliance",
    title: "Crypto Ecosystem Growth Guide",
    subtitle: "Created by CryptoBridge Korea",
    category: "Guide",
    date: "Nov 2024",
    readTime: "15 min",
    style: "white-crypto",
  },
  {
    id: "4",
    slug: "community-building",
    title: "The Ultimate Crypto Social Media Growth Guide",
    subtitle: "Created by CryptoBridge Korea",
    category: "Strategy",
    date: "Nov 2024",
    readTime: "10 min",
    style: "blue-gradient",
  },
  {
    id: "5",
    slug: "korea-blockchain-week",
    title: "The Ultimate Brand Playbook for Dominating Kaito Mindshare",
    category: "Events",
    date: "Oct 2024",
    readTime: "6 min",
    style: "dark-bold",
  },
  {
    id: "6",
    slug: "exchange-listing",
    title: "Founder-Led Marketing Guide ✌️",
    category: "Exchange",
    date: "Oct 2024",
    readTime: "9 min",
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

// Card Components
const FeaturedCard = ({ post, large = false }: { post: BlogPost; large?: boolean }) => (
  <Link 
    to={`/blog/${post.slug}`}
    className={`group relative overflow-hidden rounded-3xl ${large ? 'aspect-[16/10] md:aspect-[16/9]' : 'aspect-square'}`}
  >
    <div className={`absolute inset-0 ${
      post.style === 'blue-glitch' ? 'bg-[hsl(220,90%,55%)]' :
      post.style === 'dark-stats' ? 'bg-gradient-to-br from-[#0a1628] to-[#1a2a4a]' :
      'bg-gradient-to-br from-primary to-primary/80'
    }`} />
    
    {/* Decorations */}
    {post.style === 'blue-glitch' && (
      <>
        <div className="absolute inset-0 opacity-20 mix-blend-multiply">
          <div className="absolute top-1/3 left-0 right-0 h-32 bg-gradient-to-r from-transparent via-green-400 to-transparent transform -skew-y-12" />
        </div>
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/40" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/40" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/40" />
      </>
    )}
    
    {/* Content */}
    <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
          {post.category}
        </span>
        <span className="text-white/60 text-sm">{post.date}</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-end">
        <h2 className={`font-bold text-white leading-tight mb-2 ${large ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
          {post.title}
        </h2>
        {post.subtitle && (
          <p className="text-white/70 text-sm md:text-base">{post.subtitle}</p>
        )}
        {post.readTime && (
          <p className="text-white/50 text-sm mt-2">{post.readTime} read</p>
        )}
      </div>
      
      {/* Hover Arrow */}
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
        <ArrowUpRight className="w-5 h-5 text-white" />
      </div>
    </div>
  </Link>
);

const ArticleCard = ({ post }: { post: BlogPost }) => (
  <Link 
    to={`/blog/${post.slug}`}
    className="group flex gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
  >
    {/* Thumbnail */}
    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-xl shrink-0 ${
      post.style === 'white-crypto' ? 'bg-gradient-to-br from-slate-50 to-slate-100' :
      post.style === 'blue-gradient' ? 'bg-gradient-to-br from-[hsl(220,90%,55%)] to-[hsl(220,90%,45%)]' :
      post.style === 'dark-bold' ? 'bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]' :
      'bg-gradient-to-br from-primary to-primary/80'
    }`} />
    
    {/* Content */}
    <div className="flex-1 flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-primary text-xs font-medium">{post.category}</span>
        <span className="text-white/30">•</span>
        <span className="text-white/40 text-xs">{post.date}</span>
      </div>
      <h3 className="text-white font-medium text-lg group-hover:text-primary transition-colors line-clamp-2">
        {post.title}
      </h3>
      {post.readTime && (
        <span className="text-white/40 text-sm mt-1">{post.readTime} read</span>
      )}
    </div>
    
    {/* Arrow */}
    <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-primary shrink-0 transition-colors" />
  </Link>
);

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { ref, isVisible } = useScrollAnimation();
  const { ref: newsletterRef, isVisible: newsletterVisible } = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured);
  
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Subscribed!",
      description: "You'll receive our latest insights in your inbox.",
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background" id="main-content">
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
          
          {/* Aurora light overlay */}
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
        
        {/* Floating Tags */}
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

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-32 pb-24">
          <div className="mb-16">
            <span className="text-sm text-white/50 mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>[ Blog ]</span>
            <h1 className="text-[12vw] md:text-[150px] lg:text-[180px] font-light text-white leading-[0.85] tracking-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Bl<span className="serif-italic text-primary">o</span>g
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <p className="text-lg text-white/60 max-w-xl">
              Insights, guides, and strategies for succeeding in Korea's Web3 market.
            </p>
            <CalendlyButton className="lunar-btn">
              <Calendar className="w-4 h-4" />
              <span>Get Expert Advice</span>
            </CalendlyButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Top Articles Section with Enhanced Background */}
      <section ref={ref} className="bg-background py-16 px-4 relative">
        {/* Dynamic Background Effects */}
        <SectionBackground type="gradient-mesh" theme="nebula" intensity={0.4} />
        <SectionBackground type="glow-orbs" theme="nebula" intensity={0.3} />
        
        {/* Floating Elements */}
        <FloatingSectionElements
          scrollY={scrollY}
          parallaxMultiplier={0.03}
          elements={[
            { type: "icon", content: <BookOpen className="w-5 h-5" />, position: { top: "10%", left: "3%" }, color: "bg-pink-500/20 text-pink-400" },
            { type: "icon", content: <TrendingUp className="w-5 h-5" />, position: { top: "25%", right: "4%" }, color: "bg-cyan-500/20 text-cyan-400" },
            { type: "icon", content: <Lightbulb className="w-5 h-5" />, position: { bottom: "30%", left: "5%" }, color: "bg-purple-500/20 text-purple-400" },
            { type: "tag", content: "Insights", position: { top: "18%", right: "10%" }, color: "bg-fuchsia-500/20 text-fuchsia-300" },
            { type: "tag", content: "Guides", position: { bottom: "20%", right: "3%" }, color: "bg-cyan-500/20 text-cyan-300" },
          ]}
        />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Giant Section Title */}
          <GiantSectionTitle
            title="Featured Guides"
            accentWord="Guides"
            size="xl"
            theme="dark"
            subtitle="[ Top Articles ]"
          />

          {/* Featured Grid with GlowCard */}
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts[0] && (
              <GlowCard className="rounded-3xl" glowColor="hsl(280, 70%, 55%)" intensity="medium">
                <FeaturedCard post={featuredPosts[0]} large />
              </GlowCard>
            )}
            {featuredPosts[1] && (
              <GlowCard className="rounded-3xl" glowColor="hsl(200, 70%, 50%)" intensity="medium">
                <FeaturedCard post={featuredPosts[1]} large />
              </GlowCard>
            )}
          </div>
        </div>
      </section>

      {/* Category Filter + Recent News */}
      <section className="bg-background py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Category Filter */}
          <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'btn-primary-glow'
                    : 'btn-ghost-dark'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Recent News Header */}
          <div className="mb-8">
            <span className="section-number-badge mb-4">Recent News</span>
            <h2 className="text-2xl font-light text-white">
              All <span className="serif-italic gradient-text-nebula">Articles</span>
            </h2>
          </div>

          {/* Articles List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 transition-colors"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-white/60">
              <span className="text-white">{currentPage}</span> / 1
            </span>
            <button 
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 transition-colors"
              disabled={currentPage === 1}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section ref={newsletterRef} className="py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className={`bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center transition-all duration-700 ${
            newsletterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Subscribe to Our <span className="serif-italic text-primary">Newsletter</span>
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Get the latest insights on Korean crypto market trends, strategies, and opportunities delivered to your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-xl bg-white/5 border-white/10 focus:border-primary text-white placeholder:text-white/30"
              />
              <button
                type="submit"
                className="lunar-btn shrink-0"
              >
                Subscribe
              </button>
            </form>

            <p className="text-white/40 text-sm mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
