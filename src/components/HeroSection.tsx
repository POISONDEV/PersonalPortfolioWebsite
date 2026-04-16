import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const useTextScramble = (text: string, trigger: boolean, speed = 30) => {
  const [displayed, setDisplayed] = useState("");
  const frameRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    let i = 0;
    const len = text.length;
    
    const tick = () => {
      if (i <= len) {
        const resolved = text.slice(0, i);
        const scrambled = Array.from({ length: Math.min(3, len - i) }, () =>
          chars[Math.floor(Math.random() * chars.length)]
        ).join("");
        setDisplayed(resolved + scrambled);
        i++;
        frameRef.current = window.setTimeout(tick, speed);
      } else {
        setDisplayed(text);
      }
    };
    tick();
    return () => clearTimeout(frameRef.current);
  }, [text, trigger, speed]);

  return displayed;
};

const HeroSection = () => {
  const headline = "Hello, I'm a Fullstack Developer based in Thailand.";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [subtitleReady, setSubtitleReady] = useState(false);
  const scrambledSubtitle = useTextScramble(
    "Computer Science student with a passion for building robust web applications and crafting seamless user experiences.",
    subtitleReady,
    15
  );

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < headline.length) {
        setDisplayedText(headline.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 2000);
        setSubtitleReady(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Scroll indicator animation
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowScroll(true), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="max-w-3xl w-full">


        <div className="min-h-[120px] md:min-h-[160px]">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight gradient-text">
            {displayedText}
            {showCursor && (
              <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-baseline animate-cursor-blink" />
            )}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: subtitleReady ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground mt-8 max-w-2xl leading-relaxed font-mono text-sm md:text-base"
        >
          {scrambledSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 3.5 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="font-mono text-sm px-6 py-3 rounded-lg bg-primary text-primary-foreground relative overflow-hidden group transition-all hover:shadow-[0_0_24px_hsl(var(--primary)/0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-primary-foreground/60">→</span>
              View Projects
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[gradient-shift_3s_linear_infinite]" />
          </a>
          <a
            href="#contact"
            className="font-mono text-sm px-6 py-3 rounded-lg border border-subtle text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)]"
          >
            Contact Me
          </a>
        </motion.div>


      </div>

      {/* Scroll indicator */}
      {showScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-muted-foreground/30 flex justify-center pt-1.5"
          >
            <motion.div
              animate={{ opacity: [1, 0], y: [0, 10] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
