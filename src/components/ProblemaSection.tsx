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
    <section id="problema" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Animated glitch grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(255,0,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,0,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          animation: 'grid-pulse 4s ease-in-out infinite'
        }} />
        {/* Diagonal scan effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-purple-900/10" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header with glitch effect */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block text-red-500 text-sm uppercase tracking-[0.3em] font-medium px-4 py-2 border border-red-500/30 bg-red-500/5 rounded-full"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239,68,68,0.3)" }}
          >
            ⚠ Alerta Crítico
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-6 mb-6">
            Por que empresas estão
            <span className="block mt-2" style={{
              background: 'linear-gradient(90deg, #ff4444, #ff0000, #cc0000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}> perdendo para a IA</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            A maioria usa inteligência artificial como brinquedo. 
            Enquanto isso, concorrentes constroem sistemas cognitivos reais.
          </p>
        </motion.div>

        {/* Grid de problemas - Hexagonal style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemas.map((problema, index) => {
            const Icon = problema.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Card with holographic effect */}
                <div className="relative p-6 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] border border-red-500/20 rounded-xl overflow-hidden group-hover:border-red-500/50 transition-all duration-500">
                  {/* Scan line animation */}
                  <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent animate-scan-line" />
                  </div>
                  
                  {/* Glitch overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Error indicator */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-red-400 font-mono">ERR</span>
                  </div>
                  
                  {/* Icon with pulse ring */}
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center mb-4 border border-red-500/30 group-hover:border-red-500/60 transition-colors">
                    <Icon className="w-7 h-7 text-red-400 group-hover:text-red-300 transition-colors" />
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-xl border border-red-500/30 animate-ping opacity-0 group-hover:opacity-30" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="relative z-10 text-white font-bold text-lg mb-2 group-hover:text-red-100 transition-colors">
                    {problema.titulo}
                  </h3>
                  <p className="relative z-10 text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                    {problema.descricao}
                  </p>

                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom warning ticker */}
        <motion.div
          className="mt-16 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-4 py-4 border-y border-red-500/20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-xs font-mono uppercase tracking-wider">SYSTEM ALERT</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap">
                <span className="text-white/30 text-sm mx-8">IA não é futuro. É agora.</span>
                <span className="text-red-400/60 text-sm mx-8">Quem não adapta, desaparece.</span>
                <span className="text-white/30 text-sm mx-8">Concorrentes já estão usando.</span>
                <span className="text-red-400/60 text-sm mx-8">Sua empresa está preparada?</span>
                <span className="text-white/30 text-sm mx-8">IA não é futuro. É agora.</span>
                <span className="text-red-400/60 text-sm mx-8">Quem não adapta, desaparece.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom border with glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      <div className="absolute bottom-0 left-1/4 right-1/4 h-8 bg-gradient-to-t from-red-500/10 to-transparent blur-xl" />
    </section>
  );
};

export default ProblemaSection;