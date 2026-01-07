import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
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
  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(1);
  const [flipCount, setFlipCount] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Calculate rotation based on scroll
  // Cards stay flat longer, quick flip transitions
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.20, 0.30, 0.45, 0.55, 0.70, 0.80, 1],
    [0, 0, 180, 180, 180, 360, 360, 360]
  );

  // Track flip count to update card contents
  useMotionValueEvent(rotateX, "change", (latest) => {
    const currentFlip = Math.floor(latest / 180);
    
    if (currentFlip !== flipCount) {
      setFlipCount(currentFlip);
      
      // Determine which face is now hidden and update it
      const isBackVisible = currentFlip % 2 === 1;
      
      if (isBackVisible) {
        // Front face is hidden, update it to next project
        const nextFrontIndex = (currentFlip + 1) % projects.length;
        setFrontIndex(nextFrontIndex);
      } else {
        // Back face is hidden, update it to next project
        const nextBackIndex = (currentFlip + 1) % projects.length;
        setBackIndex(nextBackIndex);
      }
    }
  });

  const frontProject = projects[frontIndex];
  const backProject = projects[backIndex];

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

        {/* Flipper Card Container */}
        <div className="projects-flipper-wrapper">
          <motion.div 
            className="projects-flipper"
            style={{ rotateX }}
          >
            {/* Front Face */}
            <div className="projects-flipper-face projects-flipper-front">
              <CardContent project={frontProject} />
            </div>

            {/* Back Face (rotated 180deg) */}
            <div className="projects-flipper-face projects-flipper-back">
              <CardContent project={backProject} />
            </div>
          </motion.div>
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

const CardContent = ({ project }: { project: typeof projects[0] }) => {
  return (
    <>
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
          key={project.videoUrl}
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
    </>
  );
};

export default ProjectsSection;
