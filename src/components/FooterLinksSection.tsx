import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/config/content";
import { clientLogos } from "@/data/clients";

const navSections: { title: string; wide?: boolean; links: { name: string; href: string }[] }[] = [
  {
    title: "Services",
    wide: true,
    links: [
      { name: "GTM Strategy", href: "/services/gtm" },
      { name: "CEX Listing Advisory", href: "/services/listing" },
      { name: "Market Making & Liquidity", href: "/services/liquidity" },
      { name: "Exchange Marketing", href: "/services/exchange-marketing" },
      { name: "Capital & OTC Introduction", href: "/services/capital" },
      { name: "KOL & Influencer", href: "/services/influencer" },
      { name: "Community", href: "/services/community" },
      { name: "PR & Media", href: "/services/pr" },
      { name: "SEO & Paid Ads", href: "/services/seo-ads" },
      { name: "AMA Hosting", href: "/services/ama" },
      { name: "Deep Research", href: "/services/deep-research" },
      { name: "Regulations & Compliance", href: "/services/compliance" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Case Studies", href: "/projects" },
      { name: "Blog", href: "/blog" },
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
      { name: "Citation Policy", href: "/citations" },
    ],
  },
];

const FooterLinksSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-white/[0.06]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="px-5 sm:px-6 lg:px-10">

        {/* Big-type CTA — ported from cuberto.com footer "Tell us" CTA
            (computed-style audit 2026-07-02: 108px / fw300 / uppercase /
            ls -3% / lh 0.95 / 108px vertical padding). Underline sweep is
            locomotive.ca's background-size pattern, scaled to display size.
            The empty right gutter now carries a static client logo wall —
            monochrome white marks that fill the negative space and put the
            book of business next to the ask. */}
        <div className="pt-16 sm:pt-24 lg:pt-[108px] pb-14 sm:pb-24 border-b border-white/[0.06] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end gap-y-12 gap-x-10">
          <Link to="/contact" className="group block">
            <p className="text-[10px] sm:text-[11px] font-mono text-white/30 uppercase tracking-[0.25em] mb-6 sm:mb-9">
              Got a project in Korea?
            </p>
            <span className="footer-cta-type flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-2 text-white">
              {/* buzzworthystudio.com mask-swap: brand-colored duplicate wipes
                  across on hover (500ms cubic-bezier(1,0,0,1)) */}
              <span className="mask-swap" data-text="Let's talk">
                <span>Let&apos;s talk</span>
              </span>
              <ArrowUpRight
                className="w-[0.8em] h-[0.8em] text-primary transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[0.12em] group-hover:-translate-y-[0.12em]"
                strokeWidth={1.5}
              />
            </span>
          </Link>

          {/* Client logo grid — the Stripe/Ramp "customers" treatment:
              heterogeneous marks (icons + wordmarks) sit in equal cells with
              collapsed hairline dividers, so every logo carries the same
              visual weight regardless of aspect ratio. Framed as one module
              in a rounded, edge-lit card; each cell lifts on hover. Fixed 4×4
              so the grid never leaves a ragged final row. */}
          <div className="lg:pb-1 lg:justify-self-end w-full max-w-[440px] lg:w-[440px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.28em]">
                Trusted by
              </span>
              <span className="text-[10px] font-mono text-white/20 tracking-[0.1em] tabular-nums">
                {clientLogos.length} teams
              </span>
            </div>
            <div className="grid grid-cols-4 rounded-2xl overflow-hidden border-t border-l border-white/[0.07] surface-edge bg-white/[0.012]">
              {clientLogos.map((client) => (
                <Link
                  key={client.slug}
                  to={`/projects/${client.slug}`}
                  aria-label={client.name}
                  title={client.name}
                  className="group/logo relative flex items-center justify-center h-[62px] sm:h-[74px] border-r border-b border-white/[0.07] transition-colors duration-300 hover:bg-white/[0.04]"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    decoding="async"
                    className="h-4 sm:h-[18px] w-auto max-w-[72px] object-contain brightness-0 invert opacity-50 group-hover/logo:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="py-12 sm:py-20">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-6">

            <div className="col-span-2 md:col-span-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-5">
                {brand.name}
              </h2>
              <p className="text-sm text-white/35 leading-relaxed max-w-sm mb-6">
                Korea's leading Web3 growth partner. From strategy to execution, we engineer your market entry.
              </p>

              <div className="flex items-center gap-5">

                <a href={brand.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline text-white/30 hover:text-white text-sm font-medium">LinkedIn</a>
                <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="link-underline text-white/30 hover:text-white text-sm font-medium">Telegram</a>
                <a href={`mailto:${brand.email}`} className="link-underline text-white/30 hover:text-white text-sm font-medium">Email</a>
              </div>
            </div>

            {navSections.map((section) => {
              const mid = Math.ceil(section.links.length / 2);
              const columns = section.wide
                ? [section.links.slice(0, mid), section.links.slice(mid)]
                : [section.links];
              return (
                <div
                  key={section.title}
                  className={`hidden md:block col-span-1 ${section.wide ? "md:col-span-4" : "md:col-span-2"}`}
                >
                  <h3 className="text-[10px] sm:text-[11px] font-medium text-white/25 uppercase tracking-[0.15em] mb-4 sm:mb-5">
                    {section.title}
                  </h3>
                  <div className={section.wide ? "grid grid-cols-2 gap-x-6" : ""}>
                    {columns.map((col, ci) => (
                      <ul key={ci} className="dim-list space-y-2.5 sm:space-y-3">
                        {col.map((link) => (
                          <li key={link.name}>
                            <Link
                              to={link.href}
                              className="link-underline text-[13px] sm:text-sm text-white/45 hover:text-white"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              );
            })}
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
