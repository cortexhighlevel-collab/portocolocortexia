import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import projectVideo from "@/assets/project-video.webm";
import projectVideo2 from "@/assets/project-video-2.webm";
import projectVideo3 from "@/assets/project-video-3.webm";

const projects = [
  {
    id: 1,
    name: "RGM Partners",
    tags: ["Finance", "Design", "Development"],
    videoUrl: projectVideo,
  },
  {
    id: 2,
    name: "Filmbros",
    tags: ["Animations", "Design", "Development"],
    videoUrl: projectVideo2,
  },
  {
    id: 3,
    name: "Sama Cape Town",
    tags: ["Travel", "Design", "Development"],
    videoUrl: projectVideo3,
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" ref={sectionRef} className="projects-scroll-section">
      {/* Sticky Container */}
      <div className="projects-sticky-container">
        {/* Section Heading */}
        <motion.h2
          className="projects-heading-fixed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Recent Projects
        </motion.h2>

        {/* Single Card Container */}
        <div className="projects-3d-wrapper">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              scrollProgress={scrollYProgress}
              totalProjects={projects.length}
            />
          ))}
        </div>

        {/* Scrolling Project Names */}
        <div className="projects-names-ticker">
          <div className="projects-names-track">
            {[...projects, ...projects, ...projects].map((project, index) => (
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

const ProjectCard = ({ 
  project, 
  index, 
  scrollProgress,
  totalProjects 
}: { 
  project: typeof projects[0]; 
  index: number;
  scrollProgress: any;
  totalProjects: number;
}) => {
  const segmentSize = 1 / totalProjects;
  const cardStart = index * segmentSize;
  const cardMid = cardStart + segmentSize * 0.5;
  const cardEnd = (index + 1) * segmentSize;
  
  // Card enters from bottom with tilt, stays flat in middle, exits to top with opposite tilt
  const rotateX = useTransform(
    scrollProgress,
    [cardStart, cardMid, cardEnd],
    [70, 0, -70]
  );
  
  const y = useTransform(
    scrollProgress,
    [cardStart, cardMid, cardEnd],
    ["80%", "0%", "-80%"]
  );
  
  const scale = useTransform(
    scrollProgress,
    [cardStart, cardMid, cardEnd],
    [0.7, 1, 0.7]
  );
  
  const opacity = useTransform(
    scrollProgress,
    [cardStart, cardStart + segmentSize * 0.2, cardMid, cardEnd - segmentSize * 0.2, cardEnd],
    [0, 1, 1, 1, 0]
  );

  return (
    <motion.div
      className="projects-3d-card"
      style={{
        rotateX,
        y,
        scale,
        opacity,
      }}
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
          className="project-card-video"
        >
          <source src={project.videoUrl} type="video/webm" />
        </video>
      </div>

      {/* Dark Bottom Overlay */}
      <div className="project-card-overlay" />
    </motion.div>
  );
};

export default ProjectsSection;
