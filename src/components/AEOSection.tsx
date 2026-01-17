import { motion } from "framer-motion";
import { Search, Globe, Brain, Eye, Zap, Target } from "lucide-react";

const comparacao = [
  { seo: "Otimiza para crawlers", aeo: "Otimiza para modelos de linguagem" },
  { seo: "Foca em palavras-chave", aeo: "Foca em semântica e contexto" },
  { seo: "Ranqueia em resultados", aeo: "Aparece em respostas diretas" },
  { seo: "Depende de cliques", aeo: "Gera autoridade algorítmica" },
  { seo: "Compete por posição", aeo: "Torna-se fonte citável" },
];

const AEOSection = () => {
  return (
    <section id="aeo" className="relative py-24 md:py-32 bg-[#030303]">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,0,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,0,0,0.03)_0%,transparent_50%)]" />
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
            Answer Engine Optimization
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            O diferencial de 2026
          </h2>
          <p className="text-white/50 max-w-3xl mx-auto text-lg">
            SEO tradicional coloca você em listas. AEO coloca você em respostas.
            Quando alguém pergunta ao ChatGPT, Gemini ou Perplexity, 
            sua empresa precisa ser a fonte citada.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* O que é AEO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative p-8 bg-gradient-to-br from-[#0f0f0f] to-[#080808] border border-red-500/20 rounded-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-white font-bold text-xl">O que é AEO</h3>
              </div>
              
              <p className="text-white/70 leading-relaxed mb-6">
                <strong className="text-white">Answer Engine Optimization</strong> é a evolução do SEO para a era das IAs. 
                Enquanto SEO otimiza para buscadores tradicionais, AEO prepara seu conteúdo 
                para ser compreendido e citado por modelos de linguagem como GPT-4, Gemini e Claude.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Como IAs leem páginas</span>
                    <p className="text-white/50 text-sm">Estrutura semântica, entidades claras, contexto hierárquico, intenção definida</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Resultado</span>
                    <p className="text-white/50 text-sm">Sua empresa citada quando IAs respondem perguntas do seu mercado</p>
                  </div>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8">
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-red-500/50 to-transparent" />
                <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-red-500/50 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Comparação SEO vs AEO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative p-8 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/10 rounded-xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-white/40" />
                  <span className="text-white/40 font-medium">SEO Tradicional</span>
                </div>
                <div className="text-white/20">vs</div>
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-medium">AEO</span>
                </div>
              </div>

              <div className="space-y-4">
                {comparacao.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex-1 text-right">
                      <span className="text-white/50 text-sm">{item.seo}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <span className="text-white text-sm font-medium">{item.aeo}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom statement */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            <span className="text-red-400">Esta página foi construída com AEO.</span>{" "}
            Estrutura semântica, leitura por tópicos, entidades claras, intenção definida.
          </p>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
    </section>
  );
};

export default AEOSection;