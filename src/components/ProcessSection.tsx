import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Brain, Workflow, Rocket, Heart } from "lucide-react";
import { useRef } from "react";

const processSteps = [
  {
    id: 1,
    step: "Passo 1",
    icon: Phone,
    title: "Diagnóstico Inicial",
    description: "Agendamos uma call para entender seu negócio, processos atuais e identificar onde a IA pode gerar mais impacto e economia de tempo.",
  },
  {
    id: 2,
    step: "Passo 2",
    icon: Brain,
    title: "Estratégia Personalizada",
    description: "Desenvolvo uma estratégia sob medida combinando automações, análise de dados e otimização de IA específica para seus objetivos.",
  },
  {
    id: 3,
    step: "Passo 3",
    icon: Workflow,
    title: "Implementação",
    description: "Construo e integro as soluções de IA no seu fluxo de trabalho, com treinamento completo para sua equipe extrair o máximo valor.",
  },
  {
    id: 4,
    step: "Passo 4",
    icon: Rocket,
    title: "Otimização Contínua",
    description: "Monitoro resultados e otimizo continuamente as soluções para garantir ROI crescente e adaptação às novas tecnologias de IA.",
  },
];

const ProcessCard = ({ step, index }: { step: typeof processSteps[0]; index: number }) => {
  const Icon = step.icon;
  
  return (
    <motion.div
      className="process-card"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
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
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // All cards move left when scrolling down (progress 0->1 = x: 150 -> -150)
  const x = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section id="process" className="process-section" ref={sectionRef}>
      {/* Heading */}
      <div className="process-header">
        <motion.h2
          className="process-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Método de Implementação
        </motion.h2>
        <motion.p
          className="process-subheading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Um processo estruturado para integrar IA de forma eficiente no seu negócio
        </motion.p>
      </div>

      {/* Process Cards */}
      <div className="process-cards-wrapper">
        <motion.div className="process-cards" style={{ x }}>
          {processSteps.map((step, index) => (
            <ProcessCard key={step.id} step={step} index={index} />
          ))}
        </motion.div>
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
            <h3 className="process-footer-title">Suporte dedicado em cada etapa</h3>
          </div>
          <p className="process-footer-description">
            do diagnóstico à implementação, você nunca estará sozinho na jornada de IA
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ProcessSection;