'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ContactMessage } from '@/types';
import { saveMessage } from '@/lib/storage';
import { useTranslation } from '@/i18n/LanguageContext';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg: ContactMessage = {
      id: `MSG-${Date.now().toString(36).toUpperCase()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      createdAt: new Date().toISOString(),
      read: false,
      replied: false,
    };
    await saveMessage(msg);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="grain absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">{t('contact.subtitle')}</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{t('contact.title')}</h1>
            <p className="text-white/50 max-w-xl mx-auto">
              {t('contact.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">{t('contact.info.title')}</h2>
                <p className="text-charcoal/60 leading-relaxed mb-8">
                  {t('contact.info.desc')}
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    ),
                    label: t('contact.info.address'),
                    value: '12 Rue du Vignoble\n75011 Paris, France',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    ),
                    label: t('contact.info.phone'),
                    value: '+33 1 23 45 67 89',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                    label: t('contact.info.email'),
                    value: 'contact@chalamoti.fr',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    label: t('contact.info.hours'),
                    value: t('contact.info.hours.value') + '\n' + t('contact.info.hours.closed'),
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-wine/10 text-wine flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/40 uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="text-sm text-charcoal font-medium whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-cream">
                <Link
                  href="/commander"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-wine text-white font-semibold rounded-xl hover:bg-wine-dark transition-all duration-300 shadow-lg shadow-wine/20 text-sm"
                >
                  {t('contact.info.cta')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <div className="bg-white rounded-2xl border border-cream p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">{t('contact.form.success')}</h3>
                  <p className="text-charcoal/50 mb-6">
                    {t('contact.form.success.desc')}
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                    className="text-wine font-semibold hover:underline"
                  >
                    {t('contact.form.another')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-cream p-8">
                  <h3 className="text-xl font-serif font-bold text-charcoal mb-6">{t('contact.form.title')}</h3>
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-1.5">{t('contact.form.name')}</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-cream bg-offwhite focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-colors"
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-1.5">{t('contact.form.phone')}</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-cream bg-offwhite focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-colors"
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-1.5">{t('contact.form.email')}</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-cream bg-offwhite focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-colors"
                        placeholder="jean@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-1.5">{t('contact.form.message')}</label>
                      <textarea
                        required
                        rows={6}
                        value={form.message}
                        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-cream bg-offwhite focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-colors resize-none"
                        placeholder={t('contact.form.placeholder')}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-wine text-white font-semibold rounded-xl hover:bg-wine-dark transition-all duration-300 shadow-lg shadow-wine/20 hover:shadow-xl hover:-translate-y-0.5"
                    >
                      {t('contact.form.submit')}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
