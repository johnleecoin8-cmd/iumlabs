import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const clientLogos = [
  { name: "BNB Chain", url: "https://bnbchain.org" },
  { name: "Peaq", url: "https://www.peaq.network" },
  { name: "Story Protocol", url: "https://www.story.foundation" },
  { name: "zkPass", url: "https://zkpass.org" },
  { name: "Falcon Finance", url: "https://falcon.finance" },
  { name: "Ondo Finance", url: "https://ondo.finance" },
  { name: "MegaETH", url: "https://megaeth.systems" },
  { name: "Bybit", url: "https://www.bybit.com" },
];

const TrustSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-6 border-y border-border/30 bg-background overflow-hidden">
      <div 
        className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex whitespace-nowrap">
          <div className="logo-marquee">
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <a
                key={index}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/40 hover:text-foreground/70 transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {client.name}
              </a>
            ))}
          </div>
          <div className="logo-marquee" aria-hidden="true">
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <a
                key={index}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/40 hover:text-foreground/70 transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {client.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
