import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { MouseEvent } from "react";
import Logo3D from "@/components/Logo3D";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRipple } from "@/hooks/useRipple";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

// Import logos as fallback
import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyLogo from "@/assets/logos/story-protocol.png";
import triaLogo from "@/assets/logos/tria-official.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import mantraLogo from "@/assets/logos/mantra.png";
import bybitLogo from "@/assets/logos/bybit.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import megaethLogo from "@/assets/logos/megaeth.png";
import zkpassLogo from "@/assets/logos/zkpass.png";

// Import campaign images as fallback
import bnbCampaign from "@/assets/campaigns/bnb-event.jpg";
import storyCampaign from "@/assets/campaigns/story-origin-summit.jpg";
import saharaCampaign from "@/assets/campaigns/sahara-ai.jpg";
import mantraCampaign from "@/assets/campaigns/mantra-party.jpg";
import peaqCampaign from "@/assets/campaigns/peaq-summit.jpg";
import triaCampaign from "@/assets/campaigns/tria-launch.jpg";
import bybitCampaign from "@/assets/campaigns/bybit-event.jpg";
import kucoinCampaign from "@/assets/campaigns/kucoin-new.jpg";
import polygonConnect from "@/assets/campaigns/polygon-connect.png";
import ondoCampaign from "@/assets/campaigns/ondo-seminar.jpg";
import megaethCampaign from "@/assets/campaigns/megaeth-launch.jpg";
import zkpassCampaign from "@/assets/campaigns/zkpass-verifiable-nights.jpg";
import synfuturesCampaign from "@/assets/campaigns/synfutures-billboard.jpg";
import fogoCampaign from "@/assets/campaigns/fogo-fest.avif";

// Map gallery `src` (stored as file path strings) to bundled campaign assets
const campaignAssetByFile: Record<string, string> = {
  "bnb-event.jpg": bnbCampaign,
  "kucoin-campaign.jpg": kucoinCampaign,
  "ondo-seminar.jpg": ondoCampaign,
  "polygon-connect.png": polygonConnect,
  "sahara-ai.jpg": saharaCampaign,
  "story-origin-summit.jpg": storyCampaign,
  "peaq-summit.jpg": peaqCampaign,
  "bybit-event.jpg": bybitCampaign,
  "mantra-party.jpg": mantraCampaign,
  "megaeth-launch.jpg": megaethCampaign,
  "tria-launch.jpg": triaCampaign,
  "zkpass-verifiable-nights.jpg": zkpassCampaign,
  "synfutures-billboard.jpg": synfuturesCampaign,
  "fogo-fest.avif": fogoCampaign,
};

const resolveGallerySrcToAsset = (src?: string | null) => {
  if (!src) return null;
  const file = src.split("/").pop();
  if (!file) return null;
  return campaignAssetByFile[file] ?? null;
};

// Fallback data for projects without DB entries
const fallbackImages: Record<string, { logo: string; bgImage: string }> = {
  'bnb-chain': { logo: bnbLogo, bgImage: bnbCampaign },
  'story-protocol': { logo: storyLogo, bgImage: storyCampaign },
  'bybit': { logo: bybitLogo, bgImage: bybitCampaign },
  'kucoin': { logo: kucoinLogo, bgImage: kucoinCampaign },
  'polygon': { logo: polygonLogo, bgImage: polygonConnect },
  'ondo-finance': { logo: ondoLogo, bgImage: ondoCampaign },
  'sahara-ai': { logo: saharaAiLogo, bgImage: saharaCampaign },
  'megaeth': { logo: megaethLogo, bgImage: megaethCampaign },
  'mantra': { logo: mantraLogo, bgImage: mantraCampaign },
  'zkpass': { logo: zkpassLogo, bgImage: zkpassCampaign },
  'peaq': { logo: peaqLogo, bgImage: peaqCampaign },
  'tria': { logo: triaLogo, bgImage: triaCampaign },
};

interface CaseCardProps {
  name: string;
  logo: string;
  bgImage: string;
  slug: string;
  category: string;
  result: string;
  description: string;
  websiteUrl?: string;
  index: number;
}

