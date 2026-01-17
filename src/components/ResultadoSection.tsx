import { motion } from "framer-motion";
import { TrendingUp, Clock, Brain, Zap, Eye, CheckCircle2 } from "lucide-react";

const resultados = [
  {
    icon: TrendingUp,
    titulo: "Mais eficiência",
    descricao: "Operações otimizadas. Menos desperdício. Mais output.",
    metric: "+80%"
  },
  {
    icon: Brain,
    titulo: "Decisão baseada em dados",
    descricao: "Insights de IA substituem intuição. Menos risco. Mais acerto.",
    metric: "10x"
  },
  {
    icon: Clock,
    titulo: "Menos esforço operacional",
    descricao: "Automações cuidam do repetitivo. Time foca no estratégico.",
    metric: "-70%"
  },
  {
    icon: Zap,
    titulo: "Mais previsibilidade",
    descricao: "Processos padronizados. Resultados consistentes. Escala real.",
    metric: "24/7"
  },
  {
    icon: Eye,
    titulo: "Presença em respostas de IA",
    descricao: "Sua empresa citada quando IAs respondem perguntas do seu mercado.",
    metric: "TOP"
  }
];

const ResultadoSection = () => {
  return (
    <section id="resultado" className="relative py-24 md:py-40 bg-[#030303] overflow-hidden">
      {/* Radial glow - Intense */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,0,139,0.08)_0%,transparent_40%)]" />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-red-500/5 blur-3xl"
          style={{ left: '10%', top: '20%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-purple-500/5 blur-3xl"
          style={{ right: '15%', bottom: '30%' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 text-red-500 text-sm uppercase tracking-[0.3em] font-medium mb-6"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Resultado Final</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transformação <span className="text-red-400">objetiva</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            Sem promessas irreais. Resultados mensuráveis. Impacto comprovado.
          </p>
        </motion.div>

        {/* Results grid - Metric cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {resultados.map((resultado, index) => {
            const Icon = resultado.icon;
            return (
              <motion.div
                key={index}
                className={`${index === 3 ? 'lg:col-start-1' : ''} ${index === 4 ? 'lg:col-start-2' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div 
                  className="relative h-full p-8 bg-gradient-to-br from-[#0f0f0f] to-[#080808] border border-white/5 rounded-2xl text-center group hover:border-red-500/30 transition-all duration-500 overflow-hidden"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Metric badge - Top right */}
                  <motion.div 
                    className="absolute top-4 right-4 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  >
                    <span className="text-red-400 text-sm font-bold font-mono">{resultado.metric}</span>
                  </motion.div>

                  {/* Icon with glow */}
                  <motion.div 
                    className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center mx-auto mb-6 border border-red-500/30 group-hover:border-red-500/60 transition-all duration-500"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Icon className="w-8 h-8 text-red-400 group-hover:text-red-300 transition-colors" />
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="relative z-10 text-white font-bold text-xl mb-3 group-hover:text-red-100 transition-colors">
                    {resultado.titulo}
                  </h3>
                  
                  {/* Description */}
                  <p className="relative z-10 text-white/40 text-sm group-hover:text-white/60 transition-colors">
                    {resultado.descricao}
                  </p>

                  {/* Bottom glow line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Final statement - Big and bold */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative p-12 md:p-16 bg-gradient-to-r from-red-500/10 via-[#0a0a0a] to-red-500/10 border border-red-500/30 rounded-3xl text-center overflow-hidden">
            {/* Background pulse */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1)_0%,transparent_70%)]" />
            
            {/* Scan lines */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <motion.div
                className="absolute w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
                animate={{ y: ['-100%', '500%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <motion.p 
              className="relative z-10 text-3xl md:text-5xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Inteligência aplicada.
              <br />
              <span className="text-red-400">Não discurso.</span>
            </motion.p>
            
            {/* Corner accents - Larger */}
            <div className="absolute top-0 left-0 w-16 h-16">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-500 to-transparent" />
              <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-red-500 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16">
              <div className="absolute bottom-0 right-0 w-[3px] h-full bg-gradient-to-t from-red-500 to-transparent" />
              <div className="absolute bottom-0 right-0 h-[3px] w-full bg-gradient-to-l from-red-500 to-transparent" />
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