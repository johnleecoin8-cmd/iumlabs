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
  "openledger-hero.jpg": openledgerHero,
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

const CaseCard = ({ name, bgImage, slug, category, result, description, websiteUrl, index, totalCount }: CaseCardProps) => {
  // 3-column grid border logic
  const isRightColumn = index % 3 === 2;
  const rowCount = Math.ceil(totalCount / 3);
  const currentRow = Math.floor(index / 3);
  const isLastRow = currentRow === rowCount - 1;

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
        className={cn(
          "group block p-3 sm:p-4 md:p-5 transition-all duration-300 hover:bg-secondary/50 h-full",
          !isRightColumn && "border-r border-border",
          !isLastRow && "border-b border-border"
        )}
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
    <section className="bg-background">
      {/* Top Info Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 md:p-6 border-b border-border">
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

      {/* 3x4 Cases Grid (12 projects max) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {displayCases.map((caseItem, index) => (
          <CaseCard key={caseItem.slug} {...caseItem} index={index} totalCount={displayCases.length} />
        ))}
      </div>

      {/* View All Projects Row */}
      <Link
        to="/projects"
        className="group flex items-center justify-center gap-3 p-6 md:p-8 border-t border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
      >
        <span className="text-foreground font-medium text-sm md:text-base group-hover:underline underline-offset-4">
          View all {cases.length} projects
        </span>
        <ArrowRight className="w-4 h-4 text-foreground group-hover:translate-x-1 transition-transform" />
      </Link>
    </section>
  );
};

export default CasesSection;
