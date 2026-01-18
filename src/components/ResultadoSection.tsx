import { motion } from "framer-motion";

const resultados = [
  { metric: "+80%", label: "Mais eficiência" },
  { metric: "10x", label: "Decisões melhores" },
  { metric: "-70%", label: "Menos esforço" },
  { metric: "24/7", label: "Previsibilidade" },
];

const ResultadoSection = () => {
  return (
    <section id="resultado" className="relative py-32 md:py-48 bg-background">
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
            <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-medium">Resultado</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Transformação objetiva
          </h2>
        </motion.div>

        {/* Métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-24">
          {resultados.map((resultado, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <span className="text-4xl md:text-5xl font-bold text-red-500 block mb-2">
                {resultado.metric}
              </span>
              <span className="text-white/40 text-sm">{resultado.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Statement final */}
        <motion.div
          className="border-t border-white/5 pt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-2xl md:text-4xl font-bold text-white max-w-2xl">
            Inteligência aplicada.
            <span className="text-white/30"> Não discurso.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultadoSection;