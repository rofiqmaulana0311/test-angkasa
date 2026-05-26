import React from 'react';
import { Layers, Monitor, Target, Cpu, FileText, Film } from 'lucide-react';
import { Service } from '../types';
import { motion } from 'motion/react';

export default function Services() {
  const serviceList: Service[] = [
    {
      id: 'logo-design',
      title: 'Logo Design & Wordmarks',
      description: 'Kreasi logo mark, kustom wordmark, monogram, dan letterform unik yang berkarakter kuat dan siap menjadi jangkar identitas bisnis Anda.',
      tags: ['Custom Logo', 'Wordmark', 'Monogram'],
      icon: 'Target',
    },
    {
      id: 'visual-identity',
      title: 'Visual Identity Systems',
      description: 'Sistem identitas visual terpadu mulai dari skema warna, panduan tipografi, aset ikonografi, hingga manual buku panduan penggunaan lengkap.',
      tags: ['Brand Book', 'Color System', 'Typography'],
      icon: 'Layers',
    },
    {
      id: 'brand-collateral',
      title: 'Brand Collateral & Print',
      description: 'Aset fisik & digital premium seperti desain kemasan (packaging), pitch deck, profil perusahaan, stationery, dan dokumen cetak resmi.',
      tags: ['Packaging', 'Stationery', 'Pitch Decks'],
      icon: 'FileText',
    },
    {
      id: 'logo-motion',
      title: 'Logo Motion & Animation',
      description: 'Logo animasi, bumper intro berkualitas tinggi, motion graphics media sosial, dan pedoman animasi logo interaktif (Lottie & SVG).',
      tags: ['Animation', 'Lottie / SVG', 'Bumper Intro'],
      icon: 'Film',
    },
  ];

  // Helper mapping string to Lucide React element
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-5.5 h-5.5 text-cosmic-blue" />;
      case 'Monitor':
        return <Monitor className="w-5.5 h-5.5 text-cosmic-blue" />;
      case 'Target':
        return <Target className="w-5.5 h-5.5 text-cosmic-blue" />;
      case 'Cpu':
        return <Cpu className="w-5.5 h-5.5 text-cosmic-blue" />;
      case 'FileText':
        return <FileText className="w-5.5 h-5.5 text-cosmic-blue" />;
      case 'Film':
        return <Film className="w-5.5 h-5.5 text-cosmic-blue" />;
      default:
        return <Layers className="w-5.5 h-5.5 text-cosmic-blue" />;
    }
  };

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 bg-space-1 border-y border-white/5 py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-cosmic-blue">
            <span className="w-6 h-0.5 bg-cosmic-blue block" />
            Keahlian Kami
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Segala Kebutuhan untuk <br /> Melesatkan Brand Anda
          </h2>
          <p className="text-star-dim font-light text-base sm:text-lg leading-relaxed max-w-xl">
            Dari logo ikonik, sistem identitas visual yang solid, materi cetak premium, hingga animasi gerakan logo dinamis — kami desain dengan presisi mutlak.
          </p>
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((service) => (
            <div
              key={service.id}
              className="relative p-8 rounded-2xl bg-space-2/40 border border-white/5 transition-all duration-300 glassmorphism-hover group overflow-hidden"
            >
              {/* Subtle radial inner glow corner anchor */}
              <div className="absolute inset-0 bg-radial-gradient(circle at 0% 100%, rgba(59,130,246,0.04) 0%, transparent 60%) opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Service Icon inside glowing sphere boundary */}
              <div className="relative w-12 h-12 bg-cosmic-blue/10 border border-cosmic-blue/20 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-cosmic-blue/20 group-hover:border-cosmic-blue/40 group-hover:scale-105">
                {getIcon(service.icon)}
              </div>

              {/* Service Title */}
              <h3 className="font-display text-lg font-bold text-white mb-3 tracking-tight group-hover:text-cosmic-blue transition-colors duration-200">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-star-dim font-light text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Tags inline */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-cosmic-blue/5 border border-cosmic-blue/15 text-cosmic-blue hover:border-cosmic-blue/35 transition-colors duration-200 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
