import { brand } from "@/config/content";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-black text-white border-t border-white/[0.06]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Copyright */}
      <div className="px-6 lg:px-10 py-6">
        <p className="text-xs text-white/30">
          © {currentYear} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
