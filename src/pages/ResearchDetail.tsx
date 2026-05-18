import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, Copy, ChevronRight, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ArticleSchema from "@/components/ArticleSchema";
import SEOHead from "@/components/SEOHead";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import TableOfContents, { slugify } from "@/components/blog/TableOfContents";
import { staticResearchPosts } from "@/data/static-research-posts";

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

  // Static posts with curated content take priority over DB
  const staticPost = staticResearchPosts.find(p => p.slug === slug);
  const useStatic = !!(staticPost && staticPost.content && staticPost.content.length > 0);

  const post = useStatic ? {
    id: staticPost!.id,
    slug: staticPost!.slug,
    title: staticPost!.title,
    image: staticPost!.image,
    date: staticPost!.date,
    readTime: staticPost!.readTime,
    category: staticPost!.category,
    author: staticPost!.author,
    authorRole: staticPost!.authorRole,
    authorImage: '',
    authorBio: (staticPost as any).authorBio || '',
    excerpt: staticPost!.excerpt,
    tags: staticPost!.tags,
    content: staticPost!.content,
    chartImages: (staticPost as any).chartImages as Record<string, string> | undefined,
  } : dbPost ? {
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
    authorBio: '',
    excerpt: dbPost.excerpt || (dbPost.content ? dbPost.content.substring(0, 150) + '...' : ''),
    tags: dbPost.tags || [],
    content: dbPost.content || '',
    chartImages: undefined as Record<string, string> | undefined,
  } : null;
  
  const staticRelated = staticPost
    ? staticResearchPosts
        .filter(p => p.slug !== slug)
        .sort((a, b) => {
          const aScore = a.tags.filter(t => staticPost.tags.includes(t)).length + (a.category === staticPost.category ? 2 : 0);
          const bScore = b.tags.filter(t => staticPost.tags.includes(t)).length + (b.category === staticPost.category ? 2 : 0);
          return bScore - aScore;
        })
        .slice(0, 3)
        .map(p => ({ id: p.id, slug: p.slug, title: p.title, image: p.image, readTime: p.readTime, category: p.category }))
    : [];

  const relatedPosts = dbRelatedPosts && dbRelatedPosts.length > 0
    ? dbRelatedPosts.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        image: p.image || '',
        readTime: p.read_time || calculateReadTime(p.content),
        category: p.category || 'Blog',
      }))
    : staticRelated;

  // SEO meta computed from post data
  const seoTitle = post ? `${post.title} | ium Labs Blog` : "Blog | ium Labs";
  const seoDescription = post ? (post.excerpt || `${post.title} - ${post.category} article by ium Labs.`) : "";
  const seoImage = post?.image?.startsWith('http') ? post.image : (post?.image ? `https://iumlabs.io${post.image}` : undefined);

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

  if (isLoading && !useStatic) {
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
      <ReadingProgressBar />
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        path={`/blog/${slug}`}
        image={seoImage}
        type="article"
        keywords={[post?.category || 'Web3', 'Korea', 'Blog', 'Research', ...(post?.tags || [])].filter(Boolean)}
        publishedTime={post?.date}
        author={post?.author || "ium Labs"}
      />
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
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
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
            {post.content && (
              <span className="text-white/25 text-xs hidden sm:block">
                {Math.round(post.content.split(/\s+/).length / 100) / 10}k words
              </span>
            )}
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-8">
            {post.title}
          </h1>
          
          {/* Author & Share */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              {post.authorImage ? (
                <img src={post.authorImage} alt={post.author} className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-medium text-white">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div>
                <p className="text-white font-medium">{post.author}</p>
                <p className="text-white/40 text-sm">{post.authorRole}</p>
              </div>
            </div>

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

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-5">
              <Tag className="w-3.5 h-3.5 text-white/25" />
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 text-xs hover:bg-white/[0.08] hover:text-white/70 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
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
        <TableOfContents content={post.content} />

        {/* Excerpt / Lead Paragraph */}
        {post.excerpt && (
          <div className="mb-12 text-lg sm:text-xl text-white/60 leading-relaxed font-light border-l-2 border-[#b48cde]/30 pl-6">
            {post.excerpt}
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-white/80 leading-[1.8] text-[16px] sm:text-[17px]">
            {(() => {
              const lines = post.content.split('\n');
              const rendered: React.ReactNode[] = [];
              let i = 0;

              const renderInline = (text: string): React.ReactNode => {
                if (!text.includes('**') && !text.includes('[')) return text;
                return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={j} className="text-white font-semibold">{part.replace(/\*\*/g, '')}</strong>;
                  }
                  const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
                  if (linkMatch) {
                    const [, linkText, linkUrl] = linkMatch;
                    if (linkUrl.startsWith('/')) {
                      return <Link key={j} to={linkUrl} className="text-[#b48cde] hover:text-[#d8b4fe] underline underline-offset-2 decoration-[#b48cde]/30 hover:decoration-[#d8b4fe]/50 transition-colors">{linkText}</Link>;
                    }
                    return <a key={j} href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-[#b48cde] hover:text-[#d8b4fe] underline underline-offset-2 decoration-[#b48cde]/30 hover:decoration-[#d8b4fe]/50 transition-colors">{linkText}</a>;
                  }
                  return part;
                });
              };

              while (i < lines.length) {
                const line = lines[i];
                const key = i;

                // Callout blocks: >! prefix — collect consecutive lines
                if (line.startsWith('>! ')) {
                  const calloutLines: string[] = [];
                  while (i < lines.length && lines[i].startsWith('>! ')) {
                    calloutLines.push(lines[i].replace(/^>!\s*/, ''));
                    i++;
                  }
                  const title = calloutLines[0];
                  const body = calloutLines.slice(1);
                  const isKeyTakeaways = title.toLowerCase().includes('key takeaway') || title.toLowerCase().includes('tl;dr');
                  rendered.push(
                    <div key={key} className={`my-10 rounded-2xl border p-6 sm:p-8 ${isKeyTakeaways ? 'bg-gradient-to-br from-[#b48cde]/[0.08] via-[#0f0f0f] to-transparent border-[#b48cde]/20' : 'bg-white/[0.02] border-white/10'}`}>
                      {title.startsWith('**') ? (
                        <p className={`font-semibold text-lg mb-4 ${isKeyTakeaways ? 'text-[#d8b4fe]' : 'text-white'}`}>{title.replace(/\*\*/g, '')}</p>
                      ) : (
                        <p className="text-white/80 mb-4 font-medium">{title}</p>
                      )}
                      {body.length > 0 && (
                        <ul className="space-y-3">
                          {body.map((item, j) => (
                            <li key={j} className="flex items-start gap-3 text-[15px] text-white/65 leading-relaxed">
                              <span className={`w-1.5 h-1.5 rounded-full mt-[9px] flex-shrink-0 ${isKeyTakeaways ? 'bg-[#b48cde]' : 'bg-white/30'}`} />
                              <span>{renderInline(item.replace(/^-\s*/, ''))}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                  continue;
                }

                // Stat highlight: %%NUMBER::LABEL%%
                if (line.startsWith('%%') && line.endsWith('%%')) {
                  const inner = line.slice(2, -2);
                  const sepIdx = inner.indexOf('::');
                  if (sepIdx !== -1) {
                    const stat = inner.slice(0, sepIdx);
                    const label = inner.slice(sepIdx + 2);
                    rendered.push(
                      <div key={key} className="my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#b48cde] to-[#c084fc] bg-clip-text text-transparent whitespace-nowrap">{stat}</span>
                        <span className="text-white/50 text-sm sm:text-[15px] leading-relaxed">{label}</span>
                      </div>
                    );
                    i++;
                    continue;
                  }
                }

                // Images with optional caption
                if (line.startsWith('![') && line.includes('](')) {
                  const imageMatch = line.match(/\!\[([^\]]*)\]\(([^)]+)\)/);
                  if (imageMatch) {
                    const [, altText, imageUrl] = imageMatch;
                    let imgSrc: string | null = null;

                    if (imageUrl.startsWith('chart:')) {
                      if (post.chartImages) {
                        const chartKey = imageUrl.replace('chart:', '');
                        imgSrc = post.chartImages[chartKey as keyof typeof post.chartImages] || null;
                      }
                    } else {
                      imgSrc = imageUrl;
                    }

                    if (imgSrc) {
                      const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
                      const hasCaption = nextLine.startsWith('*') && nextLine.endsWith('*') && !nextLine.startsWith('**');
                      const caption = hasCaption ? nextLine.replace(/^\*|\*$/g, '') : null;

                      rendered.push(
                        <figure key={key} className="my-10">
                          <div className="rounded-xl overflow-hidden border border-white/10">
                            <img src={imgSrc} alt={altText} className="w-full h-auto" loading="lazy" />
                          </div>
                          {caption && (
                            <figcaption className="mt-3 text-center text-xs text-white/30 italic">{caption}</figcaption>
                          )}
                        </figure>
                      );
                      i += hasCaption ? 2 : 1;
                    } else {
                      i++;
                    }
                    continue;
                  }
                }

                // Grouped blockquotes: collect consecutive > lines
                if (line.startsWith('> ')) {
                  const quoteLines: string[] = [];
                  while (i < lines.length && lines[i].startsWith('> ')) {
                    quoteLines.push(lines[i].replace(/^>\s*/, ''));
                    i++;
                  }
                  const firstLine = quoteLines[0];
                  const isCitation = firstLine.startsWith('**') && firstLine.includes('**');

                  rendered.push(
                    <blockquote key={key} className="my-8 border-l-[3px] border-[#b48cde]/40 pl-5 sm:pl-6 py-4 bg-white/[0.02] rounded-r-xl">
                      {quoteLines.map((ql, j) => {
                        if (ql.startsWith('**') && ql.includes('**')) {
                          return <p key={j} className="text-white/80 font-medium mb-1">{ql.replace(/\*\*/g, '')}</p>;
                        }
                        if (ql.startsWith('— ') || ql.startsWith('- ') && isCitation) {
                          return <p key={j} className="text-white/40 text-sm mt-2">{ql}</p>;
                        }
                        return <p key={j} className="text-white/60 italic leading-relaxed">{renderInline(ql)}</p>;
                      })}
                    </blockquote>
                  );
                  continue;
                }

                // Headings
                if (line.startsWith('## ') && !line.startsWith('### ')) {
                  const text = line.replace('## ', '');
                  rendered.push(
                    <h2 key={key} id={slugify(text)} className="text-2xl md:text-3xl font-semibold text-white mt-16 mb-6 scroll-mt-24">{text}</h2>
                  );
                  i++; continue;
                }
                if (line.startsWith('### ')) {
                  const text = line.replace('### ', '');
                  rendered.push(
                    <h3 key={key} id={slugify(text)} className="text-xl md:text-2xl font-medium text-white mt-10 mb-4 scroll-mt-24">{text}</h3>
                  );
                  i++; continue;
                }
                if (line.startsWith('#### ')) {
                  rendered.push(
                    <h4 key={key} className="text-lg md:text-xl font-medium text-white mt-8 mb-3">{line.replace('#### ', '')}</h4>
                  );
                  i++; continue;
                }

                // Standalone bold line
                if (line.startsWith('**') && line.endsWith('**') && !line.includes('** ')) {
                  rendered.push(
                    <p key={key} className="font-semibold text-white mt-6 mb-2">{line.replace(/\*\*/g, '')}</p>
                  );
                  i++; continue;
                }

                // Inline bold
                if (line.includes('**')) {
                  rendered.push(
                    <p key={key} className="text-white/70 mb-4 leading-relaxed">{renderInline(line)}</p>
                  );
                  i++; continue;
                }

                // Unordered list items
                if (line.startsWith('- ')) {
                  rendered.push(
                    <li key={key} className="text-white/70 ml-6 mb-2 leading-relaxed">{renderInline(line.replace('- ', ''))}</li>
                  );
                  i++; continue;
                }

                // Tables
                if (line.startsWith('| ') && !line.includes('---')) {
                  const prevLine = i > 0 ? lines[i - 1] : '';
                  if (prevLine.startsWith('| ') || prevLine.includes('---')) { i++; continue; }

                  const tableRows: string[] = [];
                  let ti = i;
                  while (ti < lines.length && (lines[ti].startsWith('| ') || lines[ti].includes('|---'))) {
                    if (!lines[ti].includes('|---')) tableRows.push(lines[ti]);
                    ti++;
                  }
                  if (tableRows.length === 0) { i++; continue; }

                  const headerCells = tableRows[0].split('|').filter(c => c.trim()).map(c => c.trim());
                  const bodyRows = tableRows.slice(1);

                  rendered.push(
                    <div key={key} className="my-8 overflow-x-auto rounded-xl border border-white/[0.08]">
                      <table className="w-full text-sm">
                        <thead className="bg-white/[0.04]">
                          <tr>
                            {headerCells.map((cell, ci) => (
                              <th key={ci} className="px-5 py-3.5 text-left text-white/90 font-semibold text-xs uppercase tracking-wider border-b border-white/[0.08]">{cell}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {bodyRows.map((row, ri) => {
                            const cells = row.split('|').filter(c => c.trim()).map(c => c.trim());
                            return (
                              <tr key={ri} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                                {cells.map((cell, ci) => (
                                  <td key={ci} className="px-5 py-3.5 text-white/60 text-[13px]">{renderInline(cell)}</td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                  i = ti; continue;
                }
                if (line.includes('|---')) { i++; continue; }

                // Ordered list
                if (/^\d+\.\s/.test(line)) {
                  rendered.push(
                    <li key={key} className="text-white/70 ml-6 mb-2 list-decimal leading-relaxed">{renderInline(line.replace(/^\d+\.\s/, ''))}</li>
                  );
                  i++; continue;
                }

                // Horizontal rule
                if (line.startsWith('---')) {
                  rendered.push(<hr key={key} className="border-white/[0.06] my-14" />);
                  i++; continue;
                }

                // Italic line (caption or emphasis)
                if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
                  rendered.push(
                    <p key={key} className="text-white/40 italic text-sm my-2">{line.replace(/^\*|\*$/g, '')}</p>
                  );
                  i++; continue;
                }

                // Empty line
                if (line.trim() === '') {
                  rendered.push(<div key={key} className="h-2" />);
                  i++; continue;
                }

                // Default paragraph
                rendered.push(
                  <p key={key} className="text-white/70 mb-5 leading-[1.85]">{renderInline(line)}</p>
                );
                i++;
              }
              return rendered;
            })()}
          </div>
        </div>

        {/* Bottom Share Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <p className="text-white/30 text-sm">Found this useful? Share it with your network.</p>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare("twitter")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-sm"
            >
              <Twitter className="w-4 h-4" /> Twitter
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare("linkedin")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-sm"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-sm"
            >
              <Copy className="w-4 h-4" /> Copy Link
            </motion.button>
          </div>
        </div>

        {/* Author Bio Card */}
        {post.authorBio && (
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <div className="flex items-start gap-5">
              {post.authorImage ? (
                <img src={post.authorImage} alt={post.author} className="w-16 h-16 rounded-full object-cover ring-2 ring-white/10 flex-shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b48cde]/20 to-[#6d28d9]/20 flex items-center justify-center text-xl font-medium text-[#b48cde] flex-shrink-0 ring-2 ring-[#b48cde]/10">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div>
                <p className="text-sm text-white/30 uppercase tracking-wider mb-1">Written by</p>
                <p className="text-lg font-medium text-white">{post.author}</p>
                <p className="text-sm text-[#b48cde]/80 mb-3">{post.authorRole} at ium Labs</p>
                <p className="text-sm text-white/50 leading-relaxed">{post.authorBio}</p>
              </div>
            </div>
          </div>
        )}

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


      {/* Related Services */}
      <section className="bg-[#111] py-20 border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            Explore Our Services
          </h2>
          <p className="text-white/50 mb-10 max-w-2xl">
            Discover how ium Labs helps Web3 projects succeed in the Korean market with tailored marketing strategies.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { to: "/services/gtm", label: "GTM Strategy", desc: "Go-to-market strategy for Korea's Web3 ecosystem" },
              { to: "/services/influencer", label: "KOL Marketing", desc: "Influencer partnerships that drive real engagement" },
              { to: "/services/seo-ads", label: "SEO & Naver Ads", desc: "Search visibility on Korea's dominant platforms" },
              { to: "/services/community", label: "Community Management", desc: "Build and grow loyal Korean communities" },
            ].map((service) => (
              <Link
                key={service.to}
                to={service.to}
                className="group block p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300"
              >
                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-primary transition-colors">
                  {service.label}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {service.desc}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm text-white/30 group-hover:text-primary/80 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-black font-medium hover:bg-primary/90 transition-colors"
            >
              Get a Consultation <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

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