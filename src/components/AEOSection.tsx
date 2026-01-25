import { motion } from "framer-motion";

const AEOSection = () => {
  return (
    <section id="aeo" className="aeo-section relative overflow-hidden py-32 md:py-48">
      {/* Background (degradê vermelho + roxo) */}
      <div className="aeo-section-bg" aria-hidden="true" />
      <div className="aeo-section-scanlines" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="aeo-badge">
            <span className="aeo-badge-text">SYSTEM COMPARISON</span>
          </div>
          <h2 className="aeo-title">
            SEO vs <span className="aeo-title-accent">AEO</span>
          </h2>
        </motion.div>

        <div className="aeo-compare" aria-label="Comparação SEO tradicional vs AEO">
          <div className="aeo-compare-grid">
            {/* Coluna SEO Tradicional */}
            <motion.div
              className="aeo-card aeo-card--deprecated"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="aeo-status-label aeo-status-label--deprecated">DEPRECATED</span>
              <h3 className="aeo-card-title aeo-card-title--muted">SEO Tradicional</h3>
              <ul className="aeo-list aeo-list--muted">
                <li className="aeo-list-item"><span className="aeo-x">✕</span> Keywords obsoletas</li>
                <li className="aeo-list-item"><span className="aeo-x">✕</span> Backlinks saturados</li>
                <li className="aeo-list-item"><span className="aeo-x">✕</span> Meta tags ignoradas</li>
              </ul>
            </motion.div>

            {/* Coluna AEO Cortex */}
            <motion.div
              className="aeo-card aeo-card--active"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="aeo-status-label aeo-status-label--active">
                <span className="aeo-status-dot aeo-status-dot--ok" />
                ACTIVE
              </span>
              <h3 className="aeo-card-title">
                AEO <span className="aeo-title-accent">Cortex</span>
              </h3>
              <ul className="aeo-list">
                <li className="aeo-list-item"><span className="aeo-check">✓</span> IA entende contexto</li>
                <li className="aeo-list-item"><span className="aeo-check">✓</span> Respostas diretas</li>
                <li className="aeo-list-item"><span className="aeo-check">✓</span> Otimização para LLMs</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AEOSection;