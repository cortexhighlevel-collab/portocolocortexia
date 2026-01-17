import { motion } from "framer-motion";
import { Check, MessageCircle, ArrowUpRight } from "lucide-react";

const PricingSection = () => {
  const starterFeatures = [
    "Diagnóstico de Processos",
    "1 Automação Completa",
    "Integração com até 3 Ferramentas",
    "Treinamento Básico de IA",
    "Prompts Personalizados",
    "Suporte por Email (30 dias)"
  ];

  const premiumFeatures = [
    "Análise Estratégica Completa",
    "Até 5 Automações",
    "Agente de IA Personalizado",
    "AEO & SEO Optimization",
    "Treinamento de Personas IA",
    "Integração Ilimitada de Ferramentas",
    "Engenharia de Prompt Avançada",
    "Suporte WhatsApp & Email (90 dias)"
  ];

  return (
    <section className="pricing-section" id="pricing">
      {/* Heading */}
      <div className="pricing-heading-wrapper">
        <motion.h2
          className="pricing-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Planos de Implementação IA
        </motion.h2>
        <motion.p
          className="pricing-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Seja automatizando tarefas ou implementando agentes de IA, tenho um plano para acelerar sua transformação digital. Vamos conversar e encontrar a solução ideal.
        </motion.p>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-cards-wrapper">
        {/* Starter Kit Card */}
        <motion.div
          className="pricing-card pricing-card-dark"
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="pricing-card-header">
            <div className="pricing-card-title-row">
              <h3 className="pricing-card-name">Automação Essencial</h3>
              <div className="pricing-card-badge pricing-card-badge-light">
                <span>Popular</span>
              </div>
            </div>
            <div className="pricing-card-divider" />
            <div className="pricing-card-price-section">
              <span className="pricing-card-price">R$ 2.999</span>
              <p className="pricing-card-description">
                Automações essenciais para empresas prontas para começar sua jornada de IA
              </p>
            </div>
          </div>
          
          <div className="pricing-card-separator" />
          
          <div className="pricing-card-features">
            {starterFeatures.map((feature, index) => (
              <div key={index} className="pricing-feature-item">
                <Check className="pricing-feature-icon" size={18} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Premium Card */}
        <motion.div
          className="pricing-card pricing-card-light"
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="pricing-card-header">
            <div className="pricing-card-title-row">
              <h3 className="pricing-card-name pricing-card-name-dark">Transformação IA</h3>
              <div className="pricing-card-badge pricing-card-badge-dark">
                <span>Melhor Valor</span>
              </div>
            </div>
            <div className="pricing-card-divider pricing-card-divider-dark" />
            <div className="pricing-card-price-section">
              <span className="pricing-card-price pricing-card-price-dark">A partir de R$ 7.999</span>
              <p className="pricing-card-description pricing-card-description-dark">
                Solução completa para empresas que buscam transformação digital com IA.
              </p>
            </div>
          </div>
          
          <div className="pricing-card-separator pricing-card-separator-dark" />
          
          <div className="pricing-card-features">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="pricing-feature-item pricing-feature-item-dark">
                <Check className="pricing-feature-icon pricing-feature-icon-dark" size={18} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Custom Quote Card */}
      <motion.div
        className="custom-quote-card"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="custom-quote-content">
          <div className="custom-quote-header">
            <div className="custom-quote-title-wrapper">
              <MessageCircle className="custom-quote-icon" size={24} />
              <h4 className="custom-quote-title">Projeto Personalizado</h4>
            </div>
            <a 
              href="#contact" 
              className="custom-quote-button"
            >
              <span>Fale Comigo</span>
              <div className="custom-quote-button-icon">
                <ArrowUpRight size={16} />
              </div>
            </a>
          </div>
          <p className="custom-quote-description">
            Precisa de agentes de IA sob medida, integrações complexas ou consultoria estratégica? Entre em contato para um orçamento personalizado.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default PricingSection;