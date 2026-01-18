import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que é AEO e como ele difere do SEO tradicional?",
    answer: "AEO (Answer Engine Optimization) é a evolução do SEO focada em otimizar conteúdo para mecanismos de resposta com IA, como ChatGPT, Gemini e Perplexity. Enquanto o SEO tradicional visa ranquear em buscadores como Google, o AEO garante que sua marca seja a resposta recomendada pelos assistentes de IA."
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer: "Os primeiros resultados começam a aparecer entre 30-60 dias após a implementação. A indexação por IAs e a construção de autoridade digital são processos progressivos, com melhorias contínuas ao longo de 3-6 meses."
  },
  {
    question: "Vocês trabalham com empresas de qualquer segmento?",
    answer: "Sim, nossa metodologia é adaptável a diversos segmentos. Trabalhamos com empresas B2B, B2C, startups, e-commerces, consultorias e empresas de serviços. O importante é ter um posicionamento claro e disposição para investir em presença digital estratégica."
  },
  {
    question: "Como funciona a automação com IA nos processos?",
    answer: "Implementamos automações inteligentes que otimizam desde a geração de conteúdo até análise de dados e atendimento. Usamos ferramentas como n8n, Make e APIs de IA para criar fluxos que economizam tempo e aumentam a precisão das suas operações."
  },
  {
    question: "Qual é o investimento necessário para começar?",
    answer: "O investimento varia conforme o escopo do projeto. Oferecemos desde pacotes de automação essencial até projetos de transformação digital completa. Entre em contato para um diagnóstico gratuito e proposta personalizada."
  },
  {
    question: "Vocês oferecem suporte contínuo após a implementação?",
    answer: "Sim, oferecemos suporte contínuo e acompanhamento mensal. Monitoramos métricas, ajustamos estratégias e garantimos que sua presença digital evolua junto com as mudanças nos algoritmos de IA."
  },
  {
    question: "Como a IA vai impactar meu negócio especificamente?",
    answer: "Durante o diagnóstico estratégico gratuito, analisamos seu negócio, concorrência e oportunidades específicas. Mapeamos exatamente onde a IA pode gerar mais valor: seja em visibilidade, automação de processos ou geração de leads qualificados."
  },
  {
    question: "Preciso ter conhecimento técnico para acompanhar o trabalho?",
    answer: "Não é necessário. Traduzimos toda a complexidade técnica em relatórios claros e reuniões objetivas. Você acompanha resultados e métricas de negócio, enquanto cuidamos de toda a implementação técnica."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden bg-background">

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Cyberpunk badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-sm font-mono uppercase tracking-wider">FAQ_SYSTEM</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Perguntas </span>
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-purple-500 bg-clip-text text-transparent">
              Frequentes
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos serviços de IA e transformação digital
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Decorative corner elements */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-red-500/50" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-red-500/50" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-red-500/50" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-red-500/50" />

            <div className="bg-card/50 backdrop-blur-xl border border-red-500/20 rounded-lg p-6 md:p-8">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <AccordionItem 
                      value={`item-${index}`} 
                      className="border border-red-500/10 rounded-lg px-4 bg-background/50 hover:border-red-500/30 transition-all duration-300 group"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-5">
                        <div className="flex items-start gap-4">
                          <span className="font-mono text-red-500/60 text-sm mt-1 group-hover:text-red-400 transition-colors">
                            [{String(index + 1).padStart(2, '0')}]
                          </span>
                          <span className="text-foreground font-medium text-lg group-hover:text-red-400 transition-colors">
                            {faq.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-12 pr-4 pb-5">
                        <div className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/50 to-purple-500/50" />
                          <p className="text-muted-foreground pl-4 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Ainda tem dúvidas? Entre em contato conosco
          </p>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
          >
            <span>Fale Conosco</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
