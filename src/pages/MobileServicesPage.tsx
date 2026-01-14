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
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/services-background.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-violet-500/10" />
        
        {/* Hero content */}
        <div className="relative z-10 px-5 pt-12 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-medium text-primary mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              9 Services
            </span>
            
            <h1 className="text-3xl font-bold text-foreground leading-tight mb-2">
              Korea Market
              <br />
              <span className="bg-gradient-to-r from-primary via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
              Full-stack Web3 marketing services tailored for the Korean ecosystem
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Services Grid */}
      <div className="px-4 pb-4 -mt-2">
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
