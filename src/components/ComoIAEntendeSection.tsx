import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const ComoIAEntendeSection = () => {
  return (
    <section id="como-ia-entende" className="relative py-40 md:py-56 bg-background overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Statement central com visual impactante */}
        <motion.div
          className="relative p-12 md:p-20 bg-gradient-to-br from-red-500/5 via-[#0a0a0a] to-[#050505] border border-red-500/20 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]" />
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-24 h-24">
            <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-red-500 to-transparent" />
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-red-500 to-transparent" />
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24">
            <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-red-500 to-transparent" />
            <div className="absolute bottom-0 right-0 h-[2px] w-full bg-gradient-to-l from-red-500 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Brain className="w-12 h-12 text-red-500/50 mx-auto mb-10" />
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
              "Nós entendemos como a IA pensa."
            </h2>
            
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              Por isso construímos páginas que ela consegue ler, interpretar e citar.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComoIAEntendeSection;