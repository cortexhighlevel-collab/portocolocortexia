import { motion } from "framer-motion";
import { Building2, Briefcase, Users, Lightbulb, Code } from "lucide-react";

const segmentos = [
  {
    icon: Building2,
    titulo: "Empresas",
    problema: "Usam IA de forma fragmentada, sem estratégia unificada",
    solucao: "Sistema cognitivo integrado que conecta todas as operações"
  },
  {
    icon: Briefcase,
    titulo: "Agências",
    problema: "Entregam serviços manuais que não escalam",
    solucao: "Automações inteligentes que multiplicam capacidade de entrega"
  },
  {
    icon: Lightbulb,
    titulo: "Infoprodutores",
    problema: "Perdem horas em tarefas repetitivas de conteúdo",
    solucao: "Agentes de IA que produzem, distribuem e otimizam automaticamente"
  },
  {
    icon: Users,
    titulo: "Times Internos",
    problema: "Dependem de conhecimento centralizado em poucas pessoas",
    solucao: "Personas treinadas que democratizam conhecimento corporativo"
  },
  {
    icon: Code,
    titulo: "Profissionais de IA",
    problema: "Sabem usar ferramentas, mas falta estratégia de negócio",
    solucao: "Framework de aplicação que conecta técnica a resultado"
  }
];

const ParaQuemSection = () => {
  return (
    <section id="para-quem" className="relative py-24 md:py-32 bg-background">

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
            Para Quem É
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Segmentação clara
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Cada perfil tem um problema específico. Cada problema tem uma solução aplicada.
          </p>
        </motion.div>

        {/* Segmentos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {segmentos.map((segmento, index) => {
            const Icon = segmento.icon;
            return (
              <motion.div
                key={index}
                className={`${index === 4 ? 'lg:col-start-2' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative h-full p-8 bg-gradient-to-br from-[#0a0a0a] to-[#080808] border border-white/5 rounded-xl group hover:border-red-500/20 transition-all duration-500 overflow-hidden">
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Icon */}
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center mb-6 border border-red-500/20">
                    <Icon className="w-7 h-7 text-red-400" />
                  </div>
                  
                  {/* Título */}
                  <h3 className="relative z-10 text-white font-bold text-xl mb-4">
                    {segmento.titulo}
                  </h3>
                  
                  {/* Problema */}
                  <div className="relative z-10 mb-4">
                    <span className="text-red-400/60 text-xs uppercase tracking-wider">Problema</span>
                    <p className="text-white/50 text-sm mt-1">{segmento.problema}</p>
                  </div>
                  
                  {/* Solução */}
                  <div className="relative z-10">
                    <span className="text-red-400 text-xs uppercase tracking-wider">Solução</span>
                    <p className="text-white/80 text-sm mt-1 font-medium">{segmento.solucao}</p>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default ParaQuemSection;