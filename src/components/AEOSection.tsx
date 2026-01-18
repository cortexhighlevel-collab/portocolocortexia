import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const comparacao = [
  { seo: "Otimiza para crawlers", aeo: "Otimiza para LLMs" },
  { seo: "Foca em palavras-chave", aeo: "Foca em semântica" },
  { seo: "Ranqueia em resultados", aeo: "Aparece em respostas" },
  { seo: "Depende de cliques", aeo: "Gera autoridade" },
  { seo: "Compete por posição", aeo: "Torna-se fonte citável" },
];

const AEOSection = () => {
  return (
    <section id="aeo" className="relative py-40 md:py-56 bg-background overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 mb-8 px-4 py-2 border border-red-500/30 rounded-full bg-red-500/5"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-red-400 text-sm uppercase tracking-[0.2em]">AEO</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            O diferencial de <span className="text-red-500">2026</span>
          </h2>
          <p className="text-white/40 text-xl mt-6 max-w-xl">
            SEO coloca você em listas. AEO coloca você em respostas.
          </p>
        </motion.div>

        {/* Comparação com visual cyberpunk */}
        <div className="relative p-10 md:p-16 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 rounded-3xl overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20">
            <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-red-500/50 to-transparent" />
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-red-500/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20">
            <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-red-500/50 to-transparent" />
            <div className="absolute bottom-0 right-0 h-[2px] w-full bg-gradient-to-l from-red-500/50 to-transparent" />
          </div>

          {/* Headers */}
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
            <span className="text-white/30 text-sm uppercase tracking-[0.2em]">SEO Tradicional</span>
            <ArrowRight className="w-5 h-5 text-red-500/50" />
            <span className="text-red-400 text-sm uppercase tracking-[0.2em]">AEO</span>
          </div>

          {/* Items */}
          <div className="space-y-8">
            {comparacao.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-between gap-8"
              >
                <span className="flex-1 text-white/30 text-right">{item.seo}</span>
                <div className="w-3 h-3 rounded-full border border-red-500/30 bg-red-500/10" />
                <span className="flex-1 text-white">{item.aeo}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AEOSection;