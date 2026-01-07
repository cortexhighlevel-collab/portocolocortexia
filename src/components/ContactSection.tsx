import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      {/* Heading */}
      <div className="contact-heading-wrapper">
        <motion.h2
          className="contact-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Agende uma Chamada Grátis
        </motion.h2>
        <motion.p
          className="contact-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Vamos Criar Algo Incrível – Agende uma Sessão Agora!
        </motion.p>
      </div>

      {/* TidyCal Embed */}
      <motion.div
        className="contact-embed-wrapper"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <iframe
          src="https://tidycal.com/reemtech/30-minute-meeting"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            maxWidth: "100%",
            borderRadius: "16px",
          }}
          title="Agende uma reunião"
        />
      </motion.div>
    </section>
  );
};

export default ContactSection;
