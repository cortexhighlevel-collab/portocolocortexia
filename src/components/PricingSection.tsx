import { motion } from "framer-motion";
import { Check, MessageCircle, ArrowUpRight } from "lucide-react";

const PricingSection = () => {
  const starterFeatures = [
    "Premium Template Design",
    "Up to 3 Pages",
    "2 Rounds of Revisions",
    "Basic SEO Setup (To get you found on Google)",
    "Fully Responsive (Mobile, Tablet & Desktop)",
    "Email Support"
  ];

  const premiumFeatures = [
    "100% Custom Design",
    "5 Pages",
    "3 Rounds of Revisions",
    "Technical SEO & Speed Optimization",
    "Fully Responsive (Mobile, Tablet & Large Screens)",
    "Advanced Animations & Interactions",
    "Complex Functionality (CMS, Integrations)",
    "WhatsApp & Email Support"
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
          Flexible Pricing for Every Stage
        </motion.h2>
        <motion.p
          className="pricing-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Whether you're launching an MVP or scaling a brand, I have a plan for you. Don't let budget stop you. Let's chat and find a solution to bring your project to life.
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
              <h3 className="pricing-card-name">Starter Kit</h3>
              <div className="pricing-card-badge pricing-card-badge-light">
                <span>Popular</span>
              </div>
            </div>
            <div className="pricing-card-divider" />
            <div className="pricing-card-price-section">
              <span className="pricing-card-price">$999</span>
              <p className="pricing-card-description">
                Premium templates & essential features for businesses ready to launch fast
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
                <span>Best Value</span>
              </div>
            </div>
            <div className="pricing-card-divider pricing-card-divider-dark" />
            <div className="pricing-card-price-section">
              <span className="pricing-card-price pricing-card-price-dark">Starts at $2,000</span>
              <p className="pricing-card-description pricing-card-description-dark">
                Tailored design & advanced tech for businesses seeking impact.
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
              <h4 className="custom-quote-title">Custom Quote</h4>
            </div>
            <a 
              href="#contact" 
              className="custom-quote-button"
            >
              <span>Contact Me</span>
              <div className="custom-quote-button-icon">
                <ArrowUpRight size={16} />
              </div>
            </a>
          </div>
          <p className="custom-quote-description">
            These prices cover Web Design & Dev projects. For AI, Apps, or other custom needs, reach out for a bespoke quote.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default PricingSection;
