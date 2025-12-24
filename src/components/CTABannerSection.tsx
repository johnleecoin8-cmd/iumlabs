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
    <section className="bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-light text-foreground mb-2">
              Have a project in mind?
            </h3>
            <p className="text-muted-foreground">
              Let's discuss how we can help you succeed in Korea.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link 
              to="/contact" 
              className="group flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-4 md:py-3 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 active:bg-foreground/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300 min-h-[52px]"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              onClick={scrollToTop}
              className="group p-4 md:p-3 border border-border rounded-full hover:bg-secondary active:bg-secondary/80 hover:border-foreground/30 hover:-translate-y-0.5 transition-all duration-300 min-w-[52px] min-h-[52px] flex items-center justify-center"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABannerSection;
