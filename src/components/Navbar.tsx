import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { label: 'Layanan', href: '#services' },
    { label: 'Karya', href: '#portfolio' },
    { label: 'Proses', href: '#process' },
    { label: 'Harga', href: '#pricing' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 h-20 flex items-center justify-between ${
          scrolled
            ? 'background-[#020409]/80 backdrop-blur-md border-b border-white/5 shadow-2xl h-16'
            : 'bg-transparent'
        }`}
      >
        {/* Brand Logo - Angkasa Logo Image + typography */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 flex items-center justify-center bg-cosmic-blue/10 border border-cosmic-blue/30 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-cosmic-blue/70">
            <div className="absolute inset-0 bg-gradient-to-tr from-cosmic-blue/20 to-cosmic-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src="/images/logo.svg" 
              alt="Angkasa Logo" 
              referrerPolicy="no-referrer"
              className="w-5 h-5 object-contain z-10 text-cosmic-blue"
              onError={(e) => {
                // If logo.svg fails to load, fallback to simple styling
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-cosmic-blue transition-colors">
              ANGKASA
            </span>
            <span className="text-[10px] block font-mono text-star-dim tracking-widest leading-none">
              STUDIO
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 list-none">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-star-dim hover:text-white transition-colors relative group py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cosmic-blue to-cosmic-cyan transition-all duration-350 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#cta"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-cosmic-blue rounded-full hover:bg-blue-600 active:scale-95 transition-all duration-200"
          >
            Hubungi Kami
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-star-dim hover:text-white active:scale-95 transition-transform"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Curtain Menu */}
      <div
        className={`fixed inset-0 z-40 bg-deep-space/98 backdrop-blur-xl md:hidden flex flex-col justify-center items-center gap-8 px-6 transition-all duration-500 will-change-transform ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-6 list-none text-center">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-2xl font-semibold text-star-dim hover:text-white active:text-cosmic-blue transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#cta"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white bg-cosmic-blue rounded-full shadow-lg shadow-cosmic-blue/20 hover:bg-blue-600 transition-all active:scale-95 duration-200"
        >
          Mulai Diskusi
          <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
        </a>
      </div>
    </>
  );
}
