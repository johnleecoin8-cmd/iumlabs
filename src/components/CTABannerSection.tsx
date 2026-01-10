import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MouseEvent } from "react";
import { useRipple } from "@/hooks/useRipple";
const CTABannerSection = () => {
  const {
    createRipple
  } = useRipple();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <section className="bg-background text-foreground border-t border-border relative overflow-hidden group/section">
      {/* Background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover/section:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Section Header */}
      <div className="bg-card/50 backdrop-blur-sm flex items-center justify-between p-4 md:px-10 md:py-5 border-b border-border/30">
        <div className="flex items-center gap-4 md:gap-8">
          <span className="text-xs md:text-sm text-muted-foreground font-mono tracking-widest">05</span>
          <span className="hidden sm:block w-12 md:w-20 h-px bg-border" />
          <h2 className="text-sm md:text-base font-medium text-muted-foreground tracking-widest uppercase">Next Step</h2>
        </div>
      </div>

      {/* CTA Content */}
      <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-3">
            Ready to <span className="text-primary">dominate</span> the Korean market?
          </h3>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl">
            Let's discuss your GTM strategy and build your presence in Korea together.
          </p>
        </div>
        <Link 
          to="/services" 
          onClick={scrollToTop}
          className="group flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
        >
          Start Now
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </section>;
};
export default CTABannerSection;