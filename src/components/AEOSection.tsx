import { motion } from "framer-motion";

const AEOSection = () => {
  return (
    <section id="aeo" className="relative py-32 md:py-48 bg-background overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <motion.div className="text-center mb-16" initial={{ opacity: 1, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 border border-white/10 rounded">
            <span className="font-mono text-xs text-white/40">SYSTEM COMPARISON</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">SEO vs <span className="text-red-500">AEO</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div className="relative p-8 bg-[#0a0a0a] border border-white/10" initial={{ opacity: 1, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.1 }}>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500/60 rounded-full" />
              <span className="text-yellow-500/60 font-mono text-xs">DEPRECATED</span>
            </div>
            <h3 className="text-2xl font-bold text-white/50 mb-6">SEO Tradicional</h3>
            <ul className="space-y-3 text-white/40 font-mono text-sm">
              <li className="flex items-center gap-2"><span className="text-red-500">✕</span> Keywords obsoletas</li>
              <li className="flex items-center gap-2"><span className="text-red-500">✕</span> Backlinks saturados</li>
              <li className="flex items-center gap-2"><span className="text-red-500">✕</span> Meta tags ignoradas</li>
            </ul>
          </motion.div>

          <motion.div className="relative p-8 bg-[#0a0a0a] border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]" initial={{ opacity: 1, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.1 }}>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 font-mono text-xs">ACTIVE</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">AEO <span className="text-red-500">Cortex</span></h3>
            <ul className="space-y-3 text-white/70 font-mono text-sm">
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> IA entende contexto</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Respostas diretas</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Otimização para LLMs</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AEOSection;