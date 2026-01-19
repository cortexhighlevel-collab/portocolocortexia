import { motion } from "framer-motion";
import { Brain, Cog } from "lucide-react";

// Imagens geradas para cada card
import automacaoImg from "@/assets/solucoes/automacao-ia.png";
import analiseImg from "@/assets/solucoes/analise-estrategica.png";
import promptImg from "@/assets/solucoes/engenharia-prompt.png";
import personasImg from "@/assets/solucoes/personas-treinadas.png";
import agentesImg from "@/assets/solucoes/agentes-inteligentes.png";
import seoImg from "@/assets/solucoes/seo-aeo.png";

const camadas = [
  {
    titulo: "Automação com IA",
    funcao: "WORKFLOWS INTELIGENTES QUE APRENDEM",
    beneficio: "Reduza 80% do trabalho operacional repetitivo",
    image: automacaoImg,
  },
  {
    titulo: "Análise Estratégica",
    funcao: "DADOS TRANSFORMADOS EM DECISÕES",
    beneficio: "Tome decisões baseadas em inteligência, não intuição",
    image: analiseImg,
  },
  {
    titulo: "Engenharia de Prompt",
    funcao: "COMANDOS PRECISOS E ESTRUTURADOS",
    beneficio: "Extraia o máximo de qualquer modelo de IA",
    image: promptImg,
  },
  {
    titulo: "Personas Treinadas",
    funcao: "IA QUE ENTENDE SEU NEGÓCIO",
    beneficio: "Assistentes que falam a língua da sua empresa",
    image: personasImg,
  },
  {
    titulo: "Agentes Inteligentes",
    funcao: "IA AUTÔNOMA E ESPECIALIZADA",
    beneficio: "Sistemas que executam, não apenas respondem",
    image: agentesImg,
  },
  {
    titulo: "SEO + AEO",
    funcao: "OTIMIZAÇÃO PARA HUMANOS E IAS",
    beneficio: "Apareça em buscas tradicionais e respostas de IA",
    image: seoImg,
  },
];

// Card circular com imagem (conectado à linha)
const CircularImageCard = ({ image, delay }: { image: string; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Ring externo animado */}
      <motion.div 
        className="absolute -inset-1 rounded-full border-2 border-[#ff2244]/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Container principal circular */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#a855f7]/60 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f]">
        <img 
          src={image} 
          alt="Ilustração" 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay com glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#a855f7]/20 via-transparent to-[#ff2244]/10 pointer-events-none" />
        
        {/* Borda com gradiente */}
        <div className="absolute inset-0 rounded-full border border-[#06b6d4]/40" />
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-[#a855f7]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
      {/* Ponto de conexão brilhante */}
      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ff2244] shadow-[0_0_8px_#ff2244,0_0_16px_#ff2244/50]" />
    </motion.div>
  );
};

// Card de texto com cantos cortados
const TextCard = ({ camada, delay, side }: { camada: typeof camadas[0]; delay: number; side: 'left' | 'right' }) => {
  const isLeft = side === 'left';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: delay + 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Container principal com clip-path */}
      <div 
        className="relative bg-[#0a0a0f]/95 backdrop-blur-sm px-4 py-3 md:px-5 md:py-4 max-w-[220px] md:max-w-[280px]"
        style={{
          clipPath: isLeft 
            ? "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))"
            : "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
        }}
      >
        {/* Borda gradiente */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: isLeft 
              ? "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))"
              : "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
            background: "linear-gradient(135deg, #ff2244 0%, #a855f7 50%, #06b6d4 100%)",
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMaskComposite: "xor",
          }}
        />
        
        {/* Conteúdo */}
        <div className={isLeft ? 'text-left' : 'text-right'}>
          <h3 className="text-white font-bold text-sm md:text-base mb-0.5">
            {camada.titulo}
          </h3>
          <p className="text-[#ff6b8a] text-[8px] md:text-[9px] uppercase tracking-widest mb-1.5 font-mono">
            {camada.funcao}
          </p>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
            {camada.beneficio}
          </p>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#ff2244]/10 via-[#a855f7]/10 to-[#06b6d4]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </motion.div>
  );
};

