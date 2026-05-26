import React, { useState } from 'react';
import { Check, Info, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingAddon {
  id: string;
  name: string;
  priceIdr: number;
  priceUsd: number;
}

export default function Pricing() {
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');
  
  // Dynamic addon selection list
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addons: PricingAddon[] = [
    { id: 'logo-motion', name: 'Animasi Logo & Bumper Gerak', priceIdr: 450000, priceUsd: 30 },
    { id: 'social-media', name: 'Kit Media Sosial (+5 Templat)', priceIdr: 300000, priceUsd: 20 },
    { id: 'stationery', name: 'Desain Cetak Berkas Kantor (Stationery)', priceIdr: 250000, priceUsd: 18 },
    { id: 'packaging', name: 'Desain Kemasan Siap Cetak (Packaging)', priceIdr: 850000, priceUsd: 58 },
  ];

  const plans = [
    {
      id: 'logo-sys',
      num: '01',
      name: 'Paket Logo Startup',
      priceIdr: 500000,
      priceUsd: 35,
      description: 'Ideal untuk projek awal atau validasi produk yang butuh aset kilat.',
      features: [
        'Format logo vektor lengkap (.AI, .SVG)',
        'Aset PNG & JPG resolusi tinggi',
        'Batas revisi hingga 2 kali',
        'Pilihan palet warna utama',
      ],
      badge: 'Launch',
    },
    {
      id: 'brand-identity',
      num: '02',
      name: 'Identitas Brand Lengkap',
      priceIdr: 2500000,
      priceUsd: 175,
      description: 'Sistem visual lengkap dari nol hingga manual buku pedoman brand.',
      features: [
        'Sistem Logo & Nama Brand Premium',
        'Teori Warna & Sistem Palet Warna',
        'Paduan Tipografi Berkarakter',
        'Panduan Lengkap PDF (30+ Halaman)',
        'Penyerahan File Master Figma',
        'Batas revisi hingga 3 kali',
      ],
      badge: 'Growth',
      isPopular: true,
    },
    {
      id: 'full-branding',
      num: '03',
      name: 'Paket Identitas & Animasi Lengkap',
      priceIdr: 5000000,
      priceUsd: 350,
      description: 'Solusi branding premium terintegrasi lengkap dengan materi cetak (collateral), desain kemasan, dan animasi logo dinamis.',
      features: [
        'Semua Fitur Identitas Lengkap',
        'Animasi Logo & Bumper Intro Kustom',
        'Aset Media Cetak & Stationery Premium',
        'Desain Kemasan & File Siap Cetak',
        'Dukungan 1-on-1 dengan Art Director Senior',
        'Revisi Fleksibel Selama Masa Kontrak',
      ],
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
        
        {/* Header with Currency Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-cosmic-blue">
              <span className="w-6 h-0.5 bg-cosmic-blue block" />
              Harga Transparan
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Investasi Terbaik <br /> untuk Brand Anda
            </h2>
            <p className="text-star-dim font-light text-sm sm:text-base">
              Paket investasi optimal dirancang fleksibel menyesuaikan tingkat pertumbuhan bisnis Anda.
            </p>
          </div>

          {/* Currency Toggle Switch */}
          <div className="flex items-center gap-2 bg-space-2/60 border border-white/5 p-1 rounded-full text-xs font-mono select-none">
            <button
              onClick={() => setCurrency('IDR')}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                currency === 'IDR'
                  ? 'bg-cosmic-blue text-white shadow-md'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              Rupiah (IDR)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-cosmic-blue text-white shadow-md'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
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
                  <div className="absolute top-0 right-8 -translate-y-1/2 inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-cosmic-blue text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                    <Sparkles className="w-3 h-3 text-cyan-200" />
                    REKOMENDASI
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
                    Biaya Tetap · Tanpa Biaya Tersembunyi
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
                <a
                  href="#cta"
                  className={`mt-auto w-full text-center py-4 rounded-full font-semibold text-xs uppercase tracking-wider transition-all duration-300 ${
                    plan.isPopular
                      ? 'bg-cosmic-blue hover:bg-blue-600 text-white shadow-lg shadow-cosmic-blue/20'
                      : 'border border-white/10 hover:border-cosmic-blue hover:bg-cosmic-blue/5 text-white'
                  }`}
                >
                  Pilih Paket
                </a>
              </div>
            );
          })}
        </div>

        {/* Dynamic Interactive Estimate Builder widget */}
        <div className="p-8 md:p-10 rounded-2xl border border-white/5 bg-space-2/30 backdrop-blur-2xl relative overflow-hidden">
          {/* Decorative Corner vector */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%) pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left selector */}
            <div className="lg:col-span-8">
              <h4 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
                Konfigurasi Tambahan
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cosmic-cyan text-[10px] font-mono tracking-widest font-normal uppercase animate-pulse">
                  Panel Tambahan Interaktif
                </span>
              </h4>
              <p className="text-star-dim font-light text-xs sm:text-sm leading-relaxed mb-6 max-w-2xl">
                Butuh kelengkapan tambahan? Sesuaikan kebutuhan Anda di panel berikut untuk mengestimasi biaya total pengerjaan projek.
              </p>

              {/* Addones grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addons.map((add) => {
                  const selected = selectedAddons.includes(add.id);
                  const priceText = formatPrice(currency === 'IDR' ? add.priceIdr : add.priceUsd);
                  return (
                    <button
                      key={add.id}
                      onClick={() => handleAddonToggle(add.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                        selected
                          ? 'border-cosmic-blue bg-cosmic-blue/10'
                          : 'border-white/5 bg-space-1/30 hover:border-white/15'
                      }`}
                    >
                      <div>
                        <div className={`text-xs font-semibold ${selected ? 'text-cosmic-blue' : 'text-white'}`}>
                          {add.name}
                        </div>
                        <div className="text-[10px] text-star-muted font-mono mt-0.5">
                          {priceText}
                        </div>
                      </div>
                      <div
                        className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center flex-shrink-0 ml-3 transition-colors ${
                          selected ? 'bg-cosmic-blue border-cosmic-blue text-white' : 'border-white/10'
                        }`}
                      >
                        {selected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Estimator total presentation */}
            <div className="lg:col-span-4 p-6 rounded-xl bg-space-1 border border-white/5 text-center flex flex-col items-center justify-center min-h-[180px]">
              <span className="text-[10px] uppercase font-mono tracking-widest text-star-muted block mb-2">
                ESTIMASI BIAYA TAMBAHAN
              </span>
              <div className="font-display text-2xl sm:text-3xl font-black text-cosmic-cyan tracking-tight mb-2">
                {formatPrice(getAddonCost())}
              </div>
              <span className="text-[10px] text-star-muted font-light leading-relaxed mb-4">
                {selectedAddons.length === 0
                  ? 'Belum ada tambahan dipilih'
                  : `Menambahkan ${selectedAddons.length} opsi ke estimasi`}
              </span>
              <a
                href="#cta"
                className="inline-flex items-center justify-center w-full py-3 rounded-full bg-cosmic-blue hover:bg-blue-600 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md shadow-cosmic-blue/10 active:scale-95"
              >
                Minta Penawaran Kustom
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </motion.section>
  );
}
