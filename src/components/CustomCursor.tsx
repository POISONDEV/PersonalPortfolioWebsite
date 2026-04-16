import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", onMouseMove);

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Track hover on interactive elements
    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, .group"
      );
      if (interactive) {
        setIsHovering(true);
        const label = interactive.getAttribute("aria-label") || "";
        setHoverText(label);
      }
    };
    const handleMouseOut = () => {
      setIsHovering(false);
      setHoverText("");
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [onMouseMove]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 56 : isClicking ? 16 : 32,
            height: isHovering ? 56 : isClicking ? 16 : 32,
            borderRadius: "50%",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="border border-foreground/50 flex items-center justify-center"
          style={{
            boxShadow: isHovering
              ? "0 0 20px hsl(var(--primary) / 0.2)"
              : "none",
          }}
        >
          {hoverText && (
            <span className="font-mono text-[8px] text-foreground whitespace-nowrap">
              {hoverText}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[101]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isClicking ? 8 : 4,
            height: isClicking ? 8 : 4,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          className="rounded-full"
          style={{ background: "hsl(var(--primary))" }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
