import React, { useState } from 'react';
import { ProcessStep } from '../types';
import { motion } from 'motion/react';

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const stepsList: ProcessStep[] = [
    {
      num: '01',
      title: 'Sesi Perkenalan & Riset',
      description: 'Deep-dive ke bisnis, kompetitor, audiens, dan aspirasi brand. Kami tidak mulai desain sebelum kami benar-benar memahami orbit Anda.',
    },
    {
      num: '02',
      title: 'Strategi & Arah Kreatif',
      description: 'Brand positioning, mood board, dan creative direction yang disepakati bersama. Ini adalah peta bintang sebelum peluncuran.',
    },
    {
      num: '03',
      title: 'Mulai Desain & Revisi',
      description: 'Iterasi desain dengan presentasi yang transparan dan feedback loop yang efisien. Setiap revisi punya tujuan, bukan tebakan.',
    },
    {
      num: '04',
      title: 'Peluncuran & Penyerahan',
      description: 'Handover aset lengkap, brand guidelines, dan briefing implementasi. Kami pastikan brand Anda siap terbang di semua platform.',
    },
    {
      num: '05',
      title: 'Dukungan Berkelanjutan',
      description: 'Post-launch partnership untuk menjaga konsistensi brand seiring bisnis Anda berkembang. Kami mitra jangka panjang, bukan vendor satu proyek.',
    },
  ];

  return (
    <motion.section
      id="process"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Timeline side */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-cosmic-blue">
              <span className="w-6 h-0.5 bg-cosmic-blue block" />
              Metode Kerja Kami
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Sistem Orbit <br /> Angkasa Studio
            </h2>
            <p className="text-star-dim font-light text-sm sm:text-base mb-10 leading-relaxed">
              Setiap proyek melewati sistem yang telah kami rancang untuk menghasilkan output konsisten, terukur, dan bernilai tinggi.
            </p>

            <div className="flex flex-col">
              {stepsList.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <div
                    key={step.num}
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                    className={`flex gap-6 py-6 border-b border-white/5 cursor-pointer group transition-all duration-300 ${
                      isActive ? 'bg-space-2/15 pl-4' : 'bg-transparent'
                    }`}
                  >
                    <span
                      className={`font-display text-sm font-bold tracking-widest transition-colors ${
                        isActive ? 'text-cosmic-blue' : 'text-star-muted group-hover:text-star-dim'
                      }`}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h3
                        className={`font-display text-base font-bold transition-all mb-2 ${
                          isActive ? 'text-white translate-x-1' : 'text-star-dim group-hover:text-white'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed font-light transition-all duration-300 ${
                          isActive ? 'text-star-dim' : 'text-star-muted'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Cosmos orbit display side */}
          <div className="hidden lg:flex justify-center items-center h-[500px] border border-white/5 rounded-3xl bg-space-2/20 backdrop-blur-3xl relative overflow-hidden group">
            {/* Ambient Background Grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

            {/* Simulated orbit elements based on active item index */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Outer orbit boundary */}
              <div
                className="absolute inset-0 rounded-full border border-white/[0.04] animate-rotate-cw"
                style={{
                  animationDuration: `${25 - activeStep * 4}s`,
                }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-cosmic-blue shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
              </div>

              {/* Middle orbit boundary */}
              <div
                className="absolute w-56 h-56 rounded-full border border-white/[0.06] animate-rotate-ccw"
                style={{
                  animationDuration: `${18 - activeStep * 3}s`,
                }}
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cosmic-cyan shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
              </div>

              {/* Inner orbit boundary */}
              <div
                className="absolute w-32 h-32 rounded-full border border-white/[0.08] animate-rotate-fast"
                style={{
                  animationDuration: `${12 - activeStep * 2}s`,
                }}
              >
                <div className="absolute top-1/4 right-0 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
              </div>

              {/* Core agency shield */}
              <div className="absolute w-16 h-16 rounded-full bg-cosmic-blue border border-white/10 flex items-center justify-center shadow-2xl shadow-cosmic-blue/40">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Active Step Status Anchor */}
            <div className="absolute bottom-6 px-6 py-2 rounded-full border border-cosmic-blue/20 bg-space-2/80 backdrop-blur-md text-xs font-mono tracking-widest text-cosmic-blue">
              LEVEL ORBIT: 0{activeStep + 1}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
