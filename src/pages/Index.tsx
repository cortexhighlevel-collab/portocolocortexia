import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <PricingSection />
      
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold">Contact</h2>
      </section>
    </div>
  );
};

export default Index;
