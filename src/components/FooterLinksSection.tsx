import { Link } from "react-router-dom";
import { brand } from "@/config/content";

const navSections = [
  {
    title: "Services",
    links: [
      { name: "GTM Strategy", href: "/services/gtm" },
      { name: "KOL & Influencer", href: "/services/influencer" },
      { name: "Community", href: "/services/community" },
      { name: "PR & Media", href: "/services/pr" },
      { name: "Offline Events", href: "/services/offline-event" },
      { name: "SEO & Paid Ads", href: "/services/seo-ads" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Case Studies", href: "/projects" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/jobs" },
      { name: "Contact", href: "/contact" },
      { name: "Company Deck", href: "/deck" },
    ],
  },
  {
    title: "Korea Guides",
    links: [
      { name: "Crypto Marketing Korea", href: "/crypto-marketing-korea" },
      { name: "KOL Marketing Korea", href: "/kol-marketing-korea" },
      { name: "Korea Web3 Guide", href: "/korea-web3-guide" },
      { name: "Korea Community Management", href: "/korea-community-management" },
      { name: "Korea PR & Media", href: "/korea-pr-media" },
      { name: "Korea Event Marketing", href: "/korea-event-marketing" },
      { name: "Korea Naver SEO", href: "/korea-seo-naver" },
      { name: "Korea Exchange Listing", href: "/korea-exchange-listing" },
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
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-white/[0.06]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="px-5 sm:px-6 lg:px-10">

        <div className="py-12 sm:py-20">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-6">

            <div className="col-span-2 md:col-span-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-5">
                {brand.name}
              </h2>
              <p className="text-sm text-white/35 leading-relaxed max-w-sm mb-8">
                Korea's leading Web3 growth partner. From strategy to execution, we engineer your market entry.
              </p>
              <div className="flex items-center gap-5">

                <a href={brand.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors text-sm font-medium">LinkedIn</a>
                <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors text-sm font-medium">Telegram</a>
                <a href={`mailto:${brand.email}`} className="text-white/30 hover:text-white transition-colors text-sm font-medium">Email</a>
              </div>
            </div>

            {navSections.map((section) => (
              <div key={section.title} className="hidden md:block col-span-1 md:col-span-2">
                <h3 className="text-[10px] sm:text-[11px] font-medium text-white/25 uppercase tracking-[0.15em] mb-4 sm:mb-5">
                  {section.title}
                </h3>
                <ul className="space-y-2.5 sm:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-[13px] sm:text-sm text-white/45 hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.04] py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <span className="text-[11px] text-white/25 font-mono">© {currentYear} {brand.name}</span>
            <span className="text-[10px] text-white/20 hidden sm:inline">·</span>
            <span className="text-[10px] text-white/20">{brand.address}</span>
          </div>
          <span className="text-[10px] text-white/20">
            Reg. {brand.registrationNumber}
          </span>
        </div>

      </div>
    </footer>
  );
};

export default FooterLinksSection;
