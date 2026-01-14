import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Rocket, 
  Palette, 
  Search, 
  Calendar, 
  Users, 
  FileSearch, 
  Star, 
  MessageCircle, 
  Newspaper,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "GTM Strategy",
    description: "Korea market entry & growth",
    icon: Rocket,
    link: "/services",
    gradient: "from-violet-500 to-purple-600"
  },
  {
    title: "Branding",
    description: "Brand identity & website",
    icon: Palette,
    link: "/services/branding",
    gradient: "from-rose-500 to-pink-600"
  },
  {
    title: "SEO & Ads",
    description: "Search & paid marketing",
    icon: Search,
    link: "/services/seo-ads",
    gradient: "from-amber-500 to-orange-600"
  },
  {
    title: "Offline Event",
    description: "Conferences & meetups",
    icon: Calendar,
    link: "/services/offline-event",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    title: "Community",
    description: "Discord & Telegram growth",
    icon: Users,
    link: "/services/community",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    title: "Deep Research",
    description: "Market & competitor analysis",
    icon: FileSearch,
    link: "/services/deep-research",
    gradient: "from-cyan-500 to-sky-600"
  },
  {
    title: "KOL Network",
    description: "Influencer partnerships",
    icon: Star,
    link: "/services/influencer",
    gradient: "from-yellow-500 to-amber-600"
  },
  {
    title: "YAP Network",
    description: "Creator collaborations",
    icon: MessageCircle,
    link: "/services/yap",
    gradient: "from-fuchsia-500 to-purple-600"
  },
  {
    title: "PR & Media",
    description: "Press releases & coverage",
    icon: Newspaper,
    link: "/services/pr",
    gradient: "from-slate-500 to-zinc-600"
  }
];

const ServiceCard = ({ 
  service, 
  index 
}: { 
  service: typeof services[0]; 
  index: number;
}) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
    >
      <Link
        to={service.link}
        className={cn(
          "group flex flex-col gap-3 p-4 rounded-2xl",
          "bg-card/50 border border-border/50",
          "hover:bg-card/80 hover:border-border",
          "active:scale-[0.97] transition-all duration-200",
          "backdrop-blur-sm"
        )}
      >
        {/* Icon with gradient background */}
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          "bg-gradient-to-br shadow-lg",
          service.gradient
        )}>
          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-tight mb-1">
            {service.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        </div>
        
        {/* Arrow indicator */}
        <div className="flex items-center justify-end">
          <ArrowRight className={cn(
            "w-4 h-4 text-muted-foreground/50",
            "group-hover:text-foreground group-hover:translate-x-0.5",
            "transition-all duration-200"
          )} />
        </div>
      </Link>
    </motion.div>
  );
};

const MobileServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Services</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Korea Web3 market solutions
          </p>
        </div>
      </div>
      
      {/* Services Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.link} 
              service={service} 
              index={index} 
            />
          ))}
        </div>
        
        {/* Bottom spacing for mobile nav */}
        <div className="h-8" />
      </div>
    </div>
  );
};

export default MobileServicesPage;
