import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Send, Calendar, ChevronRight, Users, Share2, Megaphone, Target, MessageCircle, Newspaper } from "lucide-react";
import { brand, navigation } from "@/config/content";
import LiveChatModal from "./LiveChatModal";

const brandConfig = {
  name: brand.name,
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
  office: brand.address,
};

const navLinks = navigation.links.map(link => ({ to: link.href, label: link.name }));

const serviceSubLinks = [
  { to: "/services/community", label: "Community Operation", icon: Users },
  { to: "/services/social-media", label: "Social Media Marketing", icon: Share2 },
  { to: "/services/influencer", label: "KOL Marketing", icon: Megaphone },
  { to: "/services/gtm-strategy", label: "GTM Strategy", icon: Target },
  { to: "/services/yap", label: "Yapping Marketing", icon: MessageCircle },
  { to: "/services/pr", label: "PR & Media", icon: Newspaper },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  return (
    <>
      {/* Main Navbar - Light theme with separated pill sections */}
      <nav className="fixed top-3 left-3 right-3 z-50">
        <div className="flex items-center gap-2">
          {/* Logo Section - Separate pill - Light theme */}
          <Link 
            to="/" 
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-slate-200 bg-white/95 backdrop-blur-md transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.02] shadow-sm"
          >
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
              <div className="w-3.5 h-3.5 bg-white rounded-sm"></div>
            </div>
            <span className="text-base font-semibold text-slate-900">{brandConfig.name}</span>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Center - Email - Separate pill - Light theme */}
          <div className="hidden lg:flex items-center gap-3 px-5 py-3 rounded-full border border-slate-200 bg-white/95 backdrop-blur-md transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 shadow-sm">
            <span className="text-slate-400 text-sm">e-mail</span>
            <a 
              href={`mailto:${brandConfig.email}`} 
              className="text-slate-700 text-sm transition-colors duration-300 hover:text-primary"
            >
              {brandConfig.email}
            </a>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right side buttons - Light theme */}
          <div className="flex items-center gap-2">
            {/* Live Chat Button - Light pill */}
            <button
              onClick={() => setIsLiveChatOpen(true)}
              className="hidden md:flex items-center gap-2 px-5 py-3 rounded-full border border-slate-200 bg-white/95 backdrop-blur-md text-slate-700 text-sm font-medium transition-all duration-300 hover:bg-slate-50 hover:border-primary/50 hover:scale-[1.02] hover:shadow-md shadow-sm"
            >
              <Send className="w-4 h-4 text-primary transition-transform duration-300 hover:rotate-12" />
              <span>Start Live Chat</span>
            </button>

            {/* Book a Meeting Button - Light pill */}
            <a
              href="https://calendly.com/cryptobridgekorea"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-3 rounded-full border border-slate-200 bg-white/95 backdrop-blur-md text-slate-700 text-sm font-medium transition-all duration-300 hover:bg-slate-50 hover:border-primary/50 hover:scale-[1.02] hover:shadow-md shadow-sm"
            >
              <Calendar className="w-4 h-4 text-primary transition-transform duration-300" />
              <span>Book a Meeting</span>
            </a>

            {/* Menu Button - Primary color pill */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-white text-sm font-medium transition-all duration-300 hover:bg-primary/90 hover:scale-[1.05] hover:shadow-lg"
            >
              <span className="hidden sm:inline">menu</span>
              <Menu className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>
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
        className={`fixed top-0 left-0 right-0 h-[85vh] sm:h-[75vh] lg:h-[60vh] z-[101] bg-gradient-to-b from-background via-background to-primary/10 transition-transform duration-500 ease-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 pointer-events-none" />
        
        <div className="h-full flex flex-col relative z-10">
          {/* Header */}
          <div className="flex-shrink-0 container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-background rounded-sm"></div>
                </div>
                <span className="text-lg font-semibold text-white">{brandConfig.name}</span>
              </Link>
              
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-800 text-white text-sm font-medium transition-all hover:bg-zinc-700"
              >
                <span>close</span>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content - flex-1 to fill remaining space */}
          <div className="flex-1 container mx-auto px-6 py-4 lg:py-8 overflow-y-auto">
            <div className="h-full grid md:grid-cols-2 gap-8 lg:gap-16 content-center">
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
                <nav className="space-y-2 lg:space-y-3">
                  {navLinks.map((link, index) => (
                    <div key={link.to}>
                      {link.label === "Services" ? (
                        <div>
                          <button
                            onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                            className={`flex items-center gap-3 text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground hover:text-primary transition-all duration-500 ${
                              isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                            }`}
                            style={{ transitionDelay: isMenuOpen ? `${300 + index * 80}ms` : "0ms" }}
                          >
                            {link.label}
                            <ChevronRight 
                              className={`w-6 h-6 lg:w-8 lg:h-8 transition-transform duration-300 ${isServicesExpanded ? 'rotate-90' : ''}`} 
                            />
                          </button>
                          
                          {/* Services Submenu */}
                          <div 
                            className={`overflow-hidden transition-all duration-500 ${
                              isServicesExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="pl-4 lg:pl-6 pt-3 lg:pt-4 space-y-2 lg:space-y-3 border-l-2 border-primary/30 ml-2">
                              {serviceSubLinks.map((subLink, subIndex) => (
                                <Link
                                  key={subLink.to}
                                  to={subLink.to}
                                  onClick={() => setIsMenuOpen(false)}
                                  className={`flex items-center gap-3 text-base sm:text-lg lg:text-xl text-white/70 hover:text-primary transition-all duration-300 group ${
                                    isServicesExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                  }`}
                                  style={{ transitionDelay: isServicesExpanded ? `${subIndex * 50}ms` : "0ms" }}
                                >
                                  <subLink.icon className="w-4 h-4 lg:w-5 lg:h-5 text-primary/60 group-hover:text-primary transition-colors" />
                                  {subLink.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={link.to}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground hover:text-primary transition-all duration-500 ${
                            isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                          }`}
                          style={{ transitionDelay: isMenuOpen ? `${300 + index * 80}ms` : "0ms" }}
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col justify-center space-y-4 lg:space-y-8">
                <div
                  className={`transition-all duration-500 ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? "500ms" : "0ms" }}
                >
                  <span className="text-muted-foreground text-xs lg:text-sm uppercase tracking-widest mb-2 block">Get in touch</span>
                  <a 
                    href={`mailto:${brandConfig.email}`}
                    className="text-base lg:text-xl text-foreground hover:text-primary transition-colors"
                  >
                    {brandConfig.email}
                  </a>
                </div>

                <div
                  className={`transition-all duration-500 ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? "600ms" : "0ms" }}
                >
                  <span className="text-muted-foreground text-xs lg:text-sm uppercase tracking-widest mb-2 block">Telegram</span>
                  <a 
                    href={brandConfig.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base lg:text-xl text-foreground hover:text-primary transition-colors"
                  >
                    @cryptobridgekorea
                  </a>
                </div>

                <div
                  className={`transition-all duration-500 ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? "700ms" : "0ms" }}
                >
                  <span className="text-muted-foreground text-xs lg:text-sm uppercase tracking-widest mb-2 block">Office</span>
                  <p className="text-sm lg:text-lg text-muted-foreground">
                    {brandConfig.office}
                  </p>
                </div>

                <div 
                  className={`flex gap-3 pt-2 lg:pt-4 transition-all duration-500 ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? "800ms" : "0ms" }}
                >
                  <a
                    href={brandConfig.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-white/20 text-white text-xs lg:text-sm font-medium hover:bg-white/10 transition-colors"
                  >
                    Telegram
                  </a>
                  <a
                    href={brandConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-white/20 text-white text-xs lg:text-sm font-medium hover:bg-white/10 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Modal */}
      <LiveChatModal isOpen={isLiveChatOpen} onClose={() => setIsLiveChatOpen(false)} />
    </>
  );
};

export default Navbar;
