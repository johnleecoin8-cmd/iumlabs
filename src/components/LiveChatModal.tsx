import { X } from "lucide-react";
import { brand } from "@/config/content";
import jPhoto from "@/assets/team/j-cmo.png";
import davidPhoto from "@/assets/team/david-bd.png";
import sukiPhoto from "@/assets/team/suki-partner.png";

interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const teamMembers = [
  { name: "J", role: "CMO", image: jPhoto },
  { name: "David", role: "Head of BD", image: davidPhoto },
  { name: "Suki", role: "Managing Partner", image: sukiPhoto },
];

const LiveChatModal = ({ isOpen, onClose }: LiveChatModalProps) => {
  return (
    <div
      className={`fixed inset-0 z-[200] transition-all duration-500 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel — drops from top, rounded all corners, with margin */}
      <div className={`absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}>
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden">

          {/* Marquee strip */}
          <div className="bg-black/[0.03] py-2.5 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {Array(12).fill(null).map((_, i) => (
                <div key={i} className="flex items-center mx-6">
                  <span className="text-black/70 text-sm mr-8">contact us</span>
                  <span className="text-[#3B82F6] text-sm font-medium mr-8">sales department</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="px-8 sm:px-12 lg:px-20 py-10 sm:py-14">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

              {/* Left — message */}
              <div className="flex-1">
                <div className="bg-[#F8F8F8] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-8">
                  <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-black">
                    <span className="text-[#3B82F6] font-medium">We work closely with founders</span> and{" "}
                    <span className="text-[#3B82F6] font-medium">teams across stages</span>, from{" "}
                    <span className="text-[#3B82F6] font-medium">early launches</span> to{" "}
                    <span className="text-[#3B82F6] font-medium">scaled ecosystems</span>. If you're exploring a campaign,{" "}
                    <span className="text-[#3B82F6] font-medium">looking for support</span>, or just want to get a sense of{" "}
                    <span className="text-[#3B82F6] font-medium">how we work</span>, reach out.{" "}
                    <a
                      href={brand.telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3B82F6] underline hover:no-underline font-medium"
                    >
                      We're easy to talk to.
                    </a>
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-black/30 uppercase tracking-widest mb-1">open hours</p>
                    <p className="text-black text-base font-medium">Mon–Fri 09:00 — 18:00 KST</p>
                  </div>
                  <a
                    href={brand.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-black/80 transition-all"
                  >
                    Chat on Telegram
                  </a>
                </div>
              </div>

              {/* Right — team photos */}
              <div className="flex gap-3 sm:gap-4 justify-center lg:justify-end">
                {teamMembers.map((member) => (
                  <a
                    key={member.name}
                    href={brand.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-center"
                  >
                    <div className="w-32 h-44 sm:w-40 sm:h-52 lg:w-48 lg:h-60 rounded-2xl overflow-hidden mb-3 bg-gradient-to-b from-slate-100 via-blue-50 to-blue-200 group-hover:shadow-lg transition-shadow">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-black font-semibold text-base">{member.name}</h3>
                    <p className="text-black/40 text-sm">{member.role}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating close */}
        <button
          onClick={onClose}
          className="absolute bottom-[-56px] right-8 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center text-black/40 hover:text-black hover:bg-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default LiveChatModal;
