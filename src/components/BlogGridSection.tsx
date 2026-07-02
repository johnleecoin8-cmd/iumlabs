import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BlogCover from "@/components/BlogCover";
import { staticResearchPosts } from "@/data/static-research-posts";

const calculateReadTime = (content: string | null): string => {
  if (!content) return "5 min read";
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const BlogGridSection = () => {
  const { data: dbPosts } = useQuery({
    queryKey: ["home-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("research_posts")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true })
        .limit(8);
      if (error) throw error;
      return data;
    },
  });

  const dbTransformed = (dbPosts || []).map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    image: post.image || "",
    date:
      post.date ||
      new Date(post.created_at || "").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    readTime: post.read_time || calculateReadTime(post.content),
    category: post.category || "Blog",
    author: post.author || "Ium Labs",
    excerpt:
      post.excerpt ||
      (post.content ? post.content.substring(0, 150) + "..." : ""),
    tags: post.tags || [],
    content: post.content || "",
    isFeatured: (post as any).is_featured || false,
  }));

  const posts = [
    ...staticResearchPosts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      image: p.image,
      date: p.date,
      readTime: p.readTime,
      category: p.category,
      author: p.author,
      excerpt: p.excerpt,
      tags: p.tags,
      content: p.content,
      isFeatured: p.isFeatured,
    })),
    ...dbTransformed,
  ].slice(0, 8);

  if (posts.length === 0) return null;

  return (
    <div className="px-5 sm:px-6 lg:px-10 pb-16 md:pb-24">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="h-full">
              <BlogCover
                post={post}
                variant="card"
                className="aspect-[3/4] rounded-2xl surface-edge transition-transform duration-[220ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.02] group-active:scale-100"
              />
              <div className="flex items-center justify-between pt-3.5">
                <span className="text-white/50 text-[10px] sm:text-xs uppercase tracking-[0.18em]">
                  {post.category}
                </span>
                <span className="text-white/40 text-[10px] sm:text-xs flex items-center gap-1.5">
                  <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  {post.readTime} · {post.date}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogGridSection;
