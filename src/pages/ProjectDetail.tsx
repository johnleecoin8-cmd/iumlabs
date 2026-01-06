import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABannerSection from "@/components/CTABannerSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import { supabase } from "@/integrations/supabase/client";
import { projectsData, getNextProject, ProjectData } from "@/data/projectsData";
import ProjectHero from "@/components/project-detail/ProjectHero";
import ProjectContentSection from "@/components/project-detail/ProjectContentSection";
import NextProject from "@/components/project-detail/NextProject";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import CaseStudySchema from "@/components/CaseStudySchema";

const ProjectDetail = () => {
  const { slug } = useParams();

  // Fetch project from Supabase
  const { data: dbProject } = useQuery({
    queryKey: ['project-detail', slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  // Fetch related data if DB project exists
  const { data: dbMetrics } = useQuery({
    queryKey: ['project-metrics', dbProject?.id],
    queryFn: async () => {
      if (!dbProject?.id) return [];
      const { data } = await supabase
        .from('project_metrics')
        .select('*')
        .eq('project_id', dbProject.id)
        .order('display_order');
      return data || [];
    },
    enabled: !!dbProject?.id,
  });

  // Fetch gallery for hero background
  const { data: dbGallery } = useQuery({
    queryKey: ['project-gallery', dbProject?.id],
    queryFn: async () => {
      if (!dbProject?.id) return [];
      const { data } = await supabase
        .from('project_gallery')
        .select('*')
        .eq('project_id', dbProject.id)
        .order('display_order');
      return data || [];
    },
    enabled: !!dbProject?.id,
  });

  // Use DB project if available, otherwise fallback to hardcoded
  const fallbackProject = slug ? projectsData[slug] : null;
  
  // Use first gallery image as hero background
  const heroBackgroundImage = dbGallery && dbGallery.length > 0 
    ? dbGallery[0].src 
    : (fallbackProject?.gallery?.[0]?.src || fallbackProject?.bgImage || '');
  
  const websiteUrl = dbProject?.website_url || '';
  
  const project: ProjectData | null = dbProject ? {
    name: dbProject.name,
    logo: dbProject.logo_url || fallbackProject?.logo || '',
    bgImage: heroBackgroundImage,
    category: dbProject.category || '',
    result: dbProject.result || '',
    glowColor: dbProject.glow_color || '#00D4FF',
    description: dbProject.description || '',
    challenge: dbProject.challenge || fallbackProject?.challenge || '',
    metrics: dbMetrics && dbMetrics.length > 0 
      ? dbMetrics.map(m => ({ value: m.value, label: m.label }))
      : fallbackProject?.metrics || [],
    strategy: dbProject.strategy || fallbackProject?.strategy || [],
    results: fallbackProject?.results || [],
    services: dbProject.services || fallbackProject?.services || [],
    shortServices: dbProject.short_services || fallbackProject?.shortServices || [],
    gallery: dbGallery && dbGallery.length > 0 
      ? dbGallery.map(g => ({ src: g.src, title: g.title || '', description: g.description || '' }))
      : fallbackProject?.gallery || [],
    news: fallbackProject?.news || [],
  } : fallbackProject;

  // Dynamic page meta for SEO
  useEffect(() => {
    if (project) {
      const title = `${project.name} Case Study | Ium Labs`;
      const description = project.description || `${project.name} - ${project.category}. Web3 marketing case study by Ium Labs.`;
      const pageUrl = `https://iumlabs.io/projects/${slug}`;
      const ogImage = project.bgImage.startsWith('http') 
        ? project.bgImage 
        : `https://iumlabs.io${project.bgImage}`;
      
      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', pageUrl);
      document.querySelector('meta[property="og:image"]')?.setAttribute('content', ogImage);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
      document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', ogImage);
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl);
    }
  }, [project, slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-gray-400 hover:underline">
            View All Projects
          </Link>
        </div>
      </div>
    );
  }

  // Get next project for navigation
  const nextProjectData = getNextProject(slug || "");

  // Dynamic breadcrumb items
  const breadcrumbItems = useMemo(() => [
    { name: "Home", url: "https://iumlabs.io" },
    { name: "Projects", url: "https://iumlabs.io/projects" },
    { name: project.name, url: `https://iumlabs.io/projects/${slug}` }
  ], [project.name, slug]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <ProjectHero project={project} websiteUrl={websiteUrl} />

      {/* Unified Content Section */}
      <ProjectContentSection project={project} metrics={project.metrics} />

      {/* Next Project */}
      {nextProjectData && (
        <NextProject 
          nextSlug={nextProjectData.slug} 
          nextProject={nextProjectData.project} 
          currentGlowColor={project.glowColor} 
        />
      )}

      {/* CTA Banner */}
      <CTABannerSection />

      {/* Footer Links */}
      <FooterLinksSection />

      <Footer />
      <BreadcrumbSchema items={breadcrumbItems} />
      <CaseStudySchema
        name={project.name}
        description={project.description || `${project.name} - Web3 marketing case study by Ium Labs.`}
        image={project.bgImage}
        url={`https://iumlabs.io/projects/${slug}`}
        category={project.category}
        services={project.services}
        metrics={project.metrics}
      />
    </div>
  );
};

export default ProjectDetail;
