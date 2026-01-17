import { motion } from "framer-motion";
import { TrendingUp, Clock, Brain, Zap, Eye } from "lucide-react";

const resultados = [
  {
    icon: TrendingUp,
    titulo: "Mais eficiência",
    descricao: "Operações otimizadas. Menos desperdício. Mais output."
  },
  {
    icon: Brain,
    titulo: "Decisão baseada em dados",
    descricao: "Insights de IA substituem intuição. Menos risco. Mais acerto."
  },
  {
    icon: Clock,
    titulo: "Menos esforço operacional",
    descricao: "Automações cuidam do repetitivo. Time foca no estratégico."
  },
  {
    icon: Zap,
    titulo: "Mais previsibilidade",
    descricao: "Processos padronizados. Resultados consistentes. Escala real."
  },
  {
    icon: Eye,
    titulo: "Presença em respostas de IA",
    descricao: "Sua empresa citada quando IAs respondem perguntas do seu mercado."
  }
];

const ResultadoSection = () => {
  return (
    <section id="resultado" className="relative py-24 md:py-32 bg-[#030303]">
      {/* Radial glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.08)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-medium">
            Resultado Final
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Transformação objetiva
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Sem promessas irreais. Resultados mensuráveis. Impacto comprovado.
          </p>
        </motion.div>

        {/* Results grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {resultados.map((resultado, index) => {
            const Icon = resultado.icon;
            return (
              <motion.div
                key={index}
                className={`${index === 3 ? 'lg:col-start-1' : ''} ${index === 4 ? 'lg:col-start-2' : ''}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative p-8 bg-gradient-to-br from-[#0f0f0f] to-[#080808] border border-red-500/10 rounded-xl text-center group hover:border-red-500/30 transition-all duration-500">
                  {/* Icon */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center mx-auto mb-6 border border-red-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-red-400" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="relative z-10 text-white font-bold text-xl mb-3">
                    {resultado.titulo}
                  </h3>
                  
                  {/* Description */}
                  <p className="relative z-10 text-white/50 text-sm">
                    {resultado.descricao}
                  </p>

                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Final statement */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative p-10 bg-gradient-to-r from-red-500/10 via-[#0a0a0a] to-red-500/10 border border-red-500/30 rounded-2xl text-center">
            <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
              Inteligência aplicada.
              <br />
              <span className="text-red-400">Não discurso.</span>
            </p>
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-red-500 to-transparent" />
              <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-red-500 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-12 h-12">
              <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-red-500 to-transparent" />
              <div className="absolute bottom-0 right-0 h-[2px] w-full bg-gradient-to-l from-red-500 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
    </section>
  );
};

export default ResultadoSection;