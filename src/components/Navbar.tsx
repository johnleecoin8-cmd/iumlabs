import { useState } from "react";
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
  const {
    isCollapsed
  } = useSidebarState();
  return <>
      {/* Mobile Top Navigation Bar */}
      <nav className="fixed top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 z-[60] md:hidden">
        <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="Ium Labs" className="w-8 h-8 rounded-lg object-contain" />
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
      <div className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`} onClick={() => setIsMenuOpen(false)} />

      {/* Top Panel Menu - slides from top */}
      <div className={`fixed top-0 left-0 right-0 h-[85vh] sm:h-[75vh] lg:h-[60vh] z-[101] bg-gradient-to-b from-background via-background to-primary/5 transition-all duration-500 ease-out ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <div className="h-full flex flex-col relative z-10">
          {/* Header */}
          <div className="flex-shrink-0 container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <img src={logoImage} alt="Ium Labs Logo" className="w-8 h-8 rounded-lg object-contain" />
                <span className="text-lg font-semibold text-foreground">{brandConfig.name}</span>
              </Link>
              
              <button onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-secondary text-foreground text-sm font-medium transition-all duration-300 hover:bg-secondary/80">
                <span>close</span>
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <span className="absolute w-4 h-0.5 bg-current rotate-45 transition-transform duration-300 group-hover:rotate-[135deg]" />
                  <span className="absolute w-4 h-0.5 bg-current -rotate-45 transition-transform duration-300 group-hover:rotate-[45deg]" />
                </div>
              </button>
            </div>
          </div>

          {/* Content - flex-1 to fill remaining space */}
          <div className="flex-1 container mx-auto px-6 py-4 lg:py-8 overflow-y-auto">
            <div className="h-full grid md:grid-cols-2 gap-8 lg:gap-16 content-center">
              {/* Navigation Links */}
              <div className="flex flex-col justify-center">
                <span className={`text-muted-foreground text-xs lg:text-sm uppercase tracking-widest mb-4 lg:mb-6 block transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`} style={{
                transitionDelay: isMenuOpen ? "200ms" : "0ms"
              }}>
                  Navigation
                </span>
                <nav className="space-y-2 lg:space-y-3">
                  {navLinks.map((link, index) => <div key={link.to}>
                      <Link to={link.to} onClick={() => setIsMenuOpen(false)} className={`block text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground hover:text-primary transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`} style={{
                    transitionDelay: isMenuOpen ? `${300 + index * 80}ms` : "0ms"
                  }}>
                        {link.label}
                      </Link>
                    </div>)}
                  {/* Contact link - only in mobile menu since removed from main nav */}
                  <div>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} className={`block text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground hover:text-primary transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`} style={{
                      transitionDelay: isMenuOpen ? `${300 + navLinks.length * 80}ms` : "0ms"
                    }}>
                      Contact
                    </Link>
                  </div>
                </nav>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col justify-center space-y-4 lg:space-y-8">
                <div className={`transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`} style={{
                transitionDelay: isMenuOpen ? "500ms" : "0ms"
              }}>
                  <span className="text-muted-foreground text-xs lg:text-sm uppercase tracking-widest mb-2 block">Get in touch</span>
                  <a href={`mailto:${brandConfig.email}`} className="text-base lg:text-xl text-foreground hover:text-primary transition-colors">
                    {brandConfig.email}
                  </a>
                </div>

                <div className={`transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`} style={{
                transitionDelay: isMenuOpen ? "600ms" : "0ms"
              }}>
                  <span className="text-muted-foreground text-xs lg:text-sm uppercase tracking-widest mb-2 block">Telegram</span>
                  <a href={brandConfig.telegram} target="_blank" rel="noopener noreferrer" className="text-base lg:text-xl text-foreground hover:text-primary transition-colors">
                    @iumlabs
                  </a>
                </div>

                <div className={`transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`} style={{
                transitionDelay: isMenuOpen ? "700ms" : "0ms"
              }}>
                  <span className="text-muted-foreground text-xs lg:text-sm uppercase tracking-widest mb-2 block">Office</span>
                  <p className="text-sm lg:text-lg text-muted-foreground">
                    {brandConfig.office}
                  </p>
                </div>

                <div className={`flex gap-3 pt-2 lg:pt-4 transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`} style={{
                transitionDelay: isMenuOpen ? "800ms" : "0ms"
              }}>
                  <a href={brandConfig.telegram} target="_blank" rel="noopener noreferrer" className="px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-border text-foreground text-xs lg:text-sm font-medium hover:bg-secondary hover:border-foreground/30 transition-all duration-300">
                    Telegram
                  </a>
                  <a href={brandConfig.linkedin} target="_blank" rel="noopener noreferrer" className="px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-border text-foreground text-xs lg:text-sm font-medium hover:bg-secondary hover:border-foreground/30 transition-all duration-300">
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
    </>;
};
export default Navbar;