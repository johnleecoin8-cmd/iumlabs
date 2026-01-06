import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import { brand } from "@/config/content";
import TermsModal from "./modals/TermsModal";
import PrivacyModal from "./modals/PrivacyModal";
import MissionModal from "./modals/MissionModal";
const brandConfig = {
  name: brand.name,
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
  office: brand.address
};
const footerLinks = {
  research: {
    title: "Research",
    links: [{
      name: "Proprietary Insights",
      href: "/research"
    }, {
      name: "Market Analytics",
      href: "/research"
    }, {
      name: "Reports",
      href: "/research"
    }]
  },
  marketing: {
    title: "Marketing",
    links: [{
      name: "GTM Strategy",
      href: "/services/gtm-strategy"
    }, {
      name: "Influencer Marketing",
      href: "/services/influencer"
    }, {
      name: "Community Growth",
      href: "/services/community"
    }]
  },
  about: {
    title: "About",
    links: [{
      name: "Our Mission",
      href: "/#why-choose-us"
    }, {
      name: "Contact Us",
      href: "/contact"
    }, {
      name: "Privacy Policy",
      href: "/privacy"
    }, {
      name: "Terms of Service",
      href: "/terms"
    }]
  }
};
const FooterLinksSection = () => {
  const currentYear = new Date().getFullYear();
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [missionOpen, setMissionOpen] = useState(false);

  // ESC key to close modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setTermsOpen(false);
        setPrivacyOpen(false);
        setMissionOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const renderAboutLink = (link: { name: string; href: string }) => {
    if (link.name === "Contact Us") {
      return (
        <Link to={link.href} className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block">
          {link.name}
        </Link>
      );
    }
    if (link.name === "Terms of Service") {
      return (
        <button 
          onClick={() => setTermsOpen(true)} 
          className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block text-left"
        >
          {link.name}
        </button>
      );
    }
    if (link.name === "Privacy Policy") {
      return (
        <button 
          onClick={() => setPrivacyOpen(true)} 
          className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block text-left"
        >
          {link.name}
        </button>
      );
    }
    if (link.name === "Our Mission") {
      return (
        <button 
          onClick={() => setMissionOpen(true)} 
          className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block text-left"
        >
          {link.name}
        </button>
      );
    }
    return (
      <Link to={link.href} className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block">
        {link.name}
      </Link>
    );
  };

  return (
    <>
      <section className="bg-background text-foreground border-t border-border w-full">
        <div className="w-full px-6 lg:px-10 py-6 md:py-8">
          {/* Navigation Links Grid - SEO Sitemap Footer */}
          <nav className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 md:py-10 border-b border-border" aria-label="Footer navigation">
            {/* Research Column */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-mono">
                {footerLinks.research.title}
              </h4>
              <ul className="space-y-3">
                {footerLinks.research.links.map(link => <li key={link.name}>
                    <Link to={link.href} className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            {/* Marketing Column */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-mono">
                {footerLinks.marketing.title}
              </h4>
              <ul className="space-y-3">
                {footerLinks.marketing.links.map(link => <li key={link.name}>
                    <Link to={link.href} className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-mono">
                {footerLinks.about.title}
              </h4>
              <ul className="space-y-3">
                {footerLinks.about.links.map(link => (
                  <li key={link.name}>
                    {renderAboutLink(link)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Column */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-mono">
                Contact
              </h4>
              <ul className="space-y-4">
                <li>
                  <a href={`mailto:${brandConfig.email}`} className="group flex items-start gap-3 text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm">
                    <Mail className="w-4 h-4 mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span>{brandConfig.email}</span>
                  </a>
                </li>
                <li>
                  <a href={brandConfig.telegram} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm">
                    <Send className="w-4 h-4 mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span>Telegram</span>
                  </a>
                </li>
                <li>
                  <a href={brandConfig.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm">
                    <ArrowUpRight className="w-4 h-4 mt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground/70 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{brandConfig.office}</span>
                </li>
              </ul>
            </div>
          </nav>

          {/* Bottom Row - Copyright & Social */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 py-0">
            <p className="text-muted-foreground/60 text-sm">
              © {currentYear} {brandConfig.name}. All rights reserved.
            </p>
            
          </div>
        </div>
      </section>

      {/* Modals */}
      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <MissionModal isOpen={missionOpen} onClose={() => setMissionOpen(false)} />
    </>
  );
};
export default FooterLinksSection;