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
      {/* Main Navbar - Transparent on dark hero */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-background rounded-sm"></div>
              </div>
              <span className="text-lg font-semibold text-white">{brandConfig.name}</span>
            </Link>

            {/* Center - Email */}
            <div className="hidden lg:flex items-center border border-white/20 rounded-full px-6 py-2">
              <span className="text-white/50 text-sm">e-mail</span>
              <a 
                href={`mailto:${brandConfig.email}`} 
                className="ml-3 text-white text-sm hover:text-primary transition-colors"
              >
                {brandConfig.email}
              </a>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
              {/* Live Chat Button - Blue with Telegram icon */}
              <button
                onClick={() => setIsLiveChatOpen(true)}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium transition-all hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
                <span>Start Live Chat</span>
              </button>

              {/* Book a Meeting Button - Dark outlined */}
              <a
                href="https://calendly.com/cryptobridgekorea"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-background/80 text-white text-sm font-medium transition-all hover:bg-background"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Meeting</span>
              </a>

              {/* Menu Button - Dark pill */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-800 text-white text-sm font-medium transition-all hover:bg-zinc-700"
              >
                <span className="hidden sm:inline">menu</span>
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-background transition-all duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
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

        <div className="container mx-auto px-6 pt-20">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Navigation Links */}
            <div>
              <span className="text-muted-foreground text-sm uppercase tracking-widest mb-8 block">Navigation</span>
              <nav className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-5xl md:text-7xl font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <span className="text-muted-foreground text-sm uppercase tracking-widest mb-4 block">Get in touch</span>
                <a 
                  href={`mailto:${brandConfig.email}`}
                  className="text-2xl text-foreground hover:text-primary transition-colors"
                >
                  {brandConfig.email}
                </a>
              </div>

              <div>
                <span className="text-muted-foreground text-sm uppercase tracking-widest mb-4 block">Telegram</span>
                <a 
                  href={brandConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-foreground hover:text-primary transition-colors"
                >
                  @cryptobridgekorea
                </a>
              </div>

              <div>
                <span className="text-muted-foreground text-sm uppercase tracking-widest mb-4 block">Office</span>
                <p className="text-xl text-muted-foreground">
                  {brandConfig.office}
                </p>
              </div>

              <div className="flex gap-4 pt-8">
                <a
                  href={brandConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Telegram
                </a>
                <a
                  href={brandConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  LinkedIn
                </a>
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
