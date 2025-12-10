import { X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2.5 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-3 text-sm">
        <span className="hidden sm:inline">🚀</span>
        <span className="font-medium">
          Schedule a Free Consultation Now
        </span>
        <Link 
          to="/contact" 
          className="inline-flex items-center gap-1 font-semibold hover:underline"
        >
          Book Now
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Close announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
