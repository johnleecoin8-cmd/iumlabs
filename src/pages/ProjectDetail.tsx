import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { projectsData, getNextProject, ProjectData } from "@/data/projectsData";
import ProjectHero from "@/components/project-detail/ProjectHero";
import ProjectOverview from "@/components/project-detail/ProjectOverview";
import ProjectChallenge from "@/components/project-detail/ProjectChallenge";
import ProjectStrategy from "@/components/project-detail/ProjectStrategy";
import ProjectMetrics from "@/components/project-detail/ProjectMetrics";
import ProjectGalleryGrid from "@/components/project-detail/ProjectGalleryGrid";
import NextProject from "@/components/project-detail/NextProject";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

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

  // Use DB project if available, otherwise fallback to hardcoded
  const fallbackProject = slug ? projectsData[slug] : null;
  
  const project: ProjectData | null = dbProject ? {
    name: dbProject.name,
    logo: dbProject.logo_url || fallbackProject?.logo || '',
    bgImage: dbProject.background_url || fallbackProject?.bgImage || '',
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
    gallery: fallbackProject?.gallery || [],
    news: fallbackProject?.news || [],
  } : fallbackProject;

  // Dynamic page meta for SEO
  useEffect(() => {
    if (project) {
      const title = `${project.name} Case Study | Ium Labs`;
      const description = project.description || `${project.name} - ${project.category}. Web3 marketing case study by Ium Labs.`;
      
      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://iumlabs.io/projects/${slug}`);
    }
  }, [project, slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-primary hover:underline">
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

  // Create CSS custom properties for the project color
  const projectColorStyles = {
    '--project-color': project.glowColor,
    '--project-color-10': `${project.glowColor}1A`,
    '--project-color-20': `${project.glowColor}33`,
    '--project-color-30': `${project.glowColor}4D`,
    '--project-color-50': `${project.glowColor}80`,
  } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="min-h-screen bg-[#0A0A0A] overflow-hidden relative" style={projectColorStyles}>
        {/* Persistent Project Color Ambient Glow */}
        <div 
          className="fixed top-0 left-0 w-[50vw] h-[50vh] pointer-events-none z-0 opacity-15"
          style={{ background: `radial-gradient(ellipse at 0% 0%, ${project.glowColor} 0%, transparent 60%)` }}
        />
        <div 
          className="fixed bottom-0 right-0 w-[40vw] h-[40vh] pointer-events-none z-0 opacity-10"
          style={{ background: `radial-gradient(ellipse at 100% 100%, ${project.glowColor} 0%, transparent 60%)` }}
        />
        
        <Navbar />
        
        {/* 01 - Hero Section */}
        <ProjectHero project={project} />

        {/* 02 - Project Overview */}
        <ProjectOverview project={project} />

        {/* 03 - Challenge */}
        <ProjectChallenge 
          challenge={project.challenge} 
          glowColor={project.glowColor} 
        />

        {/* 04 - Strategy / Approach */}
        <ProjectStrategy 
          strategy={project.strategy} 
          glowColor={project.glowColor} 
        />

        {/* 05 - Key Metrics / Results */}
        <ProjectMetrics metrics={project.metrics} glowColor={project.glowColor} />

        {/* 06 - Gallery */}
        <ProjectGalleryGrid 
          gallery={project.gallery} 
          glowColor={project.glowColor} 
        />


        {/* 08 - Next Project */}
        {nextProjectData && (
          <NextProject 
            nextSlug={nextProjectData.slug} 
            nextProject={nextProjectData.project} 
            currentGlowColor={project.glowColor} 
          />
        )}

        <Footer />
        <BreadcrumbSchema items={breadcrumbItems} />
      </div>
    </div>
  );
};

export default ProjectDetail;
