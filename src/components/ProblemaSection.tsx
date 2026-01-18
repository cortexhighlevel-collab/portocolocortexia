import { motion } from "framer-motion";
import { AlertTriangle, XCircle, Eye, Bot, Search, Brain } from "lucide-react";

const problemas = [
  {
    icon: Bot,
    titulo: "IA usada de forma rasa",
    descricao: "Sem estratégia. Sem personalização.",
  },
  {
    icon: Brain,
    titulo: "Prompts fracos",
    descricao: "Comandos vagos, respostas medíocres.",
  },
  {
    icon: AlertTriangle,
    titulo: "Automação sem inteligência",
    descricao: "Workflows que não aprendem.",
  },
  {
    icon: XCircle,
    titulo: "SEO tradicional morto",
    descricao: "IAs ignoram sites sem estrutura.",
  },
  {
    icon: Eye,
    titulo: "Invisíveis para IA",
    descricao: "Você não existe para a nova busca.",
  },
  {
    icon: Search,
    titulo: "Sem agentes treinados",
    descricao: "Respostas genéricas. Zero personalização.",
  }
];

const ProblemaSection = () => {
  return (
    <section id="problema" className="relative py-32 md:py-48 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-medium">O Problema</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl">
            Por que empresas estão
            <span className="text-red-500"> perdendo</span> para a IA
          </h2>
        </motion.div>

        {/* Grid minimalista */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {problemas.map((problema, index) => {
            const Icon = problema.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 group-hover:border-red-500/40 transition-colors">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-white font-semibold text-lg mb-1">{problema.titulo}</h3>
                    <p className="text-white/40 text-sm">{problema.descricao}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemaSection;