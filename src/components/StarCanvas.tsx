import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  twinkle: number;
  depth: number; // 3D depth layer for parallax
}

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const density = Math.floor((canvas.width * canvas.height) / 8000);
      const count = Math.min(Math.max(density, 100), 250);

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.2,
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.05 + 0.01,
          twinkle: Math.random() * Math.PI * 2,
          depth: Math.random() * 1.5 + 0.5, // 0.5 to 2.0 parallax
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lerp mouse parallax offset
      currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * 0.06;
      currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * 0.06;

      stars.forEach((s) => {
        // Twinkle factor
        s.twinkle += s.speed;
        const twinkleAlpha = (Math.sin(s.twinkle) * 0.4 + 0.6) * s.alpha;

        // Apply mouse-based 3D parallax offset
        let renderX = s.x + currentOffset.current.x * s.depth;
        let renderY = s.y + currentOffset.current.y * s.depth;

        // Boundary wrap
        if (renderX < 0) renderX = canvas.width + (renderX % canvas.width);
        if (renderX > canvas.width) renderX = renderX % canvas.width;
        if (renderY < 0) renderY = canvas.height + (renderY % canvas.height);
        if (renderY > canvas.height) renderY = renderY % canvas.height;

        ctx.beginPath();
        ctx.arc(renderX, renderY, s.r, 0, Math.PI * 2);
        // Slightly warm cyan/blue stars
        ctx.fillStyle = `rgba(186, 215, 255, ${twinkleAlpha})`;
        ctx.fill();
        
        // Ambient soft flare on bigger stars
        if (s.r > 1.2) {
          ctx.beginPath();
          ctx.arc(renderX, renderY, s.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${twinkleAlpha * 0.15})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(drawStars);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Normalise offsets to max 15px
      targetOffset.current.x = ((centerX - e.clientX) / centerX) * 15;
      targetOffset.current.y = ((centerY - e.clientY) / centerY) * 15;
    };

    resizeCanvas();
    drawStars();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-[#020409]/30"
    />
  );
}
