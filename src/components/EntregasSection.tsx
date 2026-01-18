import { motion } from "framer-motion";
import { Bot, BarChart3, Brain, Users, Workflow, Search, ChevronRight } from "lucide-react";

const entregas = [
  {
    icon: Bot,
    titulo: "Automação com IA",
    oQueE: "Workflows inteligentes usando n8n, Make e APIs de IA",
    paraQueSirve: "Eliminar tarefas repetitivas e escalar operações",
    resultado: "Economia de 20+ horas semanais em processos manuais"
  },
  {
    icon: BarChart3,
    titulo: "Análise Estratégica com IA",
    oQueE: "Diagnóstico profundo usando modelos de linguagem avançados",
    paraQueSirve: "Transformar dados em insights acionáveis",
    resultado: "Decisões baseadas em inteligência, não intuição"
  },
  {
    icon: Brain,
    titulo: "Engenharia de Prompt",
    oQueE: "Desenvolvimento de prompts estruturados e otimizados",
    paraQueSirve: "Maximizar qualidade de outputs de qualquer IA",
    resultado: "Respostas 10x mais precisas e úteis"
  },
  {
    icon: Users,
    titulo: "Treinamento de Personas",
    oQueE: "IA customizada com conhecimento específico do seu negócio",
    paraQueSirve: "Criar assistentes que entendem sua empresa",
    resultado: "Atendimento e suporte com personalidade da marca"
  },
  {
    icon: Workflow,
    titulo: "Agentes de IA Personalizados",
    oQueE: "Sistemas autônomos que executam tarefas complexas",
    paraQueSirve: "Automatizar fluxos que exigem tomada de decisão",
    resultado: "IA que age, não apenas responde"
  },
  {
    icon: Search,
    titulo: "SEO Técnico + AEO",
    oQueE: "Otimização para buscadores tradicionais e IAs",
    paraQueSirve: "Aparecer em respostas de ChatGPT, Gemini, Perplexity",
    resultado: "Visibilidade em todos os mecanismos de resposta"
  }
];

const EntregasSection = () => {
  return (
    <section id="entregas" className="relative py-24 md:py-32 bg-background overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 text-red-500 text-sm uppercase tracking-[0.3em] font-medium mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>O Que é Entregue</span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Clareza técnica. <span className="text-red-400">Resultado prático.</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
            Cada entrega tem propósito definido e resultado mensurável.
          </p>
        </motion.div>

        {/* Entregas - Accordion style with terminal aesthetics */}
        <div className="space-y-4">
          {entregas.map((entrega, index) => {
            const Icon = entrega.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <motion.div 
                  className="relative group cursor-pointer"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Main card */}
                  <div className="relative p-6 md:p-8 bg-gradient-to-r from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden group-hover:border-red-500/30 transition-all duration-500">
                    {/* Index number */}
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-[80px] font-bold text-white/[0.02] pointer-events-none">
                      0{index + 1}
                    </div>
                    
                    {/* Red accent line with animation */}
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-red-500/50 to-transparent"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      style={{ originY: 0 }}
                    />
                    
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Icon & Title */}
                      <div className="flex items-center gap-4 lg:w-1/4">
                        <motion.div 
                          className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center border border-red-500/30 group-hover:border-red-500/60 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-500"
                          whileHover={{ rotate: 5 }}
                        >
                          <Icon className="w-7 h-7 text-red-400 group-hover:text-red-300 transition-colors" />
                        </motion.div>
                        <div>
                          <h3 className="text-white font-bold text-lg group-hover:text-red-100 transition-colors">{entrega.titulo}</h3>
                          <span className="text-white/20 text-xs font-mono">MODULE_{String(index + 1).padStart(2, '0')}</span>
                        </div>
                      </div>
                      
                      {/* Details with reveal animation */}
                      <div className="grid md:grid-cols-3 gap-6 lg:flex-1">
                        <div className="relative pl-4 border-l border-white/10">
                          <span className="text-white/20 text-[10px] uppercase tracking-widest font-mono">INPUT</span>
                          <p className="text-white/60 text-sm mt-1">{entrega.oQueE}</p>
                        </div>
                        <div className="relative pl-4 border-l border-white/10">
                          <span className="text-white/20 text-[10px] uppercase tracking-widest font-mono">PROCESS</span>
                          <p className="text-white/60 text-sm mt-1">{entrega.paraQueSirve}</p>
                        </div>
                        <div className="relative pl-4 border-l border-red-500/30">
                          <span className="text-red-400/60 text-[10px] uppercase tracking-widest font-mono">OUTPUT</span>
                          <p className="text-white text-sm mt-1 font-medium">{entrega.resultado}</p>
                        </div>
                      </div>
                      
                      {/* Arrow indicator */}
                      <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 group-hover:border-red-500/30 group-hover:bg-red-500/10 transition-all duration-300">
                        <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-red-400 transition-colors" />
                      </div>
                    </div>

                    {/* Hover scan effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default EntregasSection;