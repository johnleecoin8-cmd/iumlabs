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
      { name: "Company Deck", href: "/deck" },
    ],
  },
];

const FooterLinksSection = () => {
  return (
    <section className="border-t border-white/[0.06] bg-[#0A0A0A]">
      <div className="px-5 sm:px-6 lg:px-10 py-8 sm:py-14">
        {/* Mobile: 2-col compact links */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:hidden">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[10px] font-medium text-white/35 uppercase tracking-[0.15em] mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-[13px] text-white/50 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Desktop: 4-col grid */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">
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
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-xs text-white/40">
            <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              Telegram
            </a>
            <a href={brand.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              LinkedIn
            </a>
            <a href={brand.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              X
            </a>
            <a href={`mailto:${brand.email}`} className="hover:text-white/60 transition-colors">
              Email
            </a>
          </div>
          <span className="text-[11px] text-white/35 leading-relaxed">{brand.address}</span>
        </div>
      </div>
    </section>
  );
};

export default FooterLinksSection;
