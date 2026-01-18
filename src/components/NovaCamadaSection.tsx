import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import all frames
import frame001 from "@/assets/nova-camada-frames/frame-001.jpg";
import frame002 from "@/assets/nova-camada-frames/frame-002.jpg";
import frame003 from "@/assets/nova-camada-frames/frame-003.jpg";
import frame004 from "@/assets/nova-camada-frames/frame-004.jpg";
import frame005 from "@/assets/nova-camada-frames/frame-005.jpg";
import frame006 from "@/assets/nova-camada-frames/frame-006.jpg";
import frame007 from "@/assets/nova-camada-frames/frame-007.jpg";
import frame008 from "@/assets/nova-camada-frames/frame-008.jpg";
import frame009 from "@/assets/nova-camada-frames/frame-009.jpg";
import frame010 from "@/assets/nova-camada-frames/frame-010.jpg";

const frames = [
  frame001, frame002, frame003, frame004, frame005,
  frame006, frame007, frame008, frame009, frame010,
];

const SMOOTH_FACTOR = 0.12;

const NovaCamadaSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = frames.length;
    setIsReady(false);

    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setIsReady(true);
        }
      };
    });
  }, []);

  // Scroll sync loop with lerp interpolation
  useEffect(() => {
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const tick = () => {
      const container = scrollContainerRef.current;
      if (!container) {
        rafIdRef.current = window.requestAnimationFrame(tick);
        return;
      }

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress within this section
      const scrollStart = -rect.top;
      const scrollEnd = containerHeight - viewportHeight;
      const progress = clamp(scrollStart / Math.max(scrollEnd, 1), 0, 1);

      // Pin when top of section reaches top of viewport and we haven't scrolled past
      const isInSection = rect.top <= 0 && rect.bottom > viewportHeight;
      setIsPinned(isInSection);

      // Target frame based on scroll progress
      const targetFrame = progress * (frames.length - 1);
      
      // Smooth interpolation using lerp
      currentFrameRef.current = lerp(currentFrameRef.current, targetFrame, SMOOTH_FACTOR);
      
      const frameIndex = Math.round(currentFrameRef.current);
      setCurrentFrame(clamp(frameIndex, 0, frames.length - 1));

      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    rafIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={scrollContainerRef}
      id="nova-camada"
      className="relative bg-black"
      style={{ height: "200vh" }}
    >
      {/* Sticky container that holds frames and content */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Frame sequence background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          {frames.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Frame ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: index === currentFrame ? 1 : 0,
                visibility: index === currentFrame ? 'visible' : 'hidden',
              }}
            />
          ))}

          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
        </div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-6 max-w-4xl relative">
            {/* HUD frame corners */}
            <div className="absolute -top-16 -left-16 w-16 h-16 border-t-2 border-l-2 border-red-500/50 hidden md:block" />
            <div className="absolute -top-16 -right-16 w-16 h-16 border-t-2 border-r-2 border-red-500/50 hidden md:block" />
            <div className="absolute -bottom-16 -left-16 w-16 h-16 border-b-2 border-l-2 border-red-500/50 hidden md:block" />
            <div className="absolute -bottom-16 -right-16 w-16 h-16 border-b-2 border-r-2 border-red-500/50 hidden md:block" />

            {/* Tag */}
            <motion.div 
              className="inline-flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-sm uppercase tracking-[0.4em] font-mono">
                SYSTEM.INIT
              </span>
              <div className="w-12 h-px bg-gradient-to-r from-red-500 to-transparent" />
            </motion.div>
            
            {/* Main headline */}
            <motion.h2 
              className="text-4xl md:text-7xl font-bold text-white leading-tight mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                textShadow: '0 0 40px rgba(0,0,0,0.8), 0 0 80px rgba(239,68,68,0.3)'
              }}
            >
              A Nova Camada
            </motion.h2>
            
            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-xl md:text-3xl text-white/90 font-light mb-3">
                Não usamos IA como ferramenta.
              </p>
              <p className="text-xl md:text-3xl font-semibold" style={{
                background: 'linear-gradient(90deg, #ff4444, #ff6666)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Criamos sistemas cognitivos.
                <span className="inline-block w-0.5 h-6 md:h-8 bg-red-500 ml-2 align-middle animate-pulse" />
              </p>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-white/50 max-w-2xl mx-auto text-base md:text-lg mt-8 font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Uma estrutura de inteligência aplicada que transforma operações, 
              decisões e presença digital.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div 
              className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <span className="text-white/30 text-xs uppercase tracking-widest font-mono">Scroll</span>
              <motion.div 
                className="w-px h-8 bg-gradient-to-b from-red-500/50 to-transparent"
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>

        {/* HUD elements */}
        <div className="absolute top-8 left-8 text-left hidden md:block z-10">
          <div className="text-[10px] text-red-500/70 font-mono uppercase tracking-wider mb-1">
            [CORTEX://AI_LAYER]
          </div>
          <div className="text-[9px] text-white/30 font-mono">
            Frame: {String(currentFrame + 1).padStart(2, '0')}/{frames.length}
          </div>
        </div>

        <div className="absolute top-8 right-8 text-right hidden md:block z-10">
          <div className="flex items-center gap-2 justify-end mb-1">
            <span className="text-[10px] text-green-400 font-mono">ONLINE</span>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          </div>
          <div className="text-[9px] text-white/30 font-mono">
            SYS.STATUS: ACTIVE
          </div>
        </div>
      </div>
    </section>
  );
};

export default NovaCamadaSection;
