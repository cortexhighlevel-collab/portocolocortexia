import { useRef, useEffect, useState } from "react";
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
    posterUrl: "https://framerusercontent.com/images/gsEY1iGM2ZP4fiALzDP0wqsUAYQ.png",
  },
  {
    id: 2,
    name: "Filmbros",
    tags: ["Entertainment", "Design", "Framer"],
    videoUrl: projectVideo2,
    posterUrl: "https://framerusercontent.com/images/gsEY1iGM2ZP4fiALzDP0wqsUAYQ.png",
  },
  {
    id: 3,
    name: "Sama Cape Town",
    tags: ["Hospitality", "Design", "Development"],
    videoUrl: projectVideo3,
    posterUrl: "https://framerusercontent.com/images/gsEY1iGM2ZP4fiALzDP0wqsUAYQ.png",
  },
];

const ProjectCard = ({ 
  project, 
  progress,
  isActive 
}: { 
  project: typeof projects[0]; 
  progress: number;
  isActive: boolean;
}) => {
  // Card transforms based on progress (0 = entering, 0.5 = center, 1 = exiting)
  const rotateX = progress < 0.5 
    ? (0.5 - progress) * -60  // Entering: rotate from -30deg to 0deg
    : (progress - 0.5) * 60;  // Exiting: rotate from 0deg to 30deg
  
  const translateY = progress < 0.5
    ? (0.5 - progress) * 200  // Entering: translate from 100px to 0
    : (progress - 0.5) * -200; // Exiting: translate from 0 to -100px
  
  const scale = 1 - Math.abs(progress - 0.5) * 0.3;
  const opacity = 1 - Math.abs(progress - 0.5) * 1.5;

  return (
    <motion.div
      className="projects-3d-card"
      style={{
        rotateX,
        translateY,
        scale,
        opacity: Math.max(0, Math.min(1, opacity)),
        zIndex: isActive ? 10 : 1,
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
          poster={project.posterUrl}
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

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Calculate which card should be active based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(
      projects.length - 1,
      Math.floor(latest * projects.length)
    );
    setActiveIndex(newIndex);
  });

  // Transform scroll progress to individual card progress
  const getCardProgress = (index: number) => {
    const segmentSize = 1 / projects.length;
    const segmentStart = index * segmentSize;
    const progress = scrollYProgress.get();
    
    // Normalize progress for this card's segment
    const normalizedProgress = (progress - segmentStart) / segmentSize;
    return Math.max(0, Math.min(1, normalizedProgress));
  };

  return (
    <section id="projects" ref={sectionRef} className="projects-scroll-section">
      {/* Section Heading */}
      <motion.h2
        className="projects-heading projects-heading-sticky"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Recent Projects
      </motion.h2>

      {/* Sticky Container for Cards */}
      <div className="projects-sticky-container">
        <div className="projects-3d-wrapper">
          {projects.map((project, index) => (
            <ProjectCardAnimated 
              key={project.id} 
              project={project} 
              index={index}
              scrollProgress={scrollYProgress}
              totalProjects={projects.length}
            />
          ))}
        </div>

        {/* Scrolling Project Names */}
        <div className="projects-names-ticker projects-ticker-sticky">
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

// Separate component to use useTransform properly
const ProjectCardAnimated = ({ 
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
  const segmentStart = index * segmentSize;
  const segmentEnd = (index + 1) * segmentSize;
  
  // Create smooth animations for each card
  const rotateX = useTransform(
    scrollProgress,
    [segmentStart, segmentStart + segmentSize * 0.5, segmentEnd],
    [45, 0, -45]
  );
  
  const translateY = useTransform(
    scrollProgress,
    [segmentStart, segmentStart + segmentSize * 0.5, segmentEnd],
    [300, 0, -300]
  );
  
  const scale = useTransform(
    scrollProgress,
    [segmentStart, segmentStart + segmentSize * 0.5, segmentEnd],
    [0.8, 1, 0.8]
  );
  
  const opacity = useTransform(
    scrollProgress,
    [segmentStart, segmentStart + segmentSize * 0.3, segmentStart + segmentSize * 0.7, segmentEnd],
    [0, 1, 1, 0]
  );

  const zIndex = useTransform(
    scrollProgress,
    [segmentStart, segmentStart + segmentSize * 0.5, segmentEnd],
    [1, 10, 1]
  );

  return (
    <motion.div
      className="projects-3d-card"
      style={{
        rotateX,
        y: translateY,
        scale,
        opacity,
        zIndex,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
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
          poster={project.posterUrl}
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
