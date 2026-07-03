import { useParams } from "react-router-dom";
import BlogCover from "@/components/BlogCover";
import { staticResearchPosts } from "@/data/research-index.gen";
import { categoryAccentStyle } from "@/lib/categoryTheme";

/**
 * Internal-only 1200x630 social-card renderer.
 * Not linked anywhere and excluded from sitemaps; we screenshot
 * /og-render/:slug headlessly and commit the PNGs to /public/og/,
 * which the social-shell build step points og:image at.
 */
const OgRender = () => {
  const { slug } = useParams();
  const post = staticResearchPosts.find((p) => p.slug === slug);
  if (!post) return <div style={{ color: "#fff" }}>not found</div>;

  return (
    <div
      id="og-card"
      style={{
        width: 1200,
        height: 630,
        position: "relative",
        overflow: "hidden",
        background: "#0A0A0A",
        ...(categoryAccentStyle(post.category) as React.CSSProperties),
      }}
    >
      {/* halftone art fills the card */}
      <BlogCover post={post} variant="art" className="absolute inset-0 w-full h-full" />
      {/* legibility scrim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.55) 45%, rgba(5,5,5,0.15) 100%)",
        }}
      />
      <div style={{ position: "absolute", inset: 0, padding: "48px 56px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            className="font-mono"
            style={{ fontSize: 20, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}
          >
            ium&nbsp;Research
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: 16,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              background: "hsl(var(--primary))",
              color: "#0a0a0a",
              padding: "6px 14px",
              borderRadius: 6,
            }}
          >
            {post.category}
          </span>
        </div>
        <div>
          <h1
            className="font-display"
            style={{
              fontSize: 58,
              lineHeight: 1.04,
              letterSpacing: "-0.005em",
              fontWeight: 700,
              color: "#fff",
              maxWidth: 1000,
            }}
          >
            {post.title}
          </h1>
          <p className="font-mono" style={{ marginTop: 18, fontSize: 17, color: "rgba(255,255,255,0.55)" }}>
            {post.author}, {post.authorRole} · {post.date} · iumlabs.io
          </p>
        </div>
      </div>
    </div>
  );
};

export default OgRender;
