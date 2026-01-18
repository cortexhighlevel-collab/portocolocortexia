import { motion } from "framer-motion";
import { Building2, Briefcase, Users, Lightbulb, Code } from "lucide-react";

const segmentos = [
  { icon: Building2, titulo: "Empresas" },
  { icon: Briefcase, titulo: "Agências" },
  { icon: Lightbulb, titulo: "Infoprodutores" },
  { icon: Users, titulo: "Times Internos" },
  { icon: Code, titulo: "Profissionais de IA" }
];

const ParaQuemSection = () => {
  return (
    <section id="para-quem" className="relative py-40 md:py-56 bg-background">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-red-500 to-transparent" />
            <span className="text-red-500 text-sm uppercase tracking-[0.3em]">Para Quem</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Segmentação clara
          </h2>
        </motion.div>

        {/* Pills cyberpunk */}
        <div className="flex flex-wrap gap-4">
          {segmentos.map((segmento, index) => {
            const Icon = segmento.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <motion.div 
                  className="group flex items-center gap-4 px-8 py-5 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 rounded-2xl hover:border-red-500/30 transition-all duration-500 cursor-default"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-red-500/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                  
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 group-hover:border-red-500/40 transition-colors">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-white/70 font-medium group-hover:text-white transition-colors">
                    {segmento.titulo}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ParaQuemSection;