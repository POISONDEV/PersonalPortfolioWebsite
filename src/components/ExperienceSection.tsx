import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Rocket } from "lucide-react";

const timeline = [
  {
    year: "2024 – Present",
    title: "Computer Science Student",
    description: "Songkhla Rajabhat University — focusing on software engineering, algorithms, and systems design. Preparing to become a Software Developer.",
    icon: GraduationCap,
    active: true,
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="uppercase tracking-wider text-sm font-semibold text-primary mb-2"
        >
          Experience
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold mb-16 gradient-text"
        >
          Journey So Far
        </motion.h3>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
            <motion.div
              className="w-full h-full origin-top"
              style={{
                background: "linear-gradient(to bottom, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.1), transparent)",
              }}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
          </div>

          {timeline.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.2 }}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                i % 2 === 0
                  ? "md:flex-row md:text-right"
                  : "md:flex-row-reverse md:text-left"
              }`}
            >
              {/* Content */}
              <div className="flex-1 ml-16 md:ml-0">
                <div
                  className={`glass-heavy rounded-xl p-5 relative group ${
                    item.active ? "border-primary/20" : ""
                  }`}
                >
                  {item.active && (
                    <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  )}
                  <span className="font-mono text-[11px] text-primary mb-1 block">
                    {item.year}
                  </span>
                  <h4 className="text-base font-semibold text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Node */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center glass-heavy ${
                    item.active ? "border-primary/30" : ""
                  }`}
                >
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                {item.active && (
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "hsl(var(--primary) / 0.3)" }} />
                )}
              </div>

              {/* Spacer for opposite side on desktop */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
