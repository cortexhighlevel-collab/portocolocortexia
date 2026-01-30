import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

const servicos = [
  { id: "aeo", label: "AEO / Otimização para IA" },
  { id: "agentes", label: "Agentes de IA Personalizados" },
  { id: "automacao", label: "Automação Inteligente" },
  { id: "consultoria", label: "Consultoria Estratégica" },
  { id: "treinamento", label: "Treinamento de Equipe" },
  { id: "auditoria", label: "Auditoria de IA" },
];

const orcamentos = [
  { id: "ate5k", label: "Até R$ 5.000" },
  { id: "5k-15k", label: "R$ 5.000 - R$ 15.000" },
  { id: "15k-30k", label: "R$ 15.000 - R$ 30.000" },
  { id: "30k-50k", label: "R$ 30.000 - R$ 50.000" },
  { id: "acima50k", label: "Acima de R$ 50.000" },
  { id: "definir", label: "A definir" },
];

const urgencias = [
  { id: "imediato", label: "Imediato" },
  { id: "1mes", label: "Próximo mês" },
  { id: "3meses", label: "Próximos 3 meses" },
  { id: "explorando", label: "Apenas explorando" },
];

const crms = [
  { id: "nenhum", label: "Não utilizo CRM" },
  { id: "hubspot", label: "HubSpot" },
  { id: "salesforce", label: "Salesforce" },
  { id: "pipedrive", label: "Pipedrive" },
  { id: "rdstation", label: "RD Station" },
  { id: "outro", label: "Outro CRM" },
];

