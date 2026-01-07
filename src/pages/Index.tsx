import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Demo content to show nav scrolling */}
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold text-foreground">Welcome</h1>
          <p className="text-xl text-muted-foreground">Scroll down to see the floating navigation</p>
        </div>
      </div>
      
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
