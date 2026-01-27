import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, Copy, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ArticleSchema from "@/components/ArticleSchema";

// Helper function to calculate read time from content
const calculateReadTime = (content: string | null): string => {
  if (!content) return "5 min read";
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const ResearchDetail = () => {
  const { slug } = useParams();

  // Fetch from DB
  const { data: dbPost, isLoading } = useQuery({
    queryKey: ['research-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  // Fetch related posts from DB
  const { data: dbRelatedPosts } = useQuery({
    queryKey: ['related-research-posts', dbPost?.id, dbPost?.category],
    queryFn: async () => {
      if (!dbPost?.id) return [];
      
      // First try to get posts from the same category
      if (dbPost.category) {
        const { data: categoryPosts, error: categoryError } = await supabase
          .from('research_posts')
          .select('*')
          .eq('category', dbPost.category)
          .eq('is_published', true)
          .neq('id', dbPost.id)
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (!categoryError && categoryPosts && categoryPosts.length > 0) {
          return categoryPosts;
        }
      }
      
      // Fallback: get latest posts excluding current one
      const { data, error } = await supabase
        .from('research_posts')
        .select('*')
        .eq('is_published', true)
        .neq('id', dbPost.id)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
    enabled: !!dbPost?.id,
  });

  // Transform DB data to display format
  const post = dbPost ? {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    image: dbPost.image || '',
    date: dbPost.date || new Date(dbPost.created_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: dbPost.read_time || calculateReadTime(dbPost.content),
    category: dbPost.category || 'Blog',
    author: dbPost.author || 'Ium Labs',
    authorRole: dbPost.author_role || 'Ium Labs Team',
    authorImage: (dbPost as any).author_image || '',
    excerpt: dbPost.excerpt || (dbPost.content ? dbPost.content.substring(0, 150) + '...' : ''),
    tags: dbPost.tags || [],
    content: dbPost.content || '',
    chartImages: undefined as Record<string, string> | undefined,
  } : null;
  
  const relatedPosts = (dbRelatedPosts || []).map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    image: p.image || '',
    readTime: p.read_time || calculateReadTime(p.content),
    category: p.category || 'Blog',
  }));

  // Dynamic page meta for SEO - must be before any conditional returns
  useEffect(() => {
    if (post) {
      const title = `${post.title} | Ium Labs Blog`;
      const description = post.excerpt || `${post.title} - ${post.category} article by Ium Labs.`;
      const pageUrl = `https://iumlabs.io/blog/${slug}`;
      const ogImage = post.image.startsWith('http') 
        ? post.image 
        : `https://iumlabs.io${post.image}`;
      
      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', pageUrl);
      document.querySelector('meta[property="og:image"]')?.setAttribute('content', ogImage);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
      document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', ogImage);
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl);
    }
  }, [post, slug]);

  // Dynamic breadcrumb items - must be before any conditional returns
  const breadcrumbItems = useMemo(() => [
    { name: "Home", url: "https://iumlabs.io" },
    { name: "Blog", url: "https://iumlabs.io/blog" },
    { name: post?.title || '', url: `https://iumlabs.io/blog/${slug}` }
  ], [post?.title, slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleShare = (platform: string) => {
    if (!post) return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A]">
        <Navbar />
        <div className="container mx-auto max-w-7xl px-4 py-32 text-center">
          <div className="text-white/60">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A0A0A]">
        <Navbar />
        <div className="container mx-auto max-w-7xl px-4 py-32 text-center">
          <h1 className="text-4xl font-light text-white mb-4">Article Not Found</h1>
          <p className="text-white/60 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-0.5 sm:p-1 md:p-2">
      <div className="min-h-screen bg-[#0A0A0A] rounded-xl sm:rounded-2xl overflow-hidden">
        <Navbar />
      
      {/* Hero */}
      <section className="relative pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Back Link */}
          <div>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
          
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
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
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-8">
            {post.title}
          </h1>
          
          {/* Author */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-white/10">
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
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto max-w-5xl px-4 mb-16">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto max-w-4xl px-4 pb-20">
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-white/80 leading-relaxed">
            {post.content.split('\n').map((line, index) => {
              // Handle standard markdown images ![alt](url)
              if (line.startsWith('![') && line.includes('](')) {
                const imageMatch = line.match(/\!\[([^\]]*)\]\(([^)]+)\)/);
                if (imageMatch) {
                  const [, altText, imageUrl] = imageMatch;
                  // Skip chart: protocol images if no chartImages available
                  if (imageUrl.startsWith('chart:')) {
                    if (post.chartImages) {
                      const chartKey = imageUrl.replace('chart:', '');
                      const chartImage = post.chartImages[chartKey as keyof typeof post.chartImages];
                      if (chartImage) {
                        return (
                          <div key={index} className="my-8 rounded-xl overflow-hidden border border-white/10">
                            <img 
                              src={chartImage} 
                              alt={altText}
                              className="w-full h-auto"
                            />
                          </div>
                        );
                      }
                    }
                    return null;
                  }
                  // Regular image URL
                  return (
                    <div key={index} className="my-8 rounded-xl overflow-hidden border border-white/10">
                      <img 
                        src={imageUrl} 
                        alt={altText}
                        className="w-full h-auto"
                      />
                    </div>
                  );
                }
              }
              // Handle blockquotes (lines starting with >)
              if (line.startsWith('> ')) {
                const quoteContent = line.replace(/^>\s*/, '');
                // Check if it's a bold header inside quote
                if (quoteContent.startsWith('**') && quoteContent.includes('**')) {
                  return (
                    <div key={index} className="border-l-4 border-primary/50 pl-4 my-4 bg-primary/5 py-3 rounded-r">
                      <p className="text-white/80 font-medium">{quoteContent.replace(/\*\*/g, '')}</p>
                    </div>
                  );
                }
                return (
                  <div key={index} className="border-l-4 border-primary/50 pl-4 ml-0 bg-primary/5 py-2 rounded-r">
                    <p className="text-white/70 italic">{quoteContent}</p>
                  </div>
                );
              }
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
              if (line.startsWith('#### ')) {
                return (
                  <h4 key={index} className="text-lg md:text-xl font-medium text-white mt-6 mb-3">
                    {line.replace('#### ', '')}
                  </h4>
                );
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <p key={index} className="font-semibold text-white mt-6 mb-2">
                    {line.replace(/\*\*/g, '')}
                  </p>
                );
              }
              // Handle inline bold text
              if (line.includes('**')) {
                const parts = line.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <p key={index} className="text-white/70 mb-4 leading-relaxed">
                    {parts.map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="text-white font-semibold">{part.replace(/\*\*/g, '')}</strong>;
                      }
                      return part;
                    })}
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
              // Handle table - collect consecutive table rows
              if (line.startsWith('| ') && !line.includes('---')) {
                const lines = post.content.split('\n');
                
                // Check if this is the first row of a table
                const prevLine = index > 0 ? lines[index - 1] : '';
                if (prevLine.startsWith('| ') || prevLine.includes('---')) {
                  // This row was already rendered as part of the table
                  return null;
                }
                
                // Collect all table rows
                const tableRows: string[] = [];
                let i = index;
                while (i < lines.length && (lines[i].startsWith('| ') || lines[i].includes('|---'))) {
                  if (!lines[i].includes('|---')) {
                    tableRows.push(lines[i]);
                  }
                  i++;
                }
                
                if (tableRows.length === 0) return null;
                
                // Parse and render table
                const headerRow = tableRows[0];
                const bodyRows = tableRows.slice(1);
                const headerCells = headerRow.split('|').filter(cell => cell.trim()).map(cell => cell.trim());
                
                return (
                  <div key={index} className="my-6 overflow-x-auto rounded-lg border border-white/10">
                    <table className="w-full text-sm">
                      <thead className="bg-white/5">
                        <tr>
                          {headerCells.map((cell, i) => (
                            <th key={i} className="px-4 py-3 text-left text-white font-semibold border-b border-white/10">
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bodyRows.map((row, rowIdx) => {
                          const cells = row.split('|').filter(cell => cell.trim()).map(cell => cell.trim());
                          return (
                            <tr key={rowIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              {cells.map((cell, cellIdx) => (
                                <td key={cellIdx} className="px-4 py-3 text-white/70">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              }
              if (line.includes('|---')) {
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
              if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
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
        </div>

      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#0A0A0A] py-20 border-t border-white/10">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl md:text-3xl font-light text-white">
                More Articles
              </h2>
              <Link 
                to="/blog" 
                className="text-primary flex items-center gap-2 hover:gap-3 transition-all"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id}>
                  <Link 
                    to={`/blog/${relatedPost.slug}`}
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
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Footer Links */}
      <FooterLinksSection />

      <Footer />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ArticleSchema
        title={post.title}
        description={post.excerpt || `${post.title} - ${post.category} article by Ium Labs.`}
        image={post.image}
        author={post.author}
        authorRole={post.authorRole}
        datePublished={post.date}
        url={`https://iumlabs.io/blog/${slug}`}
        tags={post.tags}
      />
      </div>
    </div>
  );
};

export default ResearchDetail;