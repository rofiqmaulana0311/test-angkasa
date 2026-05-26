import React, { useState } from 'react';
import { Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    service: 'logo-design',
    budget: 'mid-tier',
    details: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp) return;

    setLoading(true);
    // Simulate high-fidelity api response
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      whatsapp: '',
      service: 'logo-design',
      budget: 'mid-tier',
      details: '',
    });
    setSubmitted(false);
  };

  return (
    <motion.section
      id="cta"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        <div className="p-8 md:p-14 rounded-3xl border border-white/5 bg-space-2/40 backdrop-blur-3xl text-center relative overflow-hidden">
          {/* Parallax ambient background radial filter */}
          <div className="absolute w-[500px] h-[500px] bg-radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%) pointer-events-none -top-40 -left-40" />

          {submitted ? (
            /* Submission success layout with micro interactions */
            <div className="py-12 flex flex-col items-center justify-center animate-pulse">
              <CheckCircle2 className="w-16 h-16 text-cosmic-cyan mb-6" />
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                Sukses Mengorbit! ✓
              </h3>
              <p className="text-star-dim font-light text-sm sm:text-base max-w-md leading-relaxed mb-8">
                Terima kasih, <strong>{formData.name}</strong>. Proposal proyek Anda berhasil didaftarkan di sistem kami. Tim Angkasa Studio akan menghubungi Anda dalam 24 jam ke WhatsApp <strong>{formData.whatsapp}</strong>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <a
                  href={`https://wa.me/6281234567890?text=Halo%20Angkasa%20Studio%2C%20saya%20${encodeURIComponent(formData.name)}%20ingin%20berdiskusi%20mengenai%20projek%20${encodeURIComponent(formData.service)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-green-500 hover:bg-green-600 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-green-500/20 transition-all duration-200"
                >
                  Hubungi Instan via WhatsApp
                </a>
                
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/10 hover:border-cosmic-blue/30 text-xs font-semibold uppercase tracking-wider text-star-dim hover:text-white transition-colors duration-200"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Kirim Pembahasan Baru
                </button>
              </div>
            </div>
          ) : (
            /* Proposal Configurator Form */
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cosmic-blue block mb-4">
                Siap Lepas Landas?
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-none">
                Saatnya Brand Anda <br /> Mengangkasa Lebih Tinggi
              </h2>
              <p className="text-star-dim font-light text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-10">
                Bergabunglah dengan 87+ brand yang telah mempercayakan identitas visual mereka kepada kami. Slot tersedia terbatas setiap kuartal.
              </p>

              <form onSubmit={handleSubmit} className="text-left max-w-2xl mx-auto flex flex-col gap-6">
                
                {/* Inputs block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-star-muted font-bold mb-2 font-mono">
                      Nama Lengkap *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rizky Dharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-space-1 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-cosmic-blue transition-colors placeholder-star-muted"
                    />
                  </div>
                  {/* WhatsApp field */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-star-muted font-bold mb-2 font-mono">
                      Nomor WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 081234567890"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full bg-space-1 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-cosmic-blue transition-colors placeholder-star-muted"
                    />
                  </div>
                </div>

                {/* Option configurations row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Required Service selection list */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-star-muted font-bold mb-2 font-mono">
                      Kebutuhan Desain / Servis
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-space-1 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-cosmic-blue transition-colors appearance-none cursor-pointer"
                    >
                      <option value="logo-design">Logo Design & Wordmarks (Logo Designer)</option>
                      <option value="visual-identity">Visual Identity System (Visual Identity Designer)</option>
                      <option value="brand-collateral">Brand Collateral & Print (Packaging, Stationery)</option>
                      <option value="logo-motion">Logo Motion & Animation (Animated Logo)</option>
                      <option value="custom">Paket Kustom Integrasi (Comprehensive Suite)</option>
                    </select>
                  </div>

                  {/* Pricing Tier selection list */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-star-muted font-bold mb-2 font-mono">
                      Rencana Budget Alokasi
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-space-1 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-cosmic-blue transition-colors appearance-none cursor-pointer"
                    >
                      <option value="starter">Di bawah Rp 1 Juta</option>
                      <option value="mid-tier">Rp 1 Juta - Rp 3 Juta</option>
                      <option value="scale">Rp 3 Juta - Rp 5 Juta</option>
                      <option value="enterprise">Di atas Rp 5 Juta</option>
                    </select>
                  </div>
                </div>

                {/* Textarea details */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-star-muted font-bold mb-2 font-mono">
                    Deskripsi Singkat Projek
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ceritakan singkat mengenai produk Anda, audiens kompetitor, sasaran, atau aspirasi brand..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-space-1 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-cosmic-blue transition-colors placeholder-star-muted resize-none"
                  />
                </div>

                {/* Submit trigger with loaders */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-center py-4 rounded-full bg-cosmic-blue hover:bg-blue-600 text-white font-semibold text-xs uppercase tracking-widest tracking-wide transition-all shadow-lg shadow-cosmic-blue/20 hover:shadow-cosmic-blue/40 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2 cursor-none"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Mengirim Sinyal...
                    </>
                  ) : (
                    <>
                      Kirim Bahasan Projek
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
