import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Globe, 
  MessageSquare, 
  Palette, 
  Bot, 
  Workflow,
  PenTool,
  FileText,
  Database,
  Code,
  Search,
  Frame,
  MessageCircle,
  LayoutTemplate,
  Gauge
} from "lucide-react";

const services = [
  {
    id: 1,
    icon: Globe,
    title: "Website Design & Development",
    description: "Get a unique website built by a hybrid designer-developer. I combine modern aesthetics with robust coding and advanced SEO to create a fast, sales-focused digital experience.",
    hasImage: true,
    imageUrl: "https://framerusercontent.com/images/z2UMpz1bWIGSAfsaxn5lm6e9Uw.png",
  },
  {
    id: 2,
    icon: MessageSquare,
    title: "Strategic Consultations",
    description: "Get clarity on your next digital move. Whether it's a website audit, a redesign roadmap, or brainstorming custom AI workflows, I provide actionable insights tailored to your goals.",
    hasImage: false,
  },
  {
    id: 3,
    icon: Palette,
    title: "UI/UX Design",
    description: "Elevate your user experience. I design intuitive, high-converting interfaces for web and mobile apps that strengthen your brand value.",
    hasImage: false,
  },
  {
    id: 4,
    icon: Bot,
    title: "AI Automations",
    description: "Streamline your operations. I build custom AI chatbots and smart n8n workflows to automate your marketing and repetitive tasks.",
    hasImage: false,
    hasTicker: true,
  },
];

const moreServicesRow1 = [
  { icon: Workflow, label: "n8n Workflows" },
  { icon: PenTool, label: "Wireframing" },
  { icon: FileText, label: "Copywriting" },
  { icon: Database, label: "CMS Setup" },
];

const moreServicesRow2 = [
  { icon: Code, label: "Custom Code" },
  { icon: Search, label: "SEO" },
  { icon: Frame, label: "Framer Expert" },
  { icon: MessageCircle, label: "WhatsApp Bots" },
  { icon: LayoutTemplate, label: "Landing Pages" },
  { icon: Gauge, label: "Optimization" },
];

const ServiceCard = ({ 
  service, 
  index, 
  large = false 
}: { 
  service: typeof services[0]; 
  index: number;
  large?: boolean;
}) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      className={`service-card ${large ? 'service-card-large' : ''}`}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="service-card-content">
        <div className="service-card-header">
          <Icon className="service-card-icon" />
          <h3 className="service-card-title">{service.title}</h3>
        </div>
        <p className="service-card-description">{service.description}</p>
      </div>
      
      {service.hasImage && service.imageUrl && (
        <div className="service-card-image-wrapper">
          <img 
            src={service.imageUrl} 
            alt={service.title}
            className="service-card-image"
          />
        </div>
      )}
      
      {service.hasTicker && (
        <div className="service-ticker-wrapper">
          <div className="service-ticker">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="service-ticker-track">
                <img 
                  src="https://framerusercontent.com/images/oIGhfvN53u0EvH5kU4bPiROQG08.png"
                  alt="AI Workflow"
                  className="service-ticker-image"
                />
                <img 
                  src="https://framerusercontent.com/images/INtkAKpewmr6irum9hjjXZnqsVk.png"
                  alt="Chatbot"
                  className="service-ticker-image"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ServicePill = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="service-pill">
    <Icon className="service-pill-icon" />
    <span className="service-pill-text">{label}</span>
  </div>
);

const ServicesSection = () => {
  return (
    <section id="services" className="services-section">
      <div className="services-container">
        {/* Top Section - Heading and CTA */}
        <div className="services-header">
          <div className="services-heading-wrapper">
            <motion.h2
              className="services-heading"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              How I Can Help Your Business
            </motion.h2>
          </div>
          
          <motion.a
            href="https://tidycal.com/reemtech/30-minute-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="services-cta-button group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="services-cta-text">Get in Touch</span>
            <div className="services-cta-icon">
              <ArrowUpRight className="w-5 h-5 text-primary-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.a>
        </div>

        {/* Bento Grid */}
        <div className="services-bento">
          {/* Left Column */}
          <div className="services-bento-left">
            <ServiceCard service={services[0]} index={0} large />
            <ServiceCard service={services[1]} index={1} />
          </div>
          
          {/* Right Column */}
          <div className="services-bento-right">
            <ServiceCard service={services[2]} index={2} />
            <ServiceCard service={services[3]} index={3} large />
          </div>
        </div>

        {/* More Services Ticker - Row 1 */}
        <motion.div
          className="services-more-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="services-more-ticker">
            <div className="services-more-track">
              {[...moreServicesRow1, ...moreServicesRow1, ...moreServicesRow1].map((service, index) => (
                <ServicePill key={index} icon={service.icon} label={service.label} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* More Services Ticker - Row 2 */}
        <motion.div
          className="services-more-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="services-more-ticker">
            <div className="services-more-track services-more-track-reverse">
              {[...moreServicesRow2, ...moreServicesRow2, ...moreServicesRow2].map((service, index) => (
                <ServicePill key={index} icon={service.icon} label={service.label} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Border */}
      <div className="services-border" />
    </section>
  );
};

export default ServicesSection;
