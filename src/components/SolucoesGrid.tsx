import { motion } from "framer-motion";
import { Bot, BarChart3, Brain, Users, Sparkles, Search } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

const camadas = [
  {
    icon: Bot,
    titulo: "Automação com IA",
    funcao: "WORKFLOWS INTELIGENTES QUE APRENDEM",
    beneficio: "Reduza 80% do trabalho operacional repetitivo",
    position: "top-left",
  },
  {
    icon: BarChart3,
    titulo: "Análise Estratégica",
    funcao: "DADOS TRANSFORMADOS EM DECISÕES",
    beneficio: "Tome decisões baseadas em inteligência, não intuição",
    position: "top-right",
  },
  {
    icon: Brain,
    titulo: "Engenharia de Prompt",
    funcao: "COMANDOS PRECISOS E ESTRUTURADOS",
    beneficio: "Extraia o máximo de qualquer modelo de IA",
    position: "mid-right",
  },
  {
    icon: Users,
    titulo: "Personas Treinadas",
    funcao: "IA QUE ENTENDE SEU NEGÓCIO",
    beneficio: "Assistentes que falam a língua da sua empresa",
    position: "mid-left",
  },
  {
    icon: Sparkles,
    titulo: "Agentes Inteligentes",
    funcao: "IA AUTÔNOMA E ESPECIALIZADA",
    beneficio: "Sistemas que executam, não apenas respondem",
    position: "bottom-center",
  },
  {
    icon: Search,
    titulo: "SEO + AEO",
    funcao: "OTIMIZAÇÃO PARA HUMANOS E IAS",
    beneficio: "Apareça em buscas tradicionais e respostas de IA",
    position: "bottom-right",
  },
];

