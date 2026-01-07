import { motion } from "framer-motion";
import { Check, MessageCircle, ArrowUpRight } from "lucide-react";

const PricingSection = () => {
  const starterFeatures = [
    "Design com Template Premium",
    "Até 3 Páginas",
    "2 Rodadas de Revisões",
    "Configuração SEO Básico (Para ser encontrado no Google)",
    "Totalmente Responsivo (Mobile, Tablet & Desktop)",
    "Suporte por Email"
  ];

  const premiumFeatures = [
    "Design 100% Personalizado",
    "5 Páginas",
    "3 Rodadas de Revisões",
    "SEO Técnico & Otimização de Velocidade",
    "Totalmente Responsivo (Mobile, Tablet & Telas Grandes)",
    "Animações & Interações Avançadas",
    "Funcionalidades Complexas (CMS, Integrações)",
    "Suporte WhatsApp & Email"
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
          Preços Flexíveis para Cada Etapa
        </motion.h2>
        <motion.p
          className="pricing-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Seja lançando um MVP ou escalando uma marca, tenho um plano para você. Não deixe o orçamento te impedir. Vamos conversar e encontrar uma solução para dar vida ao seu projeto.
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
              <h3 className="pricing-card-name">Kit Inicial</h3>
              <div className="pricing-card-badge pricing-card-badge-light">
                <span>Popular</span>
              </div>
            </div>
            <div className="pricing-card-divider" />
            <div className="pricing-card-price-section">
              <span className="pricing-card-price">R$ 4.999</span>
              <p className="pricing-card-description">
                Templates premium & recursos essenciais para empresas prontas para lançar rápido
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
              <h3 className="pricing-card-name pricing-card-name-dark">Premium</h3>
              <div className="pricing-card-badge pricing-card-badge-dark">
                <span>Melhor Valor</span>
              </div>
            </div>
            <div className="pricing-card-divider pricing-card-divider-dark" />
            <div className="pricing-card-price-section">
              <span className="pricing-card-price pricing-card-price-dark">A partir de R$ 9.999</span>
              <p className="pricing-card-description pricing-card-description-dark">
                Design personalizado & tecnologia avançada para empresas que buscam impacto.
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
              <h4 className="custom-quote-title">Orçamento Personalizado</h4>
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
            Esses preços cobrem projetos de Web Design & Dev. Para IA, Apps ou outras necessidades personalizadas, entre em contato para um orçamento sob medida.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default PricingSection;
