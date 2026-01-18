import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="relative py-32 md:py-48 bg-background" id="contact">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-medium">Contato</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-2xl">
            Diagnóstico Estratégico
          </h2>
          <p className="text-white/40 text-lg mt-6 max-w-xl">
            Análise completa de como IA pode transformar seu negócio.
            Sem compromisso.
          </p>
        </motion.div>

        {/* CTA e Agenda */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* CTA Principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="mailto:reemtech0@gmail.com"
              className="group flex items-center justify-between w-full p-6 border border-white/10 rounded-xl hover:border-red-500/30 transition-colors"
            >
              <div>
                <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">Email</span>
                <span className="text-white text-lg">reemtech0@gmail.com</span>
              </div>
              <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-red-400 transition-colors" />
            </a>
          </motion.div>

          {/* TidyCal Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="border border-white/10 rounded-xl overflow-hidden" style={{ height: '400px' }}>
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