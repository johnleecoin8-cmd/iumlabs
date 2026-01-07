import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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
import openledgerCampaign from "@/assets/campaigns/openledger-interview.jpg";
import openledgerHero from "@/assets/campaigns/openledger-hero.jpg";
import openledgerHeroNew from "@/assets/campaigns/openledger-hero-new.jpg";
import openledgerEvent from "@/assets/campaigns/openledger-event.jpg";
import openledgerHeroOfficial from "@/assets/campaigns/openledger-hero-official.png";

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
  "openledger-interview.jpg": openledgerCampaign,
  "openledger-hero.jpg": openledgerHeroOfficial,
  "openledger-hero-new.jpg": openledgerHeroNew,
  "openledger-event.jpg": openledgerEvent,
  "openledger-hero-official.png": openledgerHeroOfficial,
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
  'openledger': { logo: '', bgImage: openledgerCampaign },
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
  totalCount: number;
}

const CaseCard = ({ name, bgImage, slug, category, result, description, websiteUrl, index }: CaseCardProps) => {
  const { ref, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '30px',
    triggerOnce: true 
  });

  return (
    <div 
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out will-change-transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{ transitionDelay: `${(index % 6) * 50}ms` }}
    >
      <div className="group rounded-lg sm:rounded-xl md:rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30 active:scale-[0.98]">
        {/* Image */}
        <Link
          to={`/projects/${slug}`}
          onClick={() => window.scrollTo(0, 0)}
          className="block aspect-[16/10] overflow-hidden"
        >
          <img 
            src={bgImage} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Content */}
        <div className="p-2 sm:p-3 md:p-4 lg:p-5">
          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-1.5 md:mb-2">
            <span className="text-[8px] sm:text-[10px] md:text-label uppercase tracking-wider font-medium text-muted-foreground truncate">{category}</span>
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[9px] sm:text-[10px] text-muted-foreground hover:text-foreground transition-colors ml-auto"
              >
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
          <Link
            to={`/projects/${slug}`}
            onClick={() => window.scrollTo(0, 0)}
          >
            <h3 className="text-xs sm:text-sm md:text-body-lg font-semibold text-foreground mb-1 sm:mb-1.5 md:mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>
          <p className="text-[10px] sm:text-xs md:text-body-sm text-foreground/80 font-medium mb-1 sm:mb-1.5 md:mb-2 line-clamp-1">
            {result}
          </p>
          <p className="text-[10px] sm:text-xs md:text-body-sm text-muted-foreground leading-relaxed line-clamp-2 mb-2 sm:mb-3 md:mb-4 hidden sm:block">
            {description}
          </p>
          
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[8px] sm:text-[10px] md:text-caption text-muted-foreground hover:text-primary transition-colors">
            <span className="group-hover:underline underline-offset-4">View case</span>
            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CasesSection = () => {
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
  const displayCases = cases.slice(0, 12); // Show only 3x4 = 12 projects on home

  return (
    <section className="bg-background py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 md:mb-12">
          {/* Left: Title + Description */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1">
              Our Cases
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm">
              Real results, not just promises.
            </p>
          </div>
          
          {/* Center: Stats (horizontal) */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="text-center">
              <span className="text-lg md:text-xl font-bold text-foreground block">340%</span>
              <span className="text-[10px] md:text-xs text-muted-foreground">Avg. volume</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-lg md:text-xl font-bold text-foreground block">50K+</span>
              <span className="text-[10px] md:text-xs text-muted-foreground">New users</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-lg md:text-xl font-bold text-foreground block">{cases.length}+</span>
              <span className="text-[10px] md:text-xs text-muted-foreground">Projects</span>
            </div>
          </div>
        </div>

        {/* Cases Grid - Same as Projects page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 md:mb-12">
          {displayCases.map((caseItem, index) => (
            <CaseCard key={caseItem.slug} {...caseItem} index={index} totalCount={displayCases.length} />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-full font-medium text-sm hover:bg-foreground/90 transition-colors"
          >
            <span>View all {cases.length} projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
