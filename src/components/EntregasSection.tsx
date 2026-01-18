import { motion } from "framer-motion";
import { Bot, BarChart3, Brain, Users, Workflow, Search } from "lucide-react";

const entregas = [
  { icon: Bot, titulo: "Automação com IA", resultado: "Economia de 20h+ por semana" },
  { icon: BarChart3, titulo: "Análise Estratégica", resultado: "Decisões baseadas em dados" },
  { icon: Brain, titulo: "Engenharia de Prompt", resultado: "Outputs 10x mais precisos" },
  { icon: Users, titulo: "Personas Treinadas", resultado: "Assistentes personalizados" },
  { icon: Workflow, titulo: "Agentes de IA", resultado: "Sistemas que executam" },
  { icon: Search, titulo: "SEO + AEO", resultado: "Visibilidade em todas as IAs" }
];

const EntregasSection = () => {
  return (
    <section id="entregas" className="relative py-32 md:py-48 bg-background">
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
            <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-medium">Entregas</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-2xl">
            Clareza técnica.<br/>
            <span className="text-white/40">Resultado prático.</span>
          </h2>
        </motion.div>

        {/* Lista minimalista */}
        <div className="space-y-1">
          {entregas.map((entrega, index) => {
            const Icon = entrega.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="group py-6 border-b border-white/5 hover:border-red-500/20 transition-colors">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <Icon className="w-5 h-5 text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                      <span className="text-white font-medium text-lg">{entrega.titulo}</span>
                    </div>
                    <span className="text-white/30 text-sm hidden md:block">{entrega.resultado}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EntregasSection;