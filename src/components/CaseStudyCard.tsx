import { ArrowUpRight, TrendingUp, Users, Globe } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  stats: {
    label: string;
    value: string;
    icon: typeof TrendingUp;
  }[];
  tags: string[];
}

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => {
  const { ref, style } = useTilt();

  return (
    <div
      ref={ref}
      style={style}
      className="group glass-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={study.image} 
          alt={study.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-xs font-medium text-primary bg-primary/20 px-3 py-1 rounded-full">
            {study.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {study.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {study.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {study.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-4 h-4 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {study.tags.map((tag, i) => (
            <span 
              key={i}
              className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button className="flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
          자세히 보기
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CaseStudyCard;

export type { CaseStudy };
