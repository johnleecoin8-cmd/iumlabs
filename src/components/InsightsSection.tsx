import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const insights = [
  {
    id: 1,
    date: "Dec 2024",
    title: "Korea's Web3 Gaming Market: 2025 Outlook",
    author: "James",
    category: "Research",
  },
  {
    id: 2,
    date: "Nov 2024",
    title: "KOL Marketing Strategies for Korean Crypto Projects",
    author: "David",
    category: "Guide",
  },
  {
    id: 3,
    date: "Nov 2024",
    title: "Regulatory Landscape: Korea's Crypto Framework",
    author: "James",
    category: "Analysis",
  },
];

const InsightsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Number */}
        <div className={`mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-primary font-mono text-sm tracking-wider">04.</span>
        </div>

        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Latest{" "}
              <span className="font-serif italic text-primary">Insights</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Deep dives into the Korean Web3 ecosystem, market trends, and strategic guides.
            </p>
          </div>
          <Link 
            to="/blog"
            className="group flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            View All Insights
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <article
              key={insight.id}
              className={`group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
                {insight.category}
              </span>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                {insight.title}
              </h3>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {insight.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {insight.author}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
