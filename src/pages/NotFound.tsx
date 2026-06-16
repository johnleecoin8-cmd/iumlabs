import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";

// Track paths we've already logged so repeated external hits (e.g. a browser
// extension probing a path) don't spam the console with duplicate errors.
const loggedNotFoundPaths = new Set<string>();

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // A bad inbound URL is a navigation event, not an application error.
    // Log each unseen path once, at warn level, to keep real broken links visible
    // without flooding the console when something hits the same dead path repeatedly.
    if (!loggedNotFoundPaths.has(location.pathname)) {
      loggedNotFoundPaths.add(location.pathname);
      console.warn("404: no route for", location.pathname);
    }
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
          <span className="text-sm text-white/50 mb-4 block font-mono tracking-wider">[ Error 404 ]</span>
          <h1 className="text-[20vw] md:text-[180px] lg:text-[220px] font-light text-white leading-[0.85] tracking-tight mb-8">
            4<span className="text-primary/80">0</span>4
          </h1>
          <p className="text-base md:text-lg text-white/55 max-w-md mx-auto mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all">
              <Home className="w-4 h-4" />
              <span>Back to HQ</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.12] text-white/60 text-sm font-medium hover:border-white/[0.25] hover:text-white transition-all"
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
