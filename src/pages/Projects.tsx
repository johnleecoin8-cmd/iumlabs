import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";
import SpecialOfferForm from "@/components/SpecialOfferForm";
import PageTransition from "@/components/PageTransition";
import { projectsPage } from "@/config/content";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageTransition>
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">{projectsPage.pageTitle}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {projectsPage.pageDescription}
            </p>
          </div>
        </section>

        <PortfolioSection />
        <CTASection />
        <SpecialOfferForm />
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Projects;
