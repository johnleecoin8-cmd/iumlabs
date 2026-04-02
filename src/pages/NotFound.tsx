import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Page Not Found | ium Labs"
        description="The page you're looking for doesn't exist or has been moved."
        path="/404"
        noindex={true}
      />
      <Navbar />
      
      {/* Hero - Full Screen */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <span className="text-sm text-white/50 mb-4 block">[ Error 404 ]</span>
          <h1 className="text-[25vw] md:text-[200px] lg:text-[250px] font-light text-white leading-[0.85] tracking-tight mb-8">
            4<span className="serif-italic text-primary">0</span>4
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-md mx-auto mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="lunar-btn">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="lunar-btn-outline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
