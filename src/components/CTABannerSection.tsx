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

      
    </section>;
};
export default CTABannerSection;