import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileBriefing from "./briefing/MobileBriefing";
import DesktopBriefing from "./briefing/DesktopBriefing";
import {
  BriefingData,
  servicos,
  orcamentos,
  urgencias,
} from "./briefing/BriefingSteps";

interface BriefingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BriefingModal = ({ open, onOpenChange }: BriefingModalProps) => {
  const isMobile = useIsMobile();

  const handleEnviarWhatsApp = (data: BriefingData) => {
    const servicosSelecionados = data.selectedServicos
      .map((id) => servicos.find((s) => s.id === id)?.label)
      .filter(Boolean)
      .join(", ");
    const orcamentoSelecionado =
      orcamentos.find((o) => o.id === data.selectedOrcamento)?.label ||
      "Não informado";
    const urgenciaSelecionada =
      urgencias.find((u) => u.id === data.selectedUrgencia)?.label ||
      "Não informado";
    
    const crmInfo =
      data.temCrm === null
        ? "Não informado"
        : data.temCrm
        ? data.crmNome || "Utiliza CRM (não especificou)"
        : "Não utiliza CRM";
    
    const atendentesInfo =
      data.temAtendentes === null
        ? "Não informado"
        : data.temAtendentes
        ? `Sim, ${data.quantidadeAtendentes || "quantidade não informada"} atendente(s)`
        : "Não possui atendentes";
    
    const presencaDigitalInfo =
      data.temPresencaDigital === null
        ? "Não informado"
        : data.temPresencaDigital
        ? data.presencaDigitalUrl || "Possui (não informou o link)"
        : "Não possui site/Instagram";

    const mensagem = `🧠 *BRIEFING CORTEX POEI*

👤 *Nome:* ${data.nome || "Não informado"}
🏢 *Empresa:* ${data.empresa || "Não informado"}
🌐 *Presença Digital:* ${presencaDigitalInfo}

📋 *Serviços de Interesse:*
${servicosSelecionados || "Nenhum selecionado"}

📝 *Descrição do Projeto:*
${data.descricao || "Não informado"}

📊 *Sistema CRM:* ${crmInfo}

👥 *Atendentes:* ${atendentesInfo}

💰 *Orçamento Estimado:* ${orcamentoSelecionado}

⏰ *Urgência:* ${urgenciaSelecionada}

---
Enviado via site CORTEX POEI`;

    const whatsappUrl = `https://wa.me/554797422069?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, "_blank");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-4xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border-white/10 p-0 [&>button]:hidden w-[95vw] md:w-auto"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Briefing Estratégico</DialogTitle>
        </DialogHeader>
        
        {isMobile ? (
          <MobileBriefing onSubmit={handleEnviarWhatsApp} onClose={() => onOpenChange(false)} />
        ) : (
          <DesktopBriefing onSubmit={handleEnviarWhatsApp} onClose={() => onOpenChange(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BriefingModal;
