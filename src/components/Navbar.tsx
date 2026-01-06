import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { brand, navigation } from "@/config/content";
import LiveChatModal from "./LiveChatModal";
import logoImage from "@/assets/logo.png";
import { useSidebarState } from "@/hooks/useSidebarState";
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
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { isCollapsed } = useSidebarState();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Top Panel Menu - slides from top */}
      <div
        className={`fixed top-0 left-0 right-0 max-h-[85vh] sm:max-h-[75vh] lg:max-h-[65vh] z-[101] bg-gradient-to-b from-background via-background to-primary/5 transition-all duration-300 ease-out ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

        <div className="h-full flex flex-col relative z-10">
          {/* Header */}
          <div className="flex-shrink-0 container mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <img src={logoImage} alt="ium Labs Logo" className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain" />
                <span className="text-base sm:text-lg font-semibold text-foreground">{brandConfig.name}</span>
              </Link>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-secondary text-foreground text-sm font-medium transition-all duration-300 hover:bg-secondary/80"
              >
                <span>close</span>
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <span className="absolute w-4 h-0.5 bg-current rotate-45 transition-transform duration-300 group-hover:rotate-[135deg]" />
                  <span className="absolute w-4 h-0.5 bg-current -rotate-45 transition-transform duration-300 group-hover:rotate-[45deg]" />
                </div>
              </button>
            </div>
          </div>

          {/* Content - flex-1 to fill remaining space */}
          <div className="flex-1 container mx-auto px-4 sm:px-6 py-2 sm:py-3 lg:py-6 overflow-y-auto overscroll-contain scrollbar-thin">
            <div className="h-full grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 content-center">
              {/* Navigation Links */}
              <div className="flex flex-col justify-center">
                <span
                  className={`text-muted-foreground text-xs lg:text-sm uppercase tracking-widest mb-4 lg:mb-6 block transition-all duration-500 ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? "200ms" : "0ms" }}
                >
                  Navigation
                </span>
                <nav className="space-y-1 sm:space-y-1.5 md:space-y-2">
              {navLinks.map((link, index) => (
                    <div key={link.to}>
                      <Link
                        to={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-foreground hover:text-primary transition-all duration-300 min-h-[40px] sm:min-h-[44px] md:min-h-[52px] flex items-center ${
                          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                        }`}
                        style={{ transitionDelay: isMenuOpen ? `${200 + index * 60}ms` : "0ms" }}
                      >
                        {link.label}
                      </Link>
                    </div>
                  ))}
                  {/* Contact link - only in mobile menu since removed from main nav */}
                  <div>
                    <Link
                      to="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground hover:text-primary transition-all duration-300 min-h-[40px] sm:min-h-[44px] flex items-center ${
                        isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                      }`}
                      style={{
                        transitionDelay: isMenuOpen ? `${200 + navLinks.length * 60}ms` : "0ms",
                      }}
                    >
                      Contact
                    </Link>
                  </div>
                </nav>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col justify-center space-y-2 sm:space-y-3 md:space-y-4">
                <div
                  className={`transition-all duration-400 ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? "400ms" : "0ms" }}
                >
                  <span className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-widest mb-1 block">
                    Get in touch
                  </span>
                  <a
                    href={`mailto:${brandConfig.email}`}
                    className="text-sm sm:text-base lg:text-lg text-foreground hover:text-primary transition-colors"
                  >
                    {brandConfig.email}
                  </a>
                </div>

                <div
                  className={`transition-all duration-400 ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? "450ms" : "0ms" }}
                >
                  <span className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-widest mb-1 block">
                    Telegram
                  </span>
                  <a
                    href={brandConfig.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base lg:text-lg text-foreground hover:text-primary transition-colors"
                  >
                    @iumlabs
                  </a>
                </div>

                <div
                  className={`transition-all duration-400 ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? "500ms" : "0ms" }}
                >
                  <span className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-widest mb-1 block">
                    Office
                  </span>
                  <p className="text-xs sm:text-sm text-muted-foreground">{brandConfig.office}</p>
                </div>

                <div
                  className={`flex gap-2 sm:gap-3 pt-2 sm:pt-3 transition-all duration-400 ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? "550ms" : "0ms" }}
                >
                  <a
                    href={brandConfig.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border text-foreground text-xs font-medium hover:bg-secondary hover:border-foreground/30 transition-all duration-300"
                  >
                    Telegram
                  </a>
                  <a
                    href={brandConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border text-foreground text-xs font-medium hover:bg-secondary hover:border-foreground/30 transition-all duration-300"
                  >
                    LinkedIn
                  </a>
                </div>
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