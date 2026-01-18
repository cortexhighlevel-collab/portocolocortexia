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
    answer: "AEO (Answer Engine Optimization) é a evolução do SEO focada em otimizar conteúdo para mecanismos de resposta com IA, como ChatGPT, Gemini e Perplexity."
  },
  {
    question: "Quanto tempo para ver resultados?",
    answer: "Os primeiros resultados aparecem entre 30-60 dias. Melhorias contínuas ao longo de 3-6 meses."
  },
  {
    question: "Trabalham com qualquer segmento?",
    answer: "Sim. B2B, B2C, startups, e-commerces, consultorias e empresas de serviços."
  },
  {
    question: "Como funciona a automação?",
    answer: "Implementamos workflows inteligentes usando n8n, Make e APIs de IA para otimizar operações."
  },
  {
    question: "Qual o investimento?",
    answer: "Varia conforme o escopo. Entre em contato para diagnóstico gratuito e proposta personalizada."
  },
  {
    question: "Oferecem suporte contínuo?",
    answer: "Sim. Acompanhamento mensal, monitoramento de métricas e ajustes de estratégia."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-32 md:py-48 bg-background">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-medium">FAQ</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Perguntas frequentes
          </h2>
        </motion.div>

        {/* Accordion minimalista */}
        <Accordion type="single" collapsible className="space-y-0">
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
                className="border-b border-white/5 py-2"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4 text-white/80 hover:text-white transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/40 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;