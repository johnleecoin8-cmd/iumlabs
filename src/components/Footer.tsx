import { brand } from "@/config/content";
import { Link } from "react-router-dom";
import CalendlyButton from "./CalendlyButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* CTA strip */}
      <div className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 border-b border-white/[0.06]">
        <div className="max-w-4xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
            Ready to launch in Korea?
          </h2>
          <p className="text-sm sm:text-base text-white/40 mb-6 max-w-lg">
            Book a free 30-minute strategy call. We'll map out your Korean market entry.
          </p>
          <div className="flex items-center gap-3">
            <CalendlyButton className="inline-flex items-center px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all">
              Book a Meeting
            </CalendlyButton>
            <Link to="/contact" className="inline-flex items-center px-6 py-3 rounded-full border border-white/[0.1] text-white/60 text-sm font-medium hover:border-white/[0.2] hover:text-white transition-all">
              Send a Message
            </Link>
          </div>
        </div>
      </div>

      {/* Info row */}
      <div className="px-4 sm:px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-xs text-white/30">
          <span>{brand.name}</span>
          <span>{brand.address}</span>
        </div>
        <p className="text-xs text-white/20">
          {currentYear} {brand.name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
