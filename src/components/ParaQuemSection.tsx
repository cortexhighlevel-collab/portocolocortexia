import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const targets = [
  { id: "TGT_01", nome: "Empresários", desc: "Visão estratégica" },
  { id: "TGT_02", nome: "Startups", desc: "Escala rápida" },
  { id: "TGT_03", nome: "Agências", desc: "Automação total" },
  { id: "TGT_04", nome: "Infoprodutores", desc: "IA no conteúdo" }
];

const ParaQuemSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Mobile tuning: controla quando o highlight começa/termina dentro da seção.
  // Valores menores deixam "mais adiantado"; maiores deixam "mais atrasado".
  const MOBILE_SCROLL_START = 0.12;
  const MOBILE_SCROLL_END = 0.88;

  // Desktop: o destaque segue o hover; quando não há hover, volta ao primeiro card.
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Mobile: o destaque segue o progresso de scroll dentro da seção.
  const [scrollIndex, setScrollIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!isMobile) return;

    // Normaliza para uma janela de scroll (evita trocar muito cedo/tarde no mobile).
    const clamped = Math.max(0, Math.min(1, v));
    const windowed = (clamped - MOBILE_SCROLL_START) / (MOBILE_SCROLL_END - MOBILE_SCROLL_START);
    const normalized = Math.max(0, Math.min(1, windowed));

    // `round` deixa a troca mais centralizada por card (menos sensação de atraso/adianto).
    const idx = Math.max(
      0,
      Math.min(targets.length - 1, Math.round(normalized * (targets.length - 1)))
    );

    setScrollIndex(idx);
  });

  const activeIndex = isMobile ? scrollIndex : hoveredIndex ?? 0;

  return (
    <section
      id="para-quem"
      ref={sectionRef}
      className="relative py-32 md:py-48 bg-background overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <motion.div className="mb-16" initial={{ opacity: 1, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded w-fit mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 font-mono text-xs">TARGETING SYSTEM</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">TARGET <span className="text-red-500">PROFILES</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {targets.map((target, index) => (
            <motion.button
              key={index}
              onMouseEnter={() => {
                if (isMobile) return;
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                if (isMobile) return;
                setHoveredIndex(null);
              }}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={
                `relative p-6 text-left transition-all duration-300 ` +
                (activeIndex === index
                  ? "bg-red-500/10 border-2 border-red-500"
                  : "bg-[#0a0a0a] border border-white/10 hover:border-white/30") +
                " " +
                (activeIndex === index ? "opacity-100 blur-none" : "opacity-50 blur-[2px]")
              }
            >
              {activeIndex === index && (
                <>
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-red-500" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-red-500" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-red-500" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-red-500" />
                  <span className="absolute top-2 right-2 text-red-400 font-mono text-xs">LOCKED</span>
                </>
              )}
              <span className="text-red-500/60 font-mono text-xs block mb-3">{target.id}</span>
              <h3 className={`text-xl font-semibold mb-2 ${activeIndex === index ? 'text-white' : 'text-white/70'}`}>{target.nome}</h3>
              <p className="text-white/40 text-sm font-mono">{target.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParaQuemSection;