import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const TermsOfUse = () => {
  return <div className="min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <div className="relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-red-500 transition-colors mb-6 font-mono text-sm">
            <ArrowLeft className="w-4 h-4" />
            VOLTAR
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white font-bold text-xl tracking-wider">CORTEX</span>
            <span className="text-red-500 font-bold text-xl">OPS</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Termos de <span className="text-red-500">Uso</span>
          </h1>
          <p className="text-white/40 font-mono text-sm mt-2">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Content */}
      <motion.div className="max-w-4xl mx-auto px-6 py-12" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">01.</span>
              Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e utilizar os serviços da CORTEX OPS, você concorda em cumprir e estar 
              vinculado aos seguintes termos e condições de uso. Se você não concordar com 
              qualquer parte destes termos, não deverá utilizar nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">02.</span>
              Descrição dos Serviços
            </h2>
            <p>
              A CORTEX OPS oferece serviços de consultoria e implementação de soluções de 
              inteligência artificial, automação de processos e otimização para mecanismos 
              de busca por IA (AEO). Nossos serviços incluem, mas não se limitam a:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
              <li>Automação de processos com IA</li>
              <li>Otimização para Answer Engine Optimization (AEO)</li>
              <li>Desenvolvimento de infraestrutura de dados</li>
              <li>Consultoria estratégica em IA</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">03.</span>
              Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo presente neste site, incluindo textos, gráficos, logotipos, 
              ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, 
              é propriedade da CORTEX OPS ou de seus fornecedores de conteúdo e está 
              protegido por leis de direitos autorais nacionais e internacionais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">04.</span>
              Uso Aceitável
            </h2>
            <p>Você concorda em não utilizar nossos serviços para:</p>
            <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
              <li>Violar qualquer lei ou regulamento aplicável</li>
              <li>Infringir direitos de propriedade intelectual de terceiros</li>
              <li>Transmitir vírus ou código malicioso</li>
              <li>Coletar informações de outros usuários sem consentimento</li>
              <li>Interferir no funcionamento adequado dos serviços</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">05.</span>
              Limitação de Responsabilidade
            </h2>
            <p>
              A CORTEX OPS não será responsável por quaisquer danos diretos, indiretos, 
              incidentais, especiais ou consequenciais resultantes do uso ou incapacidade 
              de uso de nossos serviços, mesmo que tenhamos sido avisados da possibilidade 
              de tais danos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">06.</span>
              Confidencialidade
            </h2>
            <p>
              Todas as informações compartilhadas durante a prestação de nossos serviços 
              serão tratadas como confidenciais. Comprometemo-nos a não divulgar, vender 
              ou compartilhar suas informações com terceiros, exceto quando necessário 
              para a execução dos serviços contratados ou quando exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-500 font-mono">07.</span>
              Modificações dos Termos
            </h2>
            <p>
              A CORTEX OPS reserva-se o direito de modificar estes termos a qualquer momento. 
              As alterações entrarão em vigor imediatamente após sua publicação nesta página. 
              O uso continuado dos serviços após tais modificações constitui sua aceitação 
              dos novos termos.
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
    </div>;
};
export default TermsOfUse;