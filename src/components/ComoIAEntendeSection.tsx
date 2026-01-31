import { motion } from "framer-motion";
import ComoIAEntendeSVG from "./ComoIAEntendeSVG";

const ComoIAEntendeSection = () => {
  // Container animation with stagger for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  // Individual element animations
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };
  
  return (
    <section id="como-ia-entende" className="relative py-32 md:py-48 bg-background overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Título centralizado no topo */}
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Como a IA <span className="text-gradient-accent">entende você</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Treinamos modelos para interpretar seu negócio e operar de forma autônoma.
            </p>
          </motion.div>

          {/* SVG animado com efeito sequencial */}
          <div className="flex justify-center">
            <ComoIAEntendeSVG />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComoIAEntendeSection;