import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { projectsData, getNextProject, ProjectData } from "@/data/projectsData";
import ProjectHero from "@/components/project-detail/ProjectHero";
import ProjectMetrics from "@/components/project-detail/ProjectMetrics";
import ProjectChallenge from "@/components/project-detail/ProjectChallenge";
import ProjectGallery from "@/components/project-detail/ProjectGallery";
import Lightbox from "@/components/Lightbox";
import NextProject from "@/components/project-detail/NextProject";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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


  // Create CSS custom properties for the project color
  const projectColorStyles = {
    '--project-color': project.glowColor,
    '--project-color-10': `${project.glowColor}1A`,
    '--project-color-20': `${project.glowColor}33`,
    '--project-color-30': `${project.glowColor}4D`,
    '--project-color-50': `${project.glowColor}80`,
  } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-white p-0.5 sm:p-1 md:p-2">
      <div className="min-h-screen bg-[#0A0A0A] rounded-xl sm:rounded-2xl overflow-hidden relative" style={projectColorStyles}>
        {/* Persistent Project Color Ambient Glow */}
        <div 
          className="fixed top-0 left-0 w-[50vw] h-[50vh] pointer-events-none z-0 opacity-20"
          style={{ background: `radial-gradient(ellipse at 0% 0%, ${project.glowColor} 0%, transparent 60%)` }}
        />
        <div 
          className="fixed bottom-0 right-0 w-[40vw] h-[40vh] pointer-events-none z-0 opacity-15"
          style={{ background: `radial-gradient(ellipse at 100% 100%, ${project.glowColor} 0%, transparent 60%)` }}
        />
        
        <Navbar />
      
        
        {/* Hero Section */}
        <ProjectHero project={project} />

        {/* Key Result Marquee */}
      <div className="py-4 overflow-hidden relative" style={{ backgroundColor: project.glowColor }}>
        <div className="flex animate-marquee whitespace-nowrap relative">
          {[...Array(3)].map((_, repeatIndex) => (
            project.metrics.map((metric, i) => (
              <span key={`${repeatIndex}-${i}`} className="mx-8 text-black text-sm font-bold uppercase tracking-widest flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-black/30" />
                {metric.value} {metric.label}
              </span>
            ))
          ))}
        </div>
      </div>

        {/* 01 - Metrics Section */}
        <ProjectMetrics metrics={project.metrics} glowColor={project.glowColor} />

        {/* 02 - Challenge & Approach Section */}
        <ProjectChallenge 
          challenge={project.challenge} 
          services={project.services} 
          strategy={project.strategy} 
          glowColor={project.glowColor} 
        />

        {/* 03 - Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <ProjectGallery 
            gallery={project.gallery} 
            glowColor={project.glowColor}
            onOpenLightbox={(index) => {
              setLightboxIndex(index);
              setLightboxOpen(true);
            }}
          />
        )}

        {/* Lightbox */}
        {project.gallery && project.gallery.length > 0 && (
          <Lightbox
            images={project.gallery.map(g => ({ src: g.src, alt: g.title || '', title: g.title, description: g.description }))}
            currentIndex={lightboxIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            onNavigate={setLightboxIndex}
          />
        )}

        {/* 04 - Next Project */}
        {nextProjectData && (
          <NextProject 
            nextSlug={nextProjectData.slug} 
            nextProject={nextProjectData.project} 
            currentGlowColor={project.glowColor} 
          />
        )}

        <Footer />
      </div>
    </div>
  );
};

export default ProjectDetail;
