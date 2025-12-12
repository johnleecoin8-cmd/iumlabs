import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Send, Calendar } from "lucide-react";
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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);

  return (
    <>
      {/* Main Navbar - Separated pill sections like Lunar Strategy */}
      <nav className="fixed top-3 left-3 right-3 z-50">
        <div className="flex items-center gap-2">
          {/* Logo Section - Separate pill */}
          <Link 
            to="/" 
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-[hsl(0,0%,4%,0.95)] backdrop-blur-md transition-all duration-300 hover:bg-white/5 hover:border-white/20 hover:scale-[1.02]"
          >
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
              <div className="w-3.5 h-3.5 bg-background rounded-sm"></div>
            </div>
            <span className="text-base font-semibold text-white">{brandConfig.name}</span>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Center - Email - Separate pill */}
          <div className="hidden lg:flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-[hsl(0,0%,4%,0.95)] backdrop-blur-md transition-all duration-300 hover:bg-white/5 hover:border-white/20">
            <span className="text-white/40 text-sm">e-mail</span>
            <a 
              href={`mailto:${brandConfig.email}`} 
              className="text-white text-sm transition-colors duration-300 hover:text-primary"
            >
              {brandConfig.email}
            </a>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right side buttons - Each as separate pill */}
          <div className="flex items-center gap-2">
            {/* Live Chat Button - Light pill with blue icon */}
            <button
              onClick={() => setIsLiveChatOpen(true)}
              className="hidden md:flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-[hsl(0,0%,4%,0.95)] backdrop-blur-md text-white text-sm font-medium transition-all duration-300 hover:bg-white/5 hover:border-primary/50 hover:scale-[1.02] hover:shadow-[0_0_20px_hsl(217,91%,60%,0.2)]"
            >
              <Send className="w-4 h-4 text-primary transition-transform duration-300 hover:rotate-12" />
              <span>Start Live Chat</span>
            </button>

            {/* Book a Meeting Button - Light pill with blue icon */}
            <a
              href="https://calendly.com/cryptobridgekorea"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-[hsl(0,0%,4%,0.95)] backdrop-blur-md text-white text-sm font-medium transition-all duration-300 hover:bg-white/5 hover:border-primary/50 hover:scale-[1.02] hover:shadow-[0_0_20px_hsl(217,91%,60%,0.2)]"
            >
              <Calendar className="w-4 h-4 text-primary transition-transform duration-300" />
              <span>Book a Meeting</span>
            </a>

            {/* Menu Button - White pill */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-background text-sm font-medium transition-all duration-300 hover:bg-white/90 hover:scale-[1.05] hover:shadow-[0_0_25px_hsl(0,0%,100%,0.3)]"
            >
              <span className="hidden sm:inline">menu</span>
              <Menu className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>
        </div>
      </nav>

      {/* Half Screen Menu - Top */}
      <div
        className={`fixed top-0 left-0 right-0 z-[100] bg-background/98 backdrop-blur-xl border-b border-white/10 transition-all duration-500 ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{ height: '50vh' }}
      >
        <div className="container mx-auto px-6 py-4">
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

        <div className="container mx-auto px-6 pt-6 h-[calc(50vh-80px)] overflow-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Navigation Links */}
            <div>
              <span className="text-muted-foreground text-xs uppercase tracking-widest mb-4 block">Navigation</span>
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-3xl md:text-4xl font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div>
                <span className="text-muted-foreground text-xs uppercase tracking-widest mb-2 block">Get in touch</span>
                <a 
                  href={`mailto:${brandConfig.email}`}
                  className="text-lg text-foreground hover:text-primary transition-colors"
                >
                  {brandConfig.email}
                </a>
              </div>

              <div>
                <span className="text-muted-foreground text-xs uppercase tracking-widest mb-2 block">Telegram</span>
                <a 
                  href={brandConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-foreground hover:text-primary transition-colors"
                >
                  @cryptobridgekorea
                </a>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={brandConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Telegram
                </a>
                <a
                  href={brandConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 z-[99] bg-black/50 transition-opacity duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Live Chat Modal */}
      <LiveChatModal isOpen={isLiveChatOpen} onClose={() => setIsLiveChatOpen(false)} />
    </>
  );
};

export default Navbar;
