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

  const menuPanel = (
    <>
      {/* Backdrop — click to close */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Menu panel — white, drops from top, rounded bottom */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-[101]"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="bg-white rounded-b-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-h-[85vh] overflow-y-auto overscroll-contain">
              {/* Main content — 3 columns */}
              <div className="px-5 sm:px-8 lg:px-20 pt-12 sm:pt-16 pb-8 sm:pb-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 lg:gap-16">

                  {/* Left — Connect */}
                  <div className="hidden md:block">
                    <span className="text-[10px] text-black/40 uppercase tracking-[0.2em] mb-5 block font-medium">Connect</span>
                    <div className="space-y-4 mb-8">
                      <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-black/70 hover:text-black transition-colors text-base">
                        <Send className="w-5 h-5 text-[#229ED9]" /><span>{brand.telegram}</span>
                      </a>
                      <a href={brand.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-black/70 hover:text-black transition-colors text-base">
                        <Linkedin className="w-5 h-5 text-[#0A66C2]" /><span>LinkedIn</span>
                      </a>
                      {brand.email && (
                        <a href={`mailto:${brand.email}`} className="flex items-center gap-3 text-black/70 hover:text-black transition-colors text-base">
                          <Mail className="w-5 h-5 text-black/40" /><span>{brand.email}</span>
                        </a>
                      )}
                    </div>
                    <div className="flex items-start gap-2.5 text-black/40 text-sm">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{brand.address}</span>
                    </div>
                  </div>

                  {/* Center — Nav links */}
                  <div>
                    <nav className="space-y-1">
                      {navLinks.map((link) => {
                        if (link.label === "Services") {
                          return (
                            <div key={link.to}>
                              <button onClick={() => setServicesOpen(!servicesOpen)} className="w-full flex items-center justify-between text-2xl sm:text-3xl lg:text-4xl font-bold text-black hover:text-black/50 transition-colors py-2">
                                <span>{link.label}</span>
                                <motion.div animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown className="w-6 h-6 text-black/25" /></motion.div>
                              </button>
                              <AnimatePresence>
                                {servicesOpen && (
                                  <motion.div className="overflow-hidden ml-1 pl-4 border-l-2 border-black/[0.08]" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <div className="space-y-1 py-2">
                                      {serviceItems.map((item) => <Link key={item.href} to={item.href} onClick={() => setIsMenuOpen(false)} className="block text-base text-black/50 hover:text-black transition-colors py-1">{item.name}</Link>)}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        }
                        return <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-black hover:text-black/50 transition-colors py-2">{link.label}</Link>;
                      })}
                    </nav>
                  </div>

                  {/* Right — Popular Services */}
                  <div>
                    <span className="text-[10px] text-black/40 uppercase tracking-[0.2em] mb-5 block font-medium">Popular Services</span>
                    <div className="space-y-3">
                      <Link to="/services/gtm" onClick={() => setIsMenuOpen(false)} className="block text-base text-black/60 hover:text-black transition-colors">GTM Strategy</Link>
                      <Link to="/services/influencer" onClick={() => setIsMenuOpen(false)} className="block text-base text-black/60 hover:text-black transition-colors">KOL & Influencer Marketing</Link>
                      <Link to="/services/community" onClick={() => setIsMenuOpen(false)} className="block text-base text-black/60 hover:text-black transition-colors">Community Management</Link>
                      <Link to="/services/pr" onClick={() => setIsMenuOpen(false)} className="block text-base text-black/60 hover:text-black transition-colors">PR & Media Coverage</Link>
                      <Link to="/services/ama" onClick={() => setIsMenuOpen(false)} className="block text-base text-black/60 hover:text-black transition-colors">AMA Hosting</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="border-t border-black/[0.08] px-5 sm:px-8 lg:px-20 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-black/40">
                  <Link to="/projects" onClick={() => setIsMenuOpen(false)} className="hover:text-black transition-colors">Case Studies</Link>
                  <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="hover:text-black transition-colors">Blog</Link>
                  <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className="hover:text-black transition-colors">Career</Link>
                </div>

                <div className="flex items-center gap-5">
                  <CalendlyButton className="inline-flex items-center gap-2.5 px-4 py-2.5 sm:px-6 sm:py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-black/80 transition-all">
                    <Calendar className="w-4 h-4" />
                    Book a Free Consultation
                  </CalendlyButton>
                  <span className="hidden sm:block text-xs text-black/30">Mon–Fri 09:00–18:00 KST</span>
                </div>
              </div>
            </div>

            {/* Floating close button */}
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
      {/* ===== NAVBAR — separate floating tags ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-2.5 sm:px-5 pt-3 sm:pt-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08] hover:bg-black/80 transition-all">
            <img src={logoImage} alt="ium Labs" className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-lg" />
            <span className="text-sm sm:text-[15px] font-bold text-white hidden sm:block tracking-tight">ium Labs</span>
          </Link>


          <div className="flex items-center gap-2 sm:gap-2.5">
            <button onClick={() => setIsLiveChatOpen(true)} className="hidden md:flex items-center gap-2.5 px-5 py-3 sm:py-3.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08] hover:bg-black/80 transition-all text-sm font-medium text-white/80">
              <Send className="w-4 h-4 text-[#229ED9]" /><span>Start Live Chat</span>
            </button>
            <CalendlyButton className="hidden sm:flex items-center gap-2.5 px-5 py-3 sm:py-3.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08] hover:bg-black/80 transition-all text-sm font-medium text-white/80">
              <Calendar className="w-4 h-4 text-[#4285F4]" /><span>Book a Meeting</span>
            </CalendlyButton>
            <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-2.5 min-h-[44px] px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.08] hover:bg-black/80 transition-all text-sm font-medium text-white/70" aria-label="Open menu">
              <span className="hidden sm:inline">menu</span>
              <div className="flex flex-col gap-[4px]">
                <span className="block w-[16px] h-[2px] bg-white/80 rounded-full" />
                <span className="block w-[16px] h-[2px] bg-white/80 rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {isMounted ? createPortal(menuPanel, document.body) : null}
      <LiveChatModal isOpen={isLiveChatOpen} onClose={() => setIsLiveChatOpen(false)} />
    </>
  );
};

export default Navbar;
