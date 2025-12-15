import { Link } from "react-router-dom";
import { ArrowUp, Mail, Send, Calendar, MapPin, Phone } from "lucide-react";
import { brand, navigation } from "@/config/content";

const navLinks = navigation.links.map(link => ({ to: link.href, label: link.name }));

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0B] border-t border-white/10 rounded-t-3xl">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-20">
        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1 - Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white inline-block mb-4">
              CryptoBridge<span className="text-primary">Korea</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Your Web3 Go-To-Market Partner in Korea. We bridge global projects to the Korean market with proven strategies.
            </p>
            
            {/* Social/Contact Buttons */}
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${brand.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              <a
                href={brand.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm"
              >
                <Send className="w-4 h-4" />
                Telegram
              </a>
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className="block text-white/50 hover:text-white hover:translate-x-1 transition-all text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-white/50 text-sm">{brand.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`mailto:${brand.email}`} className="text-white/50 hover:text-white transition-colors text-sm">
                  {brand.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`tel:${brand.phone}`} className="text-white/50 hover:text-white transition-colors text-sm">
                  {brand.phone}
                </a>
              </div>
              
              {/* CTA Button */}
              <a
                href="https://calendly.com/cryptobridgekorea/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all text-sm font-medium mt-2"
              >
                <Calendar className="w-4 h-4" />
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
            
            <p className="text-sm text-white/40">
              Seoul, South Korea
            </p>
            
            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
            >
              Back to top
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
