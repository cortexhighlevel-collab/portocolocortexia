import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const codeLines = [
  { type: "comment", text: "// Analyzing business context..." },
  { type: "code", text: "const context = await AI.understand(business);" },
  { type: "code", text: "const agents = AI.deployAgents(context);" },
  { type: "success", text: "// ✓ AI Integration Complete" }
];

const ComoIAEntendeSection = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  return (
    <section id="como-ia-entende" className="relative py-32 md:py-48 bg-background overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Como a IA<span className="text-red-500 block">entende você</span></h2>
            <p className="text-white/50 text-lg">Treinamos modelos para interpretar seu negócio e operar de forma autônoma.</p>
          </motion.div>

          <motion.div className="bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onViewportEnter={() => { let i = 0; const interval = setInterval(() => { if (i < codeLines.length) { setVisibleLines(i + 1); i++; } else clearInterval(interval); }, 600); }}>
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-white/40 font-mono text-xs ml-3">cortex_ai.ts</span>
            </div>
            <div className="p-6 font-mono text-sm min-h-[160px]">
              {codeLines.slice(0, visibleLines).map((line, i) => (
                <div key={i} className={`mb-2 ${line.type === 'comment' ? 'text-white/30' : line.type === 'success' ? 'text-green-400' : 'text-white/70'}`}>
                  <span className="text-white/20 mr-4">{String(i + 1).padStart(2, '0')}</span>{line.text}
                </div>
              ))}
              {visibleLines < codeLines.length && <div className="flex items-center"><span className="text-white/20 mr-4">{String(visibleLines + 1).padStart(2, '0')}</span><span className="w-2 h-4 bg-red-500 animate-pulse" /></div>}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComoIAEntendeSection;