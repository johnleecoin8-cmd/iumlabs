import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowUp } from "lucide-react";

const CTABannerSection = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="bg-background text-foreground border-t border-border relative overflow-hidden group/section">
      {/* Background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover/section:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:gap-6 md:gap-8">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-foreground mb-1.5 sm:mb-2">
              Have a project in mind?
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Let's discuss how we can help you succeed in Korea.
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none relative">
              {/* Glow effect behind button */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Link 
                to="/contact" 
                className="group relative flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-foreground text-background font-medium text-xs sm:text-sm rounded-full overflow-hidden hover:bg-foreground/90 active:bg-foreground/80 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 min-h-[44px] sm:min-h-[48px]"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                {/* Pulse ring on hover */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100">
                  <span className="absolute inset-0 rounded-full animate-ping bg-foreground/20" style={{ animationDuration: '1.5s' }} />
                </span>
                
                <span className="relative z-10">Get in Touch</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <button
              onClick={scrollToTop}
              className="group p-3 sm:p-3.5 border border-border rounded-full hover:bg-secondary active:bg-secondary/80 hover:border-foreground/30 hover:-translate-y-0.5 hover:scale-105 hover:rotate-[-5deg] active:scale-95 hover:shadow-[0_5px_20px_-5px_rgba(255,255,255,0.2)] transition-all duration-300 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABannerSection;
