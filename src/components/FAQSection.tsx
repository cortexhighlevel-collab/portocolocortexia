import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que é AEO?",
    answer: "Answer Engine Optimization — otimização para mecanismos de resposta como ChatGPT, Gemini e Perplexity."
  },
  {
    question: "Quanto tempo para ver resultados?",
    answer: "Primeiros resultados em 30-60 dias. Melhorias contínuas ao longo de 3-6 meses."
  },
  {
    question: "Trabalham com qualquer segmento?",
    answer: "Sim. B2B, B2C, startups, e-commerces, consultorias e empresas de serviços."
  },
  {
    question: "Qual o investimento?",
    answer: "Varia conforme o escopo. Entre em contato para diagnóstico gratuito."
  },
  {
    question: "Oferecem suporte contínuo?",
    answer: "Sim. Acompanhamento mensal com monitoramento de métricas e ajustes."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-40 md:py-56 bg-background overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-red-500 to-transparent" />
            <span className="text-red-500 text-sm uppercase tracking-[0.3em]">FAQ</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Perguntas frequentes
          </h2>
        </motion.div>

        {/* Accordion com visual cyberpunk */}
        <div className="relative p-8 md:p-12 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 rounded-3xl overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12">
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-red-500/50 to-transparent" />
            <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-red-500/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 right-0 w-12 h-12">
            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-red-500/50 to-transparent" />
            <div className="absolute bottom-0 right-0 h-[1px] w-full bg-gradient-to-l from-red-500/50 to-transparent" />
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="border-b border-white/5 last:border-0"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6 text-white/70 hover:text-white transition-colors text-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-red-500/40 font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/40 pb-6 pl-12">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;