const ContactSection = () => {
  const [selectedServicos, setSelectedServicos] = useState<string[]>([]);
  const [selectedOrcamento, setSelectedOrcamento] = useState<string>("");
  const [selectedUrgencia, setSelectedUrgencia] = useState<string>("");
  const [selectedCrm, setSelectedCrm] = useState<string>("");
  const [temAtendentes, setTemAtendentes] = useState<boolean | null>(null);
  const [quantidadeAtendentes, setQuantidadeAtendentes] = useState<string>("");
  const [temPresencaDigital, setTemPresencaDigital] = useState<boolean | null>(null);
  const [presencaDigitalUrl, setPresencaDigitalUrl] = useState<string>("");
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [descricao, setDescricao] = useState("");

  const toggleServico = (id: string) => {
    setSelectedServicos(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id) 
        : [...prev, id]
    );
  };

  const handleEnviarWhatsApp = () => {
    const servicosSelecionados = selectedServicos
      .map(id => servicos.find(s => s.id === id)?.label)
      .filter(Boolean)
      .join(", ");
    
    const orcamentoSelecionado = orcamentos.find(o => o.id === selectedOrcamento)?.label || "Não informado";
    const urgenciaSelecionada = urgencias.find(u => u.id === selectedUrgencia)?.label || "Não informado";
    const crmSelecionado = crms.find(c => c.id === selectedCrm)?.label || "Não informado";

    const atendentesInfo = temAtendentes === null 
      ? "Não informado" 
      : temAtendentes 
        ? `Sim, ${quantidadeAtendentes || "quantidade não informada"} atendente(s)`
        : "Não possui atendentes";

    const presencaDigitalInfo = temPresencaDigital === null
      ? "Não informado"
      : temPresencaDigital
        ? presencaDigitalUrl || "Não informou o link"
        : "Não possui site/Instagram";

    const mensagem = `🧠 *BRIEFING CORTEX POEI*

👤 *Nome:* ${nome || "Não informado"}
🏢 *Empresa:* ${empresa || "Não informado"}

📋 *Serviços de Interesse:*
${servicosSelecionados || "Nenhum selecionado"}

💰 *Orçamento Estimado:* ${orcamentoSelecionado}

⏰ *Urgência:* ${urgenciaSelecionada}

📊 *Sistema CRM:* ${crmSelecionado}

👥 *Atendentes:* ${atendentesInfo}

🌐 *Presença Digital:* ${presencaDigitalInfo}

📝 *Descrição do Projeto:*
${descricao || "Não informado"}

---
Enviado via site CORTEX POEI`;

    const whatsappUrl = `https://wa.me/554797422069?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, "_blank");
  };

  const clipPath = "polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

  return (
    <section id="contato" className="relative py-32 md:py-48 bg-background overflow-hidden">
      {/* Circuit pattern background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(239,68,68,0.3) 1px, transparent 1px),
            linear-gradient(rgba(239,68,68,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12" 
          initial={{ opacity: 1, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-[#0a0a0a] border border-green-500/30 rounded">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs text-green-400 uppercase tracking-wider">CHANNEL OPEN</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            INICIAR <span className="text-gradient-accent">CONTATO</span>
          </h2>
          <p className="text-white/40 font-mono text-sm max-w-xl mx-auto">
            Preencha o briefing abaixo para enviar seu projeto diretamente para nossa equipe via WhatsApp
          </p>
        </motion.div>

        {/* Briefing Form */}
        <motion.div 
          className="relative"
          initial={{ opacity: 1, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Outer glow border */}
          <div 
            className="absolute inset-0"
            style={{
              clipPath,
              background: 'linear-gradient(135deg, rgba(239,68,68,0.3) 0%, rgba(239,68,68,0.1) 50%, rgba(139,92,246,0.2) 100%)',
            }}
          />

          {/* Main container */}
          <div 
            className="relative bg-[#0a0a0a]/95"
            style={{ clipPath, margin: '1px' }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-white/40 font-mono text-xs">briefing_system.exe</span>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Dados básicos */}
              <div className="space-y-4">
                <div className="font-mono text-sm text-white/40 flex items-center gap-2">
                  <span className="text-red-500">$</span> 
                  input --user-data
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/30 text-xs font-mono block mb-2">NOME *</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-sm focus:border-red-500/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/30 text-xs font-mono block mb-2">EMPRESA</label>
                    <input
                      type="text"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Nome da empresa"
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-sm focus:border-red-500/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Serviços */}
              <div className="space-y-4">
                <div className="font-mono text-sm text-white/40 flex items-center gap-2">
                  <span className="text-red-500">$</span> 
                  select --services
                  <span className="text-white/20 text-xs">(múltipla escolha)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {servicos.map((servico) => (
                    <button
                      key={servico.id}
                      onClick={() => toggleServico(servico.id)}
                      className={`relative flex items-center gap-3 px-4 py-3 text-left transition-all ${
                        selectedServicos.includes(servico.id)
                          ? 'bg-red-500/10 border-red-500/50'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      } border rounded`}
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                        selectedServicos.includes(servico.id)
                          ? 'bg-red-500 border-red-500'
                          : 'border-white/20'
                      }`}>
                        {selectedServicos.includes(servico.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className={`font-mono text-sm ${
                        selectedServicos.includes(servico.id) ? 'text-white' : 'text-white/60'
                      }`}>
                        {servico.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Orçamento */}
              <div className="space-y-4">
                <div className="font-mono text-sm text-white/40 flex items-center gap-2">
                  <span className="text-red-500">$</span> 
                  select --budget
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {orcamentos.map((orcamento) => (
                    <button
                      key={orcamento.id}
                      onClick={() => setSelectedOrcamento(orcamento.id)}
                      className={`px-4 py-3 text-center transition-all ${
                        selectedOrcamento === orcamento.id
                          ? 'bg-red-500/10 border-red-500/50 text-white'
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                      } border rounded font-mono text-xs`}
                    >
                      {orcamento.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgência */}
              <div className="space-y-4">
                <div className="font-mono text-sm text-white/40 flex items-center gap-2">
                  <span className="text-red-500">$</span> 
                  select --urgency
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {urgencias.map((urgencia) => (
                    <button
                      key={urgencia.id}
                      onClick={() => setSelectedUrgencia(urgencia.id)}
                      className={`px-4 py-3 text-center transition-all ${
                        selectedUrgencia === urgencia.id
                          ? 'bg-red-500/10 border-red-500/50 text-white'
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                      } border rounded font-mono text-xs`}
                    >
                      {urgencia.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-4">
                <div className="font-mono text-sm text-white/40 flex items-center gap-2">
                  <span className="text-red-500">$</span> 
                  input --description
                </div>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva seu projeto, objetivos, desafios atuais e o que você espera alcançar..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-sm focus:border-red-500/50 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* CRM */}
              <div className="space-y-4">
                <div className="font-mono text-sm text-white/40 flex items-center gap-2">
                  <span className="text-red-500">$</span> 
                  select --crm-system
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {crms.map((crm) => (
                    <button
                      key={crm.id}
                      onClick={() => setSelectedCrm(crm.id)}
                      className={`px-4 py-3 text-center transition-all ${
                        selectedCrm === crm.id
                          ? 'bg-red-500/10 border-red-500/50 text-white'
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                      } border rounded font-mono text-xs`}
                    >
                      {crm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Atendentes */}
              <div className="space-y-4">
                <div className="font-mono text-sm text-white/40 flex items-center gap-2">
                  <span className="text-red-500">$</span> 
                  query --team-support
                  <span className="text-white/20 text-xs">(possui atendentes?)</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setTemAtendentes(true)}
                    className={`flex-1 px-4 py-3 text-center transition-all ${
                      temAtendentes === true
                        ? 'bg-red-500/10 border-red-500/50 text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                    } border rounded font-mono text-xs`}
                  >
                    Sim, possuo
                  </button>
                  <button
                    onClick={() => {
                      setTemAtendentes(false);
                      setQuantidadeAtendentes("");
                    }}
                    className={`flex-1 px-4 py-3 text-center transition-all ${
                      temAtendentes === false
                        ? 'bg-red-500/10 border-red-500/50 text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                    } border rounded font-mono text-xs`}
                  >
                    Não possuo
                  </button>
                </div>
                {temAtendentes === true && (
                  <div className="mt-3">
                    <label className="text-white/30 text-xs font-mono block mb-2">QUANTOS ATENDENTES? *</label>
                    <input
                      type="text"
                      value={quantidadeAtendentes}
                      onChange={(e) => setQuantidadeAtendentes(e.target.value)}
                      placeholder="Ex: 3 atendentes"
                      className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-sm focus:border-red-500/50 focus:outline-none transition-colors"
                    />
                  </div>
                )}
              </div>

              {/* Presença Digital */}
              <div className="space-y-4">
                <div className="font-mono text-sm text-white/40 flex items-center gap-2">
                  <span className="text-red-500">$</span> 
                  query --digital-presence
                  <span className="text-white/20 text-xs">(site ou Instagram?)</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setTemPresencaDigital(true)}
                    className={`flex-1 px-4 py-3 text-center transition-all ${
                      temPresencaDigital === true
                        ? 'bg-red-500/10 border-red-500/50 text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                    } border rounded font-mono text-xs`}
                  >
                    Sim, tenho
                  </button>
                  <button
                    onClick={() => {
                      setTemPresencaDigital(false);
                      setPresencaDigitalUrl("");
                    }}
                    className={`flex-1 px-4 py-3 text-center transition-all ${
                      temPresencaDigital === false
                        ? 'bg-red-500/10 border-red-500/50 text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                    } border rounded font-mono text-xs`}
                  >
                    Não tenho
                  </button>
                </div>
                {temPresencaDigital === true && (
                  <div className="mt-3">
                    <label className="text-white/30 text-xs font-mono block mb-2">INFORME O LINK (SITE OU INSTAGRAM) *</label>
                    <input
                      type="text"
                      value={presencaDigitalUrl}
                      onChange={(e) => setPresencaDigitalUrl(e.target.value)}
                      placeholder="Ex: www.suaempresa.com.br ou @seuinstagram"
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-sm focus:border-red-500/50 focus:outline-none transition-colors"
                    />
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10" />
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-red-500/50" />
                  <div className="w-2 h-2 border border-red-500/30 rotate-45" />
                  <div className="w-1 h-1 bg-red-500/50" />
                </div>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={handleEnviarWhatsApp}
                  className="group relative w-full md:w-auto"
                >
                  {/* Button glow */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-red-500/30 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  
                  {/* Button */}
                  <div 
                    className="relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-all"
                    style={{
                      clipPath: "polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))",
                    }}
                  >
                    <span className="flex items-center justify-center gap-3 text-white font-bold text-sm uppercase tracking-wider">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      ENVIAR VIA WHATSAPP
                    </span>
                  </div>

                  {/* Corner accents */}
                  <svg className="absolute -top-1 -left-1 pointer-events-none" width="12" height="12">
                    <line x1="0" y1="12" x2="0" y2="4" stroke="#ef4444" strokeWidth="2" />
                    <line x1="0" y1="12" x2="8" y2="12" stroke="#ef4444" strokeWidth="2" />
                  </svg>
                  <svg className="absolute -top-1 -right-1 pointer-events-none" width="12" height="12">
                    <line x1="12" y1="12" x2="12" y2="4" stroke="#ef4444" strokeWidth="2" />
                    <line x1="12" y1="12" x2="4" y2="12" stroke="#ef4444" strokeWidth="2" />
                  </svg>
                </button>

                <p className="text-white/20 text-xs font-mono text-center">
                  <span className="text-red-500/40">//</span> Seu briefing será enviado diretamente para nossa equipe
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Email alternativo */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-white/30 text-sm font-mono mb-2">
            <span className="text-red-500/60">$</span> ou envie por email
          </p>
          <a 
            href="mailto:contato@cortexpoei.com" 
            className="text-white/50 hover:text-red-400 transition-colors font-mono text-sm"
          >
            contato@cortexpoei.com
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
