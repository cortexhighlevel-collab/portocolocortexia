import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";

// Dados dos formulários
export const servicos = [
  { id: "aeo", label: "AEO / Otimização para IA" },
  { id: "agentes", label: "Agentes de IA Personalizados" },
  { id: "automacao", label: "Automação Inteligente" },
  { id: "consultoria", label: "Consultoria Estratégica" },
  { id: "treinamento", label: "Treinamento de Equipe" },
  { id: "auditoria", label: "Auditoria de IA" },
];

export const orcamentos = [
  { id: "ate5k", label: "Até R$ 5.000" },
  { id: "5k-15k", label: "R$ 5.000 - R$ 15.000" },
  { id: "15k-30k", label: "R$ 15.000 - R$ 30.000" },
  { id: "30k-50k", label: "R$ 30.000 - R$ 50.000" },
  { id: "acima50k", label: "Acima de R$ 50.000" },
  { id: "definir", label: "A definir" },
];

export const urgencias = [
  { id: "imediato", label: "Imediato" },
  { id: "1mes", label: "Próximo mês" },
  { id: "3meses", label: "Próximos 3 meses" },
  { id: "explorando", label: "Apenas explorando" },
];

export interface BriefingData {
  nome: string;
  empresa: string;
  temPresencaDigital: boolean | null;
  presencaDigitalUrl: string;
  selectedServicos: string[];
  descricao: string;
  temCrm: boolean | null;
  crmNome: string;
  temAtendentes: boolean | null;
  quantidadeAtendentes: string;
  selectedOrcamento: string;
  selectedUrgencia: string;
}

// Validação para cada etapa - retorna true se pode avançar
export const canProceedStep1 = (data: BriefingData): boolean => {
  // Nome obrigatório (mínimo 2 caracteres)
  if (!data.nome.trim() || data.nome.trim().length < 2) return false;
  // Presença digital precisa ser respondida (Sim ou Não)
  if (data.temPresencaDigital === null) return false;
  // Se disse "Sim", precisa informar o link
  if (data.temPresencaDigital === true && !data.presencaDigitalUrl.trim()) return false;
  return true;
};

export const canProceedStep2 = (data: BriefingData): boolean => {
  // Pelo menos 1 serviço selecionado
  if (data.selectedServicos.length === 0) return false;
  // CRM precisa ser respondido (Sim ou Não)
  if (data.temCrm === null) return false;
  // Se disse "Sim", precisa informar qual CRM
  if (data.temCrm === true && !data.crmNome.trim()) return false;
  // Atendentes precisa ser respondido (Sim ou Não)
  if (data.temAtendentes === null) return false;
  // Se disse "Sim", precisa informar quantidade
  if (data.temAtendentes === true && !data.quantidadeAtendentes.trim()) return false;
  return true;
};

export const canProceedStep3 = (data: BriefingData): boolean => {
  // Orçamento obrigatório
  if (!data.selectedOrcamento) return false;
  // Urgência obrigatória
  if (!data.selectedUrgencia) return false;
  return true;
};

interface StepProps {
  data: BriefingData;
  updateData: (updates: Partial<BriefingData>) => void;
}

// Step 1: Dados básicos (Nome e Empresa)
export const StepDadosBasicos = ({ data, updateData }: StepProps) => (
  <div className="space-y-4">
    <div className="font-mono text-sm text-white/40 flex items-center gap-2 mb-4">
      <span className="text-red-500">$</span> input --user-data
    </div>
    <div className="space-y-4">
      <div>
        <label className="text-white/30 text-xs font-mono block mb-2">NOME *</label>
        <input
          type="text"
          value={data.nome}
          onChange={(e) => updateData({ nome: e.target.value })}
          placeholder="Seu nome completo"
          className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-base focus:border-red-500/50 focus:outline-none transition-colors"
        />
      </div>
      <div>
        <label className="text-white/30 text-xs font-mono block mb-2">EMPRESA</label>
        <input
          type="text"
          value={data.empresa}
          onChange={(e) => updateData({ empresa: e.target.value })}
          placeholder="Nome da empresa (opcional)"
          className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-base focus:border-red-500/50 focus:outline-none transition-colors"
        />
      </div>
    </div>
  </div>
);

