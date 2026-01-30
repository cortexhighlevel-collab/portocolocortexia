import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefingData,
  StepDadosBasicos,
  StepServicos,
  StepOrcamentoUrgencia,
  StepDescricao,
  StepCrm,
  StepAtendentes,
  StepPresencaDigital,
  ProgressIndicator,
  NavigationButtons,
  servicos,
  orcamentos,
  urgencias,
  crms,
} from "./BriefingSteps";

interface MobileBriefingProps {
  onSubmit: (data: BriefingData) => void;
}

const TOTAL_STEPS = 7;

const MobileBriefing = ({ onSubmit }: MobileBriefingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<BriefingData>({
    nome: "",
    empresa: "",
    selectedServicos: [],
    selectedOrcamento: "",
    selectedUrgencia: "",
    descricao: "",
    selectedCrm: "",
    temAtendentes: null,
    quantidadeAtendentes: "",
    temPresencaDigital: null,
    presencaDigitalUrl: "",
  });

  const updateData = (updates: Partial<BriefingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 0:
        return data.nome.trim().length > 0;
      case 1:
        return data.selectedServicos.length > 0;
      case 2:
        return data.selectedOrcamento !== "" && data.selectedUrgencia !== "";
      case 3:
        return true; // Descrição é opcional
      case 4:
        return data.selectedCrm !== "";
      case 5:
        if (data.temAtendentes === null) return false;
        if (data.temAtendentes === true && !data.quantidadeAtendentes.trim()) return false;
        return true;
      case 6:
        if (data.temPresencaDigital === null) return false;
        if (data.temPresencaDigital === true && !data.presencaDigitalUrl.trim()) return false;
        return true;
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
    "Serviços",
    "Orçamento & Prazo",
    "Seu Projeto",
    "Sistema CRM",
    "Equipe",
    "Presença Digital",
  ];

  const renderStep = () => {
    const props = { data, updateData };
    switch (currentStep) {
      case 0:
        return <StepDadosBasicos {...props} />;
      case 1:
        return <StepServicos {...props} />;
      case 2:
        return <StepOrcamentoUrgencia {...props} />;
      case 3:
        return <StepDescricao {...props} />;
      case 4:
        return <StepCrm {...props} />;
      case 5:
        return <StepAtendentes {...props} />;
      case 6:
        return <StepPresencaDigital {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-[#0a0a0a]/95 rounded-lg overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-white/40 font-mono text-xs">briefing_system.exe</span>
      </div>

      <div className="p-5">
        {/* Progress */}
        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Step title */}
        <div className="text-center mb-6">
          <span className="font-mono text-xs text-red-500/60 uppercase tracking-wider">
            Etapa {currentStep + 1} de {TOTAL_STEPS}
          </span>
          <h3 className="text-lg font-bold text-white mt-1">{stepTitles[currentStep]}</h3>
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
