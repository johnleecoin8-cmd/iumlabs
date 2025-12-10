import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Page Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Our Projects</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            성공적으로 런칭한 Web3 프로젝트들을 확인하세요.
            각 프로젝트의 성장 스토리와 성과를 공유합니다.
          </p>
        </div>
      </section>

      <PortfolioSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Projects;
