import React, { useState, useRef } from 'react';
import { PortfolioItem } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'brand' | 'digital' | 'strategy'>('all');
  
  // Custom tilt state map to handle independent card 3D rotational perspective
  const [tiltStyles, setTiltStyles] = useState<Record<string, React.CSSProperties>>({});

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'nexus-capital',
      client: 'Fintech · Brand Identity',
      title: 'Nexus Capital Space System',
      category: 'brand',
      themeClass: 'bg-gradient-to-br from-[#0A1628] via-[#0F2850] to-[#0C3878]',
      mockupType: 'nexus',
      // Ganti path gambar kustom di bawah ini (misal: '/images/portfolio-nexus.png')
      // image: '/images/portfolio-nexus.png',
    },
    {
      id: 'luminar-dashboard',
      client: 'SaaS · Web Experience',
      title: 'Luminar Control Center',
      category: 'digital',
      themeClass: 'bg-gradient-to-br from-[#0D1F3C] via-[#0A152B] to-[#091427]',
      mockupType: 'luminar',
      // Ganti path gambar kustom di bawah ini (misal: '/images/portfolio-luminar.png')
      // image: '/images/portfolio-luminar.png',
    },
    {
      id: 'vault-protocol',
      client: 'Web3 · Strategic Position',
      title: 'Vault Protocol Architecture',
      category: 'strategy',
      themeClass: 'bg-gradient-to-br from-[#040D1F] via-[#081730] to-[#0A2040]',
      mockupType: 'vault',
      // Ganti path gambar kustom di bawah ini (misal: '/images/portfolio-vault.png')
      // image: '/images/portfolio-vault.png',
    },
    {
      id: 'kosmik-market',
      client: 'E-Commerce · Digital Product',
      title: 'Kosmik Retail Framework',
      category: 'digital',
      themeClass: 'bg-gradient-to-br from-[#060F25] via-[#0F2040] to-[#142850]',
      mockupType: 'kosmik',
      // Ganti path gambar kustom di bawah ini (misal: '/images/portfolio-kosmik.png')
      // image: '/images/portfolio-kosmik.png',
    },
    {
      id: 'strata-living',
      client: 'PropTech · Brand Strategy',
      title: 'Strata Living Guidelines',
      category: 'strategy',
      themeClass: 'bg-gradient-to-br from-[#020814] via-[#0A1830] to-[#05101E]',
      mockupType: 'strata',
      // Ganti path gambar kustom di bawah ini (misal: '/images/portfolio-strata.png')
      // image: '/images/portfolio-strata.png',
    },
  ];

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Normalized coordinates from center of card (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Apply rotation calculation
    const rotX = -y * 8; // Max 8 degrees tilt
    const rotY = x * 8;

    setTiltStyles((prev) => ({
      ...prev,
      [id]: {
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`,
        transition: 'transform 100ms ease-out',
      },
    }));
  };

  const handleMouseLeave = (id: string) => {
    setTiltStyles((prev) => ({
      ...prev,
      [id]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 500ms ease-in-out',
      },
    }));
  };

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  // Helper rendering realistic vector client mockups in high precision
  const renderMockup = (type: string) => {
    switch (type) {
      case 'nexus':
        return (
          <svg className="w-full max-w-[320px] md:max-w-[400px] aspect-[16/9] drop-shadow-2xl" viewBox="0 0 400 220" fill="none">
            <circle cx="200" cy="110" r="85" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
            <circle cx="200" cy="110" r="55" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" strokeDasharray="3 3By" />
            <circle cx="200" cy="110" r="25" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
            <circle cx="200" cy="110" r="8" fill="#3B82F6" className="animate-pulse" />
            <line x1="80" y1="110" x2="160" y2="110" stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="240" y1="110" x2="320" y2="110" stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="4 4" />
            <rect x="50" y="30" width="70" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
            <rect x="50" y="42" width="45" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
            <rect x="280" y="180" width="70" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
            <rect x="280" y="192" width="45" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
          </svg>
        );
      case 'luminar':
        return (
          <svg className="w-full max-w-[260px] aspect-square drop-shadow-2xl" viewBox="0 0 220 220" fill="none">
            <rect x="30" y="30" width="160" height="160" rx="12" stroke="rgba(59,130,246,0.2)" strokeWidth="1.5" fill="rgba(2,4,9,0.5)" />
            <rect x="45" y="50" width="60" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
            <rect x="45" y="65" width="40" height="4" rx="2" fill="rgba(255,255,255,0.07)" />
            <line x1="45" y1="85" x2="175" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <rect x="45" y="100" width="130" height="5" rx="2.5" fill="rgba(255,255,255,0.05)" />
            <rect x="45" y="112" width="110" height="5" rx="2.5" fill="rgba(255,255,255,0.05)" />
            <rect x="45" y="140" width="75" height="25" rx="12.5" fill="#3B82F6" fillOpacity="0.85" />
            <circle cx="150" cy="152" r="14" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.4)" strokeWidth="1" />
          </svg>
        );
      case 'vault':
        return (
          <svg className="w-full max-w-[220px] aspect-square drop-shadow-2xl" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="65" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
            <circle cx="100" cy="100" r="40" fill="rgba(6,182,212,0.05)" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" />
            <path d="M100 75L120 110H80L100 75Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <line x1="100" y1="35" x2="100" y2="75" stroke="rgba(6,182,212,0.4)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="100" cy="35" r="4" fill="rgba(6,182,212,0.7)" />
            <circle cx="100" cy="165" r="3" fill="rgba(59,130,246,0.5)" />
          </svg>
        );
      case 'kosmik':
        return (
          <svg className="w-full max-w-[360px] aspect-[16/9] drop-shadow-2xl" viewBox="0 0 380 200" fill="none">
            <rect x="20" y="30" width="340" height="140" rx="10" stroke="rgba(59,130,246,0.15)" strokeWidth="1.5" fill="rgba(2,4,9,0.4)" />
            <rect x="40" y="55" width="100" height="90" rx="6" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
            <rect x="160" y="60" width="110" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
            <rect x="160" y="74" width="75" height="5" rx="2.5" fill="rgba(255,255,255,0.07)" />
            <rect x="160" y="93" width="170" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
            <rect x="160" y="103" width="150" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
            <rect x="160" y="125" width="85" height="20" rx="10" fill="rgba(59,130,246,0.6)" />
          </svg>
        );
      case 'strata':
        return (
          <svg className="w-full max-w-[500px] aspect-[21/9] drop-shadow-2xl" viewBox="0 0 500 180" fill="none">
            <text x="250" y="100" fill="rgba(255,255,255,0.03)" fontSize="96" fontFamily="sans-serif" textAnchor="middle" fontWeight="900" letterSpacing="-5">STRATA</text>
            <text x="250" y="98" fill="rgba(59,130,246,0.1)" fontSize="94" fontFamily="sans-serif" textAnchor="middle" fontWeight="900" letterSpacing="-5">STRATA</text>
            <line x1="40" y1="120" x2="460" y2="120" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
            <rect x="120" y="132" width="100" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
            <rect x="280" y="132" width="100" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
            <circle cx="80" cy="50" r="3" fill="rgba(59,130,246,0.5)" />
            <circle cx="420" cy="120" r="5" fill="rgba(6,182,212,0.5)" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.section
      id="portfolio"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with dynamic controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-cosmic-blue">
              <span className="w-6 h-0.5 bg-cosmic-blue block" />
              Selected Work
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
              Brands We've <br /> Sent to Orbit
            </h2>
          </div>

          {/* Interactive Filters Option Row */}
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest font-mono">
            {['all', 'brand', 'digital', 'strategy'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat as any)}
                className={`px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-cosmic-blue border-cosmic-blue text-white shadow-lg shadow-cosmic-blue/20'
                    : 'bg-space-2/40 border-white/5 text-star-dim hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Dynamic Masonry Grid */}
        <div className="grid grid-cols-12 gap-6">
          {filteredItems.map((item, index) => {
            // Apply different widths to render responsive rhythms
            let gridSpanClass = 'col-span-12';
            if (activeFilter === 'all') {
              if (index === 0) gridSpanClass = 'col-span-12 lg:col-span-7';
              else if (index === 1) gridSpanClass = 'col-span-12 lg:col-span-5';
              else if (index === 2) gridSpanClass = 'col-span-12 lg:col-span-4';
              else if (index === 3) gridSpanClass = 'col-span-12 lg:col-span-8';
              else if (index === 4) gridSpanClass = 'col-span-12';
            } else {
              gridSpanClass = 'col-span-12 md:col-span-6';
            }

            return (
              <div
                key={item.id}
                className={`${gridSpanClass} group rounded-2xl overflow-hidden relative cursor-none border border-white/5 bg-space-1 hover:border-cosmic-blue/20 transition-all`}
                onMouseMove={(e) => handleMouseMove(item.id, e)}
                onMouseLeave={() => handleMouseLeave(item.id)}
                style={tiltStyles[item.id] || {}}
              >
                {/* Background Representation with interactive mockup nested */}
                <div className={`w-full min-h-[280px] sm:min-h-[350px] flex items-center justify-center p-8 relative ${item.themeClass}`}>
                  <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        referrerPolicy="no-referrer"
                        className="w-full max-w-[400px] max-h-[220px] object-contain rounded-xl shadow-2xl border border-white/10" 
                      />
                    ) : (
                      renderMockup(item.mockupType)
                    )}
                  </div>

                  {/* Gradient Overlay bottom to cover details */}
                  <div className="absolute inset-x-0 bottom-0 py-8 px-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-cosmic-blue font-bold block mb-1">
                        {item.client}
                      </span>
                      <h4 className="font-display text-lg font-bold text-white">
                        {item.title}
                      </h4>
                    </div>
                    {/* Circle icon marker */}
                    <div className="w-10 h-10 bg-cosmic-blue rounded-full flex items-center justify-center text-white scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
