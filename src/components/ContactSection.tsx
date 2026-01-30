import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileBriefing from "./briefing/MobileBriefing";
import DesktopBriefing from "./briefing/DesktopBriefing";
import {
  BriefingData,
  servicos,
  orcamentos,
  urgencias,
} from "./briefing/BriefingSteps";

const ContactSection = () => {
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
    
    // CRM info
    const crmInfo =
      data.temCrm === null
        ? "Não informado"
        : data.temCrm
        ? data.crmNome || "Utiliza CRM (não especificou)"
        : "Não utiliza CRM";
    
    // Atendentes info
    const atendentesInfo =
      data.temAtendentes === null
        ? "Não informado"
        : data.temAtendentes
        ? `Sim, ${data.quantidadeAtendentes || "quantidade não informada"} atendente(s)`
        : "Não possui atendentes";
    
    // Presença Digital info
    const presencaDigitalInfo =
      data.temPresencaDigital === null
        ? "Não informado"
        : data.temPresencaDigital
        ? data.presencaDigitalUrl || "Possui (não informou o link)"
        : "Não possui site/Instagram";

    const mensagem = `🧠 *BRIEFING CORTEX POEI*

👤 *Nome:* ${data.nome || "Não informado"}
📧 *E-mail:* ${data.email || "Não informado"}
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
  };

  return (
    <section
      id="contato"
      className="relative py-20 md:py-32 lg:py-48 bg-background overflow-hidden"
    >
      {/* Circuit pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(239,68,68,0.3) 1px, transparent 1px),
            linear-gradient(rgba(239,68,68,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="inline-flex items-center gap-3 mb-4 md:mb-6 px-4 py-2 bg-[#0a0a0a] border border-green-500/30 rounded">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs text-green-400 uppercase tracking-wider">
              CHANNEL OPEN
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            INICIAR <span className="text-gradient-accent">CONTATO</span>
          </h2>
          <p className="text-white/40 font-mono text-xs md:text-sm max-w-xl mx-auto px-4">
            {isMobile
              ? "Preencha o briefing passo a passo"
              : "Preencha o briefing abaixo para enviar seu projeto diretamente para nossa equipe via WhatsApp"}
          </p>
        </motion.div>

        {/* Briefing Form - Mobile vs Desktop */}
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {isMobile ? (
            <MobileBriefing onSubmit={handleEnviarWhatsApp} />
          ) : (
            <DesktopBriefing onSubmit={handleEnviarWhatsApp} />
          )}
        </motion.div>

        {/* Email alternativo */}
        <motion.div
          className="mt-6 md:mt-8 text-center"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="mailto:contato@cortexpoei.com"
            className="text-white/50 hover:text-red-400 transition-colors font-mono text-sm"
          ></a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
