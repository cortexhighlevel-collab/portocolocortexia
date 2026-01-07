import { motion } from "framer-motion";
import { Phone, Palette, Code, Package, Heart } from "lucide-react";

const processSteps = [
  {
    id: 1,
    step: "Step 1",
    icon: Phone,
    title: "Let's Get In Touch",
    description: "Start by reaching out through our contact page. Fill out the form or book a call to discuss your project, goals, and ideas in even greater detail.",
  },
  {
    id: 2,
    step: "Step 2",
    icon: Palette,
    title: "Grab Your Designs",
    description: "Tell me your unique vision, and I'll create stunning, functional designs that perfectly align with your goals and bring your ideas to life seamlessly.",
  },
  {
    id: 3,
    step: "Step 3",
    icon: Code,
    title: "Kickstart Development",
    description: "I expertly transform your designs into a powerful, scalable solution, fully ready to launch and optimized for performance, usability, and growth.",
  },
  {
    id: 4,
    step: "Step 4",
    icon: Package,
    title: "And Hand Over",
    description: "Receive a fully tested, polished, high-quality product tailored to your needs with support for seamless performance and long-term success.",
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
          Process is Everything
        </motion.h2>
        <motion.p
          className="process-subheading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Simple, streamlined process is what get's you results
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
            <h3 className="process-footer-title">I am with you in every step</h3>
          </div>
          <p className="process-footer-description">
            alongside you at each step for seamless experience
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ProcessSection;
