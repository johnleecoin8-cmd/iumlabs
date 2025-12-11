import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Send, Calendar, Mail, MapPin, ArrowUpRight, Linkedin, Phone } from "lucide-react";
import { brand, navigation } from "@/config/content";
import LiveChatModal from "./LiveChatModal";
import CalendlyButton from "./CalendlyButton";

const brandConfig = {
  name: brand.name,
  email: brand.email,
  phone: brand.phone,
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

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-background transition-all duration-500 overflow-y-auto ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 py-4 relative z-10">
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

        <div className="container mx-auto px-6 pt-12 md:pt-20 pb-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Navigation Links */}
            <div>
              <span className="text-muted-foreground text-sm uppercase tracking-widest mb-8 block">Navigation</span>
              <nav className="space-y-2 md:space-y-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`group flex items-center gap-4 text-4xl md:text-6xl lg:text-7xl font-bold text-foreground hover:text-primary transition-all duration-300 ${
                      isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Enhanced Contact & CTA Section */}
            <div className="space-y-8 md:space-y-10">
              {/* Primary CTA - Book Consultation */}
              <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl p-6 md:p-8 border border-primary/20 relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <span className="text-primary text-sm font-medium uppercase tracking-wider mb-3 block">Ready to grow?</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Let's discuss your<br />
                    <span className="text-primary">Korean market entry</span>
                  </h3>
                  <p className="text-white/60 text-sm mb-6 max-w-sm">
                    Book a free 30-minute consultation to explore how we can help your project succeed in Korea.
                  </p>
                  <CalendlyButton 
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center gap-3 px-6 py-4 bg-primary text-white rounded-full font-medium transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_30px_hsl(217,91%,60%,0.4)]"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Book Free Consultation</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </CalendlyButton>
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Card */}
                <a 
                  href={`mailto:${brandConfig.email}`}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">Email</span>
                    <span className="text-white text-sm font-medium group-hover:text-primary transition-colors">{brandConfig.email}</span>
                  </div>
                </a>

                {/* Telegram Card */}
                <a 
                  href={brandConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">Telegram</span>
                    <span className="text-white text-sm font-medium group-hover:text-primary transition-colors">@cryptobridgekorea</span>
                  </div>
                </a>

                {/* Phone Card */}
                <a 
                  href={`tel:${brandConfig.phone?.replace(/\s/g, '')}`}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">Phone</span>
                    <span className="text-white text-sm font-medium group-hover:text-primary transition-colors">{brandConfig.phone}</span>
                  </div>
                </a>

                {/* Office Card */}
                <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">Office</span>
                    <span className="text-white/70 text-sm">{brandConfig.office}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-4">
                <span className="text-white/40 text-sm mr-2">Follow us:</span>
                <a
                  href={brandConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </a>
                <a
                  href={brandConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
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
