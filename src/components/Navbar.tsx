import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Send, Linkedin, Mail, MapPin, ChevronDown, Calendar, X } from "lucide-react";
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
  { name: "AMA Hosting", href: "/services/ama" },
];

const navLinks = navigation.links.map(link => ({ to: link.href, label: link.name }));

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/ium-admin");

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  if (isAdminPage) return null;

  const fullscreenMenu = (
    <>
      <div className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-md transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`} onClick={() => setIsMenuOpen(false)} />
      <div className={`fixed inset-0 z-[101] bg-[#0A0A0A] transition-all duration-400 ease-out ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-6 sm:px-8 lg:px-12 py-5 border-b border-white/[0.06]">
            <Link to="/" className="flex items-center gap-2.5" onClick={() => setIsMenuOpen(false)}>
              <img src={logoImage} alt="ium Labs" className="w-7 h-7 rounded-lg object-contain" />
              <span className="text-sm font-semibold text-white">ium Labs</span>
            </Link>
            <button onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-white/70 hover:bg-white/[0.1] hover:text-white transition-all text-sm">
              <span>close</span><X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-16">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-20">
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-8 block">Menu</span>
                <nav className="space-y-1">
                  {navLinks.map((link) => {
                    if (link.label === "Services") {
                      return (
                        <div key={link.to}>
                          <button onClick={() => setServicesOpen(!servicesOpen)} className="w-full flex items-center justify-between text-2xl sm:text-3xl lg:text-4xl font-bold text-white hover:text-white/70 transition-colors py-2">
                            <span>{link.label}</span>
                            <motion.div animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown className="w-6 h-6" /></motion.div>
                          </button>
                          <AnimatePresence>
                            {servicesOpen && (
                              <motion.div className="overflow-hidden ml-1 pl-4 border-l border-white/[0.08]" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                                <div className="space-y-1 py-2">
                                  {serviceItems.map((item) => <Link key={item.href} to={item.href} onClick={() => setIsMenuOpen(false)} className="block text-sm text-white/50 hover:text-white transition-colors py-1.5">{item.name}</Link>)}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }
                    return <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-white hover:text-white/70 transition-colors py-2">{link.label}</Link>;
                  })}
                </nav>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-8 block">Connect</span>
                <div className="space-y-4">
                  <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm"><Send className="w-4 h-4" /><span>{brand.telegram}</span></a>
                  <a href={brand.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm"><Linkedin className="w-4 h-4" /><span>LinkedIn</span></a>
                  {brand.email && <a href={`mailto:${brand.email}`} className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm"><Mail className="w-4 h-4" /><span>{brand.email}</span></a>}
                  <div className="flex items-center gap-3 text-white/40 text-xs pt-2"><MapPin className="w-3.5 h-3.5 flex-shrink-0" /><span>{brand.address}</span></div>
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
      {/* ===== NAVBAR — separate floating tags ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo tag */}
          <Link to="/" className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08] hover:bg-black/80 transition-all">
            <img src={logoImage} alt="ium Labs" className="w-7 h-7 object-contain rounded-lg" />
            <span className="text-[13px] font-bold text-white hidden sm:block tracking-tight">ium Labs</span>
          </Link>

          {/* Center: contact tag (desktop) */}
          <div className="hidden lg:flex px-5 py-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08]">
            <div className="flex flex-col items-center gap-[1px]">
              <span className="text-[9px] text-white/35 tracking-wider leading-none">get in touch</span>
              <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/80 hover:text-white transition-colors font-medium leading-none">
                {brand.telegram}
              </a>
            </div>
          </div>

          {/* Right: action tags */}
          <div className="flex items-center gap-2">
            {/* Telegram tag */}
            <a
              href={brand.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08] hover:bg-black/80 transition-all text-[13px] font-medium text-white/80"
            >
              <Send className="w-3.5 h-3.5 text-[#229ED9]" />
              <span>Start Live Chat</span>
            </a>

            {/* Book a Meeting tag */}
            <CalendlyButton className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08] hover:bg-black/80 transition-all text-[13px] font-medium text-white/80">
              <Calendar className="w-3.5 h-3.5 text-[#4285F4]" />
              <span>Book a Meeting</span>
            </CalendlyButton>

            {/* Menu tag */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08] hover:bg-black/80 transition-all text-[13px] font-medium text-white/70"
              aria-label="Open menu"
            >
              <span className="hidden sm:inline">menu</span>
              <div className="flex flex-col gap-[3px]">
                <span className="block w-[14px] h-[2px] bg-white/80 rounded-full" />
                <span className="block w-[14px] h-[2px] bg-white/80 rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {isMounted ? createPortal(fullscreenMenu, document.body) : null}
      <LiveChatModal isOpen={isLiveChatOpen} onClose={() => setIsLiveChatOpen(false)} />
    </>
  );
};

export default Navbar;
