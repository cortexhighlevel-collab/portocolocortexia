import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="relative py-40 md:py-56 bg-background overflow-hidden" id="contact">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-red-500 to-transparent" />
            <span className="text-red-500 text-sm uppercase tracking-[0.3em]">Contato</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Diagnóstico Estratégico
          </h2>
          <p className="text-white/40 text-xl mt-6 max-w-xl">
            Análise completa de como IA pode transformar seu negócio.
          </p>
        </motion.div>

        {/* Grid de contato */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Email CTA */}
          <motion.a
            href="mailto:reemtech0@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group"
          >
            <div className="relative p-8 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 rounded-2xl hover:border-red-500/30 transition-all duration-500 overflow-hidden">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 group-hover:border-red-500/40 transition-colors">
                    <Mail className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <span className="text-white/30 text-xs uppercase tracking-wider block mb-1">Email</span>
                    <span className="text-white text-lg">reemtech0@gmail.com</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-red-500/50 to-transparent" />
                <div className="absolute bottom-0 right-0 h-[1px] w-full bg-gradient-to-l from-red-500/50 to-transparent" />
              </div>
            </div>
          </motion.a>

          {/* Agenda embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 rounded-2xl overflow-hidden" style={{ height: '380px' }}>
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-red-500/50 to-transparent" />
                <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-red-500/50 to-transparent" />
              </div>
              
              <iframe
                src="https://tidycal.com/reemtech/30-minute-meeting"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                title="Agende uma consultoria"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;