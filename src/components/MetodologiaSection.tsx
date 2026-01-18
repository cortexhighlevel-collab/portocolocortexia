import { motion } from "framer-motion";

const etapas = [
  { numero: "01", titulo: "Diagnóstico Estratégico" },
  { numero: "02", titulo: "Leitura do Negócio" },
  { numero: "03", titulo: "Criação de Personas" },
  { numero: "04", titulo: "Engenharia de Prompts" },
  { numero: "05", titulo: "Construção de Agentes" },
  { numero: "06", titulo: "Integração com Automações" },
  { numero: "07", titulo: "Otimização SEO + AEO" },
  { numero: "08", titulo: "Monitoramento Contínuo" }
];

const MetodologiaSection = () => {
  return (
    <section id="process" className="relative py-40 md:py-56 bg-background overflow-hidden">
      {/* Vertical line accent */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/20 to-transparent hidden lg:block" />

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
            <span className="text-red-500 text-sm uppercase tracking-[0.3em]">Metodologia</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Processo linear.
            <span className="text-white/30 block mt-2">Resultado previsível.</span>
          </h2>
        </motion.div>

        {/* Timeline grid */}
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
          {etapas.map((etapa, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative"
            >
              <div className="flex items-center gap-6">
                {/* Number with glow */}
                <div className="relative">
                  <span className="text-4xl font-bold text-red-500/20 group-hover:text-red-500/40 transition-colors font-mono">
                    {etapa.numero}
                  </span>
                  <div className="absolute inset-0 bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Title */}
                <span className="text-white/60 text-xl group-hover:text-white transition-colors">
                  {etapa.titulo}
                </span>
              </div>

              {/* Progress line */}
              <motion.div 
                className="absolute -bottom-6 left-0 h-px bg-gradient-to-r from-red-500/30 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetodologiaSection;