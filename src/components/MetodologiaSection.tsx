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
    <section id="process" className="relative py-24 md:py-32 bg-[#020202] overflow-hidden">
      {/* DNA Helix background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 bottom-0 w-px">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-red-500/30 to-transparent" />
        </div>
        {/* Animated DNA nodes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500/30 rounded-full"
            style={{ top: `${12 + i * 11}%` }}
            animate={{
              x: [0, 30, 0, -30, 0],
              scale: [1, 1.2, 1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-500" />
            <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-medium">Metodologia</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-500" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Processo linear. <span className="text-red-400">Resultado previsível.</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            Cada etapa tem entrada e saída definidas. IA adora estrutura linear.
          </p>
        </motion.div>

        {/* Timeline - Alternating sides */}
        <div className="relative">
          {/* Center line - Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500/50 via-red-500/30 to-red-500/10 hidden lg:block">
            {/* Animated pulse */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-red-500 to-transparent"
              animate={{ y: ['-100%', '500%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="space-y-6 lg:space-y-0">
            {etapas.map((etapa, index) => {
              const Icon = etapa.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className={`relative lg:flex lg:items-center lg:min-h-[120px] ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Card */}
                  <div className={`lg:w-[45%] ${isLeft ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <motion.div 
                      className="relative p-6 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 rounded-xl group hover:border-red-500/30 transition-all duration-500"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      {/* Glow on hover */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex items-start gap-4 relative z-10">
                        {/* Number with icon */}
                        <div className="relative">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center border border-red-500/30 group-hover:border-red-500/60 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] transition-all duration-500">
                            <span className="text-red-400 font-bold text-lg font-mono">{etapa.numero}</span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-md bg-black border border-red-500/30 flex items-center justify-center">
                            <Icon className="w-3 h-3 text-red-400" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg group-hover:text-red-100 transition-colors">{etapa.titulo}</h3>
                          <p className="text-white/40 text-sm mt-1 group-hover:text-white/60 transition-colors">{etapa.descricao}</p>
                        </div>
                      </div>

                      {/* Progress indicator */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 overflow-hidden rounded-b-xl">
                        <motion.div
                          className="h-full bg-gradient-to-r from-red-500 to-red-400"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Center dot with connector - Desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                    <motion.div 
                      className="relative w-5 h-5 rounded-full bg-red-500 border-4 border-black z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1, type: "spring" }}
                    >
                      <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30" />
                    </motion.div>
                    {/* Connector line */}
                    <div className={`absolute w-12 h-px bg-gradient-to-r ${isLeft ? 'right-full from-transparent to-red-500/50' : 'left-full from-red-500/50 to-transparent'}`} />
                  </div>

                  {/* Empty space for other side - Desktop */}
                  <div className="hidden lg:block lg:w-[45%]" />
                </motion.div>
              );
            })}
          </div>

          {/* End marker */}
          <motion.div 
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -bottom-8 items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <div className="w-4 h-4 rotate-45 bg-red-500/50 border border-red-500" />
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
    </section>
  );
};

export default MetodologiaSection;