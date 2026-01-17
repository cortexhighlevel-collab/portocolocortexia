import { motion } from "framer-motion";
import { Bot, BarChart3, Brain, Users, Sparkles, Search } from "lucide-react";

const camadas = [
  {
    icon: Bot,
    titulo: "Automação com IA",
    funcao: "Workflows inteligentes que aprendem",
    beneficio: "Reduza 80% do trabalho operacional repetitivo"
  },
  {
    icon: BarChart3,
    titulo: "Análise Estratégica",
    funcao: "Dados transformados em decisões",
    beneficio: "Tome decisões baseadas em inteligência, não intuição"
  },
  {
    icon: Brain,
    titulo: "Engenharia de Prompt",
    funcao: "Comandos precisos e estruturados",
    beneficio: "Extraia o máximo de qualquer modelo de IA"
  },
  {
    icon: Users,
    titulo: "Personas Treinadas",
    funcao: "IA que entende seu negócio",
    beneficio: "Assistentes que falam a língua da sua empresa"
  },
  {
    icon: Sparkles,
    titulo: "Agentes Inteligentes",
    funcao: "IA autônoma e especializada",
    beneficio: "Sistemas que executam, não apenas respondem"
  },
  {
    icon: Search,
    titulo: "SEO + AEO",
    funcao: "Otimização para humanos e IAs",
    beneficio: "Apareça em buscas tradicionais e respostas de IA"
  }
];

const NovaCamadaSection = () => {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#050505]">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.03)_0%,transparent_70%)]" />
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
          <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-medium">
            A Nova Camada
          </span>
          
          {/* Statement principal */}
          <div className="mt-8 mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Não usamos IA como ferramenta.
            </h2>
            <h2 className="text-3xl md:text-5xl font-bold mt-2" style={{
              background: 'linear-gradient(90deg, #ff4444, #ff0000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(255,0,0,0.3)'
            }}>
              Criamos sistemas cognitivos.
            </h2>
          </div>

          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Uma estrutura de inteligência aplicada que transforma operações, 
            decisões e presença digital.
          </p>
        </motion.div>

        {/* Grid de camadas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {camadas.map((camada, index) => {
            const Icon = camada.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Card */}
                <div className="relative h-full p-8 bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden group-hover:border-red-500/30 transition-all duration-500">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon container */}
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center mb-6 border border-red-500/20 group-hover:border-red-500/40 transition-colors">
                    <Icon className="w-7 h-7 text-red-400 group-hover:text-red-300 transition-colors" />
                  </div>
                  
                  {/* Título */}
                  <h3 className="relative z-10 text-white font-bold text-xl mb-3">
                    {camada.titulo}
                  </h3>
                  
                  {/* Função */}
                  <p className="relative z-10 text-white/40 text-sm mb-4 uppercase tracking-wide">
                    {camada.funcao}
                  </p>
                  
                  {/* Benefício */}
                  <p className="relative z-10 text-white/70 text-base leading-relaxed">
                    {camada.beneficio}
                  </p>

                  {/* Accent lines */}
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-red-500/30 via-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default NovaCamadaSection;