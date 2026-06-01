import { useEffect, useState, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Send, Linkedin, Mail, MapPin, ChevronDown, Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { brand, navigation } from "@/config/content";
import CalendlyButton from "./CalendlyButton";

const LiveChatModal = lazy(() => import("./LiveChatModal"));
import logoImage from "@/assets/ium-logo.png";

const serviceItems = [
  { name: "Web3 GTM Strategy", href: "/services/gtm" },
  { name: "Regulations & Compliance", href: "/services/compliance" },
  { name: "SEO & Paid Ads", href: "/services/seo-ads" },
  { name: "Influencer & KOL", href: "/services/influencer" },
  { name: "PR & Media Coverage", href: "/services/pr" },
  { name: "Deep Research & Analytics", href: "/services/deep-research" },
  { name: "Community Management", href: "/services/community" },
  { name: "Offline Events Korea", href: "/services/offline-event" },
  { name: "AMA Hosting", href: "/services/ama" },
];

const navLinks = navigation.links.map(link => ({ to: link.href, label: link.name }));

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/ium-admin");

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  if (isAdminPage) return null;

  const menuPanel = (
    <>
      <div
        className={`fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-[101]"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="bg-[#0A0A0A]/95 backdrop-blur-2xl rounded-b-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-h-screen md:max-h-[85vh] overflow-y-auto overscroll-contain border-b border-white/[0.06]">

              {/* ====== MOBILE LAYOUT ====== */}
              <div className="md:hidden px-6 pt-16 pb-6">
                <nav className="space-y-0.5 mb-8">
                  {navLinks.map((link, i) => {
                    if (link.label === "Services") {
                      return (
                        <div key={link.to}>
                          <button onClick={() => setServicesOpen(!servicesOpen)} className="w-full flex items-center justify-between py-2.5 group">
                            <span className="text-[15px] font-medium text-white tracking-[-0.01em]">{link.label}</span>
                            <motion.div animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                              <ChevronDown className="w-4 h-4 text-white/20" />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {servicesOpen && (
                              <motion.div className="overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <div className="pl-4 border-l border-white/[0.06] py-1 mb-1 space-y-0.5">
                                  {serviceItems.map((item) => (
                                    <Link key={item.href} to={item.href} onClick={() => setIsMenuOpen(false)} className="block text-[13px] text-white/35 hover:text-white/70 transition-colors py-1.5">{item.name}</Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }
                    return (
                      <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className="block text-[15px] font-medium text-white tracking-[-0.01em] py-2.5 hover:text-white/50 transition-colors">
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="border-t border-white/[0.05] pt-4 space-y-3">
                  <p className="text-[9px] text-white/20 uppercase tracking-[0.25em] font-medium">Connect</p>
                  <div className="flex items-center gap-3">
                    <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/60 transition-colors">
                      <Send className="w-3 h-3" />
                      <span>Telegram</span>
                    </a>
                    <span className="text-white/10">·</span>
                    <a href={`mailto:${brand.email}`} className="flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/60 transition-colors">
                      <Mail className="w-3 h-3" />
                      <span>Email</span>
                    </a>
                    <span className="text-white/10">·</span>
                    <a href={brand.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/60 transition-colors">
                      <Linkedin className="w-3 h-3" />
                      <span>LinkedIn</span>
                    </a>
                  </div>

                  <div className="pt-2 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-white/20">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>Gangnam-daero 373, Seoul, South Korea</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-white/20">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      <span>{brand.email}</span>
                    </div>
                    <p className="text-[10px] text-white/15 pl-5">Mon–Fri 09:00–18:00 KST</p>
                  </div>
                </div>
              </div>

              {/* ====== DESKTOP LAYOUT ====== */}
              <div className="hidden md:block px-8 lg:px-20 pt-16 pb-14">
                <div className="grid grid-cols-3 gap-10 lg:gap-16">
                  <div>
                    <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-5 block font-medium">Connect</span>
                    <div className="space-y-4 mb-8">
                      <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-base">
                        <Send className="w-5 h-5 text-[#229ED9]" /><span>{brand.telegram}</span>
                      </a>
                      <a href={brand.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-base">
                        <Linkedin className="w-5 h-5 text-[#0A66C2]" /><span>LinkedIn</span>
                      </a>
                      <a href={`mailto:${brand.email}`} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-base">
                        <Mail className="w-5 h-5 text-white/50" /><span>Email</span>
                      </a>
                    </div>
                    <div className="flex items-start gap-2.5 text-white/40 text-sm">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{brand.address}</span>
                    </div>
                  </div>
                  <div>
                    <nav className="space-y-1">
                      {navLinks.map((link) => {
                        if (link.label === "Services") {
                          return (
                            <div key={link.to}>
                              <button onClick={() => setServicesOpen(!servicesOpen)} className="w-full flex items-center justify-between text-3xl lg:text-4xl font-bold text-white hover:text-white/50 transition-colors py-2">
                                <span>{link.label}</span>
                                <motion.div animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown className="w-6 h-6 text-white/25" /></motion.div>
                              </button>
                              <AnimatePresence>
                                {servicesOpen && (
                                  <motion.div className="overflow-hidden ml-1 pl-4 border-l-2 border-white/[0.08]" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 py-2">
                                      {serviceItems.map((item) => <Link key={item.href} to={item.href} onClick={() => setIsMenuOpen(false)} className="block text-base text-white/50 hover:text-white transition-colors py-1">{item.name}</Link>)}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        }
                        return <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className="block text-3xl lg:text-4xl font-bold text-white hover:text-white/50 transition-colors py-2">{link.label}</Link>;
                      })}
                    </nav>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-5 block font-medium">Popular Services</span>
                    <div className="space-y-3">
                      <Link to="/services/gtm" onClick={() => setIsMenuOpen(false)} className="block text-base text-white/60 hover:text-white transition-colors">GTM Strategy</Link>
                      <Link to="/services/influencer" onClick={() => setIsMenuOpen(false)} className="block text-base text-white/60 hover:text-white transition-colors">KOL & Influencer Marketing</Link>
                      <Link to="/services/community" onClick={() => setIsMenuOpen(false)} className="block text-base text-white/60 hover:text-white transition-colors">Community Management</Link>
                      <Link to="/services/pr" onClick={() => setIsMenuOpen(false)} className="block text-base text-white/60 hover:text-white transition-colors">PR & Media Coverage</Link>
                      <Link to="/services/ama" onClick={() => setIsMenuOpen(false)} className="block text-base text-white/60 hover:text-white transition-colors">AMA Hosting</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop bottom bar */}
              <div className="border-t border-white/[0.08] hidden md:flex px-8 lg:px-20 py-5 items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-white/40">
                  <Link to="/projects" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Case Studies</Link>
                  <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Blog</Link>
                  <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Career</Link>
                </div>
                <div className="flex items-center gap-4">
                  <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] border border-white/[0.1] text-white/70 text-[13px] font-medium rounded-full hover:bg-white/[0.1] hover:text-white transition-all">
                    <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                    Telegram
                  </a>
                  <a href={`mailto:${brand.email}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] border border-white/[0.1] text-white/70 text-[13px] font-medium rounded-full hover:bg-white/[0.1] hover:text-white transition-all">
                    <Mail className="w-3.5 h-3.5 text-white/50" />
                    Email
                  </a>
                  <span className="text-[11px] text-white/25">Mon–Fri 09–18 KST</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute bottom-[-50px] right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-black/50 hover:text-black hover:bg-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {/* ===== NAVBAR — separate floating pills ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-2.5 sm:px-5 pt-3 sm:pt-5">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="ium Labs Home" className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 h-[40px] sm:h-[52px] rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08] hover:bg-black/80 transition-all">
            <img src={logoImage} alt="ium Labs" className="w-7 h-7 sm:w-9 sm:h-9 object-contain rounded-lg" />
            <span className="text-xs sm:text-[15px] font-semibold text-white tracking-tight">ium Labs</span>
          </Link>

          {/* Service Marquee - center (min-width to prevent crush on small screens) */}
          <div
            className="relative flex-1 mx-1.5 sm:mx-2.5 min-w-0"
            onMouseEnter={() => setServiceDropdownOpen(true)}
            onMouseLeave={() => setServiceDropdownOpen(false)}
          >
            <div className="flex items-center h-[40px] sm:h-[52px] rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08] overflow-hidden marquee-container">
              <div className="flex items-center gap-5 logo-marquee-fast whitespace-nowrap" style={{ animationDirection: 'reverse' }}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-5">
                    {[
                      { name: "GTM Strategy", href: "/services/gtm" },
                      { name: "KOL Marketing", href: "/services/influencer" },
                      { name: "PR & Media", href: "/services/pr" },
                      { name: "Community Management", href: "/services/community" },
                      { name: "Offline Events", href: "/services/offline-event" },
                      { name: "Deep Research", href: "/services/deep-research" },
                      { name: "SEO & Paid Ads", href: "/services/seo-ads" },
                      { name: "AMA Hosting", href: "/services/ama" },
                      { name: "Compliance", href: "/services/compliance" },
                    ].map((svc) => (
                      <Link key={`${i}-${svc.name}`} to={svc.href} className="text-[10px] sm:text-[13px] text-white/50 font-medium hover:text-white transition-colors px-1">{svc.name}</Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop service dropdown — outside overflow-hidden container */}
            <AnimatePresence>
              {serviceDropdownOpen && (
                <motion.div
                  className="hidden md:block absolute top-full left-0 right-0 mt-2 z-50"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="bg-black/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    <div className="grid grid-cols-3 gap-1">
                      {serviceItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="px-3 py-2.5 rounded-lg text-[13px] text-white/60 hover:text-white hover:bg-white/[0.04] transition-all"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button onClick={() => setIsLiveChatOpen(true)} aria-label="Start Live Chat" className="hidden md:flex items-center gap-2.5 px-5 h-[44px] sm:h-[52px] rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08] hover:bg-black/80 transition-all text-[13px] sm:text-[14px] font-medium text-white/80">
              <Send className="w-4 h-4 text-[#229ED9]" /><span>Start Live Chat</span>
            </button>
            <CalendlyButton aria-label="Book a Meeting" className="hidden sm:flex items-center gap-2.5 px-5 h-[44px] sm:h-[52px] rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08] hover:bg-black/80 transition-all text-[13px] sm:text-[14px] font-medium text-white/80">
              <Calendar className="w-4 h-4 text-[#4285F4]" /><span>Book a Meeting</span>
            </CalendlyButton>
            <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-2 sm:gap-2.5 h-[40px] sm:h-[52px] px-3 sm:px-5 rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08] hover:bg-black/80 transition-all text-[12px] sm:text-[14px] font-medium text-white/70" aria-label="Open menu">
              <span className="hidden sm:inline">menu</span>
              <div className="flex flex-col gap-[5px]">
                <span className="block w-[20px] h-[2.5px] bg-white/80 rounded-full" />
                <span className="block w-[20px] h-[2.5px] bg-white/80 rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {isMounted ? createPortal(menuPanel, document.body) : null}
      {isLiveChatOpen && (
        <Suspense fallback={null}>
          <LiveChatModal isOpen={isLiveChatOpen} onClose={() => setIsLiveChatOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default Navbar;
