import React from 'react';
import { Testimonial } from '../types';
import { motion } from 'motion/react';

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 't1',
      stars: 5,
      quote: 'Angkasa Studio benar-benar mengubah cara kami dipersepsikan di pasar. Brand identity kami sekarang terasa premium, konsisten, dan benar-benar merepresentasikan visi produk kami.',
      author: 'Rizky Dharma',
      role: 'CEO, Nexus Capital',
      avatarText: 'RD',
    },
    {
      id: 't2',
      stars: 5,
      quote: 'Proses kerjanya terstruktur banget. Dari discovery sampai delivery, tim Angkasa selalu satu langkah lebih depan dari apa yang kami bayangkan.',
      author: 'Siti Aminah',
      role: 'Founder, Luminar',
      avatarText: 'SA',
    },
    {
      id: 't3',
      stars: 5,
      quote: 'Design system yang mereka buat menghemat waktu tim kami puluhan jam setiap sprint. Ini bukan sekadar desain — ini adalah infrastruktur brand yang sebenarnya.',
      author: 'Michael Faiz',
      role: 'CTO, Vault Protocol',
      avatarText: 'MF',
    },
    {
      id: 't4',
      stars: 5,
      quote: 'Kami mendapatkan 3 investor baru setelah pitch deck redesign oleh Angkasa. Visualnya so clean dan storytelling-nya kuat banget. Worth every rupiah.',
      author: 'Laila Kusuma',
      role: 'Co-Founder, Kosmik Market',
      avatarText: 'LK',
    },
    {
      id: 't5',
      stars: 5,
      quote: 'Rebrand kami dari Angkasa menghasilkan peningkatan 40% di user trust score dan 28% lebih tinggi NPS dalam 3 bulan. Hasilnya lebih dari kami harapkan.',
      author: 'Bagas Pratama',
      role: 'Head of Product, Strata Living',
      avatarText: 'BP',
    },
    {
      id: 't6',
      stars: 5,
      quote: 'What struck me most was how they translated our complex fintech product into a visual language that felt human, modern, and trustworthy. Exceptional work.',
      author: 'Arif Nugroho',
      role: 'CMO, Bintara Finance',
      avatarText: 'AN',
    },
  ];

  // Triplicate array to ensure full width seamless loop
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 bg-space-1 border-y border-white/5 py-24 select-none overflow-hidden"
    >
      {/* Title */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-16">
        <div className="inline-flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-cosmic-blue justify-center">
          <span className="w-6 h-0.5 bg-cosmic-blue block" />
          Client Voices
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Words From the Stratosphere
        </h2>
        <p className="text-star-dim font-light text-sm sm:text-base max-w-lg mx-auto">
          Klien berbicara lebih keras dari portofolio kami.
        </p>
      </div>

      {/* Endless scroll container */}
      <div className="relative py-4 before:absolute before:inset-y-0 before:left-0 before:w-24 before:bg-gradient-to-r before:from-space-1 before:to-transparent before:z-20 after:absolute after:inset-y-0 after:right-0 after:w-24 after:bg-gradient-to-l after:from-space-1 after:to-transparent after:z-20">
        <div className="animate-marquee gap-6">
          {marqueeItems.map((testimonial, i) => (
            <div
              key={`${testimonial.id}-${i}`}
              className="w-[290px] sm:w-[350px] flex-shrink-0 p-8 rounded-2xl bg-space-2/40 border border-white/5 backdrop-blur-md relative select-none cursor-default hover:border-cosmic-blue/25 transition-all duration-300"
            >
              {/* Star Rating Badge */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, index) => (
                  <span key={index} className="text-yellow-500 text-sm">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote details */}
              <p className="text-star-dim font-light text-sm leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author box */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-space-3/30 border border-cosmic-blue/20 flex items-center justify-center font-display font-bold text-xs text-cosmic-blue">
                  {testimonial.avatarText}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white leading-tight">
                    {testimonial.author}
                  </h4>
                  <span className="text-[11px] text-star-muted font-mono leading-none">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
