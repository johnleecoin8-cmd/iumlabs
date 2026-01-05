import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { projectsData, getNextProject, ProjectData } from "@/data/projectsData";
import ProjectHero from "@/components/project-detail/ProjectHero";
import ProjectMetrics from "@/components/project-detail/ProjectMetrics";
import ProjectChallenge from "@/components/project-detail/ProjectChallenge";
import NextProject from "@/components/project-detail/NextProject";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { ArrowLeft } from "lucide-react";

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
    gallery: [],
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Back Navigation */}
      <div className="pt-24 pb-8 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-surface-base">
        <ProjectHero project={project} />
      </section>

      {/* Metrics Section */}
      <section className="bg-surface-odd">
        <ProjectMetrics metrics={project.metrics} glowColor={project.glowColor} />
      </section>

      {/* Challenge Section */}
      <section className="bg-surface-base">
        <ProjectChallenge 
          challenge={project.challenge} 
          services={project.services} 
          strategy={project.strategy} 
          glowColor={project.glowColor} 
        />
      </section>

      {/* Next Project */}
      {nextProjectData && (
        <section className="bg-surface-odd">
          <NextProject 
            nextSlug={nextProjectData.slug} 
            nextProject={nextProjectData.project} 
            currentGlowColor={project.glowColor} 
          />
        </section>
      )}

      <Footer />
      <BreadcrumbSchema items={breadcrumbItems} />
    </div>
  );
};

export default ProjectDetail;
