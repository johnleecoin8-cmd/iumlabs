import { brand } from "@/config/content";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="px-5 sm:px-6 lg:px-10 py-5 sm:py-6 text-center">
        <p className="text-[11px] text-white/25 font-mono tracking-wide">
          © {currentYear} {brand.name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