// Componente completo: Card circular + linha + Card de texto
const ConnectedCard = ({ 
  camada, 
  index, 
  side,
  style 
}: { 
  camada: typeof camadas[0]; 
  index: number; 
  side: 'left' | 'right';
  style: React.CSSProperties;
}) => {
  const isLeft = side === 'left';
  const delay = index * 0.15;
  
  return (
    <div className="absolute z-30" style={style}>
      <div className={`flex items-center gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Card de texto */}
        <TextCard camada={camada} delay={delay} side={side} />
        
        {/* Linha conectora */}
        <div className={`relative w-6 md:w-10 h-0.5 ${isLeft ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-[#ff2244] via-[#ff2244] to-[#ff2244]/40`}>
          {/* Ponto no início da linha */}
          <div className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? '-left-1' : '-right-1'} w-2 h-2 rounded-full bg-[#ff2244] shadow-[0_0_6px_#ff2244]`} />
        </div>
        
        {/* Card circular com imagem */}
        <CircularImageCard image={camada.image} delay={delay} />
      </div>
    </div>
  );
};

// Cérebro central com anéis
const CentralBrain = () => (
  <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64">
    {/* Anel externo 1 */}
    <motion.div 
      className="absolute inset-0 rounded-full border-2 border-[#ff2244]/50"
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
      className="absolute inset-4 rounded-full border border-[#a855f7]/60"
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-1/4 left-0 -translate-x-1/2 w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />
      <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />
    </motion.div>
    
    {/* Anel interno */}
    <motion.div 
      className="absolute inset-8 rounded-full border border-[#06b6d4]/50"
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-0 right-1/4 w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]" />
    </motion.div>
    
    {/* Cérebro interno */}
    <div className="absolute inset-10 md:inset-12 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] border border-[#a855f7]/40 flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#d946ef]/40 via-[#a855f7]/30 to-[#ff2244]/20" />
      
      {/* Cérebro com gradiente */}
      <div className="relative z-10">
        <Brain className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-[#d946ef]" />
      </div>
      
      {/* Pulse effect */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-[#d946ef]/20"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Engrenagens pequenas */}
      <Cog className="absolute top-2 right-2 w-3 h-3 md:w-4 md:h-4 text-[#f59e0b]/70 animate-spin" style={{ animationDuration: '5s' }} />
      <Cog className="absolute bottom-3 left-2 w-2.5 h-2.5 md:w-3 md:h-3 text-[#f59e0b]/70 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
    </div>
    
    {/* Glow exterior */}
    <div className="absolute inset-0 rounded-full bg-[#d946ef]/15 blur-3xl -z-10" />
  </div>
);

// Linhas de circuito SVG conectando ao cérebro
const CircuitLines = () => (
  <svg 
    className="absolute inset-0 w-full h-full pointer-events-none" 
    viewBox="0 0 1200 900"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <linearGradient id="lineGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff2244" stopOpacity="0" />
        <stop offset="50%" stopColor="#ff2244" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ff2244" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="lineGradientRight" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#ff2244" stopOpacity="0" />
        <stop offset="50%" stopColor="#ff2244" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ff2244" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="lineGradientUp" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#ff2244" stopOpacity="1" />
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
      d="M 600 0 L 600 320" 
      stroke="url(#lineGradientUp)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Card 1 - Automação (top-left) - linha do cérebro ao card */}
    <path 
      d="M 540 380 L 420 380 L 380 250 L 380 200" 
      stroke="#ff2244" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
      strokeOpacity="0.7"
    />
    {/* Continuação para a borda esquerda */}
    <path 
      d="M 380 200 L 380 180 L 200 180 L 120 180 L 80 220 L 0 220" 
      stroke="url(#lineGradientLeft)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Card 2 - Análise (top-right) - linha do cérebro ao card */}
    <path 
      d="M 660 380 L 780 380 L 820 250 L 820 200" 
      stroke="#ff2244" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
      strokeOpacity="0.7"
    />
    {/* Continuação para a borda direita */}
    <path 
      d="M 820 200 L 820 180 L 1000 180 L 1080 180 L 1120 220 L 1200 220" 
      stroke="url(#lineGradientRight)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Card 3 - Personas (mid-left) - linha do cérebro ao card */}
    <path 
      d="M 540 430 L 400 430 L 350 480" 
      stroke="#ff2244" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
      strokeOpacity="0.7"
    />
    {/* Continuação para a borda esquerda */}
    <path 
      d="M 350 480 L 180 480 L 100 520 L 0 520" 
      stroke="url(#lineGradientLeft)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Card 4 - Engenharia (mid-right) - linha do cérebro ao card */}
    <path 
      d="M 660 430 L 800 430 L 850 390" 
      stroke="#ff2244" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
      strokeOpacity="0.7"
    />
    {/* Continuação para a borda direita */}
    <path 
      d="M 850 390 L 1020 390 L 1100 430 L 1200 430" 
      stroke="url(#lineGradientRight)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Card 5 - Agentes (bottom-center) - linha do cérebro ao card */}
    <path 
      d="M 600 520 L 600 620 L 550 680" 
      stroke="#ff2244" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
      strokeOpacity="0.7"
    />
    
    {/* Card 6 - SEO (bottom-right) - linha do cérebro ao card */}
    <path 
      d="M 660 480 L 780 550 L 850 600" 
      stroke="#ff2244" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
      strokeOpacity="0.7"
    />
    {/* Continuação para a borda direita */}
    <path 
      d="M 850 600 L 1000 650 L 1100 680 L 1200 680" 
      stroke="url(#lineGradientRight)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Pontos de conexão */}
    <circle cx="380" cy="200" r="4" fill="#ff2244" filter="url(#glow)" />
    <circle cx="820" cy="200" r="4" fill="#ff2244" filter="url(#glow)" />
    <circle cx="350" cy="480" r="4" fill="#ff2244" filter="url(#glow)" />
    <circle cx="850" cy="390" r="4" fill="#ff2244" filter="url(#glow)" />
    <circle cx="550" cy="680" r="4" fill="#ff2244" filter="url(#glow)" />
    <circle cx="850" cy="600" r="4" fill="#ff2244" filter="url(#glow)" />
    
    {/* Linhas decorativas nas bordas */}
    <path d="M 0 0 L 100 0 L 120 20" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.4" fill="none" />
    <path d="M 1200 0 L 1100 0 L 1080 20" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.4" fill="none" />
    <path d="M 0 900 L 100 900 L 120 880" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.4" fill="none" />
    <path d="M 1200 900 L 1100 900 L 1080 880" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.4" fill="none" />
    
    {/* Mais detalhes de circuito nas bordas */}
    <path d="M 0 400 L 40 400 L 60 380 L 80 380" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" fill="none" />
    <path d="M 1200 500 L 1160 500 L 1140 520 L 1120 520" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" fill="none" />
  </svg>
);

// Linhas de circuito nas bordas
const BorderCircuits = () => (
  <>
    {/* Circuitos superiores */}
    <div className="absolute top-0 left-0 w-40 h-px bg-gradient-to-r from-[#a855f7]/60 to-transparent" />
    <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-[#a855f7]/60 to-transparent" />
    <div className="absolute top-0 right-0 w-40 h-px bg-gradient-to-l from-[#a855f7]/60 to-transparent" />
    <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-[#a855f7]/60 to-transparent" />
    
    {/* Circuitos inferiores */}
    <div className="absolute bottom-0 left-0 w-40 h-px bg-gradient-to-r from-[#ff2244]/60 to-transparent" />
    <div className="absolute bottom-0 left-0 w-px h-32 bg-gradient-to-t from-[#ff2244]/60 to-transparent" />
    <div className="absolute bottom-0 right-0 w-40 h-px bg-gradient-to-l from-[#ff2244]/60 to-transparent" />
    <div className="absolute bottom-0 right-0 w-px h-32 bg-gradient-to-t from-[#ff2244]/60 to-transparent" />
  </>
);

const SolucoesGrid = () => {
  return (
    <section className="relative bg-[#050508] py-16 md:py-24 overflow-hidden">
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #a855f7 1px, transparent 1px),
            linear-gradient(180deg, #a855f7 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
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
          className="flex justify-center mb-8 md:mb-12"
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
        
        {/* Layout principal desktop */}
        <div className="relative min-h-[750px] md:min-h-[850px]">
          {/* Linhas de circuito - visíveis em desktop */}
          <div className="hidden md:block">
            <CircuitLines />
          </div>
          
          {/* Cérebro central */}
          <div className="flex justify-center md:absolute md:left-1/2 md:top-[42%] md:-translate-x-1/2 md:-translate-y-1/2 z-20 mb-10 md:mb-0">
            <CentralBrain />
          </div>
          
          {/* Cards em grid para mobile */}
          <div className="md:hidden space-y-6 mt-8">
            {camadas.map((camada, index) => (
              <motion.div
                key={camada.titulo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <CircularImageCard image={camada.image} delay={0} />
                <TextCard camada={camada} delay={0} side="left" />
              </motion.div>
            ))}
          </div>
          
          {/* Cards posicionados - visíveis em desktop */}
          <div className="hidden md:block absolute inset-0">
            {/* Card 1 - Automação com IA (top-left) */}
            <ConnectedCard 
              camada={camadas[0]} 
              index={0} 
              side="left"
              style={{ left: '2%', top: '8%' }}
            />
            
            {/* Card 2 - Análise Estratégica (top-right) */}
            <ConnectedCard 
              camada={camadas[1]} 
              index={1} 
              side="right"
              style={{ right: '2%', top: '8%' }}
            />
            
            {/* Card 3 - Personas Treinadas (mid-left) */}
            <ConnectedCard 
              camada={camadas[3]} 
              index={3} 
              side="left"
              style={{ left: '2%', top: '40%' }}
            />
            
            {/* Card 4 - Engenharia de Prompt (mid-right) */}
            <ConnectedCard 
              camada={camadas[2]} 
              index={2} 
              side="right"
              style={{ right: '2%', top: '34%' }}
            />
            
            {/* Card 5 - Agentes Inteligentes (bottom-center-left) */}
            <ConnectedCard 
              camada={camadas[4]} 
              index={4} 
              side="left"
              style={{ left: '15%', bottom: '6%' }}
            />
            
            {/* Card 6 - SEO + AEO (bottom-right) */}
            <ConnectedCard 
              camada={camadas[5]} 
              index={5} 
              side="right"
              style={{ right: '2%', bottom: '10%' }}
            />
          </div>
        </div>
      </div>
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d946ef]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-[#ff2244]/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-[#06b6d4]/8 rounded-full blur-[80px] pointer-events-none" />
    </section>
  );
};

export default SolucoesGrid;
