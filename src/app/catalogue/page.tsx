'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { products } from '@/data/products';
import { useTranslation } from '@/i18n/LanguageContext';

type Filter = 'all' | 'bouteille' | 'bidon';

export default function CataloguePage() {
  const [filter, setFilter] = useState<Filter>('all');
  const { t } = useTranslation();

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('catalog.all') },
    { key: 'bouteille', label: t('catalog.bottles') },
    { key: 'bidon', label: t('catalog.bidons') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-wine/10 blur-3xl" />
        <div className="grain absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
              {t('catalog.subtitle')}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {t('catalog.title')}
            </h1>
            <p className="text-white/50 max-w-xl mx-auto">
              {t('catalog.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="py-16 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === f.key
                    ? 'bg-wine text-white shadow-lg shadow-wine/20'
                    : 'bg-white text-charcoal/60 border border-cream hover:border-wine/30 hover:text-wine'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>

          {/* Info */}
          <div className="mt-16 bg-cream/40 rounded-2xl p-8 border border-cream">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="font-serif font-bold text-charcoal mb-1">{t('catalog.pickup')}</p>
                <p className="text-sm text-charcoal/50">{t('catalog.pickup.sub')}</p>
              </div>
              <div>
                <p className="font-serif font-bold text-charcoal mb-1">{t('catalog.payment')}</p>
                <p className="text-sm text-charcoal/50">{t('catalog.payment.sub')}</p>
              </div>
              <div>
                <p className="font-serif font-bold text-charcoal mb-1">{t('catalog.schedule')}</p>
                <p className="text-sm text-charcoal/50">{t('catalog.schedule.sub')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
