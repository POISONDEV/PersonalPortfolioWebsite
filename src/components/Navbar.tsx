import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
    // Hide on scroll down, show on scroll up
    setHidden(latest > lastY && latest > 300);
    setLastY(latest);
  });

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = navItems.map((n) => document.querySelector(n.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX: scrollYProgress,
          background:
            "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
        }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 glass-heavy" : "py-5"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-lg font-bold text-foreground relative group tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            Korn<span className="text-primary">.</span>dev
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
          </motion.a>

          {/* Nav links */}
          <div
            className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-500 ${
              scrolled
                ? "glass-heavy"
                : "bg-transparent"
            }`}
          >
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`relative font-mono text-xs px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-primary/20 border border-primary/30"
                      style={{
                        boxShadow: "0 0 12px hsl(var(--primary) / 0.2)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-1 px-2 py-1.5 rounded-full glass-heavy">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`relative font-mono text-[10px] px-2 py-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-mobile"
                      className="absolute inset-0 rounded-full bg-primary/20 border border-primary/30"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    {item.label.slice(0, 3)}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Status indicator */}
          <div className="hidden md:flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "hsl(142 72% 50%)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(142 72% 50%)" }} />
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              Open to work
            </span>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
