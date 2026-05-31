import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import teamDavid from "@/assets/team/kevin-bd-new.jpg";
import teamBennet from "@/assets/team/rachel-design.jpg";
import teamJ from "@/assets/team/j-cmo.jpg";
import teamKevin from "@/assets/team/helen-cm.jpg";
import teamSuki from "@/assets/team/bennet-coo.jpg";
import teamLewis from "@/assets/team/lewis-pr.jpg";
import teamRachel from "@/assets/team/kevin-bd.jpg";
import teamHyukjae from "@/assets/team/hyukjae-bdm-new.jpg";

const team = [
  { name: "David", role: "CEO", image: teamDavid },
  { name: "Bennet", role: "COO", image: teamBennet },
  { name: "J", role: "CMO", image: teamJ },
  { name: "Kevin", role: "Head of BD", image: teamKevin },
  { name: "Suki", role: "Managing Partner", image: teamSuki },
  { name: "Lewis", role: "PR Manager", image: teamLewis },
  { name: "Rachel", role: "Designer", image: teamRachel },
  { name: "Hyukjae", role: "BD Manager", image: teamHyukjae },
];

const TeamSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref} className="py-10 sm:py-14">
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <h2 className={`text-xl sm:text-2xl font-bold text-white transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Our Team
          </h2>
          <span className={`text-[10px] sm:text-xs text-white/25 uppercase tracking-[0.2em] transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Seoul · Singapore
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-[2px] rounded-2xl overflow-hidden">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`group relative bg-[#111] text-center py-8 sm:py-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover mx-auto mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/[0.06]"
              />
              <h4 className="text-sm sm:text-[15px] font-semibold text-white mb-0.5">{member.name}</h4>
              <p className="text-[11px] sm:text-xs text-white/35 font-medium tracking-wide">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
