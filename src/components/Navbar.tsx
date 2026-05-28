import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

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
    { label: t('navbar', 'services'), href: '#services' },
    { label: t('navbar', 'portfolio'), href: '#portfolio' },
    { label: t('navbar', 'process'), href: '#process' },
    { label: t('navbar', 'pricing'), href: '#pricing' },
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
        {/* Brand Logo - Premium Full SVG Vector Logo (Icon + Personalized Typo) */}
        <a href="#home" className="flex items-center group py-1 select-none">
          <Logo 
            variant="full"
            className="h-7 sm:h-8 w-auto text-white group-hover:text-cosmic-blue transition-colors duration-300"
            id="navbar-full-logo-svg"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 list-none">
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

          {/* Premium Language Switcher Pill */}
          <div className="flex items-center gap-1 bg-space-2/60 border border-white/10 p-1 rounded-full text-[10px] font-mono select-none">
            <button
              onClick={() => setLang('id')}
              className={`px-2 py-1 rounded-full transition-all duration-200 ${
                lang === 'id'
                  ? 'bg-cosmic-blue text-white font-bold shadow-md'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-full transition-all duration-200 ${
                lang === 'en'
                  ? 'bg-cosmic-blue text-white font-bold shadow-md'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="#cta"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-cosmic-blue rounded-full hover:bg-blue-600 active:scale-95 transition-all duration-200"
          >
            {t('navbar', 'contactUs')}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Toggle & Language combo container */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Simple toggle for mobile top edge */}
          <div className="flex items-center gap-1 bg-space-2/60 border border-white/10 p-0.5 rounded-full text-[9px] font-mono select-none">
            <button
              onClick={() => setLang('id')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                lang === 'id' ? 'bg-cosmic-blue text-white font-bold' : 'text-star-muted hover:text-white'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                lang === 'en' ? 'bg-cosmic-blue text-white font-bold' : 'text-star-muted hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="p-2 text-star-dim hover:text-white active:scale-95 transition-transform"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Curtain Menu */}
      <div
        className={`fixed inset-0 z-40 bg-deep-space/98 backdrop-blur-xl md:hidden flex flex-col justify-center items-center gap-6 px-6 transition-all duration-500 will-change-transform ${
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

        {/* Currency/Lang details info on mobile */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-star-muted flex items-center gap-1">
            <Globe className="w-3 h-3 text-cosmic-blue animate-spin" style={{ animationDuration: '8s' }} />
            Region / Language
          </span>
          <div className="flex items-center gap-2 bg-space-2/60 border border-white/5 p-1 rounded-full text-xs font-mono select-none">
            <button
              onClick={() => setLang('id')}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                lang === 'id' ? 'bg-cosmic-blue text-white shadow-md' : 'text-star-dim hover:text-white'
              }`}
            >
              Indonesia (ID)
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                lang === 'en' ? 'bg-cosmic-blue text-white shadow-md' : 'text-star-dim hover:text-white'
              }`}
            >
              Global (EN)
            </button>
          </div>
        </div>

        <a
          href="#cta"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white bg-cosmic-blue rounded-full shadow-lg shadow-cosmic-blue/20 hover:bg-blue-600 transition-all active:scale-95 duration-200"
        >
          {t('navbar', 'beginDiscussion')}
          <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
        </a>
      </div>
    </>
  );
}
