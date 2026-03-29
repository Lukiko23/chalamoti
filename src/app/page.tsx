'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { products } from '@/data/products';
import { useTranslation } from '@/i18n/LanguageContext';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const { t } = useTranslation();
  const featuredProducts = products.filter(p => p.category === 'bouteille');

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-charcoal">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-wine/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
          <div className="grain absolute inset-0" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="inline-block text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-6">
                  {t('home.hero.subtitle')}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6"
              >
                {t('home.hero.title')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-white/60 max-w-lg leading-relaxed mb-10"
              >
                {t('home.hero.desc')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/catalogue"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-wine text-white font-semibold rounded-xl hover:bg-wine-dark transition-all duration-300 shadow-lg shadow-wine/30 hover:shadow-xl hover:shadow-wine/40 hover:-translate-y-0.5"
                >
                  {t('home.hero.cta1')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/commander"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold/40 text-gold font-semibold rounded-xl hover:bg-gold/10 hover:border-gold transition-all duration-300"
                >
                  {t('home.hero.cta2')}
                </Link>
              </motion.div>
            </div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-wine/20 blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="animate-float relative z-10 glass rounded-3xl p-12">
                  <svg viewBox="0 0 120 200" className="w-32 h-48 text-gold/80 mx-auto" fill="currentColor">
                    <rect x="50" y="0" width="20" height="40" rx="4" opacity="0.9" />
                    <path d="M50 40 C50 40, 20 70, 20 110 L20 175 C20 185, 28 193, 38 193 L82 193 C92 193, 100 185, 100 175 L100 110 C100 70, 70 40, 70 40 Z" opacity="0.6" />
                    <ellipse cx="60" cy="140" rx="25" ry="30" opacity="0.15" />
                    <text x="60" y="155" textAnchor="middle" fontSize="18" fontFamily="serif" fontWeight="bold" opacity="0.5">C</text>
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== INTRODUCTION ========== */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
                {t('home.story.subtitle')}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal leading-tight mb-6">
                {t('home.story.title')}
              </h2>
              <p className="text-charcoal/60 leading-relaxed mb-4">
                {t('home.story.p1')}
              </p>
              <p className="text-charcoal/60 leading-relaxed mb-8">
                {t('home.story.p2')}
              </p>
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 text-wine font-semibold hover:gap-3 transition-all duration-300"
              >
                {t('home.story.cta')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: t('home.stat1.value'), label: t('home.stat1.label') },
                { num: t('home.stat2.value'), label: t('home.stat2.label') },
                { num: t('home.stat3.value'), label: t('home.stat3.label') },
                { num: t('home.stat4.value'), label: t('home.stat4.label') },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white p-6 rounded-2xl border border-cream shadow-sm text-center"
                >
                  <div className="text-2xl font-serif font-bold text-wine mb-1">{stat.num}</div>
                  <div className="text-xs text-charcoal/50 uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== POURQUOI CHALAMOTI ========== */}
      <section className="py-24 bg-cream/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle={t('home.why.subtitle')}
            title={t('home.why.title')}
            description={t('home.why.desc')}
          />

          <div className="grid md:grid-cols-3 gap-8 mt-4">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: t('home.why.auth.title'),
                desc: t('home.why.auth.desc'),
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ),
                title: t('home.why.quality.title'),
                desc: t('home.why.quality.desc'),
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                ),
                title: t('home.why.passion.title'),
                desc: t('home.why.passion.desc'),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-white p-8 rounded-2xl border border-cream shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-wine/10 text-wine flex items-center justify-center mb-5 group-hover:bg-wine group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-charcoal mb-3">{item.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRODUITS PHARES ========== */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle={t('home.featured.subtitle')}
            title={t('home.featured.title')}
            description={t('home.featured.desc')}
          />

          <div className="grid md:grid-cols-3 gap-8 mt-4">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-wine/20 text-wine font-semibold rounded-xl hover:bg-wine hover:text-white transition-all duration-300"
            >
              {t('home.featured.cta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== AUTHENTICITE ========== */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 grain" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-wine/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            light
            subtitle={t('home.heritage.subtitle')}
            title={t('home.heritage.title')}
            description={t('home.heritage.desc')}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {[
              { title: t('home.heritage.qvevri'), desc: t('home.heritage.qvevri.desc') },
              { title: t('home.heritage.cepages'), desc: t('home.heritage.cepages.desc') },
              { title: t('home.heritage.terroir'), desc: t('home.heritage.terroir.desc') },
              { title: t('home.heritage.unesco'), desc: t('home.heritage.unesco.desc') },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-500"
              >
                <h3 className="text-gold font-serif font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMMENT CA MARCHE ========== */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle={t('home.order.subtitle')}
            title={t('home.order.title')}
            description={t('home.order.desc')}
          />

          <div className="grid md:grid-cols-4 gap-8 mt-4">
            {[
              {
                step: '01',
                title: t('home.order.step1.title'),
                desc: t('home.order.step1.desc'),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: t('home.order.step2.title'),
                desc: t('home.order.step2.desc'),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: t('home.order.step3.title'),
                desc: t('home.order.step3.desc'),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                ),
              },
              {
                step: '04',
                title: t('home.order.step4.title'),
                desc: t('home.order.step4.desc'),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-wine/10 text-wine flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <span className="text-gold/40 text-3xl font-serif font-bold">{item.step}</span>
                <h3 className="text-lg font-serif font-bold text-charcoal mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== REASSURANCE ========== */}
      <section className="py-16 bg-cream/40 border-y border-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: t('home.reassure.order'), sub: t('home.reassure.order.sub'), icon: '🛒' },
              { label: t('home.reassure.pickup'), sub: t('home.reassure.pickup.sub'), icon: '📍' },
              { label: t('home.reassure.payment'), sub: t('home.reassure.payment.sub'), icon: '💳' },
              { label: t('home.reassure.authentic'), sub: t('home.reassure.authentic.sub'), icon: '✅' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="text-3xl block mb-2">{item.icon}</span>
                <p className="font-semibold text-charcoal text-sm">{item.label}</p>
                <p className="text-xs text-charcoal/50 mt-1">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="py-24 bg-wine relative overflow-hidden">
        <div className="absolute inset-0 grain" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-black/20 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <span className="inline-block text-gold/80 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              {t('home.cta.subtitle')}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              {t('home.cta.desc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {t('home.cta.catalog')}
              </Link>
              <Link
                href="/commander"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                {t('home.cta.order')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
