import { brand } from "@/config/content";
import { Link } from "react-router-dom";
import CalendlyButton from "./CalendlyButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Giant brand name */}
      <div className="px-4 sm:px-6 lg:px-10 pt-10 sm:pt-16 pb-6 sm:pb-10 overflow-hidden text-center">
        <h2 className="text-[15vw] sm:text-[12vw] font-extralight italic text-white/[0.07] leading-[0.85] tracking-[-0.02em] whitespace-nowrap select-none" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
          ium Labs
        </h2>
      </div>

      {/* Info row */}
      <div className="px-4 sm:px-6 lg:px-10 py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
