import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Facebook, Instagram, Mail, ArrowUpRight } from "lucide-react";

// Custom Discord SVG Icon
const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
  </svg>
);

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/POISONDEV", color: "217 91% 60%" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/korndev", color: "217 91% 60%" },
  { icon: DiscordIcon, label: "Discord", href: "https://discord.com/users/kxrn_dev", color: "260 70% 60%" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/kxrn.dev/", color: "217 91% 60%" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/kxrnhyqenz", color: "330 80% 60%" },
];

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer id="contact" className="relative pb-36 pt-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="uppercase tracking-wider text-sm font-semibold text-primary mb-2"
        >
          Get In Touch
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-4 gradient-text"
        >
          Let's build something
          <br />
          great together.
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground mb-12 max-w-lg text-lg"
        >
          Always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <a
            href="mailto:kaptainkhm@gmail.com"
            className="inline-flex items-center gap-2 font-mono text-sm px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:shadow-[0_0_24px_hsl(var(--primary)/0.3)] transition-all group"
          >
            <Mail className="w-4 h-4" />
            Say hello
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} — Designed & built with precision.
          </p>
          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors group/icon relative"
              >
                <s.icon className="w-4 h-4 relative z-10" />
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"
                  style={{ background: `hsl(${s.color} / 0.08)` }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Cyber-Dock */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 cyber-dock"
      >
        <div className="flex items-center gap-1 px-3 py-2.5 rounded-2xl glass-heavy cyber-dock-inner">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground transition-all duration-300 group/dock"
              whileHover={{ scale: 1.3, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover/dock:opacity-100 transition-opacity duration-300 blur-md"
                style={{ background: `hsl(${s.color} / 0.25)` }}
              />
              <s.icon className="w-4 h-4 relative z-10 group-hover/dock:text-foreground transition-colors duration-300" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-foreground/80 bg-card/90 backdrop-blur px-2 py-1 rounded opacity-0 group-hover/dock:opacity-100 transition-all pointer-events-none whitespace-nowrap border border-border/50">
                {s.label}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
