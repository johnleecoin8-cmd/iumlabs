import { brand } from "@/config/content";
import { Link } from "react-router-dom";
import CalendlyButton from "./CalendlyButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
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
