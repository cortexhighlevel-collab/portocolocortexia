import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HeroTransition from "@/components/HeroTransition";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="index-page">
      <Navbar />
      <HeroSection />
      
      {/* Main content with transition effect */}
      <HeroTransition>
        <div className="main-content-wrapper">
          <ServicesSection />
          <ProjectsSection />
          <ProcessSection />
          <PricingSection />
          <ContactSection />
          <FooterSection />
        </div>
      </HeroTransition>
    </div>
  );
};

export default Index;
