import { motion } from "framer-motion";
import { Search, Globe, Brain, Eye, Zap, Target, ArrowRight } from "lucide-react";

const comparacao = [
  { seo: "Otimiza para crawlers", aeo: "Otimiza para modelos de linguagem" },
  { seo: "Foca em palavras-chave", aeo: "Foca em semântica e contexto" },
  { seo: "Ranqueia em resultados", aeo: "Aparece em respostas diretas" },
  { seo: "Depende de cliques", aeo: "Gera autoridade algorítmica" },
  { seo: "Compete por posição", aeo: "Torna-se fonte citável" },
];

const AEOSection = () => {
  return (
    <section id="aeo" className="relative py-24 md:py-32 bg-background overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6"
            whileHover={{ scale: 1.05, borderColor: "rgba(239,68,68,0.5)" }}
          >
            <Search className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm uppercase tracking-wider font-medium">Answer Engine Optimization</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            O diferencial de <span className="text-red-400">2026</span>
          </h2>
          <p className="text-white/40 max-w-3xl mx-auto text-lg">
            SEO tradicional coloca você em listas. <span className="text-white/70">AEO coloca você em respostas.</span>
          </p>
        </motion.div>

        {/* Main content - Split view */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* O que é AEO - Left panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
            <div className="relative h-full p-8 md:p-10 bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#080808] border border-red-500/20 rounded-2xl overflow-hidden group hover:border-red-500/40 transition-all duration-500">
              {/* Animated corner brackets */}
              <motion.div 
                className="absolute top-0 left-0 w-12 h-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-red-500 to-transparent" />
                <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-red-500 to-transparent" />
              </motion.div>
              <motion.div 
                className="absolute bottom-0 right-0 w-12 h-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-red-500 to-transparent" />
                <div className="absolute bottom-0 right-0 h-[2px] w-full bg-gradient-to-l from-red-500 to-transparent" />
              </motion.div>

              <div className="flex items-center gap-3 mb-8">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/30 to-red-500/10 flex items-center justify-center border border-red-500/30"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Brain className="w-6 h-6 text-red-400" />
                </motion.div>
                <div>
                  <h3 className="text-white font-bold text-xl">O que é AEO</h3>
                  <span className="text-white/30 text-xs font-mono">DEFINITION_MODULE</span>
                </div>
              </div>
              
              <p className="text-white/60 leading-relaxed mb-8 text-lg">
                <span className="text-red-400 font-semibold">Answer Engine Optimization</span> é a evolução do SEO para a era das IAs. 
                Enquanto SEO otimiza para buscadores tradicionais, AEO prepara seu conteúdo 
                para ser compreendido e citado por modelos de linguagem.
              </p>

              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/5 group/item hover:border-red-500/20 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Eye className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Como IAs leem páginas</span>
                    <p className="text-white/40 text-sm mt-1">Estrutura semântica, entidades claras, contexto hierárquico</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/5 group/item hover:border-red-500/20 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Target className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Resultado</span>
                    <p className="text-white/40 text-sm mt-1">Sua empresa citada quando IAs respondem perguntas do seu mercado</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Comparação SEO vs AEO - Right panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full"
          >
            <div className="relative h-full p-8 md:p-10 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/10 rounded-2xl overflow-hidden">
              {/* Header row */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-white/30" />
                  <span className="text-white/30 font-medium uppercase tracking-wider text-sm">SEO Tradicional</span>
                </div>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 text-red-500" />
                </motion.div>
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-medium uppercase tracking-wider text-sm">AEO</span>
                </div>
              </div>

              <div className="space-y-4">
                {comparacao.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.02] transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex-1 text-right">
                      <span className="text-white/40 text-sm">{item.seo}</span>
                    </div>
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 flex items-center justify-center border border-red-500/30"
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Zap className="w-4 h-4 text-red-400" />
                    </motion.div>
                    <div className="flex-1">
                      <span className="text-white text-sm font-medium">{item.aeo}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom badge */}
              <motion.div 
                className="mt-8 pt-6 border-t border-white/5 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-white/20 text-xs font-mono uppercase tracking-wider">
                  Evolução necessária para 2026
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom statement */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 border border-red-500/20 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <p className="text-white/70 text-lg">
              <span className="text-red-400 font-medium">Esta página foi construída com AEO.</span>
            </p>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default AEOSection;