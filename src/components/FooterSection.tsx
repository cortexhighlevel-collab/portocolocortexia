import { motion } from "framer-motion";

const FooterSection = () => {
  const socials = [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "X / Twitter", href: "https://twitter.com" },
  ];

  const navigation = [
    { name: "Projects", href: "#projects" },
    { name: "Pricing", href: "#pricing" },
    { name: "Book a Call", href: "#contact" },
  ];

  return (
    <footer className="footer-section">
      {/* Footer Content */}
      <div className="footer-content">
        {/* Inquiries Column */}
        <motion.div
          className="footer-column"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="footer-label">(Inquiries)</span>
          <a href="mailto:reemtech0@gmail.com" className="footer-email">
            reemtech0@gmail.com
          </a>
        </motion.div>

        {/* Socials Column */}
        <motion.div
          className="footer-column"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="footer-label">(socials)</span>
          <div className="footer-links">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {social.name}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Navigation Column */}
        <motion.div
          className="footer-column"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="footer-label">(navigation)</span>
          <div className="footer-links">
            {navigation.map((item, index) => (
              <a key={index} href={item.href} className="footer-link">
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Large Brand Text */}
      <motion.div
        className="footer-brand-wrapper"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="footer-brand-text">reem.tech</div>
        <div className="footer-brand-text">reem.tech</div>
        <div className="footer-brand-text">reem.tech</div>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
