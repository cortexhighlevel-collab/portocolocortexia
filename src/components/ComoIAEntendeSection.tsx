import { motion } from "framer-motion";
import comoIaEntendeBg from "@/assets/como-ia-entende-diagram.svg";
import comoIaEntendeMobile from "@/assets/como-ia-entende-mobile.svg";
import { useIsMobile } from "@/hooks/use-mobile";

const ComoIAEntendeSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="como-ia-entende" className="relative py-32 md:py-48 bg-background overflow-hidden">
      {/* CSS para efeito de brilho e animação */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4)) 
                    drop-shadow(0 0 16px rgba(168, 85, 247, 0.3))
                    drop-shadow(0 0 24px rgba(225, 29, 72, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.6)) 
                    drop-shadow(0 0 24px rgba(168, 85, 247, 0.5))
                    drop-shadow(0 0 36px rgba(225, 29, 72, 0.4));
          }
        }
        .diagram-glow {
          animation: glowPulse 3s ease-in-out infinite;
        }
      `}</style>
      
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
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Treinamos modelos para interpretar seu negócio e operar de forma autônoma.
          </p>
        </motion.div>

        {/* SVG centralizado com efeito de brilho */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.1 }}
        >
          <img 
            src={isMobile ? comoIaEntendeMobile : comoIaEntendeBg} 
            alt="Como a IA entende você" 
            className="w-full max-w-[874px] h-auto rounded-lg diagram-glow"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ComoIAEntendeSection;