import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const services = [
  { slug: "gtm", title: "GTM Strategy" },
  { slug: "influencer", title: "KOL & Influencer" },
  { slug: "community", title: "Community" },
  { slug: "pr", title: "PR & Media" },
  { slug: "offline-event", title: "Offline Events" },
  { slug: "seo-ads", title: "SEO & Paid Ads" },
  { slug: "ama", title: "AMA Hosting" },
  { slug: "deep-research", title: "Deep Research" },
  { slug: "compliance", title: "Compliance" },
  { slug: "liquidity", title: "Liquidity & Market Making" },
];

const ServiceNav = () => {
  const { pathname } = useLocation();
  const currentSlug = pathname.split("/services/")[1] || "";

  const others = services.filter((s) => s.slug !== currentSlug);

  return (
    <section className="bg-[#0A0A0A] border-t border-white/[0.06]">
      <div className="px-5 sm:px-6 lg:px-10 py-10 sm:py-14">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 sm:mb-8">Other Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {others.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group flex items-center justify-between px-5 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
            >
              <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                {service.title}
              </span>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceNav;
