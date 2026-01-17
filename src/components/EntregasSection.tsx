import { motion } from "framer-motion";
import { Bot, BarChart3, Brain, Users, Workflow, Search } from "lucide-react";

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
    <section id="entregas" className="relative py-24 md:py-32 bg-black">
      {/* Scan lines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
      }} />

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
            O Que é Entregue
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Clareza técnica. Resultado prático.
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Cada entrega tem propósito definido e resultado mensurável.
          </p>
        </motion.div>

        {/* Entregas grid */}
        <div className="space-y-6">
          {entregas.map((entrega, index) => {
            const Icon = entrega.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative group">
                  {/* Main card */}
                  <div className="relative p-6 md:p-8 bg-gradient-to-r from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden group-hover:border-red-500/20 transition-all duration-500">
                    {/* Red accent line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-red-500/50 to-transparent" />
                    
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Icon & Title */}
                      <div className="flex items-center gap-4 lg:w-1/4">
                        <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                          <Icon className="w-6 h-6 text-red-400" />
                        </div>
                        <h3 className="text-white font-bold text-lg">{entrega.titulo}</h3>
                      </div>
                      
                      {/* Details */}
                      <div className="grid md:grid-cols-3 gap-4 lg:flex-1">
                        <div>
                          <span className="text-white/30 text-xs uppercase tracking-wider">O que é</span>
                          <p className="text-white/70 text-sm mt-1">{entrega.oQueE}</p>
                        </div>
                        <div>
                          <span className="text-white/30 text-xs uppercase tracking-wider">Para que serve</span>
                          <p className="text-white/70 text-sm mt-1">{entrega.paraQueSirve}</p>
                        </div>
                        <div>
                          <span className="text-red-400/80 text-xs uppercase tracking-wider">Resultado</span>
                          <p className="text-white text-sm mt-1 font-medium">{entrega.resultado}</p>
                        </div>
                      </div>
                    </div>

                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
    </section>
  );
};

export default EntregasSection;