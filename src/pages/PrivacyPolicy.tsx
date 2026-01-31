import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <div className="relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-red-500 transition-colors mb-6 font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            VOLTAR
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white font-bold text-xl tracking-wider">CORTEX</span>
            <span className="text-red-500 font-bold text-xl">OPS</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Política de <span className="text-red-500">Privacidade</span>
          </h1>
          <p className="text-white/40 font-mono text-sm mt-2">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Content */}
      <motion.div 
        className="max-w-4xl mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">01.</span>
              Introdução
            </h2>
            <p>
              A CORTEX OPS está comprometida em proteger sua privacidade. Esta Política de 
              Privacidade explica como coletamos, usamos, divulgamos e protegemos suas 
              informações pessoais quando você utiliza nosso site e serviços.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">02.</span>
              Informações que Coletamos
            </h2>
            <p>Podemos coletar as seguintes informações:</p>
            <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
              <li><strong className="text-white">Informações de contato:</strong> nome, e-mail, telefone, empresa</li>
              <li><strong className="text-white">Informações de uso:</strong> páginas visitadas, tempo de permanência, interações</li>
              <li><strong className="text-white">Informações técnicas:</strong> endereço IP, tipo de navegador, dispositivo</li>
              <li><strong className="text-white">Informações de briefing:</strong> dados fornecidos através de nossos formulários</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">03.</span>
              Como Usamos suas Informações
            </h2>
            <p>Utilizamos suas informações para:</p>
            <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
              <li>Fornecer e melhorar nossos serviços</li>
              <li>Responder às suas solicitações e perguntas</li>
              <li>Enviar comunicações sobre nossos serviços (com seu consentimento)</li>
              <li>Analisar o uso do site para melhorar a experiência do usuário</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">04.</span>
              Compartilhamento de Informações
            </h2>
            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com 
              terceiros, exceto nas seguintes circunstâncias:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
              <li>Com seu consentimento explícito</li>
              <li>Para cumprir obrigações legais</li>
              <li>Com prestadores de serviços que nos auxiliam (sob acordos de confidencialidade)</li>
              <li>Para proteger nossos direitos, propriedade ou segurança</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">05.</span>
              Segurança dos Dados
            </h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais apropriadas 
              para proteger suas informações pessoais contra acesso não autorizado, 
              alteração, divulgação ou destruição. Isso inclui:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
              <li>Criptografia de dados em trânsito e em repouso</li>
              <li>Controles de acesso rigorosos</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Treinamento regular de nossa equipe</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">06.</span>
              Seus Direitos (LGPD)
            </h2>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
              <li><strong className="text-white">Acesso:</strong> solicitar uma cópia de seus dados pessoais</li>
              <li><strong className="text-white">Correção:</strong> solicitar a correção de dados incompletos ou incorretos</li>
              <li><strong className="text-white">Exclusão:</strong> solicitar a exclusão de seus dados pessoais</li>
              <li><strong className="text-white">Portabilidade:</strong> solicitar a transferência de seus dados</li>
              <li><strong className="text-white">Oposição:</strong> opor-se ao processamento de seus dados</li>
              <li><strong className="text-white">Revogação:</strong> revogar o consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">07.</span>
              Cookies e Tecnologias Similares
            </h2>
            <p>
              Utilizamos cookies e tecnologias similares para melhorar sua experiência em 
              nosso site. Você pode configurar seu navegador para recusar cookies, mas isso 
              pode afetar algumas funcionalidades do site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">08.</span>
              Retenção de Dados
            </h2>
            <p>
              Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir 
              as finalidades para as quais foram coletadas, incluindo para satisfazer 
              requisitos legais, contábeis ou de relatórios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">09.</span>
              Alterações nesta Política
            </h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos 
              você sobre quaisquer alterações significativas publicando a nova política 
              nesta página com uma nova data de "última atualização".
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">10.</span>
              Contato
            </h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de 
              Privacidade, entre em contato conosco através do e-mail:{" "}
              <a href="mailto:contato@cortexops.com" className="text-red-500 hover:underline">
                contato@cortexops.com
              </a>
            </p>
          </section>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="border-t border-white/10 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/30 text-sm font-mono">
            © {new Date().getFullYear()} CORTEX OPS. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
