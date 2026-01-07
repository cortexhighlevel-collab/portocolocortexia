import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      
      <section id="process" className="min-h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold">Process</h2>
      </section>
      
      <section id="pricing" className="min-h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold">Pricing</h2>
      </section>
      
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold">Contact</h2>
      </section>
    </div>
  );
};

export default Index;
