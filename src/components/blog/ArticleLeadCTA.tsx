import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck } from "lucide-react";

/**
 * End-of-article lead conversion. Turns a finished read into a booked call while
 * intent is highest, using the two things the reader just experienced as proof:
 * (1) the research depth of the piece and (2) the named human who wrote it.
 * The pitch answers the buyer's real objection (the "do-everything agency" is
 * dead) — talk to the operator who did the work, not an account manager.
 *
 * Accent inherits the article's category color via the page-level --primary
 * override (categoryAccentStyle), so text-primary / bg-primary track the post.
 */

// Category → the single most relevant service to surface at article end.
const SERVICE_BY_CATEGORY: Record<string, { label: string; to: string }> = {
  Regulation: { label: "Regulation & Compliance", to: "/services/compliance" },
  "Market Research": { label: "Deep Research", to: "/services/deep-research" },
  Strategy: { label: "GTM Strategy", to: "/services/gtm" },
  "GTM Strategy": { label: "GTM Strategy", to: "/services/gtm" },
  Marketing: { label: "KOL & Influencer Marketing", to: "/services/influencer" },
  Technology: { label: "GTM Strategy", to: "/services/gtm" },
  Stablecoins: { label: "Regulation & Compliance", to: "/services/compliance" },
  DeFi: { label: "Exchange Marketing", to: "/services/exchange-marketing" },
  Community: { label: "Community Management", to: "/services/community" },
  Projects: { label: "GTM Strategy", to: "/services/gtm" },
};

interface ArticleLeadCTAProps {
  post: {
    author?: string;
    authorRole?: string;
    authorImage?: string;
    category?: string;
  };
}

const ArticleLeadCTA = ({ post }: ArticleLeadCTAProps) => {
  const svc = SERVICE_BY_CATEGORY[post.category || ""] || { label: "Korea GTM", to: "/services/gtm" };
  const author = post.author || "ium Labs";
  const initials = author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <section className="bg-[#0A0A0A] border-t border-white/10">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
          {/* category-tinted accent glow */}
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.16] blur-3xl"
            style={{ background: "hsl(var(--primary))" }}
          />
          <div className="relative">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
              Work with the author
            </span>
            <h2 className="mt-4 text-2xl md:text-4xl font-light leading-tight tracking-tight text-white">
              This isn&apos;t a content mill.{" "}
              <span className="text-white/55">
                The operator who wrote this runs Korea GTM every day.
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] md:text-base leading-relaxed text-white/55">
              We&apos;re a small operator team, not a do-everything agency. If this research maps to a
              launch you&apos;re planning, talk to the people who did the work — not an account manager
              juggling ten other accounts.
            </p>

            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* the human who wrote it */}
              <div className="flex items-center gap-3">
                {post.authorImage ? (
                  <img
                    src={post.authorImage}
                    alt={author}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-white/10"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-sm font-medium text-white/80 ring-1 ring-white/10">
                    {initials}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-white">{author}</p>
                  <p className="text-xs text-white/45">{post.authorRole || "ium Labs"}</p>
                </div>
              </div>

              {/* conversion actions */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  to="/contact"
                  onClick={() => window.scrollTo(0, 0)}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
                >
                  <CalendarCheck className="h-4 w-4" />
                  Book a strategy call
                </Link>
                <Link
                  to={svc.to}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white"
                >
                  {svc.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleLeadCTA;
