import { motion, useInView } from "framer-motion";
import { useRef, MouseEvent } from "react";

interface Skill {
  name: string;
  stars: number;
  logo: React.ReactNode;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

// Inline SVG logos
const ReactLogo = () => (
  <svg viewBox="-11.5 -10.232 23 20.463" className="w-10 h-10" fill="hsl(var(--primary))">
    <circle r="2.05" />
    <g stroke="hsl(var(--primary))" fill="none" strokeWidth="1">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const NextLogo = () => (
  <svg viewBox="0 0 180 180" className="w-10 h-10" fill="none">
    <mask id="nm" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="90" fill="white" />
    </mask>
    <g mask="url(#nm)">
      <circle cx="90" cy="90" r="90" fill="hsl(var(--foreground))" />
      <path d="M149.508 157.52L69.142 54H54v71.97h12.114V69.384l73.885 95.461A90.09 90.09 0 01149.508 157.52z" fill="url(#ng)" />
      <path d="M115 54h12v72h-12z" fill="url(#nl)" />
    </g>
    <defs>
      <linearGradient id="ng" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(var(--background))" />
        <stop offset="1" stopColor="hsl(var(--background))" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="nl" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(var(--background))" />
        <stop offset="1" stopColor="hsl(var(--background))" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const SupabaseLogo = () => (
  <svg viewBox="0 0 109 113" className="w-10 h-10" fill="none">
    <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874L63.708 110.284z" fill="url(#sb1)" />
    <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874L63.708 110.284z" fill="url(#sb2)" fillOpacity=".2" />
    <path d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.838c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072z" fill="hsl(var(--primary))" />
    <defs>
      <linearGradient id="sb1" x1="53.974" y1="54.974" x2="94.163" y2="71.829" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(var(--primary))" stopOpacity=".6" />
        <stop offset="1" stopColor="hsl(var(--primary))" />
      </linearGradient>
      <linearGradient id="sb2" x1="36.156" y1="30.578" x2="54.484" y2="65.081" gradientUnits="userSpaceOnUse">
        <stop /><stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 54 33" className="w-10 h-10">
    <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" fill="hsl(var(--primary))" />
  </svg>
);

const LinuxLogo = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="hsl(var(--foreground))">
    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.073.076-.263.2-.407.44-.073.12-.11.252-.123.366-.013.09-.013.18 0 .265a1.38 1.38 0 00.36.698c.263.271.649.464 1.034.53.149.028.3.037.443.03a2.1 2.1 0 00.69-.15c.253-.09.528-.24.677-.396a.67.67 0 00.175-.326c.023-.12.01-.24-.029-.347l.013-.013a7.72 7.72 0 001.818-.502c.282-.122.557-.27.801-.44.247-.173.482-.38.665-.62.183-.24.328-.522.394-.835l.007-.033c.005-.017.01-.033.012-.051l.015-.06.006-.044c.097-.38.12-.782.094-1.176a6.786 6.786 0 00-.207-1.218l.282-.186c.082-.063.157-.135.227-.21.342-.37.523-.862.627-1.349a9.22 9.22 0 00.157-1.283c.031-.475.027-.964-.01-1.447-.019-.241-.048-.48-.093-.717a4.91 4.91 0 00-.212-.704c-.127-.323-.307-.612-.564-.82-.257-.21-.578-.323-.89-.323-.314 0-.62.113-.877.323a2.43 2.43 0 00-.567.82c-.103.233-.174.475-.216.72-.04.244-.066.497-.08.753l-.014.244a13.463 13.463 0 00.023 1.656c.037.417.1.837.199 1.24.05.2.113.394.199.579.013.028.027.055.042.08l-.297.197a6.087 6.087 0 01-.063-.293 8.792 8.792 0 01-.103-.854 12.26 12.26 0 01-.027-.99c.003-.38.025-.756.063-1.127.04-.371.097-.74.195-1.084.048-.174.11-.338.19-.49.08-.153.18-.292.303-.407a1.31 1.31 0 01.41-.265c.158-.063.33-.094.507-.094s.35.03.507.094c.158.063.294.152.41.265.124.115.223.254.304.407.08.152.142.316.19.49.097.343.155.713.195 1.084.038.371.06.747.063 1.127.001.334-.006.672-.027.99a8.792 8.792 0 01-.103.854c-.026.148-.057.295-.095.44a4.46 4.46 0 01-.295.765c-.14.245-.33.457-.574.609a1.59 1.59 0 01-.397.177l-.088.024v.001l-.006.002c.097.4.169.81.213 1.221.046.433.058.872.023 1.291a3.396 3.396 0 01-.08.539c-.034.133-.085.26-.16.373a1.43 1.43 0 01-.32.33c-.14.112-.306.2-.486.271a4.91 4.91 0 01-.584.19c-.434.12-.9.199-1.375.247l.014.012a.475.475 0 00-.03.387.724.724 0 00.189.35c.16.167.453.326.73.423.276.098.568.149.843.164.156.009.307-.001.447-.03.397-.07.793-.27 1.067-.55a1.46 1.46 0 00.374-.74c.014-.09.014-.182 0-.276a.815.815 0 00-.128-.387.948.948 0 00-.42-.464c-.217-.146-.5-.264-.703-.344a11.01 11.01 0 01-.463-.194c.138-.038.271-.084.401-.138.505-.21.96-.497 1.342-.84.384-.346.69-.755.878-1.218.093-.232.16-.478.194-.733.033-.255.034-.52-.002-.787-.072-.531-.27-1.061-.55-1.548l.002-.001c.588-1.145.855-2.333.916-3.454.03-.556.01-1.1-.057-1.612a5.51 5.51 0 00-.274-1.192C15.85 4.693 14.888.01 12.504 0z"/>
  </svg>
);

const GitLogo = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="hsl(var(--primary))">
    <path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.66 2.66a1.838 1.838 0 11-1.103 1.033l-2.48-2.48v6.53a1.838 1.838 0 11-1.513-.066V8.73a1.838 1.838 0 01-.998-2.41L7.636 3.591.45 10.776a1.55 1.55 0 000 2.188l10.48 10.48a1.55 1.55 0 002.186 0l10.43-10.326a1.55 1.55 0 000-2.188z" />
  </svg>
);

const TerminalLogo = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const FigmaLogo = () => (
  <svg viewBox="0 0 38 57" className="w-10 h-10" fill="none">
    <path d="M19 28.5a9.5 9.5 0 119 9.5 9.5 9.5 0 01-9-9.5z" fill="hsl(var(--primary))" />
    <path d="M0 47.5A9.5 9.5 0 019.5 38H19v9.5a9.5 9.5 0 11-19 0z" fill="hsl(260 70% 50%)" />
    <path d="M19 0v19h9.5a9.5 9.5 0 100-19H19z" fill="hsl(var(--primary))" />
    <path d="M0 9.5A9.5 9.5 0 009.5 19H19V0H9.5A9.5 9.5 0 000 9.5z" fill="hsl(260 70% 50%)" />
    <path d="M0 28.5A9.5 9.5 0 009.5 38H19V19H9.5A9.5 9.5 0 000 28.5z" fill="hsl(217 91% 50%)" />
  </svg>
);

const categories: SkillCategory[] = [
  {
    title: "Frontend & Backend",
    skills: [
      { name: "Next.js", stars: 5, logo: <NextLogo /> },
      { name: "React", stars: 5, logo: <ReactLogo /> },
      { name: "Supabase", stars: 4, logo: <SupabaseLogo /> },
      { name: "Tailwind CSS", stars: 5, logo: <TailwindLogo /> },
    ],
  },
  {
    title: "OS & Environments",
    skills: [
      { name: "Linux (Pop!_OS)", stars: 4, logo: <LinuxLogo /> },
      { name: "Command Line", stars: 4, logo: <TerminalLogo /> },
      { name: "Git", stars: 5, logo: <GitLogo /> },
    ],
  },
  {
    title: "Design",
    skills: [{ name: "Figma", stars: 4, logo: <FigmaLogo /> }],
  },
];

const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
};

const StarRating = ({ filled, delay, isInView }: { filled: number; delay: number; isInView: boolean }) => (
  <div className="flex gap-1 mt-2">
    {[1, 2, 3, 4, 5].map((star) => {
      const isFilled = star <= filled;
      return (
        <motion.svg
          key={star}
          viewBox="0 0 20 20"
          className="w-4 h-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: delay + star * 0.08, type: "spring", stiffness: 300 }}
        >
          {/* Neon glow filter */}
          {isFilled && (
            <defs>
              <filter id={`neon-${star}-${delay}`}>
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          )}
          <path
            d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z"
            fill={isFilled ? "hsl(var(--primary))" : "hsl(var(--muted))"}
            className={isFilled ? "star-filled" : ""}
            filter={isFilled ? `url(#neon-${star}-${delay})` : undefined}
          />
        </motion.svg>
      );
    })}
  </div>
);

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="uppercase tracking-wider text-sm font-semibold text-primary mb-2"
        >
          Skills
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold mb-12 gradient-text"
        >
          Tech Stack & Proficiency
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + catIdx * 0.15 }}
              className="spotlight-card glass-heavy rounded-xl p-6"
              onMouseMove={handleMouseMove}
            >
              <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-6">
                {cat.title}
              </h4>
              <div className="flex flex-wrap gap-6 justify-center">
                {cat.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    className="flex flex-col items-center gap-1 group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {/* Floating 3D orbit logo */}
                    <motion.div
                      className="relative"
                      animate={{
                        y: [0, -6, 0, 4, 0],
                        rotateY: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 4 + skillIdx * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ perspective: 200 }}
                    >
                      <div className="skill-logo-glow absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Orbit ring */}
                      <div className="absolute -inset-3 rounded-full border border-primary/10 orbit-ring" />
                      {skill.logo}
                    </motion.div>
                    <span className="text-[10px] text-muted-foreground font-mono mt-2">
                      {skill.name}
                    </span>
                    <StarRating
                      filled={skill.stars}
                      delay={0.4 + catIdx * 0.15 + skillIdx * 0.1}
                      isInView={isInView}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
