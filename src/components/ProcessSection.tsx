import { motion } from "framer-motion";
import { Phone, Palette, Code, Package, Heart } from "lucide-react";

const processSteps = [
  {
    id: 1,
    step: "Passo 1",
    icon: Phone,
    title: "Vamos Conversar",
    description: "Comece entrando em contato pela nossa página. Preencha o formulário ou agende uma chamada para discutir seu projeto, objetivos e ideias em detalhes.",
  },
  {
    id: 2,
    step: "Passo 2",
    icon: Palette,
    title: "Receba Seus Designs",
    description: "Conte-me sua visão única e criarei designs impressionantes e funcionais que se alinham perfeitamente com seus objetivos e dão vida às suas ideias.",
  },
  {
    id: 3,
    step: "Passo 3",
    icon: Code,
    title: "Início do Desenvolvimento",
    description: "Transformo seus designs em uma solução poderosa e escalável, pronta para lançar e otimizada para performance, usabilidade e crescimento.",
  },
  {
    id: 4,
    step: "Passo 4",
    icon: Package,
    title: "Entrega Final",
    description: "Receba um produto testado, polido e de alta qualidade, personalizado para suas necessidades, com suporte para performance contínua e sucesso a longo prazo.",
  },
];

const ProcessCard = ({ step, index }: { step: typeof processSteps[0]; index: number }) => {
  const Icon = step.icon;
  
  return (
    <motion.div
      className="process-card"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Icon */}
      <div className="process-card-icon-wrapper">
        <Icon className="process-card-icon" />
      </div>

      {/* Content */}
      <div className="process-card-content">
        <h3 className="process-card-title">{step.title}</h3>
        <p className="process-card-description">{step.description}</p>
      </div>

      {/* Separator Line */}
      <div className="process-card-line" />

      {/* Step Badge */}
      <div className="process-card-badge">
        <span className="process-card-badge-text">{step.step}</span>
      </div>
    </motion.div>
  );
};

const ProcessSection = () => {
  return (
    <section id="process" className="process-section">
      {/* Heading */}
      <div className="process-header">
        <motion.h2
          className="process-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          O Processo é Tudo
        </motion.h2>
        <motion.p
          className="process-subheading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Um processo simples e organizado é o que traz resultados
        </motion.p>
      </div>

      {/* Process Cards */}
      <div className="process-cards-wrapper">
        <div className="process-cards">
          {processSteps.map((step, index) => (
            <ProcessCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Footer Card */}
      <motion.div
        className="process-footer-card"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="process-footer-content">
          <div className="process-footer-header">
            <Heart className="process-footer-icon" />
            <h3 className="process-footer-title">Estou com você em cada etapa</h3>
          </div>
          <p className="process-footer-description">
            ao seu lado em cada passo para uma experiência perfeita
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ProcessSection;
