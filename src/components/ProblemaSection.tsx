import { motion } from "framer-motion";
import { AlertTriangle, XCircle, Eye, Bot, Search, Brain } from "lucide-react";

const problemas = [
  {
    icon: Bot,
    titulo: "IA usada de forma rasa",
    descricao: "Empresas tratam IA como ferramenta genérica. Sem estratégia. Sem personalização. Sem resultados reais."
  },
  {
    icon: Brain,
    titulo: "Prompts fracos e genéricos",
    descricao: "Comandos vagos geram respostas medíocres. Sem engenharia de prompt, a IA entrega apenas o básico."
  },
  {
    icon: AlertTriangle,
    titulo: "Automação sem inteligência",
    descricao: "Workflows mecânicos que não aprendem. Tarefas automatizadas sem contexto estratégico."
  },
  {
    icon: XCircle,
    titulo: "SEO tradicional está morto",
    descricao: "Otimizar para Google não basta. ChatGPT, Gemini, Perplexity ignoram sites sem estrutura semântica."
  },
  {
    icon: Eye,
    titulo: "Invisíveis para mecanismos de resposta",
    descricao: "Sua empresa não aparece quando IAs respondem perguntas do seu mercado. Você não existe para a nova busca."
  },
  {
    icon: Search,
    titulo: "Sem agentes treinados",
    descricao: "Nenhum assistente de IA entende seu negócio. Respostas genéricas. Zero personalização corporativa."
  }
];

const ProblemaSection = () => {
  return (
    <section id="problema" className="relative py-24 md:py-32 bg-black">
      {/* Grid cyberpunk de fundo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
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
            O Problema Real
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Por que empresas estão perdendo para a IA
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            A maioria usa inteligência artificial como brinquedo. 
            Enquanto isso, concorrentes constroem sistemas cognitivos reais.
          </p>
        </motion.div>

        {/* Grid de problemas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemas.map((problema, index) => {
            const Icon = problema.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Card */}
                <div className="relative p-6 bg-gradient-to-br from-[#0a0a0a] to-[#111111] border border-red-500/20 rounded-lg overflow-hidden group-hover:border-red-500/40 transition-colors">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Icon */}
                  <div className="relative z-10 w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="relative z-10 text-white font-semibold text-lg mb-2">
                    {problema.titulo}
                  </h3>
                  <p className="relative z-10 text-white/50 text-sm leading-relaxed">
                    {problema.descricao}
                  </p>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16">
                    <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-red-500/50 to-transparent" />
                    <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-red-500/50 to-transparent" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-white/40 text-sm uppercase tracking-[0.2em]">
            IA não é futuro. É agora. Quem não adapta, desaparece.
          </p>
        </motion.div>
      </div>

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
    </section>
  );
};

export default ProblemaSection;