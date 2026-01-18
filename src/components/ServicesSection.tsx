import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Bot, 
  Brain,
  Search,
  MessageSquare,
  Users,
  Sparkles,
  Target,
  Workflow,
  FileText,
  Zap,
  BarChart3,
  Globe,
  Layers
} from "lucide-react";

const services = [
  {
    id: 1,
    icon: Bot,
    title: "Automação com IA",
    description: "Automatize tarefas repetitivas e escale suas operações. Construo workflows inteligentes com n8n, Make e ferramentas de IA para liberar seu tempo e aumentar a produtividade.",
    hasImage: true,
    imageUrl: "https://framerusercontent.com/images/oIGhfvN53u0EvH5kU4bPiROQG08.png",
  },
  {
    id: 2,
    icon: Brain,
    title: "Análise Estratégica com IA",
    description: "Tome decisões baseadas em dados. Utilizo IA para analisar seu negócio, identificar oportunidades e criar estratégias personalizadas para crescimento exponencial.",
    hasImage: false,
  },
  {
    id: 3,
    icon: Search,
    title: "AEO & SEO",
    description: "Domine os mecanismos de busca tradicionais e as novas IAs. Otimizo seu conteúdo para Google, ChatGPT, Perplexity e outros sistemas de resposta por IA.",
    hasImage: false,
  },
  {
    id: 4,
    icon: MessageSquare,
    title: "Engenharia de Prompt",
    description: "Maximize o potencial da IA para seu negócio. Desenvolvo prompts personalizados e sistemas de instrução para empresas e profissionais extraírem o máximo das ferramentas de IA.",
    hasImage: false,
    hasTicker: true,
  },
];

const moreServicesRow1 = [
  { icon: Users, label: "Treinamento de Personas" },
  { icon: Bot, label: "Agentes de IA" },
  { icon: Workflow, label: "Workflows n8n" },
  { icon: Sparkles, label: "ChatGPT Custom" },
];

const moreServicesRow2 = [
  { icon: Target, label: "AEO Optimization" },
  { icon: BarChart3, label: "Análise de Dados" },
  { icon: FileText, label: "Copywriting IA" },
  { icon: Globe, label: "SEO Avançado" },
  { icon: Zap, label: "Automações" },
  { icon: Layers, label: "Integrações API" },
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
      className={`service-card ${large ? 'service-card-large' : ''} group relative overflow-hidden`}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Cyberpunk scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent animate-scan-line" />
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Glitch overlay on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-purple-500/10 mix-blend-overlay" />
      </div>
      
      <div className="service-card-content relative z-10">
        <div className="service-card-header">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="service-card-icon group-hover:text-red-400 transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
          </motion.div>
          <h3 className="service-card-title group-hover:text-red-100 transition-colors duration-300">{service.title}</h3>
        </div>
        <p className="service-card-description">{service.description}</p>
      </div>
      
      {service.hasImage && service.imageUrl && (
        <div className="service-card-image-wrapper relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          <img 
            src={service.imageUrl} 
            alt={service.title}
            className="service-card-image group-hover:scale-110 transition-transform duration-500"
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
      
      {/* Neon glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_30px_rgba(239,68,68,0.15)]" />
    </motion.div>
  );
};

const ServicePill = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <motion.div 
    className="service-pill group relative overflow-hidden"
    whileHover={{ scale: 1.05, y: -2 }}
    transition={{ duration: 0.2 }}
  >
    {/* Glowing border effect */}
    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-red-500/20" />
    <Icon className="service-pill-icon group-hover:text-red-400 transition-colors duration-300" />
    <span className="service-pill-text group-hover:text-red-100 transition-colors duration-300">{label}</span>
  </motion.div>
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
              Soluções de IA para Seu Negócio
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
            <span className="services-cta-text">Agendar Consultoria</span>
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