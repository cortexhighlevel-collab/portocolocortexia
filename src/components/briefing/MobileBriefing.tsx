import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  BriefingData,
  StepDadosBasicos,
  StepPresencaDigital,
  StepServicos,
  StepDescricao,
  StepCrm,
  StepAtendentes,
  StepOrcamentoUrgencia,
  ProgressIndicator,
  NavigationButtons,
} from "./BriefingSteps";

interface MobileBriefingProps {
  onSubmit: (data: BriefingData) => void;
  onClose?: () => void;
}

const TOTAL_STEPS = 7;

const MobileBriefing = ({ onSubmit, onClose }: MobileBriefingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
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

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 0: // Dados básicos - requer nome (mínimo 2 caracteres)
        return data.nome.trim().length >= 2;
      case 1: // Presença Digital - precisa escolher Sim ou Não
        if (data.temPresencaDigital === null) return false;
        if (data.temPresencaDigital === true && !data.presencaDigitalUrl.trim()) return false;
        return true;
      case 2: // Serviços - pelo menos 1 selecionado
        return data.selectedServicos.length > 0;
      case 3: // Descrição - opcional
        return true;
      case 4: // CRM - precisa escolher Sim ou Não
        if (data.temCrm === null) return false;
        if (data.temCrm === true && !data.crmNome.trim()) return false;
        return true;
      case 5: // Atendentes - precisa escolher Sim ou Não
        if (data.temAtendentes === null) return false;
        if (data.temAtendentes === true && !data.quantidadeAtendentes.trim()) return false;
        return true;
      case 6: // Orçamento e Urgência - ambos obrigatórios
        return data.selectedOrcamento !== "" && data.selectedUrgencia !== "";
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1 && canProceed()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (canProceed()) {
      onSubmit(data);
    }
  };

  const stepTitles = [
    "Seus Dados",
    "Presença Digital",
    "Serviços",
    "Seu Projeto",
    "Sistema CRM",
    "Equipe",
    "Orçamento & Prazo",
  ];

  const renderStep = () => {
    const props = { data, updateData };
    switch (currentStep) {
      case 0:
        return <StepDadosBasicos {...props} />;
      case 1:
        return <StepPresencaDigital {...props} />;
      case 2:
        return <StepServicos {...props} />;
      case 3:
        return <StepDescricao {...props} />;
      case 4:
        return <StepCrm {...props} />;
      case 5:
        return <StepAtendentes {...props} />;
      case 6:
        return <StepOrcamentoUrgencia {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-[#0a0a0a]/95 rounded-lg overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
          <span className="text-white/40 font-mono text-[10px]">briefing_system.exe</span>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/60 hover:text-white" />
          </button>
        )}
      </div>

      <div className="p-3">
        {/* Progress */}
        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Step title */}
        <div className="text-center mb-4">
          <span className="font-mono text-[10px] text-red-500/60 uppercase tracking-wider">
            Etapa {currentStep + 1} de {TOTAL_STEPS}
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">{stepTitles[currentStep]}</h3>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          canProceed={canProceed()}
          onPrev={handlePrev}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default MobileBriefing;
