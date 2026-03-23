import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, Copy, ChevronRight, ArrowUpRight } from "lucide-react";
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

  // Dynamic page meta for SEO
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

  // Dynamic breadcrumb items
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
        <div className="container mx-auto max-w-4xl px-4 py-32 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A0A0A]">
        <Navbar />
        <div className="container mx-auto max-w-4xl px-4 py-32 text-center">
          <h1 className="text-2xl font-medium text-white mb-3">Article Not Found</h1>
          <p className="text-white/40 text-sm mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-primary text-sm hover:underline">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Article Header */}
      <article className="pt-24 sm:pt-28 md:pt-32">
        <div className="container mx-auto max-w-3xl px-4 md:px-8">
          {/* Back + Breadcrumb */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8 sm:mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-xs text-primary font-medium">
              {post.category}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-white/35 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-white/35 text-xs flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-white leading-[1.15] tracking-tight mb-6 sm:mb-8">
            {post.title}
          </h1>

          {/* Author + Share row */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 sm:pb-8 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-xs font-medium text-white/60">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm text-white/80 font-medium">{post.author}</p>
                <p className="text-xs text-white/30">{post.authorRole}</p>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-1.5">
              {[
                { icon: Twitter, action: () => handleShare("twitter"), label: "Twitter" },
                { icon: Linkedin, action: () => handleShare("linkedin"), label: "LinkedIn" },
                { icon: Copy, action: handleCopyLink, label: "Copy" },
              ].map(({ icon: Icon, action, label }) => (
                <button
                  key={label}
                  onClick={action}
                  className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/30 hover:text-white/60 transition-all"
                  title={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="container mx-auto max-w-4xl px-4 md:px-8 mt-8 sm:mt-10">
            <div className="aspect-[2/1] sm:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.06]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto max-w-3xl px-4 md:px-8 py-10 sm:py-14 md:py-16">
          <div className="prose prose-invert max-w-none">
            <div className="text-white/70 leading-[1.8] text-[15px] sm:text-base">
              {post.content.split('\n').map((line, index) => {
                // Handle standard markdown images ![alt](url)
                if (line.startsWith('![') && line.includes('](')) {
                  const imageMatch = line.match(/\!\[([^\]]*)\]\(([^)]+)\)/);
                  if (imageMatch) {
                    const [, altText, imageUrl] = imageMatch;
                    if (imageUrl.startsWith('chart:')) {
                      if (post.chartImages) {
                        const chartKey = imageUrl.replace('chart:', '');
                        const chartImage = post.chartImages[chartKey as keyof typeof post.chartImages];
                        if (chartImage) {
                          return (
                            <div key={index} className="my-8 sm:my-10 rounded-xl overflow-hidden border border-white/[0.06]">
                              <img src={chartImage} alt={altText} className="w-full h-auto" />
                            </div>
                          );
                        }
                      }
                      return null;
                    }
                    return (
                      <div key={index} className="my-8 sm:my-10 rounded-xl overflow-hidden border border-white/[0.06]">
                        <img src={imageUrl} alt={altText} className="w-full h-auto" />
                      </div>
                    );
                  }
                }
                // Blockquotes
                if (line.startsWith('> ')) {
                  const quoteContent = line.replace(/^>\s*/, '');
                  if (quoteContent.startsWith('**') && quoteContent.includes('**')) {
                    return (
                      <div key={index} className="border-l-2 border-primary/40 pl-5 my-6 py-1">
                        <p className="text-white/80 font-medium text-[15px]">{quoteContent.replace(/\*\*/g, '')}</p>
                      </div>
                    );
                  }
                  return (
                    <div key={index} className="border-l-2 border-white/15 pl-5 my-6 py-1">
                      <p className="text-white/50 italic">{quoteContent}</p>
                    </div>
                  );
                }
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-xl sm:text-2xl font-medium text-white mt-12 mb-5 tracking-tight">
                      {line.replace('## ', '')}
                    </h2>
                  );
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-lg sm:text-xl font-medium text-white mt-8 mb-4 tracking-tight">
                      {line.replace('### ', '')}
                    </h3>
                  );
                }
                if (line.startsWith('#### ')) {
                  return (
                    <h4 key={index} className="text-base sm:text-lg font-medium text-white mt-6 mb-3">
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
                // Inline bold
                if (line.includes('**')) {
                  const parts = line.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={index} className="text-white/65 mb-5 leading-[1.8]">
                      {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={i} className="text-white/90 font-medium">{part.replace(/\*\*/g, '')}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  );
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={index} className="text-white/65 ml-5 mb-2 leading-[1.7]">
                      {line.replace('- ', '')}
                    </li>
                  );
                }
                // Tables
                if (line.startsWith('| ') && !line.includes('---')) {
                  const lines = post.content.split('\n');
                  const prevLine = index > 0 ? lines[index - 1] : '';
                  if (prevLine.startsWith('| ') || prevLine.includes('---')) {
                    return null;
                  }

                  const tableRows: string[] = [];
                  let i = index;
                  while (i < lines.length && (lines[i].startsWith('| ') || lines[i].includes('|---'))) {
                    if (!lines[i].includes('|---')) {
                      tableRows.push(lines[i]);
                    }
                    i++;
                  }

                  if (tableRows.length === 0) return null;

                  const headerRow = tableRows[0];
                  const bodyRows = tableRows.slice(1);
                  const headerCells = headerRow.split('|').filter(cell => cell.trim()).map(cell => cell.trim());

                  return (
                    <div key={index} className="my-8 overflow-x-auto rounded-xl border border-white/[0.06]">
                      <table className="w-full text-sm">
                        <thead className="bg-white/[0.03]">
                          <tr>
                            {headerCells.map((cell, i) => (
                              <th key={i} className="px-4 py-3 text-left text-white/80 font-medium text-xs border-b border-white/[0.06]">
                                {cell}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {bodyRows.map((row, rowIdx) => {
                            const cells = row.split('|').filter(cell => cell.trim()).map(cell => cell.trim());
                            return (
                              <tr key={rowIdx} className="border-b border-white/[0.04] last:border-0">
                                {cells.map((cell, cellIdx) => (
                                  <td key={cellIdx} className="px-4 py-3 text-white/55 text-sm">
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
                    <li key={index} className="text-white/65 ml-5 mb-2 list-decimal leading-[1.7]">
                      {line.replace(/^\d+\.\s/, '')}
                    </li>
                  );
                }
                if (line.startsWith('✅') || line.startsWith('❌')) {
                  return (
                    <p key={index} className="text-white/65 mb-2">
                      {line}
                    </p>
                  );
                }
                if (line.startsWith('---')) {
                  return <hr key={index} className="border-white/[0.06] my-10 sm:my-12" />;
                }
                if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
                  return (
                    <p key={index} className="text-white/40 italic my-8 text-sm">
                      {line.replace(/\*/g, '')}
                    </p>
                  );
                }
                if (line.trim() === '') {
                  return <div key={index} className="h-2" />;
                }
                return (
                  <p key={index} className="text-white/65 mb-5 leading-[1.8]">
                    {line}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/[0.06]">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-white/[0.06] py-14 sm:py-20">
          <div className="container mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <h2 className="text-lg sm:text-xl font-medium text-white">
                More articles
              </h2>
              <Link
                to="/blog"
                className="text-xs text-white/40 flex items-center gap-1.5 hover:text-white/60 transition-colors"
              >
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <div className="aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 border border-white/[0.06] group-hover:border-white/[0.12] transition-all">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-[11px] text-primary/70 font-medium">
                      {relatedPost.category}
                    </span>
                    <span className="text-[11px] text-white/25">
                      {relatedPost.readTime}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-medium text-white leading-snug group-hover:text-primary/90 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
  );
};

export default ResearchDetail;
