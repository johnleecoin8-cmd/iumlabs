import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowUp } from "lucide-react";
const CTABannerSection = () => {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:gap-6 md:gap-8">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-foreground mb-1.5 sm:mb-2">
              Have a project in mind?
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base mb-2">
              Let's discuss how we can help you succeed in Korea.
            </p>
            <p className="text-xs text-muted-foreground/70 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 rounded-full text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Response within 24h
              </span>
              <span>Join 18+ projects that launched with us</span>
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none">
              <Link to="/contact" className="group primary-cta-dark flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 font-medium text-xs sm:text-sm rounded-full active:scale-[0.98] min-h-[44px] sm:min-h-[48px]">
                <span className="relative z-10">Get Your Free Proposal</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </section>;
};
export default CTABannerSection;