// Card com cantos cortados estilo cyberpunk
const CyberCard = ({ camada, index }: { camada: typeof camadas[0]; index: number }) => {
  const Icon = camada.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative group"
    >
      {/* Container principal com clip-path para cantos cortados */}
      <div 
        className="relative bg-[#0a0a0f]/90 backdrop-blur-sm p-5 min-w-[280px] max-w-[320px]"
        style={{
          clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
        }}
      >
        {/* Borda gradiente */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
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
        <div className="flex items-start gap-4">
          {/* Texto */}
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-1">
              {camada.titulo}
            </h3>
            <p className="text-[#ff6b8a] text-[10px] uppercase tracking-widest mb-2 font-mono">
              {camada.funcao}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {camada.beneficio}
            </p>
          </div>
          
          {/* Ícone com círculo */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] border border-[#a855f7]/30 flex items-center justify-center">
              <Icon className="w-7 h-7 text-[#a855f7]" />
            </div>
            {/* Brilho do ícone */}
            <div className="absolute inset-0 rounded-full bg-[#a855f7]/20 blur-md -z-10" />
          </div>
        </div>
      </div>
      
      {/* Ponto de conexão */}
      <div className="absolute w-3 h-3 rounded-full bg-[#ff2244] border-2 border-[#ff2244]/50 shadow-[0_0_10px_#ff2244] 
        top-1/2 -translate-y-1/2 
        ${camada.position.includes('left') ? '-right-1.5' : '-left-1.5'}
      " />
    </motion.div>
  );
};

// Modelo 3D do cérebro
const BrainModel = () => {
  const { scene } = useGLTF("https://base44.app/api/apps/68fbd266005d90781c97f4b4/files/public/68fbd266005d90781c97f4b4/9fd96c84b_brainwithgears3dmodel.glb");
  
  return (
    <primitive 
      object={scene} 
      scale={2.5}
      position={[0, -0.5, 0]}
    />
  );
};

// Cérebro central com modelo 3D
const CentralBrain = () => (
  <div className="relative w-64 h-64 md:w-80 md:h-80">
    {/* Anéis externos animados */}
    <motion.div 
      className="absolute inset-0 rounded-full border border-[#ff2244]/30"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#ff2244] shadow-[0_0_10px_#ff2244]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-[#ff2244] shadow-[0_0_10px_#ff2244]" />
    </motion.div>
    
    <motion.div 
      className="absolute inset-4 rounded-full border border-[#a855f7]/40"
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#a855f7] shadow-[0_0_10px_#a855f7]" />
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#a855f7] shadow-[0_0_10px_#a855f7]" />
    </motion.div>
    
    <motion.div 
      className="absolute inset-8 rounded-full border border-[#06b6d4]/50"
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_10px_#06b6d4]" />
    </motion.div>
    
    {/* Canvas 3D com o modelo */}
    <div className="absolute inset-12 rounded-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff2244" />
        <spotLight position={[0, 10, 0]} intensity={0.8} color="#06b6d4" />
        <Suspense fallback={null}>
          <BrainModel />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
    
    {/* Glow exterior */}
    <div className="absolute inset-0 rounded-full bg-[#a855f7]/10 blur-3xl pointer-events-none" />
  </div>
);

// Linhas de circuito SVG
const CircuitLines = () => (
  <svg 
    className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" 
    viewBox="0 0 1200 800"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff2244" stopOpacity="0" />
        <stop offset="50%" stopColor="#ff2244" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#ff2244" stopOpacity="0.8" />
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
    
    {/* Linhas esquerdas */}
    <path 
      d="M 0 150 L 100 150 L 150 150 L 200 200 L 350 200" 
      stroke="url(#lineGradient1)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    <path 
      d="M 0 450 L 80 450 L 130 400 L 200 400 L 350 350" 
      stroke="url(#lineGradient1)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Linhas direitas */}
    <path 
      d="M 850 200 L 1000 200 L 1050 150 L 1100 150 L 1200 150" 
      stroke="url(#lineGradient2)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    <path 
      d="M 850 350 L 950 350 L 1000 380 L 1100 380 L 1200 380" 
      stroke="url(#lineGradient2)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    <path 
      d="M 850 550 L 950 550 L 1000 580 L 1100 580 L 1200 580" 
      stroke="url(#lineGradient2)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Linha inferior central */}
    <path 
      d="M 600 520 L 600 600 L 500 650" 
      stroke="#ff2244" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
      strokeOpacity="0.6"
    />
    
    {/* Pontos de conexão */}
    <circle cx="150" cy="150" r="4" fill="#ff2244" filter="url(#glow)" />
    <circle cx="130" cy="400" r="4" fill="#ff2244" filter="url(#glow)" />
    <circle cx="1050" cy="150" r="4" fill="#a855f7" filter="url(#glow)" />
    <circle cx="1000" cy="380" r="4" fill="#a855f7" filter="url(#glow)" />
    <circle cx="1000" cy="580" r="4" fill="#a855f7" filter="url(#glow)" />
  </svg>
);

// Linhas de circuito nas bordas
const BorderCircuits = () => (
  <>
    {/* Circuitos superiores */}
    <div className="absolute top-0 left-0 w-48 h-px bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent" />
    <div className="absolute top-0 right-0 w-48 h-px bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent" />
    
    {/* Circuitos laterais */}
    <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-transparent via-[#a855f7]/50 to-transparent" />
    <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-transparent via-[#a855f7]/50 to-transparent" />
    
    {/* Circuitos inferiores */}
    <div className="absolute bottom-0 left-0 w-48 h-px bg-gradient-to-r from-transparent via-[#ff2244]/50 to-transparent" />
    <div className="absolute bottom-0 right-0 w-48 h-px bg-gradient-to-r from-transparent via-[#ff2244]/50 to-transparent" />
  </>
);

const SolucoesGrid = () => {
  return (
    <section className="relative bg-[#050508] py-24 md:py-32 overflow-hidden">
      {/* Background pattern */}
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
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Título */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-16"
        >
          <div 
            className="relative px-8 py-3 bg-[#0a0a0f] border border-[#ff2244]/50"
            style={{
              clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)",
            }}
          >
            <span className="text-white font-bold text-xl tracking-[0.3em] uppercase">
              Soluções
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff2244]/10 to-transparent pointer-events-none" />
          </div>
        </motion.div>
        
        {/* Layout principal */}
        <div className="relative min-h-[700px] flex items-center justify-center">
          {/* Linhas de circuito */}
          <CircuitLines />
          
          {/* Cérebro central */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <CentralBrain />
          </div>
          
          {/* Cards posicionados */}
          <div className="relative w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0">
            {/* Coluna esquerda */}
            <div className="flex flex-col gap-8 lg:items-start lg:pt-0">
              <CyberCard camada={camadas[0]} index={0} />
              <CyberCard camada={camadas[3]} index={3} />
            </div>
            
            {/* Coluna central (espaço para o cérebro + card inferior) */}
            <div className="flex flex-col items-center justify-end lg:pt-[400px]">
              <CyberCard camada={camadas[4]} index={4} />
            </div>
            
            {/* Coluna direita */}
            <div className="flex flex-col gap-8 lg:items-end lg:pt-0">
              <CyberCard camada={camadas[1]} index={1} />
              <CyberCard camada={camadas[2]} index={2} />
              <CyberCard camada={camadas[5]} index={5} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#ff2244]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#06b6d4]/5 rounded-full blur-[80px] pointer-events-none" />
    </section>
  );
};

export default SolucoesGrid;
