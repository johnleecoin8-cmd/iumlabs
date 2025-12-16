import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, Copy, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
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
      <div className="min-h-screen bg-[#0A0A0A]">
        <Navbar />
        <div className="container mx-auto max-w-7xl px-4 py-32 text-center">
          <h1 className="text-4xl font-light text-white mb-4">Article Not Found</h1>
          <p className="text-white/60 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/research" className="text-primary hover:underline">
            ← Back to Research
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
    <div className="min-h-screen bg-[#0A0A0A] p-0.5 sm:p-1 md:p-2">
      <div className="min-h-screen bg-[#0A0A0A] rounded-xl sm:rounded-2xl overflow-hidden">
        <Navbar />
      
      {/* Hero */}
      <section className="relative pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/research" 
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research
            </Link>
          </motion.div>
          
          {/* Meta */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
              {post.category}
            </span>
            <span className="text-white/40 text-sm flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="text-white/40 text-sm flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
          </motion.div>
          
          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-8"
          >
            {post.title}
          </motion.h1>
          
          {/* Author */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-white/10"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-medium text-white">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-white font-medium">{post.author}</p>
                <p className="text-white/40 text-sm">{post.authorRole}</p>
              </div>
            </div>
            
            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-sm mr-2">Share:</span>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare("twitter")}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              >
                <Twitter className="w-4 h-4" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare("linkedin")}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyLink}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              >
                <Copy className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto max-w-5xl px-4 mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="aspect-[21/9] rounded-2xl overflow-hidden"
        >
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Content */}
      <section className="container mx-auto max-w-4xl px-4 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="text-white/80 leading-relaxed">
            {post.content.split('\n').map((line, index) => {
              if (line.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl md:text-3xl font-medium text-white mt-12 mb-6">
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
                  <li key={index} className="text-white/70 ml-6 mb-2">
                    {line.replace('- ', '')}
                  </li>
                );
              }
              if (line.startsWith('| ')) {
                // Skip table formatting for now
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
                  <p key={index} className="text-white/50 italic my-8">
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
        </motion.div>

        {/* Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-white/10"
        >
          <span className="text-white/40 text-sm mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <motion.span 
              key={tag} 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              className="px-3 py-1 bg-white/5 text-white/60 rounded-full text-sm cursor-pointer transition-colors"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#0A0A0A] py-20 border-t border-white/10">
          <div className="container mx-auto max-w-7xl px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-light text-white">
                Related Articles
              </h2>
              <Link 
                to="/research" 
                className="text-primary flex items-center gap-2 hover:gap-3 transition-all"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    to={`/research/${relatedPost.slug}`}
                    className="group block"
                  >
                    <motion.div 
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-2xl border border-white/10 hover:border-white/30 overflow-hidden bg-white/[0.02] transition-all duration-300"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <motion.img 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2 py-1 bg-white/5 text-white/60 rounded text-xs">
                            {relatedPost.category}
                          </span>
                          <span className="text-white/40 text-xs">
                            {relatedPost.readTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-white leading-snug group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
      </div>
    </div>
  );
};

export default ResearchDetail;
