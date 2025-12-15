import { Link } from "react-router-dom";
import { ArrowUp, Mail, Calendar, Send, ArrowUpRight } from "lucide-react";
import { brand, navigation } from "@/config/content";

const navLinks = navigation.links.map(link => ({ to: link.href, label: link.name }));

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0B]">
      {/* Top CTA Section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left - Text */}
          <div>
            <h3 className="text-3xl md:text-4xl font-light text-white mb-2">
              Have a <span className="italic">Project?</span>
            </h3>
            <p className="text-2xl md:text-3xl text-white/40">Contact Us</p>
          </div>
          
          {/* Right - Contact Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${brand.email}`}
              className="flex flex-col items-start px-5 py-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-all min-w-[140px]"
            >
              <span className="text-white/40 text-xs mb-2">e-mail:</span>
              <div className="flex items-center gap-2 text-white">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Send email</span>
              </div>
            </a>
            <a
              href="https://calendly.com/cryptobridgekorea/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start px-5 py-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-all min-w-[140px]"
            >
              <span className="text-white/40 text-xs mb-2">calendly:</span>
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Book a meeting</span>
              </div>
            </a>
            <a
              href={brand.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start px-5 py-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-all min-w-[140px]"
            >
              <span className="text-white/40 text-xs mb-2">telegram:</span>
              <div className="flex items-center gap-2 text-white">
                <Send className="w-4 h-4" />
                <span className="text-sm font-medium">Start live chat</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer - 3 Columns */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1 - About Us */}
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-wider mb-6">About Us</h4>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Since 2023, CryptoBridge Korea has been the trusted partner for Web3 projects looking to establish a presence in the Korean market. Founded by ex-KuCoin and ex-Binance executives.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={brand.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </a>
              <a
                href={brand.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Menu */}
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-wider mb-6">Menu</h4>
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 - Info */}
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-wider mb-6">Info</h4>
            <div className="space-y-4">
              {/* Email Card */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-white/40 text-xs mb-1">Email</p>
                <a href={`mailto:${brand.email}`} className="text-white text-sm hover:text-primary transition-colors">
                  {brand.email}
                </a>
              </div>

              {/* Office Card */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-white/40 text-xs mb-1">Office</p>
                <p className="text-white text-sm">{brand.address}</p>
              </div>

              {/* Telegram Card */}
              <a 
                href={brand.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group"
              >
                <p className="text-white/40 text-xs mb-1">Telegram</p>
                <div className="flex items-center gap-1 text-white text-sm">
                  @cryptobridgekorea
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm text-white/40">
              <span>{brand.address}</span>
              <span className="hidden md:inline">•</span>
              <span>© {new Date().getFullYear()} {brand.name}</span>
            </div>
            
            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all group"
            >
              back to top
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Giant Brand Watermark */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-8 overflow-hidden">
        <div className="text-[80px] md:text-[120px] lg:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/[0.03] to-transparent leading-none tracking-tighter select-none">
          CryptoBridge
        </div>
      </div>
    </footer>
  );
};

export default Footer;
