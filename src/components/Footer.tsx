import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, ArrowUp, MapPin, Phone, Send } from "lucide-react";
import { brand, navigation } from "@/config/content";

const brandConfig = {
  name: brand.name,
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
  office: brand.address,
  phone: brand.phone
};

// Footer link categories for SEO sitelinks - Research & Marketing focused
const footerLinks = {
  research: {
    title: "Research",
    links: [
      { name: "Proprietary Insights", href: "/research" },
      { name: "Market Analytics", href: "/research" },
      { name: "Reports", href: "/research" },
    ]
  },
  marketing: {
    title: "Marketing",
    links: [
      { name: "GTM Strategy", href: "/services/gtm-strategy" },
      { name: "Influencer Marketing", href: "/services/influencer" },
      { name: "Community Growth", href: "/services/community" },
    ]
  },
  about: {
    title: "About",
    links: [
      { name: "Our Mission", href: "/#why-choose-us" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ]
  }
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Top Row - CTA + Back to Top */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/5">
          <div>
            <h3 className="text-2xl md:text-3xl font-light mb-2">Have a project in mind?</h3>
            <p className="text-white/50">Let's discuss how we can help you succeed in Korea.</p>
          </div>
          <div className="flex gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <button
              onClick={scrollToTop}
              className="p-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Links Grid - SEO Sitemap Footer */}
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/5" aria-label="Footer navigation">
          {/* Research Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-6 font-mono">
              {footerLinks.research.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.research.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketing Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-6 font-mono">
              {footerLinks.marketing.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.marketing.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-6 font-mono">
              {footerLinks.about.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-6 font-mono">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`mailto:${brandConfig.email}`}
                  className="flex items-start gap-3 text-white/70 hover:text-white transition-colors text-sm group"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{brandConfig.email}</span>
                </a>
              </li>
              <li>
                <a 
                  href={brandConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/70 hover:text-white transition-colors text-sm group"
                >
                  <Send className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Telegram</span>
                </a>
              </li>
              <li>
                <a 
                  href={brandConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/70 hover:text-white transition-colors text-sm group"
                >
                  <ArrowUpRight className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{brandConfig.office}</span>
              </li>
            </ul>
          </div>
        </nav>

        {/* Bottom Row - Copyright & Social */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-white/30 text-sm">
            © {currentYear} {brandConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a 
              href={brandConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a 
              href={brandConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              Telegram
            </a>
            <a 
              href="https://twitter.com/iumlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Giant Brand Name */}
      <div className="container mx-auto px-6 pb-12 overflow-hidden">
        <h2 className="text-[4rem] md:text-[8rem] lg:text-[12rem] font-light leading-none tracking-tight text-center whitespace-nowrap">
          <span className="text-transparent" style={{
            WebkitTextStroke: '1px rgba(255,255,255,0.15)'
          }}>
            {brandConfig.name}
          </span>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
