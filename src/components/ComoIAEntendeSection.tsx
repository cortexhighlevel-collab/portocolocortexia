import { motion } from "framer-motion";
import { Code, Layers, Target, FileText, Brain } from "lucide-react";

const estrutura = [
  {
    icon: Layers,
    titulo: "Estrutura Semântica",
    descricao: "Hierarquia HTML clara. H1 único. Headings organizados. Schema markup completo."
  },
  {
    icon: FileText,
    titulo: "Leitura por Tópicos",
    descricao: "Cada seção responde uma pergunta. Blocos independentes. Contexto autocontido."
  },
  {
    icon: Target,
    titulo: "Entidades Definidas",
    descricao: "Serviços, benefícios e resultados são entidades claras. Sem ambiguidade."
  },
  {
    icon: Brain,
    titulo: "Intenção Clara",
    descricao: "Cada bloco tem propósito definido. IA sabe exatamente o que extrair."
  },
  {
    icon: Code,
    titulo: "Contexto Hierárquico",
    descricao: "Informação organizada do geral ao específico. Navegação cognitiva natural."
  }
];

const ComoIAEntendeSection = () => {
  return (
    <section id="como-ia-entende" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Matrix-like background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff0000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-medium">
            Transparência Técnica
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Como a IA entende esta página
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Mostramos exatamente como estruturamos conteúdo para ser 
            compreendido por modelos de linguagem. Isso é autoridade técnica.
          </p>
        </motion.div>

        {/* Statement */}
        <motion.div
          className="relative max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative p-8 md:p-12 bg-gradient-to-br from-red-500/10 via-[#0a0a0a] to-[#050505] border border-red-500/30 rounded-2xl">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl" />
            
            <div className="relative z-10 text-center">
              <Brain className="w-12 h-12 text-red-400 mx-auto mb-6" />
              <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
                "Nós entendemos como a IA pensa."
              </p>
              <p className="text-white/50 mt-4 text-lg">
                Por isso construímos páginas que ela consegue ler, interpretar e citar.
              </p>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-red-500 to-transparent" />
              <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-red-500 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16">
              <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-red-500 to-transparent" />
              <div className="absolute bottom-0 right-0 h-[2px] w-full bg-gradient-to-l from-red-500 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Estrutura grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:grid-cols-5">
          {estrutura.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative p-6 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 rounded-lg h-full group hover:border-red-500/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.titulo}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.descricao}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-white/30 text-sm font-mono">
            {'<schema type="Organization" service="AI Strategy" />'} 
          </p>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default ComoIAEntendeSection;