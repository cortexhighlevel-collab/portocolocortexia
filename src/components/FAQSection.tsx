import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { id: "FAQ_001", pergunta: "Como funciona a consultoria de IA?", resposta: "Analisamos seu negócio, criamos personas treinadas e implementamos agentes de IA autônomos." },
  { id: "FAQ_002", pergunta: "Qual o prazo de implementação?", resposta: "O processo completo leva de 4 a 8 semanas." },
  { id: "FAQ_003", pergunta: "Preciso de conhecimento técnico?", resposta: "Não. Cuidamos de toda a parte técnica." },
  { id: "FAQ_004", pergunta: "Os agentes funcionam sozinhos?", resposta: "Sim. Operam 24/7 com monitoramento contínuo." }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-32 md:py-48 bg-background overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <motion.div className="mb-16" initial={{ opacity: 1, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-red-500 font-mono text-xs">{">"}</span>
            <span className="text-white/40 font-mono text-xs">help --faq</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">PERGUNTAS <span className="text-red-500">FREQUENTES</span></h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 1, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: index * 0.1 }}>
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className={`w-full text-left p-5 bg-[#0a0a0a] border transition-all ${openIndex === index ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'}`}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-red-500/50 font-mono text-xs">{faq.id}</span>
                    <span className={openIndex === index ? 'text-white' : 'text-white/70'}>{faq.pergunta}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-red-500/50 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                </div>
                {openIndex === index && <div className="pt-4 pl-12"><div className="p-4 bg-white/5 border-l-2 border-red-500/30"><p className="text-white/50 text-sm font-mono">{faq.resposta}</p></div></div>}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;