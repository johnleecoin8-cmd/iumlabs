import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, Send, Linkedin, Mail, MapPin, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { brand, navigation } from "@/config/content";
import LiveChatModal from "./LiveChatModal";
import logoImage from "@/assets/logo.png";
import { useSidebarState } from "@/hooks/useSidebarState";
import { useScrollDirection } from "@/hooks/useScrollDirection";

// Services submenu data (same as Sidebar)
const servicesSubMenu = [
  { name: "Web3 GTM Strategy", href: "/services" },
  { name: "Brand Identity & Web", href: "/services/branding" },
  { name: "SEO & Paid Ads", href: "/services/seo-ads" },
  { name: "Offline Events Korea", href: "/services/offline-event" },
  { name: "Community Management", href: "/services/community" },
  { name: "Deep Research & Analytics", href: "/services/deep-research" },
  { name: "Influencer & KOL Marketing", href: "/services/influencer" },
  { name: "PR & Media Coverage", href: "/services/pr" },
];

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const { isCollapsed } = useSidebarState();
  const { isVisible: isNavVisible } = useScrollDirection({ threshold: 10 });

  // Hide on admin pages
  const isAdminPage = location.pathname.startsWith('/ium-admin');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminPage) {
    return null;
  }

  const mobileNavLayer = (
    <>
      {/* Mobile Top Navigation Bar */}
      <nav 
        className={`fixed top-[max(0.5rem,env(safe-area-inset-top))] left-[max(0.5rem,env(safe-area-inset-left))] right-[max(0.5rem,env(safe-area-inset-right))] sm:top-[max(0.75rem,env(safe-area-inset-top))] sm:left-[max(0.75rem,env(safe-area-inset-left))] sm:right-[max(0.75rem,env(safe-area-inset-right))] z-[60] lg:hidden transition-transform duration-300 ease-out ${
          isNavVisible || isMenuOpen ? 'translate-y-0' : '-translate-y-[calc(100%+1rem)]'
        }`}
      >
        <div className="relative bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg overflow-hidden">
          <div className="px-3 py-2 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5">
              <img src={logoImage} alt="ium Labs" className="w-6 h-6 rounded-md object-contain" />
              <span className="text-sm font-semibold text-foreground">{brandConfig.name}</span>
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-1.5 rounded-lg hover:bg-secondary/60 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </div>
          
          {/* Scroll Progress Bar */}
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-primary/80 to-primary/60"
            initial={{ width: 0 }}
            animate={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          />
        </div>
      </nav>

      {/* Backdrop Overlay - transparent to show original page */}
      <div
        className={`fixed inset-0 z-[100] bg-black/30 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Top Panel Menu - slides from top, 60% height */}
      <div
        className={`fixed top-0 left-0 right-0 h-[60vh] z-[101] bg-background transition-all duration-300 ease-out rounded-b-2xl shadow-2xl ${
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

          {/* Content - no scrollbar */}
          <div className="flex-1 container mx-auto px-4 sm:px-6 py-2 sm:py-3 lg:py-6 overflow-hidden">
            <div className="h-full grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 content-center">
              {/* Navigation Links */}
              <div className="flex flex-col justify-center">
                <span
                  className={`text-muted-foreground text-xs lg:text-sm uppercase tracking-widest mb-4 lg:mb-6 block transition-all duration-500 ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? "200ms" : "0ms" }}
                >
                  Menu
                </span>
                <nav className="space-y-1 sm:space-y-1.5 md:space-y-2" aria-label="Main navigation">
                  {navLinks.map((link, index) => {
                    // Services with accordion
                    if (link.label === 'Services') {
                      return (
                        <div key={link.to}>
                          <button
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className={`w-full flex items-center justify-between text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-foreground hover:text-primary transition-all duration-300 min-h-[40px] sm:min-h-[44px] md:min-h-[52px] ${
                              isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                            }`}
                            style={{ transitionDelay: isMenuOpen ? `${200 + index * 60}ms` : "0ms" }}
                          >
                            <span>{link.label}</span>
                            <motion.div
                              animate={{ rotate: servicesOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                            </motion.div>
                          </button>
                          
                          {/* Services Submenu */}
                          <AnimatePresence>
                            {servicesOpen && (
                              <motion.div
                                className="overflow-hidden mt-2 ml-2 pl-3 border-l border-border/30"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                              >
                                <div className="space-y-1 py-1">
                                  {servicesSubMenu.map((item, subIndex) => (
                                    <motion.div
                                      key={item.href}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.2, delay: subIndex * 0.03 }}
                                    >
                                      <Link
                                        to={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200 py-1.5"
                                      >
                                        {item.name}
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
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
                    );
                  })}
                </nav>
              </div>

              {/* Contact Info - Compact Layout */}
              <div className="flex flex-col justify-center space-y-2">
                <span
                  className={`text-muted-foreground text-[10px] uppercase tracking-widest mb-1 block transition-all duration-500 ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? "400ms" : "0ms" }}
                >
                  Connect
                </span>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <a
                    href={`mailto:${brandConfig.email}`}
                    className={`flex items-center gap-2 text-xs sm:text-sm text-foreground hover:text-primary transition-all duration-300 ${
                      isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                    }`}
                    style={{ transitionDelay: isMenuOpen ? "450ms" : "0ms" }}
                  >
                    <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{brandConfig.email}</span>
                  </a>

                  <a
                    href={brandConfig.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-xs sm:text-sm text-foreground hover:text-primary transition-all duration-300 ${
                      isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                    }`}
                    style={{ transitionDelay: isMenuOpen ? "500ms" : "0ms" }}
                  >
                    <Send className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>@iumlabs</span>
                  </a>

                  <a
                    href={brandConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-xs sm:text-sm text-foreground hover:text-primary transition-all duration-300 ${
                      isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                    }`}
                    style={{ transitionDelay: isMenuOpen ? "550ms" : "0ms" }}
                  >
                    <Linkedin className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>LinkedIn</span>
                  </a>
                </div>

                <div
                  className={`flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground pt-1 transition-all duration-300 ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? "600ms" : "0ms" }}
                >
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span>{brandConfig.office}</span>
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