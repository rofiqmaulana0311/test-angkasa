import React, { useState, useRef, useEffect } from 'react';
import { PortfolioItem } from '../types';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'logo' | 'identity' | 'collateral' | 'motion'>('all');
  const { lang, t } = useLanguage();
  
  // Custom tilt state map to handle independent card 3D rotational perspective
  const [tiltStyles, setTiltStyles] = useState<Record<string, React.CSSProperties>>({});

  // Scroll tracking state to power the glowing indicator line
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'nexus-capital',
      client: t('portfolio', 'items')['nexus-capital']?.client || 'Fintech · Logo Design',
      title: t('portfolio', 'items')['nexus-capital']?.title || 'Nexus Geometric Star Symbol',
      category: 'logo',
      themeClass: 'bg-gradient-to-br from-[#0A1628] via-[#0F2850] to-[#0C3878]',
      mockupType: 'nexus',
    },
    {
      id: 'luminar-dashboard',
      client: t('portfolio', 'items')['luminar-dashboard']?.client || 'SaaS · Logo Motion',
      title: t('portfolio', 'items')['luminar-dashboard']?.title || 'Luminar Kinetic Moving Mark',
      category: 'motion',
      themeClass: 'bg-gradient-to-br from-[#0D1F3C] via-[#0A152B] to-[#091427]',
      mockupType: 'luminar',
    },
    {
      id: 'vault-protocol',
      client: t('portfolio', 'items')['vault-protocol']?.client || 'Web3 · Collateral & Print',
      title: t('portfolio', 'items')['vault-protocol']?.title || 'Vault Stationery & Packaging Set',
      category: 'collateral',
      themeClass: 'bg-gradient-to-br from-[#040D1F] via-[#081730] to-[#0A2040]',
      mockupType: 'vault',
    },
    {
      id: 'kosmik-market',
      client: t('portfolio', 'items')['kosmik-market']?.client || 'E-Commerce · Custom Lettering',
      title: t('portfolio', 'items')['kosmik-market']?.title || 'Kosmik Custom Lettering Logotype',
      category: 'logo',
      themeClass: 'bg-gradient-to-br from-[#060F25] via-[#0F2040] to-[#142850]',
      mockupType: 'kosmik',
    },
    {
      id: 'strata-living',
      client: t('portfolio', 'items')['strata-living']?.client || 'PropTech · Visual Identity',
      title: t('portfolio', 'items')['strata-living']?.title || 'Strata Living Guidelines Book',
      category: 'identity',
      themeClass: 'bg-gradient-to-br from-[#020814] via-[#0A1830] to-[#05101E]',
      mockupType: 'strata',
    },
    {
      id: 'bintara-finance',
      client: t('portfolio', 'items')['bintara-finance']?.client || 'Fintech · Visual Identity',
      title: t('portfolio', 'items')['bintara-finance']?.title || 'Bintara Integrated Rebrand System',
      category: 'identity',
      themeClass: 'bg-gradient-to-br from-[#091629] via-[#0B2C59] to-[#063B7A]',
      mockupType: 'bintara',
    },
    {
      id: 'arkadia-labs',
      client: t('portfolio', 'items')['arkadia-labs']?.client || 'Web3 · Logo Design',
      title: t('portfolio', 'items')['arkadia-labs']?.title || 'Arkadia Cryptographic Sigil Symbol',
      category: 'logo',
      themeClass: 'bg-gradient-to-br from-[#0F0C20] via-[#20153D] to-[#2B1B54]',
      mockupType: 'arkadia',
    },
    {
      id: 'apex-retail',
      client: t('portfolio', 'items')['apex-retail']?.client || 'E-Commerce · Collateral & Print',
      title: t('portfolio', 'items')['apex-retail']?.title || 'Apex Eco Retail Shoebox Line',
      category: 'collateral',
      themeClass: 'bg-gradient-to-br from-[#120D0A] via-[#291B15] to-[#3B251B]',
      mockupType: 'apex',
    },
    {
      id: 'equinox-brand',
      client: t('portfolio', 'items')['equinox-brand']?.client || 'Creative · Logo Motion',
      title: t('portfolio', 'items')['equinox-brand']?.title || 'Equinox Celestial Orbit Reel',
      category: 'motion',
      themeClass: 'bg-gradient-to-br from-[#0E061A] via-[#1F0E38] to-[#2F1454]',
      mockupType: 'equinox',
    },
    {
      id: 'nebula-coffee',
      client: t('portfolio', 'items')['nebula-coffee']?.client || 'Retail · Collateral & Print',
      title: t('portfolio', 'items')['nebula-coffee']?.title || 'Nebula Blend Premium Coffee Bag',
      category: 'collateral',
      themeClass: 'bg-gradient-to-br from-[#081215] via-[#10242A] to-[#14313B]',
      mockupType: 'nebula',
    },
  ];

  // Mouse tilt perspective handlers
  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

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

  // Handle scroll trigger to calculate progress percentage and active index
  const handleScrollProgress = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);

      if (filteredItems.length > 0) {
        if (maxScroll > 10) {
          const scrollPercentage = scrollLeft / maxScroll;
          const index = Math.round(scrollPercentage * (filteredItems.length - 1));
          setActiveSegmentIndex(index);
        } else {
          setActiveSegmentIndex(0);
        }
      }
    }
  };

  // Triggers left/right card scrolls
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollValue = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollValue : scrollLeft + scrollValue,
        behavior: 'smooth'
      });
    }
  };

  // Smooth scroll to a specific portfolio item index
  const scrollToItem = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cards = container.children;
      if (cards && cards[index]) {
        const card = cards[index] as HTMLElement;
        const containerLeft = container.getBoundingClientRect().left;
        const cardLeft = card.getBoundingClientRect().left;
        const relativeLeft = cardLeft - containerLeft + container.scrollLeft;
        
        container.scrollTo({
          left: relativeLeft,
          behavior: 'smooth'
        });
        setActiveSegmentIndex(index);
      }
    }
  };

  // Reset scroll on filter change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      setScrollProgress(0);
      setActiveSegmentIndex(0);
    }
  }, [activeFilter]);

  // Sync scrollbar progress bar initially
  useEffect(() => {
    handleScrollProgress();
  }, []);

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
      case 'bintara':
        return (
          <svg className="w-full max-w-[280px] aspect-square drop-shadow-2xl" viewBox="0 0 220 220" fill="none">
            <circle cx="110" cy="110" r="90" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
            <path d="M50 140 L90 100 L130 120 L170 70" stroke="rgba(59,130,246,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="170" cy="70" r="6" fill="#3B82F6" className="animate-pulse" />
            <rect x="50" y="50" width="120" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
            <rect x="50" y="62" width="70" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
          </svg>
        );
      case 'arkadia':
        return (
          <svg className="w-full max-w-[240px] aspect-square drop-shadow-2xl" viewBox="0 0 200 200" fill="none">
            <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" stroke="rgba(147,51,234,0.25)" strokeWidth="1.5" />
            <polygon points="100,40 150,70 150,130 100,160 50,130 50,70" fill="rgba(147,51,234,0.05)" stroke="rgba(147,51,234,0.5)" strokeWidth="2" />
            <circle cx="100" cy="100" r="25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(147,51,234,0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="30" y1="100" x2="170" y2="100" stroke="rgba(147,51,234,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        );
      case 'apex':
        return (
          <svg className="w-full max-w-[280px] aspect-[16/9] drop-shadow-2xl" viewBox="0 0 300 180" fill="none">
            <path d="M60,110 L120,60 L200,95 L240,90 L240,110 Z" stroke="rgba(249,115,22,0.3)" strokeWidth="2" fill="rgba(249,115,22,0.05)" />
            <rect x="30" y="20" width="240" height="140" rx="8" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <line x1="30" y1="130" x2="270" y2="130" stroke="rgba(249,115,22,0.2)" strokeWidth="1" />
            <rect x="45" y="140" width="110" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
            <circle cx="235" cy="45" r="15" stroke="rgba(249,115,22,0.4)" strokeWidth="1" />
          </svg>
        );
      case 'equinox':
        return (
          <svg className="w-full max-w-[240px] aspect-square drop-shadow-2xl" viewBox="0 0 200 200" fill="none">
            <ellipse cx="100" cy="100" rx="75" ry="35" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" transform="rotate(-30 100 100)" />
            <ellipse cx="100" cy="100" rx="75" ry="35" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" transform="rotate(30 100 100)" />
            <circle cx="100" cy="100" r="14" fill="#A855F7" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
            <circle cx="45" cy="68" r="8" fill="#06B6D4" stroke="rgba(255,255,255,0.1)" />
            <circle cx="155" cy="132" r="5" fill="rgba(255,255,255,0.6)" />
          </svg>
        );
      case 'nebula':
        return (
          <svg className="w-full max-w-[200px] aspect-[3/4] drop-shadow-2xl" viewBox="0 0 160 210" fill="none">
            <rect x="25" y="20" width="110" height="170" rx="14" stroke="rgba(20,184,166,0.2)" strokeWidth="1.5" fill="rgba(2,4,9,0.3)" />
            <circle cx="80" cy="95" r="40" stroke="rgba(20,184,166,0.35)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="80" cy="95" r="28" fill="rgba(20,184,166,0.08)" stroke="rgba(20,184,166,0.5)" strokeWidth="1.5" />
            <path d="M72,83 L80,95 L88,83" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="45" y="152" width="70" height="18" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
            <rect x="55" y="160" width="50" height="2" rx="1" fill="rgba(20,184,166,0.5)" />
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
      className="relative z-10 py-24 px-6 md:px-12 lg:px-24 select-none"
    >
      <style>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Section Header with dynamic controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-cosmic-blue">
              <span className="w-6 h-0.5 bg-cosmic-blue block" />
              {t('portfolio', 'selectedWork')}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
              {t('portfolio', 'title')}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Interactive Filters Option Row */}
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest font-mono">
              {[
                { id: 'all', label: t('portfolio', 'filters')['all'] },
                { id: 'logo', label: t('portfolio', 'filters')['logo'] },
                { id: 'identity', label: t('portfolio', 'filters')['identity'] },
                { id: 'collateral', label: t('portfolio', 'filters')['collateral'] },
                { id: 'motion', label: t('portfolio', 'filters')['motion'] }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id as any)}
                  className={`px-5 py-2.5 rounded-full border transition-all duration-300 ${
                    activeFilter === cat.id
                      ? 'bg-cosmic-blue border-cosmic-blue text-white shadow-lg shadow-cosmic-blue/20'
                      : 'bg-space-2/40 border-white/5 text-star-dim hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Slider Navigation Chevrons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                disabled={scrollProgress <= 1}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                  scrollProgress <= 1
                    ? 'border-white/5 text-star-muted opacity-40 cursor-not-allowed'
                    : 'border-white/10 text-white bg-space-2/40 hover:bg-cosmic-blue hover:border-cosmic-blue active:scale-95'
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={scrollProgress >= 99}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                  scrollProgress >= 99
                    ? 'border-white/5 text-star-muted opacity-40 cursor-not-allowed'
                    : 'border-white/10 text-white bg-space-2/40 hover:bg-cosmic-blue hover:border-cosmic-blue active:scale-95'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Swiping / Decelerated Scrolling Slides Track */}
        <div
          ref={scrollRef}
          onScroll={handleScrollProgress}
          className="scrollbar-hidden flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-1"
          style={{ width: '100%' }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[85vw] sm:w-[440px] md:w-[480px] snap-start group rounded-2xl overflow-hidden relative border border-white/5 bg-space-1 hover:border-cosmic-blue/20 transition-all duration-300"
              onMouseMove={(e) => handleMouseMove(item.id, e)}
              onMouseLeave={() => handleMouseLeave(item.id)}
              style={tiltStyles[item.id] || {}}
            >
              {/* Card Presentation Canvas */}
              <div className={`w-full min-h-[300px] sm:min-h-[360px] flex items-center justify-center p-8 relative ${item.themeClass} select-none`}>
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

                {/* Cover Details overlay */}
                <div className="absolute inset-x-0 bottom-0 py-8 px-6 bg-gradient-to-t from-black/92 via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-cosmic-cyan font-bold block mb-1">
                      {item.client}
                    </span>
                    <h4 className="font-display text-base font-bold text-white">
                      {item.title}
                    </h4>
                  </div>
                  {/* Floating CTA Marker Circle */}
                  <div className="w-10 h-10 bg-cosmic-blue rounded-full flex items-center justify-center text-white scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-md shadow-cosmic-blue/30">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Dots Indicator - Pagination UI */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {filteredItems.map((item, idx) => {
            const isActive = idx === activeSegmentIndex;
            return (
              <button
                key={item.id}
                onClick={() => scrollToItem(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-none ${
                  isActive 
                    ? 'w-7 bg-cosmic-blue shadow-lg shadow-cosmic-blue/50' 
                    : 'w-2.5 bg-white/10 hover:bg-white/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Helper swipe hint for mobile layout */}
        <p className="block sm:hidden text-center text-[10px] text-star-muted font-mono tracking-wider mt-4 animate-pulse">
          ← Geser untuk mengeksplorasi portofolio →
        </p>

      </div>
    </motion.section>
  );
}
