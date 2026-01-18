import { motion } from "framer-motion";

const ComoIAEntendeSection = () => {
  return (
    <section id="como-ia-entende" className="relative py-32 md:py-48 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Statement central */}
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-medium">Transparência Técnica</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
            "Nós entendemos como a IA pensa."
          </h2>
          
          <p className="text-white/40 text-lg leading-relaxed">
            Por isso construímos páginas que ela consegue ler, interpretar e citar.
            Estrutura semântica. Entidades claras. Contexto hierárquico.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComoIAEntendeSection;