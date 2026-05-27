import React, { useState } from 'react';
import { Send, Check, Sparkles, Linkedin, Instagram, Dribbble, Palette, MessageCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { lang, t } = useLanguage();

  // ISI LINK SOSIAL MEDIA ANDA DI SINI
  // Silakan ganti nilai 'username' atau nomor telepon di bawah sesuai akun Anda:
  const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/rofiq-maulana-44ab30205/',
    behance: 'https://www.behance.net/angkasa___studio',
    dribbble: 'https://dribbble.com/Angkasa_Studio',
    instagram: 'https://instagram.com/angkasa___studio',
    whatsapp: 'https://wa.me/6287780597311', // Format WhatsApp internasional tanpa tanda '+' atau spasi (misal 62 untuk Indonesia)
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      setEmail('');
      
      // Clear message after success interval
      setTimeout(() => {
        setSubscribed(false);
      }, 4000);
    }, 1000);
  };

  const servicesList = t('footer', 'services') || [];

  return (
    <footer className="relative z-10 bg-space-1/60 border-t border-white/5 pt-20 pb-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          
          {/* Brand details col */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <a href="#home" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-8 h-8 flex items-center justify-center bg-cosmic-blue/10 border border-cosmic-blue/30 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-cosmic-blue/70">
                <img 
                  src="/images/logo.svg" 
                  alt="Angkasa Logo" 
                  referrerPolicy="no-referrer"
                  className="w-4 h-4 object-contain z-10 text-cosmic-blue"
                  onError={(e) => {
                    // Fallback element
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="font-display text-base font-bold tracking-tight text-white group-hover:text-cosmic-blue transition-colors">
                  ANGKASA
                </span>
                <span className="text-[9px] block font-mono text-star-dim tracking-widest leading-none">
                  STUDIO
                </span>
              </div>
            </a>
            
            <p className="text-star-dim font-light text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              {t('footer', 'bio')}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'LinkedIn', key: 'linkedin', icon: Linkedin },
                { name: 'Behance', key: 'behance', icon: Palette },
                { name: 'Dribbble', key: 'dribbble', icon: Dribbble },
                { name: 'Instagram', key: 'instagram', icon: Instagram },
                { name: 'WhatsApp', key: 'whatsapp', icon: MessageCircle },
              ].map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <a
                    key={platform.key}
                    href={socialLinks[platform.key as keyof typeof socialLinks]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/5 bg-space-2/30 hover:border-cosmic-blue/30 text-star-dim hover:text-cosmic-blue flex items-center justify-center transition-all duration-200 cursor-none"
                    aria-label={platform.name}
                  >
                    <IconComponent className="w-4.5 h-4.5 stroke-[1.5]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links col - Services */}
          <div className="lg:col-span-2 text-left">
            <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-white mb-6">
              {t('footer', 'servicesTitle')}
            </h4>
            <ul className="flex flex-col gap-3 list-none p-0 text-xs sm:text-sm font-light text-star-dim">
              {servicesList.map((serviceName: string, index: number) => (
                <li key={index}>
                  <a href="#services" className="hover:text-white transition-colors">
                    {serviceName}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links col - Studio map */}
          <div className="lg:col-span-2 text-left">
            <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-white mb-6">
              {t('footer', 'mapTitle')}
            </h4>
            <ul className="flex flex-col gap-3 list-none p-0 text-xs sm:text-sm font-light text-star-dim">
              <li><a href="#home" className="hover:text-white transition-colors">{t('footer', 'mapLinks')['about']}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{t('footer', 'mapLinks')['services']}</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">{t('footer', 'mapLinks')['portfolio']}</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">{t('footer', 'mapLinks')['process']}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{t('footer', 'mapLinks')['pricing']}</a></li>
            </ul>
          </div>

          {/* Newsletter subscription form column */}
          <div className="lg:col-span-4 text-left">
            <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-white mb-6">
              {t('footer', 'keepInOrbit')}
            </h4>
            <p className="text-star-dim font-light text-xs leading-relaxed mb-4">
              {t('footer', 'newsletterDesc')}
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-sm">
              <input
                required
                type="email"
                placeholder={subscribed ? t('footer', 'subscribed') : t('footer', 'placeholderEmail')}
                disabled={subscribed}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 bg-space-1 border rounded-xl px-4 py-3 text-xs outline-none transition-colors placeholder-star-muted text-white cursor-none ${
                  subscribed ? 'border-green-500/30 bg-green-500/5' : 'border-white/5 focus:border-cosmic-blue'
                }`}
              />
              <button
                type="submit"
                disabled={submitting || subscribed}
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all duration-300 flex-shrink-0 active:scale-95 cursor-none ${
                    subscribed ? 'bg-green-500' : 'bg-cosmic-blue hover:bg-shadow shadow-md hover:bg-blue-600'
                }`}
              >
                {submitting ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : subscribed ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </form>

            <p className="text-[10px] text-star-muted font-mono tracking-wide mt-6 select-none">
              Purwokerto · Central Java · Indonesia
            </p>
          </div>

        </div>

        {/* Footer bottom details bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-star-muted">
          <span>
            {t('footer', 'copyright')}
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors cursor-none">{t('footer', 'privacy')}</a>
            <a href="#" className="hover:text-white transition-colors cursor-none">{t('footer', 'terms')}</a>
            <a href="#" className="hover:text-white transition-colors cursor-none">{t('footer', 'cookie')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
