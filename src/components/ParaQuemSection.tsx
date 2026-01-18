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
    <section id="para-quem" className="relative py-32 md:py-48 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-medium">Para Quem</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Segmentação clara
          </h2>
        </motion.div>

        {/* Grid horizontal */}
        <div className="flex flex-wrap gap-4">
          {segmentos.map((segmento, index) => {
            const Icon = segmento.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 px-6 py-4 bg-white/[0.02] border border-white/5 rounded-full hover:border-red-500/30 hover:bg-red-500/5 transition-all cursor-default group">
                  <Icon className="w-4 h-4 text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="text-white/70 group-hover:text-white transition-colors">{segmento.titulo}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ParaQuemSection;