import { brand } from "@/config/content";
import { Link } from "react-router-dom";
import CalendlyButton from "./CalendlyButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 text-center">
        <p className="text-xs text-white/20">
          {currentYear} {brand.name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
