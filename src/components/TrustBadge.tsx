import { Star, Shield, ExternalLink } from "lucide-react";

interface TrustBadgeProps {
  type: "trustpilot" | "ethos" | "clutch" | "google";
  rating?: number;
  reviewCount?: string;
  link?: string;
  size?: "sm" | "md" | "lg";
}

const TrustBadge = ({ 
  type, 
  rating = 5, 
  reviewCount = "50+",
  link = "#",
  size = "md" 
}: TrustBadgeProps) => {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-3 text-base gap-2.5",
  };

  const starSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const configs = {
    trustpilot: {
      name: "Trustpilot",
      bgColor: "bg-[#00b67a]/10",
      borderColor: "border-[#00b67a]/30",
      hoverBg: "hover:bg-[#00b67a]/20",
      textColor: "text-[#00b67a]",
      starColor: "text-[#00b67a] fill-[#00b67a]",
    },
    ethos: {
      name: "Ethos",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      hoverBg: "hover:bg-purple-500/20",
      textColor: "text-purple-400",
      starColor: "text-purple-400 fill-purple-400",
    },
    clutch: {
      name: "Clutch",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      hoverBg: "hover:bg-red-500/20",
      textColor: "text-red-400",
      starColor: "text-red-400 fill-red-400",
    },
    google: {
      name: "Google",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      hoverBg: "hover:bg-amber-500/20",
      textColor: "text-amber-400",
      starColor: "text-amber-400 fill-amber-400",
    },
  };

  const config = configs[type];

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center rounded-xl border transition-all duration-300
        ${sizeClasses[size]}
        ${config.bgColor}
        ${config.borderColor}
        ${config.hoverBg}
        group
      `}
      aria-label={`View reviews on ${config.name}`}
    >
      <Shield className={`${starSizes[size]} ${config.textColor}`} aria-hidden="true" />
      
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`${starSizes[size]} ${i < rating ? config.starColor : 'text-white/20'}`}
            aria-hidden="true"
          />
        ))}
      </div>
      
      <span className={`font-medium text-white`}>{config.name}</span>
      
      {reviewCount && (
        <span className="text-white/50">({reviewCount})</span>
      )}
      
      <ExternalLink 
        className={`${starSizes[size]} text-white/30 group-hover:text-white/60 transition-colors ml-1`} 
        aria-hidden="true"
      />
    </a>
  );
};

export default TrustBadge;
