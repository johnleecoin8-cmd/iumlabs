import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { brand, navigation } from "@/config/content";
import LiveChatModal from "./LiveChatModal";
import logoImage from "@/assets/logo.png";
import { useSidebarState } from "@/hooks/useSidebarState";
import CalendlyButton from "./CalendlyButton";

const brandConfig = {
  name: brand.name,
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
  office: brand.address
};

const navLinks = navigation.links.map(link => ({
  to: link.href,
  label: link.name
}));

// Services for the right side
const featuredServices = [
  { label: "GTM Strategy", to: "/services/gtm-strategy" },
  { label: "KOL Marketing", to: "/services/influencer" },
  { label: "PR & Media", to: "/services/pr-media" },
  { label: "Community", to: "/services/community" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { isCollapsed } = useSidebarState();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const mobileNavLayer = (
    <>
      {/* Mobile Top Navigation Bar */}
      <nav className="fixed top-[max(0.5rem,env(safe-area-inset-top))] left-[max(0.5rem,env(safe-area-inset-left))] right-[max(0.5rem,env(safe-area-inset-right))] sm:top-[max(1rem,env(safe-area-inset-top))] sm:left-[max(1rem,env(safe-area-inset-left))] sm:right-[max(1rem,env(safe-area-inset-right))] z-[60] lg:hidden">
        <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="ium Labs" className="w-8 h-8 rounded-lg object-contain" />
            <span className="text-lg font-semibold text-foreground">{brandConfig.name}</span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-xl hover:bg-secondary/60 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </nav>

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-[101] bg-background transition-all duration-500 ease-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 px-6 sm:px-8 py-5 flex items-center justify-between border-b border-border/30">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <img src={logoImage} alt="ium Labs Logo" className="w-8 h-8 rounded-lg object-contain" />
              <span className="text-lg font-semibold text-foreground">{brandConfig.name}</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-secondary/80 text-foreground text-sm font-medium transition-all duration-300 hover:bg-secondary"
            >
              <span>close</span>
              <div className="relative w-5 h-5 flex items-center justify-center">
                <span className="absolute w-4 h-0.5 bg-current rotate-45 transition-transform duration-300 group-hover:rotate-[135deg]" />
                <span className="absolute w-4 h-0.5 bg-current -rotate-45 transition-transform duration-300 group-hover:rotate-[45deg]" />
              </div>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8 sm:py-12">
            <div className="h-full flex flex-col sm:flex-row gap-8 sm:gap-16 lg:gap-24">
              {/* Left: Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-foreground hover:text-primary transition-all duration-300 leading-[1.2] py-1 ${
                      isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: isMenuOpen ? `${100 + index * 50}ms` : "0ms" }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-foreground hover:text-primary transition-all duration-300 leading-[1.2] py-1 ${
                    isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? `${100 + navLinks.length * 50}ms` : "0ms" }}
                >
                  Contact
                </Link>
              </nav>

              {/* Right: Featured Services */}
              <div 
                className={`sm:w-64 lg:w-72 flex flex-col justify-center transition-all duration-500 ${
                  isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: isMenuOpen ? "300ms" : "0ms" }}
              >
                <span className="text-muted-foreground text-xs uppercase tracking-widest mb-4">
                  Our Services
                </span>
                <div className="space-y-3">
                  {featuredServices.map((service, index) => (
                    <Link
                      key={service.to}
                      to={service.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg sm:text-xl font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div 
            className={`flex-shrink-0 px-6 sm:px-8 py-6 border-t border-border/30 transition-all duration-500 ${
              isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMenuOpen ? "400ms" : "0ms" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* CTA Button */}
              <CalendlyButton 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground text-base font-semibold hover:bg-primary/90 transition-all shadow-lg"
              >
                Book a Free Consultation
              </CalendlyButton>

              {/* Office Hours */}
              <div className="text-right">
                <span className="text-muted-foreground text-xs block mb-1">Open Hours</span>
                <span className="text-foreground font-semibold">Mon-Fri 09:00 — 18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {isMounted ? createPortal(mobileNavLayer, document.body) : null}

      {/* Live Chat Modal */}
      <LiveChatModal isOpen={isLiveChatOpen} onClose={() => setIsLiveChatOpen(false)} />
    </>
  );
};

export default Navbar;