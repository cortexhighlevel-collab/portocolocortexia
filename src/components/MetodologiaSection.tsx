import { motion } from "framer-motion";
import { Search, Brain, Users, MessageSquare, Bot, Workflow, Target, BarChart3 } from "lucide-react";

const etapas = [
  {
    numero: "01",
    icon: Search,
    titulo: "Diagnóstico Estratégico",
    descricao: "Análise profunda do negócio, processos e oportunidades de IA"
  },
  {
    numero: "02",
    icon: Brain,
    titulo: "Leitura do Negócio",
    descricao: "Mapeamento de fluxos, gargalos e pontos de automação"
  },
  {
    numero: "03",
    icon: Users,
    titulo: "Criação de Personas",
    descricao: "Desenvolvimento de assistentes IA com conhecimento corporativo"
  },
  {
    numero: "04",
    icon: MessageSquare,
    titulo: "Engenharia de Prompts",
    descricao: "Construção de comandos estruturados para máxima eficiência"
  },
  {
    numero: "05",
    icon: Bot,
    titulo: "Construção de Agentes",
    descricao: "Desenvolvimento de sistemas autônomos especializados"
  },
  {
    numero: "06",
    icon: Workflow,
    titulo: "Integração com Automações",
    descricao: "Conexão com n8n, Make e APIs para fluxos completos"
  },
  {
    numero: "07",
    icon: Target,
    titulo: "Otimização SEO + AEO",
    descricao: "Preparação de conteúdo para buscadores e IAs"
  },
  {
    numero: "08",
    icon: BarChart3,
    titulo: "Monitoramento Contínuo",
    descricao: "Acompanhamento de métricas e otimização permanente"
  }
];

const MetodologiaSection = () => {
  return (
    <section id="process" className="relative py-24 md:py-32 bg-black">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,0,0,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,0,0,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
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
            Metodologia
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Processo linear. Resultado previsível.
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Cada etapa tem entrada e saída definidas. IA adora estrutura linear.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/50 via-red-500/20 to-transparent hidden lg:block" />

          <div className="space-y-8 lg:space-y-0">
            {etapas.map((etapa, index) => {
              const Icon = etapa.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className={`relative lg:flex lg:items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Card */}
                  <div className={`lg:w-[45%] ${isLeft ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="relative p-6 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 rounded-xl group hover:border-red-500/20 transition-colors">
                      <div className="flex items-start gap-4">
                        {/* Number */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                          <span className="text-red-400 font-bold text-lg">{etapa.numero}</span>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className="w-4 h-4 text-red-400" />
                            <h3 className="text-white font-semibold">{etapa.titulo}</h3>
                          </div>
                          <p className="text-white/50 text-sm">{etapa.descricao}</p>
                        </div>
                      </div>

                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-500 border-4 border-black z-10">
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20" />
                  </div>

                  {/* Empty space for other side */}
                  <div className="hidden lg:block lg:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
    </section>
  );
};

export default MetodologiaSection;