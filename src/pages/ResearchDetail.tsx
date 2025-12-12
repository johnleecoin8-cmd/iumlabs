import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, Copy, ChevronRight, Sparkles, BookOpen, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { researchPosts } from "./Research";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Category color system matching Research page
const categoryColors: Record<string, { bg: string; text: string; glow: string; gradient: string }> = {
  "Market Research": { bg: "bg-blue-500/20", text: "text-blue-400", glow: "shadow-blue-500/30", gradient: "from-blue-500 to-cyan-400" },
  "DeFi": { bg: "bg-purple-500/20", text: "text-purple-400", glow: "shadow-purple-500/30", gradient: "from-purple-500 to-pink-400" },
  "Strategy": { bg: "bg-emerald-500/20", text: "text-emerald-400", glow: "shadow-emerald-500/30", gradient: "from-emerald-500 to-green-400" },
  "Community": { bg: "bg-orange-500/20", text: "text-orange-400", glow: "shadow-orange-500/30", gradient: "from-orange-500 to-yellow-400" },
  "NFT": { bg: "bg-fuchsia-500/20", text: "text-fuchsia-400", glow: "shadow-fuchsia-500/30", gradient: "from-fuchsia-500 to-rose-400" },
  "Marketing": { bg: "bg-indigo-500/20", text: "text-indigo-400", glow: "shadow-indigo-500/30", gradient: "from-indigo-500 to-violet-400" },
};

const ResearchDetail = () => {
  const { slug } = useParams();
  const post = researchPosts.find(p => p.slug === slug);
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { ref: relatedRef, isVisible: relatedVisible } = useScrollAnimation();
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto max-w-7xl px-4 py-32 text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-light text-white mb-4">Article Not Found</h1>
            <p className="text-white/60 mb-8">The article you're looking for doesn't exist.</p>
            <Link 
              to="/research" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const colors = categoryColors[post.category] || categoryColors["Market Research"];

  const relatedPosts = researchPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section 
        ref={heroRef}
        className={`relative pt-24 pb-16 transition-all duration-1000 ${
          heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b ${colors.gradient} opacity-5`} />
        
        <div className="container mx-auto max-w-4xl px-4 relative">
          {/* Back Link */}
          <Link 
            to="/research" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-all mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Research
          </Link>
          
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`px-4 py-1.5 ${colors.bg} ${colors.text} rounded-full text-sm font-medium backdrop-blur-sm border border-white/10 shadow-lg ${colors.glow}`}>
              {post.category}
            </span>
            <span className="text-white/50 text-sm flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="text-white/50 text-sm flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-8">
            {post.title}
          </h1>
          
          {/* Author & Share */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-lg font-medium text-white shadow-lg ${colors.glow}`}>
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-white font-medium text-lg">{post.author}</p>
                <p className="text-white/50 text-sm">{post.authorRole}</p>
              </div>
            </div>
            
            {/* Share */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10">
              <Share2 className="w-4 h-4 text-white/50" />
              <span className="text-white/50 text-sm">Share:</span>
              <button 
                onClick={() => handleShare("twitter")}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all hover:scale-110"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleShare("linkedin")}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all hover:scale-110"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button 
                onClick={handleCopyLink}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all hover:scale-110"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto max-w-5xl px-4 mb-16">
        <div className="relative group">
          <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`} />
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} opacity-10`} />
          </div>
        </div>
      </section>

      {/* Content */}
      <section 
        ref={contentRef}
        className={`container mx-auto max-w-4xl px-4 pb-20 transition-all duration-1000 delay-200 ${
          contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-white/80 leading-relaxed">
              {post.content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={index} className={`text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient} mt-12 mb-6`}>
                      {line.replace('## ', '')}
                    </h2>
                  );
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl md:text-2xl font-medium text-white mt-8 mb-4">
                      {line.replace('### ', '')}
                    </h3>
                  );
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <p key={index} className="font-semibold text-white mt-6 mb-2">
                      {line.replace(/\*\*/g, '')}
                    </p>
                  );
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={index} className="text-white/70 ml-6 mb-2 list-disc">
                      {line.replace('- ', '')}
                    </li>
                  );
                }
                if (line.startsWith('| ')) {
                  return null;
                }
                if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                  return (
                    <li key={index} className="text-white/70 ml-6 mb-2 list-decimal">
                      {line.replace(/^\d+\.\s/, '')}
                    </li>
                  );
                }
                if (line.startsWith('✅') || line.startsWith('❌')) {
                  return (
                    <p key={index} className="text-white/70 mb-2">
                      {line}
                    </p>
                  );
                }
                if (line.startsWith('---')) {
                  return <hr key={index} className="border-white/10 my-12" />;
                }
                if (line.startsWith('*') && line.endsWith('*')) {
                  return (
                    <p key={index} className="text-white/50 italic my-8 pl-4 border-l-2 border-white/20">
                      {line.replace(/\*/g, '')}
                    </p>
                  );
                }
                if (line.trim() === '') {
                  return <br key={index} />;
                }
                return (
                  <p key={index} className="text-white/70 mb-4 leading-relaxed">
                    {line}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-white/10">
            <span className="text-white/40 text-sm mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-4 py-1.5 bg-white/5 text-white/60 rounded-full text-sm hover:bg-white/10 hover:text-white transition-all cursor-pointer border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section 
          ref={relatedRef}
          className={`bg-[hsl(0,0%,4%)] py-20 transition-all duration-1000 ${
            relatedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <BookOpen className={`w-6 h-6 ${colors.text}`} />
                <h2 className="text-2xl md:text-3xl font-light text-white">
                  Related Articles
                </h2>
              </div>
              <Link 
                to="/research" 
                className="text-primary flex items-center gap-2 hover:gap-3 transition-all group"
              >
                View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => {
                const relatedColors = categoryColors[relatedPost.category] || categoryColors["Market Research"];
                return (
                  <Link 
                    key={relatedPost.id}
                    to={`/research/${relatedPost.slug}`}
                    className="group"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${relatedColors.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 ${relatedColors.bg} ${relatedColors.text} rounded-full text-xs font-medium`}>
                            {relatedPost.category}
                          </span>
                          <span className="text-white/40 text-xs">
                            {relatedPost.readTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
    </div>
  );
};

export default ResearchDetail;
