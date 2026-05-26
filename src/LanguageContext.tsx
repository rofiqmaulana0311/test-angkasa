import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'id';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (section: string, key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, any>> = {
  en: {
    navbar: {
      services: 'Services',
      portfolio: 'Portfolio',
      process: 'Process',
      pricing: 'Pricing',
      contactUs: "Let's Talk",
      beginDiscussion: 'Begin Discovery',
    },
    hero: {
      badge: 'Brand & Design Studio',
      titlePart1: 'Angkasa Studio —',
      titlePart2: 'Bringing Visual Identity',
      gradient: 'Beyond Boundaries',
      subtext: 'Premium visual identity for startups and ambitious businesses ready to leave an unforgettable impression in their market orbit.',
      viewWork: 'View Our Work',
      learnServices: 'Explore Services',
      brandsLaunched: 'Brands Launched',
      inOrbit: 'In Orbit',
      years: 'Yrs',
      satisfaction: 'Satisfaction Score',
      clientRating: 'Client Rating',
      scrollDown: 'Scroll Down',
    },
    services: {
      expertise: 'Our Expertise',
      title: 'Everything Your Brand Needs to Break Orbit',
      desc: 'From iconic logos, solid visual identity systems, premium print collateral, to dynamic logo motion — designed with absolute precision.',
      items: {
        'logo-design': {
          title: 'Logo Design & Wordmarks',
          description: 'Creation of unique logo marks, custom wordmarks, monograms, and letterforms with robust character ready to anchor your business identity.',
          tags: ['Custom Logo', 'Wordmark', 'Monogram']
        },
        'visual-identity': {
          title: 'Visual Identity Systems',
          description: 'Integrated identity designs ranging from color palettes, typography guidelines, iconography assets, to a master brand guidelines manual.',
          tags: ['Brand Book', 'Color System', 'Typography']
        },
        'brand-collateral': {
          title: 'Brand Collateral & Print',
          description: 'Premium print and digital physical assets including custom retail packaging designs, pitch decks, corporate profiles, stationery, and publications.',
          tags: ['Packaging', 'Stationery', 'Pitch Decks']
        },
        'logo-motion': {
          title: 'Logo Motion & Animation',
          description: 'Dynamic animated logos, high-definition promo bumber intros, social media motion graphics, and interactive digital guidelines (Lottie & SVG).',
          tags: ['Animation', 'Lottie / SVG', 'Bumper Intro']
        }
      }
    },
    portfolio: {
      selectedWork: 'Selected Work',
      title: "Brands We've Sent to Orbit",
      filters: {
        all: 'All Work',
        logo: 'Logo Design',
        identity: 'Visual Identity',
        collateral: 'Collateral & Print',
        motion: 'Logo Motion',
      },
      items: {
        'nexus-capital': { client: 'Fintech · Logo Design', title: 'Nexus Geometric Star Symbol' },
        'luminar-dashboard': { client: 'SaaS · Logo Motion', title: 'Luminar Kinetic Moving Mark' },
        'vault-protocol': { client: 'Web3 · Collateral & Print', title: 'Vault Stationery & Packaging Set' },
        'kosmik-market': { client: 'E-Commerce · Custom Lettering', title: 'Kosmik Custom Lettering Logotype' },
        'strata-living': { client: 'PropTech · Visual Identity', title: 'Strata Living Guidelines Book' },
        'bintara-finance': { client: 'Fintech · Visual Identity', title: 'Bintara Integrated Rebrand System' },
        'arkadia-labs': { client: 'Web3 · Logo Design', title: 'Arkadia Cryptographic Sigil Symbol' },
        'apex-retail': { client: 'E-Commerce · Collateral & Print', title: 'Apex Eco Retail Shoebox Line' },
        'equinox-brand': { client: 'Creative · Logo Motion', title: 'Equinox Celestial Orbit Reel' },
        'nebula-coffee': { client: 'Retail · Collateral & Print', title: 'Nebula Blend Premium Coffee Bag' },
      }
    },
    testimonials: {
      title: 'Words From the Stratosphere',
      badge: 'Client Voices',
      desc: 'Our clients speak louder than our portfolio.',
      items: [
        {
          id: 't1',
          quote: 'Angkasa Studio fully revolutionized how we are perceived in the market. Our brand identity now feels premium, highly consistent, and truly represents our product vision.',
          author: 'Rizky Dharma',
          role: 'CEO, Nexus Capital',
        },
        {
          id: 't2',
          quote: 'The methodology is incredibly structured. From discovery to ultimate delivery, the Angkasa team was always one step ahead of our expectations.',
          author: 'Siti Aminah',
          role: 'Founder, Luminar',
        },
        {
          id: 't3',
          quote: 'The comprehensive design system they crafted saves us dozens of engineering hours every single sprint cycle. This is genuine brand infrastructure.',
          author: 'Michael Faiz',
          role: 'CTO, Vault Protocol',
        },
        {
          id: 't4',
          quote: 'We locked down 3 brand new venture capital investors immediately following our pitch deck redesign by Angkasa. Visuals are immaculate and storytelling is solid.',
          author: 'Laila Kusuma',
          role: 'Co-Founder, Kosmik Market',
        },
        {
          id: 't5',
          quote: 'Our comprehensive rebrand by Angkasa delivered a 40% uptick in customer trust indices and 28% higher NPS inside 3 calendar months. Amazing returns.',
          author: 'Bagas Pratama',
          role: 'Head of Product, Strata Living',
        },
        {
          id: 't6',
          quote: 'What struck me most was how they translated our complex fintech product into a visual language that felt human, modern, and trustworthy. Exceptional work.',
          author: 'Arif Nugroho',
          role: 'CMO, Bintara Finance',
        }
      ]
    },
    process: {
      badge: 'Our Methodology',
      titlePart1: 'The Angkasa',
      titlePart2: 'Orbit System',
      desc: 'Every creative lifecycle processes through our custom system guaranteeing rigorous, measurable, and highly valuable aesthetics.',
      steps: [
        {
          num: '01',
          title: 'Discovery & Immersion',
          description: 'A deep-dive research into your sector, rivals, audience, and aims. We never sketch anything before aligning with your specific cosmic orbit.',
        },
        {
          num: '02',
          title: 'Strategy & Direction',
          description: 'Setting brand positioning matrices, moodboards, and a shared creative strategy. This serves as our telemetry dashboard before takeoff.',
        },
        {
          num: '03',
          title: 'Design & Refinement',
          description: 'Iterative layout sessions with modern aesthetic showcases and fast feedback loops. Every pixel revises with scientific intent, never guessplay.',
        },
        {
          num: '04',
          title: 'Delivery & Activation',
          description: 'Delivering full source file handovers, master brand books, and strategic implementation outlines. Ready to accelerate over all media channels.',
        },
        {
          num: '05',
          title: 'Orbit Support',
          description: 'Continuous long-term post-launch consulting to sustain brand integrity as your business scales. We act as co-pilots, not transactional vendors.',
        },
      ]
    },
    pricing: {
      badge: 'Transparent Pricing',
      title: 'Investment For Your Brand',
      desc: 'Optimal investment packages explicitly scaled adjust to the flight level of your company growth.',
      recommended: 'RECOMMENDED',
      fixed: 'Fixed Budget · No Hidden Fees',
      selectPlan: 'Select Plan',
      configurator: 'Orbit Configurator',
      addonLabel: 'Interactive addon panel',
      configDesc: 'Need extra elements? Directly toggle configurations below to instantly analyze estimates for your tailored brand strategy.',
      estimatedCostLabel: 'ESTIMATED ADDON TOTAL',
      estimatedNone: 'No optional addons selected',
      estimatedCount: 'Adding {count} premium option(s) to quote',
      customProposal: 'Recieve Custom Estimate',
      planNames: {
        'logo-sys': 'Startup Logo Package',
        'brand-identity': 'Full Brand Identity',
        'full-branding': 'Comprehensive Brand & Motion Suite',
      },
      planDescs: {
        'logo-sys': 'Optimal for pre-seed launches or fast product validation requiring rapid premium markers.',
        'brand-identity': 'Complete visual architecture from the ground up to a detailed master digital brand guidelines manual.',
        'full-branding': 'Integrated elite solution comprising print templates (collateral), retail packaging layout, and cinematic logo motion bumpers.',
      },
      addons: {
        'logo-motion': 'Logo Animation / Motion Guidelines',
        'social-media': 'Social Media Kit (+5 Templates)',
        'stationery': 'Print Ready Stationery Design',
        'packaging': 'Premium Packaging Design (Cetak)',
      },
      features: {
        'logo-sys': [
          'All master vector assets (.AI, .SVG & .PDF)',
          'High resolution web assets (PNG & JPG)',
          '2 full correction revision rounds',
          'Primary color palette setup',
        ],
        'brand-identity': [
          'Premium Custom Logo & Wordmark System',
          'Color system & custom tone formulas',
          'Sophisticated typography pair matrices',
          'Full 30+ Pages Guidelines PDF manual',
          'Master Figma Design Files ecosystem handover',
          '3 full layout design revision rounds',
        ],
        'full-branding': [
          'Full visual identity systems coverage',
          'Cinematic Logo Motion intro bumper file',
          'Premium Stationery Layouts & Media package',
          'Packaging design layout blueprint system',
          'A dedicated Art Director steering your project',
          'Contract timelines with highly flexible revision frames',
        ]
      }
    },
    contact: {
      badge: 'Ready for Liftoff?',
      title: 'Your Brand Deserves a Cosmic Upgrade',
      desc: 'Launch with 87+ industry-leading ventures who have trusted our visual telemetry. Spaces are strictly bounded quarterly.',
      successTitle: "You're in Orbit! ✓",
      successText: "We received your proposal, {name}. Your system parameters have logged successfully. Angkasa Studio officers will match with you on WhatsApp at {whatsapp} in 24 hours.",
      contactWa: 'Instant WhatsApp Communication',
      newProposal: 'Submit Dual Proposal',
      formLabels: {
        name: 'Full Legal Name *',
        whatsapp: 'Active WhatsApp Handle *',
        needs: 'Intended Visual Asset Needs',
        budget: 'Budget Resource Allocation',
        brief: 'Brief Project Outline',
      },
      formPlaceholders: {
        name: 'e.g. Rizky Dharma',
        whatsapp: 'e.g. +6281234567890',
        brief: 'Define briefly your venture metrics, competitors, targets or visual aesthetic preferences...',
      },
      formServices: {
        'logo-design': 'Logo Design & Wordmarks (Logo Designer)',
        'visual-identity': 'Visual Identity System (Visual Identity Designer)',
        'brand-collateral': 'Brand Collateral & Print (Packaging, Stationery)',
        'logo-motion': 'Logo Motion & Animation (Animated Logo)',
        'custom': 'Custom Shared Campaign (Comprehensive Suite)',
      },
      formBudgets: {
        starter: 'Under Rp 1 Million / $75 USD',
        'mid-tier': 'Rp 1 Million - Rp 3 Million / $200 USD',
        scale: 'Rp 3 Million - Rp 5 Million / $350 USD',
        enterprise: 'Over Rp 5 Million / $350+ USD',
      },
      submitting: 'Transmitting uplink...',
      submitBtn: 'Transmit Launch Plan',
    },
    footer: {
      bio: 'Brand & Design Studio assisting pre-eminent startups and scaleups solidify permanent aesthetic structures across planetary markets.',
      servicesTitle: 'Services',
      services: [
        'Logo Design & Wordmarks',
        'Visual Identity Systems',
        'Brand Collateral & Print',
        'Logo Motion & Animation'
      ],
      mapTitle: 'Studio Map',
      mapLinks: {
        about: 'About Mission',
        services: 'Services Desk',
        portfolio: 'Portfolio Archive',
        process: 'Orbit Methodology',
        pricing: 'Investment Plans',
      },
      keepInOrbit: 'Stay in Orbit',
      newsletterDesc: 'Secure fresh strategy matrices, layout patterns and studio dispatches delivered to your box.',
      subscribed: 'Subscription Active! ✓',
      placeholderEmail: 'email@domain.com',
      copyright: '© 2026 Angkasa Studio. All rights reserved.',
      privacy: 'Privacy Protocol',
      terms: 'Usage Terms',
      cookie: 'Cookie Systems',
    }
  },
  id: {
    navbar: {
      services: 'Layanan',
      portfolio: 'Karya',
      process: 'Proses',
      pricing: 'Harga',
      contactUs: 'Hubungi Kami',
      beginDiscussion: 'Mulai Diskusi',
    },
    hero: {
      badge: 'Brand & Design Studio',
      titlePart1: 'Angkasa Studio —',
      titlePart2: 'Membawa Identitas Visual',
      gradient: 'Melampaui Batas',
      subtext: 'Identitas visual premium untuk startup dan bisnis ambisius yang siap meninggalkan kesan tak terlupakan di orbit pasar mereka.',
      viewWork: 'Lihat Karya Kami',
      learnServices: 'Pelajari Layanan',
      brandsLaunched: 'Brand Diluncurkan',
      inOrbit: 'Mengudara',
      years: 'Thn',
      satisfaction: 'Skor Kepuasan',
      clientRating: 'Rating Klien',
      scrollDown: 'Gulir ke Bawah',
    },
    services: {
      expertise: 'Keahlian Kami',
      title: 'Segala Kebutuhan untuk Melesatkan Brand Anda',
      desc: 'Dari logo ikonik, sistem identitas visual yang solid, materi cetak premium, hingga animasi gerakan logo dinamis — kami desain dengan presisi mutlak.',
      items: {
        'logo-design': {
          title: 'Logo Design & Wordmarks',
          description: 'Kreasi logo mark, kustom wordmark, monogram, dan letterform unik yang berkarakter kuat dan siap menjadi jangkar identitas bisnis Anda.',
          tags: ['Custom Logo', 'Wordmark', 'Monogram']
        },
        'visual-identity': {
          title: 'Visual Identity Systems',
          description: 'Sistem identitas visual terpadu mulai dari skema warna, panduan tipografi, aset ikonografi, hingga manual buku panduan penggunaan lengkap.',
          tags: ['Brand Book', 'Color System', 'Typography']
        },
        'brand-collateral': {
          title: 'Brand Collateral & Print',
          description: 'Aset fisik & digital premium seperti desain kemasan (packaging), pitch deck, profil perusahaan, stationery, dan dokumen cetak resmi.',
          tags: ['Packaging', 'Stationery', 'Pitch Decks']
        },
        'logo-motion': {
          title: 'Logo Motion & Animation',
          description: 'Logo animasi, bumper intro berkualitas tinggi, motion graphics media sosial, dan pedoman animasi logo interaktif (Lottie & SVG).',
          tags: ['Animation', 'Lottie / SVG', 'Bumper Intro']
        }
      }
    },
    portfolio: {
      selectedWork: 'Karya Pilihan',
      title: 'Brand yang Telah Kami Orbitkan',
      filters: {
        all: 'Semua Karya',
        logo: 'Desain Logo',
        identity: 'Identitas Visual',
        collateral: 'Materi Cetak',
        motion: 'Animasi Logo',
      },
      items: {
        'nexus-capital': { client: 'Fintech · Desain Logo', title: 'Nexus Geometric Star Symbol' },
        'luminar-dashboard': { client: 'SaaS · Animasi Logo', title: 'Luminar Kinetic Moving Mark' },
        'vault-protocol': { client: 'Web3 · Materi Cetak', title: 'Vault Stationery & Packaging Set' },
        'kosmik-market': { client: 'E-Commerce · Tipografi Kustom', title: 'Kosmik Custom Lettering Logotype' },
        'strata-living': { client: 'PropTech · Identitas Visual', title: 'Strata Living Guidelines Book' },
        'bintara-finance': { client: 'Fintech · Identitas Visual', title: 'Sistem Rebrand Terpadu Bintara' },
        'arkadia-labs': { client: 'Web3 · Desain Logo', title: 'Simbol Sigil Kriptografis Arkadia' },
        'apex-retail': { client: 'E-Commerce · Desain Cetak & Kemasan', title: 'Seri Kotak Sepatu Ramah Lingkungan Apex' },
        'equinox-brand': { client: 'Kreatif · Animasi Logo', title: 'Kinetika Orbit Bintang Equinox' },
        'nebula-coffee': { client: 'Sektor Ritel · Desain Cetak & Kemasan', title: 'Kemasan Kopi Premium Nebula Blend' },
      }
    },
    testimonials: {
      title: 'Kesan Mereka yang Telah Mengudara',
      badge: 'Suara Klien',
      desc: 'Klien berbicara lebih keras dari portofolio kami.',
      items: [
        {
          id: 't1',
          quote: 'Angkasa Studio benar-benar mengubah cara kami dipersepsikan di pasar. Brand identity kami sekarang terasa premium, konsisten, dan benar-benar merepresentasikan visi produk kami.',
          author: 'Rizky Dharma',
          role: 'CEO, Nexus Capital',
        },
        {
          id: 't2',
          quote: 'Proses kerjanya terstruktur banget. Dari discovery sampai delivery, tim Angkasa selalu satu langkah lebih depan dari apa yang kami bayangkan.',
          author: 'Siti Aminah',
          role: 'Founder, Luminar',
        },
        {
          id: 't3',
          quote: 'Design system yang mereka buat menghemat waktu tim kami puluhan jam setiap sprint. Ini bukan sekadar desain — ini adalah infrastruktur brand yang sebenarnya.',
          author: 'Michael Faiz',
          role: 'CTO, Vault Protocol',
        },
        {
          id: 't4',
          quote: 'Kami mendapatkan 3 investor baru setelah pitch deck redesign oleh Angkasa. Visualnya so clean dan storytelling-nya kuat banget. Worth every rupiah.',
          author: 'Laila Kusuma',
          role: 'Co-Founder, Kosmik Market',
        },
        {
          id: 't5',
          quote: 'Rebrand kami dari Angkasa menghasilkan peningkatan 40% di user trust score dan 28% lebih tinggi NPS dalam 3 bulan. Hasilnya lebih dari kami harapkan.',
          author: 'Bagas Pratama',
          role: 'Head of Product, Strata Living',
        },
        {
          id: 't6',
          quote: 'Yang paling membuat saya berkesan adalah bagaimana mereka menerjemahkan produk fintech kami yang rumit menjadi bahasa visual yang terasa ramah, modern, dan tepercaya. Pekerjaan yang luar biasa!',
          author: 'Arif Nugroho',
          role: 'CMO, Bintara Finance',
        }
      ]
    },
    process: {
      badge: 'Metode Kerja Kami',
      titlePart1: 'Sistem Orbit',
      titlePart2: 'Angkasa Studio',
      desc: 'Setiap proyek melewati sistem yang telah kami rancang untuk menghasilkan output konsisten, terukur, dan bernilai tinggi.',
      steps: [
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
      ]
    },
    pricing: {
      badge: 'Harga Transparan',
      title: 'Investasi Terbaik untuk Brand Anda',
      desc: 'Paket investasi optimal dirancang fleksibel menyesuaikan tingkat pertumbuhan bisnis Anda.',
      recommended: 'REKOMENDASI',
      fixed: 'Biaya Tetap · Tanpa Biaya Tersembunyi',
      selectPlan: 'Pilih Paket',
      configurator: 'Konfigurasi Tambahan',
      addonLabel: 'Panel Tambahan Interaktif',
      configDesc: 'Butuh kelengkapan tambahan? Sesuaikan kebutuhan Anda di panel berikut untuk mengestimasi biaya total pengerjaan projek.',
      estimatedCostLabel: 'ESTIMASI BIAYA TAMBAHAN',
      estimatedNone: 'Belum ada tambahan dipilih',
      estimatedCount: 'Menambahkan {count} opsi ke estimasi',
      customProposal: 'Minta Penawaran Kustom',
      planNames: {
        'logo-sys': 'Paket Logo Startup',
        'brand-identity': 'Identitas Brand Lengkap',
        'full-branding': 'Paket Identitas & Animasi Lengkap',
      },
      planDescs: {
        'logo-sys': 'Ideal untuk projek awal atau validasi produk yang butuh aset kilat.',
        'brand-identity': 'Sistem visual lengkap dari nol hingga manual buku pedoman brand.',
        'full-branding': 'Solusi branding premium terintegrasi lengkap dengan materi cetak (collateral), desain kemasan, dan animasi logo dinamis.',
      },
      addons: {
        'logo-motion': 'Animasi Logo & Bumper Gerak',
        'social-media': 'Kit Media Sosial (+5 Templat)',
        'stationery': 'Desain Cetak Berkas Kantor (Stationery)',
        'packaging': 'Desain Kemasan Siap Cetak (Packaging)',
      },
      features: {
        'logo-sys': [
          'Format logo vektor lengkap (.AI, .SVG)',
          'Aset PNG & JPG resolusi tinggi',
          'Batas revisi hingga 2 kali',
          'Pilihan palet warna utama',
        ],
        'brand-identity': [
          'Sistem Logo & Nama Brand Premium',
          'Teori Warna & Sistem Palet Warna',
          'Paduan Tipografi Berkarakter',
          'Panduan Lengkap PDF (30+ Halaman)',
          'Penyerahan File Master Figma',
          'Batas revisi hingga 3 kali',
        ],
        'full-branding': [
          'Semua Fitur Identitas Lengkap',
          'Animasi Logo & Bumper Intro Kustom',
          'Aset Media Cetak & Stationery Premium',
          'Desain Kemasan & File Siap Cetak',
          'Dukungan 1-on-1 dengan Art Director Senior',
          'Revisi Fleksibel Selama Masa Kontrak',
        ]
      }
    },
    contact: {
      badge: 'Siap Lepas Landas?',
      title: 'Saatnya Brand Anda Mengangkasa Lebih Tinggi',
      desc: 'Bergabunglah dengan 87+ brand yang telah mempercayakan identitas visual mereka kepada kami. Slot tersedia terbatas setiap kuartal.',
      successTitle: 'Sukses Mengorbit! ✓',
      successText: 'Terima kasih, {name}. Proposal proyek Anda berhasil didaftarkan di sistem kami. Tim Angkasa Studio akan menghubungi Anda dalam 24 jam ke WhatsApp {whatsapp}.',
      contactWa: 'Hubungi Instan via WhatsApp',
      newProposal: 'Kirim Pembahasan Baru',
      formLabels: {
        name: 'Nama Lengkap *',
        whatsapp: 'Nomor WhatsApp *',
        needs: 'Kebutuhan Desain / Servis',
        budget: 'Rencana Budget Alokasi',
        brief: 'Deskripsi Singkat Projek',
      },
      formPlaceholders: {
        name: 'e.g. Rizky Dharma',
        whatsapp: 'e.g. 081234567890',
        brief: 'Ceritakan singkat mengenai produk Anda, audiens kompetitor, sasaran, atau aspirasi brand...',
      },
      formServices: {
        'logo-design': 'Logo Design & Wordmarks (Logo Designer)',
        'visual-identity': 'Visual Identity System (Visual Identity Designer)',
        'brand-collateral': 'Brand Collateral & Print (Packaging, Stationery)',
        'logo-motion': 'Logo Motion & Animation (Animated Logo)',
        'custom': 'Paket Kustom Integrasi (Comprehensive Suite)',
      },
      formBudgets: {
        starter: 'Di bawah Rp 1 Juta',
        'mid-tier': 'Rp 1 Juta - Rp 3 Juta',
        scale: 'Rp 3 Juta - Rp 5 Juta',
        enterprise: 'Di atas Rp 5 Juta',
      },
      submitting: 'Mengirim Sinyal...',
      submitBtn: 'Kirim Bahasan Projek',
    },
    footer: {
      bio: 'Brand & Design Studio yang membantu startup dan bisnis premium membangun identitas visual yang tak terlupakan di orbit pasar.',
      servicesTitle: 'Layanan',
      services: [
        'Logo Design & Wordmarks',
        'Visual Identity Systems',
        'Brand Collateral & Print',
        'Logo Motion & Animation'
      ],
      mapTitle: 'Peta Studio',
      mapLinks: {
        about: 'Tentang Misi',
        services: 'Daftar Layanan',
        portfolio: 'Karya Pilihan',
        process: 'Metode Orbit',
        pricing: 'Paket Investasi',
      },
      keepInOrbit: 'Tetap Mengorbit',
      newsletterDesc: 'Dapatkan insights segar seputar branding, desain visual, dan strategi langsung di kotak masuk Anda.',
      subscribed: 'Pendaftaran Berhasil! ✓',
      placeholderEmail: 'email@anda.com',
      copyright: '© 2026 Angkasa Studio. Hak cipta dilindungi undang-undang.',
      privacy: 'Kebijakan Privasi',
      terms: 'Syarat Ketentuan',
      cookie: 'Kebijakan Cookie',
    }
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('angkasa_lang');
    return (saved === 'en' || saved === 'id') ? saved : 'id';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('angkasa_lang', newLang);
  };

  const t = (section: string, key: string) => {
    return translations[lang][section]?.[key] || translations['id'][section]?.[key] || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