// Step 2: Presença Digital (site ou Instagram)
export const StepPresencaDigital = ({ data, updateData }: StepProps) => (
  <div className="space-y-4">
    <div className="font-mono text-sm text-white/40 flex items-center gap-2 mb-4">
      <span className="text-red-500">$</span> query --digital-presence
    </div>
    <p className="text-white/50 text-sm mb-4">Você possui site ou Instagram da empresa?</p>
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
        onClick={() => updateData({ temPresencaDigital: false, presencaDigitalUrl: "" })}
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
            onChange={(e) => updateData({ presencaDigitalUrl: e.target.value })}
            placeholder="Ex: www.suaempresa.com.br ou @seuinstagram"
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-base focus:border-red-500/50 focus:outline-none transition-colors"
          />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Step 3: Serviços
export const StepServicos = ({ data, updateData }: StepProps) => {
  const toggleServico = (id: string) => {
    const newServicos = data.selectedServicos.includes(id)
      ? data.selectedServicos.filter((s) => s !== id)
      : [...data.selectedServicos, id];
    updateData({ selectedServicos: newServicos });
  };

  return (
    <div className="space-y-4">
      <div className="font-mono text-sm text-white/40 flex items-center gap-2 mb-4">
        <span className="text-red-500">$</span> select --services
        <span className="text-white/20 text-xs">(múltipla escolha)</span>
      </div>
      <div className="grid grid-cols-1 gap-3">
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
  );
};

// Step 4: Descrição do Projeto
export const StepDescricao = ({ data, updateData }: StepProps) => (
  <div className="space-y-4">
    <div className="font-mono text-sm text-white/40 flex items-center gap-2 mb-4">
      <span className="text-red-500">$</span> input --description
    </div>
    <textarea
      value={data.descricao}
      onChange={(e) => updateData({ descricao: e.target.value })}
      placeholder="Descreva seu projeto, objetivos, desafios atuais e o que você espera alcançar..."
      rows={5}
      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-base focus:border-red-500/50 focus:outline-none transition-colors resize-none"
    />
  </div>
);

// Step 5: CRM (simplificado)
export const StepCrm = ({ data, updateData }: StepProps) => (
  <div className="space-y-4">
    <div className="font-mono text-sm text-white/40 flex items-center gap-2 mb-4">
      <span className="text-red-500">$</span> query --crm-system
    </div>
    <p className="text-white/50 text-sm mb-4">Você utiliza algum sistema de CRM?</p>
    <div className="flex gap-3">
      <button
        onClick={() => updateData({ temCrm: true })}
        className={`flex-1 px-4 py-3 text-center transition-all ${
          data.temCrm === true
            ? "bg-red-500/10 border-red-500/50 text-white"
            : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
        } border rounded font-mono text-xs`}
      >
        Sim, utilizo
      </button>
      <button
        onClick={() => updateData({ temCrm: false, crmNome: "" })}
        className={`flex-1 px-4 py-3 text-center transition-all ${
          data.temCrm === false
            ? "bg-red-500/10 border-red-500/50 text-white"
            : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
        } border rounded font-mono text-xs`}
      >
        Não utilizo
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
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-base focus:border-red-500/50 focus:outline-none transition-colors"
          />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Step 6: Atendentes
export const StepAtendentes = ({ data, updateData }: StepProps) => (
  <div className="space-y-4">
    <div className="font-mono text-sm text-white/40 flex items-center gap-2 mb-4">
      <span className="text-red-500">$</span> query --team-support
    </div>
    <p className="text-white/50 text-sm mb-4">Você possui atendentes na sua equipe?</p>
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
        onClick={() => updateData({ temAtendentes: false, quantidadeAtendentes: "" })}
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
            onChange={(e) => updateData({ quantidadeAtendentes: e.target.value })}
            placeholder="Ex: 3 atendentes"
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/20 font-mono text-base focus:border-red-500/50 focus:outline-none transition-colors"
          />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Step 7: Orçamento e Urgência (final)
export const StepOrcamentoUrgencia = ({ data, updateData }: StepProps) => (
  <div className="space-y-6">
    <div className="space-y-4">
      <div className="font-mono text-sm text-white/40 flex items-center gap-2">
        <span className="text-red-500">$</span> select --budget
      </div>
      <div className="grid grid-cols-2 gap-3">
        {orcamentos.map((orcamento) => (
          <button
            key={orcamento.id}
            onClick={() => updateData({ selectedOrcamento: orcamento.id })}
            className={`px-3 py-3 text-center transition-all ${
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

    <div className="space-y-4">
      <div className="font-mono text-sm text-white/40 flex items-center gap-2">
        <span className="text-red-500">$</span> select --urgency
      </div>
      <div className="grid grid-cols-2 gap-3">
        {urgencias.map((urgencia) => (
          <button
            key={urgencia.id}
            onClick={() => updateData({ selectedUrgencia: urgencia.id })}
            className={`px-3 py-3 text-center transition-all ${
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
  </div>
);

// Progress indicator for mobile
interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => (
  <div className="flex items-center justify-center gap-2 mb-6">
    {Array.from({ length: totalSteps }).map((_, index) => (
      <div
        key={index}
        className={`h-1.5 rounded-full transition-all duration-300 ${
          index < currentStep
            ? "w-6 bg-red-500"
            : index === currentStep
            ? "w-8 bg-red-500"
            : "w-4 bg-white/20"
        }`}
      />
    ))}
  </div>
);

// Navigation buttons
interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const NavigationButtons = ({
  currentStep,
  totalSteps,
  canProceed,
  onPrev,
  onNext,
  onSubmit,
}: NavigationButtonsProps) => (
  <div className="flex gap-3 mt-6">
    {currentStep > 0 && (
      <button
        onClick={onPrev}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded font-mono text-sm text-white/60 hover:border-white/20 transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
        Voltar
      </button>
    )}
    {currentStep < totalSteps - 1 ? (
      <button
        onClick={onNext}
        disabled={!canProceed}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded font-mono text-sm transition-all ${
          canProceed
            ? "bg-red-500/20 border border-red-500/50 text-white hover:bg-red-500/30"
            : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
        }`}
      >
        Próximo
        <ChevronRight className="w-4 h-4" />
      </button>
    ) : (
      <button
        onClick={onSubmit}
        disabled={!canProceed}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded font-mono text-sm transition-all ${
          canProceed
            ? "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400"
            : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
        }`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Enviar WhatsApp
      </button>
    )}
  </div>
);
