import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterLinksSection from "@/components/FooterLinksSection";
import SEOHead from "@/components/SEOHead";
import BlogCover from "@/components/BlogCover";
import { staticResearchPosts } from "@/data/research-index.gen";
import { AUTHORS } from "@/lib/authors";
import { categoryAccentStyle } from "@/lib/categoryTheme";

// Researcher archive page — the Four Pillars authority pattern: profile,
// role, bio, and the full publication index in one place.
const AuthorPage = () => {
  const { name } = useParams();
  const key = Object.keys(AUTHORS).find(
    (k) => k.toLowerCase() === (name || "").toLowerCase()
  );
  const info = key ? AUTHORS[key] : undefined;
  const posts = staticResearchPosts
    .filter((p) => p.author === key)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const categories = [...new Set(posts.map((p) => p.category))];

  if (!key || !info) {
    return (
      <div className="min-h-screen bg-[#0A0A0A]">
        <Navbar />
        <div className="container mx-auto max-w-4xl px-4 py-32 text-center">
          <h1 className="text-3xl font-light text-white mb-4">Author not found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
        <FooterLinksSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title={`${key}, ${info.role} | ium Labs Research`}
        description={info.bio}
        path={`/blog/author/${key.toLowerCase()}`}
      />
      <Navbar />

      <section className="pt-28 pb-10 px-5 sm:px-6 lg:px-10 border-b border-white/[0.07]">
        <div className="max-w-5xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-10">
            <ArrowLeft className="w-4 h-4" /> Research
          </Link>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
            {info.img && (
              <img
                src={info.img}
                alt={key}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover surface-edge border border-white/[0.08]"
              />
            )}
            <div className="min-w-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary/80">
                Research Desk
              </span>
              <h1 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] text-white">
                {key}
              </h1>
              <p className="mt-1 text-white/50">{info.role} at ium Labs</p>
              <p className="mt-5 text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl">
                {info.bio}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2">
                <span>
                  <span className="font-display text-2xl text-white">{posts.length}</span>
                  <span className="text-xs text-white/40 ml-2">Publications</span>
                </span>
                <span>
                  <span className="font-display text-2xl text-white">{categories.length}</span>
                  <span className="text-xs text-white/40 ml-2">Coverage areas</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-light text-white/80 tracking-tight mb-8">
            All publications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-9">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                style={categoryAccentStyle(post.category) as React.CSSProperties}
                className="group flex flex-col"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
                  <BlogCover post={post} variant="art" className="aspect-[10/11] transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-black font-mono text-[10px] uppercase tracking-[0.14em] font-medium">
                    {post.category}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-medium text-white leading-snug tracking-tight line-clamp-2">
                  <span className="[box-decoration-break:clone] group-hover:bg-primary group-hover:text-black transition-colors duration-150 px-0.5 -mx-0.5">
                    {post.title}
                  </span>
                </h3>
                <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-white/35 [font-feature-settings:'lnum','tnum']">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                  <span className="text-white/20">·</span>
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterLinksSection />
    </div>
  );
};

export default AuthorPage;
