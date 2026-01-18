import { motion } from "framer-motion";
import { AlertTriangle, XCircle, Eye, Bot, Search, Brain } from "lucide-react";

const problemas = [
  { icon: Bot, titulo: "IA usada de forma rasa" },
  { icon: Brain, titulo: "Prompts fracos e genéricos" },
  { icon: AlertTriangle, titulo: "Automação sem inteligência" },
  { icon: XCircle, titulo: "SEO tradicional está morto" },
  { icon: Eye, titulo: "Invisíveis para IA" },
  { icon: Search, titulo: "Sem agentes treinados" }
];

const ProblemaSection = () => {
  return (
    <section id="problema" className="relative py-40 md:py-56 bg-background overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.5) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 mb-8 px-4 py-2 border border-red-500/30 rounded-full bg-red-500/5"
            whileHover={{ borderColor: "rgba(239,68,68,0.5)" }}
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-sm uppercase tracking-[0.2em]">Alerta</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl">
            Por que empresas estão
            <span className="text-red-500 block mt-2">perdendo para a IA</span>
          </h2>
        </motion.div>

        {/* Grid com cards cyberpunk */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemas.map((problema, index) => {
            const Icon = problema.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative p-8 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-500">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Icon */}
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20 group-hover:border-red-500/40 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  
                  <h3 className="relative z-10 text-white font-semibold text-xl group-hover:text-red-100 transition-colors">
                    {problema.titulo}
                  </h3>

                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-red-500/50 to-transparent" />
                    <div className="absolute bottom-0 right-0 h-[1px] w-full bg-gradient-to-l from-red-500/50 to-transparent" />
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

export default ProblemaSection;