'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/i18n/LanguageContext';

export default function InscriptionPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError(t('register.error.empty'));
      return;
    }
    if (form.password.length < 6) {
      setError(t('register.error.password'));
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError(t('register.error.mismatch'));
      return;
    }

    const result = await register({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
    });

    if (result.success) {
      if (result.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      setError(result.error || 'Erreur lors de l\'inscription.');
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-20 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="grain absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">{t('register.subtitle')}</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{t('register.title')}</h1>
            <p className="text-white/50 max-w-xl mx-auto">
              {t('register.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-offwhite">
        <div className="max-w-md mx-auto px-4">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-cream p-8 shadow-sm"
          >
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-wine/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-wine" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              </div>
              <h2 className="text-xl font-serif font-bold text-charcoal">{t('register.form.title')}</h2>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1.5">{t('register.firstname')}</label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={e => { setForm(prev => ({ ...prev, firstName: e.target.value })); setError(''); }}
                    className="w-full px-4 py-3 rounded-xl border border-cream bg-offwhite focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-colors"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1.5">{t('register.lastname')}</label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={e => { setForm(prev => ({ ...prev, lastName: e.target.value })); setError(''); }}
                    className="w-full px-4 py-3 rounded-xl border border-cream bg-offwhite focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-colors"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-1.5">{t('register.email')}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => { setForm(prev => ({ ...prev, email: e.target.value })); setError(''); }}
                  className="w-full px-4 py-3 rounded-xl border border-cream bg-offwhite focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-colors"
                  placeholder="jean@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-1.5">{t('register.password')}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={e => { setForm(prev => ({ ...prev, password: e.target.value })); setError(''); }}
                    className="w-full px-4 py-3 rounded-xl border border-cream bg-offwhite focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-colors pr-12"
                    placeholder={t('register.password.hint')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal/70 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-1.5">{t('register.confirm')}</label>
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={e => { setForm(prev => ({ ...prev, confirmPassword: e.target.value })); setError(''); }}
                  className="w-full px-4 py-3 rounded-xl border border-cream bg-offwhite focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-colors"
                  placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-wine text-white font-semibold rounded-xl hover:bg-wine-dark transition-all duration-300 shadow-lg shadow-wine/20 hover:shadow-xl hover:-translate-y-0.5"
              >
                {t('register.submit')}
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-charcoal/50">
              {t('register.login')}{' '}
              <Link href="/connexion" className="text-wine font-semibold hover:underline">
                {t('register.login.link')}
              </Link>
            </p>
          </motion.form>
        </div>
      </section>
    </>
  );
}
