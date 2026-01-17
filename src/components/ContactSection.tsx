import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    objetivo: "",
    interesse: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui integraria com backend
    console.log(formData);
  };

  return (
    <section className="relative py-24 md:py-32 bg-black" id="contact">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,0,0.1)_0%,transparent_50%)]" />
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
            CTA & Conversão
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Diagnóstico Estratégico
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Análise completa de como IA pode transformar seu negócio. 
            Sem compromisso. Sem pitch de vendas. Apenas estratégia.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label className="block text-white/60 text-sm mb-2 uppercase tracking-wider">
                  Nome
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full px-4 py-4 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-red-500/50 focus:outline-none transition-colors"
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              {/* Empresa */}
              <div>
                <label className="block text-white/60 text-sm mb-2 uppercase tracking-wider">
                  Empresa
                </label>
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                  className="w-full px-4 py-4 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-red-500/50 focus:outline-none transition-colors"
                  placeholder="Nome da empresa"
                  required
                />
              </div>

              {/* Objetivo */}
              <div>
                <label className="block text-white/60 text-sm mb-2 uppercase tracking-wider">
                  Objetivo
                </label>
                <textarea
                  value={formData.objetivo}
                  onChange={(e) => setFormData({...formData, objetivo: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-4 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-red-500/50 focus:outline-none transition-colors resize-none"
                  placeholder="O que você quer resolver com IA?"
                  required
                />
              </div>

              {/* Tipo de interesse */}
              <div>
                <label className="block text-white/60 text-sm mb-2 uppercase tracking-wider">
                  Tipo de Interesse
                </label>
                <select
                  value={formData.interesse}
                  onChange={(e) => setFormData({...formData, interesse: e.target.value})}
                  className="w-full px-4 py-4 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:border-red-500/50 focus:outline-none transition-colors"
                  required
                >
                  <option value="" className="bg-black">Selecione uma opção</option>
                  <option value="automacao" className="bg-black">Automação com IA</option>
                  <option value="analise" className="bg-black">Análise Estratégica</option>
                  <option value="agentes" className="bg-black">Agentes de IA</option>
                  <option value="aeo-seo" className="bg-black">AEO & SEO</option>
                  <option value="prompt" className="bg-black">Engenharia de Prompt</option>
                  <option value="consultoria" className="bg-black">Consultoria Geral</option>
                </select>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                className="relative group w-full py-5 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <Send className="w-5 h-5" />
                  <span className="uppercase tracking-wider">Solicitar Diagnóstico</span>
                </div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </form>
          </motion.div>

          {/* TidyCal Embed */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="text-center mb-6">
                <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Ou agende direto</p>
                <h3 className="text-white font-semibold text-xl">Conversa com Especialista</h3>
              </div>
              
              <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/10 rounded-xl overflow-hidden" style={{ height: '500px' }}>
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

              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8">
                <div className="absolute top-0 left-0 w-[2px] h-full bg-red-500/50" />
                <div className="absolute top-0 left-0 h-[2px] w-full bg-red-500/50" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8">
                <div className="absolute bottom-0 right-0 w-[2px] h-full bg-red-500/50" />
                <div className="absolute bottom-0 right-0 h-[2px] w-full bg-red-500/50" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
    </section>
  );
};

export default ContactSection;