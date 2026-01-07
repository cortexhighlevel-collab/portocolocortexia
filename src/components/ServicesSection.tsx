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
    title: "Design & Desenvolvimento Web",
    description: "Tenha um site único criado por um designer-desenvolvedor híbrido. Combino estética moderna com código robusto e SEO avançado para criar uma experiência digital rápida e focada em vendas.",
    hasImage: true,
    imageUrl: "https://framerusercontent.com/images/z2UMpz1bWIGSAfsaxn5lm6e9Uw.png",
  },
  {
    id: 2,
    icon: MessageSquare,
    title: "Consultorias Estratégicas",
    description: "Tenha clareza sobre seu próximo passo digital. Seja uma auditoria de site, um roadmap de redesign ou brainstorming de workflows de IA, forneço insights acionáveis alinhados aos seus objetivos.",
    hasImage: false,
  },
  {
    id: 3,
    icon: Palette,
    title: "Design UI/UX",
    description: "Eleve sua experiência do usuário. Projeto interfaces intuitivas e de alta conversão para web e apps mobile que fortalecem o valor da sua marca.",
    hasImage: false,
  },
  {
    id: 4,
    icon: Bot,
    title: "Automações com IA",
    description: "Otimize suas operações. Construo chatbots de IA personalizados e workflows inteligentes com n8n para automatizar seu marketing e tarefas repetitivas.",
    hasImage: false,
    hasTicker: true,
  },
];

const moreServicesRow1 = [
  { icon: Workflow, label: "Workflows n8n" },
  { icon: PenTool, label: "Wireframing" },
  { icon: FileText, label: "Copywriting" },
  { icon: Database, label: "Configuração CMS" },
];

const moreServicesRow2 = [
  { icon: Code, label: "Código Personalizado" },
  { icon: Search, label: "SEO" },
  { icon: Frame, label: "Especialista Framer" },
  { icon: MessageCircle, label: "Bots WhatsApp" },
  { icon: LayoutTemplate, label: "Landing Pages" },
  { icon: Gauge, label: "Otimização" },
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
              Como Posso Ajudar Seu Negócio
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
            <span className="services-cta-text">Entre em Contato</span>
            <div className="services-cta-icon">
              <ArrowUpRight className="w-5 h-5 text-primary-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.a>
        </div>

        {/* Bento Grid */}
        <div className="services-bento">
          {/* Left Column - Large card on top, small on bottom */}
          <div className="services-bento-left">
            <ServiceCard service={services[0]} index={0} large />
            <ServiceCard service={services[1]} index={1} />
          </div>
          
          {/* Right Column - Small card on top, large on bottom */}
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
