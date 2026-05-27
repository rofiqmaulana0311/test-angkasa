import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, RefreshCw, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    package: 'custom',
    details: '',
    selectedAddons: [] as string[],
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { lang, t } = useLanguage();

  const addonsList = [
    { id: 'logo-motion', nameId: 'Animasi Logo & Bumper Gerak', nameEn: 'Logo Animation & Motion Bumper' },
    { id: 'social-media', nameId: 'Kit Media Sosial (+5 Templat)', nameEn: 'Social Media Kit (+5 Templates)' },
    { id: 'stationery', nameId: 'Desain Cetak Berkas Kantor (Stationery)', nameEn: 'Office Stationery & Print Set' },
    { id: 'packaging', nameId: 'Desain Kemasan Siap Cetak (Packaging)', nameEn: 'Print-Ready Packaging Design' },
  ];

  const getAddonName = (id: string) => {
    const addon = addonsList.find(a => a.id === id);
    if (!addon) return id;
    return lang === 'id' ? addon.nameId : addon.nameEn;
  };

  const isAddOnIncludedInPackage = (addonId: string, packageId: string): boolean => {
    if (packageId === 'full-branding') {
      return ['logo-motion', 'stationery', 'packaging'].includes(addonId);
    }
    return false;
  };

  const handleAddonToggleInForm = (id: string) => {
    if (isAddOnIncludedInPackage(id, formData.package)) {
      return; // Already bundled, do not allow toggling off
    }
    setFormData(prev => {
      const isSelected = prev.selectedAddons.includes(id);
      const updated = isSelected 
        ? prev.selectedAddons.filter(item => item !== id)
        : [...prev.selectedAddons, id];
      return { ...prev, selectedAddons: updated };
    });
  };

  const getWhatsAppMsg = () => {
    const packageName = formData.package === 'logo-sys'
      ? (lang === 'id' ? 'Paket Logo Startup' : 'Startup Logo Package')
      : formData.package === 'brand-identity'
      ? (lang === 'id' ? 'Identitas Brand Lengkap' : 'Full Brand Identity Package')
      : formData.package === 'full-branding'
      ? (lang === 'id' ? 'Paket Identitas & Animasi Lengkap' : 'Complete Brand & Motion Suite')
      : (lang === 'id' ? 'Kustom / Tanpa Paket' : 'Custom Project');

    const activeAddons = addonsList.filter(add => 
      isAddOnIncludedInPackage(add.id, formData.package) || formData.selectedAddons.includes(add.id)
    );

    const addonsText = activeAddons.length > 0
      ? activeAddons.map(add => getAddonName(add.id) + (isAddOnIncludedInPackage(add.id, formData.package) ? ` (${lang === 'id' ? 'Termasuk Paket' : 'Bundled'})` : '')).join(', ')
      : (lang === 'id' ? 'Tidak ada' : 'None');

    if (lang === 'id') {
      return `Halo Angkasa Studio, saya *${formData.name}* ingin berdiskusi mengenai projek desain.

*Detail Rencana:*
- *Pilihan Paket Utama:* ${packageName}
- *Tambahan Paket (Add-ons):* ${addonsText}
- *Email:* ${formData.email || '-'}
- *Deskripsi Singkat:* ${formData.details || '-'}`;
    } else {
      return `Hello Angkasa Studio, I am *${formData.name}* and I would like to discuss a design project.

*Project Details:*
- *Main Package Selection:* ${packageName}
- *Additional Packages (Add-ons):* ${addonsText}
- *Email:* ${formData.email || '-'}
- *Brief Outline:* ${formData.details || '-'}`;
    }
  };

  // Listen to select pricing plan event and update state
  useEffect(() => {
    const handlePlanSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ planId: string }>;
      const planId = customEvent.detail?.planId;
      if (!planId) return;

      // Automatically populate included addons
      let includedAddons: string[] = [];
      if (planId === 'full-branding') {
        includedAddons = ['logo-motion', 'stationery', 'packaging'];
      }

      setFormData((prev) => ({
        ...prev,
        package: planId,
        selectedAddons: includedAddons,
      }));
    };

    window.addEventListener('select-pricing-plan', handlePlanSelect);
    return () => {
      window.removeEventListener('select-pricing-plan', handlePlanSelect);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp) return;

    setLoading(true);

    const message = getWhatsAppMsg();
    const waUrl = `https://wa.me/6287780597311?text=${encodeURIComponent(message)}`;
    const emailSubject = lang === 'id' 
      ? `Rencana Peluncuran Desain - ${formData.name}`
      : `Design Launch Plan - ${formData.name}`;
    const mailUrl = `mailto:rofiqm616@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(message)}`;

    // Simulate high-fidelity api response
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Automatically try to open WhatsApp in a new tab
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.error("WhatsApp redirect blocked by popup blocker:", err);
      }

      // Automatically trigger mail client on current tab
      setTimeout(() => {
        try {
          window.location.href = mailUrl;
        } catch (err) {
          console.error("Mailto launch failed:", err);
        }
      }, 400);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      whatsapp: '',
      email: '',
      package: 'custom',
      details: '',
      selectedAddons: [],
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
                {t('contact', 'successTitle')}
              </h3>
              <p className="text-star-dim font-light text-sm sm:text-base max-w-md leading-relaxed mb-8">
                {t('contact', 'successText')
                  .replace('{name}', formData.name)
                  .replace('{whatsapp}', formData.whatsapp)}
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-4">
                <a
                  href={`https://wa.me/6287780597311?text=${encodeURIComponent(getWhatsAppMsg())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-green-500 hover:bg-green-600 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-green-500/20 transition-all duration-200 cursor-none"
                >
                  {t('contact', 'contactWa')}
                </a>

                <a
                  href={`mailto:rofiqm616@gmail.com?subject=${encodeURIComponent(lang === 'id' ? `Rencana Peluncuran Desain - ${formData.name}` : `Design Launch Plan - ${formData.name}`)}&body=${encodeURIComponent(getWhatsAppMsg())}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-cosmic-blue hover:bg-blue-600 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-cosmic-blue/20 transition-all duration-200 cursor-none"
                >
                  {t('contact', 'contactEmail')}
                </a>
                
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-white/10 hover:border-cosmic-blue/30 text-xs font-semibold uppercase tracking-wider text-star-dim hover:text-white transition-colors duration-200 cursor-none"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {t('contact', 'newProposal')}
                </button>
              </div>
            </div>
          ) : (
            /* Proposal Configurator Form */
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cosmic-blue block mb-4 font-mono">
                {t('contact', 'badge')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-none select-none">
                {t('contact', 'title')}
              </h2>
              <p className="text-star-dim font-light text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-10 select-none">
                {t('contact', 'desc')}
              </p>

              <form onSubmit={handleSubmit} className="text-left max-w-2xl mx-auto flex flex-col gap-6">
                
                {/* Inputs block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-star-muted font-bold mb-2 font-mono select-none">
                      {t('contact', 'formLabels')['name']}
                    </label>
                    <input
                      required
                      type="text"
                      placeholder={t('contact', 'formPlaceholders')['name']}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-space-1 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-cosmic-blue transition-colors placeholder-star-muted cursor-none"
                    />
                  </div>
                  {/* WhatsApp field */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-star-muted font-bold mb-2 font-mono select-none">
                      {t('contact', 'formLabels')['whatsapp']}
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder={t('contact', 'formPlaceholders')['whatsapp']}
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full bg-space-1 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-cosmic-blue transition-colors placeholder-star-muted cursor-none"
                    />
                  </div>
                </div>

                {/* Email and Package Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email field (Optional) */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-star-muted font-bold mb-2 font-mono select-none">
                      {t('contact', 'formLabels')['email']}
                    </label>
                    <input
                      type="email"
                      placeholder={t('contact', 'formPlaceholders')['email']}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-space-1 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-cosmic-blue transition-colors placeholder-star-muted cursor-none"
                    />
                  </div>
                  
                  {/* Package Selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-star-muted font-bold mb-2 font-mono select-none">
                      {t('contact', 'formLabels')['package']}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.package}
                        onChange={(e) => {
                          const val = e.target.value;
                          let includedAddons: string[] = [];
                          if (val === 'full-branding') {
                            includedAddons = ['logo-motion', 'stationery', 'packaging'];
                          }
                          setFormData({
                            ...formData,
                            package: val,
                            selectedAddons: includedAddons
                          });
                        }}
                        className="w-full bg-space-1 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-cosmic-blue transition-colors appearance-none cursor-none"
                      >
                        <option value="custom">{(t('contact', 'formPackages') as any)['custom']}</option>
                        <option value="logo-sys">{(t('contact', 'formPackages') as any)['logo-sys']}</option>
                        <option value="brand-identity">{(t('contact', 'formPackages') as any)['brand-identity']}</option>
                        <option value="full-branding">{(t('contact', 'formPackages') as any)['full-branding']}</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-star-muted text-xs">▼</div>
                    </div>
                  </div>
                </div>

                {/* Additional Packages Add-ons row */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-star-muted font-bold mb-3 font-mono select-none block text-left">
                    {lang === 'id' ? 'Tambahan Paket (Add-ons)' : 'Additional Add-on Packages'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addonsList.map((add) => {
                      const isIncluded = isAddOnIncludedInPackage(add.id, formData.package);
                      const selected = isIncluded || formData.selectedAddons.includes(add.id);
                      return (
                        <button
                          key={add.id}
                          type="button"
                          onClick={() => handleAddonToggleInForm(add.id)}
                          className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 cursor-none ${
                            selected
                              ? 'border-cosmic-blue bg-cosmic-blue/10'
                              : 'border-white/5 bg-space-1 hover:border-white/15'
                          } ${isIncluded ? 'opacity-90' : ''}`}
                        >
                          <div>
                            <div className={`text-xs font-semibold ${selected ? 'text-cosmic-blue font-bold' : 'text-white'}`}>
                              {getAddonName(add.id)}
                            </div>
                            <div className="text-[10px] text-star-muted font-mono mt-0.5">
                              {isIncluded ? (
                                <span className="text-cosmic-cyan font-bold font-sans">
                                  {lang === 'id' ? '✓ Sudah Termasuk' : '✓ Already Included'}
                                </span>
                              ) : (
                                add.id === 'logo-motion' ? (lang === 'id' ? '+Rp 450 Ribu' : '+$30 USD') :
                                add.id === 'social-media' ? (lang === 'id' ? '+Rp 300 Ribu' : '+$20 USD') :
                                add.id === 'stationery' ? (lang === 'id' ? '+Rp 250 Ribu' : '+$18 USD') :
                                (lang === 'id' ? '+Rp 850 Ribu' : '+$58 USD')
                              )}
                            </div>
                          </div>
                          <div
                            className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center flex-shrink-0 ml-3 transition-colors ${
                              selected ? 'bg-cosmic-blue border-cosmic-blue text-white shadow-sm' : 'border-white/10'
                            }`}
                          >
                            {selected && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Textarea details */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-star-muted font-bold mb-2 font-mono select-none">
                    {t('contact', 'formLabels')['brief']}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t('contact', 'formPlaceholders')['brief']}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-space-1 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-cosmic-blue transition-colors placeholder-star-muted resize-none cursor-none"
                  />
                </div>

                {/* Submit trigger with loaders */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-center py-4 rounded-full bg-cosmic-blue hover:bg-blue-600 text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-lg shadow-cosmic-blue/20 hover:shadow-cosmic-blue/40 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2 cursor-none"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('contact', 'submitting')}
                    </>
                  ) : (
                    <>
                      {t('contact', 'submitBtn')}
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
