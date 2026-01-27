import { motion } from "framer-motion";
import comoIaEntendeBg from "@/assets/como-ia-entende-bg.svg";

const ComoIAEntendeSection = () => {
  return (
    <section id="como-ia-entende" className="relative py-32 md:py-48 bg-background overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Título centralizado no topo */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Como a IA <span className="text-gradient-accent">entende você</span>
          </h2>
        </motion.div>

        {/* SVG centralizado */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.1 }}
        >
          <img 
            src={comoIaEntendeBg} 
            alt="Como a IA entende você" 
            className="w-full max-w-[1747px] h-auto rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ComoIAEntendeSection;