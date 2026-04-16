import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

const bioLines = [
  { text: "Computer Science student", highlight: false },
  { text: "at Songkhla Rajabhat University.", highlight: false },
  { text: "Passionate about Linux environments", highlight: true },
  { text: "and love coding, whether it's building websites, games, IoT devices, or mobile apps.", highlight: false },
];

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Darkening overlay when in view */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        style={{ background: "hsl(220 15% 2% / 0.5)" }}
      />

      {/* Cursor spotlight */}
      {isHovering && (
        <div
          className="absolute z-[1] pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePos.x - 250,
            top: mousePos.y - 250,
            width: 500,
            height: 500,
            background: "radial-gradient(circle, hsl(217 91% 60% / 0.06), transparent 65%)",
            filter: "blur(20px)",
          }}
        />
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="uppercase tracking-wider text-sm font-semibold text-primary mb-2"
        >
          About Me
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold mb-16 gradient-text"
        >
          The Developer
        </motion.h3>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Holographic portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              {/* Rotating neon border */}
              <div className="absolute inset-0 rounded-full rotating-border" />

              {/* Photo container */}
              <div className="absolute inset-2 rounded-full overflow-hidden glass-heavy">
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* Placeholder avatar with initials */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                    <img 
                      src="/my_profile.png" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Scanline overlay */}
                  <div className="absolute inset-0 scanlines pointer-events-none" />
                </div>
              </div>

              {/* Outer glow */}
              <div className="absolute -inset-4 rounded-full bg-primary/5 blur-2xl animate-pulse" />
            </div>
          </motion.div>

          {/* Bio with staggered reveal */}
          <div className="flex-1 space-y-1">
            {bioLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0, filter: "blur(0px)" }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  delay: 0.5 + i * 0.12,
                  ease: "easeOut",
                }}
                className={`text-lg md:text-xl leading-relaxed ${
                  line.highlight
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {line.text}
              </motion.p>
            ))}

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="pt-6 flex items-center gap-3"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                Available for collaboration
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
