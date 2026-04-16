import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent, useEffect, useState } from "react";
import { Github, ArrowUpRight, Loader2 } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  status?: string;
  githubUrl?: string;
}

const TiltCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
      {/* Holographic glare */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none z-10"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, hsl(217 91% 70% / 0.1), transparent 50%)`
          ),
        }}
      />
      {/* Edge highlight */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `linear-gradient(${Math.atan2(Number(y) - 50, Number(x) - 50) * (180 / Math.PI)}deg, hsl(var(--primary) / 0.05), transparent 60%)`
          ),
        }}
      />
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("https://api.github.com/users/POISONDEV/repos?per_page=100");
        const data = await res.json();
        
        if (Array.isArray(data)) {
          // Filter out forks and map to our Project type
          const mappedProjects: Project[] = data
            .filter((repo: any) => !repo.fork)
            .map((repo: any) => ({
              title: repo.name,
              description: repo.description || "No description provided.",
              tags: repo.topics?.length ? repo.topics : (repo.language ? [repo.language] : ["Code"]),
              githubUrl: repo.html_url,
              status: "Open Source"
            }));
            
          // Randomly shuffle to show different projects on each load
          const shuffled = mappedProjects.sort(() => 0.5 - Math.random());
          
          // Select top 3 or 4
          const selected = shuffled.slice(0, 3);
          if (selected.length > 0) {
            selected[0].featured = true; // Make the first one featured to span 2 columns
          }
          
          setProjects(selected);
        }
      } catch (error) {
        console.error("Error fetching github projects:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="uppercase tracking-wider text-sm font-semibold text-primary mb-2"
        >
          Projects
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold mb-12 gradient-text"
        >
          Featured Work
        </motion.h3>

        {loading ? (
          <div className="flex justify-center items-center py-20 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-3 font-mono text-sm">Fetching repositories...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                className={project.featured ? "md:col-span-2" : ""}
              >
                <TiltCard className="h-full relative glass-heavy rounded-xl p-6 flex flex-col justify-between group cursor-pointer overflow-hidden">
                  {/* Click overlay */}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-30" />
                  )}
                  {/* Top gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-semibold text-foreground">
                          {project.title}
                        </h4>
                        {project.featured && (
                          <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                            FEATURED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {project.status && (
                          <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap hidden sm:inline-block">
                            {project.status}
                          </span>
                        )}
                        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity shrink-0 relative z-40">
                          <Github className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 relative z-20 mt-auto pt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] text-muted-foreground bg-muted/40 px-2.5 py-1 rounded-md border border-border/50 hover:border-primary/20 hover:text-foreground transition-all cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <a
            href="https://github.com/POISONDEV"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors group/link"
          >
            View all projects
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
