import React, { useState } from 'react';
import { Check, Info, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

interface PricingAddon {
  id: string;
  name: string;
  priceIdr: number;
  priceUsd: number;
}

export default function Pricing() {
  const { lang, t } = useLanguage();
  const currency = lang === 'id' ? 'IDR' : 'USD';
  
  // Dynamic addon selection list
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addons: PricingAddon[] = [
    { id: 'logo-motion', name: t('pricing', 'addons')['logo-motion'] || 'Animasi Logo & Bumper Gerak', priceIdr: 450000, priceUsd: 30 },
    { id: 'social-media', name: t('pricing', 'addons')['social-media'] || 'Kit Media Sosial (+5 Templat)', priceIdr: 300000, priceUsd: 20 },
    { id: 'stationery', name: t('pricing', 'addons')['stationery'] || 'Desain Cetak Berkas Kantor (Stationery)', priceIdr: 250000, priceUsd: 18 },
    { id: 'packaging', name: t('pricing', 'addons')['packaging'] || 'Desain Kemasan Siap Cetak (Packaging)', priceIdr: 850000, priceUsd: 58 },
  ];

  const plans = [
    {
      id: 'logo-sys',
      num: '01',
      name: t('pricing', 'planNames')['logo-sys'] || 'Paket Logo Startup',
      priceIdr: 500000,
      priceUsd: 35,
      description: t('pricing', 'planDescs')['logo-sys'] || '',
      features: t('pricing', 'features')['logo-sys'] || [],
      badge: 'Launch',
    },
    {
      id: 'brand-identity',
      num: '02',
      name: t('pricing', 'planNames')['brand-identity'] || 'Identitas Brand Lengkap',
      priceIdr: 2500000,
      priceUsd: 175,
      description: t('pricing', 'planDescs')['brand-identity'] || '',
      features: t('pricing', 'features')['brand-identity'] || [],
      badge: 'Growth',
      isPopular: true,
    },
    {
      id: 'full-branding',
      num: '03',
      name: t('pricing', 'planNames')['full-branding'] || 'Paket Identitas & Animasi Lengkap',
      priceIdr: 5000000,
      priceUsd: 350,
      description: t('pricing', 'planDescs')['full-branding'] || '',
      features: t('pricing', 'features')['full-branding'] || [],
      badge: 'Scale',
    },
  ];

  const handleAddonToggle = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getAddonCost = () => {
    return addons
      .filter((a) => selectedAddons.includes(a.id))
      .reduce((sum, current) => sum + (currency === 'IDR' ? current.priceIdr : current.priceUsd), 0);
  };

  const formatPrice = (value: number) => {
    if (currency === 'IDR') {
      if (value >= 1000000) {
        return `Rp ${(value / 1000000).toFixed(1)}JT`;
      }
      return `Rp ${(value / 1000).toFixed(0)}K`;
    }
    return `$ ${value}`;
  };

  return (
    <motion.section
      id="pricing"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 bg-space-1 py-24 border-y border-white/5 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header content */}
        <div className="max-w-xl mb-16">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-cosmic-blue">
            <span className="w-6 h-0.5 bg-cosmic-blue block" />
            {t('pricing', 'badge')}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {t('pricing', 'title')}
          </h2>
          <p className="text-star-dim font-light text-sm sm:text-base">
            {t('pricing', 'desc')}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => {
            const basePrice = currency === 'IDR' ? plan.priceIdr : plan.priceUsd;
            return (
              <div
                key={plan.id}
                className={`p-8 rounded-2xl relative transition-all duration-300 flex flex-col ${
                  plan.isPopular
                    ? 'border-2 border-cosmic-blue bg-space-2/50 shadow-2xl shadow-cosmic-blue/10 scale-100 lg:scale-[1.02] z-10'
                    : 'border border-white/5 bg-space-2/20 backdrop-blur-md'
                }`}
              >
                {/* Popularity Badge */}
                {plan.isPopular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-cosmic-blue text-[10px] font-bold uppercase tracking-widest text-white shadow-lg text-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                    {t('pricing', 'recommended')}
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-star-muted uppercase tracking-widest">
                    Package {plan.num}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-cosmic-blue/10 border border-cosmic-blue/20 rounded-full text-cosmic-blue">
                    {plan.badge}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                
                <p className="text-star-dim font-light text-xs sm:text-sm mb-6 leading-relaxed min-h-[48px]">
                  {plan.description}
                </p>

                {/* Styled Price */}
                <div className="mb-8 border-b border-white/5 pb-6">
                  <span className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {formatPrice(basePrice)}
                  </span>
                  <span className="text-[11px] text-star-muted block mt-1 font-mono">
                    {t('pricing', 'fixed')}
                  </span>
                </div>

                {/* Features Checklist */}
                <ul className="flex flex-col gap-3.5 list-none mb-10 text-xs sm:text-sm text-star-dim font-light">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <Check className="w-4 h-4 text-cosmic-cyan flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Select */}
                <button
                  type="button"
                  onClick={() => {
                    const event = new CustomEvent('select-pricing-plan', { detail: { planId: plan.id } });
                    window.dispatchEvent(event);
                    const contactSection = document.getElementById('cta');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`mt-auto w-full text-center py-4 rounded-full font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-none ${
                    plan.isPopular
                      ? 'bg-cosmic-blue hover:bg-blue-600 text-white shadow-lg shadow-cosmic-blue/20 animate-pulse'
                      : 'border border-white/10 hover:border-cosmic-blue hover:bg-cosmic-blue/5 text-white'
                  }`}
                >
                  {t('pricing', 'selectPlan')}
                </button>
              </div>
            );
          })}
        </div>
        
      </div>
    </motion.section>
  );
}
