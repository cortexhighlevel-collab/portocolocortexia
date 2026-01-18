import { motion } from "framer-motion";

const comparacao = [
  { seo: "Otimiza para crawlers", aeo: "Otimiza para LLMs" },
  { seo: "Foca em palavras-chave", aeo: "Foca em semântica" },
  { seo: "Ranqueia em resultados", aeo: "Aparece em respostas" },
  { seo: "Depende de cliques", aeo: "Gera autoridade" },
  { seo: "Compete por posição", aeo: "Torna-se fonte citável" },
];

const AEOSection = () => {
  return (
    <section id="aeo" className="relative py-32 md:py-48 bg-background">
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
            <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-medium">AEO</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-3xl">
            O diferencial de <span className="text-red-500">2026</span>
          </h2>
          <p className="text-white/40 text-lg mt-6 max-w-xl">
            SEO coloca você em listas. AEO coloca você em respostas.
          </p>
        </motion.div>

        {/* Comparação lado a lado */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* SEO Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white/20 text-xs uppercase tracking-[0.2em] mb-6 block">SEO Tradicional</span>
            <div className="space-y-4">
              {comparacao.map((item, index) => (
                <p key={index} className="text-white/40">{item.seo}</p>
              ))}
            </div>
          </motion.div>

          {/* AEO Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-red-400 text-xs uppercase tracking-[0.2em] mb-6 block">Answer Engine Optimization</span>
            <div className="space-y-4">
              {comparacao.map((item, index) => (
                <p key={index} className="text-white">{item.aeo}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AEOSection;