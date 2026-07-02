import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { StaggeredChildren } from "@/components/AnimatedSection";

// Same faces/name mapping as the GTM page team scatter (src/pages/GTMService.tsx)
import teamDavid from "@/assets/team/kevin-bd-new.jpg";
import teamBennet from "@/assets/team/rachel-design.jpg";
import teamJ from "@/assets/team/j-cmo.jpg";
import teamKevin from "@/assets/team/helen-cm.jpg";
import teamSuki from "@/assets/team/bennet-coo.jpg";
import teamLewis from "@/assets/team/lewis-pr.jpg";
import teamRachel from "@/assets/team/kevin-bd.jpg";
import teamHyukjae from "@/assets/team/hyukjae-bdm-new.jpg";

const members = [
  { name: "David", role: "CEO", photo: teamDavid },
  { name: "Bennet", role: "COO", photo: teamBennet },
  { name: "J", role: "CMO", photo: teamJ },
  { name: "Kevin", role: "Head of BD", photo: teamKevin },
  { name: "Suki", role: "Managing Partner", photo: teamSuki },
  { name: "Lewis", role: "PR Manager", photo: teamLewis },
  { name: "Rachel", role: "Designer", photo: teamRachel },
  { name: "Hyukjae", role: "BD Manager", photo: teamHyukjae },
];

// Homepage trust layer: real faces (competitor consensus — 4/5 crypto
// agencies put the team on the homepage). Compact strip version of the
// GTM-page scatter; hellomonday.com dimming-list hover on the row.
const TeamStripSection = () => (
  <div className="px-5 sm:px-6 lg:px-10 pb-16 md:pb-24">
    <StaggeredChildren
      className="dim-list grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3"
      staggerDelay={60}
    >
      {members.map((m) => (
        <figure key={m.name} className="group/card relative rounded-xl overflow-hidden surface-edge bg-white/[0.03]">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={m.photo}
              alt={`${m.name}, ${m.role} at ium Labs`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover saturate-[0.85] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04]"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pt-10 pb-3 px-3.5">
            <figcaption className="text-sm sm:text-base font-semibold text-white leading-tight">{m.name}</figcaption>
            <span className="text-[10px] sm:text-xs text-white/50">{m.role}</span>
          </div>
        </figure>
      ))}
    </StaggeredChildren>

    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <p className="text-xs sm:text-sm text-white/45 max-w-xl">
        10+ operators in Seoul. Alumni of Binance, KuCoin, and Upbit, we operated Korea&apos;s market before we marketed in it.
      </p>
      <Link
        to="/services/gtm"
        className="group inline-flex shrink-0 items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
      >
        <span className="link-sweep">How we work</span>
        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
);

export default TeamStripSection;
