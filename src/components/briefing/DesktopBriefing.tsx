import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import {
  BriefingData,
  servicos,
  orcamentos,
  urgencias,
} from "./BriefingSteps";

interface DesktopBriefingProps {
  onSubmit: (data: BriefingData) => void;
}

const DesktopBriefing = ({ onSubmit }: DesktopBriefingProps) => {
  const [data, setData] = useState<BriefingData>({
    nome: "",
    empresa: "",
    temPresencaDigital: null,
    presencaDigitalUrl: "",
    selectedServicos: [],
    descricao: "",
    temCrm: null,
    crmNome: "",
    temAtendentes: null,
    quantidadeAtendentes: "",
    selectedOrcamento: "",
    selectedUrgencia: "",
  });

  const updateData = (updates: Partial<BriefingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const toggleServico = (id: string) => {
    const newServicos = data.selectedServicos.includes(id)
      ? data.selectedServicos.filter((s) => s !== id)
      : [...data.selectedServicos, id];
    updateData({ selectedServicos: newServicos });
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  const clipPath =
    "polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

  return (
    <div className="relative">
      {/* Outer glow border */}
      <div
        className="absolute inset-0"
        style={{
          clipPath,
          background:
            "linear-gradient(135deg, rgba(239,68,68,0.3) 0%, rgba(239,68,68,0.1) 50%, rgba(139,92,246,0.2) 100%)",
        }}
      />

      {/* Main container */}
      <div
        className="relative bg-[#0a0a0a]/95"
        style={{ clipPath, margin: "1px" }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-white/40 font-mono text-xs">
            briefing_system.exe
          </span>
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
                <label className="text-white/30 text-xs font-mono block mb-2">
                  NOME *
                </label>
                <input
                  type="text"
                  value={data.nome}
                  onChange={(e) => updateData({ nome: e.target.value })}
                  placeholder="Seu nome"
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-sm focus:border-red-500/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-white/30 text-xs font-mono block mb-2">
                  EMPRESA
                </label>
                <input
                  type="text"
                  value={data.empresa}
                  onChange={(e) => updateData({ empresa: e.target.value })}
                  placeholder="Nome da empresa"
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-sm focus:border-red-500/50 focus:outline-none transition-colors"
                />
              </div>
            </div>
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
                onClick={() => updateData({ temPresencaDigital: true })}
                className={`flex-1 px-4 py-3 text-center transition-all ${
                  data.temPresencaDigital === true
                    ? "bg-red-500/10 border-red-500/50 text-white"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                } border rounded font-mono text-xs`}
              >
                Sim, tenho
              </button>
              <button
                onClick={() =>
                  updateData({
                    temPresencaDigital: false,
                    presencaDigitalUrl: "",
                  })
                }
                className={`flex-1 px-4 py-3 text-center transition-all ${
                  data.temPresencaDigital === false
                    ? "bg-red-500/10 border-red-500/50 text-white"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                } border rounded font-mono text-xs`}
              >
                Não tenho
              </button>
            </div>
            <AnimatePresence>
              {data.temPresencaDigital === true && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3"
                >
                  <label className="text-white/30 text-xs font-mono block mb-2">
                    INFORME O LINK *
                  </label>
                  <input
                    type="text"
                    value={data.presencaDigitalUrl}
                    onChange={(e) =>
                      updateData({ presencaDigitalUrl: e.target.value })
                    }
                    placeholder="Ex: www.suaempresa.com.br ou @seuinstagram"
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-sm focus:border-red-500/50 focus:outline-none transition-colors"
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
                    data.selectedServicos.includes(servico.id)
                      ? "bg-red-500/10 border-red-500/50"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  } border rounded`}
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                      data.selectedServicos.includes(servico.id)
                        ? "bg-red-500 border-red-500"
                        : "border-white/20"
                    }`}
                  >
                    {data.selectedServicos.includes(servico.id) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span
                    className={`font-mono text-sm ${
                      data.selectedServicos.includes(servico.id)
                        ? "text-white"
                        : "text-white/60"
                    }`}
                  >
                    {servico.label}
                  </span>
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
              value={data.descricao}
              onChange={(e) => updateData({ descricao: e.target.value })}
              placeholder="Descreva seu projeto, objetivos, desafios atuais e o que você espera alcançar..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-sm focus:border-red-500/50 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* CRM */}
          <div className="space-y-4">
            <div className="font-mono text-sm text-white/40 flex items-center gap-2">
              <span className="text-red-500">$</span>
              query --crm-system
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => updateData({ temCrm: true })}
                className={`flex-1 px-4 py-3 text-center transition-all ${
                  data.temCrm === true
                    ? "bg-red-500/10 border-red-500/50 text-white"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                } border rounded font-mono text-xs`}
              >
                Sim, utilizo CRM
              </button>
              <button
                onClick={() => updateData({ temCrm: false, crmNome: "" })}
                className={`flex-1 px-4 py-3 text-center transition-all ${
                  data.temCrm === false
                    ? "bg-red-500/10 border-red-500/50 text-white"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                } border rounded font-mono text-xs`}
              >
                Não utilizo CRM
              </button>
            </div>
            <AnimatePresence>
              {data.temCrm === true && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3"
                >
                  <label className="text-white/30 text-xs font-mono block mb-2">
                    QUAL CRM VOCÊ UTILIZA? *
                  </label>
                  <input
                    type="text"
                    value={data.crmNome}
                    onChange={(e) => updateData({ crmNome: e.target.value })}
                    placeholder="Ex: HubSpot, Salesforce, Pipedrive..."
                    className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-sm focus:border-red-500/50 focus:outline-none transition-colors"
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
                onClick={() => updateData({ temAtendentes: true })}
                className={`flex-1 px-4 py-3 text-center transition-all ${
                  data.temAtendentes === true
                    ? "bg-red-500/10 border-red-500/50 text-white"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                } border rounded font-mono text-xs`}
              >
                Sim, possuo
              </button>
              <button
                onClick={() =>
                  updateData({ temAtendentes: false, quantidadeAtendentes: "" })
                }
                className={`flex-1 px-4 py-3 text-center transition-all ${
                  data.temAtendentes === false
                    ? "bg-red-500/10 border-red-500/50 text-white"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                } border rounded font-mono text-xs`}
              >
                Não possuo
              </button>
            </div>
            <AnimatePresence>
              {data.temAtendentes === true && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3"
                >
                  <label className="text-white/30 text-xs font-mono block mb-2">
                    QUANTOS ATENDENTES? *
                  </label>
                  <input
                    type="text"
                    value={data.quantidadeAtendentes}
                    onChange={(e) =>
                      updateData({ quantidadeAtendentes: e.target.value })
                    }
                    placeholder="Ex: 3 atendentes"
                    className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-sm focus:border-red-500/50 focus:outline-none transition-colors"
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
                  onClick={() =>
                    updateData({ selectedOrcamento: orcamento.id })
                  }
                  className={`px-4 py-3 text-center transition-all ${
                    data.selectedOrcamento === orcamento.id
                      ? "bg-red-500/10 border-red-500/50 text-white"
                      : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
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
                  onClick={() => updateData({ selectedUrgencia: urgencia.id })}
                  className={`px-4 py-3 text-center transition-all ${
                    data.selectedUrgencia === urgencia.id
                      ? "bg-red-500/10 border-red-500/50 text-white"
                      : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                  } border rounded font-mono text-xs`}
                >
                  {urgencia.label}
                </button>
              ))}
            </div>
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
            <button onClick={handleSubmit} className="group relative w-full md:w-auto">
              {/* Button glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-red-500/30 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Button */}
              <div
                className="relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-all"
                style={{
                  clipPath:
                    "polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                <span className="flex items-center justify-center gap-3 text-white font-bold text-sm uppercase tracking-wider">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  ENVIAR VIA WHATSAPP
                </span>
              </div>

              {/* Corner accents */}
              <svg
                className="absolute -top-1 -left-1 pointer-events-none"
                width="12"
                height="12"
              >
                <line
                  x1="0"
                  y1="12"
                  x2="0"
                  y2="4"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
                <line
                  x1="0"
                  y1="12"
                  x2="8"
                  y2="12"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
              </svg>
              <svg
                className="absolute -top-1 -right-1 pointer-events-none"
                width="12"
                height="12"
              >
                <line
                  x1="12"
                  y1="12"
                  x2="12"
                  y2="4"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
                <line
                  x1="12"
                  y1="12"
                  x2="4"
                  y2="12"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <p className="text-white/20 text-xs font-mono text-center">
              <span className="text-red-500/40">//</span> Seu briefing será
              enviado diretamente para nossa equipe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopBriefing;
