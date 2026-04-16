import { motion } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";

// Nebula orbs - Layer 3
const nebulaOrbs = [
  { x: "15%", y: "25%", color1: "260 80% 35%", color2: "280 70% 25%", size: 700, duration: 25 },
  { x: "75%", y: "55%", color1: "217 91% 45%", color2: "240 80% 30%", size: 800, duration: 30 },
  { x: "45%", y: "75%", color1: "270 60% 30%", color2: "250 70% 20%", size: 600, duration: 22 },
  { x: "85%", y: "15%", color1: "217 91% 50%", color2: "200 80% 25%", size: 500, duration: 28 },
  { x: "30%", y: "50%", color1: "280 70% 40%", color2: "260 60% 25%", size: 550, duration: 35 },
];

// Particle system - Layer 2
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; opacity: number; baseOpacity: number;
  }>>([]);

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(120, Math.floor((w * h) / 8000));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      baseOpacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) initParticles(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particlesRef.current.forEach((p) => {
        // Mouse interaction - subtle push
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          p.vx += (dx / dist) * force * 0.08;
          p.vy += (dy / dist) * force * 0.08;
          p.opacity = Math.min(1, p.baseOpacity + force * 0.5);
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(217, 80%, 75%, ${p.opacity})`;
        ctx.fill();
      });

      // Connection lines
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(217, 80%, 60%, ${0.06 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1]"
      style={{ pointerEvents: "none" }}
    />
  );
};

const HyperBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "hsl(220 15% 3%)" }}>
    {/* Layer 1: Noise grain texture */}
    <div
      className="absolute inset-0 z-0 opacity-[0.04]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }}
    />

    {/* Layer 2: Interactive particles */}
    <ParticleCanvas />

    {/* Layer 3: Nebula orbs */}
    {nebulaOrbs.map((orb, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full z-0"
        style={{
          width: orb.size,
          height: orb.size,
          background: `radial-gradient(ellipse at center, hsl(${orb.color1} / 0.15), hsl(${orb.color2} / 0.05), transparent 70%)`,
          filter: "blur(100px)",
          left: orb.x,
          top: orb.y,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          x: [0, 100, -80, 60, 0],
          y: [0, -70, 90, -40, 0],
          scale: [1, 1.2, 0.85, 1.15, 1],
          opacity: [0.6, 0.9, 0.5, 0.8, 0.6],
        }}
        transition={{
          duration: orb.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}

    {/* Vignette overlay */}
    <div
      className="absolute inset-0 z-[2] pointer-events-none"
      style={{
        background: "radial-gradient(ellipse at center, transparent 40%, hsl(220 15% 3% / 0.7) 100%)",
      }}
    />
  </div>
);

export default HyperBackground;
