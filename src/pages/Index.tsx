import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      <section id="services" className="min-h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold">Services</h2>
      </section>
      
      <section id="projects" className="min-h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold">Projects</h2>
      </section>
      
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
