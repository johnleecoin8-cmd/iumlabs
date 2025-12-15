import { Link } from "react-router-dom";
import { ArrowUp, Mail, Send, Calendar } from "lucide-react";
import { brand, navigation } from "@/config/content";

const navLinks = navigation.links.map(link => ({ to: link.href, label: link.name }));

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0B] border-t border-white/10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">
        {/* CTA Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 pb-12 border-b border-white/10">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Have a Project?
            </h3>
            <p className="text-white/50">Let's make it happen together.</p>
          </div>
          
          {/* Contact Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.03] border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </a>
            <a
              href="https://calendly.com/cryptobridgekorea/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.03] border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book a Call
            </a>
            <a
              href={brand.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-all"
            >
              <Send className="w-4 h-4" />
              Telegram
            </a>
          </div>
        </div>

        {/* Links Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white">
              CryptoBridge<span className="text-primary">Korea</span>
            </Link>
            <p className="text-sm text-white/40 mt-2">
              Your Web3 Marketing Partner in Korea
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-6 md:gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
          >
            Back to top
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
            <p>Seoul, South Korea</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
