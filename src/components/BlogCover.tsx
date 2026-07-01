import { useEffect, useRef } from "react";
import { drawCover, coverYear } from "@/lib/blogCover";

type Post = { slug?: string; title?: string; category?: string | null; date?: string };

/**
 * Generative halftone cover for a blog post.
 * - variant "card": full Four Pillars-style cover — motif art + real overlaid
 *   title + "ium Labs"/year footer (used in the article grid).
 * - variant "art": motif art only, fills its container (used behind titles that
 *   the surrounding layout already renders, e.g. the bento and the detail hero).
 */
export default function BlogCover({
  post,
  variant = "art",
  titleAs = "h3",
  className = "",
}: {
  post: Post;
  variant?: "art" | "card";
  titleAs?: "h1" | "h3";
  className?: string;
}) {
  const TitleTag = titleAs;
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const year = coverYear(post.date);
  const key = [post.slug, post.title, post.category].filter(Boolean).join("|");

  useEffect(() => {
    const el = wrap.current, canvas = cv.current;
    if (!el || !canvas) return;
    const draw = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      drawCover(canvas, key, post.category || undefined);
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    return () => ro.disconnect();
  }, [key, post.category]);

  return (
    <div
      ref={wrap}
      className={`relative overflow-hidden ${className}`}
      style={variant === "card" ? { containerType: "inline-size" } : undefined}
    >
      <canvas ref={cv} className="absolute inset-0 block h-full w-full" aria-hidden="true" />
      {variant === "card" && (
        <>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,0) 32%,rgba(0,0,0,0) 76%,rgba(0,0,0,.5))" }}
          />
          <TitleTag
            className="absolute left-[7%] right-[9%] top-[6%] font-sans font-bold uppercase leading-[1.08] tracking-tight text-white"
            style={{ fontSize: "clamp(14px,5.2cqi,27px)", display: "-webkit-box", WebkitLineClamp: 7, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {post.title}
          </TitleTag>
          <div className="absolute bottom-[5.5%] left-[7%] right-[7%] flex items-baseline justify-between">
            <span className="font-sans font-semibold tracking-wide text-white/90" style={{ fontSize: "clamp(9px,2.3cqi,13px)" }}>
              ium Labs
            </span>
            <span className="font-sans tracking-wider text-white/55" style={{ fontSize: "clamp(9px,2.3cqi,13px)" }}>
              {year}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
