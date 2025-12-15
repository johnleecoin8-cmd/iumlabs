import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Send, Mail, ArrowUp } from "lucide-react";
import { brand, navigation } from "@/config/content";

const brandConfig = {
  name: brand.name,
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
  office: brand.address,
  phone: brand.phone,
};

const navLinks = navigation.links.map(link => ({ to: link.href, label: link.name }));


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[hsl(0,0%,4%)] text-white rounded-t-3xl">
      {/* Top Section - Have a Project? */}
      <div className="border-b border-white/[0.08]">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left - CTA */}
            <div>
              <h3 className="text-4xl md:text-5xl font-light mb-2">
                Have a <span className="serif-italic">Project?</span>
              </h3>
              <p className="text-3xl md:text-4xl font-light text-white/50">
                Contact Us
              </p>
            </div>

            {/* Right - Contact Methods */}
            <div className="grid sm:grid-cols-3 gap-6">
              {/* Email */}
              <a 
                href={`mailto:${brandConfig.email}`}
                className="group p-4 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
              >
                <p className="text-sm text-white/40 mb-2">e-mail:</p>
                <div className="flex items-center gap-2 text-white group-hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Send email</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>

              {/* Calendly */}
              <a 
                href="https://calendly.com/cryptobridgekorea"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
              >
                <p className="text-sm text-white/40 mb-2">calendly:</p>
                <div className="flex items-center gap-2 text-white group-hover:text-primary transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Book a meeting</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>

              {/* Telegram */}
              <a 
                href={brandConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
              >
                <p className="text-sm text-white/40 mb-2">telegram:</p>
                <div className="flex items-center gap-2 text-white group-hover:text-primary transition-colors">
                  <Send className="w-4 h-4" />
                  <span className="text-sm">Start live chat</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - 3 Column Layout */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Column 1 - About Us */}
          <div>
            <h4 className="text-sm text-white/40 uppercase tracking-wider mb-6">about us</h4>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Since 2023, CryptoBridge Korea has been the trusted partner for Web3 projects 
              looking to establish a presence in the Korean market. Founded by ex-KuCoin and 
              ex-Binance executives.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href={brandConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
              >
                <Send className="w-4 h-4" />
              </a>
              <a 
                href={brandConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Menu */}
          <div>
            <h4 className="text-sm text-white/40 uppercase tracking-wider mb-6">menu</h4>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-white/60 hover:text-white transition-colors text-sm hover:translate-x-1 transform duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 - Info */}
          <div>
            <h4 className="text-sm text-white/40 uppercase tracking-wider mb-6">info</h4>
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-white/40 text-xs mb-1">Email</p>
                <a 
                  href={`mailto:${brandConfig.email}`}
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  {brandConfig.email}
                </a>
              </div>
              
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-white/40 text-xs mb-1">Office</p>
                <p className="text-white/70 text-sm">
                  {brandConfig.office}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-white/40 text-xs mb-1">Telegram</p>
                <a 
                  href={brandConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  @cryptobridgekorea
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 mt-12 border-t border-white/[0.06]">
          {/* Left - Office & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-white/40">
            <span>{brandConfig.office}</span>
            <span className="hidden md:block">•</span>
            <span>© {new Date().getFullYear()} {brandConfig.name}</span>
          </div>

          {/* Right - Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] text-sm text-white/60 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 group"
          >
            <span>back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Giant Brand Name */}
      <div className="container mx-auto px-6 pb-12 overflow-hidden">
        <h2 className="text-[4rem] md:text-[8rem] lg:text-[12rem] font-light leading-none tracking-tight text-center whitespace-nowrap">
          <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>
            {brandConfig.name}
          </span>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
