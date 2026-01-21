import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-32 md:py-48 bg-background overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <motion.div className="text-center mb-16" initial={{ opacity: 1, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}>
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs text-green-400">CHANNEL OPEN</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">INICIAR <span className="text-red-500">CONTATO</span></h2>
        </motion.div>

        <motion.div className="bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden" initial={{ opacity: 1, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}>
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="text-white/40 font-mono text-xs">contact.sh</span>
          </div>
          <div className="p-8">
            <div className="mb-8">
              <div className="font-mono text-sm text-white/40 mb-2"><span className="text-red-500">$</span> cat /contact/email</div>
              <a href="mailto:contato@cortexpoei.com" className="text-2xl md:text-3xl font-bold text-white hover:text-red-400 transition-colors">contato@cortexpoei.com</a>
            </div>
            <div className="flex items-center gap-4 my-6"><div className="flex-1 h-px bg-white/10" /><span className="text-white/30 font-mono text-xs">OR</span><div className="flex-1 h-px bg-white/10" /></div>
            <div className="font-mono text-sm text-white/40 mb-4"><span className="text-red-500">$</span> ./schedule --meeting</div>
            <div className="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <iframe src="https://tidycal.com/cortexpoei/diagnostico-estrategico" className="w-full h-[500px] border-0" title="Agendar" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;