import { motion } from "framer-motion";

const resultados = [
  { metric: "+80%", label: "Eficiência" },
  { metric: "10x", label: "Decisões" },
  { metric: "-70%", label: "Esforço" },
  { metric: "24/7", label: "Operação" },
];

const ResultadoSection = () => {
  return (
    <section id="resultado" className="relative py-40 md:py-56 bg-background overflow-hidden">
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
            <span className="text-red-500 text-sm uppercase tracking-[0.3em]">Resultado</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Transformação objetiva
          </h2>
        </motion.div>

        {/* Métricas com visual impactante */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-32">
          {resultados.map((resultado, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="relative inline-block">
                <span className="text-5xl md:text-6xl font-bold text-red-500 block mb-3">
                  {resultado.metric}
                </span>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-red-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-white/30 text-sm uppercase tracking-wider">{resultado.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Statement final */}
        <motion.div
          className="relative p-12 md:p-16 border border-white/5 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          
          <p className="relative z-10 text-3xl md:text-4xl font-bold text-white text-center">
            Inteligência aplicada.
            <span className="text-white/20"> Não discurso.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultadoSection;