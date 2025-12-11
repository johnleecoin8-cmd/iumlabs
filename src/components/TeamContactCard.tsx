import { Send, Linkedin, Mail } from "lucide-react";

interface TeamContactCardProps {
  name: string;
  role: string;
  image: string;
  telegram?: string;
  linkedin?: string;
  email?: string;
}

const TeamContactCard = ({ name, role, image, telegram, linkedin, email }: TeamContactCardProps) => {
  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
      {/* Profile */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/20 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background" />
        </div>
        <div>
          <h3 className="text-white font-medium text-lg">{name}</h3>
          <p className="text-white/50 text-sm">{role}</p>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="flex gap-2">
        {telegram && (
          <a
            href={telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0088cc]/20 hover:bg-[#0088cc]/30 text-[#0088cc] rounded-xl transition-colors text-sm font-medium"
          >
            <Send className="w-4 h-4" />
            <span>Telegram</span>
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0077b5]/20 hover:bg-[#0077b5]/30 text-[#0077b5] rounded-xl transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white/70 rounded-xl transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamContactCard;
