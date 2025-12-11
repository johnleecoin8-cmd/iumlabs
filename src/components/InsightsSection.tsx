import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const insights = [
  {
    id: 1,
    date: "Dec 2024",
    title: "How to Enter Korea's Web3 Market in 2025",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    date: "Dec 2024",
    title: "Korean KOL Marketing: Complete Strategy Guide",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    date: "Nov 2024",
    title: "VASP Compliance Guide for Foreign Projects",
    category: "Regulatory",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  },
];

const InsightsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="text-primary font-mono text-sm tracking-wider mb-4 block">BLOG</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Latest Insights
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Our blog shares unique marketing insights from years of experience in Web3.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-primary font-medium">+10 articles</span>
            <Link 
              to="/blog"
              className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors ml-4"
            >
              all articles
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Recent News Label */}
        <div className={`flex items-center gap-2 mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-sm text-muted-foreground">↓ Recent News</span>
        </div>

        {/* Blog Cards - Lunar Strategy style */}
        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((article, index) => (
            <article
              key={article.id}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-card border border-border/30 group-hover:border-primary/30 transition-all">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-sm text-xs font-medium rounded-full">
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div>
                <span className="text-xs text-muted-foreground">{article.date}</span>
                <h3 className="text-lg font-semibold text-foreground mt-2 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
