import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-10">
        <div className="relative z-10 text-center">
          <span className="text-xs text-white/30 mb-4 block font-mono tracking-widest">ERROR 404</span>
          <h1 className="text-[20vw] md:text-[180px] lg:text-[220px] font-bold text-white leading-[0.85] tracking-tight mb-8">
            4<span className="text-blue-400">0</span>4
          </h1>
          <p className="text-base md:text-lg text-white/40 max-w-md mx-auto mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/60 text-sm font-medium rounded-full hover:border-white/30 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
