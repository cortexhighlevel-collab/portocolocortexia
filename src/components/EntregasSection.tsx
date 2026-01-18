import { motion } from "framer-motion";
import { Bot, BarChart3, Brain, Users, Workflow, Search, ArrowRight } from "lucide-react";

const entregas = [
  { icon: Bot, titulo: "Automação com IA" },
  { icon: BarChart3, titulo: "Análise Estratégica" },
  { icon: Brain, titulo: "Engenharia de Prompt" },
  { icon: Users, titulo: "Personas Treinadas" },
  { icon: Workflow, titulo: "Agentes de IA" },
  { icon: Search, titulo: "SEO + AEO" }
];

const EntregasSection = () => {
  return (
    <section id="entregas" className="relative py-40 md:py-56 bg-background overflow-hidden">
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
            <span className="text-red-500 text-sm uppercase tracking-[0.3em]">Entregas</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Clareza técnica.
            <span className="text-white/30 block mt-2">Resultado prático.</span>
          </h2>
        </motion.div>

        {/* Lista estilo terminal */}
        <div className="space-y-2">
          {entregas.map((entrega, index) => {
            const Icon = entrega.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <motion.div 
                  className="group relative p-6 bg-gradient-to-r from-[#0a0a0a] to-transparent border-l-2 border-white/5 hover:border-red-500/50 transition-all duration-300 cursor-default"
                  whileHover={{ x: 10 }}
                >
                  {/* Scan effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <Icon className="w-5 h-5 text-red-500/50 group-hover:text-red-400 transition-colors" />
                      <span className="text-white/70 text-lg group-hover:text-white transition-colors">
                        {entrega.titulo}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-red-400 transition-colors" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EntregasSection;