import { motion } from "framer-motion";
import { Bot, BarChart3, Brain, Users, Sparkles, Search, Cog, TrendingUp, MessageSquare, Globe } from "lucide-react";

const camadas = [
  {
    icon: Bot,
    titulo: "Automação com IA",
    funcao: "WORKFLOWS INTELIGENTES QUE APRENDEM",
    beneficio: "Reduza 80% do trabalho operacional repetitivo",
    position: "top-left",
    illustration: "robot",
  },
  {
    icon: BarChart3,
    titulo: "Análise Estratégica",
    funcao: "DADOS TRANSFORMADOS EM DECISÕES",
    beneficio: "Tome decisões baseadas em inteligência, não intuição",
    position: "top-right",
    illustration: "analytics",
  },
  {
    icon: Brain,
    titulo: "Engenharia de Prompt",
    funcao: "COMANDOS PRECISOS E ESTRUTURADOS",
    beneficio: "Extraia o máximo de qualquer modelo de IA",
    position: "mid-right",
    illustration: "code",
  },
  {
    icon: Users,
    titulo: "Personas Treinadas",
    funcao: "IA QUE ENTENDE SEU NEGÓCIO",
    beneficio: "Assistentes que falam a língua da sua empresa",
    position: "mid-left",
    illustration: "personas",
  },
  {
    icon: Sparkles,
    titulo: "Agentes Inteligentes",
    funcao: "IA AUTÔNOMA E ESPECIALIZADA",
    beneficio: "Sistemas que executam, não apenas respondem",
    position: "bottom-center",
    illustration: "ai-globe",
  },
  {
    icon: Search,
    titulo: "SEO + AEO",
    funcao: "OTIMIZAÇÃO PARA HUMANOS E IAS",
    beneficio: "Apareça em buscas tradicionais e respostas de IA",
    position: "bottom-right",
    illustration: "browser",
  },
];

// Ilustração circular para cada card
const CardIllustration = ({ type }: { type: string }) => {
  const getIllustration = () => {
    switch (type) {
      case "robot":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <Bot className="w-10 h-10 text-[#06b6d4]" />
            <Cog className="w-5 h-5 text-[#f59e0b] absolute top-2 right-2 animate-spin" style={{ animationDuration: '4s' }} />
            <Cog className="w-4 h-4 text-[#f59e0b] absolute bottom-3 left-3 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          </div>
        );
      case "analytics":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-[#10b981]" />
            <BarChart3 className="w-6 h-6 text-[#a855f7] absolute bottom-2 right-2" />
          </div>
        );
      case "code":
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-[#0a0a12] rounded-lg overflow-hidden p-2">
            <div className="text-[8px] font-mono text-left w-full space-y-0.5">
              <div className="text-[#ff6b8a]">{"<prompt>"}</div>
              <div className="text-[#06b6d4] pl-2">context: "..."</div>
              <div className="text-[#f59e0b] pl-2">role: "expert"</div>
              <div className="text-[#ff6b8a]">{"</prompt>"}</div>
            </div>
          </div>
        );
      case "personas":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <Users className="w-8 h-8 text-[#a855f7]" />
            </div>
            <div className="absolute w-4 h-4 rounded-full bg-[#06b6d4] top-1 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#0a0a0f]" />
            </div>
            <div className="absolute w-3 h-3 rounded-full bg-[#10b981] bottom-2 left-2 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0f]" />
            </div>
            <div className="absolute w-3 h-3 rounded-full bg-[#f59e0b] bottom-2 right-2 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0f]" />
            </div>
          </div>
        );
      case "ai-globe":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <Globe className="w-10 h-10 text-[#06b6d4]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#a855f7] font-bold text-lg">AI</span>
            </div>
            <motion.div
              className="absolute inset-0 rounded-full border border-[#a855f7]/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>
        );
      case "browser":
        return (
          <div className="relative w-full h-full flex flex-col bg-[#0a0a12] rounded-lg overflow-hidden">
            <div className="flex items-center gap-1 px-2 py-1 bg-[#1a1a2e] border-b border-[#2a2a3e]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#27ca40]" />
            </div>
            <div className="flex-1 p-2 flex items-center justify-center">
              <div className="text-[7px] font-mono text-[#06b6d4]">Google</div>
            </div>
          </div>
        );
      default:
        return <Brain className="w-10 h-10 text-[#a855f7]" />;
    }
  };

  return (
    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] border border-[#a855f7]/40 flex items-center justify-center overflow-hidden flex-shrink-0">
      {getIllustration()}
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#a855f7]/20 to-transparent pointer-events-none" />
      {/* Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-[#ff2244]/20" />
    </div>
  );
};

// Card com cantos cortados estilo cyberpunk
const CyberCard = ({ camada, index, reverse = false }: { camada: typeof camadas[0]; index: number; reverse?: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Container principal com clip-path para cantos cortados */}
      <div 
        className="relative bg-[#0a0a0f]/95 backdrop-blur-sm p-5"
        style={{
          clipPath: reverse 
            ? "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)"
            : "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
        }}
      >
        {/* Borda gradiente */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: reverse 
              ? "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)"
              : "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
            background: "linear-gradient(135deg, #ff2244 0%, #a855f7 50%, #06b6d4 100%)",
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMaskComposite: "xor",
          }}
        />
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#ff2244]/20 via-[#a855f7]/20 to-[#06b6d4]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        
        {/* Conteúdo */}
        <div className={`flex items-center gap-4 ${reverse ? 'flex-row-reverse' : ''}`}>
          {/* Ilustração */}
          <CardIllustration type={camada.illustration} />
          
          {/* Texto */}
          <div className={`flex-1 ${reverse ? 'text-right' : ''}`}>
            <h3 className="text-white font-bold text-lg mb-1">
              {camada.titulo}
            </h3>
            <p className="text-[#ff6b8a] text-[9px] uppercase tracking-widest mb-2 font-mono">
              {camada.funcao}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {camada.beneficio}
            </p>
          </div>
        </div>
      </div>
      
      {/* Ponto de conexão com linha */}
      <div className={`absolute top-1/2 -translate-y-1/2 ${reverse ? '-left-8' : '-right-8'} flex items-center ${reverse ? 'flex-row-reverse' : ''}`}>
        <div className={`w-8 h-px ${reverse ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#ff2244] to-[#ff2244]/0`} />
        <div className="w-3 h-3 rounded-full bg-[#ff2244] shadow-[0_0_10px_#ff2244,0_0_20px_#ff2244/50]" />
      </div>
    </motion.div>
  );
};

