import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Sparkles, MoveRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const [stats, setStats] = useState({ launched: 0, years: 0.0, rate: 0.0, score: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 55 });

  useEffect(() => {
    // Animate stats counter
    const duration = 2000; // ms
    const startTime = performance.now();

    const updateStats = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Triple cubic easing for premium acceleration curve
      const ease = 1 - Math.pow(1 - progress, 3);

      setStats({
        launched: Math.floor(ease * 87),
        years: Number((ease * 6.0).toFixed(1)),
        rate: Number((ease * 4.9).toFixed(1)),
        score: Math.floor(ease * 14),
      });

      if (progress < 1) {
        requestAnimationFrame(updateStats);
      }
    };

    requestAnimationFrame(updateStats);

    // Mouse parallax glow effect
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPercent = (e.clientX / innerWidth) * 100;
      const yPercent = (e.clientY / innerHeight) * 100;
      // Parallax move limits [30% to 70%]
      const lerpX = 50 + (xPercent - 50) * 0.15;
      const lerpY = 55 + (yPercent - 55) * 0.15;
      setGlowPos({ x: lerpX, y: lerpY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      id="home"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 md:px-12 pt-32 pb-24 md:pb-36 overflow-hidden"
    >
      {/* Dynamic glow coordinate based on mouse lerping */}
      <div
        className="absolute w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full pointer-events-none transition-transform duration-500 ease-out z-0 opacity-40 md:opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
          left: `${glowPos.x}%`,
          top: `${glowPos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Floating Sparkle Elements */}
      <div className="absolute top-1/4 left-10 md:left-24 animate-pulse text-cosmic-blue/30 scale-75 md:scale-100">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute bottom-1/3 right-10 md:right-32 animate-pulse text-cosmic-cyan/30 scale-75 md:scale-100" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-6 h-6" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Decorative Badge - Selected Focus Element */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-cosmic-blue/30 bg-gradient-to-r from-space-2/80 to-space-3/80 shadow-[0_0_15px_rgba(59,130,246,0.1)] backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-cosmic-blue hover:text-white hover:border-cosmic-cyan/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 scale-95 md:scale-100 select-none cursor-default">
          <span className="w-1.5 h-1.5 bg-cosmic-blue rounded-full animate-pulse shadow-[0_0_8px_#3B82F6]" />
          Brand & Design Studio
        </div>

        {/* Display Heading */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6 max-w-4xl text-white select-none">
          Identitas Visual yang <br />
          Siap Membawa Brand Anda <br />
          <span className="font-extrabold bg-gradient-to-r from-blue-400 via-cosmic-blue to-cosmic-cyan bg-clip-text text-transparent">Lebih Jauh</span>
        </h1>

        {/* Subtext */}
        <p className="text-sm sm:text-base md:text-lg text-star-dim font-light max-w-2xl leading-relaxed mb-10 select-none">
          Identitas visual premium untuk startup dan bisnis ambisius yang siap meninggalkan kesan tak terlupakan di orbit pasar mereka.
        </p>

        {/* Button Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 rounded-full bg-cosmic-blue hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 text-sm font-semibold tracking-wide text-white shadow-lg shadow-cosmic-blue/20 hover:shadow-cosmic-blue/40"
          >
            Lihat Karya Kami
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="group inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 rounded-full bg-transparent hover:text-white transition-all text-sm font-medium tracking-wide text-star-dim"
          >
            Pelajari Layanan
            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Dynamic Static Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-2xl border-t border-white/5 mt-12 md:mt-16 pt-8 px-4">
          <div className="text-center">
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white block mb-1">
              {stats.launched}+
            </span>
            <span className="text-[9px] sm:text-[10px] text-star-muted uppercase tracking-widest font-mono">
              Brand Diluncurkan
            </span>
          </div>
          <div className="text-center">
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white block mb-1">
              {stats.years} Thn
            </span>
            <span className="text-[9px] sm:text-[10px] text-star-muted uppercase tracking-widest font-mono">
              Mengudara
            </span>
          </div>
          <div className="text-center">
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white block mb-1">
              {stats.score}
            </span>
            <span className="text-[9px] sm:text-[10px] text-star-muted uppercase tracking-widest font-mono">
              Skor Kepuasan
            </span>
          </div>
          <div className="text-center">
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white block mb-1">
              {stats.rate}
            </span>
            <span className="text-[9px] sm:text-[10px] text-star-muted uppercase tracking-widest font-mono">
              Rating Klien
            </span>
          </div>
        </div>
      </div>

      {/* Elegant scroll hint */}
      <a
        href="#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group transition-colors hover:text-white text-star-dim select-none"
      >
        <span className="text-[9px] uppercase tracking-widest leading-none text-star-muted group-hover:text-white font-mono">
          Gulir ke Bawah
        </span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-cosmic-blue to-transparent rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-4 bg-white rounded-full scroll-line-anim" />
        </div>
      </a>
    </motion.section>
  );
}
