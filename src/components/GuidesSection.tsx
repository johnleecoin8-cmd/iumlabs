import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Download, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const guides = [
  {
    title: "Korean Crypto Market Entry Guide",
    description: "Complete playbook for entering the Korean Web3 market",
    downloads: "2,400+",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  },
  {
    title: "KOL Marketing Strategy 2024",
    description: "How to leverage Korean crypto influencers effectively",
    downloads: "1,800+",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  },
  {
    title: "Community Building Handbook",
    description: "Build and scale Korean crypto communities",
    downloads: "1,200+",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
  },
];

const stats = [
  { value: "5,400+", label: "Downloads Worldwide" },
  { value: "95%", label: "Read to the end" },
  { value: "4.8+", label: "Average rating" },
];

const floatingTags = [
  { label: "Free Download", top: "10%", right: "8%" },
  { label: "5,400+ Downloads", top: "20%", left: "5%" },
  { label: "Expert Guides", bottom: "25%", right: "5%" },
  { label: "Korean Market", bottom: "15%", left: "8%" },
];

const GuidesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className="py-24 px-4 flex-1 relative overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary/8 to-transparent blur-2xl" />
      </div>

      {/* Floating Tags */}
      {floatingTags.map((tag, index) => (
        <span
          key={tag.label}
          className="lunar-tag-dark absolute animate-float text-xs hidden lg:block z-10"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
            bottom: tag.bottom,
            animationDelay: `${index * 0.5}s`,
          }}
        >
          {tag.label}
        </span>
      ))}

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
                Crypto Marketing <span className="serif-italic">Guides</span>
              </h2>
              <p className="text-muted-foreground">
                Explore expert-written guides on Korean crypto growth covering KOLs, community building, 
                exchanges, and more. Learn practical strategies and proven frameworks.
              </p>
            </div>

            <Link 
              to="/guides" 
              className="bracket-link group shrink-0"
            >
              <span>See all Guides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats Row */}
          <div className={`grid grid-cols-3 gap-6 mt-12 py-8 border-y border-border transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.2s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <div
              key={guide.title}
              className={`group bg-card border border-border/50 rounded-2xl overflow-hidden cursor-pointer card-hover ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ 
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transitionDelay: `${(index + 3) * 100}ms` 
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                
                {/* Download Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {guide.downloads}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Free Guide</span>
                </div>
                
                <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {guide.description}
                </p>

                <button className="inline-flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all">
                  <span>Download Free</span>
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidesSection;