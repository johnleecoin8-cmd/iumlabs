import { Link } from "react-router-dom";
import { brand } from "@/config/content";

const sections = [
  {
    title: "Launch in Korea",
    links: [
      { name: "GTM Strategy", href: "/services/gtm" },
      { name: "KOL & Influencer", href: "/services/influencer" },
      { name: "Community Management", href: "/services/community" },
      { name: "PR & Media", href: "/services/pr" },
    ],
  },
  {
    title: "Grow Your Presence",
    links: [
      { name: "AMA Hosting", href: "/services/ama" },
      { name: "Offline Events", href: "/services/offline-event" },
      { name: "SEO & Paid Ads", href: "/services/seo-ads" },
      { name: "Deep Research", href: "/services/deep-research" },
    ],
  },
  {
    title: "See Our Work",
    links: [
      { name: "Case Studies", href: "/projects" },
      { name: "Blog & Research", href: "/blog" },
      { name: "Careers", href: "/jobs" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms", href: "/terms" },
      { name: "Privacy", href: "/privacy" },
      { name: "Transparency", href: "/transparency" },
    ],
  },
];

const FooterLinksSection = () => {
  return (
    <section className="border-t border-white/[0.06] bg-[#0A0A0A]">
      <div className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-white/30">
            <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              Telegram
            </a>
            <a href={brand.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              LinkedIn
            </a>
            <a href={brand.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              X
            </a>
          </div>
          <span className="text-xs text-white/20">{brand.address}</span>
        </div>
      </div>
    </section>
  );
};

export default FooterLinksSection;
