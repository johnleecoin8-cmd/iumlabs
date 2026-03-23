import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import { brand } from "@/config/content";
import TermsModal from "./modals/TermsModal";
import PrivacyModal from "./modals/PrivacyModal";
import MissionModal from "./modals/MissionModal";
import logoImage from "@/assets/logo.png";

const brandConfig = {
  name: brand.name,
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
  office: brand.address,
};

const footerColumns = [
  {
    title: "Services",
    links: [
      { name: "Web3 GTM Strategy", href: "/services/gtm" },
      { name: "PR & Media", href: "/services/pr" },
      { name: "Influencer & KOL", href: "/services/influencer" },
      { name: "Community", href: "/services/community" },
    ],
  },
  {
    title: "Growth",
    links: [
      { name: "SEO & Paid Ads", href: "/services/seo-ads" },
      { name: "Branding & Web", href: "/services/branding" },
      { name: "Offline Events", href: "/services/offline-event" },
      { name: "Deep Research", href: "/services/deep-research" },
    ],
  },
  {
    title: "Explore",
    links: [
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
      { name: "K-Leaderboard", href: "/k-leaderboard" },
      { name: "Careers", href: "/jobs" },
    ],
  },
];

const FooterLinksSection = () => {
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [missionOpen, setMissionOpen] = useState(false);

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
      <section className="bg-black text-white border-t border-white/[0.06]">
        <div className="w-full px-6 lg:px-10 py-12 md:py-16">
          {/* Main grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-6 lg:gap-10">
            {/* Brand column */}
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <img
                  src={logoImage}
                  alt="ium Labs"
                  className="w-7 h-7 rounded-lg object-contain"
                />
                <span className="text-base font-semibold text-white">
                  {brandConfig.name}
                </span>
              </Link>
              <p className="text-sm text-white/30 leading-relaxed max-w-[280px] mb-6">
                Korea's Web3 marketing agency. Helping blockchain projects launch and grow in the Korean market.
              </p>

              {/* Social */}
              <div className="flex items-center gap-3">
                <a
                  href={brandConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200"
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href={brandConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                {brandConfig.email && (
                  <a
                    href={`mailto:${brandConfig.email}`}
                    className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Link columns */}
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs uppercase tracking-[0.15em] text-white/25 mb-5 font-medium">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Legal + Address */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] text-white/25 mb-5 font-medium">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setPrivacyOpen(true)}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setTermsOpen(true)}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

              <div className="mt-6 flex items-start gap-2 text-white/15 text-xs leading-relaxed">
                <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                <span>{brandConfig.office}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <MissionModal isOpen={missionOpen} onClose={() => setMissionOpen(false)} />
    </>
  );
};

export default FooterLinksSection;