const CaseCard = ({ name, logo, bgImage, slug, category, result, description, websiteUrl, index }: CaseCardProps) => {
  const isLastRow = index >= 10;
  const isRightColumn = index % 2 === 1;

  const { ref, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '30px',
    triggerOnce: true 
  });

  return (
    <div 
      ref={ref}
      className={cn(
        "h-full transition-all duration-500 ease-out will-change-transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{ transitionDelay: `${(index % 6) * 50}ms` }}
    >
      <div
        className={`group block p-3 sm:p-4 md:p-5 transition-all duration-300 hover:bg-secondary/50 h-full ${
          !isRightColumn ? "sm:border-r border-border" : ""
        } ${!isLastRow ? "border-b border-border" : ""}`}
      >
        <Link
          to={`/projects/${slug}`}
          onClick={() => window.scrollTo(0, 0)}
          className="block active:scale-[0.98] transition-transform duration-150"
        >
          {/* Image - Full width on top */}
          <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-3 group-hover:shadow-lg group-hover:shadow-foreground/10 transition-all duration-300">
            <img
              src={bgImage}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-[9px] sm:text-[10px] uppercase tracking-wider">{category}</span>
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-[9px] sm:text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-foreground/80 transition-colors line-clamp-1">
              {name}
            </h3>
            <p className="text-foreground/80 font-medium text-[10px] sm:text-xs line-clamp-1">
              {result}
            </p>
            <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed line-clamp-2 hidden sm:block">
              {description}
            </p>
          </div>

          {/* View case link */}
          <div className="flex items-center gap-1.5 mt-3 text-muted-foreground group-hover:text-foreground transition-colors text-[10px] sm:text-xs">
            <span className="group-hover:underline underline-offset-4">View case</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
};

const CasesSection = () => {
  const { createRipple } = useRipple();
  const { data: projects } = useQuery({
    queryKey: ['cases-projects'],
    queryFn: async () => {
      const { data: projectsData } = await supabase
        .from('projects')
        .select(`
          id,
          name,
          slug,
          category,
          result,
          description,
          logo_url,
          background_url,
          website_url
        `)
        .eq('is_published', true)
        .order('display_order')
        .limit(12);
      
      // Fetch first gallery image for each project
      if (projectsData) {
        const projectIds = projectsData.map((p) => p.id);
        
        const { data: galleryRows } = await supabase
          .from('project_gallery')
          .select('project_id, src, display_order')
          .in('project_id', projectIds)
          .order('display_order', { ascending: true });

        const firstGalleryByProject = new Map<string, string>();
        for (const row of galleryRows ?? []) {
          if (!firstGalleryByProject.has(row.project_id)) {
            firstGalleryByProject.set(row.project_id, row.src);
          }
        }

        const projectsWithGallery = projectsData.map((project) => {
          const gallerySrc = firstGalleryByProject.get(project.id) ?? null;
          const galleryAsset = resolveGallerySrcToAsset(gallerySrc);
          const fallback = fallbackImages[project.slug] || { logo: '', bgImage: '' };

          return {
            name: project.name,
            slug: project.slug,
            category: project.category || '',
            result: project.result || '',
            description: project.description || '',
            logo: project.logo_url || fallback.logo,
            bgImage: galleryAsset || project.background_url || fallback.bgImage || '',
            websiteUrl: project.website_url || '',
          };
        });
        return projectsWithGallery;
      }
      return [];
    },
  });

  const cases = projects || [];

  return (
    <section className="bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Cases Grid */}
        <div className="w-full lg:w-2/3 lg:border-r border-border">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2">
            {cases.map((caseItem, index) => (
              <CaseCard key={caseItem.slug} {...caseItem} index={index} />
            ))}
          </div>
        </div>

        {/* Right: Sticky Info Panel */}
        <div className="w-full lg:w-1/3 p-4 sm:p-5 md:p-8 lg:p-10 flex flex-col justify-center">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-4">
            Our Cases
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-5 md:mb-6 text-[11px] sm:text-xs md:text-sm">
            Real results, not just promises. Here's how we've helped global Web3 projects conquer the Korean market.
          </p>

          <div className="space-y-2 sm:space-y-4 mb-3 sm:mb-5 md:mb-6">
            <div className="flex items-center gap-2 sm:gap-4 pb-2 sm:pb-3 border-b border-border">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">340%</span>
              <span className="text-muted-foreground text-[10px] sm:text-xs md:text-sm">Average volume increase</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 pb-2 sm:pb-3 border-b border-border">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">50K+</span>
              <span className="text-muted-foreground text-[10px] sm:text-xs md:text-sm">New users acquired</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">{cases.length}+</span>
              <span className="text-muted-foreground text-[10px] sm:text-xs md:text-sm">Projects launched</span>
            </div>
          </div>

          <Link
            to="/contact"
            className="group primary-cta-dark inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3 text-xs sm:text-sm font-medium rounded-full active:scale-[0.98] w-full sm:w-fit mb-2 min-h-[48px]"
            onClick={(e) => createRipple(e as unknown as MouseEvent<HTMLElement>)}
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {/* Trust micro-copy */}
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-4 sm:mb-6">
            Trusted by BNB Chain, KuCoin, Story Protocol & more
          </p>

          {/* View All Projects */}
          <div className="pt-4 sm:pt-6 border-t border-border">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-foreground font-medium hover:text-foreground/70 transition-colors text-sm"
            >
              <span className="group-hover:underline underline-offset-4">View all projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3D Bridge Logo */}
          <div className="h-24 sm:h-32 w-full mt-4 sm:mt-6 hidden sm:block">
            <Logo3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
