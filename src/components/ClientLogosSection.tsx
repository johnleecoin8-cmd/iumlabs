import { motion } from "framer-motion";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria-official.png";
import mantraLogo from "@/assets/logos/mantra.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import zkpassLogo from "@/assets/logos/zkpass.png";
import aptosLogo from "@/assets/logos/aptos.png";
import kiteLogo from "@/assets/logos/kite.png";

export interface ClientLogo {
  name: string;
  logo: string;
  noInvert?: boolean;
  services?: string[];
}

// All clients with their associated services
export const allClientLogos: ClientLogo[] = [
  { name: "BNB Chain", logo: bnbLogo, services: ["kol", "pr", "events", "community"] },
  { name: "KuCoin", logo: kucoinLogo, services: ["kol", "community", "events"] },
  { name: "Polygon", logo: polygonLogo, services: ["kol", "events", "research"] },
  { name: "Ondo Finance", logo: ondoLogo, services: ["kol", "pr", "research"] },
  { name: "Bybit", logo: bybitLogo, services: ["kol", "events", "pr"] },
  { name: "Peaq", logo: peaqLogo, services: ["pr", "events", "community"] },
  // { name: "Story Protocol", logo: storyProtocolLogo, services: ["kol", "community"] }, // Hidden
  { name: "MegaETH", logo: megaethLogo, noInvert: true, services: ["kol", "community"] },
  { name: "Tria", logo: triaLogo, noInvert: true, services: ["community"] },
  { name: "Mantra", logo: mantraLogo, noInvert: true, services: ["kol", "pr", "events"] },
  { name: "Sahara AI", logo: saharaAiLogo, noInvert: true, services: ["kol", "pr", "research"] },
  { name: "FOGO", logo: fogoLogo, noInvert: true, services: ["events", "community"] },
  { name: "SynFutures", logo: synfuturesLogo, noInvert: true, services: ["kol", "pr"] },
  { name: "zkPass", logo: zkpassLogo, noInvert: true, services: ["kol", "community", "events"] },
];

// Service-specific client filters
export const getClientsByService = (serviceId: string): ClientLogo[] => {
  return allClientLogos.filter(client => client.services?.includes(serviceId));
};

interface ClientLogosSectionProps {
  title?: string;
  subtitle?: string;
  serviceFilter?: string;
  accentColor?: string;
  maxLogos?: number;
}

const ClientLogosSection = ({
  title = "Trusted By Industry Leaders",
  subtitle,
  serviceFilter,
  accentColor = "#22D3EE",
  maxLogos = 12,
}: ClientLogosSectionProps) => {
  const logos = serviceFilter 
    ? getClientsByService(serviceFilter).slice(0, maxLogos)
    : allClientLogos.slice(0, maxLogos);

  if (logos.length === 0) return null;

  return (
    <div className="py-12">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 
            className="text-xs font-medium tracking-wider uppercase mb-2"
            style={{ color: accentColor }}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/50 text-sm">{subtitle}</p>
          )}
        </div>

        {/* Logo Grid */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {logos.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                loading="lazy"
                decoding="async"
                className={`h-5 w-5 object-contain flex-shrink-0 ${
                  client.noInvert ? 'opacity-80' : 'brightness-0 invert opacity-70'
                } group-hover:opacity-100 transition-opacity`}
              />
              <span className="text-white/60 text-xs font-medium whitespace-nowrap group-hover:text-white/90 transition-colors">
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogosSection;