// Cérebro central com anéis
const CentralBrain = () => (
  <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
    {/* Anel externo 1 */}
    <motion.div 
      className="absolute inset-0 rounded-full border border-[#ff2244]/40"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#ff2244] shadow-[0_0_10px_#ff2244]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-[#ff2244] shadow-[0_0_10px_#ff2244]" />
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#ff2244] shadow-[0_0_8px_#ff2244]" />
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#ff2244] shadow-[0_0_8px_#ff2244]" />
    </motion.div>
    
    {/* Anel externo 2 */}
    <motion.div 
      className="absolute inset-3 rounded-full border border-[#a855f7]/50"
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-1/4 left-0 -translate-x-1/2 w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />
      <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />
    </motion.div>
    
    {/* Anel interno */}
    <motion.div 
      className="absolute inset-6 rounded-full border border-[#06b6d4]/40"
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-0 right-1/4 w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]" />
    </motion.div>
    
    {/* Cérebro interno */}
    <div className="absolute inset-10 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] border border-[#a855f7]/30 flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#d946ef]/30 via-[#a855f7]/20 to-[#ff2244]/10" />
      
      {/* Cérebro com gradiente */}
      <div className="relative z-10">
        <Brain className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-[#d946ef]" />
      </div>
      
      {/* Pulse effect */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-[#d946ef]/20"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Engrenagens pequenas */}
      <Cog className="absolute top-3 right-3 w-4 h-4 text-[#f59e0b]/60 animate-spin" style={{ animationDuration: '5s' }} />
      <Cog className="absolute bottom-4 left-3 w-3 h-3 text-[#f59e0b]/60 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
    </div>
    
    {/* Glow exterior */}
    <div className="absolute inset-0 rounded-full bg-[#d946ef]/10 blur-3xl -z-10" />
  </div>
);

// Linhas de circuito SVG melhoradas
const CircuitLines = () => (
  <svg 
    className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" 
    viewBox="0 0 1200 900"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <linearGradient id="lineGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff2244" stopOpacity="0" />
        <stop offset="30%" stopColor="#ff2244" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#ff2244" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="lineGradientRight" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#ff2244" stopOpacity="0" />
        <stop offset="30%" stopColor="#ff2244" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#ff2244" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="lineGradientDown" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff2244" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ff2244" stopOpacity="0" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Linha vertical superior do cérebro */}
    <path 
      d="M 600 0 L 600 350" 
      stroke="url(#lineGradientDown)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Conexões esquerdas */}
    <path 
      d="M 0 180 L 80 180 L 120 180 L 160 220 L 380 220" 
      stroke="url(#lineGradientLeft)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    <path 
      d="M 0 480 L 60 480 L 100 450 L 180 450 L 380 400" 
      stroke="url(#lineGradientLeft)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Conexões direitas */}
    <path 
      d="M 820 220 L 1000 220 L 1040 180 L 1120 180 L 1200 180" 
      stroke="url(#lineGradientRight)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    <path 
      d="M 820 400 L 950 400 L 1000 430 L 1100 430 L 1200 430" 
      stroke="url(#lineGradientRight)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    <path 
      d="M 820 680 L 920 680 L 960 700 L 1100 700 L 1200 700" 
      stroke="url(#lineGradientRight)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Conexão inferior central */}
    <path 
      d="M 600 550 L 600 700 L 500 750" 
      stroke="#ff2244" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
      strokeOpacity="0.6"
    />
    
    {/* Pontos nos cantos e conexões */}
    <circle cx="120" cy="180" r="4" fill="#ff2244" filter="url(#glow)" />
    <circle cx="100" cy="450" r="4" fill="#ff2244" filter="url(#glow)" />
    <circle cx="1040" cy="180" r="4" fill="#ff2244" filter="url(#glow)" />
    <circle cx="1000" cy="430" r="4" fill="#ff2244" filter="url(#glow)" />
    <circle cx="960" cy="700" r="4" fill="#ff2244" filter="url(#glow)" />
    
    {/* Linhas decorativas nas bordas */}
    <path d="M 0 0 L 100 0 L 120 20" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" fill="none" />
    <path d="M 1200 0 L 1100 0 L 1080 20" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" fill="none" />
    <path d="M 0 900 L 100 900 L 120 880" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" fill="none" />
    <path d="M 1200 900 L 1100 900 L 1080 880" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" fill="none" />
  </svg>
);

// Linhas de circuito nas bordas
const BorderCircuits = () => (
  <>
    {/* Circuitos superiores */}
    <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-[#a855f7]/50 to-transparent" />
    <div className="absolute top-0 left-0 w-px h-24 bg-gradient-to-b from-[#a855f7]/50 to-transparent" />
    <div className="absolute top-0 right-0 w-32 h-px bg-gradient-to-l from-[#a855f7]/50 to-transparent" />
    <div className="absolute top-0 right-0 w-px h-24 bg-gradient-to-b from-[#a855f7]/50 to-transparent" />
    
    {/* Circuitos inferiores */}
    <div className="absolute bottom-0 left-0 w-32 h-px bg-gradient-to-r from-[#ff2244]/50 to-transparent" />
    <div className="absolute bottom-0 left-0 w-px h-24 bg-gradient-to-t from-[#ff2244]/50 to-transparent" />
    <div className="absolute bottom-0 right-0 w-32 h-px bg-gradient-to-l from-[#ff2244]/50 to-transparent" />
    <div className="absolute bottom-0 right-0 w-px h-24 bg-gradient-to-t from-[#ff2244]/50 to-transparent" />
  </>
);

const SolucoesGrid = () => {
  return (
    <section className="relative bg-[#050508] py-20 md:py-28 overflow-hidden">
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #a855f7 1px, transparent 1px),
            linear-gradient(180deg, #a855f7 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      
      {/* Circuitos de borda */}
      <BorderCircuits />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Título */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12 md:mb-16"
        >
          <div 
            className="relative px-8 py-3 bg-[#0a0a0f] border border-[#ff2244]/60"
            style={{
              clipPath: "polygon(12px 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0 50%)",
            }}
          >
            <span className="text-white font-bold text-lg md:text-xl tracking-[0.3em] uppercase">
              Soluções
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff2244]/10 via-transparent to-[#ff2244]/10 pointer-events-none" />
          </div>
        </motion.div>
        
        {/* Layout principal - posicionamento orgânico */}
        <div className="relative min-h-[800px] md:min-h-[900px]">
          {/* Linhas de circuito */}
          <CircuitLines />
          
          {/* Cérebro central */}
          <div className="absolute left-1/2 top-[35%] md:top-[40%] -translate-x-1/2 -translate-y-1/2 z-20">
            <CentralBrain />
          </div>
          
          {/* Cards posicionados absolutamente para layout orgânico */}
          <div className="relative w-full h-full">
            {/* Card 1 - Automação com IA (top-left) */}
            <div className="absolute left-0 top-[5%] md:left-[2%] md:top-[8%] w-[90%] md:w-auto">
              <CyberCard camada={camadas[0]} index={0} reverse={false} />
            </div>
            
            {/* Card 2 - Análise Estratégica (top-right) */}
            <div className="absolute right-0 top-[18%] md:right-[2%] md:top-[8%] w-[90%] md:w-auto">
              <CyberCard camada={camadas[1]} index={1} reverse={true} />
            </div>
            
            {/* Card 3 - Personas Treinadas (mid-left) */}
            <div className="absolute left-0 top-[31%] md:left-[2%] md:top-[38%] w-[90%] md:w-auto">
              <CyberCard camada={camadas[3]} index={3} reverse={false} />
            </div>
            
            {/* Card 4 - Engenharia de Prompt (mid-right) */}
            <div className="absolute right-0 top-[44%] md:right-[2%] md:top-[32%] w-[90%] md:w-auto">
              <CyberCard camada={camadas[2]} index={2} reverse={true} />
            </div>
            
            {/* Card 5 - Agentes Inteligentes (bottom-center-left) */}
            <div className="absolute left-0 bottom-[18%] md:left-[15%] md:bottom-[8%] w-[90%] md:w-auto">
              <CyberCard camada={camadas[4]} index={4} reverse={false} />
            </div>
            
            {/* Card 6 - SEO + AEO (bottom-right) */}
            <div className="absolute right-0 bottom-[5%] md:right-[2%] md:bottom-[8%] w-[90%] md:w-auto">
              <CyberCard camada={camadas[5]} index={5} reverse={true} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d946ef]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] bg-[#ff2244]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-[#06b6d4]/5 rounded-full blur-[80px] pointer-events-none" />
    </section>
  );
};

export default SolucoesGrid;
