import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "RGM Partners",
    tags: ["Finance", "Design", "Development"],
    videoUrl: "https://framerusercontent.com/assets/egimocChXD3ertWKdxQWzGuFK94.mp4",
    posterUrl: "https://framerusercontent.com/images/gsEY1iGM2ZP4fiALzDP0wqsUAYQ.png",
  },
  {
    id: 2,
    name: "Filmbros",
    tags: ["Entertainment", "Design", "Framer"],
    videoUrl: "https://framerusercontent.com/assets/egimocChXD3ertWKdxQWzGuFK94.mp4",
    posterUrl: "https://framerusercontent.com/images/gsEY1iGM2ZP4fiALzDP0wqsUAYQ.png",
  },
  {
    id: 3,
    name: "Sama Cape Town",
    tags: ["Hospitality", "Design", "Development"],
    videoUrl: "https://framerusercontent.com/assets/egimocChXD3ertWKdxQWzGuFK94.mp4",
    posterUrl: "https://framerusercontent.com/images/gsEY1iGM2ZP4fiALzDP0wqsUAYQ.png",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* External Link Icon */}
      <div className="project-card-link-icon">
        <ExternalLink className="w-5 h-5" />
      </div>

      {/* Content Overlay */}
      <div className="project-card-content">
        <div className="project-card-row">
          <h3 className="project-card-title">{project.name}</h3>
          <div className="project-card-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="project-card-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Video Background */}
      <div className="project-card-video-wrapper">
        <video
          loop
          muted
          playsInline
          autoPlay
          poster={project.posterUrl}
          className="project-card-video"
        >
          <source src={project.videoUrl} type="video/mp4" />
        </video>
      </div>

      {/* Dark Bottom Overlay */}
      <div className="project-card-overlay" />
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="projects-section">
      {/* Section Heading */}
      <motion.h2
        className="projects-heading"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Recent Projects
      </motion.h2>

      {/* Projects Grid */}
      <div className="projects-sticky-wrapper">
        <div className="projects-cards-wrapper">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Scrolling Project Names */}
        <div className="projects-names-ticker">
          <div className="projects-names-track">
            {[...projects, ...projects].map((project, index) => (
              <span key={index} className="projects-name-item">
                {project.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
