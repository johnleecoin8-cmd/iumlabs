import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, Copy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { researchPosts } from "./Research";
import { toast } from "sonner";

const ResearchDetail = () => {
  const { slug } = useParams();
  const post = researchPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-[hsl(0,0%,96%)]">
        <Navbar />
        <div className="container mx-auto max-w-4xl px-4 py-32 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Article Not Found</h1>
          <p className="text-neutral-500 mb-8">The article you're looking for doesn't exist.</p>
          <Link 
            to="/research" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Research
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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
    <div className="min-h-screen bg-[hsl(0,0%,96%)]">
      <Navbar />
      
      {/* Hero - Dark Section */}
      <section className="bg-[hsl(220,15%,8%)] pt-24 pb-12">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Back Link */}
          <Link 
            to="/research" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Research
          </Link>
          
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/10 text-white/80 rounded text-sm">
              {post.category}
            </span>
            <span className="text-white/50 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="text-white/50 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
            {post.title}
          </h1>
          
          {/* Author & Share */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-medium text-white">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-white font-medium">{post.author}</p>
                <p className="text-white/50 text-sm">{post.authorRole}</p>
              </div>
            </div>
            
            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="text-white/50 text-sm mr-2">Share:</span>
              <button 
                onClick={() => handleShare("twitter")}
                className="p-2 rounded bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleShare("linkedin")}
                className="p-2 rounded bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button 
                onClick={handleCopyLink}
                className="p-2 rounded bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto max-w-5xl px-4 -mt-6 mb-12">
        <div className="aspect-[21/9] rounded-lg overflow-hidden shadow-xl">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto max-w-4xl px-4 pb-16">
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm">
          <div className="prose prose-neutral prose-lg max-w-none">
            {post.content.split('\n').map((line, index) => {
              if (line.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl md:text-3xl font-bold text-neutral-900 mt-10 mb-4">
                    {line.replace('## ', '')}
                  </h2>
                );
              }
              if (line.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl md:text-2xl font-semibold text-neutral-800 mt-8 mb-3">
                    {line.replace('### ', '')}
                  </h3>
                );
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <p key={index} className="font-semibold text-neutral-900 mt-6 mb-2">
                    {line.replace(/\*\*/g, '')}
                  </p>
                );
              }
              if (line.startsWith('- ')) {
                return (
                  <li key={index} className="text-neutral-600 ml-6 mb-2 list-disc">
                    {line.replace('- ', '')}
                  </li>
                );
              }
              if (line.startsWith('| ')) {
                return null;
              }
              if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                return (
                  <li key={index} className="text-neutral-600 ml-6 mb-2 list-decimal">
                    {line.replace(/^\d+\.\s/, '')}
                  </li>
                );
              }
              if (line.startsWith('✅') || line.startsWith('❌')) {
                return (
                  <p key={index} className="text-neutral-600 mb-2">
                    {line}
                  </p>
                );
              }
              if (line.startsWith('---')) {
                return <hr key={index} className="border-neutral-200 my-10" />;
              }
              if (line.startsWith('*') && line.endsWith('*')) {
                return (
                  <p key={index} className="text-neutral-500 italic my-6 pl-4 border-l-2 border-neutral-300">
                    {line.replace(/\*/g, '')}
                  </p>
                );
              }
              if (line.trim() === '') {
                return <br key={index} />;
              }
              return (
                <p key={index} className="text-neutral-600 mb-4 leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-neutral-200">
            <span className="text-neutral-400 text-sm mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-sm uppercase tracking-wider text-neutral-500">related articles</h2>
              <Link 
                to="/research" 
                className="text-neutral-900 text-sm hover:underline"
              >
                View All →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  to={`/research/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="aspect-[16/10] rounded-lg overflow-hidden mb-4">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-neutral-400 text-xs mb-2">{relatedPost.date}</p>
                  <h3 className="text-lg font-bold text-neutral-900 leading-snug group-hover:text-neutral-600 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                </Link>
              ))}
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
