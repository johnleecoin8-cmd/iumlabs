import { Check, Zap, Rocket, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Starter",
    description: "For new projects",
    price: "Custom",
    icon: Zap,
    features: [
      "Social media setup",
      "Basic community management",
      "10 content pieces/month",
      "2 media placements",
      "Weekly reports",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    description: "Most popular choice",
    price: "Custom",
    icon: Rocket,
    features: [
      "Everything in Starter",
      "24/7 community management",
      "30 content pieces/month",
      "5 influencer campaigns",
      "10 media placements",
      "2 AMA sessions",
      "Korea localization",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "Full-service solution",
    price: "Custom",
    icon: Crown,
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Custom marketing strategy",
      "Large influencer campaigns",
      "Tier 1 media PR",
      "Exchange listing support",
      "Event planning",
      "Unlimited revisions",
    ],
    highlighted: false,
  },
];

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tight">
            Custom <span className="text-gradient">Packages</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tailored solutions for your project's unique needs
          </p>
        </div>

        <div className={`grid md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-xl p-8 transition-all duration-300 hover:scale-[1.02] ${
                plan.highlighted 
                  ? 'bg-card border-2 border-primary shadow-lg shadow-primary/20' 
                  : 'bg-card border border-border/30 hover:border-primary/30'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  plan.highlighted ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  <plan.icon className={`w-6 h-6 ${plan.highlighted ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      plan.highlighted ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/contact">
                <Button 
                  className={`w-full uppercase tracking-wider ${
                    plan.highlighted 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'bg-foreground text-background hover:bg-foreground/90'
                  }`}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-12">
          * All packages can be customized to fit your project's specific needs.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
