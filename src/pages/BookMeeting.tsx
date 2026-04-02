import { useEffect, useState } from "react";
import { brand } from "@/config/content";
import logoImage from "@/assets/logo.png";
import SEOHead from "@/components/SEOHead";

const BookMeeting = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      setTimeout(() => setLoaded(true), 800);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] relative">
      <SEOHead
        title="Book a Meeting | ium Labs — Korea Web3 Marketing Agency"
        description="Schedule a free 30-minute consultation with Korea's leading Web3 growth agency. Get a tailored Korea market entry strategy for your project."
        path="/book-a-meeting"
        keywords={['Book Meeting Web3 Korea', 'Korea Crypto Consultation', 'Web3 Agency Meeting', 'Korea Market Entry Call']}
      />
      {/* Loading Screen */}
      <div
        className={`fixed inset-0 z-50 bg-[#f5f5f5] flex items-center justify-center transition-opacity duration-700 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-4">
          <img
            src={logoImage}
            alt="ium Labs"
            className="w-16 h-16 object-contain animate-pulse"
          />
          <span className="text-4xl font-bold text-black/80 tracking-tight">
            ium Labs
          </span>
        </div>
      </div>

      {/* Calendly Embed */}
      <div
        className="calendly-inline-widget w-full min-h-screen"
        data-url={`${brand.calendlyUrl}?hide_gdpr_banner=1&background_color=f5f5f5&text_color=1a1a1a&primary_color=000000`}
        style={{ minWidth: "320px", height: "100vh" }}
      />
    </div>
  );
};

export default BookMeeting;
