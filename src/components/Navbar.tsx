import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, Send, Linkedin, Mail, MapPin, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { brand, navigation } from "@/config/content";
import LiveChatModal from "./LiveChatModal";
import CalendlyButton from "./CalendlyButton";
import logoImage from "@/assets/logo.png";

const serviceItems = [
  { name: "Web3 GTM Strategy", href: "/services/gtm" },
  { name: "Brand Identity & Web", href: "/services/branding" },
  { name: "SEO & Paid Ads", href: "/services/seo-ads" },
  { name: "Influencer & KOL", href: "/services/influencer" },
  { name: "PR & Media Coverage", href: "/services/pr" },
  { name: "Deep Research & Analytics", href: "/services/deep-research" },
  { name: "Community Management", href: "/services/community" },
  { name: "Offline Events Korea", href: "/services/offline-event" },
];

const brandConfig = {
  name: brand.name,
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
  office: brand.address,
};

// Desktop nav links (subset for top bar)
const desktopLinks = [
  { name: "Services", href: "/services/gtm", hasDropdown: true },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "K-Leaderboard", href: "/k-leaderboard" },
  { name: "Careers", href: "/jobs" },
];

const mobileLinks = navigation.links;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/ium-admin");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setServicesOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  // Scroll detection for background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  if (isAdminPage) return null;

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setServicesDropdown(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setServicesDropdown(false), 150);
  };

  const navContent = (
    <>
      {/* ═══ Desktop + Mobile Top Bar ═══ */}
      <header
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-5 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <img
                src={logoImage}
                alt="ium Labs"
                className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg object-contain"
              />
              <span className="text-sm lg:text-base font-semibold text-white">
                {brandConfig.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {desktopLinks.map((link) => {
                const isActive =
                  location.pathname === link.href ||
                  (link.hasDropdown && location.pathname.startsWith("/services"));

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <Link
                        to={link.href}
                        className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                          isActive
                            ? "text-white"
                            : "text-white/50 hover:text-white/80"
                        }`}
                      >
                        {link.name}
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            servicesDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </Link>

                      {/* Dropdown */}
                      <AnimatePresence>
                        {servicesDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                            className="absolute top-full left-0 mt-2 w-64 py-2 bg-[#111111] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40"
                            onMouseEnter={handleDropdownEnter}
                            onMouseLeave={handleDropdownLeave}
                          >
                            {serviceItems.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                className="block px-4 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors duration-150"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <CalendlyButton className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all duration-200">
                Contact Us
              </CalendlyButton>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-white/[0.06] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ Mobile Full-Screen Menu ═══ */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Panel — slides from top */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="fixed inset-0 z-[9999] bg-black lg:hidden overflow-y-auto"
            >
              <div className="min-h-full flex flex-col px-6 sm:px-8">
                {/* Header */}
                <div className="flex items-center justify-between h-14 sm:h-16 shrink-0">
                  <Link
                    to="/"
                    className="flex items-center gap-2.5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <img
                      src={logoImage}
                      alt="ium Labs"
                      className="w-7 h-7 rounded-lg object-contain"
                    />
                    <span className="text-sm font-semibold text-white">
                      {brandConfig.name}
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-white/[0.06] transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col justify-center py-8 -mt-10">
                  <div className="space-y-1">
                    {mobileLinks.map((link, index) => {
                      if (link.name === "Services") {
                        return (
                          <div key={link.href}>
                            <button
                              onClick={() => setServicesOpen(!servicesOpen)}
                              className="w-full flex items-center justify-between py-3"
                            >
                              <span className="text-3xl sm:text-4xl font-bold text-white">
                                {link.name}
                              </span>
                              <ChevronDown
                                className={`w-6 h-6 text-white/40 transition-transform duration-300 ${
                                  servicesOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            <AnimatePresence>
                              {servicesOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden ml-1 pl-4 border-l border-white/[0.08]"
                                >
                                  <div className="space-y-1 py-2">
                                    {serviceItems.map((item) => (
                                      <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block py-2 text-base text-white/40 hover:text-white transition-colors"
                                      >
                                        {item.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-3 text-3xl sm:text-4xl font-bold text-white hover:text-white/70 transition-colors"
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                {/* Bottom info */}
                <div className="shrink-0 py-8 border-t border-white/[0.06] space-y-4">
                  <div className="flex flex-wrap gap-5">
                    <a
                      href={brandConfig.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Telegram
                    </a>
                    <a
                      href={brandConfig.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                    {brandConfig.email && (
                      <a
                        href={`mailto:${brandConfig.email}`}
                        className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/20">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{brandConfig.office}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LiveChatModal
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
      />
    </>
  );

  return <>{isMounted ? createPortal(navContent, document.body) : null}</>;
};

export default Navbar;
