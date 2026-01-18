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
    <section id="process" className="relative py-32 md:py-48 bg-background">
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
            <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-medium">Metodologia</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-2xl">
            Processo linear.<br/>
            <span className="text-white/40">Resultado previsível.</span>
          </h2>
        </motion.div>

        {/* Lista numerada minimalista */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          {etapas.map((etapa, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group"
            >
              <div className="flex items-baseline gap-6">
                <span className="text-red-500/40 font-mono text-sm group-hover:text-red-500 transition-colors">
                  {etapa.numero}
                </span>
                <span className="text-white/70 text-lg group-hover:text-white transition-colors">
                  {etapa.titulo}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetodologiaSection;