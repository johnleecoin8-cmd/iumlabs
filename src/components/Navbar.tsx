import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Send, Calendar } from "lucide-react";
import { brand, navigation } from "@/config/content";
import LiveChatModal from "./LiveChatModal";
import logoImage from "@/assets/logo.png";

const brandConfig = {
  name: brand.name,
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
  office: brand.address,
};

const navLinks = navigation.links.map(link => ({ to: link.href, label: link.name }));

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);

  return (
    <>
      {/* Main Navbar - Separated pill sections like Lunar Strategy */}
      <nav className="fixed top-4 left-4 right-4 z-50">
        <div className="flex items-center gap-2">
          {/* Logo Section - Separate pill */}
          <Link 
            to="/" 
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-black/10 bg-white backdrop-blur-md transition-all duration-300 hover:bg-gray-50 hover:border-black/20 hover:scale-[1.02]"
          >
            <img src={logoImage} alt="CryptoBridge Logo" className="w-7 h-7 rounded-lg object-contain" />
            <span className="text-base font-semibold text-gray-900">{brandConfig.name}</span>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Center - Email - Separate pill */}
          <div className="hidden lg:flex items-center gap-3 px-5 py-3 rounded-full border border-black/10 bg-white backdrop-blur-md transition-all duration-300 hover:bg-gray-50 hover:border-black/20">
            <span className="text-gray-400 text-sm">e-mail</span>
            <a 
              href={`mailto:${brandConfig.email}`} 
              className="text-gray-900 text-sm transition-colors duration-300 hover:text-primary"
            >
              {brandConfig.email}
            </a>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right side buttons - Each as separate pill */}
          <div className="flex items-center gap-2">
            {/* Live Chat Button */}
            <button
              onClick={() => setIsLiveChatOpen(true)}
              className="hidden md:flex items-center gap-2 px-5 py-3 rounded-full border border-black/10 bg-white backdrop-blur-md text-gray-900 text-sm font-medium transition-all duration-300 hover:bg-gray-50 hover:border-primary/50 hover:scale-[1.02] hover:shadow-[0_0_20px_hsl(217,91%,60%,0.2)]"
            >
              <Send className="w-4 h-4 text-primary transition-transform duration-300 hover:rotate-12" />
              <span>Start Live Chat</span>
            </button>

            {/* Book a Meeting Button */}
            <a
              href="https://calendly.com/cryptobridgekorea"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-3 rounded-full border border-black/10 bg-white backdrop-blur-md text-gray-900 text-sm font-medium transition-all duration-300 hover:bg-gray-50 hover:border-primary/50 hover:scale-[1.02] hover:shadow-[0_0_20px_hsl(217,91%,60%,0.2)]"
            >
              <Calendar className="w-4 h-4 text-primary transition-transform duration-300" />
              <span>Book a Meeting</span>
            </a>

            {/* Menu Button - Dark pill */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-900 text-white text-sm font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-[1.05] hover:shadow-lg"
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
                <img src={logoImage} alt="CryptoBridge Logo" className="w-8 h-8 rounded-lg object-contain" />
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
