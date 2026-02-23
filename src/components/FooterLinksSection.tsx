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
  marketing: {
    title: "Marketing",
    links: [{
      name: "Web3 GTM Strategy",
      href: "/services"
    }, {
      name: "PR & Media Coverage",
      href: "/services/pr"
    }, {
      name: "Influencer & KOL Marketing",
      href: "/services/influencer"
    }]
  },
  growth: {
    title: "Growth",
    links: [{
      name: "Community Management",
      href: "/services/community"
    }, {
      name: "Offline Events Korea",
      href: "/services/offline-event"
    }, {
      name: "Branding & Website",
      href: "/services/branding"
    }, {
      name: "SEO & Paid Ads",
      href: "/services/seo-ads"
    }]
  },
  company: {
    title: "Company",
    links: [{
      name: "Case Studies & Portfolio",
      href: "/projects"
    }, {
      name: "Blog",
      href: "/blog"
    }, {
      name: "Careers",
      href: "/jobs"
    }, {
      name: "Contact Us",
      href: "/contact"
    }]
  },
  legal: {
    title: "Legal",
    links: [{
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

  return (
    <>
      <section className="bg-background text-foreground border-t border-border w-full">
        <div className="w-full px-6 lg:px-10 py-6 md:py-8">
          {/* Navigation Links Grid - SEO Sitemap Footer */}
          <nav className="py-8 md:py-10 border-b border-border" aria-label="Footer navigation">
            {/* Grid: 2 cols mobile, 5 cols desktop */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
              {/* Marketing Column */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 md:mb-6 font-mono">
                  {footerLinks.marketing.title}
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  {footerLinks.marketing.links.map((link) =>
                  <li key={link.name}>
                      <Link to={link.href} className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block">
                        {link.name}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Growth Column */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 md:mb-6 font-mono">
                  {footerLinks.growth.title}
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  {footerLinks.growth.links.map((link) =>
                  <li key={link.name}>
                      <Link to={link.href} className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block">
                        {link.name}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Company Column + Legal on mobile */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 md:mb-6 font-mono">
                  {footerLinks.company.title}
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  {footerLinks.company.links.map((link) =>
                  <li key={link.name}>
                      <Link to={link.href} className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block">
                        {link.name}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Legal Column - Mobile only, right side */}
              <div className="md:hidden">
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">
                  {footerLinks.legal.title}
                </h4>
                <ul className="space-y-2">
                  {footerLinks.legal.links.map((link) =>
                  <li key={link.name}>
                      {link.name === "Terms of Service" ?
                    <button
                      onClick={() => setTermsOpen(true)}
                      className="text-muted-foreground hover:text-foreground transition-all duration-300 text-sm inline-block text-left">

                          {link.name}
                        </button> :
                    link.name === "Privacy Policy" ?
                    <button
                      onClick={() => setPrivacyOpen(true)}
                      className="text-muted-foreground hover:text-foreground transition-all duration-300 text-sm inline-block text-left">

                          {link.name}
                        </button> :

                    <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-all duration-300 text-sm inline-block">
                          {link.name}
                        </Link>
                    }
                    </li>
                  )}
                </ul>
              </div>

              {/* Connect Column - Hidden on mobile */}
              <div className="hidden md:block">
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-mono">
                  Connect
                </h4>
                <ul className="space-y-3">
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
                </ul>
              </div>

              {/* Legal + Address Column - Hidden on mobile */}
              <div className="hidden md:block">
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-mono">
                  {footerLinks.legal.title}
                </h4>
                <ul className="space-y-3">
                  {footerLinks.legal.links.map((link) =>
                  <li key={link.name}>
                      {link.name === "Terms of Service" ?
                    <button
                      onClick={() => setTermsOpen(true)}
                      className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block text-left">

                          {link.name}
                        </button> :
                    link.name === "Privacy Policy" ?
                    <button
                      onClick={() => setPrivacyOpen(true)}
                      className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block text-left">

                          {link.name}
                        </button> :

                    <Link to={link.href} className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block">
                          {link.name}
                        </Link>
                    }
                    </li>
                  )}
                </ul>
                <div className="mt-6 flex items-start gap-3 text-muted-foreground/70 text-xs">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{brandConfig.office}</span>
                </div>
              </div>

              {/* Mobile Connect Row - spans full width */}
              <div className="col-span-2 md:hidden mt-4 pt-6 border-t border-border">
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">
                  Connect
                </h4>
                <div className="flex flex-wrap gap-4">
                  <a href={`mailto:${brandConfig.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                  <a href={brandConfig.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 text-sm">
                    <Send className="w-4 h-4" />
                    <span>Telegram</span>
                  </a>
                  <a href={brandConfig.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
                <div className="mt-4 flex items-start gap-2 text-muted-foreground/60 text-xs">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{brandConfig.office}</span>
                </div>
              </div>
            </div>
          </nav>

          {/* Bottom Row - Copyright & Social */}
          





        </div>
      </section>

      {/* Modals */}
      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <MissionModal isOpen={missionOpen} onClose={() => setMissionOpen(false)} />
    </>);

};
export default FooterLinksSection;