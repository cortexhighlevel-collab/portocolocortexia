import { motion, useScroll, useTransform } from "framer-motion";
import { AlertTriangle, XCircle, Eye, Bot, Search, Brain, Zap, Skull } from "lucide-react";
import { useRef } from "react";

const problemas = [
  {
    icon: Bot,
    titulo: "IA usada de forma rasa",
    descricao: "Empresas tratam IA como ferramenta genérica. Sem estratégia. Sem personalização. Sem resultados reais.",
    status: "CRITICAL",
    errorCode: "ERR_0x1A"
  },
  {
    icon: Brain,
    titulo: "Prompts fracos e genéricos",
    descricao: "Comandos vagos geram respostas medíocres. Sem engenharia de prompt, a IA entrega apenas o básico.",
    status: "FAILURE",
    errorCode: "ERR_0x2B"
  },
  {
    icon: AlertTriangle,
    titulo: "Automação sem inteligência",
    descricao: "Workflows mecânicos que não aprendem. Tarefas automatizadas sem contexto estratégico.",
    status: "WARNING",
    errorCode: "ERR_0x3C"
  },
  {
    icon: XCircle,
    titulo: "SEO tradicional está morto",
    descricao: "Otimizar para Google não basta. ChatGPT, Gemini, Perplexity ignoram sites sem estrutura semântica.",
    status: "FATAL",
    errorCode: "ERR_0x4D"
  },
  {
    icon: Eye,
    titulo: "Invisíveis para mecanismos de resposta",
    descricao: "Sua empresa não aparece quando IAs respondem perguntas do seu mercado. Você não existe para a nova busca.",
    status: "CRITICAL",
    errorCode: "ERR_0x5E"
  },
  {
    icon: Search,
    titulo: "Sem agentes treinados",
    descricao: "Nenhum assistente de IA entende seu negócio. Respostas genéricas. Zero personalização corporativa.",
    status: "FAILURE",
    errorCode: "ERR_0x6F"
  }
];

const ProblemaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glitchX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 0]);

  return (
    <section ref={sectionRef} id="problema" className="relative py-32 md:py-40 bg-background overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Glitched Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Warning terminal box */}
          <motion.div 
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gradient-to-r from-red-950/80 via-red-900/60 to-red-950/80 border border-red-500/40 rounded-sm"
            animate={{ 
              boxShadow: ["0 0 20px rgba(220,38,38,0.2)", "0 0 40px rgba(220,38,38,0.4)", "0 0 20px rgba(220,38,38,0.2)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Skull className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-red-400 text-sm font-mono tracking-widest uppercase">⚠ ALERTA CRÍTICO ⚠</span>
            <Skull className="w-5 h-5 text-red-500 animate-pulse" />
          </motion.div>

          {/* Glitch title effect */}
          <motion.h2 
            className="relative text-5xl md:text-7xl font-black text-white leading-tight"
            style={{ x: glitchX }}
          >
            <span className="relative">
              Por que empresas estão
              {/* Glitch layers */}
              <motion.span 
                className="absolute inset-0 text-red-500 opacity-0"
                animate={{ 
                  opacity: [0, 0.8, 0],
                  x: [-2, 2, -2],
                }}
                transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
              >
                Por que empresas estão
              </motion.span>
            </span>
            <motion.span 
              className="block mt-3 relative"
              animate={{
                textShadow: [
                  "0 0 10px rgba(220,38,38,0.5)",
                  "0 0 30px rgba(220,38,38,0.8)",
                  "0 0 10px rgba(220,38,38,0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                background: 'linear-gradient(135deg, #ff0000, #dc2626, #991b1b, #ff4444)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-shift 4s ease infinite'
              }}
            >
              perdendo para a IA
            </motion.span>
          </motion.h2>

          <motion.p 
            className="text-white/50 max-w-2xl mx-auto text-lg mt-8 font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            A maioria usa inteligência artificial como brinquedo. 
            Enquanto isso, concorrentes constroem <span className="text-red-400">sistemas cognitivos reais</span>.
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout - Unique asymmetric design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Card 1 - Large feature card */}
          <motion.div
            className="lg:col-span-5 lg:row-span-2 relative group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-full min-h-[320px] md:min-h-[400px] p-8 bg-gradient-to-br from-red-950/40 via-black to-red-950/20 border border-red-500/30 rounded-2xl overflow-hidden group-hover:border-red-500/60 transition-all duration-500">
              {/* Animated scan effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-red-500/10 via-transparent to-transparent"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Terminal header */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-red-900/50 to-transparent flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-red-400/50" />
                <div className="w-3 h-3 rounded-full bg-red-400/30" />
                <span className="ml-4 text-red-400/70 text-xs font-mono">{problemas[0].errorCode}</span>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end pt-12">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/30 to-red-900/30 flex items-center justify-center mb-6 border border-red-500/40">
                  <Bot className="w-10 h-10 text-red-400" />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-mono rounded">{problemas[0].status}</span>
                  <Zap className="w-4 h-4 text-red-500 animate-pulse" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{problemas[0].titulo}</h3>
                <p className="text-white/50 text-base leading-relaxed">{problemas[0].descricao}</p>

                {/* Data streams */}
                <div className="absolute right-4 top-16 bottom-4 w-px bg-gradient-to-b from-red-500/50 via-red-500/20 to-transparent" />
                <div className="absolute right-8 top-20 bottom-8 w-px bg-gradient-to-b from-red-500/30 via-transparent to-red-500/30" />
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-red-500/30 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-red-500/30 rounded-bl-2xl" />
            </div>
          </motion.div>

          {/* Cards 2-3 - Medium cards */}
          {problemas.slice(1, 3).map((problema, index) => {
            const Icon = problema.icon;
            return (
              <motion.div
                key={index}
                className="lg:col-span-4 relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <div className="relative h-full min-h-[200px] p-6 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] border border-red-500/20 rounded-xl overflow-hidden group-hover:border-red-500/50 transition-all duration-500">
                  {/* Glowing orb */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-colors" />
                  
                  {/* Status bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-red-400/60 text-xs font-mono">{problema.errorCode}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-[10px] font-mono rounded border border-red-500/20">
                      {problema.status}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-transparent flex items-center justify-center mb-4 border border-red-500/30">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-100 transition-colors">{problema.titulo}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{problema.descricao}</p>

                  {/* Hover line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 via-red-400 to-transparent"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}

          {/* Card 4 - Wide horizontal card */}
          <motion.div
            className="lg:col-span-3 relative group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-full min-h-[200px] p-6 bg-gradient-to-r from-red-950/30 via-black to-red-950/20 border border-red-500/25 rounded-xl overflow-hidden group-hover:border-red-500/50 transition-all duration-500">
              {/* Diagonal stripes */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(220,38,38,0.1) 10px, rgba(220,38,38,0.1) 20px)'
              }} />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
                    <XCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <span className="text-red-500 text-xs font-mono animate-pulse">{problemas[3].status}</span>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{problemas[3].titulo}</h3>
                  <p className="text-white/40 text-sm">{problemas[3].descricao}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cards 5-6 - Bottom cards */}
          {problemas.slice(4).map((problema, index) => {
            const Icon = problema.icon;
            return (
              <motion.div
                key={index + 4}
                className={`${index === 0 ? 'lg:col-span-4' : 'lg:col-span-3'} relative group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 4) }}
              >
                <div className="relative h-full min-h-[180px] p-6 bg-gradient-to-br from-[#0a0508] via-[#0f0a0c] to-[#0a0508] border border-red-500/20 rounded-xl overflow-hidden group-hover:border-red-500/50 transition-all duration-500">
                  {/* Hexagon pattern overlay */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15L30 0z' stroke='%23dc2626' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500/25 to-red-900/20 flex items-center justify-center border border-red-500/30 group-hover:from-red-500/40 transition-colors">
                        <Icon className="w-6 h-6 text-red-400" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-400/50 text-xs font-mono">{problema.errorCode}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-100 transition-colors">{problema.titulo}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{problema.descricao}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-950/50">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-red-500 to-red-400"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom terminal warning */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative p-6 bg-gradient-to-r from-red-950/40 via-black to-red-950/40 border border-red-500/30 rounded-xl overflow-hidden">
            {/* Terminal dots */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-red-400/50" />
              <div className="w-3 h-3 rounded-full bg-red-400/30" />
            </div>

            {/* Scrolling text */}
            <div className="flex items-center gap-6 overflow-hidden py-2">
              <div className="flex items-center gap-3 flex-shrink-0">
                <Zap className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="text-red-400 text-sm font-mono uppercase tracking-widest">SYSTEM ALERT</span>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap">
                  <span className="text-white/40 text-sm mx-8 font-mono">⚡ IA não é futuro. É agora.</span>
                  <span className="text-red-400/70 text-sm mx-8 font-mono">⚠ Quem não adapta, desaparece.</span>
                  <span className="text-white/40 text-sm mx-8 font-mono">⚡ Concorrentes já estão usando.</span>
                  <span className="text-red-400/70 text-sm mx-8 font-mono">⚠ Sua empresa está preparada?</span>
                  <span className="text-white/40 text-sm mx-8 font-mono">⚡ IA não é futuro. É agora.</span>
                  <span className="text-red-400/70 text-sm mx-8 font-mono">⚠ Quem não adapta, desaparece.</span>
                </div>
              </div>
            </div>

            {/* Glowing border effect */}
            <motion.div 
              className="absolute inset-0 rounded-xl border-2 border-red-500/0"
              animate={{ borderColor: ["rgba(220,38,38,0)", "rgba(220,38,38,0.3)", "rgba(220,38,38,0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default ProblemaSection;
